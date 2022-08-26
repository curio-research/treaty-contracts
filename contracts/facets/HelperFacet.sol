//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {EngineModules} from "contracts/libraries/EngineModules.sol";
import {ComponentSpec, Position, TERRAIN, Tile, VALUE_TYPE, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Set} from "contracts/Set.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent} from "contracts/TypedComponents.sol";

/// @title Helper facet
/// @notice Contains admin functions and state functions, both of which should be out of scope for players

contract HelperFacet is UseStorage {
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
            Util._updatePlayerBalances(gs().playerIdMap[_allPlayers[i]]);
        }

        gs().isPaused = true;
        gs().lastPaused = block.timestamp;
        emit Util.GamePaused();
    }

    /**
     * @dev Resume a paused game.
     */
    function resumeGame() external onlyAdmin {
        require(gs().isPaused, "CURIO: Game is ongoing");

        address[] memory _allPlayers = gs().players;
        for (uint256 i = 0; i < _allPlayers.length; i++) {
            Util._setUint("BalanceLastUpdated", gs().playerIdMap[_allPlayers[i]], block.timestamp);
        }

        gs().isPaused = false;
        emit Util.GameResumed();
    }

    /**
     * @dev Reactivate an inactive player.
     * @param _player player address
     */
    function reactivatePlayer(address _player) external onlyAdmin {
        uint256 _playerId = gs().playerIdMap[_player];
        require(gs().playerIdMap[_player] != NULL, "CURIO: Player already initialized");
        require(!BoolComponent(gs().components["IsActive"]).has(_playerId), "CURIO: Player is active");

        Util._setBool("IsActive", _playerId);
        Util._setUint("Gold", _playerId, gs().worldConstants.initPlayerGoldBalance); // reset gold balance
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
     * @param _troopTemplateId identifier for desired troop type
     * @return _troopId identifier for new troop
     */
    function spawnTroop(
        Position memory _position,
        address _player,
        uint256 _troopTemplateId
    ) external onlyAdmin returns (uint256) {
        require(Util._inBound(_position), "CURIO: Out of bound");
        if (!Util._getTileAt(_position).isInitialized) Util._initializeTile(_position);

        require(Util._getArmyAt(_position) == NULL, "CURIO: Tile occupied");

        uint256 _baseId = Util._getBaseAt(_position);
        if (_baseId != NULL) {
            // require(Util._getBaseOwner(_tile.baseId) == _player, "CURIO: Can only spawn troop in player's base");
            require(EngineModules._geographicCheckTroop(_troopTemplateId, _position), "CURIO: Can only spawn water troops in ports");
        }

        uint256 _playerId = gs().playerIdMap[_player];
        uint256 _armyId = Util._addArmy(_playerId, _position);
        return Util._addTroop(_playerId, _troopTemplateId, _armyId);
    }

    /**
     * @dev Transfer a base at a selected position to a player, typically upon initialization.
     * @param _position base position
     * @param _player player to give ownership to
     */
    function transferBaseOwnership(Position memory _position, address _player) external onlyAdmin {
        require(Util._inBound(_position), "CURIO: Out of bound");
        if (!Util._getTileAt(_position).isInitialized) Util._initializeTile(_position);

        require(Util._getArmyAt(_position) == NULL, "CURIO: Tile occupied");

        uint256 _baseId = Util._getBaseAt(_position);
        require(_baseId != NULL, "CURIO: No base found");

        require(Util._getUint("Owner", _baseId) == NULL, "CURIO: Base is owned");

        uint256 _playerId = gs().playerIdMap[_player];
        Util._setUint("Owner", _baseId, _playerId);
        Util._setUint("Health", _baseId, 800);

        Util._updatePlayerBalances(_playerId);

        // FIXME: experimenting with signed integers
        int256 _baseGoldPerSecond = Util._getInt("GoldPerSecond", _baseId);
        int256 _baseOilPerSecond = Util._getInt("OilPerSecond", _baseId);
        int256 _playerGoldPerSecond = Util._getInt("GoldPerSecond", _playerId);
        int256 _playerOilPerSecond = Util._getInt("OilPerSecond", _playerId);

        Util._setInt("GoldPerSecond", _playerId, _playerGoldPerSecond + _baseGoldPerSecond);
        Util._setInt("OilPerSecond", _playerId, _playerOilPerSecond + _baseOilPerSecond);
    }

    /**
     * @dev Initialize all tiles from an array of positions.
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
        Util._updatePlayerBalances(gs().playerIdMap[_player]);
    }

    // ----------------------------------------------------------------------
    // ECS HELPERS
    // ----------------------------------------------------------------------

    function registerComponents(address _gameAddr, ComponentSpec[] memory _componentSpecs) external onlyAdmin {
        Util._registerComponents(_gameAddr, _componentSpecs);
    }

    function registerDefaultComponents(address _gameAddr) external onlyAdmin {
        ComponentSpec[] memory _componentSpecs = new ComponentSpec[](30);

        // General system
        _componentSpecs[0] = (ComponentSpec({name: "IsComponent", valueType: VALUE_TYPE.BOOL})); // this must be the first (or zero-th, however you name it) component!
        _componentSpecs[1] = (ComponentSpec({name: "InitTimestamp", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[2] = (ComponentSpec({name: "IsActive", valueType: VALUE_TYPE.BOOL}));
        _componentSpecs[3] = (ComponentSpec({name: "Position", valueType: VALUE_TYPE.POSITION}));
        _componentSpecs[4] = (ComponentSpec({name: "Owner", valueType: VALUE_TYPE.UINT}));

        // Identifier system
        _componentSpecs[5] = (ComponentSpec({name: "Name", valueType: VALUE_TYPE.STRING}));
        _componentSpecs[6] = (ComponentSpec({name: "Identifier", valueType: VALUE_TYPE.STRING})); // most direct tag for frontend
        _componentSpecs[7] = (ComponentSpec({name: "CanMove", valueType: VALUE_TYPE.BOOL}));
        _componentSpecs[8] = (ComponentSpec({name: "CanAttack", valueType: VALUE_TYPE.BOOL}));
        _componentSpecs[9] = (ComponentSpec({name: "CanCapture", valueType: VALUE_TYPE.BOOL}));
        _componentSpecs[10] = (ComponentSpec({name: "CanPurchase", valueType: VALUE_TYPE.BOOL}));

        // Resource system
        _componentSpecs[11] = (ComponentSpec({name: "Gold", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[12] = (ComponentSpec({name: "GoldPerSecond", valueType: VALUE_TYPE.INT}));
        _componentSpecs[13] = (ComponentSpec({name: "Oil", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[14] = (ComponentSpec({name: "OilPerSecond", valueType: VALUE_TYPE.INT}));
        _componentSpecs[15] = (ComponentSpec({name: "BalanceLastUpdated", valueType: VALUE_TYPE.UINT}));

        // Battle system
        _componentSpecs[16] = (ComponentSpec({name: "Health", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[17] = (ComponentSpec({name: "LastMoved", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[18] = (ComponentSpec({name: "LastLargeActionTaken", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[19] = (ComponentSpec({name: "LastRepaired", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[20] = (ComponentSpec({name: "IsLandTroop", valueType: VALUE_TYPE.BOOL}));
        _componentSpecs[21] = (ComponentSpec({name: "MaxHealth", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[22] = (ComponentSpec({name: "DamagePerHit", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[23] = (ComponentSpec({name: "AttackFactor", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[24] = (ComponentSpec({name: "DefenseFactor", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[25] = (ComponentSpec({name: "MovementCooldown", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[26] = (ComponentSpec({name: "LargeActionCooldown", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[27] = (ComponentSpec({name: "ArmyId", valueType: VALUE_TYPE.UINT}));
        _componentSpecs[28] = (ComponentSpec({name: "IsDebuffed", valueType: VALUE_TYPE.BOOL}));
        _componentSpecs[29] = (ComponentSpec({name: "IsArmy", valueType: VALUE_TYPE.BOOL}));

        Util._registerComponents(_gameAddr, _componentSpecs);
    }

    function addEntity() external onlyAdmin returns (uint256) {
        return Util._addEntity();
    }

    function setComponentValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _value
    ) external onlyAdmin {
        Util._setComponentValue(_componentName, _entity, _value);
    }
}
