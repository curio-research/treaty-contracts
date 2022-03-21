//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./GameEngine.sol";
import "./GameTypes.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from frontend

contract Getters {
    Game gameCore;
    GameStorage utils;
    uint256 public GET_MAP_INTERVAL = 10;

    constructor(Game _gameCore, GameStorage _gameStorage) {
        gameCore = _gameCore;
        utils = _gameStorage;
    }

    // bulk fetch all items and corresponding metadata (amount of material needed to craft and which materials)
    function bulkGetAllItems()
        external
        view
        returns (GameTypes.ItemWithMetadata[] memory)
    {
        GameTypes.ItemWithMetadata[]
            memory allItems = new GameTypes.ItemWithMetadata[](
                utils._getItemNonce()
            );

        for (uint256 i = 1; i < utils._getItemNonce(); i++) {
            allItems[i - 1] = utils._getItem(i - 1);
        }

        return allItems;
    }

    // bulk fetch all player data including location in an array
    function bulkGetAllPlayerData()
        external
        view
        returns (GameTypes.PlayerData[] memory)
    {
        address[] memory playerAddresses = utils._getAllPlayerAddresses();
        GameTypes.PlayerData[] memory ret = new GameTypes.PlayerData[](
            playerAddresses.length
        );

        for (uint256 i = 0; i < playerAddresses.length; i++) {
            ret[i] = utils._getPlayer(playerAddresses[i]);
        }

        return ret;
    }

    // getter method to fetch map in 10x10 chunks. can increase size
    function _getMap(GameTypes.Position memory _pos)
        public
        view
        returns (GameTypes.TileWithMetadata[] memory)
    {
        GameTypes.TileWithMetadata[]
            memory ret = new GameTypes.TileWithMetadata[](
                GET_MAP_INTERVAL * GET_MAP_INTERVAL
            );
        uint256 nonce = 0;
        for (uint256 x = _pos.x; x < _pos.x + GET_MAP_INTERVAL; x++) {
            for (uint256 y = _pos.y; y < _pos.y + GET_MAP_INTERVAL; y++) {
                GameTypes.Position memory _tempPos = GameTypes.Position({
                    x: x,
                    y: y
                });
                GameTypes.Tile memory _tileData = utils._getTileData(_tempPos);
                ret[nonce] = GameTypes.TileWithMetadata({
                    occupier: _tileData.occupier,
                    blockId: _tileData.blockId,
                    x: x,
                    y: y
                });
                nonce += 1;
            }
        }
        return ret;
    }
}
