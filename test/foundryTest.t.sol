//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "./diamondDeploy.t.sol";
import "contracts/facets/GetterFacet.sol";

// This foundry tests inherits DiamondDeployTest, which sets up the contracts for testing.

contract FoundryTest is Test, DiamondDeployTest {
    function test1() public {
        uint256 val = getter._getSample();
        assertEq(val, 12345);
    }
}
