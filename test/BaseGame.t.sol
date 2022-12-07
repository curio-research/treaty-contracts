//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {DiamondDeployTest} from "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent} from "contracts/TypedComponents.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {console} from "forge-std/console.sol";

contract BaseGameTest is Test, DiamondDeployTest {
    function testInitialization() public {
        // Verify that wallet address is loaded correctly
        assertEq(getter.getEntityWallet(nation1ID), address(nation1Wallet));

        // Verify that capital is established correctly
        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 nation2CapitalID = getter.getCapital(nation2ID);
        Position memory nation1CapitalPosition = getter.getPositionExternal("StartPosition", nation1CapitalID);
        Position memory nation2CapitalPosition = getter.getPositionExternal("StartPosition", nation2CapitalID);

        assertEq(nation1CapitalPosition.x, nation1Pos.x);
        assertEq(nation1CapitalPosition.y, nation1Pos.y);

        assertEq(getter.getEntityNation(nation1CapitalID), nation1ID);
        assertEq(abi.decode(getter.getComponent("Name").getBytesValue(nation1ID), (string)), "China");

        // Verify that tile is initialized correctly
        uint256 nation1CapitalTile = getter.getTileAt(nation1CapitalPosition);
        assertEq(getter.getEntityNation(nation1CapitalTile), nation1ID);

        // Verify that TileGuard tokens are dripped to tile wallet
        uint256 correctTileGuardAmount = getter.getConstant("Tile", "Guard", "Amount", "", getter.getEntityLevel(nation1CapitalTile));
        assertEq(guardToken.checkBalanceOf(getter.getEntityWallet(nation1CapitalTile)), correctTileGuardAmount);

        uint256 nation2CapitalTile = getter.getTileAt(nation2CapitalPosition);
        assertEq(getter.getEntityNation(nation2CapitalTile), nation2ID);

        // Verify that armies are initialized correctly
        uint256[] memory nation1ArmyIDs = getter.getNationArmies(nation1ID);
        assertEq(nation1ArmyIDs.length, 2);
        assertEq(getter.getEntityNation(nation1ArmyIDs[0]), nation1ID);
        assertEq(getter.getEntityNation(nation1ArmyIDs[1]), nation1ID);

        // fixme: how to test error from the delegate call?
        // vm.prank(player1Addr);
        // vm.expectRevert("CURIO: Army max count reached");
        // nation1Wallet.executeGameTx(abi.encodeWithSignature("initializeArmy(address)", address(0)));
    }

    function testOrganizeDisbandMoveArmy() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 600;
        // Deployer transfer enough gold & food to nation 1
        vm.startPrank(deployerAddress);
        admin.dripToken(address(nation1Wallet), "Warrior", 1000);
        admin.dripToken(address(nation1Wallet), "Horseman", 1000);
        admin.dripToken(address(nation1Wallet), "Slinger", 1000);

        assertEq(warriorToken.checkBalanceOf(address(nation1Wallet)), 1000);
        assertEq(horsemanToken.checkBalanceOf(address(nation1Wallet)), 1000);
        assertEq(slingerToken.checkBalanceOf(address(nation1Wallet)), 1000);

        vm.stopPrank();
        // Nation 1 organize army
        vm.startPrank(player1Addr);

        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 nation1Army1ID = getter.getEntityIDByAddress(address(army11Wallet));

        uint256[] memory chinaArmyTemplateIDs = new uint256[](3);
        chinaArmyTemplateIDs[0] = warriorTemplateID;
        chinaArmyTemplateIDs[1] = horsemanTemplateID;
        chinaArmyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory chinaTemplateAmounts = new uint256[](3);
        chinaTemplateAmounts[0] = 500;
        chinaTemplateAmounts[1] = 500;
        chinaTemplateAmounts[2] = 500;
        vm.warp(time + 10);
        time += 10;

        nation1Wallet.executeGameTx(abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])", nation1CapitalID, nation1Army1ID, chinaArmyTemplateIDs, chinaTemplateAmounts));

        assertEq(warriorToken.checkBalanceOf(address(nation1Wallet)) + warriorToken.checkBalanceOf(address(army11Wallet)), 1000);
        assertEq(slingerToken.checkBalanceOf(address(nation1Wallet)) + warriorToken.checkBalanceOf(address(army11Wallet)), 1000);
        assertEq(horsemanToken.checkBalanceOf(address(nation1Wallet)) + warriorToken.checkBalanceOf(address(army11Wallet)), 1000);

        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", nation1Army1ID, 63, 13));
        assertEq(getter.getPositionExternal("Position", nation1Army1ID).x, 63);
        assertEq(getter.getPositionExternal("Position", nation1Army1ID).y, 13);

        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", nation1Army1ID, 62, 12));

        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("disbandArmy(uint256)", nation1Army1ID));
        assertEq(warriorToken.checkBalanceOf(address(army11Wallet)), 0);
        assertEq(slingerToken.checkBalanceOf(address(army11Wallet)), 0);
        assertEq(horsemanToken.checkBalanceOf(address(army11Wallet)), 0);
        assertEq(warriorToken.checkBalanceOf(address(nation1Wallet)), 1000);
        assertEq(slingerToken.checkBalanceOf(address(nation1Wallet)), 1000);
        assertEq(horsemanToken.checkBalanceOf(address(nation1Wallet)), 1000);
    }

    function testBattleArmy() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 600;
        // Deployer transfer enough gold & food to nation 1 & 2
        vm.startPrank(deployerAddress);
        admin.dripToken(address(nation1Wallet), "Warrior", 1000);
        admin.dripToken(address(nation1Wallet), "Horseman", 1000);
        admin.dripToken(address(nation1Wallet), "Slinger", 1000);
        admin.dripToken(address(nation2Wallet), "Warrior", 1000);
        admin.dripToken(address(nation2Wallet), "Horseman", 1000);
        admin.dripToken(address(nation2Wallet), "Slinger", 1000);

        vm.stopPrank();

        // Nation 1 organize army
        vm.startPrank(player1Addr);

        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 army11ID = getter.getEntityIDByAddress(address(army11Wallet));

        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 500;
        armyTemplateAmounts[1] = 500;
        armyTemplateAmounts[2] = 500;
        vm.warp(time + 10);
        time += 10;

        vm.warp(time + 10);
        time += 10;
        nation1Wallet.executeGameTx(abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])", nation1CapitalID, army11ID, armyTemplateIDs, armyTemplateAmounts));

        // Nation 1 move army
        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 12));

        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 14));

        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 16));

        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 18));

        vm.stopPrank();

        // Nation 2 organize army
        vm.startPrank(player2Addr);

        uint256 nation2CapitalID = getter.getCapital(nation2ID);
        uint256 army21ID = getter.getEntityIDByAddress(address(army21Wallet));

        vm.warp(time + 10);
        time += 10;
        nation2Wallet.executeGameTx(abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])", nation2CapitalID, army21ID, armyTemplateIDs, armyTemplateAmounts));

        vm.warp(time + 10);
        time += 10;
        army21Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army21ID, 60, 30));

        vm.warp(time + 10);
        time += 10;
        army21Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army21ID, 60, 28));

        vm.warp(time + 10);
        time += 10;
        army21Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army21ID, 60, 26));

        vm.warp(time + 10);
        time += 10;
        army21Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army21ID, 60, 24));

        vm.warp(time + 10);
        time += 10;
        army21Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army21ID, 60, 22));

        vm.stopPrank();

        // give army 11 some resources to test if it goes to army 21
        vm.startPrank(deployerAddress);
        admin.dripToken(address(army11Wallet), "Gold", 1000);
        admin.dripToken(address(army11Wallet), "Food", 1000);

        vm.stopPrank();

        vm.startPrank(player2Addr);

        // Note: just enough to kill army 11
        uint256 battleTime = 8;

        for (uint256 i = 0; i < battleTime; i++) {
            vm.warp(time + 10);
            time += 10;
            army21Wallet.executeGameTx(abi.encodeWithSignature("battle(uint256,uint256)", army21ID, army11ID));
        }

        vm.stopPrank();
        assertEq(warriorToken.checkBalanceOf(address(army11Wallet)), 0);
        assertEq(horsemanToken.checkBalanceOf(address(army11Wallet)), 0);
        assertEq(slingerToken.checkBalanceOf(address(army11Wallet)), 0);
        assertEq(goldToken.checkBalanceOf(address(army11Wallet)), 0);
        assertEq(foodToken.checkBalanceOf(address(army11Wallet)), 0);

        // Note: resource successfully transferred to army 21
        assertEq(goldToken.checkBalanceOf(address(army21Wallet)), 1000);
        assertEq(foodToken.checkBalanceOf(address(army21Wallet)), 1000);
    }

    function testUpgradeNationBattleClaimTile() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 600;
        // Deployer transfer enough gold & food to nation 1 & 2
        vm.startPrank(deployerAddress);

        admin.dripToken(address(nation1Wallet), "Warrior", 1000);
        admin.dripToken(address(nation1Wallet), "Horseman", 1000);
        admin.dripToken(address(nation1Wallet), "Slinger", 1000);
        admin.dripToken(address(nation1Wallet), "Food", 1000000);
        admin.dripToken(address(nation1Wallet), "Gold", 1000000);

        vm.stopPrank();

        // Nation 1 organize army
        vm.startPrank(player1Addr);

        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 army11ID = getter.getEntityIDByAddress(address(army11Wallet));

        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 500;
        armyTemplateAmounts[1] = 500;
        armyTemplateAmounts[2] = 500;
        vm.warp(time + 10);
        time += 10;
        nation1Wallet.executeGameTx(abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])", nation1CapitalID, army11ID, armyTemplateIDs, armyTemplateAmounts));

        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 10));

        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 8));

        vm.warp(time + 10);
        time += 10;
        Position memory targetTilePos = Position({x: 60, y: 5});
        uint256 targetTileID = getter.getTileAt(targetTilePos);
        address targetTileAddress = getter.getEntityWallet(targetTileID);

        uint256 battleTime = 2;
        for (uint256 i = 0; i < battleTime; i++) {
            vm.warp(time + 10);
            time += 10;
            army11Wallet.executeGameTx(abi.encodeWithSignature("battle(uint256,uint256)", army11ID, targetTileID));
        }
        assertEq(guardToken.checkBalanceOf(targetTileAddress), 0);

        vm.warp(time + 10);
        time += 10;
        nation1ID = getter.getEntityIDByAddress(address(nation1Wallet));
        nation1Wallet.executeGameTx(abi.encodeWithSignature("upgradeNation(uint256)", nation1ID));
        army11Wallet.executeGameTx(abi.encodeWithSignature("claimTile(uint256,uint256)", army11ID, targetTileID));

        assertEq(getter.getEntityLevel(nation1ID), 2);
        assertEq(getter.getEntityNation(targetTileID), nation1ID);
    }

    function testBattleCapitalChaos() public {
        // Start time
        uint256 time = block.timestamp + 500;
        vm.warp(time);

        // Deployer transfers gold, food, and troops to Nation 1 and Nation 2
        vm.startPrank(deployerAddress);
        admin.dripToken(address(nation1Wallet), "Gold", 1000000);
        admin.dripToken(address(nation1Wallet), "Food", 1000000);
        admin.dripToken(address(nation1Wallet), "Warrior", 1000);
        admin.dripToken(address(nation1Wallet), "Horseman", 1000);
        admin.dripToken(address(nation1Wallet), "Slinger", 1000);

        admin.dripToken(address(nation2Wallet), "Gold", 1000000);
        admin.dripToken(address(nation2Wallet), "Food", 1000000);
        admin.dripToken(address(nation2Wallet), "Warrior", 1000);
        admin.dripToken(address(nation2Wallet), "Horseman", 1000);
        admin.dripToken(address(nation2Wallet), "Slinger", 1000);
        vm.stopPrank();

        // Nation 1 organizes army
        vm.startPrank(player1Addr);
        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 army11ID = getter.getEntityIDByAddress(address(army11Wallet));
        {
            uint256[] memory armyTemplateIDs = new uint256[](3);
            armyTemplateIDs[0] = warriorTemplateID;
            armyTemplateIDs[1] = horsemanTemplateID;
            armyTemplateIDs[2] = slingerTemplateID;
            uint256[] memory armyTemplateAmounts = new uint256[](3);
            armyTemplateAmounts[0] = 500;
            armyTemplateAmounts[1] = 500;
            armyTemplateAmounts[2] = 500;
            vm.warp(time + 10);
            nation1Wallet.executeGameTx(abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])", nation1CapitalID, army11ID, armyTemplateIDs, armyTemplateAmounts));
        }
        time += 10;

        // Nation 1 moves army to (62, 29)
        for (uint256 i = 1; i <= 9; i++) {
            time += 1;
            vm.warp(time);
            army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 62, 11 + 2 * i));
        }

        // Nation 1 attacks Nation 2's capital
        uint256 nation2CapitalID = getter.getCapital(nation2ID);
        uint256 nation2CapitalTileID = getter.getTileAt(getter.getPositionExternal("StartPosition", nation2CapitalID));
        while (abi.decode(getter.getComponent("LastSacked").getBytesValue(nation2CapitalID), (uint256)) < time) {
            // Continue to battle until Nation 2's capital is sacked
            time += 2;
            vm.warp(time);
            army11Wallet.executeGameTx(abi.encodeWithSignature("battle(uint256,uint256)", army11ID, nation2CapitalTileID));
        }
        vm.stopPrank();

        // Nation 2 fails to upgrade its capital during chaos
        vm.startPrank(player2Addr);
        vm.expectRevert();
        nation2Wallet.executeGameTx(abi.encodeWithSignature("upgradeNation(uint256)", nation2ID));

        // Nation 2 upgrades its capital after chaos
        time += 200;
        vm.warp(time);
        nation2Wallet.executeGameTx(abi.encodeWithSignature("upgradeNation(uint256)", nation2ID));
        vm.stopPrank();
    }

    function testHarvest() public {
        // bug: lastChaos time is 0. This is wrong.
        vm.startPrank(deployerAddress);
        uint256 nation1ID = getter.getEntityIDByAddress(address(nation1Wallet));
        // this tile and its resource is next to nation1 capital
        Position memory farmTilePos = Position({x: 60, y: 5});
        admin.giftTileAndResourceAt(Position({x: 60, y: 5}), nation1ID);

        admin.dripToken(address(nation1Wallet), "Gold", 1000000);
        admin.dripToken(address(nation1Wallet), "Food", 1000000);

        vm.stopPrank();

        uint256 time = block.timestamp + 600;
        vm.warp(time);

        vm.startPrank(player1Addr);
        nation1Wallet.executeGameTx(abi.encodeWithSignature("upgradeNation(uint256)", nation1ID));
        uint256 nation1CapitalID = getter.getCapital(nation1ID);

        nation1Wallet.executeGameTx(abi.encodeWithSignature("harvestResourcesFromCapital(uint256)", nation1CapitalID));

        uint256 goldBalance1 = goldToken.checkBalanceOf(address(nation1Wallet));
        uint256 foodBalance1 = foodToken.checkBalanceOf(address(nation1Wallet));
        assertTrue(goldBalance1 > 1000000);
        assertTrue(foodBalance1 > 1000000);

        uint256 farmID = getter.getResourceAtTile(farmTilePos);
        nation1Wallet.executeGameTx(abi.encodeWithSignature("upgradeResource(uint256)", farmID));

        uint256 foodBalance2 = foodToken.checkBalanceOf(address(nation1Wallet));

        time += 50;
        vm.warp(time);
        nation1Wallet.executeGameTx(abi.encodeWithSignature("harvestResource(uint256)", farmID));
        assertTrue(foodToken.checkBalanceOf(address(nation1Wallet)) > foodBalance2);
    }

    function testGather() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 600;
        // Deployer transfer enough gold & food to nation 1 & 2
        vm.startPrank(deployerAddress);
        admin.dripToken(address(nation1Wallet), "Warrior", 1000);
        admin.dripToken(address(nation1Wallet), "Horseman", 1000);
        admin.dripToken(address(nation1Wallet), "Slinger", 1000);

        vm.stopPrank();

        // Nation 1 organize army
        vm.startPrank(player1Addr);

        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 army11ID = getter.getEntityIDByAddress(address(army11Wallet));

        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 500;
        armyTemplateAmounts[1] = 500;
        armyTemplateAmounts[2] = 500;

        vm.warp(time + 10);
        time += 10;
        nation1Wallet.executeGameTx(abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])", nation1CapitalID, army11ID, armyTemplateIDs, armyTemplateAmounts));

        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 10));

        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 8));

        vm.warp(time + 10);
        time += 10;
        Position memory targetTilePos = Position({x: 60, y: 5});
        uint256 resourceID = getter.getResourceAtTile(targetTilePos);

        // Army Gather Food
        army11Wallet.executeGameTx(abi.encodeWithSignature("startGather(uint256,uint256)", army11ID, resourceID));
        vm.warp(time + 50);
        time += 50;
        army11Wallet.executeGameTx(abi.encodeWithSignature("endGather(uint256)", army11ID));
        uint256 armyFoodBalance = foodToken.checkBalanceOf(address(army11Wallet));
        assertTrue(armyFoodBalance > 0);

        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 10));

        vm.warp(time + 10);
        time += 10;
        army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 12));
        army11Wallet.executeGameTx(abi.encodeWithSignature("unloadResources(uint256)", army11ID));
        assertEq(foodToken.checkBalanceOf(address(army11Wallet)), 0);
        assertEq(foodToken.checkBalanceOf(address(nation1Wallet)), armyFoodBalance);
    }

    // TODO: Test troop production & upgrade/recover tiles
    function testHomiePolicy() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 600;
        // Deployer transfer enough gold & food to nation 1 & 2
        vm.startPrank(deployerAddress);
        admin.dripToken(address(nation1Wallet), "Warrior", 1000);
        admin.dripToken(address(nation1Wallet), "Horseman", 1000);
        admin.dripToken(address(nation1Wallet), "Slinger", 1000);
        admin.dripToken(address(nation1Wallet), "Gold", 1000000);
        admin.dripToken(address(nation1Wallet), "Food", 1000000);
        vm.stopPrank();

        // Nation 1 organize army
        vm.startPrank(player1Addr);

        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 army11ID = getter.getEntityIDByAddress(address(army11Wallet));

        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 500;
        armyTemplateAmounts[1] = 500;
        armyTemplateAmounts[2] = 500;
        vm.warp(time + 10);
        time += 10;
        nation1Wallet.executeGameTx(abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])", nation1CapitalID, army11ID, armyTemplateIDs, armyTemplateAmounts));

        // Nation 1's army11 becomes a homie of Nation 2 !!!
        uint256 homieFee = nation2Wallet.homieFee();

        nation1Wallet.executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(nation2Wallet), homieFee));

        nation1Wallet.executeTx(address(nation2Wallet), abi.encodeWithSignature("becomeAHomie(address)", address(army11Wallet)));

        // army11 now able to enter sacred land of its homie (capital is 60,30)
        uint256 y_coordinate = 30;

        for (uint256 curr_coordinate = 12; curr_coordinate <= y_coordinate; curr_coordinate += 2) {
            vm.warp(time + 10);
            time += 10;
            army11Wallet.executeGameTx(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, curr_coordinate));
        }
    }
}
