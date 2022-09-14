//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {ComponentSpec, GameState, Position, TERRAIN, Tile, VALUE_TYPE, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Set} from "contracts/Set.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, StringArrayComponent, UintComponent, UintArrayComponent} from "contracts/TypedComponents.sol";

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
            } else if (_spec.valueType == VALUE_TYPE.UINT_ARRAY) {
                _addr = address(new UintArrayComponent(_gameAddr));
            } else if (_spec.valueType == VALUE_TYPE.STRING_ARRAY) {
                _addr = address(new StringArrayComponent(_gameAddr));
            } else {
                _addr = address(new Component(_gameAddr));
            }
            gs().components[_spec.name] = _addr;

            // Record identifier entity for component
            uint256 _component = ECSLib._addEntity();
            ECSLib._setBool("IsComponent", _component);
            gs().ComponentEntityToAddress[_component] = _addr;

            emit ECSLib.NewComponent(_spec.name, _component);
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
        uint256 _terrain = _encodedCol / _divFactor;

        // Update terrain
        gs().map[_position.x][_position.y].isInitialized = true;
        gs().map[_position.x][_position.y].terrain = TERRAIN(_terrain);
    }

    function _removeArmy(uint256 _army) public {
        ECSLib._removeEntity(_army);
    }

    function _damageArmy(uint256 _army, uint256 _damage) public {
        uint256 _health = ECSLib._getUint("Health", _army);
        ECSLib._setUint("Health", _army, _health - _damage);

        uint256[] memory _amounts = ECSLib._getUintArray("Amounts", _army);
        for (uint256 i = 0; i < _amounts.length; i++) {
            _amounts[i] = (_amounts[i] * (_health - _damage)) / _health;
        }
        ECSLib._setUintArray("Amounts", _army, _amounts);
    }

    // function _updatePlayerBalances(uint256 _player) public {
    //     uint256 _balanceLastUpdated = ECSLib._getUint("BalanceLastUpdated", _player);
    //     uint256 _timeElapsed = block.timestamp - _balanceLastUpdated;

    //     // Update gold balance
    //     uint256 _gold = ECSLib._getUint("Gold", _player);
    //     int256 _goldPerSecond = ECSLib._getInt("GoldPerSecond", _player);
    //     ECSLib._setUint("Gold", _player, uint256(int256(_gold) + _goldPerSecond * int256(_timeElapsed)));

    //     // Update oil balance
    //     uint256 _oil = ECSLib._getUint("Oil", _player);
    //     int256 _oilPerSecond = ECSLib._getInt("OilPerSecond", _player);
    //     ECSLib._setUint("Oil", _player, uint256(int256(_oil) + _oilPerSecond * int256(_timeElapsed)));

    //     // Update debuff status based on oil rate
    //     if (_oilPerSecond >= 0) {
    //         ECSLib._removeBool("IsDebuffed", _player);
    //     } else {
    //         ECSLib._setBool("IsDebuffed", _player);
    //     }

    //     ECSLib._setUint("BalanceLastUpdated", _player, block.timestamp);
    // }

    function _addGuard(uint256 _city) public returns (uint256 _guard) {
        WorldConstants memory _constants = gs().worldConstants;
        _guard = ECSLib._addEntity();
        ECSLib._setString("Tag", _guard, "Guard");
        ECSLib._setUint("City", _guard, _city);
        ECSLib._setUint("Health", _guard, _constants.cityHealth);
        ECSLib._setUint("Attack", _guard, _constants.cityAttack);
        ECSLib._setUint("Defense", _guard, _constants.cityDefense);
    }

    // ----------------------------------------------------------
    // LOGIC GETTERS
    // ----------------------------------------------------------

    function _getArmyBattles(uint256 _army) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        Set _set3 = new Set();
        _set1.addArray(ECSLib._getUintComponent("Source").getEntitiesWithValue(_army));
        _set2.addArray(ECSLib._getUintComponent("Target").getEntitiesWithValue(_army));
        _set3.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("Battle")));
        return ECSLib._concatenate(ECSLib._intersection(_set1, _set3), ECSLib._intersection(_set2, _set3));
    }

    function _getPlayerArmies(uint256 _player) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("Owner").getEntitiesWithValue(_player));
        _set2.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("Army")));
        return ECSLib._intersection(_set1, _set2);
    }

    function _getPlayerCities(uint256 _player) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("Owner").getEntitiesWithValue(_player));
        _set2.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("City")));
        return ECSLib._intersection(_set1, _set2);
    }

    function _getArmyAt(Position memory _position) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("Army")));
        _set2.addArray(ECSLib._getPositionComponent("Position").getEntitiesWithValue(_position));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getCityAt(Position memory _position) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("City")));
        _set2.addArray(ECSLib._getPositionComponent("Position").getEntitiesWithValue(_position));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getCityGuard(uint256 _city) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("Guard")));
        _set2.addArray(ECSLib._getUintComponent("City").getEntitiesWithValue(_city));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getInventory(uint256 _city, string memory _inventoryType) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("City").getEntitiesWithValue(_city));
        _set2.addArray(ECSLib._getStringComponent("InventoryType").getEntitiesWithValue(_inventoryType));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getPlayer(address _address) public view returns (uint256) {
        return gs().playerEntityMap[_address];
    }

    function _getBattleOutcome(
        uint256 _army1,
        uint256 _army2,
        uint256 _duration
    ) public view returns (uint256 _damageOn1, uint256 _damageOn2) {
        uint256 _attack1 = ECSLib._getUint("Attack", _army1);
        uint256 _attack2 = ECSLib._getUint("Attack", _army2);
        uint256 _defense1 = ECSLib._getUint("Defense", _army1);
        uint256 _defense2 = ECSLib._getUint("Defense", _army2);

        _damageOn1 = _attack2 > _defense1 ? (_attack2 - _defense1) * _duration : 0;
        _damageOn2 = _attack1 > _defense2 ? (_attack1 - _defense2) * _duration : 0;
    }

    // function _getArmyHealth(uint256[] memory _troopEntities) public view returns (uint256) {
    //     // take the sum
    //     uint256 _totalHealth;

    //     for (uint256 i = 0; i < _troopEntities.length; i++) {
    //         _totalHealth += ECSLib._getUint("Health", _troopEntities[i]);
    //     }

    //     return _totalHealth;
    // }

    // function _getDebuffedArmyDamagePerHit(uint256[] memory _troopEntities) public view returns (uint256) {
    //     uint256 _infantryPercentage = _getInfantryPercentage(_troopEntities);
    //     uint256 _debuffFactor = (gs().worldConstants.debuffFactor * (100 - _infantryPercentage)) / 100; // Only non-infantries are debuffed
    //     return (_getArmyDamagePerHit(_troopEntities) * (100 - _debuffFactor)) / 100;
    // }

    function _getCityCenter(uint256 _city) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("City").getEntitiesWithValue(_city));
        _set2.addArray(ECSLib._getStringComponent("BuildingType").getEntitiesWithValue(string("City Center")));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length == 1);
        return _result[0];
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

    function _adjacentToCity(Position memory _position, uint256 _city) public returns (bool) {
        Position memory _centerPosition = ECSLib._getPosition("Position", _getCityCenter(_city));
        return !_coincident(_position, _centerPosition) && _withinDistance(_position, _centerPosition, 2);
    }

    // ----------------------------------------------------------
    // UTILITY FUNCTIONS
    // ----------------------------------------------------------

    function _inBound(Position memory _p) public view returns (bool) {
        return _p.x >= 0 && _p.x < gs().worldConstants.worldWidth && _p.y >= 0 && _p.y < gs().worldConstants.worldHeight;
    }

    function _random(uint256 _max, uint256 _salt) public view returns (uint256) {
        return uint256(keccak256(abi.encode(block.timestamp, block.difficulty, _salt))) % _max;
    }

    function _connected(Position[] memory _positions) public pure returns (bool) {
        require(_positions.length > 0, "CURIO: Positions cannot be empty");

        for (uint256 i = 1; i < _positions.length; i++) {
            if (!_adjacent(_positions[i - 1], _positions[i])) return false;
        }

        return true;
    }

    function _adjacent(Position memory _p1, Position memory _p2) public pure returns (bool) {
        return !_coincident(_p1, _p2) && _withinDistance(_p1, _p2, 1);
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

    function _euclidean(Position memory _p1, Position memory _p2) public pure returns (uint256) {
        uint256 _a = _p2.x >= _p1.x ? _p2.x - _p1.x : _p1.x - _p2.x;
        uint256 _b = _p2.y >= _p1.y ? _p2.y - _p1.y : _p1.y - _p2.y;

        return _sqrt(_a**2 + _b**2);
    }

    function _sum(uint256[] memory _arr) public pure returns (uint256) {
        uint256 _result = 0;
        for (uint256 i = 0; i < _arr.length; i++) {
            _result += _arr[i];
        }
        return _result;
    }

    function _sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function _NULL() internal pure returns (uint256) {
        return 0;
    }
}
