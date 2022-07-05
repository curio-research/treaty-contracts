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
     * Troop march to a target position (combining move, battle, captureBase)
     * @param _troopId identifier for troop
     * @param _targetPos target position
     */
    function march(uint256 _troopId, Position memory _targetPos) external {
        require(Util._inBound(_targetPos), "CURIO: Target out of bound");

        if (!Util._getTileAt(_targetPos).isInitialized) Util._initializeTile(_targetPos);

        // Basic check
        Troop memory _troop = gs().troopIdMap[_troopId];
        require(_troop.owner == msg.sender, "CURIO: Can only march own troop");
        require(!Util._samePos(_troop.pos, _targetPos), "CURIO: Already at destination");
        require((block.timestamp - _troop.lastLargeActionTaken) >= Util._getLargeActionCooldown(_troop.troopTypeId), "CURIO: Large action taken too recently");

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        if (_targetTile.occupantId == NULL) {
            if (_targetTile.baseId == NULL) {
                // Note: move Module
                // Geography Check
                if (Util._isLandTroop(_troop.troopTypeId)) {
                    require(_targetTile.terrain != TERRAIN.WATER || Util._canTransportTroop(_targetTile), "CURIO: Cannot move on water");
                } else {
                    require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
                }
                _moveModule(_troopId, _targetPos);
            } else {
                if (Util._getBaseOwner(_targetTile.baseId) == msg.sender) {
                    // Note: move Module
                    // Geography Check
                    if (Util._isLandTroop(_troop.troopTypeId)) {
                        require(_targetTile.terrain != TERRAIN.WATER || Util._canTransportTroop(_targetTile), "CURIO: Cannot move on water");
                    } else {
                        require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
                    }

                    _moveModule(_troopId, _targetPos);
                } else {
                    // Note: battleBase Module (will capture&move if won and _troop is land troop)
                    _battleBaseModule(_troopId, _targetPos);
                }
            }
        } else {
            if (gs().troopIdMap[_targetTile.occupantId].owner == msg.sender) {
                if (Util._canTransportTroop(_targetTile) && Util._isLandTroop(_troop.troopTypeId)) {
                    _loadModule(_troopId, _targetPos);
                    _moveModule(_troopId, _targetPos);
                } else {
                    revert("CURIO: Destination tile occupied");
                }
            } else {
                // Note: battleTroop Module
                _battleTroopModule(_troopId, _targetPos);
            }
        }
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

        Production memory _production = Production({troopTypeId: _troopTypeId, startTimestamp: block.timestamp});
        gs().baseProductionMap[_tile.baseId] = _production;
        emit Util.ProductionStarted(msg.sender, _tile.baseId, _production);
    }

    /////////////////////////////////////////
    // Modules for march
    /////////////////////////////////////////
    function _moveModule(uint256 _troopId, Position memory _targetPos) internal {
        Troop memory _troop = gs().troopIdMap[_troopId];
        Tile memory _targetTile = Util._getTileAt(_targetPos);

        // Lazy update for movement taken within second
        if ((block.timestamp - _troop.lastMoved) >= Util._getMovementCooldown(_troop.troopTypeId)) {
            _troop.movesLeftInSecond = Util._getMovesPerSecond(_troop.troopTypeId);
            gs().troopIdMap[_troopId].movesLeftInSecond = _troop.movesLeftInSecond;
        }
        require(_troop.movesLeftInSecond > 0, "CURIO: Moved too recently");

        if (!Util._canTransportTroop(_targetTile)) {
            gs().map[_targetPos.x][_targetPos.y].occupantId = _troopId;
        }

        // Move
        Tile memory _sourceTile = Util._getTileAt(_troop.pos);
        if (_sourceTile.occupantId != _troopId) {
            assert(Util._canTransportTroop(_sourceTile)); // something is wrong if failed
            // Troop is on troop transport
            Util._unloadTroopFromTransport(_sourceTile.occupantId, _troopId);
        } else {
            gs().map[_troop.pos.x][_troop.pos.y].occupantId = NULL;
        }
        gs().troopIdMap[_troopId].pos = _targetPos;
        gs().troopIdMap[_troopId].movesLeftInSecond--;
        gs().troopIdMap[_troopId].lastMoved = block.timestamp;

        uint256[] memory _cargoTroopIds = gs().troopIdMap[_troopId].cargoTroopIds;
        if (_cargoTroopIds.length > 0) {
            // Troop is a Troop Transport — move its cargo troops
            for (uint256 i = 0; i < _cargoTroopIds.length; i++) {
                gs().troopIdMap[_cargoTroopIds[i]].pos = _targetPos;
            }
        }
        emit Util.Moved(msg.sender, _troopId, block.timestamp, _troop.pos, _targetPos);
    }

    function _loadModule(uint256 _troopId, Position memory _targetPos) internal {
        Tile memory _targetTile = Util._getTileAt(_targetPos);

        // Load troop onto Troop Transport at target tile
        gs().troopIdMap[_targetTile.occupantId].cargoTroopIds.push(_troopId);
    }

    function _battleBaseModule(uint256 _troopId, Position memory _targetPos) internal {
        Troop memory _troop = gs().troopIdMap[_troopId];
        // FIXME: replace withinDist with withinFiringDist
        require(Util._withinDist(_troop.pos, _targetPos, 1), "CURIO: Target not in Firing Range");
        gs().troopIdMap[_troopId].lastLargeActionTaken = block.timestamp;

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        require(_targetTile.baseId != NULL, "CURIO: No target to attack");

        Base memory _targetBase;
        _targetBase = gs().baseIdMap[_targetTile.baseId];
        require(_targetBase.owner != msg.sender, "CURIO: Cannot attack own base");

        // Loop till one side dies
        uint256 _salt = 0;
        while (_troop.health > 0) {
            // Troop attacks target
            _salt += 1;
            if (Util._strike(_targetBase.attackFactor, _salt)) {
                uint256 _damagePerHit = Util._getDamagePerHit(_troop.troopTypeId);
                if (_damagePerHit < _targetBase.health) {
                    _targetBase.health -= _damagePerHit;
                } else {
                    _targetBase.health = 0;
                    Util._removeTroop(_targetPos, _targetTile.occupantId);
                    emit Util.Death(Util._getBaseOwner(_targetTile.occupantId), _targetTile.occupantId);
                }
            }

            if (_targetBase.health == 0) break; // target cannot attack back if it has zero health

            // Target attacks troop
            _salt += 1;
            if (Util._strike(_targetBase.defenseFactor, _salt)) {
                // enemy troop attacks back
                // Fixme: base damage per hit hardcoded
                if (_troop.health > 1) {
                    _troop.health -= 1;
                } else {
                    _troop.health = 0;
                    Util._removeTroop(_troop.pos, _troopId);
                    emit Util.Death(msg.sender, _troopId);
                }
            }
        }

        if (_targetBase.health == 0) {
            // Troop survives
            gs().troopIdMap[_troopId].health = _troop.health;
            gs().baseIdMap[_targetTile.baseId].health = 0;
            _targetBase = Util._getBase(_targetTile.baseId);

            emit Util.AttackedBase(msg.sender, _troopId, _troop, _targetTile.baseId, _targetBase);

            // capture and end production
            gs().baseIdMap[_targetTile.baseId].owner = msg.sender;
            gs().baseIdMap[_targetTile.baseId].health = 1; // FIXME: change to BaseConstants.maxHealth
            delete gs().baseProductionMap[_targetTile.baseId];
            emit Util.BaseCaptured(msg.sender, _troopId, _targetTile.baseId);

            // move
            _moveModule(_troopId, _targetPos);
        } else {
            // Target survives
            gs().baseIdMap[_targetTile.baseId].health = _targetBase.health;
            _targetBase = Util._getBase(_targetTile.baseId);

            emit Util.AttackedBase(msg.sender, _troopId, _troop, _targetTile.baseId, _targetBase);
        }
    }

    function _battleTroopModule(uint256 _troopId, Position memory _targetPos) internal {
        Troop memory _troop = gs().troopIdMap[_troopId];
        //Fixme: replace withinDist with withinFiringDist
        require(Util._withinDist(_troop.pos, _targetPos, 1), "CURIO: Target not in Firing Range");
        gs().troopIdMap[_troopId].lastLargeActionTaken = block.timestamp;

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        Troop memory _targetTroop;

        _targetTroop = gs().troopIdMap[_targetTile.occupantId];
        require(_targetTroop.owner != msg.sender, "CURIO: Cannot attack own troop");

        // Loop till one side dies
        uint256 _salt = 0;
        while (_troop.health > 0) {
            // Troop attacks target
            _salt += 1;
            if (Util._strike(Util._getAttackFactor(_targetTroop.troopTypeId), _salt)) {
                uint256 _damagePerHit = Util._getDamagePerHit(_troop.troopTypeId);
                if (_damagePerHit < _targetTroop.health) {
                    _targetTroop.health -= _damagePerHit;
                } else {
                    _targetTroop.health = 0;
                    Util._removeTroop(_targetTroop.pos, _targetTile.occupantId);
                    emit Util.Death(_targetTroop.owner, _targetTile.occupantId);
                }
            }

            if (_targetTroop.health == 0) break; // target cannot attack back if it has zero health

            // Target attacks troop
            _salt += 1;
            if (Util._strike(Util._getDefenseFactor(_targetTroop.troopTypeId), _salt)) {
                // enemy troop attacks back
                if (Util._getDamagePerHit(_targetTroop.troopTypeId) < _troop.health) {
                    _troop.health -= Util._getDamagePerHit(_targetTroop.troopTypeId);
                } else {
                    _troop.health = 0;
                    Util._removeTroop(_troop.pos, _troopId);
                    emit Util.Death(msg.sender, _troopId);
                }
            }
        }

        if (_targetTroop.health == 0) {
            // Troop survives
            gs().troopIdMap[_troopId].health = _troop.health;
            _troop = Util._getTroop(_troopId);

            _targetTroop = Util._getTroop(_targetTile.occupantId);

            emit Util.AttackedTroop(msg.sender, _troopId, _troop, _targetTile.occupantId, _targetTroop);
        } else {
            // Target survives
            gs().troopIdMap[_targetTile.occupantId].health = _targetTroop.health;

            _targetTroop = Util._getTroop(_targetTile.occupantId);

            emit Util.AttackedTroop(msg.sender, _troopId, _troop, _targetTile.occupantId, _targetTroop);
        }
    }
}
