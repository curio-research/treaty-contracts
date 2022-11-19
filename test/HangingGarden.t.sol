//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Test} from "forge-std/Test.sol";
import {DiamondDeployTest} from "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {console} from "forge-std/console.sol";

contract TreatyTest is Test, DiamondDeployTest {
    function testInitialization() public {
        // Verify that wallet address is loaded correctly
        assertEq(getter.getEntityWallet(nation1ID), address(nationWallet1));

        // Verify that capital is established correctly
        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 nation2CapitalID = getter.getCapital(nation2ID);
        Position memory nation1CapitalPosition = getter.getPositionExternal("StartPosition", nation1CapitalID);
        Position memory nation2CapitalPosition = getter.getPositionExternal("StartPosition", nation2CapitalID);

        assertEq(nation1CapitalPosition.x, nation1Pos.x);
        assertEq(nation1CapitalPosition.y, nation1Pos.y);

        assertEq(getter.getEntityNation(nation1CapitalID), nation1ID);
        assertEq(getter.getNationName(nation1ID), "China");

        // Verify that tile is initialized correctly
        uint256 nation1CapitalTile = getter.getTileAt(nation1CapitalPosition);
        assertEq(getter.getEntityNation(nation1CapitalTile), nation1ID);

        // Verify that TileGuard tokens are dripped to tile wallet
        uint256 correctTileGuardAmount = getter.getConstant("Tile", "Guard", "Amount", "", getter.getEntityLevel(nation1CapitalTile));
        assertEq(guardContract.checkBalanceOf(deployerAddress), 9999999999999);
        assertEq(guardContract.checkBalanceOf(getter.getEntityWallet(nation1CapitalTile)), correctTileGuardAmount);

        uint256 nation2CapitalTile = getter.getTileAt(nation2CapitalPosition);
        assertEq(getter.getEntityNation(nation2CapitalTile), nation2ID);

        // Verify that armies are initialized correctly
        uint256[] memory nation1ArmyIDs = getter.getNationArmies(nation1ID);
        assertEq(nation1ArmyIDs.length, 2);
        assertEq(getter.getEntityNation(nation1ArmyIDs[0]), nation1ID);
        assertEq(getter.getEntityNation(nation1ArmyIDs[1]), nation1ID);

        // fixme: how to test error from the delegate call?
        // vm.prank(nation1Address);
        // vm.expectRevert("CURIO: Army max count reached");
        // nationWallet1.executeGameTX(abi.encodeWithSignature("initializeArmy(address)", address(0)));
    }

    function testOrganizeDisbandMoveArmy() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 600;
        // Deployer transfer enough gold & food to nation 1
        vm.startPrank(deployerAddress);
        warriorContract.transfer(address(nationWallet1), 1000);
        horsemanContract.transfer(address(nationWallet1), 1000);
        slingerContract.transfer(address(nationWallet1), 1000);

        assertEq(warriorContract.checkBalanceOf(address(nationWallet1)), 1000);
        assertEq(horsemanContract.checkBalanceOf(address(nationWallet1)), 1000);
        assertEq(slingerContract.checkBalanceOf(address(nationWallet1)), 1000);

        vm.stopPrank();
        // Nation 1 organize army
        vm.startPrank(nation1Address);

        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 nation1Army1ID = getter.getArmyIDByAddress(address(armyWallet11));

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

        nationWallet1.executeGameTX(
            abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])",
            nation1CapitalID, nation1Army1ID, chinaArmyTemplateIDs, chinaTemplateAmounts));
        
        assertEq(warriorContract.checkBalanceOf(address(nationWallet1)) + warriorContract.checkBalanceOf(address(armyWallet11)), 1000);
        assertEq(slingerContract.checkBalanceOf(address(nationWallet1)) + warriorContract.checkBalanceOf(address(armyWallet11)), 1000);
        assertEq(horsemanContract.checkBalanceOf(address(nationWallet1)) + warriorContract.checkBalanceOf(address(armyWallet11)), 1000);

        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", nation1Army1ID, 63, 13));
        assertEq(getter.getPositionExternal("Position", nation1Army1ID).x, 63);
        assertEq(getter.getPositionExternal("Position", nation1Army1ID).y, 13);

        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", nation1Army1ID, 62, 12));

        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("disbandArmy(uint256)", nation1Army1ID));
        assertEq(warriorContract.checkBalanceOf(address(armyWallet11)), 0);
        assertEq(slingerContract.checkBalanceOf(address(armyWallet11)), 0);
        assertEq(horsemanContract.checkBalanceOf(address(armyWallet11)), 0);
        assertEq(warriorContract.checkBalanceOf(address(nationWallet1)), 1000);
        assertEq(slingerContract.checkBalanceOf(address(nationWallet1)), 1000);
        assertEq(horsemanContract.checkBalanceOf(address(nationWallet1)), 1000);
    }

    function testBattleArmy() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 600;
        // Deployer transfer enough gold & food to nation 1 & 2
        vm.startPrank(deployerAddress);
        warriorContract.transfer(address(nationWallet1), 1000);
        horsemanContract.transfer(address(nationWallet1), 1000);
        slingerContract.transfer(address(nationWallet1), 1000);
        warriorContract.transfer(address(nationWallet2), 1000);
        horsemanContract.transfer(address(nationWallet2), 1000);
        slingerContract.transfer(address(nationWallet2), 1000);

        vm.stopPrank();

        // Nation 1 organize army
        vm.startPrank(nation1Address);

        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 army11ID = getter.getArmyIDByAddress(address(armyWallet11));

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
        nationWallet1.executeGameTX(
            abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])",
            nation1CapitalID, army11ID, armyTemplateIDs, armyTemplateAmounts));
        
        // Nation 1 move army
        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 12));

        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 14));

        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 16));

        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 18));

        vm.stopPrank();

        // Nation 2 organize army
        vm.startPrank(nation2Address);

        uint256 nation2CapitalID = getter.getCapital(nation2ID);
        uint256 army21ID = getter.getArmyIDByAddress(address(armyWallet21));

        vm.warp(time + 10);
        time += 10;
        nationWallet2.executeGameTX(
            abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])",
            nation2CapitalID, army21ID, armyTemplateIDs, armyTemplateAmounts));

        vm.warp(time + 10);
        time += 10;
        armyWallet21.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army21ID, 60, 30));

        vm.warp(time + 10);
        time += 10;
        armyWallet21.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army21ID, 60, 28));

        vm.warp(time + 10);
        time += 10;
        armyWallet21.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army21ID, 60, 26));

        vm.warp(time + 10);
        time += 10;
        armyWallet21.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army21ID, 60, 24));

        vm.warp(time + 10);
        time += 10;
        armyWallet21.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army21ID, 60, 22));

        vm.stopPrank();

        // give army 11 some resources to test if it goes to army 21
        vm.startPrank(deployerAddress);
        goldContract.transfer(address(armyWallet11), 1000);
        foodContract.transfer(address(armyWallet11), 1000);

        vm.stopPrank();

        vm.startPrank(nation2Address);

        // Note: just enough to kill army 11
        uint256 battleTime = 8;

        for (uint256 i = 0; i < battleTime; i++) {
        vm.warp(time + 10);
        time += 10;
        armyWallet21.executeGameTX(abi.encodeWithSignature("battle(uint256,uint256)", army21ID, army11ID));
        }

        vm.stopPrank();
        assertEq(warriorContract.checkBalanceOf(address(armyWallet11)), 0);
        assertEq(horsemanContract.checkBalanceOf(address(armyWallet11)), 0);
        assertEq(slingerContract.checkBalanceOf(address(armyWallet11)), 0);
        assertEq(goldContract.checkBalanceOf(address(armyWallet11)), 0);
        assertEq(foodContract.checkBalanceOf(address(armyWallet11)), 0);

        // Note: resource successfully transferred to army 21
        assertEq(goldContract.checkBalanceOf(address(armyWallet21)), 1000);
        assertEq(foodContract.checkBalanceOf(address(armyWallet21)), 1000);
    }

    function testUpgradeNationBattleClaimTile() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 600;
        // Deployer transfer enough gold & food to nation 1 & 2
        vm.startPrank(deployerAddress);
        warriorContract.transfer(address(nationWallet1), 1000);
        horsemanContract.transfer(address(nationWallet1), 1000);
        slingerContract.transfer(address(nationWallet1), 1000);
        goldContract.transfer(address(nationWallet1), 1000000);
        foodContract.transfer(address(nationWallet1), 1000000);
        vm.stopPrank();

        // Nation 1 organize army
        vm.startPrank(nation1Address);

        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 army11ID = getter.getArmyIDByAddress(address(armyWallet11));

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
        nationWallet1.executeGameTX(
            abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])",
            nation1CapitalID, army11ID, armyTemplateIDs, armyTemplateAmounts));

        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 10));

        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 8));

        vm.warp(time + 10);
        time += 10;
        Position memory targetTilePos = Position({x:60, y:5});
        uint256 targetTileID = getter.getTileAt(targetTilePos);
        address targetTileAddress = getter.getEntityWallet(targetTileID);

        uint256 battleTime = 2;
        for (uint256 i = 0; i < battleTime; i++) {
            vm.warp(time + 10);
            time += 10;
            armyWallet11.executeGameTX(abi.encodeWithSignature("battle(uint256,uint256)", army11ID, targetTileID));
        }
        assertEq(guardContract.checkBalanceOf(targetTileAddress), 0);

        vm.warp(time + 10);
        time += 10;
        nation1ID = getter.getNationIDByAddress(address(nationWallet1));
        nationWallet1.executeGameTX(abi.encodeWithSignature("upgradeNation(uint256)", nation1ID));
        armyWallet11.executeGameTX(abi.encodeWithSignature("claimTile(uint256,uint256)", army11ID, targetTileID));

        assertEq(getter.getEntityLevel(nation1ID), 2);
        assertEq(getter.getEntityNation(targetTileID), nation1ID);
    }

    function testHarvest() public {
        // bug: lastChaos time is 0. This is wrong.
        vm.startPrank(deployerAddress);
        uint256 nation1ID = getter.getNationIDByAddress(address(nationWallet1));
        // this tile and its resource is next to nation1 capital
        Position memory farmTilePos = Position({x:60, y:5});
        admin.giftTileAndResourceAt(Position({x:60, y:5}), nation1ID);

        goldContract.transfer(address(nationWallet1), 1000000);
        foodContract.transfer(address(nationWallet1), 1000000);

        vm.stopPrank();

        uint256 time = block.timestamp + 600;
        vm.warp(time);

        vm.startPrank(nation1Address);
        nationWallet1.executeGameTX(abi.encodeWithSignature("upgradeNation(uint256)", nation1ID));
        uint256 nation1CapitalID = getter.getCapital(nation1ID);

        nationWallet1.executeGameTX(abi.encodeWithSignature("harvestResourcesFromCapital(uint256)", nation1CapitalID));

        uint256 goldBalance1 = goldContract.checkBalanceOf(address(nationWallet1));
        uint256 foodBalance1 = foodContract.checkBalanceOf(address(nationWallet1));
        assertTrue(goldBalance1 > 1000000);
        assertTrue(foodBalance1 > 1000000);

        uint256 farmID = getter.getResourceAtTile(farmTilePos);
        nationWallet1.executeGameTX(abi.encodeWithSignature("upgradeResource(uint256)", farmID));

        uint256 foodBalance2 = foodContract.checkBalanceOf(address(nationWallet1));

        time += 50;
        vm.warp(time);
        nationWallet1.executeGameTX(abi.encodeWithSignature("harvestResource(uint256)", farmID));
        assertTrue(foodContract.checkBalanceOf(address(nationWallet1)) > foodBalance2);
    }

    function testGather() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 600;
        // Deployer transfer enough gold & food to nation 1 & 2
        vm.startPrank(deployerAddress);
        warriorContract.transfer(address(nationWallet1), 1000);
        horsemanContract.transfer(address(nationWallet1), 1000);
        slingerContract.transfer(address(nationWallet1), 1000);

        vm.stopPrank();

        // Nation 1 organize army
        vm.startPrank(nation1Address);

        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 army11ID = getter.getArmyIDByAddress(address(armyWallet11));

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
        nationWallet1.executeGameTX(
            abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])",
            nation1CapitalID, army11ID, armyTemplateIDs, armyTemplateAmounts));

        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 10));

        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 8));

        vm.warp(time + 10);
        time += 10;
        Position memory targetTilePos = Position({x:60, y:5});
        uint256 resourceID = getter.getResourceAtTile(targetTilePos);

        // Army Gather Food
        armyWallet11.executeGameTX(abi.encodeWithSignature("startGather(uint256,uint256)", army11ID, resourceID));
        vm.warp(time + 50);
        time += 50;
        armyWallet11.executeGameTX(abi.encodeWithSignature("endGather(uint256)", army11ID));
        uint256 armyFoodBalance = foodContract.checkBalanceOf(address(armyWallet11));
        assertTrue(armyFoodBalance > 0);

        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 10));

        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, 12));
        armyWallet11.executeGameTX(abi.encodeWithSignature("unloadResources(uint256)", army11ID));
        console.log(foodContract.checkBalanceOf(address(armyWallet11)));
        assertEq(foodContract.checkBalanceOf(address(armyWallet11)), 0);
        assertEq(foodContract.checkBalanceOf(address(nationWallet1)), armyFoodBalance);
    }

    // TODO: Test troop production & upgrade/recover tiles
    function testHomiePolicy() public {
        // bug: lastChaos time is 0. This is wrong.
        uint256 time = block.timestamp + 600;
        // Deployer transfer enough gold & food to nation 1 & 2
        vm.startPrank(deployerAddress);
        warriorContract.transfer(address(nationWallet1), 1000);
        horsemanContract.transfer(address(nationWallet1), 1000);
        slingerContract.transfer(address(nationWallet1), 1000);
        goldContract.transfer(address(nationWallet1), 1000000);
        foodContract.transfer(address(nationWallet1), 1000000);
        vm.stopPrank();

        // Nation 1 organize army
        vm.startPrank(nation1Address);

        uint256 nation1CapitalID = getter.getCapital(nation1ID);
        uint256 army11ID = getter.getArmyIDByAddress(address(armyWallet11));

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
        nationWallet1.executeGameTX(
            abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])",
            nation1CapitalID, army11ID, armyTemplateIDs, armyTemplateAmounts));

        // Nation 1's army11 becomes a homie of Nation 2 !!!
        uint256 homieFee = nationWallet2.inquireHomieFee();
        nationWallet1.executeTX(address(goldContract), 
        abi.encodeWithSignature("approve(address,uint256)", address(nationWallet2), homieFee));

        abi.encodeWithSignature("becomeAHomie(address)", address(armyWallet11)));

        // army11 now able to enter sacred land of its homie (capital is 60,30)
        uint256 y_coordinate = 30;

        for (uint256 curr_coordinate = 12; curr_coordinate <= y_coordinate; curr_coordinate += 2) {
        vm.warp(time + 10);
        time += 10;
        armyWallet11.executeGameTX(abi.encodeWithSignature("move(uint256,uint256,uint256)", army11ID, 60, curr_coordinate));
        }
    }
}
