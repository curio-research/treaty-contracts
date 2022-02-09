//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./GameStorage.sol";
import "./GameTypes.sol";

/// @title Game physics engine
/// @notice the game engine takes care of low level interactions such as "move" and "craft" item.
/// the actual "finite game" mechanics should live in another file, the one that players play.

// TODO: Add proxy upgradeable

contract Game is GameStorage {
    using SafeMath for uint256;

    // ------------------------------------------------------------
    // Events
    // ------------------------------------------------------------

    event NewPlayer(address _player, uint256 _x, uint256 _y);
    event Move(address _player, uint256 _x, uint256 _y);
    event MineItem(
        address _player,
        uint256 _x,
        uint256 _y,
        uint256 _blockId,
        uint256 _zIndex
    );
    event AttackItem(address _player, uint256 _x, uint256 _y, uint256 _zIndex);
    event Place(address _player, uint256 _x, uint256 _y, uint256 _blockId);
    event Craft(address _player, uint256 _blockId);
    event Attack(address _player1, address _player2); // add attack result here?
    event Death(address _player);
    event Transfer(
        address _player,
        address _recipient,
        uint256 _id,
        uint256 _amount
    );

    // ------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------

    constructor(
        uint256 _worldWidth,
        uint256 _worldHeight,
        uint256 _moveRange,
        uint256 _attackRange,
        uint256 _attackDamage,
        uint256 _attackWaitTime,
        uint256 _startPlayerHealth,
        uint256 _startPlayerEnergy,
        uint256[][] memory _blocks,
        GameTypes.ItemWithMetadata[] memory _items
    ) {
        s.worldWidth = _worldWidth;
        s.worldHeight = _worldHeight;
        s.itemNonce = 1; // valid blockId start at 1. Id 0 = no blocks
        s.moveRange = _moveRange;
        s.attackRange = _attackRange;
        s.attackDamage = _attackDamage;
        s.attackWaitTime = _attackWaitTime;
        s.startPlayerHealth = _startPlayerHealth;
        s.startPlayerEnergy = _startPlayerEnergy;

        // Set map and blocks
        uint256 _positionCount = _worldWidth * _worldHeight;
        for (uint256 k = 0; k < _positionCount; k++) {
            GameTypes.Position memory _position = _getPositionFromIndex(k);
            s.map[_position.x][_position.y].blocks = _blocks[k];

            // this is buggy. removing for now and assume each block has 1 block
            // if (_blocks[k].length > 0) {
            //     uint256 topBlockId = _blocks[k][_blocks[k].length - 1];
            //     s.map[_position.x][_position.y].topLevelStrength = _items[
            //         topBlockId
            //     ].strength;
            // }
        }

        // Initialize items
        for (uint256 i = 0; i < _items.length; i++) {
            s.itemsWithMetadata[i] = _items[i];
            s.itemNonce += 1;
        }
    }

    // initialize player
    function initializePlayer(uint256 _x, uint256 _y) public {
        if (s.players[msg.sender].initialized)
            revert("engine/player-already-initialized");

        // check if target coordinate has block or another player
        if (_isOccupied(_x, _y)) revert("engine/location-occupied");

        s.players[msg.sender] = GameTypes.PlayerData({
            initialized: true,
            initTimestamp: block.timestamp,
            playerAddr: msg.sender,
            alive: true,
            position: GameTypes.Position(_x, _y),
            health: s.startPlayerHealth,
            energy: s.startPlayerEnergy,
            reach: 6
        });
        s.allPlayers.push(msg.sender);

        _setOccupierAtPosition(msg.sender, _x, _y);

        s.stakePoints[msg.sender] = 100;

        emit NewPlayer(msg.sender, _x, _y);
    }

    // player move function
    // refactor this into Position struct?
    function move(uint256 _x, uint256 _y) external {
        if (!_isValidMove(msg.sender, _x, _y)) revert("engine/invalid-move");

        GameTypes.Position memory _position = _getPlayerPosition(msg.sender);
        _setOccupierAtPosition(address(0), _position.x, _position.y); // remove occupier from previous position

        _setPlayerPosition(msg.sender, _x, _y);
        _setOccupierAtPosition(msg.sender, _x, _y);

        emit Move(msg.sender, _x, _y);
    }

    function mineItem(
        uint256 _x,
        uint256 _y,
        uint256 _zIdx,
        address _playerAddr
    ) public {
        // can only mine with the needed tool
        uint256 _itemId = _getBlockAtPosition(_x, _y, _zIdx);

        uint256[] memory _mineItemIds = s
            .itemsWithMetadata[_itemId]
            .mineItemIds;
        bool _canMine = false;
        if (_mineItemIds.length == 0) {
            _canMine = true;
        } else {
            for (uint256 i = 0; i < _mineItemIds.length; i++) {
                uint256 _mineItemAmount = _getItemAmountById(
                    _playerAddr,
                    _mineItemIds[i]
                );
                if (_mineItemAmount > 0) {
                    _canMine = true;
                    break;
                }
            }
        }

        if (!_canMine) revert("engine/tool-needed");

        _increaseItemInInventory(_playerAddr, _itemId, 1);
        _mine(_x, _y);

        emit MineItem(_playerAddr, _x, _y, _itemId, _zIdx);
    }

    function attackItem(
        uint256 _x,
        uint256 _y,
        uint256 _zIdx,
        address _playerAddr
    ) public {
        _changeTopLevelStrengthAtPosition(_x, _y, s.attackDamage, false);

        emit AttackItem(_playerAddr, _x, _y, _zIdx);
    }

    // mine resource blocks at specific z-index base layer (z-indexf of 0)
    function mine(
        uint256 _x,
        uint256 _y,
        uint256 _zIdx
    ) external {
        uint256 _blockCount = _getBlockCountAtPosition(_x, _y);
        if (_blockCount == 0) revert("engine/nonexistent-block");
        if (_zIdx != _blockCount - 1) revert("engine/nonexistent-block");

        if (s.attackDamage < _getTopLevelStrengthAtPosition(_x, _y)) {
            attackItem(_x, _y, _zIdx, msg.sender);
        } else {
            mineItem(_x, _y, _zIdx, msg.sender);
        }
    }

    // place item at block
    function place(
        uint256 _x,
        uint256 _y,
        uint256 _itemId
    ) external {
        if (_getItemAmountById(msg.sender, _itemId) == 0)
            revert("engine/insufficient-inventory");
        if (
            _getPlayerPosition(msg.sender).x == _x &&
            _getPlayerPosition(msg.sender).y == _y
        ) revert("engine/cannot-stand-on-block");

        // TODO add distance logic here

        _place(_x, _y, _itemId);
        _decreaseItemInInventory(msg.sender, _itemId, 1);

        emit Place(msg.sender, _x, _y, _itemId);
    }

    // craft item (once) based on their recipe
    function craft(uint256 _itemId) external {
        if (_itemId > _getItemNonce()) revert("engine/nonexistent-block");
        if (_isItemActive(_itemId)) revert("engine/inactive-block");

        // loop through player inventory to check if player has all required ingredients to make a block
        GameTypes.ItemWithMetadata memory _item = s.itemsWithMetadata[_itemId];
        for (uint256 i = 0; i < _item.craftItemIds.length; i++) {
            uint256 craftItemId = _item.craftItemIds[i];
            uint256 craftItemAmount = _item.craftItemAmounts[i];

            if (s.inventory[msg.sender][craftItemId] < craftItemAmount) {
                revert("engine/insufficient-material");
            } else {
                // deduct material from player inventory count
                _decreaseItemInInventory(
                    msg.sender,
                    craftItemId,
                    craftItemAmount
                );
            }
        }

        _increaseItemInInventory(msg.sender, _itemId, 1);

        emit Craft(msg.sender, _itemId);
    }

    function attack(address _target) external {
        // attacks are both time-limited and range-limited
        if (_target == address(0)) revert("engine/no-target");

        if (!_isValidAttack(msg.sender, _target))
            revert("engine/invalid-attack");

        _changeHealth(_target, s.attackDamage, false);

        emit Attack(msg.sender, _target);

        if (s.players[_target].health <= 0) {
            // _die(_target);
            emit Death(_target);
        }
    }

    // ------------------------------------------------------------
    // Tower
    // ------------------------------------------------------------

    // add tower to map. using this instead of constructor to avoid bloat
    function addTower(
        GameTypes.Position memory _position,
        GameTypes.Tower memory _tower
    ) external {
        string memory _towerId = _encodePos(_position);
        s.towers[_towerId] = _tower;
    }

    // user claim reward for tower
    function claimReward(GameTypes.Position memory _position) external {
        string memory _towerId = _encodePos(_position);
        GameTypes.Tower memory tower = s.towers[_towerId];

        // should we add a distance checker here?
        if (tower.owner != msg.sender) revert("tower/invalid-tower-owner");

        uint256 currentEpoch = s.epochController.epoch();

        uint256 stakedEpochs = currentEpoch - tower.stakedTime;
        uint256 totalReward = stakedEpochs * tower.rewardPerEpoch;

        _increaseItemInInventory(msg.sender, tower.itemId, totalReward);
        s.towers[_towerId].stakedTime = currentEpoch;

        emit ClaimReward(msg.sender, _towerId, totalReward);
    }

    // stake in tower
    function stake(GameTypes.Position memory _position, uint256 _amount)
        external
    {
        string memory _towerId = _encodePos(_position);

        // add checker for distance

        if (!_withinDistance(_position, s.players[msg.sender].position, 2))
            revert("tower/outside-distance");

        GameTypes.Tower storage tower = s.towers[_towerId];
        if (tower.stakedAmount >= _amount) revert("tower/insufficient-stake");
        if (s.stakePoints[msg.sender] < _amount)
            revert("tower/insufficient-points");

        s.stakePoints[msg.sender] += tower.stakedAmount; // return points to previous tower owner

        uint256 currentEpoch = s.epochController.epoch();
        // check inventory points to see if there are sufficient points
        tower.owner = msg.sender;
        tower.stakedTime = currentEpoch;
        tower.stakedAmount = _amount;

        s.stakePoints[msg.sender] -= _amount; // subtract points from user power

        emit StakeTower(msg.sender, _towerId, _amount);
    }

    // unstake in tower
    function unstake(GameTypes.Position memory _position, uint256 _amount)
        external
    {
        if (!_withinDistance(_position, s.players[msg.sender].position, 2))
            revert("tower/outside-distance");

        string memory _towerId = _encodePos(_position);

        GameTypes.Tower storage tower = s.towers[_towerId];
        if (tower.owner != msg.sender) revert("tower/invalid-tower-owner");
        if (tower.stakedAmount < _amount) revert("tower/withdraw-overflow");

        tower.stakedAmount -= _amount;

        // if user unstakes all the points, they're no longer the owner
        if (tower.stakedAmount == 0) {
            tower.owner = address(0);
        }

        emit UnstakeTower(msg.sender, _towerId, _amount);
    }

    function getTowerById(GameTypes.Position memory _position)
        external
        view
        returns (GameTypes.Tower memory)
    {
        string memory _towerId = string(
            abi.encodePacked(_position.x, _position.y)
        );
        return s.towers[_towerId];
    }
}
