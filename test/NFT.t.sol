//SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import "../contracts/L2NFT.sol";

contract NftTest is Test {
    address admin1 = address(0x1);
    address admin2 = address(0x2);

    address user1 = address(0x3);
    address user2 = address(0x4);
    address user3 = address(0x4);
    address user4 = address(0x4);

    function testMintAdminAccess() public {
        // initialize nft contract
        vm.prank(admin1);
        L2NFT nft = new L2NFT();

        // give nft to user1
        vm.prank(admin1);
        nft.mint(user1, 1);

        // check for balankce
        assertEq(nft.balanceOf(user1), 1);

        // owner1 shouldn't be able to call mint
        vm.prank(admin2);
        vm.expectRevert();
        nft.transferFrom(user1, user2, 1);

        // add another admin
        vm.prank(admin1);
        nft.setAdminPermission(admin2);
        assertEq(nft.isAdmin(admin2), true);

        // give user 2 some NFTs
        vm.prank(admin2);
        nft.mint(user2, 10);
        assertEq(nft.balanceOf(user2), 10);
    }
}
