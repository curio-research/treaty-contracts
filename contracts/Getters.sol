//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./GameEngine.sol";
import "./GameTypes.sol";
import "hardhat/console.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from frontend

contract Getters {
    Game gameCore;
    GameStorage utils;

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
                utils._getItemNonce() - 1
            );

        for (uint256 i = 1; i < utils._getItemNonce(); i++) {
            allItems[i - 1] = utils._getItemWithMetadata(i - 1);
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
            ret[i] = utils._getAllPlayerData(playerAddresses[i]);
        }

        return ret;
    }
}
