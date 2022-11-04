//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {LibStorage} from "contracts/libraries/Storage.sol";
import {GameState, Position, QueryCondition, QueryType, ValueType} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {UintBoolMapping} from "contracts/Mapping.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent, UintArrayComponent} from "contracts/TypedComponents.sol";
import {console} from "forge-std/console.sol";
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
        address _componentAddr = gs().components[_name];
        require(_componentAddr != address(0), string(abi.encodePacked("CURIO: Component ", _name, " not found")));

        return Component(_componentAddr);
    }

    function getComponentByEntity(uint256 _entity) public view returns (Component) {
        address _componentAddr = gs().componentEntityToAddress[_entity];
        require(_componentAddr != address(0), string(abi.encodePacked("CURIO: Component with id ", _entity, " not found")));

        return Component(_componentAddr);
    }

    function addComponent(string memory _name, ValueType _valueType) public {
        // TODO: implement
    }

    function addEntity() public returns (uint256) {
        Set _entities = Set(gs().entities);
        uint256 _newEntity = gs().entityNonce;
        _entities.add(_newEntity);

        gs().entityNonce++;

        emit NewEntity(_newEntity);
        return _newEntity;
    }

    // FIXME: remove over all components, or remove over components which the entity has? One more general, the other more efficient.
    function removeEntity(uint256 _entity) public {
        Set _entities = Set(gs().entities);
        _entities.remove(_entity);

        string[] memory _componentNames = gs().componentNames;
        for (uint256 i = 0; i < _componentNames.length; i++) {
            Component _component = _getComponent(gs().componentNames[i]);
            _component.remove(_entity);
        }

        emit EntityRemoved(_entity);
    }

    function _getComponentValue(string memory _componentName, uint256 _entity) public view returns (bytes memory) {
        return _getComponent(_componentName).getBytesValue(_entity);
    }

    // Question: At the moment, all events regarding component set and removal are emitted in game contracts. Is this good?
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

    function queryAsSet(QueryCondition[] memory _queryCondition) public returns (Set) {
        Set res = Set(gs().entities);
      
      // _queryCondition  queryType componentName , value 

        for (uint256 i = 0; i < _queryCondition.length; i++) {
            QueryCondition memory _queryChunkCondition = _queryCondition[i];
            Component component = _getComponent(_queryChunkCondition.componentName);

            if (_queryChunkCondition.queryType == QueryType.Has) {
                res = intersectionAsSet(res, component.getEntitiesAsSet());
            } else if (_queryChunkCondition.queryType == QueryType.HasVal) {
                // Exact value
                res = intersectionAsSet(res, component.getEntitiesWithValueAsSet(_queryChunkCondition.value));
            } else {
                revert("CURIO: Query type not supported");
            }
        }

        return res;
    }

    function query(QueryCondition[] memory _queryCondition) public returns (uint256[] memory) {
        return queryAsSet(_queryCondition).getAll();
    }

    function queryChunk(
        QueryType _queryType,
        string memory _componentName,
        bytes memory _value
    ) public pure returns (QueryCondition memory) {
        return QueryCondition({queryType: _queryType, componentName: _componentName, value: _value});
    }

    function intersectionAsSet(Set _set1, Set _set2) public returns (Set) {
        UintBoolMapping searchedElements = new UintBoolMapping();
        Set intersections = new Set();

        // Loop through first set
        uint256[] memory set1elements = _set1.getAll();
        uint256 element;
        for (uint256 i = 0; i < _set1.size(); i++) {
            element = set1elements[i];

            // Check if element is in second set
            if (!searchedElements.val(element)) {
                if (_set2.includes(element)) {
                    intersections.add(element);
                }
                searchedElements.set(element, true);
            }
        }

        // Loop through second set
        uint256[] memory set2elements = _set2.getAll();
        for (uint256 i = 0; i < _set2.size(); i++) {
            element = set2elements[i];

            // Check if element is in first set
            if (!searchedElements.val(element)) {
                if (_set1.includes(element)) {
                    intersections.add(element);
                }
                searchedElements.set(element, true);
            }
        }

        return intersections;
    }

    // Set-theoretic intersection
    function intersection(Set _set1, Set _set2) public returns (uint256[] memory) {
        return intersectionAsSet(_set1, _set2).getAll();
    }

    // Set-theoretic difference
    function difference(Set _set1, Set _set2) public returns (uint256[] memory) {
        return differenceAsSet(_set1, _set2).getAll();
    }

    function differenceAsSet(Set set1, Set set2) public returns (Set) {
        Set res = new Set();

        for (uint256 i = 0; i < set1.size(); i++) {
            uint256 _element = set1.getAll()[i];

            // Check if element is in second set
            if (!set2.includes(_element)) {
                res.add(_element);
            }
        }

        return res;
    }

    // Set-theoretic union
    function union(Set _set1, Set _set2) public returns (uint256[] memory) {
        uint256[] memory arr1 = difference(_set1, _set2);
        uint256[] memory arr2 = intersection(_set1, _set2);
        uint256[] memory arr3 = difference(_set2, _set1);

        return concatenate(concatenate(arr1, arr2), arr3);
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

    // inclusive on both ends
    function filterByComponentRange(
        uint256[] memory _entities,
        string memory _componentName,
        uint256 _lb,
        uint256 _ub
    ) public returns (uint256[] memory) {
        Set _set1 = new Set();
        _set1.addArray(_entities);

        uint256[] memory _result = new uint256[](0);
        Set _set2;
        for (uint256 _value = _lb; _value <= _ub; _value++) {
            _set2 = new Set();
            _set2.addArray(UintComponent(gs().components[_componentName]).getEntitiesWithValue(_value));
            _result = concatenate(_result, intersection(_set1, _set2));
        }

        return _result;
    }
}
