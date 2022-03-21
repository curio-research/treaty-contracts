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
        address owner;
        uint256 topLevelStrength; // Remaining strength of the top level block. May need to convert to a full array in future to prevent malicious restoring of block strength by placing on top.
        uint256 blockId;
    }

    struct TileWithMetadata {
        address occupier;
        uint256 blockId;
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
        // map info
        WorldConstants worldConstants;
        GameTypes.Tile[1000][1000] map;
        // game info
        address admin;
        bool paused;
        mapping(uint256 => GameTypes.ItemWithMetadata) itemsWithMetadata;
        uint256 itemNonce;
        // players
        address[] allPlayers;
        mapping(address => GameTypes.PlayerData) players; // player data
        mapping(address => mapping(uint256 => uint256)) inventory; // player => itemId => inventory
        mapping(address => uint256[]) inventoryNonce; // array of all items in player inventory
        // tower
        Epoch epochController;
        mapping(string => Tower) towers; // towerId => Tower
    }
}
