// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CurioWallet {
    address public diamond;

    constructor(address _diamond) {
        require(_diamond != address(0), "CurioWallet: Diamond address required");

        diamond = _diamond;
    }
}
