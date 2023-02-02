//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @dev Implementation of a mathematical set in Solidity

contract Set {
    address private deployer;
    uint256[] private elements;
    mapping(uint256 => uint256) private elementIndexMap;

    modifier onlyDeployer() {
        require(msg.sender == deployer, "Set: Only deployer can modify values");
        _;
    }

    constructor() {
        deployer = msg.sender;
    }

    function getAll() public view returns (uint256[] memory) {
        return elements;
    }

    function add(uint256 _element) public onlyDeployer {
        if (includes(_element)) return;

        elements.push(_element);
        elementIndexMap[_element] = size() - 1;
    }

    function addArray(uint256[] memory _elements) public onlyDeployer {
        for (uint256 i = 0; i < _elements.length; i++) {
            add(_elements[i]);
        }
    }

    function remove(uint256 _element) public onlyDeployer {
        if (!includes(_element)) return;

        // Copy last element to override element to be removed
        uint256 _indexToRemove = elementIndexMap[_element];
        uint256 _lastElement = elements[size() - 1];
        elements[_indexToRemove] = _lastElement;
        elementIndexMap[_lastElement] = _indexToRemove;

        // Pop last element
        delete elementIndexMap[_element];
        elements.pop();
    }

    function size() public view returns (uint256) {
        return elements.length;
    }

    function includes(uint256 _element) public view returns (bool) {
        if (size() == 0) return false;

        // Element found either at nonzero index or zero index
        return elementIndexMap[_element] != 0 || elements[0] == _element;
    }
}
