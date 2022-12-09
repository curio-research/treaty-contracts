//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {UseStorage} from "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameMode, Position, WorldConstants} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {Templates} from "contracts/libraries/Templates.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";
import {CurioWallet} from "contracts/CurioWallet.sol";
import {console} from "forge-std/console.sol";

/// @title Game facet
/// @notice Contains national functions

contract GameFacet is UseStorage {
    uint256 private constant NULL = 0;

    // ----------------------------------------------------------
    // BASIC
    // ----------------------------------------------------------

    function initializeNation(
        uint256 _positionX,
        uint256 _positionY,
        string memory _name
    ) external returns (uint256 nationID) {
        Position memory position = Position({x: _positionX, y: _positionY});
        Position memory tilePosition = GameLib.getProperTilePosition(position);

        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.inboundPositionCheck(position);
        require(gs().nations.length < gs().worldConstants.maxNationCount, "CURIO: Max nation count reached");
        require(gs().nationAddressToId[msg.sender] == NULL, "CURIO: Nation already initialized");

        // Verify that capital is not on mountain
        uint256 tileID = GameLib.getTileAt(tilePosition);
        GameLib.passableTerrainCheck(tilePosition);

        // Verify that tile is neutral
        require(ECSLib.getUint("Nation", tileID) == NULL, "CURIO: Tile unavailable");

        // Verify that no other movable entity is on tile
        require(GameLib.getMovableEntitiesAtTile(tilePosition).length == 0, "CURIO: Other movable entity on tile");

        // Remove resource at destination if one exists
        uint256 resourceID = GameLib.getResourceAtTile(tilePosition);
        if (resourceID != NULL) {
            require(ECSLib.getUint("Template", resourceID) != gs().templates["Gold"], "CURIO: Cannot settle on goldmine");
            ECSLib.removeEntity(resourceID);
        }

        // Register nation
        nationID = Templates.addNation(_name, msg.sender);
        gs().nations.push(msg.sender);
        gs().nationAddressToId[msg.sender] = nationID;

        // Found capital
        address capitalAddress = address(new CurioWallet(address(this)));
        Templates.addCapital(tilePosition, nationID, capitalAddress);

        // set Tile Nation
        ECSLib.setUint("Nation", tileID, nationID);

        uint256[] memory troopTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("TroopTemplate"));
        for (uint256 i = 0; i < troopTemplateIDs.length; i++) {
            Templates.addInventory(nationID, troopTemplateIDs[i]);
        }

        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            Templates.addInventory(nationID, resourceTemplateIDs[i]);
        }
    }

    function move(
        uint256 _armyID,
        uint256 _targetX,
        uint256 _targetY
    ) external {
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();
        Position memory targetPosition = Position({x: _targetX, y: _targetY});
        GameLib.inboundPositionCheck(targetPosition);

        uint256 nationID = ECSLib.getUint("Nation", _armyID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only move your own army");

        // Check terrain
        Position memory tilePosition = GameLib.getProperTilePosition(targetPosition);
        GameLib.passableTerrainCheck(tilePosition);

        // Verify no other movable entity at exact destination coordinate
        require(GameLib.getMovableEntityAt(targetPosition) == NULL, "CURIO: Destination occupied by a unit");

        // Check movement cooldown
        require(block.timestamp >= ECSLib.getUint("LastMoved", _armyID) + ECSLib.getUint("MoveCooldown", _armyID), "CURIO: Moved too recently");

        // Army cannot move in enemy territory
        uint256 tileID = GameLib.getTileAt(tilePosition);
        uint256 armyNationID = ECSLib.getUint("Nation", _armyID);
        GameLib.neutralOrOwnedEntityCheck(tileID, armyNationID);

        // Verify no gather
        require(GameLib.getArmyGather(_armyID) == NULL, "CURIO: Need to end gather first");

        // Calculate distance
        uint256 distance = GameLib.euclidean(ECSLib.getPosition("Position", _armyID), targetPosition);
        require(distance <= ECSLib.getUint("Speed", _armyID), "CURIO: Not enough movement points");

        // Move and update moveCooldown
        ECSLib.setPosition("Position", _armyID, targetPosition);
        ECSLib.setPosition("StartPosition", _armyID, tilePosition);
        ECSLib.setUint("LastMoved", _armyID, block.timestamp);
    }

    function recoverTile(uint256 _tileID) external {
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _tileID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only recover your own tile");

        uint256 tileLevel = ECSLib.getUint("Level", _tileID);
        require(block.timestamp >= ECSLib.getUint("LastUpgraded", _tileID), "CURIO: Need to finish upgrading first");
        require(block.timestamp >= ECSLib.getUint("LastRecovered", _tileID), "CURIO: Need to finish recovering first");

        // lost tile amount = current level amount - actual amount
        address tileAddress = ECSLib.getAddress("Address", _tileID);
        CurioERC20 guardToken = GameLib.getTokenContract("Guard"); // FIXME: getTokenContract not clear
        uint256 lostGuardAmount = GameLib.getConstant("Tile", "Guard", "Amount", "", tileLevel) - ECSLib.getUint("Amount", GameLib.getInventory(_tileID, gs().templates["Guard"]));

        // Deduct costs from capital
        {
            address capitalAddress = ECSLib.getAddress("Address", GameLib.getCapital(nationID));
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                uint256 balance = ECSLib.getUint("Amount", GameLib.getInventory(nationID, resourceTemplateIDs[i]));
                uint256 totalRecoverCost = GameLib.getConstant("Tile", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Upgrade", 0) * lostGuardAmount;
                require(balance >= totalRecoverCost, "CURIO: Insufficient balance");

                resourceToken.destroyToken(capitalAddress, totalRecoverCost);
            }
        }

        // Verify that capital has recovered from sack
        GameLib.capitalHasRecoveredFromSack(GameLib.getCapital(nationID));

        // Set timestamp
        ECSLib.setUint("LastRecovered", _tileID, block.timestamp + GameLib.getConstant("Tile", "", "Cooldown", "Recover", tileLevel));

        // Recover the tile
        guardToken.dripToken(tileAddress, lostGuardAmount);
    }

    function upgradeTile(uint256 _tileID) external {
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _tileID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only upgrade your own tile");

        // Check if nation has reached max tile level
        uint256 tileLevel = ECSLib.getUint("Level", _tileID);
        uint256 capitalID = GameLib.getCapital(ECSLib.getUint("Nation", _tileID));
        require(tileLevel < ECSLib.getUint("Level", capitalID) * gs().worldConstants.capitalLevelToEntityLevelRatio, "CURIO: Max tile level reached");

        GameLib.capitalHasRecoveredFromSack(capitalID);

        // Require nations to fully recover the tile before upgrade
        address tileAddress = ECSLib.getAddress("Address", _tileID);
        CurioERC20 guardToken = GameLib.getTokenContract("Guard");
        uint256 guardAmount = ECSLib.getUint("Amount", GameLib.getInventory(nationID, gs().templates["Guard"]));
        require(GameLib.getConstant("Tile", "Guard", "Amount", "", tileLevel) == guardAmount, "CURIO: Must recover before upgrade");

        // check if upgrade is in process
        require(block.timestamp >= ECSLib.getUint("LastUpgraded", _tileID), "CURIO: Need to finish upgrading first");

        // Deduct costs from capital
        {
            address capitalAddress = ECSLib.getAddress("Address", GameLib.getCapital(nationID));
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                uint256 balance = ECSLib.getUint("Amount", GameLib.getInventory(capitalID, resourceTemplateIDs[i]));
                uint256 cost = GameLib.getConstant("Tile", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Upgrade", tileLevel);
                require(balance >= cost, "CURIO: Insufficient balance");

                resourceToken.destroyToken(capitalAddress, cost);
            }
        }

        // set timestamp
        ECSLib.setUint("LastUpgraded", _tileID, block.timestamp + GameLib.getConstant("Tile", "", "Cooldown", "Upgrade", tileLevel));

        // Upgrade tile defense and level
        uint256 newGuardAmount = GameLib.getConstant("Tile", "Guard", "Amount", "", tileLevel + 1);
        ECSLib.setUint("Level", _tileID, tileLevel + 1);
        guardToken.dripToken(tileAddress, newGuardAmount - guardAmount);
    }

    // todo: merge it with upgrade resource
    // FIXME: rename to upgrade capital
    function upgradeNation() external {
        uint256 nationID = gs().nationAddressToId[msg.sender];
        GameLib.validEntityCheck(nationID);
        GameLib.ongoingGameCheck();

        // Check if nation has reached maxCapitalLevel
        uint256 capitalID = GameLib.getCapital(nationID);
        uint256 capitalLevel = ECSLib.getUint("Level", capitalID); // FIXME: capital level should be separated from nation level
        require(capitalLevel < gs().worldConstants.maxCapitalLevel, "CURIO: Reached max capital level");

        // Check sack
        GameLib.capitalHasRecoveredFromSack(capitalID);

        // check if capital upgrade is in process
        require(block.timestamp >= ECSLib.getUint("LastUpgraded", capitalID), "CURIO: Need to finish upgrading first");

        // Verify there's no ongoing troop production
        require(GameLib.getBuildingProduction(capitalID) == NULL, "CURIO: Need to finish production first");

        // Deduct costs from capital
        {
            address capitalAddress = ECSLib.getAddress("Address", GameLib.getCapital(nationID));
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                uint256 inventoryID = GameLib.getInventory(capitalID, resourceTemplateIDs[i]);
                uint256 balance = ECSLib.getUint("Amount", inventoryID);
                uint256 cost = GameLib.getConstant("Capital", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Upgrade", capitalLevel);

                require(balance >= cost, "CURIO: Insufficient balance");

                resourceToken.destroyToken(capitalAddress, cost);
            }
        }

        // Harvest Existing Resources
        harvestResourcesFromCapital(capitalID);

        // Update timestamp to when upgrade is finished
        ECSLib.setUint("LastUpgraded", capitalID, block.timestamp + GameLib.getConstant("Capital", "", "Cooldown", "Upgrade", capitalLevel));

        // Set new level
        ECSLib.setUint("Level", capitalID, capitalLevel + 1);
    }

    function moveCapital(uint256 _capitalID, Position memory _newTilePosition) external {
        GameLib.validEntityCheck(_capitalID);
        GameLib.ongoingGameCheck();
        GameLib.inboundPositionCheck(_newTilePosition);
        GameLib.passableTerrainCheck(_newTilePosition);
        uint256 nationID = ECSLib.getUint("Nation", _capitalID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only move your own capital");

        // TEMP: battle royale
        if (gs().worldConstants.gameMode == GameMode.BATTLE_ROYALE) {
            require(!GameLib.coincident(_newTilePosition, GameLib.getMapCenterTilePosition()), "CURIO: Capital cannot be on supertile");
        }

        // Capital at chaos cannot move
        GameLib.capitalHasRecoveredFromSack(_capitalID);

        // Verify that target tile belongs to nation
        require(ECSLib.getUint("Nation", GameLib.getTileAt(_newTilePosition)) == nationID, "CURIO: Can only move in your territory");

        // Verify that moveCapital cooldown has passed
        uint256 capitalLevel = ECSLib.getUint("Level", _capitalID);
        require(block.timestamp - ECSLib.getUint("LastMoved", _capitalID) > GameLib.getConstant("Capital", "", "Cooldown", "Move", capitalLevel), "CURIO: Moved capital too recently");

        // Deduct costs from capital
        {
            address capitalAddress = ECSLib.getAddress("Address", _capitalID);
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                uint256 balance = ECSLib.getUint("Amount", GameLib.getInventory(_capitalID, resourceTemplateIDs[i]));
                uint256 cost = GameLib.getConstant("Capital", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Move", capitalLevel);
                require(balance >= cost, "CURIO: Insufficient balance");

                resourceToken.destroyToken(capitalAddress, cost);
            }
        }

        // Set timestamp
        ECSLib.setUint("LastMoved", _capitalID, block.timestamp);

        // Remove resource at target tile and restore Level 0 farm at current tile
        {
            uint256 resourceID = GameLib.getResourceAtTile(_newTilePosition);
            if (resourceID != NULL) {
                require(ECSLib.getUint("Template", resourceID) != gs().templates["Gold"], "CURIO: Cannot settle on goldmine");
                ECSLib.removeEntity(resourceID);
            }
            Templates.addResource(gs().templates["Food"], ECSLib.getPosition("StartPosition", _capitalID));
        }
    }

    function disownTile(uint256 _tileID) external {
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _tileID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only disown your own tile");

        // Verify that capital is not on tile
        Position memory tilePosition = ECSLib.getPosition("StartPosition", _tileID);
        require(!GameLib.coincident(tilePosition, ECSLib.getPosition("StartPosition", GameLib.getCapital(ECSLib.getUint("Nation", _tileID)))), "CURIO: Cannot abandon capital");

        // Verify that tile is not during recover or upgrade
        require(block.timestamp > ECSLib.getUint("LastUpgraded", _tileID), "CURIO: Need to finish upgrading first");
        require(block.timestamp > ECSLib.getUint("LastRecovered", _tileID), "CURIO: Need to finish recovering first");

        // End gather processes on tile
        uint256[] memory movableEntitiesOnTile = GameLib.getMovableEntitiesAtTile(tilePosition);
        for (uint256 i = 0; i < movableEntitiesOnTile.length; i++) {
            uint256 gatherID = GameLib.getArmyGather(movableEntitiesOnTile[i]);
            if (gatherID != NULL) GameLib.endGather(movableEntitiesOnTile[i]);
        }

        // TODO: deduct resources from, or return resources to, nation inventory

        // Disown tile
        ECSLib.setUint("Nation", _tileID, NULL);
    }

    // ----------------------------------------------------------
    // PRODUCTION
    // ----------------------------------------------------------

    function startTroopProduction(
        uint256 _capitalID,
        uint256 _templateID,
        uint256 _amount
    ) external returns (uint256 productionID) {
        // Basic checks; note: msg.sender should be nation address
        GameLib.validEntityCheck(_capitalID);
        GameLib.validEntityCheck(_templateID);
        GameLib.ongoingGameCheck();

        uint256 nationID = ECSLib.getUint("Nation", _capitalID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only produce at your capital");

        // Verify no upgrades in process
        require(block.timestamp >= ECSLib.getUint("LastUpgraded", _capitalID), "CURIO: Need to finish upgrading first");

        // Verify sack
        GameLib.capitalHasRecoveredFromSack(_capitalID);

        // Verify that capital can produce
        require(ECSLib.getBool("CanProduce", _capitalID), "CURIO: Capital cannot produce");

        // Deduct costs
        {
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("TroopTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                uint256 balance = ECSLib.getUint("Amount", GameLib.getInventory(_capitalID, resourceTemplateIDs[i]));
                uint256 cost = _amount * GameLib.getConstant("Troop Production", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Move", ECSLib.getUint("Level", _capitalID));
                require(balance >= cost, "CURIO: Insufficient balance");

                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                resourceToken.destroyToken(ECSLib.getAddress("Address", _capitalID), cost);
            }
        }

        // Verify no ongoing production
        require(GameLib.getBuildingProduction(_capitalID) == NULL, "CURIO: Must end ongoing production first");

        // Start production
        return Templates.addTroopProduction(_capitalID, _templateID, _amount, gs().worldConstants.secondsToTrainAThousandTroops * (_amount / 1000)); // FIXME: naming
    }

    function endTroopProduction(uint256 _capitalID, uint256 _productionID) public {
        GameLib.validEntityCheck(_capitalID);
        GameLib.validEntityCheck(_productionID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _capitalID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only produce at your capital");

        // Verify no upgrades in process
        require(block.timestamp > ECSLib.getUint("LastUpgraded", _capitalID), "CURIO: Need to finish upgrading first");

        // capital at chaos cannot collect troops
        GameLib.capitalHasRecoveredFromSack(_capitalID);

        // Verify that enough time has passed for the given amount
        require(block.timestamp >= (ECSLib.getUint("InitTimestamp", _productionID) + ECSLib.getUint("Duration", _productionID)), "CURIO: Need more time for production");

        // Update inventory
        CurioERC20 troopToken = CurioERC20(ECSLib.getAddress("Address", ECSLib.getUint("Template", _productionID)));
        address capitalAddress = ECSLib.getAddress("Address", _capitalID);
        troopToken.dripToken(capitalAddress, ECSLib.getUint("Amount", _productionID));

        // Delete production
        ECSLib.removeEntity(_productionID);
    }

    function startGather(uint256 _armyID, uint256 _resourceID) external {
        GameLib.validEntityCheck(_armyID);
        GameLib.validEntityCheck(_resourceID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _armyID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only gather with your own army");

        // Verify that army is sitting on the resource
        Position memory startPosition = GameLib.getProperTilePosition(ECSLib.getPosition("Position", _armyID));
        require(GameLib.coincident(startPosition, ECSLib.getPosition("StartPosition", _resourceID)), "CURIO: Army must be on resource tile");

        // Verify that the resource level is greater than zero, meaning that a gold mine has "been built".
        require(ECSLib.getUint("Level", _resourceID) == 0, "CURIO: Resource already upgraded");

        // Verify that resource is not in another nation's territory
        uint256 tileID = GameLib.getTileAt(startPosition);
        GameLib.neutralOrOwnedEntityCheck(tileID, ECSLib.getUint("Nation", _armyID));

        // Cannot gather twice
        require(GameLib.getArmyGather(_armyID) == NULL, "CURIO: Must finish existing gather first");

        // Verify that the army's capacity isn't full
        // TODO

        Templates.addResourceGather(startPosition, _resourceID, _armyID);
    }

    function endGather(uint256 _armyID) external {
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _armyID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only gather with your own army");

        // End gather
        GameLib.endGather(_armyID);
    }

    function unloadResources(uint256 _armyID) external {
        // Basic checks; note: msg.sneder should be the army
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _armyID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only unload your own army");

        // Verify tile ownership
        Position memory startPosition = ECSLib.getPosition("StartPosition", _armyID);

        // Verify that army is in capital tile
        uint256 capitalID = GameLib.getCapital(nationID);
        require(GameLib.coincident(ECSLib.getPosition("StartPosition", capitalID), startPosition), "CURIO: Must be on capital to unload");

        // Army cannot unload resources to chaotic capital
        GameLib.capitalHasRecoveredFromSack(capitalID);

        // Return carried resources to capital
        address capitalAddress = ECSLib.getAddress("Address", capitalID);
        GameLib.unloadResources(capitalAddress, ECSLib.getAddress("Address", _armyID));
    }

    function harvestResource(uint256 _resourceID) public {
        GameLib.validEntityCheck(_resourceID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _resourceID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only harvest a resource you own");

        // Capital at chaos cannot harvest resources
        GameLib.capitalHasRecoveredFromSack(GameLib.getCapital(nationID));

        // Verify that the resource level is greater than zero, meaning that a tool has "been built".
        uint256 resourceLevel = ECSLib.getUint("Level", _resourceID);
        require(resourceLevel > 0, "CURIO: Need to upgrade resource to harvest");

        // Verify upgrade not in process
        uint256 templateID = ECSLib.getUint("Template", _resourceID);
        string memory buildingType = templateID == gs().templates["Gold"] ? "Goldmine" : "Farm";
        require(block.timestamp >= ECSLib.getUint("LastUpgraded", _resourceID), "CURIO: Need to finish upgrading first");

        // Verify can harvest
        require(block.timestamp >= ECSLib.getUint("LastHarvested", _resourceID), "CURIO: Need more time to harvest");

        // Get harvest amount
        uint256 harvestRate = GameLib.getConstant(buildingType, ECSLib.getString("InventoryType", templateID), "Yield", "", resourceLevel);
        uint256 harvestAmount = (block.timestamp - ECSLib.getUint("LastHarvested", _resourceID)) * harvestRate;
        uint256 harvestLoad = GameLib.getConstant(buildingType, ECSLib.getString("InventoryType", ECSLib.getUint("Template", _resourceID)), "Load", "", resourceLevel);

        harvestAmount = GameLib.min(harvestLoad, harvestAmount);

        // Update last harvest
        ECSLib.setUint("LastHarvested", _resourceID, block.timestamp);

        // Update capital inventory amount
        address capitalAddress = ECSLib.getAddress("Address", GameLib.getCapital(nationID));
        CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", templateID));
        resourceToken.dripToken(capitalAddress, harvestAmount);
    }

    // FIXME: need to set LastRecovered of a nation's resources when chaos starts
    function harvestResources(uint256[] memory resourceIds) external {
        for (uint256 i = 0; i < resourceIds.length; i++) {
            harvestResource(resourceIds[i]);
        }
    }

    // TODO: harvest gold & food on a capital; consider merge this with the function above
    function harvestResourcesFromCapital(uint256 _capitalID) public {
        GameLib.validEntityCheck(_capitalID);
        uint256 nationID = ECSLib.getUint("Nation", _capitalID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only harvest from your own capital");

        // Verify sack
        GameLib.capitalHasRecoveredFromSack(_capitalID);

        // Verify it's not being upgraded; note: capital level is same as nation level here
        uint256 capitalLevel = ECSLib.getUint("Level", _capitalID);
        if (capitalLevel < gs().worldConstants.maxCapitalLevel) {
            require(block.timestamp >= ECSLib.getUint("LastUpgraded", _capitalID), "CURIO: Need to finish upgrading first");
        }

        // Verify can harvest
        require(block.timestamp >= ECSLib.getUint("LastHarvested", _capitalID), "CURIO: Need more time to harvest");

        // Create inventory if none exists
        {
            address capitalAddress = ECSLib.getAddress("Address", _capitalID);
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                uint256 harvestRate = GameLib.getConstant("Capital", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Yield", "", capitalLevel);
                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                uint256 harvestAmount = (block.timestamp - ECSLib.getUint("LastHarvested", _capitalID)) * harvestRate;
                uint256 harvestLoad = GameLib.getConstant("Capital", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Load", "", capitalLevel);

                harvestAmount = GameLib.min(harvestLoad, harvestAmount);

                resourceToken.dripToken(capitalAddress, harvestAmount);
            }
        }

        // Reset harvest time
        ECSLib.setUint("LastHarvested", _capitalID, block.timestamp);
    }

    // ----------------------------------------------------------
    // BATTLE
    // ----------------------------------------------------------

    function organizeArmy(
        uint256 _capitalID,
        uint256[] memory _templateIDs,
        uint256[] memory _amounts
    ) external returns (uint256 armyID) {
        GameLib.validEntityCheck(_capitalID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _capitalID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only organize army at your own capital");

        // Verify there is no army currently at the capital
        Position memory tilePosition = ECSLib.getPosition("StartPosition", _capitalID);
        Position memory midPosition = GameLib.getMidPositionFromTilePosition(tilePosition);
        require(GameLib.getArmyAt(midPosition) == NULL, "CURIO: Capital occupied by another army");

        // Capital at Chaos cannot organize an army
        GameLib.capitalHasRecoveredFromSack(_capitalID);

        // Add army
        address armyAddress = address(new CurioWallet(address(this)));
        armyID = Templates.addArmy(2, 1, 2, gs().worldConstants.tileWidth, nationID, midPosition, tilePosition, armyAddress);

        // Collect army traits from individual troop types & transfer troops from nation
        {
            uint256 load = 0; // sum
            address capitalAddress = ECSLib.getAddress("Address", _capitalID);

            require(_templateIDs.length == _amounts.length, "CURIO: Input lengths do not match");
            require(_templateIDs.length > 0, "CURIO: Army must have at least 1 troop");

            for (uint256 i = 0; i < _templateIDs.length; i++) {
                CurioERC20 troopToken = CurioERC20(ECSLib.getAddress("Address", _templateIDs[i]));
                // require(tokenContract.checkBalanceOf(msg.sender) >= _amounts[i], "CURIO: Need to produce more troops");

                load += ECSLib.getUint("Load", _templateIDs[i]) * _amounts[i];

                troopToken.transferFrom(capitalAddress, armyAddress, _amounts[i]);
            }

            // Edit army traits
            ECSLib.setUint("Load", armyID, load);
        }
    }

    function disbandArmy(uint256 _armyID) external {
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _armyID);
        address armyAddress = ECSLib.getAddress("Address", _armyID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only disband your own army");

        // Verify tile ownership
        Position memory armyPosition = ECSLib.getPosition("Position", _armyID);
        Position memory armyStartPosition = GameLib.getProperTilePosition(armyPosition);

        // Verify that army is on capital tile
        uint256 capitalID = GameLib.getCapital(nationID);
        require(GameLib.coincident(ECSLib.getPosition("StartPosition", capitalID), armyStartPosition), "CURIO: Move army to capital to disband");

        address capitalAddress = ECSLib.getAddress("Address", capitalID);

        // Return carried resources to capital
        GameLib.unloadResources(capitalAddress, armyAddress);

        // Return troops to corresponding inventories and disband army
        GameLib.disbandArmy(capitalAddress, armyAddress);
        ECSLib.removeComponentValue("Position", _armyID);
        ECSLib.removeComponentValue("CanBattle", _armyID);
    }

    /**
     * @dev One round of battle against an army, a tile, or a tile with a capital.
     * @param _armyID army entity
     * @param _targetID target entity
     */
    function battle(uint256 _armyID, uint256 _targetID) external {
        GameLib.validEntityCheck(_armyID);
        GameLib.validEntityCheck(_targetID);
        GameLib.ongoingGameCheck();

        uint256 nationID = ECSLib.getUint("Nation", _armyID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only battle using your own army");

        // Verify that army and target can battle
        require(ECSLib.getBool("CanBattle", _armyID), "CURIO: Army cannot battle");
        require(ECSLib.getBool("CanBattle", _targetID), "CURIO: Target cannot battle");

        // Verify that entities belong to different nations
        require(ECSLib.getUint("Nation", _targetID) != nationID, "CURIO: Cannot battle your own entity");

        // Check battle cooldown and update last timestamp
        require(block.timestamp >= ECSLib.getUint("LastAttacked", _armyID) + ECSLib.getUint("BattleCooldown", _armyID), "CURIO: Battled too recently");
        ECSLib.setUint("LastAttacked", _armyID, block.timestamp);

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
        require(GameLib.euclidean(ECSLib.getPosition("Position", _armyID), ECSLib.getPosition("Position", _targetArmyID)) <= ECSLib.getUint("AttackRange", _armyID), "CURIO: Attack out of range");

        // End target army's gather
        if (GameLib.getArmyGather(_targetArmyID) != NULL) GameLib.endGather(_targetArmyID);

        // Execute one round of battle
        bool victory = GameLib.attack(_armyID, _targetArmyID, true, true);
        if (!victory) GameLib.attack(_targetArmyID, _armyID, true, true);
    }

    function _battleTile(uint256 _armyID, uint256 _tileID) private {
        // Verify that army and tile are adjacent
        require(
            GameLib.euclidean(ECSLib.getPosition("Position", _armyID), GameLib.getMidPositionFromTilePosition(ECSLib.getPosition("StartPosition", _tileID))) <= ECSLib.getUint("AttackRange", _armyID), //
            "CURIO: Attack out of range"
        );
        // Verify that target tile doesn't have guard left
        address tileAddress = ECSLib.getAddress("Address", _tileID);
        CurioERC20 guardToken = GameLib.getTokenContract("Guard");
        require(ECSLib.getUint("Amount", GameLib.getInventory(_tileID, gs().templates["Guard"])) > 0, "CURIO: defender subjugated, claim tile instead");

        uint256 capitalID = GameLib.getCapital(ECSLib.getUint("Nation", _tileID));
        // Others cannot attack cities at chaos
        GameLib.capitalHasRecoveredFromSack(GameLib.getCapital(capitalID));

        // if it is the super tile, check that it's active
        if (GameLib.coincident(ECSLib.getPosition("StartPosition", _tileID), GameLib.getMapCenterTilePosition())) {
            // todo: end game when nations occupy it for a certain period of time
            require(block.timestamp >= ECSLib.getUint("LastRecovered", _tileID), "Curio: Supertile is not active yet");
        }

        // if it is barbarian, check it's not hybernating
        if (GameLib.isBarbarian(_tileID)) {
            require(block.timestamp >= ECSLib.getUint("LastRecovered", _tileID), "CURIO: Barbarians hybernating, need to wait");
        }

        // Execute one round of battle
        bool victory = GameLib.attack(_armyID, _tileID, false, false);
        if (victory) {
            if (capitalID != NULL) {
                // Victorious against capital, add back some guards for the loser
                guardToken.dripToken(tileAddress, GameLib.getConstant("Tile", "Guard", "Amount", "", ECSLib.getUint("Level", capitalID)));

                // Descend capital into chaos mode
                // 1. Terminate troop production
                // 2. Harvest resources and disable harvest
                // 3. Update `LastSacked` to current timestamp
                uint256 productionID = GameLib.getBuildingProduction(capitalID);
                if (productionID != NULL) ECSLib.removeEntity(productionID);

                uint256 chaosDuration = GameLib.getConstant("Capital", "", "Cooldown", "Chaos", ECSLib.getUint("Level", capitalID));
                ECSLib.setUint("LastHarvested", capitalID, block.timestamp + chaosDuration);

                ECSLib.setUint("LastSacked", capitalID, block.timestamp);
            } else {
                if (GameLib.isBarbarian(_tileID)) {
                    // Reset barbarian
                    GameLib.distributeBarbarianReward(_armyID, _tileID);
                    uint256 barbarianGuardAmount = GameLib.getConstant("Barbarian", "Guard", "Amount", "", ECSLib.getUint("Terrain", _tileID) - 2); // FIXME: hardcoded
                    ECSLib.setUint("LastRecovered", _tileID, block.timestamp + GameLib.getConstant("Barbarian", "", "Cooldown", "", 0));
                    guardToken.dripToken(tileAddress, barbarianGuardAmount);
                } else {
                    // Neutralize tile & resource
                    uint256 resourceID = GameLib.getResourceAt(ECSLib.getPosition("StartPosition", _tileID));
                    ECSLib.setUint("Nation", _tileID, NULL);
                    ECSLib.setUint("Nation", resourceID, NULL);
                }
            }
        } else {
            // todo: if tile wins against army, army's resource goes to tile's nation
            GameLib.attack(_tileID, _armyID, false, true);
        }
    }

    function claimTile(uint256 _armyID, uint256 _tileID) public {
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _armyID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only claim tile with your own army");

        // Check Tile Count has not exceeded limits
        uint256 capitalID = GameLib.getCapital(nationID);
        require(GameLib.getNationTiles(nationID).length < GameLib.getConstant("Nation", "Tile", "Amount", "", ECSLib.getUint("Level", capitalID)), "CURIO: Reached max tile count");

        // Verify target tile has no owner
        require(ECSLib.getUint("Nation", _tileID) == NULL, "CURIO: Tile has owner");

        // Verify target tile is not barbarian tile
        require(!GameLib.isBarbarian(_tileID), "CURIO: Cannot claim barbarian tiles");

        // Verify that no guard exists on tile
        require(ECSLib.getUint("Amount", GameLib.getInventory(_tileID, gs().templates["Guard"])) == 0, "CURIO: Tile has guard");

        // Verify that army is on selected tile
        Position memory tilePosition = ECSLib.getPosition("StartPosition", _tileID);
        require(GameLib.coincident(GameLib.getProperTilePosition(ECSLib.getPosition("Position", _armyID)), tilePosition), "CURIO: Army must be on tile to claim");

        // Verify that tile is next to own tile
        require(GameLib.isAdjacentToOwnTile(nationID, tilePosition), "CURIO: Can only claim contiguous tiles");

        // Verify that no other movable entity is on tile
        uint256[] memory movableEntitiesOnTile = GameLib.getMovableEntitiesAtTile(tilePosition);
        require(movableEntitiesOnTile.length == 1 && movableEntitiesOnTile[0] == _armyID, "CURIO: Other movable entity on tile");

        // Transfer ownership of tile and initialize new guard
        ECSLib.setUint("Nation", _tileID, nationID);
        uint256 tileGuardAmount = GameLib.getConstant("Tile", "Guard", "Amount", "", ECSLib.getUint("Level", _tileID));
        CurioERC20 guardToken = GameLib.getTokenContract("Guard");
        guardToken.dripToken(ECSLib.getAddress("Address", _tileID), tileGuardAmount);

        // Transfer ownership of resource
        uint256 resourceID = GameLib.getResourceAt(tilePosition);
        ECSLib.setUint("Nation", resourceID, nationID);
    }

    function upgradeResource(uint256 _resourceID) public {
        GameLib.validEntityCheck(_resourceID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _resourceID);
        require(gs().nationAddressToId[msg.sender] == nationID, "CURIO: Can only upgrade your own resource");

        // Check if nation has reached max tile level
        uint256 capitalID = GameLib.getCapital(nationID);
        require(ECSLib.getUint("Level", _resourceID) < ECSLib.getUint("Level", capitalID) * gs().worldConstants.capitalLevelToEntityLevelRatio, "CURIO: Need to upgrade nation first");

        uint256 resourceLevel = ECSLib.getUint("Level", _resourceID);

        // check if upgrade is in process
        string memory subject = ECSLib.getUint("Template", _resourceID) == gs().templates["Gold"] ? "Goldmine" : "Farm";
        require(block.timestamp >= ECSLib.getUint("LastUpgraded", _resourceID), "CURIO: Need to finish upgrading first");

        // Deduct costs from capital
        {
            address capitalAddress = ECSLib.getAddress("Address", capitalID);
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                uint256 balance = ECSLib.getUint("Amount", GameLib.getInventory(capitalID, resourceTemplateIDs[i]));
                uint256 cost = GameLib.getConstant(subject, ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Upgrade", resourceLevel);
                require(balance >= cost, "CURIO: Insufficient balance");

                resourceToken.destroyToken(capitalAddress, cost);
            }
        }

        // todo: harvest resource before upgrade

        // Set timestamp
        ECSLib.setUint("LastUpgraded", _resourceID, block.timestamp + GameLib.getConstant(subject, "", "Cooldown", "Upgrade", resourceLevel));

        // Set new level
        ECSLib.setUint("Level", _resourceID, resourceLevel + 1);
    }

    // --------------------------
    // treaty (WIP)
    // --------------------------

    // TODO: there's no approval mechanism from treaty yet, only from nation
    function joinTreaty(uint256 _treatyID) external {
        GameLib.ongoingGameCheck();

        uint256 nationID = gs().nationAddressToId[msg.sender];
        Templates.addSignature(_treatyID, nationID);
    }

    function leaveTreaty(uint256 _treatyID) external {
        GameLib.ongoingGameCheck();

        uint256 nationID = gs().nationAddressToId[msg.sender];
        uint256 signatureID = GameLib.getNationTreatySignature(_treatyID, nationID);
        require(signatureID != NULL, "CURIO: Nation is not a treaty signatory");
        ECSLib.removeEntity(signatureID);
    }
}
