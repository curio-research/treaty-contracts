//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Game.sol";

contract Treaty {
    Game public game;

    constructor(address _address) {
        game = Game(_address);
    }

    // example of an treaty function that it's calling
    // LLM should generate this snippet here.
    // example below: if a player is weak, don't attack. mercy treaty
    function approveBattle(uint256 attackerID, uint256 targetID) public view {
        // example: if the target player has health less than 5, don't attack
        if (game.getHealth(targetID) < 5) {
            revert("Target must have health greater than 5");
        }
    }
}
