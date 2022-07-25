<<<<<<< HEAD
=======
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {BASE_NAME, Base, GameState, Player, Position, TERRAIN, Tile, Troop, Army, WorldConstants, TROOP_NAME} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Util library
/// @notice Contains all events as well as lower-level setters and getters
/// Util functions generally do not verify correctness of conditions. Make sure to verify in higher-level functions such as those in Engine.

library Util {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    // ----------------------------------------------------------
    // EVENTS
    // ----------------------------------------------------------

    event AttackedBase(address _player, uint256 _armyId, Army _armyInfo, uint256 _targetBaseId, Base _targetBaseInfo);
    event AttackedArmy(address _player, uint256 _armyId, Army _armyInfo, uint256 _targetArmy, Army _targetArmyInfo);
    event BaseCaptured(address _player, uint256 _troopId, uint256 _baseId);
    event TroopDeath(address _player, uint256 _troopId);
    // temporary
    event ArmyDeath(address _player, uint256 _armyId);
    event GamePaused();
    event GameResumed();
    event Moved(address _player, uint256 _troopId, uint256 _timestamp, Position _startPos, Position _targetPos);
    event NewPlayer(address _player, Position _pos);
    event NewTroop(address _player, uint256 _armyId, Army _army, Position _pos);
    event PlayerInfo(address _addr, Player _player);
    event PlayerReactivated(address _player);
    event Recovered(address _player, uint256 _troopId);
    event Repaired(address _player, uint256 _troopId, uint256 _health);
    event UpdatePlayerBalance(address _player, uint256 _amount);

    // ----------------------------------------------------------
    // SETTERS
    // ----------------------------------------------------------

    function _initializeTile(Position memory _pos) public {
        WorldConstants memory _worldConstants = gs().worldConstants;
        uint256 _batchSize = _worldConstants.initBatchSize;
        uint256 _numInitTerrainTypes = _worldConstants.numInitTerrainTypes;

        uint256 _encodedCol = gs().encodedColumnBatches[_pos.x][_pos.y / _batchSize] % (_numInitTerrainTypes**((_pos.y % _batchSize) + 1));
        uint256 _divFactor = _numInitTerrainTypes**(_pos.y % _batchSize);
        uint256 _terrainId = _encodedCol / _divFactor;

        if (_terrainId >= 3) {
            BASE_NAME _baseName = BASE_NAME(_terrainId - 3);
            _addBase(_pos, _baseName);

            if (BASE_NAME(_terrainId - 3) == BASE_NAME.OIL_WELL) {
                _terrainId = 0;
            } else {
                _terrainId -= 3;
            }
        }

        gs().map[_pos.x][_pos.y].isInitialized = true;
        gs().map[_pos.x][_pos.y].terrain = TERRAIN(_terrainId);
    }

    function _updatePlayerBalances(address _addr) public {
        Player memory _player = gs().playerMap[_addr];
        uint256 _timeElapsed = block.timestamp - _player.balanceLastUpdated;

        // Update gold balance
        _player.goldBalance += _player.totalGoldGenerationPerUpdate * _timeElapsed;

        // Update oil balance
        if (_player.totalOilGenerationPerUpdate >= _player.totalOilConsumptionPerUpdate) {
            // Gain
            _player.oilBalance += (_player.totalOilGenerationPerUpdate - _player.totalOilConsumptionPerUpdate) * _timeElapsed;
        } else {
            // Loss
            uint256 _reduction = (_player.totalOilConsumptionPerUpdate - _player.totalOilGenerationPerUpdate) * _timeElapsed;
            if (_reduction >= _player.oilBalance) {
                _player.oilBalance = 0;
                // _player.active = false; // Note: disabled for now, allowing negative balances
            } else {
                _player.oilBalance -= _reduction;
            }
        }

        _player.balanceLastUpdated = block.timestamp;
        gs().playerMap[_addr] = _player;
    }

    function _unloadArmyFromTransport(uint256 _troopTransportId) public {
        // todo: unload army and update state
        gs().troopIdMap[_troopTransportId].cargoArmyId = _NULL();
    }

    function _removeEntireArmy(uint256 _armyId) public {
        Army memory _army = _getArmy(_armyId);
        address _owner = _army.owner;
        Position memory _pos = _army.pos;

        uint256 _numOwnedTroops = gs().playerMap[_owner].numOwnedTroops;
        uint256 _totalOilConsumptionPerUpdate = gs().playerMap[_owner].totalOilConsumptionPerUpdate;

        for (uint256 i = 0; i < _army.armyTroopIds.length; i++) {
            uint256 _troopId = _army.armyTroopIds[i];

            _numOwnedTroops--;
            _totalOilConsumptionPerUpdate -= _getArmyOilConsumptionPerSecond(_army.armyTroopIds);
            delete gs().troopIdMap[_troopId];
        }

        delete gs().armyIdMap[_armyId];

        _updatePlayerBalances(_owner);
        gs().playerMap[_owner].numOwnedTroops = _numOwnedTroops;
        gs().playerMap[_owner].totalOilConsumptionPerUpdate = _totalOilConsumptionPerUpdate;

        Tile memory _tile = _getTileAt(_army.pos);
        Army memory _tileArmy = _getArmy(_tile.occupantId);
        uint256 _troopTransportId = _getTransportFromArmyTroops(_tileArmy.armyTroopIds);
        if (_troopTransportId != _NULL()) {
            // army 1 is empty but "army 2" has transport => army 1 was on army 2
            _unloadArmyFromTransport(_troopTransportId);
        } else {
            gs().map[_pos.x][_pos.y].occupantId = _NULL();
        }
    }

    function _removeArmyOnly(uint256 _armyId) public {
        // used when detaching army
        Army memory _army = _getArmy(_armyId);
        Position memory _pos = _army.pos;

        delete gs().armyIdMap[_armyId];
        Tile memory _tile = _getTileAt(_army.pos);
        Army memory _tileArmy = _getArmy(_tile.occupantId);
        uint256 _troopTransportId = _getTransportFromArmyTroops(_tileArmy.armyTroopIds);
        if (_troopTransportId != _NULL()) {
            // army 1 is empty but "army 2" has transport => army 1 was on army 2
            _unloadArmyFromTransport(_troopTransportId);
        } else {
            gs().map[_pos.x][_pos.y].occupantId = _NULL();
        }
    }

    function _removeTroop(uint256 _troopId) public {
        Troop memory _troop = _getTroop(_troopId);
        Army memory _army = _getArmy(_troop.armyId);

        address _owner = _army.owner;
        Position memory _pos = _army.pos;

        uint256 _numOwnedTroops = gs().playerMap[_owner].numOwnedTroops;
        uint256 _totalOilConsumptionPerUpdate = gs().playerMap[_owner].totalOilConsumptionPerUpdate;

        // remove carried army if it's transport
        if (_troop.cargoArmyId != 0) {
            _numOwnedTroops--;
            _totalOilConsumptionPerUpdate -= _getOilConsumptionPerSecond(_getTroop(_troop.cargoArmyId).troopTypeId);
            delete gs().armyIdMap[_troop.cargoArmyId];
        }

        _numOwnedTroops--;
        _totalOilConsumptionPerUpdate -= _getOilConsumptionPerSecond(_troop.troopTypeId);
        delete gs().troopIdMap[_troopId];

        _updatePlayerBalances(_owner);
        gs().playerMap[_owner].numOwnedTroops = _numOwnedTroops;
        gs().playerMap[_owner].totalOilConsumptionPerUpdate = _totalOilConsumptionPerUpdate;

        // remove troop from armyTroopIds
        uint256 _armyTroopSize = _army.armyTroopIds.length;
        uint256 _index = 0;
        while (_index < _armyTroopSize) {
            if (_army.armyTroopIds[_index] == _troopId) break;
            _index++;
        }

        gs().armyIdMap[_troop.armyId].armyTroopIds[_index] = _army.armyTroopIds[_armyTroopSize - 1];
        gs().armyIdMap[_troop.armyId].armyTroopIds.pop();

        Tile memory _tile = _getTileAt(_pos);
        Army memory _tileArmy = _getArmy(_tile.occupantId);
        // deal with when army contains zero troop; either remove army from transport or tile
        uint256 _troopTransportId;
        if (gs().armyIdMap[_troop.armyId].armyTroopIds.length == 0) {
            _troopTransportId = _getTransportFromArmyTroops(_tileArmy.armyTroopIds);
            if (_troopTransportId != _NULL()) {
                // army 1 is empty but "army 2" has transport => army 1 was on army 2
                _unloadArmyFromTransport(_troopTransportId);
            } else {
                gs().map[_pos.x][_pos.y].occupantId = _NULL();
            }
        }
    }

    function _addTroop(
        address _owner,
        Position memory _pos,
        uint256 _troopTypeId
    ) public returns (uint256, Army memory) {
        require(_getPlayer(_owner).numOwnedTroops < gs().worldConstants.maxTroopCountPerPlayer, "CURIO: Max troop count exceeded");

        // Generate Troop and Army id
        uint256 _troopId = gs().troopNonce;
        gs().troopIds.push(_troopId);
        gs().troopNonce++;

        uint256 _armyId = gs().armyNonce;
        gs().armyIds.push(_armyId);
        gs().armyNonce++;
        gs().map[_pos.x][_pos.y].occupantId = _armyId;

        Troop memory _troop = Troop({armyId: _armyId, troopTypeId: _troopTypeId, health: _getMaxHealth(_troopTypeId), lastRepaired: block.timestamp, cargoArmyId: 0});

        uint256[] memory _armyTroopIds;
        Army memory _army = Army({owner: _owner, armyTroopIds: _armyTroopIds, lastMoved: block.timestamp, lastLargeActionTaken: block.timestamp, pos: _pos});

        // Update mappings
        gs().troopIdMap[_troopId] = _troop;
        gs().armyIdMap[_armyId] = _army;

        // Update balances
        _updatePlayerBalances(_owner);
        gs().playerMap[_owner].numOwnedTroops++;
        gs().playerMap[_owner].totalOilConsumptionPerUpdate += _getOilConsumptionPerSecond(_troopTypeId);

        return (_armyId, gs().armyIdMap[_armyId]);
    }

    function _addBase(Position memory _pos, BASE_NAME _baseName) public returns (uint256) {
        bool _isOilWell = _baseName == BASE_NAME.OIL_WELL;
        uint256 _goldGenerationPerSecond = _isOilWell ? 0 : gs().worldConstants.defaultBaseGoldGenerationPerSecond;
        uint256 _oilGenerationPerSecond = _isOilWell ? gs().worldConstants.defaultWellOilGenerationPerSecond : 0;

        Base memory _base = Base({
            owner: address(0),
            name: _baseName,
            attackFactor: 100,
            defenseFactor: 100,
            health: 1,
            goldGenerationPerSecond: _goldGenerationPerSecond,
            oilGenerationPerSecond: _oilGenerationPerSecond,
            pos: _pos //
        });

        uint256 _baseId = gs().baseNonce;
        gs().baseIds.push(_baseId);
        gs().baseIdMap[_baseId] = _base;
        gs().baseNonce += 1;
        gs().map[_pos.x][_pos.y].baseId = _baseId;

        return _baseId;
    }

    // ----------------------------------------------------------
    // GETTERS
    // ----------------------------------------------------------

    function _isPlayerInitialized(address _player) public view returns (bool) {
        address[] memory _allPlayers = gs().players;
        for (uint256 i = 0; i < _allPlayers.length; i++) {
            if (_allPlayers[i] == _player) return true;
        }
        return false;
    }

    function _getPlayerCount() public view returns (uint256) {
        return gs().players.length;
    }

    function _getPlayer(address _player) public view returns (Player memory) {
        return gs().playerMap[_player];
    }

    function _isPlayerActive(address _player) public view returns (bool) {
        return gs().playerMap[_player].active;
    }

    function _getPlayerGoldBalance(address _player) public view returns (uint256) {
        return gs().playerMap[_player].goldBalance;
    }

    function _getPlayerOilBalance(address _player) public view returns (uint256) {
        return gs().playerMap[_player].oilBalance;
    }

    function _getTotalGoldGenerationPerUpdate(address _player) public view returns (uint256) {
        return gs().playerMap[_player].totalGoldGenerationPerUpdate;
    }

    function _getTroop(uint256 _troopId) public view returns (Troop memory) {
        return gs().troopIdMap[_troopId];
    }

    function _getArmy(uint256 _armyId) public view returns (Army memory) {
        return gs().armyIdMap[_armyId];
    }

    function _getTransportFromArmyTroops(uint256[] memory _armyTroopIds) public view returns (uint256) {
        // pre-check ensures this function is called only when there is a transport
        for (uint256 i = 0; i < _armyTroopIds.length; i++) {
            if (gs().troopTypeIdMap[_getTroop(_armyTroopIds[i]).troopTypeId].name == TROOP_NAME.TROOP_TRANSPORT) return _armyTroopIds[i];
        }
        return _NULL();
    }

    function _getOilConsumptionPerSecond(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].oilConsumptionPerSecond;
    }

    function _getArmyOilConsumptionPerSecond(uint256[] memory _armyTroopIds) public view returns (uint256) {
        uint256 _ArmyOilConsumptionPerSecond;
        for (uint256 i = 0; i < _armyTroopIds.length; i++) {
            Troop memory _troop = _getTroop(_armyTroopIds[i]);
            _ArmyOilConsumptionPerSecond += _getOilConsumptionPerSecond(_troop.troopTypeId);
        }
        return _ArmyOilConsumptionPerSecond;
    }

    function _getMaxHealth(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].maxHealth;
    }

    function _getTroopGoldPrice(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].goldPrice;
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

    function _getMovementCooldown(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].movementCooldown;
    }

    function _getLargeActionCooldown(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].largeActionCooldown;
    }

    function _getArmyHealth(uint256[] memory _armyTroopIds) public view returns (uint256) {
        // take the sum
        uint256 _health;

        for (uint256 i = 0; i < _armyTroopIds.length; i++) {
            Troop memory _troop = _getTroop(_armyTroopIds[i]);
            uint256 _troopHealth = _getMaxHealth(_troop.troopTypeId);
            _health += _troopHealth;
        }
        return _health;
    }

    function _getArmyMovementCooldown(uint256[] memory _armyTroopIds) public view returns (uint256) {
        // take the longest cooldown
        uint256 _movementCooldown;

        for (uint256 i = 0; i < _armyTroopIds.length; i++) {
            Troop memory _troop = _getTroop(_armyTroopIds[i]);
            uint256 _troopMovementCooldown = _getMovementCooldown(_troop.troopTypeId);
            if (_troopMovementCooldown > _movementCooldown) {
                _movementCooldown = _troopMovementCooldown;
            }
        }
        return _movementCooldown;
    }

    function _getArmyLargeActionCooldown(uint256[] memory _armyTroopIds) public view returns (uint256) {
        // take the longest cooldown
        uint256 _largeActionCooldown;

        for (uint256 i = 0; i < _armyTroopIds.length; i++) {
            Troop memory _troop = _getTroop(_armyTroopIds[i]);
            uint256 _troopLargeActionCooldown = _getMovementCooldown(_troop.troopTypeId);
            if (_troopLargeActionCooldown > _largeActionCooldown) {
                _largeActionCooldown = _troopLargeActionCooldown;
            }
        }
        return _largeActionCooldown;
    }

    function _getArmyAttackFactor(uint256[] memory _armyTroopIds) public view returns (uint256) {
        // take the sum
        uint256 _attackFactor;

        for (uint256 i = 0; i < _armyTroopIds.length; i++) {
            Troop memory _troop = _getTroop(_armyTroopIds[i]);
            uint256 _troopAttackFactor = _getMovementCooldown(_troop.troopTypeId);
            _attackFactor += _troopAttackFactor;
        }
        return _attackFactor;
    }

    function _getArmyDefenseFactor(uint256[] memory _armyTroopIds) public view returns (uint256) {
        // take the sum
        uint256 _defenseFactor;

        for (uint256 i = 0; i < _armyTroopIds.length; i++) {
            Troop memory _troop = _getTroop(_armyTroopIds[i]);
            uint256 _troopDefenseFactor = _getMovementCooldown(_troop.troopTypeId);
            _defenseFactor += _troopDefenseFactor;
        }
        return _defenseFactor;
    }

    function _getArmyDamagePerHit(uint256[] memory _armyTroopIds) public view returns (uint256) {
        // take the sum
        uint256 _damagePerHit;

        for (uint256 i = 0; i < _armyTroopIds.length; i++) {
            Troop memory _troop = _getTroop(_armyTroopIds[i]);
            uint256 _troopDamagePerhit = _getMovementCooldown(_troop.troopTypeId);
            _damagePerHit += _troopDamagePerhit;
        }
        return _damagePerHit;
    }

    function _isLandTroop(uint256 _troopTypeId) public view returns (bool) {
        return gs().troopTypeIdMap[_troopTypeId].isLandTroop;
    }

    function _isLandArmy(uint256 _armyId) public view returns (bool) {
        Troop memory _troop = _getTroop(gs().armyIdMap[_armyId].armyTroopIds[0]);
        return _isLandTroop(_troop.troopTypeId);
    }

    function _getBaseHealth(uint256 _baseId) public view returns (uint256) {
        return gs().baseIdMap[_baseId].health;
    }

    function _getBaseOwner(uint256 _baseId) public view returns (address) {
        return gs().baseIdMap[_baseId].owner;
    }

    function _getBase(uint256 _id) external view returns (Base memory) {
        return gs().baseIdMap[_id];
    }

    function _canTransportTroop(Tile memory _tile) public view returns (bool) {
        // rule is that the army on that tile must have a troop transport
        //the troop transport is vacant; also that the carrying army must have up to one other troop
        Army memory _army = _getArmy(_tile.occupantId);
        uint256 _troopTransportId = _getTransportFromArmyTroops(_army.armyTroopIds);
        if (_troopTransportId != _NULL()) {
            return ((gs().troopIdMap[_troopTransportId].cargoArmyId == _NULL()) && _army.armyTroopIds.length < 2);
        } else {
            return false;
        }
    }

    function _hasPort(Tile memory _tile) public view returns (bool) {
        return _tile.baseId != _NULL() && gs().baseIdMap[_tile.baseId].name == BASE_NAME.PORT;
    }

    function _getTileAt(Position memory _pos) public view returns (Tile memory) {
        return gs().map[_pos.x][_pos.y];
    }

    function _strike(uint256 _strikeFactor, uint256 _salt) public view returns (bool) {
        uint256 _rand = _random(100, _salt);
        return _rand * 100 < _strikeFactor * gs().worldConstants.combatEfficiency;
    }

    function _inBound(Position memory _p) public view returns (bool) {
        return _p.x >= 0 && _p.x < gs().worldConstants.worldWidth && _p.y >= 0 && _p.y < gs().worldConstants.worldHeight;
    }

    function _random(uint256 _max, uint256 _salt) public view returns (uint256) {
        return uint256(keccak256(abi.encode(block.timestamp, block.difficulty, _salt))) % _max;
    }

    function _samePos(Position memory _p1, Position memory _p2) public pure returns (bool) {
        return _p1.x == _p2.x && _p1.y == _p2.y;
    }

    // Note: The current version treats a diagonal movement as two movements.
    // For treating as one, use `xDist <= _dist && yDist <= _dist` as return condition.
    function _withinDist(
        Position memory _p1,
        Position memory _p2,
        uint256 _dist
    ) public pure returns (bool) {
        uint256 _xDist = _p1.x >= _p2.x ? _p1.x - _p2.x : _p2.x - _p1.x;
        uint256 _yDist = _p1.y >= _p2.y ? _p1.y - _p2.y : _p2.y - _p1.y;
        return (_xDist + _yDist) <= _dist;
    }

    function _NULL() internal pure returns (uint256) {
        return 0;
    }

    function _NULLADRESS() internal pure returns (address) {
        return address(0);
    }
}
>>>>>>> 3e2cb96 (repair)
