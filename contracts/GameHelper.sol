//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./GameTypes.sol";

// game helpers with calculations
// probably will contain mostly pure functions

library Helper {
    using SafeMath for uint256;

    // // the only contract that should call functions relating to getGameStorage() and s() is GameStorage
    // // because we know that the gameStorage lives in slot1.
    // function getGameStorage()
    //     public
    //     pure
    //     returns (GameTypes.GameStorage storage ret)
    // {
    //     bytes32 position = bytes32(uint256(1));
    //     assembly {
    //         ret.slot := position
    //     }
    // }

    // // alias for accessing storage vars
    // function s() public pure returns (GameTypes.GameStorage storage ret) {
    //     ret = getGameStorage();
    // }

    // check if its within a distance (need to refactor into distance)
    // allow character to only move 1 block at a time in either x or y direction
    function _withinDistance(
        GameTypes.Position memory p1,
        GameTypes.Position memory p2,
        uint256 _dist
    ) public pure returns (bool) {
        uint256 _xDist = p1.x >= p2.x ? p1.x - p2.x : p2.x - p1.x;
        uint256 _yDist = p1.y >= p2.y ? p1.y - p2.y : p2.y - p1.y;
        return _xDist <= _dist && _yDist <= _dist;
    }

    function _encodePos(GameTypes.Position memory _position)
        public
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(_position.x, _position.y));
    }
}
