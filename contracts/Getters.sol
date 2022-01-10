//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./GameEngine.sol";
import "./GameTypes.sol";

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
                gameCore._getItemNonce() + 1
            );

        for (uint256 i = 1; i < gameCore._getItemNonce(); i++) {
            allItems[i - 1] = gameCore._getItemWithMetadata(i);
        }

        return allItems;
    }
}
