//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "hardhat/console.sol";
import "../Permissions.sol";

contract Block {
    mapping(address => bool) public whitelist;
    Permissions private p;
    address private owner;

    constructor(
        address[] memory _whitelist,
        Permissions _permissions
    ) {
        for (uint256 i = 0; i < _whitelist.length; i++) {
            whitelist[_whitelist[i]] = true;
        }

        p = _permissions;
        owner = tx.origin;
    }

    modifier onlyOwner() {
        require(tx.origin == owner, "only owner can perform this operation.");
        _;
    }

    function setWhitelistPlayer(address _player, bool _isWhitelisted) public onlyOwner {
        whitelist[_player] = _isWhitelisted;
    }
}