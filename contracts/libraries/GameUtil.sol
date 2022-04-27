//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {BlockData, GameInfo, WorldConstants, Position, Item, Tower, Recipe, Tile, PlayerData} from "./Types.sol";
import {LibStorage} from "./Storage.sol";

library GameUtils {
    using SafeMath for uint256;

    // ------------------------------------------------------------
    // Events
    // ------------------------------------------------------------

    event Transfer(address _player, address _recipient, uint256 _id, uint256 _amount);
    event ChangeBlockProperty(uint256 _worldBlockId, BlockData _worldBlockData);

    function gs() internal pure returns (GameInfo storage) {
        return LibStorage.gameStorage();
    }

    function _setWorldBlockIdAtTile(Position memory _position, uint256 _worldBlockId) public {
        gs().map[_position.x][_position.y].worldBlockId = _worldBlockId;
    }

    // /**
    //  * Set map blocks in NxN regions due to gas limitation.
    //  * @param _startPos Top-left coordinate of region to start set
    //  * @param _blocks NxN array of blocks for the region
    //  */
    // function _setMapRegion(Position memory _startPos, uint256[][] memory _blocks) public {
    //     for (uint256 _xAdd = 0; _xAdd < _blocks.length; _xAdd++) {
    //         for (uint256 _yAdd = 0; _yAdd < _blocks[0].length; _yAdd++) {
    //             // calculate position based on offset
    //             Position memory _pos = Position({x: _startPos.x + _xAdd, y: _startPos.y + _yAdd});

    //             // get the blockId that needs to be initialized
    //             uint256 _blockId = _blocks[_xAdd][_yAdd];

    //             // if its zero, it means it's an empty blocks
    //             if (_blockId == 0) {
    //                 _placeWorldBlockIdOnTile(_pos, 0);
    //             } else {
    //                 // first create new worldBlock
    //                 (uint256 _newWorldBlockId, ) = _createNewWorldBlock(msg.sender, _blockId);

    //                 // then place worldBlock on map
    //                 _placeWorldBlockIdOnTile(_pos, _newWorldBlockId);
    //             }
    //         }
    //     }
    // }

    // check if its within a distance (need to refactor into distance)
    // allow character to only move 1 block at a time in either x or y direction
    function _withinDistance(
        Position memory p1,
        Position memory p2,
        uint256 _dist
    ) public pure returns (bool) {
        uint256 _xDist = p1.x >= p2.x ? p1.x - p2.x : p2.x - p1.x;
        uint256 _yDist = p1.y >= p2.y ? p1.y - p2.y : p2.y - p1.y;
        return _xDist <= _dist && _yDist <= _dist;
    }

    function _getPositionFromIndex(uint256 k) public view returns (Position memory) {
        WorldConstants memory constants = gs().worldConstants;

        (bool _xValid, uint256 _x) = SafeMath.tryDiv(k, constants.worldHeight);
        (bool _yValid, uint256 _y) = SafeMath.tryMod(k, constants.worldWidth);

        if (!_xValid || !_yValid) revert("SafeMath/invalid-division");

        return Position(_x, _y);
    }

    function _getIndexFromPosition(Position memory _pos) public view returns (uint256) {
        WorldConstants memory constants = gs().worldConstants;

        (bool _aValid, uint256 _a) = SafeMath.tryMul(_pos.x, constants.worldHeight);
        (bool _bValid, uint256 _b) = SafeMath.tryAdd(_a, _pos.y);

        if (!_aValid || !_bValid) revert("SafeMath/invalid-math");

        return _b;
    }

    // check if location has blocks or player on it
    function _isOccupied(Position memory _pos) public view returns (bool) {
        if (gs().map[_pos.x][_pos.y].occupier != address(0)) return true; // if block has player on it

        // fetch the block data from the tile -> worldBlock. If it's zero it means its an empty block
        BlockData memory _blockData = _getWorldBlockDataOnPos(_pos);

        // if block is ocupiable, immediately return fasle for "isOccupied"
        if (_blockData.occupiable) return false;

        // if it's a block, if it's occupiable then return true
        if (_blockData.blockId != 0) return true;

        return false;
    }

    function _getWorldBlockDataOnPos(Position memory _pos) public view returns (BlockData memory) {
        return _getWorldBlockData(_getTileData(_pos).worldBlockId);
    }

    function _getWorldBlockData(uint256 _worldBlockIdx) public view returns (BlockData memory) {
        return gs().worldBlocks[_worldBlockIdx];
    }

    // ------------------------------------------------------------
    // Movement
    // ------------------------------------------------------------

    // checks distance between positions and whether player is in map
    function _isValidMove(address _player, Position memory _pos) public view returns (bool) {
        Position memory _position = _getPlayer(_player).position;
        WorldConstants memory constants = gs().worldConstants;

        // if player is within bounds of map
        bool _inMap = _pos.x < constants.worldWidth && _pos.y < constants.worldWidth && _pos.x >= 0 && _pos.y >= 0;

        if (!_inMap) return false;

        // if its within the move distance
        if (!_withinDistance(_pos, _position, 1)) return false;

        // if the target block is occupied
        if (_isOccupied(_pos)) return false; // check if target coordinate has block or player

        return true;
    }

    function _isMoveCooled(address _player) public view returns (bool) {
        return (block.timestamp - gs().players[_player].lastMoved) >= gs().worldConstants.playerMoveCooldown;
    }

    // ------------------------------------------------------------
    // Item
    // ------------------------------------------------------------

    // merge these two functions together
    function _increaseItemInInventory(
        address _player,
        uint256 _itemId,
        uint256 _amount
    ) public {
        _modifyItemInInventoryNonce(_player, _itemId, true);
        gs().inventory[_player][_itemId] += _amount;
    }

    function _decreaseItemInInventory(
        address _player,
        uint256 _itemId,
        uint256 _amount
    ) public {
        gs().inventory[_player][_itemId] -= _amount;
        if (gs().inventory[_player][_itemId] == 0) {
            _modifyItemInInventoryNonce(_player, _itemId, false); // remove itemId from inventory list
        }
    }

    function _getItemAmountById(address _player, uint256 _blockId) public view returns (uint256) {
        return gs().inventory[_player][_blockId];
    }

    function _modifyItemInInventoryNonce(
        address _player,
        uint256 _itemId,
        bool dir
    ) public {
        uint256 idx = 0;
        bool hasFound = false;

        for (uint256 i = 0; i < gs().inventoryNonce[_player].length; i++) {
            if (gs().inventoryNonce[_player][i] == _itemId) {
                idx = i;
                hasFound = true;
            }
        }

        if (!dir) {
            if (hasFound) {
                delete gs().inventoryNonce[_player][idx];
            }
        } else if (dir) {
            if (!hasFound) {
                gs().inventoryNonce[_player].push(_itemId);
            }
        }
    }

    function _changeHealth(
        address _player,
        uint256 _amount,
        bool dir
    ) public {
        dir ? gs().players[_player].health += _amount : gs().players[_player].health -= _amount;
    }

    // ------------------------------------------------------------
    // Function helpers
    // ------------------------------------------------------------

    // place block
    function _placeWorldBlockIdOnTile(Position memory _pos, uint256 _itemId) public {
        gs().map[_pos.x][_pos.y].worldBlockId = _itemId;
    }

    // transfer item from one player to another
    function _transfer(
        address _recipient,
        uint256 _itemId,
        uint256 _amount
    ) public {
        Position memory _giverLoc = _getPlayer(msg.sender).position;
        Position memory _recipientLoc = _getPlayer(_recipient).position;

        require(msg.sender != _recipient, "storage/recipient-same-as-sender");

        require(_withinDistance(_giverLoc, _recipientLoc, 5), "storage/not-in-range"); // can only transfer within certain range

        require(_getItemAmountById(msg.sender, _itemId) > _amount, "storage/insufficient-block");

        _decreaseItemInInventory(msg.sender, _itemId, _amount);
        _increaseItemInInventory(_recipient, _itemId, _amount);

        emit Transfer(msg.sender, _recipient, _itemId, _amount);
    }

    function _increaseWorldBlockNonce() public {
        gs().worldBlockNonce++;
    }

    function getWorldBlockNonce() public view returns (uint256) {
        return gs().worldBlockNonce;
    }

    // returns the new worldBlockId
    function setWorldBlock(BlockData memory _worldBlock) public returns (uint256) {
        uint256 _currentNonce = getWorldBlockNonce();
        gs().worldBlocks[_currentNonce] = _worldBlock;
        _increaseWorldBlockNonce();
        return _currentNonce;
    }

    // create a new world block that's "placed" in the world
    function _createNewWorldBlock(address _owner, uint256 _blockId) public returns (uint256 worldBlockId, BlockData memory) {
        Item memory _item = _getItem(_blockId);

        // initialize new world block
        BlockData memory _newWorldBlock = BlockData({blockId: _blockId, health: _item.health, owner: _owner, lastAttacked: 0, lastMoved: 0, occupiable: _item.occupiable});

        uint256 _newWorldBlockId = setWorldBlock(_newWorldBlock);

        return (_newWorldBlockId, _newWorldBlock);
    }

    // function _setWorldBlockProperty(uint256 _worldBlockId, BlockData memory _worldBlock) public {
    //     gs().worldBlocks[_worldBlockId] = _worldBlock;
    //     emit ChangeBlockProperty(_worldBlockId, _worldBlock);
    // }

    // ------------------------------------------------------------
    // Tower
    // ------------------------------------------------------------

    // function setEpochController(address _addr) external {
    //     gs().epochController = _addr;
    // }

    function _getTower(string memory _towerId) public view returns (Tower memory) {
        return gs().towers[_towerId];
    }

    // ------------------------------------------------------------
    // Getters
    // ------------------------------------------------------------

    // fetch player inventory
    function _getInventoryByPlayer(address _player) public view returns (Recipe memory) {
        uint256 itemCount = gs().inventoryNonce[_player].length;
        uint256[] memory ret = new uint256[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 _itemId = gs().inventoryNonce[_player][i];
            ret[i] = gs().inventory[_player][_itemId];
        }

        return Recipe({craftItemIds: gs().inventoryNonce[_player], craftItemAmounts: ret});
    }

    function _getTileData(Position memory _pos) public view returns (Tile memory) {
        return gs().map[_pos.x][_pos.y];
    }

    function _getAllPlayerAddresses() public view returns (address[] memory) {
        return gs().allPlayers;
    }

    function _getItemNonce() public view returns (uint256) {
        return gs().itemNonce;
    }

    function _getItem(uint256 _blockId) public view returns (Item memory) {
        return gs().itemsWithMetadata[_blockId];
    }

    function _getPlayer(address _player) public view returns (PlayerData memory playerData) {
        return gs().players[_player];
    }

    function _getBlockAtPos(Position memory _pos) public view returns (uint256) {
        return gs().map[_pos.x][_pos.y].worldBlockId;
    }

    function _getBlockDataAtPos(Position memory _pos) public view returns (BlockData memory) {
        return _getWorldBlockData(_getBlockAtPos(_pos));
    }

    function _getCurrentEpoch() public view returns (uint256) {
        return gs().epoch;
    }

    function _encodePos(Position memory _position) public pure returns (string memory) {
        return string(abi.encodePacked(_position.x, _position.y));
    }
}
