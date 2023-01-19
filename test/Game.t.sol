//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {DiamondDeployTest} from "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent} from "contracts/TypedComponents.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {CurioWallet} from "contracts/standards/CurioWallet.sol";
import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
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
    // - [ ] upgradeTile
    // - [ ] recoverTile
    // - [ ] disownTile
    // Production:
    // - [x] startTroopProduction
    // - [ ] stopTroopProduction
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
    // - [ ] battle (army vs. tile)
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

    function testGameParameter() public {
        string memory identifier = "Goldmine-Gold-Yield--1";
        uint256 oldValue = 743;
        uint256 newValue = 1000;

        // Verify original state
        uint256 parameterID = getter.getComponent("Tag").getEntitiesWithValue(abi.encode(identifier))[0];
        assertEq(abi.decode(getter.getComponent("Amount").getBytesValue(parameterID), (uint256)), oldValue);

        // Set new value
        vm.prank(deployer);
        admin.setGameParameter(identifier, newValue);

        // Verify new state
        assertEq(abi.decode(getter.getComponent("Amount").getBytesValue(parameterID), (uint256)), newValue);
    }

    function testOrganizeDisbandMoveArmy() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 600;
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

        uint256 army11ID = game.organizeArmy(nation1CapitalID, chinaArmyTemplateIDs, chinaTemplateAmounts);
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
        uint256 time = block.timestamp + 600;

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
        armyTemplateAmounts[0] = 500;
        armyTemplateAmounts[1] = 500;
        armyTemplateAmounts[2] = 500;
        vm.warp(time + 10);
        time += 10;

        vm.warp(time + 10);
        time += 10;

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

        // Note: just enough to kill army 11
        uint256 battleTime = 8;

        for (uint256 i = 0; i < battleTime; i++) {
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
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 600;
        // Deployer transfer enough gold & food to nation 1 & 2
        vm.startPrank(deployer);

        admin.dripToken(nation1CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation1CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation1CapitalAddr, "Slinger", 1000);
        admin.dripToken(nation1CapitalAddr, "Food", 1000000);
        admin.dripToken(nation1CapitalAddr, "Gold", 1000000);

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
        armyTemplateAmounts[0] = 500;
        armyTemplateAmounts[1] = 500;
        armyTemplateAmounts[2] = 500;
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

        uint256 battleTime = 2;
        for (uint256 i = 0; i < battleTime; i++) {
            vm.warp(time + 10);
            time += 10;
            game.battle(army11ID, targetTileID);
        }
        assertEq(guardToken.balanceOf(targetTileAddress), 0);

        time += 10;
        vm.warp(time);
        game.upgradeCapital(nation1CapitalID);
        game.claimTile(army11ID, targetTileID);

        assertEq(getter.getEntityLevel(nation1CapitalID), 2);
        assertEq(getter.getNation(targetTileID), nation1ID);

        // Nation 1 move capital to new tile
        time += 10;
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

    function testBattleCapitalChaos() public {
        // Start time
        uint256 time = block.timestamp + 500;
        vm.warp(time);

        // Deployer transfers gold, food, and troops to Nation 1 and Nation 2
        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Gold", 1000000);
        admin.dripToken(nation1CapitalAddr, "Food", 1000000);
        admin.dripToken(nation1CapitalAddr, "Warrior", 1000);
        admin.dripToken(nation1CapitalAddr, "Horseman", 1000);
        admin.dripToken(nation1CapitalAddr, "Slinger", 1000);

        admin.dripToken(nation2CapitalAddr, "Gold", 1000000);
        admin.dripToken(nation2CapitalAddr, "Food", 1000000);
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
        armyTemplateAmounts[0] = 500;
        armyTemplateAmounts[1] = 500;
        armyTemplateAmounts[2] = 500;
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
        time += 200;
        vm.warp(time);
        game.upgradeCapital(nation2CapitalID);
        vm.stopPrank();
    }

    function testHarvest() public {
        vm.startPrank(deployer);

        // this tile and its resource is next to nation1 capital
        Position memory farmTilePos = Position({x: 60, y: 5});
        admin.giftTileAndResourceAt(Position({x: 60, y: 5}), nation1ID);

        admin.dripToken(nation1CapitalAddr, "Gold", 1000000);
        admin.dripToken(nation1CapitalAddr, "Food", 1000000);

        vm.stopPrank();

        uint256 time = block.timestamp + 600;
        vm.warp(time);
        vm.startPrank(player1);
        game.upgradeCapital(nation1CapitalID);
        uint256 nation1CapitalID = getter.getCapital(nation1ID);

        time += 20;
        vm.warp(time);
        game.harvestResourcesFromCapital(nation1CapitalID);

        uint256 goldBalance1 = goldToken.balanceOf(nation1CapitalAddr);
        uint256 foodBalance1 = foodToken.balanceOf(nation1CapitalAddr);
        assertTrue(goldBalance1 > 1000000);
        assertTrue(foodBalance1 > 1000000);

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
        uint256 time = block.timestamp + 600;

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
        armyTemplateAmounts[0] = 500;
        armyTemplateAmounts[1] = 500;
        armyTemplateAmounts[2] = 500;

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
        game.endGather(army11ID);
        uint256 armyFoodBalance = foodToken.balanceOf(army11Addr);
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
        uint256 time = block.timestamp + 500;
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
    //     uint256 time = block.timestamp + 500;
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
    //     armyTemplateAmounts[0] = 500;
    //     armyTemplateAmounts[1] = 500;
    //     armyTemplateAmounts[2] = 500;
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
        uint256 time = block.timestamp + 500;
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
        uint256 time = block.timestamp + 500;
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
        time += 50;
        vm.warp(time);
        vm.startPrank(player2);
        game.upgradeCapital(nation2CapitalID);
        vm.stopPrank();

        // No idle nations are removed for being idle for 1000 seconds
        time += 20;
        vm.warp(time);
        vm.startPrank(deployer);
        admin.removeIdleNations(1000);
        assertTrue(getter.isPlayerWhitelistedByGame(player1));
        assertTrue(getter.isPlayerWhitelistedByGame(player2));
        assertTrue(getter.isPlayerWhitelistedByGame(player3));
        vm.stopPrank();

        // Nation 3 is removed for being idle for 500 seconds
        vm.startPrank(deployer);
        admin.removeIdleNations(500);
        assertFalse(getter.isPlayerWhitelistedByGame(player3));
        assertEq(getter.getCapital(nation3ID), 0);
        vm.stopPrank();

        // Nation 1 is removed for being idle for 50 seconds
        vm.startPrank(deployer);
        admin.removeIdleNations(50);
        assertFalse(getter.isPlayerWhitelistedByGame(player1));
        assertEq(getter.getCapital(nation1ID), 0);
        vm.stopPrank();

        // Nation 2 is removed for being idle for 10 seconds
        vm.startPrank(deployer);
        admin.removeIdleNations(10);
        assertFalse(getter.isPlayerWhitelistedByGame(player2));
        assertEq(getter.getCapital(nation2ID), 0);
        vm.stopPrank();
    }

    function testDelegateAll() public {
        // Start time
        uint256 time = block.timestamp + 500;
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
}
