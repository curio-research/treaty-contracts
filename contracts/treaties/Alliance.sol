//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";
import {console} from "forge-std/console.sol";

contract Alliance is CurioTreaty {
    CurioERC20 public goldToken;

    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Alliance";
        goldToken = getter.getTokenContract("Gold");
    }

    function join() public override {
        // Transfer 1000 gold from nation to treaty
        address nationCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        goldToken.transferFrom(nationCapitalAddress, address(this), 1000);

        super.join();
    }
}
