//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/CurioTreaty.sol";
import {console} from "forge-std/console.sol";

contract TestTreaty is CurioTreaty {
    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Test Treaty";
    }

    function approveUpgradeCapital(uint256 _nationID) public pure override returns (bool) {
        return false;
    }
}
