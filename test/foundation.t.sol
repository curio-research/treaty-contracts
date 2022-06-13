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
        Base memory _port = getter.getBase(_portTile.baseId);
        assertTrue(_port.name == BASE_NAME.PORT);
        assertEq(_port.owner, NULL_ADDR);
        assertEq(_port.attackFactor, 100);
        assertEq(_port.defenseFactor, 100);
        assertEq(_port.health, 1);

        Tile memory _cityTile = getter.getTileAt(Position({x: 5, y: 8}));
        assertTrue(_cityTile.terrain == TERRAIN.INLAND);
        assertEq(_cityTile.occupantId, NULL);
        Base memory _city = getter.getBase(_cityTile.baseId);
        assertTrue(_city.name == BASE_NAME.CITY);
        assertEq(_city.owner, NULL_ADDR);
        assertEq(_city.attackFactor, 100);
        assertEq(_city.defenseFactor, 100);
        assertEq(_city.health, 1);
    }

    function testOnlyAdmin() public {
        Position memory _pos = Position({x: 3, y: 3});
        uint256 _armyTroopTypeId = indexToId(uint256(TROOP_NAME.ARMY));

        vm.expectRevert(Unauthorized.selector);
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

    // ----------------------------------------------------------------------
    // LOGIC TESTS
    // ----------------------------------------------------------------------

    function testProductionFailure() public {
        // fail: start production on invalid location
        vm.expectRevert(bytes("No base found"));
        engine.startProduction(Position({x: 100, y: 100}), armyTroopTypeId);

        // fail: player2 attempting to produce in other's base
        vm.prank(player2);
        vm.expectRevert(bytes("Can only produce in own base"));
        engine.startProduction(player1Pos, armyTroopTypeId);

        // fail: player3 in a city attempting to produce a troop transport (water troop)
        vm.prank(player3);
        vm.expectRevert(bytes("Only ports can produce water troops"));
        engine.startProduction(player3Pos, troopTransportTroopTypeId);

        // fail: base is already producing troop
        // player1 starts producing and attempts to produce something again on same location
        vm.startPrank(player1);
        engine.startProduction(player1Pos, troopTransportTroopTypeId);
        vm.expectRevert(bytes("Base already producing"));
        engine.startProduction(player1Pos, troopTransportTroopTypeId);

        // fail: player1 attempting to end production before enough epochs
        uint256 _startTime = 20;
        vm.warp(_startTime);
        engine.updateEpoch();
        vm.expectRevert(bytes("Troop needs more epochs for production"));
        engine.endProduction(player1Pos);
        vm.stopPrank();

        // fail: player1 finish producing troop on an occupied base
        vm.prank(deployer);
        engine.spawnTroop(player1Pos, player1, armyTroopTypeId);
        for (uint256 i = 1; i <= troopTransportTroopType.epochsToProduce; i++) {
            vm.warp(_startTime + i * 10); // increase time by a few seconds
            engine.updateEpoch();
        }
        vm.prank(player1);
        vm.expectRevert(bytes("Base occupied by another troop"));
        engine.endProduction(player1Pos);
    }

    function testProductionSuccess() public {
        // player1 produce troop transport
        vm.warp(10);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        produceTroop(player1Pos, troopTransportTroopTypeId, player1);

        // success: verify troop's basic information
        Troop memory _troop = getter.getTroopAt(player1Pos);
        assertEq(_troop.owner, player1);
        assertEq(_troop.troopTypeId, troopTransportTroopTypeId);
        assertEq(_troop.pos.x, player1Pos.x);
        assertEq(_troop.pos.y, player1Pos.y);

        // success: verify that troop ID was registered correctly
        _troop = getter.getTroop(initTroopNonce);
        assertEq(_troop.pos.x, player1Pos.x);
        assertEq(_troop.pos.y, player1Pos.y);

        // success: verify the troopType is correct
        TroopType memory _troopType = getter.getTroopType(armyTroopTypeId);
        assertTrue(_troopType.isLandTroop);
    }

    function testMoveFailure() public {
        // spawn troop at player1 location
        vm.prank(deployer);
        engine.spawnTroop(player1Pos, player1, troopTransportTroopTypeId);
        uint256 _troopId = initTroopNonce;

        vm.startPrank(player1);

        // fail: move to same location
        vm.expectRevert(bytes("Already at destination"));
        engine.move(_troopId, player1Pos);

        // fail: move to a far location
        vm.expectRevert(bytes("Destination too far"));
        engine.move(_troopId, Position({x: 0, y: 0}));

        // fail: move outside of map
        vm.expectRevert(bytes("Target out of bound"));
        engine.move(_troopId, Position({x: 100, y: 100}));

        // fail: attempting to move transport to a city tile
        vm.expectRevert(bytes("Cannot move on land"));
        engine.move(_troopId, Position({x: 5, y: 0}));

        // fail: move onto an opponent's base
        engine.move(_troopId, Position({x: 7, y: 2}));
        vm.expectRevert(bytes("Cannot move onto opponent base"));
        engine.move(_troopId, player2Pos);

        vm.stopPrank();
    }

    function testTooManyMovesPerEpoch() public {
        vm.prank(deployer);
        engine.spawnTroop(player1Pos, player1, troopTransportTroopTypeId);
        uint256 _troopId = initTroopNonce;

        vm.startPrank(player1);

        // fail: too many moves in 1 epoch
        Position memory _target = Position({x: 7, y: 1});

        // first move
        engine.move(_troopId, _target);
        engine.move(_troopId, player1Pos);

        vm.expectRevert(bytes("No moves left this epoch"));
        engine.move(_troopId, _target);

        vm.stopPrank();
    }

    function testMoveSuccess() public {
        // produce a troop transport
        vm.prank(deployer);
        engine.spawnTroop(player1Pos, player1, troopTransportTroopTypeId);

        vm.startPrank(player1);

        // success: move transport to 7, 1
        Position memory _target = Position({x: 7, y: 1});
        engine.move(1, _target);

        // verify position
        Troop memory _troop = getter.getTroop(1);
        assertEq(_troop.pos.x, _target.x);
        assertEq(_troop.pos.y, _target.y);

        vm.stopPrank();
    }

    function testBattleFailure() public {}

    function testBattleSuccess() public {}

    function testCaptureBaseFailure() public {
        vm.startPrank(deployer);
        engine.spawnTroop(Position({x: 5, y: 1}), player1, armyTroopTypeId);
        uint256 _armyId = initTroopNonce;
        engine.spawnTroop(Position({x: 7, y: 3}), player1, destroyerTroopTypeId);
        uint256 _destroyerId = initTroopNonce + 1;
        vm.stopPrank();

        vm.prank(player2);
        vm.expectRevert(bytes("Can only capture with own troop"));
        engine.captureBase(_armyId, player3Pos);

        vm.startPrank(player1);
        vm.expectRevert(bytes("Destination too far"));
        engine.captureBase(_armyId, player2Pos);

        vm.expectRevert(bytes("Only a land troop can capture bases"));
        engine.captureBase(_destroyerId, player2Pos);

        vm.expectRevert(bytes("No base to capture"));
        engine.captureBase(_armyId, Position({x: 4, y: 2}));

        vm.expectRevert(bytes("Base already owned"));
        engine.captureBase(_armyId, player1Pos);

        vm.expectRevert(bytes("Need to attack first"));
        engine.captureBase(_armyId, player3Pos);
        vm.stopPrank();

        vm.prank(deployer);
        engine.spawnTroop(player3Pos, player3, armyTroopTypeId);
        vm.prank(player1);
        vm.expectRevert(bytes("Destination tile occupied"));
        engine.captureBase(_armyId, player3Pos);
    }

    function testCaptureBaseSuccess() public {
        vm.startPrank(deployer);
        engine.spawnTroop(Position({x: 6, y: 2}), player1, armyTroopTypeId);
        uint256 _armyId = initTroopNonce;
        engine.spawnTroop(Position({x: 7, y: 3}), player1, destroyerTroopTypeId);
        uint256 _destroyerId = initTroopNonce + 1;
        vm.stopPrank();

        Base memory _base = getter.getBaseAt(player2Pos);
        assertEq(_base.owner, player2);

        vm.warp(20);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        vm.startPrank(player1);
        engine.battle(_destroyerId, player2Pos);
        engine.captureBase(_armyId, player2Pos);
        vm.stopPrank();

        Troop memory _army = getter.getTroop(_armyId);
        assertEq(_army.pos.x, player2Pos.x);
        assertEq(_army.pos.y, player2Pos.y);
        assertEq(_army.health, getter.getTroopType(armyTroopTypeId).maxHealth);

        _base = getter.getBaseAt(player2Pos);
        assertEq(_base.owner, player1);

        vm.coinbase(deployer);
    }

    function testBattle() public {}

    // ------------------------------------------------
    // helper functions
    // ------------------------------------------------

    // produces 1 troop at a desired location
    function produceTroop(
        Position memory _location,
        uint256 _troopTypeId,
        address _player
    ) internal {
        vm.startPrank(_player);
        TroopType memory troopTypeInfo = getter.getTroopType(_troopTypeId);
        engine.startProduction(_location, _troopTypeId); // start production at 1 epoch

        // fast foward a few epochs
        uint256 startTime = 100;

        for (uint256 i = 1; i <= troopTypeInfo.epochsToProduce; i++) {
            vm.warp(startTime + i * 10); // increase time by a few seconds
            engine.updateEpoch();
        }

        engine.endProduction(_location);
        vm.stopPrank();
    }
}
