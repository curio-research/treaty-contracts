//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// Data structures for game

enum TERRAIN {
    PLAIN,
    MOUNTAIN
}

enum VALUE_TYPE {
    UINT,
    STRING,
    BOOL,
    INT,
    ADDRESS,
    POSITION,
    UINT_ARRAY,
    STRING_ARRAY,
    OTHER
}

struct ComponentSpec {
    string name;
    VALUE_TYPE valueType;
}

struct Position {
    uint256 x;
    uint256 y;
}

struct Tile {
    bool isInitialized;
    TERRAIN terrain;
    uint256 city;
}

struct WorldConstants {
    address admin;
    uint256 worldWidth;
    uint256 worldHeight;
    uint256 numInitTerrainTypes; // default is 6
    uint256 initBatchSize; // default is 50 if numInitTerrainTypes = 6
    uint256 maxCityCountPerPlayer;
    uint256 maxArmyCountPerPlayer;
    uint256 maxPlayerCount;
    uint256 maxInventoryCapacity;
    uint256 cityUpgradeGoldCost;
    uint256 cityHealth;
    uint256 cityAttack;
    uint256 cityDefense;
}

struct GameState {
    bool isPaused;
    uint256 lastPaused;
    WorldConstants worldConstants;
    address[] players;
    Tile[5000][5000] map;
    uint256[][] encodedColumnBatches;
    address entities;
    string[] componentNames;
    mapping(string => address) components; // component name to contract address
    mapping(uint256 => address) ComponentEntityToAddress; // component id to contract address
    mapping(address => uint256) playerEntityMap;
}
