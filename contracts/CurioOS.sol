//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Set} from "contracts/Set.sol";

contract CurioOS {
    uint256 public componentID;
    mapping(uint256 => Set) public components;
    mapping(string => uint256) public componentName;

    uint256 public entityID;

    function addComponent(string memory _name) public returns (uint256) {
        require(componentName[_name] == 0, "Component with same name exists");

        componentID++;
        Set newComponent = new Set();
        components[componentID] = newComponent;
        componentName[_name] = componentID;

        return componentID;
    }

    function addEntityToComponent(uint256 _entityID, uint256 _componentID) public {
        Set component = components[_componentID];

        component.add(_entityID);
    }

    function addEntityToComponentByName(uint256 _entityID, string memory _componentName) public {
        uint256 _componentID = componentName[_componentName];
        Set component = components[_componentID];

        component.add(_entityID);
    }

    function removeEntityFromComponent(uint256 _entityID, uint256 _componentID) public {
        Set component = components[_componentID];

        component.remove(_entityID);
    }

    function addEntity() public {}

    // find the intersection of component sets!

    function intersection(uint256 componentID1, uint256 componentID2) public returns (uint256[] memory) {
        // make sure two components are registered and valid
        if (componentID1 > componentID || componentID2 > componentID) {
            return new uint256[](0);
        }

        Set _set1 = components[componentID1];
        Set _set2 = components[componentID2];

        Set _searchedElements = new Set();

        // first initiate an array with a crazy size then copy to right size lol
        // the max size of the sum of the two sets is the sum of the two raw sets themselves
        uint256[] memory _temp = new uint256[](_set1.size() + _set2.size());
        uint256 _elementCount = 0;

        // loop through first set
        for (uint256 i = 0; i < _set1.size(); i++) {
            uint256 _element = _set1.getAll()[i];

            // check if the element is in the second set
            if (!_searchedElements.includes(_element)) {
                if (_set2.includes(_element)) {
                    _temp[_elementCount] = _element;
                    _elementCount++;
                }
            }

            _searchedElements.add(_element);
        }

        // loop through second set

        for (uint256 i = 0; i < _set2.size(); i++) {
            uint256 _element = _set2.getAll()[i];

            // check if the element is in the first set
            if (!_searchedElements.includes(_element)) {
                if (_set1.includes(_element)) {
                    _temp[_elementCount] = _element;
                    _elementCount++;
                }
            }

            _searchedElements.add(_element);
        }

        // copy the unknown size array to the calculated one
        uint256[] memory res = new uint256[](_elementCount);
        for (uint256 i = 0; i < _elementCount; i++) {
            res[i] = _temp[i];
        }
        return res;
    }

    function difference(uint256 componentID1, uint256 componentID2) public view returns (uint256[] memory) {
        Set _set1 = components[componentID1];
        Set _set2 = components[componentID2];

        uint256[] memory _temp = new uint256[](_set1.size());
        uint256 _elementCount = 0;

        // loop through first set
        for (uint256 i = 0; i < _set1.size(); i++) {
            uint256 _element = _set1.getAll()[i];

            // check if the element is in the secone set

            if (!_set2.includes(_element)) {
                _temp[_elementCount] = _element;
                _elementCount++;
            }
        }

        uint256[] memory res = new uint256[](_elementCount);
        for (uint256 i = 0; i < _elementCount; i++) {
            res[i] = _temp[i];
        }
        return res;
    }
}
