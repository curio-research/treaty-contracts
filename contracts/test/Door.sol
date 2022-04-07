//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "../Permissions.sol";
import {Position, BlockData} from "../GameTypes.sol";
import "../GameStorage.sol";

contract Door {
    mapping(address => bool) private whitelist;
    Permissions private p;
    GameStorage private utils;
    address private owner;
    uint256 private itemIdx;

    constructor(
        address[] memory _whitelist,
        Permissions _permissions,
        GameStorage _gameStorage,
        uint256 _doorIdx
    ) {
        whitelist[msg.sender] = true;
        for (uint256 i = 0; i < _whitelist.length; i++) {
            whitelist[_whitelist[i]] = true;
        }

        p = _permissions;
        utils = _gameStorage;
        owner = msg.sender;
        itemIdx = _doorIdx;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can perform this operation.");
        _;
    }

    modifier onlyWhitelist() {
        require(whitelist[msg.sender], "only whitelisted player can perform this action");
        _;
    }

    function _hasDoorNearby() private view returns (bool) {
        Position memory _playerPos = utils._getPlayer(msg.sender).position;

        Position memory _leftPos = Position({x: _playerPos.x - 1, y: _playerPos.y});
        if (utils._getBlockDataAtPos(_leftPos).blockId == itemIdx) return true;

        Position memory _rightPos = Position({x: _playerPos.x + 1, y: _playerPos.y});
        if (utils._getBlockDataAtPos(_rightPos).blockId == itemIdx) return true;

        Position memory _abovePos = Position({x: _playerPos.x, y: _playerPos.y - 1});
        if (utils._getBlockDataAtPos(_abovePos).blockId == itemIdx) return true;

        Position memory _belowPos = Position({x: _playerPos.x, y: _playerPos.y + 1});
        if (utils._getBlockDataAtPos(_belowPos).blockId == itemIdx) return true;

        return false;
    }

    function setWhitelistPlayer(address player, bool whitelisted) public onlyOwner {
        whitelist[player] = whitelisted;
    }

    // when the door is opened it should only affect a single door, hence changing the worldBlockData structure
    function open(uint256 _worldBlockId) public onlyWhitelist {
        // require(_hasDoorNearby(), "must have door nearby");
        BlockData memory worldBlockData = utils._getWorldBlockData(_worldBlockId);
        worldBlockData.occupiable = true;
        utils._setWorldBlockProperty(_worldBlockId, worldBlockData);
    }

    function close(uint256 _worldBlockId) public onlyWhitelist {
        // require(_hasDoorNearby(), "must have door nearby");
        BlockData memory worldBlockData = utils._getWorldBlockData(_worldBlockId);
        worldBlockData.occupiable = false;
        utils._setWorldBlockProperty(_worldBlockId, worldBlockData);
    }
}
