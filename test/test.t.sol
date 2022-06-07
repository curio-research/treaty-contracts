//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import {BlockData, GameInfo, WorldConstants, Position, Item, Tower, Recipe, Tile, PlayerData} from "../contracts/libraries/Types.sol";
import {DiamondCutFacet} from "contracts/facets/DiamondCutFacet.sol";
import {Diamond} from "contracts/diamond.sol";
import {DiamondInit} from "contracts/upgradeInitializers/diamondInit.sol";
import {IDiamondCut} from "contracts/interfaces/IDiamondCut.sol";
import "../contracts/libraries/GameUtil.sol";

contract FoundryTest is Test {
    DiamondCutFacet diamondCutFacet;
    Diamond diamond;
    DiamondInit diamondInit;

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
        diamondCutFacet = new DiamondCutFacet();

        // deploy diamond
        // cast this to the curio type probably
        diamond = new Diamond(address(diamondCutFacet), deployer);

        // deploy diamond init
        diamondInit = new DiamondInit();

        address(asdf);
    }
}
