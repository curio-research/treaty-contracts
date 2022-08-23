//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {BASE_NAME, GameState, Position, TERRAIN, Tile, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/Component.sol";
import {Set} from "contracts/Set.sol";

/// @title Util library
/// @notice Contains all events as well as lower-level setters and getters
/// Util functions generally do not verify correctness of conditions. Make sure to verify in higher-level functions such as those in Engine.
/// Note: This file should not have any occurrences of `msg.sender`. Pass in player addresses to use them.

library Util {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    event NewEntity(uint256 _entity);
    event EntityRemoved(uint256 _entity);
    event NewComponent(string _name, uint256 _id);
    event ComponentValueSet(string _componentName, uint256 _entity, bytes _rawValue);
    event GamePaused();
    event GameResumed();

    // ----------------------------------------------------------
    // LOGIC SETTERS
    // ----------------------------------------------------------

    function _initializeTile(Position memory _position) public {
        WorldConstants memory _worldConstants = gs().worldConstants;
        uint256 _batchSize = _worldConstants.initBatchSize;
        uint256 _numInitTerrainTypes = _worldConstants.numInitTerrainTypes;

        uint256 _encodedCol = gs().encodedColumnBatches[_position.x][_position.y / _batchSize] % (_numInitTerrainTypes**((_position.y % _batchSize) + 1));
        uint256 _divFactor = _numInitTerrainTypes**(_position.y % _batchSize);
        uint256 _terrainId = _encodedCol / _divFactor;

        // Add base
        if (_terrainId >= 3) {
            uint256 _baseId = _addEntity();
            _setComponentValue("IsActive", _baseId, abi.encode(true));
            _setComponentValue("Position", _baseId, abi.encode(_position));
            _setComponentValue("Health", _baseId, abi.encode(1));
            _setComponentValue("CanAttack", _baseId, abi.encode(true));
            _setComponentValue("CanPurchase", _baseId, abi.encode(true));
            _setComponentValue("AttackFactor", _baseId, abi.encode(100));
            _setComponentValue("DefenseFactor", _baseId, abi.encode(100));
            if (_terrainId == 3) {
                // Port
                _setComponentValue("Name", _baseId, abi.encode(BASE_NAME.PORT));
                _setComponentValue("GoldPerSecond", _baseId, abi.encode(_worldConstants.defaultBaseGoldGenerationPerSecond));
                _terrainId = 0;
            } else if (_terrainId == 4) {
                // City
                _setComponentValue("Name", _baseId, abi.encode(BASE_NAME.CITY));
                _setComponentValue("GoldPerSecond", _baseId, abi.encode(_worldConstants.defaultBaseGoldGenerationPerSecond));
                _terrainId = 1;
            } else if (_terrainId == 5) {
                // Oil well
                _setComponentValue("Name", _baseId, abi.encode(BASE_NAME.OIL_WELL));
                _setComponentValue("OilPerSecond", _baseId, abi.encode(_worldConstants.defaultWellOilGenerationPerSecond));
                _terrainId = 1;
            }
        }

        // Update terrain
        gs().map[_position.x][_position.y].isInitialized = true;
        gs().map[_position.x][_position.y].terrain = TERRAIN(_terrainId);
    }

    function _addArmy(uint256 _playerId, Position memory _position) public returns (uint256) {
        uint256 _armyId = _addEntity();
        _setComponentValue("Owner", _armyId, abi.encode(_playerId));
        _setComponentValue("LastMoved", _armyId, abi.encode(block.timestamp));
        _setComponentValue("LastLargeActionTaken", _armyId, abi.encode(0));
        _setComponentValue("LastRepaired", _armyId, abi.encode(block.timestamp));
        _setComponentValue("Position", _armyId, abi.encode(_position));
        _setComponentValue("CanMove", _armyId, abi.encode(true));
        _setComponentValue("CanAttack", _armyId, abi.encode(true));
        _setComponentValue("CanCapture", _armyId, abi.encode(true));

        return _armyId;
    }

    function _addTroop(
        uint256 _playerId,
        uint256 _troopTemplateId,
        uint256 _armyId
    ) public returns (uint256) {
        // 1. Get number of player-owned troops and verify size
        uint256 _playerTroopCount = _getPlayerTroops(_playerId).length;
        require(_playerTroopCount < gs().worldConstants.maxTroopCountPerPlayer, "CURIO: Max troop count exceeded");

        // 2. Create new troop entity globally and in corresponding components
        uint256 _troopId = _addEntity();
        // troop fields
        _setComponentValue("IsActive", _troopId, abi.encode(true));
        _setComponentValue("Owner", _troopId, abi.encode(_playerId));
        _setComponentValue("ArmyId", _troopId, abi.encode(_armyId));
        _setComponentValue("Health", _troopId, _getComponentValue("MaxHealth", _troopTemplateId));
        // troop type fields
        _setComponentValue("Name", _troopId, _getComponentValue("Name", _troopTemplateId));
        if (_getComponent("IsLandTroop").has(_troopTemplateId)) {
            _setComponentValue("IsLandTroop", _troopId, abi.encode(true));
        }
        _setComponentValue("MaxHealth", _troopId, _getComponentValue("MaxHealth", _troopTemplateId));
        _setComponentValue("DamagePerHit", _troopId, _getComponentValue("DamagePerHit", _troopTemplateId));
        _setComponentValue("AttackFactor", _troopId, _getComponentValue("AttackFactor", _troopTemplateId));
        _setComponentValue("DefenseFactor", _troopId, _getComponentValue("DefenseFactor", _troopTemplateId));
        _setComponentValue("MovementCooldown", _troopId, _getComponentValue("MovementCooldown", _troopTemplateId));
        _setComponentValue("LargeActionCooldown", _troopId, _getComponentValue("LargeActionCooldown", _troopTemplateId));
        Component _cargoCapacityComponent = _getComponent("CargoCapacity");
        if (_cargoCapacityComponent.has(_troopTemplateId)) {
            _setComponentValue("CargoCapacity", _troopId, _cargoCapacityComponent.getRawValue(_troopTemplateId));
        }
        // resource fields
        int256 _goldCost = abi.decode(_getComponentValue("Gold", _troopTemplateId), (int256));
        int256 _oilPerSecond = abi.decode(_getComponentValue("OilPerSecond", _troopTemplateId), (int256));
        _setComponentValue("OilPerSecond", _troopId, abi.encode(_oilPerSecond));

        // 3. Update balances
        _updatePlayerBalances(_playerId);
        int256 _playerGoldBalance = abi.decode(_getComponentValue("Gold", _playerId), (int256));
        int256 _playerOilPerSecond = abi.decode(_getComponentValue("OilPerSecond", _playerId), (int256));
        require(_playerGoldBalance > _goldCost, "CURIO: Insufficient gold balance");
        _setComponentValue("Gold", _playerId, abi.encode(_playerGoldBalance - _goldCost));
        _setComponentValue("OildPerSecond", _playerId, abi.encode(_playerOilPerSecond + _oilPerSecond));

        return _troopId;
    }

    function _removeTroop(uint256 _troopId) public {
        uint256 _playerId = abi.decode(_getComponent("Owner").getRawValue(_troopId), (uint256));
        int256 _oilPerSecond = abi.decode(_getComponent("OilPerSecond").getRawValue(_troopId), (int256));

        _removeEntity(_troopId);

        _updatePlayerBalances(_playerId);
        int256 _playerOilPerSecond = abi.decode(_getComponent("OilPerSecond").getRawValue(_playerId), (int256));
        _setComponentValue("OildPerSecond", _playerId, abi.encode(_playerOilPerSecond - _oilPerSecond));

        emit EntityRemoved(_troopId);
    }

    function _removeArmy(uint256 _armyId) public {
        _removeEntity(_armyId);
    }

    function _updatePlayerBalances(uint256 _playerId) public {
        uint256 _balanceLastUpdated = abi.decode(_getComponentValue("BalanceLastUpdated", _playerId), (uint256));
        uint256 _timeElapsed = block.timestamp - _balanceLastUpdated;

        // Update gold balance
        int256 _gold = abi.decode(_getComponentValue("Gold", _playerId), (int256));
        int256 _goldPerSecond = abi.decode(_getComponentValue("GoldPerSecond", _playerId), (int256));
        _setComponentValue("Gold", _playerId, abi.encode(_gold + _goldPerSecond * int256(_timeElapsed)));

        // Update oil balance
        int256 _oil = abi.decode(_getComponentValue("Oil", _playerId), (int256));
        int256 _oilPerSecond = abi.decode(_getComponentValue("OilPerSecond", _playerId), (int256));
        _setComponentValue("Oil", _playerId, abi.encode(_oil + _oilPerSecond * int256(_timeElapsed)));

        // Update debuff status based on oil rate
        if (_oilPerSecond >= 0) {
            _removeComponentValue("IsDebuffed", _playerId);
        } else {
            _setComponentValue("IsDebuffed", _playerId, abi.encode(true));
        }

        _setComponentValue("BalanceLastUpdated", _playerId, abi.encode(block.timestamp));
    }

    function _removeArmyWithTroops(uint256 _armyId) public {
        _removeArmy(_armyId);
        uint256[] memory _troopIds = _getArmyTroops(_armyId);
        for (uint256 i = 0; i < _troopIds.length; i++) {
            _removeTroop(_troopIds[i]);
        }
    }

    function _damageArmy(uint256 _totalDamage, uint256[] memory _armyTroopIds) public {
        uint256 _individualDamage = _totalDamage / _armyTroopIds.length;
        uint256 _remainingDamage = _totalDamage % _armyTroopIds.length;

        for (uint256 i = 0; i < _armyTroopIds.length; i++) {
            uint256 _damage = _remainingDamage > 0 ? _individualDamage + 1 : _individualDamage;
            _damageTroop(_damage, _armyTroopIds[i]);
            if (_remainingDamage > 0) _remainingDamage--;
        }
    }

    function _damageTroop(uint256 _damage, uint256 _troopId) public {
        uint256 _health = abi.decode(_getComponent("Health").getRawValue(_troopId), (uint256));

        if (_damage >= _health) {
            uint256 _armyId = abi.decode(_getComponent("ArmyId").getRawValue(_troopId), (uint256));
            if (_getComponent("ArmyId").getEntitiesWithRawValue(abi.encode(_armyId)).length == 1) _removeArmy(_armyId);
            _removeTroop(_troopId);
        } else {
            _setComponentValue("Health", _troopId, abi.encode(_health - _damage));
        }
    }

    // ----------------------------------------------------------
    // LOGIC GETTERS
    // ----------------------------------------------------------

    function _getNavies() public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(_getComponent("CanMove").getEntities());
        _set2.addArray(_getComponent("IsLandTroop").getEntities());
        return _difference(_set1, _set2);
    }

    function _getPlayerTroops(uint256 _playerId) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        uint256[] memory _entitiesOwnedByPlayer = _getComponent("Owner").getEntitiesWithRawValue(abi.encode(_playerId));
        uint256[] memory _allTroops = _getComponent("CanMove").getEntities();
        _set1.addArray(_entitiesOwnedByPlayer);
        _set2.addArray(_allTroops);
        return _intersection(_set1, _set2);
    }

    function _getPlayerBases(uint256 _playerId) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(_getComponent("CanPurchase").getEntities());
        _set2.addArray(_getComponent("Owner").getEntitiesWithRawValue(abi.encode(_playerId)));
        return _intersection(_set1, _set2);
    }

    function _getArmyAt(Position memory _position) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(_getComponent("IsArmy").getEntities());
        _set2.addArray(_getComponent("Position").getEntitiesWithRawValue(abi.encode(_position)));
        uint256[] memory _result = _intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getBaseAt(Position memory _position) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(_getComponent("canPurchase").getEntities());
        _set2.addArray(_getComponent("Position").getEntitiesWithRawValue(abi.encode(_position)));
        uint256[] memory _result = _intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getArmyTroops(uint256 _armyId) public view returns (uint256[] memory) {
        return _getComponent("ArmyId").getEntitiesWithRawValue(abi.encode(_armyId));
    }

    function _getPlayerId(address _playerAddr) public view returns (uint256) {
        return gs().playerIdMap[_playerAddr];
    }

    function _getInfantryPercentage(uint256[] memory _troopIds) public view returns (uint256) {
        require(_troopIds.length > 0, "CURIO: Cannot calculate percentage for zero troops");

        uint256 _percentagePerTroop = 100 / _troopIds.length;
        uint256 _result = 0;

        for (uint256 i = 0; i < _troopIds.length; i++) {
            if (_getComponent("IsLandTroop").has(_troopIds[i])) {
                _result += _percentagePerTroop;
            }
        }

        return _result;
    }

    function _getArmyHealth(uint256[] memory _troopIds) public view returns (uint256) {
        // take the sum
        uint256 _totalHealth;

        for (uint256 i = 0; i < _troopIds.length; i++) {
            _totalHealth += abi.decode(_getComponent("Health").getRawValue(_troopIds[i]), (uint256));
        }

        return _totalHealth;
    }

    function _getArmyMovementCooldown(uint256[] memory _troopIds) public view returns (uint256) {
        // take the longest cooldown
        uint256 _longestMovementCooldown;

        for (uint256 i = 0; i < _troopIds.length; i++) {
            uint256 _troopMovementCooldown = abi.decode(_getComponent("MovementCooldown").getRawValue(_troopIds[i]), (uint256));
            if (_troopMovementCooldown > _longestMovementCooldown) {
                _longestMovementCooldown = _troopMovementCooldown;
            }
        }
        return _longestMovementCooldown;
    }

    function _getArmyLargeActionCooldown(uint256[] memory _troopIds) public view returns (uint256) {
        // take the longest cooldown
        uint256 _longestLargeActionCooldown;

        for (uint256 i = 0; i < _troopIds.length; i++) {
            uint256 _troopLargeActionCooldown = abi.decode(_getComponent("LargeActionCooldown").getRawValue(_troopIds[i]), (uint256));
            if (_troopLargeActionCooldown > _longestLargeActionCooldown) {
                _longestLargeActionCooldown = _troopLargeActionCooldown;
            }
        }

        return _longestLargeActionCooldown;
    }

    function _getArmyAttackFactor(uint256[] memory _troopIds) public view returns (uint256) {
        // take the average
        uint256 _averageAttackFactor;

        for (uint256 i = 0; i < _troopIds.length; i++) {
            _averageAttackFactor += abi.decode(_getComponent("AttackFactor").getRawValue(_troopIds[i]), (uint256));
        }

        return _averageAttackFactor / _troopIds.length;
    }

    function _getArmyDefenseFactor(uint256[] memory _troopIds) public view returns (uint256) {
        // take the average
        uint256 _averageDefenseFactor;

        for (uint256 i = 0; i < _troopIds.length; i++) {
            _averageDefenseFactor += abi.decode(_getComponent("DefenseFactor").getRawValue(_troopIds[i]), (uint256));
        }

        return _averageDefenseFactor / _troopIds.length;
    }

    function _getArmyDamagePerHit(uint256[] memory _troopIds) public view returns (uint256) {
        // take the sum
        uint256 _totalDamagePerHit = 0;

        for (uint256 i = 0; i < _troopIds.length; i++) {
            _totalDamagePerHit += abi.decode(_getComponent("DamagePerHit").getRawValue(_troopIds[i]), (uint256));
        }

        return _totalDamagePerHit;
    }

    function _getDebuffedArmyDamagePerHit(uint256[] memory _troopIds) public view returns (uint256) {
        uint256 _infantryPercentage = _getInfantryPercentage(_troopIds);
        uint256 _debuffFactor = (gs().worldConstants.debuffFactor * (100 - _infantryPercentage)) / 100; // Only non-infantries are debuffed
        return (_getArmyDamagePerHit(_troopIds) * (100 - _debuffFactor)) / 100;
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

    // ----------------------------------------------------------
    // ECS UTILITY FUNCTIONS
    // ----------------------------------------------------------

    function _getComponent(string memory _name) public view returns (Component) {
        address _componentAddr = gs().components[_name];
        require(_componentAddr != address(0), "CURIO: Component not found");

        return Component(_componentAddr);
    }

    function _getComponentById(uint256 _id) public view returns (Component) {
        address _componentAddr = gs().idComponentMap[_id];
        require(_componentAddr != address(0), "CURIO: Component not found");

        return Component(_componentAddr);
    }

    function _addEntity() public returns (uint256) {
        Set _entities = Set(gs().entities);
        uint256 _newEntity = _entities.size() + 1;
        _entities.add(_newEntity);

        emit NewEntity(_newEntity);
        return _newEntity;
    }

    function _removeEntity(uint256 _entity) public {
        Set _entities = Set(gs().entities);
        _entities.remove(_entity);

        // FIXME: remove over all components, or remove over components which the entity has? One more general, the other more efficient.
        for (uint256 i = 0; i < gs().componentNames.length; i++) {
            Component _component = Component(gs().components[gs().componentNames[i]]);
            _component.remove(_entity);
        }

        emit EntityRemoved(_entity);
    }

    function _getComponentValue(string memory _componentName, uint256 _entity) public view returns (bytes memory) {
        return _getComponent(_componentName).getRawValue(_entity);
    }

    // Question: Right now, all events regarding component set and removal are emitted in game contracts. Is this good?
    function _setComponentValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _rawValue
    ) public {
        _getComponent(_componentName).set(_entity, _rawValue);

        emit ComponentValueSet(_componentName, _entity, _rawValue);
    }

    function _removeComponentValue(string memory _componentName, uint256 _entity) public {
        _getComponent(_componentName).remove(_entity);

        emit ComponentValueSet(_componentName, _entity, new bytes(0));
    }

    // inclusive on both ends
    function _filterByComponentRange(
        uint256[] memory _entities,
        string memory _componentName,
        uint256 _lb,
        uint256 _ub
    ) public returns (uint256[] memory) {
        Set _set1 = new Set();
        _set1.addArray(_entities);

        uint256[] memory _result = new uint256[](0);
        Set _set2;
        for (uint256 _value = _lb; _value <= _ub; _value++) {
            _set2 = new Set();
            _set2.addArray(_getComponent(_componentName).getEntitiesWithRawValue(abi.encode(_value)));
            _result = _concatenate(_result, _intersection(_set1, _set2));
        }

        return _result;
    }

    // Set-theoretic intersection
    function _intersection(Set _set1, Set _set2) public returns (uint256[] memory) {
        Set _searchedElements = new Set();

        uint256[] memory _temp = new uint256[](_set1.size() + _set2.size());
        uint256 _resultLength = 0;

        // Loop through first set
        for (uint256 i = 0; i < _set1.size(); i++) {
            uint256 _element = _set1.getAll()[i];

            // Check if element is in second set
            if (!_searchedElements.includes(_element)) {
                if (_set2.includes(_element)) {
                    _temp[_resultLength] = _element;
                    _resultLength++;
                }
            }

            _searchedElements.add(_element);
        }

        // Loop through second set
        for (uint256 i = 0; i < _set2.size(); i++) {
            uint256 _element = _set2.getAll()[i];

            // Check if element is in first set
            if (!_searchedElements.includes(_element)) {
                if (_set1.includes(_element)) {
                    _temp[_resultLength] = _element;
                    _resultLength++;
                }
            }

            _searchedElements.add(_element);
        }

        // Copy result to array with known length
        uint256[] memory _result = new uint256[](_resultLength);
        for (uint256 i = 0; i < _resultLength; i++) {
            _result[i] = _temp[i];
        }

        return _result;
    }

    // Set-theoretic difference
    function _difference(Set set1, Set set2) public view returns (uint256[] memory) {
        uint256[] memory _temp = new uint256[](set1.size());
        uint256 _resultLength = 0;

        // Loop through first set
        for (uint256 i = 0; i < set1.size(); i++) {
            uint256 _element = set1.getAll()[i];

            // Check if element is in second set
            if (!set2.includes(_element)) {
                _temp[_resultLength] = _element;
                _resultLength++;
            }
        }

        uint256[] memory _result = new uint256[](_resultLength);
        for (uint256 i = 0; i < _resultLength; i++) {
            _result[i] = _temp[i];
        }

        return _result;
    }

    // Set-theoretic union
    function _union(Set _set1, Set _set2) public returns (uint256[] memory) {
        uint256[] memory _arr1 = _difference(_set1, _set2);
        uint256[] memory _arr2 = _intersection(_set1, _set2);
        uint256[] memory _arr3 = _difference(_set2, _set1);

        return _concatenate(_concatenate(_arr1, _arr2), _arr3);
    }

    function _concatenate(uint256[] memory _arr1, uint256[] memory _arr2) public pure returns (uint256[] memory) {
        uint256[] memory _result = new uint256[](_arr1.length + _arr2.length);

        for (uint256 i = 0; i < _arr1.length; i++) {
            _result[i] = _arr1[i];
        }
        for (uint256 i = 0; i < _arr2.length; i++) {
            _result[_arr1.length + i] = _arr2[i];
        }

        return _result;
    }
}
