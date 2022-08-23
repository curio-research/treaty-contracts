//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {Position, TERRAIN, Tile, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/Component.sol";
import {Set} from "contracts/Set.sol";
import {EngineModules} from "contracts/libraries/EngineModules.sol";

/// @title Helper facet
/// @notice Contains admin functions and state functions, both of which should be out of scope for players

contract HelperFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;

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
            Util._updatePlayerBalances(_allPlayers[i]);
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

        for (uint256 i = 0; i < gs().players.length; i++) {
            gs().playerMap[gs().players[i]].balanceLastUpdated = block.timestamp;
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
        require(!Util._isPlayerInitialized(_player), "CURIO: Player already initialized");
        require(!Util._isPlayerActive(_playerId), "CURIO: Player is active");

        Util._setComponentValue("IsActive", _playerId, abi.encode(true));
        Util._setComponentValue("Gold", _playerId, abi.encode(gs().worldConstants.initPlayerGoldBalance)); // reset gold balance
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
            require(EngineModules._geographicCheckTroopECS(_troopTemplateId, _position), "CURIO: Can only spawn water troops in ports");
        }

        uint256 _playerId = gs().playerIdMap[_player];
        uint256 _armyId = Util._addArmy(_playerId, _position, Util._getComponent("CanCapture").has(_troopTemplateId));
        return Util._addTroop(_playerId, _troopTemplateId, _armyId);
    }

    /**
     * @dev Transfer a base at a selected position to a player, typically upon initialization.
     * @param _position base position
     * @param _player player to give ownership to
     */
    function transferBaseOwnership(Position memory _position, address _player) external onlyAdmin {
        require(Util._inBound(_position), "CURIO: Out of bound");
        if (!Util._getTileAt(_position).isInitialized) Util._initializeTile(_pos);

        require(Util._getArmyAt(_position) == NULL, "CURIO: Tile occupied");

        uint256 _baseId = Util._getBaseAt(_position);
        require(_baseId != NULL, "CURIO: No base found");

        require(abi.decode(_getComponent("Owner").getRawValue(_baseId), (unit256)) == NULL, "CURIO: Base is owned");

        uint256 _playerId = gs().playerIdMap[_player];
        Util._setComponentValue("Owner", _baseId, abi.encode(_playerId));
        Util._setComponentValue("Health", _baseId, abi.encode(800));

        Util._updatePlayerBalances(_player);

        // FIXME: experimenting with signed integers, need to change for everything else
        int256 _baseGoldPerSecond = abi.decode(Util._getComponent("GoldPerSecond").getRawValue(_baseId), (int256));
        int256 _baseOilPerSecond = abi.decode(Util._getComponent("OilPerSecond").getRawValue(_baseId), (int256));
        int256 _playerGoldPerSecond = abi.decode(Util._getComponent("GoldPerSecond").getRawValue(_playerId), (int256));
        int256 _playerOilPerSecond = abi.decode(Util._getComponent("OilPerSecond").getRawValue(_playerId), (int256));

        Util._setComponentValue("GoldPerSecond", _playerId, _playerGoldPerSecond + _baseGoldPerSecond);
        Util._setComponentValue("OilPerSecond", _playerId, _playerOilPerSecond + _baseOilPerSecond);
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
        Util._updatePlayerBalances(_player);
    }

    // ----------------------------------------------------------------------
    // ECS HELPERS (temp)
    // ----------------------------------------------------------------------

    function registerComponents(address _gameAddr, string[28] memory _componentNames) external onlyAdmin {
        gs().componentNames = _componentNames;

        for (uint256 i = 0; i < _componentNames.length; i++) {
            string memory _componentName = _componentNames[i];
            address _componentAddr = address(new Component(_gameAddr));
            gs().components[_componentName] = _componentAddr;
            gs().idComponentMap[i + 1] = _componentAddr; // component ID starts with 1

            emit Util.NewComponent(_componentName, i + 1);
        }
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
