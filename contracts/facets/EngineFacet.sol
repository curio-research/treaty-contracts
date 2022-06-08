//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../libraries/Storage.sol";
import {GameUtil} from "../libraries/GameUtil.sol";
import {GameState, Position, Production, Terrain, Tile, Troop, TroopType} from "../libraries/Types.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract EngineFacet is UseStorage {
    using SafeMath for uint256;

    function initializePlayer(Position memory _pos, address _addr) external {
        if (this._isTaken(_pos)) revert("Base is taken");

        gs().players.push(_addr);
        gs().playerMap[_addr] = Player({addr: _addr, initTime: now, active: true, pos: _pos});
    }

    function increaseEpoch() external returns (uint256) {
        // TODO: implement
    }

    function move(uint256 _troopId, Position memory _targetPos) external {
        if (!GameUtil._inBound(_targetPos)) revert("Target out of bound");
        if (GameUtil._samePos(_troop.pos, _targetPos)) revert("Already at destination");
        if (!GameUtil._withinDist(_troop.pos, _targetPos, _troop.troopType.speed)) revert("Destination too far");
        if (now - _troop.lastMoved < _troop.troopType.movementCooldown) revert("Moved too recently");

        Tile memory _targetTile = gs().map[_targetPos.x][_targetPos.y];
        if (GameUtil._canMoveOnWater(_troopId)) {
            if (
                _targetTile.terrain == Terrain.INLAND || (_targetTile.terrain == Terrain.COASTLINE && !GameUtil._isPort(_targetTile)) // FIXME: autoscale
            ) revert("Cannot move on land");
        }
    }
}
