//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";
import "./GameStorage.sol";
import "./GameTypes.sol";
import "./Permissions.sol";
import "./GameHelper.sol";

// ------------------------------------------------------------
// Tower contract
// ------------------------------------------------------------

contract TowerGame {
    using SafeMath for uint256;
    GameStorage private utils;
    Permissions private p;
    uint256 private defaultCurrencyIdx;

    // new capture
    event Capture(address _player, GameTypes.Position _position);
    event ClaimReward(address _player, GameTypes.Position _position, uint256 _itemId, uint256 _itemAmount, uint256 _epoch);

    constructor(
        GameStorage _util,
        Permissions _permissions,
        uint256 _defaultCurrencyIdx
    ) {
        utils = _util;
        p = _permissions;
        defaultCurrencyIdx = _defaultCurrencyIdx;
    }

    // ------------------------
    // main functions
    // ------------------------

    // players can capture the tower if the monsters are the only ones parked next to the towers
    function capture(GameTypes.Position memory _position) external {
        // scan surrounding area and if they're only yours you're the owner
        // you need at least 1 minion to capture
        require(isValidCapture(msg.sender, _position), "tower/invalid-capture");

        // get and set tower's new owner and epoch
        string memory _towerId = Helper._encodePos(_position);
        GameTypes.Tower memory tower = utils._getTower(_towerId);
        tower.owner = msg.sender;
        tower.lastCapturedEpoch = utils._getCurrentEpoch();
        utils._setTower(_towerId, tower);

        emit Capture(msg.sender, _position);
    }

    function claimReward(GameTypes.Position memory _position) external {
        string memory _towerId = Helper._encodePos(_position);
        GameTypes.Tower memory tower = utils._getTower(_towerId);

        require(tower.owner == msg.sender, "tower/not-owner");

        uint256 epoch = utils._getCurrentEpoch();
        uint256 totalReward = (epoch - tower.lastCapturedEpoch) * tower.rewardPerEpoch;

        utils._increaseItemInInventory(msg.sender, tower.itemId, totalReward);
        tower.lastCapturedEpoch = block.timestamp;

        utils._setTower(_towerId, tower);

        // add boosters in the future

        emit ClaimReward(msg.sender, _position, tower.itemId, totalReward, epoch);
    }

    // ------------------------
    // utils
    // ------------------------

    function isValidCapture(address _player, GameTypes.Position memory _position) public view returns (bool) {
        address _leftOwner = utils._getBlockDataAtPos(GameTypes.Position({x: _position.x - 1, y: _position.y})).owner;
        address _rightOwner = utils._getBlockDataAtPos(GameTypes.Position({x: _position.x + 1, y: _position.y})).owner;
        address _topOwner = utils._getBlockDataAtPos(GameTypes.Position({x: _position.x, y: _position.y - 1})).owner;
        address _bottomOwner = utils._getBlockDataAtPos(GameTypes.Position({x: _position.x, y: _position.y + 1})).owner;

        address[4] memory _owners = [_leftOwner, _rightOwner, _topOwner, _bottomOwner];
        uint256 _owned;
        for (uint256 i = 0; i < _owners.length; i++) {
            address _owner = _owners[i];
            // if it's not empty
            if (_owner != address(0)) {
                if (_player != _owner) {
                    return false;
                } else {
                    _owned += 1;
                }
            }
        }
        if (_owned != 0) return true;
        return false;
    }

    // add tower to map. using this instead of constructor to avoid bloat
    function addTower(GameTypes.Position memory _position, GameTypes.Tower memory _tower) public {
        string memory _towerId = Helper._encodePos(_position);
        utils._setTower(_towerId, _tower);
    }

    function addTowerBulk(GameTypes.Position[] memory _positions, GameTypes.Tower[] memory _towers) external {
        for (uint256 i = 0; i < _positions.length; i++) {
            addTower(_positions[i], _towers[i]);
        }
    }

    function getTowerById(GameTypes.Position memory _position) external view returns (GameTypes.Tower memory) {
        string memory _towerId = string(abi.encodePacked(_position.x, _position.y));
        return utils._getTower(_towerId);
    }
}
