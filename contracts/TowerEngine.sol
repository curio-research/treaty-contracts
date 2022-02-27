//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";
import "./GameStorage.sol";
import "./GameTypes.sol";
import "./Permissions.sol";
import "./GameHelper.sol";

import "hardhat/console.sol";

// ------------------------------------------------------------
// Tower contract
// ------------------------------------------------------------

contract TowerGame {
    using SafeMath for uint256;
    GameStorage private utils;
    Permissions private p;

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
    ) external {
        string memory _towerId = Helper._encodePos(_position);
        utils._setTower(_towerId, _tower);
    }

    function _modifyRewardByBlockLocation(
        uint256 _reward,
        GameTypes.Position memory _pos
    ) public view returns (uint256) {
        // if there's no blocks at the location, return original value
        if (utils._getBlockCountAtPosition(_pos) == 0) {
            return _reward;
        }
        uint256 _blockId = utils._getTopBlockAtPosition(_pos);
        // update the list based on item mapping
        if (_blockId == 5) {
            return _reward * 2;
        } else if (_blockId == 6) {
            return 0;
        }
        console.log(_reward);
        return _reward;
    }

    // claim reward for tower
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

    // NOTE: We assume that item 1 is default currency of the universe that's used to stake towers
    function stake(GameTypes.Position memory _position, uint256 _amount)
        public
    {
        GameTypes.PlayerData memory playerData = utils._getPlayer(msg.sender);
        require(
            utils._withinDistance(_position, playerData.position, 1),
            "tower/not-within-distance"
        );
        string memory _towerId = Helper._encodePos(_position);

        GameTypes.Tower memory tower = utils._getTower(_towerId);
        if (tower.stakedAmount >= _amount) revert("tower/insufficient-stake");
        if (utils._getItemAmountById(msg.sender, 1) < _amount)
            revert("tower/insufficient-points");

        // return points to previous tower owner
        utils._increaseItemInInventory(tower.owner, 1, tower.stakedAmount);

        uint256 currentEpoch = utils._getCurrentEpoch();
        // check inventory points to see if there are sufficient points

        tower.owner = msg.sender;
        tower.stakedTime = currentEpoch;
        tower.stakedAmount = _amount;
        utils._setTower(_towerId, tower);

        // deduct item 1 count from staking user
        utils._decreaseItemInInventory(msg.sender, 1, _amount);

        emit StakeTower(
            msg.sender,
            _position,
            utils._getItemAmountById(msg.sender, 1),
            tower.stakedAmount
        );
    }

    // unstake in tower
    function unstake(GameTypes.Position memory _position, uint256 _amount)
        external
    {
        GameTypes.PlayerData memory playerData = utils._getPlayer(msg.sender);
        require(
            utils._withinDistance(_position, playerData.position, 1),
            "tower/not-within-distance"
        );

        string memory _towerId = Helper._encodePos(_position);

        GameTypes.Tower memory tower = utils._getTower(_towerId);
        if (tower.owner != msg.sender) revert("tower/invalid-tower-owner");
        if (tower.stakedAmount < _amount) revert("tower/withdraw-overflow");

        tower.stakedAmount -= _amount;
        utils._setTower(_towerId, tower);

        // add item 1 back to user
        utils._increaseItemInInventory(msg.sender, 1, _amount);

        // if user unstakes all the points, they're no longer the owner
        if (utils._getTower(_towerId).stakedAmount == 0) {
            tower.owner = address(0);
            utils._setTower(_towerId, tower);
        }

        emit UnstakeTower(
            msg.sender,
            _position,
            utils._getItemAmountById(msg.sender, 1),
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
