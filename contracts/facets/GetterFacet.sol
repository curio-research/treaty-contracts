//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Set} from "contracts/Set.sol";
import {UseStorage} from "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Position, QueryCondition, WorldConstants} from "contracts/libraries/Types.sol";
import {Component} from "contracts/Component.sol";
import {console} from "forge-std/console.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from the frontend

contract GetterFacet is UseStorage {
    uint256 private NULL = 0;

    function getTokenContract(string memory _tokenName) external view returns (CurioERC20) {
        return GameLib.getTokenContract(_tokenName);
    }

    function getEntityIDByAddress(address _entityAddress) external view returns (uint256) {
        return ECSLib.getAddressComponent("Address").getEntitiesWithValue(_entityAddress)[0];
    }

    function getEntityWallet(uint256 _entityID) external view returns (address) {
        return ECSLib.getAddress("Address", _entityID);
    }

    function getEntityNation(uint256 _entityID) external view returns (uint256) {
        return ECSLib.getUint("Nation", _entityID);
    }

    function getNationArmies(uint256 _nationID) external view returns (uint256[] memory) {
        return GameLib.getArmiesFromNation(_nationID);
    }

    function getInventoryIDMaxLoadAndBalance(address _entityAddress, string memory _resourceType)
        external
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return GameLib.getInventoryIDMaxLoadAndBalance(_entityAddress, _resourceType);
    }

    function getInventoryBalance(address _keeperAddress, string memory _resourceType) external view returns (uint256) {
        uint256 entityID = GameLib.getEntityByAddress(_keeperAddress);
        uint256 templateID = gs().templates[_resourceType];
        uint256 inventoryID = GameLib.getInventory(entityID, templateID);
        return ECSLib.getUint("Amount", inventoryID);
    }

    function getEntitiesAddr() external view returns (address) {
        return gs().entities;
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

    function getEntityLevel(uint256 _entityID) external view returns (uint256) {
        return ECSLib.getUint("Level", _entityID);
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

    function getConstant(
        string memory _subject,
        string memory _object,
        string memory _componentName,
        string memory _functionName,
        uint256 _level
    ) external view returns (uint256) {
        return GameLib.getConstant(_subject, _object, _componentName, _functionName, _level);
    }

    function getPlayerCount() external view returns (uint256) {
        return gs().nations.length;
    }

    function getEntity() external view returns (uint256) {
        Set _entities = Set(gs().entities);
        return _entities.size();
    }

    function getEntities() external view returns (uint256[] memory) {
        return Set(gs().entities).getAll();
    }

    function getCapital(uint256 _nationID) external view returns (uint256) {
        return GameLib.getCapital(_nationID);
    }

    function getTileAt(Position memory _position) external view returns (uint256) {
        return GameLib.getTileAt(_position);
    }

    function getInventory(address _inventoryAddress, string memory _inventoryType) external view returns (uint256) {
        uint256 templateID = gs().templates[_inventoryType];
        uint256 entityID = GameLib.getEntityByAddress(_inventoryAddress);
        return GameLib.getInventory(entityID, templateID);
    }

    function getResourceAtTile(Position memory _startPosition) external view returns (uint256) {
        return GameLib.getResourceAtTile(_startPosition);
    }

    function query(QueryCondition[] memory _queryConditions) external view returns (uint256[] memory) {
        return ECSLib.query(_queryConditions);
    }
}
