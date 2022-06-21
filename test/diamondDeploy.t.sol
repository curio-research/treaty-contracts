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

/// @title diamond deploy foundry template
/// @notice This contract sets up the diamond for testing and is inherited by other foundry test contracts.

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
    OwnershipFacet public ownership;

    uint256 public NULL = 0;
    address public NULL_ADDR = address(0);

    address public deployer = address(0);
    address public player1 = address(1);
    address public player2 = address(2);
    address public player3 = address(3);

    Position public player1Pos = Position({x: 6, y: 1});
    Position public player2Pos = Position({x: 6, y: 3});
    Position public player3Pos = Position({x: 5, y: 2});

    uint256 public initTroopNonce = 1;

    uint256 public armyTroopTypeId = indexToId(uint256(TROOP_NAME.ARMY));
    uint256 public troopTransportTroopTypeId = indexToId(uint256(TROOP_NAME.TROOP_TRANSPORT));
    uint256 public destroyerTroopTypeId = indexToId(uint256(TROOP_NAME.DESTROYER));

    // troop types
    TroopType public armyTroopType =
        TroopType({
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
    TroopType public troopTransportTroopType =
        TroopType({
            name: TROOP_NAME.TROOP_TRANSPORT,
            movesPerEpoch: 2,
            maxHealth: 3,
            damagePerHit: 1,
            attackFactor: 50,
            defenseFactor: 50,
            cargoCapacity: 6,
            epochsToProduce: 14,
            movementCooldown: 1, // FIXME
            attackCooldown: 1,
            isLandTroop: false
        });
    TroopType public destroyerTroopType =
        TroopType({
            name: TROOP_NAME.DESTROYER,
            movesPerEpoch: 3,
            maxHealth: 3,
            damagePerHit: 1,
            attackFactor: 100,
            defenseFactor: 100,
            cargoCapacity: 0,
            epochsToProduce: 20,
            movementCooldown: 1, // FIXME
            attackCooldown: 1,
            isLandTroop: false
        });
    TroopType public cruiserTroopType =
        TroopType({
            name: TROOP_NAME.CRUISER,
            movesPerEpoch: 2,
            maxHealth: 8,
            damagePerHit: 2,
            attackFactor: 100,
            defenseFactor: 100,
            cargoCapacity: 0,
            epochsToProduce: 30,
            movementCooldown: 1, // FIXME
            attackCooldown: 1,
            isLandTroop: false
        });
    TroopType public battleshipTroopType =
        TroopType({
            name: TROOP_NAME.BATTLESHIP,
            movesPerEpoch: 2,
            maxHealth: 12,
            damagePerHit: 3,
            attackFactor: 100,
            defenseFactor: 100,
            cargoCapacity: 0,
            epochsToProduce: 50,
            movementCooldown: 1, // FIXME
            attackCooldown: 1,
            isLandTroop: false
        });

    // we assume these two facet selectors do not change. If they do however, we should use getSelectors
    bytes4[] OWNERSHIP_SELECTORS = [bytes4(0xf2fde38b), 0x8da5cb5b];
    bytes4[] LOUPE_SELECTORS = [bytes4(0xcdffacc6), 0x52ef6b2c, 0xadfca15e, 0x7a0ed627, 0x01ffc9a7];

    function setUp() public {
        vm.startPrank(deployer);

        diamondCutFacet = new DiamondCutFacet();
        diamond = address(new Diamond(deployer, address(diamondCutFacet)));
        diamondInit = new DiamondInit();
        diamondLoupeFacet = new DiamondLoupeFacet();
        diamondOwnershipFacet = new OwnershipFacet();

        getterFacet = new GetterFacet();
        engineFacet = new EngineFacet();

        WorldConstants memory _worldConstants = _generateWorldConstants();
        TroopType[] memory _troopTypes = _generateTroopTypes();

        // fetch args from cli. craft payload for init deploy
        bytes memory initData = abi.encodeWithSelector(getSelectors("DiamondInit")[0], _worldConstants, _troopTypes);

        IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](4);
        cuts[0] = IDiamondCut.FacetCut({facetAddress: address(diamondLoupeFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: LOUPE_SELECTORS});
        cuts[1] = IDiamondCut.FacetCut({facetAddress: address(diamondOwnershipFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: OWNERSHIP_SELECTORS});
        cuts[2] = IDiamondCut.FacetCut({facetAddress: address(getterFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: getSelectors("GetterFacet")});
        cuts[3] = IDiamondCut.FacetCut({facetAddress: address(engineFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: getSelectors("EngineFacet")});

        IDiamondCut(diamond).diamondCut(cuts, address(diamondInit), initData);

        getter = GetterFacet(diamond);
        engine = EngineFacet(diamond);
        ownership = OwnershipFacet(diamond);

        // initialize map
        Position memory _startPos = Position({x: 0, y: 0});

        // uint256[][] memory _chunk = getTestMap();
        uint256[][] memory _chunk = generateMapChunk(_worldConstants.mapInterval);

        engine.setMapChunk(_startPos, _chunk);

        // initialize players
        // TODO: Upgrade logic such that everyone can initialize themselves. figure out if we want a whitelist or something

        engine.initializePlayer(player1Pos, player1);
        engine.initializePlayer(player2Pos, player2);
        engine.initializePlayer(player3Pos, player3);

        vm.stopPrank();
    }

    // FIXME: hardcoded
    function _generateWorldConstants() internal view returns (WorldConstants memory) {
        return
            WorldConstants({
                admin: deployer,
                worldWidth: 30,
                worldHeight: 20,
                numPorts: 15,
                numCities: 15, // yo
                mapInterval: 10,
                secondsPerEpoch: 10,
                combatEfficiency: 50
            });
    }

    // FIXME: hardcoded
    function _generateTroopTypes() internal view returns (TroopType[] memory) {
        TroopType[] memory _troopTypes = new TroopType[](5);
        _troopTypes[0] = armyTroopType;
        _troopTypes[1] = troopTransportTroopType;
        _troopTypes[2] = destroyerTroopType;
        _troopTypes[3] = cruiserTroopType;
        _troopTypes[4] = battleshipTroopType;
        return _troopTypes;
    }

    // FIXME: hardcoded
    function generateMapChunk(uint256 _interval) public pure returns (uint256[][] memory) {
        uint256[] memory _coastCol = new uint256[](_interval);
        uint256[] memory _landCol = new uint256[](_interval);
        uint256[] memory _waterCol = new uint256[](_interval);
        uint256[] memory _portCol = new uint256[](_interval);
        uint256[] memory _cityCol = new uint256[](_interval);

        for (uint256 j = 0; j < _interval; j++) {
            _coastCol[j] = 0;
            _landCol[j] = 1;
            _waterCol[j] = 2;
            _portCol[j] = 3;
            _cityCol[j] = 4;
        }

        uint256[][] memory _chunk = new uint256[][](_interval);
        _chunk[0] = _waterCol;
        _chunk[1] = _waterCol;
        _chunk[2] = _portCol;
        _chunk[3] = _landCol;
        _chunk[4] = _landCol;
        _chunk[5] = _cityCol;
        _chunk[6] = _portCol;
        _chunk[7] = _waterCol;
        _chunk[8] = _coastCol;
        _chunk[9] = _landCol;

        return _chunk;
    }

    // helper functions

    // generates values that need to be initialized from the cli and pipes it back into solidity! magic
    function getInitVal() public returns (WorldConstants memory _constants, TroopType[] memory _troopTypes) {
        string[] memory runJsInputs = new string[](4);
        runJsInputs[0] = "yarn";
        runJsInputs[1] = "--silent";
        runJsInputs[2] = "run";
        runJsInputs[3] = "getInitParams";

        bytes memory res = vm.ffi(runJsInputs);

        (_constants, _troopTypes) = abi.decode(res, (WorldConstants, TroopType[]));
    }

    function getSelectors(string memory _facetName) internal returns (bytes4[] memory selectors) {
        string[] memory cmd = new string[](5);
        cmd[0] = "yarn";
        cmd[1] = "--silent";
        cmd[2] = "run";
        cmd[3] = "getFuncSelectors";
        cmd[4] = _facetName;
        bytes memory res = vm.ffi(cmd);
        selectors = abi.decode(res, (bytes4[]));
    }

    // FIXME: change to 999
    function indexToId(uint256 _index) public pure returns (uint256) {
        return _index + 1;
    }
}
