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
        assertEq(getter.getPositionExternal("StartPosition", nation1Capital).x, nation1Pos.x);
        assertEq(getter.getPositionExternal("StartPosition", nation1Capital).y, nation1Pos.y);
        assertEq(getter.getEntityNation(nation1Capital), nation1ID);
        assertEq(getter.getNationName(nation1ID), "China");
    }

    
}