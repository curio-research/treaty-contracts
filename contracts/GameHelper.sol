//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {Position} from "./GameTypes.sol";

// game helpers with calculations
// probably will contain mostly pure functions

library Helper {
    using SafeMath for uint256;

    // check if its within a distance (need to refactor into distance)
    // allow character to only move 1 block at a time in either x or y direction
    function _withinDistance(
        Position memory p1,
        Position memory p2,
        uint256 _dist
    ) public pure returns (bool) {
        uint256 _xDist = p1.x >= p2.x ? p1.x - p2.x : p2.x - p1.x;
        uint256 _yDist = p1.y >= p2.y ? p1.y - p2.y : p2.y - p1.y;
        return _xDist <= _dist && _yDist <= _dist;
    }

    function _encodePos(Position memory _position) public pure returns (string memory) {
        return string(abi.encodePacked(_position.x, _position.y));
    }
}
