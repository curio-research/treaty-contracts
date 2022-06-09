//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../libraries/Storage.sol";
import {Util} from "../libraries/GameUtil.sol";
import {Base, GameState, Player, Position, Production, Terrain, Tile, Troop, TroopType} from "../libraries/Types.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract EngineFacet is UseStorage {
    using SafeMath for uint256;

    /*
    FIXME:
    - Time vs. epochs

    TODO:
    - Add events
    - Look for re-entrancy, overflow, and other potential security issues
    - Organize getters and setters into (multiple layers of) util fns, especially setters atm
    - Add documentation
    */

    function initializePlayer(Position memory _pos, address _addr) external {
        if (Util._getBaseOwner(gs().map[_pos.x][_pos.y].baseId) == address(0x0)) revert("Base is taken");

        gs().players.push(_addr);
        gs().playerMap[_addr] = Player({initTime: block.timestamp, active: true, pos: _pos});
    }

    // Currently implemented expecting real-time calls from client; can change to lazy if needed
    function increaseEpoch() external {
        if (block.timestamp - gs().epochTime < gs().secondsPerTurn) revert("Not enough time has elapsed since last epoch");

        gs().epoch++;
        gs().epochTime = block.timestamp;
    }

    function move(uint256 _troopId, Position memory _targetPos) external {
        if (!Util._inBound(_targetPos)) revert("Target out of bound");

        Troop memory _troop = gs().troopIdMap[_troopId];
        if (Util._samePos(_troop.pos, _targetPos)) revert("Already at destination");
        if (!Util._withinDist(_troop.pos, _targetPos, Util._getSpeed(_troop.troopTypeId))) revert("Destination too far");
        if (block.timestamp - _troop.lastMoved < Util._getMovementCooldown(_troop.troopTypeId)) revert("Moved too recently");

        Tile memory _targetTile = gs().map[_targetPos.x][_targetPos.y];
        if (Util._isArmy(_troop.troopTypeId)) {
            if (_targetTile.terrain == Terrain.WATER) revert("Cannot move on water");
        } else {
            if (_targetTile.terrain != Terrain.WATER && !Util._hasPort(_targetTile)) revert("Cannot move on land");
        }

        if (_targetTile.occupantId != 0x0) {
            if (!Util._hasTroopTransport(_targetTile)) revert("Destination tile occupied");

            // Load troop onto Troop Transport at target tile
            gs().troopIdMap[_targetTile.occupantId].cargoTroopIds.push(_troopId);
        } else {
            gs().map[_targetPos.x][_targetPos.y].occupantId = _troopId;
        }

        // Move
        gs().map[_troop.pos.x][_troop.pos.y].occupantId = 0x0;
        gs().troopIdMap[_troopId].pos = _targetPos;

        uint256[] memory _cargoTroopIds = gs().troopIdMap[_troopId].cargoTroopIds;
        if (_cargoTroopIds.length > 0) {
            // Troop is a Troop Transport — move its cargo troops
            for (uint256 i = 0; i < _cargoTroopIds.length; i++) {
                gs().troopIdMap[_cargoTroopIds[i]].pos = _targetPos;
            }
        }

        return;
    }

    function battle(uint256 _troopId, Position memory _targetPos) external {
        if (!Util._inBound(_targetPos)) revert("Target out of bound");

        Troop memory _troop = gs().troopIdMap[_troopId];
        if (Util._samePos(_troop.pos, _targetPos)) revert("Already at destination");
        if (!Util._withinDist(_troop.pos, _targetPos, 1)) revert("Destination too far");
        if (block.timestamp - _troop.lastAttacked < Util._getAttackCooldown(_troop.troopTypeId)) revert("Attacked too recently");

        Tile memory _targetTile = gs().map[_targetPos.x][_targetPos.y];
        bool _targetIsBase;
        uint256 _targetAttackFactor;
        uint256 _targetDefenseFactor;
        uint256 _targetDamagePerHit;
        uint256 _targetHealth;

        if (_targetTile.baseId != 0x0) {
            Base memory _targetBase = gs().baseIdMap[_targetTile.baseId];
            if (_targetBase.owner == msg.sender) revert("Cannot attack own base");

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
            _targetAttackFactor = Util._getAttackFactor(_targetTroop.troopTypeId);
            _targetDefenseFactor = Util._getDefenseFactor(_targetTroop.troopTypeId);
            _targetDamagePerHit = Util._getDamagePerHit(_targetTroop.troopTypeId);
            _targetHealth = _targetTroop.health;
        }

        uint256 _rand = Util._random(_troop.health, 100); // FIXME: proper salt
        if (_rand < _targetAttackFactor) {
            // Troop hits target
            uint256 _damagePerHit = Util._getDamagePerHit(_troop.troopTypeId);
            if (_damagePerHit >= _targetHealth) {
                _targetHealth = 0;
            } else {
                _targetHealth -= _damagePerHit;
            }

            if (_targetIsBase) {
                gs().baseIdMap[_targetTile.baseId].health = _targetHealth;
            } else {
                gs().troopIdMap[_targetTile.occupantId].health = _targetHealth;
                if (_targetHealth == 0) {
                    Util._removeTroop(_targetTile.occupantId);
                    gs().map[_targetPos.x][_targetPos.y].occupantId = 0x0;
                } else {}
            }
        }

        _rand = Util._random(_troop.health, 100); // FIXME: proper salt
        if (_rand < _targetDefenseFactor) {
            // Target hits troop
            if (_targetDamagePerHit >= _troop.health) {
                Util._removeTroop(_troopId);
                gs().map[_troop.pos.x][_troop.pos.y].occupantId = 0x0;
            } else {
                gs().troopIdMap[_targetTile.occupantId].health -= _targetDamagePerHit;
            }
        }

        return;
    }

    function captureBase(uint256 _troopId, Position memory _targetPos) external {
        if (!Util._inBound(_targetPos)) revert("Target out of bound");
        if (!Util._withinDist(Util._getTroopPos(_troopId), _targetPos, 1)) revert("Destination too far");
        if (!Util._isArmy(_troopId)) revert("Only an army can capture bases");

        Tile memory _targetTile = gs().map[_targetPos.x][_targetPos.y];
        if (_targetTile.baseId == 0x0) revert("No base to capture");
        if (gs().baseIdMap[_targetTile.baseId].owner == msg.sender) revert("Base already captured");
        if (_targetTile.occupantId != 0x0) revert("Destination tile occupied");
        if (gs().baseIdMap[_targetTile.baseId].health > 0) revert("Need to attack first");

        // Move, capture, end production
        Position memory _troopPos = Util._getTroopPos(_troopId);
        gs().map[_troopPos.x][_troopPos.y].occupantId = 0x0;
        gs().troopIdMap[_troopId].pos = _targetPos;
        gs().baseIdMap[_targetTile.baseId].owner = msg.sender;
        delete gs().baseProductionMap[_targetTile.baseId];

        return;
    }

    function startProduction(Position memory _pos, uint256 _troopTypeId) external {
        Tile memory _targetTile = gs().map[_pos.x][_pos.y];
        if (_targetTile.baseId == 0x0) revert("No base found");
        if (Util._getBaseOwner(_targetTile.baseId) != msg.sender) revert("Can only produce in own base");
        if (!Util._hasPort(_targetTile) && !Util._isArmy(_troopTypeId)) revert("Only ports can produce water troops");
        if (gs().baseProductionMap[_targetTile.baseId].troopTypeId != 0x0) revert("Base already producing");

        gs().baseProductionMap[_targetTile.baseId] = Production({troopTypeId: _troopTypeId, startTime: block.timestamp});

        return;
    }

    // Currently implemented expecting real-time calls from client; can change to lazy if needed
    function endProduction(Position memory _pos) external {
        Tile memory _targetTile = gs().map[_pos.x][_pos.y];
        if (_targetTile.baseId == 0x0) revert("No base found");
        if (Util._getBaseOwner(_targetTile.baseId) != msg.sender) revert("Can only produce in own base");
        if (_targetTile.occupantId != 0x0) revert("Base occupied by another troop");

        Production memory _production = gs().baseProductionMap[_targetTile.baseId];
        if (_production.troopTypeId == 0x0) revert("No production found in base");
        if (Util._getEpochsToProduce(_production.troopTypeId) > block.timestamp - _production.startTime) revert("Troop needs more time for production");

        uint256[] memory _cargoTroopIds;
        Troop memory _troop = Troop({
            owner: msg.sender,
            troopTypeId: _production.troopTypeId,
            lastMoved: block.timestamp,
            lastAttacked: block.timestamp, // yo
            health: Util._getMaxHealth(_production.troopTypeId),
            pos: _pos,
            cargoTroopIds: _cargoTroopIds
        });

        uint256 _troopId = gs().troopNonce;
        gs().troopIds.push(_troopId);
        gs().troopIdMap[_troopId] = _troop;
        gs().troopNonce++;

        return;
    }

    function repair(Position memory _pos) external {
        Tile memory _targetTile = gs().map[_pos.x][_pos.y];
        if (_targetTile.baseId == 0x0) revert("No base found");
        if (Util._getBaseOwner(_targetTile.baseId) != msg.sender) revert("Can only repair in own base");
        if (_targetTile.occupantId == 0x0) revert("No troop to repair");

        Troop memory _troop = gs().troopIdMap[_targetTile.occupantId];
        if (_troop.health >= Util._getMaxHealth(_troop.troopTypeId)) revert("Troop already at full health");

        gs().troopIdMap[_targetTile.occupantId].health++;
    }
}
