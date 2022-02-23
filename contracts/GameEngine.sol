//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./GameStorage.sol";
import "./GameTypes.sol";
import "./Permissions.sol";

/// @title Game physics engine
/// @notice the game engine takes care of low level interactions such as "move" and "craft" item.
/// the actual "finite game" mechanics should live in another file, the one that players play.

// TODO: Add proxy upgradeable

contract Game {
    using SafeMath for uint256;
    GameStorage private utils;
    Permissions private p;

    // ------------------------------------------------------------
    // Events
    // ------------------------------------------------------------

    event NewPlayer(address _player, GameTypes.Position _pos);
    event Move(address _player, GameTypes.Position _pos);
    event MineItem(
        address _player,
        GameTypes.Position _pos,
        uint256 _blockId,
        uint256 _zIndex
    );
    event AttackItem(
        address _player,
        GameTypes.Position _pos,
        uint256 _strength,
        uint256 _zIndex
    );
    event Place(address _player, GameTypes.Position _pos, uint256 _blockId);
    event Craft(address _player, uint256 _blockId);
    event Attack(address _player1, address _player2); // add attack result here?
    event Death(address _player);

    // for some reason when we emit a string it doesn't do so properly

    // ------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------

    constructor(
        uint256 _worldWidth,
        uint256 _worldHeight,
        uint256 _attackRange,
        uint256 _attackDamage,
        uint256 _attackWaitTime,
        uint256 _startPlayerHealth,
        uint256 _startPlayerEnergy,
        uint256[][] memory _blocks,
        GameTypes.ItemWithMetadata[] memory _items,
        GameStorage _gameStorage,
        Permissions _permissions
    ) {
        utils = _gameStorage;
        p = _permissions;

        utils._setConstants(
            _worldWidth,
            _worldHeight,
            _attackRange,
            _attackDamage,
            _attackWaitTime,
            _startPlayerHealth,
            _startPlayerEnergy
        );

        // Set map and blocks
        uint256 _positionCount = _worldWidth * _worldHeight;
        for (uint256 k = 0; k < _positionCount; k++) {
            GameTypes.Position memory _position = utils._getPositionFromIndex(
                k
            );
            utils._setBlocks(_position, _blocks[k]);

            if (_blocks[k].length > 0) {
                uint256 topBlockId = _blocks[k][_blocks[k].length - 1];
                utils._setTopLevelStrength(
                    _position,
                    _items[topBlockId].strength
                );
            }
        }

        // Initialize items
        for (uint256 i = 0; i < _items.length; i++) {
            utils._setItem(i, _items[i]);
            utils._incrementNonce();
        }
    }

    // initialize player
    function initializePlayer(GameTypes.Position memory _pos) public {
        if (utils._getPlayer(msg.sender).initialized)
            revert("engine/player-already-initialized");

        // check if target coordinate has block or another player
        if (utils._isOccupied(_pos)) revert("engine/location-occupied");

        utils._setPlayer(msg.sender, _pos);

        utils._setOccupierAtPosition(msg.sender, _pos);
        utils._setPlayerStakedPoints(msg.sender, 100);

        emit NewPlayer(msg.sender, _pos);
    }

    // player move function
    function move(GameTypes.Position memory _pos) external {
        if (!utils._isValidMove(msg.sender, _pos))
            revert("engine/invalid-move");

        GameTypes.Position memory _prevPosition = utils
            ._getPlayer(msg.sender)
            .position;
        utils._setOccupierAtPosition(address(0), _prevPosition); // remove occupier from previous position

        utils._setPlayerPosition(msg.sender, _pos);
        utils._setOccupierAtPosition(msg.sender, _pos);

        emit Move(msg.sender, _pos);
    }

    function mineItem(
        GameTypes.Position memory _pos,
        uint256 _zIdx,
        address _playerAddr
    ) public {
        // can only mine with the needed tool
        uint256 _itemId = utils._getBlockAtPosition(_pos, _zIdx);

        uint256[] memory _mineItemIds = utils._getItem(_itemId).mineItemIds;
        bool _canMine = false;
        if (_mineItemIds.length == 0) {
            _canMine = true;
        } else {
            for (uint256 i = 0; i < _mineItemIds.length; i++) {
                uint256 _mineItemAmount = utils._getItemAmountById(
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

        utils._increaseItemInInventory(_playerAddr, _itemId, 1);
        utils._mine(_pos);

        emit MineItem(_playerAddr, _pos, _itemId, _zIdx);
    }

    function attackItem(
        GameTypes.Position memory _pos,
        uint256 _zIdx,
        address _playerAddr
    ) public {
        utils._setTopLevelStrength(
            _pos,
            utils._getTileData(_pos).topLevelStrength - utils._getAttackDamage()
        );
        uint256 _strength = utils._getTileData(_pos).topLevelStrength;

        emit AttackItem(_playerAddr, _pos, _strength, _zIdx);
    }

    // mine resource blocks at specific z-index base layer (z-indexf of 0)
    // attack + mine. main function
    function mine(GameTypes.Position memory _pos) external {
        uint256 _blockCount = utils._getBlockCountAtPosition(_pos);
        if (_blockCount == 0) revert("engine/nonexistent-block");
        uint256 _zIdx = _blockCount - 1;

        if (
            utils._getAttackDamage() < utils._getTileData(_pos).topLevelStrength
        ) {
            attackItem(_pos, _zIdx, msg.sender);
        } else {
            mineItem(_pos, _zIdx, msg.sender);
        }
    }

    // place item at block
    function place(GameTypes.Position memory _pos, uint256 _itemId) external {
        if (utils._getItemAmountById(msg.sender, _itemId) == 0)
            revert("engine/insufficient-inventory");
        if (
            utils._getPlayer(msg.sender).position.x == _pos.x &&
            utils._getPlayer(msg.sender).position.y == _pos.y
        ) revert("engine/cannot-stand-on-block");

        // TODO add distance logic here

        utils._place(_pos, _itemId);
        utils._decreaseItemInInventory(msg.sender, _itemId, 1);

        emit Place(msg.sender, _pos, _itemId);
    }

    // craft item (once) based on their recipe
    function craft(uint256 _itemId) external {
        if (_itemId > utils._getItemNonce()) revert("engine/nonexistent-block");

        // loop through player inventory to check if player has all required ingredients to make a block
        GameTypes.ItemWithMetadata memory _item = utils._getItem(_itemId);
        for (uint256 i = 0; i < _item.craftItemIds.length; i++) {
            uint256 craftItemId = _item.craftItemIds[i];
            uint256 craftItemAmount = _item.craftItemAmounts[i];

            if (
                utils._getCraftItemAmount(msg.sender, craftItemId) <
                craftItemAmount
            ) {
                revert("engine/insufficient-material");
            } else {
                // deduct material from player inventory count
                utils._decreaseItemInInventory(
                    msg.sender,
                    craftItemId,
                    craftItemAmount
                );
            }
        }

        utils._increaseItemInInventory(msg.sender, _itemId, 1);

        emit Craft(msg.sender, _itemId);
    }
}
