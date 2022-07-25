//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {BASE_NAME, Base, GameState, Player, Position, TERRAIN, Tile, Troop, Army, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Util library
/// @notice Contains all events as well as lower-level setters and getters
/// Util functions generally do not verify correctness of conditions. Make sure to verify in higher-level functions such as those in Engine.

library MarchModules {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    function _moveModule(uint256 _armyId, Position memory _targetPos) internal {
        Army memory _army = Util._getArmy(_armyId);
        Tile memory _targetTile = Util._getTileAt(_targetPos);

        uint256 _movementCooldown = Util._getArmyMovementCooldown(_army.armyTroopIds);
        require((block.timestamp - _army.lastMoved) >= _movementCooldown, "CURIO: Moved too recently");

        Army memory _targetTileArmy;
        uint256 _targetTileTroopTransportId;
        if (_targetTile.occupantId != _NULL()) {
            _targetTileArmy = Util._getArmy(_targetTile.occupantId);
        }

        // state change - if targetTile doesn't have transport
        _targetTileTroopTransportId = Util._getTransportIDFromArmy(_targetTileArmy.armyTroopIds);
        if (_targetTileTroopTransportId == _NULL()) {
            gs().map[_targetPos.x][_targetPos.y].occupantId = _armyId;
        }

        Tile memory _sourceTile = Util._getTileAt(_army.pos);
        Army memory _sourceTileArmy = Util._getArmy(_sourceTile.occupantId);
        if (_sourceTile.occupantId != _armyId) {
            // Army was on Army transport
            uint256 _sourceTileTroopTransportId = Util._getTransportIDFromArmy(_sourceTileArmy.armyTroopIds);
            Util._unloadArmyFromTransport(_sourceTileTroopTransportId);
        } else {
            gs().map[_army.pos.x][_army.pos.y].occupantId = _NULL();
        }

        // state change
        gs().armyIdMap[_armyId].pos = _targetPos;
        gs().armyIdMap[_armyId].lastMoved = block.timestamp;

        uint256 _cargoArmyId = Util._getTransportIDFromArmy(_army.armyTroopIds);
        if (_cargoArmyId != _NULL()) {
            // Army has a troop troopTransport — move its cargo army
            gs().armyIdMap[_cargoArmyId].pos = _targetPos;
        }

        Util._updatePlayerBalances(msg.sender);

        emit Util.Moved(msg.sender, _armyId, block.timestamp, _army.pos, _targetPos);
    }

    function _loadModule(uint256 _armyId, Tile memory _targetTile) internal {
        Army memory _army = Util._getArmy(_armyId);
        Army memory _targetArmy = Util._getArmy(_targetTile.occupantId);
        uint256 _troopTransportId = Util._getTransportIDFromArmy(_targetArmy.armyTroopIds);
        require(Util._getTransportIDFromArmy(_army.armyTroopIds) == _NULL(), "CURIO: cargo army cannot contain trooptransport");

        Troop memory _troopTransport = Util._getTroop(_troopTransportId);
        _troopTransport.cargoArmyId = _armyId;

        //update state for troop; no need for army
        gs().troopIdMap[_troopTransportId] = _troopTransport;
    }

    function _loadInfrantryOnTransport(uint256 _troopID, uint256 _troopTransportID) internal {
        // if it's the first one, create army ahdn then load
        Troop memory _transportTroop = Util._getTroop(_troopTransportID);

        // create a new army with 1 troopID
        uint256 _armyId = Util._createNewArmyFromTroop(_troopID);

        Tile memory _targetTile = Util._getTileAt(_transportTroop.pos);

        // if there's no cargoArmyID, you're the first to load on to the troop transport
        if (_transportTroop.cargoArmyId == 0) {
            MarchModules._loadModule(_armyId, _targetTile);
            MarchModules._moveModule(_armyId, _transportTroop.pos);
        } else {
            // if there's an existing army on troop transport, load directly
            uint256[] memory _newArmyIds = new uint256[](1);
            _newArmyIds[0] = _armyId;

            // TODO: continue this logic
        }
    }

    /**
     * combine multiple armies into one; move troops from joining army into main army
     * @param _mainArmyId identifier for the army that the others are joining
     * @param _joiningArmyIds identifiers for joining armies
     */

    function _combineArmy(uint256 _mainArmyId, uint256[] memory _joiningArmyIds) public {
        // basic check
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");

        Army memory _mainArmy = Util._getArmy(_mainArmyId);
        require(Util._inBound(_mainArmy.pos), "CURIO: Target out of bound");
        if (!Util._getTileAt(_mainArmy.pos).isInitialized) Util._initializeTile(_mainArmy.pos);

        require(_mainArmy.owner == msg.sender, "CURIO: Can only combine own troop");

        // army size pre-check; _joiningArmyIds are armies not troops but each has at least one troop
        uint256 troopCounter = _mainArmy.armyTroopIds.length;
        bool hasTransport = Util._getTransportIDFromArmy(_mainArmy.armyTroopIds) == 0;
        require((hasTransport && (troopCounter + _joiningArmyIds.length) == 2) || (!hasTransport && (troopCounter + _joiningArmyIds.length) <= 5 && (troopCounter + _joiningArmyIds.length) >= 2), "CURIO: Army can have up to five troops, or two with one transport");

        // large action check & update
        require((block.timestamp - _mainArmy.lastLargeActionTaken) >= Util._getArmyLargeActionCooldown(_mainArmy.armyTroopIds), "CURIO: Large action taken too recently");
        gs().armyIdMap[_mainArmyId].lastLargeActionTaken = block.timestamp;

        bool isLandArmy = Util._isLandArmy(_mainArmyId);

        for (uint256 i = 0; i < _joiningArmyIds.length; i++) {
            uint256 _joiningArmyId = _joiningArmyIds[i];
            require(isLandArmy == Util._isLandArmy(_joiningArmyId), "CURIO: Can only combine army of same type");
            Army memory _joiningArmy = Util._getArmy(_joiningArmyId);

            require(_joiningArmy.owner == msg.sender, "CURIO: Can only combine own troop");
            require(Util._withinDist(_mainArmy.pos, _joiningArmy.pos, 1), "CURIO: Combining armies must stay next to each other");

            uint256 _movementCooldown = Util._getArmyMovementCooldown(_joiningArmy.armyTroopIds);
            require((block.timestamp - _joiningArmy.lastMoved) >= _movementCooldown, "CURIO: Moved too recently");

            // large action check & update
            require((block.timestamp - _joiningArmy.lastLargeActionTaken) >= Util._getArmyLargeActionCooldown(_joiningArmy.armyTroopIds), "CURIO: Large action taken too recently");
            gs().armyIdMap[_joiningArmyId].lastLargeActionTaken = block.timestamp;

            // real army size check
            troopCounter += _joiningArmy.armyTroopIds.length;
            if (Util._getTransportIDFromArmy(_mainArmy.armyTroopIds) != 0) {
                require(hasTransport == false, "CURIO: Army can have up to five troops, or two with one transport");
                hasTransport == true;
            }
            require((hasTransport && troopCounter <= 2) || (!hasTransport && troopCounter <= 5), "CURIO: Army can have at most five troops, or two with one transport");

            // combining troops
            for (uint256 j = 0; j < _joiningArmy.armyTroopIds.length; j++) {
                gs().troopIdMap[_joiningArmy.armyTroopIds[j]].armyId = _mainArmyId;
                gs().armyIdMap[_mainArmyId].armyTroopIds.push(_joiningArmy.armyTroopIds[j]);
            }

            Util._removeArmyOnly(_joiningArmyId);
        }
    }

    function _battleBaseModule(uint256 _armyId, Position memory _targetPos) internal {
        Army memory _army = gs().armyIdMap[_armyId];
        require(Util._withinDist(_army.pos, _targetPos, 1), "CURIO: Target not in firing range");
        gs().armyIdMap[_armyId].lastLargeActionTaken = block.timestamp;

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        require(_targetTile.baseId != _NULL(), "CURIO: No target to attack");

        Base memory _targetBase = gs().baseIdMap[_targetTile.baseId];
        require(_targetBase.owner != msg.sender, "CURIO: Cannot attack own base");
        require(Util._isLandArmy(_armyId) || _targetBase.health > 0 || _targetBase.name == BASE_NAME.OIL_WELL, "CURIO: Can only capture base with land troop");

        // Exchange fire until one side dies
        uint256 _salt = 0;
        // todo: distribute damage to all troops
        uint256 _armyHealth = Util._getArmyHealth(_army.armyTroopIds);

        while (_armyHealth > 0) {
            // Troop attacks target
            _salt += 1;
            if (Util._strike(_targetBase.attackFactor, _salt)) {
                uint256 _damagePerHit = Util._getArmyDamagePerHit(_army.armyTroopIds);
                if (_damagePerHit < _targetBase.health) {
                    _targetBase.health -= _damagePerHit;
                } else {
                    _targetBase.health = 0;
                }
            }

            if (_targetBase.health == 0) break; // target cannot attack back if it has zero health

            // Target attacks troop
            _salt += 1;
            if (Util._strike(_targetBase.defenseFactor, _salt)) {
                if (_armyHealth > 1) {
                    _armyHealth -= 1;
                } else {
                    _armyHealth = 0;
                    Util._removeEntireArmy(_armyId);
                    emit Util.ArmyDeath(msg.sender, _armyId);
                }
            }
        }

        if (_targetBase.health == 0) {
            // Target base dies
            address _targetPlayer = _targetBase.owner;
            // todo: update health for troops
            gs().baseIdMap[_targetTile.baseId].health = 0;

            // Capture and move onto base if troop is infantry or if base is oil well
            if (Util._isLandArmy(_armyId) || _targetBase.name == BASE_NAME.OIL_WELL) {
                require(Util._getPlayer(msg.sender).numOwnedBases < gs().worldConstants.maxBaseCountPerPlayer, "CURIO: Max base count exceeded");

                _targetBase = Util._getBase(_targetTile.baseId);
                gs().baseIdMap[_targetTile.baseId].owner = msg.sender;
                gs().baseIdMap[_targetTile.baseId].health = 1;
                emit Util.BaseCaptured(msg.sender, _armyId, _targetTile.baseId);

                Util._updatePlayerBalances(_targetPlayer);
                Util._updatePlayerBalances(msg.sender);
                if (_targetPlayer != _NULL_ADRRESS()) {
                    gs().playerMap[_targetPlayer].numOwnedBases--;
                    gs().playerMap[_targetPlayer].totalGoldGenerationPerUpdate -= _targetBase.goldGenerationPerSecond;
                    gs().playerMap[_targetPlayer].totalOilGenerationPerUpdate -= _targetBase.oilGenerationPerSecond;
                }
                gs().playerMap[msg.sender].numOwnedBases++;
                gs().playerMap[msg.sender].totalGoldGenerationPerUpdate += _targetBase.goldGenerationPerSecond;
                gs().playerMap[msg.sender].totalOilGenerationPerUpdate += _targetBase.oilGenerationPerSecond;

                // Move
                _moveModule(_armyId, _targetPos);
            } else {
                emit Util.AttackedBase(msg.sender, _armyId, _army, _targetTile.baseId, _targetBase);
            }
        } else {
            // Troop dies
            gs().baseIdMap[_targetTile.baseId].health = _targetBase.health;
            _targetBase = Util._getBase(_targetTile.baseId);

            emit Util.AttackedBase(msg.sender, _armyId, _army, _targetTile.baseId, _targetBase);
        }
    }

    function _battleTroopModule(uint256 _armyId, Position memory _targetPos) internal {
        Army memory _army = gs().armyIdMap[_armyId];
        require(Util._withinDist(_army.pos, _targetPos, 1), "CURIO: Target not in firing range");
        gs().armyIdMap[_armyId].lastLargeActionTaken = block.timestamp;

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        Army memory _targetArmy;

        _targetArmy = gs().armyIdMap[_targetTile.occupantId];
        require(_targetArmy.owner != msg.sender, "CURIO: Cannot attack own troop");

        uint256 _armyHealth = Util._getArmyHealth(_army.armyTroopIds);
        uint256 _targetHealth = Util._getArmyHealth(_targetArmy.armyTroopIds);

        // todo: distribute damage to individual troops
        // Exchange fire until one side dies
        uint256 _salt = 0;
        while (_armyHealth > 0) {
            // Troop attacks target
            _salt += 1;
            if (Util._strike(Util._getArmyAttackFactor(_targetArmy.armyTroopIds), _salt)) {
                uint256 _damagePerHit = Util._getArmyDamagePerHit(_army.armyTroopIds);
                if (_damagePerHit < _targetHealth) {
                    _targetHealth -= _damagePerHit;
                } else {
                    _targetHealth = 0;
                    Util._removeEntireArmy(_targetTile.occupantId);
                    emit Util.ArmyDeath(_targetArmy.owner, _targetTile.occupantId);
                }
            }

            if (_targetHealth == 0) break; // target cannot attack back if it has zero health

            // Target attacks Army
            _salt += 1;
            if (Util._strike(Util._getArmyDefenseFactor(_targetArmy.armyTroopIds), _salt)) {
                if (Util._getArmyDamagePerHit(_targetArmy.armyTroopIds) < _armyHealth) {
                    _armyHealth -= Util._getArmyDamagePerHit(_targetArmy.armyTroopIds);
                } else {
                    _armyHealth = 0;
                    Util._removeEntireArmy(_armyId);
                    emit Util.ArmyDeath(msg.sender, _armyId);
                }
            }
        }

        if (_targetHealth == 0) {
            // todo: distribute damage to troops
            _army = Util._getArmy(_armyId);

            _targetArmy = Util._getArmy(_targetTile.occupantId);

            emit Util.AttackedArmy(msg.sender, _armyId, _army, _targetTile.occupantId, _targetArmy);
        } else {
            _targetArmy = Util._getArmy(_targetTile.occupantId);

            emit Util.AttackedArmy(msg.sender, _armyId, _army, _targetTile.occupantId, _targetArmy);
        }
    }

    function _NULL() internal pure returns (uint256) {
        return 0;
    }

    function _NULL_ADRRESS() internal pure returns (address) {
        return address(0);
    }
}
