//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {BASE_NAME, Base, GameState, Player, Position, TERRAIN, Tile, Troop, Army, TroopType, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Engine facet
/// @notice Contains player functions such as march, purchaseTroop, initializePlayer

contract EngineFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;
    address NULL_ADDR = address(0);

    /**
     * March troop to a target position (combining move, battle, capture).
     * @param _troopId identifier for troop
     * @param _targetPos target position
     */
    function march(uint256 _troopId, Position memory _targetPos) external {
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");

        require(Util._inBound(_targetPos), "CURIO: Target out of bound");
        if (!Util._getTileAt(_targetPos).isInitialized) Util._initializeTile(_targetPos);

        Troop memory _troop = gs().troopIdMap[_troopId];
        require(_troop.owner == msg.sender, "CURIO: Can only march own troop");
        require(!Util._samePos(_troop.pos, _targetPos), "CURIO: Already at destination");
        require((block.timestamp - _troop.lastLargeActionTaken) >= Util._getLargeActionCooldown(_troop.troopTypeId), "CURIO: Large action taken too recently");

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        if (_targetTile.occupantId == NULL) {
            if (_targetTile.baseId == NULL) {
                if (Util._isLandTroop(_troop.troopTypeId)) {
                    require(_targetTile.terrain != TERRAIN.WATER || Util._canTransportTroop(_targetTile), "CURIO: Cannot move on water");
                } else {
                    require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
                }
                _moveModule(_troopId, _targetPos);
            } else {
                if (Util._getBaseOwner(_targetTile.baseId) == msg.sender) {
                    if (Util._isLandTroop(_troop.troopTypeId)) {
                        require(_targetTile.terrain != TERRAIN.WATER || Util._canTransportTroop(_targetTile), "CURIO: Cannot move on water");
                    } else {
                        require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
                    }

                    _moveModule(_troopId, _targetPos);
                } else {
                    _battleBaseModule(_troopId, _targetPos); // will capture and move if conditions are met
                }
            }
        } else {
            if (gs().troopIdMap[_targetTile.occupantId].owner == msg.sender) {
                if (Util._canTransportTroop(_targetTile) && Util._isLandTroop(_troop.troopTypeId)) {
                    // Load troop onto transport
                    _loadModule(_troopId, _targetPos);
                    _moveModule(_troopId, _targetPos);
                } else {
                    revert("CURIO: Destination tile occupied");
                }
            } else {
                _battleTroopModule(_troopId, _targetPos);
            }
        }

        emit Util.PlayerInfo(msg.sender, gs().playerMap[msg.sender]);
    }

    /**
     * Purchase troop at a base.
     * @param _pos position of base
     * @param _troopTypeId identifier for selected troop type
     */
    function purchaseTroop(Position memory _pos, uint256 _troopTypeId) external {
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");

        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        Tile memory _tile = Util._getTileAt(_pos);
        require(_tile.baseId != NULL, "CURIO: No base found");
        require(_tile.occupantId == NULL, "CURIO: Base occupied by another troop");

        Base memory _base = Util._getBase(_tile.baseId);
        require(_base.owner == msg.sender, "CURIO: Can only purchase in own base");
        require(_base.name == BASE_NAME.PORT || (_base.name == BASE_NAME.CITY && Util._isLandTroop(_troopTypeId)), "CURIO: Base cannot purchase selected troop type");

        uint256 _troopPrice = Util._getTroopGoldPrice(_troopTypeId);
        Util._updatePlayerBalances(msg.sender);
        require(_troopPrice <= Util._getPlayerGoldBalance(msg.sender), "CURIO: Insufficient gold balance (capture more bases!)");

        (uint256 _armyId, Army memory _army) = Util._addTroop(msg.sender, _pos, _troopTypeId);
        gs().playerMap[msg.sender].goldBalance -= _troopPrice;

        emit Util.PlayerInfo(msg.sender, gs().playerMap[msg.sender]);
        emit Util.NewTroop(msg.sender, _armyId, _army, _pos);
    }

    /**
     * Delete an owned troop (often to reduce expense).
     * @param _troopId identifier for troop
     */

    function deleteTroop(uint256 _troopId, uint256 _transportTroopId) external {
        require(Util._getTroop(_troopId).owner == msg.sender, "CURIO: Can only delete own troop");

        Util._removeTroop(_troopId, _transportTroopId);

        emit Util.Death(msg.sender, _troopId);
    }

    /**
     * Initialize self as player at a selected position.
     * @param _pos position to initialize
     */
    function initializePlayer(Position memory _pos) external {
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._getPlayerCount() < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(!Util._isPlayerInitialized(msg.sender), "CURIO: Player already initialized");

        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        uint256 _baseId = Util._getTileAt(_pos).baseId;
        require(Util._getBaseOwner(_baseId) == NULL_ADDR, "CURIO: Base is taken");

        WorldConstants memory _worldConstants = gs().worldConstants;
        gs().players.push(msg.sender);
        gs().playerMap[msg.sender] = Player({
            initTimestamp: block.timestamp,
            active: true,
            goldBalance: _worldConstants.initPlayerGoldBalance,
            oilBalance: _worldConstants.initPlayerOilBalance,
            totalGoldGenerationPerUpdate: _worldConstants.defaultBaseGoldGenerationPerSecond,
            totalOilGenerationPerUpdate: 0,
            totalOilConsumptionPerUpdate: 0,
            balanceLastUpdated: block.timestamp,
            numOwnedBases: 1,
            numOwnedTroops: 0 //
        });
        gs().baseIdMap[_baseId].owner = msg.sender;

        emit Util.NewPlayer(msg.sender, _pos);
    }

    // ----------------------------------------------------------------------
    // MODULES FOR MARCH
    // ----------------------------------------------------------------------
    function _moveModule(uint256 _armyId, Position memory _targetPos) internal {
        Army memory _army = Util._getArmy(_armyId);
        Tile memory _targetTile = Util._getTileAt(_targetPos);

        // todo: util funciton
        // temporary: get the longest Movementcooldown from army
        uint256 _movementCooldown;

        for (uint256 i = 0; i < _army.armyTroopIds.length; i++) {
            uint256 _troopMovementCooldown = Util._getMovementCooldown((Util._getTroop(_army.armyTroopIds[i]).troopTypeId));
            if (_troopMovementCooldown > _movementCooldown) {
                _movementCooldown = _troopMovementCooldown;
            }
        }

        require((block.timestamp - _army.lastMoved) >= _movementCooldown, "CURIO: Moved too recently");

        // state change
        if (Util._getTroop(_targetTile.occupantId).cargoTroopIds.length == 0) {
            gs().map[_targetPos.x][_targetPos.y].occupantId = _armyId;
        }

        Tile memory _sourceTile = Util._getTileAt(_army.pos);
        if (_sourceTile.occupantId != _army) {
            // Army is on Army transport
            Util._unloadArmyFromArmyTransport(_sourceTile.occupantId, _army);
        } else {
            gs().map[_army.pos.x][_army.pos.y].occupantId = NULL;
        }

        // state change
        gs().armyIdMap[_armyId].pos = _targetPos;
        gs().armyIdMap[_armyId].lastMoved = block.timestamp;

        uint256[] memory _cargoArmyId = gs().troopIdMap[_army].cargoTroopIds;
        if (_cargoArmyId) {
            // Troop is a troop transport — move its army
            // Transport can load up to one army
            gs().armyIdMap[_cargoArmyId].pos = _targetPos;
        }

        Util._updatePlayerBalances(msg.sender);

        emit Util.Moved(msg.sender, _armyId, block.timestamp, _army.pos, _targetPos);
    }

    function _loadModule(uint256 _troopId, Position memory _targetPos) internal {
        Tile memory _targetTile = Util._getTileAt(_targetPos);

        // Load troop onto troop transport at target tile
        gs().troopIdMap[_targetTile.occupantId].cargoTroopIds.push(_troopId);
    }

    function _battleBaseModule(uint256 _troopId, Position memory _targetPos) internal {
        Troop memory _troop = gs().troopIdMap[_troopId];
        require(Util._withinDist(_troop.pos, _targetPos, 1), "CURIO: Target not in firing range");
        gs().troopIdMap[_troopId].lastLargeActionTaken = block.timestamp;

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        require(_targetTile.baseId != NULL, "CURIO: No target to attack");

        Base memory _targetBase = gs().baseIdMap[_targetTile.baseId];
        require(_targetBase.owner != msg.sender, "CURIO: Cannot attack own base");
        require(Util._isLandTroop(_troop.troopTypeId) || _targetBase.health > 0 || _targetBase.name == BASE_NAME.OIL_WELL, "CURIO: Can only capture base with land troop");

        // Exchange fire until one side dies
        uint256 _salt = 0;
        while (_troop.health > 0) {
            // Troop attacks target
            _salt += 1;
            if (Util._strike(_targetBase.attackFactor, _salt)) {
                uint256 _damagePerHit = Util._getDamagePerHit(_troop.troopTypeId);
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
                if (_troop.health > 1) {
                    _troop.health -= 1;
                } else {
                    _troop.health = 0;
                    Util._removeTroop(_troopId);
                    emit Util.Death(msg.sender, _troopId);
                }
            }
        }

        if (_targetBase.health == 0) {
            // Target base dies
            address _targetPlayer = _targetBase.owner;
            gs().troopIdMap[_troopId].health = _troop.health;
            gs().baseIdMap[_targetTile.baseId].health = 0;

            // Capture and move onto base if troop is infantry or if base is oil well
            if (Util._isLandTroop(_troop.troopTypeId) || _targetBase.name == BASE_NAME.OIL_WELL) {
                require(Util._getPlayer(msg.sender).numOwnedBases < gs().worldConstants.maxBaseCountPerPlayer, "CURIO: Max base count exceeded");

                _targetBase = Util._getBase(_targetTile.baseId);
                gs().baseIdMap[_targetTile.baseId].owner = msg.sender;
                gs().baseIdMap[_targetTile.baseId].health = 1;
                emit Util.BaseCaptured(msg.sender, _troopId, _targetTile.baseId);

                Util._updatePlayerBalances(_targetPlayer);
                Util._updatePlayerBalances(msg.sender);
                if (_targetPlayer != NULL_ADDR) {
                    gs().playerMap[_targetPlayer].numOwnedBases--;
                    gs().playerMap[_targetPlayer].totalGoldGenerationPerUpdate -= _targetBase.goldGenerationPerSecond;
                    gs().playerMap[_targetPlayer].totalOilGenerationPerUpdate -= _targetBase.oilGenerationPerSecond;
                }
                gs().playerMap[msg.sender].numOwnedBases++;
                gs().playerMap[msg.sender].totalGoldGenerationPerUpdate += _targetBase.goldGenerationPerSecond;
                gs().playerMap[msg.sender].totalOilGenerationPerUpdate += _targetBase.oilGenerationPerSecond;

                // Move
                _moveModule(_troopId, _targetPos);
            } else {
                emit Util.AttackedBase(msg.sender, _troopId, _troop, _targetTile.baseId, _targetBase);
            }
        } else {
            // Troop dies
            gs().baseIdMap[_targetTile.baseId].health = _targetBase.health;
            _targetBase = Util._getBase(_targetTile.baseId);

            emit Util.AttackedBase(msg.sender, _troopId, _troop, _targetTile.baseId, _targetBase);
        }
    }

    function _battleTroopModule(uint256 _troopId, Position memory _targetPos) internal {
        Troop memory _troop = gs().troopIdMap[_troopId];
        require(Util._withinDist(_troop.pos, _targetPos, 1), "CURIO: Target not in firing range");
        gs().troopIdMap[_troopId].lastLargeActionTaken = block.timestamp;

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        Troop memory _targetTroop;

        _targetTroop = gs().troopIdMap[_targetTile.occupantId];
        require(_targetTroop.owner != msg.sender, "CURIO: Cannot attack own troop");

        // Exchange fire until one side dies
        uint256 _salt = 0;
        while (_troop.health > 0) {
            // Troop attacks target
            _salt += 1;
            if (Util._strike(Util._getAttackFactor(_targetTroop.troopTypeId), _salt)) {
                uint256 _damagePerHit = Util._getDamagePerHit(_troop.troopTypeId);
                if (_damagePerHit < _targetTroop.health) {
                    _targetTroop.health -= _damagePerHit;
                } else {
                    _targetTroop.health = 0;
                    Util._removeTroop(_targetTile.occupantId);
                    emit Util.Death(_targetTroop.owner, _targetTile.occupantId);
                }
            }

            if (_targetTroop.health == 0) break; // target cannot attack back if it has zero health

            // Target attacks troop
            _salt += 1;
            if (Util._strike(Util._getDefenseFactor(_targetTroop.troopTypeId), _salt)) {
                if (Util._getDamagePerHit(_targetTroop.troopTypeId) < _troop.health) {
                    _troop.health -= Util._getDamagePerHit(_targetTroop.troopTypeId);
                } else {
                    _troop.health = 0;
                    Util._removeTroop(_troopId);
                    emit Util.Death(msg.sender, _troopId);
                }
            }
        }

        if (_targetTroop.health == 0) {
            // Target troop dies
            gs().troopIdMap[_troopId].health = _troop.health;
            _troop = Util._getTroop(_troopId);

            _targetTroop = Util._getTroop(_targetTile.occupantId);

            emit Util.AttackedTroop(msg.sender, _troopId, _troop, _targetTile.occupantId, _targetTroop);
        } else {
            // Troop dies
            gs().troopIdMap[_targetTile.occupantId].health = _targetTroop.health;

            _targetTroop = Util._getTroop(_targetTile.occupantId);

            emit Util.AttackedTroop(msg.sender, _troopId, _troop, _targetTile.occupantId, _targetTroop);
        }
    }
}
