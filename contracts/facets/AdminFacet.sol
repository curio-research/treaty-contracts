//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/console.sol";
import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {BASE_NAME, Base, GameState, Player, Position, Production, TERRAIN, Tile, Troop, TroopType} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Setter facet
/// @notice Contains admin functions which initialize and set game states

contract AdminFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;

    modifier onlyAdmin() {
        if (msg.sender != gs().worldConstants.admin) revert("CURIO: Unauthorized");
        _;
    }

    function storeEncodedRawMapCols(uint256[] memory _cols) external onlyAdmin {
        gs().encodedRawMapCols = _cols;
    }

    /**
     * Initialize a player at a selected position.
     * TODO: Upgrade logic such that everyone can initialize themselves. figure out if we want a whitelist or something
     * @param _pos position to initialize
     * @param _player player address
     */
    function initializePlayer(Position memory _pos, address _player) external {
        if (!Util._inBound(_pos)) revert("Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        uint256 _baseId = Util._getTileAt(_pos).baseId;
        if (Util._getBaseOwner(_baseId) != address(0)) revert("CURIO: Base is taken");
        if (gs().playerMap[_player].active) revert("CURIO: Player already initialized");

        gs().players.push(_player);
        gs().playerMap[_player] = Player({initEpoch: gs().epoch, active: true});
        gs().baseIdMap[_baseId].owner = _player;

        emit Util.NewPlayer(_player, _pos);
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
        if (!Util._inBound(_pos)) revert("Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        Tile memory _tile = Util._getTileAt(_pos);
        if (_tile.occupantId != NULL) revert("CURIO: Tile occupied");

        if (_tile.baseId != NULL) {
            Base memory _base = gs().baseIdMap[_tile.baseId];
            if (_base.owner != _player && _base.owner != address(0)) revert("CURIO: Can only spawn troop in player's base"); // FIXME: the address(0) part is a bit of privilege
            if (!Util._isLandTroop(_troopTypeId) && _base.name != BASE_NAME.PORT) revert("CURIO: Can only spawn water troops in ports");
        }

        (uint256 _troopId, Troop memory _troop) = Util._addTroop(_pos, _troopTypeId, _player);

        emit Util.NewTroop(_player, _troopId, _troop, _pos);
    }

    /**
     * Transfer a base at a selected position to a player, typically upon initialization.
     * @param _pos base position
     * @param _player player to give ownership to
     */
    function transferBaseOwnership(Position memory _pos, address _player) external onlyAdmin {
        if (!Util._inBound(_pos)) revert("CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        Tile memory _tile = Util._getTileAt(_pos);
        if (_tile.baseId == NULL) revert("CURIO: No base found");
        if (_tile.occupantId != NULL) revert("CURIO: Tile occupied");

        Base memory _base = Util._getBase(_tile.baseId);
        if (_base.owner == _player) revert("CURIO: Base already belongs to player");

        gs().baseIdMap[_tile.baseId].owner = _player;
        emit Util.BaseCaptured(_player, NULL, _tile.baseId);
    }
}
