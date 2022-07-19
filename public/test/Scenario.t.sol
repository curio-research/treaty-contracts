//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";

contract ScenarioTest is Test, DiamondDeployTest {
    function testTroopTransport() public {
        Position memory _enemyPos = Position({x: 7, y: 3});
        assertEq(getter.getPlayer(player1).numOwnedBases, 1);
        assertEq(getter.getPlayer(player1).numOwnedTroops, 0);

        // two troop transports, one in a port, one on ocean, next to an infantry
        vm.startPrank(deployer);
        helper.transferBaseOwnership(Position({x: 6, y: 2}), player1);
        helper.transferBaseOwnership(Position({x: 6, y: 0}), player1);
        helper.spawnTroop(player1Pos, player1, infantryTroopTypeId);
        helper.spawnTroop(Position({x: 7, y: 1}), player1, troopTransportTroopTypeId);
        helper.spawnTroop(Position({x: 6, y: 2}), player1, troopTransportTroopTypeId);
        helper.spawnTroop(Position({x: 6, y: 0}), player1, infantryTroopTypeId);
        helper.spawnTroop(_enemyPos, player2, destroyerTroopTypeId);
        vm.stopPrank();

        // verify that initial states are correct
        Troop memory _infantryBob = getter.getTroopAt(player1Pos);
        Troop memory _troopTransport1 = getter.getTroopAt(Position({x: 7, y: 1}));
        Troop memory _troopTransport2 = getter.getTroopAt(Position({x: 6, y: 2}));
        Troop memory _infantryAlice = getter.getTroopAt(Position({x: 6, y: 0}));
        assertEq(_troopTransport1.cargoTroopIds.length, 0);
        assertEq(_troopTransport2.cargoTroopIds.length, 0);
        assertEq(getter.getPlayer(player1).balance, 20);
        assertEq(getter.getPlayer(player1).totalGoldGenerationPerUpdate, 15);
        assertEq(getter.getPlayer(player1).totalTroopExpensePerUpdate, 2);
        assertEq(getter.getPlayer(player1).numOwnedBases, 3);
        assertEq(getter.getPlayer(player1).numOwnedTroops, 4);
        assertEq(getter.getPlayer(player2).balance, 20);
        assertEq(getter.getPlayer(player2).totalGoldGenerationPerUpdate, 5);
        assertEq(getter.getPlayer(player2).totalTroopExpensePerUpdate, 1);
        assertEq(getter.getPlayer(player2).numOwnedTroops, 1);

        uint256 _infantryBobId = initTroopNonce;
        uint256 _troopTransport1Id = initTroopNonce + 1;
        uint256 _troopTransport2Id = initTroopNonce + 2;
        uint256 _infantryAliceId = initTroopNonce + 3;

        vm.startPrank(player1);

        // move transport north
        vm.warp(2);
        // Note: test move functionality
        engine.march(_troopTransport1Id, Position({x: 7, y: 0}));
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 0);
        assertEq(getter.getTileAt(Position({x: 7, y: 0})).occupantId, _troopTransport1Id);

        // load an infantry
        vm.warp(4);
        // Note: test move functionality
        engine.march(_infantryAliceId, Position({x: 7, y: 0}));
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        _infantryAlice = getter.getTroop(_infantryAliceId);
        assertEq(_troopTransport1.cargoTroopIds.length, 1);
        assertEq(_troopTransport1.cargoTroopIds[0], _infantryAliceId);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 0);
        assertEq(_infantryAlice.pos.x, 7);
        assertEq(_infantryAlice.pos.y, 0);

        // failure: try to move Alice off transport onto water
        vm.warp(6);
        vm.expectRevert("CURIO: Cannot move on water");
        // Note: test move functionality
        engine.march(_infantryAliceId, Position({x: 7, y: 1}));

        // move transport along with Alice back to starting position
        // Note: test move functionality
        engine.march(_troopTransport1Id, Position({x: 7, y: 1}));
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        _infantryAlice = getter.getTroop(_infantryAliceId);
        assertEq(_troopTransport1.cargoTroopIds.length, 1);
        assertEq(_troopTransport1.cargoTroopIds[0], _infantryAliceId);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 1);
        assertEq(_infantryAlice.pos.x, 7);
        assertEq(_infantryAlice.pos.y, 1);

        // load Bob onto troop transport on ocean
        vm.warp(8);
        // Note: test move functionality
        engine.march(_infantryBobId, Position({x: 7, y: 1}));
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        _infantryAlice = getter.getTroop(_infantryAliceId);
        _infantryBob = getter.getTroop(_infantryBobId);
        assertEq(_troopTransport1.cargoTroopIds.length, 2);
        assertEq(_troopTransport1.cargoTroopIds[0], _infantryAliceId);
        assertEq(_troopTransport1.cargoTroopIds[1], _infantryBobId);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 1);
        assertEq(_infantryAlice.pos.x, 7);
        assertEq(_infantryAlice.pos.y, 1);
        assertEq(_infantryBob.pos.x, 7);
        assertEq(_infantryBob.pos.y, 1);
        assertEq(getter.getTileAt(player1Pos).occupantId, NULL);

        // unload Alice from transport back into home port
        vm.warp(10);
        // Note: test move functionality
        engine.march(_infantryAliceId, player1Pos);
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        _infantryAlice = getter.getTroop(_infantryAliceId);
        _infantryBob = getter.getTroop(_infantryBobId);
        assertEq(_troopTransport1.cargoTroopIds.length, 1);
        assertEq(_troopTransport1.cargoTroopIds[0], _infantryBobId);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 1);
        assertEq(_infantryAlice.pos.x, 6);
        assertEq(_infantryAlice.pos.y, 1);
        assertEq(_infantryBob.pos.x, 7);
        assertEq(_infantryBob.pos.y, 1);
        assertEq(getter.getTileAt(player1Pos).occupantId, _infantryAliceId);

        // move transport somewhere and back
        vm.warp(12);
        engine.march(_troopTransport1Id, Position({x: 7, y: 0})); // move
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        _infantryAlice = getter.getTroop(_infantryAliceId);
        _infantryBob = getter.getTroop(_infantryBobId);
        assertEq(_troopTransport1.cargoTroopIds.length, 1);
        assertEq(_troopTransport1.cargoTroopIds[0], _infantryBobId);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 0);
        assertEq(_infantryAlice.pos.x, 6);
        assertEq(_infantryAlice.pos.y, 1);
        assertEq(_infantryBob.pos.x, 7);
        assertEq(_infantryBob.pos.y, 0);

        vm.warp(14);
        engine.march(_troopTransport1Id, Position({x: 7, y: 1})); // move
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        _infantryAlice = getter.getTroop(_infantryAliceId);
        _infantryBob = getter.getTroop(_infantryBobId);
        assertEq(_troopTransport1.cargoTroopIds.length, 1);
        assertEq(_troopTransport1.cargoTroopIds[0], _infantryBobId);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 1);
        assertEq(_infantryAlice.pos.x, 6);
        assertEq(_infantryAlice.pos.y, 1);
        assertEq(_infantryBob.pos.x, 7);
        assertEq(_infantryBob.pos.y, 1);

        // load and unload Alice again
        vm.warp(16);
        engine.march(_infantryAliceId, Position({x: 7, y: 1})); // move
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        _infantryAlice = getter.getTroop(_infantryAliceId);
        _infantryBob = getter.getTroop(_infantryBobId);
        assertEq(_troopTransport1.cargoTroopIds.length, 2);
        assertEq(_troopTransport1.cargoTroopIds[0], _infantryBobId);
        assertEq(_troopTransport1.cargoTroopIds[1], _infantryAliceId);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 1);
        assertEq(_infantryAlice.pos.x, 7);
        assertEq(_infantryAlice.pos.y, 1);
        assertEq(_infantryBob.pos.x, 7);
        assertEq(_infantryBob.pos.y, 1);

        vm.warp(18);
        engine.march(_infantryAliceId, Position({x: 6, y: 1})); // move
        _troopTransport1 = getter.getTroop(_troopTransport1Id);
        _infantryAlice = getter.getTroop(_infantryAliceId);
        _infantryBob = getter.getTroop(_infantryBobId);
        assertEq(_troopTransport1.cargoTroopIds.length, 1);
        assertEq(_troopTransport1.cargoTroopIds[0], _infantryBobId);
        assertEq(_troopTransport1.pos.x, 7);
        assertEq(_troopTransport1.pos.y, 1);
        assertEq(_infantryAlice.pos.x, 6);
        assertEq(_infantryAlice.pos.y, 1);
        assertEq(_infantryBob.pos.x, 7);
        assertEq(_infantryBob.pos.y, 1);

        // move Alice onto troop transport in adjacent port
        vm.warp(20);
        engine.march(_infantryAliceId, Position({x: 6, y: 2})); // move
        _troopTransport2 = getter.getTroop(_troopTransport2Id);
        _infantryAlice = getter.getTroop(_infantryAliceId);
        assertEq(_troopTransport2.cargoTroopIds.length, 1);
        assertEq(_troopTransport2.cargoTroopIds[0], _infantryAliceId);
        assertEq(_troopTransport2.pos.x, 6);
        assertEq(_troopTransport2.pos.y, 2);
        assertEq(_infantryAlice.pos.x, 6);
        assertEq(_infantryAlice.pos.y, 2);

        // move troop transport onto ocean
        vm.warp(22);
        Position memory _newPos = Position({x: 7, y: 2});
        // Note: test move functionality
        engine.march(_troopTransport2Id, _newPos);
        _troopTransport2 = getter.getTroop(_troopTransport2Id);
        _infantryAlice = getter.getTroop(_infantryAliceId);
        assertEq(_troopTransport2.pos.x, 7);
        assertEq(_troopTransport2.pos.y, 2);
        assertEq(_infantryAlice.pos.x, 7);
        assertEq(_infantryAlice.pos.y, 2);
        assertEq(getter.getTileAt(_newPos).occupantId, _troopTransport2Id);

        // failure: try to move transport onto coast
        vm.warp(24);
        vm.expectRevert("CURIO: Cannot move on land");
        engine.march(_troopTransport2Id, Position({x: 8, y: 2}));

        // battle enemy destroyer
        engine.march(_troopTransport2Id, _enemyPos);

        // if troop transport dies, verify cargo infantry also dies
        vm.warp(26);
        if (getter.getTileAt(_newPos).occupantId == NULL) {
            _infantryAlice = getter.getTroop(_infantryAliceId);
            assertEq(_infantryAlice.owner, NULL_ADDR);
            assertEq(getter.getPlayer(player1).numOwnedTroops, 2); // numOwnedTroop reduced by 2 due to cargo infantry death
            assertEq(getter.getPlayer(player2).numOwnedTroops, 1);
        } else {
            engine.march(_infantryAliceId, Position({x: 8, y: 2}));
            _troopTransport2 = getter.getTroop(_troopTransport2Id);
            assertEq(_troopTransport2.cargoTroopIds.length, 0);
            assertEq(getter.getTileAt(Position({x: 7, y: 2})).occupantId, _troopTransport2Id);
            assertEq(getter.getPlayer(player1).numOwnedTroops, 4);
            assertEq(getter.getPlayer(player2).numOwnedTroops, 0);
        }

        vm.stopPrank();
    }
}
