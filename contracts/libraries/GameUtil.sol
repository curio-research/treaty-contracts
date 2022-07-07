//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {BASE_NAME, Base, GameState, Player, Position, TERRAIN, Tile, Troop, WorldConstants} from "contracts/libraries/Types.sol";
import {LibStorage} from "contracts/libraries/Storage.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

// Note: Util functions generally do not verify correctness of conditions. Make sure to verify in higher-level functions such as those in Engine.
library Util {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    event NewPlayer(address _player, Position _pos);
    event UpdatePlayerBalance(address _player, uint256 _amount);
    event Moved(address _player, uint256 _troopId, uint256 _epoch, Position _startPos, Position _targetPos);
    event AttackedTroop(address _player, uint256 _troopId, Troop _troopInfo, uint256 _targetTroopId, Troop _targetTroopInfo);
    event AttackedBase(address _player, uint256 _troopId, Troop _troopInfo, uint256 _targetBaseId, Base _targetBaseInfo);
    event Death(address _player, uint256 _troopId);
    event BaseCaptured(address _player, uint256 _troopId, uint256 _baseId);
    event NewTroop(address _player, uint256 _troopId, Troop _troop, Position _pos);
    event Repaired(address _player, uint256 _troopId, uint256 _health);
    event Recovered(address _player, uint256 _troopId);

    // ----------------------------------------------------------
    // Game-related
    // ----------------------------------------------------------

    // Setters

    function _updatePlayerBalance(address _addr) public {
        Player memory _player = gs().playerMap[_addr];
        uint256 _timeElapsed = block.timestamp - _player.balanceLastUpdated;

        if (_player.totalGoldGenerationPerUpdate >= _player.totalTroopExpensePerUpdate) {
            // Gain
            _player.balance += (_player.totalGoldGenerationPerUpdate - _player.totalTroopExpensePerUpdate) * _timeElapsed;
        } else {
            // Loss
            uint256 _reduction = (_player.totalTroopExpensePerUpdate - _player.totalGoldGenerationPerUpdate) * _timeElapsed;
            if (_reduction >= _player.balance) {
                _player.balance = 0;
                _player.active = false; // optional
            } else {
                _player.balance -= _reduction;
            }
        }

        _player.balanceLastUpdated = block.timestamp;
        gs().playerMap[_addr] = _player;

        emit UpdatePlayerBalance(_addr, _player.balance);
    }

    function _unloadTroopFromTransport(uint256 _troopTransportId, uint256 _cargoTroopId) public {
        uint256[] memory _cargoTroopIds = gs().troopIdMap[_troopTransportId].cargoTroopIds;
        uint256 _cargoSize = _cargoTroopIds.length;
        uint256 _index = 0;
        while (_index < _cargoSize) {
            if (_cargoTroopIds[_index] == _cargoTroopId) break;
            _index++;
        }

        gs().troopIdMap[_troopTransportId].cargoTroopIds[_index] = _cargoTroopIds[_cargoSize - 1];
        gs().troopIdMap[_troopTransportId].cargoTroopIds.pop();
    }

    function _initializeTile(Position memory _pos) public {
        WorldConstants memory _worldConstants = gs().worldConstants;
        uint256 _batchSize = _worldConstants.initBatchSize;
        uint256 _numInitTerrainTypes = _worldConstants.numInitTerrainTypes;

        uint256 _encodedCol = gs().encodedColumnBatches[_pos.x][_pos.y / _batchSize] % (_numInitTerrainTypes**((_pos.y % _batchSize) + 1));
        uint256 _divFactor = _numInitTerrainTypes**(_pos.y % _batchSize);
        uint256 _terrainId = _encodedCol / _divFactor;

        if (_terrainId >= 3) {
            // Note: temporary way to set base
            BASE_NAME _baseName = _terrainId == 3 ? BASE_NAME.PORT : BASE_NAME.CITY;
            _addBase(_pos, _baseName);
            _terrainId -= 3;
        }

        gs().map[_pos.x][_pos.y].isInitialized = true;
        gs().map[_pos.x][_pos.y].terrain = TERRAIN(_terrainId);
    }

    function _removeTroop(
        address _owner,
        Position memory _pos,
        uint256 _troopId
    ) public {
        // TODO: consider whether or not to remove Troop from gs().troops
        uint256 _totalTroopExpensePerUpdate = gs().playerMap[_owner].totalTroopExpensePerUpdate;

        Troop memory _troop = _getTroop(_troopId);
        for (uint256 i = 0; i < _troop.cargoTroopIds.length; i++) {
            uint256 _cargoId = _troop.cargoTroopIds[i];
            _totalTroopExpensePerUpdate -= _getExpensePerSecond(_getTroop(_cargoId).troopTypeId);
            delete gs().troopIdMap[_cargoId];
        }

        _totalTroopExpensePerUpdate -= _getExpensePerSecond(_troop.troopTypeId);
        delete gs().troopIdMap[_troopId];

        _updatePlayerBalance(_owner);
        gs().playerMap[_owner].totalTroopExpensePerUpdate = _totalTroopExpensePerUpdate;

        Tile memory _tile = _getTileAt(_troop.pos);
        if (_canTransportTroop(_tile)) {
            _unloadTroopFromTransport(_tile.occupantId, _troopId);
        } else {
            delete gs().map[_pos.x][_pos.y].occupantId;
        }
    }

    function _addTroop(
        address _owner,
        Position memory _pos,
        uint256 _troopTypeId
    ) public returns (uint256, Troop memory) {
        uint256[] memory _cargoTroopIds;
        Troop memory _troop = Troop({owner: _owner, troopTypeId: _troopTypeId, lastMoved: block.timestamp, lastLargeActionTaken: block.timestamp, lastRepaired: block.timestamp, health: _getMaxHealth(_troopTypeId), pos: _pos, cargoTroopIds: _cargoTroopIds});

        uint256 _troopId = gs().troopNonce;
        gs().troopIds.push(_troopId);
        gs().troopIdMap[_troopId] = _troop;
        gs().troopNonce++;
        gs().map[_pos.x][_pos.y].occupantId = _troopId;

        _updatePlayerBalance(_owner);
        gs().playerMap[_owner].totalTroopExpensePerUpdate += _getExpensePerSecond(_troopTypeId);

        return (_troopId, gs().troopIdMap[_troopId]);
    }

    function _addBase(Position memory _pos, BASE_NAME _baseName) public returns (uint256) {
        Base memory _base = Base({
            owner: address(0),
            name: _baseName,
            attackFactor: 100,
            defenseFactor: 100,
            health: 1, // FIXME: change to base constants
            goldGenerationPerSecond: gs().worldConstants.defaultBaseGoldGenerationPerSecond
        });

        uint256 _baseId = gs().baseNonce;
        gs().baseIds.push(_baseId);
        gs().baseIdMap[_baseId] = _base;
        gs().baseNonce += 1;
        gs().map[_pos.x][_pos.y].baseId = _baseId;

        return _baseId;
    }

    // Getters

    function _getPlayerBalance(address _player) public view returns (uint256) {
        return gs().playerMap[_player].balance;
    }

    function _getTotalGoldGenerationPerUpdate(address _player) public view returns (uint256) {
        return gs().playerMap[_player].totalGoldGenerationPerUpdate;
    }

    function _getCargoCapacity(uint256 _troopId) public view returns (uint256) {
        return gs().troopTypeIdMap[gs().troopIdMap[_troopId].troopTypeId].cargoCapacity;
    }

    function _getTroop(uint256 _id) public view returns (Troop memory) {
        return gs().troopIdMap[_id];
    }

    function _getExpensePerSecond(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].expensePerSecond;
    }

    function _getMaxHealth(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].maxHealth;
    }

    function _getTroopCost(uint256 _troopTypeId) public view returns (uint256) {
        return gs().troopTypeIdMap[_troopTypeId].cost;
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

    function _isLandTroop(uint256 _troopTypeId) public view returns (bool) {
        return gs().troopTypeIdMap[_troopTypeId].isLandTroop;
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
        return (_getCargoCapacity(_tile.occupantId) > 0) && (gs().troopIdMap[_tile.occupantId].cargoTroopIds.length < _getCargoCapacity(_tile.occupantId));
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
        // FIXME: use truly random from Chainlink VRF or equivalent
        return uint256(keccak256(abi.encode(block.timestamp, block.difficulty, _salt))) % _max;
    }

    // ----------------------------------------------------------
    // Platonian
    // ----------------------------------------------------------

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
}
