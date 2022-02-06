//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library GameTypes {
    struct Position {
        uint256 x;
        uint256 y;
    }

    struct ItemData {
        uint256 id;
        address itemAddr;
        bool active;
    }

    struct PlayerData {
        bool initialized;
        uint256 initTimestamp;
        address playerAddr;
        bool alive;
        Position position;
        uint256 health;
        uint256 energy;
        uint256 reach;

        // Note for future purposes
        // uint256 level;
        // uint256 fullness;
        // uint256[] holdItems; // items the user is currently holding
    }

    // blocks: all items on a tile
    // All items on a tile.
    // Items "pile" starting from the first element to the last.
    // e.g.1 "water -> dirt -> grass -> wood"
    // e.g.2 "lava -> marble -> workbench"
    // All but the first element can theoretically be extracted.
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
        uint256[] mineItemIds; // tools for mining
        uint256 strength;
        bool craftable;
        uint256[] craftItemIds; // recipe items
        uint256[] craftItemAmounts; // recipe amounts
        bool occupiable;
        uint256 healthDamage;
        uint256 energyDamage;
    }

    struct Recipe {
        uint256[] craftItemIds; // recipe items
        uint256[] craftItemAmounts; // recipe amounts
    }

    struct GameStorage {
        // map info
        uint256 worldWidth;
        uint256 worldHeight;
        GameTypes.Tile[100][100] map;
        // game info
        address admin;
        bool paused;
        // Once adding these, Solidity tells me the stack is too deep.
        // uint256 epoch;
        // uint256 epochLastUpdated;
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
        mapping(address => uint256) lastAttackedAt; // time when user last attacked
        mapping(address => uint256[]) inventoryNonce; // keep track of inventory
    }
}
