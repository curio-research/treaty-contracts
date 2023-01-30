//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {DiamondDeployTest} from "test/DiamondDeploy.t.sol";
import {UpgradedFacet} from "test/UpgradedFacet.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent} from "contracts/TypedComponents.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {CurioWallet} from "contracts/standards/CurioWallet.sol";
import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {IDiamondCut} from "contracts/interfaces/IDiamondCut.sol";
import {console} from "forge-std/console.sol";
import {Strings} from "openzeppelin-contracts/contracts/utils/Strings.sol";

contract GameTest is Test, DiamondDeployTest {
    // GameFacet Coverage Overview
    //
    // Nation:
    // - [x] joinGame
    // Capital:
    // - [x] upgradeCapital
    // - [x] moveCapital
    // Tile:
    // - [x] claimTile
    // - [x] upgradeTile
    // - [x] recoverTile
    // - [x] disownTile
    // Production:
    // - [x] startTroopProduction
    // - [x] stopTroopProduction
    // - [x] endTroopProduction
    // Army:
    // - [x] move
    // - [x] organizeArmy
    // - [x] disbandArmy
    // Resource:
    // - [x] startGather
    // - [x] endGather
    // - [x] unloadResources
    // - [x] harvestResource
    // - [x] harvestResourceFromCapital
    // - [x] upgradeResource
    // Battle:
    // - [x] battle (army vs. army)
    // - [x] battle (army vs. tile)
    // Treaty:
    // - [x] delegateGameFunction

    function testInitialization() public {
        // Verify that wallet address is loaded correctly
        assertEq(getter.getAddress(nation1CapitalID), nation1CapitalAddr);

        // Verify that capital is established correctly
        Position memory nation1CapitalPosition = getter.getPositionExternal("StartPosition", nation1CapitalID);
        Position memory nation2CapitalPosition = getter.getPositionExternal("StartPosition", nation2CapitalID);

        assertEq(nation1CapitalPosition.x, nation1Pos.x);
        assertEq(nation1CapitalPosition.y, nation1Pos.y);

        assertEq(getter.getNation(nation1CapitalID), nation1ID);
        assertEq(abi.decode(getter.getComponent("Name").getBytesValue(nation1ID), (string)), "Nation 1");

        // Verify that tile is initialized correctly
        uint256 nation1CapitalTile = getter.getTileAt(nation1CapitalPosition);
        assertEq(getter.getNation(nation1CapitalTile), nation1ID);

        // Verify that TileGuard tokens are dripped to tile wallet
        uint256 correctTileGuardAmount = getter.getGameParameter("Tile", "Guard", "Amount", "", getter.getEntityLevel(nation1CapitalTile));
        assertEq(guardToken.balanceOf(getter.getAddress(nation1CapitalTile)), correctTileGuardAmount);

        uint256 nation2CapitalTile = getter.getTileAt(nation2CapitalPosition);
        assertEq(getter.getNation(nation2CapitalTile), nation2ID);

        // Verify that no armies are initialized
        uint256[] memory nation1ArmyIDs = getter.getNationArmies(nation1ID);
        assertEq(nation1ArmyIDs.length, 0);
    }

    function testTiles() public {
        uint256 time = block.timestamp + 1000;
        vm.warp(time);
        uint256 level1TileUpgradeGoldCost = getter.getGameParameter("Tile", "Gold", "Cost", "Upgrade", 1);
        console.log("Level 1 tile upgrade gold cost is", level1TileUpgradeGoldCost);

        // Deployer drip resources to Nation 1's capital
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Gold", 100000000);
        admin.dripToken(nation1CapitalAddr, "Food", 100000000);
        vm.stopPrank();

        // Verify tile ownership and level
        uint256 nation1CapitalTileID = getter.getTileAt(nation1Pos);
        assertEq(abi.decode(getter.getComponent("Nation").getBytesValue(nation1CapitalTileID), (uint256)), nation1ID);
        assertEq(abi.decode(getter.getComponent("Level").getBytesValue(nation1CapitalTileID), (uint256)), 1);

        // Nation 1 upgrades capital tile
        vm.startPrank(player1);
        game.upgradeTile(nation1CapitalTileID);
        vm.stopPrank();
        assertEq(abi.decode(getter.getComponent("Level").getBytesValue(nation1CapitalTileID), (uint256)), 2);
        assertEq(goldToken.balanceOf(nation1CapitalAddr), 100000000 - level1TileUpgradeGoldCost);
    }

    function testGameParameter() public {
        string memory identifier = "Goldmine-Gold-Yield--1";
        uint256 newValue = 1000;

        // Verify original state
        uint256 parameterID = getter.getComponent("Tag").getEntitiesWithValue(abi.encode(identifier))[0];
        uint256 oldValue = abi.decode(getter.getComponent("Amount").getBytesValue(parameterID), (uint256));
        assertTrue(oldValue != newValue);

        // Set new value
        vm.prank(deployer);
        admin.setGameParameter(identifier, newValue);

        // Verify new state
        assertEq(abi.decode(getter.getComponent("Amount").getBytesValue(parameterID), (uint256)), newValue);
    }

    function testBarbarianReward() public {
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Verify that barbarian tile is initialized correctly
        uint256 barbarinaTileID = getter.getTileAt(barbarinaTilePos);
        address barbarinaTileAddr = getter.getAddress(barbarinaTileID);
        assertEq(abi.decode(getter.getComponent("Terrain").getBytesValue(barbarinaTileID), (uint256)), 4);
        assertEq(abi.decode(getter.getComponent("Level").getBytesValue(barbarinaTileID), (uint256)), 8);
        uint256 barbarianReward = getter.getGameParameter("Barbarian", "Gold", "Reward", "", 8);
        console.log("Barbarian gold reward is", barbarianReward);

        // Drip resources and troops to Nation 2's capital
        vm.startPrank(deployer);
        admin.dripToken(nation2CapitalAddr, "Horseman", 1000);
        vm.stopPrank();

        // Verify original state
        assertEq(horsemanToken.balanceOf(nation2CapitalAddr), 1000);
        assertEq(goldToken.balanceOf(nation2CapitalAddr), 0);
        assertEq(foodToken.balanceOf(nation2CapitalAddr), 0);

        vm.startPrank(player2);

        // Nation 2 organizes army 1
        uint256[] memory armyTemplateIDs = new uint256[](1);
        armyTemplateIDs[0] = horsemanTemplateID;
        uint256[] memory templateAmounts = new uint256[](1);
        templateAmounts[0] = 150;
        uint256 army1ID = game.organizeArmy(nation2CapitalID, armyTemplateIDs, templateAmounts);

        // Verify that army 1 is at (62, 32)
        Position memory army1Position = getter.getPositionExternal("Position", army1ID);
        assertEq(army1Position.x, 62);
        assertEq(army1Position.y, 32);

        // Nation 2 moves army 1 from (62, 32) to (62, 48)
        for (uint256 i = 1; i <= 8; i++) {
            time += 1;
            vm.warp(time);
            game.move(army1ID, Position({x: 62, y: 32 + 2 * i}));
        }

        // Verify that army 1 is at (62, 48)
        army1Position = getter.getPositionExternal("Position", army1ID);
        assertEq(army1Position.x, 62);
        assertEq(army1Position.y, 48);

        // Nation 2 organizes army 2
        uint256 army2ID = game.organizeArmy(nation2CapitalID, armyTemplateIDs, templateAmounts);

        // Nation 2 moves army 2 from (62, 32) to (62, 49)
        for (uint256 i = 1; i <= 7; i++) {
            time += 1;
            vm.warp(time);
            game.move(army2ID, Position({x: 62, y: 32 + 2 * i}));
        }
        time += 1;
        vm.warp(time);
        game.move(army2ID, Position({x: 62, y: 47}));
        time += 1;
        vm.warp(time);
        game.move(army2ID, Position({x: 62, y: 49}));

        // Nation 2 uses both armies to subjugate barbarian at tile position (60, 50)
        time += 2;
        vm.warp(time);
        uint256 barbarinaFullHealth = guardToken.balanceOf(barbarinaTileAddr);
        game.battle(army2ID, barbarinaTileID);

        while (guardToken.balanceOf(barbarinaTileAddr) < barbarinaFullHealth) {
            time += 2;
            vm.warp(time);
            game.battle(army1ID, barbarinaTileID);
            if (guardToken.balanceOf(barbarinaTileAddr) == barbarinaFullHealth) break;
            game.battle(army2ID, barbarinaTileID);
        }

        // Verify that barbarian reward is received
        assertEq(goldToken.balanceOf(nation2CapitalAddr), barbarianReward);

        vm.stopPrank();
    }

    function testOrganizeDisbandMoveArmy() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 1000;
        // Deployer transfer enough gold & food to nation 1
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation1CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation1CapitalAddr, "Slinger", 1000);

        assertEq(warriorToken.balanceOf(nation1CapitalAddr), 1000);
        assertEq(horsemanToken.balanceOf(nation1CapitalAddr), 1000);
        assertEq(slingerToken.balanceOf(nation1CapitalAddr), 1000);

        vm.stopPrank();
        // Nation 1 organize army
        vm.startPrank(player1);

        uint256 nation1CapitalID = getter.getCapital(nation1ID);

        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory templateAmounts = new uint256[](3);
        templateAmounts[0] = 50;
        templateAmounts[1] = 50;
        templateAmounts[2] = 50;
        vm.warp(time + 10);
        time += 10;

        uint256 army11ID = game.organizeArmy(nation1CapitalID, armyTemplateIDs, templateAmounts);
        address army11Addr = getter.getAddress(army11ID);
        assertEq(warriorToken.balanceOf(nation1CapitalAddr) + warriorToken.balanceOf(army11Addr), 1000);
        assertEq(slingerToken.balanceOf(nation1CapitalAddr) + warriorToken.balanceOf(army11Addr), 1000);
        assertEq(horsemanToken.balanceOf(nation1CapitalAddr) + warriorToken.balanceOf(army11Addr), 1000);

        vm.warp(time + 10);
        time += 10;
        game.move(army11ID, Position({x: 63, y: 13}));
        assertEq(getter.getPositionExternal("Position", army11ID).x, 63);
        assertEq(getter.getPositionExternal("Position", army11ID).y, 13);

        vm.warp(time + 10);
        time += 10;
        game.move(army11ID, Position({x: 62, y: 12}));

        vm.warp(time + 10);
        time += 10;
        game.disbandArmy(army11ID);
        assertEq(warriorToken.balanceOf(army11Addr), 0);
        assertEq(slingerToken.balanceOf(army11Addr), 0);
        assertEq(horsemanToken.balanceOf(army11Addr), 0);
        assertEq(warriorToken.balanceOf(nation1CapitalAddr), 1000);
        assertEq(slingerToken.balanceOf(nation1CapitalAddr), 1000);
        assertEq(horsemanToken.balanceOf(nation1CapitalAddr), 1000);
    }

    function testBattleArmy() public {
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Deployer transfer enough gold & food to nation 1 & 2
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation1CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation1CapitalAddr, "Slinger", 1000);
        admin.dripToken(nation2CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation2CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation2CapitalAddr, "Slinger", 1000);

        vm.stopPrank();

        // Nation 1 organize army
        vm.startPrank(player1);

        uint256 nation1CapitalID = getter.getCapital(nation1ID);

        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 50;
        armyTemplateAmounts[1] = 50;
        armyTemplateAmounts[2] = 50;
        time += 10;
        vm.warp(time);

        time += 10;
        vm.warp(time);

        uint256 army11ID = game.organizeArmy(nation1CapitalID, armyTemplateIDs, armyTemplateAmounts);
        address army11Addr = getter.getAddress(army11ID);

        // Nation 1 move army
        vm.warp(time + 10);
        time += 10;
        game.move(army11ID, Position({x: 60, y: 12}));

        vm.warp(time + 10);
        time += 10;
        game.move(army11ID, Position({x: 60, y: 14}));

        vm.warp(time + 10);
        time += 10;
        game.move(army11ID, Position({x: 60, y: 16}));

        vm.warp(time + 10);
        time += 10;
        game.move(army11ID, Position({x: 60, y: 18}));

        vm.stopPrank();

        // Nation 2 organize army
        vm.startPrank(player2);

        uint256 nation2CapitalID = getter.getCapital(nation2ID);

        vm.warp(time + 10);
        time += 10;
        uint256 army21ID = game.organizeArmy(nation2CapitalID, armyTemplateIDs, armyTemplateAmounts);
        address army21Addr = getter.getAddress(army21ID);

        vm.warp(time + 10);
        time += 10;
        game.move(army21ID, Position({x: 60, y: 30}));

        vm.warp(time + 10);
        time += 10;
        game.move(army21ID, Position({x: 60, y: 28}));

        vm.warp(time + 10);
        time += 10;
        game.move(army21ID, Position({x: 60, y: 26}));

        vm.warp(time + 10);
        time += 10;
        game.move(army21ID, Position({x: 60, y: 24}));

        vm.warp(time + 10);
        time += 10;
        game.move(army21ID, Position({x: 60, y: 22}));

        vm.stopPrank();

        // give army 11 some resources to test if it goes to army 21
        vm.startPrank(deployer);
        admin.dripToken(army11Addr, "Gold", 1000);
        admin.dripToken(army11Addr, "Food", 1000);

        vm.stopPrank();

        vm.startPrank(player2);

        while (slingerToken.balanceOf(army11Addr) > 0) {
            vm.warp(time + 10);
            time += 10;
            game.battle(army21ID, army11ID);
        }

        vm.stopPrank();
        assertEq(warriorToken.balanceOf(army11Addr), 0);
        assertEq(horsemanToken.balanceOf(army11Addr), 0);
        assertEq(slingerToken.balanceOf(army11Addr), 0);
        assertEq(goldToken.balanceOf(army11Addr), 0);
        assertEq(foodToken.balanceOf(army11Addr), 0);

        // Note: resource successfully transferred to army 21
        assertEq(goldToken.balanceOf(army21Addr), 1000);
        assertEq(foodToken.balanceOf(army21Addr), 1000);
    }

    function testUpgradeCapitalBattleClaimTileMoveCapital() public {
        uint256 time = block.timestamp + 1000;

        // Deployer transfer enough gold & food to nation 1 & 2
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation1CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation1CapitalAddr, "Slinger", 1000);
        admin.dripToken(nation1CapitalAddr, "Food", 100000000);
        admin.dripToken(nation1CapitalAddr, "Gold", 100000000);

        admin.dripToken(nation2CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation2CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation2CapitalAddr, "Slinger", 1000);

        vm.stopPrank();

        // Nation 1 organize army
        vm.startPrank(player1);

        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 50;
        armyTemplateAmounts[1] = 50;
        armyTemplateAmounts[2] = 50;
        vm.warp(time + 10);
        time += 10;
        uint256 army11ID = game.organizeArmy(nation1CapitalID, armyTemplateIDs, armyTemplateAmounts);

        vm.warp(time + 10);
        time += 10;
        game.move(army11ID, Position({x: 60, y: 10}));

        vm.warp(time + 10);
        time += 10;
        game.move(army11ID, Position({x: 60, y: 8}));

        vm.warp(time + 10);
        time += 10;
        Position memory targetTilePos = Position({x: 60, y: 5});
        uint256 targetTileID = getter.getTileAt(targetTilePos);
        address targetTileAddress = getter.getAddress(targetTileID);

        uint256 army12ID = game.organizeArmy(nation1CapitalID, armyTemplateIDs, armyTemplateAmounts);
        time += 1;
        vm.warp(time);
        game.move(army12ID, Position({x: 62, y: 10}));

        time += 1;
        vm.warp(time);
        game.move(army12ID, Position({x: 62, y: 8}));

        while (guardToken.balanceOf(targetTileAddress) > 0) {
            vm.warp(time + 10);
            time += 10;
            game.battle(army11ID, targetTileID);
            game.battle(army12ID, targetTileID);
        }
        assertEq(guardToken.balanceOf(targetTileAddress), 0);

        time += 10;
        vm.warp(time);
        game.upgradeCapital(nation1CapitalID);
        game.claimTile(army11ID, targetTileID);

        assertEq(getter.getEntityLevel(nation1CapitalID), 2);
        assertEq(getter.getNation(targetTileID), nation1ID);

        // Nation 1 move capital to new tile
        time += 36000;
        vm.warp(time);
        assertTrue(getter.getResourceAtTile(targetTilePos) > 0);
        game.moveCapital(nation1CapitalID, targetTilePos);
        assertEq(getter.getResourceAtTile(targetTilePos), 0);

        // Nation 1 upgrades farm at old capital position
        time += 10;
        vm.warp(time);
        uint256 farmID = getter.getResourceAtTile(nation1Pos);
        assertEq(abi.decode(getter.getComponent("Nation").getBytesValue(farmID), (uint256)), nation1ID);
        game.upgradeResource(farmID);
        vm.stopPrank();
    }

    function testRecoverAndDisownTile() public {
        // Start time and get constants
        uint256 time = block.timestamp + 1000;
        vm.warp(time);
        Position memory tilePos = Position({x: 60, y: 20});
        uint256 tileID = getter.getTileAt(tilePos);
        assertEq(getter.getNation(tileID), 0);
        uint256 level1TileGuardAmount = getter.getGameParameter("Tile", "Guard", "Amount", "", 1);
        assertTrue(level1TileGuardAmount > 0);

        // Deployer gifts tile and resources to Nation 1, army to Nation 2
        vm.startPrank(deployer);
        admin.giftTileAndResourceAt(tilePos, nation1ID);
        admin.dripToken(nation1CapitalAddr, "Gold", 100000000);
        admin.dripToken(nation1CapitalAddr, "Food", 100000000);
        uint256 nation2ArmyID = admin.giftNewArmy(nation2ID, Position({x: 63, y: 23}));
        vm.stopPrank();

        // Verify initial conditions
        assertEq(getter.getNation(tileID), nation1ID);
        assertEq(guardToken.balanceOf(getter.getAddress(tileID)), level1TileGuardAmount);
        assertEq(getter.getArmyAt(Position({x: 63, y: 23})), nation2ArmyID);
        assertEq(horsemanToken.balanceOf(getter.getAddress(nation2ArmyID)), 100);

        // Nation 1 disowns tile
        vm.startPrank(player1);
        time += 10;
        vm.warp(time);
        game.disownTile(tileID);
        vm.stopPrank();

        // Verify tile is disowned
        assertEq(getter.getNation(tileID), 0);

        // Deployer again gifts tile to Nation 1
        vm.startPrank(deployer);
        admin.giftTileAndResourceAt(tilePos, nation1ID);
        vm.stopPrank();

        // Nation 2 attacks tile once
        vm.startPrank(player2);
        time += 10;
        vm.warp(time);
        game.battle(nation2ArmyID, tileID);
        vm.stopPrank();

        // Verify that tile is injured but not neutralized
        assertEq(getter.getNation(tileID), nation1ID);
        assertTrue(guardToken.balanceOf(getter.getAddress(tileID)) < level1TileGuardAmount);
        assertTrue(guardToken.balanceOf(getter.getAddress(tileID)) > 0);
        assertEq(goldToken.balanceOf(nation1CapitalAddr), 100000000);

        // Nation 1 recovers tile
        vm.startPrank(player1);
        time += 10;
        vm.warp(time);
        game.recoverTile(tileID);
        vm.stopPrank();

        // Verify that tile is recovered
        assertEq(getter.getNation(tileID), nation1ID);
        assertEq(guardToken.balanceOf(getter.getAddress(tileID)), level1TileGuardAmount);
        assertTrue(goldToken.balanceOf(nation1CapitalAddr) < 100000000);
    }

    function testBattleCapitalChaos() public {
        // Start time
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Deployer transfers gold, food, and troops to Nation 1 and Nation 2
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Gold", 100000000);
        admin.dripToken(nation1CapitalAddr, "Food", 100000000);
        admin.dripToken(nation1CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation1CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation1CapitalAddr, "Slinger", 1000);

        admin.dripToken(nation2CapitalAddr, "Gold", 100000000);
        admin.dripToken(nation2CapitalAddr, "Food", 100000000);
        admin.dripToken(nation2CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation2CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation2CapitalAddr, "Slinger", 1000);
        vm.stopPrank();

        // Nation 1 organizes army
        vm.startPrank(player1);

        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 50;
        armyTemplateAmounts[1] = 50;
        armyTemplateAmounts[2] = 50;
        time += 10;
        vm.warp(time);
        uint256 army11ID = game.organizeArmy(nation1CapitalID, armyTemplateIDs, armyTemplateAmounts);

        // Nation 1 moves army to (62, 29)
        for (uint256 i = 1; i <= 9; i++) {
            time += 1;
            vm.warp(time);
            game.move(army11ID, Position({x: 62, y: 11 + 2 * i}));
        }

        // Nation 1 attacks Nation 2's capital
        uint256 nation2CapitalTileID = getter.getTileAt(getter.getPositionExternal("StartPosition", nation2CapitalID));
        while (abi.decode(getter.getComponent("LastSacked").getBytesValue(nation2CapitalID), (uint256)) < time) {
            // Continue to battle until Nation 2's capital is sacked
            time += 2;
            vm.warp(time);
            game.battle(army11ID, nation2CapitalTileID);
        }
        vm.stopPrank();

        // Nation 2 fails to upgrade its capital during chaos
        vm.startPrank(player2);
        vm.expectRevert();
        game.upgradeCapital(nation2CapitalID);

        // Nation 2 upgrades its capital after chaos
        time += 1000;
        vm.warp(time);
        game.upgradeCapital(nation2CapitalID);
        vm.stopPrank();
    }

    function testHarvest() public {
        vm.startPrank(deployer);

        // this tile and its resource is next to nation1 capital
        Position memory farmTilePos = Position({x: 60, y: 5});
        admin.giftTileAndResourceAt(Position({x: 60, y: 5}), nation1ID);

        admin.dripToken(nation1CapitalAddr, "Gold", 1000000000);
        admin.dripToken(nation1CapitalAddr, "Food", 1000000000);

        vm.stopPrank();

        uint256 time = block.timestamp + 1000;
        vm.warp(time);
        vm.startPrank(player1);
        game.upgradeCapital(nation1CapitalID);
        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 capitalGoldBalance = goldToken.balanceOf(nation1CapitalAddr);
        uint256 capitalFoodBalance = foodToken.balanceOf(nation1CapitalAddr);

        time += 3600;
        vm.warp(time);
        game.harvestResourcesFromCapital(nation1CapitalID);

        uint256 goldBalance1 = goldToken.balanceOf(nation1CapitalAddr);
        uint256 foodBalance1 = foodToken.balanceOf(nation1CapitalAddr);
        assertTrue(goldBalance1 > capitalGoldBalance);
        assertTrue(foodBalance1 > capitalFoodBalance);

        uint256 farmID = getter.getResourceAtTile(farmTilePos);
        game.upgradeResource(farmID);

        uint256 foodBalance2 = foodToken.balanceOf(nation1CapitalAddr);

        time += 50;
        vm.warp(time);
        game.harvestResource(farmID);
        assertTrue(foodToken.balanceOf(nation1CapitalAddr) > foodBalance2);
    }

    function testGather() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Deployer transfer enough gold & food to nation 1 & 2
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation1CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation1CapitalAddr, "Slinger", 1000);

        vm.stopPrank();

        // Nation 1 organize army
        vm.startPrank(player1);

        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 50;
        armyTemplateAmounts[1] = 50;
        armyTemplateAmounts[2] = 50;

        vm.warp(time + 10);
        time += 10;
        uint256 army11ID = game.organizeArmy(nation1CapitalID, armyTemplateIDs, armyTemplateAmounts);
        address army11Addr = getter.getAddress(army11ID);

        vm.warp(time + 10);
        time += 10;
        game.move(army11ID, Position({x: 60, y: 10}));

        vm.warp(time + 10);
        time += 10;
        game.move(army11ID, Position({x: 60, y: 8}));

        vm.warp(time + 10);
        time += 10;
        Position memory targetTilePos = Position({x: 60, y: 5});
        uint256 resourceID = getter.getResourceAtTile(targetTilePos);

        // Army Gather Food
        game.startGather(army11ID, resourceID);
        vm.warp(time + 50);
        time += 50;
        console.log("before gather food", foodToken.balanceOf(army11Addr));
        game.endGather(army11ID);
        uint256 armyFoodBalance = foodToken.balanceOf(army11Addr);
        console.log("after gather food", armyFoodBalance);
        assertTrue(armyFoodBalance > 0);

        vm.warp(time + 10);
        time += 10;
        game.move(army11ID, Position({x: 60, y: 10}));

        vm.warp(time + 10);
        time += 10;
        game.move(army11ID, Position({x: 60, y: 12}));
        game.unloadResources(army11ID);
        assertEq(foodToken.balanceOf(army11Addr), 0);
        assertEq(foodToken.balanceOf(nation1CapitalAddr), armyFoodBalance);
    }

    function testTroopProduction() public {
        // Start time
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Deployer drips gold and food to Nation 1
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Gold", 100000000);
        admin.dripToken(nation1CapitalAddr, "Food", 100000000);
        assertEq(horsemanToken.balanceOf(nation1CapitalAddr), 0);
        vm.stopPrank();

        // Nation 1 produces 1000 horsemen
        vm.startPrank(player1);
        uint256 horsemanTemplateID = getter.getEntityByAddress(address(horsemanToken));
        game.startTroopProduction(nation1CapitalID, horsemanTemplateID, 1000);

        // Nation 1 fails to end troop production
        time += worldConstants.secondsToTrainAThousandTroops / 2;
        vm.warp(time);
        vm.expectRevert("CURIO: Production needs more time to finish");
        game.endTroopProduction(nation1CapitalID);
        assertEq(horsemanToken.balanceOf(nation1CapitalAddr), 0);

        // Nation 1 stops troop production
        game.stopTroopProduction(nation1CapitalID);
        assertEq(horsemanToken.balanceOf(nation1CapitalAddr), 0);
        vm.expectRevert("CURIO: No ongoing production");
        game.endTroopProduction(nation1CapitalID);

        // Nation 1 again starts production
        time += 1;
        vm.warp(time);
        game.startTroopProduction(nation1CapitalID, horsemanTemplateID, 1000);

        // Nation 1 ends troop production
        time += worldConstants.secondsToTrainAThousandTroops + 1;
        vm.warp(time);
        game.endTroopProduction(nation1CapitalID);
        assertEq(horsemanToken.balanceOf(nation1CapitalAddr), 1000);
        vm.stopPrank();
    }

    // // Temporarily disabled
    // function testTransferDistance() public {
    //     // Start time
    //     uint256 time = block.timestamp + 1000;
    //     vm.warp(time);

    //     // Check transfer distance
    //     assertEq(foodToken.maxTransferDistance(), 20);

    //     // Deployer drips gold, food, and troops to Nation 1 and 2
    //     vm.startPrank(deployer);
    //     admin.dripToken(nation1CapitalAddr, "Gold", 1000000);
    //     admin.dripToken(nation1CapitalAddr, "Food", 1000000);

    //     admin.dripToken(nation2CapitalAddr, "Gold", 1000000);
    //     admin.dripToken(nation2CapitalAddr, "Food", 1000000);
    //     admin.dripToken(nation2CapitalAddr, "Warrior", 1000);
    //     admin.dripToken(nation2CapitalAddr, "Horseman", 1000);
    //     admin.dripToken(nation2CapitalAddr, "Slinger", 1000);
    //     vm.stopPrank();

    //     // Nation 2 organizes army
    //     time += 10;
    //     vm.warp(time + 10);
    //     vm.startPrank(player2);
    //     uint256[] memory armyTemplateIDs = new uint256[](3);
    //     armyTemplateIDs[0] = warriorTemplateID;
    //     armyTemplateIDs[1] = horsemanTemplateID;
    //     armyTemplateIDs[2] = slingerTemplateID;
    //     uint256[] memory armyTemplateAmounts = new uint256[](3);
    //     armyTemplateAmounts[0] = 50;
    //     armyTemplateAmounts[1] = 50;
    //     armyTemplateAmounts[2] = 50;
    //     uint256 army21ID = game.organizeArmy(nation2CapitalID, armyTemplateIDs, armyTemplateAmounts);
    //     address army21Addr = getter.getAddress(army21ID);
    //     assertEq(foodToken.balanceOf(army21Addr), 0);
    //     vm.stopPrank();

    //     // Nation 1's capital transfers some food successfully to Nation 2's army
    //     vm.startPrank(player1);
    //     CurioWallet capital1Wallet = CurioWallet(nation1CapitalAddr);
    //     capital1Wallet.executeTx(address(foodToken), abi.encodeWithSignature("transfer(address,uint256)", army21Addr, 50));
    //     assertEq(foodToken.balanceOf(army21Addr), 50);
    //     vm.stopPrank();

    //     // Nation 2 moves army to (62, 49)
    //     time += 10;
    //     vm.warp(time + 10);
    //     vm.startPrank(player2);
    //     for (uint256 i = 1; i <= 9; i++) {
    //         time += 1;
    //         vm.warp(time);
    //         game.move(army21ID, Position({x: 62, y: 31 + 2 * i}));
    //     }
    //     vm.stopPrank();

    //     // Nation 1's capital fails to transfer food to Nation 2's army
    //     vm.startPrank(player1);
    //     vm.expectRevert();
    //     capital1Wallet.executeTx(address(foodToken), abi.encodeWithSignature("transfer(address,uint256)", army21Addr, 50));
    //     assertEq(foodToken.balanceOf(army21Addr), 50);
    //     vm.stopPrank();
    // }

    function testDelegation() public {
        // Start time
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Deployer drips gold and food to Nation 1
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Gold", 100000000);
        admin.dripToken(nation1CapitalAddr, "Food", 100000000);
        vm.stopPrank();

        // Nation 2 fails to produce troops on behalf of Nation 1
        vm.startPrank(player2);
        vm.expectRevert("CURIO: Not delegated to call StartTroopProduction");
        game.startTroopProduction(nation1CapitalID, horsemanTemplateID, 1000);
        assertEq(horsemanToken.balanceOf(nation1CapitalAddr), 0);
        vm.stopPrank();

        // Nation 1 delegates troop production to Nation 2
        vm.startPrank(player1);
        game.delegateGameFunction(nation1ID, "StartTroopProduction", nation2ID, 0, true);
        vm.stopPrank();

        // Nation 2 produces troops on behalf of Nation 1
        vm.startPrank(player2);
        game.startTroopProduction(nation1CapitalID, horsemanTemplateID, 1000);
        vm.stopPrank();

        // Nation 1 ends production
        time += worldConstants.secondsToTrainAThousandTroops + 1;
        vm.warp(time);
        vm.startPrank(player1);
        game.endTroopProduction(nation1CapitalID);
        assertEq(horsemanToken.balanceOf(nation1CapitalAddr), 1000);
        vm.stopPrank();

        // Nation 1 revokes delegation
        vm.startPrank(player1);
        game.delegateGameFunction(nation1ID, "StartTroopProduction", nation2ID, 0, false);
        vm.stopPrank();

        // Nation 2 fails to produce troops on behalf of Nation 1
        vm.startPrank(player2);
        vm.expectRevert("CURIO: Not delegated to call StartTroopProduction");
        game.startTroopProduction(nation1CapitalID, horsemanTemplateID, 1000);
        assertEq(horsemanToken.balanceOf(nation1CapitalAddr), 1000);
        vm.stopPrank();
    }

    function testIdlePlayerRemoval() public {
        // Start time
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Deployer drips gold and food to Nation 1 and 2
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Gold", 100000000);
        admin.dripToken(nation1CapitalAddr, "Food", 100000000);
        admin.dripToken(nation2CapitalAddr, "Gold", 100000000);
        admin.dripToken(nation2CapitalAddr, "Food", 100000000);
        vm.stopPrank();

        // Nation 1 upgrades capital
        time += 100;
        vm.warp(time);
        vm.startPrank(player1);
        game.upgradeCapital(nation1CapitalID);
        vm.stopPrank();

        // Nation 2 upgrades capital
        time += 100;
        vm.warp(time);
        vm.startPrank(player2);
        game.upgradeCapital(nation2CapitalID);
        vm.stopPrank();

        // No idle nations are removed for being idle for 2000 seconds
        time += 100;
        vm.warp(time);
        vm.startPrank(deployer);
        admin.removeIdleNations(2000);
        assertTrue(getter.isPlayerWhitelistedByGame(player1));
        assertTrue(getter.isPlayerWhitelistedByGame(player2));
        assertTrue(getter.isPlayerWhitelistedByGame(player3));
        vm.stopPrank();

        // Nation 3 is removed for being idle for 800 seconds
        vm.startPrank(deployer);
        admin.removeIdleNations(800);
        assertFalse(getter.isPlayerWhitelistedByGame(player3));
        assertEq(getter.getCapital(nation3ID), 0);
        vm.stopPrank();

        // Nation 1 is removed for being idle for 150 seconds
        vm.startPrank(deployer);
        admin.removeIdleNations(150);
        assertFalse(getter.isPlayerWhitelistedByGame(player1));
        assertEq(getter.getCapital(nation1ID), 0);
        vm.stopPrank();

        // Nation 2 is removed for being idle for 50 seconds
        vm.startPrank(deployer);
        admin.removeIdleNations(50);
        assertFalse(getter.isPlayerWhitelistedByGame(player2));
        assertEq(getter.getCapital(nation2ID), 0);
        vm.stopPrank();
    }

    function testDelegateAll() public {
        // Start time
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Deployer drips gold and food to Nation 1 and 2
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Gold", 100000000);
        admin.dripToken(nation1CapitalAddr, "Food", 100000000);
        admin.dripToken(nation2CapitalAddr, "Gold", 100000000);
        admin.dripToken(nation2CapitalAddr, "Food", 100000000);
        vm.stopPrank();

        // Nation 2 tries to upgrade capital on behalf of Nation 1
        vm.startPrank(player2);
        vm.expectRevert("CURIO: Not delegated to call UpgradeCapital");
        game.upgradeCapital(nation1CapitalID);
        vm.stopPrank();

        // Nation 1 delegates all game functions to Nation 2
        vm.startPrank(player1);
        game.delegateAllGameFunctions(nation1ID, nation2ID, true);
        vm.stopPrank();

        // Nation 2 upgrades capital on behalf of Nation 1
        vm.startPrank(player2);
        game.upgradeCapital(nation1CapitalID);
        vm.stopPrank();

        // Nation 1 revokes delegation
        vm.startPrank(player1);
        game.delegateGameFunction(nation1ID, "UpgradeCapital", nation2ID, 0, false);
        vm.stopPrank();

        // Nation 2 fails to upgrade capital on behalf of Nation 1
        vm.startPrank(player2);
        vm.expectRevert("CURIO: Not delegated to call UpgradeCapital");
        game.upgradeCapital(nation1CapitalID);
        vm.stopPrank();
    }

    function testDiamondUpgrade() public {
        UpgradedFacet newFacet = new UpgradedFacet();
        bytes4[] memory functionSelectors = new bytes4[](1); 
        functionSelectors[0] = newFacet.SELECTOR();

        vm.startPrank(deployer);
        IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](1);
        cuts[0] = IDiamondCut.FacetCut({facetAddress: address(newFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: functionSelectors});
        IDiamondCut(diamond).diamondCut(cuts, address(0), "");
        assertEq(UpgradedFacet(diamond).upgradedFacetFunction(5), 7);
    }
}
