//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {PTest, console} from "pnm-contracts/PTest.sol";
import {SimpleOTC} from "contracts/treaties/SimpleOTC.sol";
import {CurioWallet} from "contracts/standards/CurioWallet.sol";
import {Position} from "contracts/libraries/Types.sol";
import {DiamondDeployTest} from "../DiamondDeploy.t.sol";

contract SimpleOTCTest is DiamondDeployTest, PTest {
    SimpleOTC public otc;

    address public agent;
    uint256 public agentID;
    uint256 public agentCapitalID;
    address public agentCapitalAddr;
    Position public agentPos = Position({x: 60, y: 20});

    function setUp() public override {
        super.setUp();

        vm.startPrank(player1);
        otc = SimpleOTC(game.deployTreaty(nation1ID, otcContractTemplate.name()));
        vm.stopPrank();

        agent = getAgent();
        vm.prank(agent);
        agentID = game.joinGame(agentPos, "Agent");
        agentCapitalID = getter.getCapital(agentID);
        agentCapitalAddr = getter.getAddress(agentCapitalID);

        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Gold", 1000);
        admin.dripToken(nation1CapitalAddr, "Food", 1000);

        admin.dripToken(agentCapitalAddr, "Gold", 1000);
        admin.dripToken(agentCapitalAddr, "Food", 1000);
        vm.stopPrank();

        // Player1 approves tokens
        vm.startPrank(nation1CapitalAddr);
        goldToken.approve(address(otc), 1000);
        foodToken.approve(address(otc), 1000);
        vm.stopPrank();

        // Agent approves tokens
        vm.startPrank(agentCapitalAddr);
        goldToken.approve(address(otc), 1000);
        foodToken.approve(address(otc), 1000);
        vm.stopPrank();

        // When order is created, no tokens are transferred
        vm.startPrank(player1);
        otc.createOrder("Gold", 2, "Food", 200);
        vm.stopPrank();
    }

    function invariantOverSell() public view {
        require(goldToken.balanceOf(nation1CapitalAddr) >= 1000 - 2, "player 1 sell more than 2 gold");
    }
}
