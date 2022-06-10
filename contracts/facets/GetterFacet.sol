//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Position, Tile, Troop} from "contracts/libraries/Types.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import "contracts/libraries/Storage.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from the frontend

contract GetterFacet is UseStorage {
    function bulkGetAllTroops() external view returns (Troop[] memory) {
        Troop[] memory _allTroops = new Troop[](gs().troopNonce);

        for (uint256 i = 0; i < gs().troopNonce; i++) {
            _allTroops[i] = gs().troopIdMap[gs().troopIds[i]];
        }

        return _allTroops;
    }

    // Fetch tile map in NxN chunks.
    function _getMapChunk(Position memory _pos) external view returns (Tile[] memory, Position[] memory) {
        uint256 _interval = gs().worldConstants.mapInterval;

        Tile[] memory _allTiles = new Tile[](_interval * _interval);
        Position[] memory _allPos = new Position[](_interval * _interval);

        uint256 _nonce = 0;
        for (uint256 x = _pos.x; x < _pos.x + _interval; x++) {
            for (uint256 y = _pos.y; y < _pos.y + _interval; y++) {
                Position memory _tempPos = Position({x: x, y: y});
                _allTiles[_nonce] = gs().map[_pos.x][_pos.y];
                _allPos[_nonce] = _tempPos;
                _nonce += 1;
            }
        }

        return (_allTiles, _allPos);
    }

    // // this is called after _getMap is called. used to fetch metadata around blocks
    // function _getBlockChunkData(Position memory _pos) external view returns (BlockData[] memory, Position[] memory) {
    //     uint256 interval = gs().worldConstants.getMapInterval;

    //     BlockData[] memory allBlockChunkData = new BlockData[](interval * interval);
    //     Position[] memory allPos = new Position[](interval * interval);

    //     uint256 nonce = 0;
    //     for (uint256 x = _pos.x; x < _pos.x + interval; x++) {
    //         for (uint256 y = _pos.y; y < _pos.y + interval; y++) {
    //             Position memory _tempPos = Position({x: x, y: y});
    //             allBlockChunkData[nonce] = GameUtils._getBlockDataAtPos(_tempPos);
    //             allPos[nonce] = _tempPos;
    //             nonce += 1;
    //         }
    //     }

    //     return (allBlockChunkData, allPos);
    // }
}
