//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {BASE_NAME, GameState, Position, TERRAIN, Tile, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/Component.sol";

/// @title EngineModules library
/// @notice Composable parts for engine functions
/// functions generally do not verify correctness of conditions. Make sure to verify in higher-level checkers.
/// Note: This file should not have any occurrences of `msg.sender`. Pass in player addresses to use them.

library GameModules {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    // ----------------------------------------------------------------------
    // MODULES FOR MARCH
    // ----------------------------------------------------------------------

    function _moveArmy(
        uint256 _playerEntity,
        uint256 _armyEntity,
        Position memory _targetPosition
    ) public {
        require(GameLib._withinDistance(ECSLib._getPosition("Position", _armyEntity), _targetPosition, 1), "CURIO: Destination too far");

        uint256[] memory _troopEntities = GameLib._getArmyTroopEntities(_armyEntity);
        require((block.timestamp - ECSLib._getUint("LastMoved", _armyEntity)) >= GameLib._getArmyMovementCooldown(_troopEntities), "CURIO: Moved too recently");
        ECSLib._setUint("LastMoved", _armyEntity, block.timestamp);

        ECSLib._setPosition("Position", _armyEntity, _targetPosition);
    }

    function _battleBase(
        uint256 _playerEntity,
        uint256 _armyEntity,
        Position memory _targetPosition
    ) public {
        require(GameLib._withinDistance(ECSLib._getPosition("Position", _armyEntity), _targetPosition, 1), "CURIO: Target not in firing range");
        ECSLib._setUint("LastLargeActionTaken", _armyEntity, block.timestamp);

        uint256 _targetBaseId = GameLib._getBaseAt(_targetPosition);
        require(_targetBaseId != _NULL(), "CURIO: No target to attack");

        uint256 _targetPlayerId = ECSLib._getUint("OwnerEntity", _targetBaseId);
        require(_targetPlayerId != _playerEntity, "CURIO: Cannot attack own base");

        uint256[] memory _armyTroopEntities = GameLib._getArmyTroopEntities(_armyEntity);
        uint256 _armyHealth = GameLib._getArmyHealth(_armyTroopEntities);
        uint256 _targetBaseHealth = ECSLib._getUint("Health", _targetBaseId);

        uint256 _salt = 1;
        while (_armyHealth > 0) {
            // Troop attacks target
            _salt++;
            if (GameLib._strike(GameLib._getArmyAttackFactor(_armyTroopEntities), _salt)) {
                GameLib._updatePlayerBalances(_playerEntity);
                uint256 _damagePerHit;
                if (Component(gs().components["IsDebuffed"]).has(_playerEntity)) {
                    _damagePerHit = GameLib._getDebuffedArmyDamagePerHit(_armyTroopEntities);
                } else {
                    _damagePerHit = GameLib._getArmyDamagePerHit(_armyTroopEntities);
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
            if (GameLib._strike(ECSLib._getUint("DefenseFactor", _targetBaseId), _salt)) {
                if (_armyHealth > 100) {
                    _armyHealth -= 100;
                } else {
                    _armyHealth = 0;
                    GameLib._removeArmyWithTroops(_armyEntity);
                }
            }
        }

        if (_targetBaseHealth == 0) {
            // Target base dies

            ECSLib._setUint("Health", _targetBaseId, 0);

            uint256 _damageToDistribute = GameLib._getArmyHealth(_armyTroopEntities) - _armyHealth;
            GameLib._damageArmy(_damageToDistribute, _armyTroopEntities);

            // Capture and move onto base
            require(GameLib._getPlayerBases(_playerEntity).length < gs().worldConstants.maxBaseCountPerPlayer, "CURIO: Max base count exceeded");

            ECSLib._setUint("OwnerEntity", _targetBaseId, _playerEntity);
            ECSLib._setUint("Health", _targetBaseId, 800);

            GameLib._updatePlayerBalances(_targetPlayerId);
            GameLib._updatePlayerBalances(_playerEntity);

            int256 _baseGoldPerSecond = ECSLib._getInt("GoldPerSecond", _targetBaseId);
            int256 _baseOilPerSecond = ECSLib._getInt("OilPerSecond", _targetBaseId);

            if (_targetPlayerId != _NULL()) {
                int256 _targetPlayerGoldPerSecond = ECSLib._getInt("GoldPerSecond", _targetPlayerId);
                int256 _targetPlayerOilPerSecond = ECSLib._getInt("OilPerSecond", _targetPlayerId);
                ECSLib._setInt("GoldPerSecond", _targetPlayerId, _targetPlayerGoldPerSecond - _baseGoldPerSecond);
                ECSLib._setInt("OilPerSecond", _targetPlayerId, _targetPlayerOilPerSecond - _baseOilPerSecond);
            }
            int256 _playerGoldPerSecond = ECSLib._getInt("GoldPerSecond", _playerEntity);
            int256 _playerOilPerSecond = ECSLib._getInt("OilPerSecond", _playerEntity);
            ECSLib._setInt("GoldPerSecond", _playerEntity, _playerGoldPerSecond + _baseGoldPerSecond);
            ECSLib._setInt("OilPerSecond", _playerEntity, _playerOilPerSecond + _baseOilPerSecond);

            // Move
            _moveArmy(_playerEntity, _armyEntity, _targetPosition);
        } else {
            // Troop dies

            ECSLib._setUint("Health", _targetBaseId, _targetBaseHealth);
        }
    }

    function _battleArmy(
        uint256 _playerEntity,
        uint256 _armyEntity,
        Position memory _targetPosition
    ) public {
        require(GameLib._withinDistance(ECSLib._getPosition("Position", _armyEntity), _targetPosition, 1), "CURIO: Target not in firing range");
        ECSLib._setUint("LastLargeActionTaken", _armyEntity, block.timestamp);

        uint256 _targetArmyId = GameLib._getArmyAt(_targetPosition);
        require(_targetArmyId != _NULL(), "CURIO: No target to attack");

        uint256 _targetPlayerId = ECSLib._getUint("OwnerEntity", _targetArmyId);
        require(_targetPlayerId != _playerEntity, "CURIO: Cannot attack own base");

        uint256[] memory _armyTroopEntities = GameLib._getArmyTroopEntities(_armyEntity);
        uint256[] memory _targetArmyTroopIds = GameLib._getArmyTroopEntities(_targetArmyId);
        uint256 _armyHealth = GameLib._getArmyHealth(_armyTroopEntities);
        uint256 _targetArmyHealth = GameLib._getArmyHealth(_targetArmyTroopIds);

        uint256 _salt = 1;
        uint256 _damagePerHit;
        while (_armyHealth > 0) {
            // Troop attacks target
            _salt += 1;
            if (GameLib._strike(GameLib._getArmyAttackFactor(_armyTroopEntities), _salt)) {
                if (ECSLib._getComponent("IsDebuffed").has(_playerEntity)) {
                    _damagePerHit = GameLib._getDebuffedArmyDamagePerHit(_armyTroopEntities);
                } else {
                    _damagePerHit = GameLib._getArmyDamagePerHit(_armyTroopEntities);
                }

                if (_damagePerHit < _targetArmyHealth) {
                    _targetArmyHealth -= _damagePerHit;
                } else {
                    _targetArmyHealth = 0;
                    GameLib._removeArmyWithTroops(_targetArmyId);
                }
            }

            if (_targetArmyHealth == 0) break; // target cannot attack back if it has zero health

            // Target attacks Army
            _salt += 1;
            if (GameLib._strike(GameLib._getArmyDefenseFactor(_targetArmyTroopIds), _salt)) {
                if (ECSLib._getComponent("IsDebuffed").has(_playerEntity)) {
                    _damagePerHit = GameLib._getDebuffedArmyDamagePerHit(_targetArmyTroopIds);
                } else {
                    _damagePerHit = GameLib._getArmyDamagePerHit(_targetArmyTroopIds);
                }

                if (_damagePerHit < _armyHealth) {
                    _armyHealth -= _damagePerHit;
                } else {
                    _armyHealth = 0;
                    GameLib._removeArmyWithTroops(_armyEntity);
                }
            }
        }

        // enemy army died
        if (_targetArmyHealth == 0) {
            uint256 _damageToDistribute = GameLib._getArmyHealth(_armyTroopEntities) - _armyHealth;
            GameLib._damageArmy(_damageToDistribute, _armyTroopEntities);
        } else {
            uint256 _damageToDistribute = GameLib._getArmyHealth(_targetArmyTroopIds) - _targetArmyHealth;
            GameLib._damageArmy(_damageToDistribute, _targetArmyTroopIds);
        }
    }

    // Check if all troops in army are compatible with tile terrain
    function _geographicCheckArmy(uint256 _armyEntity, Position memory _position) public returns (bool) {
        Tile memory _tile = GameLib._getTileAt(_position);

        if (_tile.terrain == TERRAIN.WATER) return true; // water tiles are accessible to any troop
        uint256 _baseEntity = GameLib._getBaseAt(_position);
        if (_baseEntity != _NULL() && GameLib._strEq(ECSLib._getString("Tag", _baseEntity), "Port")) return true; // ports are accessible to any troop // FIXME: type mismatch

        uint256[] memory _troopEntities = GameLib._getArmyTroopEntities(_armyEntity);
        for (uint256 i = 0; i < _troopEntities.length; i++) {
            if (!ECSLib._getComponent("CanMoveOnLand").has(_troopEntities[i])) return false;
        }

        return true;
    }

    // Check if troop is compatible with tile terrain
    function _geographicCheckTroop(uint256 _troopEntity, Position memory _position) public returns (bool) {
        Tile memory _tile = GameLib._getTileAt(_position);

        if (_tile.terrain == TERRAIN.WATER) return true; // water tiles are accessible to any troop
        uint256 _baseEntity = GameLib._getBaseAt(_position);
        if (_baseEntity != _NULL() && GameLib._strEq(ECSLib._getString("Tag", _baseEntity), "Port")) return true; // ports are accessible to any troop

        if (ECSLib._getComponent("CanMoveOnLand").has(_troopEntity)) return true; // infantries can move anywhere

        return false;
    }

    function _NULL() internal pure returns (uint256) {
        return 0;
    }
}
