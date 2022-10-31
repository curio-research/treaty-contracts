//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {UseStorage} from "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameMode, Position, WorldConstants} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {Templates} from "contracts/libraries/Templates.sol";

/// @title Game facet
/// @notice Contains player functions

contract GameFacet is UseStorage {
    uint256 private constant NULL = 0;

    // ----------------------------------------------------------
    // BASIC
    // ----------------------------------------------------------

    // sent using the initial function
    function authorizeGame(address _burnerAddress) external {
        gs().accounts[msg.sender] = _burnerAddress;
        gs().burnerAccounts[_burnerAddress] = msg.sender;
    }

    function initializePlayer(Position memory _position, string memory _name) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.inboundPositionCheck(_position);
        require(gs().players.length < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(gs().playerEntityMap[msg.sender] == NULL, "CURIO: Player already initialized");

        // Initialize tile and check terrain
        Position memory tilePosition = GameLib.getProperTilePosition(_position);
        GameLib.initializeTile(tilePosition);
        GameLib.passableTerrainCheck(tilePosition);

        // Register player
        uint256 playerID = Templates.addPlayer(_name);
        gs().players.push(msg.sender);
        gs().playerEntityMap[msg.sender] = playerID;

        // Add player's first settler
        Templates.addSettler(_position, GameLib.getProperTilePosition(_position), playerID, gs().worldConstants.tileWidth);
    }

    // ----------------------------------------------------------
    // SETTLEMENT
    // ----------------------------------------------------------

    function move(uint256 _movableEntity, Position memory _targetPosition) external {
        // Basic checks
        GameLib.validEntityCheck(_movableEntity);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_movableEntity, msg.sender);
        GameLib.inboundPositionCheck(_targetPosition);

        // Initialize tile and check terrain
        {
            Position memory tilePosition = GameLib.getProperTilePosition(_targetPosition);
            GameLib.initializeTile(tilePosition);
            GameLib.passableTerrainCheck(tilePosition);
        }

        // Verify no other movable entity at exact destination coordinate
        require(GameLib.getMovableEntityAt(_targetPosition) == NULL, "CURIO: Destination occupied");

        // Check moveCooldown
        require(block.timestamp >= ECSLib.getUint("LastTimestamp", _movableEntity) + ECSLib.getUint("MoveCooldown", _movableEntity), "CURIO: Moved too recently");

        // settler cannot move in enemy territory
        uint256 tileID = GameLib.getTileAt(GameLib.getProperTilePosition(_targetPosition));
        if (tileID != NULL) GameLib.neutralOrOwnedEntityCheck(tileID, msg.sender);

        // Verify no gather
        require(GameLib.getArmyGather(_movableEntity) == NULL, "CURIO: Ongoing gather");

        // Calculate distance
        uint256 distance = GameLib.euclidean(ECSLib.getPosition("Position", _movableEntity), _targetPosition);
        require(distance <= ECSLib.getUint("Speed", _movableEntity), "CURIO: Not enough movement points");

        // Move and update moveCooldown
        ECSLib.setPosition("Position", _movableEntity, _targetPosition);
        ECSLib.setPosition("StartPosition", _movableEntity, GameLib.getProperTilePosition(_targetPosition));
        ECSLib.setUint("LastTimestamp", _movableEntity, block.timestamp);
    }

    function foundCity(
        uint256 _settlerID,
        Position[] memory _tiles,
        string memory _cityName
    ) external {
        // Basic checks
        GameLib.validEntityCheck(_settlerID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_settlerID, msg.sender);

        // Verify that settler can settle
        require(ECSLib.getBool("CanSettle", _settlerID), "CURIO: Settler cannot settle");

        // Verify that city center is not on mountain
        Position memory centerTilePosition = GameLib.getProperTilePosition(ECSLib.getPosition("Position", _settlerID));
        GameLib.passableTerrainCheck(centerTilePosition);

        // TEMP: battle royale mode
        if (gs().worldConstants.gameMode == GameMode.BATTLE_ROYALE) {
            require(!GameLib.coincident(centerTilePosition, GameLib.getMapCenterTilePosition()), "CURIO: City center can't be at supertile");
        }

        // Verify that territory is connected and includes settler's current position FIXME
        require(GameLib.connected(_tiles), "CURIO: Territory disconnected");
        require(GameLib.includesPosition(centerTilePosition, _tiles), "CURIO: Tiles must cover settler position");

        // Remove resource at destination if one exists
        uint256 resourceID = GameLib.getResourceAtTile(centerTilePosition);
        if (resourceID != NULL) ECSLib.removeEntity(resourceID);

        // Verify that territory is wholly in bound and does not overlap with other cities, and set tile ownership
        uint256 playerID = GameLib.getPlayer(msg.sender);
        uint256 cityID = _settlerID;
        for (uint256 i = 0; i < _tiles.length; i++) {
            GameLib.inboundPositionCheck(_tiles[i]);
            require(GameLib.isProperTilePosition(_tiles[i]), "CURIO: Must be proper tile position");
            uint256 tileID = GameLib.initializeTile(_tiles[i]);
            require(!GameLib.isBarbarian(tileID), "CURIO: Cannot settle on barbarians");
            require(ECSLib.getUint("City", tileID) == NULL, "CURIO: Overlaps with another city");

            ECSLib.setUint("City", tileID, cityID);
            ECSLib.setUint("Owner", tileID, playerID);
        }

        // Convert the settler to a city
        Templates.convertSettlerToCity(_settlerID, _cityName);

        // Add city center
        Templates.addCityCenter(centerTilePosition, cityID);

        // Add initial resources to city
        {
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                string memory inventoryType = ECSLib.getString("InventoryType", resourceTemplateIDs[i]);
                uint256 inventoryLoad = GameLib.getConstant("City Center", inventoryType, "Load", "", 1);
                Templates.addInventory(cityID, resourceTemplateIDs[i], 0, inventoryLoad, true);
            }
        }

        // Strengthen guard to city defense level
        uint256 cityGuardAmount = GameLib.getConstant("Tile", "Guard", "Amount", "", 1); // FIXME: change to city strength level after packing
        uint256[] memory constituentIDs = GameLib.getConstituents(GameLib.getTileAt(centerTilePosition));
        require(constituentIDs.length == 1, "CURIO: Tile initialized incorrectly");
        ECSLib.setUint("Amount", constituentIDs[0], cityGuardAmount);
    }

    /// @notice This function can be viewed as the inverse of `foundCity`, as it converts a city back into a settler.
    function packCity(uint256 _cityID) external {
        // Basic checks
        GameLib.validEntityCheck(_cityID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_cityID, msg.sender);

        // Deduct packing cost
        uint256 packCost = GameLib.getConstant("City", "Gold", "Cost", "pack", 0);
        uint256 balance = GameLib.getCityGold(_cityID);
        require(balance >= packCost, "CURIO: Insufficient gold for packing");
        ECSLib.setUint("Amount", GameLib.getInventory(_cityID, gs().templates["Gold"]), balance - packCost);

        // Remove city tiles
        uint256[] memory tileIDs = GameLib.getCityTiles(_cityID);
        assert(tileIDs.length == GameLib.getCityTileCountByLevel(ECSLib.getUint("Level", GameLib.getCityCenter(_cityID))));
        for (uint256 i = 0; i < tileIDs.length; i++) {
            ECSLib.setUint("Owner", tileIDs[i], NULL);
        }

        // Convert the settler to a city
        uint256 health = GameLib.getConstant("Settler", "Health", "", "", 0);
        Templates.convertCityToSettler(_cityID, health, gs().worldConstants.tileWidth);

        // Remove city center
        ECSLib.removeEntity(GameLib.getCityCenter(_cityID));
    }

    function recoverTile(uint256 _tileID) external {
        // Basic checks
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_tileID, msg.sender);

        uint256 tileLevel = ECSLib.getUint("Level", _tileID);
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _tileID) > GameLib.getConstant("Tile", "", "Cooldown", "Upgrade", tileLevel), "CURIO: Upgrade unfinished");
        require(block.timestamp - ECSLib.getUint("LastRecovered", _tileID) > GameLib.getConstant("Tile", "", "Cooldown", "Recover", tileLevel), "CURIO: Recover unfinished");

        // lost tile amount = current level amount - actual amount
        uint256 lostGuardAmount = GameLib.getConstant("Tile", "Guard", "Amount", "", tileLevel) - ECSLib.getUint("Amount", _tileID);

        // Deduct costs
        {
            uint256 playerID = GameLib.getPlayer(msg.sender);
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                uint256 inventoryID = GameLib.getInventory(GameLib.getPlayerCity(playerID), resourceTemplateIDs[i]);
                uint256 balance = ECSLib.getUint("Amount", inventoryID);

                uint256 totalRecoverCost = GameLib.getConstant("Tile", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Upgrade", 0) * lostGuardAmount;

                require(balance >= totalRecoverCost, "CURIO: Insufficient balance");
                ECSLib.setUint("Amount", inventoryID, balance - totalRecoverCost);
            }
        }

        // Set timestamp
        ECSLib.setUint("LastRecovered", _tileID, block.timestamp);

        // Recover the Tile
        uint256[] memory constituentIDs = GameLib.getConstituents(_tileID);
        require(constituentIDs.length == 1, "CURIO: Tile initialized incorrectly");
        ECSLib.setUint("Amount", constituentIDs[0], GameLib.getConstant("Tile", "Guard", "Amount", "", tileLevel));
    }

    function upgradeTile(uint256 _tileID) external {
        // Basic checks
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_tileID, msg.sender);

        // Check if player has reached max tile level
        uint256 tileLevel = ECSLib.getUint("Level", _tileID);
        uint256 cityCenterID = GameLib.getCityCenter(ECSLib.getUint("City", _tileID));
        require(tileLevel < ECSLib.getUint("Level", cityCenterID) * gs().worldConstants.cityCenterLevelToEntityLevelRatio, "CURIO: Max Tile Level Reached");

        // Require players to fully recover the tile before upgrade
        uint256[] memory constituentIDs = GameLib.getConstituents(_tileID);
        require(constituentIDs.length == 1, "CURIO: Tile initialized incorrectly");
        require(GameLib.getConstant("Tile", "Guard", "Amount", "", tileLevel) <= ECSLib.getUint("Amount", constituentIDs[0]), "CURIO: Need to recover tile first");

        // check if upgrade is in process
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _tileID) > GameLib.getConstant("Tile", "", "Cooldown", "Upgrade", tileLevel), "CURIO: Upgrade in process");

        // Deduct costs
        {
            uint256 playerID = GameLib.getPlayer(msg.sender);
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                uint256 inventoryID = GameLib.getInventory(GameLib.getPlayerCity(playerID), resourceTemplateIDs[i]);
                uint256 balance = ECSLib.getUint("Amount", inventoryID);
                uint256 cost = GameLib.getConstant("Tile", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Upgrade", tileLevel);
                require(balance >= cost, "CURIO: Insufficient balance");
                ECSLib.setUint("Amount", inventoryID, balance - cost);
            }
        }

        // set timestamp
        ECSLib.setUint("LastUpgraded", _tileID, block.timestamp);

        // Upgrade tile defense and level
        uint256 newConstituentAmount = GameLib.getConstant("Tile", "Guard", "Amount", "", tileLevel + 1);
        ECSLib.setUint("Amount", constituentIDs[0], newConstituentAmount);
        ECSLib.setUint("Level", _tileID, tileLevel + 1);
    }

    // todo: merge it with upgrade resource
    function upgradeCityCenter(uint256 _buildingID) external {
        GameLib.validEntityCheck(_buildingID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);

        // Check if player has reached maxCityCenterLevel
        uint256 centerLevel = ECSLib.getUint("Level", _buildingID);
        require(centerLevel < gs().worldConstants.maxCityCenterLevel, "CURIO: Reached Maximum Center Level");

        // Tile needs to be yours
        uint256 playerID = GameLib.getPlayer(msg.sender);
        uint256 tileID = GameLib.getTileAt(ECSLib.getPosition("StartPosition", _buildingID));
        require(ECSLib.getUint("Owner", tileID) == playerID, "CURIO: Tile isn't yours");

        // check if upgrade is in process
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _buildingID) > GameLib.getConstant("City Center", "", "Cooldown", "Upgrade", centerLevel), "CURIO: Upgrade in process");

        // Deduct costs and set load
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            uint256 inventoryID = GameLib.getInventory(GameLib.getPlayerCity(playerID), resourceTemplateIDs[i]);
            uint256 balance = ECSLib.getUint("Amount", inventoryID);
            uint256 cost = GameLib.getConstant("City Center", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Upgrade", centerLevel);
            require(balance >= cost, "CURIO: Insufficient balance");
            ECSLib.setUint("Amount", inventoryID, balance - cost);

            uint256 newLoad = GameLib.getConstant("City Center", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Load", "", centerLevel + 1);
            ECSLib.setUint("Load", _buildingID, newLoad);
        }

        // Set timestamp
        ECSLib.setUint("LastUpgraded", _buildingID, block.timestamp);

        // Set new level
        ECSLib.setUint("Level", _buildingID, centerLevel + 1);
    }

    function moveCityCenter(uint256 _buildingID, Position memory _newTilePosition) external {
        // Basic checks
        GameLib.validEntityCheck(_buildingID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.inboundPositionCheck(_newTilePosition);
        GameLib.passableTerrainCheck(_newTilePosition);

        // TEMP: battle royale
        if (gs().worldConstants.gameMode == GameMode.BATTLE_ROYALE) {
            require(!GameLib.coincident(_newTilePosition, GameLib.getMapCenterTilePosition()), "CURIO: City center can't be at supertile");
        }

        // Verify that city center belongs to player
        uint256 playerID = GameLib.getPlayer(msg.sender);

        require(ECSLib.getUint("Owner", GameLib.getTileAt(ECSLib.getPosition("StartPosition", _buildingID))) == playerID, "CURIO: Building is not yours");

        // Verify that target tile belongs to player
        require(ECSLib.getUint("Owner", GameLib.getTileAt(_newTilePosition)) == playerID, "CURIO: Can only move in your territory");

        // Verify that moveCityCenter cooldown has passed
        uint256 centerLevel = ECSLib.getUint("Level", _buildingID);
        require(block.timestamp - ECSLib.getUint("LastMoved", _buildingID) > GameLib.getConstant("City Center", "", "Cooldown", "Move", centerLevel), "CURIO: MoveCity cooldown unfinished");

        // Deduct costs
        {
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                uint256 inventoryID = GameLib.getInventory(GameLib.getPlayerCity(playerID), resourceTemplateIDs[i]);
                uint256 balance = ECSLib.getUint("Amount", inventoryID);
                uint256 cost = GameLib.getConstant("City Center", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Move", centerLevel);
                require(balance >= cost, "CURIO: Insufficient balance");
                ECSLib.setUint("Amount", inventoryID, balance - cost);
            }
        }

        // Set timestamp
        ECSLib.setUint("LastMoved", _buildingID, block.timestamp);

        // Move city center, city, and underlying settler positions
        uint256 cityID = ECSLib.getUint("City", _buildingID);
        ECSLib.setPosition("StartPosition", _buildingID, _newTilePosition);
        ECSLib.setPosition("StartPosition", cityID, _newTilePosition);
        ECSLib.setPosition("Position", cityID, GameLib.getMidPositionFromTilePosition(_newTilePosition));
    }

    function disownTile(uint256 _tileID) external {
        // Basic checks
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_tileID, msg.sender);

        // Verify that city center is not on tile
        Position memory tilePosition = ECSLib.getPosition("StartPosition", _tileID);
        require(!GameLib.coincident(tilePosition, ECSLib.getPosition("StartPosition", GameLib.getCityCenter(ECSLib.getUint("City", _tileID)))), "CURIO: Cannot disown city center");

        // Verify that tile is not during recover or upgrade
        uint256 tileLevel = ECSLib.getUint("Level", _tileID);
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _tileID) > GameLib.getConstant("Tile", "", "Cooldown", "Upgrade", tileLevel), "CURIO: Upgrade unfinished");
        require(block.timestamp - ECSLib.getUint("LastRecovered", _tileID) > GameLib.getConstant("Tile", "", "Cooldown", "Recover", tileLevel), "CURIO: Recover unfinished");

        // End gather processes on tile
        uint256[] memory movableEntitiesOnTile = GameLib.getMovableEntitiesAtTile(tilePosition);
        for (uint256 i = 0; i < movableEntitiesOnTile.length; i++) {
            uint256 gatherID = GameLib.getArmyGather(movableEntitiesOnTile[i]);
            if (gatherID != NULL) GameLib.endGather(movableEntitiesOnTile[i]);
        }

        // TODO: deduct resources from, or return resources to, player inventory

        // Disown tile
        ECSLib.setUint("Owner", _tileID, NULL);
    }

    // ----------------------------------------------------------
    // PRODUCTION
    // ----------------------------------------------------------

    function startTroopProduction(
        uint256 _buildingID,
        uint256 _templateID,
        uint256 _amount
    ) external returns (uint256 productionID) {
        // Basic checks
        GameLib.validEntityCheck(_buildingID);
        GameLib.validEntityCheck(_templateID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);

        // Verify city ownership
        uint256 cityID = ECSLib.getUint("City", _buildingID);
        GameLib.entityOwnershipCheck(cityID, msg.sender);

        // Verify that city can produce
        require(ECSLib.getBool("CanProduce", cityID), "CURIO: City cannot produce");

        // Check balance sufficience and deduct costs
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            uint256 resourceInventoryID = GameLib.getInventory(cityID, resourceTemplateIDs[i]);
            uint256 balance = ECSLib.getUint("Amount", resourceInventoryID);
            uint256 cost = _amount * GameLib.getConstant("Troop Production", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "", 0);
            require(balance >= cost, "CURIO: Insufficient balance");
            ECSLib.setUint("Amount", resourceInventoryID, balance - cost);
        }

        // Verify no ongoing production
        require(GameLib.getBuildingProduction(_buildingID) == NULL, "CURIO: Concurrent productions disallowed");

        uint256 buildingLevel = ECSLib.getUint("Level", cityID);
        // Create inventory if none exists, and verify that amount does not exceed ceiling
        uint256 troopInventoryID = GameLib.getInventory(cityID, _templateID);
        if (troopInventoryID == NULL) {
            // todo: come up with troop loads for different levels of city center
            uint256 load = GameLib.getConstant("City Center", "Troop", "Load", "", buildingLevel); // FIXME
            troopInventoryID = Templates.addInventory(cityID, _templateID, 0, load, false);
        } else {
            require(ECSLib.getUint("Amount", troopInventoryID) < ECSLib.getUint("Load", troopInventoryID), "CURIO: Amount exceeds inventory capacity");
        }

        // Start production
        return Templates.addTroopProduction(_buildingID, _templateID, troopInventoryID, _amount, gs().worldConstants.secondsToTrainAThousandTroops * (_amount / 1000));
    }

    function endTroopProduction(uint256 _buildingID, uint256 _productionID) external {
        // Basic checks
        GameLib.validEntityCheck(_buildingID);
        GameLib.validEntityCheck(_productionID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);

        // Verify that city belongs to player
        uint256 cityID = ECSLib.getUint("City", _buildingID);
        GameLib.entityOwnershipCheck(cityID, msg.sender);

        // Verify that enough time has passed for the given amount
        require(block.timestamp >= (ECSLib.getUint("InitTimestamp", _productionID) + ECSLib.getUint("Duration", _productionID)), "CURIO: Need more time for production");

        // Update inventory
        uint256 inventoryID = ECSLib.getUint("Inventory", _productionID);
        ECSLib.setUint("Amount", inventoryID, ECSLib.getUint("Amount", inventoryID) + ECSLib.getUint("Amount", _productionID));

        // Delete production
        ECSLib.removeEntity(_productionID);
    }

    function startGather(uint256 _armyID, uint256 _resourceID) external {
        GameLib.validEntityCheck(_armyID);
        GameLib.validEntityCheck(_resourceID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_armyID, msg.sender);

        // Verify that army is sitting on the resource
        Position memory startPosition = GameLib.getProperTilePosition(ECSLib.getPosition("Position", _armyID));
        require(GameLib.coincident(startPosition, ECSLib.getPosition("StartPosition", _resourceID)), "CURIO: Army must be on resource tile");

        // Verify that the resource level is greater than zero, meaning that a gold mine has "been built".
        require(ECSLib.getUint("Level", _resourceID) == 0, "CURIO: Tool already built");

        // Verify that resource is not in another player's territory
        uint256 tileID = GameLib.getTileAt(startPosition);
        uint256 playerID = GameLib.getPlayer(msg.sender);
        GameLib.neutralOrOwnedEntityCheck(tileID, msg.sender);

        // Cannot gather twice
        require(GameLib.getArmyGather(_armyID) == NULL, "CURIO: Another gather at this location");

        // Verify that the army's capacity isn't full
        // TODO

        // string memory subject = ECSLib.getUint("Template", _resourceID) == gs().templates["Gold"] ? "Goldmine" : "Farm";
        Templates.addResourceGather(startPosition, playerID, _resourceID, _armyID);
    }

    function endGather(uint256 _armyID) external {
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_armyID, msg.sender);

        // End gather
        GameLib.endGather(_armyID);
    }

    function unloadResources(uint256 _armyID) external {
        // Basic checks
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_armyID, msg.sender);

        // Verify tile ownership
        Position memory startPosition = ECSLib.getPosition("StartPosition", _armyID);
        uint256 tileID = GameLib.getTileAt(startPosition);
        GameLib.entityOwnershipCheck(tileID, msg.sender);

        // Verify that army is in city center tile
        uint256 cityID = ECSLib.getUint("City", tileID);
        uint256 cityCenterID = GameLib.getCityCenter(cityID);
        require(GameLib.coincident(ECSLib.getPosition("StartPosition", cityCenterID), startPosition), "CURIO: Army must be on city center");

        // Return carried resources to city
        GameLib.unloadResources(cityID, _armyID);
    }

    // harvest gold from a gold resource directly
    function harvestResource(uint256 _resourceID) public {
        // Basic checks
        GameLib.validEntityCheck(_resourceID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);

        // Verify that resource is not owned by another player
        uint256 resourceLevel = ECSLib.getUint("Level", _resourceID);
        Position memory goldMineStartPosition = ECSLib.getPosition("StartPosition", _resourceID);
        GameLib.neutralOrOwnedEntityCheck(GameLib.getTileAt(goldMineStartPosition), msg.sender);

        // Verify that the resource level is greater than zero, meaning that a tool has "been built".
        require(resourceLevel > 0, "CURIO: Need to build tool to harvest");

        // Verify city ownership
        uint256 cityID = GameLib.getPlayerCity(GameLib.getPlayer(msg.sender));
        require(cityID != NULL, "CURIO: Player must own a city");

        // Verify it's not being upgraded
        uint256 templateID = ECSLib.getUint("Template", _resourceID);
        string memory buildingType = templateID == gs().templates["Gold"] ? "Goldmine" : "Farm";
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _resourceID) > GameLib.getConstant(buildingType, "", "Cooldown", "Upgrade", resourceLevel), "CURIO: Upgrade unfinished");

        // Get harvest amount
        uint256 harvestRate = GameLib.getConstant(buildingType, ECSLib.getString("InventoryType", templateID), "Yield", "", resourceLevel);
        uint256 harvestAmount = (block.timestamp - ECSLib.getUint("LastTimestamp", _resourceID)) * harvestRate;
        harvestAmount = GameLib.min(ECSLib.getUint("Load", _resourceID), harvestAmount);

        // Update last harvest
        ECSLib.setUint("LastTimestamp", _resourceID, block.timestamp);

        // Update city inventory amount
        uint256 cityInventoryID = GameLib.getInventory(cityID, templateID);
        uint256 existingCityResourceAmount = ECSLib.getUint("Amount", cityInventoryID);
        ECSLib.setUint("Amount", cityInventoryID, harvestAmount + existingCityResourceAmount);
    }

    function harvestResources(uint256[] memory resourceIds) external {
        for (uint256 i = 0; i < resourceIds.length; i++) {
            harvestResource(resourceIds[i]);
        }
    }

    // TODO: harvest gold & food on a city; consider merge this with the function above
    function harvestResourcesFromCity(uint256 _buildingID) external {
        GameLib.validEntityCheck(_buildingID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);

        // Verify that city belongs to player
        uint256 cityID = ECSLib.getUint("City", _buildingID);
        GameLib.entityOwnershipCheck(cityID, msg.sender);

        uint256 cityCenterID = GameLib.getCityCenter(cityID);

        // Verify it's not being upgraded
        uint256 centerLevel = ECSLib.getUint("Level", cityCenterID);
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _buildingID) > GameLib.getConstant("City Center", "", "Cooldown", "Upgrade", centerLevel), "CURIO: Upgrade unfinished");

        // Create inventory if none exists
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            uint256 inventoryID = GameLib.getInventory(cityID, resourceTemplateIDs[i]);
            uint256 harvestRate = GameLib.getConstant("City Center", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Yield", "", centerLevel);
            uint256 harvestAmount = (block.timestamp - ECSLib.getUint("LastTimestamp", _buildingID)) * harvestRate;
            harvestAmount = GameLib.min(GameLib.getConstant("City Center", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Load", "", centerLevel), harvestAmount);
            ECSLib.setUint("Amount", inventoryID, ECSLib.getUint("Amount", inventoryID) + harvestAmount);
        }

        // Reset harvest time
        ECSLib.setUint("LastTimestamp", _buildingID, block.timestamp);
    }

    // ----------------------------------------------------------
    // BATTLE
    // ----------------------------------------------------------

    function organizeArmy(
        uint256 _cityID,
        uint256[] memory _templateIDs,
        uint256[] memory _amounts
    ) external returns (uint256) {
        // Basic checks
        GameLib.validEntityCheck(_cityID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_cityID, msg.sender);
        require(GameLib.getPlayerArmies(GameLib.getPlayer(msg.sender)).length < gs().worldConstants.maxArmyCountPerPlayer, "CURIO: Army max count reached");

        // Verify there is no army currently at the city center
        Position memory midPosition = GameLib.getMidPositionFromTilePosition(ECSLib.getPosition("StartPosition", _cityID));
        require(GameLib.getArmyAt(midPosition) == NULL, "CURIO: Occupied by another army");

        // Verify that total troop amount does not exceed max troop count
        uint256 maxTroopCountPerArmy = GameLib.getConstant("Army", "Troop", "Amount", "", ECSLib.getUint("Level", _cityID));
        require(GameLib.sum(_amounts) <= maxTroopCountPerArmy, "CURIO: Troop amount exceeds capacity");

        // Gather army traits from individual troop types
        {
            uint256 speed = 0; // average
            uint256 load = 0; // sum
            uint256 moveCooldown = 0; // max
            uint256 battleCooldown = 0; // max

            require(_templateIDs.length == _amounts.length, "CURIO: Input lengths do not match");
            require(_templateIDs.length > 0, "CURIO: Army must have at least 1 troop");

            for (uint256 i = 0; i < _templateIDs.length; i++) {
                uint256 inventoryID = GameLib.getInventory(_cityID, _templateIDs[i]);
                require(ECSLib.getUint("Amount", inventoryID) >= _amounts[i], "CURIO: Not enough troops");

                speed += ECSLib.getUint("Speed", _templateIDs[i]) * _amounts[i];
                load += ECSLib.getUint("Load", _templateIDs[i]) * _amounts[i];
                ECSLib.setUint("Amount", inventoryID, ECSLib.getUint("Amount", inventoryID) - _amounts[i]);

                uint256 templateCooldown = ECSLib.getUint("MoveCooldown", _templateIDs[i]);
                moveCooldown = templateCooldown > moveCooldown ? templateCooldown : moveCooldown;
                templateCooldown = ECSLib.getUint("BattleCooldown", _templateIDs[i]);
                battleCooldown = templateCooldown > battleCooldown ? templateCooldown : battleCooldown;
            }
            speed /= GameLib.sum(_amounts);

            // Add army
            Templates.addArmy(GameLib.getPlayer(msg.sender), midPosition, ECSLib.getPosition("StartPosition", _cityID), speed, load, moveCooldown, battleCooldown, gs().worldConstants.tileWidth);
        }
        uint256 armyID = GameLib.getArmyAt(midPosition);

        // Add army constituents
        for (uint256 i = 0; i < _templateIDs.length; i++) {
            Templates.addConstituent(armyID, _templateIDs[i], _amounts[i]);
        }

        return armyID;
    }

    function disbandArmy(uint256 _armyID) external {
        // Basic checks
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_armyID, msg.sender);

        // Verify tile ownership
        Position memory startPosition = ECSLib.getPosition("StartPosition", _armyID);
        uint256 tileID = GameLib.getTileAt(startPosition);
        GameLib.entityOwnershipCheck(tileID, msg.sender);

        // Verify that army is in city center tile
        uint256 cityID = ECSLib.getUint("City", tileID);
        uint256 cityCenterID = GameLib.getCityCenter(cityID);
        require(GameLib.coincident(ECSLib.getPosition("StartPosition", cityCenterID), startPosition), "CURIO: Army must be on city center");

        // Return carried resources to city
        GameLib.unloadResources(cityID, _armyID);

        // Return troops to corresponding inventories and disband army
        GameLib.disbandArmy(cityID, _armyID);
    }

    /**
     * @dev One round of battle against an army, a tile, or a tile with a city.
     * @param _armyID army entity
     * @param _targetID target entity
     */
    function battle(uint256 _armyID, uint256 _targetID) external {
        // Basic checks
        GameLib.validEntityCheck(_armyID);
        GameLib.validEntityCheck(_targetID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_armyID, msg.sender);

        // Verify that army and target can battle
        require(ECSLib.getBool("CanBattle", _armyID), "CURIO: Army cannot battle");
        require(ECSLib.getBool("CanBattle", _targetID), "CURIO: Target cannot battle");

        // Verify that you don't own target
        uint256 playerID = GameLib.getPlayer(msg.sender);
        require(ECSLib.getUint("Owner", _targetID) != playerID, "CURIO: Cannot target yourself");

        // Check battle cooldown and update last timestamp
        require(block.timestamp >= ECSLib.getUint("LastTimestamp", _armyID) + ECSLib.getUint("BattleCooldown", _armyID), "CURIO: Battled too recently");
        ECSLib.setUint("LastTimestamp", _armyID, block.timestamp);

        // End army's gather
        if (GameLib.getArmyGather(_armyID) != NULL) GameLib.endGather(_armyID);

        // Trigger corresponding battle based on target entity tag
        if (GameLib.strEq(ECSLib.getString("Tag", _targetID), "Army")) {
            _battleArmy(_armyID, _targetID);
        } else if (GameLib.strEq(ECSLib.getString("Tag", _targetID), "Tile")) {
            _battleTile(_armyID, _targetID);
        }
    }

    function _battleArmy(uint256 _armyID, uint256 _targetArmyID) private {
        // Verify that army and target army are adjacent
        require(GameLib.euclidean(ECSLib.getPosition("Position", _armyID), ECSLib.getPosition("Position", _targetArmyID)) <= ECSLib.getUint("AttackRange", _armyID), "CURIO: Attack not within range");

        // End target army's gather
        if (GameLib.getArmyGather(_targetArmyID) != NULL) GameLib.endGather(_targetArmyID);

        // Execute one round of battle
        bool victory = GameLib.attack(_armyID, _targetArmyID, true, false, true);
        if (!victory) GameLib.attack(_targetArmyID, _armyID, true, false, true);
    }

    function _battleTile(uint256 _armyID, uint256 _tileID) private {
        // Verify that army and tile are adjacent
        require(
            GameLib.euclidean(ECSLib.getPosition("Position", _armyID), GameLib.getMidPositionFromTilePosition(ECSLib.getPosition("StartPosition", _tileID))) <= ECSLib.getUint("AttackRange", _armyID), //
            "CURIO: Attack not within range"
        );

        uint256 cityID = GameLib.getCityAtTile(ECSLib.getPosition("StartPosition", _tileID));

        // if it is barbarian, check it's not hybernating
        if (GameLib.isBarbarian(_tileID)) {
            uint256 barbarianCooldown = GameLib.getConstant("Barbarian", "", "Cooldown", "", 0);
            require(block.timestamp >= ECSLib.getUint("LastTimestamp", _tileID) + barbarianCooldown, "CURIO: Barbarians hybernating");
        }

        // Execute one round of battle
        for (uint256 i = 0; i < 3; i++) {
            // FIXME: hardcoded to accelerate battle
            bool victory = GameLib.attack(_armyID, _tileID, false, false, false);
            if (victory) {
                uint256 winnerCityID = GameLib.getPlayerCity(GameLib.getPlayer(msg.sender));
                if (cityID != NULL) {
                    // Victorious against city, add back some guards for the loser
                    Templates.addConstituent(_tileID, gs().templates["Guard"], GameLib.getConstant("City", "Guard", "Amount", "", ECSLib.getUint("Level", cityID)));
                    // City loses half of gold and winner gets it
                    uint256 loserCityGoldInventoryID = GameLib.getInventory(cityID, gs().templates["Gold"]);
                    uint256 loserTotalAmount = ECSLib.getUint("Amount", loserCityGoldInventoryID);
                    ECSLib.setUint("Amount", loserCityGoldInventoryID, loserTotalAmount / 2);

                    // Verify city ownership
                    require(winnerCityID != NULL, "CURIO: Winner must own a city");

                    // Add harvested gold to player's city limited by its load
                    // todo: alternative to lastSackedTimeStamp is to reward a preset amount of resources
                    uint256 winnerCityGoldInventoryID = GameLib.getInventory(winnerCityID, gs().templates["Gold"]);
                    uint256 existingCityGold = ECSLib.getUint("Amount", winnerCityGoldInventoryID);
                    uint256 winnerTotalAmount = GameLib.min(ECSLib.getUint("Load", winnerCityGoldInventoryID), loserTotalAmount / 2 + existingCityGold);
                    ECSLib.setUint("Amount", winnerCityGoldInventoryID, winnerTotalAmount);

                    // todo: update lastSackedTimeStamp
                } else {
                    if (GameLib.isBarbarian(_tileID)) {
                        // Reset barbarian
                        GameLib.distributeBarbarianReward(winnerCityID, _tileID);
                        uint256 barbarianGuardAmount = GameLib.getConstant("Barbarian", "Guard", "Amount", "", ECSLib.getUint("Terrain", _tileID) - 2); // FIXME: hardcoded
                        ECSLib.setUint("LastTimestamp", _tileID, block.timestamp);
                        Templates.addConstituent(_tileID, gs().templates["Guard"], barbarianGuardAmount);
                    } else {
                        // Neutralize tile
                        ECSLib.setUint("Owner", _tileID, NULL);
                    }
                }
            } else {
                GameLib.attack(_tileID, _armyID, false, false, true);
            }
        }
    }

    function claimTile(uint256 _armyID, uint256 _tileID) public {
        // Basic checks
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_armyID, msg.sender);

        // Check Tile Count has not exceeded limits
        uint256 playerID = GameLib.getPlayer(msg.sender);
        uint256 cityID = GameLib.getPlayerCity(playerID);
        // fixme: initialized tile hardcoded
        require(GameLib.getCityTiles(cityID).length < GameLib.getConstant("City", "Tile", "Amount", "", ECSLib.getUint("Level", GameLib.getCityCenter(cityID))), "CURIO: Reached territory limit");

        // Verify target tile has no owner
        require(ECSLib.getUint("Owner", _tileID) == 0, "CURIO: Tile has owner");

        // Verify target tile is not barbarian tile
        require(!GameLib.isBarbarian(_tileID), "CURIO: Cannot claim barbarian tiles");

        // Verify that no guard exists on tile
        require(GameLib.getConstituents(_tileID).length == 0, "CURIO: Tile has guard");

        // Verify that army is on selected tile
        Position memory tilePosition = ECSLib.getPosition("StartPosition", _tileID);
        require(GameLib.coincident(GameLib.getProperTilePosition(ECSLib.getPosition("Position", _armyID)), tilePosition), "CURIO: Army must be on tile to claim");

        // Verify that tile is next to own tile
        require(GameLib.isAdjacentToOwnTile(playerID, tilePosition), "CURIO: Can only claim contiguous tiles");

        // Verify that no other movable entity is on tile
        uint256[] memory movableEntitiesOnTile = GameLib.getMovableEntitiesAtTile(tilePosition);
        require(movableEntitiesOnTile.length == 1 && movableEntitiesOnTile[0] == _armyID, "CURIO: Other movable entity on tile");

        // Transfer ownership of tile and initialize new guard
        ECSLib.setUint("Owner", _tileID, playerID);
        ECSLib.setUint("City", _tileID, cityID);

        Templates.addConstituent(_tileID, gs().templates["Guard"], GameLib.getConstant("Tile", "Guard", "Amount", "", ECSLib.getUint("Level", _tileID)));
    }

    function upgradeResource(uint256 _resourceID) public {
        GameLib.validEntityCheck(_resourceID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);

        {
            // Tile needs to be yours
            uint256 tileID = GameLib.getTileAt(ECSLib.getPosition("StartPosition", _resourceID));
            require(ECSLib.getUint("Owner", tileID) == GameLib.getPlayer(msg.sender), "CURIO: Tile isn't yours");

            // Check if player has reached max tile level
            uint256 cityCenterID = GameLib.getCityCenter(ECSLib.getUint("City", tileID));
            require(ECSLib.getUint("Level", _resourceID) < ECSLib.getUint("Level", cityCenterID) * gs().worldConstants.cityCenterLevelToEntityLevelRatio, "CURIO: Need to upgrade resource");
        }
        uint256 playerID = GameLib.getPlayer(msg.sender);
        uint256 resourceLevel = ECSLib.getUint("Level", _resourceID);

        // check if upgrade is in process
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        string memory subject = ECSLib.getUint("Template", _resourceID) == gs().templates["Gold"] ? "Goldmine" : "Farm";
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _resourceID) > GameLib.getConstant(subject, "", "Cooldown", "Upgrade", _resourceID), "CURIO: Upgrade in process");

        // Deduct costs and set load
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            uint256 inventoryID = GameLib.getInventory(GameLib.getPlayerCity(playerID), resourceTemplateIDs[i]);
            uint256 balance = ECSLib.getUint("Amount", inventoryID);
            uint256 cost = GameLib.getConstant(subject, ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Upgrade", resourceLevel);
            require(balance >= cost, "CURIO: Insufficient balance");
            ECSLib.setUint("Amount", inventoryID, balance - cost);
        }

        // Set load
        uint256 newLoad = GameLib.getConstant(subject, ECSLib.getString("InventoryType", ECSLib.getUint("Template", _resourceID)), "Load", "", resourceLevel + 1);
        ECSLib.setUint("Load", _resourceID, newLoad);
        ECSLib.setUint("LastTimestamp", _resourceID, block.timestamp);

        // Set timestamp
        ECSLib.setUint("LastUpgraded", _resourceID, block.timestamp);

        // Set new level
        ECSLib.setUint("Level", _resourceID, resourceLevel + 1);
    }

    // --------------------------
    // treaty (WIP)
    // --------------------------

    // TODO: setAddress => _setAddressArray
    // function joinTreaty(address _treatyAddress) external {
    //     // GameLib.ongoingGameCheck();
    //     // GameLib.activePlayerCheck(msg.sender);
    //     // // request to sign treaty
    //     // (bool success, bytes memory returnData) = _treatyAddress.call(abi.encodeWithSignature("joinTreaty()"));
    //     // require(success, "CRUIO: Failed to call the external treaty");
    //     // require(abi.decode(returnData, (bool)), "CRUIO: The treaty rejects your request");
    //     // // Sign treaty
    //     // uint256 _signatureID = ECSLib.addEntity();
    //     // ECSLib.setString("Tag", _signatureID, "Signature");
    //     // ECSLib.setUint("Owner", _signatureID, _playerID);
    //     // ECSLib.setAddress("Treaty", _signatureID, _treatyAddress);
    // }

    // function denounceTreaty(address _treatyToDenounce) external {
    //     // uint256 _playerID = GameLib.getPlayer(msg.sender);
    //     // // Verify that player is active
    //     // require(ECSLib.getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");
    //     // GameLib.ongoingGameCheck();
    //     // // request to breach treaty
    //     // (bool success, bytes memory returnData) = _treatyToDenounce.call(abi.encodeWithSignature("denounceTreaty()"));
    //     // require(success, "CRUIO: Failed to call the external treaty");
    //     // require(abi.decode(returnData, (bool)), "CRUIO: The treaty rejects your request");
    //     // // breach treaty
    //     // uint256[] memory _signatureIDs = GameLib.getPlayerSignatures(_playerID);
    //     // for (uint256 i = 0; i < _signatureIDs.length; i++) {
    //     //     address _treaty = ECSLib.getAddress("Treaty", _signatureIDs[i]);
    //     //     if (_treaty == _treatyToDenounce) {
    //     //         ECSLib.removeEntity(_signatureIDs[i]);
    //     //         break;
    //     //     }
    //     // }
    // }
}
