//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {BASE_NAME, GameState, Position, TERRAIN, Tile, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/Component.sol";

/// @title EngineModules library
/// @notice Composable parts for engine functions
/// functions generally do not verify correctness of conditions. Make sure to verify in higher-level checkers.
/// Note: This file should not have any occurrences of `msg.sender`. Pass in player addresses to use them.

library EngineModules {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    // ----------------------------------------------------------------------
    // MODULES FOR MARCH
    // ----------------------------------------------------------------------

    function _moveArmy(
        uint256 _playerId,
        uint256 _armyId,
        Position memory _targetPosition
    ) public {
        require(Util._withinDistance(Util._getPosition("Position", _armyId), _targetPosition, 1), "CURIO: Destination too far");

        uint256[] memory _troopIds = Util._getArmyTroops(_armyId);
        require((block.timestamp - Util._getUint("LastMoved", _armyId)) >= Util._getArmyMovementCooldown(_troopIds), "CURIO: Moved too recently");
        Util._setUint("LastMoved", _armyId, block.timestamp);

        Util._setPosition("Position", _armyId, _targetPosition);
    }

    function _battleBase(
        uint256 _playerId,
        uint256 _armyId,
        Position memory _targetPosition
    ) public {
        require(Util._withinDistance(Util._getPosition("Position", _armyId), _targetPosition, 1), "CURIO: Target not in firing range");
        Util._setUint("LastLargeActionTaken", _armyId, block.timestamp);

        uint256 _targetBaseId = Util._getBaseAt(_targetPosition);
        require(_targetBaseId != _NULL(), "CURIO: No target to attack");

        uint256 _targetPlayerId = Util._getUint("Owner", _targetBaseId);
        require(_targetPlayerId != _playerId, "CURIO: Cannot attack own base");

        uint256[] memory _armyTroopIds = Util._getArmyTroops(_armyId);
        uint256 _armyHealth = Util._getArmyHealth(_armyTroopIds);
        uint256 _targetBaseHealth = Util._getUint("Health", _targetBaseId);

        uint256 _salt = 1;
        while (_armyHealth > 0) {
            // Troop attacks target
            _salt++;
            if (Util._strike(Util._getArmyAttackFactor(_armyTroopIds), _salt)) {
                Util._updatePlayerBalances(_playerId);
                uint256 _damagePerHit;
                if (Component(gs().components["IsDebuffed"]).has(_playerId)) {
                    _damagePerHit = Util._getDebuffedArmyDamagePerHit(_armyTroopIds);
                } else {
                    _damagePerHit = Util._getArmyDamagePerHit(_armyTroopIds);
                }

                if (_damagePerHit < _targetBaseHealth) {
                    _targetBaseHealth -= _damagePerHit;
                } else {
                    _targetBaseHealth = 0;
                }
            }

            if (_targetBaseHealth == 0) break; // target cannot attack back if it has zero health

            // Target attacks troop
            _salt++;
            if (Util._strike(Util._getUint("DefenseFactor", _targetBaseId), _salt)) {
                if (_armyHealth > 100) {
                    _armyHealth -= 100;
                } else {
                    _armyHealth = 0;
                    Util._removeArmyWithTroops(_armyId);
                }
            }
        }

        if (_targetBaseHealth == 0) {
            // Target base dies

            Util._setUint("Health", _targetBaseId, 0);

            uint256 _damageToDistribute = Util._getArmyHealth(_armyTroopIds) - _armyHealth;
            Util._damageArmy(_damageToDistribute, _armyTroopIds);

            // Capture and move onto base
            require(Util._getPlayerBases(_playerId).length < gs().worldConstants.maxBaseCountPerPlayer, "CURIO: Max base count exceeded");

            Util._setUint("Owner", _targetBaseId, _playerId);
            Util._setUint("Health", _targetBaseId, 800);

            Util._updatePlayerBalances(_targetPlayerId);
            Util._updatePlayerBalances(_playerId);

            int256 _baseGoldPerSecond = Util._getInt("GoldPerSecond", _targetBaseId);
            int256 _baseOilPerSecond = Util._getInt("OilPerSecond", _targetBaseId);

            if (_targetPlayerId != _NULL()) {
                int256 _targetPlayerGoldPerSecond = Util._getInt("GoldPerSecond", _targetPlayerId);
                int256 _targetPlayerOilPerSecond = Util._getInt("OilPerSecond", _targetPlayerId);
                Util._setInt("GoldPerSecond", _targetPlayerId, _targetPlayerGoldPerSecond - _baseGoldPerSecond);
                Util._setInt("OilPerSecond", _targetPlayerId, _targetPlayerOilPerSecond - _baseOilPerSecond);
            }
            int256 _playerGoldPerSecond = Util._getInt("GoldPerSecond", _playerId);
            int256 _playerOilPerSecond = Util._getInt("OilPerSecond", _playerId);
            Util._setInt("GoldPerSecond", _playerId, _playerGoldPerSecond + _baseGoldPerSecond);
            Util._setInt("OilPerSecond", _playerId, _playerOilPerSecond + _baseOilPerSecond);

            // Move
            _moveArmy(_playerId, _armyId, _targetPosition);
        } else {
            // Troop dies

            Util._setUint("Health", _targetBaseId, _targetBaseHealth);
        }
    }

    function _battleArmy(
        uint256 _playerId,
        uint256 _armyId,
        Position memory _targetPosition
    ) public {
        require(Util._withinDistance(Util._getPosition("Position", _armyId), _targetPosition, 1), "CURIO: Target not in firing range");
        Util._setUint("LastLargeActionTaken", _armyId, block.timestamp);

        uint256 _targetArmyId = Util._getArmyAt(_targetPosition);
        require(_targetArmyId != _NULL(), "CURIO: No target to attack");

        uint256 _targetPlayerId = Util._getUint("Owner", _targetArmyId);
        require(_targetPlayerId != _playerId, "CURIO: Cannot attack own base");

        uint256[] memory _armyTroopIds = Util._getArmyTroops(_armyId);
        uint256[] memory _targetArmyTroopIds = Util._getArmyTroops(_targetArmyId);
        uint256 _armyHealth = Util._getArmyHealth(_armyTroopIds);
        uint256 _targetArmyHealth = Util._getArmyHealth(_targetArmyTroopIds);

        uint256 _salt = 1;
        uint256 _damagePerHit;
        while (_armyHealth > 0) {
            // Troop attacks target
            _salt += 1;
            if (Util._strike(Util._getArmyAttackFactor(_armyTroopIds), _salt)) {
                if (Util._getComponent("IsDebuffed").has(_playerId)) {
                    _damagePerHit = Util._getDebuffedArmyDamagePerHit(_armyTroopIds);
                } else {
                    _damagePerHit = Util._getArmyDamagePerHit(_armyTroopIds);
                }

                if (_damagePerHit < _targetArmyHealth) {
                    _targetArmyHealth -= _damagePerHit;
                } else {
                    _targetArmyHealth = 0;
                    Util._removeArmyWithTroops(_targetArmyId);
                }
            }

            if (_targetArmyHealth == 0) break; // target cannot attack back if it has zero health

            // Target attacks Army
            _salt += 1;
            if (Util._strike(Util._getArmyDefenseFactor(_targetArmyTroopIds), _salt)) {
                if (Util._getComponent("IsDebuffed").has(_playerId)) {
                    _damagePerHit = Util._getDebuffedArmyDamagePerHit(_targetArmyTroopIds);
                } else {
                    _damagePerHit = Util._getArmyDamagePerHit(_targetArmyTroopIds);
                }

                if (_damagePerHit < _armyHealth) {
                    _armyHealth -= _damagePerHit;
                } else {
                    _armyHealth = 0;
                    Util._removeArmyWithTroops(_armyId);
                }
            }
        }

        // enemy army died
        if (_targetArmyHealth == 0) {
            uint256 _damageToDistribute = Util._getArmyHealth(_armyTroopIds) - _armyHealth;
            Util._damageArmy(_damageToDistribute, _armyTroopIds);
        } else {
            uint256 _damageToDistribute = Util._getArmyHealth(_targetArmyTroopIds) - _targetArmyHealth;
            Util._damageArmy(_damageToDistribute, _targetArmyTroopIds);
        }
    }

    // Check if all troops in army are compatible with tile terrain
    function _geographicCheckArmy(uint256 _armyId, Position memory _position) public returns (bool) {
        Tile memory _tile = Util._getTileAt(_position);

        if (_tile.terrain == TERRAIN.WATER) return true; // water tiles are accessible to any troop
        uint256 _baseId = Util._getBaseAt(_position);
        if (_baseId != _NULL() && Util._strEq(Util._getString("Name", _baseId), "Port")) return true; // ports are accessible to any troop // FIXME: type mismatch

        uint256[] memory _troopIds = Util._getArmyTroops(_armyId);
        for (uint256 i = 0; i < _troopIds.length; i++) {
            if (!Util._getComponent("IsLandTroop").has(_troopIds[i])) return false;
        }

        return true;
    }

    // Check if troop is compatible with tile terrain
    function _geographicCheckTroop(uint256 _troopId, Position memory _position) public returns (bool) {
        Tile memory _tile = Util._getTileAt(_position);

        if (_tile.terrain == TERRAIN.WATER) return true; // water tiles are accessible to any troop
        uint256 _baseId = Util._getBaseAt(_position);
        if (_baseId != _NULL() && Util._strEq(Util._getString("Name", _baseId), "Port")) return true; // ports are accessible to any troop

        if (Util._getComponent("IsLandTroop").has(_troopId)) return true; // infantries can move anywhere

        return false;
    }

    function _NULL() internal pure returns (uint256) {
        return 0;
    }
}
