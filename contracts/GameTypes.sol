//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// @title Master file that stores all game types

library GameTypes {
    struct Position {
        uint256 x;
        uint256 y;
    }

    struct ItemData {
        /**
         * Abstraction for all inanimate things in the game.
         */

        uint256 id;
        address itemAddr;
        bool active;
    }

    struct PlayerData {
        /**
         * Abstraction for all animate beings in the game.
         */

        // Fixed attributes
        bool initialized;
        uint256 initTimestamp;
        address playerAddr;
        // Variable attributes
        bool alive;
        Position position;
        uint256 health;
        uint256 energy;

        // Note for future purposes
        // uint256 level;
        // uint256 fullness;
        // uint256[] holdItems; // items the user is currently holding
    }

    struct Tile {
        /**
         * A unit of space which can host a player and/or an array
         * of items.
         */

        // Player on a tile, if applicable
        address occupier;
        // All items on a tile.
        // Items "pile" starting from the first element to the last.
        // e.g.1 "water -> dirt -> grass -> wood"
        // e.g.2 "lava -> marble -> workbench"
        // All but the first element can theoretically be extracted.
        uint256[] blocks;
    }

    struct TileWithMetadata {
        address occupier;
        uint256[] blocks;
        uint256 x;
        uint256 y;
    }

    struct ItemWithMetadata {
        /**
         * Additional information on an item.
         * Used to bulk-return crafting items.
         */

        // Mining
        bool mineable;
        uint256[] mineItemIds; // tools for mining
        // strength for both mining and being mined
        uint256 strength;
        // Crafting
        bool craftable;
        uint256[] craftItemIds; // recipe items
        uint256[] craftItemAmounts; // recipe amounts
        // Placing
        // e.g. stone can be placed on water and lava, so it has
        // those two in its placeItemIds
        // Note: Ignored for now
        // uint256[] placeItemIds; // empty = not placable anywhere

        // Note: Posession is taken care of in PlayerData

        // Occupation
        // e.g.1. sand: occupiable; no energy impact
        // e.g.2. water: occupiable; 1 energy damage
        // e.g.3. lava: occupiable; 1 energy & 1 health damage
        // e.g.4. mountain: not occupiable
        bool occupiable;
        uint256 healthDamage; // per unit time
        uint256 energyDamage; // per unit time

        // Protection
        // e.g. If gold shield has health 1 on lava, then lava has
        // no health damage on player.
        // Note: ignored for now
        // uint256[] protectItemIds;
        // uint256[] protectItemHealths;
    }

    struct Recipe {
        uint256[] craftItemIds; // recipe items
        uint256[] craftItemAmounts; // recipe amounts
    }

    struct GameStorage {
        // Map info
        uint256 worldWidth;
        uint256 worldHeight;
        GameTypes.Tile[100][100] map;
        // Game info
        address admin;
        bool paused;
        mapping(uint256 => GameTypes.ItemData) items;
        mapping(uint256 => GameTypes.ItemWithMetadata) itemsWithMetadata;
        // TODO move constants below into a struct for readability
        uint256 itemNonce;
        uint256 moveRange; // TODO move into PlayerData
        uint256 attackRange; // TODO move into PlayerData
        uint256 attackDamage; // TODO move into PlayerData
        uint256 attackWaitTime; // TODO move into PlayerData
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
