//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Set} from "contracts/Set.sol";
import {UseStorage} from "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Position, QueryCondition, WorldConstants} from "contracts/libraries/Types.sol";
import {Component} from "contracts/Component.sol";
import {console} from "forge-std/console.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";

/// @title Bulk getters
/// @notice Getters provide bulk functions useful for fetching data from the frontend

contract GetterFacet is UseStorage {
    uint256 private NULL = 0;

    // ----------------------------------------------------------
    // TOKEN-RELATED GETTERS
    // ----------------------------------------------------------

    function getInventoryIDLoadAndBalance(address _entityAddress, string memory _resourceType)
        external
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return GameLib.getInventoryIDLoadAndBalance(_entityAddress, _resourceType);
    }

    function getTokenContract(string memory _tokenName) external view returns (CurioERC20) {
        return GameLib.getTokenContract(_tokenName);
    }

    // ----------------------------------------------------------
    // TREATY-RELATED GETTERS
    // ----------------------------------------------------------

    // Can be used for nations, capitals, tiles, resources, and treaties
    function getAddress(uint256 _entityID) external view returns (address) {
        return ECSLib.getAddress("Address", _entityID);
    }

    // Used for fetching all treaties a player has signed
    function getSignedTreaties(uint256 _nationID) external view returns (uint256[] memory) {
        return GameLib.getSignedTreaties(_nationID);
    }

    function getTreatyByName(string memory _treatyName) external view returns (uint256) {
        return GameLib.getTreatyByName(_treatyName);
    }

    function getEntityByAddress(address _entityAddress) external view returns (uint256) {
        return ECSLib.getAddressComponent("Address").getEntitiesWithValue(_entityAddress)[0];
    }

    function getABIHash(uint256 _treatyID) external view returns (string memory) {
        return ECSLib.getString("ABIHash", _treatyID);
    }

    // ----------------------------------------------------------
    // LOGIC GETTERS
    // ----------------------------------------------------------

    function isPlayerInitialized(address _player) external view returns (bool) {
        return GameLib.getEntityByAddress(_player) != NULL;
    }

    function getNation(uint256 _entityID) external view returns (uint256) {
        return ECSLib.getUint("Nation", _entityID);
    }

    function getNationArmies(uint256 _nationID) external view returns (uint256[] memory) {
        return GameLib.getArmiesFromNation(_nationID);
    }

    function getTreatySigners(uint256 _treatyID) external view returns (uint256[] memory) {
        return GameLib.getTreatySigners(_treatyID);
    }

    function getNationTreatySignature(uint256 _nationID, uint256 _treatyID) external view returns (uint256) {
        return GameLib.getNationTreatySignature(_nationID, _treatyID);
    }

    function getInventoryBalance(address _keeperAddress, string memory _resourceType) external view returns (uint256) {
        uint256 entityID = GameLib.getEntityByAddress(_keeperAddress);
        uint256 templateID = gs().templates[_resourceType];
        uint256 inventoryID = GameLib.getInventory(entityID, templateID);
        return inventoryID == NULL ? 0 : ECSLib.getUint("Amount", inventoryID);
    }

    function getTotalSupply(string memory _resourceType) external view returns (uint256) {
        uint256 templateID = gs().templates[_resourceType];
        return CurioERC20(ECSLib.getAddress("Address", templateID)).totalSupply();
    }

    function getEntitiesAddr() external view returns (address) {
        return gs().entities;
    }

    function getDelegations(
        string memory _functionName,
        uint256 _ownerID,
        uint256 _callerID
    ) external view returns (uint256[] memory) {
        return GameLib.getDelegations(_functionName, _ownerID, _callerID);
    }

    function getArmyAt(Position memory _position) external view returns (uint256) {
        return GameLib.getArmyAt(_position);
    }

    function getArmiesAtTile(Position memory _startPosition) external view returns (uint256[] memory) {
        return GameLib.getArmiesAtTile(_startPosition);
    }

    function getMainBurnerAccount(address _primaryAddress) external view returns (address) {
        return gs().mainToBurner[_primaryAddress];
    }

    function getCapital(uint256 _nationID) external view returns (uint256) {
        return GameLib.getCapital(_nationID);
    }

    function getTileAt(Position memory _position) external view returns (uint256) {
        return GameLib.getTileAt(_position);
    }

    function getInventory(address _inventoryAddress, string memory _templateName) external view returns (uint256) {
        uint256 templateID = gs().templates[_templateName];
        uint256 entityID = GameLib.getEntityByAddress(_inventoryAddress);
        return GameLib.getInventory(entityID, templateID);
    }

    function getResourceAtTile(Position memory _startPosition) external view returns (uint256) {
        return GameLib.getResourceAtTile(_startPosition);
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
        return GameLib.getNationCount();
    }

    function getDistanceByAddresses(address _addr1, address _addr2) external view returns (uint256) {
        Position memory pos1 = ECSLib.getPosition("Position", GameLib.getEntityByAddress(_addr1));
        Position memory pos2 = ECSLib.getPosition("Position", GameLib.getEntityByAddress(_addr2));

        // TEMP FIXME: Treaty contracts without positions are still allowed to transfer
        Position memory nullPos = Position({x: 0, y: 0});
        if (GameLib.coincident(pos1, nullPos) || GameLib.coincident(pos2, nullPos)) return 0;

        return GameLib.euclidean(pos1, pos2);
    }

    function getTileRegionTilePositions(Position memory _startPosition) external view returns (Position[] memory) {
        return GameLib.getTileRegionTilePositions(_startPosition);
    }

    // ----------------------------------------------------------
    // ECS GETTERS
    // ----------------------------------------------------------

    // FIXME: Only called "external" because calling it without causes hardhat-diamond-abi compilation error, specifically function appearing twice
    function getPositionExternal(string memory _componentName, uint256 _entity) external view returns (Position memory) {
        return ECSLib.getPosition(_componentName, _entity);
    }

    function getEntityLevel(uint256 _entity) external view returns (uint256) {
        return ECSLib.getUint("Level", _entity);
    }

    function getComponent(string memory _name) external view returns (Component) {
        return ECSLib._getComponent(_name);
    }

    function getComponentById(uint256 _entity) external view returns (Component) {
        return ECSLib.getComponentByEntity(_entity);
    }

    function getEntity() external view returns (uint256) {
        return Set(gs().entities).size();
    }

    function getEntities() external view returns (uint256[] memory) {
        return Set(gs().entities).getAll();
    }

    function query(QueryCondition[] memory _queryConditions) external view returns (uint256[] memory) {
        return ECSLib.query(_queryConditions);
    }
}
