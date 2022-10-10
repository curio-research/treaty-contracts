//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";

contract ECSTest is Test {
    // set up some sets for testing
    function createSets() public returns (Set, Set) {
        Set a = new Set();
        Set b = new Set();

        a.add(1);
        a.add(2);
        a.add(3);
        a.add(4);

        b.add(2);
        b.add(3);
        b.add(4);
        b.add(5);

        return (a, b);
    }

    // baseline gas for creation itself
    function testCreateSets() public {
        createSets();
    }

    function testSetIntersectionNew() public {
        (Set a, Set b) = createSets();
        ECSLib.intersectionAsSet(a, b);
    }

    function testSetIntersectionOld() public {
        (Set a, Set b) = createSets();
        oldIntersectionAsSet(a, b);
    }

    // ------------------------------------------------------------
    // legacy intersection function as benchmark for speed

    function oldIntersectionAsSet(Set _set1, Set _set2) public returns (Set) {
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

        Set _res = new Set();
        for (uint256 i = 0; i < _temp.length; i++) {
            _res.add(_temp[i]);
        }

        return _res;
    }
}
