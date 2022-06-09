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
import "contracts/libraries/GameUtil.sol";
import "contracts/facets/GetterFacet.sol";
import "forge-std/console.sol";

// for some reason this file doesn't have syntax highlighting wtffff

contract DiamondDeployTest is Test {
    Diamond diamond;
    DiamondCutFacet diamondCutFacet;
    DiamondInit diamondInit;
    DiamondLoupeFacet diamondLoupeFacet;
    OwnershipFacet diamondOwnershipFacet;
    GetterFacet getterFacet;
    // GameUtil gameUtil;

    address internal deployer = address(1);

    constructor() {}

    // these two facet selectors do not change. If they do however, we should use getSelectors
    bytes4[] OWNERSHIP_SELECTORS = [bytes4(0xf2fde38b), 0x8da5cb5b];
    bytes4[] LOUPE_SELECTORS = [bytes4(0xcdffacc6), 0x52ef6b2c, 0xadfca15e, 0x7a0ed627, 0x01ffc9a7];

    uint256 initArg = uint256(12345);

    function setUp() public {
        diamondCutFacet = new DiamondCutFacet();

        diamond = new Diamond(deployer, address(diamondCutFacet));

        diamondInit = new DiamondInit();

        diamondLoupeFacet = new DiamondLoupeFacet();
        diamondOwnershipFacet = new OwnershipFacet();

        // gameUtil = new GameUtil();
        getterFacet = new GetterFacet();

        // fetch args from cli. craft payload for init deploy

        bytes memory initData = abi.encodeWithSelector(bytes4(0xb7b0422d), getInitVal());

        IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](3);
        cuts[0] = IDiamondCut.FacetCut({facetAddress: address(diamondLoupeFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: LOUPE_SELECTORS});
        cuts[1] = IDiamondCut.FacetCut({facetAddress: address(diamondOwnershipFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: OWNERSHIP_SELECTORS});
        cuts[2] = IDiamondCut.FacetCut({facetAddress: address(getterFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: getSelectors("GetterFacet")});

        vm.prank(deployer);
        IDiamondCut(address(diamond)).diamondCut(cuts, address(diamondInit), initData);
    }

    function testVal() public {
        uint256 val = GetterFacet(address(diamond))._getSample();
        assertEq(val, 12345);
    }

    // generates values that need to be initialized from the cli and pipes it back into solidity! magic
    function getInitVal() public returns (uint256) {
        string[] memory runJsInputs = new string[](4);
        runJsInputs[0] = "yarn";
        runJsInputs[1] = "--silent";
        runJsInputs[2] = "run";
        runJsInputs[3] = "sample";

        bytes memory jsResult = vm.ffi(runJsInputs);

        // abi.decode the jsResult here
        uint256 val = abi.decode(jsResult, (uint256));
        return val;
    }

    function getSelectors(string memory _facetName) internal returns (bytes4[] memory selectors) {
        string[] memory cmd = new string[](5);
        cmd[0] = "yarn";
        cmd[1] = "--silent";
        cmd[2] = "run";
        cmd[3] = "gen-selectors";
        cmd[4] = _facetName;
        bytes memory res = vm.ffi(cmd);
        selectors = abi.decode(res, (bytes4[]));
    }
}
