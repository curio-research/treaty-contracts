//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {DiamondDeployTest} from "test/DiamondDeploy.t.sol";
import {FTX} from "contracts/treaties/FTX.sol";
import {TestTreaty} from "contracts/treaties/TestTreaty.sol";
import {CurioWallet} from "contracts/CurioWallet.sol";
import {Position} from "contracts/libraries/Types.sol";
import {console} from "forge-std/console.sol";

contract TreatyTest is Test, DiamondDeployTest {
    // Treaty Coverage Overview
    // - [x] Nation delegation
    // - [x] Treaty approval
    // - [x] Token approval
    // - [x] Case: FTX
    // - [x] Case: Alliance

    function testApproval() public {
        // Start time
        uint256 time = block.timestamp + 500;
        vm.warp(time);

        // Check initial condition
        assertEq(abi.decode(getter.getComponent("Level").getBytesValue(nation2CapitalID), (uint256)), 1);

        // Player 1 deploys TestTreaty treaty
        vm.startPrank(player1);
        TestTreaty testTreaty = new TestTreaty(diamond);
        vm.stopPrank();

        // Deployer registers TestTreaty treaty and drips gold and food to Player 2
        vm.startPrank(deployer);
        uint256 testTreatyID = admin.registerTreaty(address(testTreaty), "placeholder ABI");
        admin.dripToken(nation2CapitalAddr, "Gold", 1000000000);
        admin.dripToken(nation2CapitalAddr, "Food", 1000000000);
        vm.stopPrank();

        // Check treaty ECS data
        assertEq(abi.decode(getter.getComponent("Tag").getBytesValue(testTreatyID), (string)), "Treaty");
        assertEq(abi.decode(getter.getComponent("Name").getBytesValue(testTreatyID), (string)), "Test Treaty");
        assertEq(abi.decode(getter.getComponent("Description").getBytesValue(testTreatyID), (string)), "Treaty for testing");
        assertEq(abi.decode(getter.getComponent("ABIHash").getBytesValue(testTreatyID), (string)), "placeholder ABI");

        // Player 2 joins TestTreaty treaty
        vm.startPrank(player2);
        testTreaty.join();
        assertTrue(getter.getNationTreatySignature(nation2ID, testTreatyID) > 0);

        // Player 2 fails to upgrade capital
        vm.expectRevert("CURIO: Treaty disapproved UpgradeCapital");
        game.upgradeCapital(nation2CapitalID);
        assertEq(abi.decode(getter.getComponent("Level").getBytesValue(nation2CapitalID), (uint256)), 1);

        // Player 2 leaves treaty
        testTreaty.leave();

        // Player 2 upgrades capital
        game.upgradeCapital(nation2CapitalID);
        assertEq(abi.decode(getter.getComponent("Level").getBytesValue(nation2CapitalID), (uint256)), 2);
        vm.stopPrank();
    }

    function testAlliance() public {
        // Start time
        uint256 time = block.timestamp + 500;
        vm.warp(time);

        // Deployer transfers gold, food, and troops to Nation 1, 2, and 3
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Gold", 1000000);
        admin.dripToken(nation1CapitalAddr, "Food", 1000000);
        admin.dripToken(nation1CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation1CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation1CapitalAddr, "Slinger", 1000);

        admin.dripToken(nation2CapitalAddr, "Gold", 1000000);
        admin.dripToken(nation2CapitalAddr, "Food", 1000000);
        admin.dripToken(nation2CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation2CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation2CapitalAddr, "Slinger", 1000);

        admin.dripToken(nation3CapitalAddr, "Gold", 1000000);
        admin.dripToken(nation3CapitalAddr, "Food", 1000000);
        admin.dripToken(nation3CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation3CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation3CapitalAddr, "Slinger", 1000);
        vm.stopPrank();

        // Nation 1 organizes army
        vm.startPrank(player1);
        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 150;
        armyTemplateAmounts[1] = 150;
        armyTemplateAmounts[2] = 150;
        time += 10;
        vm.warp(time);
        uint256 army11ID = game.organizeArmy(nation1CapitalID, armyTemplateIDs, armyTemplateAmounts);
        address army11Addr = getter.getAddress(army11ID);

        // Nation 1 joins alliance after token approval
        CurioWallet(nation1CapitalAddr).executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(alliance), 1000));
        alliance.join();
        assertTrue(getter.getNationTreatySignature(nation1ID, allianceID) > 0);

        // Nation 1 moves army from (62, 12) to (62, 29)
        for (uint256 i = 1; i <= 9; i++) {
            time += 1;
            vm.warp(time);
            game.move(army11ID, Position({x: 62, y: 11 + 2 * i}));
        }
        vm.stopPrank();

        // Nation 2 fails to join alliance before token approval
        vm.expectRevert();
        alliance.join();
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 1000000);

        // Nation 2 joins alliance after token approval
        vm.startPrank(player2);
        CurioWallet(nation2CapitalAddr).executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(alliance), 1000));
        alliance.join();
        assertTrue(getter.getNationTreatySignature(nation2ID, allianceID) > 0);
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 1000000 - 1000);
        vm.stopPrank();

        // Nation 1 fails to attack Nation 2's capital
        vm.startPrank(player1);
        time += 2;
        vm.warp(time);
        uint256 nation2CapitalTileID = getter.getTileAt(getter.getPositionExternal("StartPosition", nation2CapitalID));
        vm.expectRevert("CURIO: Treaty disapproved Battle");
        game.battle(army11ID, nation2CapitalTileID);
        vm.stopPrank();

        // Nation 2 fails to leave alliance
        vm.startPrank(player2);
        vm.expectRevert("Alliance: Nation must stay for at least 10 seconds");
        alliance.leave();
        vm.stopPrank();

        // Nation 2 manages to leave alliance after 10 seconds
        vm.startPrank(player2);
        time += 10;
        vm.warp(time);
        alliance.leave();
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 1000000);
        vm.stopPrank();

        // Nation 1 attacks Nation 2's capital
        vm.startPrank(player1);
        time += 2;
        vm.warp(time);
        game.battle(army11ID, nation2CapitalTileID);
        vm.stopPrank();

        // Nation 2 organizes army
        vm.startPrank(player2);
        armyTemplateAmounts[0] = 150;
        armyTemplateAmounts[1] = 150;
        armyTemplateAmounts[2] = 150;
        uint256 army21ID = game.organizeArmy(nation2CapitalID, armyTemplateIDs, armyTemplateAmounts);
        address army21Addr = getter.getAddress(army21ID);
        vm.stopPrank();

        // Nation 3 joins alliance after token approval
        vm.startPrank(player3);
        CurioWallet(nation3CapitalAddr).executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(alliance), 1000));
        alliance.join();
        assertTrue(getter.getNationTreatySignature(nation3ID, allianceID) > 0);

        // Nation 3 organizes army
        armyTemplateAmounts[0] = 90;
        armyTemplateAmounts[1] = 90;
        armyTemplateAmounts[2] = 90;
        uint256 army31ID = game.organizeArmy(nation3CapitalID, armyTemplateIDs, armyTemplateAmounts);
        address army31Addr = getter.getAddress(army31ID);
        assertEq(horsemanToken.checkBalanceOf(army31Addr), 90);

        // Nation 3 moves army from (52, 22) to (59, 31)
        time += 1;
        vm.warp(time);
        game.move(army31ID, Position({x: 53, y: 23}));
        time += 1;
        vm.warp(time);
        game.move(army31ID, Position({x: 54, y: 24}));
        time += 1;
        vm.warp(time);
        game.move(army31ID, Position({x: 55, y: 25}));
        time += 1;
        vm.warp(time);
        game.move(army31ID, Position({x: 56, y: 26}));
        time += 1;
        vm.warp(time);
        game.move(army31ID, Position({x: 57, y: 27}));
        time += 1;
        vm.warp(time);
        game.move(army31ID, Position({x: 58, y: 28}));
        time += 1;
        vm.warp(time);
        game.move(army31ID, Position({x: 59, y: 29}));
        time += 1;
        vm.warp(time);
        game.move(army31ID, Position({x: 59, y: 31}));
        vm.stopPrank();

        // Nation 1 accidentally tries to let Alliance besiege Nation 3's army, but luckily fails
        vm.startPrank(player1);
        uint256 army11HorsemanBalance = horsemanToken.checkBalanceOf(army11Addr);
        time += 2;
        vm.warp(time);
        vm.expectRevert("Alliance: Cannot besiege army of ally nation");
        alliance.besiege(army31ID);
        assertEq(horsemanToken.checkBalanceOf(army11Addr), army11HorsemanBalance);
        assertEq(horsemanToken.checkBalanceOf(army31Addr), 90);

        // Nation 1 triggers Alliance to besiege Nation 2's army until it is destroyed
        // Nation 1's army and Nation 3's army should both survive
        assertEq(horsemanToken.checkBalanceOf(army21Addr), 150);
        time += 2;
        vm.warp(time);
        alliance.besiege(army21ID);
        assertTrue(horsemanToken.checkBalanceOf(army11Addr) < army11HorsemanBalance);
        assertTrue(horsemanToken.checkBalanceOf(army21Addr) < 150);
        assertTrue(horsemanToken.checkBalanceOf(army31Addr) < 90);
        while (getter.getNation(army21ID) != 0) {
            time += 2;
            vm.warp(time);
            alliance.besiege(army21ID);
        }
        assertEq(getter.getNation(army11ID), nation1ID);
        assertEq(getter.getNation(army31ID), nation3ID);
        vm.stopPrank();
    }

    function testFTX() public {
        // Start time
        uint256 time = block.timestamp + 500;
        vm.warp(time);

        // Deploy transfers gold to Player 1
        vm.prank(deployer);
        admin.dripToken(nation1CapitalAddr, "Gold", 8);

        // Player 2 (SBF) starts FTX and grants it access to his wallet
        vm.startPrank(player2);
        FTX ftx = new FTX(diamond);
        CurioWallet(nation2CapitalAddr).executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(ftx), 10000));
        assertEq(goldToken.balanceOf(nation2CapitalAddr), 0);
        vm.stopPrank();

        // Deployer registers FTX treaty
        vm.startPrank(deployer);
        admin.registerTreaty(address(ftx), "placeholder ABI");
        vm.stopPrank();

        // Player 1 deposits to FTX
        vm.startPrank(player1);
        CurioWallet(nation1CapitalAddr).executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(ftx), 2));
        ftx.deposit(2);
        assertEq(goldToken.checkBalanceOf(nation1CapitalAddr), 6);
        assertEq(ftx.fttToken().checkBalanceOf(nation1CapitalAddr), 2);
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 2);

        // Player 1 withdraws successfully
        ftx.withdraw(1);
        assertEq(goldToken.checkBalanceOf(nation1CapitalAddr), 7);
        assertEq(ftx.fttToken().checkBalanceOf(nation1CapitalAddr), 1);
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 1);

        // Player 1 gives FTX all gold
        CurioWallet(nation1CapitalAddr).executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(ftx), 7));
        ftx.deposit(7);
        assertEq(goldToken.checkBalanceOf(nation1CapitalAddr), 0);
        assertEq(ftx.fttToken().checkBalanceOf(nation1CapitalAddr), 8);
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 8);
        vm.stopPrank();

        // Player 2 (SBF) transfers all but 1 gold to Player 3 (Caroline)
        vm.startPrank(player2);
        CurioWallet(nation2CapitalAddr).executeTx(address(goldToken), abi.encodeWithSignature("transfer(address,uint256)", nation3CapitalAddr, 7));
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 1);
        vm.stopPrank();

        // Player 1 manages to withdraw only 1 gold from FTX
        vm.prank(player1);
        ftx.withdraw(8);
        assertEq(goldToken.checkBalanceOf(nation1CapitalAddr), 1);
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 0);

        // Player 2 (SBF) declares FTX bankrupt
        vm.prank(player2);
        ftx.run();
        assertTrue(ftx.isBankrupt());

        // Player 1 fails to withdraw rest of balance from FTX
        vm.prank(player1);
        vm.expectRevert();
        ftx.withdraw(7);
        assertEq(goldToken.checkBalanceOf(nation1CapitalAddr), 1);
    }
}
