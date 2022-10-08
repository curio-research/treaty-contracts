//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";

contract ECSTest is Test {
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

    function testCreateSets() public {
        createSets();
    }

    function testSetIntersectionNew() public {
        (Set a, Set b) = createSets();

        Set res = ECSLib.intersectionAsSet(a, b);
    }

    function testSetIntersectionOld() public {
        (Set a, Set b) = createSets();

        Set res = ECSLib.intersectionAsSetOld(a, b);
    }
}
