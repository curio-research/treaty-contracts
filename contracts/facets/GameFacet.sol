//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Position, TERRAIN, WorldConstants} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import "contracts/libraries/Templates.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Game facet
/// @notice Contains player functions

contract GameFacet is UseStorage {
    using SafeMath for uint256;
    uint256 private NULL = 0;

    // ----------------------------------------------------------
    // BASIC
    // ----------------------------------------------------------

    function initializePlayer(Position memory _position, string memory _name) external {
        GameLib._gamePauseCheck();
        GameLib._positionInboundCheck(_position);
        require(gs().players.length < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(gs().playerEntityMap[msg.sender] == NULL, "CURIO: Player already initialized");

        GameLib._initializeTile(_position);

        uint256 playerID = Templates.createPlayer(_name);

        gs().players.push(msg.sender);
        gs().playerEntityMap[msg.sender] = playerID;

        uint256 _settlerID = Templates._createSettler(_position, _playerID);

        // Initialize guard which stays with eventual city
        Templates._addGuard(_settlerID, gs().worldConstants);

        // Add gold to eventual city
        uint256 goldInventoryID = ECSLib._addEntity();
        ECSLib._setString("Tag", goldInventoryID, "ResourceInventory");
        ECSLib._setUint("City", goldInventoryID, _settlerID);
        ECSLib._setUint("Template", goldInventoryID, GameLib._getTemplateByInventoryType("Gold"));
        ECSLib._setUint("Amount", goldInventoryID, gs().worldConstants.initCityGold);
    }

    // ----------------------------------------------------------
    // SETTLEMENT
    // ----------------------------------------------------------

    function moveSettler(uint256 _settlerID, Position memory _targetPosition) external {
        GameLib._validEntityCheck(_settlerID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);
        GameLib._entityOwnershipCheckByAddress(_settlerID, msg.sender);
        GameLib._positionInboundCheck(_targetPosition);

        // require(ECSLib._getUint("Speed", _settlerID) >= GameLib._euclidean(ECSLib._getPosition("Position", _settlerID), _targetPosition), "CURIO: Not fast enough");

        // Verify no other army or settler at destination
        require(GameLib._getArmyAt(_targetPosition) == NULL && GameLib._getSettlerAt(_targetPosition) == NULL, "CURIO: Destination occupied");

        // settler cannot move in enemy territory
        uint256 tileID = GameLib._getTileAt(_targetPosition);
        if (tileID != 0) GameLib._entityOwnershipCheckByAddress(tileID, msg.sender);

        GameLib._initializeTile(_targetPosition);

        ECSLib._setPosition("Position", _settlerID, _targetPosition);
        ECSLib._setUint("LastTimestamp", _settlerID, block.timestamp);
    }

    function foundCity(
        uint256 _settlerID,
        Position[] memory _tiles,
        string memory _cityName
    ) external {
        GameLib._validEntityCheck(_settlerID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);
        GameLib._entityOwnershipCheckByAddress(_settlerID, msg.sender);

        // Verify that settler can settle
        require(ECSLib._getBool("CanSettle", _settlerID), "CURIO: Settler cannot settle");

        // Verify that territory is connected and includes settler's current position
        // FIXME: right now, territory must be selected in a way in which each position is next to the next position in the array
        Position memory _centerPosition = ECSLib._getPosition("Position", _settlerID);
        require(GameLib._connected(_tiles), "CURIO: Territory disconnected");
        require(GameLib._includesPosition(_centerPosition, _tiles), "CURIO: Territory must cover settler's current position");

        // Remove resource at destination if one exists
        uint256 resourceID = GameLib._getResourceAt(_centerPosition);
        if (resourceID != NULL) ECSLib._removeEntity(resourceID);

        uint256 playerID = GameLib._getPlayer(msg.sender);
        uint256 cityID = _settlerID;

        // Verify that territory is wholly in bound and does not overlap with other cities, and initialize tiles
        for (uint256 i = 0; i < _tiles.length; i++) {
            GameLib._positionInboundCheck(_tiles[i]);

            require(GameLib._getTileAt(_tiles[i]) == NULL, "CURIO: Territory overlaps with another city");
            GameLib._initializeTile(_tiles[i]);

            uint256 tileID = ECSLib._addEntity();
            ECSLib._setString("Tag", tileID, "Tile");
            ECSLib._setPosition("Position", tileID, _tiles[i]);
            ECSLib._setUint("City", tileID, cityID);
            ECSLib._setUint("Owner", tileID, playerID);
        }

        // Convert the settler to a city
        ECSLib._removeBool("CanSettle", cityID);
        ECSLib._removeUint("Health", cityID);
        ECSLib._removeUint("Speed", cityID);
        ECSLib._removeUint("LastTimestamp", cityID);
        ECSLib._setString("Tag", cityID, "City");
        ECSLib._setString("Name", cityID, _cityName);
        ECSLib._setBool("CanProduce", cityID);

        Templates._createCityCenter(_centerPosition, cityID);
    }

    /// @notice This function can be viewed as the inverse of `foundCity`, as it converts a city back into a settler.
    function packCity(uint256 _cityID) external {
        GameLib._validEntityCheck(_cityID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);
        GameLib._entityOwnershipCheckByAddress(_cityID, msg.sender);

        // FIXME: configure optimal gold upgrade balance for city
        uint256 packCost = gs().worldConstants.cityPackCost;
        uint256 balance = GameLib._getCityGold(_cityID);
        require(balance >= packCost, "CURIO: Insufficient gold balance for packing");

        uint256 _goldInventoryID = GameLib._getInventory(_cityID, GameLib._getTemplateByInventoryType("Gold"));
        ECSLib._setUint("Amount", _goldInventoryID, balance - packCost);

        uint256 settlerID = _cityID;

        // Remove city tiles
        uint256[] memory tileIDs = GameLib._getCityTiles(_cityID);
        assert(tileIDs.length == GameLib._getCityTileCountByLevel(ECSLib._getUint("Level", _cityID)));

        for (uint256 i = 0; i < tileIDs.length; i++) {
            ECSLib._removeEntity(tileIDs[i]);
        }

        // Convert the settler to a city
        (uint256 health, uint256 speed) = GameLib._getSettlerHealthAndSpeedByLevel(ECSLib._getUint("Level", settlerID));
        ECSLib._setBool("CanSettle", settlerID);
        ECSLib._setUint("Health", settlerID, health);
        ECSLib._setUint("Speed", settlerID, speed);
        ECSLib._setUint("LastTimestamp", settlerID, block.timestamp);
        ECSLib._setString("Tag", settlerID, "Settler");
        ECSLib._removeString("Name", settlerID);
        ECSLib._removeBool("CanProduce", settlerID);

        // Remove city center
        ECSLib._removeEntity(GameLib._getCityCenter(_cityID));
    }

    function upgradeCity(uint256 _cityID, Position[] memory _newTiles) external {
        GameLib._validEntityCheck(_cityID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);
        GameLib._entityOwnershipCheckByAddress(_cityID, msg.sender);

        // Verify that city has enough gold
        uint256 balance = GameLib._getCityGold(_cityID);
        uint256 cost = gs().worldConstants.cityUpgradeGoldCost;
        require(balance >= cost, "CURIO: Insufficient gold balance");

        uint256 level = ECSLib._getUint("Level", _cityID);
        require(_newTiles.length == GameLib._getCityTileCountByLevel(level + 1) - GameLib._getCityTileCountByLevel(level), "CURIO: New territory tile count is incorrect");

        // Verify that territory is connected
        require(GameLib._connected(_newTiles), "CURIO: Territory not connected");

        // Verify that new territory is connected to existing territory
        // TODO

        // Verify that territory is wholly in bound and does not overlap with other cities
        for (uint256 i = 0; i < _newTiles.length; i++) {
            Templates._createCityTile(_newTiles[i], _cityID);
        }

        uint256 goldInventoryID = GameLib._getInventory(_cityID, GameLib._getTemplateByInventoryType("Gold"));
        ECSLib._setUint("Amount", goldInventoryID, balance - cost);

        ECSLib._setUint("Level", _cityID, level + 1);
    }

    // ----------------------------------------------------------
    // PRODUCTION
    // ----------------------------------------------------------

    function startTroopProduction(
        uint256 _buildingID,
        uint256 _templateID,
        uint256 _amount
    ) external returns (uint256 productionID) {
        GameLib._validEntityCheck(_buildingID);
        GameLib._validEntityCheck(_templateID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);

        uint256 cityID = ECSLib._getUint("City", _buildingID);
        GameLib._entityOwnershipCheckByAddress(cityID, msg.sender);

        // Verify that city can produce
        require(ECSLib._getBool("CanProduce", cityID), "CURIO: City cannot produce");

        // Check gold balance sufficience
        uint256 goldInventoryID = GameLib._getInventory(cityID, GameLib._getTemplateByInventoryType("Gold"));
        uint256 balance = goldInventoryID != NULL ? ECSLib._getUint("Amount", goldInventoryID) : 0;
        uint256 cost = ECSLib._getUint("Cost", _templateID) * _amount;
        require(balance >= cost, "CURIO: Insufficient gold balance");

        // Create inventory if none exists, and verify that amount does not exceed ceiling
        uint256 inventoryID = GameLib._getInventory(cityID, _templateID);
        if (inventoryID == NULL) {
            inventoryID = ECSLib._addEntity();
            ECSLib._setString("Tag", inventoryID, "TroopInventory");
            ECSLib._setUint("City", inventoryID, cityID);
            ECSLib._setUint("Template", inventoryID, _templateID);
            ECSLib._setUint("Amount", inventoryID, 0);
        } else {
            // require(ECSLib._getUint("Amount", _inventoryID) < gs().worldConstants.maxInventoryCapacity, "CURIO: Amount exceeds inventory capacity");
        }

        // Start production
        productionID = ECSLib._addEntity();
        ECSLib._setString("Tag", productionID, "TroopProduction");
        ECSLib._setUint("City", productionID, cityID);
        ECSLib._setUint("Template", productionID, _templateID);
        ECSLib._setUint("Inventory", productionID, inventoryID);
        ECSLib._setUint("Amount", productionID, _amount);
        ECSLib._setUint("InitTimestamp", productionID, block.timestamp);
        ECSLib._setUint("Duration", productionID, ECSLib._getUint("Duration", _templateID) * _amount);

        // Deduct cost
        ECSLib._setUint("Amount", goldInventoryID, balance - cost);
    }

    function endTroopProduction(uint256 _buildingID, uint256 _productionID) external {
        GameLib._validEntityCheck(_buildingID);
        GameLib._validEntityCheck(_productionID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);

        // Verify that city belongs to player
        uint256 cityID = ECSLib._getUint("City", _buildingID);
        GameLib._entityOwnershipCheckByAddress(cityID, msg.sender);

        // Verify that enough time has passed for the given amount
        require(block.timestamp >= (ECSLib._getUint("InitTimestamp", _productionID) + ECSLib._getUint("Duration", _productionID)), "CURIO: Need more time for production");

        // Update inventory
        uint256 inventoryID = ECSLib._getUint("Inventory", _productionID);
        ECSLib._setUint("Amount", inventoryID, ECSLib._getUint("Amount", inventoryID) + ECSLib._getUint("Amount", _productionID));

        // Delete production
        ECSLib._removeEntity(_productionID);
    }

    function startGather(uint256 _armyID, uint256 _resourceID) external {
        GameLib._validEntityCheck(_armyID);
        GameLib._validEntityCheck(_resourceID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);
        GameLib._entityOwnershipCheckByAddress(_armyID, msg.sender);

        // Verify that army is sitting on the resource
        Position memory position = ECSLib._getPosition("Position", _armyID);
        require(GameLib._coincident(position, ECSLib._getPosition("Position", _resourceID)), "CURIO: Army must be coincident to resource to gather");

        // Verify that resource is not in another player's territory
        uint256 tileID = GameLib._getTileAt(position);
        uint256 playerID = GameLib._getPlayer(msg.sender);
        require(tileID == NULL || ECSLib._getUint("Owner", ECSLib._getUint("City", tileID)) == playerID, "CURIO: Cannot gather on another player's territory");

        require(GameLib._getArmyGather(_armyID) == 0, "CURIO: There is already a resource gathering in this location");

        // Verify that the army's capacity isn't full
        // TODO

        Templates._addResourceGather(position, playerID, _resourceID, _armyID);
    }

    function endGather(uint256 _armyID) external {
        GameLib._validEntityCheck(_armyID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);
        GameLib._entityOwnershipCheckByAddress(_armyID, msg.sender);

        // End gather
        GameLib._endGather(_armyID);
    }

    // harvest gold on a city
    function harvestResource(uint256 _buildingID, uint256 _templateID) external {
        GameLib._validEntityCheck(_buildingID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);

        // Verify that city belongs to player
        uint256 cityID = ECSLib._getUint("City", _buildingID);
        GameLib._entityOwnershipCheckByAddress(cityID, msg.sender);

        // Create inventory if none exists
        uint256 inventoryID = GameLib._getInventory(cityID, _templateID);
        if (inventoryID == NULL) {
            inventoryID = ECSLib._addEntity();
            ECSLib._setString("Tag", inventoryID, "ResourceInventory");
            ECSLib._setUint("City", inventoryID, cityID);
            ECSLib._setUint("Template", inventoryID, _templateID);
            ECSLib._setUint("Amount", inventoryID, 0);
        }

        uint256 cityGoldAmount = GameLib._getCityGold(cityID);
        uint256 intendedHarvestAmount = (block.timestamp - ECSLib._getUint("InitTimestamp", _buildingID)) / ECSLib._getUint("Duration", _templateID);

        uint256 level = ECSLib._getUint("Level", cityID);
        uint256 harvestCap = GameLib.getHarvestCap(level);
        uint256 totalCap = GameLib.getTotalGoldCap(level);

        uint256 currentHarvestAmount = intendedHarvestAmount >= harvestCap ? harvestCap : intendedHarvestAmount;
        uint256 totalAmount = cityGoldAmount + currentHarvestAmount >= totalCap ? totalCap : cityGoldAmount + currentHarvestAmount;

        // Update amount and reset time
        ECSLib._setUint("Amount", inventoryID, totalAmount);
        ECSLib._setUint("InitTimestamp", _buildingID, block.timestamp);
    }

    // ----------------------------------------------------------
    // BATTLE
    // ----------------------------------------------------------

    function organizeArmy(
        uint256 _cityID,
        uint256[] memory _templateIDs,
        uint256[] memory _amounts
    ) external returns (uint256) {
        GameLib._validEntityCheck(_cityID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);
        GameLib._entityOwnershipCheckByAddress(_cityID, msg.sender);

        // Verify there is no army currently at the city center
        require(GameLib._getArmyAt(ECSLib._getPosition("Position", _cityID)) == NULL, "CURIO: Tile occupied by another army");

        uint256 playerID = GameLib._getPlayer(msg.sender);
        require(GameLib._getPlayerArmies(playerID).length < gs().worldConstants.maxArmyCountPerPlayer, "CURIO: Army max count reached");

        uint256 health = 0; // sum
        uint256 speed = 0; // min of all individaul troop types (represents the number of tiles it can "skip")
        uint256 cooldown = 0; // max of all individual troop types
        uint256 attack = 0; // sum
        uint256 defense = 0; // sum
        uint256 load = 0; // sum

        require(_templateIDs.length == _amounts.length, "CURIO: Input lengths do not match");
        require(_templateIDs.length > 0, "CURIO: You must organize armies with at least 1 troop");

        // Update inventory and gather army traits
        for (uint256 i = 0; i < _templateIDs.length; i++) {
            uint256 templateID = _templateIDs[i];
            uint256 inventoryID = GameLib._getInventory(_cityID, templateID);
            require(ECSLib._getUint("Amount", inventoryID) >= _amounts[i], "CURIO: Not enough troops");

            health += ECSLib._getUint("Health", templateID) * _amounts[i];
            speed += ECSLib._getUint("Speed", templateID) * _amounts[i];
            attack += ECSLib._getUint("Attack", templateID) * _amounts[i];
            defense += ECSLib._getUint("Defense", templateID) * _amounts[i];
            load += ECSLib._getUint("Load", templateID) * _amounts[i];
            ECSLib._setUint("Amount", inventoryID, ECSLib._getUint("Amount", inventoryID) - _amounts[i]);

            uint256 templateCooldown = ECSLib._getUint("MoveCooldown", templateID);
            cooldown = templateCooldown > cooldown ? templateCooldown : templateCooldown;
        }

        speed /= GameLib._sum(_amounts);

        Position memory position = ECSLib._getPosition("Position", _cityID);

        // Add army
        uint256 armyID = Templates._addArmy(playerID, position);
        ECSLib._setUint("Health", armyID, health);
        ECSLib._setUint("Speed", armyID, speed);
        ECSLib._setUint("MoveCooldown", armyID, cooldown);
        ECSLib._setUint("Attack", armyID, attack);
        ECSLib._setUint("Defense", armyID, defense);
        ECSLib._setUint("Load", armyID, load);
        ECSLib._setUint("LastTimestamp", armyID, block.timestamp);

        // Add army constituents
        for (uint256 i = 0; i < _templateIDs.length; i++) {
            uint256 constituentID = ECSLib._addEntity();
            ECSLib._setString("Tag", constituentID, "ArmyConstituent");
            ECSLib._setUint("Keeper", constituentID, armyID);
            ECSLib._setUint("Template", constituentID, _templateIDs[i]);
            ECSLib._setUint("Amount", constituentID, _amounts[i]);
        }

        return armyID;
    }

    function disbandArmy(uint256 _armyID) external {
        GameLib._validEntityCheck(_armyID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);
        GameLib._entityOwnershipCheckByAddress(_armyID, msg.sender);

        // Get army position and city on top
        Position memory position = ECSLib._getPosition("Position", _armyID);
        uint256 cityID = GameLib._getCityAt(position);

        GameLib._entityOwnershipCheckByAddress(cityID, msg.sender);

        // Return troops to corresponding inventories
        uint256[] memory constituentIDs = GameLib._getArmyConstituents(_armyID);
        for (uint256 i = 0; i < constituentIDs.length; i++) {
            uint256 cityInventoryID = GameLib._getInventory(cityID, ECSLib._getUint("Template", constituentIDs[i]));
            uint256 amount = ECSLib._getUint("Amount", cityInventoryID) + ECSLib._getUint("Amount", constituentIDs[i]);

            // require(_amount <= gs().worldConstants.maxInventoryCapacity, "CURIO: Too many troops");
            ECSLib._setUint("Amount", cityInventoryID, amount);
        }

        // Disband army
        GameLib._removeArmy(_armyID);
    }

    function moveArmy(uint256 _armyID, Position memory _targetPosition) external {
        GameLib._validEntityCheck(_armyID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);
        GameLib._entityOwnershipCheckByAddress(_armyID, msg.sender);
        GameLib._positionInboundCheck(_targetPosition);

        // armies cannot move in enemy territory
        uint256 _tileID = GameLib._getTileAt(_targetPosition);
        if (_tileID != 0) GameLib._entityOwnershipCheckByAddress(_tileID, msg.sender);

        // Check speed and cooldown
        uint256 armyMoveCooldown = ECSLib._getUint("MoveCooldown", _armyID);
        require((ECSLib._getUint("LastTimestamp", _armyID) + armyMoveCooldown) < block.timestamp, "CURIO: Need more time till next move");
        require(ECSLib._getUint("Speed", _armyID) >= GameLib._euclidean(ECSLib._getPosition("Position", _armyID), _targetPosition), "CURIO: Target not within range of travel");

        // Verify that target tile has no other army
        require(GameLib._getArmyAt(_targetPosition) == NULL, "CURIO: Destination occupied by another army");

        GameLib._initializeTile(_targetPosition);

        ECSLib._setPosition("Position", _armyID, _targetPosition);
    }

    function battle(uint256 _armyID, uint256 _targetID) external {
        if (GameLib._strEq(ECSLib._getString("Tag", _targetID), "Army")) {
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
        GameLib._validEntityCheck(_armyID);
        GameLib._validEntityCheck(_targetArmyID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);
        GameLib._entityOwnershipCheckByAddress(_armyID, msg.sender);

        {
            uint256 playerID = GameLib._getPlayer(msg.sender);
            require(ECSLib._getUint("Owner", _targetArmyID) != playerID, "CURIO: Cannot attack your own army");
        }

        // End army's and target army's gathers
        if (GameLib._getArmyGather(_armyID) != NULL) GameLib._endGather(_armyID);
        if (GameLib._getArmyGather(_targetArmyID) != NULL) GameLib._endGather(_targetArmyID);

        // Verify that army and target army are adjacent
        require(GameLib._adjacent(ECSLib._getPosition("Position", _armyID), ECSLib._getPosition("Position", _targetArmyID)), "CURIO: Too far");

        // Execute one round of battle
        {
            uint256[] memory armyConstituents = GameLib._getArmyConstituents(_armyID);
            uint256[] memory targetArmyConstituents = GameLib._getArmyConstituents(_targetArmyID);

            {
                // Army attacks TargetArmy
                uint256 loss;
                for (uint256 i = 0; i < armyConstituents.length; i++) {
                    if (ECSLib._getUint("Amount", armyConstituents[i]) == 0) continue;
                    for (uint256 j = 0; j < targetArmyConstituents.length; j++) {
                        if (ECSLib._getUint("Amount", targetArmyConstituents[j]) == 0) continue;
                        loss = (GameLib._sqrt(ECSLib._getUint("Amount", armyConstituents[i])) * ECSLib._getUint("Attack", ECSLib._getUint("Template", armyConstituents[i])) * 2 * 100) / (ECSLib._getUint("Defense", ECSLib._getUint("Template", targetArmyConstituents[j])) * ECSLib._getUint("Health", ECSLib._getUint("Template", targetArmyConstituents[j])));
                        if (loss >= ECSLib._getUint("Amount", targetArmyConstituents[j])) {
                            ECSLib._removeEntity(targetArmyConstituents[j]);
                        } else {
                            ECSLib._setUint("Amount", targetArmyConstituents[j], ECSLib._getUint("Amount", targetArmyConstituents[j]) - loss);
                        }
                    }
                }
            }

            if (GameLib._getArmyConstituents(_targetArmyID).length == 0) {
                // TargetArmy dead, Army takes its gold
                uint256 _armyInventoryAmount = ECSLib._getUint("Amount", GameLib._getArmyInventory(_armyID, GameLib._getTemplateByInventoryType("Gold")));
                uint256 _increase = ECSLib._getUint("Amount", GameLib._getArmyInventory(_targetArmyID, GameLib._getTemplateByInventoryType("Gold")));
                if (_increase > ECSLib._getUint("Load", _armyID) - _armyInventoryAmount) _increase = ECSLib._getUint("Load", _armyID) - _armyInventoryAmount;
                ECSLib._setUint("Amount", GameLib._getArmyInventory(_armyID, GameLib._getTemplateByInventoryType("Gold")), _armyInventoryAmount + _increase);
                GameLib._removeArmy(_targetArmyID);
                return;
            }

            {
                // TargetArmy attacks Army
                uint256 loss;
                for (uint256 j = 0; j < targetArmyConstituents.length; j++) {
                    if (ECSLib._getUint("Amount", targetArmyConstituents[j]) == 0) continue;
                    for (uint256 i = 0; i < armyConstituents.length; i++) {
                        if (ECSLib._getUint("Amount", armyConstituents[i]) == 0) continue;
                        loss = (GameLib._sqrt(ECSLib._getUint("Amount", targetArmyConstituents[j])) * ECSLib._getUint("Attack", ECSLib._getUint("Template", targetArmyConstituents[j])) * 2 * 100) / (ECSLib._getUint("Defense", ECSLib._getUint("Template", armyConstituents[i])) * ECSLib._getUint("Health", ECSLib._getUint("Template", armyConstituents[i])));
                        if (loss >= ECSLib._getUint("Amount", armyConstituents[i])) {
                            ECSLib._removeEntity(armyConstituents[i]);
                        } else {
                            ECSLib._setUint("Amount", armyConstituents[i], ECSLib._getUint("Amount", armyConstituents[i]) - loss);
                        }
                    }
                }
            }

            if (GameLib._getArmyConstituents(_armyID).length == 0) {
                // Army dead, TargetArmy takes its gold
                uint256 targetArmyInventoryAmount = ECSLib._getUint("Amount", GameLib._getArmyInventory(_targetArmyID, GameLib._getTemplateByInventoryType("Gold")));
                uint256 increase = ECSLib._getUint("Amount", GameLib._getArmyInventory(_armyID, GameLib._getTemplateByInventoryType("Gold")));
                if (increase > ECSLib._getUint("Load", _targetArmyID) - targetArmyInventoryAmount) increase = ECSLib._getUint("Load", _targetArmyID) - targetArmyInventoryAmount;
                ECSLib._setUint("Amount", GameLib._getArmyInventory(_targetArmyID, GameLib._getTemplateByInventoryType("Gold")), targetArmyInventoryAmount + increase);
                GameLib._removeArmy(_armyID);
                return;
            }
        }
    }

    function initializeTile(Position memory _position) public {
        GameLib._initializeTile(_position);
    }

    function _battleCity(uint256 _armyID, uint256 _cityID) private {
        GameLib._validEntityCheck(_armyID);
        GameLib._validEntityCheck(_cityID);
        GameLib._gamePauseCheck();
        GameLib._activePlayerCheck(msg.sender);
        GameLib._entityOwnershipCheckByAddress(_armyID, msg.sender);

        uint256 playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getUint("Owner", _cityID) != playerID, "CURIO: Cannot attack your own city");

        // Verify that army is adjacent to city
        require(GameLib._adjacentToCity(ECSLib._getPosition("Position", _armyID), _cityID), "CURIO: Too far");

        // TEMPORARY ALERT
        // reduce the gold by half
        {
            uint256 balance = GameLib._getCityGold(_cityID);
            uint256 goldInventoryID = GameLib._getInventory(_cityID, GameLib._getTemplateByInventoryType("Gold"));
            ECSLib._setUint("Amount", goldInventoryID, balance - 1);
            // ECSLib._setUint("Amount", _goldInventoryID, balance / 2);
        }

        // One round of battle against city
        uint256 guardID = GameLib._getCityGuard(_cityID);
        if (guardID == NULL) {
            ECSLib._setUint("Owner", _cityID, playerID);
            Templates._addGuard(_cityID, gs().worldConstants);
            return;
        } else {
            uint256[] memory armyConstituents = GameLib._getArmyConstituents(_armyID);

            {
                // Army attacks City
                uint256 loss;
                for (uint256 i = 0; i < armyConstituents.length; i++) {
                    if (ECSLib._getUint("Amount", armyConstituents[i]) == 0) continue;
                    loss = (GameLib._sqrt(ECSLib._getUint("Amount", armyConstituents[i])) * ECSLib._getUint("Attack", ECSLib._getUint("Template", armyConstituents[i])) * 2 * 100) / (ECSLib._getUint("Defense", guardID) * ECSLib._getUint("Health", guardID));
                    if (loss >= ECSLib._getUint("Amount", guardID)) {
                        ECSLib._removeEntity(guardID);
                        break;
                    } else {
                        ECSLib._setUint("Amount", guardID, ECSLib._getUint("Amount", guardID) - loss);
                    }
                }
            }

            if (!Set(gs().entities).includes(guardID)) {
                // City has no defense, Army takes over
                ECSLib._setUint("Owner", _cityID, playerID);
                Templates._addGuard(_cityID, gs().worldConstants);
                return;
            }

            {
                // City attacks Army
                uint256 loss;
                for (uint256 i = 0; i < armyConstituents.length; i++) {
                    loss = (GameLib._sqrt(ECSLib._getUint("Amount", guardID)) * ECSLib._getUint("Attack", guardID) * 2 * 100) / (ECSLib._getUint("Defense", ECSLib._getUint("Template", armyConstituents[i])) * ECSLib._getUint("Health", ECSLib._getUint("Template", armyConstituents[i])));
                    if (loss >= ECSLib._getUint("Amount", armyConstituents[i])) {
                        ECSLib._removeEntity(armyConstituents[i]);
                    }
                    ECSLib._setUint("Amount", armyConstituents[i], ECSLib._getUint("Amount", armyConstituents[i]) - loss);
                }
            }

            if (GameLib._getArmyConstituents(_armyID).length == 0) {
                // Army dead, City takes its gold
                uint256 cityInventoryAmount = ECSLib._getUint("Amount", GameLib._getInventory(_cityID, GameLib._getTemplateByInventoryType("Gold")));
                uint256 increase = ECSLib._getUint("Amount", GameLib._getArmyInventory(_armyID, GameLib._getTemplateByInventoryType("Gold")));
                // FIXME: add city load
                ECSLib._setUint("Amount", GameLib._getInventory(_cityID, GameLib._getTemplateByInventoryType("Gold")), cityInventoryAmount + increase);
                GameLib._removeArmy(_armyID);
                return;
            }
        }
    }

    // --------------------------
    // treaty (WIP)
    // --------------------------

    // TODO: _setAddress => _setAddressArray
    function joinTreaty(address _treatyAddress) external {
        // GameLib._gamePauseCheck();
        // GameLib._activePlayerCheck(msg.sender);
        // // request to sign treaty
        // (bool success, bytes memory returnData) = _treatyAddress.call(abi.encodeWithSignature("joinTreaty()"));
        // require(success, "CRUIO: Failed to call the external treaty");
        // require(abi.decode(returnData, (bool)), "CRUIO: The treaty rejects your request");
        // // Sign treaty
        // uint256 _signatureID = ECSLib._addEntity();
        // ECSLib._setString("Tag", _signatureID, "Signature");
        // ECSLib._setUint("Owner", _signatureID, _playerID);
        // ECSLib._setAddress("Treaty", _signatureID, _treatyAddress);
    }

    function denounceTreaty(address _treatyToDenounce) external {
        // uint256 _playerID = GameLib._getPlayer(msg.sender);
        // // Verify that player is active
        // require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");
        // GameLib._gamePauseCheck();
        // // request to breach treaty
        // (bool success, bytes memory returnData) = _treatyToDenounce.call(abi.encodeWithSignature("denounceTreaty()"));
        // require(success, "CRUIO: Failed to call the external treaty");
        // require(abi.decode(returnData, (bool)), "CRUIO: The treaty rejects your request");
        // // breach treaty
        // uint256[] memory _signatureIDs = GameLib._getPlayerSignatures(_playerID);
        // for (uint256 i = 0; i < _signatureIDs.length; i++) {
        //     address _treaty = ECSLib._getAddress("Treaty", _signatureIDs[i]);
        //     if (_treaty == _treatyToDenounce) {
        //         ECSLib._removeEntity(_signatureIDs[i]);
        //         break;
        //     }
        // }
    }
}
