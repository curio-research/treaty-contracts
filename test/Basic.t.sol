//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";

contract TreatyTest is Test, DiamondDeployTest {
    function testClaimBarbarinaGather() public {
        // Pin key IDs and tile positions
        uint256 texasID = getter.getSettlerAt(player2Pos);
        Position memory cornTilePos = Position({x: 50, y: 40});
        Position memory barbarinaTilePos = Position({x: 60, y: 50});
        uint256 time = 2;
        vm.warp(time);

        vm.startPrank(deployer);
        admin.assignResource(texasID, "Gold", 10000000);
        admin.assignResource(texasID, "Food", 32000000);
        vm.stopPrank();

        // Spawn resource near player2's city
        {
            vm.startPrank(deployer);
            admin.spawnResource(cornTilePos, "Food");
            admin.spawnBarbarian(barbarinaTilePos, 1);
            vm.stopPrank();
        }
        uint256 madameBarbarinaID = getter.getTileAt(barbarinaTilePos);
        assertTrue(Set(getter.getEntitiesAddr()).includes(madameBarbarinaID));

        // Player 2 founds city
        {
            Position[] memory texasTiles = new Position[](9);
            texasTiles[0] = Position({x: 50, y: 20});
            texasTiles[1] = Position({x: 50, y: 30});
            texasTiles[2] = Position({x: 50, y: 40});
            texasTiles[3] = Position({x: 60, y: 40});
            texasTiles[4] = Position({x: 70, y: 40});
            texasTiles[5] = Position({x: 70, y: 30});
            texasTiles[6] = Position({x: 70, y: 20});
            texasTiles[7] = Position({x: 60, y: 20});
            texasTiles[8] = Position({x: 60, y: 30});
            vm.startPrank(player2);
            game.foundCity(texasID, texasTiles, "Lone Star Republic");
            vm.stopPrank();
            // assertEq(getter.getCityFood(texasID), 0);
            // assertEq(getter.getCityGold(texasID), _generateWorldConstants().initCityGold);
        }

        // Produce troop and organize army
        {
            uint256[] memory texasArmyTemplateIDs = new uint256[](2);
            texasArmyTemplateIDs[0] = cavalryTemplateID;
            texasArmyTemplateIDs[1] = infantryTemplateID;
            uint256[] memory texasArmyAmounts = new uint256[](2);
            texasArmyAmounts[0] = 1000;
            texasArmyAmounts[1] = 1000;

            vm.startPrank(player2);
            uint256 houseID = getter.getCityCenter(texasID);
            uint256 productionID = game.startTroopProduction(houseID, texasArmyTemplateIDs[0], texasArmyAmounts[0]);
            time += texasArmyAmounts[0];
            vm.warp(time);
            game.endTroopProduction(houseID, productionID);
            productionID = game.startTroopProduction(houseID, texasArmyTemplateIDs[1], texasArmyAmounts[1]);
            time += texasArmyAmounts[1];
            vm.warp(time);
            game.endTroopProduction(houseID, productionID);
            game.organizeArmy(texasID, texasArmyTemplateIDs, texasArmyAmounts);
            vm.stopPrank();
        }
        time += 1000 + 1000;
        vm.warp(time);

        // Fight the barbarian
        uint256 texasArmyID = getter.getArmyAt(Position({x: 65, y: 35}));
        assertTrue(Set(getter.getEntitiesAddr()).includes(texasArmyID));
        {
            vm.startPrank(player2);
            time += 2;
            vm.warp(time);
            game.move(texasArmyID, Position({x: 65, y: 40}));
            time += 2;
            vm.warp(time);
            game.move(texasArmyID, Position({x: 65, y: 45}));
            time += 2;
            vm.warp(time);
            game.move(texasArmyID, Position({x: 65, y: 49}));
            uint256 madameBarbarinaStrength;
            do {
                time += 5;
                vm.warp(time);
                game.battle(texasArmyID, madameBarbarinaID);
                madameBarbarinaStrength = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getConstituents(madameBarbarinaID)[0]), (uint256));
            } while (madameBarbarinaStrength < 1000);
            vm.stopPrank();
        }
        time += 1000;
        vm.warp(time);

        // Check post condition
        // assertEq(getter.getCityFood(texasID), 60000);
        // assertEq(getter.getCityGold(texasID), 180000);

        // Try claiming the barbarian in vain
        vm.startPrank(player2);
        time += 2;
        vm.warp(time);
        game.move(texasArmyID, Position({x: 65, y: 54}));
        vm.expectRevert("CURIO: Cannot claim barbarian tiles");
        game.claimTile(texasArmyID, madameBarbarinaID);
        vm.stopPrank();

        // Fight an empty tile and claim it
        vm.prank(deployer);
        admin.adminInitializeTile(Position({x: 50, y: 50}));
        uint256 emptyTileID = getter.getTileAt(Position({x: 50, y: 50}));
        assertTrue(Set(getter.getEntitiesAddr()).includes(emptyTileID));
        {
            vm.startPrank(player2);
            time += 2;
            vm.warp(time);
            game.move(texasArmyID, Position({x: 60, y: 54}));
            time += 2;
            vm.warp(time);
            game.move(texasArmyID, Position({x: 55, y: 54}));
            do {
                time += 5;
                vm.warp(time);
                game.battle(texasArmyID, emptyTileID);
            } while (getter.getConstituents(emptyTileID).length > 0);
            game.claimTile(texasArmyID, emptyTileID);
            assertEq(abi.decode(getter.getComponent("Owner").getBytesValue(emptyTileID), (uint256)), player2Id);
            vm.stopPrank();
        }
        time += 100;
        vm.warp(time);

        // Start and end gather
        {
            vm.startPrank(player2);
            time += 2;
            vm.warp(time);
            game.move(texasArmyID, Position({x: 55, y: 49}));
            game.startGather(texasArmyID, getter.getResourceAtTile(cornTilePos));
            time += 100;
            vm.warp(time);
            game.endGather(texasArmyID);
            assertEq(getter.getCityFood(texasID), 60000);
            assertEq(getter.getArmyFood(texasArmyID), 100);
            vm.stopPrank();
        }
    }

    function testBattle() public {
        uint256 moscowID = getter.getSettlerAt(player1Pos);
        uint256 kievID = getter.getSettlerAt(player2Pos);
        uint256 time = block.timestamp + 10;
        vm.warp(time);

        // Player 1 founds city
        {
            Position[] memory moscowTiles = new Position[](9);
            moscowTiles[0] = Position({x: 50, y: 0});
            moscowTiles[1] = Position({x: 50, y: 10});
            moscowTiles[2] = Position({x: 50, y: 20});
            moscowTiles[3] = Position({x: 60, y: 20});
            moscowTiles[4] = Position({x: 70, y: 20});
            moscowTiles[5] = Position({x: 70, y: 10});
            moscowTiles[6] = Position({x: 70, y: 0});
            moscowTiles[7] = Position({x: 60, y: 0});
            moscowTiles[8] = Position({x: 60, y: 10});
            vm.prank(player1);
            game.foundCity(moscowID, moscowTiles, "Moscow");
            console.log("Moscow is founded");
        }

        // Player 2 founds city
        {
            Position[] memory kievTiles = new Position[](9);
            kievTiles[0] = Position({x: 50, y: 30});
            kievTiles[1] = Position({x: 50, y: 40});
            kievTiles[2] = Position({x: 50, y: 50});
            kievTiles[3] = Position({x: 60, y: 50});
            kievTiles[4] = Position({x: 70, y: 50});
            kievTiles[5] = Position({x: 70, y: 40});
            kievTiles[6] = Position({x: 70, y: 30});
            kievTiles[7] = Position({x: 60, y: 30});
            kievTiles[8] = Position({x: 60, y: 40});
            vm.startPrank(player2);
            game.move(kievID, Position({x: 60, y: 40}));
            time += 2;
            vm.warp(time);
            game.move(kievID, Position({x: 67, y: 47}));
            game.foundCity(kievID, kievTiles, "Kiev");
            vm.stopPrank();
            console.log("Kiev is founded");
        }
        time += 2;
        vm.warp(time);
        vm.startPrank(deployer);
        admin.assignResource(kievID, "Gold", 10000000);
        admin.assignResource(kievID, "Food", 32000000);
        admin.assignResource(moscowID, "Gold", 10000000);
        admin.assignResource(moscowID, "Food", 32000000);
        vm.stopPrank();

        // Player 1 produces troops and organizes army
        {
            uint256[] memory moscowArmyTemplateIDs = new uint256[](2);
            moscowArmyTemplateIDs[0] = cavalryTemplateID;
            moscowArmyTemplateIDs[1] = infantryTemplateID;
            uint256[] memory moscowArmyAmounts = new uint256[](2);
            moscowArmyAmounts[0] = 500;
            moscowArmyAmounts[1] = 500;

            vm.startPrank(player1);
            uint256 kremlinID = getter.getCityCenter(moscowID);
            uint256 kremlinProdID = game.startTroopProduction(kremlinID, moscowArmyTemplateIDs[0], moscowArmyAmounts[0]);
            time += moscowArmyAmounts[0];
            vm.warp(time);
            game.endTroopProduction(kremlinID, kremlinProdID);
            kremlinProdID = game.startTroopProduction(kremlinID, moscowArmyTemplateIDs[1], moscowArmyAmounts[1]);
            time += moscowArmyAmounts[1];
            vm.warp(time);
            game.endTroopProduction(kremlinID, kremlinProdID);
            game.organizeArmy(moscowID, moscowArmyTemplateIDs, moscowArmyAmounts);
            vm.stopPrank();

            console.log("Moscow mobilizes");
        }
        time += 500 + 500;
        vm.warp(time);
        uint256 moscowArmyID = getter.getArmyAt(Position({x: 65, y: 15}));

        // Player 2 produces troops and organizes army
        {
            uint256[] memory kievArmyTemplateIDs = new uint256[](2);
            kievArmyTemplateIDs[0] = infantryTemplateID;
            kievArmyTemplateIDs[1] = archerTemplateID;
            uint256[] memory kievArmyAmounts = new uint256[](2);
            kievArmyAmounts[0] = 30;
            kievArmyAmounts[1] = 70;

            vm.startPrank(player2);
            uint256 mariinskyiID = getter.getCityCenter(kievID);
            uint256 mariinskyiProdID = game.startTroopProduction(mariinskyiID, kievArmyTemplateIDs[0], kievArmyAmounts[0]);
            time += kievArmyAmounts[0];
            vm.warp(time);
            game.endTroopProduction(mariinskyiID, mariinskyiProdID);
            mariinskyiProdID = game.startTroopProduction(mariinskyiID, kievArmyTemplateIDs[1], kievArmyAmounts[1]);
            time += kievArmyAmounts[1];
            vm.warp(time);
            game.endTroopProduction(mariinskyiID, mariinskyiProdID);
            game.organizeArmy(kievID, kievArmyTemplateIDs, kievArmyAmounts);
            vm.stopPrank();

            console.log("Kiev mobilizes");
        }
        time += 30 + 70;
        vm.warp(time);
        uint256 kievArmyID = getter.getArmyAt(Position({x: 65, y: 45}));

        // Moscow and Kiev move their armies next to one another
        time += 5;
        vm.warp(time);
        vm.prank(player1);
        game.move(moscowArmyID, Position({x: 60, y: 15}));
        vm.prank(player2);
        game.move(kievArmyID, Position({x: 62, y: 42}));

        time += 5;
        vm.warp(time);
        vm.prank(player1);
        game.move(moscowArmyID, Position({x: 60, y: 20}));
        vm.prank(player2);
        game.move(kievArmyID, Position({x: 61, y: 38}));
        time += 5;
        vm.warp(time);
        vm.prank(player1);
        game.move(moscowArmyID, Position({x: 60, y: 25}));
        vm.prank(player2);
        game.move(kievArmyID, Position({x: 60, y: 34}));
        time += 5;
        vm.warp(time);
        vm.prank(player2);
        game.move(kievArmyID, Position({x: 60, y: 30}));
        console.log("Troops are on the frontier, waiting for command...");

        // Check battle preconditions
        uint256 moscowInfantryAmount;
        uint256 kievArcherAmount;
        {
            assertEq(abi.decode(getter.getComponent("Position").getBytesValue(moscowArmyID), (Position)).y, 25);
            assertEq(abi.decode(getter.getComponent("Position").getBytesValue(kievArmyID), (Position)).y, 30);
            moscowInfantryAmount = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getConstituents(moscowArmyID)[1]), (uint256));
            assertEq(moscowInfantryAmount, 500);
            kievArcherAmount = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getConstituents(kievArmyID)[1]), (uint256));
            assertEq(kievArcherAmount, 70);
            console.log("Everything is in order");
        }

        // Moscow's army battles Kiev's army
        {
            vm.prank(player1);
            game.battle(moscowArmyID, kievArmyID);
            console.log("First battle takes place");
        }

        // Check post conditions
        {
            assertTrue(Set(getter.getEntitiesAddr()).includes(moscowArmyID));
            assertTrue(Set(getter.getEntitiesAddr()).includes(kievArmyID));
            moscowInfantryAmount = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getConstituents(moscowArmyID)[1]), (uint256));
            assertGe(moscowInfantryAmount, 500 - 20);
            assertLe(moscowInfantryAmount, 500 - 3);
            uint256 archerIndex = getter.getConstituents(kievArmyID).length == 2 ? 1 : 0;
            kievArcherAmount = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getConstituents(kievArmyID)[archerIndex]), (uint256));
            assertGe(kievArcherAmount, 70 - 50);
            assertLe(kievArcherAmount, 70 - 20);
            console.log("Casualties are heavy on both sides, but especially for Kiev");
        }

        // One more round of battle and Kiev's army is dead
        {
            vm.startPrank(player1);
            vm.expectRevert("CURIO: Battled too recently");
            game.battle(moscowArmyID, kievArmyID);
            time += 2;
            vm.warp(time);
            game.battle(moscowArmyID, kievArmyID);
            vm.stopPrank();
            assertTrue(Set(getter.getEntitiesAddr()).includes(moscowArmyID));
            assertFalse(Set(getter.getEntitiesAddr()).includes(kievArmyID));
            console.log("The road to Kiev is clear");
        }
        time += 2;
        vm.warp(time);

        // Moscow's army attacks Suburb Kiev (left of city center)
        time += 5;
        vm.warp(time);
        {
            vm.startPrank(player1);
            game.move(moscowArmyID, Position({x: 60, y: 29}));
            time += 2;
            vm.warp(time);

            uint256 kievSuburbTileID = getter.getTileAt(Position({x: 60, y: 30}));

            game.battle(moscowArmyID, kievSuburbTileID);
            vm.stopPrank();
            moscowInfantryAmount = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getConstituents(moscowArmyID)[1]), (uint256));
            assertGe(moscowInfantryAmount, 500 - 40);
            // assertLe(moscowInfantryAmount, 500 - 20); // FIXME

            uint256 kievDefenseAmount = abi.decode(getter.getComponent("Amount").getBytesValue(getter.getConstituentAtTile(kievSuburbTileID)), (uint256));
            // assertGe(kievDefenseAmount, _generateWorldConstants().cityGuardAmount - 50);
            // assertLe(moscowInfantryAmount, _generateWorldConstants().cityGuardAmount - 20); // FIXME
            console.log("Moscow encounters great setback advancing to Kiev");
        }
        time += 6;
        vm.warp(time);

        // TODO: repeat battle until Moscow's army dies at the foot of Kiev
        // TODO: test with inventory seizures
    }

    function testDisband() public {
        Position[] memory territory = new Position[](9);
        territory[0] = Position({x: 50, y: 20});
        territory[1] = Position({x: 50, y: 30});
        territory[2] = Position({x: 50, y: 40});
        territory[3] = Position({x: 60, y: 40});
        territory[4] = Position({x: 70, y: 40});
        territory[5] = Position({x: 70, y: 30});
        territory[6] = Position({x: 70, y: 20});
        territory[7] = Position({x: 60, y: 20});
        territory[8] = Position({x: 60, y: 30});

        // Player 2 founds a city
        vm.startPrank(player2);
        uint256 genghisID = getter.getSettlerAt(player2Pos);
        game.foundCity(genghisID, territory, "Ulaanbaataar");
        uint256 genghisYurtID = getter.getCityCenter(genghisID);
        vm.stopPrank();

        vm.startPrank(deployer);
        admin.assignResource(genghisID, "Gold", 10000000);
        admin.assignResource(genghisID, "Food", 32000000);
        vm.stopPrank();

        vm.startPrank(player2);

        console.log("genghisYurt City Center:", getter.getPositionExternal("StartPosition", genghisYurtID).x, getter.getPositionExternal("StartPosition", genghisYurtID).y);
        console.log("genghis City:", getter.getPositionExternal("StartPosition", genghisID).x, getter.getPositionExternal("StartPosition", genghisID).y);

        // Player produces troops
        uint256 productionID = game.startTroopProduction(genghisYurtID, cavalryTemplateID, 20);
        vm.warp(25);
        game.endTroopProduction(genghisYurtID, productionID);

        // Player organizes an army
        uint256[] memory templateIDs = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        templateIDs[0] = cavalryTemplateID;
        amounts[0] = 18;
        uint256 goldenHordeID = game.organizeArmy(genghisID, templateIDs, amounts);
        assertEq(abi.decode(getter.getComponent("Amount").getBytesValue(getter.getInventoryByCityAndType(genghisID, "Cavalry")), (uint256)), 20 - 18);

        // Player moves off the army
        vm.warp(26);
        game.move(goldenHordeID, Position({x: 62, y: 32}));
        // vm.warp(27);
        // game.move(goldenHordeID, Position({x: 59, y: 29}));
        // vm.warp(28);

        // console.log("AA");
        // Player fails to disband
        // vm.expectRevert("CURIO: Army must be on city center");
        // game.disbandArmy(goldenHordeID);

        // console.log("BB");
        // Player moves army back and successfully disbands
        // vm.warp(29);
        // game.move(goldenHordeID, Position({x: 62, y: 32}));

        vm.warp(30);
        game.disbandArmy(goldenHordeID);
        assertEq(abi.decode(getter.getComponent("Amount").getBytesValue(getter.getInventoryByCityAndType(genghisID, "Cavalry")), (uint256)), 20);

        vm.stopPrank();
    }

    function testEntityRemoval() public {
        // Check pre-condition
        uint256 _settyID = getter.getSettlerAt(player1Pos);
        assertEq(getter.getComponent("CanSettle").getEntities().length, 3);

        // Remove settler
        vm.prank(deployer);
        admin.removeEntity(_settyID);

        // // Check post-condition
        assertEq(getter.getComponent("CanSettle").getEntities().length, 2);
        Position[] memory _territory = new Position[](9);
        _territory[0] = Position({x: 50, y: 20});
        _territory[1] = Position({x: 50, y: 30});
        _territory[2] = Position({x: 50, y: 40});
        _territory[3] = Position({x: 60, y: 40});
        _territory[4] = Position({x: 70, y: 40});
        _territory[5] = Position({x: 70, y: 30});
        _territory[6] = Position({x: 70, y: 20});
        _territory[7] = Position({x: 60, y: 20});
        _territory[8] = Position({x: 60, y: 30});

        // Player 2 founds a city
        vm.startPrank(player2);
        uint256 _setty2ID = getter.getSettlerAt(player2Pos);
        game.foundCity(_setty2ID, _territory, "Philadelphia");
        // assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 9);
        vm.stopPrank();

        vm.startPrank(deployer);

        admin.assignResource(_setty2ID, "Gold", 10000000);
        admin.assignResource(_setty2ID, "Food", 32000000);

        vm.stopPrank();
        vm.startPrank(player2);

        // // Player 2 packs the city
        // game.packCity(_setty2ID);

        // assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 3);
        vm.stopPrank();
    }

    function testMultipleTroopProductions() public {
        Position[] memory _territory = new Position[](9);
        _territory[0] = Position({x: 60, y: 0});
        _territory[1] = Position({x: 60, y: 10});
        _territory[2] = Position({x: 60, y: 20});
        _territory[3] = Position({x: 70, y: 20});
        _territory[4] = Position({x: 80, y: 20});
        _territory[5] = Position({x: 80, y: 10});
        _territory[6] = Position({x: 80, y: 0});
        _territory[7] = Position({x: 70, y: 0});
        _territory[8] = Position({x: 70, y: 10});

        vm.startPrank(player1);

        // Found city
        vm.warp(3);
        uint256 _settyID = getter.getSettlerAt(player1Pos);
        game.move(_settyID, Position({x: 70, y: 10}));
        game.foundCity(_settyID, _territory, "New Amsterdam");
        vm.stopPrank();

        vm.startPrank(deployer);

        admin.assignResource(_settyID, "Gold", 10000000);
        admin.assignResource(_settyID, "Food", 32000000);

        vm.stopPrank();
        vm.startPrank(player1);

        // assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 9);

        uint256 _cityCenterID = getter.getCityCenter(_settyID);

        assertTrue(getter.getInventoryByCityAndType(_settyID, "Cavalry") == NULL);

        // Produce troops
        uint256 _productionID = game.startTroopProduction(_cityCenterID, cavalryTemplateID, 20);
        vm.warp(30);
        vm.expectRevert("CURIO: Concurrent productions disallowed");
        game.startTroopProduction(_cityCenterID, cavalryTemplateID, 20);
        game.endTroopProduction(_cityCenterID, _productionID);

        // Get inventory
        assertTrue(getter.getInventoryByCityAndType(_settyID, "Cavalry") != NULL);

        // Produce more troops
        _productionID = game.startTroopProduction(_cityCenterID, cavalryTemplateID, 20);
        vm.warp(60);
        game.endTroopProduction(_cityCenterID, _productionID);

        // Form army
        uint256[] memory _templateIDs = new uint256[](1);
        uint256[] memory _amounts = new uint256[](1);
        _templateIDs[0] = getter.getTemplateByInventoryType("Cavalry");
        _amounts[0] = 30;
        game.organizeArmy(_settyID, _templateIDs, _amounts);
    }

    function testSet() public {
        Set set = new Set();
        set.add(1);
        set.add(2);
        set.add(3);
        set.add(4);
        set.add(5);

        set.remove(2);
        set.remove(3);
        set.remove(4);

        assertEq(set.size(), 2);

        assertEq(set.includes(2), false);
        assertEq(set.includes(3), false);
        assertEq(set.includes(4), false);

        assertEq(set.includes(1), true);
        assertEq(set.includes(5), true);

        set.add(6);
        assertEq(set.includes(6), true);
        assertEq(set.size(), 3);
    }

    function testFoundProducePackMoveUnpackSequence() public {
        Position[] memory _territory = new Position[](9);
        _territory[0] = Position({x: 60, y: 0});
        _territory[1] = Position({x: 60, y: 10});
        _territory[2] = Position({x: 60, y: 20});
        _territory[3] = Position({x: 70, y: 20});
        _territory[4] = Position({x: 80, y: 20});
        _territory[5] = Position({x: 80, y: 10});
        _territory[6] = Position({x: 80, y: 0});
        _territory[7] = Position({x: 70, y: 0});
        _territory[8] = Position({x: 70, y: 10});

        vm.startPrank(player1);

        // Found city
        uint256 _settyID = getter.getSettlerAt(player1Pos);
        vm.stopPrank();

        vm.startPrank(deployer);
        admin.assignResource(_settyID, "Gold", 10000000);
        admin.assignResource(_settyID, "Food", 32000000);
        vm.stopPrank();

        vm.startPrank(player1);
        vm.warp(3);
        game.move(_settyID, Position({x: 65, y: 10}));
        vm.warp(4);
        game.move(_settyID, Position({x: 70, y: 10}));
        game.foundCity(_settyID, _territory, "New Amsterdam");
        // assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 9);

        uint256 _cityCenterID = getter.getCityCenter(_settyID);

        // Produce troops
        uint256 _productionID = game.startTroopProduction(_cityCenterID, cavalryTemplateID, 20);
        vm.warp(30);
        game.endTroopProduction(_cityCenterID, _productionID);

        // // Pack city and move settler out of former city boundry
        // game.packCity(_settyID);
        // // assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 0);
        // vm.warp(32);
        // game.move(_settyID, Position({x: 75, y: 10}));
        // vm.warp(33);
        // game.move(_settyID, Position({x: 80, y: 10}));
        // vm.warp(34);
        // game.move(_settyID, Position({x: 85, y: 10}));
        // vm.warp(35);
        // game.move(_settyID, Position({x: 90, y: 10}));

        // // Verify that all previous tiles and buildings are removed
        // for (uint256 i = 0; i < _territory.length; i++) {
        //     // assertEq(getter.getComponent("Position").getEntitiesWithValue(abi.encode(_territory[i])).length, 0);
        // }

        // // Found another city
        // vm.warp(36);
        // game.move(_settyID, Position({x: 85, y: 10}));
        // vm.warp(37);
        // game.move(_settyID, Position({x: 80, y: 10}));
        // _territory[0] = Position({x: 70, y: 0});
        // _territory[1] = Position({x: 70, y: 10});
        // _territory[2] = Position({x: 70, y: 20});
        // _territory[3] = Position({x: 80, y: 20});
        // _territory[4] = Position({x: 90, y: 20});
        // _territory[5] = Position({x: 90, y: 10});
        // _territory[6] = Position({x: 90, y: 0});
        // _territory[7] = Position({x: 80, y: 0});
        // _territory[8] = Position({x: 80, y: 10});
        // game.foundCity(_settyID, _territory, "New York");
        // // assertEq(getter.getComponent("Tag").getEntitiesWithValue(abi.encode("Tile")).length, 9);

        vm.stopPrank();
    }

    function testHarvestResource() public {
        // Pin key IDs and tile positions
        uint256 texasID = getter.getSettlerAt(player2Pos);
        Position memory cornTilePos = Position({x: 50, y: 40});
        uint256 time = 2;
        vm.warp(time);

        // Spawn resource near player2's city
        {
            vm.startPrank(deployer);
            admin.assignResource(texasID, "Gold", 10000000);
            admin.assignResource(texasID, "Food", 32000000);
            admin.spawnResource(cornTilePos, "Food");
            vm.stopPrank();
        }

        // Player 2 founds city
        {
            Position[] memory texasTiles = new Position[](9);
            texasTiles[0] = Position({x: 50, y: 20});
            texasTiles[1] = Position({x: 50, y: 30});
            texasTiles[2] = Position({x: 50, y: 40});
            texasTiles[3] = Position({x: 60, y: 40});
            texasTiles[4] = Position({x: 70, y: 40});
            texasTiles[5] = Position({x: 70, y: 30});
            texasTiles[6] = Position({x: 70, y: 20});
            texasTiles[7] = Position({x: 60, y: 20});
            texasTiles[8] = Position({x: 60, y: 30});
            vm.startPrank(player2);
            game.foundCity(texasID, texasTiles, "Lone Star Republic");
            vm.stopPrank();
            // assertEq(getter.getCityFood(texasID), 0);
            // assertEq(getter.getCityGold(texasID), _generateWorldConstants().initCityGold);
        }

        vm.startPrank(deployer);
        admin.assignResource(texasID, "Gold", 10000000);
        admin.assignResource(texasID, "Food", 32000000);
        vm.stopPrank();

        console.log("City Gold before Resource Upgrade:", getter.getCityGold(texasID));
        console.log("City Food before Resource UPgrade:", getter.getCityFood(texasID));

        // Player 2 upgrades resource
        time += 50;
        vm.warp(time);

        vm.startPrank(player2);
        uint256 cornResourceID = getter.getResourceAtTile(cornTilePos);
        assertEq(getter.getResourceLevel(cornResourceID), 0);

        game.upgradeResource(cornResourceID);
        assertEq(getter.getResourceLevel(cornResourceID), 1);

        console.log("City Gold post Resource Upgrade:", getter.getCityGold(texasID));
        console.log("City Food post Resource Upgrade:", getter.getCityFood(texasID));

        time += 50;
        vm.warp(time);
        game.harvestResource(cornResourceID);
        assertTrue(getter.getCityFood(texasID) > 0);
    }

    // function testTreatyBasics() public {
    //     Position[] memory _territory = new Position[](9);
    //     _territory[0] = Position({x: 50, y: 0});
    //     _territory[1] = Position({x: 50, y: 10});
    //     _territory[2] = Position({x: 50, y: 20});
    //     _territory[3] = Position({x: 60, y: 20});
    //     _territory[4] = Position({x: 70, y: 20});
    //     _territory[5] = Position({x: 70, y: 10});
    //     _territory[6] = Position({x: 70, y: 0});
    //     _territory[7] = Position({x: 60, y: 0});
    //     _territory[8] = Position({x: 60, y: 10});

    //     vm.startPrank(player1);
    //     game.joinTreaty(address(nato));

    //     uint256 _settlerID = getter.getSettlerAt(player1Pos);
    //     game.foundCity(_settlerID, _territory, "New York");

    //     uint256 _cityID = getter.getCityAt(player1Pos);
    //     uint256 _cityCenterID = getter.getCityCenter(_cityID);

    //     uint256 _productionID = game.startTroopProduction(_cityCenterID, cavalryTemplateID, 20);
    //     vm.warp(10);
    //     game.endTroopProduction(_cityCenterID, _productionID);

    //     uint256[] memory _arr1 = new uint256[](1);
    //     _arr1[0] = cavalryTemplateID;
    //     uint256[] memory _arr2 = new uint256[](1);
    //     _arr2[0] = 5;
    //     uint256 _army1 = game.organizeArmy(_cityID, _arr1, _arr2);

    //     vm.warp(20);
    //     game.moveArmy(_army1, Position({x: 60, y: 20}));

    //     game.denounceTreaty(address(nato));
    //     vm.stopPrank();
    // }
}
