//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Test} from "forge-std/Test.sol";
import {DiamondDeployTest} from "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {console} from "forge-std/console.sol";

contract TreatyTest is Test, DiamondDeployTest {

    function testNationsInitialization() public {
        // Verify that wallet address is loaded correctly 
        assertEq(getter.getNationWallet(nation1ID), address(nationWallet1));

        // Verify that capital is established correctly
        uint256 nation1Capital = getter.getCapital(nation1ID);
        uint256 nation2Capital = getter.getCapital(nation2ID);
        Position memory nation1CapitalPosition = getter.getPositionExternal("StartPosition", nation1Capital);
        Position memory nation2CapitalPosition = getter.getPositionExternal("StartPosition", nation2Capital);

        assertEq(nation1CapitalPosition.x, nation1Pos.x);
        assertEq(nation1CapitalPosition.y, nation1Pos.y);
        
        assertEq(getter.getEntityNation(nation1Capital), nation1ID);
        assertEq(getter.getNationName(nation1ID), "China");

        // Verify that tile is initialized correctly
        uint256 nation1CapitalTile = getter.getTileAt(nation1CapitalPosition);
        assertEq(getter.getEntityNation(nation1CapitalTile), nation1ID);

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
        // nationWallet1.executeTransaction(abi.encodeWithSignature("initializeArmy(address)", address(0)));

    }


}