//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Component} from "contracts/Component.sol";

/// Data structures for game

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
    HasNot,
    IsExactly,
    IsNot,
    ProxyRead,
    ProxyExpand
}

struct QueryFragment {
    QueryType queryType;
    Component component;
    bytes value;
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
    /// Note: Keys of this spec must be in alphabetical order for Foundry testing purposes.
    string name;
    ValueType valueType;
}

struct GameParamSpec {
    /// Note: Keys of this spec must be in alphabetical order for Foundry testing purposes.
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

struct WorldConstants {
    /// Note: Keys of this spec must be in alphabetical order for Foundry testing purposes.
    address admin;
    uint256 cityCenterLevelToEntityLevelRatio; // 3 => lv1 city center unlocks lv3 resources
    uint256 gameLengthInSeconds; // 0 means not used
    GameMode gameMode;
    uint256 maxArmyCountPerPlayer;
    uint256 maxCityCenterLevel;
    uint256 maxCityCountPerPlayer;
    uint256 maxPlayerCount;
    uint256 numInitTerrainTypes; // default is 6
    uint256 secondsToTrainAThousandTroops;
    uint256 tileWidth;
    uint256 worldHeight;
    uint256 worldWidth;
}

struct GameState {
    bool isPaused;
    uint256 lastPaused;
    uint256 gameInitTimestamp;
    WorldConstants worldConstants;
    address[] players;
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
