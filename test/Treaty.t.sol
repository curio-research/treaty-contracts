//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";

contract TreatyTest is Test, DiamondDeployTest {
    function testEntityRemoval() public {
        // Check pre-condition
        uint256 _settyID = getter.getSettlerAt(player1Pos);
        assertEq(getter.getComponent("CanSettle").getEntities().length, 3);

        // Remove settler
        vm.prank(deployer);
        admin.removeEntity(_settyID);

        // Check post-condition
        assertEq(getter.getComponent("CanSettle").getEntities().length, 2);

        Position[] memory _territory = new Position[](9);
        _territory[0] = Position({x: 5, y: 2});
        _territory[1] = Position({x: 5, y: 3});
        _territory[2] = Position({x: 5, y: 4});
        _territory[3] = Position({x: 6, y: 4});
        _territory[4] = Position({x: 7, y: 4});
        _territory[5] = Position({x: 7, y: 3});
        _territory[6] = Position({x: 7, y: 2});
        _territory[7] = Position({x: 6, y: 2});
        _territory[8] = Position({x: 6, y: 3});

        // Player 2 founds a city
        vm.startPrank(player2);
        uint256 _setty2ID = getter.getSettlerAt(player2Pos);
        game.foundCity(_setty2ID, _territory, "Philadelphia");
        assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 9);

        // Player 2 packs the city
        game.packCity(_setty2ID);

        assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 0);
        vm.stopPrank();
    }

    function testMultipleTroopProductions() public {
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
        assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 9);

        uint256 _cityCenterID = getter.getCityCenter(_settyID);

        assertTrue(getter.getInventoryByCityAndType(_settyID, "Cavalry") == NULL);

        // Produce troops
        uint256 _productionID = game.startTroopProduction(_cityCenterID, cavalryTemplateID, 20);
        vm.warp(30);
        game.endTroopProduction(_cityCenterID, _productionID);

        // Get inventory
        assertTrue(getter.getInventoryByCityAndType(_settyID, "Cavalry") != NULL);

        // Produce more troops
        _productionID = game.startTroopProduction(_cityCenterID, cavalryTemplateID, 20);
        vm.warp(60);
        game.endTroopProduction(_cityCenterID, _productionID);

        // Form army
        uint256[] memory _templateIDs = new uint256[](1);
        uint256[] memory _amounts = new uint256[](1);
        _templateIDs[0] = getter.getTemplateByInventoryType("Cavalry");
        _amounts[0] = 30;
        game.organizeArmy(_settyID, _templateIDs, _amounts);
    }

    function testSet() public {
        Set set = new Set();
        set.add(1);
        set.add(2);
        set.add(3);
        set.add(4);
        set.add(5);

        set.remove(2);
        set.remove(3);
        set.remove(4);

        assertEq(set.size(), 2);

        assertEq(set.includes(2), false);
        assertEq(set.includes(3), false);
        assertEq(set.includes(4), false);

        assertEq(set.includes(1), true);
        assertEq(set.includes(5), true);

        set.add(6);
        assertEq(set.includes(6), true);
        assertEq(set.size(), 3);
    }

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
        console.log(_settyID);
        game.moveSettler(_settyID, Position({x: 7, y: 1}));
        game.foundCity(_settyID, _territory, "New Amsterdam");
        assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 9);

        uint256 _cityCenterID = getter.getCityCenter(_settyID);

        // Produce troops
        uint256 _productionID = game.startTroopProduction(_cityCenterID, cavalryTemplateID, 20);
        vm.warp(30);
        game.endTroopProduction(_cityCenterID, _productionID);

        // Pack city and move settler out of former city boundry
        game.packCity(_settyID);
        assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 0);
        vm.warp(32);
        game.moveSettler(_settyID, Position({x: 8, y: 1}));
        vm.warp(34);
        game.moveSettler(_settyID, Position({x: 9, y: 1}));

        console.log(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length);

        // Verify that all previous tiles and buildings are removed
        for (uint256 i = 0; i < _territory.length; i++) {
            // console.log(getter.getComponent("Position").getEntitiesWithValue(abi.encode(_territory[i])).length);
            assertEq(getter.getComponent("Position").getEntitiesWithValue(abi.encode(_territory[i])).length, 0);
        }

        // Found another city
        vm.warp(36);
        game.moveSettler(_settyID, Position({x: 8, y: 1}));
        _territory[0] = Position({x: 7, y: 0});
        _territory[1] = Position({x: 7, y: 1});
        _territory[2] = Position({x: 7, y: 2});
        _territory[3] = Position({x: 8, y: 2});
        _territory[4] = Position({x: 9, y: 2});
        _territory[5] = Position({x: 9, y: 1});
        _territory[6] = Position({x: 9, y: 0});
        _territory[7] = Position({x: 8, y: 0});
        _territory[8] = Position({x: 8, y: 1});
        game.foundCity(_settyID, _territory, "New York");
        assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 9);

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
