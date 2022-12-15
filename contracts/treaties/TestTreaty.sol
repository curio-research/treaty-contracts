//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/CurioTreaty.sol";
import {console} from "forge-std/console.sol";

contract TestTreaty is CurioTreaty {
    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Test Treaty";
        description = "Treaty for testing";
    }

    function approveUpgradeCapital(uint256 _nationID, bytes memory _encodedParams) public pure override returns (bool) {
        return false;
    }
}
