//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";

contract LogicTest is Test, DiamondDeployTest {
    // TODO: add tests for events
    event NewPlayer(address _player, Position _pos);
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

        // fail: player1 attempting to end production before enough time
        uint256 _startTime = 2;
        vm.warp(_startTime);
        vm.expectRevert(bytes("CURIO: Troop needs more time for production"));
        helper.endProduction(player1Pos);
        vm.stopPrank();

        // fail: player1 finish producing troop on an occupied base
        vm.prank(deployer);
        helper.spawnTroop(player1Pos, player1, armyTroopTypeId);
        for (uint256 i = 1; i <= troopTransportTroopType.productionCooldown; i++) {
            vm.warp(_startTime + i); // increase time by a few seconds
        }
        vm.prank(player1);
        vm.expectRevert(bytes("CURIO: Base occupied by another troop"));
        helper.endProduction(player1Pos);
    }

    function testProduction() public {
        // player1 produce troop transport
        vm.warp(1);
        produceTroop(player1Pos, troopTransportTroopTypeId, player1, 2);

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

        // success: produce another troop
        vm.warp(100);
        vm.prank(player1);
        // Note: move functionality
        engine.march(initTroopNonce, Position({x: 7, y: 1}));
        produceTroop(player1Pos, troopTransportTroopTypeId, player1, 10000);

        // success: verify troop's basic information
        _troop = getter.getTroopAt(player1Pos);
        assertEq(_troop.owner, player1);
        assertEq(_troop.troopTypeId, troopTransportTroopTypeId);
        assertEq(_troop.pos.x, player1Pos.x);
        assertEq(_troop.pos.y, player1Pos.y);
    }

    // Note: Everything tests only the move functionality
    function testMoveFailure() public {
        // spawn troop at player1 location
        vm.startPrank(deployer);
        helper.spawnTroop(player1Pos, player1, troopTransportTroopTypeId);
        helper.spawnTroop(Position({x: 7, y: 4}), player1, troopTransportTroopTypeId);
        vm.stopPrank();
        uint256 _troopId = initTroopNonce;

        vm.warp(2);
        vm.startPrank(player1);

        // fail: move to same location
        vm.expectRevert(bytes("CURIO: Already at destination"));
        engine.march(_troopId, player1Pos);

        // // fail: move to a far location
        // vm.expectRevert(bytes("CURIO: Destination too far"));
        // engine.march(_troopId, Position({x: 0, y: 0}));

        // // fail: march outside of map
        // vm.expectRevert(bytes("CURIO: Target out of bound"));
        // engine.march(_troopId, Position({x: 100, y: 100}));

        // // fail: attempting to move transport to a city tile
        // vm.expectRevert(bytes("CURIO: Cannot move on land"));
        // engine.march(_troopId, Position({x: 5, y: 1}));

        engine.march(_troopId, Position({x: 7, y: 1}));
        vm.warp(4);
        engine.march(_troopId, Position({x: 7, y: 2}));
        vm.warp(6);
        engine.march(_troopId, Position({x: 7, y: 3}));

        // fail: move a troop transport onto a troop transport
        // vm.expectRevert(bytes("CURIO: Destination tile occupied"));
        // engine.march(_troopId, Position({x: 7, y: 4}));

        vm.stopPrank();
    }

    // Note: Everything tests only the move functionality
    function testMoveTooManyTimesPerSecond() public {
        vm.prank(deployer);
        helper.spawnTroop(Position({x: 0, y: 9}), player1, destroyerTroopTypeId);
        uint256 _destroyerId = initTroopNonce;

        vm.warp(2);
        vm.startPrank(player1);

        assertEq(getter.getTroop(_destroyerId).movesLeftInSecond, 3);
        engine.march(_destroyerId, Position({x: 0, y: 8}));
        assertEq(getter.getTroop(_destroyerId).movesLeftInSecond, 2);
        engine.march(_destroyerId, Position({x: 0, y: 7}));
        assertEq(getter.getTroop(_destroyerId).movesLeftInSecond, 1);

        vm.warp(3);

        // lazy update! move has not been called yet so movesLeftInSecond remains unchanged
        assertEq(getter.getTroop(_destroyerId).movesLeftInSecond, 1);
        engine.march(_destroyerId, Position({x: 0, y: 6}));
        assertEq(getter.getTroop(_destroyerId).movesLeftInSecond, 2);
        engine.march(_destroyerId, Position({x: 0, y: 5}));
        assertEq(getter.getTroop(_destroyerId).movesLeftInSecond, 1);
        engine.march(_destroyerId, Position({x: 0, y: 4}));
        assertEq(getter.getTroop(_destroyerId).movesLeftInSecond, 0);

        vm.expectRevert(bytes("CURIO: Moved too recently"));
        engine.march(_destroyerId, Position({x: 0, y: 3}));

        vm.stopPrank();
    }

    // battle
    function testMarchFailure() public {
        // TODO: add more
        Position memory _troopPos = Position({x: 7, y: 6});
        Position memory _enemy1Pos = Position({x: 7, y: 7});
        Position memory _enemy2Pos = Position({x: 7, y: 5});

        vm.startPrank(deployer);
        helper.spawnTroop(_troopPos, player1, destroyerTroopTypeId);
        helper.spawnTroop(_enemy1Pos, player2, troopTransportTroopTypeId); // a weaker enemy
        vm.stopPrank();

        uint256 _player1DestroyerId = initTroopNonce;

        vm.warp(2);

        vm.startPrank(player1);

        // fail: 2 attacks in 1 second
        engine.march(_player1DestroyerId, _enemy1Pos);
        if (getter.getTroop(_player1DestroyerId).owner == player1) {
            vm.expectRevert(bytes("CURIO: Large action taken too recently"));
            engine.march(_player1DestroyerId, _enemy2Pos);
        }

        vm.stopPrank();
    }

    function testbattleBase() public {
        Position memory _destroyerPos = Position({x: 7, y: 3});

        vm.prank(deployer);
        helper.spawnTroop(_destroyerPos, player1, destroyerTroopTypeId);
        uint256 _destroyerId = initTroopNonce;

        // increase time
        vm.warp(20);

        vm.prank(player1);
        // Note: battle functionality
        engine.march(_destroyerId, player2Pos);

        if (getter.getTroop(_destroyerId).owner != player1) {
            console.log("[testbattleBase] Warning: unlikely outcome");
            return; // destroyer dies while battling port, a 1/64 (unlikely) outcome
        }

        Troop memory _destroyer = getter.getTroopAt(player2Pos);
        assertEq(_destroyer.owner, player1);

        Tile memory _tile = getter.getTileAt(player2Pos);
        assertEq(_tile.occupantId, _destroyerId);
        assertTrue(_tile.baseId != NULL);

        Base memory _port = getter.getBaseAt(player2Pos);
        assertEq(_port.owner, player1);
        assertEq(_port.health, 1);
    }

    function testbattleTroop() public {
        Position memory _armyPos = Position({x: 8, y: 3});
        Position memory _destroyerPos = Position({x: 7, y: 3});

        vm.startPrank(deployer);
        helper.spawnTroop(_armyPos, player2, armyTroopTypeId);
        uint256 _armyId = initTroopNonce;
        helper.spawnTroop(_destroyerPos, player1, destroyerTroopTypeId);
        vm.stopPrank();

        Troop memory _army;
        Troop memory _destroyer = getter.getTroopAt(_destroyerPos);
        assertEq(_destroyer.owner, player1);
        assertEq(_destroyer.health, getter.getTroopType(destroyerTroopTypeId).maxHealth);

        // increase time
        vm.warp(2);

        vm.prank(player2);
        // Note: Battle functionality
        engine.march(_armyId, _destroyerPos);

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
            assertEq(_destroyer.owner, player1);
        }
    }

    // Capture base
    // Note: all march test capturebase functionality
    function testCaptureBaseFailure() public {
        vm.startPrank(deployer);
        helper.spawnTroop(Position({x: 5, y: 1}), player1, armyTroopTypeId);
        uint256 _armyId = initTroopNonce;
        helper.spawnTroop(Position({x: 7, y: 3}), player1, destroyerTroopTypeId);
        // uint256 _destroyerId = initTroopNonce + 1;
        vm.stopPrank();

        vm.warp(2);
        vm.prank(player2);
        vm.expectRevert(bytes("CURIO: Can only march own troop"));
        engine.march(_armyId, player3Pos);

        vm.startPrank(player1);
        vm.expectRevert(bytes("CURIO: Target not in Firing Range"));
        engine.march(_armyId, player2Pos);

        // vm.expectRevert(bytes("CURIO: Only a land troop can capture bases"));
        // engine.march(_destroyerId, player2Pos);

        // vm.expectRevert(bytes("CURIO: No base to capture"));
        // engine.march(_armyId, Position({x: 4, y: 1}));

        // vm.expectRevert(bytes("CURIO: Base already owned"));
        // engine.march(_armyId, player1Pos);

        // vm.expectRevert(bytes("CURIO: Need to attack first"));
        // engine.march(_armyId, player3Pos);
        vm.stopPrank();

        // vm.prank(deployer);
        // helper.spawnTroop(player3Pos, player3, armyTroopTypeId);
        // vm.prank(player1);
        // vm.expectRevert(bytes("CURIO: Destination tile occupied"));
        // engine.march(_armyId, player3Pos);
    }

    function testCaptureBase() public {
        vm.startPrank(deployer);
        helper.spawnTroop(Position({x: 6, y: 2}), player1, armyTroopTypeId);
        uint256 _armyId = initTroopNonce;
        helper.spawnTroop(Position({x: 7, y: 3}), player1, destroyerTroopTypeId);
        uint256 _destroyerId = initTroopNonce + 1;
        helper.spawnTroop(Position({x: 6, y: 4}), player2, armyTroopTypeId);
        vm.stopPrank();

        Base memory _base = getter.getBaseAt(player2Pos);
        assertEq(_base.owner, player2);

        // increase time
        vm.warp(2);

        vm.startPrank(player1);
        // Note: Battle functionality
        engine.march(_destroyerId, player2Pos);
        if (getter.getTroop(_destroyerId).owner == NULL_ADDR) {
            console.log("[testCaptureBase] Warning: unlikely outcome");
            return; // destroyer dies while battling port, a 1/64 (unlikely) outcome
        }
        assertEq(getter.getBaseAt(player2Pos).owner, player1);
        assertEq(getter.getBaseAt(player2Pos).health, 1);
        assertEq(getter.getTileAt(player2Pos).occupantId, _destroyerId);
        vm.expectRevert(bytes("CURIO: Destination tile occupied"));
        // Note: captureBase functionality
        engine.march(_armyId, player2Pos);
        vm.stopPrank();

        Troop memory _army = getter.getTroop(_armyId);
        assertEq(_army.pos.x, 6);
        assertEq(_army.pos.y, 2);
        assertEq(_army.health, getter.getTroopType(armyTroopTypeId).maxHealth);

        _base = getter.getBaseAt(player2Pos);
        assertEq(_base.owner, player1);

        vm.coinbase(deployer);
    }

    // Repair
    function testRepairFailure() public {
        vm.startPrank(player1);
        vm.expectRevert("CURIO: No base found");
        helper.repair(Position({x: 0, y: 0}));

        vm.expectRevert("CURIO: Can only repair in own base");
        helper.repair(player2Pos);

        vm.expectRevert("CURIO: No troop to repair");
        helper.repair(player1Pos);
        vm.stopPrank();

        uint256 _player1DestroyerId = initTroopNonce;
        Position memory _player2DestroyerPos = Position({x: 7, y: 1});
        vm.startPrank(deployer);
        helper.spawnTroop(player1Pos, player1, destroyerTroopTypeId);
        helper.spawnTroop(_player2DestroyerPos, player2, destroyerTroopTypeId);
        vm.stopPrank();

        vm.startPrank(player1);
        vm.expectRevert("CURIO: Troop already at full health");
        helper.repair(player1Pos);

        // Note: test battle functionality
        vm.warp(2);
        engine.march(_player1DestroyerId, _player2DestroyerPos);

        // try to replicate "repaired too recently" error on both players' destroyers
        Troop memory _player1Destroyer = getter.getTroopAt(player1Pos);
        if (_player1Destroyer.owner == player1 && _player1Destroyer.health == 1) {
            helper.repair(player1Pos);
            vm.expectRevert("CURIO: Repaired too recently");
            helper.repair(player1Pos);
        }

        vm.stopPrank();

        vm.startPrank(player2);

        Troop memory _player2Destroyer = getter.getTroopAt(_player2DestroyerPos);
        if (_player2Destroyer.owner == player2 && _player2Destroyer.health == 1) {
            helper.repair(_player2DestroyerPos);
            vm.expectRevert("CURIO: Repaired too recently");
            helper.repair(_player2DestroyerPos);
        }

        vm.stopPrank();
    }

    function testRepair() public {
        uint256 _player1DestroyerId = initTroopNonce;
        Position memory _player2DestroyerPos = Position({x: 7, y: 1});
        vm.startPrank(deployer);
        helper.spawnTroop(player1Pos, player1, destroyerTroopTypeId);
        helper.spawnTroop(_player2DestroyerPos, player2, destroyerTroopTypeId);
        vm.stopPrank();

        vm.startPrank(player1);
        vm.warp(2);
        // Note: test battle functionality
        engine.march(_player1DestroyerId, _player2DestroyerPos);

        Troop memory _player1Destroyer = getter.getTroopAt(player1Pos);
        if (_player1Destroyer.owner == player1 && _player1Destroyer.health < 3) {
            uint256 _health = _player1Destroyer.health;
            vm.warp(20);
            helper.repair(player1Pos);
            assertEq(getter.getTroopAt(player1Pos).health, _health + 1);
        }

        vm.stopPrank();
        vm.startPrank(player2);

        Troop memory _player2Destroyer = getter.getTroopAt(_player2DestroyerPos);
        if (_player2Destroyer.owner == player2 && _player2Destroyer.health < 3) {
            uint256 _health = _player2Destroyer.health;
            vm.warp(20);
            helper.repair(_player2DestroyerPos);
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
        engine.startProduction(_location, _troopTypeId);

        // fast foward a few seconds

        for (uint256 i = 1; i <= troopTypeInfo.productionCooldown; i++) {
            vm.warp(_startTime + i); // increase time by a few seconds
        }

        helper.endProduction(_location);
        vm.stopPrank();
    }
}
