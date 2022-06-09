//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {BaseName, GameState, Position, Tile} from "./Types.sol";
import {LibStorage} from "./Storage.sol";

library Util {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    // ----------------------------------------------------------
    // Game-related
    // ----------------------------------------------------------

    function _removeTroop(uint256 _troopId) public {
        // TODO: consider whether or not to remove Troop from gs().troops
        uint256[] memory _cargoTroopIds = gs().troopIdMap[_troopId].cargoTroopIds;
        for (uint256 i = 0; i < _cargoTroopIds.length; i++) {
            delete gs().troopIdMap[_cargoTroopIds[i]];
        }
        delete gs().troopIdMap[_troopId];
    }

    function _getCargoCapacity(uint256 _troopId) public view returns (uint256) {
        return gs().troopTypeIdMap[gs().troopIdMap[_troopId].troopTypeId].cargoCapacity;
    }

    function _getMaxHealth(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].maxHealth;
    }

    function _getEpochsToProduce(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].epochsToProduce;
    }

    function _getDamagePerHit(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].damagePerHit;
    }

    function _getDefenseFactor(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].defenseFactor;
    }

    function _getAttackFactor(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].attackFactor;
    }

    function _getAttackCooldown(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].attackCooldown;
    }

    function _getMovementCooldown(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].movementCooldown;
    }

    function _getSpeed(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].speed;
    }

    function _isArmy(uint256 _troopTypeId) public view returns (bool) {
        return gs().troopTypeIdMap[_troopTypeId].isArmy;
    }

    function _getTroopPos(uint256 _troopId) public view returns (Position memory) {
        return gs().troopIdMap[_troopId].pos;
    }

    function _getTroopOwner(uint256 _troopId) public view returns (address) {
        return gs().troopIdMap[_troopId].owner;
    }

    function _getBaseOwner(uint256 _baseId) public view returns (address) {
        return gs().baseIdMap[_baseId].owner;
    }

    function _hasTroopTransport(Tile memory _tile) public view returns (bool) {
        return _getCargoCapacity(_tile.occupantId) > 0;
    }

    function _hasPort(Tile memory _tile) public view returns (bool) {
        return gs().baseIdMap[_tile.baseId].name == BaseName.PORT;
    }

    function _strike(uint256 _strikeFactor) public view returns (bool) {
        uint256 _rand = _random(block.timestamp, 100); // FIXME: proper salt
        return _rand < _strikeFactor;
    }

    function _inBound(Position memory _p) public view returns (bool) {
        return _p.x >= 0 && _p.x < gs().worldWidth && _p.y >= 0 && _p.y < gs().worldHeight;
    }

    // ----------------------------------------------------------
    // Platonian
    // ----------------------------------------------------------

    function _samePos(Position memory _p1, Position memory _p2) public pure returns (bool) {
        return _p1.x == _p2.x && _p1.y == _p2.y;
    }

    function _random(uint256 _salt, uint256 _max) public pure returns (uint256) {
        // TODO: implement
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
