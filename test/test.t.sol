//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";

contract FoundryTest is Test {
    constructor() {}

    function testOne() public {
        require(1 == 1, "sample test");
    }
}
