//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// the struct that represents the information of a player
struct Player {
    uint256 playerID;
    uint256 health;
    uint256 attack;
    uint256 joinTime;
}

// Main game file
contract Game {
    // playerID is a universal counter that strictly increases. Each player has a unique ID
    uint256 public playerNonce;

    // a mapping between the playerID to the player struct which holds player information
    mapping(uint256 => Player) public players;

    function join() public {
        // create a new player
        playerNonce++;
        Player memory newPlayer = Player(playerNonce, 100, 10, block.timestamp);
        players[playerNonce] = newPlayer;
    }

    function attack(uint256 playerID) public {
        // get the information of the attacker
        Player storage player = players[playerID];

        // check if the player is dead
        require(player.health > 0, "Player is dead");

        // check if the player is attacking himself
        require(player.playerID != playerID, "Player cannot attack himself");

        // get the target player
        Player storage targetPlayer = players[playerID];

        // check if the target player is dead
        require(targetPlayer.health > 0, "Target player is dead");

        // run treaty hook

        // attack the target player
        targetPlayer.health -= player.attack;
    }
}
