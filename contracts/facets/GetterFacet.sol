//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Set} from "contracts/Set.sol";
import {UseStorage} from "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Position, WorldConstants} from "contracts/libraries/Types.sol";
import {Component} from "contracts/Component.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from the frontend

contract GetterFacet is UseStorage {
    uint256 private NULL = 0;

    // Debug Helpers
    function playersAndIdsMatch(address[] memory players, uint256[] memory playerIDs) external view returns (bool) {
        if (players.length != playerIDs.length) {
            return false;
        }
        for (uint256 i = 0; i < players.length; i++) {
            if (gs().playerEntityMap[players[i]] != playerIDs[i]) {
                return false;
            }
        }
        return true;
    }

    function getEntitiesAddr() external view returns (address) {
        return gs().entities;
    }

    function getInventoryByCityAndType(uint256 _cityID, string memory _inventoryType) external view returns (uint256) {
        uint256 _templateID = GameLib.getTemplateByInventoryType(_inventoryType);
        return GameLib.getInventory(_cityID, _templateID);
    }

    function getTemplateByInventoryType(string memory _inventoryType) external view returns (uint256) {
        return GameLib.getTemplateByInventoryType(_inventoryType);
    }

    function getConstituents(uint256 _armyID) external view returns (uint256[] memory) {
        return GameLib.getConstituents(_armyID);
    }

    function getConstituentAtTile(uint256 _tileID) external view returns (uint256) {
        return GameLib.getConstituentAtTile(_tileID);
    }

    function getArmyAt(Position memory _position) external view returns (uint256) {
        return GameLib.getArmyAt(_position);
    }

    function getMainBurnerAccount(address _primaryAddress) external view returns (address) {
        return gs().accounts[_primaryAddress];
    }

    function getPositionExternal(string memory _componentName, uint256 _entity) external view returns (Position memory) {
        return ECSLib.getPosition(_componentName, _entity);
    }

    ////////////

    function getResourceLevel(uint256 _resourceID) external view returns (uint256) {
        return ECSLib.getUint("Level", _resourceID);
    }

    function getComponent(string memory _name) external view returns (Component) {
        return ECSLib._getComponent(_name);
    }

    function getComponentById(uint256 _entity) external view returns (Component) {
        return ECSLib.getComponentByEntity(_entity);
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

    function getCityAtTile(Position memory _startPosition) external view returns (uint256) {
        return GameLib.getCityAtTile(_startPosition);
    }

    function getCityCenter(uint256 _cityID) external view returns (uint256) {
        return GameLib.getCityCenter(_cityID);
    }

    function getSettlerAt(Position memory _position) external view returns (uint256) {
        return GameLib.getSettlerAt(_position);
    }

    function getTileAt(Position memory _position) external view returns (uint256) {
        return GameLib.getTileAt(_position);
    }

    function getCityFood(uint256 _cityID) external view returns (uint256) {
        return GameLib.getCityFood(_cityID);
    }

    function getCityGold(uint256 _cityID) external view returns (uint256) {
        return GameLib.getCityGold(_cityID);
    }

    function getArmyFood(uint256 _armyID) external view returns (uint256) {
        uint256 foodInventoryID = GameLib.getInventory(_armyID, gs().templates["Food"]);
        return ECSLib.getUint("Amount", foodInventoryID);
    }

    function getResourceAtTile(Position memory _startPosition) external view returns (uint256) {
        return GameLib.getResourceAtTile(_startPosition);
    }
}
