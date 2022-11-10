//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";

contract FoodERC20 is ERC20 {
    /// Outline:
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
    ) ERC20(_name, _symbol, _decimals) {
        _mint(msg.sender, 10000);
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        // TODO

        return super.approve(spender, amount);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        return true;
    }

    function _canTransfer() private returns (bool) {
        // TODO
        return true;
    }
}
