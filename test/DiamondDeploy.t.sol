//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {DiamondCutFacet} from "contracts/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "contracts/facets/DiamondLoupeFacet.sol";
import {OwnershipFacet} from "contracts/facets/OwnershipFacet.sol";
import {Diamond} from "contracts/Diamond.sol";
import {DiamondInit} from "contracts/upgradeInitializers/DiamondInit.sol";
import {IDiamondCut} from "contracts/interfaces/IDiamondCut.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";
import {AdminFacet} from "contracts/facets/AdminFacet.sol";
import {Strings} from "openzeppelin-contracts/contracts/utils/Strings.sol";
import {ComponentSpec, GameMode, GameParamSpec, Position, WorldConstants} from "contracts/libraries/Types.sol";
import {Alliance} from "contracts/treaties/Alliance.sol";
import {FTX} from "contracts/treaties/FTX.sol";
import {NATO} from "contracts/treaties/NATO.sol";
import {TestTreaty} from "contracts/treaties/TestTreaty.sol";
import {NonAggressionPact} from "contracts/treaties/NonAggressionPact.sol";
import {EconSanction} from "contracts/treaties/EconSanction.sol";
import {CollectiveDefenseFund} from "contracts/treaties/CDFund.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {console} from "forge-std/console.sol";
import {stdJson} from "forge-std/StdJson.sol";

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

    // Diamond facets
    GameFacet public game;
    GetterFacet public getter;
    AdminFacet public admin;
    OwnershipFacet public ownership;

    // Treaties
    Alliance public allianceTemplate;
    FTX public ftxTemplate;
    NATO public natoTemplate;
    TestTreaty public testTreatyTemplate;
    CollectiveDefenseFund public CDFundTemplate;
    EconSanction public econSanctionTemplate;
    NonAggressionPact public NAPactTemplate;

    uint256 public allianceTemplateID;
    uint256 public ftxTemplateID;
    uint256 public natoTemplateID;
    uint256 public testTreatyTemplateID;
    uint256 public CDFundTemplateID;
    uint256 public econSanctionTemplateID;
    uint256 public NAPactTemplateID;


    // Players (nations)
    address public deployer = address(0);
    address public player1 = address(1);
    address public player2 = address(2);
    address public player3 = address(3);
    uint256 public nation1ID;
    uint256 public nation2ID;
    uint256 public nation3ID;

    // Capitals
    uint256 public nation1CapitalID;
    uint256 public nation2CapitalID;
    uint256 public nation3CapitalID;
    address public nation1CapitalAddr;
    address public nation2CapitalAddr;
    address public nation3CapitalAddr;

    // Tokens
    uint256 public foodTemplateID;
    uint256 public goldTemplateID;
    uint256 public horsemanTemplateID;
    uint256 public warriorTemplateID;
    uint256 public slingerTemplateID;
    uint256 public guardTemplateID;
    CurioERC20 public foodToken;
    CurioERC20 public goldToken;
    CurioERC20 public horsemanToken;
    CurioERC20 public warriorToken;
    CurioERC20 public slingerToken;
    CurioERC20 public guardToken;

    uint256 public NULL = 0;
    address public NULL_ADDR = address(0);

    Position public nation1Pos = Position({x: 60, y: 10});
    Position public nation2Pos = Position({x: 60, y: 30});
    Position public nation3Pos = Position({x: 50, y: 20});
    Position public barbarinaTilePos = Position({x: 60, y: 50});

    WorldConstants public worldConstants;

    // we assume these two facet selectors do not change. If they do however, we should use _getSelectors
    bytes4[] OWNERSHIP_SELECTORS = [bytes4(0xf2fde38b), 0x8da5cb5b];
    bytes4[] LOUPE_SELECTORS = [bytes4(0xcdffacc6), 0x52ef6b2c, 0xadfca15e, 0x7a0ed627, 0x01ffc9a7];

    function setUp() public {
        vm.startPrank(deployer);
        console.log("==================== SETUP BEGINS =====================");

        // Initialize diamond facets
        diamondCutFacet = new DiamondCutFacet();
        diamond = address(new Diamond(deployer, address(diamondCutFacet)));
        diamondInit = new DiamondInit();
        diamondLoupeFacet = new DiamondLoupeFacet();
        diamondOwnershipFacet = new OwnershipFacet();
        gameFacet = new GameFacet();
        getterFacet = new GetterFacet();
        adminFacet = new AdminFacet();

        // Prepare world constants with either `_generateNewWorldConstants()` or `fetchWorldConstants()`
        worldConstants = _fetchWorldConstants();
        console.log(">>> World constants ready");
        
        // Fetch args from CLI craft payload for init deploy
        {
            bytes memory initData = abi.encodeWithSelector(_getSelectors("DiamondInit")[0], worldConstants);
            IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](5);
            cuts[0] = IDiamondCut.FacetCut({facetAddress: address(diamondLoupeFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: LOUPE_SELECTORS});
            cuts[1] = IDiamondCut.FacetCut({facetAddress: address(diamondOwnershipFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: OWNERSHIP_SELECTORS});
            cuts[2] = IDiamondCut.FacetCut({facetAddress: address(gameFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: _getSelectors("GameFacet")});
            cuts[3] = IDiamondCut.FacetCut({facetAddress: address(getterFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: _getSelectors("GetterFacet")});
            cuts[4] = IDiamondCut.FacetCut({facetAddress: address(adminFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: _getSelectors("AdminFacet")});
            IDiamondCut(diamond).diamondCut(cuts, address(diamondInit), initData);
            console.log(">>> Diamond initialized");
        }

        // Assign diamond functions to corresponding facets
        getter = GetterFacet(diamond);
        game = GameFacet(diamond);
        admin = AdminFacet(diamond);
        ownership = OwnershipFacet(diamond);
        console.log(">>> Facets casted");

        // Register function names
        _registerFunctionNames();
        console.log(">>> Function names registered");

        // Register components
        _registerComponents();
        console.log(">>> Components registered");

        // Register parameters
        _registerGameParameters();
        console.log(">>> Game parameters registered");

        // Deploy and authorize token contracts
        goldToken = new CurioERC20("Gold", "GOLD", 0, address(diamond));
        foodToken = new CurioERC20("Food", "FOOD", 0, address(diamond));
        horsemanToken = new CurioERC20("Horseman", "HORSEMAN", 0, address(diamond));
        warriorToken = new CurioERC20("Warrior", "WARRIOR", 0, address(diamond));
        slingerToken = new CurioERC20("Slinger", "SLINGER", 0, address(diamond));
        guardToken = new CurioERC20("Guard", "GUARD", 0, address(diamond));
        admin.addAuthorized(address(goldToken));
        admin.addAuthorized(address(foodToken));
        admin.addAuthorized(address(horsemanToken));
        admin.addAuthorized(address(warriorToken));
        admin.addAuthorized(address(slingerToken));
        admin.addAuthorized(address(guardToken));
        console.log(">>> Token contracts deployed");

        // Create templates
        _createTemplates();
        console.log(">>> Templates created");

        // Initialize map either with either `_generateNewMap()` or `_fetchLastDeployedMap()`
        // Note: if fetching deployed map, check for map size
        {
            uint256[][] memory map = _generateNewMap(worldConstants.worldWidth, worldConstants.worldHeight);
            uint256[][] memory encodedColumnBatches = _encodeTileMap(map, worldConstants.numInitTerrainTypes, 200 / worldConstants.numInitTerrainTypes);
            admin.storeEncodedColumnBatches(encodedColumnBatches);
            _initializeMap();
            console.log(">>> Map initialized and encoded");
        }

        // Initialize treaties
        allianceTemplate = new Alliance(diamond);
        allianceTemplateID = admin.registerTreatyTemplate(address(allianceTemplate), "sample ABI");
        ftxTemplate = new FTX(diamond, address(this));
        ftxTemplateID = admin.registerTreatyTemplate(address(ftxTemplate), "sample ABI");
        natoTemplate = new NATO(diamond);
        natoTemplateID = admin.registerTreatyTemplate(address(natoTemplate), "sample ABI");
        testTreatyTemplate = new TestTreaty(diamond);
        testTreatyTemplateID = admin.registerTreatyTemplate(address(testTreatyTemplate), "sample ABI");

        CDFundTemplate = new CollectiveDefenseFund(diamond, 100, 100, 86400, 86400, 50, 50);
        CDFundTemplateID = admin.registerTreatyTemplate(address(CDFundTemplate), "sample ABI");
        econSanctionTemplate = new EconSanction(diamond);
        econSanctionTemplateID = admin.registerTreatyTemplate(address(econSanctionTemplate), "sample ABI");
        NAPactTemplate = new NonAggressionPact(diamond);
        NAPactTemplateID = admin.registerTreatyTemplate(address(NAPactTemplate), "sample ABI");

        console.log(">>> Treaties initialized");

        vm.stopPrank();

        // Initialize players
        vm.prank(player1);
        nation1ID = game.initializeNation(nation1Pos, "Nation 1");
        nation1CapitalID = getter.getCapital(nation1ID);
        nation1CapitalAddr = getter.getAddress(nation1CapitalID);
        vm.prank(player2);
        nation2ID = game.initializeNation(nation2Pos, "Nation 2");
        nation2CapitalID = getter.getCapital(nation2ID);
        nation2CapitalAddr = getter.getAddress(nation2CapitalID);
        vm.prank(player3);
        nation3ID = game.initializeNation(nation3Pos, "Nation 3");
        nation3CapitalID = getter.getCapital(nation3ID);
        nation3CapitalAddr = getter.getAddress(nation3CapitalID);
        console.log(">>> Nations initialized");
        
        console.log("=============== INDIVIDUAL TESTS BEGIN ================");
    }

    function _initializeMap() private {
        for (uint256 i = 0; i < worldConstants.worldWidth / worldConstants.tileWidth; i++) {
            for (uint256 j = 0; j < worldConstants.worldHeight / worldConstants.tileWidth; j++) {
                admin.adminInitializeTile(Position({x: i * worldConstants.tileWidth, y: j * worldConstants.tileWidth}));
            }
        }
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

    function _registerFunctionNames() private {
        string[] memory gameFunctionNames = new string[](21);
        gameFunctionNames[0] = "InitializeNation";
        gameFunctionNames[1] = "UpgradeCapital";
        gameFunctionNames[2] = "MoveCapital";
        gameFunctionNames[3] = "ClaimTile";
        gameFunctionNames[4] = "UpgradeTile";
        gameFunctionNames[5] = "RecoverTile";
        gameFunctionNames[6] = "DisownTile";
        gameFunctionNames[7] = "StartTroopProduction";
        gameFunctionNames[8] = "EndTroopProduction";
        gameFunctionNames[9] = "Move";
        gameFunctionNames[10] = "OrganizeArmy";
        gameFunctionNames[11] = "DisbandArmy";
        gameFunctionNames[12] = "StartGather";
        gameFunctionNames[13] = "EndGather";
        gameFunctionNames[14] = "UnloadResources";
        gameFunctionNames[15] = "HarvestResource";
        gameFunctionNames[16] = "HarvestResourcesFromCapital";
        gameFunctionNames[17] = "UpgradeResource";
        gameFunctionNames[18] = "Battle";
        gameFunctionNames[19] = "DelegateGameFunction";
        gameFunctionNames[20] = "DeployTreaty";
        admin.registerFunctionNames(gameFunctionNames);
    }

    function _registerComponents() private {
        ComponentSpec[] memory temp = new ComponentSpec[](100000);
        string memory root = vm.projectRoot();
        uint256 index = 0;

        while (true) {
            string memory path = string(abi.encodePacked(root, "/test/data/component_", Strings.toString(index), ".json"));
            try vm.readFile(path) {
                bytes memory rawJson = vm.parseJson(vm.readFile(path));
                temp[index] = abi.decode(rawJson, (ComponentSpec));
                index++;
            } catch {
                // End of components
                break;
            }
        }

        // Copy values to array of known length
        ComponentSpec[] memory specs = new ComponentSpec[](index);
        for (uint256 i = 0; i < index; i++) {
            specs[i] = temp[i];
        }
        admin.registerComponents(diamond, specs);
    }

    function _registerGameParameters() private {
        string memory root = vm.projectRoot();
        uint256 index = 0;

        while (true) {
            string memory path = string(abi.encodePacked(root, "/test/data/game_parameter_", Strings.toString(index), ".json"));
            try vm.readFile(path) {
                bytes memory rawJson = vm.parseJson(vm.readFile(path));
                GameParamSpec memory spec = abi.decode(rawJson, (GameParamSpec));
                string memory identifier = string(abi.encodePacked(spec.subject, "-", spec.object, "-", spec.componentName, "-", spec.functionName, "-", Strings.toString(spec.level)));
                admin.addGameParameter(identifier, spec.value);
                index++;
            } catch {
                // End of parameters
                break;
            }
        }
    }

    function _createTemplates() private {
        // TODO: automate
        string[] memory templateNames = new string[](6);
        uint256[] memory templateIDs = new uint256[](6);
        uint256 index = 0;

        // Horseman
        string memory templateName = "Horseman";
        uint256 templateID = admin.addTroopTemplate(120, 60, 120, 95, address(horsemanToken));
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;
        horsemanTemplateID = templateID;

        // Warrior
        templateName = "Warrior";
        templateID = admin.addTroopTemplate(120, 60, 120, 95, address(warriorToken));
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;
        warriorTemplateID = templateID;

        // Slinger
        templateName = "Slinger";
        templateID = admin.addTroopTemplate(120, 60, 120, 95, address(slingerToken));
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;
        slingerTemplateID = templateID;

        // Guard
        templateName = "Guard";
        templateID = admin.addTroopTemplate(120, 60, 120, 0, address(guardToken));
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;
        guardTemplateID = templateID;

        // Gold
        templateName = "Gold";
        templateID = admin.addResourceTemplate(address(goldToken));
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;
        goldTemplateID = templateID;

        // Food
        templateName = "Food";
        templateID = admin.addResourceTemplate(address(foodToken));
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;
        foodTemplateID = templateID;

        // Register template names used for shortcuts
        admin.registerTemplateShortcuts(templateNames, templateIDs);
    }

    /// @dev First way to get world constants: fetch them from data, identical with deployment
    function _fetchWorldConstants() private returns (WorldConstants memory) {
        bytes memory rawJson;
        {
            string memory root = vm.projectRoot();
            string memory path = string(abi.encodePacked(root, "/test/data/world_constants.json"));
            rawJson = vm.parseJson(vm.readFile(path));
        }

        worldConstants = abi.decode(rawJson, (WorldConstants));
        worldConstants.admin = deployer;
        return worldConstants;
    }

    /// @dev Second way to get world constants: initialize the world in a unique new state
    function _generateNewWorldConstants() private returns (WorldConstants memory) {
        worldConstants =
            WorldConstants({
                admin: deployer, // DO NOT REMOVE THIS COMMENT
                capitalLevelToEntityLevelRatio: 3,
                gameLengthInSeconds: 3600,
                gameMode: GameMode.REGULAR,
                maxArmyCountPerNation: 2,
                maxCapitalLevel: 3,
                maxNationCount: 20,
                // maxTransferDistance: 100
                numInitTerrainTypes: 6,
                secondsToTrainAThousandTroops: 500,
                tileWidth: 10,
                worldHeight: 100,
                worldWidth: 100
            });
        return worldConstants;
    }

    /// @dev First way to get map: fetch them from last deployment
    function _fetchLastDeployedMap() private returns (uint256[][] memory) {
        string memory root = vm.projectRoot();
        string memory path = string(abi.encodePacked(root, "/test/data/map.json"));
        bytes memory rawJson = vm.parseJson(vm.readFile(path));
        uint256[][] memory map = abi.decode(rawJson, (uint256[][]));

        return map;
    }

    /// @dev Second way to get map: initialize a new one
    function _generateNewMap(uint256 _width, uint256 _height) private view returns (uint256[][] memory) {
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

        _map[barbarinaTilePos.x][barbarinaTilePos.y] = 4;

        return _map;
    }

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
