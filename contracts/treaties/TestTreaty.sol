//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {CurioTreaty} from "contracts/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";
import {console} from "forge-std/console.sol";

contract TestTreaty is CurioTreaty {
    GetterFacet public getter;

    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Test Treaty";
        getter = GetterFacet(_diamond);
    }

    function approveUpgradeCapital(uint256 _nationID) public pure override returns (bool) {
        return false;
    }
}
