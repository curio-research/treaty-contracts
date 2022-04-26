//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

struct Position {
    uint256 x;
    uint256 y;
}

struct WorldConstants {
    uint256 worldWidth;
    uint256 worldHeight;
    uint256 startPlayerHealth;
    uint256 startingReach;
    uint256 startingPlayerDefaultCurrencyAmount;
    uint256 playerMoveCooldown; // time in seconds;
}

struct PlayerData {
    bool initialized;
    uint256 initTimestamp;
    address playerAddr;
    uint256 health;
    uint256 reach;
    uint256 lastMoved; // time in seconds
    Position position;
}

// tiles should also be programmable?
struct Tile {
    address occupier; // this should be the player OR blocks?
    uint256 worldBlockId;
    uint256 tileType; // farm, barn, etc.
    uint256 lastOccupied;
    uint256 tileContractId; // can this also just be a worldBlockId? we can maybe have a contractID
    // need to record lastOccupier?
}

// spawned block data ... I'm researching the entity-component system to beter express these things. For instance there's a lot of
// redunduncy between this struct and the next one. BlockData is basically a subset of the Item?
struct BlockData {
    uint256 blockId;
    uint256 health;
    address owner;
    uint256 lastAttacked; // "block data" stores the raw data unique to each game instane. Does this make sense?
    uint256 lastMoved;
    bool occupiable;
    // Position position; // do we need this?
}

// should creature be an item?
struct Item {
    bool mineable;
    bool craftable;
    bool occupiable;
    uint256 health;
    uint256[] mineItemIds; // tools for mining
    uint256[] craftItemIds;
    uint256[] craftItemAmounts;
    uint256 moveCooldown; // move cooldown for minions mostly
    uint256 attackDamage; // additional creature property
    uint256 attackRange;
    uint256 attackCooldown;
    bool programmable; // programmable blocks. abstract to a enum here
    string abiEncoding;
    string contractAddr;
}

struct Recipe {
    uint256[] craftItemIds;
    uint256[] craftItemAmounts;
}

// even tower should be a programmable block
// TODO: Abstract this!
struct Tower {
    uint256 rewardPerEpoch;
    uint256 itemId; // reward's itemID
    uint256 lastCapturedEpoch; // in epoch units
    address owner;
}

// TODO: Pack this struct
struct GameInfo {
    WorldConstants worldConstants;
    Tile[1000][1000] map;
    address admin; // game info
    bool paused;
    mapping(uint256 => Item) itemsWithMetadata;
    uint256 itemNonce;
    address[] allPlayers; // running list of all initialized players
    mapping(address => PlayerData) players; // player data
    mapping(address => mapping(uint256 => uint256)) inventory; // player => itemId => inventory
    mapping(address => uint256[]) inventoryNonce; // array of all items in player inventory
    // tower
    address epochController;
    mapping(string => Tower) towers; // towerId => Tower
    // every time we spawn a new block it's a new instance
    uint256 worldBlockNonce; // 0 denotes empty block on tile. >1 denotes real block
    mapping(uint256 => BlockData) worldBlocks;
    // epoch info
    uint256 epoch;
    uint256 lastUpdated;
    uint256 interval;
}
