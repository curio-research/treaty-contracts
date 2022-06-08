//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import {BlockData, GameInfo, WorldConstants, Position, Item, Tower, Recipe, Tile, PlayerData} from "../contracts/libraries/Types.sol";
import {DiamondCutFacet} from "contracts/facets/DiamondCutFacet.sol";
import "contracts/facets/DiamondLoupeFacet.sol";
import "contracts/facets/OwnershipFacet.sol";
import {Diamond} from "contracts/diamond.sol";
import {DiamondInit} from "contracts/upgradeInitializers/diamondInit.sol";
import {IDiamondCut} from "contracts/interfaces/IDiamondCut.sol";
import "../contracts/libraries/GameUtil.sol";

// for some reason this file doesn't have hints
contract FoundryTest is Test {
    DiamondCutFacet diamondCutFacet;
    Diamond diamond;
    DiamondInit diamondInit;
    DiamondLoupeFacet diamondLoupeFacet;
    // DiamondOwnershipFacet diamondOwnershipFacet;

    address internal deployer = address(1);

    constructor() {}

    function testOne() public {
        require(1 == 1, "sample test");
    }

    //  require vs assert?
    // function testEncodePos() public {
    //     Position memory pos = Position({x: 0, y: 0});
    //     string memory encodedPos = GameUtils._encodePos(pos);
    //     // require(encodedPos === )
    // }

    function setUp() public {
        // diamond cut facet
        // diamondCutFacet = new DiamondCutFacet();
        // // deploy diamond
        // // cast this to the curio type probably
        // diamond = new Diamond(address(diamondCutFacet), deployer);
        // // deploy diamond init
        // diamondInit = new DiamondInit();
        // // deploy other facets
        // diamondLoupeFacet = new DiamondLoupeFacet();
        // diamondOwnershipFacet = new OwnershipFacet();
        // init with deploy args
        // bytes memory payload = abi.encodeWithSelector(bytes4(0x8c63feb4), fromHex(pubKey), address(0xD4151c984e6CF33E04FFAAF06c3374B2926Ecc64), address(erc20), address(0x27DF5C6dcd360f372e23d5e63645eC0072D0C098));
        //upgrade diamond with facets
        //GBM
        // FacetCut[] memory cut = new FacetCut[](3);
        // cut[0] = (FacetCut({facetAddress: address(gFacet), action: FacetCutAction.Add, functionSelectors: GBMSELECTORS}));
        // cut[1] = (FacetCut({facetAddress: address(dLoupe), action: FacetCutAction.Add, functionSelectors: LOUPE_SELECTORS}));
        // cut[2] = (FacetCut({facetAddress: address(ownerF), action: FacetCutAction.Add, functionSelectors: OWNERSHIP_SELECTORS}));
        // IDiamondCut(address(diamond)).diamondCut(cut, address(dInit), payload);
    }

    // function testHello() {}
}
