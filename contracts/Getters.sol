//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./GameEngine.sol";
import "./GameTypes.sol";
import "hardhat/console.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from frontend

contract Getters {
    Game gameCore;

    constructor(Game _gameCore) {
        gameCore = _gameCore;
    }

    // bulk fetch all items and corresponding metadata (amount of material needed to craft and which materials)
    function bulkGetAllItems()
        external
        view
        returns (GameTypes.ItemWithMetadata[] memory)
    {
        GameTypes.ItemWithMetadata[]
            memory allItems = new GameTypes.ItemWithMetadata[](
                gameCore._getItemNonce() - 1
            );

        for (uint256 i = 1; i < gameCore._getItemNonce(); i++) {
            allItems[i - 1] = gameCore._getItemWithMetadata(i-1);
        }

        return allItems;
    }

    // bulk fetch all player data including location in an array
    function bulkGetAllPlayerData()
        external
        view
        returns (GameTypes.PlayerData[] memory)
    {
        address[] memory playerAddresses = gameCore._getAllPlayerAddresses();
        GameTypes.PlayerData[] memory ret = new GameTypes.PlayerData[](
            playerAddresses.length
        );

        for (uint256 i = 0; i < playerAddresses.length; i++) {
            ret[i] = gameCore._getAllPlayerData(playerAddresses[i]);
        }

        return ret;
    }

    function bulkGetAllMapInfo() external view returns (
        uint256 worldWidth,
        uint256 worldHeight,
        GameTypes.Tile[1000][1000] memory map
    ) {
        console.log("started call");
        (worldWidth, worldHeight) = gameCore._getWorldSize();
        console.log("worldWidth ready");
        return (worldWidth, worldHeight, gameCore._getMap());
    }
}
