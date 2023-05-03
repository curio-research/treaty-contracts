
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Game.sol";

// This treaty defines a approveBattle function that implements the following logic:
// 1. if player A joins the game earlier than B, then A can attack B only when the health of A > health of B
// 2. if player A joins the game later than B, then A can attack B only when the health of A < health of B
// 3. if player A and B join at the same time, they cannot attack each other 
contract SeniorityMattersTreaty {
    Game public game;

    constructor(address _address) {
        game = Game(_address);
    }

    function approveBattle(uint256 attackerID, uint256 targetID) public view {
        // TODO: fill in the blank here based on the contract logic 
    }
}

******************************************************
******************************************************
******************************************************



//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Game.sol";

// This treaty defines a approveBattle function that forbids a player from attacking 
// another player if the traget player has health less than 5.
contract MercyTreaty {
    Game public game;

    constructor(address _address) {
        game = Game(_address);
    }

    // example below: if a player is weak, don't attack. mercy treaty
    function approveBattle(uint256 attackerID, uint256 targetID) public view {
        // example: if the target player has health less than 5, don't attack
        if (game.getHealth(targetID) < 5) {
            revert("Target must have health greater than 5");
        }
    }
}
