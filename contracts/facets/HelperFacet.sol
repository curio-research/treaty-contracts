//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/console.sol";
import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {BASE_NAME, Base, GameState, Player, Position, Production, TERRAIN, Tile, Troop, TroopType} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Helper facet
/// @notice Contains admin functions and state functions, both should be out of scope for players

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

    function storeEncodedColumnBatches(uint256[][] memory _colBatches) external onlyAdmin {
        gs().encodedColumnBatches = _colBatches;
    }

    /**
     * Initialize a player at a selected position.
     * TODO: Upgrade logic such that everyone can initialize themselves. figure out if we want a whitelist or something
     * @param _pos position to initialize
     * @param _player player address
     */
    function initializePlayer(Position memory _pos, address _player) external {
        console.log("where did it fail?");
        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        uint256 _baseId = Util._getTileAt(_pos).baseId;
        require(Util._getBaseOwner(_baseId) == NULL_ADDR, "CURIO: Base is taken");
        require(!gs().playerMap[_player].active, "CURIO: Player already initialized");

        gs().players.push(_player);
        gs().playerMap[_player] = Player({initTimestamp: block.timestamp, active: true});
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
        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        Tile memory _tile = Util._getTileAt(_pos);
        require(_tile.occupantId == NULL, "CURIO: Tile occupied");

        if (_tile.baseId != NULL) {
            Base memory _base = gs().baseIdMap[_tile.baseId];
            require(_base.owner == _player || _base.owner == NULL_ADDR, "CURIO: Can only spawn troop in player's base"); // FIXME: the NULL_ADDR part is a bit of privilege
            require(Util._isLandTroop(_troopTypeId) || _base.name == BASE_NAME.PORT, "CURIO: Can only spawn water troops in ports");
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
        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        Tile memory _tile = Util._getTileAt(_pos);
        require(_tile.baseId != NULL, "CURIO: No base found");
        require(_tile.occupantId == NULL, "CURIO: Tile occupied");

        Base memory _base = Util._getBase(_tile.baseId);
        require(_base.owner != _player, "CURIO: Base already belongs to player");

        gs().baseIdMap[_tile.baseId].owner = _player;
        emit Util.BaseCaptured(_player, NULL, _tile.baseId);
    }

    // ----------------------------------------------------------------------
    // STATE FUNCTIONS
    // ----------------------------------------------------------------------

    /**
     * Finish producing a troop from a base.
     * @param _pos position of base
     */
    function endProduction(Position memory _pos) external {
        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        // Currently implemented expecting real-time calls from client; can change to lazy if needed
        Tile memory _tile = Util._getTileAt(_pos);
        require(_tile.baseId != NULL, "CURIO: No base found");
        require(Util._getBaseOwner(_tile.baseId) == msg.sender, "CURIO: Can only produce in own base");
        require(_tile.occupantId == NULL, "CURIO: Base occupied by another troop");

        Production memory _production = gs().baseProductionMap[_tile.baseId];
        require(_production.troopTypeId != NULL, "CURIO: No production found in base");
        require(Util._getProductionCooldown(_production.troopTypeId) <= (block.timestamp - _production.startTimestamp), "CURIO: Troop needs more time for production");

        (uint256 _troopId, Troop memory _troop) = Util._addTroop(_pos, _production.troopTypeId, msg.sender);
        delete gs().baseProductionMap[_tile.baseId];

        emit Util.ProductionEnded(msg.sender, _tile.baseId);
        emit Util.NewTroop(msg.sender, _troopId, _troop, _pos);
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

    function bulkInitializeTiles(Position[] memory _positions) external onlyAdmin {
        for (uint256 i = 0; i < _positions.length; i++) {
            Util._initializeTile(_positions[i]);
        }
    }
}
