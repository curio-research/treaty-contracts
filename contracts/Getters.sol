//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./GameEngine.sol";
import {Item, Position, BlockData} from "./GameTypes.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from frontend

contract Getters {
    Game public gameCore;
    GameStorage public utils;
    uint256 public getMapInterval;

    constructor(
        Game _gameCore,
        GameStorage _gameStorage,
        uint256 _getMapInterval
    ) {
        gameCore = _gameCore;
        utils = _gameStorage;
        getMapInterval = _getMapInterval;
    }

    // bulk fetch all items and corresponding metadata (amount of material needed to craft and which materials)
    function bulkGetAllItems() external view returns (Item[] memory) {
        Item[] memory allItems = new Item[](utils._getItemNonce());

        for (uint256 i = 0; i < utils._getItemNonce(); i++) {
            allItems[i] = utils._getItem(i);
        }

        return allItems;
    }

    // bulk fetch all player data including location in an array
    function bulkGetAllPlayerData() external view returns (PlayerData[] memory) {
        address[] memory playerAddresses = utils._getAllPlayerAddresses();
        PlayerData[] memory ret = new PlayerData[](playerAddresses.length);

        for (uint256 i = 0; i < playerAddresses.length; i++) {
            ret[i] = utils._getPlayer(playerAddresses[i]);
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
                allTiles[nonce] = utils._getTileData(_tempPos);
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
                allBlockChunkData[nonce] = utils._getBlockDataAtPos(_tempPos);
                allPos[nonce] = _tempPos;
                nonce += 1;
            }
        }

        return (allBlockChunkData, allPos);
    }
}
