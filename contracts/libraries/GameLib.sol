//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {ComponentSpec, GameState, Position, Terrain, Tile, ValueType, WorldConstants, QueryCondition, QueryType} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Templates} from "contracts/libraries/Templates.sol";
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

    function registerComponents(address _gameAddr, ComponentSpec[] memory _componentSpecs) internal {
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

    function initializeTile(Position memory _startPosition) internal returns (uint256) {
        require(isProperTilePosition(_startPosition), "CURIO: Not proper tile position");
        if (getTileAt(_startPosition) != 0) return getTileAt(_startPosition);

        // Load constants
        uint256 batchSize = gs().worldConstants.initBatchSize;
        uint256 numInitTerrainTypes = gs().worldConstants.numInitTerrainTypes;

        // Decode tile terrain
        uint256 tileX = _startPosition.x / gs().worldConstants.tileWidth;
        uint256 tileY = _startPosition.y / gs().worldConstants.tileWidth;
        uint256 encodedCol = gs().encodedColumnBatches[tileX][tileY / batchSize] % (numInitTerrainTypes**((tileY % batchSize) + 1));
        uint256 divFactor = numInitTerrainTypes**(tileY % batchSize);
        uint256 terrain = encodedCol / divFactor;

        // // Initialize as plain if plain, 1-3 level gold mine, or barbarian
        // if (terrain <= 3) {
        //     gs().map[_position.x][_position.y].terrain = Terrain(0);
        // }
        // gs().map[_position.x][_position.y].isInitialized = true;

        // Initialize gold mine
        if (terrain == 1 || terrain == 2 || terrain == 3) {
            // require(getResourceAtTile(_startPosition) != 0, "CURIO: Resource is missing at location"); // avoid initializing two resources on the same tile

            uint256 goldMineID = ECSLib.addEntity();
            ECSLib.setString("Tag", goldMineID, "Resource");
            ECSLib.setUint("Template", goldMineID, getTemplateByInventoryType("Gold"));
            ECSLib.setUint("Level", goldMineID, 0); // initialize at zero is equivalent to not having a gold mine "built"
            ECSLib.setPosition("StartPosition", goldMineID, getProperTilePosition(_startPosition));
            ECSLib.setUint("LastTimestamp", goldMineID, block.timestamp);
            ECSLib.setUint("Amount", goldMineID, _goldLevelSelector(terrain)); // it happens that the gold level is the same as the terrain index
        }

        // if (terrain >= 4 && terrain <= 6) {
        //     // Initialize barbarian
        //     uint256 barbarianID = ECSLib.addEntity();
        //     uint256 infantryAmount = _barbarianInfantrySelector(terrain - 3);
        //     uint256 infantryTemplate = getTemplateByInventoryType("Infantry");

        //     uint256 infantryConstituentID = ECSLib.addEntity();
        //     ECSLib.setString("Tag", infantryConstituentID, "ArmyConstituent");
        //     ECSLib.setUint("Keeper", infantryConstituentID, barbarianID);
        //     ECSLib.setUint("Template", infantryConstituentID, infantryTemplate);
        //     ECSLib.setUint("Amount", infantryConstituentID, infantryAmount);

        //     ECSLib.setString("Tag", barbarianID, "Army");
        //     ECSLib.setPosition("Position", barbarianID, _position);
        //     ECSLib.setUint("Health", barbarianID, ECSLib.getUint("Health", infantryTemplate) * infantryAmount);
        //     ECSLib.setUint("Speed", barbarianID, ECSLib.getUint("Speed", infantryTemplate));
        //     ECSLib.setUint("Attack", barbarianID, ECSLib.getUint("Attack", infantryTemplate) * infantryAmount);
        //     ECSLib.setUint("Defense", barbarianID, ECSLib.getUint("Defense", infantryTemplate) * infantryAmount);
        // }

        // Initialize tile
        uint256 tileID = Templates.addTile(_startPosition);

        // Initialize defense
        Templates.addConstituent(tileID, gs().templates["Guard"], gs().worldConstants.tileGuardAmount);

        return tileID;
    }

    function _goldLevelSelector(uint256 _goldLevel) private pure returns (uint256) {
        if (_goldLevel == 1) return 100;
        if (_goldLevel == 2) return 200;
        if (_goldLevel == 3) return 300;
        return 0;
    }

    function _goldmineUpgradeCost(uint256 _currentLevel) public pure returns (uint256) {
        require(_currentLevel <= 2, "CURIO: Max goldmine level reached");
        if (_currentLevel == 0) return 2000; // level 0 to 1 (builds gold mine extra cost)
        if (_currentLevel == 1) return 1000; // level 1 to 2
        if (_currentLevel == 2) return 1000; // level 2 to 3
    }

    function _goldmineProductionRate(uint256 _level) public pure returns (uint256) {
        if (_level == 1) return 1;
        if (_level == 2) return 2;
        if (_level == 3) return 3;
    }

    function _barbarianInfantrySelector(uint256 _level) private pure returns (uint256) {
        return _level * 1000;
    }

    function removeArmy(uint256 _armyID) internal {
        uint256[] memory _constituentIDs = getConstituents(_armyID);
        for (uint256 i = 0; i < _constituentIDs.length; i++) {
            ECSLib.removeEntity(_constituentIDs[i]);
        }
        ECSLib.removeEntity(getArmyInventory(_armyID, gs().templates["Gold"]));
        ECSLib.removeEntity(_armyID);
    }

    function endGather(uint256 _armyID) internal {
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

        uint256 resourceID = getResourceAtTile(getProperTilePosition(position));
        uint256 resourceAmount = ECSLib.getUint("Amount", resourceID);

        // Gather
        uint256 _gatherAmount = (block.timestamp - ECSLib.getUint("InitTimestamp", gatherID)) / ECSLib.getUint("Duration", templateID);
        if (_gatherAmount > resourceAmount) _gatherAmount = resourceAmount;
        if (_gatherAmount > (ECSLib.getUint("Load", _armyID) - armyAmount)) _gatherAmount = ECSLib.getUint("Load", _armyID) - armyAmount;
        ECSLib.setUint("Amount", inventoryID, armyAmount + _gatherAmount);
        ECSLib.setUint("Amount", resourceID, resourceAmount - _gatherAmount);

        if (_gatherAmount == resourceAmount) ECSLib.removeEntity(resourceID);

        ECSLib.removeEntity(gatherID);
    }

    function getAttackBonus(uint256 _offenderTemplateID, uint256 _defenderTemplateID) public view returns (uint256) {
        uint256 horsemanTemplateId = gs().templates["Horseman"];
        uint256 warriorTemplateId = gs().templates["Warrior"];
        uint256 slingerTemplateId = gs().templates["Slinger"];

        if (_offenderTemplateID == horsemanTemplateId) {
            if (_defenderTemplateID == warriorTemplateId) return 80;
            if (_defenderTemplateID == slingerTemplateId) return 120;
            else return 100;
        } else if (_offenderTemplateID == warriorTemplateId) {
            if (_defenderTemplateID == slingerTemplateId) return 80;
            if (_defenderTemplateID == horsemanTemplateId) return 120;
            else return 100;
        } else if (_offenderTemplateID == slingerTemplateId) {
            if (_defenderTemplateID == horsemanTemplateId) return 80;
            if (_defenderTemplateID == warriorTemplateId) return 120;
            else return 100;
        } else return 100;
    }

    function attack(
        uint256 _offenderID,
        uint256 _defenderID,
        bool _transferGoldUponVictory,
        bool _transferOwnershipUponVictory,
        bool _removeUponVictory
    ) internal returns (bool victory) {
        uint256[] memory offenderConstituentIDs = getConstituents(_offenderID);
        uint256[] memory defenderConstituentIDs = getConstituents(_defenderID);

        // Offender attacks defender
        {
            uint256 loss;
            for (uint256 i = 0; i < offenderConstituentIDs.length; i++) {
                if (ECSLib.getUint("Amount", offenderConstituentIDs[i]) == 0) continue;
                for (uint256 j = 0; j < defenderConstituentIDs.length; j++) {
                    uint256 troopTypeBonus = getAttackBonus(ECSLib.getUint("Template", offenderConstituentIDs[i]), ECSLib.getUint("Template", defenderConstituentIDs[j]));

                    if (ECSLib.getUint("Amount", defenderConstituentIDs[j]) == 0) continue;
                    loss =
                        (troopTypeBonus * (GameLib.sqrt(ECSLib.getUint("Amount", offenderConstituentIDs[i])) * ECSLib.getUint("Attack", ECSLib.getUint("Template", offenderConstituentIDs[i])) * 2)) / //
                        (ECSLib.getUint("Defense", ECSLib.getUint("Template", defenderConstituentIDs[j])) * ECSLib.getUint("Health", ECSLib.getUint("Template", defenderConstituentIDs[j])));

                    if (loss >= ECSLib.getUint("Amount", defenderConstituentIDs[j])) {
                        ECSLib.removeEntity(defenderConstituentIDs[j]);
                    } else {
                        ECSLib.setUint("Amount", defenderConstituentIDs[j], ECSLib.getUint("Amount", defenderConstituentIDs[j]) - loss);
                    }
                }
            }
        }

        // Check defender status
        if (getConstituents(_defenderID).length == 0) {
            victory = true;

            if (_transferGoldUponVictory) {
                // Offender takes defender's gold
                uint256 offenderInventoryAmount = ECSLib.getUint("Amount", getArmyInventory(_offenderID, gs().templates["Gold"]));
                uint256 capturedAmount = ECSLib.getUint("Amount", getArmyInventory(_defenderID, gs().templates["Gold"]));
                if (capturedAmount > ECSLib.getUint("Load", _offenderID) - offenderInventoryAmount) capturedAmount = ECSLib.getUint("Load", _offenderID) - offenderInventoryAmount;
                ECSLib.setUint("Amount", getArmyInventory(_offenderID, gs().templates["Gold"]), offenderInventoryAmount + capturedAmount);
            }

            if (_transferOwnershipUponVictory) {
                // Defender becomes owned by offender's owner
                ECSLib.setUint("Owner", _defenderID, ECSLib.getUint("Owner", _offenderID));
            }

            if (_removeUponVictory) {
                // Defender is removed
                uint256 defenderInventoryID = getArmyInventory(_defenderID, gs().templates["Gold"]);
                if (defenderInventoryID != 0) ECSLib.removeEntity(defenderInventoryID);
                ECSLib.removeEntity(_defenderID);
            }
        } else {
            victory = false;
        }
    }

    function battleOnce(
        uint256 _keeperIdA,
        uint256 _keeperIdB,
        bool _transferGoldUponVictory,
        bool _transferOwnershipUponVictory,
        bool _removeUponVictory
    ) internal returns (bool victory) {
        victory = attack(_keeperIdA, _keeperIdB, _transferGoldUponVictory, _transferOwnershipUponVictory, _removeUponVictory);
        if (!victory) attack(_keeperIdB, _keeperIdA, _transferGoldUponVictory, _transferOwnershipUponVictory, _removeUponVictory);
    }

    // ----------------------------------------------------------
    // LOGIC GETTERS
    // ----------------------------------------------------------

    function getConstituents(uint256 _keeperID) public returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Keeper", abi.encode(_keeperID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Constituent"));
        return ECSLib.query(query);
    }

    function getPlayerSignatures(uint256 _playerID) internal returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Owner", abi.encode(_playerID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Signature"));
        return ECSLib.query(query);
    }

    function getCityTiles(uint256 _cityID) internal returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "City", abi.encode(_cityID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Tile"));
        return ECSLib.query(query);
    }

    function getPlayerArmies(uint256 _playerID) internal returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Owner", abi.encode(_playerID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Army"));
        return ECSLib.query(query);
    }

    function getMovableEntitiesAtTile(Position memory _startPosition) internal returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.Has, "Speed", new bytes(0));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "StartPosition", abi.encode(_startPosition));
        return ECSLib.query(query);
    }

    function getBuildingProduction(uint256 _buildingID) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Keeper", abi.encode(_buildingID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("TroopProduction"));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getArmyGather(uint256 _armyID) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Army", abi.encode(_armyID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("ResourceGather"));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getResourceAtTile(Position memory _startPosition) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode(string("Resource")));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "StartPosition", abi.encode(_startPosition));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getMovableEntityAt(Position memory _position) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.Has, "Speed", new bytes(0));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Position", abi.encode(_position));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getArmyAt(Position memory _position) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode(string("Army")));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Position", abi.encode(_position));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getCityAtTile(Position memory _startPosition) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("City"));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "StartPosition", abi.encode(_startPosition));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    // function getCityGuard(uint256 _cityID) internal returns (uint256) {
    //     QueryCondition[] memory query = new QueryCondition[](2);
    //     query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Guard"));
    //     query[1] = ECSLib.queryChunk(QueryType.HasVal, "City", abi.encode(_cityID));
    //     uint256[] memory res = ECSLib.query(query);
    //     assert(res.length <= 1);
    //     return res.length == 1 ? res[0] : 0;
    // }

    function getTemplateByInventoryType(string memory _inventoryType) internal returns (uint256) {
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

    function getArmyInventory(uint256 _armyID, uint256 _templateID) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](3);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("TroopInventory"));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Army", abi.encode(_armyID));
        query[2] = ECSLib.queryChunk(QueryType.HasVal, "Template", abi.encode(_templateID));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getInventory(uint256 _cityID, uint256 _templateID) internal returns (uint256) {
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

    function getSettlerAt(Position memory _position) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Settler"));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Position", abi.encode(_position));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getPlayer(address _address) internal view returns (uint256) {
        return gs().playerEntityMap[_address];
    }

    function getBattleDamages(
        uint256 _army1,
        uint256 _army2,
        uint256 _duration
    ) internal view returns (uint256 _damageOn1, uint256 _damageOn2) {
        _damageOn1 = (_duration * ECSLib.getUint("Attack", _army2) * 2) / ECSLib.getUint("Defense", _army1);
        _damageOn2 = (_duration * ECSLib.getUint("Attack", _army1) * 2) / ECSLib.getUint("Defense", _army2);
    }

    function getCityGold(uint256 _cityId) internal returns (uint256) {
        uint256 _goldInventoryID = getInventory(_cityId, gs().templates["Gold"]);
        uint256 _balance = _goldInventoryID != 0 ? ECSLib.getUint("Amount", _goldInventoryID) : 0;
        return _balance;
    }

    function setCityGold(uint256 _cityId, uint256 _goldAmount) internal {
        uint256 _goldInventoryID = getInventory(_cityId, gs().templates["Gold"]);
        ECSLib.setUint("Amount", _goldInventoryID, _goldAmount);
    }

    function getCityCenter(uint256 _cityID) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "City", abi.encode(_cityID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "BuildingType", abi.encode("City Center"));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getTileOfCityCenter(uint256 _cityID) internal returns (uint256) {
        uint256 _cityCenterId = getCityCenter(_cityID);
        Position memory cityCenterPosition = ECSLib.getPosition("StartPosition", _cityCenterId);
        return getTileAt(cityCenterPosition);
    }

    function getTileAt(Position memory _startPosition) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "StartPosition", abi.encode(_startPosition));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Tile"));
        uint256[] memory res = ECSLib.query(query);
        assert(res.length <= 1);
        return res.length == 1 ? res[0] : 0;
    }

    function getTileNeighbors(Position memory _startPosition) internal view returns (Position[] memory) {
        require(isProperTilePosition(_startPosition), "CURIO: Intended for tile neighbor");

        Position[] memory temp = new Position[](4);
        uint256 x = _startPosition.x;
        uint256 y = _startPosition.y;
        uint256 tileWidth = gs().worldConstants.tileWidth;
        uint256 neighborCount = 0;

        if (x > 0) {
            temp[neighborCount] = (Position({x: x - tileWidth, y: y}));
            neighborCount++;
        }
        if (x < gs().worldConstants.worldWidth - tileWidth) {
            temp[neighborCount] = (Position({x: x + 1, y: y}));
            neighborCount++;
        }
        if (y > 0) {
            temp[neighborCount] = (Position({x: x, y: y - 1}));
            neighborCount++;
        }
        if (y < gs().worldConstants.worldHeight - tileWidth) {
            temp[neighborCount] = (Position({x: x, y: y + 1}));
            neighborCount++;
        }

        Position[] memory result = new Position[](neighborCount);
        for (uint256 i = 0; i < neighborCount; i++) {
            result[i] = temp[i];
        }

        return result;
    }

    function isAdjacentToOwnTile(uint256 _playerID, Position memory _tilePosition) internal returns (bool) {
        Position[] memory neighborPositions = getTileNeighbors(_tilePosition);
        bool result = false;
        for (uint256 i = 0; i < neighborPositions.length; i++) {
            if (ECSLib.getUint("Owner", GameLib.getTileAt(neighborPositions[i])) == _playerID) {
                result = true;
                break;
            }
        }
        return result;
    }

    function adjacentToCity(Position memory _position, uint256 _cityID) internal view returns (bool) {
        Position memory _centerPosition = ECSLib.getPosition("Position", _cityID);
        return !coincident(_position, _centerPosition) && withinDistance(_position, _centerPosition, 2);
    }

    function getSettlerHealthByLevel(uint256 _level) internal pure returns (uint256) {
        require(_level >= 1, "CURIO: City level must be at least 1");
        return _level * 2 + 5;
    }

    function getCityTileCountByLevel(uint256 _level) internal pure returns (uint256) {
        require(_level >= 1, "CURIO: City level must be at least 1");
        return ((_level + 1) * (_level + 2)) / 2 + 6;
    }

    function getHarvestCap(uint256 _level) internal pure returns (uint256) {
        if (_level == 1) return 3000;
        if (_level == 2) return 6000;
        if (_level == 3) return 9000;
        if (_level == 4) return 12000;
        if (_level == 5) return 15000;
        return 0;
    }

    function getPlayerCity(uint256 _playerID) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Owner", abi.encode(_playerID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("City"));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: getPlayerCity query error");
        return res.length == 1 ? res[0] : 0;
    }

    function goldmineUpgradeSelector(uint256 _goldLevel) internal pure returns (uint256) {
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

    function inboundPositionCheck(Position memory _position) internal view {
        require(inBound(_position), "CURIO: Position out of bound");
    }

    // ----------------------------------------------------------
    // UTILITY FUNCTIONS
    // ----------------------------------------------------------

    function inBound(Position memory _p) internal view returns (bool) {
        return _p.x >= 0 && _p.x < gs().worldConstants.worldWidth && _p.y >= 0 && _p.y < gs().worldConstants.worldHeight;
    }

    function random(uint256 _max, uint256 _salt) internal view returns (uint256) {
        return uint256(keccak256(abi.encode(block.timestamp, block.difficulty, _salt))) % _max;
    }

    function connected(Position[] memory _positions) internal view returns (bool) {
        require(_positions.length > 0, "CURIO: Positions cannot be empty");

        for (uint256 i = 1; i < _positions.length; i++) {
            if (!adjacent(_positions[i - 1], _positions[i])) return false;
        }

        return true;
    }

    /**
     * @dev Belong to adjacent tiles.
     */
    function adjacent(Position memory _p1, Position memory _p2) internal view returns (bool) {
        uint256 _xDist = _p1.x >= _p2.x ? _p1.x - _p2.x : _p2.x - _p1.x;
        uint256 _yDist = _p1.y >= _p2.y ? _p1.y - _p2.y : _p2.y - _p1.y;
        uint256 _tileWidth = gs().worldConstants.tileWidth;
        return (_xDist == 0 && _yDist == _tileWidth) || (_xDist == _tileWidth && _yDist == 0);
    }

    /**
     * @dev From any position, get its proper tile position.
     */
    function getProperTilePosition(Position memory _p) internal view returns (Position memory) {
        uint256 _tileWidth = gs().worldConstants.tileWidth;
        return Position({x: _p.x - (_p.x % _tileWidth), y: _p.y - (_p.y % _tileWidth)});
    }

    /**
     * @dev From any proper tile position, get the midpoint position of that tile. Often used for spawning units.
     */
    function getMidPositionFromTilePosition(Position memory _tilePosition) internal view returns (Position memory) {
        uint256 tileWidth = gs().worldConstants.tileWidth;
        return Position({x: _tilePosition.x + tileWidth / 2, y: _tilePosition.y + tileWidth / 2});
    }

    /**
     * @dev Determine whether a position is a proper tile position, aka located exactly at the top-left corner of a tile.
     */
    function isProperTilePosition(Position memory _p) internal view returns (bool) {
        uint256 tileWidth = gs().worldConstants.tileWidth;
        return _p.x % tileWidth == 0 && _p.y % tileWidth == 0;
    }

    function coincident(Position memory _p1, Position memory _p2) internal pure returns (bool) {
        return _p1.x == _p2.x && _p1.y == _p2.y;
    }

    // Note: The current version treats a diagonal movement as two movements.
    // For treating as one, use `xDist <= _dist && yDist <= _dist` as return condition.
    function withinDistance(
        Position memory _p1,
        Position memory _p2,
        uint256 _dist
    ) internal pure returns (bool) {
        uint256 xDist = _p1.x >= _p2.x ? _p1.x - _p2.x : _p2.x - _p1.x;
        uint256 yDist = _p1.y >= _p2.y ? _p1.y - _p2.y : _p2.y - _p1.y;
        return (xDist + yDist) <= _dist;
    }

    function strEq(string memory _s1, string memory _s2) internal pure returns (bool) {
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

    function euclidean(Position memory _p1, Position memory _p2) internal pure returns (uint256) {
        uint256 a = _p2.x >= _p1.x ? _p2.x - _p1.x : _p1.x - _p2.x;
        uint256 b = _p2.y >= _p1.y ? _p2.y - _p1.y : _p1.y - _p2.y;

        return sqrt(a**2 + b**2);
    }

    function sum(uint256[] memory _arr) internal pure returns (uint256) {
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

    function min(uint256 x, uint256 y) internal pure returns (uint256) {
        return x <= y ? x : y;
    }
}
