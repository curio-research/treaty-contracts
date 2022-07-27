//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {BASE_NAME, Base, GameState, Player, Position, TERRAIN, Tile, Troop, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/Component.sol";
import {Set} from "contracts/Set.sol";

/// @title Util library
/// @notice Contains all events as well as lower-level setters and getters
/// Util functions generally do not verify correctness of conditions. Make sure to verify in higher-level functions such as those in Engine.

library Util {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    // ----------------------------------------------------------
    // EVENTS
    // ----------------------------------------------------------

    event AttackedBase(address _player, uint256 _troopId, Troop _troopInfo, uint256 _targetBaseId, Base _targetBaseInfo);
    event AttackedTroop(address _player, uint256 _troopId, Troop _troopInfo, uint256 _targetTroopId, Troop _targetTroopInfo);
    event BaseCaptured(address _player, uint256 _troopId, uint256 _baseId);
    event Death(address _player, uint256 _troopId);
    event GamePaused();
    event GameResumed();
    event Moved(address _player, uint256 _troopId, uint256 _timestamp, Position _startPos, Position _targetPos);
    event NewPlayer(address _player, Position _pos);
    event NewTroop(address _player, uint256 _troopId, Troop _troop, Position _pos);
    event PlayerInfo(address _addr, Player _player);
    event PlayerReactivated(address _player);
    event Recovered(address _player, uint256 _troopId);
    event Repaired(address _player, uint256 _troopId, uint256 _health);
    event UpdatePlayerBalance(address _player, uint256 _amount);

    // ----------------------------------------------------------
    // ECS UTIL FUNCTIONS (temp)
    // ----------------------------------------------------------

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
            _setComponentValue("Health", _baseId, abi.encode(1));
            _setComponentValue("CanAttack", _baseId, abi.encode(true));
            _setComponentValue("CanPurchase", _baseId, abi.encode(true));
            _setComponentValue("AttackFactor", _baseId, abi.encode(100));
            _setComponentValue("DefenseFactor", _baseId, abi.encode(100));
            if (_terrainId == 3) {
                // Port
                _setComponentValue("Name", _baseId, abi.encode(BASE_NAME.PORT));
                _setComponentValue("GoldPerSecond", _baseId, abi.encode(_worldConstants.defaultBaseGoldGenerationPerSecond));
                _setComponentValue("GoldRatePositive", _baseId, abi.encode(true));
                _terrainId = 0;
            } else if (_terrainId == 4) {
                // City
                // Note: Now cities and ports are the same except their terrain sitting on!
                // Troop type produced now depends on the terrain, not on their nature any more.
                _setComponentValue("Name", _baseId, abi.encode(BASE_NAME.CITY));
                _setComponentValue("GoldPerSecond", _baseId, abi.encode(_worldConstants.defaultBaseGoldGenerationPerSecond));
                _setComponentValue("GoldRatePositive", _baseId, abi.encode(true));
                _terrainId = 1;
            } else if (_terrainId == 5) {
                // Oil well
                _setComponentValue("Name", _baseId, abi.encode(BASE_NAME.OIL_WELL));
                _setComponentValue("OilPerSecond", _baseId, abi.encode(_worldConstants.defaultWellOilGenerationPerSecond));
                _setComponentValue("OilRatePositive", _baseId, abi.encode(true));
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

    function _getPlayerId(address _playerAddr) public view returns (uint256) {
        return gs().playerIdMap[_playerAddr];
    }

    // Note: `occupantId` no longer needed thanks to Position component
    // TODO: Implement balance updates
    function _addTroopEntity(
        uint256 _playerId,
        Position memory _position,
        uint256 _troopTemplateId
    ) public returns (uint256) {
        // 1. Get number of player-owned troops and verify size
        uint256 _playerTroopCount = _getPlayerTroopCount(_playerId);
        require(_playerTroopCount < gs().worldConstants.maxTroopCountPerPlayer, "CURIO: Max troop count exceeded");

        // 2. Create new troop entity globally and in corresponding components
        uint256 _troopId = _addEntity();
        // troop fields
        _setComponentValue("IsActive", _troopId, abi.encode(true));
        _setComponentValue("Owner", _troopId, abi.encode(_playerId));
        _setComponentValue("LastMoved", _troopId, abi.encode(block.timestamp));
        _setComponentValue("LastLargeActionTaken", _troopId, abi.encode(0));
        _setComponentValue("LastRepaired", _troopId, abi.encode(block.timestamp));
        _setComponentValue("Health", _troopId, _getComponent("MaxHealth").getRawValue(_troopTemplateId));
        _setComponentValue("Position", _troopId, abi.encode(_position));
        // struct property fields
        _setComponentValue("CanMove", _troopId, abi.encode(true));
        _setComponentValue("CanAttack", _troopId, abi.encode(true));
        if (_getComponent("CanCapture").has(_troopTemplateId)) {
            _setComponentValue("CanCapture", _troopId, abi.encode(true));
        }
        // troop type fields
        _setComponentValue("Name", _troopId, _getComponent("Name").getRawValue(_troopTemplateId));
        if (_getComponent("IsLandTroop").has(_troopTemplateId)) {
            _setComponentValue("IsLandTroop", _troopId, abi.encode(true));
        }
        _setComponentValue("MaxHealth", _troopId, _getComponent("MaxHealth").getRawValue(_troopTemplateId));
        _setComponentValue("DamagePerHit", _troopId, _getComponent("DamagePerHit").getRawValue(_troopTemplateId));
        _setComponentValue("AttackFactor", _troopId, _getComponent("AttackFactor").getRawValue(_troopTemplateId));
        _setComponentValue("DefenseFactor", _troopId, _getComponent("DefenseFactor").getRawValue(_troopTemplateId));
        _setComponentValue("MovementCooldown", _troopId, _getComponent("MovementCooldown").getRawValue(_troopTemplateId));
        _setComponentValue("LargeActionCooldown", _troopId, _getComponent("LargeActionCooldown").getRawValue(_troopTemplateId));
        // _setComponentValue("Gold", _troopId, _getComponent("Gold").getRawValue(_troopTemplateId));
        _setComponentValue("OilPerSecond", _troopId, _getComponent("OilPerSecond").getRawValue(_troopTemplateId));
        Component _cargoCapacityComponent = _getComponent("CargoCapacity");
        if (_cargoCapacityComponent.has(_troopTemplateId)) {
            _setComponentValue("CargoCapacity", _troopId, _cargoCapacityComponent.getRawValue(_troopTemplateId));
        }

        // 4. Update balances
        // TODO: implement

        return _troopId;
    }

    function _addEntity() public returns (uint256) {
        Set _entities = Set(gs().entities);
        uint256 _newEntity = _entities.size() + 1;
        _entities.add(_newEntity);
        return _newEntity;
    }

    // FIXME: not too useful, can remove
    function _setComponentValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _value
    ) public {
        _getComponent(_componentName).set(_entity, _value);
    }

    function _getPlayerTroopCount(uint256 _playerId) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        uint256[] memory _entitiesOwnedByPlayer = _getComponent("Owner").getEntitiesWithValue(abi.encode(_playerId));
        uint256[] memory _allTroops = _getComponent("CanMove").getEntities();
        _set1.addArray(_entitiesOwnedByPlayer);
        _set2.addArray(_allTroops);
        return _intersection(_set1, _set2).length;
    }

    // Set-theoretic intersection
    function _intersection(Set _set1, Set _set2) public returns (uint256[] memory) {
        Set _searchedItems = new Set();

        uint256[] memory _temp = new uint256[](_set1.size() + _set2.size());
        uint256 _itemCount = 0;

        // Loop through first set
        for (uint256 i = 0; i < _set1.size(); i++) {
            uint256 _item = _set1.getItems()[i];

            // Check if item is in second set
            if (!_searchedItems.has(_item)) {
                if (_set2.has(_item)) {
                    _temp[_itemCount] = _item;
                    _itemCount++;
                }
            }

            _searchedItems.add(_item);
        }

        // Loop through second set
        for (uint256 i = 0; i < _set2.size(); i++) {
            uint256 _item = _set2.getItems()[i];

            // Check if item is in first set
            if (!_searchedItems.has(_item)) {
                if (_set1.has(_item)) {
                    _temp[_itemCount] = _item;
                    _itemCount++;
                }
            }

            _searchedItems.add(_item);
        }

        // Copy result to array with known length
        uint256[] memory _result = new uint256[](_itemCount);
        for (uint256 i = 0; i < _itemCount; i++) {
            _result[i] = _temp[i];
        }

        return _result;
    }

    // Set-theoretic difference
    function _difference(Set set1, Set set2) public view returns (uint256[] memory) {
        uint256[] memory _temp = new uint256[](set1.size());
        uint256 _itemCount = 0;

        // Loop through first set
        for (uint256 i = 0; i < set1.size(); i++) {
            uint256 _item = set1.getItems()[i];

            // Check if item is in second set
            if (!set2.has(_item)) {
                _temp[_itemCount] = _item;
                _itemCount++;
            }
        }

        uint256[] memory _result = new uint256[](_itemCount);
        for (uint256 i = 0; i < _itemCount; i++) {
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
    // SETTERS
    // ----------------------------------------------------------

    function _initializeTile(Position memory _pos) public {
        WorldConstants memory _worldConstants = gs().worldConstants;
        uint256 _batchSize = _worldConstants.initBatchSize;
        uint256 _numInitTerrainTypes = _worldConstants.numInitTerrainTypes;

        uint256 _encodedCol = gs().encodedColumnBatches[_pos.x][_pos.y / _batchSize] % (_numInitTerrainTypes**((_pos.y % _batchSize) + 1));
        uint256 _divFactor = _numInitTerrainTypes**(_pos.y % _batchSize);
        uint256 _terrainId = _encodedCol / _divFactor;

        if (_terrainId >= 3) {
            BASE_NAME _baseName = BASE_NAME(_terrainId - 3);
            _addBase(_pos, _baseName);

            if (BASE_NAME(_terrainId - 3) == BASE_NAME.OIL_WELL) {
                _terrainId = 0;
            } else {
                _terrainId -= 3;
            }
        }

        gs().map[_pos.x][_pos.y].isInitialized = true;
        gs().map[_pos.x][_pos.y].terrain = TERRAIN(_terrainId);
    }

    function _updatePlayerBalances(address _addr) public {
        Player memory _player = gs().playerMap[_addr];
        uint256 _timeElapsed = block.timestamp - _player.balanceLastUpdated;

        // Update gold balance
        _player.goldBalance += _player.totalGoldGenerationPerUpdate * _timeElapsed;

        // Update oil balance
        if (_player.totalOilGenerationPerUpdate >= _player.totalOilConsumptionPerUpdate) {
            // Gain
            _player.oilBalance += (_player.totalOilGenerationPerUpdate - _player.totalOilConsumptionPerUpdate) * _timeElapsed;
        } else {
            // Loss
            uint256 _reduction = (_player.totalOilConsumptionPerUpdate - _player.totalOilGenerationPerUpdate) * _timeElapsed;
            if (_reduction >= _player.oilBalance) {
                _player.oilBalance = 0;
                // _player.active = false; // Note: disabled for now, allowing negative balances
            } else {
                _player.oilBalance -= _reduction;
            }
        }

        _player.balanceLastUpdated = block.timestamp;
        gs().playerMap[_addr] = _player;
    }

    function _unloadTroopFromTransport(uint256 _troopTransportId, uint256 _cargoTroopId) public {
        uint256[] memory _cargoTroopIds = gs().troopIdMap[_troopTransportId].cargoTroopIds;
        uint256 _cargoSize = _cargoTroopIds.length;
        uint256 _index = 0;
        while (_index < _cargoSize) {
            if (_cargoTroopIds[_index] == _cargoTroopId) break;
            _index++;
        }

        gs().troopIdMap[_troopTransportId].cargoTroopIds[_index] = _cargoTroopIds[_cargoSize - 1];
        gs().troopIdMap[_troopTransportId].cargoTroopIds.pop();
    }

    function _removeTroop(uint256 _troopId) public {
        Troop memory _troop = _getTroop(_troopId);
        address _owner = _troop.owner;
        Position memory _pos = _troop.pos;

        uint256 _numOwnedTroops = gs().playerMap[_owner].numOwnedTroops;
        uint256 _totalOilConsumptionPerUpdate = gs().playerMap[_owner].totalOilConsumptionPerUpdate;

        for (uint256 i = 0; i < _troop.cargoTroopIds.length; i++) {
            uint256 _cargoId = _troop.cargoTroopIds[i];

            _numOwnedTroops--;
            _totalOilConsumptionPerUpdate -= _getOilConsumptionPerSecond(_getTroop(_cargoId).troopTypeId);
            delete gs().troopIdMap[_cargoId];
        }

        _numOwnedTroops--;
        _totalOilConsumptionPerUpdate -= _getOilConsumptionPerSecond(_troop.troopTypeId);
        delete gs().troopIdMap[_troopId];

        _updatePlayerBalances(_owner);
        gs().playerMap[_owner].numOwnedTroops = _numOwnedTroops;
        gs().playerMap[_owner].totalOilConsumptionPerUpdate = _totalOilConsumptionPerUpdate;

        Tile memory _tile = _getTileAt(_troop.pos);
        if (_canTransportTroop(_tile)) {
            _unloadTroopFromTransport(_tile.occupantId, _troopId);
        } else {
            gs().map[_pos.x][_pos.y].occupantId = _NULL();
        }
    }

    function _addTroop(
        address _owner,
        Position memory _pos,
        uint256 _troopTypeId
    ) public returns (uint256, Troop memory) {
        require(_getPlayer(_owner).numOwnedTroops < gs().worldConstants.maxTroopCountPerPlayer, "CURIO: Max troop count exceeded");

        uint256[] memory _cargoTroopIds;
        Troop memory _troop = Troop({
            owner: _owner,
            troopTypeId: _troopTypeId,
            lastMoved: block.timestamp,
            lastLargeActionTaken: 0,
            lastRepaired: block.timestamp,
            health: _getMaxHealth(_troopTypeId),
            pos: _pos,
            cargoTroopIds: _cargoTroopIds //
        });

        // Update map info
        uint256 _troopId = gs().troopNonce;
        gs().troopIds.push(_troopId);
        gs().troopIdMap[_troopId] = _troop;
        gs().troopNonce++;
        gs().map[_pos.x][_pos.y].occupantId = _troopId;

        // Update balances
        _updatePlayerBalances(_owner);
        gs().playerMap[_owner].numOwnedTroops++;
        gs().playerMap[_owner].totalOilConsumptionPerUpdate += _getOilConsumptionPerSecond(_troopTypeId);

        return (_troopId, gs().troopIdMap[_troopId]);
    }

    function _addBase(Position memory _pos, BASE_NAME _baseName) public returns (uint256) {
        bool _isOilWell = _baseName == BASE_NAME.OIL_WELL;
        uint256 _goldGenerationPerSecond = _isOilWell ? 0 : gs().worldConstants.defaultBaseGoldGenerationPerSecond;
        uint256 _oilGenerationPerSecond = _isOilWell ? gs().worldConstants.defaultWellOilGenerationPerSecond : 0;

        Base memory _base = Base({
            owner: address(0),
            name: _baseName,
            attackFactor: 100,
            defenseFactor: 100,
            health: 1,
            goldGenerationPerSecond: _goldGenerationPerSecond,
            oilGenerationPerSecond: _oilGenerationPerSecond,
            pos: _pos //
        });

        uint256 _baseId = gs().baseNonce;
        gs().baseIds.push(_baseId);
        gs().baseIdMap[_baseId] = _base;
        gs().baseNonce += 1;
        gs().map[_pos.x][_pos.y].baseId = _baseId;

        return _baseId;
    }

    // ----------------------------------------------------------
    // GETTERS
    // ----------------------------------------------------------

    function _isPlayerInitialized(address _player) public view returns (bool) {
        address[] memory _allPlayers = gs().players;
        for (uint256 i = 0; i < _allPlayers.length; i++) {
            if (_allPlayers[i] == _player) return true;
        }
        return false;
    }

    function _getPlayerCount() public view returns (uint256) {
        return gs().players.length;
    }

    function _getPlayer(address _player) public view returns (Player memory) {
        return gs().playerMap[_player];
    }

    function _isPlayerActive(address _player) public view returns (bool) {
        return gs().playerMap[_player].active;
    }

    function _getPlayerGoldBalance(address _player) public view returns (uint256) {
        return gs().playerMap[_player].goldBalance;
    }

    function _getPlayerOilBalance(address _player) public view returns (uint256) {
        return gs().playerMap[_player].oilBalance;
    }

    function _getTotalGoldGenerationPerUpdate(address _player) public view returns (uint256) {
        return gs().playerMap[_player].totalGoldGenerationPerUpdate;
    }

    function _getCargoCapacity(uint256 _troopId) public view returns (uint256) {
        return gs().troopTypeIdMap[gs().troopIdMap[_troopId].troopTypeId].cargoCapacity;
    }

    function _getTroop(uint256 _id) public view returns (Troop memory) {
        return gs().troopIdMap[_id];
    }

    function _getOilConsumptionPerSecond(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].oilConsumptionPerSecond;
    }

    function _getMaxHealth(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].maxHealth;
    }

    function _getTroopGoldPrice(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].goldPrice;
    }

    function _getDamagePerHit(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].damagePerHit;
    }

    function _getDefenseFactor(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].defenseFactor;
    }

    function _getAttackFactor(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].attackFactor;
    }

    function _getMovementCooldown(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].movementCooldown;
    }

    function _getLargeActionCooldown(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].largeActionCooldown;
    }

    function _isLandTroop(uint256 _troopTypeId) public view returns (bool) {
        return gs().troopTypeIdMap[_troopTypeId].isLandTroop;
    }

    function _getBaseHealth(uint256 _baseId) public view returns (uint256) {
        return gs().baseIdMap[_baseId].health;
    }

    function _getBaseOwner(uint256 _baseId) public view returns (address) {
        return gs().baseIdMap[_baseId].owner;
    }

    function _getBase(uint256 _id) external view returns (Base memory) {
        return gs().baseIdMap[_id];
    }

    function _canTransportTroop(Tile memory _tile) public view returns (bool) {
        return (_getCargoCapacity(_tile.occupantId) > 0) && (gs().troopIdMap[_tile.occupantId].cargoTroopIds.length < _getCargoCapacity(_tile.occupantId));
    }

    function _hasPort(Tile memory _tile) public view returns (bool) {
        return _tile.baseId != _NULL() && gs().baseIdMap[_tile.baseId].name == BASE_NAME.PORT;
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

    function _NULL() internal pure returns (uint256) {
        return 0;
    }
}
