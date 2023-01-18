//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {LibStorage} from "contracts/libraries/Storage.sol";
import {GameState, Position, QueryCondition, QueryType, ValueType} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent, UintArrayComponent} from "contracts/TypedComponents.sol";

/// @title library of ECS utility functions

library ECSLib {
    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    event NewEntity(uint256 _entity);
    event EntityRemoved(uint256 _entity);
    event NewComponent(string _name, uint256 _entity);
    event ComponentValueSet(string _componentName, uint256 _entity, bytes _value);
    event ComponentValueRemoved(string _componentName, uint256 _entity);

    // ----------------------------------------------------------
    // ECS BASIC UTILITY FUNCTIONS
    // ----------------------------------------------------------

    function _getComponent(string memory _name) public view returns (Component) {
        address componentAddr = gs().components[_name];
        require(componentAddr != address(0), string(abi.encodePacked("CURIO: Component ", _name, " not found")));

        return Component(componentAddr);
    }

    function getComponentByEntity(uint256 _entity) public view returns (Component) {
        address componentAddr = getAddress("Address", _entity);
        require(componentAddr != address(0), string(abi.encodePacked("CURIO: Component with id ", _entity, " not found")));

        return Component(componentAddr);
    }

    function addComponent(string memory _name, ValueType _valueType) public {
        // Not supported currently
    }

    function addEntity() public returns (uint256) {
        Set entities = Set(gs().entities);
        uint256 newEntity = gs().entityNonce;
        entities.add(newEntity);

        gs().entityNonce++;

        emit NewEntity(newEntity);
        return newEntity;
    }

    function removeEntity(uint256 _entity) public {
        Set entities = Set(gs().entities);
        entities.remove(_entity);

        string[] memory componentNames = gs().componentNames;
        for (uint256 i = 0; i < componentNames.length; i++) {
            Component component = _getComponent(gs().componentNames[i]);
            component.remove(_entity);
        }

        emit EntityRemoved(_entity);
    }

    function getComponentValue(string memory _componentName, uint256 _entity) public view returns (bytes memory) {
        return _getComponent(_componentName).getBytesValue(_entity);
    }

    function setComponentValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _value
    ) public {
        _getComponent(_componentName).set(_entity, _value);

        emit ComponentValueSet(_componentName, _entity, _value);
    }

    function removeComponentValue(string memory _componentName, uint256 _entity) public {
        _getComponent(_componentName).remove(_entity);

        emit ComponentValueRemoved(_componentName, _entity);
    }

    // ----------------------------------------------------------
    // ECS TYPED UTILITY FUNCTIONS
    // ----------------------------------------------------------

    function getAddressComponent(string memory _name) public view returns (AddressComponent) {
        address componentAddr = gs().components[_name];
        require(componentAddr != address(0), string(abi.encodePacked("CURIO: Component ", _name, " not found")));

        return AddressComponent(componentAddr);
    }

    function getAddress(string memory _componentName, uint256 _entity) public view returns (address) {
        AddressComponent addressComponent = getAddressComponent(_componentName);
        if (!addressComponent.has(_entity)) return address(0);

        return addressComponent.getValue(_entity);
    }

    function setAddress(
        string memory _componentName,
        uint256 _entity,
        address _value
    ) public {
        getAddressComponent(_componentName).set(_entity, _value);
        emit ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function removeAddress(string memory _componentName, uint256 _entity) public {
        getAddressComponent(_componentName).remove(_entity);
        emit ComponentValueRemoved(_componentName, _entity);
    }

    function getBoolComponent(string memory _name) public view returns (BoolComponent) {
        address componentAddr = gs().components[_name];
        require(componentAddr != address(0), string(abi.encodePacked("CURIO: Component ", _name, " not found")));

        return BoolComponent(componentAddr);
    }

    function getBool(string memory _componentName, uint256 _entity) public view returns (bool) {
        BoolComponent boolComponent = getBoolComponent(_componentName);
        if (!boolComponent.has(_entity)) return false;

        return boolComponent.getValue(_entity);
    }

    function setBool(string memory _componentName, uint256 _entity) public {
        getBoolComponent(_componentName).set(_entity);
        emit ComponentValueSet(_componentName, _entity, abi.encode(true));
    }

    function removeBool(string memory _componentName, uint256 _entity) public {
        getBoolComponent(_componentName).remove(_entity);
        emit ComponentValueRemoved(_componentName, _entity);
    }

    function getIntComponent(string memory _name) public view returns (IntComponent) {
        address componentAddr = gs().components[_name];
        require(componentAddr != address(0), string(abi.encodePacked("CURIO: Component ", _name, " not found")));

        return IntComponent(componentAddr);
    }

    function getInt(string memory _componentName, uint256 _entity) public view returns (int256) {
        IntComponent intComponent = getIntComponent(_componentName);
        if (!intComponent.has(_entity)) return 0;

        return intComponent.getValue(_entity);
    }

    function setInt(
        string memory _componentName,
        uint256 _entity,
        int256 _value
    ) public {
        getIntComponent(_componentName).set(_entity, _value);
        emit ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function removeInt(string memory _componentName, uint256 _entity) public {
        getIntComponent(_componentName).remove(_entity);
        emit ComponentValueRemoved(_componentName, _entity);
    }

    function getPositionComponent(string memory _name) public view returns (PositionComponent) {
        address componentAddr = gs().components[_name];
        require(componentAddr != address(0), string(abi.encodePacked("CURIO: Component ", _name, " not found")));

        return PositionComponent(componentAddr);
    }

    function getPosition(string memory _componentName, uint256 _entity) public view returns (Position memory) {
        PositionComponent positionComponent = getPositionComponent(_componentName);
        if (!positionComponent.has(_entity)) return Position({x: 0, y: 0});

        return positionComponent.getValue(_entity);
    }

    function setPosition(
        string memory _componentName,
        uint256 _entity,
        Position memory _value
    ) public {
        getPositionComponent(_componentName).set(_entity, _value);
        emit ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function removePosition(string memory _componentName, uint256 _entity) public {
        getPositionComponent(_componentName).remove(_entity);
        emit ComponentValueRemoved(_componentName, _entity);
    }

    function getStringComponent(string memory _name) public view returns (StringComponent) {
        address componentAddr = gs().components[_name];
        require(componentAddr != address(0), string(abi.encodePacked("CURIO: Component ", _name, " not found")));

        return StringComponent(componentAddr);
    }

    function getString(string memory _componentName, uint256 _entity) public view returns (string memory) {
        StringComponent stringComponent = getStringComponent(_componentName);
        if (!stringComponent.has(_entity)) return "";

        return stringComponent.getValue(_entity);
    }

    function setString(
        string memory _componentName,
        uint256 _entity,
        string memory _value
    ) public {
        getStringComponent(_componentName).set(_entity, _value);
        emit ECSLib.ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function removeString(string memory _componentName, uint256 _entity) public {
        getStringComponent(_componentName).remove(_entity);
        emit ECSLib.ComponentValueRemoved(_componentName, _entity);
    }

    function getUintComponent(string memory _name) public view returns (UintComponent) {
        address componentAddr = gs().components[_name];
        require(componentAddr != address(0), string(abi.encodePacked("CURIO: Component ", _name, " not found")));

        return UintComponent(componentAddr);
    }

    function getUint(string memory _componentName, uint256 _entity) public view returns (uint256) {
        UintComponent uintComponent = getUintComponent(_componentName);
        if (!uintComponent.has(_entity)) return 0;

        return uintComponent.getValue(_entity);
    }

    function setUint(
        string memory _componentName,
        uint256 _entity,
        uint256 _value
    ) public {
        getUintComponent(_componentName).set(_entity, _value);
        emit ECSLib.ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function removeUint(string memory _componentName, uint256 _entity) public {
        getUintComponent(_componentName).remove(_entity);
        emit ECSLib.ComponentValueRemoved(_componentName, _entity);
    }

    function getUintArrayComponent(string memory _name) public view returns (UintArrayComponent) {
        address componentAddr = gs().components[_name];
        require(componentAddr != address(0), string(abi.encodePacked("CURIO: Component ", _name, " not found")));

        return UintArrayComponent(componentAddr);
    }

    function getUintArray(string memory _componentName, uint256 _entity) public view returns (uint256[] memory) {
        UintArrayComponent uintArrayComponent = getUintArrayComponent(_componentName);
        if (!uintArrayComponent.has(_entity)) return new uint256[](0);

        return uintArrayComponent.getValue(_entity);
    }

    function setUintArray(
        string memory _componentName,
        uint256 _entity,
        uint256[] memory _value
    ) public {
        getUintArrayComponent(_componentName).set(_entity, _value);
        emit ECSLib.ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function removeUintArray(string memory _componentName, uint256 _entity) public {
        getUintArrayComponent(_componentName).remove(_entity);
        emit ECSLib.ComponentValueRemoved(_componentName, _entity);
    }

    // ----------------------------------------------------------
    // HELPERS
    // ----------------------------------------------------------

    function query(QueryCondition[] memory _queryConditions) public view returns (uint256[] memory) {
        require(_queryConditions.length > 0, "CURIO: Query must have at least one condition");

        // Process the first condition
        QueryCondition memory condition = _queryConditions[0];
        uint256[] memory result = condition.queryType == QueryType.Has ? condition.component.getEntities() : condition.component.getEntitiesWithValue(condition.value);
        uint256 resultLength = result.length;

        // Process the rest of the conditions
        uint256[] memory temp;
        uint256 currIdx;
        for (uint256 k = 1; k < _queryConditions.length; k++) {
            condition = _queryConditions[k];
            temp = new uint256[](result.length);
            currIdx = 0;

            for (uint256 i = 0; i < resultLength; i++) {
                uint256 entity = result[i];
                if (condition.queryType == QueryType.Has) {
                    if (condition.component.has(entity)) {
                        temp[currIdx] = entity;
                        currIdx++;
                    }
                } else if (condition.queryType == QueryType.IsExactly) {
                    if (keccak256(condition.component.getBytesValue(entity)) == keccak256(condition.value)) {
                        temp[currIdx] = entity;
                        currIdx++;
                    }
                } else {
                    revert("CURIO: Unsupported query type");
                }
            }

            result = new uint256[](currIdx);
            for (uint256 i = 0; i < currIdx; i++) {
                result[i] = temp[i];
            }
            resultLength = currIdx;
        }

        return result;
    }

    function queryChunk(
        QueryType _queryType,
        Component _component,
        bytes memory _value
    ) public pure returns (QueryCondition memory) {
        return QueryCondition({queryType: _queryType, component: _component, value: _value});
    }

    function concatenate(uint256[] memory _arr1, uint256[] memory _arr2) public pure returns (uint256[] memory) {
        uint256[] memory _result = new uint256[](_arr1.length + _arr2.length);

        for (uint256 i = 0; i < _arr1.length; i++) {
            _result[i] = _arr1[i];
        }
        for (uint256 i = 0; i < _arr2.length; i++) {
            _result[_arr1.length + i] = _arr2[i];
        }

        return _result;
    }

    // ----------------------------------------------------------
    // ECS CONVENIENCE FNS
    // ----------------------------------------------------------

    function removeComponentFromAll(string memory _componentName) public {
        uint256[] memory entitiesWithComponent = Component(gs().components[_componentName]).getEntities();
        for (uint256 i; i < entitiesWithComponent.length; i++) {
            removeComponentValue(_componentName, entitiesWithComponent[i]);
        }
    }
}
