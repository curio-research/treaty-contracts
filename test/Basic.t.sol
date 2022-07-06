//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";

// This foundry tests inherits DiamondDeployTest, which sets up the contracts for testing.
contract BasicTest is Test, DiamondDeployTest {
    function testWorldSize() public {
        WorldConstants memory _worldConstants = getter.getWorldConstants();
        assertEq(_worldConstants.worldWidth, 30);
        assertEq(_worldConstants.worldHeight, 20);
    }

    function testOnlyAdmin() public {
        Position memory _pos = Position({x: 3, y: 3});
        uint256 _armyTroopTypeId = indexToId(uint256(TROOP_NAME.ARMY));

        vm.expectRevert(bytes("CURIO: Unauthorized"));
        vm.prank(player2);
        helper.spawnTroop(_pos, player2, _armyTroopTypeId);
    }

    function testInitializePlayer() public {
        Base memory _player1Port = getter.getBaseAt(player1Pos);
        assertTrue(_player1Port.name == BASE_NAME.PORT);
        assertEq(_player1Port.owner, player1);

        Player memory _player1 = getter.getPlayer(player1);
        assertTrue(_player1.active);
        assertEq(_player1.balance, 20);
        assertEq(_player1.totalGoldGenerationPerUpdate, 5);
        assertEq(_player1.totalTroopExpensePerUpdate, 0);

        Base memory _player2Port = getter.getBaseAt(player2Pos);
        assertTrue(_player2Port.name == BASE_NAME.PORT);
        assertEq(_player2Port.owner, player2);

        Player memory _player2 = getter.getPlayer(player2);
        assertTrue(_player2.active);
    }

    function testTransferDiamondOwnership() public {
        vm.prank(deployer);
        ownership.transferOwnership(player1);

        address _owner = ownership.owner();
        assertEq(_owner, player1);
    }

    function testTransferBaseOwnership() public {
        Position memory _pos = Position({x: 6, y: 6});
        assertEq(getter.getBaseAt(_pos).owner, NULL_ADDR);

        vm.prank(deployer);
        helper.transferBaseOwnership(_pos, player1);

        assertEq(getter.getBaseAt(_pos).owner, player1);
    }

    function testUpdatePlayerBalance() public {
        assertEq(getter.getPlayer(player1).balance, 20);
        assertEq(getter.getPlayer(player1).totalGoldGenerationPerUpdate, 5);
        assertEq(getter.getPlayer(player1).totalTroopExpensePerUpdate, 0);

        vm.warp(2);
        helper.updatePlayerBalance(player1);
        assertEq(getter.getPlayer(player1).balance, 25);

        vm.startPrank(deployer);
        helper.spawnTroop(Position({x: 0, y: 0}), player1, destroyerTroopTypeId);
        helper.spawnTroop(Position({x: 0, y: 1}), player1, battleshipTroopTypeId);
        assertEq(getter.getPlayer(player1).totalTroopExpensePerUpdate, 3);
        helper.spawnTroop(Position({x: 0, y: 2}), player1, destroyerTroopTypeId);
        helper.spawnTroop(Position({x: 0, y: 3}), player1, battleshipTroopTypeId);
        assertEq(getter.getPlayer(player1).totalGoldGenerationPerUpdate, 5);
        assertEq(getter.getPlayer(player1).totalTroopExpensePerUpdate, 6);
        vm.stopPrank();

        vm.warp(3);
        helper.updatePlayerBalance(player1);
        assertEq(getter.getPlayer(player1).balance, 24);

        vm.startPrank(deployer);
        helper.transferBaseOwnership(Position({x: 2, y: 0}), player1);
        helper.spawnTroop(Position({x: 3, y: 0}), player1, armyTroopTypeId);
        helper.spawnTroop(Position({x: 0, y: 4}), player1, battleshipTroopTypeId);
        assertEq(getter.getPlayer(player1).totalGoldGenerationPerUpdate, 10);
        assertEq(getter.getPlayer(player1).totalTroopExpensePerUpdate, 8);
        vm.stopPrank();

        vm.warp(4);
        helper.updatePlayerBalance(player1);
        assertEq(getter.getPlayer(player1).balance, 26);
    }
}
