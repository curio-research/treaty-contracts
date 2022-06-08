//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

enum BaseType {
    PORT,
    CITY
}

enum Terrain {
    WATER,
    COASTLINE,
    INLAND
}

struct Position {
    uint256 x;
    uint256 y;
}

struct Player {
    address addr;
    uint256 initTime;
    bool active;
    Position pos;
}

struct Base {
    // TODO: can add another struct named BaseType with all of the fields except ownerAddr
    BaseType baseType;
    address ownerAddr;
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
    address ownerAddr;
    TroopType troopType;
    uint256 lastMoved;
    uint256 lastAttacked;
    uint256 health;
    Position pos;
    Troop[] cargo; // only for Troop Transport
}

struct TroopType {
    string name; // FIXME: enum
    uint256 speed;
    uint256 maxHealth;
    uint256 damagePerHit;
    uint256 attackFactor; // in the interval [0, 100]
    uint256 defenseFactor; // in the interval [0, 100]
    uint256 cargoCapacity;
    uint256 turnsToProduce; // FIXME: turns are seconds or epochs?
    uint256 movementCooldown;
    uint256 attackCooldown;
    bool canMoveOnWater;
    // bool canBombard;
}

struct Production {
    TroopType troopType; // TODO: replace with ID
    uint256 startTime;
}

struct GameState {
    // Game info
    uint256 worldWidth;
    uint256 worldHeight;
    uint256 secondsPerTurn;
    uint256 troopStackLimit;
    address admin;
    // Game state
    address[] players;
    mapping(address => Player) playerMap;
    // mapping(address => uint256[]) playerTroopIdMap;
    Tile[1000][1000] map;
    uint256 epoch;
    mapping(uint256 => Production) baseProductionMap;
    Base[] bases;
    uint256 baseNonce;
    mapping(uint256 => Base) baseIdMap;
    Troop[] troops;
    uint256 troopNonce;
    mapping(uint256 => Troop) troopIdMap;
    TroopType[] troopTypes;
    uint256 troopTypeNonce;
    mapping(uint256 => TroopType) troopTypeIdMap;
}
