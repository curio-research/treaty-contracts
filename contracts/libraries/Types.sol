//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// Data structures for game

enum Terrain {
    LAND
}

enum ValueType {
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

enum GameMode {
    REGULAR,
    BATTLE_ROYALE
}

struct QueryCondition {
    QueryType queryType;
    bytes value;
    string componentName;
}

struct ComponentSpec {
    string name;
    ValueType valueType;
}

struct GameParamSpec {
    string componentName;
    string functionName;
    uint256 level;
    string object;
    string subject;
    uint256 value;
}

struct Position {
    uint256 x;
    uint256 y;
}

struct Tile {
    bool isInitialized;
    Terrain terrain;
}

struct WorldConstants {
    // Admin info
    address admin;
    // Map info
    uint256 tileWidth;
    uint256 worldWidth;
    uint256 worldHeight;
    uint256 numInitTerrainTypes; // default is 6
    uint256 initBatchSize; // default is 50 if numInitTerrainTypes = 6
    // Manual configs
    uint256 maxCityCountPerPlayer;
    uint256 maxArmyCountPerPlayer;
    uint256 maxPlayerCount;
    GameMode gameMode;
    // Generated configs
    uint256 maxCityCenterLevel;
    uint256 cityCenterLevelToEntityLevelRatio; // 3 => lv1 city center unlocks lv3 resources
    uint256 secondsToTrainAThousandTroops;
}

struct GameState {
    bool isPaused;
    uint256 lastPaused;
    WorldConstants worldConstants;
    address[] players;
    // Tile[5000][5000] map;
    uint256[][] encodedColumnBatches;
    address[] treaties;
    address entities;
    uint256 entityNonce;
    string[] componentNames;
    mapping(string => address) components; // component name to contract address
    string[] templateNames;
    mapping(string => uint256) templates; // template name to id
    mapping(uint256 => address) componentEntityToAddress; // component id to contract address
    mapping(address => uint256) playerEntityMap;
    mapping(address => address) accounts; // main address -> burner address
    mapping(address => address) burnerAccounts; // burner address -> main address
}
