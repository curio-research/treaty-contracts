//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";

contract GetterTest is Test, DiamondDeployTest {
    function testBulkGetAllTroops() public {
        vm.startPrank(deployer);
        admin.spawnTroop(Position({x: 1, y: 3}), player1, armyTroopTypeId);
        admin.spawnTroop(Position({x: 1, y: 4}), player1, armyTroopTypeId);
        admin.spawnTroop(Position({x: 2, y: 3}), player2, armyTroopTypeId);
        admin.spawnTroop(Position({x: 2, y: 4}), player2, armyTroopTypeId);
        admin.spawnTroop(Position({x: 7, y: 5}), player3, destroyerTroopTypeId);
        vm.stopPrank();

        Troop[] memory _allTroops = getter.bulkGetAllTroops();
        assertEq(_allTroops.length, 5);
        assertEq(_allTroops[0].owner, player1);
        assertEq(_allTroops[1].pos.x, 1);
        assertEq(_allTroops[1].pos.y, 4);
        assertEq(_allTroops[2].troopTypeId, armyTroopTypeId);
        assertEq(_allTroops[2].owner, player2);
        assertEq(_allTroops[4].troopTypeId, destroyerTroopTypeId);

        vm.warp(20);
        engine.updateEpoch();
        assertEq(getter.getEpoch(), 1);

        vm.prank(player1);
        engine.battle(1, Position({x: 2, y: 3})); // player2's first army dies

        if (getter.getTroopAt(Position({x: 2, y: 3})).health == 0) {
            // verify that all troops remain the same except player2's dead army
            _allTroops = getter.bulkGetAllTroops();
            assertEq(_allTroops.length, 5);
            assertEq(_allTroops[0].owner, player1);
            assertEq(_allTroops[1].pos.x, 1);
            assertEq(_allTroops[1].pos.y, 4);
            assertEq(_allTroops[2].troopTypeId, NULL);
            assertEq(_allTroops[2].owner, address(0));
            assertEq(_allTroops[4].troopTypeId, destroyerTroopTypeId);
        }
    }

    // function testGetMapChunk() public {
    //     uint256 _interval = getter.getWorldConstants().mapInterval;
    //     (Tile[] memory _allTiles, Position[] memory _allPos) = getter.getMapChunk(Position({x: 0, y: 0}));
    //     assertEq(_allTiles.length, 100);
    //     assertEq(_allPos.length, _interval * _interval);

    //     assertTrue(_allTiles[0].terrain == TERRAIN.WATER);
    //     assertEq(_allTiles[0].baseId, NULL);
    //     assertTrue(_allTiles[20].terrain == TERRAIN.COAST);
    //     assertTrue(_allTiles[20].baseId != NULL);
    //     assertTrue(_allTiles[40].terrain == TERRAIN.INLAND);
    //     assertEq(_allTiles[40].baseId, NULL);
    //     assertTrue(_allTiles[50].terrain == TERRAIN.INLAND);
    //     assertTrue(_allTiles[50].baseId != NULL);
    // }
}
