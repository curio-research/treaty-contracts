//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Game.sol";

// This treaty defines a approveBattle function that implements the following logic:
// 1. if player A joins the game earlier than B, then A can attack B only when the health of A > health of B
// 2. if player A joins the game later than B, then A can attack B only when the health of A < health of B
// 3. if player A and B join at the same time, they cannot attack each other
contract Treaty {
    Game public game;

    constructor(address _address) {
        game = Game(_address);
    }

    // if the target player's health is different from the attacker's, revert the attack
    function approveBattle(uint256 attackerID, uint256 targetID) public view {
        uint256 attackerJoinTime = game.getJoinTime(attackerID);
        uint256 targetJoinTime = game.getJoinTime(targetID);
        uint256 attackerHealth = game.getHealth(attackerID);
        uint256 targetHealth = game.getHealth(targetID);

        if (attackerJoinTime < targetJoinTime) {
            require(attackerHealth > targetHealth, "Attacker's health must be greater than target's health");
        } else if (attackerJoinTime > targetJoinTime) {
            require(attackerHealth < targetHealth, "Attacker's health must be less than target's health");
        } else {
            revert("Players joined at the same time and cannot attack each other");
        }
    }
}

