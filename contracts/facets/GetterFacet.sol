//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Item, Position, BlockData, PlayerData, Tile, Recipe, WorldConstants} from "../libraries/Types.sol";
import {GameUtils} from "../libraries/GameUtil.sol";
import "../libraries/Storage.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from the frontend

contract GetterFacet is UseStorage {
    // bulk fetch all items and corresponding metadata (amount of material needed to craft and which materials)
    function bulkGetAllItems() external view returns (Item[] memory) {
        uint256 _itemNonce = gs().itemNonce;
        Item[] memory allItems = new Item[](_itemNonce);

        for (uint256 i = 0; i < _itemNonce; i++) {
            allItems[i] = GameUtils._getItem(i);
        }

        return allItems;
    }

    // bulk fetch all player data including location in an array
    function bulkGetAllPlayerData() external view returns (PlayerData[] memory) {
        address[] memory playerAddresses = GameUtils._getAllPlayerAddresses();
        PlayerData[] memory ret = new PlayerData[](playerAddresses.length);

        for (uint256 i = 0; i < playerAddresses.length; i++) {
            ret[i] = GameUtils._getPlayer(playerAddresses[i]);
        }

        return ret;
    }

    // getter method to fetch tile chunk in 10x10 chunks.
    function _getMap(Position memory _pos) external view returns (Tile[] memory, Position[] memory) {
        uint256 interval = gs().worldConstants.getMapInterval;

        Tile[] memory allTiles = new Tile[](interval * interval);
        Position[] memory allPos = new Position[](interval * interval);

        uint256 nonce = 0;
        for (uint256 x = _pos.x; x < _pos.x + interval; x++) {
            for (uint256 y = _pos.y; y < _pos.y + interval; y++) {
                Position memory _tempPos = Position({x: x, y: y});
                allTiles[nonce] = GameUtils._getTileData(_tempPos);
                allPos[nonce] = _tempPos;
                nonce += 1;
            }
        }

        return (allTiles, allPos);
    }

    // this is called after _getMap is called. used to fetch metadata around blocks
    function _getBlockChunkData(Position memory _pos) external view returns (BlockData[] memory, Position[] memory) {
        uint256 interval = gs().worldConstants.getMapInterval;

        BlockData[] memory allBlockChunkData = new BlockData[](interval * interval);
        Position[] memory allPos = new Position[](interval * interval);

        uint256 nonce = 0;
        for (uint256 x = _pos.x; x < _pos.x + interval; x++) {
            for (uint256 y = _pos.y; y < _pos.y + interval; y++) {
                Position memory _tempPos = Position({x: x, y: y});
                allBlockChunkData[nonce] = GameUtils._getBlockDataAtPos(_tempPos);
                allPos[nonce] = _tempPos;
                nonce += 1;
            }
        }

        return (allBlockChunkData, allPos);
    }

    function _getPlayer(address _player) external view returns (PlayerData memory playerData) {
        return GameUtils._getPlayer(_player);
    }

    function _getInventoryByPlayer(address _player) external view returns (Recipe memory) {
        return GameUtils._getInventoryByPlayer(_player);
    }

    function _getWorldConstants() external view returns (WorldConstants memory) {
        return gs().worldConstants;
    }

    function _getTileData(Position memory _pos) external view returns (Tile memory) {
        return GameUtils._getTileData(_pos);
    }

    function _isOccupied(Position memory _pos) external view returns (bool) {
        return GameUtils._isOccupied(_pos);
    }

    function _getWorldBlockData(uint256 _worldBlockIdx) external view returns (BlockData memory) {
        return GameUtils._getWorldBlockData(_worldBlockIdx);
    }

    function _getBlockDataAtPos(Position memory _pos) external view returns (BlockData memory) {
        return GameUtils._getBlockDataAtPos(_pos);
    }

    function _getCurrentEpoch() external view returns (uint256) {
        return GameUtils._getCurrentEpoch();
    }

    function _getSample() external view returns (uint256) {
        return gs().sample;
    }
}
