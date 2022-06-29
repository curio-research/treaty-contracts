//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/console.sol";
import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {BASE_NAME, Base, GameState, Player, Position, Production, TERRAIN, Tile, Troop, TroopType} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Engine facet
/// @notice Contains player functions including movement and battling

contract EngineFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;

    /**
     * Move a troop to a target position.
     * @param _troopId identifier for troop
     * @param _targetPos target position
     */
    function move(uint256 _troopId, Position memory _targetPos) external {
        require(Util._inBound(_targetPos), "CURIO: Target out of bound");
        if (!Util._getTileAt(_targetPos).isInitialized) Util._initializeTile(_targetPos);

        Troop memory _troop = gs().troopIdMap[_troopId];
        require(_troop.owner == msg.sender, "CURIO: Can only move own troop");
        require(Util._withinDist(_troop.pos, _targetPos, 1), "CURIO: Destination too far");
        require(!Util._samePos(_troop.pos, _targetPos), "CURIO: Already at destination");

        uint256 _movesLeftInEpoch = _troop.movesLeftInEpoch;
        uint256 _epoch = gs().epoch;
        if ((_epoch - _troop.lastMoved) >= Util._getMovementCooldown(_troop.troopTypeId)) {
            // Lazy update for moves left in epoch
            _movesLeftInEpoch = Util._getMovesPerEpoch(_troop.troopTypeId);
            gs().troopIdMap[_troopId].movesLeftInEpoch = _movesLeftInEpoch;
        }
        require(_movesLeftInEpoch > 0, "CURIO: No moves left this epoch");

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        if (Util._isLandTroop(_troop.troopTypeId)) {
            require(_targetTile.terrain != TERRAIN.WATER || Util._hasTroopTransport(_targetTile), "CURIO: Cannot move on water");
        } else {
            require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
        }

        require(_targetTile.baseId == NULL || Util._getBaseOwner(_targetTile.baseId) == msg.sender, "CURIO: Cannot move onto opponent base");
        if (_targetTile.occupantId != NULL) {
            require(Util._hasTroopTransport(_targetTile) && Util._isLandTroop(_troop.troopTypeId), "CURIO: Destination tile occupied");
            require(Util._getTroop(_targetTile.occupantId).owner == msg.sender, "CURIO: Cannot move onto opponent troop transport");

            // Load troop onto Troop Transport at target tile
            gs().troopIdMap[_targetTile.occupantId].cargoTroopIds.push(_troopId);
        } else {
            gs().map[_targetPos.x][_targetPos.y].occupantId = _troopId;
        }

        // Move
        Tile memory _sourceTile = Util._getTileAt(_troop.pos);
        if (_sourceTile.occupantId != _troopId) {
            assert(Util._hasTroopTransport(_sourceTile)); // something is wrong if failed
            // Troop is on troop transport
            Util._unloadTroopFromTransport(_sourceTile.occupantId, _troopId);
        } else {
            gs().map[_troop.pos.x][_troop.pos.y].occupantId = NULL;
        }
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
        require(Util._inBound(_targetPos), "CURIO: Target out of bound");
        if (!Util._getTileAt(_targetPos).isInitialized) Util._initializeTile(_targetPos);

        Troop memory _troop = gs().troopIdMap[_troopId];
        require(_troop.owner == msg.sender, "CURIO: Can only battle using own troop");
        require(Util._withinDist(_troop.pos, _targetPos, 1), "CURIO: Destination too far");
        require(!Util._samePos(_troop.pos, _targetPos), "CURIO: Already at destination");
        require((gs().epoch - _troop.lastAttacked) >= Util._getAttackCooldown(_troop.troopTypeId), "CURIO: Attacked too recently");

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
            require(_targetTroop.owner != msg.sender, "CURIO: Cannot attack own troop");

            _targetIsBase = false;
            _targetAttackFactor = Util._getAttackFactor(_targetTroop.troopTypeId);
            _targetDefenseFactor = Util._getDefenseFactor(_targetTroop.troopTypeId);
            _targetDamagePerHit = Util._getDamagePerHit(_targetTroop.troopTypeId);
            _targetHealth = _targetTroop.health;
        } else {
            require(_targetTile.baseId != NULL, "CURIO: No target to attack");

            _targetBase = gs().baseIdMap[_targetTile.baseId];
            require(_targetBase.owner != msg.sender, "CURIO: Cannot attack own base");

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
        require(Util._inBound(_targetPos), "CURIO: Target out of bound");
        if (!Util._getTileAt(_targetPos).isInitialized) Util._initializeTile(_targetPos);

        Troop memory _troop = gs().troopIdMap[_troopId];
        require(_troop.owner == msg.sender, "CURIO: Can only capture with own troop");
        require(Util._withinDist(_troop.pos, _targetPos, 1), "CURIO: Destination too far");
        require(Util._isLandTroop(_troop.troopTypeId), "CURIO: Only a land troop can capture bases");

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        require(_targetTile.baseId != NULL, "CURIO: No base to capture");
        require(Util._getBaseOwner(_targetTile.baseId) != msg.sender, "CURIO: Base already owned");
        require(_targetTile.occupantId == NULL, "CURIO: Destination tile occupied");
        require(Util._getBaseHealth(_targetTile.baseId) == 0, "CURIO: Need to attack first");

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
        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        Tile memory _tile = Util._getTileAt(_pos);
        require(_tile.baseId != NULL, "CURIO: No base found");
        require(Util._getBaseOwner(_tile.baseId) == msg.sender, "CURIO: Can only produce in own base");
        require(Util._isLandTroop(_troopTypeId) || Util._hasPort(_tile), "CURIO: Only ports can produce water troops");
        require(gs().baseProductionMap[_tile.baseId].troopTypeId == NULL, "CURIO: Base already producing");

        Production memory _production = Production({troopTypeId: _troopTypeId, startEpoch: gs().epoch});
        gs().baseProductionMap[_tile.baseId] = _production;
        emit Util.ProductionStarted(msg.sender, _tile.baseId, _production);
    }
}
