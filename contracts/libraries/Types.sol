//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

enum BASE_NAME {
    PORT,
    CITY
}

enum TERRAIN {
    COAST,
    INLAND,
    WATER
}

enum TROOP_NAME {
    ARMY,
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
}

struct Base {
    BASE_NAME name;
    address owner;
    uint256 attackFactor;
    uint256 defenseFactor;
    uint256 health;
}

struct Tile {
    bool isInitialized;
    TERRAIN terrain;
    uint256 occupantId; // a troop
    uint256 baseId;
}

struct Troop {
    address owner;
    uint256 troopTypeId;
    uint256 movesLeftInSecond;
    uint256 lastMoved;
    uint256 lastLargeActionTaken;
    uint256 lastRepaired;
    uint256 health;
    Position pos;
    uint256[] cargoTroopIds; // only for Troop Transport
}

struct TroopType {
    TROOP_NAME name;
    bool isLandTroop;
    uint256 maxHealth;
    uint256 damagePerHit;
    uint256 attackFactor; // in the interval [0, 100]
    uint256 defenseFactor; // in the interval [0, 100]
    uint256 cargoCapacity;
    uint256 movesPerSecond;
    uint256 movementCooldown;
    uint256 largeActionCooldown;
    uint256 productionCooldown;
}

struct Production {
    uint256 troopTypeId;
    uint256 startTimestamp;
}

struct WorldConstants {
    address admin;
    uint256 worldWidth;
    uint256 worldHeight;
    uint256 numPorts;
    uint256 numCities;
    uint256 mapInterval;
    uint256 combatEfficiency; // in the interval [0, 100]
    uint256 numInitTerrainTypes; // default is 5
}

struct GameState {
    WorldConstants worldConstants;
    address[] players;
    mapping(address => Player) playerMap;
    Tile[1000][1000] map;
    mapping(uint256 => Production) baseProductionMap;
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
