//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// Data structures for game

enum BASE_NAME {
    PORT,
    CITY,
    OIL_WELL
}

enum TERRAIN {
    COAST,
    INLAND,
    WATER
}

struct Position {
    uint256 x;
    uint256 y;
}

struct Tile {
    bool isInitializedECS;
    TERRAIN terrain;
}

struct WorldConstants {
    address admin;
    uint256 worldWidth;
    uint256 worldHeight;
    uint256 combatEfficiency; // in the interval [0, 100]
    uint256 numInitTerrainTypes; // default is 6
    uint256 initBatchSize; // default is 50 if numInitTerrainTypes = 6
    uint256 initPlayerGoldBalance;
    uint256 initPlayerOilBalance;
    uint256 maxBaseCountPerPlayer;
    uint256 maxTroopCountPerPlayer;
    uint256 maxPlayerCount;
    uint256 defaultBaseGoldGenerationPerSecond;
    uint256 defaultWellOilGenerationPerSecond;
    uint256 debuffFactor; // in the interval [0, 100]. 100 means losing everything, 0 means debuff affects nothing
}

struct GameState {
    bool isPaused;
    WorldConstants worldConstants;
    address[] players;
    Tile[5000][5000] map;
    uint256[][] encodedColumnBatches;
    //

    address entities;
    mapping(string => address) components; // component name to contract address
    mapping(uint256 => address) idComponentMap; // component id to contract address
    mapping(address => uint256) playerIdMap; // FIXME: update when initialized
}
