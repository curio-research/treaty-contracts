//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {DiamondDeployTest} from "test/DiamondDeploy.t.sol";
import {UselessFacet} from "contracts/facets/UselessFacet.sol";
import {IDiamondCut} from "contracts/interfaces/IDiamondCut.sol";
import {console} from "forge-std/console.sol";

contract SystemTest is Test, DiamondDeployTest {
    function testDiamondFacetUpgrade() public {
        // console.log("XX");
        // vm.expectRevert();
        // useless.uselessFunction();
        // console.log("YY");
        // vm.expectRevert();
        // useless.getAddressNonce();

        vm.startPrank(deployer);
        console.log("ZZ");
        IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](1);
        cuts[0] = IDiamondCut.FacetCut({facetAddress: address(uselessFacet), action: IDiamondCut.FacetCutAction.Replace, functionSelectors: _getSelectors("GameFacet")});
        console.log("AA");
        IDiamondCut(diamond).diamondCut(cuts, address(0), "");
        console.log("BB");
        useless = UselessFacet(address(diamond));
        console.log("CC");
        vm.stopPrank();

        useless.uselessFunction();
        console.log("DD");
        useless.getAddressNonce();
        console.log("EE");
        vm.startPrank(player1);
        vm.expectRevert();
        game.upgradeCapital(nation1ID);
        vm.stopPrank();
    }
}
