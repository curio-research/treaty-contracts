//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Epoch.sol";

library GameTypes {
    struct Position {
        uint256 x;
        uint256 y;
    }

    struct ItemData {
        uint256 id;
        bool active;
    }

    struct PlayerData {
        bool initialized;
        bool alive;
        uint256 initTimestamp;
        address playerAddr;
        uint256 health;
        uint256 energy;
        uint256 reach;
        Position position;

        // Note for future purposes
        // uint256 level;
        // uint256 fullness;
        // uint256[] holdItems; // items the user is currently holding
    }

    struct Tile {
        address occupier;
        uint256[] blocks;
    }

    struct TileWithMetadata {
        address occupier;
        uint256[] blocks;
        uint256 x;
        uint256 y;
    }

    struct ItemWithMetadata {
        bool mineable;
        bool craftable;
        bool occupiable;
        uint256 strength;
        uint256 healthDamage;
        uint256 energyDamage;
        uint256[] mineItemIds; // tools for mining
        uint256[] craftItemIds;
        uint256[] craftItemAmounts;
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
        uint256 worldWidth;
        uint256 worldHeight;
        GameTypes.Tile[100][100] map;
        // game info
        address admin;
        bool paused;
        Epoch epochController;
        mapping(uint256 => GameTypes.ItemData) items;
        mapping(uint256 => GameTypes.ItemWithMetadata) itemsWithMetadata;
        uint256 itemNonce; // TODO move constants below into a struct for readability
        uint256 moveRange;
        uint256 attackRange;
        uint256 attackDamage;
        uint256 attackWaitTime;
        uint256 startPlayerHealth;
        uint256 startPlayerEnergy;
        // Player states
        address[] allPlayers;
        mapping(address => GameTypes.PlayerData) players; // player data
        mapping(address => mapping(uint256 => uint256)) inventory; // player => itemId => inventory
        mapping(address => uint256) lastMovedAt; // time when user last moved
        mapping(address => uint256[]) inventoryNonce; // array of all items in player inventory
        // tower
        mapping(string => Tower) towers; // towerId => Tower
        mapping(address => uint256) stakePoints;
    }
}
