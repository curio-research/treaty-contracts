//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import '../Permissions.sol';
import '../GameTypes.sol';
import '../GameStorage.sol';

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
        whitelist[msg.sender] = true;
        for (uint256 i = 0; i < _whitelist.length; i++) {
            whitelist[_whitelist[i]] = true;
        }

        p = _permissions;
        utils = _gameStorage;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'only owner can perform this operation.');
        _;
    }

    modifier onlyWhitelist() {
        require(whitelist[msg.sender], 'only whitelisted player can perform this action');
        _;
    }

    function hasDoorNearby() private view returns (bool) {
        GameTypes.Position memory _playerPos = utils._getPlayer(msg.sender).position;

        GameTypes.Position memory _leftPos = GameTypes.Position({x: _playerPos.x - 1, y: _playerPos.y});
        if (utils._getBlockAtPos(_leftPos) == idx) return true;

        GameTypes.Position memory _rightPos = GameTypes.Position({x: _playerPos.x + 1, y: _playerPos.y});
        if (utils._getBlockAtPos(_rightPos) == idx) return true;

        GameTypes.Position memory _abovePos = GameTypes.Position({x: _playerPos.x, y: _playerPos.y - 1});
        if (utils._getBlockAtPos(_abovePos) == idx) return true;

        GameTypes.Position memory _belowPos = GameTypes.Position({x: _playerPos.x, y: _playerPos.y + 1});
        if (utils._getBlockAtPos(_belowPos) == idx) return true;

        return false;
    }

    function setWhitelistPlayer(address player, bool whitelisted) public onlyOwner {
        whitelist[player] = whitelisted;
    }

    function open() public onlyWhitelist {
        require(hasDoorNearby(), 'must have door nearby');
        GameTypes.ItemWithMetadata memory door = utils._getItem(idx);
        door.occupiable = true;
        utils._setItem(idx, door);
    }

    function close() public onlyWhitelist {
        require(hasDoorNearby(), 'must have door nearby');
        GameTypes.ItemWithMetadata memory door = utils._getItem(idx);
        door.occupiable = false;
        utils._setItem(idx, door);
    }
}
