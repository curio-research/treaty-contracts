//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {DiamondDeployTest} from "test/DiamondDeploy.t.sol";
import {FTX} from "contracts/treaties/FTX.sol";
import {CurioWallet} from "contracts/CurioWallet.sol";
import {console} from "forge-std/console.sol";

contract FTXTest is Test, DiamondDeployTest {
    function testFTX() public {
        // Start time
        uint256 time = block.timestamp + 500;
        vm.warp(time);

        // Deploy transfers gold to Player 1
        vm.prank(deployer);
        admin.dripToken(nation1CapitalAddr, "Gold", 8);

        // Player 2 (SBF) starts FTX and grants it access to his wallet
        vm.startPrank(player2);
        FTX ftx = new FTX(diamond);
        CurioWallet(nation2CapitalAddr).executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(ftx), 10000));
        assertEq(goldToken.balanceOf(nation2CapitalAddr), 0);
        vm.stopPrank();

        // Deployer registers FTX treaty
        vm.startPrank(deployer);
        admin.addTreaty(address(ftx), ftx.name(), "placeholder ABI");
        vm.stopPrank();

        // Player 1 deposits to FTX
        vm.startPrank(player1);
        CurioWallet(nation1CapitalAddr).executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(ftx), 2));
        ftx.deposit(2);
        assertEq(goldToken.checkBalanceOf(nation1CapitalAddr), 6);
        assertEq(ftx.fttToken().checkBalanceOf(nation1CapitalAddr), 2);
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 2);

        // Player 1 withdraws successfully
        ftx.withdraw(1);
        assertEq(goldToken.checkBalanceOf(nation1CapitalAddr), 7);
        assertEq(ftx.fttToken().checkBalanceOf(nation1CapitalAddr), 1);
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 1);

        // Player 1 gives FTX all gold
        CurioWallet(nation1CapitalAddr).executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(ftx), 7));
        ftx.deposit(7);
        assertEq(goldToken.checkBalanceOf(nation1CapitalAddr), 0);
        assertEq(ftx.fttToken().checkBalanceOf(nation1CapitalAddr), 8);
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 8);
        vm.stopPrank();

        // Player 2 (SBF) transfers all but 1 gold to Player 3 (Caroline)
        vm.startPrank(player2);
        CurioWallet(nation2CapitalAddr).executeTx(address(goldToken), abi.encodeWithSignature("transfer(address,uint256)", nation3CapitalAddr, 7));
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 1);
        vm.stopPrank();

        // Player 1 manages to withdraw only 1 gold from FTX
        vm.prank(player1);
        ftx.withdraw(8);
        assertEq(goldToken.checkBalanceOf(nation1CapitalAddr), 1);
        assertEq(goldToken.checkBalanceOf(nation2CapitalAddr), 0);

        // Player 2 (SBF) declares FTX bankrupt
        vm.prank(player2);
        ftx.run();
        assertTrue(ftx.isBankrupt());

        // Player 1 fails to withdraw rest of balance from FTX
        vm.prank(player1);
        vm.expectRevert();
        ftx.withdraw(7);
        assertEq(goldToken.checkBalanceOf(nation1CapitalAddr), 1);
    }
}
