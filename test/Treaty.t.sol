//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {DiamondDeployTest} from "test/DiamondDeploy.t.sol";
import {Alliance} from "contracts/treaties/Alliance.sol";
import {MercenaryLeague} from "contracts/treaties/MercenaryLeague.sol";
import {NonAggressionPact} from "contracts/treaties/NonAggressionPact.sol";
import {Embargo} from "contracts/treaties/Embargo.sol";
import {CollectiveDefenseFund} from "contracts/treaties/CollectiveDefenseFund.sol";
import {SimpleOTC} from "contracts/treaties/SimpleOTC.sol";
import {HandshakeDeal} from "contracts/treaties/HandshakeDeal.sol";
import {LoanAgreement} from "contracts/treaties/LoanAgreement.sol";
import {TestTreaty} from "contracts/treaties/TestTreaty.sol";
import {CustomTreaty} from "test/CustomTreaty.sol";
import {CurioWallet} from "contracts/standards/CurioWallet.sol";
import {Position} from "contracts/libraries/Types.sol";
import {LoanAgreement} from "contracts/treaties/LoanAgreement.sol";
import {ColonialPact} from "contracts/treaties/ColonialPact.sol";
import {console} from "forge-std/console.sol";

contract TreatyTest is Test, DiamondDeployTest {
    // Treaty Coverage Overview
    // - [x] Nation delegation
    // - [x] Treaty approval
    // - [x] Token approval
    // - [x] Case: Alliance
    // - [x] Case: NAP
    // - [x] Case: Embargo
    // - [x] Case: CDFund
    // - [x] Case: SimpleOTC
    // - [x] Case: HandshakeDeal

    function testDelegation() public {
        // Start time
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Deployer transfers crystal, food, and troops to Nation 2
        vm.startPrank(deployer);
        admin.dripToken(nation2CapitalAddr, "Crystal", 100000000);
        admin.dripToken(nation2CapitalAddr, "Food", 100000000);
        admin.dripToken(nation2CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation2CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation2CapitalAddr, "Slinger", 1000);
        vm.stopPrank();

        // Nation 2 organizes army
        vm.startPrank(player2);
        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = horsemanTemplateID;
        armyTemplateIDs[1] = warriorTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 50;
        armyTemplateAmounts[1] = 50;
        armyTemplateAmounts[2] = 50;
        uint256 army21ID = game.organizeArmy(nation2CapitalID, armyTemplateIDs, armyTemplateAmounts);
        time += 1;
        vm.warp(time);
        game.move(army21ID, Position({x: 61, y: 31}));
        vm.stopPrank();

        // Nation 2 organizes another army
        vm.startPrank(player2);
        uint256 army22ID = game.organizeArmy(nation2CapitalID, armyTemplateIDs, armyTemplateAmounts);
        vm.stopPrank();

        // Nation 1 fails to move Nation 2's first army
        vm.startPrank(player1);
        vm.expectRevert("CURIO: Not delegated to call Move");
        game.move(army21ID, Position({x: 60, y: 30}));
        vm.stopPrank();

        // Nation 2 delegates Move function for both armies to Nation 1
        vm.startPrank(player2);
        assertEq(getter.getDelegations("Move", nation2ID, nation1ID).length, 0);
        game.delegateGameFunction(nation2ID, "Move", nation1ID, 0, true);
        uint256[] memory delegationIDs = getter.getDelegations("Move", nation2ID, nation1ID);
        assertEq(delegationIDs.length, 1);
        assertEq(abi.decode(getter.getComponent("Subject").getBytesValue(delegationIDs[0]), (uint256)), 0);
        vm.stopPrank();

        // Nation 1 moves Nation 2's first and second armies
        vm.startPrank(player1);
        time += 1;
        vm.warp(time);
        game.move(army21ID, Position({x: 60, y: 30}));
        game.move(army22ID, Position({x: 63, y: 33}));
        vm.stopPrank();

        // Nation 2 fails to revoke Move function delegation for its first army
        vm.startPrank(player2);
        vm.expectRevert("CURIO: Need to revoke entity-agnostic delegation");
        game.delegateGameFunction(nation2ID, "Move", nation1ID, army21ID, false);
        assertEq(getter.getDelegations("Move", nation2ID, nation1ID).length, 1);
        vm.stopPrank();

        // Nation 1 moves Nation 2's first and second armies
        vm.startPrank(player1);
        time += 1;
        vm.warp(time);
        game.move(army21ID, Position({x: 59, y: 29}));
        game.move(army22ID, Position({x: 64, y: 34}));
        vm.stopPrank();

        // Nation 2 abrogates Move function delegation for its armies and delegates for specifically its second army
        vm.startPrank(player2);
        game.delegateGameFunction(nation2ID, "Move", nation1ID, 0, false);
        game.delegateGameFunction(nation2ID, "Move", nation1ID, army22ID, true);
        delegationIDs = getter.getDelegations("Move", nation2ID, nation1ID);
        assertEq(delegationIDs.length, 1);
        assertEq(abi.decode(getter.getComponent("Subject").getBytesValue(delegationIDs[0]), (uint256)), army22ID);
        vm.stopPrank();

        // Nation 1 moves Nation 2's second army but fails to move its first army
        vm.startPrank(player1);
        time += 1;
        vm.warp(time);
        game.move(army22ID, Position({x: 65, y: 35}));
        vm.expectRevert("CURIO: Not delegated to call Move");
        game.move(army21ID, Position({x: 58, y: 28}));
        vm.stopPrank();

        // Nation 2 abrogates Move function delegation for both armies
        vm.startPrank(player2);
        game.delegateGameFunction(nation2ID, "Move", nation1ID, 0, false);
        assertEq(getter.getDelegations("Move", nation2ID, nation1ID).length, 0);
        vm.stopPrank();

        // Nation 1 fails to move Nation 2's first and second armies
        vm.startPrank(player1);
        time += 1;
        vm.warp(time);
        vm.expectRevert("CURIO: Not delegated to call Move");
        game.move(army21ID, Position({x: 58, y: 28}));
        vm.expectRevert("CURIO: Not delegated to call Move");
        game.move(army22ID, Position({x: 64, y: 34}));
        vm.stopPrank();
    }

    function testApproval() public {
        // Start time
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Check initial condition
        assertEq(abi.decode(getter.getComponent("Level").getBytesValue(nation2CapitalID), (uint256)), 1);

        // Check treaty template ECS data
        assertEq(abi.decode(getter.getComponent("Name").getBytesValue(testTreatyTemplateID), (string)), "Test Treaty");
        assertEq(abi.decode(getter.getComponent("Description").getBytesValue(testTreatyTemplateID), (string)), "Treaty for testing");
        assertEq(abi.decode(getter.getComponent("ABIHash").getBytesValue(testTreatyTemplateID), (string)), "sample ABI");

        // Nation 1 deploys TestTreaty treaty
        vm.startPrank(player1);
        TestTreaty testTreaty = TestTreaty(game.deployTreaty(nation1ID, testTreatyTemplate.name()));
        uint256 testTreatyID = getter.getEntityByAddress(address(testTreaty));
        vm.stopPrank();

        // Deployer registers TestTreaty treaty and drips crystal and food to Nation 2
        vm.startPrank(deployer);
        admin.dripToken(nation2CapitalAddr, "Crystal", 1000000000);
        admin.dripToken(nation2CapitalAddr, "Food", 1000000000);
        vm.stopPrank();

        // Check treaty ECS data
        assertEq(abi.decode(getter.getComponent("Tag").getBytesValue(testTreatyID), (string)), "Treaty");
        assertEq(abi.decode(getter.getComponent("Name").getBytesValue(testTreatyID), (string)), "Test Treaty");
        assertEq(abi.decode(getter.getComponent("Description").getBytesValue(testTreatyID), (string)), "Treaty for testing");
        assertEq(abi.decode(getter.getComponent("ABIHash").getBytesValue(testTreatyID), (string)), "sample ABI");
        assertTrue(abi.decode(getter.getComponent("CanHoldTokens").getBytesValue(testTreatyID), (bool)));
        assertEq(abi.decode(getter.getComponent("Address").getBytesValue(testTreatyID), (address)), address(testTreaty));
        assertEq(abi.decode(getter.getComponent("Owner").getBytesValue(testTreatyID), (uint256)), nation1ID);

        // Nation 2 joins TestTreaty treaty
        vm.startPrank(player2);
        testTreaty.treatyJoin();
        assertTrue(getter.getNationTreatySignature(nation2ID, testTreatyID) > 0);

        // Nation 2 fails to upgrade capital
        vm.expectRevert("CURIO: Treaty disapproved UpgradeCapital");
        game.upgradeCapital(nation2CapitalID);
        assertEq(abi.decode(getter.getComponent("Level").getBytesValue(nation2CapitalID), (uint256)), 1);

        // Nation 2 upgrades capital via Treaty function
        time += 3000;
        vm.warp(time);
        testTreaty.treatyUpgradeCapital(nation2CapitalID);
        assertEq(abi.decode(getter.getComponent("Level").getBytesValue(nation2CapitalID), (uint256)), 2);

        // Nation 2 leaves treaty
        testTreaty.treatyLeave();

        // Nation 2 upgrades capital
        time += 3000;
        vm.warp(time);
        game.upgradeCapital(nation2CapitalID);
        assertEq(abi.decode(getter.getComponent("Level").getBytesValue(nation2CapitalID), (uint256)), 3);
        vm.stopPrank();
    }

    function testAlliance() public {
        // Start time
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Deployer transfers crystal, food, and troops to Nation 1, 2, and 3
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Crystal", 1000000);
        admin.dripToken(nation1CapitalAddr, "Food", 1000000);
        admin.dripToken(nation1CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation1CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation1CapitalAddr, "Slinger", 1000);

        admin.dripToken(nation2CapitalAddr, "Crystal", 1000000);
        admin.dripToken(nation2CapitalAddr, "Food", 1000000);
        admin.dripToken(nation2CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation2CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation2CapitalAddr, "Slinger", 1000);

        admin.dripToken(nation3CapitalAddr, "Crystal", 1000000);
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
        armyTemplateAmounts[0] = 50;
        armyTemplateAmounts[1] = 50;
        armyTemplateAmounts[2] = 50;
        time += 10;
        vm.warp(time);
        uint256 army11ID = game.organizeArmy(nation1CapitalID, armyTemplateIDs, armyTemplateAmounts);
        address army11Addr = getter.getAddress(army11ID);

        // Nation 1 deploys Alliance treaty
        Alliance alliance = Alliance(game.deployTreaty(nation1ID, allianceTemplate.name()));
        uint256 allianceID = getter.getEntityByAddress(address(alliance));

        // Nation 1 joins alliance after token approval
        CurioWallet(nation1CapitalAddr).executeTx(address(crystalToken), abi.encodeWithSignature("approve(address,uint256)", address(alliance), 1000));
        alliance.treatyJoin();
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
        alliance.treatyJoin();
        assertEq(crystalToken.balanceOf(nation2CapitalAddr), 1000000);

        // Nation 2 joins alliance after token approval
        vm.startPrank(player2);
        CurioWallet(nation2CapitalAddr).executeTx(address(crystalToken), abi.encodeWithSignature("approve(address,uint256)", address(alliance), 1000));
        alliance.treatyJoin();
        assertTrue(getter.getNationTreatySignature(nation2ID, allianceID) > 0);
        assertEq(crystalToken.balanceOf(nation2CapitalAddr), 1000000 - 1000);
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
        vm.expectRevert("Have not stayed for minimum duration");
        alliance.treatyLeave();
        vm.stopPrank();

        // Nation 2 manages to leave alliance after 10 seconds
        vm.startPrank(player2);
        time += 10;
        vm.warp(time);
        alliance.treatyLeave();
        assertEq(crystalToken.balanceOf(nation2CapitalAddr), 1000000);
        vm.stopPrank();

        // Nation 1 attacks Nation 2's capital
        vm.startPrank(player1);
        time += 2;
        vm.warp(time);
        game.battle(army11ID, nation2CapitalTileID);
        vm.stopPrank();

        // Nation 2 organizes army
        vm.startPrank(player2);
        armyTemplateAmounts[0] = 50;
        armyTemplateAmounts[1] = 50;
        armyTemplateAmounts[2] = 50;
        uint256 army21ID = game.organizeArmy(nation2CapitalID, armyTemplateIDs, armyTemplateAmounts);
        address army21Addr = getter.getAddress(army21ID);
        vm.stopPrank();

        // Nation 3 joins alliance after token approval
        vm.startPrank(player3);
        CurioWallet(nation3CapitalAddr).executeTx(address(crystalToken), abi.encodeWithSignature("approve(address,uint256)", address(alliance), 1000));
        alliance.treatyJoin();
        assertTrue(getter.getNationTreatySignature(nation3ID, allianceID) > 0);

        // Nation 3 organizes army
        armyTemplateAmounts[0] = 55;
        armyTemplateAmounts[1] = 55;
        armyTemplateAmounts[2] = 55;
        uint256 army31ID = game.organizeArmy(nation3CapitalID, armyTemplateIDs, armyTemplateAmounts);
        address army31Addr = getter.getAddress(army31ID);
        assertEq(horsemanToken.balanceOf(army31Addr), 55);

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
        uint256 army11HorsemanBalance = horsemanToken.balanceOf(army11Addr);
        time += 2;
        vm.warp(time);
        vm.expectRevert("Alliance: Cannot besiege army of ally nation");
        alliance.treatyBesiege(army31ID);
        assertEq(horsemanToken.balanceOf(army11Addr), army11HorsemanBalance);
        assertEq(horsemanToken.balanceOf(army31Addr), 55);

        // Nation 1 triggers Alliance to besiege Nation 2's army until it is destroyed
        // Nation 1's army and Nation 3's army should both survive
        assertEq(horsemanToken.balanceOf(army21Addr), 50);
        time += 2;
        vm.warp(time);
        alliance.treatyBesiege(army21ID);
        assertTrue(horsemanToken.balanceOf(army11Addr) < army11HorsemanBalance);
        assertTrue(horsemanToken.balanceOf(army21Addr) < 50);
        assertTrue(horsemanToken.balanceOf(army31Addr) < 90);
        while (getter.getNation(army21ID) != 0) {
            time += 2;
            vm.warp(time);
            alliance.treatyBesiege(army21ID);
        }
        assertEq(getter.getNation(army11ID), nation1ID);
        assertEq(getter.getNation(army31ID), nation3ID);
        vm.stopPrank();
    }

    function testMercenaryLeague() public {
        // Start time
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Deployer transfers crystal, food, and troops to Nation 1, 2, and 3
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Crystal", 1000000);
        admin.dripToken(nation1CapitalAddr, "Food", 1000000);
        admin.dripToken(nation1CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation1CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation1CapitalAddr, "Slinger", 1000);

        admin.dripToken(nation2CapitalAddr, "Crystal", 1000000);
        admin.dripToken(nation2CapitalAddr, "Food", 1000000);
        admin.dripToken(nation2CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation2CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation2CapitalAddr, "Slinger", 1000);

        admin.dripToken(nation3CapitalAddr, "Crystal", 1000000);
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
        armyTemplateAmounts[0] = 50;
        armyTemplateAmounts[1] = 50;
        armyTemplateAmounts[2] = 50;
        time += 10;
        vm.warp(time);
        uint256 army11ID = game.organizeArmy(nation1CapitalID, armyTemplateIDs, armyTemplateAmounts);
        vm.stopPrank();

        vm.startPrank(player2);

        // Nation 2 deploys Alliance treaty
        MercenaryLeague ml = MercenaryLeague(game.deployTreaty(nation2ID, mercenaryLeagueTemplate.name()));
        CurioWallet(nation2CapitalAddr).executeTx(address(crystalToken), abi.encodeWithSignature("approve(address,uint256)", address(ml), 1000));
        vm.stopPrank();

        // Nation 1 joins alliance after token approval
        vm.startPrank(player1);
        ml.treatyJoin();
        ml.setConscriptionFee(500);
        vm.stopPrank();

        // Nation 2 conscripts armies from Nation 1
        vm.startPrank(player2);
        ml.addToWarCouncil(nation2ID);
        ml.conscriptArmies(nation1ID);

        // Nation 2 moves Nation 1's conscripted army from (62, 12) to (62, 29)
        for (uint256 i = 1; i <= 9; i++) {
            time += 1;
            vm.warp(time);
            game.move(army11ID, Position({x: 62, y: 11 + 2 * i}));
        }
        vm.stopPrank();
    }

    function testNAPact() public {
        /**
        Outline:
        - player1 deploys treaty
        - player1 whitelists player2, and then player2 joins
            - player2 needs to first approve token spending
        - player2 battles player1 but reverts
        **/

        // Start time
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Player1 deploys NAPact and whitelists self
        vm.startPrank(player1);
        NonAggressionPact nonAggressionPact = NonAggressionPact(game.deployTreaty(nation1ID, nonAggressionPactTemplate.name()));
        nonAggressionPact.addToWhitelist(nation1ID);
        vm.stopPrank();

        // Deployer registers NAPact treaty & gives troops to p2
        vm.startPrank(deployer);
        admin.dripToken(nation2CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation2CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation2CapitalAddr, "Slinger", 1000);
        vm.stopPrank();

        // Player1 joins NAPact and whitelists player2
        vm.startPrank(player1);
        nonAggressionPact.treatyJoin();
        nonAggressionPact.addToWhitelist(nation2ID);
        vm.stopPrank();

        // Player2 joins NAPact
        vm.startPrank(player2);
        nonAggressionPact.treatyJoin();
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 50;
        armyTemplateAmounts[1] = 50;
        armyTemplateAmounts[2] = 50;
        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256 army21ID = game.organizeArmy(nation2CapitalID, armyTemplateIDs, armyTemplateAmounts);

        // Player2 moves army from (62, 32) to (62, 14)
        for (uint256 i = 34; i > 14; i -= 2) {
            time += 1;
            vm.warp(time);
            game.move(army21ID, Position({x: 62, y: i}));
        }

        // Player2 battles Player1's army but reverted
        uint256 nation1CapitalTileID = getter.getTileAt(getter.getPositionExternal("StartPosition", nation1CapitalID));
        vm.expectRevert("CURIO: Treaty disapproved Battle");
        game.battle(army21ID, nation1CapitalTileID);

        // Player2 leaves treaty and then able to attack
        time += 30;
        vm.warp(time);
        nonAggressionPact.treatyLeave();
        game.battle(army21ID, nation1CapitalTileID);

        vm.stopPrank();
    }

    function testEmbargo() public {
        /** 
        Outline:
        - Player1 deploys sanctionLeague Treaty and whitelists player2
        - Player1 sanctions himself (for simplicity reason; same as sanctioning p3)
        - Player2 joins
        - Player2 transfers crystal from its army to player3's capital but reverted
        **/
        // Start time
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Player1 deploys embargo and whitelists self
        vm.startPrank(player1);
        Embargo embargo = Embargo(game.deployTreaty(nation1ID, embargoTemplate.name()));
        vm.stopPrank();

        // Deployer registers embargo treaty & gives troops to p2 and resources to p1
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Crystal", 1000);
        admin.dripToken(nation1CapitalAddr, "Food", 1000);

        admin.dripToken(nation2CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation2CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation2CapitalAddr, "Slinger", 1000);
        vm.stopPrank();

        // Player1 joins embargo and whitelists player2. Then he sanctions himself
        vm.startPrank(player1);
        embargo.treatyJoin();
        embargo.addToSanctionList(nation1ID);
        vm.stopPrank();

        // Player2 joins embargo
        vm.startPrank(player2);
        embargo.treatyJoin();
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 50;
        armyTemplateAmounts[1] = 50;
        armyTemplateAmounts[2] = 50;
        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256 army21ID = game.organizeArmy(nation2CapitalID, armyTemplateIDs, armyTemplateAmounts);
        address army21Addr = getter.getAddress(army21ID);
        vm.stopPrank();

        // Deployer drips some crystal to army21
        vm.startPrank(deployer);
        admin.dripToken(army21Addr, "Crystal", 1000);
        vm.stopPrank();

        // Player2 moves army from (62, 32) to (62, 14)
        vm.startPrank(player2);
        for (uint256 i = 34; i > 14; i -= 2) {
            time += 1;
            vm.warp(time);
            game.move(army21ID, Position({x: 62, y: i}));
        }

        // Player2 Army's transfer to p1 capital reverts
        vm.expectRevert();
        CurioWallet(army21Addr).executeTx(address(crystalToken), abi.encodeWithSignature("transfer(address,uint256)", nation1CapitalAddr, 10));
        vm.stopPrank();

        // Player 2's capital fails to transfer food to player1's capital
        vm.startPrank(player2);
        vm.expectRevert();
        CurioWallet(nation2CapitalAddr).executeTx(address(foodToken), abi.encodeWithSignature("transfer(address,uint256)", nation1CapitalAddr, 10));
        vm.stopPrank();

        // Player1 removes himself from sanctionList, and then player2 can transfer
        vm.startPrank(player1);
        embargo.removeFromSanctionList(nation1ID);
        vm.stopPrank();

        vm.startPrank(player2);
        CurioWallet(army21Addr).executeTx(address(crystalToken), abi.encodeWithSignature("transfer(address,uint256)", nation1CapitalAddr, 10));
        vm.stopPrank();

        // Player 1's capital transfers food to player 2's capital
        vm.startPrank(player1);
        CurioWallet(nation1CapitalAddr).executeTx(address(foodToken), abi.encodeWithSignature("transfer(address,uint256)", nation2CapitalAddr, 10));
        vm.stopPrank();

        // Player 1 sanctions player2
        vm.startPrank(player1);
        embargo.addToSanctionList(nation2ID);
        vm.stopPrank();

        // Player 1's capital fails to transfer food to player 2's capital
        vm.startPrank(player1);
        vm.expectRevert();
        CurioWallet(nation1CapitalAddr).executeTx(address(foodToken), abi.encodeWithSignature("transfer(address,uint256)", nation2CapitalAddr, 10));
        vm.stopPrank();
    }

    function testCollectiveDefenseFund() public {
        /*
        Outline:
        - deployer gives both resource and troops to p1 and p2
        - Player1 deploys CDFund Treaty and whitelists player2
        - Player2 joins
        - Player2 attacks player1 but reverted
        - Player2 forgot to pay, and player1 kicks player2 out
        - Player2 attacks player1 and succeeds
        */
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Player1 deploys NAPact and whitelists self
        vm.startPrank(player1);
        address collectiveDefenseFundAddr = game.deployTreaty(nation1ID, collectiveDefenseFundTemplate.name());
        CollectiveDefenseFund collectiveDefenseFund = CollectiveDefenseFund(collectiveDefenseFundAddr);
        collectiveDefenseFund.addToWhitelist(nation1ID);
        vm.stopPrank();

        // Deployer registers NAPact treaty & assigns tokens to p1 and p2
        vm.startPrank(deployer);
        // admin.registerTreatyTemplate(address(collectiveDefenseFund), "placeholder ABI");
        admin.dripToken(nation1CapitalAddr, "Crystal", 100000);
        admin.dripToken(nation1CapitalAddr, "Food", 100000);
        admin.dripToken(nation2CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation2CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation2CapitalAddr, "Slinger", 1000);
        admin.dripToken(nation2CapitalAddr, "Crystal", 100000);
        admin.dripToken(nation2CapitalAddr, "Food", 100000);

        vm.stopPrank();

        // Player1 joins CDFund and whitelists player2.
        vm.startPrank(player1);
        CurioWallet(nation1CapitalAddr).executeTx(address(crystalToken), abi.encodeWithSignature("approve(address,uint256)", address(collectiveDefenseFund), 100000));
        CurioWallet(nation1CapitalAddr).executeTx(address(foodToken), abi.encodeWithSignature("approve(address,uint256)", address(collectiveDefenseFund), 100000));
        collectiveDefenseFund.treatyJoin();
        collectiveDefenseFund.addToWhitelist(nation2ID);
        vm.stopPrank();

        // Player2 joins CDFund and attempts to attack Player1
        vm.startPrank(player2);
        CurioWallet(nation2CapitalAddr).executeTx(address(crystalToken), abi.encodeWithSignature("approve(address,uint256)", address(collectiveDefenseFund), 100000));
        CurioWallet(nation2CapitalAddr).executeTx(address(foodToken), abi.encodeWithSignature("approve(address,uint256)", address(collectiveDefenseFund), 100000));
        collectiveDefenseFund.treatyJoin();
        uint256[] memory armyTemplateAmounts = new uint256[](3);
        armyTemplateAmounts[0] = 50;
        armyTemplateAmounts[1] = 50;
        armyTemplateAmounts[2] = 50;
        uint256[] memory armyTemplateIDs = new uint256[](3);
        armyTemplateIDs[0] = warriorTemplateID;
        armyTemplateIDs[1] = horsemanTemplateID;
        armyTemplateIDs[2] = slingerTemplateID;
        uint256 army21ID = game.organizeArmy(nation2CapitalID, armyTemplateIDs, armyTemplateAmounts);

        // Player2 moves army from (62, 32) to (62, 14)
        for (uint256 i = 34; i > 14; i -= 2) {
            time += 1;
            vm.warp(time);
            game.move(army21ID, Position({x: 62, y: i}));
        }

        // Player2 Army battling p1 capital reverts
        uint256 nation1CapitalTile = getter.getTileAt(getter.getPositionExternal("StartPosition", nation1CapitalID));
        vm.expectRevert("CURIO: Treaty disapproved Battle");
        game.battle(army21ID, nation1CapitalTile);
        vm.stopPrank();

        // One day has passed, and p2 is kicked out by p1 cuz he forgot to pay
        time += 86400;
        vm.warp(time);
        vm.startPrank(player1);
        collectiveDefenseFund.addToCouncil(nation1ID);
        collectiveDefenseFund.payMembershipFee();
        collectiveDefenseFund.removeAllOverdueMembers();

        // p1 tries to withdraw money
        uint256 p1PrevCrystalBalance = crystalToken.balanceOf(nation1CapitalAddr);
        uint256 p1PrevFoodBalance = crystalToken.balanceOf(nation1CapitalAddr);
        collectiveDefenseFund.withdraw(10, 10);
        assertTrue(crystalToken.balanceOf(nation1CapitalAddr) == p1PrevCrystalBalance + 10 && foodToken.balanceOf(nation1CapitalAddr) == p1PrevFoodBalance + 10);
        vm.stopPrank();

        // now that p2 is not in the league, he can battle p1
        vm.startPrank(player2);
        game.battle(army21ID, nation1CapitalTile);
        vm.stopPrank();

        // Check conditions
        assertEq(crystalToken.balanceOf(nation2CapitalAddr), 90000);
        assertEq(foodToken.balanceOf(nation2CapitalAddr), 90000);
        assertEq(crystalToken.balanceOf(address(collectiveDefenseFund)), 10000 * 3 - 10);
        assertEq(foodToken.balanceOf(address(collectiveDefenseFund)), 29990);

        // p1 distributes 10 crystal and 10 food to p2
        vm.startPrank(player1);
        collectiveDefenseFund.distributeFund(nation2CapitalID, "Crystal", 10);
        collectiveDefenseFund.distributeFund(nation2CapitalID, "Food", 10);
        assertEq(crystalToken.balanceOf(nation2CapitalAddr), 90010);
        assertEq(foodToken.balanceOf(nation2CapitalAddr), 90010);
        assertEq(crystalToken.balanceOf(address(collectiveDefenseFund)), 29990 - 10);
        assertEq(foodToken.balanceOf(address(collectiveDefenseFund)), 29980);
        vm.stopPrank();

        // p2 fails to distribute 10 crystal to p2
        vm.startPrank(player2);
        vm.expectRevert("CDFund: Only council or pact can call");
        collectiveDefenseFund.distributeFund(nation2CapitalID, "Crystal", 10);
        vm.stopPrank();
    }

    // From PNM
    function testSimpleOTC(
        uint256 crystalAmount,
        uint256 foodAmount,
        uint256 sellAmount,
        uint256 buyAmount
    ) public {
        /**
        Outline
        - p1 deploys contracts and puts on an order to sell 100 crystal for 200 food
        - p2 talks to p1 and decides to purchase from p1
         */
        uint256 time = block.timestamp + 500;
        vm.warp(time);

        // Player1 deploys Simple OTC
        vm.startPrank(player1);
        SimpleOTC otcContract = SimpleOTC(game.deployTreaty(nation1ID, otcContractTemplate.name()));
        vm.stopPrank();

        // Deployer registers Simple OTC treaty & assigns tokens to p1 and p2
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Crystal", crystalAmount);
        admin.dripToken(nation1CapitalAddr, "Food", foodAmount);

        admin.dripToken(nation2CapitalAddr, "Crystal", crystalAmount);
        admin.dripToken(nation2CapitalAddr, "Food", foodAmount);
        vm.stopPrank();

        // Player1 approves tokens
        vm.startPrank(player1);
        CurioWallet(nation1CapitalAddr).executeTx(address(crystalToken), abi.encodeWithSignature("approve(address,uint256)", address(otcContract), 1000));
        CurioWallet(nation1CapitalAddr).executeTx(address(foodToken), abi.encodeWithSignature("approve(address,uint256)", address(otcContract), 1000));
        vm.stopPrank();

        // Player 2 approves tokens
        vm.startPrank(player2);
        CurioWallet(nation2CapitalAddr).executeTx(address(crystalToken), abi.encodeWithSignature("approve(address,uint256)", address(otcContract), 1000));
        CurioWallet(nation2CapitalAddr).executeTx(address(foodToken), abi.encodeWithSignature("approve(address,uint256)", address(otcContract), 1000));
        vm.stopPrank();

        // When order is created, no tokens are transferred
        vm.startPrank(player1);
        otcContract.createOrder("Crystal", sellAmount, "Food", buyAmount);
        assertEq(crystalToken.balanceOf(nation1CapitalAddr), crystalAmount);
        assertEq(foodToken.balanceOf(nation1CapitalAddr), foodAmount);
        vm.stopPrank();

        // Player 2 takes order
        vm.startPrank(player2);
        otcContract.takeOrder(player1);
        assertEq(crystalToken.balanceOf(nation1CapitalAddr), crystalAmount - sellAmount);
        assertEq(foodToken.balanceOf(nation1CapitalAddr), foodAmount + buyAmount);
        assertEq(crystalToken.balanceOf(nation2CapitalAddr), crystalAmount + sellAmount);
        assertEq(foodToken.balanceOf(nation2CapitalAddr), foodAmount - buyAmount);
    }

    function testSimpleOTC() public {
        /**
        Outline
        - p1 deploys contracts and puts on an order to sell 100 crystal for 200 food
        - p2 talks to p1 and decides to purchase from p1
         */
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Player1 deploys Simple OTC
        vm.startPrank(player1);
        SimpleOTC otcContract = SimpleOTC(game.deployTreaty(nation1ID, otcContractTemplate.name()));
        vm.stopPrank();

        // Deployer registers Simple OTC treaty & assigns tokens to p1 and p2
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Crystal", 1000);
        admin.dripToken(nation1CapitalAddr, "Food", 1000);

        admin.dripToken(nation2CapitalAddr, "Crystal", 1000);
        admin.dripToken(nation2CapitalAddr, "Food", 1000);
        vm.stopPrank();

        // Player1 approves tokens
        vm.startPrank(player1);
        CurioWallet(nation1CapitalAddr).executeTx(address(crystalToken), abi.encodeWithSignature("approve(address,uint256)", address(otcContract), 1000));
        CurioWallet(nation1CapitalAddr).executeTx(address(foodToken), abi.encodeWithSignature("approve(address,uint256)", address(otcContract), 1000));
        vm.stopPrank();

        // Player 2 approves tokens
        vm.startPrank(player2);
        CurioWallet(nation2CapitalAddr).executeTx(address(crystalToken), abi.encodeWithSignature("approve(address,uint256)", address(otcContract), 1000));
        CurioWallet(nation2CapitalAddr).executeTx(address(foodToken), abi.encodeWithSignature("approve(address,uint256)", address(otcContract), 1000));
        vm.stopPrank();

        // When order is created, no tokens are transferred
        vm.startPrank(player1);
        otcContract.createOrder("Crystal", 2, "Food", 200);
        assertEq(crystalToken.balanceOf(nation1CapitalAddr), 1000);
        assertEq(foodToken.balanceOf(nation1CapitalAddr), 1000);
        vm.stopPrank();

        // Player 2 takes order
        vm.startPrank(player2);
        otcContract.takeOrder(player1);
        assertEq(crystalToken.balanceOf(nation1CapitalAddr), 998);
        assertEq(foodToken.balanceOf(nation1CapitalAddr), 1200);
        assertEq(crystalToken.balanceOf(nation2CapitalAddr), 1002);
        assertEq(foodToken.balanceOf(nation2CapitalAddr), 800);
    }

    function testHandshakeDeal() public {
        /**
        Outline:
        - p1 proposed a deal to prevent upgrading p2's capital
        - p2 signed the deal
        - p2 attempts to upgrade its capital but fails
         */

        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Player1 deploys Handshake deal and propose
        vm.startPrank(player1);
        HandshakeDeal hsDeal = HandshakeDeal(game.deployTreaty(nation1ID, handshakeDealTemplate.name()));
        hsDeal.treatyJoin();
        hsDeal.proposeDeal1("approveUpgradeCapital", nation2CapitalID, 1000);
        vm.stopPrank();

        // assigns tokens to p1 and p2
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Crystal", 10000000);
        admin.dripToken(nation1CapitalAddr, "Food", 10000000);

        admin.dripToken(nation2CapitalAddr, "Crystal", 10000000);
        admin.dripToken(nation2CapitalAddr, "Food", 10000000);
        vm.stopPrank();

        // Player2 joins treaty and signs the deal
        vm.startPrank(player2);
        uint256[] memory p1Deals = hsDeal.getNationDeals(nation1ID);
        uint256 p1DealID = p1Deals[0];
        hsDeal.treatyJoin();
        hsDeal.signDeal(p1DealID);
        vm.expectRevert("CURIO: Treaty disapproved UpgradeCapital");
        game.upgradeCapital(nation2CapitalID);
    }

    function testCustomTreaty() public {
        /**
        Outline:
        - First register the treaty template, then deploy.
        - p1 proposed a deal to prevent upgrading p2's capital
        - p2 signed the deal
        - p2 attempts to upgrade its capital but fails
         */

        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Player1 deploys Handshake deal and propose
        vm.startPrank(player1);
        CustomTreaty customTreatyTemplate = new CustomTreaty();
        game.registerTreatyTemplate(address(customTreatyTemplate), "sample ABI", "sample metadata");
        CustomTreaty customTreaty = CustomTreaty(game.deployTreaty(nation1ID, "Custom Treaty"));
        customTreaty.treatyJoin();
        customTreaty.proposeDeal1("approveUpgradeCapital", nation2CapitalID, 1000);
        vm.stopPrank();

        // assigns tokens to p1 and p2
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Crystal", 10000000);
        admin.dripToken(nation1CapitalAddr, "Food", 10000000);

        admin.dripToken(nation2CapitalAddr, "Crystal", 10000000);
        admin.dripToken(nation2CapitalAddr, "Food", 10000000);
        vm.stopPrank();

        // Player2 joins treaty and signs the deal
        vm.startPrank(player2);
        uint256[] memory p1Deals = customTreaty.getNationDeals(nation1ID);
        uint256 p1DealID = p1Deals[0];
        customTreaty.treatyJoin();
        customTreaty.signDeal(p1DealID);
        vm.expectRevert("CURIO: Treaty disapproved UpgradeCapital");
        game.upgradeCapital(nation2CapitalID);
    }

    function testLoanAgreement() public {
        uint256 time = block.timestamp + 1000;
        vm.warp(time);
        vm.startPrank(player1);
        LoanAgreement loanAgreement = LoanAgreement(game.deployTreaty(nation1ID, loanAgreementTemplate.name()));
        vm.stopPrank();

        // Deployer drips tokens to player 1 and player 2
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Crystal", 1000);
        admin.dripToken(nation1CapitalAddr, "Food", 1000);
        admin.dripToken(nation2CapitalAddr, "Crystal", 1000);
        admin.dripToken(nation2CapitalAddr, "Food", 1000);
        vm.stopPrank();
        uint256 nationInitialCrystal = crystalToken.balanceOf(nation1CapitalAddr);
        uint256 nationInitialFood = foodToken.balanceOf(nation1CapitalAddr);

        // When loan is created, no tokens are transferred
        vm.startPrank(player1);
        uint256 loanID = loanAgreement.createLoan("Crystal", 500, "Food", 100, 50, 100);
        vm.stopPrank();

        // Player 2 takes loan
        time += 100;
        vm.warp(time);
        vm.startPrank(player2);
        loanAgreement.takeLoan(loanID);
        vm.stopPrank();
        assertEq(crystalToken.balanceOf(nation1CapitalAddr), nationInitialCrystal);
        assertEq(foodToken.balanceOf(nation1CapitalAddr), nationInitialFood - 100);
        assertEq(crystalToken.balanceOf(nation2CapitalAddr), nationInitialCrystal - 500);
        assertEq(foodToken.balanceOf(nation2CapitalAddr), nationInitialFood + 100);
        assertEq(crystalToken.balanceOf(address(loanAgreement)), 500);
        assertEq(foodToken.balanceOf(address(loanAgreement)), 0);

        // Player 1 attempts to liquidate collateral
        time += 50;
        vm.warp(time);
        vm.startPrank(player1);
        vm.expectRevert("Loan: Loan not yet due");
        loanAgreement.liquidateCollateral(loanID);
        vm.stopPrank();

        // Player 3 attempts to pay off loan for player 2
        vm.startPrank(player3);
        vm.expectRevert("Loan: Only borrower can pay off loan");
        loanAgreement.payOffLoan(loanID);
        vm.stopPrank();

        // Player 2 attempts to cancel loan so she does not have to pay it back
        vm.startPrank(player2);
        vm.expectRevert("Loan: Only lender can cancel loan");
        loanAgreement.cancelLoan(loanID);
        vm.stopPrank();

        // Player 2 pays off loan
        time += 60;
        vm.warp(time);
        vm.startPrank(player2);
        loanAgreement.payOffLoan(loanID);
        vm.stopPrank();
        assertEq(crystalToken.balanceOf(nation1CapitalAddr), nationInitialCrystal);
        assertEq(foodToken.balanceOf(nation1CapitalAddr), nationInitialFood + 50);
        assertEq(crystalToken.balanceOf(nation2CapitalAddr), nationInitialCrystal);
        assertEq(foodToken.balanceOf(nation2CapitalAddr), nationInitialFood - 50);
        assertEq(crystalToken.balanceOf(address(loanAgreement)), 0);
        assertEq(foodToken.balanceOf(address(loanAgreement)), 0);

        // Player 1 attempts to liquidate collateral
        vm.startPrank(player1);
        vm.expectRevert("Loan: Loan does not exist");
        loanAgreement.liquidateCollateral(loanID);
        vm.stopPrank();
    }

    function testColonialPact() public {
        uint256 time = block.timestamp + 1000;
        vm.warp(time);

        // Get IDs of relevant tiles and resources
        Position memory tile1Pos = Position({x: 65, y: 30});
        Position memory tile2Pos = Position({x: 65, y: 25});
        uint256 tile1ID = getter.getTileAt(tile1Pos);
        uint256 tile2ID = getter.getTileAt(tile2Pos);
        uint256 resource1ID = getter.getResourceAtTile(tile1Pos);
        uint256 resource2ID = getter.getResourceAtTile(tile2Pos);
        assertEq(getter.getNation(tile1ID), 0);
        assertEq(getter.getNation(tile2ID), 0);
        assertEq(getter.getNation(resource1ID), 0);
        assertEq(getter.getNation(resource2ID), 0);
        uint256 effectiveDuration = 100;

        // Deployer gifts tiles and resources to nation 2
        vm.startPrank(deployer);
        admin.giftTileAndResourceAt(tile1Pos, nation2ID);
        admin.giftTileAndResourceAt(tile2Pos, nation2ID);
        admin.dripToken(nation2CapitalAddr, "Crystal", 1000000000000);
        admin.dripToken(nation2CapitalAddr, "Food", 1000000000000);
        vm.stopPrank();
        assertEq(getter.getNation(tile1ID), nation2ID);
        assertEq(getter.getNation(tile2ID), nation2ID);
        assertEq(getter.getNation(resource1ID), nation2ID);
        assertEq(getter.getNation(resource2ID), nation2ID);

        // Nation 2 upgrades both resources so they can be harvested
        vm.startPrank(player2);
        game.upgradeResource(resource1ID);
        game.upgradeResource(resource2ID);
        vm.stopPrank();
        assertEq(abi.decode(getter.getComponent("Level").getBytesValue(resource1ID), (uint256)), 1);
        assertEq(abi.decode(getter.getComponent("Level").getBytesValue(resource2ID), (uint256)), 1);

        // Nation 1 deploys an instance of Colonial Pact and whitelists nation 2 to be colonial subject
        vm.startPrank(player1);
        ColonialPact pact = ColonialPact(game.deployTreaty(nation1ID, colonialPactTemplate.name()));
        pact.addToWhitelist(nation2ID);
        vm.stopPrank();

        // Nation 2 attempts to join nation 1's pact
        vm.startPrank(player2);
        vm.expectRevert("ColonialPact: Colonizer needs to set tiles first");
        pact.treatyJoin();
        vm.stopPrank();

        // Nation 1 sets effective duration and tiles
        vm.startPrank(player1);
        pact.setEffectiveDuration(effectiveDuration);
        Position[] memory tilePositions = new Position[](2);
        tilePositions[0] = tile1Pos;
        tilePositions[1] = tile2Pos;
        pact.setColonialTiles(tilePositions);
        vm.stopPrank();

        // Nation 2 joins nation 1's pact
        vm.startPrank(player2);
        pact.treatyJoin();
        vm.stopPrank();

        // Nation 2 attempts to harvest resources from their gifted tiles
        time += 2;
        vm.warp(time);
        vm.startPrank(player2);
        vm.expectRevert("CURIO: Not delegated to call HarvestResource");
        game.harvestResource(resource1ID);
        vm.stopPrank();
        uint256 nation2CapitalCrystalAmount = crystalToken.balanceOf(nation2CapitalAddr);
        uint256 nation2CapitalFoodAmount = foodToken.balanceOf(nation2CapitalAddr);
        assertEq(crystalToken.balanceOf(nation1CapitalAddr), 0);
        assertEq(foodToken.balanceOf(nation1CapitalAddr), 0);

        // Nation 1 harvests colonial resources via pact
        time += 5;
        vm.warp(time);
        vm.startPrank(player1);
        pact.harvestColonialResources();
        vm.stopPrank();
        assertEq(crystalToken.balanceOf(nation2CapitalAddr), nation2CapitalCrystalAmount);
        assertEq(foodToken.balanceOf(nation2CapitalAddr), nation2CapitalFoodAmount);
        assertTrue(crystalToken.balanceOf(nation1CapitalAddr) > 0);
        assertTrue(foodToken.balanceOf(nation1CapitalAddr) > 0);
        assertEq(abi.decode(getter.getComponent("LastHarvested").getBytesValue(resource1ID), (uint256)), time);

        // Nation 2 attempts to leave treaty
        time += 3;
        vm.warp(time);
        vm.startPrank(player2);
        vm.expectRevert("ColonialPact: Cannot leave when treaty is in effect");
        pact.treatyLeave();
        vm.stopPrank();

        // After effective duration has passed, Nation 2 leaves treaty
        time += effectiveDuration;
        vm.warp(time);
        vm.startPrank(player2);
        pact.treatyLeave();
        vm.stopPrank();

        // Nation 2 harvests resources from their gifted tiles
        vm.startPrank(player2);
        game.harvestResource(resource1ID);
        game.harvestResource(resource2ID);
        assertTrue(crystalToken.balanceOf(nation2CapitalAddr) > nation2CapitalCrystalAmount);
        assertTrue(foodToken.balanceOf(nation2CapitalAddr) > nation2CapitalFoodAmount);
        vm.stopPrank();

        // Nation 1 attempts to harvest nation 2's resources via pact
        time += 10;
        vm.warp(time);
        vm.startPrank(player1);
        vm.expectRevert("ColonialPact: Treaty has expired");
        pact.harvestColonialResources();
        vm.stopPrank();
    }
}
