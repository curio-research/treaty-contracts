//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";
import {Component} from "contracts/Component.sol";
import {Set} from "contracts/Set.sol";

contract TreatyTest is Test, DiamondDeployTest {
    function testtreatyBasics() public {
        vm.startPrank(player1);
        game.joinTreaty(address(nato));

        _player1Building = _getCityAt(player1Pos);
        _cavalryTemplateId = getter.getTemplateId("Calvary")

        game.startProduction(_player1Building, )

        game.denounceTreaty(address(nato));
        vm.stopPrank();
    }

}
