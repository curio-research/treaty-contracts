//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameModules} from "contracts/libraries/GameModules.sol";
import {ComponentSpec, Position, TERRAIN, Tile, VALUE_TYPE, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Set} from "contracts/Set.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent} from "contracts/TypedComponents.sol";

/// @title Helper facet
/// @notice Contains admin functions and state functions, both of which should be out of scope for players

contract AdminFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;

    // TODO: Question: How to reuse functions from Util so that they can be directly called by external parties?

    // ----------------------------------------------------------------------
    // ADMIN FUNCTIONS
    // ----------------------------------------------------------------------

    modifier onlyAdmin() {
        require(msg.sender == gs().worldConstants.admin, "CURIO: Unauthorized");
        _;
    }

    /**
     * @dev Pause an ongoing game.
     */
    function pauseGame() external onlyAdmin {
        require(!gs().isPaused, "CURIO: Game is paused");

        address[] memory _allPlayers = gs().players;
        for (uint256 i = 0; i < _allPlayers.length; i++) {
            GameLib._updatePlayerBalances(gs().playerEntityMap[_allPlayers[i]]);
        }

        gs().isPaused = true;
        gs().lastPaused = block.timestamp;
        emit GameLib.GamePaused();
    }

    /**
     * @dev Resume a paused game.
     */
    function resumeGame() external onlyAdmin {
        require(gs().isPaused, "CURIO: Game is ongoing");

        address[] memory _allPlayers = gs().players;
        for (uint256 i = 0; i < _allPlayers.length; i++) {
            ECSLib._setUint("BalanceLastUpdated", gs().playerEntityMap[_allPlayers[i]], block.timestamp);
        }

        gs().isPaused = false;
        emit GameLib.GameResumed();
    }

    /**
     * @dev Reactivate an inactive player.
     * @param _player player address
     */
    function reactivatePlayer(address _player) external onlyAdmin {
        uint256 _playerEntity = gs().playerEntityMap[_player];
        require(gs().playerEntityMap[_player] != NULL, "CURIO: Player already initialized");
        require(!BoolComponent(gs().components["IsActive"]).has(_playerEntity), "CURIO: Player is active");

        ECSLib._setBool("IsActive", _playerEntity);
        ECSLib._setUint("Gold", _playerEntity, gs().worldConstants.initPlayerGoldBalance); // reset gold balance
    }

    /**
     * @dev Store an array of encoded raw map columns containing information of all tiles, for efficient storage.
     * @param _colBatches map columns in batches, encoded with N-ary arithmetic
     */
    function storeEncodedColumnBatches(uint256[][] memory _colBatches) external onlyAdmin {
        gs().encodedColumnBatches = _colBatches;
    }

    /**
     * @dev Spawn a troop at a selected position, typically upon initialization of a player.
     * @param _position position
     * @param _player player address
     * @param _troopTemplateEntity identifier for desired troop type
     * @return _troopEntity identifier for new troop
     */
    function spawnTroop(
        Position memory _position,
        address _player,
        uint256 _troopTemplateEntity
    ) external onlyAdmin returns (uint256) {
        require(GameLib._inBound(_position), "CURIO: Out of bound");
        if (!GameLib._getTileAt(_position).isInitialized) GameLib._initializeTile(_position);

        require(GameLib._getArmyAt(_position) == NULL, "CURIO: Tile occupied");

        uint256 _baseEntity = GameLib._getBaseAt(_position);
        if (_baseEntity != NULL) {
            // require(GameLib._getBaseOwner(_tile.baseId) == _player, "CURIO: Can only spawn troop in player's base");
            require(GameModules._geographicCheckTroop(_troopTemplateEntity, _position), "CURIO: Can only spawn water troops in ports");
        }

        uint256 _playerEntity = gs().playerEntityMap[_player];
        uint256 _armyEntity = GameLib._addArmy(_playerEntity, _position);
        return GameLib._addTroop(_playerEntity, _troopTemplateEntity, _armyEntity);
    }

    /**
     * @dev Transfer a base at a selected position to a player, typically upon initialization.
     * @param _position base position
     * @param _player player to give ownership to
     */
    function transferBaseOwnership(Position memory _position, address _player) external onlyAdmin {
        require(GameLib._inBound(_position), "CURIO: Out of bound");
        if (!GameLib._getTileAt(_position).isInitialized) GameLib._initializeTile(_position);

        require(GameLib._getArmyAt(_position) == NULL, "CURIO: Tile occupied");

        uint256 _baseEntity = GameLib._getBaseAt(_position);
        require(_baseEntity != NULL, "CURIO: No base found");

        require(ECSLib._getUint("OwnerEntity", _baseEntity) == NULL, "CURIO: Base is owned");

        uint256 _playerEntity = gs().playerEntityMap[_player];
        ECSLib._setUint("OwnerEntity", _baseEntity, _playerEntity);
        ECSLib._setUint("Health", _baseEntity, 800);

        GameLib._updatePlayerBalances(_playerEntity);

        // FIXME: experimenting with signed integers
        int256 _baseGoldPerSecond = ECSLib._getInt("GoldPerSecond", _baseEntity);
        int256 _baseOilPerSecond = ECSLib._getInt("OilPerSecond", _baseEntity);
        int256 _playerGoldPerSecond = ECSLib._getInt("GoldPerSecond", _playerEntity);
        int256 _playerOilPerSecond = ECSLib._getInt("OilPerSecond", _playerEntity);

        ECSLib._setInt("GoldPerSecond", _playerEntity, _playerGoldPerSecond + _baseGoldPerSecond);
        ECSLib._setInt("OilPerSecond", _playerEntity, _playerOilPerSecond + _baseOilPerSecond);
    }

    /**
     * @dev Initialize all tiles from an array of positions.
     * @param _positions all positions
     */
    function bulkInitializeTiles(Position[] memory _positions) external onlyAdmin {
        for (uint256 i = 0; i < _positions.length; i++) {
            GameLib._initializeTile(_positions[i]);
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
        GameLib._updatePlayerBalances(gs().playerEntityMap[_player]);
    }

    // ----------------------------------------------------------------------
    // ECS HELPERS
    // ----------------------------------------------------------------------

    function registerComponents(address _gameAddr, ComponentSpec[] memory _componentSpecs) external onlyAdmin {
        GameLib._registerComponents(_gameAddr, _componentSpecs);
    }

    function addEntity() external onlyAdmin returns (uint256) {
        return ECSLib._addEntity();
    }

    function setComponentValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _value
    ) external onlyAdmin {
        ECSLib._setComponentValue(_componentName, _entity, _value);
    }
}
