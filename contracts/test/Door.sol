//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "../Permissions.sol";
import "../GameTypes.sol";
import "../GameStorage.sol";

contract Door {
    mapping(address => bool) private whitelist;
    Permissions private p;
    GameStorage private utils;
    address private owner;
    uint256 private idx = 9; // FIXME

    constructor(
        address[] memory _whitelist,
        Permissions _permissions,
        GameStorage _gameStorage
    ) {
        whitelist[tx.origin] = true;
        for (uint256 i = 0; i < _whitelist.length; i++) {
            whitelist[_whitelist[i]] = true;
        }

        p = _permissions;
        utils = _gameStorage;
        owner = tx.origin;
    }

    modifier onlyOwner() {
        require(tx.origin == owner, "only owner can perform this operation.");
        _;
    }

    modifier onlyWhitelist() {
        require(whitelist[tx.origin], "only whitelisted player can perform this action");
        _;
    }

    function setWhitelistPlayer(address player, bool whitelisted) public onlyOwner {
        whitelist[player] = whitelisted;
    }

    function open() public onlyWhitelist {
        GameTypes.ItemWithMetadata memory door = utils._getItem(idx);
        door.occupiable = true;
        utils._setItem(idx, door);
    }

    function close() public onlyWhitelist {
        GameTypes.ItemWithMetadata memory door = utils._getItem(idx);
        door.occupiable = false;
        utils._setItem(idx, door);
    }
}