//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Item, Position, BlockData, PlayerData, Tile} from "../libraries/Types.sol";
import {GameUtils} from "../libraries/GameUtil.sol";
import "../libraries/Storage.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from the frontend

contract GetterFacet is UseStorage {
    uint256 public getMapInterval = 10; // what exactly is this value

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
    function _getMap(Position memory _pos) public view returns (Tile[] memory, Position[] memory) {
        uint256 size = getMapInterval * getMapInterval;

        Tile[] memory allTiles = new Tile[](size);
        Position[] memory allPos = new Position[](size);

        uint256 nonce = 0;
        for (uint256 x = _pos.x; x < _pos.x + getMapInterval; x++) {
            for (uint256 y = _pos.y; y < _pos.y + getMapInterval; y++) {
                Position memory _tempPos = Position({x: x, y: y});
                allTiles[nonce] = GameUtils._getTileData(_tempPos);
                allPos[nonce] = _tempPos;
                nonce += 1;
            }
        }

        return (allTiles, allPos);
    }

    // this is called after _getMap is called. used to fetch metadata around blocks
    function _getBlockChunkData(Position memory _pos) public view returns (BlockData[] memory, Position[] memory) {
        uint256 size = getMapInterval * getMapInterval;

        BlockData[] memory allBlockChunkData = new BlockData[](size);
        Position[] memory allPos = new Position[](size);

        uint256 nonce = 0;
        for (uint256 x = _pos.x; x < _pos.x + getMapInterval; x++) {
            for (uint256 y = _pos.y; y < _pos.y + getMapInterval; y++) {
                Position memory _tempPos = Position({x: x, y: y});
                allBlockChunkData[nonce] = GameUtils._getBlockDataAtPos(_tempPos);
                allPos[nonce] = _tempPos;
                nonce += 1;
            }
        }

        return (allBlockChunkData, allPos);
    }
}
