//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {ComponentSpec, Position, TERRAIN, Tile, VALUE_TYPE, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Set} from "contracts/Set.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent} from "contracts/TypedComponents.sol";

/// @title Admin facet
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

        // address[] memory _allPlayers = gs().players;
        // for (uint256 i = 0; i < _allPlayers.length; i++) {
        //     GameLib._updatePlayerBalances(gs().playerEntityMap[_allPlayers[i]]);
        // }

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
     * @param _address player address
     */
    function reactivatePlayer(address _address) external onlyAdmin {
        uint256 _player = gs().playerEntityMap[_address];
        require(_player != NULL, "CURIO: Player already initialized");
        require(!BoolComponent(gs().components["IsActive"]).has(_player), "CURIO: Player is active");

        ECSLib._setBool("IsActive", _player);
    }

    /**
     * @dev Store an array of encoded raw map columns containing information of all tiles, for efficient storage.
     * @param _colBatches map columns in batches, encoded with N-ary arithmetic
     */
    function storeEncodedColumnBatches(uint256[][] memory _colBatches) external onlyAdmin {
        gs().encodedColumnBatches = _colBatches;
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

    // /**
    //  * Update player's balances to the latest state.
    //  * @param _player player address
    //  */
    // function updatePlayerBalances(address _player) external {
    //     GameLib._updatePlayerBalances(gs().playerEntityMap[_player]);
    // }

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
