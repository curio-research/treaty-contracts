//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Base, Player, Position, Tile, Troop, WorldConstants, TroopType} from "contracts/libraries/Types.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import "contracts/libraries/Storage.sol";
import "forge-std/console.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from the frontend

contract GetterFacet is UseStorage {
    function bulkGetAllTroops() external view returns (Troop[] memory) {
        Troop[] memory _allTroops = new Troop[](gs().troopNonce - 1);

        console.log(gs().troopNonce);
        for (uint256 i = 0; i < gs().troopNonce - 1; i++) {
            _allTroops[i] = gs().troopIdMap[gs().troopIds[i]];
        }

        return _allTroops;
    }

    // Fetch tile map in NxN chunks.
    function getMapChunk(Position memory _startPos) external view returns (Tile[] memory, Position[] memory) {
        uint256 _interval = gs().worldConstants.mapInterval;

        Tile[] memory _allTiles = new Tile[](_interval * _interval);
        Position[] memory _allPos = new Position[](_interval * _interval);

        uint256 _nonce = 0;
        for (uint256 x = _startPos.x; x < _startPos.x + _interval; x++) {
            for (uint256 y = _startPos.y; y < _startPos.y + _interval; y++) {
                Position memory _pos = Position({x: x, y: y});
                _allTiles[_nonce] = gs().map[x][y];
                _allPos[_nonce] = _pos;
                _nonce += 1;
            }
        }

        return (_allTiles, _allPos);
    }

    function getTileAt(Position memory _pos) external view returns (Tile memory) {
        return Util._getTileAt(_pos);
    }

    function getBase(uint256 _id) external view returns (Base memory) {
        return gs().baseIdMap[_id];
    }

    function getTroopAt(Position memory _pos) external view returns (Troop memory) {
        return gs().troopIdMap[Util._getTileAt(_pos).occupantId];
    }

    function getTroop(uint256 _troopId) external view returns (Troop memory) {
        return gs().troopIdMap[_troopId];
    }

    function getTroopType(uint256 _troopTypeId) external view returns (TroopType memory) {
        return gs().troopTypeIdMap[_troopTypeId];
    }

    function getBaseAt(Position memory _pos) external view returns (Base memory) {
        return gs().baseIdMap[Util._getTileAt(_pos).baseId];
    }

    function getWorldConstants() external view returns (WorldConstants memory) {
        return gs().worldConstants;
    }

    function getEpoch() external view returns (uint256) {
        return gs().epoch;
    }

    function getPlayer(address _addr) external view returns (Player memory) {
        return gs().playerMap[_addr];
    }

    function getBaseNonce() external view returns (uint256) {
        return gs().baseNonce;
    }

    // _startId: inclusive
    // endId: inclusive
    function getBulkBase(uint256 _startId, uint256 _endId) external view returns (Base[] memory) {
        Base[] memory bases = new Base[](_endId - _startId + 1);

        for (uint256 i = _startId; i < _endId; i++) {
            bases[i] = gs().baseIdMap[i];
        }

        return bases;
    }
}
