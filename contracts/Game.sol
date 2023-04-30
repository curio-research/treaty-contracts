//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Treaty.sol";

// the struct that represents the information of a player
struct Player {
    uint256 playerID;
    uint256 health;
    uint256 joinTime;
}

// Main game file
contract Game {
    // playerID is a universal counter that strictly increases. Each player has a unique ID
    uint256 public playerNonce;

    // a mapping between the playerID to the player struct which holds player information
    mapping(uint256 => Player) public players;

    // a mapping between the address and the playerID
    mapping(address => uint256) public addressToPlayerIDs;

    // for the purpose of demo, set a universal treaty that's run by everyone
    address public treaty;

    // player joins game
    function join() public {
        playerNonce++;

        // create a new player
        addressToPlayerIDs[msg.sender] = playerNonce;
        Player memory newPlayer = Player(playerNonce, 10, block.timestamp);
        players[playerNonce] = newPlayer;
    }

    function attack(uint256 playerID) public {
        // get the information of the attacker
        Player storage player = players[addressToPlayerIDs[msg.sender]];

        // check if the player is dead
        require(player.health > 0, "Player is dead");

        // check if the player is attacking himself
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
    // treaties should use these
    // keeping those extremely extremely simple now

    // get the health of a player from an ID
    function getHealth(uint256 playerID) public view returns (uint256) {
        return players[playerID].health;
    }

    // get the join time of a player from an ID
    function getJoinTime(uint256 playerID) public view returns (uint256) {
        return players[playerID].joinTime;
    }

    // --------------- admin functions ---------------

    function setTreaty(address _treaty) public {
        treaty = _treaty;
    }
}
