<<<<<<< HEAD
=======
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";

contract StackingTest is Test, DiamondDeployTest {
    function testArmyBasics() public {
        assertEq(getter.getPlayer(player1).numOwnedBases, 1);
        assertEq(getter.getPlayer(player1).numOwnedTroops, 0);

        // spawn troop => army automatically generated
        vm.startPrank(deployer);
        helper.spawnTroop(player1Pos, player1, infantryTroopTypeId);
        Army memory army1 = getter.getArmyAt(player1Pos);
        assertEq(army1.owner, player1); // check ownership
        assertEq(army1.pos.x, player1Pos.x); // check position
        assertEq(army1.pos.y, player1Pos.y);
    }

    function testSpawnTroop() public {
        vm.startPrank(deployer);
        helper.spawnTroop(player1Pos, player1, infantryTroopTypeId); // spawn an infrantry
        vm.stopPrank();

        Army memory army1 = getter.getArmyAt(player1Pos);

        assertEq(army1.armyTroopIds.length, 1);
    }

    function testMoveArmyWithSingleTroop() public {
        vm.startPrank(deployer);
        helper.spawnTroop(player1Pos, player1, infantryTroopTypeId); // spawn an infrantry
        vm.stopPrank();

        vm.startPrank(player1);
        Position memory targetPos = Position({x: 6, y: 2});

        engine.march(1, targetPos); // move army to (6, 2);

        Army memory army1 = getter.getArmyAt(targetPos);
        assertEq(army1.pos.x, army1.pos.x); // check position
        assertEq(army1.pos.y, army1.pos.y);
        assertEq(army1.armyTroopIds.length, 1); // check the troop is inside
    }

    function testMoveTroop() public {
        vm.startPrank(deployer);
        helper.spawnTroop(player1Pos, player1, infantryTroopTypeId); // spawn an infrantry. troop # 1
        Position memory army2position = Position({x: 6, y: 2});
        helper.spawnTroop(army2position, player1, infantryTroopTypeId); // spawn an infrantry. troop #2
        vm.stopPrank();

        vm.startPrank(player1);
        engine.moveTroop(1, army2position);
        vm.stopPrank();

        // verify initial tile's details
        Tile memory tile = getter.getTileAt(player1Pos);
        assertEq(tile.occupantId, 0);

        // // check that the original army #1 is deleted
        // Army memory army1 = getter.getArmy(1);
        // // TODO: figure out what happens to a deleted key value pair in mapping

        // // verify target army's details
        Army memory targetArmy = getter.getArmyAt(army2position);
        assertEq(targetArmy.armyTroopIds.length, 2); // check that the new army has 2 troops inside
        assertEq(targetArmy.armyTroopIds[0], 2); // new army contains troop #1 and #2
        assertEq(targetArmy.armyTroopIds[1], 1);

        // // ------------------------------------------------
        // // move troop1 back to original tile

        vm.startPrank(player1);
        engine.moveTroop(1, player1Pos);
        vm.stopPrank();

        Army memory separatedArmy = getter.getArmyAt(player1Pos);
        assertEq(separatedArmy.armyTroopIds.length, 1);
        assertEq(separatedArmy.armyTroopIds[0], 1); // troop #1 moved out

        Army memory army2 = getter.getArmyAt(army2position);
        assertEq(army2.armyTroopIds.length, 1);
        assertEq(army2.armyTroopIds[0], 2); // troop #2 in old tile
    }

    function testMarch() public {
        // spawn two troops and combine them
        vm.startPrank(deployer);
        helper.spawnTroop(player1Pos, player1, infantryTroopTypeId); // spawn an infrantry. troop # 1
        Position memory army2position = Position({x: 6, y: 2});
        helper.spawnTroop(army2position, player1, infantryTroopTypeId); // spawn an infrantry. troop #2
        vm.stopPrank();

        vm.startPrank(player1);
        engine.moveTroop(1, army2position);
        vm.stopPrank();

        // march
        vm.startPrank(player1);
        engine.march(2, player1Pos);
        vm.stopPrank();

        Tile memory tile1 = getter.getTileAt(player1Pos); // where march moved to
        assertEq(tile1.occupantId, 2);

        Tile memory tile2 = getter.getTileAt(army2position); // where the troops left from
        assertEq(tile2.occupantId, 0);
    }

    function testInfantryMove() public {
        // spawn 1 infantry 1 destroyer and combine them
        vm.startPrank(deployer);
        helper.spawnTroop(player1Pos, player1, infantryTroopTypeId); // spawn an infrantry. troop # 1
        Position memory destroyerPosition = Position({x: 7, y: 1});
        helper.spawnTroop(destroyerPosition, player1, destroyerTroopTypeId); // spawn an destroyer. troop #2
        vm.stopPrank();

        vm.startPrank(player1);
        engine.moveTroop(1, destroyerPosition); // move infantry to destroyer

        Tile memory tile = getter.getTileAt(destroyerPosition); // where march moved to
        assertEq(tile.occupantId, 2);

        Army memory army = getter.getArmyAt(destroyerPosition);
        assertEq(army.armyTroopIds.length, 2); // new tile should have infantry + destroyer

        vm.expectRevert(bytes("CURIO: Troops and land types not compatible"));
        engine.march(2, getRightPos(destroyerPosition));
    }
}
>>>>>>> 87f4ab6 (Basic testing)
