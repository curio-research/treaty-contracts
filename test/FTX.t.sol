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

        // Deploy transfers gold to Nation 1
        vm.prank(deployerAddress);
        admin.dripToken(address(nationWallet1), "Gold", 8);

        // Nation 2 (SBF) starts FTX and grants it access to his wallet
        vm.startPrank(nation2Address);
        FTX ftx = new FTX(diamond, address(nationWallet2));
        nationWallet2.executeTx(address(goldContract), abi.encodeWithSignature("approve(address,uint256)", address(ftx), 10000));
        vm.stopPrank();
        assertEq(goldContract.balanceOf(address(nationWallet2)), 0);

        // Nation 1 deposits to FTX
        vm.startPrank(nation1Address);
        nationWallet1.executeTx(address(goldContract), abi.encodeWithSignature("approve(address,uint256)", address(ftx), 2));
        nationWallet1.executeTx(address(ftx), abi.encodeWithSignature("deposit(uint256)", 2));
        assertEq(goldContract.checkBalanceOf(address(nationWallet1)), 6);
        assertEq(ftx.fttToken().checkBalanceOf(address(nationWallet1)), 2);
        assertEq(goldContract.checkBalanceOf(address(nationWallet2)), 2);

        // Nation 1 withdraws successfully
        nationWallet1.executeTx(address(ftx), abi.encodeWithSignature("withdraw(uint256)", 1));
        assertEq(goldContract.checkBalanceOf(address(nationWallet1)), 7);
        assertEq(ftx.fttToken().checkBalanceOf(address(nationWallet1)), 1);
        assertEq(goldContract.checkBalanceOf(address(nationWallet2)), 1);

        // Nation 1 gives FTX all gold
        nationWallet1.executeTx(address(goldContract), abi.encodeWithSignature("approve(address,uint256)", address(ftx), 7));
        nationWallet1.executeTx(address(ftx), abi.encodeWithSignature("deposit(uint256)", 7));
        assertEq(goldContract.checkBalanceOf(address(nationWallet1)), 0);
        assertEq(ftx.fttToken().checkBalanceOf(address(nationWallet1)), 8);
        assertEq(goldContract.checkBalanceOf(address(nationWallet2)), 8);
        vm.stopPrank();

        // Nation 2 (SBF) transfers all but 1 gold to Nation 3 (Caroline)
        vm.prank(nation2Address);
        nationWallet2.executeTx(address(goldContract), abi.encodeWithSignature("transfer(address,uint256)", address(nationWallet3), 7));
        assertEq(goldContract.checkBalanceOf(address(nationWallet2)), 1);

        // Nation 1 manages to withdraw only 1 gold from FTX
        vm.prank(nation1Address);
        nationWallet1.executeTx(address(ftx), abi.encodeWithSignature("withdraw(uint256)", 8));
        assertEq(goldContract.checkBalanceOf(address(nationWallet1)), 1);
        assertEq(goldContract.checkBalanceOf(address(nationWallet2)), 0);

        // Nation 2 (SBF) declares FTX bankrupt
        vm.prank(nation2Address);
        nationWallet2.executeTx(address(ftx), abi.encodeWithSignature("run()"));
        assertTrue(ftx.isBankrupt());

        // Nation 1 fails to withdraw rest of balance from FTX
        vm.prank(nation1Address);
        vm.expectRevert();
        nationWallet1.executeTx(address(ftx), abi.encodeWithSignature("withdraw(uint256)", 7));
        assertEq(goldContract.checkBalanceOf(address(nationWallet1)), 1);
    }
}
