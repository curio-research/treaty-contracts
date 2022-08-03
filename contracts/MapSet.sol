// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

/// Implementation of a mathematical set in Solidity

contract MapSet {
    mapping(uint256 => uint256[]) private elements;
    mapping(uint256 => mapping(uint256 => uint256)) private elementIndexMap;

    function getAll(uint256 _setKey) public view returns (uint256[] memory) {
        return elements[_setKey];
    }

    function add(uint256 _setKey, uint256 _element) public {
        if (includes(_setKey, _element)) return;

        elements[_setKey].push(_element);
        elementIndexMap[_setKey][_element] = elements[_setKey].length;
    }

    function remove(uint256 _setKey, uint256 _element) public {
        if (!includes(_setKey, _element)) return;

        // Copy the last element to the given element's index
        elements[_setKey][elementIndexMap[_setKey][_element]] = elements[_setKey][elements[_setKey].length - 1];

        // Update the moved element's stored index to the new index
        elementIndexMap[_setKey][elements[_setKey][elementIndexMap[_setKey][_element]]] = elementIndexMap[_setKey][_element];

        // Remove the given element's stored index
        delete elementIndexMap[_setKey][_element];

        // Remove the last element
        elements[_setKey].pop();
    }

    function includes(uint256 _setKey, uint256 _element) public view returns (bool) {
        if (elements[_setKey].length == 0) return false;
        if (elementIndexMap[_setKey][_element] == 0) return elements[_setKey][0] == _element;
        return elementIndexMap[_setKey][_element] != 0;
    }

    function size(uint256 _setKey) public view returns (uint256) {
        return elements[_setKey].length;
    }
}
