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
    event MineItem(address _player, GameTypes.Position _pos, uint256 _blockId);
    event AttackItem(
        address _player,
        GameTypes.Position _pos,
        uint256 _strength
    );
    event Place(address _player, GameTypes.Position _pos, uint256 _blockId);
    event Craft(address _player, uint256 _blockId);
    event Attack(address _player1, address _player2); // add attack result here?
    event Death(address _player);
    event ChangeBlockStrength(
        address _player,
        GameTypes.Position _pos,
        uint256 _strength,
        uint256 _resourceUsed
    );
    event MoveBlock(
        address _player,
        GameTypes.Position _startPos,
        GameTypes.Position _endPos
    );

    // ------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------

    constructor(
        GameTypes.WorldConstants memory constants,
        GameTypes.ItemWithMetadata[] memory _items,
        GameStorage _gameStorage,
        Permissions _permissions
    ) {
        utils = _gameStorage;
        p = _permissions;

        utils._setConstants(constants);

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

        // give users some starting currency
        utils._increaseItemInInventory(
            msg.sender,
            0,
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

    // move block if its a selection
    function moveBlock(
        GameTypes.Position memory _startPos,
        GameTypes.Position memory _targetPos
    ) external {
        GameTypes.Tile memory startTile = utils._getTileData(_startPos);
        GameTypes.Tile memory targetTile = utils._getTileData(_targetPos);

        // target pos needs to have nothing
        require(
            targetTile.topLevelStrength == 0,
            "engine/invalid-top-level-strength"
        );

        // check if two are within same range
        require(
            utils._withinDistance(_startPos, _targetPos, 1),
            "engine/invalid-distance"
        );

        // set new top level strength and blocks
        utils._setTopLevelStrength(_targetPos, startTile.topLevelStrength);

        // set new block
        utils._setBlocks(_targetPos, startTile.blocks);

        // target

        emit MoveBlock(msg.sender, _startPos, _targetPos);
    }

    function mineItem(
        GameTypes.Position memory _pos,
        uint256 _zIdx,
        address _playerAddr
    ) internal {
        // can only mine with the needed tool
        uint256 _itemId = utils._getBlockAtPos(_pos);

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

        emit MineItem(_playerAddr, _pos, _itemId);
    }

    // reduces item health
    function attackItem(GameTypes.Position memory _pos, address _playerAddr)
        internal
    {
        utils._setTopLevelStrength(
            _pos,
            utils._getTileData(_pos).topLevelStrength -
                utils._getPlayer(msg.sender).attackDamage
        );
        uint256 _strength = utils._getTileData(_pos).topLevelStrength;

        emit AttackItem(_playerAddr, _pos, _strength);
    }

    // mine item function
    function mine(GameTypes.Position memory _pos) external {
        uint256 _block = utils._getBlockAtPos(_pos);
        require(_block != 0, "engine/nonexistent-block");

        if (
            !utils._withinDistance(
                _pos,
                utils._getPlayer(msg.sender).position,
                1
            )
        ) revert("engine/invalid-distance");

        GameTypes.ItemWithMetadata memory _itemWithMetadata = utils._getItem(
            _block
        );

        if (!_itemWithMetadata.mineable) revert("engine/not-mineable");

        if (
            utils._getPlayer(msg.sender).attackDamage <
            utils._getTileData(_pos).topLevelStrength
        ) {
            attackItem(_pos, msg.sender);
        } else {
            mineItem(_pos, msg.sender);
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

    /**
     * Changes the top level strength of a block
     * @param _pos position of block
     * @param _amount amount of points (a resource) you want to apply to the block
     * @param _state if true, you want to increase the defense. if not, you want to decrease it.
     */

    function changeBlockStrength(
        GameTypes.Position memory _pos,
        uint256 _amount,
        bool _state
    ) public {
        uint256 _userAmount = utils._getItemAmountById(msg.sender, 0); // world default currency is 0
        require(_userAmount >= _amount, "engine/insufficient-inventory");

        // 1 to 1 exchange rate between default currency and score;
        utils._decreaseItemInInventory(msg.sender, 0, _amount);
        GameTypes.Tile memory _tileData = utils._getTileData(_pos);

        // to reinforce the strength of a block
        if (_state == true) {
            utils._setTopLevelStrength(
                _pos,
                _tileData.topLevelStrength + _amount
            );
            emit ChangeBlockStrength(
                msg.sender,
                _pos,
                _tileData.topLevelStrength + _amount,
                _amount
            );
        } else {
            if (_amount < _tileData.topLevelStrength) {
                // if the strength is less than the block strength
                utils._setTopLevelStrength(
                    _pos,
                    _tileData.topLevelStrength - _amount
                );
                emit ChangeBlockStrength(
                    msg.sender,
                    _pos,
                    _tileData.topLevelStrength - _amount,
                    _amount
                );
            } else {
                mineItem(_pos, msg.sender);
            }
        }
    }
}
