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

    function setWhitelistPlayer(address player, bool whitelisted) public onlyOwner {
        whitelist[player] = whitelisted;
    }

    function open() public {
        require(whitelist[tx.origin], "only whitelisted player can perform this action");

        uint256 _idx = 9; // FIXME
        GameTypes.ItemWithMetadata memory door = utils._getItem(_idx);
        door.occupiable = true;
        utils._setItem(_idx, door);
    }

    function close() public {
        require(whitelist[tx.origin], "only whitelisted player can perform this action");

        uint256 _idx = 9; // FIXME
        GameTypes.ItemWithMetadata memory door = utils._getItem(_idx);
        door.occupiable = false;
        utils._setItem(_idx, door);
    }
}