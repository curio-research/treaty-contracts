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
        engine.spawnTroop(player1Pos, player1, troopTransportTroopTypeId);
        engine.spawnTroop(Position({x: 7, y: 1}), player1, troopTransportTroopTypeId);
        vm.stopPrank();
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

        // fail: move a troop transport onto a troop transport
        vm.expectRevert(bytes("Destination tile occupied"));
        engine.move(_troopId, Position({x: 7, y: 1}));

        vm.stopPrank();
    }

    function testMoveTooManyTimesPerEpoch() public {
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

    function testMove() public {
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

    // Battle
    function testBattleFailure() public {
        // TODO (lower priority, as it couples with failure cases of move and captureBase)
    }

    function testBattleBase() public {
        Position memory _destroyerPos = Position({x: 7, y: 3});

        vm.prank(deployer);
        engine.spawnTroop(_destroyerPos, player1, destroyerTroopTypeId);
        uint256 _destroyerId = initTroopNonce;

        // increase epoch
        vm.warp(20);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        vm.prank(player1);
        engine.battle(_destroyerId, player2Pos);

        Troop memory _destroyer = getter.getTroopAt(_destroyerPos);
        assertEq(_destroyer.owner, player1);

        Tile memory _tile = getter.getTileAt(player2Pos);
        assertEq(_tile.occupantId, NULL); // troop did not move to target tile
        assertTrue(_tile.baseId != NULL);

        Base memory _port = getter.getBaseAt(player2Pos);
        assertEq(_port.owner, player2);

        bool _strike = _port.health == 0;
        if (_strike) {
            assertEq(_destroyer.health, getter.getTroopType(destroyerTroopTypeId).maxHealth); // port did not attack back
        } else {
            bool _cond1 = _destroyer.health == getter.getTroopType(destroyerTroopTypeId).maxHealth;
            bool _cond2 = _destroyer.health == getter.getTroopType(destroyerTroopTypeId).maxHealth - 1;
            assertTrue(_cond1 || _cond2);
        }
    }

    function testBattleTroop() public {
        Position memory _armyPos = Position({x: 8, y: 4});
        Position memory _destroyerPos = Position({x: 7, y: 3});

        vm.startPrank(deployer);
        engine.spawnTroop(_armyPos, player2, armyTroopTypeId);
        uint256 _armyId = initTroopNonce;
        engine.spawnTroop(_destroyerPos, player1, destroyerTroopTypeId);
        vm.stopPrank();

        Troop memory _destroyer = getter.getTroopAt(_destroyerPos);
        assertEq(_destroyer.owner, player1);
        assertEq(_destroyer.health, getter.getTroopType(destroyerTroopTypeId).maxHealth);

        // increase epoch
        vm.warp(20);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        vm.prank(player2);
        engine.battle(_armyId, _destroyerPos);

        // destroyer reduced by 1 health if army strikes
        _destroyer = getter.getTroopAt(_destroyerPos);
        assertEq(_destroyer.owner, player1);
        bool _destroyerCond1 = _destroyer.health == getter.getTroopType(destroyerTroopTypeId).maxHealth;
        bool _destroyerCond2 = _destroyer.health == getter.getTroopType(destroyerTroopTypeId).maxHealth - 1;
        assertTrue(_destroyerCond1 || _destroyerCond2);

        // army eliminated if destroyer strikes
        Troop memory _schoedingersArmy = getter.getTroop(_armyId);
        bool _armyEliminated = getter.getTileAt(_armyPos).occupantId == NULL;
        if (_armyEliminated) {
            assertTrue(_schoedingersArmy.owner != player2);
            assertEq(_schoedingersArmy.health, 0);
        } else {
            assertEq(_schoedingersArmy.owner, player2);
            assertEq(_schoedingersArmy.health, 1);
        }
    }

    // FIXME: actual probability test?
    function testBattleTroopProbabilistic() public {
        Position memory _armyPos = Position({x: 8, y: 4});
        Position memory _troopTransportPos = Position({x: 7, y: 3});

        vm.startPrank(deployer);
        engine.spawnTroop(_armyPos, player2, armyTroopTypeId);
        uint256 _armyId = initTroopNonce;
        engine.spawnTroop(_troopTransportPos, player1, troopTransportTroopTypeId);
        vm.stopPrank();

        // increase epoch
        vm.warp(20);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        vm.prank(player2);
        engine.battle(_armyId, _troopTransportPos);

        // transport reduced by 1 health if army strikes
        Troop memory _troopTransport = getter.getTroopAt(_troopTransportPos);
        assertEq(_troopTransport.owner, player1);
        bool _troopTransportCond1 = _troopTransport.health == getter.getTroopType(troopTransportTroopTypeId).maxHealth;
        bool _troopTransportCond2 = _troopTransport.health == getter.getTroopType(troopTransportTroopTypeId).maxHealth - 1;
        assertTrue(_troopTransportCond1 || _troopTransportCond2);

        // army either intact or eliminated
        Troop memory _schoedingersArmy = getter.getTroop(_armyId);
        if (_schoedingersArmy.health == 0) {
            assertEq(getter.getTileAt(_armyPos).occupantId, NULL);
            assertTrue(_schoedingersArmy.owner != player2);
        } else {
            assertEq(_schoedingersArmy.health, getter.getTroopType(armyTroopTypeId).maxHealth);
            assertEq(getter.getTileAt(_armyPos).occupantId, _armyId);
            assertTrue(_schoedingersArmy.owner == player2);
        }
    }

    // Capture base
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

    function testCaptureBase() public {
        vm.startPrank(deployer);
        engine.spawnTroop(Position({x: 6, y: 2}), player1, armyTroopTypeId);
        uint256 _armyId = initTroopNonce;
        engine.spawnTroop(Position({x: 7, y: 3}), player1, destroyerTroopTypeId);
        uint256 _destroyerId = initTroopNonce + 1;
        engine.spawnTroop(Position({x: 6, y: 4}), player2, armyTroopTypeId);
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
        vm.expectRevert(bytes("Need to attack first"));
        engine.captureBase(_player2ArmyId, player2Pos);

        vm.coinbase(deployer);
    }

    // Repair
    function testRepairFailure() public {
        vm.startPrank(player1);
        vm.expectRevert("No base found");
        engine.repair(Position({x: 0, y: 0}));

        vm.expectRevert("Can only repair in own base");
        engine.repair(player2Pos);

        vm.expectRevert("No troop to repair");
        engine.repair(player1Pos);
        vm.stopPrank();

        uint256 _player1DestroyerId = initTroopNonce;
        Position memory _player2DestroyerPos = Position({x: 7, y: 0});
        vm.startPrank(deployer);
        engine.spawnTroop(player1Pos, player1, destroyerTroopTypeId);
        engine.spawnTroop(_player2DestroyerPos, player2, destroyerTroopTypeId);
        vm.stopPrank();

        vm.startPrank(player1);
        vm.expectRevert("Troop already at full health");
        engine.repair(player1Pos);

        // battle twice with an adjacent destroyer
        vm.warp(20);
        engine.updateEpoch();
        engine.battle(_player1DestroyerId, _player2DestroyerPos);
        vm.warp(50);
        engine.updateEpoch();
        engine.battle(_player1DestroyerId, _player2DestroyerPos);

        Troop memory _player1Destroyer = getter.getTroopAt(player1Pos);
        assertEq(_player1Destroyer.health, 1);

        engine.repair(player1Pos);
        vm.expectRevert("Repaired too recently");
        engine.repair(player1Pos);

        vm.stopPrank();
    }

    function testRepair() public {
        uint256 _player1DestroyerId = initTroopNonce;
        Position memory _player2DestroyerPos = Position({x: 7, y: 0});
        vm.startPrank(deployer);
        engine.spawnTroop(player1Pos, player1, destroyerTroopTypeId);
        engine.spawnTroop(_player2DestroyerPos, player2, destroyerTroopTypeId);
        vm.stopPrank();

        // battle once with an adjacent destroyer
        vm.warp(20);
        engine.updateEpoch();
        vm.startPrank(player1);
        engine.battle(_player1DestroyerId, _player2DestroyerPos);

        Troop memory _player1Destroyer = getter.getTroopAt(player1Pos);
        assertEq(_player1Destroyer.health, getter.getTroopType(destroyerTroopTypeId).maxHealth - 1);
        vm.warp(20);
        engine.repair(player1Pos);

        _player1Destroyer = getter.getTroopAt(player1Pos);
        assertEq(_player1Destroyer.health, getter.getTroopType(destroyerTroopTypeId).maxHealth);

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
