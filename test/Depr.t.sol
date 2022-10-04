//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Set} from "contracts/Set.sol";

contract ECS is Test, DiamondDeployTest {
    function testPurchaseAndMoveTroop() public {
        /**
        Logic flow:
        - Initialize two players, Alice and Bob, each with a settler
        - Alice walks 2 tiles west and founds a city
        - Bob immediately founds a city
        - Alice starts producing gold in her city center
        - Alice starts producing cavalry in her city center
        - Alice ends production of cavalry
        - Bob starts producing archer in his city center
        - Alice starts producing infantry in her city center
        - Bob ends production of archer
        - Alice ends production of infantry
        - Alice organizes an army of cavalry and infantry
        - Alice marches her army to a location close to Bob's city center
        - Bob marches his army to Alice's army, and a battle begins
         */

        // // Verify pre-conditions
        // assertTrue(getter.getComponent("DefenseFactor").has(destroyerTemplateId));
        // assertTrue(!getter.getComponent("DefenseFactor").has(player1Id));
        // assertEq(getter.getComponent("IsActive").getEntities().length, 6); // 3 players and the 3 bases they occupy
        // assertEq(abi.decode(getter.getComponent("Gold").getBytesValue(player1Id), (uint256)), 20);
        // assertEq(getter.getComponent("Gold").getEntitiesWithValue(abi.encode(19))[0], destroyerTemplateId);
        // assertEq(getter.getComponent("Position").getEntitiesWithValue(abi.encode(player1Pos)).length, 1);
        // assertEq(getter.getComponent("CanPurchase").getEntities().length, 3);
        // assertEq(getter.getComponent("CanMove").getEntities()[0], destroyerTemplateId);
        // assertEq(getter.getComponent("Name").getEntitiesWithValue(abi.encode("Alice"))[0], player1Id);
        // vm.expectRevert(bytes("CURIO: Component not found"));
        // getter.getComponent("NonexistentComponent");

        // // Purchase a destroyer
        // uint256 _troopEntity = game.purchaseTroop(player1Pos, destroyerTemplateId);
        // uint256 _armyEntity = abi.decode(getter.getComponent("ArmyEntity").getBytesValue(_troopEntity), (uint256));

        // // Verify post-conditions
        // assertEq(abi.decode(getter.getComponent("Gold").getBytesValue(player1Id), (uint256)), 20 - 19);
        // assertEq(getter.getComponent("Position").getEntitiesWithValue(abi.encode(player1Pos)).length, 2);
        // Position memory _troopPosition = abi.decode(getter.getComponent("Position").getBytesValue(_armyEntity), (Position));
        // assertEq(_troopPosition.x, player1Pos.x);
        // assertEq(_troopPosition.y, player1Pos.y);
        // assertEq(abi.decode(getter.getComponent("Health").getBytesValue(_troopEntity), (uint256)), 3);
        // assertEq(getter.getComponent("CanMove").getEntities()[1], _troopEntity);
        // uint256[] memory _baseEntities = getter.getComponent("CanPurchase").getEntities();
        // assertEq(_baseEntities.length, 6); // because 1 nearby city and 2 ports are also initialized in neighbor search
        // assertEq(abi.decode(getter.getComponent("OwnerEntity").getBytesValue(_baseEntities[0]), (uint256)), player1Id);

        // // Verify inability to buy another destroyer before moving destroyer away
        // vm.expectRevert(bytes("CURIO: Base occupied by another troop"));
        // game.purchaseTroop(player1Pos, destroyerTemplateId);

        // // Move destroyer to nearby water tile
        // vm.warp(3);
        // game.moveTroop(_troopEntity, Position({x: 7, y: 1}));
        // _armyEntity = abi.decode(getter.getComponent("ArmyEntity").getBytesValue(_troopEntity), (uint256));

        // // Verify post-conditions
        // Position memory _currentPosition = abi.decode(getter.getComponent("Position").getBytesValue(_armyEntity), (Position));
        // assertEq(_currentPosition.x, 7);
        // assertEq(_currentPosition.y, 1);

        vm.startPrank(player1);
        vm.stopPrank();
    }
}
