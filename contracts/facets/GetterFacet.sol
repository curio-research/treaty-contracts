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

    // Debug Helpers
    function getEntitiesAddr() external view returns (address) {
        return gs().entities;
    }

    function getInventoryByCityAndType(uint256 _cityID, string memory _inventoryType) external returns (uint256) {
        uint256 _templateID = GameLib._getTemplateByInventoryType(_inventoryType);
        return GameLib._getInventory(_cityID, _templateID);
    }

    function getTemplateByInventoryType(string memory _inventoryType) external returns (uint256) {
        return GameLib._getTemplateByInventoryType(_inventoryType);
    }

    function getArmyConstituents(uint256 _armyID) external returns (uint256[] memory) {
        return GameLib._getArmyConstituents(_armyID);
    }

    function getCityGuard(uint256 _cityID) external returns (uint256) {
        return GameLib._getCityGuard(_cityID);
    }

    function getArmyAt(Position memory _position) external returns (uint256) {
        return GameLib._getArmyAt(_position);
    }

    ////////////

    function getComponent(string memory _name) external view returns (Component) {
        return ECSLib._getComponent(_name);
    }

    function getComponentById(uint256 _entity) external view returns (Component) {
        return ECSLib._getComponentByEntity(_entity);
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

    function getEntities() external view returns (uint256[] memory) {
        return Set(gs().entities).getAll();
    }

    function getCityAt(Position memory _position) external returns (uint256) {
        return GameLib._getCityAt(_position);
    }

    function getCityCenter(uint256 _cityID) external returns (uint256) {
        return GameLib._getCityCenter(_cityID);
    }

    function getSettlerAt(Position memory _position) external returns (uint256) {
        return GameLib._getSettlerAt(_position);
    }
}
