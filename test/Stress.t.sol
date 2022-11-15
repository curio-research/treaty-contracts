//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Test} from "forge-std/Test.sol";
import {DiamondDeployTest} from "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {console} from "forge-std/console.sol";

contract LoadTest is Test, DiamondDeployTest {
    function testEmpty() public view {
        console.log("Nothing");
    }

    function testFoundCity() public {
        uint256 settlerID = getter.getSettlerAt(player1Pos);
        Position[] memory tilePositions = new Position[](1);
        tilePositions[0] = player1Pos;

        vm.startPrank(player1);
        game.foundCity(settlerID, tilePositions, "City");
        vm.stopPrank();
    }

    function testFoundCityMultiple() public {
        uint256 settlerID = getter.getSettlerAt(player1Pos);
        Position[] memory tilePositions = new Position[](1);
        tilePositions[0] = player1Pos;

        vm.startPrank(player1);
        game.foundCity(settlerID, tilePositions, "City");
        vm.stopPrank();
    }
}
