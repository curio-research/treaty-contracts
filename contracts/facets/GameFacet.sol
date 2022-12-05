//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

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

    error UpgradeUnfinished();

    // ----------------------------------------------------------
    // BASIC
    // ----------------------------------------------------------

    // sent using the initial function
    function authorizeGame(address _burnerAddress) external {
        gs().accounts[msg.sender] = _burnerAddress;
        gs().burnerAccounts[_burnerAddress] = msg.sender;
    }

    function initializeNation(
        uint256 _positionX,
        uint256 _positionY,
        string memory _name
    ) external {
        // FIXME: Figure out a way to pass in position in delegate call
        Position memory position = Position({x: _positionX, y: _positionY});
        Position memory tilePosition = GameLib.getProperTilePosition(position);

        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.inboundPositionCheck(position);
        require(gs().nations.length < gs().worldConstants.maxPlayerCount, "CURIO: Max nation count reached");
        require(gs().addressEntityMap[msg.sender] == NULL, "CURIO: Address already initialized");

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

        // Register player
        uint256 nationID = Templates.addNation(_name);
        gs().nations.push(msg.sender);
        gs().addressEntityMap[msg.sender] = nationID;

        // Found capital
        Templates.addCapital(tilePosition, nationID);

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

    function initializeArmy(address _armyWalletAddress) external {
        // note: message.sender is supposed to be nation wallet (but flexible to change)
        GameLib.ongoingGameCheck();

        // Check that player has not reached max army amount
        uint256 nationID = gs().addressEntityMap[msg.sender];
        uint256[] memory armyIDs = GameLib.getArmiesFromNation(nationID);
        require(armyIDs.length + 1 <= gs().worldConstants.maxArmyCountPerPlayer, "CURIO: Army max count reached");

        // Register army
        uint256 armyID = Templates.addArmy(2, 1, 2, gs().worldConstants.tileWidth, 0, nationID, _armyWalletAddress);
        gs().armies.push(_armyWalletAddress);
        gs().addressEntityMap[_armyWalletAddress] = armyID;

        uint256[] memory troopTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("TroopTemplate"));
        for (uint256 i = 0; i < troopTemplateIDs.length; i++) {
            Templates.addInventory(armyID, troopTemplateIDs[i]);
        }

        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            Templates.addInventory(armyID, resourceTemplateIDs[i]);
        }
    }

    function move(
        uint256 _armyID,
        uint256 _targetX,
        uint256 _targetY
    ) external {
        // Basic checks; note: msg.sender should be army
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();
        Position memory targetPosition = Position({x: _targetX, y: _targetY});
        GameLib.inboundPositionCheck(targetPosition);

        address armyAddress = ECSLib.getAddress("Address", _armyID);
        require(armyAddress == msg.sender, "CURIO: You do not control this army");

        // Verify that army is organized first (has position component); bug: (0, 0) position?
        Position memory armyPosition = ECSLib.getPosition("Position", _armyID);
        require(!(armyPosition.x == 0 && armyPosition.y == 0), "CURIO: Army is not organized first");

        // Check terrain
        Position memory tilePosition = GameLib.getProperTilePosition(targetPosition);
        GameLib.passableTerrainCheck(tilePosition);

        // Verify no other movable entity at exact destination coordinate
        require(GameLib.getMovableEntityAt(targetPosition) == NULL, "CURIO: Destination occupied by a unit");

        // Check moveCooldown
        require(block.timestamp >= ECSLib.getUint("LastMoved", _armyID) + ECSLib.getUint("MoveCooldown", _armyID), "CURIO: Moved too recently");

        // Army cannot move in enemy territory
        // todo: integrate with 1-N treaty here
        uint256 tileID = GameLib.getTileAt(tilePosition);
        uint256 armyNationID = ECSLib.getUint("Nation", _armyID);

        {
            // Check if army is nation's homie
            uint256 tileNationID = ECSLib.getUint("Nation", tileID);
            if (tileNationID != NULL) {
                address tileNationContract = ECSLib.getAddress("Address", tileNationID);
                // note: here it should have a standard; I'm using this name just for fun
                (bool success, bytes memory data) = tileNationContract.call(abi.encodeWithSignature("approveMove(address)", address(armyAddress)));
                require(success, "CURIO: Fail to check policy");
                bool isHomie = abi.decode(data, (bool));
                if (!isHomie) GameLib.neutralOrOwnedEntityCheck(tileID, armyNationID);
            } else GameLib.neutralOrOwnedEntityCheck(tileID, armyNationID);
        }

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
        // Basic checks; note: msg.sender should be nation address
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _tileID);
        require(ECSLib.getAddress("Address", nationID) == msg.sender, "CURIO: You do not control this nation");

        uint256 tileLevel = ECSLib.getUint("Level", _tileID);
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _tileID) > GameLib.getConstant("Tile", "", "Cooldown", "Upgrade", tileLevel - 1), "CURIO: Need to finish upgrading first");
        require(block.timestamp - ECSLib.getUint("LastRecovered", _tileID) > GameLib.getConstant("Tile", "", "Cooldown", "Recover", tileLevel), "CURIO: Need to finish recovering first");

        // lost tile amount = current level amount - actual amount
        address tileAddress = ECSLib.getAddress("Address", _tileID);
        address guardTokenAddress = GameLib.getTokenContract("Guard");
        uint256 lostGuardAmount = GameLib.getConstant("Tile", "Guard", "Amount", "", tileLevel) - GameLib.getAddressBalance(tileAddress, guardTokenAddress);

        {
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                address resourceContract = ECSLib.getAddress("Address", resourceTemplateIDs[i]);
                uint256 balance = GameLib.getAddressBalance(msg.sender, resourceContract);
                uint256 totalRecoverCost = GameLib.getConstant("Tile", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Upgrade", 0) * lostGuardAmount;
                require(balance >= totalRecoverCost, "CURIO: Insufficient balance");
                (bool success1, ) = resourceContract.call(abi.encodeWithSignature("destroyToken(address,uint256)", msg.sender, totalRecoverCost));
                require(success1, "CURIO: token burn fails");
            }
        }

        // Verify that capital has recovered from sack
        GameLib.capitalHasRecoveredFromSack(GameLib.getCapital(nationID));

        // Set timestamp
        ECSLib.setUint("LastRecovered", _tileID, block.timestamp);

        // Recover the Tile
        (bool success, ) = guardTokenAddress.call(abi.encodeWithSignature("dripToken(address,uint256)", tileAddress, lostGuardAmount));
        require(success, "CURIO: Failed to drip guard tokens");
    }

    function upgradeTile(uint256 _tileID) external {
        // Basic checks; note: msg.sender should be nation address
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();

        // Check if player has reached max tile level
        uint256 tileLevel = ECSLib.getUint("Level", _tileID);
        uint256 capitalID = GameLib.getCapital(ECSLib.getUint("Nation", _tileID));
        require(tileLevel < ECSLib.getUint("Level", capitalID) * gs().worldConstants.capitalLevelToEntityLevelRatio, "CURIO: Max tile level reached");

        GameLib.capitalHasRecoveredFromSack(capitalID);

        // Require players to fully recover the tile before upgrade
        address tileAddress = ECSLib.getAddress("Address", _tileID);
        address guardTokenAddress = GameLib.getTokenContract("Guard");
        require(GameLib.getConstant("Tile", "Guard", "Amount", "", tileLevel) == GameLib.getAddressBalance(tileAddress, guardTokenAddress), "CURIO: Must recover before upgrade");

        // check if upgrade is in process
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _tileID) > GameLib.getConstant("Tile", "", "Cooldown", "Upgrade", tileLevel - 1), "CURIO: Need to finish upgrading first");

        // Deduct costs
        {
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                address resourceContract = ECSLib.getAddress("Address", resourceTemplateIDs[i]);
                uint256 balance = GameLib.getAddressBalance(msg.sender, resourceContract);
                uint256 cost = GameLib.getConstant("Tile", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Upgrade", tileLevel);
                require(balance >= cost, "CURIO: Insufficient balance");
                (bool success1, ) = resourceContract.call(abi.encodeWithSignature("destroyToken(address,uint256)", msg.sender, cost));
                require(success1, "CURIO: token burn fails");
            }
        }

        // set timestamp
        ECSLib.setUint("LastUpgraded", _tileID, block.timestamp);

        // Upgrade tile defense and level
        uint256 newTileGuardAmount = GameLib.getConstant("Tile", "Guard", "Amount", "", tileLevel + 1);
        ECSLib.setUint("Level", _tileID, tileLevel + 1);
        (bool success, ) = guardTokenAddress.call(abi.encodeWithSignature("dripToken(address,uint256)", tileAddress, newTileGuardAmount));
        require(success, "CURIO: Failed to drip Guard tokens");
    }

    // todo: merge it with upgrade resource
    function upgradeNation(uint256 _nationID) external {
        // Basic Check; note: msg.sender should be the nation itself
        GameLib.validEntityCheck(_nationID);
        GameLib.ongoingGameCheck();
        require(ECSLib.getAddress("Address", _nationID) == msg.sender, "CURIO: Can only upgrade your own nation");

        // Check if player has reached maxCapitalLevel
        uint256 nationLevel = ECSLib.getUint("Level", _nationID);
        require(nationLevel < gs().worldConstants.maxCapitalLevel, "CURIO: Reached max capital level");

        // Capital at chaos cannot produce any troops
        uint256 capitalID = GameLib.getCapital(_nationID);
        GameLib.capitalHasRecoveredFromSack(capitalID);

        // check if capital upgrade is in process
        uint256 lastUpgradeDuration = GameLib.getConstant("Capital", "", "Cooldown", "Upgrade", nationLevel - 1);
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _nationID) > lastUpgradeDuration, "CURIO: Need to finish upgrade first");

        // Verify there's no ongoing troop production
        require(GameLib.getBuildingProduction(capitalID) == NULL, "CURIO: Need to finish production first");

        // Deduct costs and set load
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            address resourceContract = ECSLib.getAddress("Address", resourceTemplateIDs[i]);
            uint256 balance = GameLib.getAddressBalance(msg.sender, resourceContract);
            uint256 cost = GameLib.getConstant("Capital", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Upgrade", nationLevel);
            require(balance >= cost, "CURIO: Insufficient balance");
            (bool success, ) = resourceContract.call(abi.encodeWithSignature("destroyToken(address,uint256)", msg.sender, cost));
            require(success, "CURIO: token burn fails");
        }

        // Harvest Existing Resources
        harvestResourcesFromCapital(capitalID);

        // Set timestamp
        ECSLib.setUint("LastUpgraded", _nationID, block.timestamp);

        // Update timestamp to when it's gonna finish upgrade
        // ECSLib.setUint("LastUpgraded", _buildingID, block.timestamp + GameLib.getConstant("Capital", "", "Cooldown", "Upgrade", centerLevel)); // FIXME

        // Set new level
        ECSLib.setUint("Level", _nationID, nationLevel + 1);
    }

    function moveCapital(uint256 _buildingID, Position memory _newTilePosition) external {
        // Basic checks; note: msg.sender should be capital's nation
        GameLib.validEntityCheck(_buildingID);
        GameLib.ongoingGameCheck();
        GameLib.inboundPositionCheck(_newTilePosition);
        GameLib.passableTerrainCheck(_newTilePosition);
        uint256 nationID = ECSLib.getUint("Nation", _buildingID);
        require(ECSLib.getAddress("Address", nationID) == msg.sender, "CURIO: You do not control this nation");

        // TEMP: battle royale
        if (gs().worldConstants.gameMode == GameMode.BATTLE_ROYALE) {
            require(!GameLib.coincident(_newTilePosition, GameLib.getMapCenterTilePosition()), "CURIO: Capital cannot be on supertile");
        }

        // Capital at chaos cannot move
        GameLib.capitalHasRecoveredFromSack(_buildingID);

        // Verify that target tile belongs to player
        require(ECSLib.getUint("Nation", GameLib.getTileAt(_newTilePosition)) == nationID, "CURIO: Can only move in your territory");

        // Verify that moveCapital cooldown has passed
        uint256 capitalLevel = ECSLib.getUint("Level", _buildingID);
        require(block.timestamp - ECSLib.getUint("LastMoved", _buildingID) > GameLib.getConstant("Capital", "", "Cooldown", "Move", capitalLevel), "CURIO: Moved capital too recently");

        // Deduct costs
        {
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                address resourceContract = ECSLib.getAddress("Address", resourceTemplateIDs[i]);
                uint256 balance = GameLib.getAddressBalance(msg.sender, resourceContract);
                uint256 cost = GameLib.getConstant("Capital", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Move", capitalLevel);
                require(balance >= cost, "CURIO: Insufficient balance");
                (bool success, ) = resourceContract.call(abi.encodeWithSignature("destroyToken(address,uint256)", msg.sender, cost));
                require(success, "CURIO: token burn fails");
            }
        }

        // Set timestamp
        ECSLib.setUint("LastMoved", _buildingID, block.timestamp);

        // Remove resource at target tile and restore Level 0 farm at current tile
        {
            uint256 resourceID = GameLib.getResourceAtTile(_newTilePosition);
            if (resourceID != NULL) {
                require(ECSLib.getUint("Template", resourceID) != gs().templates["Gold"], "CURIO: Cannot settle on goldmine");
                ECSLib.removeEntity(resourceID);
            }
            Templates.addResource(gs().templates["Food"], ECSLib.getPosition("StartPosition", _buildingID));
        }
    }

    function disownTile(uint256 _tileID) external {
        // Basic checks; note: msg.sender should be nation address
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _tileID);
        require(ECSLib.getAddress("Address", nationID) == msg.sender, "Curio: You do not control this nation");

        // Verify that capital is not on tile
        Position memory tilePosition = ECSLib.getPosition("StartPosition", _tileID);
        require(!GameLib.coincident(tilePosition, ECSLib.getPosition("StartPosition", GameLib.getCapital(ECSLib.getUint("Nation", _tileID)))), "CURIO: Cannot abandon capital");

        // Verify that tile is not during recover or upgrade
        uint256 tileLevel = ECSLib.getUint("Level", _tileID);
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _tileID) > GameLib.getConstant("Tile", "", "Cooldown", "Upgrade", tileLevel - 1), "CURIO: Need to finish upgrading first");
        require(block.timestamp - ECSLib.getUint("LastRecovered", _tileID) > GameLib.getConstant("Tile", "", "Cooldown", "Recover", tileLevel), "CURIO: Need to finish recovering first");

        // End gather processes on tile
        uint256[] memory movableEntitiesOnTile = GameLib.getMovableEntitiesAtTile(tilePosition);
        for (uint256 i = 0; i < movableEntitiesOnTile.length; i++) {
            uint256 gatherID = GameLib.getArmyGather(movableEntitiesOnTile[i]);
            if (gatherID != NULL) GameLib.endGather(movableEntitiesOnTile[i]);
        }

        // TODO: deduct resources from, or return resources to, player inventory

        // Disown tile
        ECSLib.setUint("Nation", _tileID, NULL);
    }

    // ----------------------------------------------------------
    // PRODUCTION
    // ----------------------------------------------------------

    function startTroopProduction(
        uint256 _buildingID,
        uint256 _templateID,
        uint256 _amount
    ) external returns (uint256 productionID) {
        // Basic checks; note: msg.sender should be nation address
        GameLib.validEntityCheck(_buildingID);
        GameLib.validEntityCheck(_templateID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _buildingID);
        require(ECSLib.getAddress("Address", nationID) == msg.sender, "CURIO: You do not control this nation");

        // verify it's not being upgraded
        uint256 buildingLevel = ECSLib.getUint("Level", _buildingID);
        // Use (level - 1) because building upgrade duration is recorded using n - 1 stats
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _buildingID) > GameLib.getConstant("Capital", "", "Cooldown", "Upgrade", buildingLevel - 1), "CURIO: Need to finish upgrading first");

        // Capital at chaos cannot produce any troops
        GameLib.capitalHasRecoveredFromSack(_buildingID);

        // Verify that capital can produce
        require(ECSLib.getBool("CanProduce", _buildingID), "CURIO: Capital cannot produce");

        // Check balance sufficience and deduct costs
        uint256[] memory troopTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("TroopTemplate"));
        for (uint256 i = 0; i < troopTemplateIDs.length; i++) {
            address resourceContract = ECSLib.getAddress("Address", troopTemplateIDs[i]);
            uint256 balance = GameLib.getAddressBalance(msg.sender, resourceContract);
            uint256 cost = _amount * GameLib.getConstant("Troop Production", ECSLib.getString("InventoryType", troopTemplateIDs[i]), "Cost", "", 0);
            require(balance >= cost, "CURIO: Insufficient balance");
            (bool success, ) = resourceContract.call(abi.encodeWithSignature("destroyToken(address,uint256)", msg.sender, cost));
            require(success, "CURIO: token burn fails");
        }

        // Verify no ongoing production
        require(GameLib.getBuildingProduction(_buildingID) == NULL, "CURIO: Need to finish existing production first");

        // Start production
        return Templates.addTroopProduction(_buildingID, _templateID, _amount, gs().worldConstants.secondsToTrainAThousandTroops * (_amount / 1000));
    }

    function endTroopProduction(uint256 _buildingID, uint256 _productionID) public {
        // Basic checks; note: msg.sender here should be nation address
        GameLib.validEntityCheck(_buildingID);
        GameLib.validEntityCheck(_productionID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _buildingID);
        require(ECSLib.getAddress("Address", nationID) == msg.sender, "CURIO: You do not control this nation");

        // verify it's not being upgraded
        uint256 buildingLevel = ECSLib.getUint("Level", _buildingID);
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _buildingID) > GameLib.getConstant("Capital", "", "Cooldown", "Upgrade", buildingLevel - 1), "CURIO: Need to finish upgrading first");

        // capital at chaos cannot collect troops
        GameLib.capitalHasRecoveredFromSack(_buildingID);

        // Verify that enough time has passed for the given amount
        require(block.timestamp >= (ECSLib.getUint("InitTimestamp", _productionID) + ECSLib.getUint("Duration", _productionID)), "CURIO: Need more time for production");

        // Update inventory
        address troopContract = ECSLib.getAddress("Address", ECSLib.getUint("Template", _productionID));
        (bool success, ) = troopContract.call(abi.encodeWithSignature("dripToken(address,uint256)", msg.sender, ECSLib.getUint("Amount", _productionID)));
        require(success, "Curio: Failed to drip troop tokens");

        // Delete production
        ECSLib.removeEntity(_productionID);
    }

    function startGather(uint256 _armyID, uint256 _resourceID) external {
        // Basic Check; note: msg.sender should be the army itself
        GameLib.validEntityCheck(_armyID);
        GameLib.validEntityCheck(_resourceID);
        GameLib.ongoingGameCheck();
        require(ECSLib.getAddress("Address", _armyID) == msg.sender, "You do not control this army");

        // Verify that army is sitting on the resource
        Position memory startPosition = GameLib.getProperTilePosition(ECSLib.getPosition("Position", _armyID));
        require(GameLib.coincident(startPosition, ECSLib.getPosition("StartPosition", _resourceID)), "CURIO: Army must be on resource tile");
        // Verify that the resource level is greater than zero, meaning that a gold mine has "been built".
        require(ECSLib.getUint("Level", _resourceID) == 0, "CURIO: Resource already upgraded");
        // Verify that resource is not in another player's territory
        uint256 tileID = GameLib.getTileAt(startPosition);
        GameLib.neutralOrOwnedEntityCheck(tileID, ECSLib.getUint("Nation", _armyID));
        // Cannot gather twice
        require(GameLib.getArmyGather(_armyID) == NULL, "CURIO: Must finish existing gather first");
        // Verify that the army's capacity isn't full
        // TODO
        // string memory subject = ECSLib.getUint("Template", _resourceID) == gs().templates["Gold"] ? "Goldmine" : "Farm";
        Templates.addResourceGather(startPosition, _resourceID, _armyID);
    }

    function endGather(uint256 _armyID) external {
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();

        // End gather
        GameLib.endGather(_armyID);
    }

    function unloadResources(uint256 _armyID) external {
        // Basic checks; note: msg.sneder should be the army
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();
        require(ECSLib.getAddress("Address", _armyID) == msg.sender, "CURIO: You do not control this army");

        // Verify tile ownership
        Position memory startPosition = ECSLib.getPosition("StartPosition", _armyID);
        uint256 nationID = ECSLib.getUint("Nation", _armyID);

        // Verify that army is in capital tile
        uint256 capitalID = GameLib.getCapital(nationID);
        require(GameLib.coincident(ECSLib.getPosition("StartPosition", capitalID), startPosition), "CURIO: Must be on capital to unload");

        // Army cannot unload resources to chaotic capital
        GameLib.capitalHasRecoveredFromSack(capitalID);

        // Return carried resources to capital
        address nationAddress = ECSLib.getAddress("Address", ECSLib.getUint("Nation", _armyID));
        GameLib.unloadResources(nationAddress, ECSLib.getAddress("Address", _armyID));
    }

    function harvestResource(uint256 _resourceID) public {
        // Basic checks; note: msg.sender should be nation
        GameLib.validEntityCheck(_resourceID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _resourceID);
        require(ECSLib.getAddress("Address", nationID) == msg.sender, "CURIO: You do not control this resource");

        // Capital at chaos cannot harvest resources
        GameLib.capitalHasRecoveredFromSack(GameLib.getCapital(nationID));

        // Verify that the resource level is greater than zero, meaning that a tool has "been built".
        uint256 resourceLevel = ECSLib.getUint("Level", _resourceID);
        require(resourceLevel > 0, "CURIO: Need to upgrade resource to harvest");

        // Verify it's not being upgraded
        uint256 templateID = ECSLib.getUint("Template", _resourceID);
        string memory buildingType = templateID == gs().templates["Gold"] ? "Goldmine" : "Farm";
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _resourceID) > GameLib.getConstant(buildingType, "", "Cooldown", "Upgrade", resourceLevel - 1), "CURIO: Need to finish upgrading first");

        // Get harvest amount
        uint256 harvestRate = GameLib.getConstant(buildingType, ECSLib.getString("InventoryType", templateID), "Yield", "", resourceLevel);
        uint256 harvestAmount = (block.timestamp - ECSLib.getUint("LastHarvested", _resourceID)) * harvestRate;
        uint256 harvestMaxLoad = GameLib.getConstant(buildingType, ECSLib.getString("InventoryType", ECSLib.getUint("Template", _resourceID)), "Load", "", resourceLevel);

        harvestAmount = GameLib.min(harvestMaxLoad, harvestAmount);

        // Update last harvest
        ECSLib.setUint("LastHarvested", _resourceID, block.timestamp);

        // Update capital inventory amount
        address tokenContract = ECSLib.getAddress("Address", templateID);
        (bool success, ) = tokenContract.call(abi.encodeWithSignature("dripToken(address,uint256)", msg.sender, harvestAmount));
        require(success, "CURIO: Failed to drip resource tokens");
    }

    // FIXME: need to set LastRecovered of a nation's resources when chaos starts
    function harvestResources(uint256[] memory resourceIds) external {
        // note: msg.sender should be the nation address
        for (uint256 i = 0; i < resourceIds.length; i++) {
            harvestResource(resourceIds[i]);
        }
    }

    // TODO: harvest gold & food on a capital; consider merge this with the function above
    function harvestResourcesFromCapital(uint256 _buildingID) public {
        // Basic Check; note: msg.sender should be the nation address
        GameLib.validEntityCheck(_buildingID);
        uint256 nationID = ECSLib.getUint("Nation", _buildingID);
        require(ECSLib.getAddress("Address", nationID) == msg.sender, "CURIO: You do not control this nation");

        // Verify that capital belongs to player
        uint256 capitalID = GameLib.getCapital(nationID);

        // capital at Chaos cannot harvest anything
        GameLib.capitalHasRecoveredFromSack(capitalID);

        // Verify it's not being upgraded; note: capital level is same as nation level here
        uint256 capitalLevel = ECSLib.getUint("Level", nationID);
        if (capitalLevel < gs().worldConstants.maxCapitalLevel) {
            require(block.timestamp - ECSLib.getUint("LastUpgraded", _buildingID) > GameLib.getConstant("Capital", "", "Cooldown", "Upgrade", capitalLevel - 1), "CURIO: Need to finish upgrading first");
        }

        // Create inventory if none exists
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            uint256 harvestRate = GameLib.getConstant("Capital", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Yield", "", capitalLevel);
            address tokenContract = ECSLib.getAddress("Address", resourceTemplateIDs[i]);
            uint256 harvestAmount = (block.timestamp - ECSLib.getUint("LastHarvested", _buildingID)) * harvestRate;
            uint256 harvestMaxLoad = GameLib.getConstant("Capital", ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Load", "", capitalLevel);

            harvestAmount = GameLib.min(harvestMaxLoad, harvestAmount);

            (bool success, ) = tokenContract.call(abi.encodeWithSignature("dripToken(address,uint256)", ECSLib.getAddress("Address", nationID), harvestAmount));
            require(success, "CURIO: harvestResourcesFromCapital transfer fails");
        }

        // Reset harvest time
        ECSLib.setUint("LastHarvested", _buildingID, block.timestamp);
    }

    // ----------------------------------------------------------
    // BATTLE
    // ----------------------------------------------------------

    function organizeArmy(
        uint256 _capitalID,
        uint256 _armyID,
        uint256[] memory _templateIDs,
        uint256[] memory _amounts
    ) external {
        // Basic checks; note: msg.sender should be nation
        GameLib.validEntityCheck(_capitalID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _capitalID);
        address nationAddress = ECSLib.getAddress("Address", nationID);
        require(nationAddress == msg.sender, "CURIO: You do not control this nation");
        require(ECSLib.getUint("Nation", _armyID) == nationID, "CURIO: Cannot organize army of different nation");

        // Check that army does not yet have position component; fixme: potential edges cases here
        require(GameLib.coincident(ECSLib.getPosition("Position", _armyID), Position({x: 0, y: 0})), "CURIO: Army already organized");

        // Verify there is no army currently at the capital
        Position memory tilePosition = ECSLib.getPosition("StartPosition", _capitalID);
        Position memory midPosition = GameLib.getMidPositionFromTilePosition(tilePosition);
        require(GameLib.getArmyAt(midPosition) == NULL, "CURIO: Capital occupied by another army");

        // Capital at Chaos cannot organize an army
        GameLib.capitalHasRecoveredFromSack(_capitalID);

        // Collect army traits from individual troop types & transfer troops from nation
        {
            uint256 load = 0; // sum
            address armyAddress = ECSLib.getAddress("Address", _armyID);

            require(_templateIDs.length == _amounts.length, "CURIO: Input lengths do not match");
            require(_templateIDs.length > 0, "CURIO: Army must have at least 1 troop");

            for (uint256 i = 0; i < _templateIDs.length; i++) {
                address tokenContract = ECSLib.getAddress("Address", _templateIDs[i]);
                // require(tokenContract.checkBalanceOf(msg.sender) >= _amounts[i], "CURIO: Need to produce more troops");

                load += ECSLib.getUint("Load", _templateIDs[i]) * _amounts[i];
                (bool success, ) = tokenContract.call(abi.encodeWithSignature("transferFrom(address,address,uint256)", nationAddress, armyAddress, _amounts[i]));
                require(success, "CURIO: organizeArmy transfer fails");
            }

            // Edit army traits
            ECSLib.setUint("Load", _armyID, load);
        }

        // Set Army Position & CanBattle
        ECSLib.setBool("CanBattle", _armyID);
        ECSLib.setPosition("Position", _armyID, midPosition);
        ECSLib.setPosition("StartPosition", _armyID, tilePosition);
    }

    function disbandArmy(uint256 _armyID) external {
        // Basic checks; note: message.sender should be army
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();
        address armyWalletAddress = ECSLib.getAddress("Address", _armyID);
        require(armyWalletAddress == msg.sender, "CURIO: You do not control this army");

        // Verify tile ownership
        Position memory armyPosition = ECSLib.getPosition("Position", _armyID);
        Position memory armyStartPosition = GameLib.getProperTilePosition(armyPosition);

        // Verify that army is on capital tile
        uint256 armyNationID = ECSLib.getUint("Nation", _armyID);
        uint256 capitalID = GameLib.getCapital(armyNationID);
        require(GameLib.coincident(ECSLib.getPosition("StartPosition", capitalID), armyStartPosition), "CURIO: Army must be on capital to disband");

        address nationWalletAddress = ECSLib.getAddress("Address", armyNationID);

        // Return carried resources to capital
        GameLib.unloadResources(nationWalletAddress, armyWalletAddress);

        // Return troops to corresponding inventories and disband army
        GameLib.disbandArmy(nationWalletAddress, armyWalletAddress);
        ECSLib.removeComponentValue("Position", _armyID);
        ECSLib.removeComponentValue("CanBattle", _armyID);
    }

    /**
     * @dev One round of battle against an army, a tile, or a tile with a capital.
     * @param _armyID army entity
     * @param _targetID target entity
     */
    function battle(uint256 _armyID, uint256 _targetID) external {
        // Basic checks; note: msg.sender is army wallet
        GameLib.validEntityCheck(_armyID);
        GameLib.validEntityCheck(_targetID);
        GameLib.ongoingGameCheck();

        address armyAddress = ECSLib.getAddress("Address", _armyID);
        require(armyAddress == msg.sender, "CURIO: You do not control this army");

        // Verify that army and target can battle
        require(ECSLib.getBool("CanBattle", _armyID), "CURIO: Army cannot battle");
        require(ECSLib.getBool("CanBattle", _targetID), "CURIO: Target cannot battle");

        // Verify that entities belong to different nations
        uint256 armyNationID = ECSLib.getUint("Nation", _armyID);
        require(ECSLib.getUint("Nation", _targetID) != armyNationID, "CURIO: Cannot battle entity of same nation");

        // Check battle cooldown and update last timestamp
        require(block.timestamp >= ECSLib.getUint("LastAttacked", _armyID) + ECSLib.getUint("BattleCooldown", _armyID), "CURIO: Battled too recently");
        ECSLib.setUint("LastAttacked", _armyID, block.timestamp);

        // End army's gather
        // if (GameLib.getArmyGather(_armyID) != NULL) GameLib.endGather(_armyID);

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
        // if (GameLib.getArmyGather(_targetArmyID) != NULL) GameLib.endGather(_targetArmyID);

        // Execute one round of battle
        bool victory = GameLib.attack(_armyID, _targetArmyID, true, false, true);
        if (!victory) GameLib.attack(_targetArmyID, _armyID, true, false, true);
    }

    function _battleTile(uint256 _armyID, uint256 _tileID) private {
        // Verify that army and tile are adjacent
        require(
            GameLib.euclidean(ECSLib.getPosition("Position", _armyID), GameLib.getMidPositionFromTilePosition(ECSLib.getPosition("StartPosition", _tileID))) <= ECSLib.getUint("AttackRange", _armyID), //
            "CURIO: Attack out of range"
        );
        // Verify that target tile doesn't have guard left
        address tileAddress = ECSLib.getAddress("Address", _tileID);
        address guardTokenAddress = GameLib.getTokenContract("Guard");
        require(GameLib.getAddressBalance(tileAddress, guardTokenAddress) != 0, "CURIO: defender subjugated, claim tile instead");

        uint256 capitalID = GameLib.getCapital(ECSLib.getUint("Nation", _tileID));
        // Others cannot attack cities at chaos
        GameLib.capitalHasRecoveredFromSack(GameLib.getCapital(capitalID));

        // if it is the super tile, check that it's active
        if (GameLib.coincident(ECSLib.getPosition("StartPosition", _tileID), GameLib.getMapCenterTilePosition())) {
            // todo: end game when players occupy it for a certain period of time
            require(block.timestamp >= ECSLib.getUint("LastRecovered", _tileID), "Curio: Supertile is not active yet");
        }

        // if it is barbarian, check it's not hybernating
        if (GameLib.isBarbarian(_tileID)) {
            uint256 barbarianCooldown = GameLib.getConstant("Barbarian", "", "Cooldown", "", 0);
            require(block.timestamp >= ECSLib.getUint("LastRecovered", _tileID) + barbarianCooldown, "CURIO: Barbarians hybernating, need to wait");
        }

        // Execute one round of battle
        bool victory = GameLib.attack(_armyID, _tileID, false, false, false);
        if (victory) {
            if (capitalID != NULL) {
                // Victorious against capital, add back some guards for the loser
                (bool success, ) = guardTokenAddress.call(
                    abi.encodeWithSignature(
                        "dripToken(address,uint256)",
                        tileAddress,
                        GameLib.getConstant("Tile", "Guard", "Amount", "", ECSLib.getUint("Level", capitalID)) // FORMATTING COMMENT, DO NOT REMOVE
                    )
                );
                require(success, "CURIO: Failed to drip guard tokens");

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
                    ECSLib.setUint("LastRecovered", _tileID, block.timestamp);
                    (bool success, ) = guardTokenAddress.call(abi.encodeWithSignature("dripToken(address,uint256)", tileAddress, barbarianGuardAmount));
                    require(success, "CURIO: Failed to drip Barbarian tokens");
                } else {
                    // Neutralize tile & resource
                    uint256 resourceID = GameLib.getResourceAt(ECSLib.getPosition("StartPosition", _tileID));
                    ECSLib.setUint("Nation", _tileID, NULL);
                    ECSLib.setUint("Nation", resourceID, NULL);
                }
            }
        } else {
            // todo: if tile wins against army, army's resource goes to tile's nation
            GameLib.attack(_tileID, _armyID, false, false, true);
        }
    }

    function claimTile(uint256 _armyID, uint256 _tileID) public {
        // Basic checks; note: msg.sender should be army wallet
        GameLib.validEntityCheck(_tileID);
        GameLib.ongoingGameCheck();
        require(ECSLib.getAddress("Address", _armyID) == msg.sender, "CURIO: You do not control this army");

        // Check Tile Count has not exceeded limits
        uint256 nationID = ECSLib.getUint("Nation", _armyID);
        require(GameLib.getNationTiles(nationID).length < GameLib.getConstant("Nation", "Tile", "Amount", "", ECSLib.getUint("Level", nationID)), "CURIO: Reached max tile count");

        // Verify target tile has no owner
        require(ECSLib.getUint("Nation", _tileID) == NULL, "CURIO: Tile has owner");

        // Verify target tile is not barbarian tile
        require(!GameLib.isBarbarian(_tileID), "CURIO: Cannot claim barbarian tiles");

        // Verify that no guard exists on tile
        require(GameLib.getAddressBalance(ECSLib.getAddress("Address", _tileID), GameLib.getTokenContract("Guard")) == 0, "CURIO: Tile has guard");

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
        address tokenContract = GameLib.getTokenContract("Guard");
        (bool success, ) = tokenContract.call(abi.encodeWithSignature("dripToken(address,uint256)", ECSLib.getAddress("Address", _tileID), tileGuardAmount));
        require(success, "CURIO: Failed to drip Guard tokens");

        // Transfer ownership of resource;
        uint256 resourceID = GameLib.getResourceAt(tilePosition);
        ECSLib.setUint("Nation", resourceID, nationID);
    }

    function upgradeResource(uint256 _resourceID) public {
        // Basic Check; note: msg.sender should be its nation
        GameLib.validEntityCheck(_resourceID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _resourceID);
        require(ECSLib.getAddress("Address", nationID) == msg.sender, "CURIO: You do not control this resource");

        // Check if player has reached max tile level
        require(ECSLib.getUint("Level", _resourceID) < ECSLib.getUint("Level", nationID) * gs().worldConstants.capitalLevelToEntityLevelRatio, "CURIO: Need to upgrade nation first");

        uint256 resourceLevel = ECSLib.getUint("Level", _resourceID);

        // check if upgrade is in process
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        string memory subject = ECSLib.getUint("Template", _resourceID) == gs().templates["Gold"] ? "Goldmine" : "Farm";
        require(block.timestamp - ECSLib.getUint("LastUpgraded", _resourceID) > GameLib.getConstant(subject, "", "Cooldown", "Upgrade", resourceLevel), "CURIO: Need to finish upgrading first");

        // Deduct costs and set load
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            address resourceContract = ECSLib.getAddress("Address", resourceTemplateIDs[i]);
            uint256 balance = GameLib.getAddressBalance(msg.sender, resourceContract);
            uint256 cost = GameLib.getConstant(subject, ECSLib.getString("InventoryType", resourceTemplateIDs[i]), "Cost", "Upgrade", resourceLevel);
            require(balance >= cost, "CURIO: Insufficient balance");
            (bool success, ) = resourceContract.call(abi.encodeWithSignature("destroyToken(address,uint256)", msg.sender, cost));
            require(success, "CURIO: token burn fails");
        }

        // todo: harvest resource before upgrade

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
