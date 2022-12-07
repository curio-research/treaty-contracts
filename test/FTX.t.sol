//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {DiamondDeployTest} from "test/DiamondDeploy.t.sol";
import {FTX} from "contracts/treaties/FTX.sol";
import {console} from "forge-std/console.sol";

contract FTXTest is Test, DiamondDeployTest {
    function testFTX() public {
        // Start time
        uint256 time = block.timestamp + 500;
        vm.warp(time);

        // Deploy transfers gold to Player 1
        vm.prank(deployerAddress);
        admin.dripToken(address(nation1Wallet), "Gold", 8);

        // Player 2 (SBF) starts FTX and grants it access to his wallet
        vm.startPrank(player2Addr);
        FTX ftx = new FTX(diamond, address(nation2Wallet));
        nation2Wallet.executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(ftx), 10000));
        vm.stopPrank();
        assertEq(goldToken.balanceOf(address(nation2Wallet)), 0);

        // Player 1 deposits to FTX
        vm.startPrank(player1Addr);
        nation1Wallet.executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(ftx), 2));
        nation1Wallet.executeTx(address(ftx), abi.encodeWithSignature("deposit(uint256)", 2));
        assertEq(goldToken.checkBalanceOf(address(nation1Wallet)), 6);
        assertEq(ftx.fttToken().checkBalanceOf(address(nation1Wallet)), 2);
        assertEq(goldToken.checkBalanceOf(address(nation2Wallet)), 2);

        // Player 1 withdraws successfully
        nation1Wallet.executeTx(address(ftx), abi.encodeWithSignature("withdraw(uint256)", 1));
        assertEq(goldToken.checkBalanceOf(address(nation1Wallet)), 7);
        assertEq(ftx.fttToken().checkBalanceOf(address(nation1Wallet)), 1);
        assertEq(goldToken.checkBalanceOf(address(nation2Wallet)), 1);

        // Player 1 gives FTX all gold
        nation1Wallet.executeTx(address(goldToken), abi.encodeWithSignature("approve(address,uint256)", address(ftx), 7));
        nation1Wallet.executeTx(address(ftx), abi.encodeWithSignature("deposit(uint256)", 7));
        assertEq(goldToken.checkBalanceOf(address(nation1Wallet)), 0);
        assertEq(ftx.fttToken().checkBalanceOf(address(nation1Wallet)), 8);
        assertEq(goldToken.checkBalanceOf(address(nation2Wallet)), 8);
        vm.stopPrank();

        // Player 2 (SBF) transfers all but 1 gold to Player 3 (Caroline)
        vm.prank(player2Addr);
        nation2Wallet.executeTx(address(goldToken), abi.encodeWithSignature("transfer(address,uint256)", address(nation3Wallet), 7));
        assertEq(goldToken.checkBalanceOf(address(nation2Wallet)), 1);

        // Player 1 manages to withdraw only 1 gold from FTX
        vm.prank(player1Addr);
        nation1Wallet.executeTx(address(ftx), abi.encodeWithSignature("withdraw(uint256)", 8));
        assertEq(goldToken.checkBalanceOf(address(nation1Wallet)), 1);
        assertEq(goldToken.checkBalanceOf(address(nation2Wallet)), 0);

        // Player 2 (SBF) declares FTX bankrupt
        vm.prank(player2Addr);
        nation2Wallet.executeTx(address(ftx), abi.encodeWithSignature("run()"));
        assertTrue(ftx.isBankrupt());

        // Player 1 fails to withdraw rest of balance from FTX
        vm.prank(player1Addr);
        vm.expectRevert();
        nation1Wallet.executeTx(address(ftx), abi.encodeWithSignature("withdraw(uint256)", 7));
        assertEq(goldToken.checkBalanceOf(address(nation1Wallet)), 1);
    }
}
