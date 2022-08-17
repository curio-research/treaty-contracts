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
            // require(Util._getBaseOwner(_tile.baseId) == _player, "CURIO: Can only spawn troop in player's base");
            require(EngineModules._geographicCheckTroop(_troopTypeId, _tile), "CURIO: Can only spawn water troops in ports");
        }

        Util._addTroop(_player, _pos, _troopTypeId);
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
        gs().baseIdMap[_tile.baseId].health = 800;

        Util._updatePlayerBalances(_player);
        gs().playerMap[_player].numOwnedBases++;
        gs().playerMap[_player].totalGoldGenerationPerUpdate += _base.goldGenerationPerSecond;
        gs().playerMap[_player].totalOilGenerationPerUpdate += _base.oilGenerationPerSecond;
    }

    /**
     * Initialize all tiles from an array of positions.
     * @param _positions all positions
     */
    function bulkInitializeTilesECS(Position[] memory _positions) external onlyAdmin {
        for (uint256 i = 0; i < _positions.length; i++) {
            Util._initializeTileECS(_positions[i]);
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
