//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";

contract TreatyTest is Test, DiamondDeployTest {
    function testTreatyBasics() public {
        Position[] memory _territory = new Position[](9);
        _territory[0] = Position({x: 5, y: 0});
        _territory[1] = Position({x: 5, y: 1});
        _territory[2] = Position({x: 5, y: 2});
        _territory[3] = Position({x: 6, y: 2});
        _territory[4] = Position({x: 7, y: 2});
        _territory[5] = Position({x: 7, y: 1});
        _territory[6] = Position({x: 7, y: 0});
        _territory[7] = Position({x: 6, y: 0});
        _territory[8] = Position({x: 6, y: 1});

        vm.startPrank(player1);
        game.joinTreaty(address(nato));

        uint256 _settlerID = getter._getPlayerSettleAt(player1Pos);
        game.foundCity(_settlerID, _territory, "New York");

        uint256 _player1City = getter._getCityAt(player1Pos);
        uint256 _player1CityCenter = getter._getCityCenter(_player1City);

        uint256 _productionId = game.startTroopProduction(_player1CityCenter, cavalryTemplateID, 20);
        vm.warp(10);
        game.endTroopProduction(_player1CityCenter, _productionId);

        uint256[] memory _arr1 = new uint256[](1);
        _arr1[0] = cavalryTemplateID;
        uint256[] memory _arr2 = new uint256[](1);
        _arr2[0] = 5;
        uint256 _army1 = game.organizeArmy(_player1City, _arr1, _arr2);

        vm.warp(20);
        game.moveArmy(_army1, Position({x: 6, y: 2}));

        game.denounceTreaty(address(nato));
        vm.stopPrank();
    }
}
