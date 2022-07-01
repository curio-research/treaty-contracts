//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/console.sol";
import {BASE_NAME, Base, GameState, Position, Production, TERRAIN, Tile, Troop} from "contracts/libraries/Types.sol";
import {LibStorage} from "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

// Note: Util functions generally do not verify correctness of conditions. Make sure to verify in higher-level functions such as those in Engine.
library MarchHelper {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    function moveModule(uint256 _troopId, Position memory _targetPos) public {
        Troop memory _troop = gs().troopIdMap[_troopId];
        uint256 _epoch = gs().epoch;

        gs().map[_targetPos.x][_targetPos.y].occupantId = _troopId;

        // Move
        Tile memory _sourceTile = Util._getTileAt(_troop.pos);
        if (_sourceTile.occupantId != _troopId) {
            assert(Util._hasTroopTransport(_sourceTile)); // something is wrong if failed
            // Troop is on troop transport
            Util._unloadTroopFromTransport(_sourceTile.occupantId, _troopId);
        } else {
            gs().map[_troop.pos.x][_troop.pos.y].occupantId = 0;
        }
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

    function loadModule(uint256 _troopId, Position memory _targetPos) public {
        Tile memory _targetTile = Util._getTileAt(_targetPos);
        Troop memory _troop = gs().troopIdMap[_troopId];

        require(Util._hasTroopTransport(_targetTile) && Util._isLandTroop(_troop.troopTypeId), "CURIO: Destination tile occupied");
        // Load troop onto Troop Transport at target tile
        gs().troopIdMap[_targetTile.occupantId].cargoTroopIds.push(_troopId);
    }

    function battleBaseModule(uint256 _troopId, Position memory _targetPos) public {
        Troop memory _troop = gs().troopIdMap[_troopId];
        //Fixme: replace withinDist with withinFiringDist
        require(Util._withinDist(_troop.pos, _targetPos, 1), "CURIO: Target not in Firing Range");
        gs().troopIdMap[_troopId].largeActionTakenThisEpoch = true;

        Tile memory _targetTile = Util._getTileAt(_targetPos);

        uint256 _targetAttackFactor;
        uint256 _targetDefenseFactor;
        uint256 _targetDamagePerHit;
        uint256 _targetHealth;
        Base memory _targetBase;

        require(_targetTile.baseId != 0, "CURIO: No target to attack");

        _targetBase = gs().baseIdMap[_targetTile.baseId];
        require(_targetBase.owner != msg.sender, "CURIO: Cannot attack own base");

        _targetAttackFactor = _targetBase.attackFactor;
        _targetDefenseFactor = _targetBase.defenseFactor;
        _targetDamagePerHit = 0;
        _targetHealth = _targetBase.health;

        _targetBase = gs().baseIdMap[_targetTile.baseId];

        // Loop till one side dies
        uint256 _salt = 0;
        while (_troop.health > 0) {
            // Troop attacks target
            _salt += 1;
            if (Util._strike(_targetAttackFactor, _salt)) {
                uint256 _damagePerHit = Util._getDamagePerHit(_troop.troopTypeId);
                if (_damagePerHit < _targetHealth) {
                    _targetHealth -= _damagePerHit;
                } else {
                    _targetHealth = 0;
                    Util._removeTroop(_targetPos, _targetTile.occupantId);
                    emit Util.Death(Util._getBaseOwner(_targetTile.occupantId), _targetTile.occupantId);
                }
            }

            if (_targetHealth == 0) break; // target cannot attack back if it has zero health

            // Target attacks troop
            _salt += 1;
            if (Util._strike(_targetDefenseFactor, _salt)) {
                // enemy troop attacks back
                if (_targetDamagePerHit < _troop.health) {
                    _troop.health -= _targetDamagePerHit;
                } else {
                    _troop.health = 0;
                    Util._removeTroop(_troop.pos, _troopId);
                    emit Util.Death(msg.sender, _troopId);
                }
            }
        }

        if (_troop.health == 0) {
            // Troop survives
            gs().troopIdMap[_troopId].health = _troop.health;
            gs().baseIdMap[_targetTile.baseId].health = 0;
            _targetBase = Util._getBase(_targetTile.baseId);

            if (!Util._isLandTroop(_troop.troopTypeId)) {
                emit Util.AttackedBase(msg.sender, _troopId, _troop, _targetTile.baseId, _targetBase);
            } else {
                // Move, capture, end production
                gs().map[_troop.pos.x][_troop.pos.y].occupantId = 0;
                gs().troopIdMap[_troopId].pos = _targetPos;
                gs().baseIdMap[_targetTile.baseId].owner = msg.sender;
                gs().baseIdMap[_targetTile.baseId].health = 1; // FIXME: change to BaseConstants.maxHealth
                delete gs().baseProductionMap[_targetTile.baseId];

                emit Util.BaseCaptured(msg.sender, _troopId, _targetTile.baseId);
            }
        } else {
            // Target survives
            gs().baseIdMap[_targetTile.baseId].health = _targetHealth;
            _targetBase = Util._getBase(_targetTile.baseId);

            emit Util.AttackedBase(msg.sender, _troopId, _troop, _targetTile.baseId, _targetBase);
        }
    }

    function battleTroopModule(uint256 _troopId, Position memory _targetPos) public {
        Troop memory _troop = gs().troopIdMap[_troopId];
        //Fixme: replace withinDist with withinFiringDist
        require(Util._withinDist(_troop.pos, _targetPos, 1), "CURIO: Target not in Firing Range");
        gs().troopIdMap[_troopId].largeActionTakenThisEpoch = true;

        Tile memory _targetTile = Util._getTileAt(_targetPos);

        uint256 _targetAttackFactor;
        uint256 _targetDefenseFactor;
        uint256 _targetDamagePerHit;
        uint256 _targetHealth;
        Troop memory _targetTroop;

        _targetTroop = gs().troopIdMap[_targetTile.occupantId];
        require(_targetTroop.owner != msg.sender, "CURIO: Cannot attack own troop");

        _targetAttackFactor = Util._getAttackFactor(_targetTroop.troopTypeId);
        _targetDefenseFactor = Util._getDefenseFactor(_targetTroop.troopTypeId);
        _targetDamagePerHit = Util._getDamagePerHit(_targetTroop.troopTypeId);
        _targetHealth = _targetTroop.health;

        // Loop till one side dies
        uint256 _salt = 0;
        while (_troop.health > 0) {
            // Troop attacks target
            _salt += 1;
            if (Util._strike(_targetAttackFactor, _salt)) {
                uint256 _damagePerHit = Util._getDamagePerHit(_troop.troopTypeId);
                if (_damagePerHit < _targetHealth) {
                    _targetHealth -= _damagePerHit;
                } else {
                    _targetHealth = 0;
                    Util._removeTroop(_targetTroop.pos, _targetTile.occupantId);
                    emit Util.Death(_targetTroop.owner, _targetTile.occupantId);
                }
            }

            if (_targetHealth == 0) break; // target cannot attack back if it has zero health

            // Target attacks troop
            _salt += 1;
            if (Util._strike(_targetDefenseFactor, _salt)) {
                // enemy troop attacks back
                if (_targetDamagePerHit < _troop.health) {
                    _troop.health -= _targetDamagePerHit;
                } else {
                    _troop.health = 0;
                    Util._removeTroop(_troop.pos, _troopId);
                    emit Util.Death(msg.sender, _troopId);
                }
            }
        }

        if (Util._getTroop(_troopId).owner == msg.sender) {
            // Troop survives
            gs().troopIdMap[_troopId].health = _troop.health;
            _troop = Util._getTroop(_troopId);

            _targetTroop = Util._getTroop(_targetTile.occupantId);

            emit Util.AttackedTroop(msg.sender, _troopId, _troop, _targetTile.occupantId, _targetTroop);
        } else {
            // Target survives
            gs().troopIdMap[_targetTile.occupantId].health = _targetHealth;

            _targetTroop = Util._getTroop(_targetTile.occupantId);

            emit Util.AttackedTroop(msg.sender, _troopId, _troop, _targetTile.occupantId, _targetTroop);
        }
    }
}
