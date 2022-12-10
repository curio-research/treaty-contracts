//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {ITreaty} from "contracts/interfaces/ITreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";
import {console} from "forge-std/console.sol";

contract Alliance is ITreaty {
    address public diamond;
    string public name;
    GetterFacet public getter;

    constructor(address _diamond) {
        require(_diamond != address(0), "FTX: Diamond address required");

        diamond = _diamond;
        name = "Alliance";
        getter = GetterFacet(_diamond);
    }
}
