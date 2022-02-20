//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";
import "./GameStorage.sol";
import "./GameTypes.sol";
import "./Permissions.sol";
import "./GameHelper.sol";

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
        uint256 _reward,
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

    // user claim reward for tower
    function claimReward(GameTypes.Position memory _position) external {
        string memory _towerId = Helper._encodePos(_position);
        GameTypes.Tower memory tower = utils._getTower(_towerId);

        // should we add a distance checker here?
        if (tower.owner != msg.sender) revert("tower/invalid-tower-owner");

        uint256 currentEpoch = utils._getCurrentEpoch();
        uint256 stakedEpochs = currentEpoch - tower.stakedTime;
        uint256 totalReward = stakedEpochs * tower.rewardPerEpoch;

        utils._increaseItemInInventory(msg.sender, tower.itemId, totalReward);
        tower.stakedTime = currentEpoch;
        utils._setTower(_towerId, tower);

        emit ClaimReward(msg.sender, _position, totalReward, currentEpoch);
    }

    // stake in tower
    function stake(GameTypes.Position memory _position, uint256 _amount)
        public
    {
        string memory _towerId = Helper._encodePos(_position);

        // add checker for distance

        if (
            !utils._withinDistance(
                _position,
                utils._getPlayer(msg.sender).position,
                2
            )
        ) revert("tower/outside-distance");

        GameTypes.Tower memory tower = utils._getTower(_towerId);
        if (tower.stakedAmount >= _amount) revert("tower/insufficient-stake");
        if (utils._getStakePointsByUser(msg.sender) < _amount)
            revert("tower/insufficient-points");

        // return points to previous tower owner
        utils._setPlayerStakedPoints(
            tower.owner,
            utils._getStakePointsByUser(tower.owner) + tower.stakedAmount
        );

        uint256 currentEpoch = utils._getCurrentEpoch();
        // check inventory points to see if there are sufficient points

        tower.owner = msg.sender;
        tower.stakedTime = currentEpoch;
        tower.stakedAmount = _amount;
        utils._setTower(_towerId, tower);

        utils._setPlayerStakedPoints(
            msg.sender,
            utils._getStakePointsByUser(msg.sender) - _amount
        );
        (msg.sender, _amount);

        emit StakeTower(
            msg.sender,
            _position,
            utils._getStakePointsByUser(msg.sender),
            tower.stakedAmount
        );
    }

    // unstake in tower
    function unstake(GameTypes.Position memory _position, uint256 _amount)
        external
    {
        if (
            !utils._withinDistance(
                _position,
                utils._getPlayer(msg.sender).position,
                2
            )
        ) revert("tower/outside-distance");

        string memory _towerId = Helper._encodePos(_position);

        GameTypes.Tower memory tower = utils._getTower(_towerId);
        if (tower.owner != msg.sender) revert("tower/invalid-tower-owner");
        if (tower.stakedAmount < _amount) revert("tower/withdraw-overflow");

        tower.stakedAmount -= _amount;
        utils._setTower(_towerId, tower);

        utils._setPlayerStakedPoints(msg.sender, tower.stakedAmount + _amount);

        // if user unstakes all the points, they're no longer the owner
        if (utils._getTower(_towerId).stakedAmount == 0) {
            tower.owner = address(0);
            utils._setTower(_towerId, tower);
        }

        emit UnstakeTower(
            msg.sender,
            _position,
            utils._getStakePointsByUser(msg.sender),
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
