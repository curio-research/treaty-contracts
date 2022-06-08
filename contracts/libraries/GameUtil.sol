//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {Position, Tile} from "./Types.sol";
import {LibStorage} from "./Storage.sol";

library GameUtil {
    using SafeMath for uint256;

    function gs() internal pure returns (GameInfo storage) {
        return LibStorage.gameStorage();
    }

    // Game-related

    function _canMoveOnWater(uint256 _troopId) public view returns (bool) {
        return gs().troopIdMap[_troopId].troopType.canMoveOnWater;
    }

    function _isTaken(Position memory _p) public view returns (bool) {
        return gs().map[_p.x][_p.y].base != 0x0 && gs().map[_p.x][_p.y].base.ownerAddr != address(0);
    }

    function _inBound(Position memory _p) public view returns (bool) {
        return _p.x >= 0 && _p.x < gs().worldWidth && _p.y >= 0 && _p.y < gs().worldHeight;
    }

    function _isPort(Tile memory _tile) public view returns (bool) {
        return _targetTile.baseId != 0x0 && gs().baseIdMap[_targetTile.baseId].baseType == BaseType.PORT;
    }

    // Platonian

    function _samePos(Position memory _p1, Position memory _p2) public pure returns (bool) {
        return _p1.x == _p2.x && _p1.y == _p2.y;
    }

    function _random(uint256 _salt, uint256 _max) public pure returns (uint256) {
        // TODO: implement
        revert("To be implemented in Solidity");
    }

    function _withinDist(
        Position memory _p1,
        Position memory _p2,
        uint256 _dist
    ) public pure returns (bool) {
        uint256 _xDist = _p1.x >= _p2.x ? _p1.x - _p2.x : _p2.x - _p1.x;
        uint256 _yDist = _p1.y >= _p2.y ? _p1.y - _p2.y : _p2.y - _p1.y;
        return _xDist <= _dist && _yDist <= _dist;
    }
}
