//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Position, WorldConstants} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import "contracts/libraries/Templates.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Game facet
/// @notice Contains player functions

contract GameFacet is UseStorage {
    using SafeMath for uint256;
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
        require(ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("Constant")).length > 0, "CURIO: Constants not initialized");
        require(gs().players.length < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(gs().playerEntityMap[msg.sender] == NULL, "CURIO: Player already initialized");

        // Initialize tile
        GameLib.initializeTile(GameLib.getProperTilePosition(_position));

        // Register player
        uint256 playerID = Templates.addPlayer(_name);
        gs().players.push(msg.sender);
        gs().playerEntityMap[msg.sender] = playerID;

        // Add player's first settler
        uint256 settlerID = Templates.addSettler(_position, playerID, gs().worldConstants.tileWidth);

        // Add initial resources to settler
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            uint256 inventoryAmount = GameLib.getConstant("initializePlayer", "Amount", resourceTemplateIDs[i], 0);
            uint256 inventoryLoad = GameLib.getConstant("initializePlayer", "Load", resourceTemplateIDs[i], 0);
            Templates.addInventory(settlerID, resourceTemplateIDs[i], inventoryAmount, inventoryLoad, true);
        }
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

        // Initialize tile
        GameLib.initializeTile(GameLib.getProperTilePosition(_targetPosition));

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

        // Verify that territory is connected and includes settler's current position FIXME
        Position memory centerTilePosition = GameLib.getProperTilePosition(ECSLib.getPosition("Position", _settlerID));
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
            require(ECSLib.getUint("City", tileID) == NULL, "CURIO: Overlaps with another city");

            ECSLib.setUint("City", tileID, cityID);
            ECSLib.setUint("Owner", tileID, playerID);
        }

        // Convert the settler to a city
        Templates.convertSettlerToCity(_settlerID, _cityName, centerTilePosition);

        // Add city center
        Templates.addCityCenter(centerTilePosition, cityID);

        // Strengthen guard to city defense level
        uint256 cityGuardAmount = GameLib.getConstant("foundCity", "Amount", gs().templates["Guard"], 0);
        ECSLib.setUint("Amount", GameLib.getConstituents(GameLib.getTileAt(centerTilePosition))[0], cityGuardAmount);
    }

    /// @notice This function can be viewed as the inverse of `foundCity`, as it converts a city back into a settler.
    function packCity(uint256 _cityID) external {
        // Basic checks
        GameLib.validEntityCheck(_cityID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_cityID, msg.sender);

        // Deduct packing cost
        uint256 packCost = GameLib.getConstant("packCity", "Cost", gs().templates["Gold"], 0);
        uint256 balance = GameLib.getCityGold(_cityID);
        require(balance >= packCost, "CURIO: Insufficient gold for packing");
        ECSLib.setUint("Amount", GameLib.getInventory(_cityID, gs().templates["Gold"]), balance - packCost);

        // Remove city tiles
        uint256[] memory tileIDs = GameLib.getCityTiles(_cityID);
        assert(tileIDs.length == GameLib.getCityTileCountByLevel(ECSLib.getUint("Level", _cityID)));
        for (uint256 i = 0; i < tileIDs.length; i++) {
            ECSLib.setUint("Owner", tileIDs[i], NULL);
        }

        // Convert the settler to a city
        uint256 health = GameLib.getConstant("packCity", "Health", gs().templates["Placeholder"], 0);
        Templates.convertCityToSettler(_cityID, health, gs().worldConstants.tileWidth);

        // Remove city center
        ECSLib.removeEntity(GameLib.getCityCenter(_cityID));
    }

    // every time you purchase, you increase the number of tile defenders
    function upgradeTile(uint256 _tileID) external {
        // Basic checks
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_tileID, msg.sender);

        // Deduct costs
        uint256 playerID = GameLib.getPlayer(msg.sender);
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            uint256 inventoryID = GameLib.getInventory(GameLib.getPlayerCity(playerID), resourceTemplateIDs[i]);
            uint256 balance = ECSLib.getUint("Amount", inventoryID);
            uint256 cost = GameLib.getConstant("upgradeTile", "Cost", resourceTemplateIDs[i], 0);
            require(balance >= cost, "CURIO: Insufficient balance");
            ECSLib.setUint("Amount", inventoryID, balance - cost);
        }

        // Upgrade tile defense
        uint256 added = GameLib.getConstant("upgradeTile", "Amount", gs().templates["Guard"], 1);
        uint256 newConstituentAmount = GameLib.min(ECSLib.getUint("Amount", GameLib.getConstituents(_tileID)[0]) + added, added * 3);
        ECSLib.setUint("Amount", GameLib.getConstituents(_tileID)[0], newConstituentAmount);
    }

    function upgradeCityInventory(uint256 _buildingID) external {
        // Basic checks
        GameLib.validEntityCheck(_buildingID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        uint256 cityID = ECSLib.getUint("City", _buildingID);
        GameLib.entityOwnershipCheck(cityID, msg.sender);

        // Verify that city has enough gold and deduct cost
        uint256 goldInventoryID = GameLib.getInventory(cityID, gs().templates["Gold"]);
        uint256 balance = ECSLib.getUint("Amount", goldInventoryID);
        uint256 cost = GameLib.getConstant("upgradeCityInventory", "Cost", goldInventoryID, 0);
        require(balance >= cost, "CURIO: Insufficient gold balance");
        ECSLib.setUint("Amount", goldInventoryID, balance - cost);

        // Upgrade tile level and inventory loads
        uint256 newLevel = ECSLib.getUint("Level", _buildingID) + 1;
        ECSLib.setUint("Level", _buildingID, newLevel);
        for (uint256 i = 0; i < gs().templateNames.length; i++) {
            uint256 templateID = gs().templates[gs().templateNames[i]];
            uint256 inventoryID = GameLib.getInventory(cityID, templateID);
            if (inventoryID != NULL) {
                if (GameLib.strEq(ECSLib.getString("Tag", inventoryID), "ResourceInventory")) {
                    uint256 load = GameLib.getConstant("upgradeCityInventory", "Load", templateID, newLevel);
                    ECSLib.setUint("Load", inventoryID, load);
                } else if (GameLib.strEq(ECSLib.getString("Tag", inventoryID), "TroopInventory")) {
                    uint256 load = GameLib.getConstant("upgradeCityInventory", "Load", templateID, newLevel);
                    ECSLib.setUint("Load", inventoryID, load);
                }
            }
        }
    }

    function upgradeCity(uint256 _cityID, Position[] memory _newTiles) external {
        // Basic checks
        GameLib.validEntityCheck(_cityID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_cityID, msg.sender);

        // Verify that city has enough gold
        uint256 goldInventoryID = GameLib.getInventory(_cityID, gs().templates["Gold"]);
        uint256 balance = ECSLib.getUint("Amount", goldInventoryID);
        uint256 cost = GameLib.getConstant("upgradeCity", "Cost", gs().templates["Gold"], 0);
        require(balance >= cost, "CURIO: Insufficient gold balance");

        // Verify tile count correctness
        uint256 newLevel = ECSLib.getUint("Level", _cityID);
        require(_newTiles.length == GameLib.getCityTileCountByLevel(newLevel) - GameLib.getCityTileCountByLevel(newLevel - 1), "CURIO: Incorrect tile count"); // FIXME: ECS

        // Verify that territory is connected
        require(GameLib.connected(_newTiles), "CURIO: Territory not connected");

        // Verify that new territory is connected to existing territory
        // TODO

        // Verify that territory is wholly in bound and does not overlap with other cities
        uint256 playerID = GameLib.getPlayer(msg.sender);
        for (uint256 i = 0; i < _newTiles.length; i++) {
            GameLib.inboundPositionCheck(_newTiles[i]);
            require(GameLib.isProperTilePosition(_newTiles[i]), "CURIO: Must be proper tile position");
            uint256 tileID = GameLib.initializeTile(_newTiles[i]);
            require(ECSLib.getUint("City", tileID) == NULL, "CURIO: Overlaps with another city");

            ECSLib.setUint("Owner", tileID, playerID);
        }

        // Deduct upgrade cost
        ECSLib.setUint("Amount", goldInventoryID, balance - cost);

        // Update city level and guard amount
        ECSLib.setUint("Level", _cityID, newLevel);
        uint256 centerTileID = GameLib.getTileAt(ECSLib.getPosition("StartPosition", GameLib.getCityCenter(_cityID)));
        uint256 cityGuardAmount = GameLib.getConstant("upgradeCity", "Amount", gs().templates["Guard"], newLevel);
        ECSLib.setUint("Amount", GameLib.getConstituents(centerTileID)[0], cityGuardAmount);
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
            uint256 cost = GameLib.getConstant("startTroopProduction", "Cost", resourceTemplateIDs[i], 0);
            require(balance >= cost, "CURIO: Insufficient balance");
            ECSLib.setUint("Amount", resourceInventoryID, balance - cost);
        }

        // Verify no ongoing production
        require(GameLib.getBuildingProduction(_buildingID) == NULL, "CURIO: Concurrent productions disallowed");

        // Create inventory if none exists, and verify that amount does not exceed ceiling
        uint256 troopInventoryID = GameLib.getInventory(cityID, _templateID);
        if (troopInventoryID == NULL) {
            uint256 load = GameLib.getConstant("startTroopProduction", "Load", _templateID, 0);
            troopInventoryID = Templates.addInventory(cityID, _templateID, 0, load, false);
        } else {
            require(ECSLib.getUint("Amount", troopInventoryID) < ECSLib.getUint("Load", troopInventoryID), "CURIO: Amount exceeds inventory capacity");
        }

        // Start production
        return Templates.addTroopProduction(_buildingID, _templateID, troopInventoryID, _amount, _amount / 5);
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

        // Get harvest amount
        uint256 templateID = ECSLib.getUint("Template", _resourceID);
        uint256 harvestRate = GameLib.getConstant("harvestResource", "Amount", templateID, resourceLevel);
        uint256 harvestAmount = (block.timestamp - ECSLib.getUint("LastTimestamp", _resourceID)) * harvestRate;
        harvestAmount = GameLib.min(ECSLib.getUint("Load", _resourceID), harvestAmount);

        // Update last harvest
        ECSLib.setUint("LastTimestamp", _resourceID, block.timestamp);

        // Update city inventory amount
        uint256 cityInventoryID = GameLib.getInventory(cityID, templateID);
        uint256 existingCityResource = ECSLib.getUint("Amount", cityInventoryID);
        uint256 totalAmount = GameLib.min(ECSLib.getUint("Load", cityInventoryID), harvestAmount + existingCityResource);
        ECSLib.setUint("Amount", cityInventoryID, totalAmount);
    }

    // TODO: harvest gold & food on a city; consider merge this with the function above
    function harvestResourcesFromCity(uint256 _buildingID) external {
        GameLib.validEntityCheck(_buildingID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);

        // Verify that city belongs to player
        uint256 cityID = ECSLib.getUint("City", _buildingID);
        GameLib.entityOwnershipCheck(cityID, msg.sender);

        // Create inventory if none exists
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            uint256 inventoryID = GameLib.getInventory(cityID, resourceTemplateIDs[i]);
            uint256 harvestRate = GameLib.getConstant("harvestResourcesFromCity", "Amount", resourceTemplateIDs[i], 0);
            uint256 harvestAmount = (block.timestamp - ECSLib.getUint("LastTimestamp", _buildingID)) * harvestRate;
            harvestAmount = GameLib.min(GameLib.getConstant("harvestResourcesFromCity", "Load", resourceTemplateIDs[i], ECSLib.getUint("Level", cityID)), harvestAmount);
            ECSLib.setUint("Amount", inventoryID, GameLib.min(ECSLib.getUint("Amount", inventoryID) + harvestAmount, ECSLib.getUint("Load", inventoryID)));
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
        require(GameLib.sum(_amounts) <= gs().worldConstants.maxTroopCountPerArmy, "CURIO: Troop amount exceeds capacity");

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
            Templates.addArmy(GameLib.getPlayer(msg.sender), midPosition, speed, load, moveCooldown, battleCooldown, gs().worldConstants.tileWidth);
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

        bool isBarbarian = ECSLib.getUint("Level", _tileID) == 1 || ECSLib.getUint("Level", _tileID) == 2;
        uint256 cityID = GameLib.getCityAtTile(ECSLib.getPosition("StartPosition", _tileID));

        // if it is barbarian, check it's not hybernating
        if (isBarbarian) {
            require(block.timestamp >= ECSLib.getUint("LastTimestamp", _tileID) + gs().worldConstants.barbarianCooldown, "CURIO: Barbarians hybernating");
        }

        // Execute one round of battle
        bool victory = GameLib.attack(_armyID, _tileID, false, false, false);
        if (victory) {
            uint256 winnerCityID = GameLib.getPlayerCity(GameLib.getPlayer(msg.sender));
            if (cityID != NULL) {
                // Victorious against city, add back some guards for the loser
                Templates.addConstituent(_tileID, gs().templates["Guard"], GameLib.getConstant("foundCity", "Amount", gs().templates["Guard"], 0));
                // City loses half of gold and winner gets it
                uint256 loserCityGoldInventoryID = GameLib.getInventory(cityID, gs().templates["Gold"]);
                uint256 loserTotalAmount = ECSLib.getUint("Amount", loserCityGoldInventoryID);
                ECSLib.setUint("Amount", loserCityGoldInventoryID, loserTotalAmount / 2);

                // Verify city ownership
                require(winnerCityID != NULL, "CURIO: Winner must own a city");

                // Add harvested gold to player's city limited by its load
                uint256 winnerCityGoldInventoryID = GameLib.getInventory(winnerCityID, gs().templates["Gold"]);
                uint256 existingCityGold = ECSLib.getUint("Amount", winnerCityGoldInventoryID);
                uint256 winnerTotalAmount = GameLib.min(ECSLib.getUint("Load", winnerCityGoldInventoryID), loserTotalAmount / 2 + existingCityGold);
                ECSLib.setUint("Amount", winnerCityGoldInventoryID, winnerTotalAmount);
            } else {
                if (isBarbarian) {
                    // Reset barbarian
                    GameLib.distributeBarbarianReward(winnerCityID, _tileID);
                    uint256 barbarianGuardAmount = GameLib.getConstant("initializeTile", "Amount", gs().templates["Guard"], ECSLib.getUint("Level", _tileID));
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

    function claimTile(uint256 _armyID, uint256 _tileID) public {
        // Basic checks
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_armyID, msg.sender);

        // Verify target tile has no owner
        require(ECSLib.getUint("Owner", _tileID) == 0, "CURIO: Tile has owner");

        // Verify target tile is not barbarian tile
        require(ECSLib.getUint("Level", _tileID) != 1 && ECSLib.getUint("Level", _tileID) != 2, "CURIO: Cannot claim barbarian tiles");

        // Verify that no guard exists on tile
        require(GameLib.getConstituents(_tileID).length == 0, "CURIO: Tile has guard");

        // Verify that army is on selected tile
        Position memory armyPosition = ECSLib.getPosition("Position", _armyID);
        Position memory tilePosition = ECSLib.getPosition("StartPosition", _tileID);
        require(GameLib.coincident(GameLib.getProperTilePosition(armyPosition), tilePosition), "CURIO: Army must be on tile to claim");

        // Verify that tile is next to own tile
        uint256 playerID = GameLib.getPlayer(msg.sender);
        require(GameLib.isAdjacentToOwnTile(playerID, tilePosition), "CURIO: Can only claim next to a tile your own");

        // Verify that no other movable entity is on tile
        uint256[] memory movableEntitiesOnTile = GameLib.getMovableEntitiesAtTile(tilePosition);
        require(movableEntitiesOnTile.length == 1 && movableEntitiesOnTile[0] == _armyID, "CURIO: Other movable entity on tile");

        // Transfer ownership of tile and initialize new guard
        ECSLib.setUint("Owner", _tileID, playerID);
        Templates.addConstituent(_tileID, gs().templates["Guard"], GameLib.getConstant("initializeTile", "Amount", gs().templates["Guard"], 0));
    }

    function upgradeResource(uint256 _resourceID) public {
        GameLib.validEntityCheck(_resourceID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);

        // Tile needs to be yours
        uint256 playerID = GameLib.getPlayer(msg.sender);
        uint256 tileID = GameLib.getTileAt(ECSLib.getPosition("StartPosition", _resourceID));
        require(ECSLib.getUint("Owner", tileID) == playerID, "CURIO: Tile isn't yours");

        // Deduct costs
        uint256 newResourceLevel = ECSLib.getUint("Level", _resourceID) + 1;
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            uint256 inventoryID = GameLib.getInventory(GameLib.getPlayerCity(playerID), resourceTemplateIDs[i]);
            uint256 balance = ECSLib.getUint("Amount", inventoryID);
            uint256 cost = GameLib.getConstant("upgradeResource", "Cost", resourceTemplateIDs[i], newResourceLevel);
            require(balance >= cost, "CURIO: Insufficient balance");
            ECSLib.setUint("Amount", inventoryID, balance - cost);
        }

        // Set new level and load
        ECSLib.setUint("Level", _resourceID, newResourceLevel);
        uint256 newLoad = GameLib.getConstant("upgradeResource", "Load", ECSLib.getUint("Template", _resourceID), newResourceLevel);
        ECSLib.setUint("Load", _resourceID, newLoad);
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
