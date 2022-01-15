//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../GameStorage.sol";
import "../GameTypes.sol";
import "../GameEngine.sol";

contract Minigame is Game {
    constructor(
        GameTypes.Position[] memory _positions,
        uint256[] memory _tileTypes,
        uint256 width,
        uint256 height,
        GameTypes.ItemWithMetadata[] memory _items
    ) Game(_positions, _tileTypes, width, height, _items) {
        // TODO additional info
    }

    // TODO
}