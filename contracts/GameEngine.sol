//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interface/IGameEngine.sol";
import "./GameStorage.sol";
import "./GameTypes.sol";
import "./Permissions.sol";

// ------------------------------------------------------------
// Main game contract
// ------------------------------------------------------------

contract Game is IGameEngine {
    using SafeMath for uint256;
    GameStorage private utils;
    Permissions private p;
    uint256 public SET_MAP_INTERVAL = 10;

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

    // let some blocks (eg. creatures) attack other blocks;
    function attack() public {}

    /**
     * initialize player
     * @param _pos position to initialize
     */
    function initializePlayer(GameTypes.Position memory _pos) public override {
        require(
            !utils._getPlayer(msg.sender).initialized,
            "engine/player-already-initialized"
        );

        require(!utils._isOccupied(_pos), "engine/location-occupied"); // if target coordinate already has a block or player, revert

        utils._setPlayer(msg.sender, _pos);
        utils._setOccupierAtPosition(msg.sender, _pos);

        // give users starting currency
        utils._increaseItemInInventory(
            msg.sender,
            0,
            utils._getWorldConstants().startingPlayerDefaultCurrencyAmount
        );

        emit NewPlayer(msg.sender, _pos);
    }

    /**
     * move player
     * @param _pos target position
     */
    function move(GameTypes.Position memory _pos) external override {
        require(utils._isValidMove(msg.sender, _pos), "engine/invalid-move");

        GameTypes.Position memory _prevPosition = utils
            ._getPlayer(msg.sender)
            .position;
        utils._setOccupierAtPosition(address(0), _prevPosition); // remove occupier from previous position

        utils._setPlayerPosition(msg.sender, _pos);
        utils._setOccupierAtPosition(msg.sender, _pos);

        emit Move(msg.sender, _pos);
    }

    /**
     * move a block from point to point. ex: a block can be an army unit
     * @param _startPos starting position
     * @param _targetPos target position
     */
    function moveBlock(
        GameTypes.Position memory _startPos,
        GameTypes.Position memory _targetPos
    ) public override {
        GameTypes.Tile memory startTile = utils._getTileData(_startPos);
        GameTypes.Tile memory targetTile = utils._getTileData(_targetPos);

        require(targetTile.occupier == address(0), "engine/block is occupied");

        // check if two are within same range
        require(
            utils._withinDistance(_startPos, _targetPos, 1),
            "engine/invalid-distance"
        );

        require(startTile.occupier == address(0), "engine/not owner");

        // we basically swap the two tiles
        utils._setTileData(_targetPos, startTile);
        utils._setTileData(_startPos, targetTile);

        emit MoveBlock(msg.sender, _startPos, _targetPos);
    }

    function mineItem(GameTypes.Position memory _pos, address _playerAddr)
        internal
    {
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

    /**
     * reduces item health
     * @param _pos position to mine item at
     * @param _playerAddr player address
     **/

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

    /**
     * mine item
     * @param _pos position to mine item at
     */
    function mine(GameTypes.Position memory _pos) external override {
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

    /**
     * place item at tile location
     * @param _pos position to place block at
     * @param _itemId item id to place
     */
    function place(GameTypes.Position memory _pos, uint256 _itemId)
        external
        override
    {
        require(
            utils._getItemAmountById(msg.sender, _itemId) != 0,
            "engine/insufficient-inventory"
        );

        GameTypes.PlayerData memory _playerData = utils._getPlayer(msg.sender);
        if (
            _playerData.position.x == _pos.x && _playerData.position.y == _pos.y
        ) revert("engine/cannot-stand-on-block");

        if (!utils._withinDistance(_pos, _playerData.position, 1))
            revert("engine/invalid-distance");

        utils._place(_pos, _itemId);
        utils._decreaseItemInInventory(msg.sender, _itemId, 1);
        utils._setBlockOwner(_pos, msg.sender);

        emit Place(msg.sender, _pos, _itemId);
    }

    /**
     * craft item (once) based on their recipe
     * @param _itemId item id to craft
     */
    function craft(uint256 _itemId) external override {
        require(_itemId <= utils._getItemNonce(), "engine/nonexistent-block"); // has to craft an existing item

        // loop through player inventory to check if player has all required ingredients to make a block
        GameTypes.ItemWithMetadata memory _item = utils._getItem(_itemId);

        for (uint256 i = 0; i < _item.craftItemIds.length; i++) {
            uint256 craftItemId = _item.craftItemIds[i];
            uint256 craftItemAmount = _item.craftItemAmounts[i];
            uint256 userItemAmount = utils._getItemAmountById(
                msg.sender,
                craftItemId
            );

            require(
                userItemAmount >= craftItemAmount,
                "engine/insufficient-material"
            );

            utils._decreaseItemInInventory(
                msg.sender,
                craftItemId,
                craftItemAmount
            );
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
    ) public override {
        uint256 _userAmount = utils._getItemAmountById(msg.sender, 0); // world default currency is 0
        require(_userAmount >= _amount, "engine/insufficient-inventory");

        utils._decreaseItemInInventory(msg.sender, 0, _amount);
        GameTypes.Tile memory _tileData = utils._getTileData(_pos);

        // add defense to a block
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
