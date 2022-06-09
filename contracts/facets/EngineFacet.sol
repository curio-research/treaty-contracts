//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../libraries/Storage.sol";
import {Util} from "../libraries/GameUtil.sol";
import {Base, GameState, Player, Position, Production, Terrain, Tile, Troop, TroopType} from "../libraries/Types.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract EngineFacet is UseStorage {
    using SafeMath for uint256;

    /*
    TODO:
    - Look for re-entrancy, overflow, and other potential security issues
    - Organize getters and setters into (multiple layers of) util fns, especially setters atm
    - Add documentation
    - Endgame and objectives
    */

    event NewPlayer(address _player, Position _pos);
    event EpochUpdate(uint256 _epoch, uint256 _time);
    event Moved(address _player, uint256 _troopId, Position _pos);
    event Attacked(address _player, uint256 _troopId, address _targetPlayer, uint256 _targetId);
    event Death(address _player, uint256 _troopId);
    event BaseCaptured(address _player, uint256 _troopId, uint256 _baseId);
    event ProductionStarted(address _player, uint256 _baseId, uint256 _troopTypeId);
    event ProductionFinished(address _player, uint256 _troopId, Position _pos);
    event Recovered(address _player, uint256 _troopId);

    function initializePlayer(Position memory _pos, address _player) external {
        if (Util._getBaseOwner(gs().map[_pos.x][_pos.y].baseId) == address(0x0)) revert("Base is taken");

        gs().players.push(_player);
        gs().playerMap[_player] = Player({initEpoch: gs().epoch, active: true, pos: _pos});

        emit NewPlayer(_player, _pos);
    }

    // Currently implemented expecting real-time calls from client; can change to lazy if needed
    function updateEpoch() external {
        if (block.timestamp - gs().lastTimestamp < gs().secondsPerTurn) revert("Not enough time has elapsed since last epoch");

        gs().epoch++;
        gs().lastTimestamp = block.timestamp;

        emit EpochUpdate(gs().epoch, gs().lastTimestamp);
    }

    function move(uint256 _troopId, Position memory _targetPos) external {
        if (!Util._inBound(_targetPos)) revert("Target out of bound");

        Troop memory _troop = gs().troopIdMap[_troopId];
        if (Util._samePos(_troop.pos, _targetPos)) revert("Already at destination");
        if (!Util._withinDist(_troop.pos, _targetPos, Util._getSpeed(_troop.troopTypeId))) revert("Destination too far");
        if (gs().epoch - _troop.lastMoved < Util._getMovementCooldown(_troop.troopTypeId)) revert("Moved too recently");

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

        emit Moved(msg.sender, _troopId, _targetPos);
    }

    function battle(uint256 _troopId, Position memory _targetPos) external {
        if (!Util._inBound(_targetPos)) revert("Target out of bound");

        Troop memory _troop = gs().troopIdMap[_troopId];
        if (Util._samePos(_troop.pos, _targetPos)) revert("Already at destination");
        if (!Util._withinDist(_troop.pos, _targetPos, 1)) revert("Destination too far");
        if (gs().epoch - _troop.lastAttacked < Util._getAttackCooldown(_troop.troopTypeId)) revert("Attacked too recently");

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

        // Troop attacks target
        if (Util._strike(_targetAttackFactor)) {
            uint256 _damagePerHit = Util._getDamagePerHit(_troop.troopTypeId);
            if (_damagePerHit >= _targetHealth) {
                _targetHealth = 0;
            } else {
                _targetHealth -= _damagePerHit;
            }

            if (_targetIsBase) {
                gs().baseIdMap[_targetTile.baseId].health = _targetHealth;
                emit Attacked(msg.sender, _troopId, Util._getBaseOwner(_targetTile.baseId), _targetTile.baseId);
            } else {
                gs().troopIdMap[_targetTile.occupantId].health = _targetHealth;
                emit Attacked(msg.sender, _troopId, Util._getTroopOwner(_targetTile.occupantId), _targetTile.occupantId);

                if (_targetHealth == 0) {
                    Util._removeTroop(_targetTile.occupantId);
                    gs().map[_targetPos.x][_targetPos.y].occupantId = 0x0;
                    emit Death(Util._getBaseOwner(_targetTile.occupantId), _targetTile.occupantId);
                }
            }
        }

        // Target attacks troop
        if (Util._strike(_targetDefenseFactor)) {
            if (_targetIsBase) {
                emit Attacked(Util._getBaseOwner(_targetTile.baseId), _targetTile.baseId, msg.sender, _troopId);
            } else {
                emit Attacked(Util._getTroopOwner(_targetTile.occupantId), _targetTile.occupantId, msg.sender, _troopId);
            }

            if (_targetDamagePerHit >= _troop.health) {
                Util._removeTroop(_troopId);
                gs().map[_troop.pos.x][_troop.pos.y].occupantId = 0x0;
                emit Death(msg.sender, _troopId);
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

        emit BaseCaptured(msg.sender, _troopId, _targetTile.baseId);
    }

    function startProduction(Position memory _pos, uint256 _troopTypeId) external {
        Tile memory _tile = gs().map[_pos.x][_pos.y];
        if (_tile.baseId == 0x0) revert("No base found");
        if (Util._getBaseOwner(_tile.baseId) != msg.sender) revert("Can only produce in own base");
        if (!Util._hasPort(_tile) && !Util._isArmy(_troopTypeId)) revert("Only ports can produce water troops");
        if (gs().baseProductionMap[_tile.baseId].troopTypeId != 0x0) revert("Base already producing");

        gs().baseProductionMap[_tile.baseId] = Production({troopTypeId: _troopTypeId, startEpoch: gs().epoch});

        emit ProductionStarted(msg.sender, _tile.baseId, _troopTypeId);
    }

    // Currently implemented expecting real-time calls from client; can change to lazy if needed
    function endProduction(Position memory _pos) external {
        Tile memory _tile = gs().map[_pos.x][_pos.y];
        if (_tile.baseId == 0x0) revert("No base found");
        if (Util._getBaseOwner(_tile.baseId) != msg.sender) revert("Can only produce in own base");
        if (_tile.occupantId != 0x0) revert("Base occupied by another troop");

        Production memory _production = gs().baseProductionMap[_tile.baseId];
        if (_production.troopTypeId == 0x0) revert("No production found in base");
        if (Util._getEpochsToProduce(_production.troopTypeId) > gs().epoch - _production.startEpoch) revert("Troop needs more epochs for production");

        uint256[] memory _cargoTroopIds;
        Troop memory _troop = Troop({
            owner: msg.sender,
            troopTypeId: _production.troopTypeId,
            lastMoved: gs().epoch,
            lastAttacked: gs().epoch, // yo
            health: Util._getMaxHealth(_production.troopTypeId),
            pos: _pos,
            cargoTroopIds: _cargoTroopIds
        });

        uint256 _troopId = gs().troopNonce;
        gs().troopIds.push(_troopId);
        gs().troopIdMap[_troopId] = _troop;
        gs().troopNonce++;

        emit ProductionFinished(msg.sender, _troopId, _pos);
    }

    function repair(Position memory _pos) external {
        Tile memory _tile = gs().map[_pos.x][_pos.y];
        if (_tile.baseId == 0x0) revert("No base found");
        if (Util._getBaseOwner(_tile.baseId) != msg.sender) revert("Can only repair in own base");
        if (_tile.occupantId == 0x0) revert("No troop to repair");

        Troop memory _troop = gs().troopIdMap[_tile.occupantId];
        if (_troop.health >= Util._getMaxHealth(_troop.troopTypeId)) revert("Troop already at full health");

        gs().troopIdMap[_tile.occupantId].health++;
        if (_troop.health == Util._getMaxHealth(_troop.troopTypeId)) emit Recovered(msg.sender, _tile.occupantId);
    }
}
