//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {Position, Tower} from "../libraries/Types.sol";
import "../libraries/Storage.sol";
import {GameUtils} from "../libraries/GameUtil.sol";

// ------------------------------------------------------------
// Tower contract
// ------------------------------------------------------------

contract TowerFacet is UseStorage {
    using SafeMath for uint256;
    uint256 private defaultCurrencyIdx = 0; // TODO: refactor this

    event Capture(address _player, Position _position);
    event ClaimReward(address _player, Position _position, uint256 _itemId, uint256 _itemAmount, uint256 _epoch);

    // players can capture the tower if the monsters are the only ones parked next to the towers
    function capture(Position memory _position) external {
        // scan surrounding area and if they're only yours you're the owner
        // you need at least 1 minion to capture
        require(isValidCapture(msg.sender, _position), "tower/invalid-capture");

        // get and set tower's new owner and epoch
        string memory _towerId = GameUtils._encodePos(_position);
        Tower memory tower = gs().towers[_towerId];
        tower.owner = msg.sender;
        tower.lastCapturedEpoch = gs().epoch;
        gs().towers[_towerId] = tower; // set tower

        emit Capture(msg.sender, _position);
    }

    function claimReward(Position memory _position) external {
        string memory _towerId = GameUtils._encodePos(_position);
        Tower memory tower = gs().towers[_towerId];

        require(tower.owner == msg.sender, "tower/not-owner");

        uint256 epoch = gs().epoch;
        uint256 totalReward = (epoch - tower.lastCapturedEpoch) * tower.rewardPerEpoch;

        GameUtils._increaseItemInInventory(msg.sender, tower.itemId, totalReward);
        tower.lastCapturedEpoch = epoch;

        gs().towers[_towerId] = tower; // set tower

        emit ClaimReward(msg.sender, _position, tower.itemId, totalReward, epoch);
    }

    // ------------------------
    // utils
    // ------------------------

    function isValidCapture(address _player, Position memory _position) public view returns (bool) {
        address _leftOwner = GameUtils._getBlockDataAtPos(Position({x: _position.x - 1, y: _position.y})).owner;
        address _rightOwner = GameUtils._getBlockDataAtPos(Position({x: _position.x + 1, y: _position.y})).owner;
        address _topOwner = GameUtils._getBlockDataAtPos(Position({x: _position.x, y: _position.y - 1})).owner;
        address _bottomOwner = GameUtils._getBlockDataAtPos(Position({x: _position.x, y: _position.y + 1})).owner;

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
    function addTower(Position memory _position, Tower memory _tower) public {
        string memory _towerId = GameUtils._encodePos(_position);
        gs().towers[_towerId] = _tower; // set tower
    }

    function addTowerBulk(Position[] memory _positions, Tower[] memory _towers) external {
        for (uint256 i = 0; i < _positions.length; i++) {
            addTower(_positions[i], _towers[i]);
        }
    }

    function getTowerById(Position memory _position) external view returns (Tower memory) {
        string memory _towerId = string(abi.encodePacked(_position.x, _position.y));
        return GameUtils._getTower(_towerId);
    }
}
