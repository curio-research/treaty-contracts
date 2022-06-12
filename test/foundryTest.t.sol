//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "./diamondDeploy.t.sol";
import "contracts/facets/GetterFacet.sol";

// This foundry tests inherits DiamondDeployTest, which sets up the contracts for testing.
contract FoundryTest is Test, DiamondDeployTest {
    event NewPlayer(address _player, Position _pos);
    event EpochUpdate(uint256 _epoch, uint256 _time);
    event Moved(address _player, uint256 _troopId, Position _pos);
    event Attacked(address _player, uint256 _troopId, address _targetPlayer, uint256 _targetId);
    event Death(address _player, uint256 _troopId);
    event BaseCaptured(address _player, uint256 _troopId, uint256 _baseId);
    event ProductionStarted(address _player, uint256 _baseId, uint256 _troopTypeId);
    event NewTroop(address _player, uint256 _troopId, Position _pos);
    event Repaired(address _player, uint256 _troopId, uint256 _health);
    event Recovered(address _player, uint256 _troopId);

    // ----------------------------------------------------------------------
    // BASIC TESTS
    // ----------------------------------------------------------------------

    function testWorldSize() public {
        WorldConstants memory _worldConstants = getter.getWorldConstants();
        assertEq(_worldConstants.worldWidth, 30);
        assertEq(_worldConstants.worldHeight, 20);
    }

    function testSetMapChunk() public {
        Tile memory _coastTile = getter.getTileAt(Position({x: 8, y: 2}));
        assertTrue(_coastTile.terrain == TERRAIN.COAST);
        assertEq(_coastTile.occupantId, NULL);
        assertEq(_coastTile.baseId, NULL);

        Tile memory _landTile = getter.getTileAt(Position({x: 3, y: 3}));
        assertTrue(_landTile.terrain == TERRAIN.INLAND);
        assertEq(_landTile.occupantId, NULL);
        assertEq(_landTile.baseId, NULL);

        Tile memory _waterTile = getter.getTileAt(Position({x: 0, y: 1}));
        assertTrue(_waterTile.terrain == TERRAIN.WATER);
        assertEq(_waterTile.occupantId, NULL);
        assertEq(_waterTile.baseId, NULL);

        Tile memory _portTile = getter.getTileAt(Position({x: 6, y: 5}));
        assertTrue(_portTile.terrain == TERRAIN.COAST);
        assertEq(_portTile.occupantId, NULL);
        Base memory _port = getter.getBaseById(_portTile.baseId);
        assertTrue(_port.name == BASE_NAME.PORT);
        assertEq(_port.owner, address(0));
        assertEq(_port.attackFactor, 100);
        assertEq(_port.defenseFactor, 100);
        assertEq(_port.health, 1);

        Tile memory _cityTile = getter.getTileAt(Position({x: 5, y: 8}));
        assertTrue(_cityTile.terrain == TERRAIN.INLAND);
        assertEq(_cityTile.occupantId, NULL);
        Base memory _city = getter.getBaseById(_cityTile.baseId);
        assertTrue(_city.name == BASE_NAME.CITY);
        assertEq(_city.owner, address(0));
        assertEq(_city.attackFactor, 100);
        assertEq(_city.defenseFactor, 100);
        assertEq(_city.health, 1);
    }

    function testOnlyAdmin() public {
        Position memory _pos = Position({x: 3, y: 3});
        uint256 _armyTroopTypeId = 0;

        vm.expectRevert(Unauthorized.selector);
        vm.prank(player2);
        engine.spawnTroop(_pos, player2, _armyTroopTypeId);
    }

    function testInitializePlayer() public {
        Position memory _player1Pos = Position({x: 6, y: 1});
        Position memory _player2Pos = Position({x: 6, y: 3});

        // TODO: Upgrade logic such that everyone can initialize themselves. figure out if we want a whitelist or something

        vm.prank(deployer);
        engine.initializePlayer(_player1Pos, player1);
        vm.prank(deployer);
        engine.initializePlayer(_player2Pos, player2);

        Base memory _player1Port = getter.getBaseAt(_player1Pos);
        assertTrue(_player1Port.name == BASE_NAME.PORT);
        assertEq(_player1Port.owner, player1);

        Base memory _player2Port = getter.getBaseAt(_player2Pos);
        assertTrue(_player2Port.name == BASE_NAME.PORT);
        assertEq(_player2Port.owner, player2);
    }

    function testTransferDiamondOwnership() public {
        vm.prank(deployer);
        ownership.transferOwnership(player1);

        address _owner = ownership.owner();
        assertEq(_owner, player1);
    }
}
