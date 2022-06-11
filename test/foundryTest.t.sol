//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "./diamondDeploy.t.sol";
import "contracts/facets/GetterFacet.sol";

// This foundry tests inherits DiamondDeployTest, which sets up the contracts for testing.

contract FoundryTest is Test, DiamondDeployTest {
    function testWorldSize() public {
        WorldConstants memory _worldConstants = getter._getWorldConstants();
        assertEq(_worldConstants.worldWidth, 100);
        assertEq(_worldConstants.worldHeight, 80);
    }
}
