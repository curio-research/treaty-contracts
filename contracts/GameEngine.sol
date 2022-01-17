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
// TODO: Find a better formatter lol
contract Game is GameStorage {
    using SafeMath for uint256;

    event NewPlayer(address _player, uint256 _x, uint256 _y);
    event Move(address _player, uint256 _x, uint256 _y);
    event Mine(
        address _player,
        uint256 _x,
        uint256 _y,
        uint256 _blockId,
        uint256 _zIndex
    );
    event Place(address _player, uint256 _x, uint256 _y, uint256 _blockId);
    event Craft(address _player, uint256 _blockId);
    event Attack(address _player1, address _player2); // add attack result here?
    event Death(address _player);

    // initialize game with map, items
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
            s.map[_position.x][_position.y].blocks = _blocks[k]; // FIXME is this safer, or the for loop below?
        }

        // Initialize items
        for (uint256 i = 0; i < _items.length; i++) {
            s.itemsWithMetadata[i] = _items[i];
            s.itemNonce += 1;
        }
    }

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
            energy: s.startPlayerEnergy
        });
        s.allPlayers.push(msg.sender);

        _setOccupierAtPosition(msg.sender, _x, _y);

        emit NewPlayer(msg.sender, _x, _y);
    }

    // player move function
    function move(uint256 _x, uint256 _y) external {
        // add hook here. look at openzeppelin
        if (!_isValidMove(msg.sender, _x, _y)) revert("engine/invalid-move");

        GameTypes.Position memory _position = _getPlayerPosition(msg.sender);
        _setOccupierAtPosition(address(0), _position.x, _position.y); // remove occupier from previous position

        _setPlayerPosition(msg.sender, _x, _y);
        _setOccupierAtPosition(msg.sender, _x, _y);

        emit Move(msg.sender, _x, _y);
    }

    // mine resource blocks at specific z-index base layer (z-index of 0)
    function mine(
        uint256 _x,
        uint256 _y,
        uint256 _zIdx
    ) external {
        uint256 _blockCount = _getBlockCountAtPosition(_x, _y);
        if (_zIdx != _blockCount - 1) revert("engine/no-blocks-available");

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
                    msg.sender,
                    _mineItemIds[i]
                );
                if (_mineItemAmount > 0) {
                    _canMine = true;
                    break;
                }
            }
        }

        if (!_canMine) revert("engine/tool-needed");

        _increaseItemInInventory(msg.sender, _itemId, 1);
        _mine(_x, _y);

        emit Mine(msg.sender, _x, _y, _itemId, _zIdx);
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

        // Logic for allowed blocks to place upon
        // Note: saved for later
        // uint256 _blockId = _getTopBlockAtPosition(_x, _y);
        // bool _placable = false;
        // for (uint256 i = 0; i < s.placeItemIds[_blockId].length; i++) {
        //     if (s.placeItemIds[_blockId][i] == _itemId) {
        //         _placable = true;
        //         break;
        //     }
        // }
        // if (!_placable) revert("engine/cannot-place-on-block");

        // TODO add distance logic here

        _place(_x, _y, _itemId);
        _decreaseItemInInventory(msg.sender, _itemId, 1);

        emit Place(msg.sender, _x, _y, _itemId);
    }

    // craft item (once) based on their recipe
    function craft(uint256 _itemId) external {
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

        _decreaseHealth(_target, s.attackDamage);

        s.lastAttackedAt[msg.sender] = block.timestamp;

        emit Attack(msg.sender, _target);

        if (s.players[_target].health <= 0) {
            _die(_target);
            emit Death(_target);
        }
    }

    function gameName() external pure returns (string memory name) {
        /**
         * For testing purposes
         */

        return "blocky";
    }
}
