// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@pwnednomore/contracts/PTest.sol";
import "contracts/libraries/Storage.sol";
import "../DiamondDeploy.t.sol";

contract UpgradeResourceTest is PTest, DiamondDeployTest, UseStorage {
    uint256 texasID;
    Position public cornTilePos = Position({x: 50, y: 40});
    Position public barbarinaTilePos = Position({x: 60, y: 50});
    uint256 public time;

    function setUp() public override {
        super.setUp();

        texasID = getter.getSettlerAt(player2Pos);
        time = 2;
        vm.warp(time);

        _spawnResource();
        _foundCity();
        _assignResource();

        time += 50;
        vm.warp(time);
    }

    // A standard unit test. Should pass with setup above.
    function testUpgradeResouceAsUnitTest() public {
        uint256 beforeGold = getter.getCityGold(texasID);
        uint256 beforeFood = getter.getCityFood(texasID);

        this.upgradeResource(cornTilePos.x, cornTilePos.y);

        uint256 afterGold = getter.getCityGold(texasID);
        uint256 afterFood = getter.getCityFood(texasID);
        assert(beforeGold - afterGold >= 50000);
        assert(beforeFood - afterFood >= 16000);
    }

    // A property test. Should pass with any value passed in.
    function testUpgradeResouceAsPropertyTest(uint256 x, uint256 y) public {
        vm.assume(x <= 1000);
        vm.assume(y <= 1000);
        uint256 beforeGold = getter.getCityGold(texasID);
        uint256 beforeFood = getter.getCityFood(texasID);

        try this.upgradeResource(x, y) {
            uint256 afterGold = getter.getCityGold(texasID);
            uint256 afterFood = getter.getCityFood(texasID);
            assert(beforeGold - afterGold >= 50000);
            assert(beforeFood - afterFood >= 16000);
        } catch {
            uint256 afterGold = getter.getCityGold(texasID);
            uint256 afterFood = getter.getCityFood(texasID);
            assertEq(afterGold, beforeGold);
            assertEq(afterFood, beforeFood);
        }
    }

    // An invariant test. Should pass with any valid contract/network state.
    function invariantUpgradeResouce() public {
        uint256 beforeGold;
        uint256 beforeFood;
        try this.getStates(texasID) returns (uint256 gold, uint256 food) {
            beforeGold = gold;
            beforeFood = food;
        } catch {
            // In case the call reverts, ignore
            return;
        }
        try this.upgradeResource(cornTilePos.x, cornTilePos.y) {
            uint256 afterGold = getter.getCityGold(texasID);
            uint256 afterFood = getter.getCityFood(texasID);
            assert(beforeGold - afterGold >= 50000);
            assert(beforeFood - afterFood >= 16000);
        } catch {
            uint256 afterGold = getter.getCityGold(texasID);
            uint256 afterFood = getter.getCityFood(texasID);
            assertEq(afterGold, beforeGold);
            assertEq(afterFood, beforeFood);
        }
    }

    function getStates(uint256 cityId) public returns (uint256 gold, uint256 food) {
        return (getter.getCityGold(cityId), getter.getCityFood(cityId));
    }

    function upgradeResource(uint256 x, uint256 y) public {
        Position memory pos = Position({x: x, y: y});
        uint256 resId = getter.getResourceAtTile(pos);
        vm.startPrank(player2);
        uint256 level = getter.getResourceLevel(resId);
        game.upgradeResource(resId);
        assertEq(getter.getResourceLevel(resId), level + 1);
    }

    function _getMyGoldAmount() private returns (uint256) {
        uint256 goldInventoryID = GameLib.getInventory(GameLib.getPlayerCity(GameLib.getPlayer(player2)), gs().templates["Gold"]);
        uint256 goldBalance = ECSLib.getUint("Amount", goldInventoryID);
        return goldBalance;
    }

    function _spawnResource() private {
        vm.startPrank(deployer);
        admin.spawnResource(cornTilePos, "Food");
        admin.spawnBarbarian(barbarinaTilePos, 1);
        vm.stopPrank();
    }

    function _foundCity() private {
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
        assertEq(getter.getCityFood(texasID), 0);
        assertEq(getter.getCityGold(texasID), _generateWorldConstants().initCityGold);
    }

    function _assignResource() private {
        vm.startPrank(deployer);
        admin.assignResource(texasID, "Gold", 100000);
        admin.assignResource(texasID, "Food", 32000);
        vm.stopPrank();
    }
}
