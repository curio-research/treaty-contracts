//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Set} from "contracts/Set.sol";

contract ECS is Test, DiamondDeployTest {
    function testPurchaseTroopEntity() public {
        // List of all component names
        // FIXME: array length hardcoded
        // TODO: separate into systems
        string[30] memory _componentNameList = [
            "Name",
            "IsActive",
            "Position",
            "Owner",
            "CanMove",
            "CanAttack",
            "CanCapture",
            "CanPurchase",
            "Health",
            "Gold",
            "GoldPerSecond",
            "GoldRatePositive",
            "Oil",
            "OilPerSecond",
            "OilRatePositive",
            "InitTimestamp",
            "BalanceLastUpdated",
            "LastMoved",
            "LastLargeActionTaken",
            "LastRepaired",
            "IsLandTroop",
            "MaxHealth",
            "DamagePerHit",
            "AttackFactor",
            "DefenseFactor",
            "MovementCooldown",
            "LargeActionCooldown",
            "CargoCapacity",
            "ArmyId",
            "IsDebuffed" //
        ];

        vm.startPrank(deployer);

        // Register components
        helper.registerComponents(diamond, _componentNameList);

        // Initialize a troop template (destroyer)
        uint256 _destroyerTemplateId = helper.addEntity();
        helper.setComponentValue("CanMove", _destroyerTemplateId, abi.encode(true));
        helper.setComponentValue("CanAttack", _destroyerTemplateId, abi.encode(true));
        helper.setComponentValue("Name", _destroyerTemplateId, abi.encode("Destroyer"));
        helper.setComponentValue("MaxHealth", _destroyerTemplateId, abi.encode(3));
        helper.setComponentValue("DamagePerHit", _destroyerTemplateId, abi.encode(1));
        helper.setComponentValue("AttackFactor", _destroyerTemplateId, abi.encode(100));
        helper.setComponentValue("DefenseFactor", _destroyerTemplateId, abi.encode(100));
        helper.setComponentValue("MovementCooldown", _destroyerTemplateId, abi.encode(1));
        helper.setComponentValue("LargeActionCooldown", _destroyerTemplateId, abi.encode(1));
        helper.setComponentValue("Gold", _destroyerTemplateId, abi.encode(19));
        helper.setComponentValue("OilPerSecond", _destroyerTemplateId, abi.encode(1));

        vm.stopPrank();
        vm.startPrank(player1);

        // Initialize player1 and its home port
        uint256 _player1Id = engine.initializePlayerECS(player1Pos, "Bob");

        // Verify pre-conditions
        assertEq(_player1Id, 3);
        assertTrue(getter.getComponent("DefenseFactor").has(_destroyerTemplateId));
        assertTrue(!getter.getComponent("DefenseFactor").has(_player1Id));
        assertEq(getter.getComponent("IsActive").getEntities().length, 3);
        assertEq(getter.getComponent("CargoCapacity").getEntities().length, 0);
        assertEq(abi.decode(getter.getComponent("Gold").getValue(_player1Id), (uint256)), 20);
        assertEq(getter.getComponent("Gold").getEntitiesWithValue(abi.encode(19))[0], _destroyerTemplateId);
        assertEq(getter.getComponent("Position").getEntitiesWithValue(abi.encode(player1Pos)).length, 1);
        assertEq(getter.getComponent("CanPurchase").getEntities().length, 1);
        assertEq(getter.getComponent("Name").getEntitiesWithValue(abi.encode("Bob"))[0], _player1Id);
        vm.expectRevert(bytes("CURIO: Component not found"));
        getter.getComponent("NonexistentComponent");

        // Purchase a destroyer
        uint256 _troopId = engine.purchaseTroopECS(player1Pos, _destroyerTemplateId);

        // Verify post-conditions
        assertEq(abi.decode(getter.getComponent("Gold").getValue(_player1Id), (uint256)), 20 - 19);
        assertEq(getter.getComponent("Position").getEntitiesWithValue(abi.encode(player1Pos)).length, 2);
        Position memory _troopPosition = abi.decode(getter.getComponent("Position").getValue(_troopId), (Position));
        assertEq(_troopPosition.x, player1Pos.x);
        assertEq(_troopPosition.y, player1Pos.y);
        assertEq(abi.decode(getter.getComponent("Health").getValue(_troopId), (uint256)), 3);
        assertEq(getter.getComponent("CanMove").getEntities()[1], _troopId);
        uint256[] memory _baseIds = getter.getComponent("CanPurchase").getEntities();
        assertEq(_baseIds.length, 4); // because nearby city and 2 ports are also initialized in neighbor search
        assertEq(abi.decode(getter.getComponent("Owner").getValue(_baseIds[0]), (uint256)), _player1Id);

        // Verify inability to buy another destroyer before moving destroyer away
        vm.expectRevert(bytes("CURIO: Base occupied by another troop"));
        engine.purchaseTroopECS(player1Pos, _destroyerTemplateId);

        // Move destroyer to nearby water tile
        engine.moveTroopECS(_troopId, Position({x: 7, y: 1}));

        // Verify post-conditions
        Position memory _currentPosition = abi.decode(getter.getComponent("Position").getValue(_troopId), (Position));
        assertEq(_currentPosition.x, 7);
        assertEq(_currentPosition.y, 1);

        vm.stopPrank();
    }
}
