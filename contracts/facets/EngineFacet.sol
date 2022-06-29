//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

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
        
        /* Condition Check: Distance and Attacking Range (same thing for now) */
        if (!Util._inBound(_targetPos)) revert("CURIO: Target out of bound");
        if (!Util._getTileAt(_targetPos).isInitialized) Util._initializeTile(_targetPos);

        Troop memory _troop = gs().troopIdMap[_troopId];
        if (_troop.owner != msg.sender) revert("CURIO: Can only move own troop");
        if (Util._samePos(_troop.pos, _targetPos)) revert("CURIO: Already at destination");
        if (!Util._withinDist(_troop.pos, _targetPos, 1)) revert("CURIO: Destination too far");

        /* Condition Check: Moves Left */
        uint256 _movesLeftInEpoch = _troop.movesLeftInEpoch;
        uint256 _epoch = gs().epoch;
        if ((_epoch - _troop.lastMoved) >= Util._getMovementCooldown(_troop.troopTypeId)) {
            // Lazy update for moves left in epoch
            _movesLeftInEpoch = Util._getMovesPerEpoch(_troop.troopTypeId);
            gs().troopIdMap[_troopId].movesLeftInEpoch = _movesLeftInEpoch;
        }
        if (_movesLeftInEpoch == 0) revert("CURIO: No moves left this epoch");

        /* Condition Check: Geographic Limits */
        Tile memory _targetTile = Util._getTileAt(_targetPos);
        if (Util._isLandTroop(_troop.troopTypeId) && !Util._hasTroopTransport(_targetTile)) {
            if (_targetTile.terrain == TERRAIN.WATER) revert("CURIO: Cannot move on water");
        } else {
            if (_targetTile.terrain != TERRAIN.WATER && !Util._hasPort(_targetTile)) revert("CURIO: Cannot move on land");
        }

        /* Condition Check: If _targetTile is a base owned by an enemy */
        if (_targetTile.baseId != 0 && Util._getBaseOwner(_targetTile.baseId) != msg.sender) {
        /* Condition: true */
        // Note: move battle logic here: battle against a base
            
        }




        /* Condition Check: If _targetTile (not a base) is occupied */
        if (_targetTile.occupantId != 0) {
            /* Condition: _targetTile occupied by trooptransport but _troop is not army */
            // Fixme: _isLandTroop should be changed to _isloadable in the future
            if (!Util._hasTroopTransport(_targetTile) || !Util._isLandTroop(_troop.troopTypeId)) revert("CURIO: Destination tile occupied");
            /* Condition: _targetTile occupied by enemey */
            if (Util._getTroop(_targetTile.occupantId).owner != msg.sender) revert("CURIO: Cannot move onto opponent troop transport");
            // Note: move battle logic here: battle against a troop

            /* Condition: _targetTile occupied by trooptransport and _troop is army (loadable) */
            gs().troopIdMap[_targetTile.occupantId].cargoTroopIds.push(_troopId);
        } else {
            /* Condition Check: _targetTile not occupied */
            // Note: move logic here
            gs().map[_targetPos.x][_targetPos.y].occupantId = _troopId;
        }

        // Note: migrated from move in Engine. Universally applied to move, battle, captureBase
        gs().map[_troop.pos.x][_troop.pos.y].occupantId = 0;
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
}