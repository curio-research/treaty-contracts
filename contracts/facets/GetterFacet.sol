//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {Position, Tile, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/Component.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from the frontend

contract GetterFacet is UseStorage {
    using SafeMath for uint256;

    // ----------------------------------------------------------------------
    // ECS GETTERS (temp)
    // ----------------------------------------------------------------------

    function getComponent(string memory _name) external view returns (Component) {
        return Util._getComponent(_name);
    }

    function getComponentById(uint256 _id) external view returns (Component) {
        return Util._getComponentById(_id);
    }

    // ----------------------------------------------------------------------
    // GETTERS
    // ----------------------------------------------------------------------

    /**
     * Fetch tile map in NxN chunks, where N is the map interval.
     * @param _startPos top-left position of chunk
     */
    function getMapChunk(Position memory _startPos, uint256 _interval) external view returns (Tile[] memory, Position[] memory) {
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

    function getWorldConstants() external view returns (WorldConstants memory) {
        return gs().worldConstants;
    }

    function getPlayerCount() external view returns (uint256) {
        return Util._getPlayerCount();
    }
}
