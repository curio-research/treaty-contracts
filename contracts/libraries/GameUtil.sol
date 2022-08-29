//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {BASE_NAME, ComponentSpec, GameState, Position, TERRAIN, Tile, VALUE_TYPE, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Set} from "contracts/Set.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent} from "contracts/TypedComponents.sol";

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
    event NewComponent(string _name, uint256 _entity);
    event ComponentValueSet(string _componentName, uint256 _entity, bytes _value);
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
        uint256 _terrainEntity = _encodedCol / _divFactor;

        // Add base
        if (_terrainEntity >= 3) {
            uint256 _baseEntity = _addEntity();
            _setBool("IsActive", _baseEntity);
            _setPosition("Position", _baseEntity, _position);
            _setUint("Health", _baseEntity, 1);
            _setBool("CanAttack", _baseEntity);
            _setBool("CanPurchase", _baseEntity);
            _setUint("AttackFactor", _baseEntity, 100);
            _setUint("DefenseFactor", _baseEntity, 100);
            if (_terrainEntity == 3) {
                // Port
                _setString("Tag", _baseEntity, "Port");
                _setInt("GoldPerSecond", _baseEntity, int256(_worldConstants.defaultBaseGoldGenerationPerSecond));
                _terrainEntity = 0;
            } else if (_terrainEntity == 4) {
                // City
                _setString("Tag", _baseEntity, "City");
                _setInt("GoldPerSecond", _baseEntity, int256(_worldConstants.defaultBaseGoldGenerationPerSecond));
                _terrainEntity = 1;
            } else if (_terrainEntity == 5) {
                // Oil well
                _setString("Tag", _baseEntity, "Oil Well");
                _setInt("OilPerSecond", _baseEntity, int256(_worldConstants.defaultWellOilGenerationPerSecond));
                _terrainEntity = 1;
            }
        }

        // Update terrain
        gs().map[_position.x][_position.y].isInitialized = true;
        gs().map[_position.x][_position.y].terrain = TERRAIN(_terrainEntity);
    }

    function _addArmy(uint256 _playerEntity, Position memory _position) public returns (uint256) {
        uint256 _armyEntity = _addEntity();
        _setUint("OwnerEntity", _armyEntity, _playerEntity);
        _setString("Tag", _armyEntity, "Army");
        _setUint("LastMoved", _armyEntity, block.timestamp);
        _setUint("LastLargeActionTaken", _armyEntity, 0);
        _setUint("LastRepaired", _armyEntity, block.timestamp);
        _setPosition("Position", _armyEntity, _position);
        _setBool("IsArmy", _armyEntity);

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
        uint256 _troopEntity = _addEntity();
        // troop fields
        // TODO: left here
        _setBool("IsActive", _troopEntity);
        _setUint("OwnerEntity", _troopEntity, _playerEntity);
        _setUint("ArmyEntity", _troopEntity, _armyEntity);
        _setUint("Health", _troopEntity, _getUint("MaxHealth", _troopTemplateEntity));
        _setBool("CanMove", _troopEntity);
        _setBool("CanAttack", _troopEntity);
        _setBool("CanCapture", _troopEntity);
        // troop type fields
        _setString("Tag", _troopEntity, _getString("Tag", _troopTemplateEntity));
        if (_getComponent("CanMoveOnLand").has(_troopTemplateEntity)) _setBool("CanMoveOnLand", _troopEntity);
        _setUint("MaxHealth", _troopEntity, _getUint("MaxHealth", _troopTemplateEntity));
        _setUint("DamagePerHit", _troopEntity, _getUint("DamagePerHit", _troopTemplateEntity));
        _setUint("AttackFactor", _troopEntity, _getUint("AttackFactor", _troopTemplateEntity));
        _setUint("DefenseFactor", _troopEntity, _getUint("DefenseFactor", _troopTemplateEntity));
        _setUint("MovementCooldown", _troopEntity, _getUint("MovementCooldown", _troopTemplateEntity));
        _setUint("LargeActionCooldown", _troopEntity, _getUint("LargeActionCooldown", _troopTemplateEntity));
        // resource fields
        int256 _oilPerSecond = _getInt("OilPerSecond", _troopTemplateEntity);
        _setInt("OilPerSecond", _troopEntity, _oilPerSecond);

        // 3. Update balances
        _updatePlayerBalances(_playerEntity);
        int256 _playerOilPerSecond = _getInt("OilPerSecond", _playerEntity);
        _setInt("OilPerSecond", _playerEntity, _playerOilPerSecond + _oilPerSecond);

        return _troopEntity;
    }

    function _removeTroop(uint256 _troopEntity) public {
        uint256 _playerEntity = _getUint("OwnerEntity", _troopEntity);
        int256 _oilPerSecond = _getInt("OilPerSecond", _troopEntity);

        _removeEntity(_troopEntity);

        _updatePlayerBalances(_playerEntity);
        int256 _playerOilPerSecond = _getInt("OilPerSecond", _playerEntity);
        _setInt("OilPerSecond", _playerEntity, _playerOilPerSecond - _oilPerSecond);

        emit EntityRemoved(_troopEntity);
    }

    function _removeArmy(uint256 _armyEntity) public {
        _removeEntity(_armyEntity);
    }

    function _updatePlayerBalances(uint256 _playerEntity) public {
        uint256 _balanceLastUpdated = _getUint("BalanceLastUpdated", _playerEntity);
        uint256 _timeElapsed = block.timestamp - _balanceLastUpdated;

        // Update gold balance
        // FIXME: math between uint and int
        uint256 _gold = _getUint("Gold", _playerEntity);
        int256 _goldPerSecond = _getInt("GoldPerSecond", _playerEntity);
        _setUint("Gold", _playerEntity, uint256(int256(_gold) + _goldPerSecond * int256(_timeElapsed)));

        // Update oil balance
        uint256 _oil = _getUint("Oil", _playerEntity);
        int256 _oilPerSecond = _getInt("OilPerSecond", _playerEntity);
        _setUint("Oil", _playerEntity, uint256(int256(_oil) + _oilPerSecond * int256(_timeElapsed)));

        // Update debuff status based on oil rate
        if (_oilPerSecond >= 0) {
            _removeBool("IsDebuffed", _playerEntity);
        } else {
            _setBool("IsDebuffed", _playerEntity);
        }

        _setUint("BalanceLastUpdated", _playerEntity, block.timestamp);
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
        uint256 _health = _getUint("Health", _troopEntity);

        if (_damage >= _health) {
            uint256 _armyEntity = _getUint("ArmyEntity", _troopEntity);
            if (UintComponent(gs().components["ArmyEntity"]).getEntitiesWithValue(_armyEntity).length == 1) _removeArmy(_armyEntity);
            _removeTroop(_troopEntity);
        } else {
            _setUint("Health", _troopEntity, _health - _damage);
        }
    }

    // ----------------------------------------------------------
    // LOGIC GETTERS
    // ----------------------------------------------------------

    function _getNavies() public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(_getComponent("CanMove").getEntities());
        _set2.addArray(_getComponent("CanMoveOnLand").getEntities());
        return _difference(_set1, _set2);
    }

    function _getPlayerTroops(uint256 _playerEntity) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        uint256[] memory _entitiesOwnedByPlayer = UintComponent(gs().components["OwnerEntity"]).getEntitiesWithValue(_playerEntity);
        uint256[] memory _allTroops = _getComponent("CanMove").getEntities();
        _set1.addArray(_entitiesOwnedByPlayer);
        _set2.addArray(_allTroops);
        return _intersection(_set1, _set2);
    }

    function _getPlayerBases(uint256 _playerEntity) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(_getComponent("CanPurchase").getEntities());
        _set2.addArray(UintComponent(gs().components["OwnerEntity"]).getEntitiesWithValue(_playerEntity));
        return _intersection(_set1, _set2);
    }

    function _getArmyAt(Position memory _position) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(_getComponent("IsArmy").getEntities());
        _set2.addArray(PositionComponent(gs().components["Position"]).getEntitiesWithValue(_position));
        uint256[] memory _result = _intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getBaseAt(Position memory _position) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(_getComponent("CanPurchase").getEntities());
        _set2.addArray(PositionComponent(gs().components["Position"]).getEntitiesWithValue(_position));
        uint256[] memory _result = _intersection(_set1, _set2);

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
            if (_getComponent("CanMoveOnLand").has(_troopEntities[i])) {
                _result += _percentagePerTroop;
            }
        }

        return _result;
    }

    function _getArmyHealth(uint256[] memory _troopEntities) public view returns (uint256) {
        // take the sum
        uint256 _totalHealth;

        for (uint256 i = 0; i < _troopEntities.length; i++) {
            _totalHealth += _getUint("Health", _troopEntities[i]);
        }

        return _totalHealth;
    }

    function _getArmyMovementCooldown(uint256[] memory _troopEntities) public view returns (uint256) {
        // take the longest cooldown
        uint256 _longestMovementCooldown;

        for (uint256 i = 0; i < _troopEntities.length; i++) {
            uint256 _troopMovementCooldown = _getUint("MovementCooldown", _troopEntities[i]);
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
            uint256 _troopLargeActionCooldown = _getUint("LargeActionCooldown", _troopEntities[i]);
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
            _averageAttackFactor += _getUint("AttackFactor", _troopEntities[i]);
        }

        return _averageAttackFactor / _troopEntities.length;
    }

    function _getArmyDefenseFactor(uint256[] memory _troopEntities) public view returns (uint256) {
        // take the average
        uint256 _averageDefenseFactor;

        for (uint256 i = 0; i < _troopEntities.length; i++) {
            _averageDefenseFactor += _getUint("DefenseFactor", _troopEntities[i]);
        }

        return _averageDefenseFactor / _troopEntities.length;
    }

    function _getArmyDamagePerHit(uint256[] memory _troopEntities) public view returns (uint256) {
        // take the sum
        uint256 _totalDamagePerHit = 0;

        for (uint256 i = 0; i < _troopEntities.length; i++) {
            _totalDamagePerHit += _getUint("DamagePerHit", _troopEntities[i]);
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

    // ----------------------------------------------------------
    // ECS TYPED UTILITY FUNCTIONS
    // ----------------------------------------------------------

    function _getAddress(string memory _componentName, uint256 _entity) public view returns (address) {
        return AddressComponent(gs().components[_componentName]).getValue(_entity);
    }

    function _setAddress(
        string memory _componentName,
        uint256 _entity,
        address _value
    ) public {
        AddressComponent(gs().components[_componentName]).set(_entity, _value);
        emit ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function _removeAddress(string memory _componentName, uint256 _entity) public {
        AddressComponent(gs().components[_componentName]).remove(_entity);
        emit ComponentValueSet(_componentName, _entity, new bytes(0));
    }

    function _getBool(string memory _componentName, uint256 _entity) public view returns (bool) {
        return BoolComponent(gs().components[_componentName]).getValue(_entity);
    }

    function _setBool(string memory _componentName, uint256 _entity) public {
        BoolComponent(gs().components[_componentName]).set(_entity);
        emit ComponentValueSet(_componentName, _entity, abi.encode(true));
    }

    function _removeBool(string memory _componentName, uint256 _entity) public {
        BoolComponent(gs().components[_componentName]).remove(_entity);
        emit ComponentValueSet(_componentName, _entity, new bytes(0));
    }

    function _getInt(string memory _componentName, uint256 _entity) public view returns (int256) {
        return IntComponent(gs().components[_componentName]).getValue(_entity);
    }

    function _setInt(
        string memory _componentName,
        uint256 _entity,
        int256 _value
    ) public {
        IntComponent(gs().components[_componentName]).set(_entity, _value);
        emit ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function _removeInt(string memory _componentName, uint256 _entity) public {
        IntComponent(gs().components[_componentName]).remove(_entity);
        emit ComponentValueSet(_componentName, _entity, new bytes(0));
    }

    function _getPosition(string memory _componentName, uint256 _entity) public view returns (Position memory) {
        return PositionComponent(gs().components[_componentName]).getValue(_entity);
    }

    function _setPosition(
        string memory _componentName,
        uint256 _entity,
        Position memory _value
    ) public {
        PositionComponent(gs().components[_componentName]).set(_entity, _value);
        emit ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function _removePosition(string memory _componentName, uint256 _entity) public {
        PositionComponent(gs().components[_componentName]).remove(_entity);
        emit ComponentValueSet(_componentName, _entity, new bytes(0));
    }

    function _getString(string memory _componentName, uint256 _entity) public view returns (string memory) {
        return StringComponent(gs().components[_componentName]).getValue(_entity);
    }

    function _setString(
        string memory _componentName,
        uint256 _entity,
        string memory _value
    ) public {
        StringComponent(gs().components[_componentName]).set(_entity, _value);
        emit ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function _removeString(string memory _componentName, uint256 _entity) public {
        StringComponent(gs().components[_componentName]).remove(_entity);
        emit ComponentValueSet(_componentName, _entity, new bytes(0));
    }

    function _getUint(string memory _componentName, uint256 _entity) public view returns (uint256) {
        return UintComponent(gs().components[_componentName]).getValue(_entity);
    }

    function _setUint(
        string memory _componentName,
        uint256 _entity,
        uint256 _value
    ) public {
        UintComponent(gs().components[_componentName]).set(_entity, _value);
        emit ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function _removeUint(string memory _componentName, uint256 _entity) public {
        UintComponent(gs().components[_componentName]).remove(_entity);
        emit ComponentValueSet(_componentName, _entity, new bytes(0));
    }

    // ----------------------------------------------------------
    // ECS UTILITY FUNCTIONS
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
            uint256 _componentEntity = _addEntity();
            _setBool("IsComponent", _componentEntity);
            gs().ComponentEntityToAddress[_componentEntity] = _addr;

            emit NewComponent(_spec.name, _componentEntity);
        }

        // Update component names for iteration
        gs().componentNames = _componentNames;
    }

    function _getComponent(string memory _name) public view returns (Component) {
        address _componentAddr = gs().components[_name];
        require(_componentAddr != address(0), "CURIO: Component not found");

        return Component(_componentAddr);
    }

    function _getComponentByEntity(uint256 _entity) public view returns (Component) {
        address _componentAddr = gs().ComponentEntityToAddress[_entity];
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
        return _getComponent(_componentName).getBytesValue(_entity);
    }

    // Question: At the moment, all events regarding component set and removal are emitted in game contracts. Is this good?
    function _setComponentValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _value
    ) public {
        _getComponent(_componentName).set(_entity, _value);

        emit ComponentValueSet(_componentName, _entity, _value);
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
            _set2.addArray(UintComponent(gs().components[_componentName]).getEntitiesWithValue(_value));
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

    // // Set-theoretic union
    // function _union(Set _set1, Set _set2) public returns (uint256[] memory) {
    //     uint256[] memory _arr1 = _difference(_set1, _set2);
    //     uint256[] memory _arr2 = _intersection(_set1, _set2);
    //     uint256[] memory _arr3 = _difference(_set2, _set1);

    //     return _concatenate(_concatenate(_arr1, _arr2), _arr3);
    // }

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
