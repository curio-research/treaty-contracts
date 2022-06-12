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

    function testEpoch() public {
        uint256 epoch = getter.getEpoch();
        assertEq(epoch, 0);

        vm.warp(100); // set block.timestamp to 100 seconds;
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        vm.warp(200);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 2);
    }

    function testStartProduction() public {
        // fail: start production on invalid location
        vm.expectRevert(bytes("No base found"));
        engine.startProduction(Position({x: 100, y: 100}), 0);

        // fail: player2 attempting to produce in other's base
        vm.prank(player2);
        vm.expectRevert(bytes("Can only produce in own base"));
        engine.startProduction(_player1Pos, 0);

        // fail: player3 in a city attempting to produce a troop transport (water troop)
        vm.prank(player3);
        vm.expectRevert(bytes("Only ports can produce water troops"));
        engine.startProduction(_player3Pos, 1);

        // test when base is already producing troop
        // player1 starts producing and attempts to produce something again on same location
        vm.startPrank(player1);
        engine.startProduction(_player1Pos, 1);
        vm.expectRevert(bytes("Base already producing"));
        engine.startProduction(_player1Pos, 1);
        vm.stopPrank();
    }

    function testSuccessfulProduction() public {
        // player1 produce troop transport
        vm.warp(10);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        produceTroop(_player1Pos, 1, player1);

        // success: verify troop's basic information
        Troop memory _troop = getter.getTroopAt(_player1Pos);
        assertEq(_troop.owner, player1);
        assertEq(_troop.troopTypeId, 1);
        assertEq(_troop.pos.x, _player1Pos.x);
        assertEq(_troop.pos.y, _player1Pos.y);

        // success: verify that troop ID was registered correctly
        _troop = getter.getTroopById(1);
        assertEq(_troop.pos.x, _player1Pos.x);
        assertEq(_troop.pos.y, _player1Pos.y);

        // success: verify the troopType is correct
        TroopType memory _troopType = getter.getTroopType(1);
        assertEq(_troopType.isLandTroop, true);
    }

    function testMoveTroop() public {
        // produce troop at player1 location
        produceTroop(_player1Pos, 2, player1);

        vm.startPrank(player1);

        // fail: move to same location
        vm.expectRevert(bytes("Already at destination"));
        engine.move(1, _player1Pos);

        // fail: move outside the map
        vm.expectRevert(bytes("Destination too far"));
        engine.move(1, Position({x: 0, y: 0}));

        // fail: move to a far location
        vm.expectRevert(bytes("Target out of bound"));
        engine.move(1, Position({x: 100, y: 100}));

        // fail: attempting to move transporter to a city tile
        vm.expectRevert(bytes("Cannot move on land"));
        engine.move(1, Position({x: 5, y: 0}));

        vm.stopPrank();
    }

    function testTooManyMovesPerEpoch() public {
        produceTroop(_player1Pos, 2, player1);

        vm.startPrank(player1);

        // fail: too many moves in 1 epoch
        Position memory _target = Position({x: 7, y: 1});

        // first move
        engine.move(1, _target);
        engine.move(1, _player1Pos);

        vm.expectRevert(bytes("No moves left this epoch"));
        engine.move(1, _target);

        vm.stopPrank();
    }

    function testSuccessMoveTransportTroop() public {
        // produce a troop transport
        produceTroop(_player1Pos, 2, player1);
        vm.startPrank(player1);

        // success: move transport to 7, 1
        Position memory _target = Position({x: 7, y: 1});
        engine.move(1, _target);

        // verify position
        Troop memory _troop = getter.getTroopById(1);
        assertEq(_troop.pos.x, _target.x);
        assertEq(_troop.pos.y, _target.y);

        vm.stopPrank();
    }

    // function testSuccessCaptureBase() public {
    //     // produce an army
    //     produceTroop(_player1Pos, 1, player1);

    //     vm.startPrank(player1);

    //     // capture base below
    //     engine.captureBase(1, Position({x: 6, y: 2}));
    // }

    function testBattle() public {}

    // ------------------------------------------------
    // helper functions
    // ------------------------------------------------

    // produces 1 troop at a desired location
    function produceTroop(
        Position memory _location,
        uint256 _troopType,
        address _player
    ) internal {
        vm.startPrank(_player);
        TroopType memory troopTypeInfo = getter.getTroopType(_troopType);
        engine.startProduction(_location, _troopType); // start production at 1 epoch;

        // fast foward a few epochs
        uint256 startTime = 100;

        for (uint256 i = 1; i < troopTypeInfo.epochsToProduce + 1; i++) {
            vm.warp(startTime + i); // increase time by a few seconds;
            engine.updateEpoch();
        }

        engine.endProduction(_location);
        vm.stopPrank();
    }
}
