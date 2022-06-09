//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {Position, Tile} from "./Types.sol";
import {LibStorage} from "./Storage.sol";

library Util {
    using SafeMath for uint256;

    function gs() internal pure returns (GameInfo storage) {
        return LibStorage.gameStorage();
    }

    // Game-related

    function _removeTroop(uint256 _troopId) public {
        uint256[] memory _cargoTroopIds = gs().troopIdMap[_troopId].cargoTroopIds;
        for (uint256 i = 0; i < _cargoTroopIds.length; i++) {
            gs().troopIdMap[_cargoTroopIds[i]] = 0x0;
        }
        gs().troopIdMap[_troopId] = 0x0;
    }

    function _getOwner(uint256 _baseId) public view returns (address) {
        return gs().baseIdMap[_baseId].ownerAddr;
    }

    function _getOwner(uint256 _troopId) public view returns (address) {
        return gs().troopIdMap[_troopId].ownerAddr;
    }

    function _hasTroopTransport(Tile memory _tile) public view returns (bool) {
        return gs().troopIdMap[_tile.occupantId].troopType.cargoCapacity > 0;
    }

    function _getTroopPos(uint256 _troopId) public view returns (Position memory) {
        return gs().troopIdMap[_troopId].pos;
    }

    function _isArmy(uint256 _troopId) public view returns (bool) {
        return gs().troopIdMap[_troopId].troopType.isArmy;
    }

    function _isTaken(Position memory _p) public view returns (bool) {
        return gs().map[_p.x][_p.y].base.ownerAddr != address(0);
    }

    function _inBound(Position memory _p) public view returns (bool) {
        return _p.x >= 0 && _p.x < gs().worldWidth && _p.y >= 0 && _p.y < gs().worldHeight;
    }

    function _hasPort(Tile memory _tile) public view returns (bool) {
        return gs().baseIdMap[_targetTile.baseId].baseType == BaseType.PORT;
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
