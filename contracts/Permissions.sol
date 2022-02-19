//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Permissions {
    mapping(address => bool) perms;
    address owner;

    modifier onlyOwner {
        require(msg.sender == owner, "only owner can perform this operation.");
        _;
    }

    constructor(address _owner, address[] memory _whitelist) {
        owner = _owner;
        for (uint256 i = 0; i < _whitelist.length; i++) {
            perms[_whitelist[i]] = true;
        }
    }

    function addPermission(address _player) public onlyOwner {
        perms[_player] = true;
    }

    function removePermission(address _player) public onlyOwner {
        perms[_player] = false;
    }
}