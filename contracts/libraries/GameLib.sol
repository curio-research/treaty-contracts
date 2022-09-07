//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {BASE_NAME, ComponentSpec, GameState, Position, TERRAIN, Tile, VALUE_TYPE, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Set} from "contracts/Set.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent} from "contracts/TypedComponents.sol";

/// @title Util library
/// @notice Contains all events as well as lower-level setters and getters
/// Util functions generally do not verify correctness of conditions. Make sure to verify in higher-level functions such as those in Engine.
/// Note: This file should not have any occurrences of `msg.sender`. Pass in player addresses to use them.

library GameLib {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    event GamePaused();
    event GameResumed();

    // ----------------------------------------------------------
    // LOGIC SETTERS
    // ----------------------------------------------------------

    function _registerComponents(address _gameAddr, ComponentSpec[] memory _componentSpecs) public {
        string[] memory _componentNames = new string[](_componentSpecs.length);

        for (uint256 i = 0; i < _componentSpecs.length; i++) {
            ComponentSpec memory _spec = _componentSpecs[i];
            _componentNames[i] = _spec.name;

            // Create corresponding typed component and register its address
            address _addr;
            if (_spec.valueType == VALUE_TYPE.ADDRESS) {
                _addr = address(new AddressComponent(_gameAddr));
            } else if (_spec.valueType == VALUE_TYPE.BOOL) {
                _addr = address(new BoolComponent(_gameAddr));
            } else if (_spec.valueType == VALUE_TYPE.INT) {
                _addr = address(new IntComponent(_gameAddr));
            } else if (_spec.valueType == VALUE_TYPE.POSITION) {
                _addr = address(new PositionComponent(_gameAddr));
            } else if (_spec.valueType == VALUE_TYPE.STRING) {
                _addr = address(new StringComponent(_gameAddr));
            } else if (_spec.valueType == VALUE_TYPE.UINT) {
                _addr = address(new UintComponent(_gameAddr));
            } else {
                _addr = address(new Component(_gameAddr));
            }
            gs().components[_spec.name] = _addr;

            // Record identifier entity for component
            uint256 _componentEntity = ECSLib._addEntity();
            ECSLib._setBool("IsComponent", _componentEntity);
            gs().ComponentEntityToAddress[_componentEntity] = _addr;

            emit ECSLib.NewComponent(_spec.name, _componentEntity);
        }

        // Update component names for iteration
        gs().componentNames = _componentNames;
    }

    function _initializeTile(Position memory _position) public {
        WorldConstants memory _worldConstants = gs().worldConstants;
        uint256 _batchSize = _worldConstants.initBatchSize;
        uint256 _numInitTerrainTypes = _worldConstants.numInitTerrainTypes;

        uint256 _encodedCol = gs().encodedColumnBatches[_position.x][_position.y / _batchSize] % (_numInitTerrainTypes**((_position.y % _batchSize) + 1));
        uint256 _divFactor = _numInitTerrainTypes**(_position.y % _batchSize);
        uint256 _terrainEntity = _encodedCol / _divFactor;

        // Add base
        if (_terrainEntity >= 3) {
            uint256 _baseEntity = ECSLib._addEntity();
            ECSLib._setBool("IsActive", _baseEntity);
            ECSLib._setPosition("Position", _baseEntity, _position);
            ECSLib._setUint("Health", _baseEntity, 1);
            ECSLib._setBool("CanAttack", _baseEntity);
            ECSLib._setBool("CanPurchase", _baseEntity);
            ECSLib._setUint("AttackFactor", _baseEntity, 100);
            ECSLib._setUint("DefenseFactor", _baseEntity, 100);
            if (_terrainEntity == 3) {
                // Port
                ECSLib._setString("Tag", _baseEntity, "Port");
                ECSLib._setInt("GoldPerSecond", _baseEntity, int256(_worldConstants.defaultBaseGoldGenerationPerSecond));
                _terrainEntity = 0;
            } else if (_terrainEntity == 4) {
                // City
                ECSLib._setString("Tag", _baseEntity, "City");
                ECSLib._setInt("GoldPerSecond", _baseEntity, int256(_worldConstants.defaultBaseGoldGenerationPerSecond));
                _terrainEntity = 1;
            } else if (_terrainEntity == 5) {
                // Oil well
                ECSLib._setString("Tag", _baseEntity, "Oil Well");
                ECSLib._setInt("OilPerSecond", _baseEntity, int256(_worldConstants.defaultWellOilGenerationPerSecond));
                _terrainEntity = 1;
            }
        }

        // Update terrain
        gs().map[_position.x][_position.y].isInitialized = true;
        gs().map[_position.x][_position.y].terrain = TERRAIN(_terrainEntity);
    }

    function _addArmy(uint256 _playerEntity, Position memory _position) public returns (uint256) {
        uint256 _armyEntity = ECSLib._addEntity();
        ECSLib._setUint("OwnerEntity", _armyEntity, _playerEntity);
        ECSLib._setString("Tag", _armyEntity, "Army");
        ECSLib._setUint("LastMoved", _armyEntity, block.timestamp);
        ECSLib._setUint("LastLargeActionTaken", _armyEntity, 0);
        ECSLib._setUint("LastRepaired", _armyEntity, block.timestamp);
        ECSLib._setPosition("Position", _armyEntity, _position);
        ECSLib._setBool("IsArmy", _armyEntity);

        return _armyEntity;
    }

    function _addTroop(
        uint256 _playerEntity,
        uint256 _troopTemplateEntity,
        uint256 _armyEntity
    ) public returns (uint256) {
        // 1. Get number of player-owned troops and verify size
        uint256 _playerTroopCount = _getPlayerTroops(_playerEntity).length;
        require(_playerTroopCount < gs().worldConstants.maxTroopCountPerPlayer, "CURIO: Max troop count exceeded");

        // 2. Create new troop entity globally and in corresponding components
        uint256 _troopEntity = ECSLib._addEntity();
        // troop fields
        ECSLib._setBool("IsActive", _troopEntity);
        ECSLib._setUint("OwnerEntity", _troopEntity, _playerEntity);
        ECSLib._setUint("ArmyEntity", _troopEntity, _armyEntity);
        ECSLib._setUint("Health", _troopEntity, ECSLib._getUint("MaxHealth", _troopTemplateEntity));
        ECSLib._setBool("CanMove", _troopEntity);
        ECSLib._setBool("CanAttack", _troopEntity);
        ECSLib._setBool("CanCapture", _troopEntity);
        // troop type fields
        ECSLib._setString("Tag", _troopEntity, ECSLib._getString("Tag", _troopTemplateEntity));
        if (ECSLib._getComponent("CanMoveOnLand").has(_troopTemplateEntity)) ECSLib._setBool("CanMoveOnLand", _troopEntity);
        ECSLib._setUint("MaxHealth", _troopEntity, ECSLib._getUint("MaxHealth", _troopTemplateEntity));
        ECSLib._setUint("DamagePerHit", _troopEntity, ECSLib._getUint("DamagePerHit", _troopTemplateEntity));
        ECSLib._setUint("AttackFactor", _troopEntity, ECSLib._getUint("AttackFactor", _troopTemplateEntity));
        ECSLib._setUint("DefenseFactor", _troopEntity, ECSLib._getUint("DefenseFactor", _troopTemplateEntity));
        ECSLib._setUint("MovementCooldown", _troopEntity, ECSLib._getUint("MovementCooldown", _troopTemplateEntity));
        ECSLib._setUint("LargeActionCooldown", _troopEntity, ECSLib._getUint("LargeActionCooldown", _troopTemplateEntity));
        // resource fields
        int256 _oilPerSecond = ECSLib._getInt("OilPerSecond", _troopTemplateEntity);
        ECSLib._setInt("OilPerSecond", _troopEntity, _oilPerSecond);

        // 3. Update balances
        _updatePlayerBalances(_playerEntity);
        int256 _playerOilPerSecond = ECSLib._getInt("OilPerSecond", _playerEntity);
        ECSLib._setInt("OilPerSecond", _playerEntity, _playerOilPerSecond + _oilPerSecond);

        return _troopEntity;
    }

    function _removeTroop(uint256 _troopEntity) public {
        uint256 _playerEntity = ECSLib._getUint("OwnerEntity", _troopEntity);
        int256 _oilPerSecond = ECSLib._getInt("OilPerSecond", _troopEntity);

        ECSLib._removeEntity(_troopEntity);

        _updatePlayerBalances(_playerEntity);
        int256 _playerOilPerSecond = ECSLib._getInt("OilPerSecond", _playerEntity);
        ECSLib._setInt("OilPerSecond", _playerEntity, _playerOilPerSecond - _oilPerSecond);
    }

    function _removeArmy(uint256 _armyEntity) public {
        ECSLib._removeEntity(_armyEntity);
    }

    function _updatePlayerBalances(uint256 _playerEntity) public {
        uint256 _balanceLastUpdated = ECSLib._getUint("BalanceLastUpdated", _playerEntity);
        uint256 _timeElapsed = block.timestamp - _balanceLastUpdated;

        // Update gold balance
        uint256 _gold = ECSLib._getUint("Gold", _playerEntity);
        int256 _goldPerSecond = ECSLib._getInt("GoldPerSecond", _playerEntity);
        ECSLib._setUint("Gold", _playerEntity, uint256(int256(_gold) + _goldPerSecond * int256(_timeElapsed)));

        // Update oil balance
        uint256 _oil = ECSLib._getUint("Oil", _playerEntity);
        int256 _oilPerSecond = ECSLib._getInt("OilPerSecond", _playerEntity);
        ECSLib._setUint("Oil", _playerEntity, uint256(int256(_oil) + _oilPerSecond * int256(_timeElapsed)));

        // Update debuff status based on oil rate
        if (_oilPerSecond >= 0) {
            ECSLib._removeBool("IsDebuffed", _playerEntity);
        } else {
            ECSLib._setBool("IsDebuffed", _playerEntity);
        }

        ECSLib._setUint("BalanceLastUpdated", _playerEntity, block.timestamp);
    }

    function _removeArmyWithTroops(uint256 _armyEntity) public {
        _removeArmy(_armyEntity);
        uint256[] memory _troopEntities = _getArmyTroopEntities(_armyEntity);
        for (uint256 i = 0; i < _troopEntities.length; i++) {
            _removeTroop(_troopEntities[i]);
        }
    }

    function _damageArmy(uint256 _totalDamage, uint256[] memory _armyTroopEntities) public {
        uint256 _individualDamage = _totalDamage / _armyTroopEntities.length;
        uint256 _remainingDamage = _totalDamage % _armyTroopEntities.length;

        for (uint256 i = 0; i < _armyTroopEntities.length; i++) {
            uint256 _damage = _remainingDamage > 0 ? _individualDamage + 1 : _individualDamage;
            _damageTroop(_damage, _armyTroopEntities[i]);
            if (_remainingDamage > 0) _remainingDamage--;
        }
    }

    function _damageTroop(uint256 _damage, uint256 _troopEntity) public {
        uint256 _health = ECSLib._getUint("Health", _troopEntity);

        if (_damage >= _health) {
            uint256 _armyEntity = ECSLib._getUint("ArmyEntity", _troopEntity);
            if (UintComponent(gs().components["ArmyEntity"]).getEntitiesWithValue(_armyEntity).length == 1) _removeArmy(_armyEntity);
            _removeTroop(_troopEntity);
        } else {
            ECSLib._setUint("Health", _troopEntity, _health - _damage);
        }
    }

    // ----------------------------------------------------------
    // LOGIC GETTERS
    // ----------------------------------------------------------

    function _getNavies() public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getComponent("CanMove").getEntities());
        _set2.addArray(ECSLib._getComponent("CanMoveOnLand").getEntities());
        return ECSLib._difference(_set1, _set2);
    }

    function _getPlayerTroops(uint256 _playerEntity) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        uint256[] memory _entitiesOwnedByPlayer = UintComponent(gs().components["OwnerEntity"]).getEntitiesWithValue(_playerEntity);
        uint256[] memory _allTroops = ECSLib._getComponent("CanMove").getEntities();
        _set1.addArray(_entitiesOwnedByPlayer);
        _set2.addArray(_allTroops);
        return ECSLib._intersection(_set1, _set2);
    }

    function _getPlayerBases(uint256 _playerEntity) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getComponent("CanPurchase").getEntities());
        _set2.addArray(UintComponent(gs().components["OwnerEntity"]).getEntitiesWithValue(_playerEntity));
        return ECSLib._intersection(_set1, _set2);
    }

    function _getArmyAt(Position memory _position) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getComponent("IsArmy").getEntities());
        _set2.addArray(PositionComponent(gs().components["Position"]).getEntitiesWithValue(_position));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getBaseAt(Position memory _position) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getComponent("CanPurchase").getEntities());
        _set2.addArray(PositionComponent(gs().components["Position"]).getEntitiesWithValue(_position));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getArmyTroopEntities(uint256 _armyEntity) public view returns (uint256[] memory) {
        return UintComponent(gs().components["ArmyEntity"]).getEntitiesWithValue(_armyEntity);
    }

    function _getPlayerEntity(address _player) public view returns (uint256) {
        return gs().playerEntityMap[_player];
    }

    function _getInfantryPercentage(uint256[] memory _troopEntities) public view returns (uint256) {
        require(_troopEntities.length > 0, "CURIO: Cannot calculate percentage for zero troops");

        uint256 _percentagePerTroop = 100 / _troopEntities.length;
        uint256 _result = 0;

        for (uint256 i = 0; i < _troopEntities.length; i++) {
            if (ECSLib._getComponent("CanMoveOnLand").has(_troopEntities[i])) {
                _result += _percentagePerTroop;
            }
        }

        return _result;
    }

    function _getArmyHealth(uint256[] memory _troopEntities) public view returns (uint256) {
        // take the sum
        uint256 _totalHealth;

        for (uint256 i = 0; i < _troopEntities.length; i++) {
            _totalHealth += ECSLib._getUint("Health", _troopEntities[i]);
        }

        return _totalHealth;
    }

    function _getArmyMovementCooldown(uint256[] memory _troopEntities) public view returns (uint256) {
        // take the longest cooldown
        uint256 _longestMovementCooldown;

        for (uint256 i = 0; i < _troopEntities.length; i++) {
            uint256 _troopMovementCooldown = ECSLib._getUint("MovementCooldown", _troopEntities[i]);
            if (_troopMovementCooldown > _longestMovementCooldown) {
                _longestMovementCooldown = _troopMovementCooldown;
            }
        }
        return _longestMovementCooldown;
    }

    function _getArmyLargeActionCooldown(uint256[] memory _troopEntities) public view returns (uint256) {
        // take the longest cooldown
        uint256 _longestLargeActionCooldown;

        for (uint256 i = 0; i < _troopEntities.length; i++) {
            uint256 _troopLargeActionCooldown = ECSLib._getUint("LargeActionCooldown", _troopEntities[i]);
            if (_troopLargeActionCooldown > _longestLargeActionCooldown) {
                _longestLargeActionCooldown = _troopLargeActionCooldown;
            }
        }

        return _longestLargeActionCooldown;
    }

    function _getArmyAttackFactor(uint256[] memory _troopEntities) public view returns (uint256) {
        // take the average
        uint256 _averageAttackFactor;

        for (uint256 i = 0; i < _troopEntities.length; i++) {
            _averageAttackFactor += ECSLib._getUint("AttackFactor", _troopEntities[i]);
        }

        return _averageAttackFactor / _troopEntities.length;
    }

    function _getArmyDefenseFactor(uint256[] memory _troopEntities) public view returns (uint256) {
        // take the average
        uint256 _averageDefenseFactor;

        for (uint256 i = 0; i < _troopEntities.length; i++) {
            _averageDefenseFactor += ECSLib._getUint("DefenseFactor", _troopEntities[i]);
        }

        return _averageDefenseFactor / _troopEntities.length;
    }

    function _getArmyDamagePerHit(uint256[] memory _troopEntities) public view returns (uint256) {
        // take the sum
        uint256 _totalDamagePerHit = 0;

        for (uint256 i = 0; i < _troopEntities.length; i++) {
            _totalDamagePerHit += ECSLib._getUint("DamagePerHit", _troopEntities[i]);
        }

        return _totalDamagePerHit;
    }

    function _getDebuffedArmyDamagePerHit(uint256[] memory _troopEntities) public view returns (uint256) {
        uint256 _infantryPercentage = _getInfantryPercentage(_troopEntities);
        uint256 _debuffFactor = (gs().worldConstants.debuffFactor * (100 - _infantryPercentage)) / 100; // Only non-infantries are debuffed
        return (_getArmyDamagePerHit(_troopEntities) * (100 - _debuffFactor)) / 100;
    }

    function _getTileAt(Position memory _position) public view returns (Tile memory) {
        return gs().map[_position.x][_position.y];
    }

    function _getNeighbors(Position memory _position) public view returns (Position[] memory) {
        Position[] memory _result = new Position[](4); // FIXME: how to create and append to a dynamic array?
        uint256 _x = _position.x;
        uint256 _y = _position.y;

        if (_x > 0) _result[0] = (Position({x: _x - 1, y: _y}));
        if (_x < gs().worldConstants.worldWidth - 1) _result[1] = (Position({x: _x + 1, y: _y}));
        if (_y > 0) _result[2] = (Position({x: _x, y: _y - 1}));
        if (_y < gs().worldConstants.worldHeight - 1) _result[3] = (Position({x: _x, y: _y + 1}));

        return _result;
    }

    // ----------------------------------------------------------
    // UTILITY FUNCTIONS
    // ----------------------------------------------------------

    function _strike(uint256 _strikeFactor, uint256 _salt) public view returns (bool) {
        uint256 _rand = _random(100, _salt);
        return _rand * 100 < _strikeFactor * gs().worldConstants.combatEfficiency;
    }

    function _inBound(Position memory _p) public view returns (bool) {
        return _p.x >= 0 && _p.x < gs().worldConstants.worldWidth && _p.y >= 0 && _p.y < gs().worldConstants.worldHeight;
    }

    function _random(uint256 _max, uint256 _salt) public view returns (uint256) {
        return uint256(keccak256(abi.encode(block.timestamp, block.difficulty, _salt))) % _max;
    }

    function _coincident(Position memory _p1, Position memory _p2) public pure returns (bool) {
        return _p1.x == _p2.x && _p1.y == _p2.y;
    }

    // Note: The current version treats a diagonal movement as two movements.
    // For treating as one, use `xDist <= _dist && yDist <= _dist` as return condition.
    function _withinDistance(
        Position memory _p1,
        Position memory _p2,
        uint256 _dist
    ) public pure returns (bool) {
        uint256 _xDist = _p1.x >= _p2.x ? _p1.x - _p2.x : _p2.x - _p1.x;
        uint256 _yDist = _p1.y >= _p2.y ? _p1.y - _p2.y : _p2.y - _p1.y;
        return (_xDist + _yDist) <= _dist;
    }

    function _strEq(string memory _s1, string memory _s2) public pure returns (bool) {
        return (keccak256(abi.encodePacked((_s1))) == keccak256(abi.encodePacked((_s2))));
    }

    function _getIndex(uint256 _element, uint256[] memory _array) internal pure returns (uint256) {
        uint256 _index = 0;
        while (_index < _array.length) {
            if (_array[_index] == _element) break;
            _index++;
        }
        return _index;
    }

    function _NULL() internal pure returns (uint256) {
        return 0;
    }
}
