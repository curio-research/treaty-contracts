//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {PTest, console} from "pnm-contracts/PTest.sol";
import {LoanAgreement} from "contracts/treaties/LoanAgreement.sol";
import {CurioWallet} from "contracts/standards/CurioWallet.sol";
import {Position} from "contracts/libraries/Types.sol";
import {DiamondDeployTest} from "../DiamondDeploy.t.sol";

contract LoanAgreementTest is DiamondDeployTest, PTest {
    LoanAgreement public loanAgreement;

    address public agent;
    uint256 public agentID;
    uint256 public agentCapitalID;
    address public agentCapitalAddr;
    Position public agentPos = Position({x: 60, y: 20});

    function setUp() public override {
        super.setUp();

        vm.startPrank(player1);
        loanAgreement = LoanAgreement(game.deployTreaty(nation1ID, loanAgreementTemplate.name()));
        vm.stopPrank();

        agent = getAgent();
        vm.prank(agent);
        agentID = game.joinGame(agentPos, "Agent");
        agentCapitalID = getter.getCapital(agentID);
        agentCapitalAddr = getter.getAddress(agentCapitalID);

        vm.startPrank(deployer);
        admin.dripToken(nation1CapitalAddr, "Crystal", 1000);
        admin.dripToken(nation1CapitalAddr, "Food", 1000);

        admin.dripToken(agentCapitalAddr, "Crystal", 1000);
        admin.dripToken(agentCapitalAddr, "Food", 1000);
        vm.stopPrank();

        // Player1 approves tokens
        vm.startPrank(nation1CapitalAddr);
        crystalToken.approve(address(loanAgreement), 1000);
        foodToken.approve(address(loanAgreement), 1000);
        vm.stopPrank();

        // Agent approves tokens
        vm.startPrank(agentCapitalAddr);
        crystalToken.approve(address(loanAgreement), 1000);
        foodToken.approve(address(loanAgreement), 1000);
        vm.stopPrank();

        // When order is created, no tokens are transferred
        vm.startPrank(player1);
        loanAgreement.createLoan("Crystal", 500, "Food", 100, 50, 100);
        vm.stopPrank();
    }

    function invariantOverSell() public view {
        require(crystalToken.balanceOf(nation1CapitalAddr) >= 1000, "player 1 should not lose crystal");
        require(crystalToken.balanceOf(nation1CapitalAddr) <= 1500, "player 1 should not lose crystal");
        require(foodToken.balanceOf(nation1CapitalAddr) >= 900, "player 1 should not give more than 100 food");
        require(foodToken.balanceOf(nation1CapitalAddr) <= 1050, "player 1 should not get more than 50 food");
        require(crystalToken.balanceOf(agentCapitalAddr) >= 500, "agent should not lose than 500 crystal");
    }
}
