//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Epoch.sol";

library GameTypes {
    struct Position {
        uint256 x;
        uint256 y;
    }

    struct WorldConstants {
        uint256 worldWidth;
        uint256 worldHeight;
        uint256 startingAttackDamage;
        uint256 startingAttackRange;
        uint256 startingAttackWaitTime;
        uint256 startPlayerHealth;
        uint256 startingReach;
        uint256 startingPlayerDefaultCurrencyAmount;
    }

    struct PlayerData {
        bool initialized;
        uint256 initTimestamp;
        address playerAddr;
        uint256 attackDamage;
        uint256 attackRange;
        uint256 health;
        uint256 reach;
        Position position;
    }

    // tile should not have any strength. only items on top of the tiles should have strength
    struct Tile {
        address occupier; // if there's owner on top
        address owner;
        uint256 blockId; // reverting this to only allow 1 type of block on top. this should be the ID?
    }

    struct TileWithMetadata {
        address occupier;
        uint256 blockId;
        uint256 x;
        uint256 y;
    }

    enum ItemType {
        NORMAL,
        CREATURE
    }

    // creatures are a type of item as well?
    struct ItemWithMetadata {
        bool mineable;
        bool craftable;
        uint256 strength;
        uint256[] craftItemIds;
        uint256[] craftItemAmounts;
        /* Programmable blocks */
        bool programmable;
        string abiEncoding;
        string contractAddr;
    }

    struct Recipe {
        uint256[] craftItemIds;
        uint256[] craftItemAmounts;
    }

    struct Tower {
        uint256 rewardPerEpoch;
        uint256 itemId;
        uint256 stakedAmount;
        uint256 stakedTime; // in epochs unit
        address owner;
    }

    // TODO: Pack this struct
    struct GameStorage {
        WorldConstants worldConstants;
        Tile[1000][1000] map; // this is not efficient
        address admin; // game info
        bool paused;
        mapping(uint256 => ItemWithMetadata) itemsWithMetadata;
        uint256 itemNonce;
        // players
        address[] allPlayers;
        mapping(address => PlayerData) players; // player data
        mapping(address => mapping(uint256 => uint256)) inventory; // player => itemId => inventory
        mapping(address => uint256[]) inventoryNonce; // array of all items in player inventory
        // tower
        Epoch epochController;
        mapping(string => Tower) towers; // towerId => Tower
        // how do we store creatures?
        // every creature can have an index and we increment it, and then reference it in the block?
        uint256 creatureNonce;
        mapping(uint256 => Creature) creatures; // so these would not be blocks
    }
}
