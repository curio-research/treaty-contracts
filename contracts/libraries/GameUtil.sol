//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {BASE_NAME, Base, GameState, Position, Tile, Troop} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {LibStorage} from "contracts/libraries/Storage.sol";

library Util {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    // ----------------------------------------------------------
    // Game-related
    // ----------------------------------------------------------

    // Setters

    function _removeTroop(Position memory _pos, uint256 _troopId) public {
        // TODO: consider whether or not to remove Troop from gs().troops
        uint256[] memory _cargoTroopIds = gs().troopIdMap[_troopId].cargoTroopIds;
        for (uint256 i = 0; i < _cargoTroopIds.length; i++) {
            delete gs().troopIdMap[_cargoTroopIds[i]];
        }
        delete gs().troopIdMap[_troopId];
        delete gs().map[_pos.x][_pos.y].occupantId;
    }

    function _addTroop(
        Position memory _pos,
        uint256 _troopTypeId,
        address _owner
    ) public returns (uint256) {
        uint256[] memory _cargoTroopIds;
        Troop memory _troop = Troop({
            owner: _owner,
            troopTypeId: _troopTypeId,
            lastMoved: gs().epoch,
            movesLeftInEpoch: _getMovesPerEpoch(_troopTypeId),
            lastAttacked: gs().epoch, // yo
            lastRepaired: gs().epoch,
            health: _getMaxHealth(_troopTypeId),
            pos: _pos,
            cargoTroopIds: _cargoTroopIds
        });

        uint256 _troopId = gs().troopNonce;
        gs().troopIds.push(_troopId);
        gs().troopIdMap[_troopId] = _troop;
        gs().troopNonce++;
        gs().map[_pos.x][_pos.y].occupantId = _troopId;

        return _troopId;
    }

    function _addBase(Position memory _pos, BASE_NAME _baseName) public returns (uint256) {
        // BaseConstants memory _baseConstants = gs().baseConstants;
        Base memory _base = Base({
            owner: address(0),
            name: _baseName,
            attackFactor: 100,
            defenseFactor: 100,
            health: 1 // FIXME: change to base constants
        });

        uint256 _baseId = gs().baseNonce;
        gs().baseIds.push(_baseId);
        gs().baseIdMap[_baseId] = _base;
        gs().baseNonce++;
        gs().map[_pos.x][_pos.y].baseId = _baseId;

        return _baseId;
    }

    // Getters

    function _getCargoCapacity(uint256 _troopId) public view returns (uint256) {
        return gs().troopTypeIdMap[gs().troopIdMap[_troopId].troopTypeId].cargoCapacity;
    }

    function _getTroopPos(uint256 _troopId) public view returns (Position memory) {
        return gs().troopIdMap[_troopId].pos;
    }

    function _getTroopOwner(uint256 _troopId) public view returns (address) {
        return gs().troopIdMap[_troopId].owner;
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

    function _getMovesPerEpoch(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].movesPerEpoch;
    }

    function _isLandTroop(uint256 _troopTypeId) public view returns (bool) {
        return gs().troopTypeIdMap[_troopTypeId].isLandTroop;
    }

    function _getBaseHealth(uint256 _baseId) public view returns (uint256) {
        return gs().baseIdMap[_baseId].health;
    }

    function _getBaseOwner(uint256 _baseId) public view returns (address) {
        return gs().baseIdMap[_baseId].owner;
    }

    function _hasTroopTransport(Tile memory _tile) public view returns (bool) {
        return _getCargoCapacity(_tile.occupantId) > 0;
    }

    function _hasPort(Tile memory _tile) public view returns (bool) {
        return gs().baseIdMap[_tile.baseId].name == BASE_NAME.PORT;
    }

    function _getTileAt(Position memory _pos) public view returns (Tile memory) {
        return gs().map[_pos.x][_pos.y];
    }

    function _strike(uint256 _strikeFactor) public view returns (bool) {
        uint256 _salt = 1; // FIXME: proper salt
        uint256 _rand = _random(_salt, 100);
        return _rand < _strikeFactor;
    }

    function _inBound(Position memory _p) public view returns (bool) {
        return _p.x >= 0 && _p.x < gs().worldConstants.worldWidth && _p.y >= 0 && _p.y < gs().worldConstants.worldHeight;
    }

    // ----------------------------------------------------------
    // Platonian
    // ----------------------------------------------------------

    function _samePos(Position memory _p1, Position memory _p2) public pure returns (bool) {
        return _p1.x == _p2.x && _p1.y == _p2.y;
    }

    function _random(uint256 _salt, uint256 _max) public view returns (uint256) {
        return uint256(keccak256(abi.encode(block.timestamp, block.difficulty, _salt))) % _max; // FIXME
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
