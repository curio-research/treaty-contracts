//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {BASE_NAME, Base, GameState, Player, Position, Production, TERRAIN, Tile, Troop, TroopType} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

error Unauthorized();

/// @title Init facet
/// @notice Contains initialization logic such as initializePlayer and spawnTroop

contract InitFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;

    modifier onlyAdmin() {
        // require(msg.sender == gs().worldConstants.admin, "Only admin can perform this action");
        if (msg.sender != gs().worldConstants.admin) revert Unauthorized();
        _;
    }

    // ----------------------------------------------------------------------
    // ADMIN FUNCTIONS
    // ----------------------------------------------------------------------

    /**
     * Set an NxN chunk of the tile map.
     * @param _startPos top-left position of chunk
     * @param _chunk a 2d, NxN chunk
     */
    function setMapChunk(Position memory _startPos, uint256[][] memory _chunk) external onlyAdmin {
        for (uint256 _dx = 0; _dx < _chunk.length; _dx++) {
            for (uint256 _dy = 0; _dy < _chunk[0].length; _dy++) {
                Position memory _pos = Position({x: _startPos.x + _dx, y: _startPos.y + _dy});
                uint256 _terrainId = _chunk[_dx][_dy];

                if (_terrainId >= 3) {
                    // Note: temporary way to set base
                    BASE_NAME _baseName = _terrainId == 3 ? BASE_NAME.PORT : BASE_NAME.CITY;
                    Util._addBase(_pos, _baseName);
                    _terrainId -= 3;
                }

                gs().map[_pos.x][_pos.y].terrain = TERRAIN(_terrainId);
            }
        }
    }

    /**
     * Initialize a player at a selected position.
     * @param _pos position to initialize
     * @param _player player address
     */
    function initializePlayer(Position memory _pos, address _player) external onlyAdmin {
        uint256 _baseId = Util._getTileAt(_pos).baseId;

        if (Util._getBaseOwner(_baseId) != address(0)) revert("Base is taken");
        if (gs().playerMap[_player].active) revert("Player already initialized");

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
        Tile memory _tile = Util._getTileAt(_pos);
        if (_tile.occupantId != NULL) revert("Tile occupied");

        if (_tile.baseId != NULL) {
            Base memory _base = gs().baseIdMap[_tile.baseId];
            if (_base.owner != _player && _base.owner != address(0)) revert("Can only spawn troop in player's base"); // FIXME: the address(0) part is a bit of privilege
            if (!Util._isLandTroop(_troopTypeId) && _base.name != BASE_NAME.PORT) revert("Can only spawn water troops in ports");
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
        Tile memory _tile = Util._getTileAt(_pos);
        if (_tile.baseId == NULL) revert("No base found");
        if (_tile.occupantId != NULL) revert("Tile occupied");

        Base memory _base = Util._getBase(_tile.baseId);
        if (_base.owner == _player) revert("Base already belongs to player");

        gs().baseIdMap[_tile.baseId].owner = _player;
    }
}
