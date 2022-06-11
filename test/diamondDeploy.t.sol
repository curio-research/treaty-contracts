//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "contracts/facets/DiamondCutFacet.sol";
import "contracts/facets/DiamondLoupeFacet.sol";
import "contracts/facets/OwnershipFacet.sol";
import "contracts/diamond.sol";
import "contracts/upgradeInitializers/diamondInit.sol";
import "contracts/interfaces/IDiamondCut.sol";
import "contracts/libraries/GameUtil.sol";
import "contracts/facets/GetterFacet.sol";
import "contracts/facets/EngineFacet.sol";
import "contracts/libraries/Types.sol";

// This contract sets up the diamond for testing and is inherited by other foundry test contracts.
// In the future we can mimic different "fixtures" by extending upon this file.

contract DiamondDeployTest is Test {
    address public diamond;
    DiamondCutFacet public diamondCutFacet;
    DiamondInit public diamondInit;
    DiamondLoupeFacet public diamondLoupeFacet;
    OwnershipFacet public diamondOwnershipFacet;
    GetterFacet public getterFacet;
    EngineFacet public engineFacet;

    // diamond-contract-casted methods
    GetterFacet public getter;
    EngineFacet public engine;

    address public deployer = address(1);
    address public player1 = address(2);
    address public player2 = address(3);

    // we assume these two facet selectors do not change. If they do however, we should use getSelectors
    bytes4[] OWNERSHIP_SELECTORS = [bytes4(0xf2fde38b), 0x8da5cb5b];
    bytes4[] LOUPE_SELECTORS = [bytes4(0xcdffacc6), 0x52ef6b2c, 0xadfca15e, 0x7a0ed627, 0x01ffc9a7];

    function setUp() public {
        diamondCutFacet = new DiamondCutFacet();
        diamond = address(new Diamond(deployer, address(diamondCutFacet)));
        diamondInit = new DiamondInit();
        diamondLoupeFacet = new DiamondLoupeFacet();
        diamondOwnershipFacet = new OwnershipFacet();

        getterFacet = new GetterFacet();
        engineFacet = new EngineFacet();

        // init values
        WorldConstants memory _worldConstants = WorldConstants({
            admin: address(0),
            worldWidth: 100,
            worldHeight: 80,
            numPorts: 40,
            numCities: 40, // yes
            mapInterval: 10,
            secondsPerTurn: 6
        });
        TroopType memory _troopType = TroopType({
            name: TROOP_NAME.ARMY,
            movesPerEpoch: 1,
            maxHealth: 1,
            damagePerHit: 1, // yo
            attackFactor: 100,
            defenseFactor: 100,
            cargoCapacity: 0,
            epochsToProduce: 6,
            movementCooldown: 1,
            attackCooldown: 1,
            isLandTroop: true
        });

        bytes memory initData = abi.encodeWithSelector(bytes4(0x747b43cc), getVal1(), getVal2()); // fetch args from cli. craft payload for init deploy

        IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](4);
        cuts[0] = IDiamondCut.FacetCut({facetAddress: address(diamondLoupeFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: LOUPE_SELECTORS});
        cuts[1] = IDiamondCut.FacetCut({facetAddress: address(diamondOwnershipFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: OWNERSHIP_SELECTORS});
        cuts[2] = IDiamondCut.FacetCut({facetAddress: address(getterFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: getSelectors("GetterFacet")});
        cuts[3] = IDiamondCut.FacetCut({facetAddress: address(engineFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: getSelectors("EngineFacet")});

        vm.prank(deployer);
        IDiamondCut(diamond).diamondCut(cuts, address(diamondInit), initData);

        getter = GetterFacet(diamond);
        engine = EngineFacet(diamond);
    }

    // generates values that need to be initialized from the cli and pipes it back into solidity! magic
    function getInitVal() public returns (WorldConstants memory _constants, TroopType[] memory _troopTypes) {
        string[] memory runJsInputs = new string[](4);
        runJsInputs[0] = "yarn";
        runJsInputs[1] = "--silent";
        runJsInputs[2] = "run";
        runJsInputs[3] = "sample";

        bytes memory jsResult = vm.ffi(runJsInputs);

        // abi.decode the jsResult here
        (_constants, _troopTypes) = abi.decode(jsResult, (WorldConstants, TroopType[]));
    }

    function getVal1() public returns (WorldConstants memory _constants) {
        (_constants, ) = getInitVal();
    }

    function getVal2() public returns (TroopType[] memory _troopType) {
        (, _troopType) = getInitVal();
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
