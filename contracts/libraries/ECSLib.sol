//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent} from "contracts/TypedComponents.sol";

/// @title library of ECS utility functions

library ECSLib {
    using SafeMath for uint256;

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
        require(_componentAddr != address(0), "CURIO: Component not found");

        return Component(_componentAddr);
    }

    function _getComponentByEntity(uint256 _entity) public view returns (Component) {
        address _componentAddr = gs().ComponentEntityToAddress[_entity];
        require(_componentAddr != address(0), "CURIO: Component not found");

        return Component(_componentAddr);
    }

    function _addEntity() public returns (uint256) {
        Set _entities = Set(gs().entities);
        uint256 _newEntity = _entities.size() + 1;
        _entities.add(_newEntity);

        emit NewEntity(_newEntity);
        return _newEntity;
    }

    function _removeEntity(uint256 _entity) public {
        Set _entities = Set(gs().entities);
        _entities.remove(_entity);

        // FIXME: remove over all components, or remove over components which the entity has? One more general, the other more efficient.
        for (uint256 i = 0; i < gs().componentNames.length; i++) {
            Component _component = Component(gs().components[gs().componentNames[i]]);
            _component.remove(_entity);
        }

        emit EntityRemoved(_entity);
    }

    function _getComponentValue(string memory _componentName, uint256 _entity) public view returns (bytes memory) {
        return _getComponent(_componentName).getBytesValue(_entity);
    }

    // Question: At the moment, all events regarding component set and removal are emitted in game contracts. Is this good?
    function _setComponentValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _value
    ) public {
        _getComponent(_componentName).set(_entity, _value);

        emit ComponentValueSet(_componentName, _entity, _value);
    }

    function _removeComponentValue(string memory _componentName, uint256 _entity) public {
        _getComponent(_componentName).remove(_entity);

        emit ComponentValueRemoved(_componentName, _entity);
    }

    // ----------------------------------------------------------
    // ECS TYPED UTILITY FUNCTIONS
    // ----------------------------------------------------------

    function _getAddress(string memory _componentName, uint256 _entity) public view returns (address) {
        return AddressComponent(gs().components[_componentName]).getValue(_entity);
    }

    function _setAddress(
        string memory _componentName,
        uint256 _entity,
        address _value
    ) public {
        AddressComponent(gs().components[_componentName]).set(_entity, _value);
        emit ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function _removeAddress(string memory _componentName, uint256 _entity) public {
        AddressComponent(gs().components[_componentName]).remove(_entity);
        emit ComponentValueRemoved(_componentName, _entity);
    }

    function _getBool(string memory _componentName, uint256 _entity) public view returns (bool) {
        return BoolComponent(gs().components[_componentName]).getValue(_entity);
    }

    function _setBool(string memory _componentName, uint256 _entity) public {
        BoolComponent(gs().components[_componentName]).set(_entity);
        emit ComponentValueSet(_componentName, _entity, abi.encode(true));
    }

    function _removeBool(string memory _componentName, uint256 _entity) public {
        BoolComponent(gs().components[_componentName]).remove(_entity);
        emit ComponentValueRemoved(_componentName, _entity);
    }

    function _getInt(string memory _componentName, uint256 _entity) public view returns (int256) {
        return IntComponent(gs().components[_componentName]).getValue(_entity);
    }

    function _setInt(
        string memory _componentName,
        uint256 _entity,
        int256 _value
    ) public {
        IntComponent(gs().components[_componentName]).set(_entity, _value);
        emit ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function _removeInt(string memory _componentName, uint256 _entity) public {
        IntComponent(gs().components[_componentName]).remove(_entity);
        emit ComponentValueRemoved(_componentName, _entity);
    }

    function _getPosition(string memory _componentName, uint256 _entity) public view returns (Position memory) {
        return PositionComponent(gs().components[_componentName]).getValue(_entity);
    }

    function _setPosition(
        string memory _componentName,
        uint256 _entity,
        Position memory _value
    ) public {
        PositionComponent(gs().components[_componentName]).set(_entity, _value);
        emit ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function _removePosition(string memory _componentName, uint256 _entity) public {
        PositionComponent(gs().components[_componentName]).remove(_entity);
        emit ComponentValueRemoved(_componentName, _entity);
    }

    function _getString(string memory _componentName, uint256 _entity) public view returns (string memory) {
        return StringComponent(gs().components[_componentName]).getValue(_entity);
    }

    function _setString(
        string memory _componentName,
        uint256 _entity,
        string memory _value
    ) public {
        StringComponent(gs().components[_componentName]).set(_entity, _value);
        emit ECSLib.ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function _removeString(string memory _componentName, uint256 _entity) public {
        StringComponent(gs().components[_componentName]).remove(_entity);
        emit ECSLib.ComponentValueRemoved(_componentName, _entity);
    }

    function _getUint(string memory _componentName, uint256 _entity) public view returns (uint256) {
        return UintComponent(gs().components[_componentName]).getValue(_entity);
    }

    function _setUint(
        string memory _componentName,
        uint256 _entity,
        uint256 _value
    ) public {
        UintComponent(gs().components[_componentName]).set(_entity, _value);
        emit ECSLib.ComponentValueSet(_componentName, _entity, abi.encode(_value));
    }

    function _removeUint(string memory _componentName, uint256 _entity) public {
        UintComponent(gs().components[_componentName]).remove(_entity);
        emit ECSLib.ComponentValueRemoved(_componentName, _entity);
    }

    // ----------------------------------------------------------
    // HELPERS
    // ----------------------------------------------------------

    // Set-theoretic intersection
    function _intersection(Set _set1, Set _set2) public returns (uint256[] memory) {
        Set _searchedElements = new Set();

        uint256[] memory _temp = new uint256[](_set1.size() + _set2.size());
        uint256 _resultLength = 0;

        // Loop through first set
        for (uint256 i = 0; i < _set1.size(); i++) {
            uint256 _element = _set1.getAll()[i];

            // Check if element is in second set
            if (!_searchedElements.includes(_element)) {
                if (_set2.includes(_element)) {
                    _temp[_resultLength] = _element;
                    _resultLength++;
                }
            }

            _searchedElements.add(_element);
        }

        // Loop through second set
        for (uint256 i = 0; i < _set2.size(); i++) {
            uint256 _element = _set2.getAll()[i];

            // Check if element is in first set
            if (!_searchedElements.includes(_element)) {
                if (_set1.includes(_element)) {
                    _temp[_resultLength] = _element;
                    _resultLength++;
                }
            }

            _searchedElements.add(_element);
        }

        // Copy result to array with known length
        uint256[] memory _result = new uint256[](_resultLength);
        for (uint256 i = 0; i < _resultLength; i++) {
            _result[i] = _temp[i];
        }

        return _result;
    }

    // Set-theoretic difference
    function _difference(Set set1, Set set2) public view returns (uint256[] memory) {
        uint256[] memory _temp = new uint256[](set1.size());
        uint256 _resultLength = 0;

        // Loop through first set
        for (uint256 i = 0; i < set1.size(); i++) {
            uint256 _element = set1.getAll()[i];

            // Check if element is in second set
            if (!set2.includes(_element)) {
                _temp[_resultLength] = _element;
                _resultLength++;
            }
        }

        uint256[] memory _result = new uint256[](_resultLength);
        for (uint256 i = 0; i < _resultLength; i++) {
            _result[i] = _temp[i];
        }

        return _result;
    }

    // Set-theoretic union
    function _union(Set _set1, Set _set2) public returns (uint256[] memory) {
        uint256[] memory _arr1 = _difference(_set1, _set2);
        uint256[] memory _arr2 = _intersection(_set1, _set2);
        uint256[] memory _arr3 = _difference(_set2, _set1);

        return _concatenate(_concatenate(_arr1, _arr2), _arr3);
    }

    function _concatenate(uint256[] memory _arr1, uint256[] memory _arr2) public pure returns (uint256[] memory) {
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
    function _filterByComponentRange(
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
            _result = _concatenate(_result, _intersection(_set1, _set2));
        }

        return _result;
    }
}
