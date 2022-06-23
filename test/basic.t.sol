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

    // function testSetMapChunk() public {
    //     Tile memory _coastTile = getter.getTileAt(Position({x: 8, y: 2}));
    //     assertTrue(_coastTile.terrain == TERRAIN.COAST);
    //     assertEq(_coastTile.occupantId, NULL);
    //     assertEq(_coastTile.baseId, NULL);

    //     Tile memory _landTile = getter.getTileAt(Position({x: 3, y: 3}));
    //     assertTrue(_landTile.terrain == TERRAIN.INLAND);
    //     assertEq(_landTile.occupantId, NULL);
    //     assertEq(_landTile.baseId, NULL);

    //     Tile memory _waterTile = getter.getTileAt(Position({x: 0, y: 1}));
    //     assertTrue(_waterTile.terrain == TERRAIN.WATER);
    //     assertEq(_waterTile.occupantId, NULL);
    //     assertEq(_waterTile.baseId, NULL);

    //     Tile memory _portTile = getter.getTileAt(Position({x: 6, y: 5}));
    //     assertTrue(_portTile.terrain == TERRAIN.COAST);
    //     assertEq(_portTile.occupantId, NULL);
    //     Base memory _port = getter.getBase(_portTile.baseId);
    //     assertTrue(_port.name == BASE_NAME.PORT);
    //     assertEq(_port.owner, NULL_ADDR);
    //     assertEq(_port.attackFactor, 100);
    //     assertEq(_port.defenseFactor, 100);
    //     assertEq(_port.health, 1);

    //     Tile memory _cityTile = getter.getTileAt(Position({x: 5, y: 8}));
    //     assertTrue(_cityTile.terrain == TERRAIN.INLAND);
    //     assertEq(_cityTile.occupantId, NULL);
    //     Base memory _city = getter.getBase(_cityTile.baseId);
    //     assertTrue(_city.name == BASE_NAME.CITY);
    //     assertEq(_city.owner, NULL_ADDR);
    //     assertEq(_city.attackFactor, 100);
    //     assertEq(_city.defenseFactor, 100);
    //     assertEq(_city.health, 1);
    // }

    function testOnlyAdmin() public {
        Position memory _pos = Position({x: 3, y: 3});
        uint256 _armyTroopTypeId = indexToId(uint256(TROOP_NAME.ARMY));

        vm.expectRevert(bytes("Unauthorized"));
        vm.prank(player2);
        engine.spawnTroop(_pos, player2, _armyTroopTypeId);
    }

    function testInitializePlayer() public {
        Base memory _player1Port = getter.getBaseAt(player1Pos);
        assertTrue(_player1Port.name == BASE_NAME.PORT);
        assertEq(_player1Port.owner, player1);

        Player memory _player1 = getter.getPlayer(player1);
        assertTrue(_player1.active);

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

    function testEpoch() public {
        uint256 epoch = getter.getEpoch();
        assertEq(epoch, 0);

        vm.warp(100); // set block.timestamp to 100 seconds;
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        vm.warp(105);
        vm.expectRevert(bytes("Not enough time has elapsed since last epoch"));
        engine.updateEpoch();

        vm.warp(200);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 2);
    }

    function testTransferBaseOwnership() public {
        Position memory _pos = Position({x: 6, y: 6});
        assertEq(getter.getBaseAt(_pos).owner, NULL_ADDR);

        vm.prank(deployer);
        engine.transferBaseOwnership(_pos, player1);

        assertEq(getter.getBaseAt(_pos).owner, player1);
    }
}
