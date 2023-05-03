//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Treaty.sol";

// Battle Game is a simple Solidity smart contract-based PvP game. 
// Players can join with 10 health points, and they are able to attack another player to reduce their health by 1. 
// In the attack function there is a "approveBattle" that allows customized "treaty" smart contract to modify the attack logic.

// the struct that represents the information of a player
struct Player {
    uint256 playerID;
    uint256 health;
    uint256 joinTime;
}

// Main game smart contract 
contract Game {
    // playerNonce is a universal counter that strictly increases. Each player has a unique ID
    uint256 public playerNonce;

    // a mapping between the playerID to the player struct which holds player information
    mapping(uint256 => Player) public players;

    // a mapping between the address and the playerID
    mapping(address => uint256) public addressToPlayerIDs;

    // for the purpose of demo, set a universal treaty that's run by everyone
    address public treaty;

    // a new player joins game
    function join() public {
        playerNonce++;

        // create a new player and record it in the players mapping 
        addressToPlayerIDs[msg.sender] = playerNonce;
        Player memory newPlayer = Player(playerNonce, 10, block.timestamp);
        players[playerNonce] = newPlayer;
    }

    // This function allows a player to leave the game by removing their information from the players mapping and setting their health to 0. It also updates the addressToPlayerIDs mapping by setting the player's ID to 0.
    function attack(uint256 playerID) public {
        // get the information of the attacker
        Player storage player = players[addressToPlayerIDs[msg.sender]];

        // check if the attacker is dead
        require(player.health > 0, "Player is dead");

        // check if the attacker is attacking himself
        require(player.playerID != playerID, "Player cannot attack himself");

        // get the target player
        Player storage targetPlayer = players[playerID];

        // check if the target player is dead
        require(targetPlayer.health > 0, "Target player is dead");

        // run treaty hook
        Treaty(treaty).approveBattle(player.playerID, targetPlayer.playerID);

        // attack the target player. add attack logic here
        targetPlayer.health -= 1;
    }

    //  --------------- Getter functions ---------------
    // the following functions are used to 
    // we are keeping those extremely extremely simple now

    // get the health of a player from an ID
    function getHealth(uint256 playerID) public view returns (uint256) {
        return players[playerID].health;
    }

    // get the join time of a player from an ID
    function getJoinTime(uint256 playerID) public view returns (uint256) {
        return players[playerID].joinTime;
    }

    // --------------- admin functions ---------------
    // LLM should NOT access

    function setTreaty(address _treaty) public {
        treaty = _treaty;
    }
}
