//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./GameStorage.sol";
import "./GameTypes.sol";
import "./Permissions.sol";

// ------------------------------------------------------------
// Main game contract
// ------------------------------------------------------------

contract Game {
    using SafeMath for uint256;
    GameStorage private utils;
    Permissions private p;
    uint256 SET_MAP_INTERVAL = 10;

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
        GameTypes.WorldConstants memory constants,
        // uint256[][] memory _blocks,
        GameTypes.ItemWithMetadata[] memory _items,
        GameStorage _gameStorage,
        Permissions _permissions
    ) {
        utils = _gameStorage;
        p = _permissions;

        utils._setConstants(constants);

        // // Set map and blocks
        // uint256 _positionCount = constants.worldWidth * constants.worldHeight;
        // for (uint256 k = 0; k < _positionCount; k++) {
        //     GameTypes.Position memory _position = utils._getPositionFromIndex(
        //         k
        //     );
        //     utils._setBlocks(_position, _blocks[k]);

        //     if (_blocks[k].length > 0) {
        //         uint256 topBlockId = _blocks[k][_blocks[k].length - 1];
        //         utils._setTopLevelStrength(
        //             _position,
        //             _items[topBlockId].strength
        //         );
        //     }
        // }

        // Initialize items
        for (uint256 i = 0; i < _items.length; i++) {
            utils._setItem(i, _items[i]);
            utils._incrementNonce();
        }
    }

    /**
     * Set map blocks in 10x10 regions due to gas limitation.
     * @param _startPos Top-left coordinate of region to start set
     * @param _blocks 10x10 array of blocks for the region
     */
    function setMapRegion(GameTypes.Position memory _startPos, uint256[][][] memory _blocks) 
        public 
    {
        for (uint256 _xAdd = 0; _xAdd < _blocks.length; _xAdd++) {
            for (uint256 _yAdd = 0; _yAdd < _blocks[0].length; _yAdd++) {
                GameTypes.Position memory _pos = GameTypes.Position({
                    x: _startPos.x + _xAdd,
                    y: _startPos.y + _yAdd
                });
                // uint256 _idx = utils._getIndexFromPosition(_pos);

                utils._setBlocks(_pos, _blocks[_xAdd][_yAdd]);

                if (_blocks[_xAdd][_yAdd].length > 0) {
                    uint256 _topBlockId = _blocks[_xAdd][_yAdd][_blocks[_xAdd][_yAdd].length - 1];
                    utils._setTopLevelStrength(
                        _pos,
                        utils._getItem(_topBlockId).strength
                    );
                }
            }
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
        utils._increaseItemInInventory(
            msg.sender,
            1,
            utils._getWorldConstants().startingPlayerDefaultCurrencyAmount
        ); //  give users some base currency points so they can start staking in towers

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
    ) internal {
        // can only mine with the needed tool
        uint256 _itemId = utils._getBlockAtPosition(_pos, _zIdx);

        GameTypes.ItemWithMetadata memory _itemWithMetadata = utils._getItem(
            _itemId
        );

        uint256[] memory _mineItemIds = _itemWithMetadata.mineItemIds;

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

    // reduces item health
    function attackItem(
        GameTypes.Position memory _pos,
        uint256 _zIdx,
        address _playerAddr
    ) internal {
        utils._setTopLevelStrength(
            _pos,
            utils._getTileData(_pos).topLevelStrength -
                utils._getPlayer(msg.sender).attackDamage
        );
        uint256 _strength = utils._getTileData(_pos).topLevelStrength;

        emit AttackItem(_playerAddr, _pos, _strength, _zIdx);
    }

    // mine item function
    function mine(GameTypes.Position memory _pos) external {
        uint256 _blockCount = utils._getBlockCountAtPosition(_pos);
        if (_blockCount == 0) revert("engine/nonexistent-block");
        if (
            !utils._withinDistance(
                _pos,
                utils._getPlayer(msg.sender).position,
                1
            )
        ) revert("engine/invalid-distance");

        uint256 _zIdx = _blockCount - 1;

        if (
            utils._getPlayer(msg.sender).attackDamage <
            utils._getTileData(_pos).topLevelStrength
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
        GameTypes.PlayerData memory _playerData = utils._getPlayer(msg.sender);
        if (
            _playerData.position.x == _pos.x && _playerData.position.y == _pos.y
        ) revert("engine/cannot-stand-on-block");
        if (!utils._withinDistance(_pos, _playerData.position, 1))
            revert("engine/invalid-distance");

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
