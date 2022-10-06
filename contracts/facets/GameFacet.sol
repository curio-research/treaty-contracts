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

    function initializePlayer(Position memory _position, string memory _name) external {
        GameLib.ongoingGameCheck();
        GameLib.inboundPositionCheck(_position);
        require(gs().players.length < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(gs().playerEntityMap[msg.sender] == NULL, "CURIO: Player already initialized");

        GameLib.initializeTile(_position);

        uint256 playerID = Templates.addPlayer(_name);

        gs().players.push(msg.sender);
        gs().playerEntityMap[msg.sender] = playerID;

        uint256 settlerID = Templates.addSettler(_position, playerID, gs().worldConstants.tileWidth);

        // Initialize guard which stays with eventual city
        Templates.addGuard(settlerID, gs().worldConstants);

        // Add gold to eventual city
        uint256 goldInventoryID = ECSLib.addEntity();
        ECSLib.setString("Tag", goldInventoryID, "ResourceInventory");
        ECSLib.setUint("City", goldInventoryID, settlerID);
        ECSLib.setUint("Template", goldInventoryID, GameLib.getTemplateByInventoryType("Gold"));
        ECSLib.setUint("Amount", goldInventoryID, gs().worldConstants.initCityGold);
    }

    // ----------------------------------------------------------
    // SETTLEMENT
    // ----------------------------------------------------------

    function move(uint256 _movableEntity, Position memory _targetPosition) external {
        GameLib.validEntityCheck(_movableEntity);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_movableEntity, msg.sender);
        GameLib.inboundPositionCheck(_targetPosition);

        GameLib.initializeTile(_targetPosition);

        // Verify no other movable entity at exact destination coordinate
        require(GameLib.getMovableEntityAt(_targetPosition) == NULL, "CURIO: Destination occupied");

        // Check moveCooldown
        require(block.timestamp >= ECSLib.getUint("LastTimestamp", _movableEntity) + ECSLib.getUint("MoveCooldown", _movableEntity), "CURIO: Moved too recently");

        // settler cannot move in enemy territory
        uint256 tileID = GameLib.getTileAt(GameLib.getProperTilePosition(_targetPosition));
        if (tileID != NULL) GameLib.entityOwnershipCheck(tileID, msg.sender);

        // Calculate distance
        uint256 distance = GameLib.euclidean(ECSLib.getPosition("Position", _movableEntity), _targetPosition);
        require(distance <= ECSLib.getUint("Speed", _movableEntity), "CURIO: Not enough movement points");

        // Move and update moveCooldown
        ECSLib.setPosition("Position", _movableEntity, _targetPosition);
        ECSLib.setUint("LastTimestamp", _movableEntity, block.timestamp);
    }

    function foundCity(
        uint256 _settlerID,
        Position[] memory _tiles,
        string memory _cityName
    ) external {
        GameLib.validEntityCheck(_settlerID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_settlerID, msg.sender);

        // Verify that settler can settle
        require(ECSLib.getBool("CanSettle", _settlerID), "CURIO: Settler cannot settle");

        // Verify that territory is connected and includes settler's current position
        // FIXME: right now, territory must be selected in a way in which each position is adjacent to next position in the array
        Position memory centerPosition = GameLib.getProperTilePosition(ECSLib.getPosition("Position", _settlerID));
        require(GameLib.connected(_tiles), "CURIO: Territory disconnected");
        require(GameLib.includesPosition(centerPosition, _tiles), "CURIO: Tiles must cover settler position");

        // Remove resource at destination if one exists
        uint256 resourceID = GameLib.getResourceAt(centerPosition);
        if (resourceID != NULL) ECSLib.removeEntity(resourceID);

        uint256 cityID = _settlerID;

        // Verify that territory is wholly in bound and does not overlap with other cities, and initialize tiles
        for (uint256 i = 0; i < _tiles.length; i++) {
            Templates.addCityTile(_tiles[i], cityID, msg.sender);
        }

        // Convert the settler to a city
        ECSLib.removeBool("CanSettle", cityID);
        ECSLib.removeUint("Health", cityID);
        ECSLib.removeUint("Speed", cityID);
        ECSLib.removeUint("LastTimestamp", cityID);
        ECSLib.removeUint("MoveCooldown", cityID);
        ECSLib.setPosition("StartPosition", cityID, centerPosition);
        ECSLib.setString("Tag", cityID, "City");
        ECSLib.setString("Name", cityID, _cityName);
        ECSLib.setBool("CanProduce", cityID);

        Templates.addCityCenter(centerPosition, cityID);
    }

    /// @notice This function can be viewed as the inverse of `foundCity`, as it converts a city back into a settler.
    function packCity(uint256 _cityID) external {
        GameLib.validEntityCheck(_cityID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_cityID, msg.sender);

        // FIXME: configure optimal gold upgrade balance for city
        uint256 packCost = gs().worldConstants.cityPackCost;
        uint256 balance = GameLib.getCityGold(_cityID);
        require(balance >= packCost, "CURIO: Insufficient gold for packing");

        uint256 _goldInventoryID = GameLib.getInventory(_cityID, GameLib.getTemplateByInventoryType("Gold"));
        ECSLib.setUint("Amount", _goldInventoryID, balance - packCost);

        uint256 settlerID = _cityID;

        // Remove city tiles
        uint256[] memory tileIDs = GameLib.getCityTiles(_cityID);
        assert(tileIDs.length == GameLib.getCityTileCountByLevel(ECSLib.getUint("Level", _cityID)));

        for (uint256 i = 0; i < tileIDs.length; i++) {
            ECSLib.removeEntity(tileIDs[i]);
        }

        // Convert the settler to a city
        (uint256 _health, uint256 _speed) = GameLib.getSettlerHealthAndSpeedByLevel(ECSLib.getUint("Level", settlerID));
        ECSLib.setBool("CanSettle", settlerID);
        ECSLib.setUint("Health", settlerID, _health);
        ECSLib.setUint("Speed", settlerID, gs().worldConstants.tileWidth);
        ECSLib.setUint("LastTimestamp", settlerID, block.timestamp);
        ECSLib.setUint("MoveCooldown", settlerID, 1);
        ECSLib.setString("Tag", settlerID, "Settler");
        ECSLib.removeString("Name", settlerID);
        ECSLib.removeBool("CanProduce", settlerID);
        ECSLib.removePosition("StartPosition", settlerID);

        // Remove city center
        ECSLib.removeEntity(GameLib.getCityCenter(_cityID));
    }

    function upgradeCity(uint256 _cityID, Position[] memory _newTiles) external {
        GameLib.validEntityCheck(_cityID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_cityID, msg.sender);

        // Verify that city has enough gold
        uint256 balance = GameLib.getCityGold(_cityID);
        uint256 cost = gs().worldConstants.cityUpgradeGoldCost;
        require(balance >= cost, "CURIO: Insufficient gold balance");

        uint256 level = ECSLib.getUint("Level", _cityID);
        require(_newTiles.length == GameLib.getCityTileCountByLevel(level + 1) - GameLib.getCityTileCountByLevel(level), "CURIO: Incorrect tile count");

        // Verify that territory is connected
        require(GameLib.connected(_newTiles), "CURIO: Territory not connected");

        // Verify that new territory is connected to existing territory
        // TODO

        // Verify that territory is wholly in bound and does not overlap with other cities
        for (uint256 i = 0; i < _newTiles.length; i++) {
            Templates.addCityTile(_newTiles[i], _cityID, msg.sender);
        }

        uint256 goldInventoryID = GameLib.getInventory(_cityID, GameLib.getTemplateByInventoryType("Gold"));
        ECSLib.setUint("Amount", goldInventoryID, balance - cost);

        ECSLib.setUint("Level", _cityID, level + 1);
    }

    // ----------------------------------------------------------
    // PRODUCTION
    // ----------------------------------------------------------

    function startTroopProduction(
        uint256 _buildingID,
        uint256 _templateID,
        uint256 _amount
    ) external returns (uint256 productionID) {
        GameLib.validEntityCheck(_buildingID);
        GameLib.validEntityCheck(_templateID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);

        uint256 cityID = ECSLib.getUint("City", _buildingID);
        GameLib.entityOwnershipCheck(cityID, msg.sender);

        // Verify that city can produce
        require(ECSLib.getBool("CanProduce", cityID), "CURIO: City cannot produce");

        // Check gold balance sufficience
        uint256 goldInventoryID = GameLib.getInventory(cityID, GameLib.getTemplateByInventoryType("Gold"));
        uint256 balance = goldInventoryID != NULL ? ECSLib.getUint("Amount", goldInventoryID) : 0;
        uint256 cost = ECSLib.getUint("Cost", _templateID) * _amount;
        require(balance >= cost, "CURIO: Insufficient gold balance");

        // Verify no other production
        require(GameLib.getBuildingProduction(_buildingID) == NULL, "CURIO: No concurrent productions");

        // Create inventory if none exists, and verify that amount does not exceed ceiling
        uint256 inventoryID = GameLib.getInventory(cityID, _templateID);
        if (inventoryID == NULL) {
            inventoryID = ECSLib.addEntity();
            ECSLib.setString("Tag", inventoryID, "TroopInventory");
            ECSLib.setUint("City", inventoryID, cityID);
            ECSLib.setUint("Template", inventoryID, _templateID);
            ECSLib.setUint("Amount", inventoryID, 0);
        } else {
            require(ECSLib.getUint("Amount", inventoryID) < gs().worldConstants.maxInventoryCapacity, "CURIO: Amount exceeds inventory capacity");
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

        // Deduct cost
        ECSLib.setUint("Amount", goldInventoryID, balance - cost);
    }

    function endTroopProduction(uint256 _buildingID, uint256 _productionID) external {
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

        // Verify that resource is not in another player's territory
        uint256 tileID = GameLib.getTileAt(startPosition);
        uint256 playerID = GameLib.getPlayer(msg.sender);
        require(tileID == NULL || ECSLib.getUint("Owner", ECSLib.getUint("City", tileID)) == playerID, "CURIO: Cannot gather on other's tiles");

        require(GameLib.getArmyGather(_armyID) == 0, "CURIO: Another gather at this location");

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

        uint256 cityGoldAmount = GameLib.getCityGold(cityID);
        uint256 intendedHarvestAmount = (block.timestamp - ECSLib.getUint("InitTimestamp", _buildingID)) / ECSLib.getUint("Duration", _templateID);

        uint256 level = ECSLib.getUint("Level", cityID);
        uint256 harvestCap = GameLib.getHarvestCap(level);
        uint256 totalCap = GameLib.getTotalGoldCap(level);

        uint256 currentHarvestAmount = intendedHarvestAmount >= harvestCap ? harvestCap : intendedHarvestAmount;
        uint256 totalAmount = cityGoldAmount + currentHarvestAmount >= totalCap ? totalCap : cityGoldAmount + currentHarvestAmount;

        // Update amount and reset time
        ECSLib.setUint("Amount", inventoryID, totalAmount);
        ECSLib.setUint("InitTimestamp", _buildingID, block.timestamp);
    }

    // ----------------------------------------------------------
    // BATTLE
    // ----------------------------------------------------------

    function organizeArmy(
        uint256 _cityID,
        uint256[] memory _templateIDs,
        uint256[] memory _amounts
    ) external returns (uint256) {
        GameLib.validEntityCheck(_cityID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_cityID, msg.sender);

        // Verify there is no army currently at the city center
        require(GameLib.getArmyAt(ECSLib.getPosition("Position", _cityID)) == NULL, "CURIO: Tile occupied by another army");

        require(GameLib.getPlayerArmies(GameLib.getPlayer(msg.sender)).length < gs().worldConstants.maxArmyCountPerPlayer, "CURIO: Army max count reached");

        {
            uint256 speed = 0; // average
            uint256 load = 0; // sum
            uint256 moveCooldown = 0; // max
            uint256 battleCooldown = 0; // max

            require(_templateIDs.length == _amounts.length, "CURIO: Input lengths do not match");
            require(_templateIDs.length > 0, "CURIO: Army must have at least 1 troop");

            // Update inventory and gather army traits
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
            uint256 armyID = Templates.addArmy(GameLib.getPlayer(msg.sender), GameLib.getMidPositionFromTilePosition(ECSLib.getPosition("StartPosition", _cityID)));
            ECSLib.setUint("Speed", armyID, speed);
            ECSLib.setUint("Load", armyID, load);
            ECSLib.setUint("LastTimestamp", armyID, block.timestamp);
            ECSLib.setUint("MoveCooldown", armyID, moveCooldown);
            ECSLib.setUint("BattleCooldown", armyID, battleCooldown);
        }

        uint256 armyID = GameLib.getArmyAt(GameLib.getMidPositionFromTilePosition(ECSLib.getPosition("StartPosition", _cityID)));

        // Add army constituents
        for (uint256 i = 0; i < _templateIDs.length; i++) {
            uint256 constituentID = ECSLib.addEntity();
            ECSLib.setString("Tag", constituentID, "ArmyConstituent");
            ECSLib.setUint("Keeper", constituentID, armyID);
            ECSLib.setUint("Template", constituentID, _templateIDs[i]);
            ECSLib.setUint("Amount", constituentID, _amounts[i]);
        }

        return armyID;
    }

    function disbandArmy(uint256 _armyID) external {
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_armyID, msg.sender);

        // Get army position and city on top
        Position memory startPosition = GameLib.getProperTilePosition(ECSLib.getPosition("Position", _armyID));
        uint256 tileID = GameLib.getTileAt(startPosition);

        GameLib.entityOwnershipCheck(tileID, msg.sender);

        // Verify that army is in city center tile
        uint256 cityID = ECSLib.getUint("City", tileID);
        require(GameLib.coincident(ECSLib.getPosition("StartPosition", cityID), startPosition), "CURIO: Army must be on city center");

        // Return troops to corresponding inventories
        uint256[] memory constituentIDs = GameLib.getArmyConstituents(_armyID);
        for (uint256 i = 0; i < constituentIDs.length; i++) {
            uint256 cityInventoryID = GameLib.getInventory(cityID, ECSLib.getUint("Template", constituentIDs[i]));
            uint256 amount = ECSLib.getUint("Amount", cityInventoryID) + ECSLib.getUint("Amount", constituentIDs[i]);

            // require(_amount <= gs().worldConstants.maxInventoryCapacity, "CURIO: Too many troops");
            ECSLib.setUint("Amount", cityInventoryID, amount);
        }

        // Disband army
        GameLib.removeArmy(_armyID);
    }

    function battle(uint256 _armyID, uint256 _targetID) external {
        if (GameLib.strEq(ECSLib.getString("Tag", _targetID), "Army")) {
            _battleArmy(_armyID, _targetID);
        } else {
            _battleCity(_armyID, _targetID);
        }
    }

    /**
     * @dev One round of battle.
     * @param _armyID army
     * @param _targetArmyID target army
     */
    function _battleArmy(uint256 _armyID, uint256 _targetArmyID) private {
        GameLib.validEntityCheck(_armyID);
        GameLib.validEntityCheck(_targetArmyID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_armyID, msg.sender);

        {
            uint256 playerID = GameLib.getPlayer(msg.sender);
            require(ECSLib.getUint("Owner", _targetArmyID) != playerID, "CURIO: Cannot attack your own army");
        }

        // Verify that army and target army are adjacent
        require(GameLib.euclidean(ECSLib.getPosition("Position", _armyID), ECSLib.getPosition("Position", _targetArmyID)) <= gs().worldConstants.armyBattleRange, "CURIO: Too far");

        // Check moveCooldown and update last timestamp
        require(block.timestamp >= ECSLib.getUint("LastTimestamp", _armyID) + ECSLib.getUint("BattleCooldown", _armyID), "CURIO: Battled too recently");
        ECSLib.setUint("LastTimestamp", _armyID, block.timestamp);

        // End army's and target army's gathers
        if (GameLib.getArmyGather(_armyID) != NULL) GameLib.endGather(_armyID);
        if (GameLib.getArmyGather(_targetArmyID) != NULL) GameLib.endGather(_targetArmyID);

        // Execute one round of battle
        {
            uint256[] memory armyConstituents = GameLib.getArmyConstituents(_armyID);
            uint256[] memory targetArmyConstituents = GameLib.getArmyConstituents(_targetArmyID);

            {
                // Army attacks TargetArmy
                uint256 loss;
                for (uint256 i = 0; i < armyConstituents.length; i++) {
                    if (ECSLib.getUint("Amount", armyConstituents[i]) == 0) continue;
                    for (uint256 j = 0; j < targetArmyConstituents.length; j++) {
                        if (ECSLib.getUint("Amount", targetArmyConstituents[j]) == 0) continue;
                        loss =
                            (GameLib.sqrt(ECSLib.getUint("Amount", armyConstituents[i])) * ECSLib.getUint("Attack", ECSLib.getUint("Template", armyConstituents[i])) * 2 * 100) / //
                            (ECSLib.getUint("Defense", ECSLib.getUint("Template", targetArmyConstituents[j])) * ECSLib.getUint("Health", ECSLib.getUint("Template", targetArmyConstituents[j])));
                        if (loss >= ECSLib.getUint("Amount", targetArmyConstituents[j])) {
                            ECSLib.removeEntity(targetArmyConstituents[j]);
                        } else {
                            ECSLib.setUint("Amount", targetArmyConstituents[j], ECSLib.getUint("Amount", targetArmyConstituents[j]) - loss);
                        }
                    }
                }
            }

            if (GameLib.getArmyConstituents(_targetArmyID).length == 0) {
                // TargetArmy dead, Army takes its gold
                uint256 _armyInventoryAmount = ECSLib.getUint("Amount", GameLib.getArmyInventory(_armyID, GameLib.getTemplateByInventoryType("Gold")));
                uint256 _increase = ECSLib.getUint("Amount", GameLib.getArmyInventory(_targetArmyID, GameLib.getTemplateByInventoryType("Gold")));
                if (_increase > ECSLib.getUint("Load", _armyID) - _armyInventoryAmount) _increase = ECSLib.getUint("Load", _armyID) - _armyInventoryAmount;
                ECSLib.setUint("Amount", GameLib.getArmyInventory(_armyID, GameLib.getTemplateByInventoryType("Gold")), _armyInventoryAmount + _increase);
                GameLib.removeArmy(_targetArmyID);
                return;
            }

            {
                // TargetArmy attacks Army
                uint256 loss;
                for (uint256 j = 0; j < targetArmyConstituents.length; j++) {
                    if (ECSLib.getUint("Amount", targetArmyConstituents[j]) == 0) continue;
                    for (uint256 i = 0; i < armyConstituents.length; i++) {
                        if (ECSLib.getUint("Amount", armyConstituents[i]) == 0) continue;
                        loss =
                            (GameLib.sqrt(ECSLib.getUint("Amount", targetArmyConstituents[j])) * ECSLib.getUint("Attack", ECSLib.getUint("Template", targetArmyConstituents[j])) * 2 * 100) / //
                            (ECSLib.getUint("Defense", ECSLib.getUint("Template", armyConstituents[i])) * ECSLib.getUint("Health", ECSLib.getUint("Template", armyConstituents[i])));
                        if (loss >= ECSLib.getUint("Amount", armyConstituents[i])) {
                            ECSLib.removeEntity(armyConstituents[i]);
                        } else {
                            ECSLib.setUint("Amount", armyConstituents[i], ECSLib.getUint("Amount", armyConstituents[i]) - loss);
                        }
                    }
                }
            }

            if (GameLib.getArmyConstituents(_armyID).length == 0) {
                // Army dead, TargetArmy takes its gold
                uint256 targetArmyInventoryAmount = ECSLib.getUint("Amount", GameLib.getArmyInventory(_targetArmyID, GameLib.getTemplateByInventoryType("Gold")));
                uint256 increase = ECSLib.getUint("Amount", GameLib.getArmyInventory(_armyID, GameLib.getTemplateByInventoryType("Gold")));
                if (increase > ECSLib.getUint("Load", _targetArmyID) - targetArmyInventoryAmount) increase = ECSLib.getUint("Load", _targetArmyID) - targetArmyInventoryAmount;
                ECSLib.setUint("Amount", GameLib.getArmyInventory(_targetArmyID, GameLib.getTemplateByInventoryType("Gold")), targetArmyInventoryAmount + increase);
                GameLib.removeArmy(_armyID);
                return;
            }
        }
    }

    function initializeTile(Position memory _position) public {
        GameLib.initializeTile(_position);
    }

    function _battleCity(uint256 _armyID, uint256 _cityID) private {
        GameLib.validEntityCheck(_armyID);
        GameLib.validEntityCheck(_cityID);
        GameLib.ongoingGameCheck();
        GameLib.activePlayerCheck(msg.sender);
        GameLib.entityOwnershipCheck(_armyID, msg.sender);

        uint256 playerID = GameLib.getPlayer(msg.sender);
        require(ECSLib.getUint("Owner", _cityID) != playerID, "CURIO: Cannot attack your own city");

        // Verify that army is adjacent to city
        require(
            GameLib.euclidean(
                ECSLib.getPosition("Position", _armyID),
                GameLib.getMidPositionFromTilePosition(ECSLib.getPosition("StartPosition", _cityID)) //
            ) <= gs().worldConstants.cityBattleRange,
            "CURIO: Too far"
        );

        // Check moveCooldown and update last timestamp
        require(block.timestamp >= ECSLib.getUint("LastTimestamp", _armyID) + ECSLib.getUint("BattleCooldown", _armyID), "CURIO: Battled too recently");
        ECSLib.setUint("LastTimestamp", _armyID, block.timestamp);

        // TEMPORARY ALERT
        // reduce the gold by half
        {
            uint256 balance = GameLib.getCityGold(_cityID);
            uint256 goldInventoryID = GameLib.getInventory(_cityID, GameLib.getTemplateByInventoryType("Gold"));
            ECSLib.setUint("Amount", goldInventoryID, balance - 1);
            // ECSLib.setUint("Amount", _goldInventoryID, balance / 2);
        }

        // One round of battle against city
        uint256 guardID = GameLib.getCityGuard(_cityID);
        if (guardID == NULL) {
            ECSLib.setUint("Owner", _cityID, playerID);
            Templates.addGuard(_cityID, gs().worldConstants);
            return;
        } else {
            uint256[] memory armyConstituents = GameLib.getArmyConstituents(_armyID);

            {
                // Army attacks City
                uint256 loss;
                for (uint256 i = 0; i < armyConstituents.length; i++) {
                    if (ECSLib.getUint("Amount", armyConstituents[i]) == 0) continue;
                    loss =
                        (GameLib.sqrt(ECSLib.getUint("Amount", armyConstituents[i])) * ECSLib.getUint("Attack", ECSLib.getUint("Template", armyConstituents[i])) * 2 * 100) / //
                        (ECSLib.getUint("Defense", guardID) * ECSLib.getUint("Health", guardID));
                    if (loss >= ECSLib.getUint("Amount", guardID)) {
                        ECSLib.removeEntity(guardID);
                        break;
                    } else {
                        ECSLib.setUint("Amount", guardID, ECSLib.getUint("Amount", guardID) - loss);
                    }
                }
            }

            if (!Set(gs().entities).includes(guardID)) {
                // City has no defense, Army takes over
                ECSLib.setUint("Owner", _cityID, playerID);
                Templates.addGuard(_cityID, gs().worldConstants);
                return;
            }

            {
                // City attacks Army
                uint256 loss;
                for (uint256 i = 0; i < armyConstituents.length; i++) {
                    loss =
                        (GameLib.sqrt(ECSLib.getUint("Amount", guardID)) * ECSLib.getUint("Attack", guardID) * 2 * 100) / //
                        (ECSLib.getUint("Defense", ECSLib.getUint("Template", armyConstituents[i])) * ECSLib.getUint("Health", ECSLib.getUint("Template", armyConstituents[i])));
                    if (loss >= ECSLib.getUint("Amount", armyConstituents[i])) {
                        ECSLib.removeEntity(armyConstituents[i]);
                    }
                    ECSLib.setUint("Amount", armyConstituents[i], ECSLib.getUint("Amount", armyConstituents[i]) - loss);
                }
            }

            if (GameLib.getArmyConstituents(_armyID).length == 0) {
                // Army dead, City takes its gold
                uint256 cityInventoryAmount = ECSLib.getUint("Amount", GameLib.getInventory(_cityID, GameLib.getTemplateByInventoryType("Gold")));
                uint256 increase = ECSLib.getUint("Amount", GameLib.getArmyInventory(_armyID, GameLib.getTemplateByInventoryType("Gold")));
                // FIXME: add city load
                ECSLib.setUint("Amount", GameLib.getInventory(_cityID, GameLib.getTemplateByInventoryType("Gold")), cityInventoryAmount + increase);
                GameLib.removeArmy(_armyID);
                return;
            }
        }
    }

    // --------------------------
    // treaty (WIP)
    // --------------------------

    // TODO: setAddress => _setAddressArray
    function joinTreaty(address _treatyAddress) external {
        // GameLib.ongoingGameCheck();
        // GameLib.activePlayerCheck(msg.sender);
        // // request to sign treaty
        // (bool success, bytes memory returnData) = _treatyAddress.call(abi.encodeWithSignature("joinTreaty()"));
        // require(success, "CRUIO: Failed to call the external treaty");
        // require(abi.decode(returnData, (bool)), "CRUIO: The treaty rejects your request");
        // // Sign treaty
        // uint256 _signatureID = ECSLib.addEntity();
        // ECSLib.setString("Tag", _signatureID, "Signature");
        // ECSLib.setUint("Owner", _signatureID, _playerID);
        // ECSLib.setAddress("Treaty", _signatureID, _treatyAddress);
    }

    function denounceTreaty(address _treatyToDenounce) external {
        // uint256 _playerID = GameLib.getPlayer(msg.sender);
        // // Verify that player is active
        // require(ECSLib.getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");
        // GameLib.ongoingGameCheck();
        // // request to breach treaty
        // (bool success, bytes memory returnData) = _treatyToDenounce.call(abi.encodeWithSignature("denounceTreaty()"));
        // require(success, "CRUIO: Failed to call the external treaty");
        // require(abi.decode(returnData, (bool)), "CRUIO: The treaty rejects your request");
        // // breach treaty
        // uint256[] memory _signatureIDs = GameLib.getPlayerSignatures(_playerID);
        // for (uint256 i = 0; i < _signatureIDs.length; i++) {
        //     address _treaty = ECSLib.getAddress("Treaty", _signatureIDs[i]);
        //     if (_treaty == _treatyToDenounce) {
        //         ECSLib.removeEntity(_signatureIDs[i]);
        //         break;
        //     }
        // }
    }
}
