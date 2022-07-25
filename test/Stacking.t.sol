//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";

contract StackingTest is Test, DiamondDeployTest {
    function testArmyBasics() public {
        assertEq(getter.getPlayer(player1).numOwnedBases, 1);
        assertEq(getter.getPlayer(player1).numOwnedTroops, 0);

        // spawn troop => army automatically generated
        vm.startPrank(deployer);
        helper.spawnTroop(player1Pos, player1, infantryTroopTypeId);
        Army memory army1 = getter.getArmyAt(player1Pos);
        assertEq(army1.owner, player1); // check ownership
        assertEq(army1.pos.x, player1Pos.x); // check position
        assertEq(army1.pos.y, player1Pos.y);
    }
}
