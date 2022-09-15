//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "contracts/facets/DiamondCutFacet.sol";
import "contracts/facets/DiamondLoupeFacet.sol";
import "contracts/facets/OwnershipFacet.sol";
import "contracts/diamond.sol";
import "contracts/upgradeInitializers/diamondInit.sol";
import "contracts/interfaces/IDiamondCut.sol";
import "contracts/libraries/GameLib.sol";
import "contracts/facets/GetterFacet.sol";
import "contracts/facets/GameFacet.sol";
import "contracts/facets/AdminFacet.sol";
import "contracts/libraries/Types.sol";
import "contracts/NATO.sol";

/// @title diamond deploy foundry template
/// @notice This contract sets up the diamond for testing and is inherited by other foundry test contracts.

contract DiamondDeployTest is Test {
    address public diamond;
    DiamondCutFacet public diamondCutFacet;
    DiamondInit public diamondInit;
    DiamondLoupeFacet public diamondLoupeFacet;
    OwnershipFacet public diamondOwnershipFacet;
    GameFacet public gameFacet;
    GetterFacet public getterFacet;
    AdminFacet public adminFacet;

    // diamond-contract-casted methods
    GameFacet public game;
    GetterFacet public getter;
    AdminFacet public admin;
    OwnershipFacet public ownership;

    // treaties
    NATO public nato;

    uint256 public NULL = 0;
    address public NULL_ADDR = address(0);

    address public deployer = address(0);
    address public player1 = address(1);
    address public player2 = address(2);
    address public player3 = address(3);
    uint256 public player1Id;
    uint256 public player2Id;
    uint256 public player3Id;

    Position public player1Pos = Position({x: 6, y: 1});
    Position public player2Pos = Position({x: 6, y: 3});
    Position public player3Pos = Position({x: 5, y: 2});

    uint256 public destroyerTemplateId;

    // // troop types
    // uint256 public infantryTroopTypeId = 0;
    // uint256 public destroyerTroopTypeId = 1;
    // uint256 public battleshipTroopTypeId = 2;
    // TroopType public infantryTroopType =
    //     TroopType({
    //         name: TROOP_NAME.INFANTRY,
    //         maxHealth: 100,
    //         damagePerHit: 100,
    //         attackFactor: 100,
    //         defenseFactor: 100,
    //         movementCooldown: 1,
    //         largeActionCooldown: 1,
    //         goldPrice: 6,
    //         oilConsumptionPerSecond: 1 //
    //     });
    // TroopType public destroyerTroopType =
    //     TroopType({
    //         name: TROOP_NAME.DESTROYER,
    //         maxHealth: 300,
    //         damagePerHit: 100,
    //         attackFactor: 100,
    //         defenseFactor: 100,
    //         movementCooldown: 1,
    //         largeActionCooldown: 1,
    //         goldPrice: 20,
    //         oilConsumptionPerSecond: 1 //
    //     });
    // TroopType public cruiserTroopType =
    //     TroopType({
    //         name: TROOP_NAME.CRUISER,
    //         maxHealth: 800,
    //         damagePerHit: 200,
    //         attackFactor: 100,
    //         defenseFactor: 100,
    //         movementCooldown: 1,
    //         largeActionCooldown: 1,
    //         goldPrice: 30,
    //         oilConsumptionPerSecond: 1 //
    //     });
    // TroopType public battleshipTroopType =
    //     TroopType({
    //         name: TROOP_NAME.BATTLESHIP,
    //         maxHealth: 1200,
    //         damagePerHit: 300,
    //         attackFactor: 100,
    //         defenseFactor: 100,
    //         movementCooldown: 1,
    //         largeActionCooldown: 1,
    //         goldPrice: 50,
    //         oilConsumptionPerSecond: 2 //
    //     });

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

        gameFacet = new GameFacet();
        getterFacet = new GetterFacet();
        adminFacet = new AdminFacet();
        WorldConstants memory _worldConstants = _generateWorldConstants();

        nato = new NATO();

        // Fetch args from CLI craft payload for init deploy
        bytes memory initData = abi.encodeWithSelector(getSelectors("DiamondInit")[0], _worldConstants);

        IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](5);
        cuts[0] = IDiamondCut.FacetCut({facetAddress: address(diamondLoupeFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: LOUPE_SELECTORS});
        cuts[1] = IDiamondCut.FacetCut({facetAddress: address(diamondOwnershipFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: OWNERSHIP_SELECTORS});
        cuts[2] = IDiamondCut.FacetCut({facetAddress: address(gameFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: getSelectors("GameFacet")});
        cuts[3] = IDiamondCut.FacetCut({facetAddress: address(getterFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: getSelectors("GetterFacet")});
        cuts[4] = IDiamondCut.FacetCut({facetAddress: address(adminFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: getSelectors("AdminFacet")});

        IDiamondCut(diamond).diamondCut(cuts, address(diamondInit), initData);

        getter = GetterFacet(diamond);
        game = GameFacet(diamond);
        admin = AdminFacet(diamond);
        ownership = OwnershipFacet(diamond);

        // Register components
        admin.registerDefaultComponents(diamond);

        // Initialize map
        uint256[][] memory _map = _generateMap(_worldConstants.worldWidth, _worldConstants.worldHeight);
        uint256[][] memory _encodedColumnBatches = _encodeTileMap(_map, _worldConstants.numInitTerrainTypes, _worldConstants.initBatchSize);
        admin.storeEncodedColumnBatches(_encodedColumnBatches);

        vm.stopPrank();

        // Initialize players
        vm.prank(player1);
        game.initializePlayer(player1Pos, "Alice");
        player1Id = getter.getPlayerId(player1);
        vm.prank(player2);
        game.initializePlayer(player2Pos, "Bob");
        player2Id = getter.getPlayerId(player2);
        vm.prank(player3);
        game.initializePlayer(player3Pos, "Cindy");
        player3Id = getter.getPlayerId(player3);

        // // Initialize a troop template (destroyer)
        // vm.startPrank(deployer);
        // destroyerTemplateId = admin.addEntity();
        // admin.setComponentValue("CanMove", destroyerTemplateId, abi.encode(true));
        // admin.setComponentValue("CanAttack", destroyerTemplateId, abi.encode(true));
        // admin.setComponentValue("Tag", destroyerTemplateId, abi.encode("Destroyer"));
        // admin.setComponentValue("MaxHealth", destroyerTemplateId, abi.encode(3));
        // admin.setComponentValue("DamagePerHit", destroyerTemplateId, abi.encode(1));
        // admin.setComponentValue("AttackFactor", destroyerTemplateId, abi.encode(100));
        // admin.setComponentValue("DefenseFactor", destroyerTemplateId, abi.encode(100));
        // admin.setComponentValue("MovementCooldown", destroyerTemplateId, abi.encode(1));
        // admin.setComponentValue("LargeActionCooldown", destroyerTemplateId, abi.encode(1));
        // admin.setComponentValue("Gold", destroyerTemplateId, abi.encode(19));
        // admin.setComponentValue("OilPerSecond", destroyerTemplateId, abi.encode(1));
        // vm.stopPrank();
    }

    function _encodeTileMap(
        uint256[][] memory _tileMap,
        uint256 _numInitTerrainTypes,
        uint256 _batchSize
    ) internal pure returns (uint256[][] memory) {
        uint256[][] memory _result = new uint256[][](_tileMap.length);
        uint256 _numBatchPerCol = _tileMap[0].length / _batchSize;
        uint256 _lastBatchSize = _tileMap[0].length % _batchSize;

        uint256[] memory _encodedCol;
        uint256 _temp;
        uint256 k;

        for (uint256 x = 0; x < _tileMap.length; x++) {
            _encodedCol = new uint256[](_numBatchPerCol + 1);
            for (k = 0; k < _numBatchPerCol; k++) {
                _encodedCol[k] = 0;
                for (uint256 y = 0; y < _batchSize; y++) {
                    _temp = _encodedCol[k] + _tileMap[x][k * _batchSize + y] * _numInitTerrainTypes**y;
                    if (_temp < _encodedCol[k]) revert("Integer overflow");
                    _encodedCol[k] = _temp;
                }
            }
            if (_lastBatchSize > 0) {
                _encodedCol[k] = 0;
                for (uint256 y = 0; y < _lastBatchSize; y++) {
                    _temp = _encodedCol[k] + _tileMap[x][k * _batchSize + y] * _numInitTerrainTypes**y;
                    if (_temp < _encodedCol[k]) revert("Integer overflow");
                    _encodedCol[k] = _temp;
                }
                _encodedCol[k] = _temp;
            }
            _result[x] = _encodedCol;
        }

        return _result;
    }

    // Note: hardcoded
    function _generateWorldConstants() internal view returns (WorldConstants memory) {
        return
            WorldConstants({
                admin: deployer,
                worldWidth: 1000,
                worldHeight: 1000,
                numInitTerrainTypes: 1,
                initBatchSize: 100,
                maxCityCountPerPlayer: 3,
                maxArmyCountPerPlayer: 3,
                maxPlayerCount: 20,
                maxInventoryCapacity: 5000,
                cityUpgradeGoldCost: 500,
                initCityGold: 1000,
                cityHealth: 500,
                cityAttack: 50,
                cityDefense: 10 //
            });
    }

    // Note: hardcoded
    function _generateMap(uint256 _width, uint256 _height) public pure returns (uint256[][] memory) {
        uint256[] memory _plainCol = new uint256[](_height);

        // set individual columns
        for (uint256 y = 0; y < _height; y++) {
            _plainCol[y] = 0;
        }

        // set whole map
        uint256[][] memory _map = new uint256[][](_width);
        for (uint256 x = 0; x < _width; x += 1) {
            _map[x] = _plainCol;
        }

        return _map;
    }

    // // generates values that need to be initialized from the cli and pipes it back into solidity! magic
    // function getInitVal() public returns (WorldConstants memory _constants) {
    //     string[] memory runJsInputs = new string[](4);
    //     runJsInputs[0] = "yarn";
    //     runJsInputs[1] = "--silent";
    //     runJsInputs[2] = "run";
    //     runJsInputs[3] = "getInitParams";

    //     bytes memory res = vm.ffi(runJsInputs);

    //     _constants = abi.decode(res, (WorldConstants));
    // }

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
}
