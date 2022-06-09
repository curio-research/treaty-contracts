//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../libraries/Storage.sol";
import {GameUtil} from "../libraries/GameUtil.sol";
import {GameState, Position, Production, Terrain, Tile, Troop, TroopType} from "../libraries/Types.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract EngineFacet is UseStorage {
    using SafeMath for uint256;

    /*
    TODO:
    - Add events
    - Look for re-entrancy, overflow, and other potential security issues
    - Organize getters and setters into (multiple layers of) util fns, especially setters atm
    */

    function initializePlayer(Position memory _pos, address _addr) external {
        if (this._isTaken(_pos)) revert("Base is taken");

        gs().players.push(_addr);
        gs().playerMap[_addr] = Player({initTime: now, active: true, pos: _pos});
    }

    function increaseEpoch() external returns (uint256) {
        // TODO: implement
    }

    function move(uint256 _troopId, Position memory _targetPos) external {
        if (!GameUtil._inBound(_targetPos)) revert("Target out of bound");
        if (GameUtil._samePos(GameUtil._getTroopPos(_troopId), _targetPos)) revert("Already at destination");
        if (!GameUtil._withinDist(GameUtil._getTroopPos(_troopId), _targetPos, _troop.troopType.speed)) revert("Destination too far");
        if (now - _troop.lastMoved < _troop.troopType.movementCooldown) revert("Moved too recently");

        Tile memory _targetTile = gs().map[_targetPos.x][_targetPos.y];
        if (GameUtil._isArmy(_troopId)) {
            if (_targetTile.terrain == Terrain.WATER) revert("Cannot move on water");
        } else {
            if (
                _targetTile.terrain == Terrain.INLAND || (_targetTile.terrain == Terrain.COASTLINE && !GameUtil._hasPort(_targetTile)) // FIXME: autoscale
            ) revert("Cannot move on land");
        }

        if (_targetTile.occupantId != 0x0) {
            if (!GameUtil._hasTroopTransport(_targetTile)) revert("Destination tile occupied");

            // Load troop onto Troop Transport at target tile
            gs().troopIdMap[_targetTile.occupantId].cargo.push(_troopId);
        } else {
            gs().map[_targetPos.x][_targetPos.y].occupantId = _troopId;
        }

        // Move
        gs().map[_troop.pos.x][_troop.pos.y].occupantId = 0x0;
        gs().troopIdMap[_troopId].pos = _targetPos;

        uint256[] memory _cargoTroopIds = gs().troopIdMap[_troopId].cargoTroopIds;
        if (_cargoTroopIds.length > 0) {
            // Troop is a Troop Transport; move all of its cargo
            for (uint256 i = 0; i < _cargoTroopIds.length; i++) {
                gs().troopIdMap[_cargoTroopIds[i]].pos = _targetPos;
            }
        }

        return;
    }

    function battle(uint256 _troopId, Position memory _targetPos) external {
        if (!GameUtil._inBound(_targetPos)) revert("Target out of bound");
        if (GameUtil._samePos(GameUtil._getTroopPos(_troopId), _targetPos)) revert("Already at destination");
        if (!GameUtil._withinDist(GameUtil._getTroopPos(_troopId), _targetPos, 1)) revert("Destination too far");
        if (now - _troop.lastAttacked < _troop.troopType.attackCooldown) revert("Attacked too recently");

        Tile memory _targetTile = gs().map[_targetPos.x][_targetPos.y];
        bool _targetIsBase;
        uint256 _targetAttackFactor;
        uint256 _targetDefenseFactor;
        uint256 _targetDamagePerHit;
        uint256 _targetHealth;

        if (_targetTile.baseId != 0x0) {
            Base memory _targetBase = gs().baseIdMap[_targetTile.baseId];
            if (_targetBase.owner == msg.sender) revert("Cannot attack own city");

            _targetIsBase = true;
            _targetAttackFactor = _targetBase.attackFactor;
            _targetDefenseFactor = _targetBase.defenseFactor;
            _targetDamagePerHit = 0;
            _targetHealth = _targetBase.health;
        } else {
            if (_targetTile.occupantId == 0x0) revert("No target to attack");

            Troop memory _targetTroop = gs().troopIdMap[_targetTile.occupantId];
            if (_targetTroop.owner == msg.sender) revert("Cannot attack own troop");

            _targetIsBase = false;
            _targetAttackFactor = _targetTroop.troopType.attackFactor;
            _targetDefenseFactor = _targetTroop.troopType.defenseFactor;
            _targetDamagePerHit = _targetTroop.troopType.damagePerHit;
            _targetHealth = _targetTroop.health;
        }

        Troop memory _troop = gs().troopIdMap[_troopId];

        uint256 _rand = GameUtil._random(_troop.health, 100); // FIXME: proper salt
        if (_rand < _targetAttackFactor) {
            // Troop hits target
            if (_troop.troopType.damagePerHit >= _targetHealth) {
                _targetHealth = 0;
            } else {
                _targetHealth -= _troop.troopType.damagePerHit;
            }

            if (_targetIsBase) {
                gs().baseIdMap[_targetTile.baseId].health = _targetHealth;
            } else {
                gs().troopIdMap[_targetTile.occupantId].health = _targetHealth;
                if (_targetHealth == 0) {
                    GameUtil._removeTroop(_targetTile.troopId);
                    gs().map[_targetPos.x][_targetPos.y].occupantId = 0x0;
                } else {}
            }
        }

        _rand = GameUtil._random(_troop.health, 100); // FIXME: proper salt
        if (_rand < _targetDefenseFactor) {
            // Target hits troop
            if (_targetDamagePerHit >= _troop.health) {
                GameUtil._removeTroop(_troopId);
                gs().map[_troop.pos.x][_troop.pos.y].occupantId = 0x0;
            } else {
                gs().troopIdMap[_targetTile.occupantId].health -= _targetDamagePerHit;
            }
        }

        return;
    }

    function captureBase(uint256 _troopId, Position memory _targetPos) external {
        if (!GameUtil._inBound(_targetPos)) revert("Target out of bound");
        if (!GameUtil._withinDist(GameUtil._getTroopPos(_troopId), _targetPos, 1)) revert("Destination too far");
        if (!GameUtil._isArmy(_troopId)) revert("Only an army can capture bases");

        const _targetTile = gs().map[_targetPos.x][_targetPos.y];
        if (_targetTile.baseId == 0x0) revert("No base to capture");
        if (gs().baseIdMap[_targetTile.baseId].owner == msg.sender) revert("Base already captured");
        if (_targetTile.occupantId != 0x0) revert("Destination tile occupied");
        if (gs().baseIdMap[_targetTile.baseId].health > 0) revert("Need to attack first");

        // Move and capture
        gs().map[_troop.pos.x][_troop.pos.y].occupantId = 0x0;
        gs().troopIdMap[_troopId].pos = _targetPos;
        gs().baseIdMap[_targetTile.baseId].owner = msg.sender;
    }
}
