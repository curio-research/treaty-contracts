//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {BASE_NAME, Base, GameState, Player, Position, TERRAIN, Tile, Troop, TroopType, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/libraries/Component.sol";
import {Set} from "contracts/libraries/Set.sol";
import "forge-std/console.sol";

/// @title Helper facet
/// @notice Contains admin functions and state functions, both of which should be out of scope for players

contract HelperFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;
    address NULL_ADDR = address(0);

    // ----------------------------------------------------------------------
    // ADMIN FUNCTIONS
    // ----------------------------------------------------------------------

    modifier onlyAdmin() {
        require(msg.sender == gs().worldConstants.admin, "CURIO: Unauthorized");
        _;
    }

    /**
     * Pause an ongoing game.
     */
    function pauseGame() external onlyAdmin {
        require(!gs().isPaused, "CURIO: Game is paused");

        address[] memory _allPlayers = gs().players;
        for (uint256 i = 0; i < _allPlayers.length; i++) {
            Util._updatePlayerBalances(_allPlayers[i]);
        }

        gs().isPaused = true;
        gs().lastPaused = block.timestamp;
        emit Util.GamePaused();
    }

    /**
     * Resume a paused game.
     */
    function resumeGame() external onlyAdmin {
        require(gs().isPaused, "CURIO: Game is ongoing");

        for (uint256 i = 0; i < gs().players.length; i++) {
            gs().playerMap[gs().players[i]].balanceLastUpdated = block.timestamp;
        }

        gs().isPaused = false;
        emit Util.GameResumed();
    }

    /**
     * Reactivate an inactive player.
     * @param _player player address
     */
    function reactivatePlayer(address _player) external onlyAdmin {
        require(!Util._isPlayerInitialized(_player), "CURIO: Player already initialized");
        require(!Util._isPlayerActive(_player), "CURIO: Player is active");

        gs().playerMap[_player].active = true;
        gs().playerMap[_player].goldBalance = gs().worldConstants.initPlayerGoldBalance; // reload balance
        emit Util.PlayerReactivated(_player);
    }

    /**
     * Store an array of encoded raw map columns containing information of all tiles, for efficient storage.
     * @param _colBatches map columns in batches, encoded with N-ary arithmetic
     */
    function storeEncodedColumnBatches(uint256[][] memory _colBatches) external onlyAdmin {
        gs().encodedColumnBatches = _colBatches;
    }

    /**
     * Spawn a troop at a selected position, typically upon initialization of a player.
     * @param _pos position
     * @param _player player address
     * @param _troopTypeId identifier for desired troop type
     */
    function spawnTroop(
        Position memory _pos,
        address _player,
        uint256 _troopTypeId
    ) external onlyAdmin {
        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        Tile memory _tile = Util._getTileAt(_pos);
        require(_tile.occupantId == NULL, "CURIO: Tile occupied");

        if (_tile.baseId != NULL) {
            Base memory _base = gs().baseIdMap[_tile.baseId];
            require(_base.owner == _player, "CURIO: Can only spawn troop in player's base");
            require(Util._isLandTroop(_troopTypeId) || _base.name == BASE_NAME.PORT, "CURIO: Can only spawn water troops in ports");
        }

        (uint256 _troopId, Troop memory _troop) = Util._addTroop(_player, _pos, _troopTypeId);

        emit Util.NewTroop(_player, _troopId, _troop, _pos);
    }

    /**
     * Transfer a base at a selected position to a player, typically upon initialization.
     * @param _pos base position
     * @param _player player to give ownership to
     */
    function transferBaseOwnership(Position memory _pos, address _player) external onlyAdmin {
        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        Tile memory _tile = Util._getTileAt(_pos);
        require(_tile.baseId != NULL, "CURIO: No base found");
        require(_tile.occupantId == NULL, "CURIO: Tile occupied");

        Base memory _base = Util._getBase(_tile.baseId);
        require(_base.owner == NULL_ADDR, "CURIO: Base is owned");

        gs().baseIdMap[_tile.baseId].owner = _player;
        Util._updatePlayerBalances(_player);
        gs().playerMap[_player].numOwnedBases++;
        gs().playerMap[_player].totalGoldGenerationPerUpdate += _base.goldGenerationPerSecond;
        gs().playerMap[_player].totalOilGenerationPerUpdate += _base.oilGenerationPerSecond;

        emit Util.BaseCaptured(_player, NULL, _tile.baseId);
    }

    /**
     * Initialize all tiles from an array of positions.
     * @param _positions all positions
     */
    function bulkInitializeTiles(Position[] memory _positions) external onlyAdmin {
        for (uint256 i = 0; i < _positions.length; i++) {
            Util._initializeTile(_positions[i]);
        }
    }

    // ----------------------------------------------------------------------
    // STATE FUNCTIONS
    // ----------------------------------------------------------------------

    /**
     * Update player's balances to the latest state.
     * @param _player player address
     */
    function updatePlayerBalances(address _player) external {
        Util._updatePlayerBalances(_player);
    }

    /**
     * Restore 1 health to the troop in a base.
     * @param _pos position of base
     */
    function repair(Position memory _pos) external {
        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        Tile memory _tile = Util._getTileAt(_pos);
        require(_tile.baseId != NULL, "CURIO: No base found");
        require(Util._getBaseOwner(_tile.baseId) == msg.sender, "CURIO: Can only repair in own base");

        uint256 _troopId = _tile.occupantId;
        require(_troopId != NULL, "CURIO: No troop to repair");

        Troop memory _troop = gs().troopIdMap[_troopId];
        require(_troop.owner == msg.sender, "CURIO: Can only repair own troop");
        require(_troop.health < Util._getMaxHealth(_troop.troopTypeId), "CURIO: Troop already at full health");
        require((block.timestamp - _troop.lastRepaired) >= 1, "CURIO: Repaired too recently");

        _troop.health++;
        gs().troopIdMap[_troopId].health = _troop.health;
        gs().troopIdMap[_troopId].lastRepaired = block.timestamp;
        emit Util.Repaired(msg.sender, _tile.occupantId, _troop.health);
        if (_troop.health == Util._getMaxHealth(_troop.troopTypeId)) emit Util.Recovered(msg.sender, _troopId);
    }

    // ----------------------------------------------------------------------
    // ECS FUNCTIONS (temp)
    // ----------------------------------------------------------------------

    function registerComponents(address _gameAddr, string[28] memory _componentNameList) external onlyAdmin {
        for (uint256 i = 0; i < _componentNameList.length; i++) {
            gs().components[_componentNameList[i]] = address(new Component(_gameAddr));
        }
    }

    function addEntity() external onlyAdmin returns (uint256) {
        return Util.addEntity();
    }

    function addComponentEntityValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _value
    ) external onlyAdmin {
        Util.addComponentEntityValue(_componentName, _entity, _value);
    }

    function initializePlayerECS(Position memory _position, string memory _name) external returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();

        // Checkers
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._getPlayerCount() < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(gs().playerIdMap[msg.sender] == NULL, "CURIO: Player already initialized");
        require(Util._inBound(_position), "CURIO: Out of bound");
        if (!Util._getTileAt(_position).isInitializedECS) Util.initializeTileECS(_position);

        // Verify that a "base" (aka. an entity which can purchase) is present
        uint256[] memory _entitiesWithGivenPosition = Util.getComponent("Position").getEntitiesWithValue(abi.encode(_position));
        uint256[] memory _entitiesWithCanPurchase = Util.getComponent("CanPurchase").getEntitiesWithValue(abi.encode(true));
        _set1.addArray(_entitiesWithGivenPosition);
        _set2.addArray(_entitiesWithCanPurchase);
        uint256[] memory _intersection = Util.intersection(_set1, _set2);
        require(_intersection.length == 1, "CURIO: No base found");
        uint256 _baseId = _intersection[0];

        // Verify that base is not taken
        require(!Util.getComponent("Owner").has(_baseId), "CURIO: Base is taken");

        // Spawn player
        WorldConstants memory _worldConstants = gs().worldConstants;
        uint256 _playerId = Util.addEntity();
        Util.addComponentEntityValue("IsActive", _playerId, abi.encode(true));
        Util.addComponentEntityValue("Name", _playerId, abi.encode(_name));
        Util.addComponentEntityValue("Gold", _playerId, abi.encode(_worldConstants.initPlayerGoldBalance));
        Util.addComponentEntityValue("Oil", _playerId, abi.encode(_worldConstants.initPlayerOilBalance));
        Util.addComponentEntityValue("InitTimestamp", _playerId, abi.encode(block.timestamp));
        Util.addComponentEntityValue("BalanceLastUpdated", _playerId, abi.encode(block.timestamp));
        gs().players.push(msg.sender);
        gs().playerIdMap[msg.sender] = _playerId;

        // Transfer base ownership
        Util.getComponent("Owner").set(_baseId, abi.encode(_playerId));

        return _playerId;
    }
}
