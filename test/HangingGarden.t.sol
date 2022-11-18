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
        console.log(">>> testInitialization passed");      
    }

    function testOrganizeDisbandArmy() public {
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
        uint256 nation1Army1ID = getter.getArmyID(address(armyWallet11));

        uint256[] memory chinaArmyTemplateIDs = new uint256[](3);
        chinaArmyTemplateIDs[0] = warriorTemplateID;
        chinaArmyTemplateIDs[1] = horsemanTemplateID;
        chinaArmyTemplateIDs[2] = slingerTemplateID;
        uint256[] memory chinaTemplateAmounts = new uint256[](3);
        chinaTemplateAmounts[0] = 500;
        chinaTemplateAmounts[1] = 500;
        chinaTemplateAmounts[2] = 500;
        // bug: lastChaos time is 0. This is wrong.
        vm.warp(600);

        nationWallet1.executeGameTX(
            abi.encodeWithSignature("organizeArmy(uint256,uint256,uint256[],uint256[])",
            nation1CapitalID, nation1Army1ID, chinaArmyTemplateIDs, chinaTemplateAmounts));
        
        assertEq(warriorContract.checkBalanceOf(address(nationWallet1)) + warriorContract.checkBalanceOf(address(armyWallet11)), 1000);
        assertEq(slingerContract.checkBalanceOf(address(nationWallet1)) + warriorContract.checkBalanceOf(address(armyWallet11)), 1000);
        assertEq(horsemanContract.checkBalanceOf(address(nationWallet1)) + warriorContract.checkBalanceOf(address(armyWallet11)), 1000);

        console.log("Army 11 Warrior Balance: ", warriorContract.checkBalanceOf(address(armyWallet11)));
        console.log("Army 11 Horseman Balance: ", horsemanContract.checkBalanceOf(address(armyWallet11)));
        console.log("Army 11 Slinger Balance: ", slingerContract.checkBalanceOf(address(armyWallet11)));
        console.log("Army 11 Position:", getter.getPositionExternal("Position", nation1Army1ID).x, " ", getter.getPositionExternal("Position", nation1Army1ID).x);

        vm.warp(5);
        armyWallet11.executeGameTX(abi.encodeWithSignature("disbandArmy(uint256)", nation1Army1ID));
        assertEq(warriorContract.checkBalanceOf(address(armyWallet11)), 0);
        assertEq(slingerContract.checkBalanceOf(address(armyWallet11)), 0);
        assertEq(horsemanContract.checkBalanceOf(address(armyWallet11)), 0);
        assertEq(warriorContract.checkBalanceOf(address(nationWallet1)), 1000);
        assertEq(slingerContract.checkBalanceOf(address(nationWallet1)), 1000);
        assertEq(horsemanContract.checkBalanceOf(address(nationWallet1)), 1000);

        console.log(">>> testOrganizeDisbandArmy passed");
    }
}
