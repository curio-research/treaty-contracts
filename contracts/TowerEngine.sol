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

    uint256 BASE_ITEM_ID = 0;

    event StakeTower(
        address _player,
        GameTypes.Position _towerPos,
        uint256 _playerPoints,
        uint256 _towerPoints
    );
    event UnstakeTower(
        address _player,
        GameTypes.Position _towerPos,
        uint256 _playerPoints,
        uint256 _towerPoints
    );
    event ClaimReward(
        address _player,
        GameTypes.Position _towerPos,
        uint256 _itemId,
        uint256 _itemAmount,
        uint256 _epoch
    );

    constructor(GameStorage _util, Permissions _permissions) {
        utils = _util;
        p = _permissions;
    }

    // add tower to map. using this instead of constructor to avoid bloat
    function addTower(
        GameTypes.Position memory _position,
        GameTypes.Tower memory _tower
    ) public {
        string memory _towerId = Helper._encodePos(_position);
        utils._setTower(_towerId, _tower);
    }

    function addTowerBulk(
        GameTypes.Position[] memory _positions,
        GameTypes.Tower[] memory _towers
    ) external {
        for (uint256 i = 0; i < _positions.length; i++) {
            addTower(_positions[i], _towers[i]);
        }
    }

    function _modifyRewardByBlockLocation(
        uint256 _reward,
        GameTypes.Position memory _pos
    ) public view returns (uint256) {
        uint256 _blockId = utils._getBlockAtPos(_pos);

        // update the list based on item mapping
        if (_blockId == 5) {
            return _reward * 2;
        } else if (_blockId == 6) {
            return 0;
        }
        return _reward;
    }

    // claim reward for tower
    // if we have a gamemode that the tower is occupiable, then when user claims reward we check if the creature belongs to them or not
    function claimReward(GameTypes.Position memory _position) external {
        string memory _towerId = Helper._encodePos(_position);
        GameTypes.Tower memory tower = utils._getTower(_towerId);

        if (tower.owner != msg.sender) revert("tower/invalid-tower-owner");

        uint256 currentEpoch = utils._getCurrentEpoch();
        uint256 totalReward = (currentEpoch - tower.stakedTime) *
            tower.rewardPerEpoch;

        // we assume here towers aren't on map edges
        uint256 _r1 = _modifyRewardByBlockLocation(
            totalReward,
            GameTypes.Position({x: _position.x - 1, y: _position.y})
        );
        uint256 _r2 = _modifyRewardByBlockLocation(
            _r1,
            GameTypes.Position({x: _position.x + 1, y: _position.y})
        );
        uint256 _r3 = _modifyRewardByBlockLocation(
            _r2,
            GameTypes.Position({x: _position.x, y: _position.y - 1})
        );
        uint256 _rFinal = _modifyRewardByBlockLocation(
            _r3,
            GameTypes.Position({x: _position.x, y: _position.y + 1})
        );

        utils._increaseItemInInventory(msg.sender, tower.itemId, _rFinal);
        tower.stakedTime = currentEpoch;
        utils._setTower(_towerId, tower);

        emit ClaimReward(
            msg.sender,
            _position,
            tower.itemId,
            _rFinal,
            currentEpoch
        );
    }

    // NOTE: We assume that item 1 is default currency of the universe that's used to stake towers, always
    // _amount is the amount to send
    function stake(GameTypes.Position memory _position, uint256 _amount)
        public
    {
        GameTypes.PlayerData memory playerData = utils._getPlayer(msg.sender);
        string memory _towerId = Helper._encodePos(_position);
        GameTypes.Tower memory tower = utils._getTower(_towerId);

        // if the user doesn't own the tower, they need to stake more points
        if (tower.owner != msg.sender) {
            require(_amount > tower.stakedAmount, "Insufficient points");
        }

        if (msg.sender != tower.owner) {
            require(
                utils._withinDistance(_position, playerData.position, 1),
                "tower/not-within-distance"
            );
        }

        // check inventory points to see if there are sufficient points
        if (utils._getItemAmountById(msg.sender, BASE_ITEM_ID) < _amount)
            revert("tower/insufficient-points");

        // if it's not the owner (which means it's an overtake), set the points
        if (tower.owner != msg.sender) {
            tower.stakedAmount = _amount;
        } else {
            // if not, reinforce points
            tower.stakedAmount += _amount;
        }

        if (msg.sender != tower.owner) {
            tower.stakedTime = utils._getCurrentEpoch(); // only change epoch time if there's a new owner
            tower.owner = msg.sender; // set new owner if it's not the original owner
        }

        utils._setTower(_towerId, tower);
        utils._decreaseItemInInventory(msg.sender, BASE_ITEM_ID, _amount); // deduct item 1 count from staking user

        emit StakeTower(
            msg.sender,
            _position,
            utils._getItemAmountById(msg.sender, BASE_ITEM_ID),
            tower.stakedAmount
        );
    }

    // unstake resource from tower
    function unstake(GameTypes.Position memory _position, uint256 _amount)
        external
    {
        GameTypes.PlayerData memory playerData = utils._getPlayer(msg.sender);
        string memory _towerId = Helper._encodePos(_position);
        GameTypes.Tower memory tower = utils._getTower(_towerId);

        if (msg.sender != tower.owner) {
            require(
                utils._withinDistance(_position, playerData.position, 1),
                "tower/not-within-distance"
            );
        }

        if (tower.owner != msg.sender) revert("tower/invalid-tower-owner");
        if (tower.stakedAmount < _amount) revert("tower/withdraw-overflow");

        tower.stakedAmount -= _amount;

        // if user unstakes all the points, they're no longer the owner
        if (utils._getTower(_towerId).stakedAmount == 0) {
            tower.owner = address(0);
        }

        utils._setTower(_towerId, tower);

        utils._increaseItemInInventory(msg.sender, BASE_ITEM_ID, _amount);

        emit UnstakeTower(
            tower.owner,
            _position,
            utils._getItemAmountById(msg.sender, BASE_ITEM_ID),
            utils._getTower(_towerId).stakedAmount
        );
    }

    function getTowerById(GameTypes.Position memory _position)
        external
        view
        returns (GameTypes.Tower memory)
    {
        string memory _towerId = string(
            abi.encodePacked(_position.x, _position.y)
        );
        return utils._getTower(_towerId);
    }
}
