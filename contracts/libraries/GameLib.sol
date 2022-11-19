//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Strings} from "openzeppelin-contracts/contracts/utils/Strings.sol";
import {LibStorage} from "contracts/libraries/Storage.sol";
import {ComponentSpec, GameMode, GameState, Position, ValueType, WorldConstants, QueryCondition, QueryType} from "contracts/libraries/Types.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Templates} from "contracts/libraries/Templates.sol";
import {Set} from "contracts/Set.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent, UintArrayComponent} from "contracts/TypedComponents.sol";
import "forge-std/console.sol";

/// @title Util library
/// @notice Contains all events as well as lower-level setters and getters
/// Util functions generally do not verify correctness of conditions. Make sure to verify in higher-level functions such as those in Engine.
/// Note: This file should not have any occurrences of `msg.sender`. Pass in player addresses to use them.

library GameLib {
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

    function initializeTile(Position memory _startPosition, address _tileAddress) external returns (uint256) {
        require(isProperTilePosition(_startPosition), "CURIO: Not proper tile position");
        uint256 tileId = getTileAt(_startPosition);
        if (tileId != 0) return tileId;

        // Load constants
        uint256 numInitTerrainTypes = gs().worldConstants.numInitTerrainTypes;
        uint256 batchSize = 200 / numInitTerrainTypes;

        // Decode tile terrain
        uint256 tileX = _startPosition.x / gs().worldConstants.tileWidth;
        uint256 tileY = _startPosition.y / gs().worldConstants.tileWidth;
        uint256 encodedCol = gs().encodedColumnBatches[tileX][tileY / batchSize] % (numInitTerrainTypes**((tileY % batchSize) + 1));
        uint256 divFactor = numInitTerrainTypes**(tileY % batchSize);
        uint256 terrain = encodedCol / divFactor;

        // Initialize tile
        uint256 tileID = Templates.addTile(_startPosition, terrain, _tileAddress);

        // TEMP: battle royale mode
        // if (gs().worldConstants.gameMode == GameMode.BATTLE_ROYALE) {
        //     if (coincident(_startPosition, getMapCenterTilePosition())) {
        //         // Set map center tile to SUPERTILE of land, no resources, and the top tile strength to start
        //         uint256 maxTileLevel = (gs().worldConstants.maxCityCenterLevel * gs().worldConstants.cityCenterLevelToEntityLevelRatio) / 2;
        //         ECSLib.setUint("Terrain", tileID, 0);
        //         ECSLib.setUint("Level", tileID, maxTileLevel);

        //         // uint256 superTileInitTime = getConstant("SuperTile", "", "lastTimestamp", "", maxTileLevel);
        //         // ECSLib.setUint("LastTimestamp", tileID, superTileInitTime);

        //         uint256 supertileGuardAmount = getConstant("Tile", "Guard", "Amount", "", maxTileLevel);
        //         Templates.addConstituent(tileID, gs().templates["Guard"], supertileGuardAmount);

        //         return tileID;
        //     }
        // }

        if (terrain < 3) {
            // Normal tile
            uint256 tileGuardAmount = getConstant("Tile", "Guard", "Amount", "", ECSLib.getUint("Level", tileID));

            // Drip Guard tokens
            address tokenContract = getTokenContract("Guard");
            (bool success, ) = tokenContract.call(abi.encodeWithSignature("dripToken(address,uint256)", _tileAddress, tileGuardAmount));
            require(success, "CURIO: Token dripping fails");
        } else if (terrain == 3 || terrain == 4) {
            // Barbarian tile
            uint256 barbarianLevel = terrain - 2;
            ECSLib.setUint("Level", tileID, barbarianLevel);
            uint256 barbarianGuardAmount = getConstant("Barbarian", "Guard", "Amount", "", barbarianLevel);

            // Drip Guard tokens
            address tokenContract = getTokenContract("Guard");
            (bool success, ) = tokenContract.call(abi.encodeWithSignature("dripToken(address,uint256)", _tileAddress, barbarianGuardAmount));
            require(success, "CURIO: Token dripping fails");
        } else {
            // Mountain tile, do nothing
        }

        // Initialize gold mine
        if (terrain == 1 && getResourceAtTile(_startPosition) == 0) {
            Templates.addResource(gs().templates["Gold"], _startPosition);
        }

        // All empty tiles are farms
        if ((terrain == 0 || terrain == 2) && getResourceAtTile(_startPosition) == 0) {
            Templates.addResource(gs().templates["Food"], _startPosition);
        }

        return tileID;
    }

    function removeArmy(uint256 _armyID) internal {
        uint256[] memory _constituentIDs = getConstituents(_armyID);
        for (uint256 i = 0; i < _constituentIDs.length; i++) {
            ECSLib.removeEntity(_constituentIDs[i]);
        }
        ECSLib.removeEntity(getInventory(_armyID, gs().templates["Gold"]));
        ECSLib.removeEntity(getInventory(_armyID, gs().templates["Food"]));
        ECSLib.removeEntity(_armyID);
    }

    function endGather(uint256 _armyID) internal {
        // Verify that a gather process is present
        uint256 gatherID = getArmyGather(_armyID);
        require(gatherID != 0, "CURIO: Need to start gathering first");

        // Get army's and resource's remaining capacities
        uint256 templateID = ECSLib.getUint("Template", gatherID);
        uint256 inventoryID = getInventory(_armyID, templateID);
        uint256 armyInventoryAmount;
        if (inventoryID == 0) {
            armyInventoryAmount = 0;
            // inventoryID = Templates.addInventory(_armyID, templateID, armyInventoryAmount, ECSLib.getUint("Load", _armyID), true);
        } else {
            armyInventoryAmount = ECSLib.getUint("Amount", inventoryID);
        }

        // Gather
        uint256 gatherAmount = (block.timestamp - ECSLib.getUint("InitTimestamp", gatherID)) * getConstant("Army", ECSLib.getString("InventoryType", templateID), "Rate", "gather", 0);
        uint256 remainingLoad = ECSLib.getUint("Load", _armyID) - armyInventoryAmount;
        if (gatherAmount > remainingLoad) gatherAmount = remainingLoad;
        ECSLib.setUint("Amount", inventoryID, armyInventoryAmount + gatherAmount);

        ECSLib.removeEntity(gatherID);
    }

    // FIXME: Hardcoded triangular relations
    function getAttackBonus(uint256 _offenderTemplateID, uint256 _defenderTemplateID) public view returns (uint256) {
        uint256 horsemanTemplateId = gs().templates["Horseman"];
        uint256 warriorTemplateId = gs().templates["Warrior"];
        uint256 slingerTemplateId = gs().templates["Slinger"];

        if (_offenderTemplateID == horsemanTemplateId) {
            if (_defenderTemplateID == warriorTemplateId) return 60;
            if (_defenderTemplateID == slingerTemplateId) return 140;
            else return 100;
        } else if (_offenderTemplateID == warriorTemplateId) {
            if (_defenderTemplateID == slingerTemplateId) return 60;
            if (_defenderTemplateID == horsemanTemplateId) return 140;
            else return 100;
        } else if (_offenderTemplateID == slingerTemplateId) {
            if (_defenderTemplateID == horsemanTemplateId) return 60;
            if (_defenderTemplateID == warriorTemplateId) return 140;
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
        uint256[] memory troopTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("TroopTemplate"));
        address offenderAddress = ECSLib.getAddress("Address", _offenderID);
        address defenderAddress = ECSLib.getAddress("Address", _defenderID);
        bool[] memory defenderTemplateIsDead = new bool[](troopTemplateIDs.length);

        // Offender attacks defender
        {
            uint256 loss;
            for (uint256 i = 0; i < troopTemplateIDs.length; i++) {
                uint256 offenderTroopTemplateID = troopTemplateIDs[i];
                address offenderTroopContract = ECSLib.getAddress("Address", offenderTroopTemplateID);
                uint256 offenderTroopBalance = getAddressBalance(offenderAddress, offenderTroopContract);
                if (offenderTroopBalance == 0) continue;
                for (uint256 j = 0; j < troopTemplateIDs.length; j++) {
                    uint256 troopTypeBonus = getAttackBonus(i, j);
                    uint256 defenderTroopTemplateID = troopTemplateIDs[j];
                    address defenderTroopContract = ECSLib.getAddress("Address", defenderTroopTemplateID);
                    uint256 defenderTroopBalance = getAddressBalance(defenderAddress, defenderTroopContract);
                    if (defenderTroopBalance == 0) {
                        defenderTemplateIsDead[j] = true;
                        continue;
                        }
                    loss =
                        (troopTypeBonus * (sqrt(offenderTroopBalance) * ECSLib.getUint("Attack", offenderTroopTemplateID) * 2)) / //
                        (ECSLib.getUint("Defense", defenderTroopTemplateID) * ECSLib.getUint("Health", defenderTroopTemplateID));
                    if (loss >= defenderTroopBalance) {
                        defenderTemplateIsDead[j] = true;
                        (bool success, ) = defenderTroopContract.call(abi.encodeWithSignature("destroyToken(address,uint256)", defenderAddress, defenderTroopBalance));
                        require(success, "CURIO: token burn fails");
                    } else {
                        defenderTemplateIsDead[j] = false;
                        (bool success, ) = defenderTroopContract.call(abi.encodeWithSignature("destroyToken(address,uint256)", defenderAddress, loss));
                        require(success, "CURIO: token burn fails");
                    }
                }
            }
        }

        victory = true;
        for (uint256 i; i < defenderTemplateIsDead.length; i++) {
            if (!defenderTemplateIsDead[i]) {
                victory = false;
                break;
            }
        }

        if (victory) {
            if (_transferGoldUponVictory) {
                // Offender takes defender's resources
                uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
                for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                    address resourceTokenContract = ECSLib.getAddress("Address", resourceTemplateIDs[i]);
                    (bool success, ) = resourceTokenContract.call(abi.encodeWithSignature("transferAll(address,address)", defenderAddress, offenderAddress));
                    require(success, "CURIO: Resource transfer fails upon battle victory");
                }
            }

            if (_transferOwnershipUponVictory) {
                // Defender becomes owned by offender's owner
                ECSLib.setUint("Nation", _defenderID, ECSLib.getUint("Nation", _offenderID));
            }

            if (_removeUponVictory) {
                // Defender (always army here) is dealt with same as in disband
                ECSLib.removeComponentValue("Position", _defenderID);
                ECSLib.removeComponentValue("CanBattle", _defenderID);
            }
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

    function distributeBarbarianReward(uint256 _cityID, uint256 _barbarianTileID) internal {
        uint256 barbarianLevel = ECSLib.getUint("Level", _barbarianTileID);
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            uint256 cityInventoryID = getInventory(_cityID, resourceTemplateIDs[i]);
            uint256 reward = getConstant("Barbarian", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Reward", "", barbarianLevel * 4);
            ECSLib.setUint("Amount", cityInventoryID, ECSLib.getUint("Amount", cityInventoryID) + reward);
        }
    }

    function unloadResources(address _nationAddress, address _armyAddress) internal {
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            address tokenContract = ECSLib.getAddress("Address", resourceTemplateIDs[i]);
            (bool success, ) = tokenContract.call(abi.encodeWithSignature("transferAll(address,address)", _armyAddress, _nationAddress));
            require(success, "CURIO: unloadResources transfer fails");
        }
    }

    function disbandArmy(address _nationAddress, address _armyAddress) internal {
        // Return troops to corresponding inventories
        uint256[] memory troopTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("TroopTemplate"));
        for (uint256 i = 0; i < troopTemplateIDs.length; i++) {
            address tokenContract = ECSLib.getAddress("Address", troopTemplateIDs[i]);
            (bool success, ) = tokenContract.call(abi.encodeWithSignature("transferAll(address,address)", _armyAddress, _nationAddress));
            require(success, "CURIO: disbandArmy transfer fails");
        }
    }

    // ----------------------------------------------------------
    // LOGIC GETTERS
    // ----------------------------------------------------------

    function getTokenContract(string memory _tokenName) public view returns (address) {
        uint256 tokenTemplateID = gs().templates[_tokenName];
        return ECSLib.getAddress("Address", tokenTemplateID);
    }

    function getEntityByAddress(address _entityAddress) public returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](1);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Address", abi.encode(_entityAddress));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Find more than one entity");
        return res.length == 1 ? res[0] : 0;
    }

    function getAddressMaxLoad(address _entityAddress, string memory _resourceType) public returns (uint256) {
        /**
        Only Army has troop load & resource. Data is stored in game constant based on nation level
        Resource/Capital yield load restricted within the game
         */
        uint256 entityID = getEntityByAddress(_entityAddress);
        string memory entityTag = ECSLib.getString("Tag", entityID);

        if (strEq(entityTag, "Army") && strEq(_resourceType, "Troop")) {
            uint256 armyNationID = ECSLib.getUint("Nation", entityID);
            return getConstant(entityTag, _resourceType, "Amount", "", ECSLib.getUint("Level", armyNationID));
        } else if (strEq(entityTag, "Army") && (strEq(_resourceType, "Food") || strEq(_resourceType, "Gold"))) {
            return ECSLib.getUint("Load", entityID);
        } else return 0;
    }

    function getAddressBalance(address _entityAddress, address _tokenContract) public returns (uint256) {
        // note: Entity can be army or tile
        (bool success, bytes memory returnData) = _tokenContract.call(abi.encodeWithSignature("checkBalanceOf(address)", _entityAddress));
        require(success, "CURIO: Failing to check troop balance");
        return abi.decode(returnData, (uint256));
    }

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

    function getNationTiles(uint256 _nationID) internal returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Nation", abi.encode(_nationID));
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

    function getArmyTroopCount(uint256 _armyID) internal returns (uint256) {
        uint256 count = 0;
        uint256[] memory constituentIDs = getConstituents(_armyID);
        for (uint256 i = 0; i < constituentIDs.length; i++) {
            count += ECSLib.getUint("Amount", constituentIDs[i]);
        }
        return count;
    }

    function getConstant(
        string memory _subject,
        string memory _object,
        string memory _componentName,
        string memory _functionName,
        uint256 _level
    ) internal view returns (uint256) {
        string memory identifier = string(abi.encodePacked(_subject, "-", _object, "-", _componentName, "-", _functionName, "-", Strings.toString(_level)));
        uint256[] memory res = ECSLib.getStringComponent("Tag").getEntitiesWithValue(identifier);
        // require(res.length <= 1, string(abi.encodePacked("CURIO: Constant with Tag=", identifier, " duplicated")));
        require(res.length >= 1, string(abi.encodePacked("CURIO: Constant with Tag=", identifier, " not found")));
        return ECSLib.getUint("Amount", res[0]);
    }

    function getBuildingProduction(uint256 _buildingID) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Keeper", abi.encode(_buildingID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("TroopProduction"));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Production assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getArmyGather(uint256 _armyID) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Army", abi.encode(_armyID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("ResourceGather"));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Gather assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getResourceAtTile(Position memory _startPosition) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode(string("Resource")));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "StartPosition", abi.encode(_startPosition));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Tile resource assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getMovableEntityAt(Position memory _position) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.Has, "Speed", new bytes(0));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Position", abi.encode(_position));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Movable entity assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getArmyAt(Position memory _position) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode(string("Army")));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Position", abi.encode(_position));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Army assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getCityAtTile(Position memory _startPosition) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("City"));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "StartPosition", abi.encode(_startPosition));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Tile city assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getConstituentAtTile(uint256 _tileID) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Constituent"));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Keeper", abi.encode(_tileID));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Constituent assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

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
        uint256[] memory result = ECSLib.union(_set1, _set2);

        require(result.length <= 1, "CURIO: Template assertion failed");
        return result.length == 1 ? result[0] : 0;
    }

    // FIXME: this function kinda crazy
    function getAllResourceIDsByCity(uint256 _cityID) internal returns (uint256[] memory) {
        // get all tiles
        QueryCondition[] memory query1 = new QueryCondition[](2);
        query1[0] = ECSLib.queryChunk(QueryType.HasVal, "City", abi.encode(_cityID));
        query1[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Tile"));
        uint256[] memory res1 = ECSLib.query(query1);

        // get all of their positions, and then find the resources
        Position[] memory allTilePositions;
        for (uint256 i = 0; i < res1.length; i++) {
            allTilePositions[i] = ECSLib.getPosition("StartPosition", res1[i]);
        }

        // use the position to find resourceIDs
        uint256[] memory resourceIDs;
        for (uint256 i = 0; i < allTilePositions.length; i++) {
            QueryCondition[] memory query2 = new QueryCondition[](2);
            query2[0] = ECSLib.queryChunk(QueryType.HasVal, "StartPosition", abi.encode(allTilePositions[i]));
            query2[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Tile"));
            uint256[] memory res2 = ECSLib.query(query2);
            resourceIDs[resourceIDs.length] = (res2.length == 1 ? res2[0] : 0);
        }
        return resourceIDs;
    }

    // function getArmyInventory(uint256 _armyID, uint256 _templateID) internal returns (uint256) {
    //     QueryCondition[] memory query = new QueryCondition[](3);
    //     query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("ResourceInventory"));
    //     query[1] = ECSLib.queryChunk(QueryType.HasVal, "Army", abi.encode(_armyID));
    //     query[2] = ECSLib.queryChunk(QueryType.HasVal, "Template", abi.encode(_templateID));
    //     uint256[] memory res = ECSLib.query(query);
    //     require(res.length <= 1, "CURIO: Army inventory assertion failed");
    //     return res.length == 1 ? res[0] : 0;
    // }

    function getInventory(uint256 _cityID, uint256 _templateID) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Keeper", abi.encode(_cityID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Template", abi.encode(_templateID));
        uint256[] memory res = ECSLib.query(query);

        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(res);
        _set2.addArray(ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("Production")));
        res = ECSLib.difference(_set1, _set2);

        require(res.length <= 1, "CURIO: Inventory assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getNationIDByAddress(address _address) internal view returns (uint256) {
        return gs().nationEntityMap[_address];
    }

    function getArmyIDByAddress(address _address) internal view returns (uint256) {
        return gs().armyEntityMap[_address];
    }

    function getArmiesFromNation(uint256 _nationID) internal returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Army"));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Nation", abi.encode(_nationID));
        uint256[] memory res = ECSLib.query(query);
        return res;
    }

    function getCityGold(uint256 _cityID) internal returns (uint256) {
        uint256 _goldInventoryID = getInventory(_cityID, gs().templates["Gold"]);
        uint256 _balance = _goldInventoryID != 0 ? ECSLib.getUint("Amount", _goldInventoryID) : 0;
        return _balance;
    }

    function getCityFood(uint256 _cityID) internal returns (uint256) {
        uint256 _foodInventoryID = getInventory(_cityID, gs().templates["Food"]);
        uint256 _balance = _foodInventoryID != 0 ? ECSLib.getUint("Amount", _foodInventoryID) : 0;
        return _balance;
    }

    function setCityGold(uint256 _cityID, uint256 _goldAmount) internal {
        uint256 _goldInventoryID = getInventory(_cityID, gs().templates["Gold"]);
        ECSLib.setUint("Amount", _goldInventoryID, _goldAmount);
    }

    function setCityFood(uint256 _cityID, uint256 _foodAmount) internal {
        uint256 _goldInventoryID = getInventory(_cityID, gs().templates["Food"]);
        ECSLib.setUint("Amount", _goldInventoryID, _foodAmount);
    }

    function getCapital(uint256 _nationID) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Nation", abi.encode(_nationID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "BuildingType", abi.encode("Capital"));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Capital assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getTileAt(Position memory _startPosition) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "StartPosition", abi.encode(_startPosition));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("Tile"));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Tile assertion failed");
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
            temp[neighborCount] = (Position({x: x + tileWidth, y: y}));
            neighborCount++;
        }
        if (y > 0) {
            temp[neighborCount] = (Position({x: x, y: y - tileWidth}));
            neighborCount++;
        }
        if (y < gs().worldConstants.worldHeight - tileWidth) {
            temp[neighborCount] = (Position({x: x, y: y + tileWidth}));
            neighborCount++;
        }

        Position[] memory result = new Position[](neighborCount);
        for (uint256 i = 0; i < neighborCount; i++) {
            result[i] = temp[i];
        }

        return result;
    }

    function isAdjacentToOwnTile(uint256 _nationID, Position memory _tilePosition) internal returns (bool) {
        Position[] memory neighborPositions = getTileNeighbors(_tilePosition);
        bool result = false;
        for (uint256 i = 0; i < neighborPositions.length; i++) {
            if (ECSLib.getUint("Nation", getTileAt(neighborPositions[i])) == _nationID) {
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

    function getCityTileCountByLevel(uint256 _level) internal pure returns (uint256) {
        require(_level >= 1, "CURIO: City level must be at least 1");
        return ((_level + 1) * (_level + 2)) / 2 + 6;
    }

    function getPlayerCity(uint256 _playerID) internal returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.HasVal, "Owner", abi.encode(_playerID));
        query[1] = ECSLib.queryChunk(QueryType.HasVal, "Tag", abi.encode("City"));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: getPlayerCity query error");
        return res.length == 1 ? res[0] : 0;
    }

    function getMapCenterTilePosition() internal view returns (Position memory) {
        uint256 tileWidth = gs().worldConstants.tileWidth;
        return Position({x: (gs().worldConstants.worldWidth / tileWidth / 2) * tileWidth, y: (gs().worldConstants.worldHeight / tileWidth / 2) * tileWidth});
    }

    // ----------------------------------------------------------
    // CHECKERS
    // ----------------------------------------------------------

    function ongoingGameCheck() internal view {
        require(!gs().isPaused, "CURIO: Game is paused");

        uint256 gameLengthInSeconds = gs().worldConstants.gameLengthInSeconds;
        // FIXME: gs().gameInitTimestamp is somehow set incorrectly
        require(gameLengthInSeconds == 0 || (block.timestamp - gs().gameInitTimestamp) <= gameLengthInSeconds, "CURIO: Game has ended");
    }

    function validEntityCheck(uint256 _entity) internal view {
        require(Set(gs().entities).includes(_entity), "CURIO: Entity object not found");
    }

    function neutralOrOwnedEntityCheck(uint256 _entity, uint256 _nationID) internal view {
        uint256 entityNation = ECSLib.getUint("Nation", _entity);
        require(entityNation == _nationID || entityNation == 0, "CURIO: Entity is not yours");
    }

    function inboundPositionCheck(Position memory _position) internal view {
        require(inBound(_position), "CURIO: Position out of bound");
    }

    function passableTerrainCheck(Position memory _tilePosition) internal {
        require(ECSLib.getUint("Terrain", getTileAt(_tilePosition)) != 5, "CURIO: Tile not passable");
    }

    function capitalHasRecoveredFromSack(uint256 _cityCenterID) internal view {
        uint256 cityCenterLevel = ECSLib.getUint("Level", _cityCenterID);
        uint256 chaosDuration = GameLib.getConstant("City Center", "", "Cooldown", "Chaos", cityCenterLevel);
        require(block.timestamp - ECSLib.getUint("LastSacked", _cityCenterID) > chaosDuration, "CURIO: City At Chaos");
    }

    // ----------------------------------------------------------
    // UTILITY FUNCTIONS
    // ----------------------------------------------------------

    function inBound(Position memory _p) internal view returns (bool) {
        return _p.x >= 0 && _p.x < gs().worldConstants.worldWidth && _p.y >= 0 && _p.y < gs().worldConstants.worldHeight;
    }

    function isBarbarian(uint256 _tileID) internal view returns (bool) {
        // FIXME: hardcoded
        return ECSLib.getUint("Terrain", _tileID) == 3 || ECSLib.getUint("Terrain", _tileID) == 4;
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

    function max(uint256 x, uint256 y) internal pure returns (uint256) {
        return x > y ? x : y;
    }
}
