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
import "forge-std/console.sol";
import "forge-std/StdJson.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";

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

    // we assume these two facet selectors do not change. If they do however, we should use _getSelectors
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
        WorldConstants memory worldConstants = _generateWorldConstants();

        nato = new NATO();

        // Fetch args from CLI craft payload for init deploy
        bytes memory initData = abi.encodeWithSelector(_getSelectors("DiamondInit")[0], worldConstants);

        IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](5);
        cuts[0] = IDiamondCut.FacetCut({facetAddress: address(diamondLoupeFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: LOUPE_SELECTORS});
        cuts[1] = IDiamondCut.FacetCut({facetAddress: address(diamondOwnershipFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: OWNERSHIP_SELECTORS});
        cuts[2] = IDiamondCut.FacetCut({facetAddress: address(gameFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: _getSelectors("GameFacet")});
        cuts[3] = IDiamondCut.FacetCut({facetAddress: address(getterFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: _getSelectors("GetterFacet")});
        cuts[4] = IDiamondCut.FacetCut({facetAddress: address(adminFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: _getSelectors("AdminFacet")});

        IDiamondCut(diamond).diamondCut(cuts, address(diamondInit), initData);

        getter = GetterFacet(diamond);
        game = GameFacet(diamond);
        admin = AdminFacet(diamond);
        ownership = OwnershipFacet(diamond);
        console.log(">>> Facets casted");

        // Register components
        admin.registerDefaultComponents(diamond);
        console.log(">>> Components registered");

        // Register constants
        _registerConstants();
        console.log(">>> Constants Added");

        // Initialize map
        uint256[][] memory _map = _generateMap(worldConstants.worldWidth, worldConstants.worldHeight);
        uint256[][] memory _encodedColumnBatches = _encodeTileMap(_map, worldConstants.numInitTerrainTypes, worldConstants.initBatchSize);
        admin.storeEncodedColumnBatches(_encodedColumnBatches);
        console.log(">>> Map initialized and encoded");

        vm.stopPrank();

        // Create templates & constants
        _createTemplates();
        console.log(">>> Templates created");

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
        console.log(">>> Players initialized, individual tests begin");
    }

    function _encodeTileMap(
        uint256[][] memory _tileMap,
        uint256 _numInitTerrainTypes,
        uint256 _batchSize
    ) private pure returns (uint256[][] memory) {
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

    // TEMP
    struct ConstantSpec {
        string componentName;
        string functionName;
        uint256 level;
        string object;
        string subject;
        uint256 value;
    }

    function _registerConstants() private {
        uint256 constantCount = 342; // FIXME: automate

        string memory root = vm.projectRoot();
        for (uint256 i = 0; i < constantCount; i++) {
            string memory path = string(abi.encodePacked(root, "/test/data/game_parameter_", Strings.toString(i), ".json"));
            bytes memory rawJson = vm.parseJson(vm.readFile(path));
            ConstantSpec memory spec = abi.decode(rawJson, (ConstantSpec));
            string memory identifier = string(abi.encodePacked(spec.subject, "-", spec.object, "-", spec.componentName, "-", spec.functionName, "-", Strings.toString(spec.level)));
            admin.addConstant(identifier, spec.value);
        }
    }

    function _createTemplates() private {
        // TODO: automate
        vm.startPrank(deployer);

        string[] memory templateNames = new string[](6);
        uint256[] memory templateIDs = new uint256[](6);
        uint256 index = 0;

        // Horseman
        string memory templateName = "Horseman";
        uint256 templateID = admin.addTroopTemplate(templateName, 120, 10, 1, 2, 60, 120, 95);
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;

        // Warrior
        templateName = "Warrior";
        templateID = admin.addTroopTemplate(templateName, 120, 2, 1, 2, 60, 120, 95);
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;

        // Slinger
        templateName = "Slinger";
        templateID = admin.addTroopTemplate(templateName, 120, 2, 1, 2, 60, 120, 95);
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;

        // Guard
        templateName = "Guard";
        templateID = admin.addTroopTemplate(templateName, 120, 0, 0, 0, 60, 120, 0);
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;

        // Gold
        templateName = "Gold";
        templateID = admin.addResourceTemplate(templateName);
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;

        // Food
        templateName = "Food";
        templateID = admin.addResourceTemplate(templateName);
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;

        // Register template names used for shortcuts
        admin.registerTemplateShortcuts(templateNames, templateIDs);

        vm.stopPrank();
    }

    // Note: hardcoded
    function _generateWorldConstants() private view returns (WorldConstants memory) {
        return
            WorldConstants({
                admin: deployer,
                tileWidth: 10, // DO NOT REMOVE THIS COMMENT
                worldWidth: 1000,
                worldHeight: 1000,
                numInitTerrainTypes: 6,
                initBatchSize: 50,
                maxCityCountPerPlayer: 3,
                maxArmyCountPerPlayer: 3,
                maxPlayerCount: 20,
                gameMode: GameMode.BATTLE_ROYALE,
                maxCityCenterLevel: 3,
                cityCenterLevelToEntityLevelRatio: 3,
                secondsToTrainAThousandTroops: 500
            });
    }

    // Note: hardcoded
    function _generateMap(uint256 _width, uint256 _height) private pure returns (uint256[][] memory) {
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
    // function getInitVal() private returns (WorldConstants memory _constants) {
    //     string[] memory runJsInputs = new string[](4);
    //     runJsInputs[0] = "yarn";
    //     runJsInputs[1] = "--silent";
    //     runJsInputs[2] = "run";
    //     runJsInputs[3] = "getInitParams";

    //     bytes memory res = vm.ffi(runJsInputs);

    //     _constants = abi.decode(res, (WorldConstants));
    // }

    function _getSelectors(string memory _facetName) private returns (bytes4[] memory selectors) {
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
