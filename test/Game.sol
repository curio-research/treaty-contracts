//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";
import {Set} from "contracts/libraries/Set.sol";
import {CurioOS} from "contracts/libraries/CurioOS.sol";

contract Game is Test {
    CurioOS public game;

    function setUp() public {
        string memory shipComponent = "ship";
        string memory inPortComponent = "inPort";

        game = new CurioOS(); // create new OS
        game.addComponent(shipComponent); // 1: ships
        game.addComponent(inPortComponent); // 2: in port

        // (0, 1, 2) (1, 2)
        // add entities (troopIDs in our game) to components
        game.addEntityToComponentByName(0, shipComponent);
        game.addEntityToComponentByName(1, shipComponent);
        game.addEntityToComponentByName(2, shipComponent);

        game.addEntityToComponentByName(1, inPortComponent);
        game.addEntityToComponentByName(2, inPortComponent);
    }

    function testSet() public {
        Set set = new Set();

        set.add(1);
        set.add(2);
        set.add(3);

        // test inclusion
        assertEq(set.has(1), true);
        assertEq(set.has(2), true);

        assertEq(set.has(0), false);
        assertEq(set.has(11), false);

        // test removal
        set.remove(1);
        assertEq(set.has(1), false);

        // test size
        assertEq(set.size(), 2);
    }

    function testIntersectionSimple() public {
        uint256[] memory res = game.intersection(2, 2);

        assertEq(res.length, 2);
    }

    function testIntersectionEdge() public {
        // (0), ()
        CurioOS _game = new CurioOS(); // create new OS
        _game.addComponent("ship"); // 0: ships
        _game.addComponent("inPort"); // 1: in port

        // add entities to components
        _game.addEntityToComponent(0, 1);

        uint256[] memory res = _game.intersection(1, 2);
        assertEq(res.length, 0);

        // (0, 1, 2) (3, 4)
        _game.addEntityToComponent(1, 1);
        _game.addEntityToComponent(2, 1);

        _game.addEntityToComponent(3, 2);
        _game.addEntityToComponent(4, 2);

        uint256[] memory res1 = _game.intersection(1, 2);
        assertEq(res1.length, 0);
    }

    function testIntersectionUnregisteredComponents() public {
        CurioOS _game = new CurioOS(); // create new OS

        uint256[] memory res = _game.intersection(10, 11);
        assertEq(res.length, 0);
    }

    function testDifference() public {
        CurioOS _game = new CurioOS(); // create new OS
        _game.addComponent("ship"); // 0: ships
        _game.addComponent("inPort"); // 1: in port

        // (1, 2, 3) (2, 3, 4)
        _game.addEntityToComponent(1, 1);
        _game.addEntityToComponent(2, 1);
        _game.addEntityToComponent(3, 1);

        _game.addEntityToComponent(2, 2);
        _game.addEntityToComponent(3, 2);
        _game.addEntityToComponent(4, 2);

        uint256[] memory res = _game.difference(1, 2);
        assertEq(res.length, 1);

        // for (uint256 i = 0; i < res.length; i++) {
        //     console.log(res[i]);
        // }
    }

    function testSample() public {
        string memory encoded = encodeUint(10);

        uint256 decoded = decodeUint(encoded);

        assertEq(decoded, 10);
    }

    // ----------------------------
    // encoders and decoders
    // ----------------------------

    function encodeUint(uint256 _val) public pure returns (string memory) {
        return string(abi.encode(_val));
    }

    function decodeUint(string memory _val) public pure returns (uint256) {
        return abi.decode(bytes(_val), (uint256));
    }

    function compareStrings(string memory _a, string memory _b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((_a))) == keccak256(abi.encodePacked((_b))));
    }

    // function areBytesSame(bytes memory _bytes1, bytes memory _bytes2) public returns (bool) {
    //     return _bytes1.equals(_bytes2); // string(_bytes1) == string(_bytes2);
    // }
}
