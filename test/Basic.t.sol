//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";

contract TreatyTest is Test, DiamondDeployTest {
    function testBattle() public {
        uint256 moscowID = getter.getSettlerAt(player1Pos);
        uint256 kievID = getter.getSettlerAt(player2Pos);
        uint256 time = block.timestamp + 10;
        vm.warp(time);

        // Player 1 founds city
        {
            Position[] memory moscowTiles = new Position[](9);
            moscowTiles[0] = Position({x: 50, y: 0});
            moscowTiles[1] = Position({x: 50, y: 10});
            moscowTiles[2] = Position({x: 50, y: 20});
            moscowTiles[3] = Position({x: 60, y: 20});
            moscowTiles[4] = Position({x: 70, y: 20});
            moscowTiles[5] = Position({x: 70, y: 10});
            moscowTiles[6] = Position({x: 70, y: 0});
            moscowTiles[7] = Position({x: 60, y: 0});
            moscowTiles[8] = Position({x: 60, y: 10});
            vm.prank(player1);
            game.foundCity(moscowID, moscowTiles, "Moscow");
            console.log("Moscow is founded");
        }

        // Player 2 founds city
        {
            Position[] memory kievTiles = new Position[](9);
            kievTiles[0] = Position({x: 50, y: 30});
            kievTiles[1] = Position({x: 50, y: 40});
            kievTiles[2] = Position({x: 50, y: 50});
            kievTiles[3] = Position({x: 60, y: 50});
            kievTiles[4] = Position({x: 70, y: 50});
            kievTiles[5] = Position({x: 70, y: 40});
            kievTiles[6] = Position({x: 70, y: 30});
            kievTiles[7] = Position({x: 60, y: 30});
            kievTiles[8] = Position({x: 60, y: 40});
            vm.startPrank(player2);
            game.move(kievID, Position({x: 60, y: 40}));
            game.foundCity(kievID, kievTiles, "Kiev");
            vm.stopPrank();
            console.log("Kiev is founded");
        }

        // Player 1 produces troops and organizes army
        {
            uint256[] memory moscowArmyTemplateIDs = new uint256[](2);
            moscowArmyTemplateIDs[0] = cavalryTemplateID;
            moscowArmyTemplateIDs[1] = infantryTemplateID;
            uint256[] memory moscowArmyAmounts = new uint256[](2);
            moscowArmyAmounts[0] = 500;
            moscowArmyAmounts[1] = 500;

            vm.startPrank(player1);
            uint256 kremlinID = getter.getCityCenter(moscowID);
            uint256 kremlinProdID = game.startTroopProduction(kremlinID, moscowArmyTemplateIDs[0], moscowArmyAmounts[0]);
            time += moscowArmyAmounts[0];
            vm.warp(time);
            game.endTroopProduction(kremlinID, kremlinProdID);
            kremlinProdID = game.startTroopProduction(kremlinID, moscowArmyTemplateIDs[1], moscowArmyAmounts[1]);
            time += moscowArmyAmounts[1];
            vm.warp(time);
            game.endTroopProduction(kremlinID, kremlinProdID);
            game.organizeArmy(moscowID, moscowArmyTemplateIDs, moscowArmyAmounts);
            vm.stopPrank();

            console.log("Moscow mobilizes");
        }
        time += 500 + 500;
        vm.warp(time);
        uint256 moscowArmyID = getter.getArmyAt(Position({x: 65, y: 15}));

        // Player 2 produces troops and organizes army
        {
            uint256[] memory kievArmyTemplateIDs = new uint256[](2);
            kievArmyTemplateIDs[0] = infantryTemplateID;
            kievArmyTemplateIDs[1] = archerTemplateID;
            uint256[] memory kievArmyAmounts = new uint256[](2);
            kievArmyAmounts[0] = 30;
            kievArmyAmounts[1] = 70;

            vm.startPrank(player2);
            uint256 mariinskyiID = getter.getCityCenter(kievID);
            uint256 mariinskyiProdID = game.startTroopProduction(mariinskyiID, kievArmyTemplateIDs[0], kievArmyAmounts[0]);
            time += kievArmyAmounts[0];
            vm.warp(time);
            game.endTroopProduction(mariinskyiID, mariinskyiProdID);
            mariinskyiProdID = game.startTroopProduction(mariinskyiID, kievArmyTemplateIDs[1], kievArmyAmounts[1]);
            time += kievArmyAmounts[1];
            vm.warp(time);
            game.endTroopProduction(mariinskyiID, mariinskyiProdID);
            game.organizeArmy(kievID, kievArmyTemplateIDs, kievArmyAmounts);
            vm.stopPrank();

            console.log("Kiev mobilizes");
        }
        time += 30 + 70;
        vm.warp(time);
        uint256 kievArmyID = getter.getArmyAt(Position({x: 65, y: 45}));

        // Moscow and Kiev move their armies next to one another
        time += 5;
        vm.warp(time);
        vm.prank(player1);
        game.move(moscowArmyID, Position({x: 60, y: 15}));
        vm.prank(player2);
        game.move(kievArmyID, Position({x: 62, y: 42}));
        time += 5;
        vm.warp(time);
        vm.prank(player1);
        game.move(moscowArmyID, Position({x: 60, y: 20}));
        vm.prank(player2);
        game.move(kievArmyID, Position({x: 61, y: 38}));
        time += 5;
        vm.warp(time);
        vm.prank(player1);
        game.move(moscowArmyID, Position({x: 60, y: 25}));
        vm.prank(player2);
        game.move(kievArmyID, Position({x: 60, y: 34}));
        time += 5;
        vm.warp(time);
        vm.prank(player2);
        game.move(kievArmyID, Position({x: 60, y: 30}));
        console.log("Troops are on the frontier, waiting for command...");

        // Check battle preconditions
        uint256 moscowInfantryAmount;
        uint256 kievArcherAmount;
        {
            assertEq(abi.decode(getter.getComponent("Position").getBytesValue(moscowArmyID), (Position)).y, 25);
            assertEq(abi.decode(getter.getComponent("Position").getBytesValue(kievArmyID), (Position)).y, 30);
            moscowInfantryAmount = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getArmyConstituents(moscowArmyID)[1]), (uint256));
            assertEq(moscowInfantryAmount, 500);
            kievArcherAmount = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getArmyConstituents(kievArmyID)[1]), (uint256));
            assertEq(kievArcherAmount, 70);
            console.log("Everything is in order");
        }

        // Moscow's army battles Kiev's army
        {
            vm.prank(player1);
            game.battle(moscowArmyID, kievArmyID);
            console.log("First battle takes place");
        }

        // Check post conditions
        {
            assertTrue(Set(getter.getEntitiesAddr()).includes(moscowArmyID));
            assertTrue(Set(getter.getEntitiesAddr()).includes(kievArmyID));
            moscowInfantryAmount = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getArmyConstituents(moscowArmyID)[1]), (uint256));
            assertGe(moscowInfantryAmount, 500 - 20);
            assertLe(moscowInfantryAmount, 500 - 3);
            uint256 archerIndex = getter.getArmyConstituents(kievArmyID).length == 2 ? 1 : 0;
            kievArcherAmount = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getArmyConstituents(kievArmyID)[archerIndex]), (uint256));
            assertGe(kievArcherAmount, 70 - 50);
            assertLe(kievArcherAmount, 70 - 20);
            console.log("Casualties are heavy on both sides, but especially for Kiev");
        }

        // One more round of battle and Kiev's army is dead
        {
            vm.prank(player1);
            game.battle(moscowArmyID, kievArmyID);
            assertTrue(Set(getter.getEntitiesAddr()).includes(moscowArmyID));
            assertFalse(Set(getter.getEntitiesAddr()).includes(kievArmyID));
            console.log("The road to Kiev is clear");
        }

        // Moscow's army attacks the city of Kiev
        time += 5;
        vm.warp(time);
        {
            vm.startPrank(player1);
            game.move(moscowArmyID, Position({x: 60, y: 29}));
            game.battle(moscowArmyID, kievID);
            vm.stopPrank();
            moscowInfantryAmount = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getArmyConstituents(moscowArmyID)[1]), (uint256));
            assertGe(moscowInfantryAmount, 500 - 40);
            assertLe(moscowInfantryAmount, 500 - 20); // FIXME
            uint256 kievDefenseAmount = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getCityGuard(kievID)), (uint256));
            assertGe(kievDefenseAmount, _generateWorldConstants().cityAmount - 50);
            assertLe(moscowInfantryAmount, _generateWorldConstants().cityAmount - 20); // FIXME
            console.log("Moscow encounters great setback occupying Kiev");
        }

        // TODO: repeat battle until Moscow's army dies at the foot of Kiev
        // TODO: test with inventory seizures
    }

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
        _territory[0] = Position({x: 50, y: 20});
        _territory[1] = Position({x: 50, y: 30});
        _territory[2] = Position({x: 50, y: 40});
        _territory[3] = Position({x: 60, y: 40});
        _territory[4] = Position({x: 70, y: 40});
        _territory[5] = Position({x: 70, y: 30});
        _territory[6] = Position({x: 70, y: 20});
        _territory[7] = Position({x: 60, y: 20});
        _territory[8] = Position({x: 60, y: 30});

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
        _territory[0] = Position({x: 60, y: 0});
        _territory[1] = Position({x: 60, y: 10});
        _territory[2] = Position({x: 60, y: 20});
        _territory[3] = Position({x: 70, y: 20});
        _territory[4] = Position({x: 80, y: 20});
        _territory[5] = Position({x: 80, y: 10});
        _territory[6] = Position({x: 80, y: 0});
        _territory[7] = Position({x: 70, y: 0});
        _territory[8] = Position({x: 70, y: 10});

        vm.startPrank(player1);

        // Found city
        vm.warp(3);
        uint256 _settyID = getter.getSettlerAt(player1Pos);
        game.move(_settyID, Position({x: 70, y: 10}));
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
        _territory[0] = Position({x: 60, y: 0});
        _territory[1] = Position({x: 60, y: 10});
        _territory[2] = Position({x: 60, y: 20});
        _territory[3] = Position({x: 70, y: 20});
        _territory[4] = Position({x: 80, y: 20});
        _territory[5] = Position({x: 80, y: 10});
        _territory[6] = Position({x: 80, y: 0});
        _territory[7] = Position({x: 70, y: 0});
        _territory[8] = Position({x: 70, y: 10});

        vm.startPrank(player1);

        // Found city
        uint256 _settyID = getter.getSettlerAt(player1Pos);
        vm.warp(3);
        game.move(_settyID, Position({x: 65, y: 10}));
        vm.warp(4);
        game.move(_settyID, Position({x: 70, y: 10}));
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
        game.move(_settyID, Position({x: 75, y: 10}));
        vm.warp(33);
        game.move(_settyID, Position({x: 80, y: 10}));
        vm.warp(34);
        game.move(_settyID, Position({x: 85, y: 10}));
        vm.warp(35);
        game.move(_settyID, Position({x: 90, y: 10}));

        // Verify that all previous tiles and buildings are removed
        for (uint256 i = 0; i < _territory.length; i++) {
            assertEq(getter.getComponent("Position").getEntitiesWithValue(abi.encode(_territory[i])).length, 0);
        }

        // Found another city
        vm.warp(36);
        game.move(_settyID, Position({x: 85, y: 10}));
        vm.warp(37);
        game.move(_settyID, Position({x: 80, y: 10}));
        _territory[0] = Position({x: 70, y: 0});
        _territory[1] = Position({x: 70, y: 10});
        _territory[2] = Position({x: 70, y: 20});
        _territory[3] = Position({x: 80, y: 20});
        _territory[4] = Position({x: 90, y: 20});
        _territory[5] = Position({x: 90, y: 10});
        _territory[6] = Position({x: 90, y: 0});
        _territory[7] = Position({x: 80, y: 0});
        _territory[8] = Position({x: 80, y: 10});
        game.foundCity(_settyID, _territory, "New York");
        assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 9);

        vm.stopPrank();
    }

    // function testTreatyBasics() public {
    //     Position[] memory _territory = new Position[](9);
    //     _territory[0] = Position({x: 50, y: 0});
    //     _territory[1] = Position({x: 50, y: 10});
    //     _territory[2] = Position({x: 50, y: 20});
    //     _territory[3] = Position({x: 60, y: 20});
    //     _territory[4] = Position({x: 70, y: 20});
    //     _territory[5] = Position({x: 70, y: 10});
    //     _territory[6] = Position({x: 70, y: 0});
    //     _territory[7] = Position({x: 60, y: 0});
    //     _territory[8] = Position({x: 60, y: 10});

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
    //     game.moveArmy(_army1, Position({x: 60, y: 20}));

    //     game.denounceTreaty(address(nato));
    //     vm.stopPrank();
    // }
}
