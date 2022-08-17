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

    function getTileAt(Position memory _pos) external view returns (Tile memory) {
        return Util._getTileAt(_pos);
    }

    function getWorldConstants() external view returns (WorldConstants memory) {
        return gs().worldConstants;
    }

    function isPlayerInitialized(address _player) external view returns (bool) {
        return Util._isPlayerInitialized(_player);
    }

    function getPlayerCount() external view returns (uint256) {
        return Util._getPlayerCount();
    }
}
