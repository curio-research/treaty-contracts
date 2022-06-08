//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import {BlockData, GameInfo, WorldConstants, Position, Item, Tower, Recipe, Tile, PlayerData} from "../contracts/libraries/Types.sol";
import {DiamondCutFacet} from "contracts/facets/DiamondCutFacet.sol";
import "contracts/facets/DiamondLoupeFacet.sol";
import "contracts/facets/OwnershipFacet.sol";
import "contracts/diamond.sol";
import {DiamondInit} from "contracts/upgradeInitializers/diamondInit.sol";
import "contracts/interfaces/IDiamondCut.sol";
import "../contracts/libraries/GameUtil.sol";
import "forge-std/console.sol";

// for some reason this file doesn't have syntax highlighting wtffff

contract DiamondTest is Test {
    DiamondCutFacet diamondCutFacet;
    Diamond diamond;
    DiamondInit diamondInit;
    DiamondLoupeFacet diamondLoupeFacet;
    OwnershipFacet diamondOwnershipFacet;

    address internal deployer = address(1);

    constructor() {}

    // facet selectors
    bytes4[] OWNERSHIP_SELECTORS = [bytes4(0xf2fde38b), 0x8da5cb5b];
    bytes4[] LOUPE_SELECTORS = [bytes4(0xcdffacc6), 0x52ef6b2c, 0xadfca15e, 0x7a0ed627, 0x01ffc9a7];

    function setUp() public {
        // diamond cut facet
        diamondCutFacet = new DiamondCutFacet();
        // deploy diamond
        // cast this to the curio type probably
        diamond = new Diamond(address(diamondCutFacet), deployer);
        // deploy diamond init
        // diamondInit = new DiamondInit();
        // deploy other facets
        // diamondLoupeFacet = new DiamondLoupeFacet();
        // diamondOwnershipFacet = new OwnershipFacet();

        // fetch args from cli
        // craft payload for init deploy
        // bytes memory payload = abi.encodeWithSelector(bytes4(0x8c63feb4), uint256(1));
        // bytes memory payload;

        // init with deploy args
        // upgrade diamond with facets
        // GBM
        // FacetCut[] memory cuts = new FacetCut[](1);
        // cut[0] = (FacetCut({facetAddress: address(gFacet), action: FacetCutAction.Add, functionSelectors: GBMSELECTORS}));

        // cuts[1] = (FacetCut({facetAddress: address(diamondLoupeFacet), action: FacetCutAction.Add, functionSelectors: LOUPE_SELECTORS}));
        // cut[2] = (FacetCut({facetAddress: address(diamondOwnershipFacet), action: FacetCutAction.Add, functionSelectors: OWNERSHIP_SELECTORS}));

        // IDiamondCut(address(diamond)).diamondCut(cut, address(diamondInit), payload);
    }

    function testFfi() public {
        string[] memory runJsInputs = new string[](4);
        runJsInputs[0] = "yarn";
        runJsInputs[1] = "--silent";
        runJsInputs[2] = "run";
        runJsInputs[3] = "sample";

        bytes memory jsResult = vm.ffi(runJsInputs);

        // abi.decode the jsResult here
        (Position memory pos, string memory str) = abi.decode(jsResult, (Position, string));

        console.log(pos.x, str);
    }

    // here to override IDiamondCut
    // function diamondCut(
    //     FacetCut[] calldata _diamondCut,
    //     address _init,
    //     bytes calldata _calldata
    // ) external override {}
}
