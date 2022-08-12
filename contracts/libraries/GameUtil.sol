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

    // ----------------------------------------------------------
    // ECS UTIL FUNCTIONS (temp)
    // ----------------------------------------------------------

    event NewEntity(uint256 _entity);
    event NewComponent(string _name, uint256 _id);
    event ComponentValueSet(string _componentName, uint256 _entity, bytes _rawValue);

    function _initializeTileECS(Position memory _position) public {
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
            // _setComponentValue("Health", _baseId, abi.encode(1));
            // _setComponentValue("CanAttack", _baseId, abi.encode(true));
            // _setComponentValue("CanPurchase", _baseId, abi.encode(true));
            // _setComponentValue("AttackFactor", _baseId, abi.encode(100));
            // _setComponentValue("DefenseFactor", _baseId, abi.encode(100));
            if (_terrainId == 3) {
                // // Port
                // _setComponentValue("Name", _baseId, abi.encode(BASE_NAME.PORT));
                // _setComponentValue("GoldPerSecond", _baseId, abi.encode(_worldConstants.defaultBaseGoldGenerationPerSecond));
                // _setComponentValue("GoldRatePositive", _baseId, abi.encode(true));
                _terrainId = 0;
            } else if (_terrainId == 4) {
                // // City
                // // Note: Now cities and ports are the same except their terrain sitting on!
                // // Troop type produced now depends on the terrain, not on their nature any more.
                // _setComponentValue("Name", _baseId, abi.encode(BASE_NAME.CITY));
                // _setComponentValue("GoldPerSecond", _baseId, abi.encode(_worldConstants.defaultBaseGoldGenerationPerSecond));
                // _setComponentValue("GoldRatePositive", _baseId, abi.encode(true));
                _terrainId = 1;
            } else if (_terrainId == 5) {
                // // Oil well
                // _setComponentValue("Name", _baseId, abi.encode(BASE_NAME.OIL_WELL));
                // _setComponentValue("OilPerSecond", _baseId, abi.encode(_worldConstants.defaultWellOilGenerationPerSecond));
                // _setComponentValue("OilRatePositive", _baseId, abi.encode(true));
                _terrainId = 0;
            }
        }

        // Update terrain
        gs().map[_position.x][_position.y].isInitializedECS = true;
        gs().map[_position.x][_position.y].terrain = TERRAIN(_terrainId);
    }

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

    function _getPlayerId(address _playerAddr) public view returns (uint256) {
        return gs().playerIdMap[_playerAddr];
    }

    function _addTroopEntity(
        uint256 _playerId,
        Position memory _position,
        uint256 _troopTemplateId
    ) public returns (uint256) {
        // // 1. Get number of player-owned troops and verify size
        // uint256 _playerTroopCount = _getPlayerTroopCount(_playerId);
        // require(_playerTroopCount < gs().worldConstants.maxTroopCountPerPlayer, "CURIO: Max troop count exceeded");

        // 2. Create new troop entity globally and in corresponding components
        uint256 _troopId = _addEntity();
        // troop fields
        _setComponentValue("IsActive", _troopId, abi.encode(true));
        _setComponentValue("Owner", _troopId, abi.encode(_playerId));
        // _setComponentValue("LastMoved", _troopId, abi.encode(block.timestamp));
        // _setComponentValue("LastLargeActionTaken", _troopId, abi.encode(0));
        // _setComponentValue("LastRepaired", _troopId, abi.encode(block.timestamp));
        // _setComponentValue("Health", _troopId, _getComponent("MaxHealth").getRawValue(_troopTemplateId));
        _setComponentValue("Position", _troopId, abi.encode(_position));
        // // struct property fields
        // _setComponentValue("CanMove", _troopId, abi.encode(true));
        // _setComponentValue("CanAttack", _troopId, abi.encode(true));
        // if (_getComponent("CanCapture").has(_troopTemplateId)) {
        //     _setComponentValue("CanCapture", _troopId, abi.encode(true));
        // }
        // // troop type fields
        // _setComponentValue("Name", _troopId, _getComponent("Name").getRawValue(_troopTemplateId));
        // if (_getComponent("IsLandTroop").has(_troopTemplateId)) {
        //     _setComponentValue("IsLandTroop", _troopId, abi.encode(true));
        // }
        // _setComponentValue("MaxHealth", _troopId, _getComponent("MaxHealth").getRawValue(_troopTemplateId));
        // _setComponentValue("DamagePerHit", _troopId, _getComponent("DamagePerHit").getRawValue(_troopTemplateId));
        // _setComponentValue("AttackFactor", _troopId, _getComponent("AttackFactor").getRawValue(_troopTemplateId));
        // _setComponentValue("DefenseFactor", _troopId, _getComponent("DefenseFactor").getRawValue(_troopTemplateId));
        // _setComponentValue("MovementCooldown", _troopId, _getComponent("MovementCooldown").getRawValue(_troopTemplateId));
        // _setComponentValue("LargeActionCooldown", _troopId, _getComponent("LargeActionCooldown").getRawValue(_troopTemplateId));
        // // _setComponentValue("Gold", _troopId, _getComponent("Gold").getRawValue(_troopTemplateId));
        // _setComponentValue("OilPerSecond", _troopId, _getComponent("OilPerSecond").getRawValue(_troopTemplateId));
        // Component _cargoCapacityComponent = _getComponent("CargoCapacity");
        // if (_cargoCapacityComponent.has(_troopTemplateId)) {
        //     _setComponentValue("CargoCapacity", _troopId, _cargoCapacityComponent.getRawValue(_troopTemplateId));
        // }

        // 4. Update balances
        // TODO: implement

        return _troopId;
    }

    function _addEntity() public returns (uint256) {
        Set _entities = Set(gs().entities);
        uint256 _newEntity = _entities.size() + 1;
        _entities.add(_newEntity);

        emit NewEntity(_newEntity);
        return _newEntity;
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

    function _getPlayerTroopCount(uint256 _playerId) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        uint256[] memory _entitiesOwnedByPlayer = _getComponent("Owner").getEntitiesWithRawValue(abi.encode(_playerId));
        uint256[] memory _allTroops = _getComponent("CanMove").getEntities();
        _set1.addArray(_entitiesOwnedByPlayer);
        _set2.addArray(_allTroops);
        return _intersection(_set1, _set2).length;
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

    function _newSets() public returns (Set, Set) {
        return (new Set(), new Set());
    }

    // ----------------------------------------------------------
    // GETTERS
    // ----------------------------------------------------------

    function _getPlayerCount() public view returns (uint256) {
        return gs().players.length;
    }

    function _getTileAt(Position memory _pos) public view returns (Tile memory) {
        return gs().map[_pos.x][_pos.y];
    }

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

    function _getNeighbors(Position memory _pos) public view returns (Position[] memory) {
        Position[] memory _result = new Position[](4); // FIXME: how to create and append to a dynamic array?
        uint256 _x = _pos.x;
        uint256 _y = _pos.y;

        if (_x > 0) _result[0] = (Position({x: _x - 1, y: _y}));
        if (_x < gs().worldConstants.worldWidth - 1) _result[1] = (Position({x: _x + 1, y: _y}));
        if (_y > 0) _result[2] = (Position({x: _x, y: _y - 1}));
        if (_y < gs().worldConstants.worldHeight - 1) _result[3] = (Position({x: _x, y: _y + 1}));

        return _result;
    }

    function _samePos(Position memory _p1, Position memory _p2) public pure returns (bool) {
        return _p1.x == _p2.x && _p1.y == _p2.y;
    }

    // Note: The current version treats a diagonal movement as two movements.
    // For treating as one, use `xDist <= _dist && yDist <= _dist` as return condition.
    function _withinDist(
        Position memory _p1,
        Position memory _p2,
        uint256 _dist
    ) public pure returns (bool) {
        uint256 _xDist = _p1.x >= _p2.x ? _p1.x - _p2.x : _p2.x - _p1.x;
        uint256 _yDist = _p1.y >= _p2.y ? _p1.y - _p2.y : _p2.y - _p1.y;
        return (_xDist + _yDist) <= _dist;
    }

    function _getIndex(uint256 _element, uint256[] memory _arr) internal pure returns (uint256) {
        uint256 _index = 0;
        while (_index < _arr.length) {
            if (_arr[_index] == _element) break;
            _index++;
        }
        return _index;
    }

    function _NULL() internal pure returns (uint256) {
        return 0;
    }

    function _NULL_ADRESS() internal pure returns (address) {
        return address(0);
    }
}
