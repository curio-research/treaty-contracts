//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";
import "contracts/libraries/Set.sol";

// (0, 1, 2) (1, 2)

contract Game is Test {
    CurioOS public game;

    function setUp() public {
        game = new CurioOS(); // create new OS
        game.addComponent(); // 0: ships
        game.addComponent(); // 1: in port

        // add entities to components
        game.addEntityToComponent(0, 0);
        game.addEntityToComponent(1, 0);
        game.addEntityToComponent(2, 0);

        game.addEntityToComponent(1, 1);
        game.addEntityToComponent(2, 1);
    }

    function testSet() public {
        Set set = new Set();

        set.add(1);
        set.add(2);
        set.add(3);

        // test inclusion
        assertEq(set.includes(1), true);
        assertEq(set.includes(2), true);

        assertEq(set.includes(0), false);
        assertEq(set.includes(11), false);

        // test removal
        set.remove(1);
        assertEq(set.includes(1), false);

        // test size
        assertEq(set.size(), 2);
    }

    function testIntersectionSimple() public {
        uint256[] memory res = game.intersection(0, 1);

        assertEq(res.length, 2);
    }

    function testIntersectionEdge() public {
        // (0), ()
        CurioOS _game = new CurioOS(); // create new OS
        _game.addComponent(); // 0: ships
        _game.addComponent(); // 1: in port

        // add entities to components
        _game.addEntityToComponent(0, 0);

        uint256[] memory res = _game.intersection(0, 1);
        assertEq(res.length, 0);

        // (0, 1, 2) (3, 4)
        _game.addEntityToComponent(1, 0);
        _game.addEntityToComponent(2, 0);

        _game.addEntityToComponent(3, 1);
        _game.addEntityToComponent(4, 1);

        uint256[] memory res1 = _game.intersection(0, 1);
        assertEq(res1.length, 0);
    }
}
