//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// Data structures for game

enum TERRAIN {
    LAND
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

enum QueryType {
    Has,
    HasVal
}

struct QueryCondition {
    QueryType queryType;
    bytes value;
    string componentName;
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
    uint256 cityUpgradeGoldCost; // constant for now but realistically not ?
    uint256 maxInventoryCapacity;
    uint256 cityPackCost;
    uint256 initCityGold;
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
    address[] treaties;
    address entities;
    string[] componentNames;
    mapping(string => address) components; // component name to contract address
    mapping(uint256 => address) ComponentEntityToAddress; // component id to contract address
    mapping(address => uint256) playerEntityMap;
}
