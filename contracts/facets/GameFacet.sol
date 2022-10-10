//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Position, WorldConstants} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import "contracts/libraries/Templates.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import "forge-std/console.sol";

/// @title Game facet
/// @notice Contains player functions

// TODO: LEFT OFF: guard and battle and constituents and initializeTile

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

        // Add initial gold
        Templates.addInventory(settlerID, gs().templates["Gold"], gs().worldConstants.initCityGold, gs().worldConstants.initCityCenterGoldLoad);
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

            ECSLib.setUint("Owner", tileID, playerID);
        }

        // Convert the settler to a city
        Templates.convertSettlerToCity(_settlerID, _cityName, centerTilePosition);

        // Add city center
        Templates.addCityCenter(centerTilePosition, cityID);

        // Strengthen guard to city defense level
        ECSLib.setUint("Amount", GameLib.getConstituents(GameLib.getTileAt(centerTilePosition))[0], gs().worldConstants.cityGuardAmount);
    }

    /// @notice This function can be viewed as the inverse of `foundCity`, as it converts a city back into a settler.
    function packCity(uint256 _cityID) external {
        // Basic checks
        GameLib.validEntityCheck(_cityID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_cityID, msg.sender);

        // Deduct packing cost
        // FIXME: configure optimal gold upgrade balance for city
        uint256 packCost = gs().worldConstants.cityPackCost;
        uint256 balance = GameLib.getCityGold(_cityID);
        require(balance >= packCost, "CURIO: Insufficient gold for packing");
        uint256 _goldInventoryID = GameLib.getInventory(_cityID, GameLib.getTemplateByInventoryType("Gold"));
        ECSLib.setUint("Amount", _goldInventoryID, balance - packCost);

        // Remove city tiles
        uint256[] memory tileIDs = GameLib.getCityTiles(_cityID);
        assert(tileIDs.length == GameLib.getCityTileCountByLevel(ECSLib.getUint("Level", _cityID)));
        uint256 settlerID = _cityID;
        for (uint256 i = 0; i < tileIDs.length; i++) {
            ECSLib.removeEntity(tileIDs[i]);
        }

        // Convert the settler to a city
        uint256 health = GameLib.getSettlerHealthByLevel(ECSLib.getUint("Level", settlerID));
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

        uint256 goldInventoryID = GameLib.getInventory(GameLib.getPlayerCity(GameLib.getPlayer(msg.sender)), gs().templates["Gold"]);
        uint256 balance = ECSLib.getUint("Amount", goldInventoryID);
        uint256 cost = gs().worldConstants.tileUpgradeGoldCost;
        require(balance >= cost, "CURIO: Insufficient gold balance");

        // Deduct upgrade cost
        ECSLib.setUint("Amount", goldInventoryID, balance - cost);

        // get constituents
        uint256 constituentAmount = ECSLib.getUint("Amount", GameLib.getConstituents(_tileID)[0]);
        ECSLib.setUint("Amount", GameLib.getConstituents(_tileID)[0], constituentAmount + gs().worldConstants.tileGuardAmount);
    }

    function upgradeCityInventory(uint256 _buildingID) external {
        // Basic checks
        GameLib.validEntityCheck(_buildingID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        uint256 cityID = ECSLib.getUint("City", _buildingID);
        GameLib.entityOwnershipCheck(cityID, msg.sender);

        // Verify that city has enough gold
        uint256 goldInventoryID = GameLib.getInventory(cityID, gs().templates["Gold"]);
        uint256 balance = ECSLib.getUint("Amount", goldInventoryID);
        uint256 cost = gs().worldConstants.buildingUpgradeGoldCost;
        require(balance >= cost, "CURIO: Insufficient gold balance");

        // Deduct upgrade cost
        ECSLib.setUint("Amount", goldInventoryID, balance - cost);

        // Upgrade tile level and inventory loads
        uint256 newLevel = ECSLib.getUint("Level", _buildingID) + 1;
        ECSLib.setUint("Level", _buildingID, newLevel);
        for (uint256 i = 0; i < gs().templateNames.length; i++) {
            uint256 inventoryID = GameLib.getInventory(cityID, gs().templates[gs().templateNames[i]]);
            if (inventoryID != NULL) {
                string memory inventoryTag = ECSLib.getString("Tag", inventoryID);
                if (GameLib.strEq(inventoryTag, "ResourceInventory")) {
                    ECSLib.setUint("Load", inventoryID, gs().worldConstants.initCityCenterGoldLoad * newLevel);
                } else if (GameLib.strEq(inventoryTag, "TroopInventory")) {
                    ECSLib.setUint("Load", inventoryID, gs().worldConstants.initCityCenterTroopLoad * newLevel);
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
        uint256 cost = gs().worldConstants.cityUpgradeGoldCost;
        require(balance >= cost, "CURIO: Insufficient gold balance");

        // Verify tile count correctness
        uint256 level = ECSLib.getUint("Level", _cityID);
        require(_newTiles.length == GameLib.getCityTileCountByLevel(level + 1) - GameLib.getCityTileCountByLevel(level), "CURIO: Incorrect tile count");

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

            ECSLib.setUint("Owner", tileID, playerID);
        }

        // Deduct upgrade cost
        ECSLib.setUint("Amount", goldInventoryID, balance - cost);

        // Update city level and guard amount
        ECSLib.setUint("Level", _cityID, level + 1);
        uint256 centerTileID = GameLib.getTileAt(ECSLib.getPosition("StartPosition", GameLib.getCityCenter(_cityID)));
        ECSLib.setUint("Amount", GameLib.getConstituents(centerTileID)[0], (level + 1) * gs().worldConstants.cityGuardAmount);
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

        // Check gold balance sufficience
        uint256 goldInventoryID = GameLib.getInventory(cityID, gs().templates["Gold"]);
        uint256 balance = goldInventoryID != NULL ? ECSLib.getUint("Amount", goldInventoryID) : 0;
        uint256 cost = ECSLib.getUint("Cost", _templateID) * _amount;
        require(balance >= cost, "CURIO: Insufficient gold balance");

        // Verify no ongoing production
        require(GameLib.getBuildingProduction(_buildingID) == NULL, "CURIO: No concurrent productions");

        // Create inventory if none exists, and verify that amount does not exceed ceiling
        uint256 inventoryID = GameLib.getInventory(cityID, _templateID);
        if (inventoryID == NULL) {
            inventoryID = ECSLib.addEntity();
            ECSLib.setString("Tag", inventoryID, "TroopInventory");
            ECSLib.setUint("City", inventoryID, cityID);
            ECSLib.setUint("Template", inventoryID, _templateID);
            ECSLib.setUint("Amount", inventoryID, 0);
            ECSLib.setUint("Load", inventoryID, gs().worldConstants.initCityCenterTroopLoad);
        } else {
            require(ECSLib.getUint("Amount", inventoryID) < ECSLib.getUint("Load", inventoryID), "CURIO: Amount exceeds inventory capacity");
        }

        // Start production
        productionID = ECSLib.addEntity();
        ECSLib.setString("Tag", productionID, "TroopProduction");
        ECSLib.setUint("Keeper", productionID, _buildingID);
        ECSLib.setUint("Template", productionID, _templateID);
        ECSLib.setUint("Inventory", productionID, inventoryID);
        ECSLib.setUint("Amount", productionID, _amount);
        ECSLib.setUint("InitTimestamp", productionID, block.timestamp);
        ECSLib.setUint("Duration", productionID, ECSLib.getUint("Duration", _templateID) * _amount);

        // Deduct production cost
        ECSLib.setUint("Amount", goldInventoryID, balance - cost);
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

    // function startGather(uint256 _armyID, uint256 _resourceID) external {
    //     GameLib.validEntityCheck(_armyID);
    //     GameLib.validEntityCheck(_resourceID);
    //     GameLib.ongoingGameCheck();
    //     GameLib.activePlayerCheck(msg.sender);
    //     GameLib.entityOwnershipCheck(_armyID, msg.sender);

    //     // Verify that army is sitting on the resource
    //     Position memory startPosition = GameLib.getProperTilePosition(ECSLib.getPosition("Position", _armyID));
    //     require(GameLib.coincident(startPosition, ECSLib.getPosition("StartPosition", _resourceID)), "CURIO: Army must be on resource tile");

    //     // Verify that resource is not in another player's territory
    //     uint256 tileID = GameLib.getTileAt(startPosition);
    //     uint256 playerID = GameLib.getPlayer(msg.sender);
    //     require(tileID == NULL || ECSLib.getUint("Owner", ECSLib.getUint("City", tileID)) == playerID, "CURIO: Cannot gather on other's tiles");

    //     require(GameLib.getArmyGather(_armyID) == 0, "CURIO: Another gather at this location");

    //     // Verify that the army's capacity isn't full
    //     // TODO

    //     Templates.addResourceGather(startPosition, playerID, _resourceID, _armyID);
    // }

    // function endGather(uint256 _armyID) external {
    //     GameLib.validEntityCheck(_armyID);
    //     GameLib.ongoingGameCheck();
    //     GameLib.activePlayerCheck(msg.sender);
    //     GameLib.entityOwnershipCheck(_armyID, msg.sender);

    //     // End gather
    //     GameLib.endGather(_armyID);
    // }

    // function buildGoldMine(uint256 _goldMineResourceID) external {
    //     uint256 playerID = gs().playerEntityMap[msg.sender];
    //     uint256 playerCityID = GameLib.getPlayerCity(playerID);
    //     require(playerCityID != 0, "CURIO: Player must own a city");

    //     uint256 goldmineResourceLevel = ECSLib.getUint("Level", _goldMineResourceID);
    //     require(goldmineResourceLevel == 0, "CURIO: Gold mine already built");

    //     // subtract gold cost from player city
    //     uint256 cost = GameLib.goldmineUpgradeSelector(goldmineResourceLevel);

    //     // increase gold mine level
    //     ECSLib.setUint("Level", _goldMineResourceID, goldmineResourceLevel + 1);

    //     uint256 cityGoldInventoryID = GameLib.getInventory(playerCityID, GameLib.getTemplateByInventoryType("Gold"));
    //     ECSLib.setUint("Amount", cityGoldInventoryID, GameLib.getCityGold(playerCityID) + cost);
    // }

    // harvest gold from a gold resource directly
    function harvestGold(uint256 _goldMineResourceID, uint256 armyID) external {
        // Basic checks
        GameLib.validEntityCheck(_goldMineResourceID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);

        uint256 goldMineLevel = ECSLib.getUint("Level", _goldMineResourceID);
        Position memory goldMineStartPosition = ECSLib.getPosition("StartPosition", _goldMineResourceID);

        // if there's an army, it needs to be 1) yours 2) on the tile it's trying to harvest from
        if (armyID != NULL) {
            GameLib.validEntityCheck(armyID);
            GameLib.neutralOrOwnedEntityCheck(GameLib.getTileAt(goldMineStartPosition), msg.sender);

            Position memory armyPosition = ECSLib.getPosition("Position", armyID);
            require(GameLib.coincident(goldMineStartPosition, GameLib.getProperTilePosition(armyPosition)), "CURIO: Army not on gold mine");
        }
        bool hasArmyOnTile = armyID != NULL;
        bool hasGoldMineBuilt = goldMineLevel > 0;

        require(hasArmyOnTile || hasGoldMineBuilt, "CURIO: Need gold mine or army on tile");

        // Verify that the gold mine resource level is greater than zero, meaning that a gold mine has "been built".
        // require(goldMineLevel > 0, "CURIO: Must activate gold mine");

        // Verify city ownership
        uint256 playerCityID = GameLib.getPlayerCity(GameLib.getPlayer(msg.sender));
        require(playerCityID != NULL, "CURIO: Player must own a city");

        // Get harvest amount
        uint256 goldMineHarvestCap = ECSLib.getUint("Load", _goldMineResourceID);
        uint256 goldmineLevel = ECSLib.getUint("Level", _goldMineResourceID);
        uint256 rawHarvestAmount = GameLib._goldmineProductionRate(goldmineLevel) * (block.timestamp - ECSLib.getUint("LastTimestamp", _goldMineResourceID)); // 1 second = 1 gold
        uint256 harvestAmount = GameLib.min(goldMineHarvestCap, rawHarvestAmount); // harvest amount must not exceed the gold cap

        // Update gold mine last harvest
        ECSLib.setUint("LastTimestamp", _goldMineResourceID, block.timestamp);

        // Add harvested gold to player's city limited by its load
        uint256 cityGoldInventoryID = GameLib.getInventory(playerCityID, gs().templates["Gold"]);
        uint256 existingCityGold = ECSLib.getUint("Amount", cityGoldInventoryID);
        uint256 totalAmount = GameLib.min(ECSLib.getUint("Load", cityGoldInventoryID), harvestAmount + existingCityGold);
        ECSLib.setUint("Amount", cityGoldInventoryID, totalAmount);
    }

    // harvest gold on a city
    function harvestResource(uint256 _buildingID, uint256 _templateID) external {
        GameLib.validEntityCheck(_buildingID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);

        // Verify that city belongs to player
        uint256 cityID = ECSLib.getUint("City", _buildingID);
        GameLib.entityOwnershipCheck(cityID, msg.sender);

        // Create inventory if none exists
        uint256 inventoryID = GameLib.getInventory(cityID, _templateID);
        if (inventoryID == NULL) {
            inventoryID = ECSLib.addEntity();
            ECSLib.setString("Tag", inventoryID, "ResourceInventory");
            ECSLib.setUint("City", inventoryID, cityID);
            ECSLib.setUint("Template", inventoryID, _templateID);
            ECSLib.setUint("Amount", inventoryID, 0);
        }

        // Update harvest amount
        uint256 harvestAmount = (block.timestamp - ECSLib.getUint("LastTimestamp", _buildingID)) / ECSLib.getUint("Duration", _templateID);
        harvestAmount = GameLib.min(GameLib.getHarvestCap(ECSLib.getUint("Level", cityID)), harvestAmount);
        uint256 totalAmount = GameLib.min(ECSLib.getUint("Amount", inventoryID) + harvestAmount, ECSLib.getUint("Load", inventoryID));
        ECSLib.setUint("Amount", inventoryID, totalAmount);

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
            Templates.addArmy(GameLib.getPlayer(msg.sender), midPosition, speed, load, moveCooldown, battleCooldown);
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

        // Get army position and city on top
        Position memory startPosition = GameLib.getProperTilePosition(ECSLib.getPosition("Position", _armyID));
        uint256 tileID = GameLib.getTileAt(startPosition);

        // Verify tile ownership
        GameLib.entityOwnershipCheck(tileID, msg.sender);

        // Verify that army is in city center tile
        uint256 cityID = ECSLib.getUint("City", tileID);
        require(GameLib.coincident(ECSLib.getPosition("StartPosition", cityID), startPosition), "CURIO: Army must be on city center");

        // Return carried gold to city
        uint256 cityGoldInventoryID = GameLib.getInventory(cityID, gs().templates["Gold"]);
        ECSLib.setUint("Amount", cityGoldInventoryID, ECSLib.getUint("Amount", cityGoldInventoryID) + ECSLib.getUint("Amount", GameLib.getArmyInventory(_armyID, gs().templates["Gold"])));

        // Return troops and carried gold to corresponding inventories
        uint256[] memory constituentIDs = GameLib.getConstituents(_armyID);
        for (uint256 i = 0; i < constituentIDs.length; i++) {
            uint256 inventoryID = GameLib.getInventory(cityID, ECSLib.getUint("Template", constituentIDs[i]));
            ECSLib.setUint("Amount", inventoryID, ECSLib.getUint("Amount", inventoryID) + ECSLib.getUint("Amount", constituentIDs[i])); // add troop amount back to city
        }

        // Disband army
        GameLib.removeArmy(_armyID);
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
            _battleTile(_armyID, _targetID, false);
        }
    }

    function _battleArmy(uint256 _armyID, uint256 _targetArmyID) private {
        // Verify that army and target army are adjacent
        require(GameLib.euclidean(ECSLib.getPosition("Position", _armyID), ECSLib.getPosition("Position", _targetArmyID)) <= gs().worldConstants.battleRange, "CURIO: Too far");

        // End target army's gather
        if (GameLib.getArmyGather(_targetArmyID) != NULL) GameLib.endGather(_targetArmyID);

        // Execute one round of battle
        bool victory = GameLib.attack(_armyID, _targetArmyID, true, false, true);
        if (!victory) GameLib.attack(_targetArmyID, _armyID, true, false, true);
    }

    function _battleTile(
        uint256 _armyID,
        uint256 _tileID,
        bool _occupyUponVictory
    ) private {
        // Verify that army and tile are adjacent
        require(
            GameLib.euclidean(ECSLib.getPosition("Position", _armyID), GameLib.getMidPositionFromTilePosition(ECSLib.getPosition("StartPosition", _tileID))) <= gs().worldConstants.battleRange, //
            "CURIO: Too far"
        );

        uint256 cityID = GameLib.getCityAtTile(ECSLib.getPosition("StartPosition", _tileID));

        // Execute one round of battle
        bool victory = GameLib.attack(_armyID, _tileID, false, _occupyUponVictory, false);
        if (victory) {
            if (cityID != NULL) {
                // Victorious against city, occupy regardless of adjacency
                Templates.addConstituent(_tileID, gs().templates["Guard"], gs().worldConstants.cityGuardAmount);
                // TODO: rewards for victor
            }
            // if (_occupyUponVictory) {
            //     // Victorious against tile, occupy only if an owned tile is adjacent
            //     Templates.addConstituent(_tileID, gs().templates["Guard"], gs().worldConstants.tileGuardAmount);
            // }
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

        // Verify that no guard exists on tile
        require(GameLib.getConstituents(_tileID).length == 0, "CURIO: Tile has guard");

        // Verify that army is on selected tile
        Position memory armyPosition = ECSLib.getPosition("Position", _armyID);
        Position memory tilePosition = ECSLib.getPosition("StartPosition", _tileID);
        require(GameLib.coincident(GameLib.getProperTilePosition(armyPosition), tilePosition), "CURIO: Army is not on the selected tile");

        // Verify that tile is next to own tile
        uint256 playerID = GameLib.getPlayer(msg.sender);
        require(GameLib.isAdjacentToOwnTile(playerID, tilePosition), "CURIO: You must claim tiles next to your own");

        // Verify that no other movable entity is on tile
        uint256[] memory movableEntitiesOnTile = GameLib.getMovableEntitiesAtTile(tilePosition);
        require(movableEntitiesOnTile.length == 1 && movableEntitiesOnTile[0] == _armyID, "CURIO: Other movable entity on tile");

        // Transfer ownership of tile and initialize new guard
        ECSLib.setUint("Owner", _tileID, playerID);
        Templates.addConstituent(_tileID, gs().templates["Guard"], gs().worldConstants.tileGuardAmount);
    }

    function upgradeGoldmine(uint256 _resourceID) public {
        GameLib.validEntityCheck(_resourceID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);

        // tile needs to be yours
        uint256 playerID = GameLib.getPlayer(msg.sender);
        Position memory goldresourceStartPosition = ECSLib.getPosition("StartPosition", _resourceID);
        uint256 tileID = GameLib.getTileAt(goldresourceStartPosition);
        require(ECSLib.getUint("Owner", tileID) == playerID, "CURIO: Tile isn't yours");

        // get current goldmine level
        uint256 currentGoldmineLevel = ECSLib.getUint("Level", _resourceID);
        uint256 upgradeCost = GameLib._goldmineUpgradeCost(currentGoldmineLevel);

        uint256 playerCityID = GameLib.getPlayerCity(playerID);
        uint256 playerCityGold = GameLib.getCityGold(playerCityID);

        require(playerCityGold >= upgradeCost, "CURIO: Insufficient gold for upgrade");

        ECSLib.setUint("Level", _resourceID, currentGoldmineLevel + 1);
        GameLib.setCityGold(playerCityID, playerCityGold - upgradeCost);
    }

    // function initializeTile(Position memory _startPosition) public {
    //     GameLib.initializeTile(_startPosition);
    // }

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
