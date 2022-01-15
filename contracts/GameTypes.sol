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
        
        // // for future purposes
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

    struct ItemWithMetadata {
        /**
         * Additional information on an item.
         * Used to bulk-return crafting items.
         */

        // Type of item, belonging to one of above 4 categories
		// Note: Can change to enum
		// Note: Can also remove - duplicate with bools below
		uint256 itemType;
	
		// Mining
		bool mineable;
		uint256 mineItemId; // tool needed
        uint256 strength;
	
		// Crafting
		bool craftable;
		uint256[] craftItemIds; // recipe items
		uint256[] craftItemAmounts; // recipe amounts

		// Placing
		uint256[] placeItemIds; // empty = not placable anywhere

		// Note: Posession is taken care of in PlayerData

		// Occupation
		// e.g.1. sand: occupiable; no energy impact
		// e.g.2. water: occupiable; 1 energy damage
		// e.g.3. lava: occupiable; 1 energy & 1 health damage
		// e.g.4. mountain: not occupiable
		bool occupiable;
		uint256 energyDamage; // per unit time
		uint256 healthDamage; // per unit time

		// Protection
        // e.g. If gold shield has health 1 on lava, then lava has 
        // no health damage on player.
        uint256[] protectItemIds;
        uint256[] protectItemHealths;
    }

    struct GameStorage {
        // Map info
        uint256 worldWidth;
        uint256 worldHeight;
        GameTypes.Tile[1000][1000] map;

        // Game info
        address admin;
        bool paused;
        mapping(uint256 => GameTypes.ItemData) items;
        mapping(uint256 => uint256) itemType;
        mapping(uint256 => bool) mineable;
        mapping(uint256 => uint256) mineItemId;
        mapping(uint256 => uint256) strength; // FIXME name might be confounding
        mapping(uint256 => bool) craftable;
        mapping(uint256 => uint256[]) craftItemIds;
        mapping(uint256 => mapping(uint256 => uint256)) craftItemAmounts; // id => material id => amount
        mapping(uint256 => uint256[]) placeItemIds;
        mapping(uint256 => bool) occupiable;
        mapping(uint256 => uint256) energyDamage;
        mapping(uint256 => uint256) healthDamage;
        mapping(uint256 => uint256[]) protectItemIds;
        mapping(uint256 => mapping(uint256 => uint256)) protectItemHealths; // id => item id => amount
        uint256 itemNonce;
        uint256 moveRange;
        uint256 attackRange;
        uint256 attackDamage;
        uint256 attackWaitTime;
        uint256 startPlayerHealth;
        uint256 startPlayerEnergy;

        // Player states
        address[] allPlayers;
        mapping(address => GameTypes.PlayerData) players; // player data
        mapping(address => uint256) joinedAt; // time joined for player
        mapping(address => mapping(uint256 => uint256)) inventory; // player => itemId => inventory
        mapping(address => uint256) lastMovedAt; // time when user last moved
        mapping(address => uint256) lastAttackedAt; // time when user last attacked
    }
}
