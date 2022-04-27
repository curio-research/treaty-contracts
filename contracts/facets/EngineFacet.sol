//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../libraries/Storage.sol";
import {GameUtils} from "../libraries/GameUtil.sol";
import {BlockData, GameInfo, WorldConstants, Position, Item, Tower, Recipe, Tile, PlayerData} from "../libraries/Types.sol";

// ------------------------------------------------------------
// Main game contract
// ------------------------------------------------------------

// TODO: Add interface
contract EngineFacet is UseStorage {
    using SafeMath for uint256;

    // ------------------------------------------------------------
    // Events
    // ------------------------------------------------------------

    event EventNewPlayer(address _player, Position _pos);
    event EventMove(address _player, Position _pos);
    event EventMineItem(address _player, Position _pos, uint256 _itemId);
    event EventAttackItemEvent(address _player, Position _origin, Position _target, uint256 _attackerWorldBlockId, uint256 _targetWorldBlockId, uint256 _strength);
    event EventPlace(address _player, Position _pos, uint256 _worldBlockId, BlockData _blockData);
    event EventCraft(address _player, uint256 _blockId);
    event EventChangeBlockStrength(address _player, Position _pos, uint256 _health, uint256 _resourceUsed);
    event EventMoveBlock(address _player, Position _startPos, Position _endPos, uint256 _worldBlockId, uint256 _time);
    event EventEpochUpdate(address _player, uint256 _epoch, uint256 _time);

    // let some blocks (eg. creatures) attack other blocks
    // perhaps this can be abstracted into the main attack function
    function attack(Position memory _origin, Position memory _target) public {
        // check if the two are in the same range
        Tile memory _attackerTile = GameUtils._getTileData(_origin);

        // get the worldBlock data from the tile
        BlockData memory _attackerWorldBlockData = GameUtils._getWorldBlockData(_attackerTile.worldBlockId);

        // get item metadata
        Item memory _attackerBlockItem = GameUtils._getItem(_attackerWorldBlockData.blockId);

        require(block.timestamp - _attackerWorldBlockData.lastAttacked >= _attackerBlockItem.attackCooldown, "engine/attack-not-ready");

        // set attack cooldown time
        gs().worldBlocks[_attackerTile.worldBlockId].lastAttacked = block.timestamp;

        // get target world block data
        Tile memory _targetTile = GameUtils._getTileData(_target);

        // worldIds cannot attack themselves
        require(_attackerTile.worldBlockId != _targetTile.worldBlockId, "engine/attacker-same-as-target");

        BlockData memory _targetBlockData = GameUtils._getWorldBlockDataOnPos(_target);

        // check range of attack
        require(GameUtils._withinDistance(_origin, _target, _attackerBlockItem.attackRange));

        // calculate health of the target after the attack
        uint256 healthAfterAttack = _targetBlockData.health - _attackerBlockItem.attackDamage;

        // decrease target block's health
        gs().worldBlocks[_targetTile.worldBlockId].health = healthAfterAttack;

        // if health is zero, delete world block Id
        if (healthAfterAttack == 0) {
            delete gs().worldBlocks[_targetTile.worldBlockId]; // delete world block Id
            GameUtils._setWorldBlockIdAtTile(_target, 0);
        }

        // this should emit more info ? or nah
        emit EventAttackItemEvent(msg.sender, _origin, _target, _attackerTile.worldBlockId, _targetTile.worldBlockId, healthAfterAttack);
    }

    function _setOccupierAtPosition(address _player, Position memory _pos) public {
        gs().map[_pos.x][_pos.y].occupier = _player;
    }

    /**
     * initialize player
     * @param _pos position to initialize
     */
    function initializePlayer(Position memory _pos, uint256 _defaultCurrencyIdx) public {
        require(!GameUtils._getPlayer(msg.sender).initialized, "engine/player-already-initialized");

        require(!GameUtils._isOccupied(_pos), "engine/location-occupied"); // if target coordinate already has a block or player, revert

        // set player
        WorldConstants memory constants = gs().worldConstants;
        gs().players[msg.sender] = PlayerData({initialized: true, initTimestamp: block.timestamp, playerAddr: msg.sender, position: _pos, health: constants.startPlayerHealth, reach: constants.startingReach, lastMoved: 0});
        gs().allPlayers.push(msg.sender);

        _setOccupierAtPosition(msg.sender, _pos);

        // give users starting currency
        GameUtils._increaseItemInInventory(msg.sender, _defaultCurrencyIdx, gs().worldConstants.startingPlayerDefaultCurrencyAmount);

        emit EventNewPlayer(msg.sender, _pos);
    }

    /**
     * move player
     * @param _pos target position
     */
    function move(Position memory _pos) external {
        require(GameUtils._isValidMove(msg.sender, _pos), "engine/invalid-move");

        require(GameUtils._isMoveCooled(msg.sender), "engine/move-not-cooled"); // check if move is cooled down

        gs().players[msg.sender].lastMoved = block.timestamp; // set last moved

        Position memory _prevPosition = GameUtils._getPlayer(msg.sender).position;
        _setOccupierAtPosition(address(0), _prevPosition); // remove occupier from previous position

        gs().players[msg.sender].position = _pos; // set player position
        _setOccupierAtPosition(msg.sender, _pos);

        emit EventMove(msg.sender, _pos);
    }

    /**
     * move a block from point to point. ex: a block (Army unit) can be moved from unit to unit
     * @param _startPos starting position
     * @param _targetPos target position
     */
    // input should include worldBlockId
    function moveBlock(Position memory _startPos, Position memory _targetPos) public {
        Tile memory startTile = GameUtils._getTileData(_startPos);
        Tile memory targetTile = GameUtils._getTileData(_targetPos);

        BlockData memory _startTileBlockData = GameUtils._getWorldBlockData(startTile.worldBlockId);

        Item memory _startBlockMetadata = GameUtils._getItem(_startTileBlockData.blockId);

        require(block.timestamp - _startTileBlockData.lastMoved >= _startBlockMetadata.moveCooldown, "engine/move-cooldown"); // check cooldown

        require(targetTile.occupier == address(0), "engine/block is occupied");

        require(GameUtils._withinDistance(_startPos, _targetPos, 1), "engine/invalid-distance"); // check if two are within same range

        require(startTile.occupier == address(0), "engine/not-owner");

        require(targetTile.worldBlockId == 0, "engine/target-tile-not-empty");

        gs().worldBlocks[startTile.worldBlockId].lastMoved = block.timestamp;

        // set new worldId for each tile
        GameUtils._setWorldBlockIdAtTile(_startPos, 0);
        GameUtils._setWorldBlockIdAtTile(_targetPos, startTile.worldBlockId);

        // since stats don't change i don't think we need to emit block data
        emit EventMoveBlock(msg.sender, _startPos, _targetPos, startTile.worldBlockId, block.timestamp);
    }

    // mine item completely
    function mineItem(Position memory _pos, address _playerAddr) internal {
        Tile memory _targetTileData = GameUtils._getTileData(_pos);

        // can only mine with the needed tool
        BlockData memory _targetBlockData = GameUtils._getBlockDataAtPos(_pos);

        // Item on target position
        Item memory _Item = GameUtils._getItem(_targetBlockData.blockId);

        uint256[] memory _mineItemIds = _Item.mineItemIds;

        bool _canMine = false;
        if (_mineItemIds.length == 0) {
            _canMine = true;
        } else {
            for (uint256 i = 0; i < _mineItemIds.length; i++) {
                uint256 _mineItemAmount = GameUtils._getItemAmountById(_playerAddr, _mineItemIds[i]);
                if (_mineItemAmount > 0) {
                    _canMine = true;
                    break;
                }
            }
        }

        if (!_canMine) revert("engine/tool-needed");

        GameUtils._increaseItemInInventory(_playerAddr, _targetBlockData.blockId, 1);

        // remove worldBlock
        delete gs().worldBlocks[_targetTileData.worldBlockId]; // delete world block Id
        GameUtils._setWorldBlockIdAtTile(_pos, 0);

        emit EventMineItem(_playerAddr, _pos, _targetBlockData.blockId);
    }

    /**
     * place item at tile location
     * @param _pos position to place block at
     * @param _blockId blockId to place
     */
    function place(Position memory _pos, uint256 _blockId) external {
        // player needs sufficient inventory of item to place
        require(GameUtils._getItemAmountById(msg.sender, _blockId) != 0, "engine/insufficient-inventory");

        PlayerData memory _playerData = GameUtils._getPlayer(msg.sender);

        require(_playerData.position.x != _pos.x || _playerData.position.y != _pos.y, "engine/cannot-stand-on-block");

        require(GameUtils._withinDistance(_pos, _playerData.position, 1), "engine/invalid-distance");

        GameUtils._decreaseItemInInventory(msg.sender, _blockId, 1);

        // create a worldBlockId by initiating the block into the world
        (uint256 _worldBlockId, BlockData memory _worldBlockData) = GameUtils._createNewWorldBlock(msg.sender, _blockId);

        // set the newly created worldBlockId to tile
        GameUtils._placeWorldBlockIdOnTile(_pos, _worldBlockId);

        emit EventPlace(msg.sender, _pos, _worldBlockId, _worldBlockData);
    }

    /**
     * craft item (once) based on their recipe
     * @param _itemId item id to craft
     */
    function craft(uint256 _itemId) external {
        require(_itemId <= GameUtils._getItemNonce(), "engine/nonexistent-block"); // has to craft an existing item

        // loop through player inventory to check if player has all required ingredients to make a block
        Item memory _item = GameUtils._getItem(_itemId);

        for (uint256 i = 0; i < _item.craftItemIds.length; i++) {
            uint256 craftItemId = _item.craftItemIds[i];
            uint256 craftItemAmount = _item.craftItemAmounts[i];
            uint256 userItemAmount = GameUtils._getItemAmountById(msg.sender, craftItemId);

            require(userItemAmount >= craftItemAmount, "engine/insufficient-material");

            GameUtils._decreaseItemInInventory(msg.sender, craftItemId, craftItemAmount);
        }

        GameUtils._increaseItemInInventory(msg.sender, _itemId, 1);

        emit EventCraft(msg.sender, _itemId);
    }

    // reduces item health
    // this is ONLY used when player is attacking a block
    function attackItem(Position memory _targetPos, address _playerAddr) internal {
        // attack item
        uint256 _worldBlockId = GameUtils._getBlockAtPos(_targetPos);

        BlockData memory _targetBlockData = GameUtils._getBlockDataAtPos(_targetPos);

        uint256 _healthAfterAttack = _targetBlockData.health - 10; // Hardcode this shit for now

        // set new health for worldBlockId
        gs().worldBlocks[_worldBlockId].health = _healthAfterAttack;

        emit EventChangeBlockStrength(_playerAddr, _targetPos, _healthAfterAttack, 1000000);
    }

    /**
     * mine item
     * @param _pos position to mine item at
     */
    function mine(Position memory _pos) external {
        uint256 _worldBlockId = GameUtils._getBlockAtPos(_pos);
        uint256 _tempMineVar = 10;
        require(_worldBlockId != 0, "engine/nonexistent-block");

        require(GameUtils._withinDistance(_pos, GameUtils._getPlayer(msg.sender).position, 1), "engine/invalid-distance");

        // get world block info
        BlockData memory _blockData = GameUtils._getWorldBlockData(_worldBlockId);

        // get item with metadata from worldBlockId
        Item memory _Item = GameUtils._getItem(_blockData.blockId);

        require(_Item.mineable, "engine/not-mineable");

        if (_tempMineVar < _blockData.health) {
            attackItem(_pos, msg.sender);
        } else {
            mineItem(_pos, msg.sender);
        }
    }

    function updateEpoch() external {
        require(block.timestamp - gs().interval >= gs().lastUpdated, "epoch/premature");
        gs().epoch++;
        gs().lastUpdated = block.timestamp;

        emit EventEpochUpdate(msg.sender, gs().epoch, gs().lastUpdated);
    }

    function setMapRegion(Position memory _startPos, uint256[][] memory _blocks) external {
        for (uint256 _xAdd = 0; _xAdd < _blocks.length; _xAdd++) {
            for (uint256 _yAdd = 0; _yAdd < _blocks[0].length; _yAdd++) {
                // calculate position based on offset
                Position memory _pos = Position({x: _startPos.x + _xAdd, y: _startPos.y + _yAdd});

                // get the blockId that needs to be initialized
                uint256 _blockId = _blocks[_xAdd][_yAdd];

                // if its zero, it means it's an empty blocks
                if (_blockId == 0) {
                    GameUtils._placeWorldBlockIdOnTile(_pos, 0);
                } else {
                    // first create new worldBlock
                    (uint256 _newWorldBlockId, ) = GameUtils._createNewWorldBlock(msg.sender, _blockId);

                    // then place worldBlock on map
                    GameUtils._placeWorldBlockIdOnTile(_pos, _newWorldBlockId);
                }
            }
        }
    }
}
