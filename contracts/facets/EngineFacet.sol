//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/console.sol";
import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {MarchHelper} from "contracts/libraries/MarchHelper.sol";
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

        // Lazy update for large action taken in epoch
        uint256 _epoch = gs().epoch;
        if ((_epoch - _troop.lastLargeActionTaken) >= Util._getMovementCooldown(_troop.troopTypeId)) {
            // FIXME: change to large action cooldown
            // FIXME: add Util function that gets large action info
            gs().troopIdMap[_troopId].largeActionTakenThisEpoch = false;
        }
        require(!_troop.largeActionTakenThisEpoch, "CURIO: Large action taken this epoch");

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        if (_targetTile.occupantId == NULL) {
            if (_targetTile.baseId == NULL) {
                // Note: move Module
                // Geography Check
                if (Util._isLandTroop(_troop.troopTypeId)) {
                    require(_targetTile.terrain != TERRAIN.WATER || Util._hasTroopTransport(_targetTile), "CURIO: Cannot move on water");
                } else {
                    require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
                }
                MarchHelper.moveModule(_troopId, _targetPos);
            } else {
                if (Util._getBaseOwner(_targetTile.baseId) == msg.sender) {
                    // Note: move Module
                    // Geography Check
                    if (Util._isLandTroop(_troop.troopTypeId)) {
                        require(_targetTile.terrain != TERRAIN.WATER || Util._hasTroopTransport(_targetTile), "CURIO: Cannot move on water");
                    } else {
                        require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
                    }

                    MarchHelper.moveModule(_troopId, _targetPos);
                } else {
                    // Note: battleBase Module (will capture&move if won and _troop is landtroop)
                    MarchHelper.battleBaseModule(_troopId, _targetPos);
                }
            }
        } else {
            if (gs().troopIdMap[_targetTile.occupantId].owner == msg.sender) {
                if (Util._hasTroopTransport(_targetTile) && Util._isLandTroop(_troop.troopTypeId)) {
                    MarchHelper.loadModule(_troopId, _targetPos);
                    MarchHelper.moveModule(_troopId, _targetPos);
                } else {
                    revert("CURIO: Destination tile occupied");
                }
            } else {
                // Note: battleTroop Module
                MarchHelper.battleTroopModule(_troopId, _targetPos);
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

        Production memory _production = Production({troopTypeId: _troopTypeId, startEpoch: gs().epoch});
        gs().baseProductionMap[_tile.baseId] = _production;
        emit Util.ProductionStarted(msg.sender, _tile.baseId, _production);
    }
}
