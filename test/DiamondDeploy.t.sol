//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "contracts/facets/DiamondCutFacet.sol";
import "contracts/facets/DiamondLoupeFacet.sol";
import "contracts/facets/OwnershipFacet.sol";
import "contracts/Diamond.sol";
import "contracts/upgradeInitializers/DiamondInit.sol";
import "contracts/interfaces/IDiamondCut.sol";
import "contracts/libraries/GameLib.sol";
import "contracts/facets/GetterFacet.sol";
import "contracts/facets/GameFacet.sol";
import "contracts/facets/AdminFacet.sol";
import "contracts/libraries/Types.sol";
import "contracts/NATO.sol";
import "forge-std/console.sol";

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

    Position public player1Pos = Position({x: 60, y: 10});
    Position public player2Pos = Position({x: 60, y: 30});
    Position public player3Pos = Position({x: 50, y: 20});

    uint256 public destroyerTemplateId;

    uint256 public cavalryTemplateID;
    uint256 public infantryTemplateID;
    uint256 public archerTemplateID;
    uint256 public guardTemplateID;
    uint256 public goldTemplateID;
    uint256 public foodTemplateID;

    // we assume these two facet selectors do not change. If they do however, we should use getSelectors
    bytes4[] OWNERSHIP_SELECTORS = [bytes4(0xf2fde38b), 0x8da5cb5b];
    bytes4[] LOUPE_SELECTORS = [bytes4(0xcdffacc6), 0x52ef6b2c, 0xadfca15e, 0x7a0ed627, 0x01ffc9a7];

    function setUp() public virtual {
        vm.startPrank(deployer);

        diamondCutFacet = new DiamondCutFacet();
        diamond = address(new Diamond(deployer, address(diamondCutFacet)));
        diamondInit = new DiamondInit();
        diamondLoupeFacet = new DiamondLoupeFacet();
        diamondOwnershipFacet = new OwnershipFacet();

        gameFacet = new GameFacet();
        getterFacet = new GetterFacet();
        adminFacet = new AdminFacet();
        WorldConstants memory worldConstants = _generateWorldConstants();

        nato = new NATO();

        // Fetch args from CLI craft payload for init deploy
        bytes memory initData = abi.encodeWithSelector(getSelectors("DiamondInit")[0], worldConstants);

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
        uint256[][] memory _map = _generateMap(worldConstants.worldWidth, worldConstants.worldHeight);
        uint256[][] memory _encodedColumnBatches = _encodeTileMap(_map, worldConstants.numInitTerrainTypes, worldConstants.initBatchSize);
        admin.storeEncodedColumnBatches(_encodedColumnBatches);

        vm.stopPrank();

        // Create templates
        _createTemplates();

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

    function _createTemplates() private {
        vm.startPrank(deployer);

        // Troop: Cavalry
        cavalryTemplateID = admin.addEntity();
        admin.setComponentValue("Tag", cavalryTemplateID, abi.encode("TroopTemplate"));
        admin.setComponentValue("InventoryType", cavalryTemplateID, abi.encode("Cavalry"));
        admin.setComponentValue("Health", cavalryTemplateID, abi.encode(120));
        admin.setComponentValue("Speed", cavalryTemplateID, abi.encode(5));
        admin.setComponentValue("Attack", cavalryTemplateID, abi.encode(60));
        admin.setComponentValue("Defense", cavalryTemplateID, abi.encode(120));
        admin.setComponentValue("Load", cavalryTemplateID, abi.encode(1));
        admin.setComponentValue("Duration", cavalryTemplateID, abi.encode(1));
        admin.setComponentValue("Cost", cavalryTemplateID, abi.encode(1));
        admin.setComponentValue("MoveCooldown", cavalryTemplateID, abi.encode(1));
        admin.setComponentValue("BattleCooldown", cavalryTemplateID, abi.encode(2));

        // Troop: Infantry
        infantryTemplateID = admin.addEntity();
        admin.setComponentValue("Tag", infantryTemplateID, abi.encode("TroopTemplate"));
        admin.setComponentValue("InventoryType", infantryTemplateID, abi.encode("Infantry"));
        admin.setComponentValue("Health", infantryTemplateID, abi.encode(120));
        admin.setComponentValue("Speed", infantryTemplateID, abi.encode(5));
        admin.setComponentValue("Attack", infantryTemplateID, abi.encode(60));
        admin.setComponentValue("Defense", infantryTemplateID, abi.encode(120));
        admin.setComponentValue("Load", infantryTemplateID, abi.encode(1));
        admin.setComponentValue("Duration", infantryTemplateID, abi.encode(1));
        admin.setComponentValue("Cost", infantryTemplateID, abi.encode(1));
        admin.setComponentValue("MoveCooldown", infantryTemplateID, abi.encode(1));
        admin.setComponentValue("BattleCooldown", infantryTemplateID, abi.encode(2));

        // Troop: Archer
        archerTemplateID = admin.addEntity();
        admin.setComponentValue("Tag", archerTemplateID, abi.encode("TroopTemplate"));
        admin.setComponentValue("InventoryType", archerTemplateID, abi.encode("Archer"));
        admin.setComponentValue("Health", archerTemplateID, abi.encode(120));
        admin.setComponentValue("Speed", archerTemplateID, abi.encode(5));
        admin.setComponentValue("Attack", archerTemplateID, abi.encode(60));
        admin.setComponentValue("Defense", archerTemplateID, abi.encode(120));
        admin.setComponentValue("Load", archerTemplateID, abi.encode(1));
        admin.setComponentValue("Duration", archerTemplateID, abi.encode(1));
        admin.setComponentValue("Cost", archerTemplateID, abi.encode(1));
        admin.setComponentValue("MoveCooldown", archerTemplateID, abi.encode(1));
        admin.setComponentValue("BattleCooldown", archerTemplateID, abi.encode(2));

        // Troop: Guard
        guardTemplateID = admin.addEntity();
        admin.setComponentValue("Tag", guardTemplateID, abi.encode("TroopTemplate"));
        admin.setComponentValue("InventoryType", guardTemplateID, abi.encode("Guard"));
        admin.setComponentValue("Health", guardTemplateID, abi.encode(120));
        admin.setComponentValue("Attack", guardTemplateID, abi.encode(60));
        admin.setComponentValue("Defense", guardTemplateID, abi.encode(120));

        // Resource: Gold
        goldTemplateID = admin.addEntity();
        admin.setComponentValue("Tag", goldTemplateID, abi.encode("ResourceTemplate"));
        admin.setComponentValue("InventoryType", goldTemplateID, abi.encode("Gold"));
        admin.setComponentValue("Duration", goldTemplateID, abi.encode(1));

        // Resource: Food
        foodTemplateID = admin.addEntity();
        admin.setComponentValue("Tag", foodTemplateID, abi.encode("ResourceTemplate"));
        admin.setComponentValue("InventoryType", foodTemplateID, abi.encode("Food"));
        admin.setComponentValue("Duration", foodTemplateID, abi.encode(1));

        // Register template shortcuts
        string[] memory templateNames = new string[](6);
        uint256[] memory templateIDs = new uint256[](6);
        templateNames[0] = "Cavalry";
        templateNames[1] = "Infantry";
        templateNames[2] = "Archer";
        templateNames[3] = "Guard";
        templateNames[4] = "Gold";
        templateNames[5] = "Food";
        templateIDs[0] = cavalryTemplateID;
        templateIDs[1] = infantryTemplateID;
        templateIDs[2] = archerTemplateID;
        templateIDs[3] = guardTemplateID;
        templateIDs[4] = goldTemplateID;
        templateIDs[5] = foodTemplateID;
        admin.registerTemplateShortcuts(templateNames, templateIDs);

        vm.stopPrank();
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
                tileUpgradeGoldCost: 150,
                buildingUpgradeGoldCost: 3000,
                cityUpgradeGoldCost: 3000,
                cityPackCost: 30,
                initCityCenterGoldLoad: 500000,
                initCityCenterFoodLoad: 500000,
                initCityCenterTroopLoad: 1000,
                initCityGold: 2000,
                tileWidth: 10,
                tileGuardAmount: 1000,
                cityGuardAmount: 1000, // DO NOT REMOVE THIS COMMENT
                barbarianCooldown: 3000
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
