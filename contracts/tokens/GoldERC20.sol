//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";

contract GoldERC20 is ERC20 {
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
        uint8 _decimals,
        address _deployer
    ) ERC20(_name, _symbol, _decimals) {
        _mint(_deployer, 9999999999999);
    }

}
