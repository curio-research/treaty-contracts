//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

enum BaseName {
    PORT,
    CITY
}

enum Terrain {
    WATER,
    COASTLINE,
    INLAND
}

enum TroopName {
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
    uint256 initEpoch;
    bool active;
    Position pos;
}

struct Base {
    // TODO: can add another struct named BaseType with all of the fields except ownerAddr
    BaseName name;
    address owner;
    uint256 attackFactor;
    uint256 defenseFactor;
    uint256 health;
}

struct Tile {
    Terrain terrain;
    uint256 occupantId; // a troop
    uint256 baseId;
}

struct Troop {
    address owner;
    uint256 troopTypeId;
    uint256 lastMoved;
    uint256 lastAttacked;
    uint256 health;
    Position pos;
    uint256[] cargoTroopIds; // only for Troop Transport
}

struct TroopType {
    TroopName name;
    uint256 speed; // movement per epoch
    uint256 maxHealth;
    uint256 damagePerHit;
    uint256 attackFactor; // in the interval [0, 100]
    uint256 defenseFactor; // in the interval [0, 100]
    uint256 cargoCapacity;
    uint256 epochsToProduce;
    uint256 movementCooldown;
    uint256 attackCooldown;
    bool isArmy;
    // bool canBombard; // only needed for Fighter Jets
}

struct Production {
    uint256 troopTypeId;
    uint256 startEpoch;
}

struct GameState {
    uint256 worldWidth;
    uint256 worldHeight;
    uint256 secondsPerTurn;
    uint256 troopStackLimit;
    address admin;
    address[] players;
    mapping(address => Player) playerMap;
    Tile[1000][1000] map;
    uint256 epoch;
    uint256 lastTimestamp;
    mapping(uint256 => Production) baseProductionMap;
    uint256[] baseIds;
    mapping(uint256 => Base) baseIdMap;
    uint256[] troopIds;
    uint256 troopNonce;
    mapping(uint256 => Troop) troopIdMap;
    uint256[] troopTypeIds;
    mapping(uint256 => TroopType) troopTypeIdMap;
    // mapping(address => uint256[]) playerTroopIdMap;
}
