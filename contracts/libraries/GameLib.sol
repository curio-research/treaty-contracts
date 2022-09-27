//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {ComponentSpec, GameState, Position, TERRAIN, Tile, VALUE_TYPE, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Set} from "contracts/Set.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent, UintArrayComponent} from "contracts/TypedComponents.sol";

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
            } else {
                _addr = address(new Component(_gameAddr));
            }
            gs().components[_spec.name] = _addr;

            // Record identifier entity for component
            uint256 _componentID = ECSLib._addEntity();
            ECSLib._setBool("IsComponent", _componentID);
            gs().ComponentEntityToAddress[_componentID] = _addr;

            emit ECSLib.NewComponent(_spec.name, _componentID);
        }

        // Update component names for iteration
        gs().componentNames = _componentNames;
    }

    function _initializeTile(Position memory _position) public {
        if (_getMapTileAt(_position).isInitialized) return;

        WorldConstants memory _worldConstants = gs().worldConstants;
        uint256 _batchSize = _worldConstants.initBatchSize;
        uint256 _numInitTerrainTypes = _worldConstants.numInitTerrainTypes;

        uint256 _encodedCol = gs().encodedColumnBatches[_position.x][_position.y / _batchSize] % (_numInitTerrainTypes**((_position.y % _batchSize) + 1));
        uint256 _divFactor = _numInitTerrainTypes**(_position.y % _batchSize);
        uint256 _terrain = _encodedCol / _divFactor;

        // Update terrain
        gs().map[_position.x][_position.y].isInitialized = true;

        // if it's land, 1-3 level gold mine, or barbarian, initialize as land
        if (_terrain <= 3) {
            gs().map[_position.x][_position.y].terrain = TERRAIN(0);
        }

        // if it's a gold mine, initialize it
        if (_terrain == 1 || _terrain == 2 || _terrain == 3) {
            uint256 _goldMineID = ECSLib._addEntity();
            uint256 _goldMineLevel = _terrain; // it happens that the gold level is the same as the terrain index

            ECSLib._setString("Tag", _goldMineID, "Resource");
            ECSLib._setUint("Template", _goldMineID, _getTemplateByInventoryType("Gold"));
            ECSLib._setUint("Level", _goldMineID, _goldMineLevel);
            ECSLib._setPosition("Position", _goldMineID, _position);
            ECSLib._setUint("LastTimestamp", _goldMineID, block.timestamp);
            ECSLib._setUint("Amount", _goldMineID, _goldLevelSelector(_goldMineLevel));
        }

        // if it's a barbarian, initialize it
        if (_terrain >= 4 && _terrain <= 6) {
            uint256 _barbarianID = ECSLib._addEntity();
            uint256 _infantryAmount = _barbarianInfantrySelector(_terrain - 3);
            uint256 _infantryTemplate = _getTemplateByInventoryType("Infantry");

            uint256 _infantryConstituentID = ECSLib._addEntity();
            ECSLib._setString("Tag", _infantryConstituentID, "ArmyConstituent");
            ECSLib._setUint("Keeper", _infantryConstituentID, _barbarianID);
            ECSLib._setUint("Template", _infantryConstituentID, _infantryTemplate);
            ECSLib._setUint("Amount", _infantryConstituentID, _infantryAmount);

            ECSLib._setString("Tag", _barbarianID, "Army");
            ECSLib._setPosition("Position", _barbarianID, _position);
            ECSLib._setUint("Health", _barbarianID, ECSLib._getUint("Health", _infantryTemplate) * _infantryAmount);
            ECSLib._setUint("Speed", _barbarianID, ECSLib._getUint("Speed", _infantryTemplate));
            ECSLib._setUint("Attack", _barbarianID, ECSLib._getUint("Attack", _infantryTemplate) * _infantryAmount);
            ECSLib._setUint("Defense", _barbarianID, ECSLib._getUint("Defense", _infantryTemplate) * _infantryAmount);
        }
    }

    function _goldLevelSelector(uint256 _goldLevel) public pure returns (uint256) {
        if (_goldLevel == 1) return 10000;
        if (_goldLevel == 2) return 20000;
        if (_goldLevel == 3) return 30000;
        return 0;
    }

    function _barbarianInfantrySelector(uint256 _level) public pure returns (uint256) {
        return _level * 1000;
    }

    function _removeArmy(uint256 _armyID) public {
        uint256[] memory _constituentIDs = _getArmyConstituents(_armyID);
        for (uint256 i = 0; i < _constituentIDs.length; i++) {
            ECSLib._removeEntity(_constituentIDs[i]);
        }
        ECSLib._removeEntity(_armyID);
    }

    function _damageArmy(uint256 _armyID, uint256 _damage) public {
        uint256 _health = ECSLib._getUint("Health", _armyID);
        ECSLib._setUint("Health", _armyID, _health - _damage);

        uint256[] memory _constituentIDs = _getArmyConstituents(_armyID);
        for (uint256 i = 0; i < _constituentIDs.length; i++) {
            ECSLib._setUint("Amount", _constituentIDs[i], (ECSLib._getUint("Amount", _constituentIDs[i]) * (_health - _damage)) / _health);
        }
    }

    function _endGather(uint256 _armyID) public {
        Position memory _position = ECSLib._getPosition("Position", _armyID);

        // Verify that a gather process is present
        uint256 _gatherID = _getArmyGather(_armyID);
        require(_gatherID != _NULL(), "CURIO: Need to start gathering first");

        // Get army's and resource's remaining capacities
        uint256 _templateID = ECSLib._getUint("Template", _gatherID);
        uint256 _inventoryID = _getArmyInventory(_armyID, _templateID); // FIXME: BUG
        uint256 _armyAmount;
        if (_inventoryID == _NULL()) {
            _armyAmount = 0;

            _inventoryID = ECSLib._addEntity();
            ECSLib._setString("Tag", _inventoryID, "TroopInventory");
            ECSLib._setUint("Army", _inventoryID, _armyID);
            ECSLib._setUint("Template", _inventoryID, _templateID);
            ECSLib._setUint("Amount", _inventoryID, _armyAmount);
        } else {
            _armyAmount = ECSLib._getUint("Amount", _inventoryID);
        }

        uint256 _resourceID = _getResourceAt(_position);
        uint256 _resourceAmount = ECSLib._getUint("Amount", _resourceID);

        // Gather
        uint256 _gatherAmount = (block.timestamp - ECSLib._getUint("InitTimestamp", _gatherID)) / ECSLib._getUint("Duration", _templateID);
        if (_gatherAmount > _resourceAmount) _gatherAmount = _resourceAmount;
        if (_gatherAmount > (ECSLib._getUint("Capacity", _armyID) - _armyAmount)) _gatherAmount = ECSLib._getUint("Capacity", _armyID) - _armyAmount;
        ECSLib._setUint("Amount", _inventoryID, _armyAmount + _gatherAmount);
        ECSLib._setUint("Amount", _resourceID, _resourceAmount - _gatherAmount);

        // Remove resource if drained
        if (_gatherAmount == _resourceAmount) ECSLib._removeEntity(_resourceID);

        // Remove gather entity
        ECSLib._removeEntity(_gatherID);
    }

    // function _updatePlayerBalances(uint256 _playerID) public {
    //     uint256 _balanceLastUpdated = ECSLib._getUint("BalanceLastUpdated", _playerID);
    //     uint256 _timeElapsed = block.timestamp - _balanceLastUpdated;

    //     // Update gold balance
    //     uint256 _gold = ECSLib._getUint("Gold", _playerID);
    //     int256 _goldPerSecond = ECSLib._getInt("GoldPerSecond", _playerID);
    //     ECSLib._setUint("Gold", _playerID, uint256(int256(_gold) + _goldPerSecond * int256(_timeElapsed)));

    //     // Update oil balance
    //     uint256 _oil = ECSLib._getUint("Oil", _playerID);
    //     int256 _oilPerSecond = ECSLib._getInt("OilPerSecond", _playerID);
    //     ECSLib._setUint("Oil", _playerID, uint256(int256(_oil) + _oilPerSecond * int256(_timeElapsed)));

    //     // Update debuff status based on oil rate
    //     if (_oilPerSecond >= 0) {
    //         ECSLib._removeBool("IsDebuffed", _playerID);
    //     } else {
    //         ECSLib._setBool("IsDebuffed", _playerID);
    //     }

    //     ECSLib._setUint("BalanceLastUpdated", _playerID, block.timestamp);
    // }

    function _addGuard(uint256 _cityID) public returns (uint256 _guardID) {
        WorldConstants memory _constants = gs().worldConstants;
        _guardID = ECSLib._addEntity();
        ECSLib._setString("Tag", _guardID, "Guard");
        ECSLib._setUint("City", _guardID, _cityID);
        ECSLib._setUint("Health", _guardID, _constants.cityHealth);
        ECSLib._setUint("Attack", _guardID, _constants.cityAttack);
        ECSLib._setUint("Defense", _guardID, _constants.cityDefense);
    }

    // ----------------------------------------------------------
    // LOGIC GETTERS
    // ----------------------------------------------------------

    function _getArmyConstituents(uint256 _armyID) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("Keeper").getEntitiesWithValue(_armyID));
        _set2.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("ArmyConstituent")));
        return ECSLib._intersection(_set1, _set2);
    }

    function _getPlayerSignatures(uint256 _playerID) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("Owner").getEntitiesWithValue(_playerID));
        _set2.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("Signature")));
        return ECSLib._intersection(_set1, _set2);
    }

    function _getCityTiles(uint256 _cityID) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("City").getEntitiesWithValue(_cityID));
        _set2.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("Tile")));
        return ECSLib._intersection(_set1, _set2);
    }

    function _getBattles(uint256 _armyID) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        Set _set3 = new Set();
        _set1.addArray(ECSLib._getUintComponent("Source").getEntitiesWithValue(_armyID));
        _set2.addArray(ECSLib._getUintComponent("Target").getEntitiesWithValue(_armyID));
        _set3.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("Battle")));
        return ECSLib._concatenate(ECSLib._intersection(_set1, _set3), ECSLib._intersection(_set2, _set3));
    }

    function _getPlayerArmies(uint256 _playerID) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("Owner").getEntitiesWithValue(_playerID));
        _set2.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("Army")));
        return ECSLib._intersection(_set1, _set2);
    }

    function _getPlayerCities(uint256 _playerID) public returns (uint256[] memory) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("Owner").getEntitiesWithValue(_playerID));
        _set2.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("City")));
        return ECSLib._intersection(_set1, _set2);
    }

    function _getArmyGather(uint256 _armyID) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("Army").getEntitiesWithValue(_armyID));
        _set2.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("ResourceGather")));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getResourceAt(Position memory _position) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("Resource")));
        _set2.addArray(ECSLib._getPositionComponent("Position").getEntitiesWithValue(_position));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
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

    function _getCityGuard(uint256 _cityID) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("Guard")));
        _set2.addArray(ECSLib._getUintComponent("City").getEntitiesWithValue(_cityID));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getTemplateByInventoryType(string memory _inventoryType) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        Set _set3 = new Set();
        _set1.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate")));
        _set2.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("TroopTemplate")));
        _set3.addArray(ECSLib._getStringComponent("InventoryType").getEntitiesWithValue(_inventoryType));
        uint256[] memory _inter1 = ECSLib._intersection(_set1, _set3);
        uint256[] memory _inter2 = ECSLib._intersection(_set2, _set3);
        _set1 = new Set();
        _set2 = new Set();
        _set1.addArray(_inter1);
        _set2.addArray(_inter2);
        uint256[] memory _result = ECSLib._union(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getArmyInventory(uint256 _armyID, uint256 _templateID) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("Army").getEntitiesWithValue(_armyID));
        _set2.addArray(ECSLib._getUintComponent("Template").getEntitiesWithValue(_templateID));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getInventory(uint256 _cityID, uint256 _templateID) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("City").getEntitiesWithValue(_cityID));
        _set2.addArray(ECSLib._getUintComponent("Template").getEntitiesWithValue(_templateID));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        // // FIXME: THERE EXISTS A BUG HERE
        // if (_result.length > 1) {
        //     console.log("Uh-oh");
        //     for (uint256 i = 0; i < _result.length; i++) {
        //         console.log(ECSLib._getString("InventoryType", _templateID));
        //         console.log(ECSLib._getString("Tag", _templateID));
        //     }
        // }

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getSettlerAt(Position memory _position) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("Settler")));
        _set2.addArray(ECSLib._getPositionComponent("Position").getEntitiesWithValue(_position));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getPlayer(address _address) public view returns (uint256) {
        return gs().playerEntityMap[_address];
    }

    function _getBattleDamages(
        uint256 _army1,
        uint256 _army2,
        uint256 _duration
    ) public view returns (uint256 _damageOn1, uint256 _damageOn2) {
        _damageOn1 = (_duration * ECSLib._getUint("Attack", _army2) * 2) / ECSLib._getUint("Defense", _army1);
        _damageOn2 = (_duration * ECSLib._getUint("Attack", _army1) * 2) / ECSLib._getUint("Defense", _army2);
    }

    // function _getDebuffedArmyDamagePerHit(uint256[] memory _troopEntities) public view returns (uint256) {
    //     uint256 _infantryPercentage = _getInfantryPercentage(_troopEntities);
    //     uint256 _debuffFactor = (gs().worldConstants.debuffFactor * (100 - _infantryPercentage)) / 100; // Only non-infantries are debuffed
    //     return (_getArmyDamagePerHit(_troopEntities) * (100 - _debuffFactor)) / 100;
    // }

    function _getCityCenter(uint256 _cityID) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getUintComponent("City").getEntitiesWithValue(_cityID));
        _set2.addArray(ECSLib._getStringComponent("BuildingType").getEntitiesWithValue(string("City Center")));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length == 1);
        return _result[0];
    }

    function _getTileAt(Position memory _position) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(ECSLib._getPositionComponent("Position").getEntitiesWithValue(_position));
        _set2.addArray(ECSLib._getStringComponent("Tag").getEntitiesWithValue(string("Tile")));
        uint256[] memory _result = ECSLib._intersection(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : _NULL();
    }

    function _getMapTileAt(Position memory _position) public view returns (Tile memory) {
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

    function _adjacentToCity(Position memory _position, uint256 _cityID) public view returns (bool) {
        Position memory _centerPosition = ECSLib._getPosition("Position", _cityID);
        return !_coincident(_position, _centerPosition) && _withinDistance(_position, _centerPosition, 2);
    }

    function _getSettlerHealthAndSpeedByLevel(uint256 _level) public pure returns (uint256, uint256) {
        require(_level >= 1, "CURIO: City level must be at least 1");
        return (_level * 2 + 5, 1); // FIXME: temporary
    }

    function _getCityTileCountByLevel(uint256 _level) public pure returns (uint256) {
        require(_level >= 1, "CURIO: City level must be at least 1");
        return ((_level + 1) * (_level + 2)) / 2 + 6;
    }

    // checkers

    function gamePauseCheck() public view {
        require(!gs().isPaused, "CURIO: Game is paused");
    }

    function validEntityCheck(uint256 _entity) public view {
        require(Set(gs().entities).includes(_entity), "CURIO: Entity object not found");
    }

    function activePlayerCheck(address _player) public view {
        uint256 _playerID = _getPlayer(_player);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");
    }

    function entityOwnershipCheckByAddress(uint256 _entity, address _player) public view {
        uint256 _playerID = _getPlayer(_player);
        require(ECSLib._getUint("Owner", _entity) == _playerID, "CURIO: Entity is not yours");
    }

    function positionInboundCheck(Position memory _position) public view {
        require(_inBound(_position), "CURIO: Position out of bounds");
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

    function _includesPosition(Position memory _p, Position[] memory _area) internal pure returns (bool) {
        for (uint256 i = 0; i < _area.length; i++) {
            if (_coincident(_p, _area[i])) return true;
        }
        return false;
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
