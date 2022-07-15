//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {Base, Player, Position, Tile, Troop, WorldConstants, TroopType} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from the frontend

contract GetterFacet is UseStorage {
    using SafeMath for uint256;

    function bulkGetAllTroops() external view returns (Troop[] memory) {
        Troop[] memory _allTroops = new Troop[](gs().troopNonce - 1);

        for (uint256 i = 0; i < gs().troopNonce - 1; i++) {
            _allTroops[i] = gs().troopIdMap[gs().troopIds[i]];
        }

        return _allTroops;
    }

    // _startId: inclusive
    // _endId: inclusive
    function getBulkBase(uint256 _startId, uint256 _endId) external view returns (Base[] memory) {
        Base[] memory _bases = new Base[](_endId - _startId + 1);

        for (uint256 i = 0; i < _endId - _startId + 1; i++) {
            _bases[i] = gs().baseIdMap[i + _startId];
        }

        return _bases;
    }

    // _startId: inclusive
    // _endId: inclusive
    function getBulkTroopTypes(uint256 _startId, uint256 _endId) external view returns (TroopType[] memory) {
        TroopType[] memory _troops = new TroopType[](_endId - _startId + 1);

        for (uint256 i = 0; i < _endId - _startId + 1; i++) {
            _troops[i] = gs().troopTypeIdMap[i + _startId];
        }

        return _troops;
    }

    /**
     * Fetch tile map in NxN chunks, where N is the map interval.
     * @param _startPos top-left position of chunk
     */
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
        return Util._getBase(_id);
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

    function getPlayer(address _addr) external view returns (Player memory) {
        return Util._getPlayer(_addr);
    }

    function getBaseNonce() external view returns (uint256) {
        return gs().baseNonce;
    }
}
