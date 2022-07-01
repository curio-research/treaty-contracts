//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";

contract ScenarioTest is Test, DiamondDeployTest {
    function testTroopTransport() public {
        Position memory _enemyPos = Position({x: 7, y: 3});

        // two troop transports, one in a port, one on ocean, next to an army
        vm.startPrank(deployer);
        helper.transferBaseOwnership(Position({x: 6, y: 2}), player1);
        helper.transferBaseOwnership(Position({x: 6, y: 0}), player1);
        helper.spawnTroop(player1Pos, player1, armyTroopTypeId);
        helper.spawnTroop(Position({x: 7, y: 1}), player1, troopTransportTroopTypeId);
        helper.spawnTroop(Position({x: 6, y: 2}), player1, troopTransportTroopTypeId);
        helper.spawnTroop(Position({x: 6, y: 0}), player1, armyTroopTypeId);
        helper.spawnTroop(_enemyPos, player2, destroyerTroopTypeId);
        vm.stopPrank();

        // verify that initial states are correct
        Troop memory _armyBob = getter.getTroopAt(player1Pos);
        Troop memory _troopTransport1 = getter.getTroopAt(Position({x: 7, y: 1}));
        Troop memory _troopTransport2 = getter.getTroopAt(Position({x: 6, y: 2}));
        Troop memory _armyAlice = getter.getTroopAt(Position({x: 6, y: 0}));
        assertEq(_troopTransport1.cargoTroopIds.length, 0);
        assertEq(_troopTransport2.cargoTroopIds.length, 0);

        uint256 _armyBobId = initTroopNonce;
        uint256 _troopTransport1Id = initTroopNonce + 1;
        uint256 _troopTransport2Id = initTroopNonce + 2;
        uint256 _armyAliceId = initTroopNonce + 3;

        vm.startPrank(player1);

        // move transport north
        vm.warp(20);
        helper.updateEpoch();
        engine.march(_troopTransport1Id, Position({x: 7, y: 0}));
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 0);
        assertEq(getter.getTileAt(Position({x: 7, y: 0})).occupantId, _troopTransport1Id);

        // load an army
        vm.warp(40);
        helper.updateEpoch();
        engine.march(_armyAliceId, Position({x: 7, y: 0}));
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        _armyAlice = getter.getTroop(_armyAliceId);
        assertEq(_troopTransport1.cargoTroopIds.length, 1);
        assertEq(_troopTransport1.cargoTroopIds[0], _armyAliceId);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 0);
        assertEq(_armyAlice.pos.x, 7);
        assertEq(_armyAlice.pos.y, 0);

        // failure: try to move Alice off transport onto water
        vm.warp(60);
        helper.updateEpoch();
        vm.expectRevert("CURIO: Cannot move on water");
        engine.march(_armyAliceId, Position({x: 7, y: 1}));

        // move transport along with Alice back to starting position
        engine.march(_troopTransport1Id, Position({x: 7, y: 1}));
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        _armyAlice = getter.getTroop(_armyAliceId);
        assertEq(_troopTransport1.cargoTroopIds.length, 1);
        assertEq(_troopTransport1.cargoTroopIds[0], _armyAliceId);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 1);
        assertEq(_armyAlice.pos.x, 7);
        assertEq(_armyAlice.pos.y, 1);

        // load Bob onto troop transport on ocean
        vm.warp(80);
        helper.updateEpoch();
        engine.march(_armyBobId, Position({x: 7, y: 1}));
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        _armyAlice = getter.getTroop(_armyAliceId);
        _armyBob = getter.getTroop(_armyBobId);
        assertEq(_troopTransport1.cargoTroopIds.length, 2);
        assertEq(_troopTransport1.cargoTroopIds[0], _armyAliceId);
        assertEq(_troopTransport1.cargoTroopIds[1], _armyBobId);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 1);
        assertEq(_armyAlice.pos.x, 7);
        assertEq(_armyAlice.pos.y, 1);
        assertEq(_armyBob.pos.x, 7);
        assertEq(_armyBob.pos.y, 1);
        assertEq(getter.getTileAt(player1Pos).occupantId, NULL);

        // unload Alice from transport back into home port
        vm.warp(100);
        helper.updateEpoch();
        engine.march(_armyAliceId, player1Pos);
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        _armyAlice = getter.getTroop(_armyAliceId);
        _armyBob = getter.getTroop(_armyBobId);
        assertEq(_troopTransport1.cargoTroopIds.length, 1);
        assertEq(_troopTransport1.cargoTroopIds[0], _armyBobId);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 1);
        assertEq(_armyAlice.pos.x, 6);
        assertEq(_armyAlice.pos.y, 1);
        assertEq(_armyBob.pos.x, 7);
        assertEq(_armyBob.pos.y, 1);
        assertEq(getter.getTileAt(player1Pos).occupantId, _armyAliceId);

        // move Alice onto troop transport in adjacent port
        vm.warp(120);
        helper.updateEpoch();
        engine.march(_armyAliceId, Position({x: 6, y: 2}));
        _troopTransport2 = getter.getTroop(_troopTransport2Id);
        _armyAlice = getter.getTroop(_armyAliceId);
        assertEq(_troopTransport2.cargoTroopIds.length, 1);
        assertEq(_troopTransport2.cargoTroopIds[0], _armyAliceId);
        assertEq(_troopTransport2.pos.x, 6);
        assertEq(_troopTransport2.pos.y, 2);
        assertEq(_armyAlice.pos.x, 6);
        assertEq(_armyAlice.pos.y, 2);

        // move troop transport onto ocean
        vm.warp(140);
        helper.updateEpoch();
        Position memory _newPos = Position({x: 7, y: 2});
        engine.march(_troopTransport2Id, _newPos);
        _troopTransport2 = getter.getTroop(_troopTransport2Id);
        _armyAlice = getter.getTroop(_armyAliceId);
        assertEq(_troopTransport2.pos.x, 7);
        assertEq(_troopTransport2.pos.y, 2);
        assertEq(_armyAlice.pos.x, 7);
        assertEq(_armyAlice.pos.y, 2);
        assertEq(getter.getTileAt(_newPos).occupantId, _troopTransport2Id);

        // failure: try to move transport onto coast
        vm.warp(160);
        helper.updateEpoch();
        vm.expectRevert("CURIO: Cannot move on land");
        engine.march(_troopTransport2Id, Position({x: 8, y: 2}));

        // battle enemy destroyer
        engine.march(_troopTransport2Id, _enemyPos);

        // if troop transport dies, verify cargo army also dies
        vm.warp(180);
        helper.updateEpoch();
        if (getter.getTileAt(_newPos).occupantId == NULL) {
            _armyAlice = getter.getTroop(_armyAliceId);
            assertEq(_armyAlice.owner, NULL_ADDR);
        } else {
            engine.march(_armyAliceId, Position({x: 8, y: 2}));
            _troopTransport2 = getter.getTroop(_troopTransport2Id);
            assertEq(_troopTransport2.cargoTroopIds.length, 0);
            assertEq(getter.getTileAt(Position({x: 7, y: 2})).occupantId, _troopTransport2Id);
        }

        vm.stopPrank();
    }
}
