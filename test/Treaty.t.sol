//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";

contract TreatyTest is Test, DiamondDeployTest {
    function testFoundProducePackMoveUnpackSequence() public {
        Position[] memory _territory = new Position[](9);
        _territory[0] = Position({x: 6, y: 0});
        _territory[1] = Position({x: 6, y: 1});
        _territory[2] = Position({x: 6, y: 2});
        _territory[3] = Position({x: 7, y: 2});
        _territory[4] = Position({x: 8, y: 2});
        _territory[5] = Position({x: 8, y: 1});
        _territory[6] = Position({x: 8, y: 0});
        _territory[7] = Position({x: 7, y: 0});
        _territory[8] = Position({x: 7, y: 1});

        vm.startPrank(player1);

        // Found city
        uint256 _settyID = getter.getSettlerAt(player1Pos);
        game.moveSettler(_settyID, Position({x: 7, y: 1}));
        game.foundCity(_settyID, _territory, "New Amsterdam");

        uint256 _cityCenterID = getter.getCityCenter(_settyID);

        // Produce troops
        uint256 _productionID = game.startTroopProduction(_cityCenterID, cavalryTemplateID, 20);
        vm.warp(30);
        game.endTroopProduction(_cityCenterID, _productionID);

        // Pack city and move settler out of former city boundry
        game.packCity(_settyID);
        vm.warp(32);
        game.moveSettler(_settyID, Position({x: 8, y: 1}));
        vm.warp(34);
        game.moveSettler(_settyID, Position({x: 9, y: 1}));

        // Verify that all previous tiles and buildings are removed
        for (uint256 i = 0; i < _territory.length; i++) {
            assertEq(getter.getComponent("Position").getEntitiesWithValue(abi.encode(_territory[i])).length, 0);
        }

        // Found another city
        vm.warp(36);
        game.moveSettler(_settyID, Position({x: 8, y: 1}));
        vm.warp(38);
        game.moveSettler(_settyID, Position({x: 7, y: 1}));
        game.foundCity(_settyID, _territory, "New York");

        vm.stopPrank();
    }

    // function testTreatyBasics() public {
    //     Position[] memory _territory = new Position[](9);
    //     _territory[0] = Position({x: 5, y: 0});
    //     _territory[1] = Position({x: 5, y: 1});
    //     _territory[2] = Position({x: 5, y: 2});
    //     _territory[3] = Position({x: 6, y: 2});
    //     _territory[4] = Position({x: 7, y: 2});
    //     _territory[5] = Position({x: 7, y: 1});
    //     _territory[6] = Position({x: 7, y: 0});
    //     _territory[7] = Position({x: 6, y: 0});
    //     _territory[8] = Position({x: 6, y: 1});

    //     vm.startPrank(player1);
    //     game.joinTreaty(address(nato));

    //     uint256 _settlerID = getter.getSettlerAt(player1Pos);
    //     game.foundCity(_settlerID, _territory, "New York");

    //     uint256 _cityID = getter.getCityAt(player1Pos);
    //     uint256 _cityCenterID = getter.getCityCenter(_cityID);

    //     uint256 _productionID = game.startTroopProduction(_cityCenterID, cavalryTemplateID, 20);
    //     vm.warp(10);
    //     game.endTroopProduction(_cityCenterID, _productionID);

    //     uint256[] memory _arr1 = new uint256[](1);
    //     _arr1[0] = cavalryTemplateID;
    //     uint256[] memory _arr2 = new uint256[](1);
    //     _arr2[0] = 5;
    //     uint256 _army1 = game.organizeArmy(_cityID, _arr1, _arr2);

    //     vm.warp(20);
    //     game.moveArmy(_army1, Position({x: 6, y: 2}));

    //     game.denounceTreaty(address(nato));
    //     vm.stopPrank();
    // }
}
