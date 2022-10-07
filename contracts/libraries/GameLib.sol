//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {ComponentSpec, GameState, Position, Terrain, Tile, ValueType, WorldConstants, QueryCondition, QueryType} from "contracts/libraries/Types.sol";
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

    function registerComponents(address _gameAddr, ComponentSpec[] memory _componentSpecs) public {
        for (uint256 i = 0; i < _componentSpecs.length; i++) {
            ComponentSpec memory spec = _componentSpecs[i];

            // Create corresponding typed component and register its address
            address addr;
            if (spec.valueType == ValueType.ADDRESS) {
                addr = address(new AddressComponent(_gameAddr));
            } else if (spec.valueType == ValueType.BOOL) {
                addr = address(new BoolComponent(_gameAddr));
            } else if (spec.valueType == ValueType.INT) {
                addr = address(new IntComponent(_gameAddr));
            } else if (spec.valueType == ValueType.POSITION) {
                addr = address(new PositionComponent(_gameAddr));
            } else if (spec.valueType == ValueType.STRING) {
                addr = address(new StringComponent(_gameAddr));
            } else if (spec.valueType == ValueType.UINT) {
                addr = address(new UintComponent(_gameAddr));
            } else if (spec.valueType == ValueType.UINT_ARRAY) {
                addr = address(new UintArrayComponent(_gameAddr));
            } else {
                addr = address(new Component(_gameAddr));
            }
            gs().components[spec.name] = addr;

            // Record identifier entity for component
            uint256 componentID = ECSLib.addEntity();
            ECSLib.setBool("IsComponent", componentID);
            gs().componentEntityToAddress[componentID] = addr;

            gs().componentNames.push(spec.name);

            emit ECSLib.NewComponent(spec.name, componentID);
        }
    }

    function initializeTile(Position memory _position) public {
        if (getMapTileAt(_position).isInitialized) return;

        WorldConstants memory worldConstants = gs().worldConstants;
        uint256 batchSize = worldConstants.initBatchSize;
        uint256 numInitTerrainTypes = worldConstants.numInitTerrainTypes;

        uint256 encodedCol = gs().encodedColumnBatches[_position.x][_position.y / batchSize] % (numInitTerrainTypes**((_position.y % batchSize) + 1));
        uint256 divFactor = numInitTerrainTypes**(_position.y % batchSize);
        uint256 terrain = encodedCol / divFactor;

        //  add a tile
        // Templates.addCityTile(getProperTilePosition(_position));

        // if it's land, 1-3 level gold mine, or barbarian, initialize as land
        if (terrain <= 3) {
            gs().map[_position.x][_position.y].terrain = Terrain(0);
        }

        // if it's a gold mine, initialize it
        if (terrain == 1 || terrain == 2 || terrain == 3) {
            if (getResourceAt(_position) != 0) return; // avoid initializing two resources on the same tile

            uint256 goldMineID = ECSLib.addEntity();
            uint256 goldMineLevel = terrain; // it happens that the gold level is the same as the terrain index

            ECSLib.setString("Tag", goldMineID, "Resource");
            ECSLib.setUint("Template", goldMineID, getTemplateByInventoryType("Gold"));
            ECSLib.setUint("Level", goldMineID, 1); // FIXME: initialize at 1 for testing only. initialize at zero is equivalent to not having a gold mine "built"
            ECSLib.setPosition("StartPosition", goldMineID, getProperTilePosition(_position));
            ECSLib.setPosition("Position", goldMineID, _position);
            ECSLib.setUint("LastTimestamp", goldMineID, block.timestamp);
            ECSLib.setUint("Amount", goldMineID, _goldLevelSelector(goldMineLevel));
            ECSLib.setUint("Load", goldMineID, 100); // FIXME: placeholder
            // ECSLib.setUint("Amount", _entity, _value);
            // add resource cap
        }

        // if it's a barbarian, initialize it
        if (terrain >= 4 && terrain <= 6) {
            uint256 barbarianID = ECSLib.addEntity();
            uint256 infantryAmount = _barbarianInfantrySelector(terrain - 3);
            uint256 infantryTemplate = getTemplateByInventoryType("Infantry");

            uint256 infantryConstituentID = ECSLib.addEntity();
            ECSLib.setString("Tag", infantryConstituentID, "ArmyConstituent");
            ECSLib.setUint("Keeper", infantryConstituentID, barbarianID);
            ECSLib.setUint("Template", infantryConstituentID, infantryTemplate);
            ECSLib.setUint("Amount", infantryConstituentID, infantryAmount);

            ECSLib.setString("Tag", barbarianID, "Army");
            ECSLib.setPosition("Position", barbarianID, _position);
            ECSLib.setUint("Health", barbarianID, ECSLib.getUint("Health", infantryTemplate) * infantryAmount);
            ECSLib.setUint("Speed", barbarianID, ECSLib.getUint("Speed", infantryTemplate));
            ECSLib.setUint("Attack", barbarianID, ECSLib.getUint("Attack", infantryTemplate) * infantryAmount);
            ECSLib.setUint("Defense", barbarianID, ECSLib.getUint("Defense", infantryTemplate) * infantryAmount);
        }

        gs().map[_position.x][_position.y].isInitialized = true;

        initializeTileChunk(_position); // add tile if it hasn't been initialized
    }

    function initializeTileChunk(Position memory _position) public {
        Position memory properPosition = getProperTilePosition(_position);

        uint256 tileId = getTileAt(properPosition);
        if (tileId != 0) return; // tile already initialized

        uint256 tileID = ECSLib.addEntity();
        ECSLib.setString("Tag", tileID, "Tile");
        ECSLib.setPosition("Position", tileID, properPosition);
        ECSLib.setUint("City", tileID, 0);
    }

    function _goldLevelSelector(uint256 _goldLevel) private pure returns (uint256) {
        if (_goldLevel == 1) return 10000;
        if (_goldLevel == 2) return 20000;
        if (_goldLevel == 3) return 30000;
        return 0;
    }

    function _barbarianInfantrySelector(uint256 _level) private pure returns (uint256) {
        return _level * 1000;
    }

    function removeArmy(uint256 _armyID) public {
        uint256[] memory _constituentIDs = getArmyConstituents(_armyID);
        for (uint256 i = 0; i < _constituentIDs.length; i++) {
            ECSLib.removeEntity(_constituentIDs[i]);
        }
        ECSLib.removeEntity(_armyID);
    }

    function endGather(uint256 _armyID) public {
        Position memory position = ECSLib.getPosition("Position", _armyID);

        // Verify that a gather process is present
        uint256 gatherID = getArmyGather(_armyID);
        require(gatherID != 0, "CURIO: Need to start gathering first");

        // Get army's and resource's remaining capacities
        uint256 templateID = ECSLib.getUint("Template", gatherID);
        uint256 inventoryID = getArmyInventory(_armyID, templateID);
        uint256 armyAmount;
        if (inventoryID == 0) {
            armyAmount = 0;

            inventoryID = ECSLib.addEntity();
            ECSLib.setString("Tag", inventoryID, "TroopInventory");
            ECSLib.setUint("Army", inventoryID, _armyID);
            ECSLib.setUint("Template", inventoryID, templateID);
            ECSLib.setUint("Amount", inventoryID, armyAmount);
        } else {
            armyAmount = ECSLib.getUint("Amount", inventoryID);
        }

        uint256 resourceID = getResourceAt(getProperTilePosition(position));
        uint256 resourceAmount = ECSLib.getUint("Amount", resourceID);

        // Gather
        uint256 _gatherAmount = (block.timestamp - ECSLib.getUint("InitTimestamp", gatherID)) / ECSLib.getUint("Duration", templateID);
        if (_gatherAmount > resourceAmount) _gatherAmount = resourceAmount;
        if (_gatherAmount > (ECSLib.getUint("Capacity", _armyID) - armyAmount)) _gatherAmount = ECSLib.getUint("Capacity", _armyID) - armyAmount;
        ECSLib.setUint("Amount", inventoryID, armyAmount + _gatherAmount);
        ECSLib.setUint("Amount", resourceID, resourceAmount - _gatherAmount);

        if (_gatherAmount == resourceAmount) ECSLib.removeEntity(resourceID);

        ECSLib.removeEntity(gatherID);
    }

    // ----------------------------------------------------------
    // LOGIC GETTERS
    // ----------------------------------------------------------

    function getArmyConstituents(uint256 _armyID) public returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Keeper", abi.encode(_armyID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("ArmyConstituent"));
        return ECSLib.query(query);
    }

    function getPlayerSignatures(uint256 _playerID) public returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Owner", abi.encode(_playerID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Signature"));
        return ECSLib.query(query);
    }

    function getCityTiles(uint256 _cityID) public returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "City", abi.encode(_cityID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Tile"));
        return ECSLib.query(query);
    }

    function getPlayerArmies(uint256 _playerID) public returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Owner", abi.encode(_playerID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Army"));
        return ECSLib.query(query);
    }

    function getBuildingProduction(uint256 _buildingID) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Keeper", abi.encode(_buildingID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("TroopProduction"));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getArmyGather(uint256 _armyID) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Army", abi.encode(_armyID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("ResourceGather"));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getResourceAt(Position memory _position) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode(string("Resource")));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Position", abi.encode(_position));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getMovableEntityAt(Position memory _position) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.Has, "Speed", new bytes(0));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Position", abi.encode(_position));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getArmyAt(Position memory _position) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode(string("Army")));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Position", abi.encode(_position));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getCityAt(Position memory _position) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("City"));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "StartPosition", abi.encode(getProperTilePosition(_position)));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getCityGuard(uint256 _cityID) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Guard"));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "City", abi.encode(_cityID));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getTemplateByInventoryType(string memory _inventoryType) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();
        Set _set3 = new Set();
        _set1.addArray(ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate")));
        _set2.addArray(ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("TroopTemplate")));
        _set3.addArray(ECSLib.getStringComponent("InventoryType").getEntitiesWithValue(_inventoryType));
        uint256[] memory _inter1 = ECSLib.intersection(_set1, _set3);
        uint256[] memory _inter2 = ECSLib.intersection(_set2, _set3);
        _set1 = new Set();
        _set2 = new Set();
        _set1.addArray(_inter1);
        _set2.addArray(_inter2);
        uint256[] memory _result = ECSLib.union(_set1, _set2);

        assert(_result.length <= 1);
        return _result.length == 1 ? _result[0] : 0;
    }

    function getArmyInventory(uint256 _armyID, uint256 _templateID) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](3);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("TroopInventory"));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Army", abi.encode(_armyID));
        query[2] = ECSLib.queryChunk(QueryType.HasVal, "Template", abi.encode(_templateID));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getInventory(uint256 _cityID, uint256 _templateID) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "City", abi.encode(_cityID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Template", abi.encode(_templateID));
        uint256[] memory res = ECSLib.query(query);

        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(res);
        _set2.addArray(ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("Production")));
        res = ECSLib.difference(_set1, _set2);

        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getSettlerAt(Position memory _position) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Settler"));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Position", abi.encode(_position));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getPlayer(address _address) public view returns (uint256) {
        return gs().playerEntityMap[_address];
    }

    function getBattleDamages(
        uint256 _army1,
        uint256 _army2,
        uint256 _duration
    ) public view returns (uint256 _damageOn1, uint256 _damageOn2) {
        _damageOn1 = (_duration * ECSLib.getUint("Attack", _army2) * 2) / ECSLib.getUint("Defense", _army1);
        _damageOn2 = (_duration * ECSLib.getUint("Attack", _army1) * 2) / ECSLib.getUint("Defense", _army2);
    }

    function getCityGold(uint256 cityId) public returns (uint256) {
        uint256 _goldInventoryID = getInventory(cityId, getTemplateByInventoryType("Gold"));
        uint256 _balance = _goldInventoryID != 0 ? ECSLib.getUint("Amount", _goldInventoryID) : 0;
        return _balance;
    }

    function getCityCenter(uint256 _cityID) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "City", abi.encode(_cityID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "BuildingType", abi.encode("City Center"));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getTileAt(Position memory _position) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Position", abi.encode(_position));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Tile"));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getMapTileAt(Position memory _position) public view returns (Tile memory) {
        return gs().map[_position.x][_position.y];
    }

    function getNeighbors(Position memory _position) public view returns (Position[] memory) {
        Position[] memory _result = new Position[](4);
        uint256 _x = _position.x;
        uint256 _y = _position.y;

        if (_x > 0) _result[0] = (Position({x: _x - 1, y: _y}));
        if (_x < gs().worldConstants.worldWidth - 1) _result[1] = (Position({x: _x + 1, y: _y}));
        if (_y > 0) _result[2] = (Position({x: _x, y: _y - 1}));
        if (_y < gs().worldConstants.worldHeight - 1) _result[3] = (Position({x: _x, y: _y + 1}));

        return _result;
    }

    function adjacentToCity(Position memory _position, uint256 _cityID) public view returns (bool) {
        Position memory _centerPosition = ECSLib.getPosition("Position", _cityID);
        return !coincident(_position, _centerPosition) && withinDistance(_position, _centerPosition, 2);
    }

    function getSettlerHealthAndSpeedByLevel(uint256 _level) public pure returns (uint256, uint256) {
        require(_level >= 1, "CURIO: City level must be at least 1");
        return (_level * 2 + 5, 10); // FIXME: temporary
    }

    function getCityTileCountByLevel(uint256 _level) public pure returns (uint256) {
        require(_level >= 1, "CURIO: City level must be at least 1");
        return ((_level + 1) * (_level + 2)) / 2 + 6;
    }

    function getHarvestCap(uint256 _level) public pure returns (uint256) {
        if (_level == 1) return 3000;
        if (_level == 2) return 6000;
        if (_level == 3) return 9000;
        if (_level == 4) return 12000;
        if (_level == 5) return 15000;
        return 0;
    }

    function getTotalGoldCap(uint256 _level) internal pure returns (uint256) {
        if (_level == 1) return 12000;
        if (_level == 2) return 24000;
        if (_level == 3) return 36000;
        if (_level == 4) return 48000;
        if (_level == 5) return 60000;
        return 0;
    }

    function getPlayerCity(uint256 _playerID) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Owner", abi.encode(_playerID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("City"));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: getPlayerCity query error");
        return res.length == 1 ? res[0] : 0;
    }

    function goldmineUpgradeSelector(uint256 _goldLevel) public pure returns (uint256) {
        if (_goldLevel == 0) return 500; // from level 0 to 1 (purchasing gold mine
        return 0;
    }

    // checkers

    function ongoingGameCheck() internal view {
        require(!gs().isPaused, "CURIO: Game is paused");
    }

    function validEntityCheck(uint256 _entity) internal view {
        require(Set(gs().entities).includes(_entity), "CURIO: Entity object not found");
    }

    function activePlayerCheck(address _player) internal view {
        uint256 playerID = getPlayer(_player);
        require(ECSLib.getBoolComponent("IsActive").has(playerID), "CURIO: You are inactive");
    }

    function entityOwnershipCheck(uint256 _entity, address _player) internal view {
        uint256 playerID = getPlayer(_player);
        require(ECSLib.getUint("Owner", _entity) == playerID, "CURIO: Entity is not yours");
    }

    function neutralOrOwnedEntityCheck(uint256 _entity, address _player) internal view {
        uint256 _playerID = getPlayer(_player);
        uint256 entityOwner = ECSLib.getUint("Owner", _entity);
        require(entityOwner == _playerID || entityOwner == 0, "CURIO: Entity is not yours");
    }

    function inboundPositionCheck(Position memory _position) public view {
        require(inBound(_position), "CURIO: Position out of bounds");
    }

    // ----------------------------------------------------------
    // UTILITY FUNCTIONS
    // ----------------------------------------------------------

    function inBound(Position memory _p) public view returns (bool) {
        return _p.x >= 0 && _p.x < gs().worldConstants.worldWidth && _p.y >= 0 && _p.y < gs().worldConstants.worldHeight;
    }

    function random(uint256 _max, uint256 _salt) public view returns (uint256) {
        return uint256(keccak256(abi.encode(block.timestamp, block.difficulty, _salt))) % _max;
    }

    function connected(Position[] memory _positions) public view returns (bool) {
        require(_positions.length > 0, "CURIO: Positions cannot be empty");

        for (uint256 i = 1; i < _positions.length; i++) {
            if (!adjacent(_positions[i - 1], _positions[i])) return false;
        }

        return true;
    }

    /**
     * @dev Belong to adjacent tiles.
     */
    function adjacent(Position memory _p1, Position memory _p2) public view returns (bool) {
        uint256 _xDist = _p1.x >= _p2.x ? _p1.x - _p2.x : _p2.x - _p1.x;
        uint256 _yDist = _p1.y >= _p2.y ? _p1.y - _p2.y : _p2.y - _p1.y;
        uint256 _tileWidth = gs().worldConstants.tileWidth;
        return (_xDist == 0 && _yDist == _tileWidth) || (_xDist == _tileWidth && _yDist == 0);
    }

    /**
     * @dev From any position, get its proper tile position.
     */
    function getProperTilePosition(Position memory _p) public view returns (Position memory) {
        uint256 _tileWidth = gs().worldConstants.tileWidth;
        return Position({x: _p.x - (_p.x % _tileWidth), y: _p.y - (_p.y % _tileWidth)});
    }

    /**
     * @dev From any proper tile position, get the midpoint position of that tile. Often used for spawning units.
     */
    function getMidPositionFromTilePosition(Position memory _tilePosition) public view returns (Position memory) {
        uint256 tileWidth = gs().worldConstants.tileWidth;
        return Position({x: _tilePosition.x + tileWidth / 2, y: _tilePosition.y + tileWidth / 2});
    }

    /**
     * @dev Determine whether a position is a proper tile position, aka located exactly at the top-left corner of a tile.
     */
    function isProperTilePosition(Position memory _p) public view returns (bool) {
        uint256 tileWidth = gs().worldConstants.tileWidth;
        return _p.x % tileWidth == 0 && _p.y % tileWidth == 0;
    }

    function coincident(Position memory _p1, Position memory _p2) public pure returns (bool) {
        return _p1.x == _p2.x && _p1.y == _p2.y;
    }

    // Note: The current version treats a diagonal movement as two movements.
    // For treating as one, use `xDist <= _dist && yDist <= _dist` as return condition.
    function withinDistance(
        Position memory _p1,
        Position memory _p2,
        uint256 _dist
    ) public pure returns (bool) {
        uint256 xDist = _p1.x >= _p2.x ? _p1.x - _p2.x : _p2.x - _p1.x;
        uint256 yDist = _p1.y >= _p2.y ? _p1.y - _p2.y : _p2.y - _p1.y;
        return (xDist + yDist) <= _dist;
    }

    function strEq(string memory _s1, string memory _s2) public pure returns (bool) {
        return (keccak256(abi.encodePacked((_s1))) == keccak256(abi.encodePacked((_s2))));
    }

    function includesPosition(Position memory _p, Position[] memory _area) internal pure returns (bool) {
        for (uint256 i = 0; i < _area.length; i++) {
            if (coincident(_p, _area[i])) return true;
        }
        return false;
    }

    function getIndex(uint256 _element, uint256[] memory _array) internal pure returns (uint256) {
        uint256 index = 0;
        while (index < _array.length) {
            if (_array[index] == _element) break;
            index++;
        }
        return index;
    }

    function euclidean(Position memory _p1, Position memory _p2) public pure returns (uint256) {
        uint256 a = _p2.x >= _p1.x ? _p2.x - _p1.x : _p1.x - _p2.x;
        uint256 b = _p2.y >= _p1.y ? _p2.y - _p1.y : _p1.y - _p2.y;

        return sqrt(a**2 + b**2);
    }

    function sum(uint256[] memory _arr) public pure returns (uint256) {
        uint256 result = 0;
        for (uint256 i = 0; i < _arr.length; i++) {
            result += _arr[i];
        }
        return result;
    }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function min(uint256 x, uint256 y) public pure returns (uint256) {
        return x <= y ? x : y;
    }
}
