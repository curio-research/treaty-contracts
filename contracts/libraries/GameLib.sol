//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Strings} from "openzeppelin-contracts/contracts/utils/Strings.sol";
import {LibStorage} from "contracts/libraries/Storage.sol";
import {ComponentSpec, GameMode, GameState, Position, ValueType, WorldConstants, QueryCondition, QueryType} from "contracts/libraries/Types.sol";
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

    function initializeTile(Position memory _startPosition) external returns (uint256) {
        require(isProperTilePosition(_startPosition), "CURIO: Not proper tile position");
        uint256 tileId = getTileAt(_startPosition);
        if (tileId != 0) return tileId;

        address tileAddress = address(uint160(uint256(keccak256(abi.encodePacked(gs().tileNonce)))));
        gs().tileNonce++;

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
        uint256 tileID = Templates.addTile(_startPosition, terrain, tileAddress);
        {
            uint256[] memory troopTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("TroopTemplate"));
            for (uint256 i = 0; i < troopTemplateIDs.length; i++) {
                Templates.addInventory(tileID, troopTemplateIDs[i]);
            }
        }

        // TEMP: battle royale mode
        if (gs().worldConstants.gameMode == GameMode.BATTLE_ROYALE) {
            if (coincident(_startPosition, getMapCenterTilePosition())) {
                // Set map center tile to SUPERTILE of land, no resources, and the top tile strength to start
                uint256 maxTileLevel = (gs().worldConstants.maxCapitalLevel * gs().worldConstants.capitalLevelToEntityLevelRatio) / 2;
                ECSLib.setUint("Terrain", tileID, 0);
                ECSLib.setUint("Level", tileID, maxTileLevel);

                // uint256 superTileInitTime = getConstant("SuperTile", "", "lastTimestamp", "", maxTileLevel);
                // ECSLib.setUint("LastTimestamp", tileID, superTileInitTime);

                uint256 supertileGuardAmount = getConstant("Tile", "Guard", "Amount", "", maxTileLevel);
                // Drip Guard tokens
                address tokenContract = getTokenContract("Guard");
                (bool success, ) = tokenContract.call(abi.encodeWithSignature("dripToken(address,uint256)", tileAddress, supertileGuardAmount));
                require(success, "CURIO: Failed to drip Guard tokens");

                return tileID;
            }
        }

        if (terrain < 3) {
            // Normal tile
            uint256 tileGuardAmount = getConstant("Tile", "Guard", "Amount", "", ECSLib.getUint("Level", tileID));

            // Drip Guard tokens
            address tokenContract = getTokenContract("Guard");
            (bool success, ) = tokenContract.call(abi.encodeWithSignature("dripToken(address,uint256)", tileAddress, tileGuardAmount));
            require(success, "CURIO: Failed to drip Guard tokens");
        } else if (terrain == 3 || terrain == 4) {
            // Barbarian tile
            uint256 barbarianLevel = terrain - 2;
            ECSLib.setUint("Level", tileID, barbarianLevel);
            uint256 barbarianGuardAmount = getConstant("Barbarian", "Guard", "Amount", "", barbarianLevel);

            // Drip Guard tokens
            address tokenContract = getTokenContract("Guard");
            (bool success, ) = tokenContract.call(abi.encodeWithSignature("dripToken(address,uint256)", tileAddress, barbarianGuardAmount));
            require(success, "CURIO: Failed to drip Guard tokens");
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

    function endGather(uint256 _armyID) internal {
        // Verify that a gather process is present
        uint256 gatherID = getArmyGather(_armyID);
        require(gatherID != 0, "CURIO: Need to start gathering first");

        // Get army's remaining capacities
        uint256 templateID = ECSLib.getUint("Template", gatherID);
        address tokenContract = ECSLib.getAddress("Address", templateID);
        address armyAddress = ECSLib.getAddress("Address", _armyID);

        // Gather
        uint256 gatherAmount = (block.timestamp - ECSLib.getUint("InitTimestamp", gatherID)) * getConstant("Army", ECSLib.getString("InventoryType", templateID), "Rate", "gather", 0);
        (bool success, ) = tokenContract.call(abi.encodeWithSignature("dripToken(address,uint256)", armyAddress, gatherAmount));
        require(success, "CURIO: Failed to drip resource tokens");

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
        bool[] memory defenderTemplateIsEliminated = new bool[](troopTemplateIDs.length);

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
                        defenderTemplateIsEliminated[j] = true;
                        continue;
                    }
                    loss =
                        (troopTypeBonus * (sqrt(offenderTroopBalance) * ECSLib.getUint("Attack", offenderTroopTemplateID) * 2)) / //
                        (ECSLib.getUint("Defense", defenderTroopTemplateID) * ECSLib.getUint("Health", defenderTroopTemplateID));
                    if (loss >= defenderTroopBalance) {
                        defenderTemplateIsEliminated[j] = true;
                        (bool success, ) = defenderTroopContract.call(abi.encodeWithSignature("destroyToken(address,uint256)", defenderAddress, defenderTroopBalance));
                        require(success, "CURIO: token burn fails");
                    } else {
                        defenderTemplateIsEliminated[j] = false;
                        (bool success, ) = defenderTroopContract.call(abi.encodeWithSignature("destroyToken(address,uint256)", defenderAddress, loss));
                        require(success, "CURIO: token burn fails");
                    }
                }
            }
        }

        victory = true;
        for (uint256 i; i < defenderTemplateIsEliminated.length; i++) {
            if (!defenderTemplateIsEliminated[i]) {
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

    function distributeBarbarianReward(uint256 _armyID, uint256 _barbarianTileID) internal {
        uint256 barbarianLevel = ECSLib.getUint("Level", _barbarianTileID);
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            uint256 rewardAmount = getConstant("Barbarian", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Reward", "", barbarianLevel * 4);
            address tokenContract = ECSLib.getAddress("Address", resourceTemplateIDs[i]);
            (bool success, ) = tokenContract.call(abi.encodeWithSignature("dripToken(address,uint256)", ECSLib.getAddress("Address", _armyID), rewardAmount));
            require(success, "CURIO: Failed to drip barbarian rewards");
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

    function getEntityByAddress(address _entityAddress) public view returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](1);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Address"]), abi.encode(_entityAddress));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Found more than one entity");
        return res.length == 1 ? res[0] : 0;
    }

    function getInventoryIDMaxLoadAndBalance(address _entityAddress, string memory _resourceType)
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        /**
        Only Army & Tile has troop load & resource. 
        Data is stored in game constant based on nation level
        Resource/Capital yield load restricted within the game
         */

        // note: put ID, load, and balance together so it only does query once

        // fixme: exteremely inefficient but unavoidable unless entityID is address
        uint256 entityID = getEntityByAddress(_entityAddress);
        uint256 templateID = gs().templates[_resourceType];
        uint256 inventoryID = getInventory(entityID, templateID);
        uint256 balance = ECSLib.getUint("Amount", inventoryID);

        if (strEq(ECSLib.getString("Tag", entityID), "Army")) {
            uint256 armyNationID = ECSLib.getUint("Nation", entityID);
            if (templateID == gs().templates["Horseman"] || templateID == gs().templates["Warrior"] || templateID == gs().templates["Slinger"]) {
                uint256 maxLoad = getConstant(ECSLib.getString("Tag", entityID), "Troop", "Amount", "", ECSLib.getUint("Level", armyNationID));
                return (inventoryID, maxLoad, balance);
            } else if (templateID == gs().templates["Food"] || templateID == gs().templates["Gold"]) {
                return (inventoryID, ECSLib.getUint("Load", entityID), balance);
            }
        } else if (templateID == gs().templates["Guard"]) {
            uint256 maxLoad = GameLib.getConstant("Tile", "Guard", "Amount", "", ECSLib.getUint("Level", entityID));
            return (inventoryID, maxLoad, balance);
        }

        return (inventoryID, 0, balance);
    }

    function getAddressBalance(address _entityAddress, address _tokenContract) public returns (uint256) {
        // note: Entity can be army or tile
        (bool success, bytes memory returnData) = _tokenContract.call(abi.encodeWithSignature("checkBalanceOf(address)", _entityAddress));
        require(success, "CURIO: Failing to check troop balance");
        return abi.decode(returnData, (uint256));
    }

    function getConstituents(uint256 _keeperID) public view returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Keeper"]), abi.encode(_keeperID));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode("Constituent"));
        return ECSLib.query(query);
    }

    function getPlayerSignatures(uint256 _playerID) internal view returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Owner"]), abi.encode(_playerID));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode("Signature"));
        return ECSLib.query(query);
    }

    function getNationTiles(uint256 _nationID) internal view returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Nation"]), abi.encode(_nationID));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode("Tile"));
        return ECSLib.query(query);
    }

    function getPlayerArmies(uint256 _playerID) internal view returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Owner"]), abi.encode(_playerID));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode("Army"));
        return ECSLib.query(query);
    }

    function getMovableEntitiesAtTile(Position memory _startPosition) internal view returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.Has, Component(gs().components["Speed"]), new bytes(0));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["StartPosition"]), abi.encode(_startPosition));
        return ECSLib.query(query);
    }

    function getArmyTroopCount(uint256 _armyID) internal view returns (uint256) {
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

    function getBuildingProduction(uint256 _buildingID) internal view returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Keeper"]), abi.encode(_buildingID));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode("TroopProduction"));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Production assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getArmyGather(uint256 _armyID) internal view returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Army"]), abi.encode(_armyID));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode("ResourceGather"));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Gather assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getResourceAtTile(Position memory _startPosition) internal view returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode(string("Resource")));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["StartPosition"]), abi.encode(_startPosition));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Tile resource assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getMovableEntityAt(Position memory _position) internal view returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.Has, Component(gs().components["Speed"]), new bytes(0));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Position"]), abi.encode(_position));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Movable entity assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getArmyAt(Position memory _position) internal view returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode(string("Army")));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Position"]), abi.encode(_position));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Army assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getCapitalAtTile(Position memory _startPosition) internal view returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode("Capital"));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["StartPosition"]), abi.encode(_startPosition));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Tile capital assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    // FIXME: this function kinda crazy
    function getAllResourceIDsByNation(uint256 _nationID) internal view returns (uint256[] memory) {
        // get all tiles
        QueryCondition[] memory query1 = new QueryCondition[](2);
        query1[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Nation"]), abi.encode(_nationID));
        query1[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode("Tile"));
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
            query2[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["StartPosition"]), abi.encode(allTilePositions[i]));
            query2[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode("Tile"));
            uint256[] memory res2 = ECSLib.query(query2);
            resourceIDs[resourceIDs.length] = (res2.length == 1 ? res2[0] : 0);
        }
        return resourceIDs;
    }

    function getInventory(uint256 _keeperID, uint256 _templateID) internal view returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Keeper"]), abi.encode(_keeperID));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Template"]), abi.encode(_templateID));
        uint256[] memory res = ECSLib.query(query);

        require(res.length <= 1, "CURIO: Inventory assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getNationIDByAddress(address _address) internal view returns (uint256) {
        return gs().nationEntityMap[_address];
    }

    function getArmyIDByAddress(address _address) internal view returns (uint256) {
        return gs().armyEntityMap[_address];
    }

    function getArmiesFromNation(uint256 _nationID) internal view returns (uint256[] memory) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode("Army"));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Nation"]), abi.encode(_nationID));
        uint256[] memory res = ECSLib.query(query);
        return res;
    }

    function getCapital(uint256 _nationID) internal view returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Nation"]), abi.encode(_nationID));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["BuildingType"]), abi.encode("Capital"));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Capital assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getTileAt(Position memory _startPosition) internal view returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["StartPosition"]), abi.encode(_startPosition));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode("Tile"));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Tile assertion failed");
        return res.length == 1 ? res[0] : 0;
    }

    function getResourceAt(Position memory _startPosition) internal view returns (uint256) {
        QueryCondition[] memory query = new QueryCondition[](2);
        query[0] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["StartPosition"]), abi.encode(_startPosition));
        query[1] = ECSLib.queryChunk(QueryType.IsExactly, Component(gs().components["Tag"]), abi.encode("Resource"));
        uint256[] memory res = ECSLib.query(query);
        require(res.length <= 1, "CURIO: Resource assertion failed");
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

    function isAdjacentToOwnTile(uint256 _nationID, Position memory _tilePosition) internal view returns (bool) {
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

    function getNationTileCountByLevel(uint256 _level) internal pure returns (uint256) {
        require(_level >= 1, "CURIO: Nation level must be at least 1");
        return ((_level + 1) * (_level + 2)) / 2 + 6;
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

    function passableTerrainCheck(Position memory _tilePosition) internal view {
        require(ECSLib.getUint("Terrain", getTileAt(_tilePosition)) != 5, "CURIO: Tile not passable");
    }

    function capitalHasRecoveredFromSack(uint256 _capitalID) internal view {
        uint256 capitalLevel = ECSLib.getUint("Level", _capitalID);
        uint256 chaosDuration = GameLib.getConstant("Capital", "", "Cooldown", "Chaos", capitalLevel);
        require(block.timestamp - ECSLib.getUint("LastSacked", _capitalID) > chaosDuration, "CURIO: Capital at chaos");
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
