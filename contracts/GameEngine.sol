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

// TODO: Add interface
contract Game {
    using SafeMath for uint256;
    GameStorage private utils;
    Permissions private p;

    // ------------------------------------------------------------
    // Events
    // ------------------------------------------------------------

    event NewPlayer(address _player, GameTypes.Position _pos);
    event Move(address _player, GameTypes.Position _pos);
    event MineItem(address _player, GameTypes.Position _pos, uint256 _blockId);
    event AttackItem(
        address _player,
        GameTypes.Position _origin,
        GameTypes.Position _target,
        uint256 _attackerWorldBlockId,
        uint256 _targetWorldBlockId,
        uint256 _strength
    );
    event Place(
        address _player,
        GameTypes.Position _pos,
        uint256 _worldBlockId,
        GameTypes.BlockData _blockData
    );
    event Craft(address _player, uint256 _blockId);
    event Attack(address _player1, address _player2);
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
        GameTypes.Position _endPos,
        uint256 _worldBlockId
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
            utils._increaseNonce();
        }

        // start worldBlockNonce at 1 because 0 denotes an empty block
        utils._increaseWorldBlockNonce();
    }

    // let some blocks (eg. creatures) attack other blocks
    // perhaps this can be abstracted into the main attack function
    function attack(
        GameTypes.Position memory _origin,
        GameTypes.Position memory _target
    ) public {
        // check if the two are in the same range
        GameTypes.Tile memory _attackerTile = utils._getTileData(_origin);

        // get the worldBlock data from the tile
        GameTypes.BlockData memory _attackerWorldBlockData = utils
            ._getWorldBlockData(_attackerTile.worldBlockId);

        // get item metadata
        GameTypes.ItemWithMetadata memory _attackerBlockItem = utils._getItem(
            _attackerWorldBlockData.blockId
        );

        require(
            block.timestamp - _attackerWorldBlockData.lastAttacked >=
                _attackerBlockItem.attackCooldown,
            "engine/attack not ready"
        );

        // set attack cooldown time
        utils.setLastAttacked(_attackerTile.worldBlockId);

        // get target world block data
        GameTypes.Tile memory _targetTile = utils._getTileData(_target);

        // worldIds cannot attack themselves
        require(
            _attackerTile.worldBlockId != _targetTile.worldBlockId,
            "engine/attacker same as target"
        );

        GameTypes.BlockData memory _targetBlockData = utils
            ._getWorldBlockDataOnPos(_target);

        // check range of attack
        require(
            utils._withinDistance(
                _origin,
                _target,
                _attackerBlockItem.attackRange
            )
        );

        // calculate health of the target after the attack
        uint256 healthAfterAttack = _targetBlockData.health -
            _attackerBlockItem.attackDamage;

        // decrease target block's health
        utils.setWorldBlockHealth(_targetTile.worldBlockId, healthAfterAttack);

        // if health is zero, delete world block Id
        if (healthAfterAttack == 0) {
            // delete world block Id
            utils.removeWorldBlockId(_targetTile.worldBlockId);
            utils._setWorldBlockIdAtTile(_target, 0);
        }

        // this should emit more info ?
        emit AttackItem(
            msg.sender,
            _origin,
            _target,
            _attackerTile.worldBlockId,
            _targetTile.worldBlockId,
            healthAfterAttack
        );
    }

    /**
     * initialize player
     * @param _pos position to initialize
     */
    function initializePlayer(GameTypes.Position memory _pos) public {
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
    function move(GameTypes.Position memory _pos) external {
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
     * move a block from point to point. ex: a block (Army unit) can be moved from unit to unit
     * @param _startPos starting position
     * @param _targetPos target position
     */
    function moveBlock(
        GameTypes.Position memory _startPos,
        GameTypes.Position memory _targetPos
    ) public {
        GameTypes.Tile memory startTile = utils._getTileData(_startPos);
        GameTypes.Tile memory targetTile = utils._getTileData(_targetPos);

        require(targetTile.occupier == address(0), "engine/block is occupied");

        // check if two are within same range
        require(
            utils._withinDistance(_startPos, _targetPos, 1),
            "engine/invalid-distance"
        );

        require(startTile.occupier == address(0), "engine/not-owner");

        require(targetTile.worldBlockId == 0, "engine/targe-tile-not-empty");

        // set new worldId for each tile
        utils._setWorldBlockIdAtTile(_startPos, 0);
        utils._setWorldBlockIdAtTile(_targetPos, startTile.worldBlockId);

        // since stats don't change i don't think we need to emit block data
        emit MoveBlock(
            msg.sender,
            _startPos,
            _targetPos,
            startTile.worldBlockId
        );
    }

    // function mineItem(GameTypes.Position memory _pos, address _playerAddr)
    //     internal
    // {
    //     // can only mine with the needed tool
    //     uint256 _itemId = utils._getBlockAtPos(_pos);

    //     GameTypes.ItemWithMetadata memory _itemWithMetadata = utils._getItem(
    //         _itemId
    //     );

    //     uint256[] memory _mineItemIds = _itemWithMetadata.mineItemIds;

    //     bool _canMine = false;
    //     if (_mineItemIds.length == 0) {
    //         _canMine = true;
    //     } else {
    //         for (uint256 i = 0; i < _mineItemIds.length; i++) {
    //             uint256 _mineItemAmount = utils._getItemAmountById(
    //                 _playerAddr,
    //                 _mineItemIds[i]
    //             );
    //             if (_mineItemAmount > 0) {
    //                 _canMine = true;
    //                 break;
    //             }
    //         }
    //     }

    //     if (!_canMine) revert("engine/tool-needed");

    //     utils._increaseItemInInventory(_playerAddr, _itemId, 1);
    //     utils._mine(_pos);

    //     emit MineItem(_playerAddr, _pos, _itemId);
    // }

    /**
     * place item at tile location
     * @param _pos position to place block at
     * @param _blockId blockId to place
     */
    function place(GameTypes.Position memory _pos, uint256 _blockId) external {
        require(
            utils._getItemAmountById(msg.sender, _blockId) != 0,
            "engine/insufficient-inventory"
        );

        GameTypes.PlayerData memory _playerData = utils._getPlayer(msg.sender);
        if (
            _playerData.position.x == _pos.x && _playerData.position.y == _pos.y
        ) revert("engine/cannot-stand-on-block");

        if (!utils._withinDistance(_pos, _playerData.position, 1))
            revert("engine/invalid-distance");

        utils._decreaseItemInInventory(msg.sender, _blockId, 1);

        // create a worldBlockId by initiating the block into the world
        (
            uint256 _worldBlockId,
            GameTypes.BlockData memory _worldBlockData
        ) = utils.createNewWorldBlock(msg.sender, _blockId);

        // set the newly created worldBlockId to tile
        utils._placeWorldBlockIdOnTile(_pos, _worldBlockId);

        emit Place(msg.sender, _pos, _worldBlockId, _worldBlockData);
    }

    /**
     * craft item (once) based on their recipe
     * @param _itemId item id to craft
     */
    function craft(uint256 _itemId) external {
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

    // /**
    //  * mine item
    //  * @param _pos position to mine item at
    //  */
    // function mine(GameTypes.Position memory _pos) external override {
    //     uint256 _block = utils._getBlockAtPos(_pos);
    //     require(_block != 0, "engine/nonexistent-block");

    //     if (
    //         !utils._withinDistance(
    //             _pos,
    //             utils._getPlayer(msg.sender).position,
    //             1
    //         )
    //     ) revert("engine/invalid-distance");

    //     GameTypes.ItemWithMetadata memory _itemWithMetadata = utils._getItem(
    //         _block
    //     );

    //     if (!_itemWithMetadata.mineable) revert("engine/not-mineable");

    //     if (
    //         utils._getPlayer(msg.sender).attackDamage <
    //         utils._getTileData(_pos).topLevelStrength
    //     ) {
    //         attackItem(_pos, msg.sender);
    //     } else {
    //         mineItem(_pos, msg.sender);
    //     }
    // }
}
