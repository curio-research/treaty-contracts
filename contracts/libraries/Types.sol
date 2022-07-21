//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// Data structures for game

enum BASE_NAME {
    PORT,
    CITY,
    OIL_WELL
}

// TODO: allow bases to consume oil

enum TERRAIN {
    COAST,
    INLAND,
    WATER
}

enum TROOP_NAME {
    INFANTRY,
    TROOP_TRANSPORT,
    DESTROYER,
    CRUISER,
    BATTLESHIP,
    FIGHTER_JET
}

struct Position {
    uint256 x;
    uint256 y;
}

struct Player {
    uint256 initTimestamp;
    bool active;
    uint256 goldBalance;
    uint256 oilBalance;
    uint256 totalGoldGenerationPerUpdate;
    uint256 totalOilGenerationPerUpdate;
    uint256 totalOilConsumptionPerUpdate;
    uint256 balanceLastUpdated;
    uint256 numOwnedBases;
    uint256 numOwnedTroops;
}

struct Base {
    BASE_NAME name;
    address owner;
    uint256 attackFactor;
    uint256 defenseFactor;
    uint256 health;
    uint256 goldGenerationPerSecond;
    uint256 oilGenerationPerSecond;
    Position pos;
}

struct Tile {
    bool isInitialized;
    TERRAIN terrain;
    uint256 occupantId; // troopID
    uint256 baseId;
}

struct Troop {
    address owner;
    uint256 troopTypeId;
    uint256 lastMoved;
    uint256 lastLargeActionTaken;
    uint256 lastRepaired;
    uint256 health;
    Position pos;
    uint256[] cargoTroopIds; // only for Troop Transport
    bool isUnderArmy;
}

struct TroopType {
    TROOP_NAME name;
    bool isLandTroop;
    uint256 maxHealth;
    uint256 damagePerHit;
    uint256 attackFactor; // in the interval [0, 100]
    uint256 defenseFactor; // in the interval [0, 100]
    uint256 cargoCapacity;
    uint256 movementCooldown;
    uint256 largeActionCooldown;
    uint256 goldPrice;
    uint256 oilConsumptionPerSecond;
    uint256[] armyTroopIds;
    bool isBasic; // basic type [infantry ...]
}

struct WorldConstants {
    address admin;
    uint256 worldWidth;
    uint256 worldHeight;
    uint256 numPorts;
    uint256 numCities;
    uint256 combatEfficiency; // in the interval [0, 100]
    uint256 numInitTerrainTypes; // default is 5
    uint256 initBatchSize; // default is 100 if numInitTerrainTypes = 5
    uint256 initPlayerGoldBalance;
    uint256 initPlayerOilBalance;
    uint256 maxBaseCountPerPlayer;
    uint256 maxTroopCountPerPlayer;
    uint256 maxPlayerCount;
    uint256 defaultBaseGoldGenerationPerSecond;
    uint256 defaultWellOilGenerationPerSecond;
}

struct GameState {
    bool isPaused;
    uint256 lastPaused;
    WorldConstants worldConstants;
    address[] players;
    mapping(address => Player) playerMap;
    Tile[5000][5000] map;
    uint256[] baseIds;
    uint256 baseNonce;
    mapping(uint256 => Base) baseIdMap;
    uint256[] troopIds;
    uint256 troopNonce;
    mapping(uint256 => Troop) troopIdMap;
    uint256[] troopTypeIds;
    mapping(uint256 => TroopType) troopTypeIdMap;
    uint256[][] encodedColumnBatches;
}
