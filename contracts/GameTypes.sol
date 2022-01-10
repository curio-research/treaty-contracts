//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// @title Master file that stores all game types

library GameTypes {
    struct Position {
        uint256 x;
        uint256 y;
    }

    struct Item {
        bool active;
        uint256 id;
        uint256 strength;
        address itemAddr;
    }

    struct PlayerData {
        bool alive;
        bool isInitialized;
        uint256 initTimestamp;
        Position position;
        uint256 energy;
        uint256 health;
        uint256 level; // currently only used to determine whether able to mine or craft item
    }

    struct MapData {
        address occupier;
        mapping(uint256 => uint256) blocks; // z-index => block. This allows us to have "3D" maps. 0 means no blocks
    }

    // used to bulk return crafting items
    struct ItemWithMetadata {
        uint256[] materialIds;
        uint256[] materialAmounts;
    }

    struct GameStorage {
        // map info
        uint256 WORLD_WIDTH;
        uint256 WORLD_HEIGHT;
        GameTypes.MapData[1000][1000] map;
        // game info
        address admin;
        bool paused;
        mapping(uint256 => GameTypes.Item) items; // all available items to be collected / crafted;
        mapping(uint256 => uint256[]) itemMaterials;
        mapping(uint256 => mapping(uint256 => uint256)) materialAmounts; // id => material => amount
        mapping(uint256 => uint256) itemLevels; // later
        uint256 itemNonce;
        uint256 moveRange;
        uint256 attackRange;
        // player states
        address[] allPlayers; // potentially good for record keeping
        mapping(address => uint256) joined; // time joined for player
        mapping(uint256 => uint256) levelMaxHeath; // max health for each level
        mapping(address => GameTypes.PlayerData) players; // player positions
        mapping(address => mapping(uint256 => uint256)) inventory; // player => itemId => inventory. Keeps count of items
        mapping(address => uint256) lastMoved; // when user last moved
        mapping(address => uint256) lastAttacked; // when user last attacked
    }
}
