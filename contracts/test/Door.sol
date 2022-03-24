//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "../Permissions.sol";
import "../GameTypes.sol";

contract Door {
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

    function setWhitelistPlayer(address player, bool whitelisted) public onlyOwner {
        whitelist[player] = whitelisted;
    }

    function isWhitelisted(address player) public view returns (bool) {
        return whitelist[player];
    }
}