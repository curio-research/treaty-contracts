//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Set} from "contracts/Set.sol";
import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Position, Tile, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/Component.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from the frontend

contract GetterFacet is UseStorage {
    using SafeMath for uint256;
    uint256 private NULL = 0;

    function getComponent(string memory _name) external view returns (Component) {
        return ECSLib._getComponent(_name);
    }

    function getComponentById(uint256 _entity) external view returns (Component) {
        return ECSLib._getComponentByEntity(_entity);
    }

    function getTileAt(Position memory _pos) external view returns (Tile memory) {
        return GameLib._getMapTileAt(_pos);
    }

    function getWorldConstants() external view returns (WorldConstants memory) {
        return gs().worldConstants;
    }

    function isPlayerInitialized(address _player) external view returns (bool) {
        return gs().playerEntityMap[_player] != NULL;
    }

    function getPlayerCount() external view returns (uint256) {
        return gs().players.length;
    }

    function getPlayerId(address _player) external view returns (uint256) {
        return gs().playerEntityMap[_player];
    }

    function getEntity() external view returns (uint256) {
        Set _entities = Set(gs().entities);
        return _entities.size();
    }

    function getTemplateId(string memory _inventoryType) external returns (uint256) {
        return GameLib._getTemplateByInventoryType(_inventoryType);
    }
}
