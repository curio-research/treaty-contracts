//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";

import {Util} from "contracts/libraries/GameUtil.sol";
import {BASE_NAME, Base, GameState, Player, Position, TERRAIN, Tile, Troop, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title March Modules library
/// @notice Contains all events as well as lower-level setters and getters
/// Module functions complete core tasks of a march action; main conditions are checked in March function

library MarchModules {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    function _moveModule(uint256 _troopId, Position memory _targetPos) internal {
        Troop memory _troop = gs().troopIdMap[_troopId];
        Tile memory _targetTile = Util._getTileAt(_targetPos);
        require(_troop.isUnderArmy == false, "CURIO: Remove this Troop from Army first");

        require((block.timestamp - _troop.lastMoved) >= Util._getMovementCooldown(_troop.troopTypeId), "CURIO: Moved too recently");

        // core functionality here: change location of troop(s) to target pos
        if (Util._getTroop(_targetTile.occupantId).cargoTroopIds.length == 0) {
            gs().map[_targetPos.x][_targetPos.y].occupantId = _troopId;
            // if _troop is an army, move all troops under it
            if (!Util._isBasicTroop(_troop.troopTypeId)) {
                uint256[] memory _armyTroopIds = Util._getArmyTroopIds(_troopId);
                for (uint256 i = 0; i < _armyTroopIds.length; i++) {
                    gs().troopIdMap[_armyTroopIds[i]].pos = _targetPos;
                }
            }
        }

        Tile memory _sourceTile = Util._getTileAt(_troop.pos);
        if (_sourceTile.occupantId != _troopId) {
            // Troop is on troop transport
            Util._unloadTroopFromTransport(_sourceTile.occupantId, _troopId);
        } else {
            gs().map[_troop.pos.x][_troop.pos.y].occupantId = Util._NULL();
        }
        gs().troopIdMap[_troopId].pos = _targetPos;
        gs().troopIdMap[_troopId].lastMoved = block.timestamp;

        uint256[] memory _cargoTroopIds = gs().troopIdMap[_troopId].cargoTroopIds;
        if (_cargoTroopIds.length > 0) {
            // Troop is a troop transport — move its cargo troops
            for (uint256 i = 0; i < _cargoTroopIds.length; i++) {
                gs().troopIdMap[_cargoTroopIds[i]].pos = _targetPos;
            }
        }

        Util._updatePlayerBalances(msg.sender);

        emit Util.Moved(msg.sender, _troopId, block.timestamp, _troop.pos, _targetPos);
    }

    function _loadModule(uint256 _troopId, Position memory _targetPos) internal {
        Tile memory _targetTile = Util._getTileAt(_targetPos);
        Troop memory _troop = gs().troopIdMap[_troopId];
        uint256[] memory _cargoTroopIds = gs().troopIdMap[_targetTile.occupantId].cargoTroopIds;
        Troop memory _FirstTroopOnTransport = gs().troopIdMap[_cargoTroopIds[0]];

        if (Util._isBasicTroop(_troop.troopTypeId)) {
            require(Util._isBasicTroop(_FirstTroopOnTransport.troopTypeId), "CURIO: Transport can only load one Army");
            // Load troop onto troop transport at target tile
            gs().troopIdMap[_targetTile.occupantId].cargoTroopIds.push(_troopId);
        } else {
            require(_cargoTroopIds.length == 0, "CURIO: Transport can only load one Army");
            // Load troop onto troop transport at target tile
            gs().troopIdMap[_targetTile.occupantId].cargoTroopIds.push(_troopId);
        }
    }

    function _battleBaseModule(uint256 _troopId, Position memory _targetPos) internal {
        Troop memory _troop = gs().troopIdMap[_troopId];
        require(Util._withinDist(_troop.pos, _targetPos, 1), "CURIO: Target not in firing range");
        gs().troopIdMap[_troopId].lastLargeActionTaken = block.timestamp;

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        require(_targetTile.baseId != Util._NULL(), "CURIO: No target to attack");

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
                if (_targetPlayer != address(0)) {
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
