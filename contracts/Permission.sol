//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// @title Permission control center for all contracts

contract Permission {
    mapping(address => bool) canWrite;

    function setPermission(address _address, bool _bool) public {
        canWrite[_address] = _bool;
    }
}
