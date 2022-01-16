//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../GameStorage.sol";
import "../GameTypes.sol";
import "../GameEngine.sol";

contract Minigame is Game {
    constructor(
        uint256 _worldWidth,
        uint256 _worldHeight,
        uint256 _moveRange,
        uint256 _attackRange,
        uint256 _attackDamage,
        uint256 _attackWaitTime,
        uint256 _startPlayerHealth,
        uint256 _startPlayerEnergy,
        uint256[][] memory _blocks,
        GameTypes.ItemWithMetadata[] memory _items
    ) Game(
        _worldWidth,
        _worldHeight,
        _moveRange,
        _attackRange,
        _attackDamage,
        _attackWaitTime,
        _startPlayerHealth,
        _startPlayerEnergy,
        _blocks,
        _items
    ) {
        // TODO additional info
    }

    // TODO
}