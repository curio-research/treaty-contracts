//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Set} from "contracts/Set.sol";
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

enum GameMode {
    REGULAR,
    BATTLE_ROYALE
}

struct QueryCondition {
    QueryType queryType;
    Component component;
    bytes value;
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
    uint256 capitalLevelToEntityLevelRatio; // 3 => lv1 capital unlocks lv3 resources
    uint256 gameLengthInSeconds; // 0 means not used
    GameMode gameMode;
    uint256 maxArmyCountPerNation;
    uint256 maxCapitalLevel;
    uint256 maxNationCount;
    // uint256 maxTransferDistance; // FIXME: stack too deep for Foundry test
    uint256 numInitTerrainTypes; // default is 6
    uint256 secondsToTrainAThousandTroops;
    uint256 tileWidth;
    uint256 worldHeight;
    uint256 worldWidth;
}

struct GameState {
    // Basic
    bool isPaused;
    uint256 lastPaused;
    uint256 gameInitTimestamp;
    WorldConstants worldConstants;
    uint256[][] encodedColumnBatches;
    // Functions
    string[] gameFunctionNames;
    mapping(string => bool) isGameFunction;
    // Entities
    address entities;
    uint256 entityNonce; // tracks the biggest entity ever created to avoid collisions
    // Components
    string[] componentNames;
    mapping(string => address) components; // component name -> component address
    // Templates (resource, troop, or treaty)
    string[] templateNames;
    mapping(string => uint256) templates; // template name -> template id
    // Tokens
    address[] authorizedTokens;
    mapping(address => bool) isAuthorizedToken;
    // Accounts
    mapping(address => address) mainToBurner; // main address -> burner address
    mapping(address => address) burnerToMain; // burner address -> main address
    uint256 addressNonce; // used for generating tile addresses
}
