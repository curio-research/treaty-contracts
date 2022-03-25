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
        uint256 startPlayerEnergy;
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
        uint256 energy;
        uint256 reach;
        Position position;
    }

    struct Tile {
        address occupier;
        uint256 worldBlockId; // zero means its empty
    }

    // spawned block data
    struct BlockData {
        uint256 blockId;
        uint256 health;
        address owner;
        uint256 lastAttacked; // "block data" stores the raw data unique to each game instane. Does this make sense?
        // Position position; // do we need this?
    }

    // should creature be an item?
    struct ItemWithMetadata {
        bool mineable;
        bool craftable;
        bool occupiable;
        uint256 health;
        uint256[] mineItemIds; // tools for mining
        uint256[] craftItemIds;
        uint256[] craftItemAmounts;
        bool programmable; // programmable blocks
        string abiEncoding;
        string contractAddr;
        uint256 attackDamage; // additional creature property
        uint256 attackRange;
        uint256 attackCooldown;
        // uint256 defense;
        // uint256 health;
        // uint256 movesPerEpoch;
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
        // map info
        WorldConstants worldConstants;
        GameTypes.Tile[1000][1000] map;
        address admin; // game info
        bool paused;
        mapping(uint256 => GameTypes.ItemWithMetadata) itemsWithMetadata;
        uint256 itemNonce;
        address[] allPlayers; // running list of all initialized players
        mapping(address => GameTypes.PlayerData) players; // player data
        mapping(address => mapping(uint256 => uint256)) inventory; // player => itemId => inventory
        mapping(address => uint256[]) inventoryNonce; // array of all items in player inventory
        // tower
        Epoch epochController;
        mapping(string => Tower) towers; // towerId => Tower
        // every time we spawn a new block it's a new instance
        uint256 worldBlockNonce; // 0 denotes empty block on tile. >1 denotes real block
        mapping(uint256 => BlockData) worldBlocks;
    }
}
