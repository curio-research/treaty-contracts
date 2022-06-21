//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {BASE_NAME, Base, GameState, Player, Position, Production, TERRAIN, Tile, Troop, TroopType} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Engine facet
/// @notice Contains main game logic like movement and battling

contract EngineFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;

    /*
    TODO:
    - Map upload speed
    - Endgame and objectives
    */

    modifier onlyAdmin() {
        // require(msg.sender == gs().worldConstants.admin, "Only admin can perform this action");
        if (msg.sender != gs().worldConstants.admin) revert("Unauthorized");
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
    function initializePlayer(Position memory _pos, address _player) external {
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
        emit Util.BaseCaptured(_player, NULL, _tile.baseId);
    }

    // ----------------------------------------------------------------------
    // PLAYER FUNCTIONS
    // ----------------------------------------------------------------------

    /**
     * Move a troop to a target position.
     * @param _troopId identifier for troop
     * @param _targetPos target position
     */
    function move(uint256 _troopId, Position memory _targetPos) external {
        if (!Util._inBound(_targetPos)) revert("Target out of bound");

        Troop memory _troop = gs().troopIdMap[_troopId];
        if (_troop.owner != msg.sender) revert("Can only move own troop");
        if (Util._samePos(_troop.pos, _targetPos)) revert("Already at destination");
        if (!Util._withinDist(_troop.pos, _targetPos, 1)) revert("Destination too far");

        uint256 _movesLeftInEpoch = _troop.movesLeftInEpoch;
        uint256 _epoch = gs().epoch;
        if ((_epoch - _troop.lastMoved) >= Util._getMovementCooldown(_troop.troopTypeId)) {
            // Lazy update for moves left in epoch
            _movesLeftInEpoch = Util._getMovesPerEpoch(_troop.troopTypeId);
            gs().troopIdMap[_troopId].movesLeftInEpoch = _movesLeftInEpoch;
        }
        if (_movesLeftInEpoch == 0) revert("No moves left this epoch");

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        if (Util._isLandTroop(_troop.troopTypeId) && !Util._hasTroopTransport(_targetTile)) {
            if (_targetTile.terrain == TERRAIN.WATER) revert("Cannot move on water");
        } else {
            if (_targetTile.terrain != TERRAIN.WATER && !Util._hasPort(_targetTile)) revert("Cannot move on land");
        }

        if (_targetTile.baseId != NULL && Util._getBaseOwner(_targetTile.baseId) != msg.sender) revert("Cannot move onto opponent base");
        if (_targetTile.occupantId != NULL) {
            if (!Util._hasTroopTransport(_targetTile) || !Util._isLandTroop(_troop.troopTypeId)) revert("Destination tile occupied");
            if (Util._getTroop(_targetTile.occupantId).owner != msg.sender) revert("Cannot move onto opponent troop transport");

            // Load troop onto Troop Transport at target tile
            gs().troopIdMap[_targetTile.occupantId].cargoTroopIds.push(_troopId);
        } else {
            gs().map[_targetPos.x][_targetPos.y].occupantId = _troopId;
        }

        // Move
        gs().map[_troop.pos.x][_troop.pos.y].occupantId = NULL;
        gs().troopIdMap[_troopId].pos = _targetPos;
        gs().troopIdMap[_troopId].movesLeftInEpoch--;
        gs().troopIdMap[_troopId].lastMoved = _epoch;

        uint256[] memory _cargoTroopIds = gs().troopIdMap[_troopId].cargoTroopIds;
        if (_cargoTroopIds.length > 0) {
            // Troop is a Troop Transport — move its cargo troops
            for (uint256 i = 0; i < _cargoTroopIds.length; i++) {
                gs().troopIdMap[_cargoTroopIds[i]].pos = _targetPos;
            }
        }

        emit Util.Moved(msg.sender, _troopId, _epoch, _troop.pos, _targetPos);
    }

    /**
     * Battle a troop with an opponent base or troop at a target position.
     * @param _troopId identifier for troop
     * @param _targetPos target position
     */
    function battle(uint256 _troopId, Position memory _targetPos) external {
        if (!Util._inBound(_targetPos)) revert("Target out of bound");

        Troop memory _troop = gs().troopIdMap[_troopId];
        if (_troop.owner != msg.sender) revert("Can only battle using own troop");
        if (Util._samePos(_troop.pos, _targetPos)) revert("Already at destination");
        if (!Util._withinDist(_troop.pos, _targetPos, 1)) revert("Destination too far");

        if ((gs().epoch - _troop.lastAttacked) < Util._getAttackCooldown(_troop.troopTypeId)) revert("Attacked too recently");

        gs().troopIdMap[_troopId].lastAttacked = gs().epoch;

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        bool _targetIsBase;
        uint256 _targetAttackFactor;
        uint256 _targetDefenseFactor;
        uint256 _targetDamagePerHit;
        uint256 _targetHealth;
        Troop memory _targetTroop;
        Base memory _targetBase;

        if (_targetTile.occupantId != NULL) {
            // Note: If an opponent base has a troop, currently our troop battles the troop not the base. Can change later
            _targetTroop = gs().troopIdMap[_targetTile.occupantId];
            if (_targetTroop.owner == msg.sender) revert("Cannot attack own troop");

            _targetIsBase = false;
            _targetAttackFactor = Util._getAttackFactor(_targetTroop.troopTypeId);
            _targetDefenseFactor = Util._getDefenseFactor(_targetTroop.troopTypeId);
            _targetDamagePerHit = Util._getDamagePerHit(_targetTroop.troopTypeId);
            _targetHealth = _targetTroop.health;
        } else {
            if (_targetTile.baseId == NULL) revert("No target to attack");

            _targetBase = gs().baseIdMap[_targetTile.baseId];
            if (_targetBase.owner == msg.sender) revert("Cannot attack own base");

            _targetIsBase = true;
            _targetAttackFactor = _targetBase.attackFactor;
            _targetDefenseFactor = _targetBase.defenseFactor;
            _targetDamagePerHit = 0;
            _targetHealth = _targetBase.health;
        }

        gs().troopIdMap[_troopId].lastAttacked = gs().epoch;

        // Loop till one side dies
        uint256 _salt = 0;
        while (Util._getTroop(_troopId).health > 0 && Util._getTroop(_targetTile.occupantId).health > 0) {
            // Troop attacks target
            _salt += 1;
            if (Util._strike(_targetAttackFactor, _salt)) {
                uint256 _damagePerHit = Util._getDamagePerHit(_troop.troopTypeId);
                if (_damagePerHit < _targetHealth) {
                    _targetHealth -= _damagePerHit;
                } else {
                    _targetHealth = 0;
                    if (!_targetIsBase) {
                        Util._removeTroop(_targetPos, _targetTile.occupantId);
                        emit Util.Death(Util._getBaseOwner(_targetTile.occupantId), _targetTile.occupantId);
                    }
                }
            }

            if (_targetHealth == 0) break; // target cannot attack back if it has zero health

            // Target attacks troop
            _salt += 1;
            if (Util._strike(_targetDefenseFactor, _salt)) {
                // enemy troop attacks back
                if (_targetDamagePerHit < _troop.health) {
                    _troop.health -= _targetDamagePerHit;
                } else {
                    Util._removeTroop(_troop.pos, _troopId);
                    emit Util.Death(msg.sender, _troopId);
                }
            }
        }

        if (Util._getTroop(_troopId).owner == msg.sender) {
            // Troop survives
            gs().troopIdMap[_troopId].health = _troop.health;
            _troop = Util._getTroop(_troopId);

            if (_targetIsBase) {
                gs().baseIdMap[_targetTile.baseId].health = 0;
                _targetBase = Util._getBase(_targetTile.baseId);
                emit Util.AttackedBase(msg.sender, _troopId, _troop, _targetTile.baseId, _targetBase);
            } else {
                _targetTroop = Util._getTroop(_targetTile.occupantId);
                emit Util.AttackedTroop(msg.sender, _troopId, _troop, _targetTile.occupantId, _targetTroop);
            }
        } else {
            _troop = Util._getTroop(_troopId);

            // Target survives
            if (_targetIsBase) {
                gs().baseIdMap[_targetTile.baseId].health = _targetHealth;
                _targetBase = Util._getBase(_targetTile.baseId);
                emit Util.AttackedBase(msg.sender, _troopId, _troop, _targetTile.baseId, _targetBase);
            } else {
                gs().troopIdMap[_targetTile.occupantId].health = _targetHealth;
                _targetTroop = Util._getTroop(_targetTile.occupantId);
                emit Util.AttackedTroop(msg.sender, _troopId, _troop, _targetTile.occupantId, _targetTroop);
            }
        }
    }

    /**
     * Capture an opponent base using a land troop.
     * @param _troopId identifier for troop
     * @param _targetPos target position
     */
    function captureBase(uint256 _troopId, Position memory _targetPos) external {
        if (!Util._inBound(_targetPos)) revert("Target out of bound");

        Troop memory _troop = gs().troopIdMap[_troopId];
        if (_troop.owner != msg.sender) revert("Can only capture with own troop");
        if (!Util._withinDist(_troop.pos, _targetPos, 1)) revert("Destination too far");
        if (!Util._isLandTroop(_troop.troopTypeId)) revert("Only a land troop can capture bases");

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        if (_targetTile.baseId == NULL) revert("No base to capture");
        if (Util._getBaseOwner(_targetTile.baseId) == msg.sender) revert("Base already owned");
        if (_targetTile.occupantId != NULL) revert("Destination tile occupied");
        if (Util._getBaseHealth(_targetTile.baseId) > 0) revert("Need to attack first");

        // Move, capture, end production
        gs().map[_troop.pos.x][_troop.pos.y].occupantId = NULL;
        gs().troopIdMap[_troopId].pos = _targetPos;
        gs().baseIdMap[_targetTile.baseId].owner = msg.sender;
        gs().baseIdMap[_targetTile.baseId].health = 1; // FIXME: change to BaseConstants.maxHealth
        delete gs().baseProductionMap[_targetTile.baseId];

        emit Util.BaseCaptured(msg.sender, _troopId, _targetTile.baseId);
    }

    /**
     * Start producing a troop from a base.
     * @param _pos position of base
     * @param _troopTypeId identifier for selected troop type
     */
    function startProduction(Position memory _pos, uint256 _troopTypeId) external {
        Tile memory _tile = Util._getTileAt(_pos);
        if (_tile.baseId == NULL) revert("No base found");
        if (Util._getBaseOwner(_tile.baseId) != msg.sender) revert("Can only produce in own base");
        if (!Util._isLandTroop(_troopTypeId) && !Util._hasPort(_tile)) revert("Only ports can produce water troops");
        if (gs().baseProductionMap[_tile.baseId].troopTypeId != NULL) revert("Base already producing");

        Production memory _production = Production({troopTypeId: _troopTypeId, startEpoch: gs().epoch});
        gs().baseProductionMap[_tile.baseId] = _production;
        emit Util.ProductionStarted(msg.sender, _tile.baseId, _production);
    }

    // ----------------------------------------------------------------------
    // STATE FUNCTIONS
    // ----------------------------------------------------------------------

    /**
     * Update epoch given enough time has elapsed.
     */
    function updateEpoch() external {
        // Currently implemented expecting real-time calls from client; can change to lazy if needed
        // if ((block.timestamp - gs().lastTimestamp) < gs().worldConstants.secondsPerEpoch) revert("Not enough time has elapsed since last epoch");

        gs().epoch++;
        gs().lastTimestamp = block.timestamp;

        emit Util.EpochUpdate(gs().epoch, gs().lastTimestamp);
    }

    /**
     * Finish producing a troop from a base.
     * @param _pos position of base
     */
    function endProduction(Position memory _pos) external {
        // Currently implemented expecting real-time calls from client; can change to lazy if needed
        Tile memory _tile = Util._getTileAt(_pos);
        if (_tile.baseId == NULL) revert("No base found");
        if (Util._getBaseOwner(_tile.baseId) != msg.sender) revert("Can only produce in own base");
        if (_tile.occupantId != NULL) revert("Base occupied by another troop");

        Production memory _production = gs().baseProductionMap[_tile.baseId];
        if (_production.troopTypeId == NULL) revert("No production found in base");
        if (Util._getEpochsToProduce(_production.troopTypeId) > (gs().epoch - _production.startEpoch)) revert("Troop needs more epochs for production");

        (uint256 _troopId, Troop memory _troop) = Util._addTroop(_pos, _production.troopTypeId, msg.sender);
        delete gs().baseProductionMap[_tile.baseId];
        emit Util.NewTroop(msg.sender, _troopId, _troop, _pos);
    }

    /**
     * Restore 1 health to the troop in a base.
     * @param _pos position of base
     */
    function repair(Position memory _pos) external {
        Tile memory _tile = Util._getTileAt(_pos);
        if (_tile.baseId == NULL) revert("No base found");
        if (Util._getBaseOwner(_tile.baseId) != msg.sender) revert("Can only repair in own base");

        uint256 _troopId = _tile.occupantId;
        if (_troopId == NULL) revert("No troop to repair");

        Troop memory _troop = gs().troopIdMap[_troopId];
        if (_troop.owner != msg.sender) revert("Can only repair own troop");
        if (_troop.health >= Util._getMaxHealth(_troop.troopTypeId)) revert("Troop already at full health");
        if ((gs().epoch - _troop.lastRepaired) < 1) revert("Repaired too recently");

        _troop.health++;
        gs().troopIdMap[_troopId].health = _troop.health;
        gs().troopIdMap[_troopId].lastRepaired = gs().epoch;
        emit Util.Repaired(msg.sender, _tile.occupantId, _troop.health);
        if (_troop.health == Util._getMaxHealth(_troop.troopTypeId)) emit Util.Recovered(msg.sender, _troopId);
    }
}
