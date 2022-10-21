//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";

contract CurioERC20 is ERC20 {
    /// Needed functions:
    /// - approve
    /// - transfer
    /// - transferFrom
    /// - permit
    /// - _mint (internal)
    /// - _burn (internal)

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) ERC20(_name, _symbol, _decimals) {}

    function approve(address spender, uint256 amount) public override returns (bool) {
        return super.approve(spender, amount);
    }
}
