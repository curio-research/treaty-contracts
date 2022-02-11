//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";

// ------------------------------------------------------------
// Epoch control for tower energy claim
// ------------------------------------------------------------

contract Epoch {
    uint256 public epoch;
    uint256 public lastUpdated;
    uint256 public interval;

    event EpochUpdate(address _player, uint256 _epoch, uint256 _time);

    constructor(uint256 _interval) {
        interval = _interval;
        lastUpdated = block.timestamp;
        epoch = 0;
    }

    function updateEpoch() external {
        require(block.timestamp - interval >= lastUpdated, "epoch/premature");
        epoch++;
        lastUpdated = block.timestamp;

        emit EpochUpdate(msg.sender, epoch, lastUpdated);
    }
}
