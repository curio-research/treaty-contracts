//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";

contract LogicTest is Test, DiamondDeployTest {
    // TODO: add tests for events
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

    // Production
    function testProductionFailure() public {
        // fail: start production on invalid location
        vm.expectRevert(bytes("CURIO: Out of bound"));
        engine.startProduction(Position({x: 100, y: 100}), armyTroopTypeId);

        // fail: player2 attempting to produce in other's base
        vm.prank(player2);
        vm.expectRevert(bytes("CURIO: Can only produce in own base"));
        engine.startProduction(player1Pos, armyTroopTypeId);

        // fail: player3 in a city attempting to produce a troop transport (water troop)
        vm.prank(player3);
        vm.expectRevert(bytes("CURIO: Only ports can produce water troops"));
        engine.startProduction(player3Pos, troopTransportTroopTypeId);

        // fail: base is already producing troop
        // player1 starts producing and attempts to produce something again on same location
        vm.startPrank(player1);
        engine.startProduction(player1Pos, troopTransportTroopTypeId);
        vm.expectRevert(bytes("CURIO: Base already producing"));
        engine.startProduction(player1Pos, troopTransportTroopTypeId);

        // fail: player1 attempting to end production before enough epochs
        uint256 _startTime = 20;
        vm.warp(_startTime);
        engine.updateEpoch();
        vm.expectRevert(bytes("CURIO: Troop needs more epochs for production"));
        engine.endProduction(player1Pos);
        vm.stopPrank();

        // fail: player1 finish producing troop on an occupied base
        vm.prank(deployer);
        admin.spawnTroop(player1Pos, player1, armyTroopTypeId);
        for (uint256 i = 1; i <= troopTransportTroopType.epochsToProduce; i++) {
            vm.warp(_startTime + i * 10); // increase time by a few seconds
            engine.updateEpoch();
        }
        vm.prank(player1);
        vm.expectRevert(bytes("CURIO: Base occupied by another troop"));
        engine.endProduction(player1Pos);
    }

    function testProduction() public {
        // player1 produce troop transport
        vm.warp(10);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        produceTroop(player1Pos, troopTransportTroopTypeId, player1, 100);

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
        TroopType memory _troopType = getter.getTroopType(_troop.troopTypeId);
        assertTrue(!_troopType.isLandTroop);

        // immediately produce another troop, which should succeed
        vm.prank(player1);
        engine.move(initTroopNonce, Position({x: 7, y: 1}));
        produceTroop(player1Pos, troopTransportTroopTypeId, player1, 10000);

        // success: verify troop's basic information
        _troop = getter.getTroopAt(player1Pos);
        assertEq(_troop.owner, player1);
        assertEq(_troop.troopTypeId, troopTransportTroopTypeId);
        assertEq(_troop.pos.x, player1Pos.x);
        assertEq(_troop.pos.y, player1Pos.y);
    }

    // Move
    function testMoveFailure() public {
        // spawn troop at player1 location
        vm.startPrank(deployer);
        admin.spawnTroop(player1Pos, player1, troopTransportTroopTypeId);
        admin.spawnTroop(Position({x: 7, y: 4}), player1, troopTransportTroopTypeId);
        vm.stopPrank();
        uint256 _troopId = initTroopNonce;

        vm.startPrank(player1);

        // fail: move to same location
        vm.expectRevert(bytes("CURIO: Already at destination"));
        engine.move(_troopId, player1Pos);

        // fail: move to a far location
        vm.expectRevert(bytes("CURIO: Destination too far"));
        engine.move(_troopId, Position({x: 0, y: 0}));

        // fail: move outside of map
        vm.expectRevert(bytes("CURIO: Target out of bound"));
        engine.move(_troopId, Position({x: 100, y: 100}));

        // fail: attempting to move transport to a city tile
        vm.expectRevert(bytes("CURIO: Cannot move on land"));
        engine.move(_troopId, Position({x: 5, y: 1}));

        // fail: move onto an opponent's base
        engine.move(_troopId, Position({x: 7, y: 1}));
        vm.warp(20);
        engine.updateEpoch();
        engine.move(_troopId, Position({x: 7, y: 2}));
        vm.warp(40);
        engine.updateEpoch();
        engine.move(_troopId, Position({x: 7, y: 3}));
        vm.expectRevert(bytes("CURIO: Cannot move onto opponent base"));
        engine.move(_troopId, player2Pos);

        // fail: move a troop transport onto a troop transport
        vm.expectRevert(bytes("CURIO: Destination tile occupied"));
        engine.move(_troopId, Position({x: 7, y: 4}));

        vm.stopPrank();
    }

    function testMoveTooManyTimesPerEpoch() public {
        vm.prank(deployer);
        admin.spawnTroop(Position({x: 0, y: 9}), player1, destroyerTroopTypeId);
        uint256 _destroyerId = initTroopNonce;

        vm.startPrank(player1);

        assertEq(getter.getTroop(_destroyerId).movesLeftInEpoch, 3);
        engine.move(_destroyerId, Position({x: 0, y: 8}));
        assertEq(getter.getTroop(_destroyerId).movesLeftInEpoch, 2);
        engine.move(_destroyerId, Position({x: 0, y: 7}));
        assertEq(getter.getTroop(_destroyerId).movesLeftInEpoch, 1);

        vm.warp(20);
        engine.updateEpoch();

        // lazy update! move has not been called yet so movesLeftInEpoch remains unchanged
        assertEq(getter.getTroop(_destroyerId).movesLeftInEpoch, 1);
        engine.move(_destroyerId, Position({x: 0, y: 6}));
        assertEq(getter.getTroop(_destroyerId).movesLeftInEpoch, 2);
        engine.move(_destroyerId, Position({x: 0, y: 5}));
        assertEq(getter.getTroop(_destroyerId).movesLeftInEpoch, 1);
        engine.move(_destroyerId, Position({x: 0, y: 4}));
        assertEq(getter.getTroop(_destroyerId).movesLeftInEpoch, 0);

        vm.expectRevert(bytes("CURIO: No moves left this epoch"));
        engine.move(_destroyerId, Position({x: 0, y: 3}));

        vm.stopPrank();
    }

    function testMove() public {
        // produce a troop transport
        vm.prank(deployer);
        admin.spawnTroop(player1Pos, player1, troopTransportTroopTypeId);

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

    function testTroopTransport() public {
        Position memory _troopTransport1Pos = Position({x: 7, y: 1});
        Position memory _troopTransport2Pos = Position({x: 6, y: 2});
        Position memory _enemyPos = Position({x: 7, y: 3});

        // two troop transports, one in a port, one on ocean, next to an army
        vm.startPrank(deployer);
        admin.transferBaseOwnership(_troopTransport2Pos, player1);
        admin.spawnTroop(player1Pos, player1, armyTroopTypeId);
        admin.spawnTroop(_troopTransport1Pos, player1, troopTransportTroopTypeId);
        admin.spawnTroop(_troopTransport2Pos, player1, troopTransportTroopTypeId);
        admin.spawnTroop(_enemyPos, player2, destroyerTroopTypeId);
        vm.stopPrank();

        // verify that initial states are correct
        Troop memory _army = getter.getTroopAt(player1Pos);
        Troop memory _troopTransport1 = getter.getTroopAt(_troopTransport1Pos);
        Troop memory _troopTransport2 = getter.getTroopAt(_troopTransport2Pos);
        uint256 _armyId = initTroopNonce;
        uint256 _troopTransport2Id = initTroopNonce + 2;
        assertEq(_troopTransport1.cargoTroopIds.length, 0);
        assertEq(_troopTransport2.cargoTroopIds.length, 0);

        vm.startPrank(player1);

        // move onto troop transport on ocean
        vm.warp(20);
        engine.updateEpoch();
        engine.move(_armyId, _troopTransport1Pos);
        _army = getter.getTroop(_armyId);
        _troopTransport1 = getter.getTroopAt(_troopTransport1Pos);
        assertEq(_troopTransport1.cargoTroopIds.length, 1);
        assertEq(_troopTransport1.cargoTroopIds[0], _armyId);
        assertEq(_army.pos.x, 7);
        assertEq(_army.pos.y, 1);
        assertEq(getter.getTileAt(player1Pos).occupantId, NULL);

        // move back into home port
        vm.warp(40);
        engine.updateEpoch();
        engine.move(_armyId, player1Pos);
        _troopTransport1 = getter.getTroopAt(_troopTransport1Pos);
        assertEq(_troopTransport1.cargoTroopIds.length, 0);
        assertEq(getter.getTileAt(player1Pos).occupantId, _armyId);

        // move onto troop transport in adjacent port
        vm.warp(60);
        engine.updateEpoch();
        engine.move(_armyId, _troopTransport2Pos);
        _army = getter.getTroop(_armyId);
        _troopTransport2 = getter.getTroopAt(_troopTransport2Pos);
        assertEq(_troopTransport2.cargoTroopIds.length, 1);
        assertEq(_troopTransport2.cargoTroopIds[0], _armyId);
        assertEq(_army.pos.x, 6);
        assertEq(_army.pos.y, 2);

        // move troop transport onto ocean
        vm.warp(80);
        engine.updateEpoch();
        Position memory _newPos = Position({x: 7, y: 2});
        engine.move(_troopTransport2Id, _newPos);
        _army = getter.getTroop(_armyId);
        assertEq(_army.pos.x, 7);
        assertEq(_army.pos.y, 2);
        assertEq(getter.getTileAt(_newPos).occupantId, _troopTransport2Id);

        // battle enemy destroyer
        vm.warp(100);
        engine.updateEpoch();
        engine.battle(_troopTransport2Id, _enemyPos);

        // if troop transport dies, verify cargo army also dies
        vm.warp(120);
        engine.updateEpoch();
        if (getter.getTileAt(_newPos).occupantId == NULL) {
            _army = getter.getTroop(_armyId);
            assertEq(_army.owner, NULL_ADDR);
        } else {
            engine.move(_armyId, Position({x: 8, y: 2}));
            _troopTransport2 = getter.getTroopAt(_troopTransport2Pos);
            assertEq(_troopTransport2.cargoTroopIds.length, 0);
        }

        vm.stopPrank();
    }

    // Battle
    function testBattleFailure() public {
        // TODO: add more
        Position memory _troopPos = Position({x: 7, y: 6});
        Position memory _enemy1Pos = Position({x: 7, y: 7});
        Position memory _enemy2Pos = Position({x: 7, y: 5});

        vm.startPrank(deployer);
        admin.spawnTroop(_troopPos, player1, destroyerTroopTypeId);
        admin.spawnTroop(_enemy1Pos, player2, troopTransportTroopTypeId); // a weaker enemy
        vm.stopPrank();

        uint256 _player1DestroyerId = initTroopNonce;

        vm.warp(20);
        engine.updateEpoch();

        vm.startPrank(player1);

        // fail: 2 attacks in 1 epoch
        engine.battle(_player1DestroyerId, _enemy1Pos);
        if (getter.getTroop(_player1DestroyerId).owner == player1) {
            vm.expectRevert(bytes("CURIO: Attacked too recently"));
            engine.battle(_player1DestroyerId, _enemy2Pos);
        }

        vm.stopPrank();
    }

    function testBattleBase() public {
        Position memory _destroyerPos = Position({x: 7, y: 3});

        vm.prank(deployer);
        admin.spawnTroop(_destroyerPos, player1, destroyerTroopTypeId);
        uint256 _destroyerId = initTroopNonce;

        // increase epoch
        vm.warp(20);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        vm.prank(player1);
        engine.battle(_destroyerId, player2Pos);

        if (getter.getTroop(_destroyerId).owner != player1) {
            console.log("[testBattleBase] Warning: unlikely outcome");
            return; // destroyer dies while battling port, a 1/64 (unlikely) outcome
        }

        Troop memory _destroyer = getter.getTroopAt(_destroyerPos);
        assertEq(_destroyer.owner, player1);

        Tile memory _tile = getter.getTileAt(player2Pos);
        assertEq(_tile.occupantId, NULL); // troop did not move to target tile
        assertTrue(_tile.baseId != NULL);

        Base memory _port = getter.getBaseAt(player2Pos);
        assertEq(_port.owner, player2);
        assertEq(_port.health, 0);
    }

    function testBattleTroop() public {
        Position memory _armyPos = Position({x: 8, y: 3});
        Position memory _destroyerPos = Position({x: 7, y: 3});

        vm.startPrank(deployer);
        admin.spawnTroop(_armyPos, player2, armyTroopTypeId);
        uint256 _armyId = initTroopNonce;
        admin.spawnTroop(_destroyerPos, player1, destroyerTroopTypeId);
        vm.stopPrank();

        Troop memory _army;
        Troop memory _destroyer = getter.getTroopAt(_destroyerPos);
        assertEq(_destroyer.owner, player1);
        assertEq(_destroyer.health, getter.getTroopType(destroyerTroopTypeId).maxHealth);

        // increase epoch
        vm.warp(20);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        vm.prank(player2);
        engine.battle(_armyId, _destroyerPos);

        _destroyer = getter.getTroopAt(_destroyerPos);
        _army = getter.getTroop(_armyId);
        bool _destroyerKilled = _destroyer.owner == NULL_ADDR; // destroyer dies
        bool _armyKilled = _army.owner == NULL_ADDR; // army dies
        assertTrue(_destroyerKilled || _armyKilled);

        // either side dies but not both
        if (_destroyerKilled) {
            assertTrue(!_armyKilled);
            assertEq(_army.health, 1);
            assertEq(_army.owner, player2);
        } else {
            assertTrue(!_destroyerKilled);
            assertEq(_destroyer.owner, player1);
        }
    }

    // Capture base
    function testCaptureBaseFailure() public {
        vm.startPrank(deployer);
        admin.spawnTroop(Position({x: 5, y: 1}), player1, armyTroopTypeId);
        uint256 _armyId = initTroopNonce;
        admin.spawnTroop(Position({x: 7, y: 3}), player1, destroyerTroopTypeId);
        uint256 _destroyerId = initTroopNonce + 1;
        vm.stopPrank();

        vm.prank(player2);
        vm.expectRevert(bytes("CURIO: Can only capture with own troop"));
        engine.captureBase(_armyId, player3Pos);

        vm.startPrank(player1);
        vm.expectRevert(bytes("CURIO: Destination too far"));
        engine.captureBase(_armyId, player2Pos);

        vm.expectRevert(bytes("CURIO: Only a land troop can capture bases"));
        engine.captureBase(_destroyerId, player2Pos);

        vm.expectRevert(bytes("CURIO: No base to capture"));
        engine.captureBase(_armyId, Position({x: 4, y: 1}));

        vm.expectRevert(bytes("CURIO: Base already owned"));
        engine.captureBase(_armyId, player1Pos);

        vm.expectRevert(bytes("CURIO: Need to attack first"));
        engine.captureBase(_armyId, player3Pos);
        vm.stopPrank();

        vm.prank(deployer);
        admin.spawnTroop(player3Pos, player3, armyTroopTypeId);
        vm.prank(player1);
        vm.expectRevert(bytes("CURIO: Destination tile occupied"));
        engine.captureBase(_armyId, player3Pos);
    }

    function testCaptureBase() public {
        vm.startPrank(deployer);
        admin.spawnTroop(Position({x: 6, y: 2}), player1, armyTroopTypeId);
        uint256 _armyId = initTroopNonce;
        admin.spawnTroop(Position({x: 7, y: 3}), player1, destroyerTroopTypeId);
        uint256 _destroyerId = initTroopNonce + 1;
        admin.spawnTroop(Position({x: 6, y: 4}), player2, armyTroopTypeId);
        uint256 _player2ArmyId = initTroopNonce + 2;
        vm.stopPrank();

        Base memory _base = getter.getBaseAt(player2Pos);
        assertEq(_base.owner, player2);

        // increase epoch
        vm.warp(20);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        vm.startPrank(player1);
        engine.battle(_destroyerId, player2Pos);
        if (getter.getTroop(_destroyerId).owner == NULL_ADDR) {
            console.log("[testCaptureBase] Warning: unlikely outcome");
            return; // destroyer dies while battling port, a 1/64 (unlikely) outcome
        }
        engine.captureBase(_armyId, player2Pos);
        vm.stopPrank();

        Troop memory _army = getter.getTroop(_armyId);
        assertEq(_army.pos.x, player2Pos.x);
        assertEq(_army.pos.y, player2Pos.y);
        assertEq(_army.health, getter.getTroopType(armyTroopTypeId).maxHealth);

        _base = getter.getBaseAt(player2Pos);
        assertEq(_base.owner, player1);

        // test that base recovers health
        vm.prank(player2);
        vm.expectRevert(bytes("CURIO: Need to attack first"));
        engine.captureBase(_player2ArmyId, player2Pos);

        vm.coinbase(deployer);
    }

    // Repair
    function testRepairFailure() public {
        vm.startPrank(player1);
        vm.expectRevert("CURIO: No base found");
        engine.repair(Position({x: 0, y: 0}));

        vm.expectRevert("CURIO: Can only repair in own base");
        engine.repair(player2Pos);

        vm.expectRevert("CURIO: No troop to repair");
        engine.repair(player1Pos);
        vm.stopPrank();

        uint256 _player1DestroyerId = initTroopNonce;
        Position memory _player2DestroyerPos = Position({x: 7, y: 1});
        vm.startPrank(deployer);
        admin.spawnTroop(player1Pos, player1, destroyerTroopTypeId);
        admin.spawnTroop(_player2DestroyerPos, player2, destroyerTroopTypeId);
        vm.stopPrank();

        vm.startPrank(player1);
        vm.expectRevert("CURIO: Troop already at full health");
        engine.repair(player1Pos);

        vm.warp(20);
        engine.updateEpoch();
        engine.battle(_player1DestroyerId, _player2DestroyerPos);

        // try to replicate "repaired too recently" error on both players' destroyers
        Troop memory _player1Destroyer = getter.getTroopAt(player1Pos);
        if (_player1Destroyer.owner == player1 && _player1Destroyer.health == 1) {
            engine.repair(player1Pos);
            vm.expectRevert("CURIO: Repaired too recently");
            engine.repair(player1Pos);
        }

        vm.stopPrank();

        vm.startPrank(player2);

        Troop memory _player2Destroyer = getter.getTroopAt(_player2DestroyerPos);
        if (_player2Destroyer.owner == player2 && _player2Destroyer.health == 1) {
            engine.repair(_player2DestroyerPos);
            vm.expectRevert("CURIO: Repaired too recently");
            engine.repair(_player2DestroyerPos);
        }

        vm.stopPrank();
    }

    function testRepair() public {
        uint256 _player1DestroyerId = initTroopNonce;
        Position memory _player2DestroyerPos = Position({x: 7, y: 1});
        vm.startPrank(deployer);
        admin.spawnTroop(player1Pos, player1, destroyerTroopTypeId);
        admin.spawnTroop(_player2DestroyerPos, player2, destroyerTroopTypeId);
        vm.stopPrank();

        vm.startPrank(player1);
        vm.warp(20);
        engine.updateEpoch();
        engine.battle(_player1DestroyerId, _player2DestroyerPos);

        Troop memory _player1Destroyer = getter.getTroopAt(player1Pos);
        if (_player1Destroyer.owner == player1 && _player1Destroyer.health < 3) {
            uint256 _health = _player1Destroyer.health;
            vm.warp(20);
            engine.repair(player1Pos);
            assertEq(getter.getTroopAt(player1Pos).health, _health + 1);
        }

        vm.stopPrank();
        vm.startPrank(player2);

        Troop memory _player2Destroyer = getter.getTroopAt(_player2DestroyerPos);
        if (_player2Destroyer.owner == player2 && _player2Destroyer.health < 3) {
            uint256 _health = _player2Destroyer.health;
            vm.warp(20);
            engine.repair(_player2DestroyerPos);
            assertEq(getter.getTroopAt(_player2DestroyerPos).health, _health + 1);
        }

        vm.stopPrank();
    }

    // ------------------------------------------------
    // Helpers
    // ------------------------------------------------

    // produces 1 troop at a desired location
    function produceTroop(
        Position memory _location,
        uint256 _troopTypeId,
        address _player,
        uint256 _startTime
    ) internal {
        vm.startPrank(_player);
        TroopType memory troopTypeInfo = getter.getTroopType(_troopTypeId);
        engine.startProduction(_location, _troopTypeId); // start production at 1 epoch

        // fast foward a few epochs

        for (uint256 i = 1; i <= troopTypeInfo.epochsToProduce; i++) {
            vm.warp(_startTime + i * 10); // increase time by a few seconds
            engine.updateEpoch();
        }

        engine.endProduction(_location);
        vm.stopPrank();
    }
}
