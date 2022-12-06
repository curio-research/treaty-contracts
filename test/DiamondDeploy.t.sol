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
import {NATO} from "contracts/NATO.sol";
import {FoodERC20} from "contracts/tokens/FoodERC20.sol";
import {GoldERC20} from "contracts/tokens/GoldERC20.sol";
import {HorsemanERC20} from "contracts/tokens/HorsemanERC20.sol";
import {SlingerERC20} from "contracts/tokens/SlingerERC20.sol";
import {WarriorERC20} from "contracts/tokens/WarriorERC20.sol";
import {GuardERC20} from "contracts/tokens/GuardERC20.sol";

import {WalletHangingGarden} from "contracts/WalletHangingGarden.sol";
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

    // diamond-contract-casted methods
    GameFacet public game;
    GetterFacet public getter;
    AdminFacet public admin;
    OwnershipFacet public ownership;

    // Treaties
    NATO public nato;

    // Smart Contract Wallets
    WalletHangingGarden public nation1Wallet;
    WalletHangingGarden public nation2Wallet;
    WalletHangingGarden public nation3Wallet;
    uint256 public nation1ID;
    uint256 public nation2ID;
    uint256 public nation3ID;

    WalletHangingGarden public army11Wallet;
    WalletHangingGarden public army12Wallet;
    WalletHangingGarden public army21Wallet;
    WalletHangingGarden public army22Wallet;
    WalletHangingGarden public army31Wallet;
    WalletHangingGarden public army32Wallet;

    // Tokens
    FoodERC20 public foodContract;
    GoldERC20 public goldContract;
    HorsemanERC20 public horsemanContract;
    SlingerERC20 public slingerContract;
    WarriorERC20 public warriorContract;
    GuardERC20 public guardContract;

    uint256 public NULL = 0;
    address public NULL_ADDR = address(0);

    address public deployerAddress = address(0);
    address public player1Addr = address(1);
    address public player2Addr = address(2);
    address public player3Addr = address(3);

    Position public nation1Pos = Position({x: 60, y: 10});
    Position public nation2Pos = Position({x: 60, y: 30});
    Position public nation3Pos = Position({x: 50, y: 20});
    Position public barbarinaTilePos = Position({x: 60, y: 50});

    uint256 public horsemanTemplateID;
    uint256 public warriorTemplateID;
    uint256 public slingerTemplateID;
    uint256 public guardTemplateID;
    uint256 public goldTemplateID;
    uint256 public foodTemplateID;

    uint256 public player2SettlerId;

    WorldConstants public worldConstants;

    // we assume these two facet selectors do not change. If they do however, we should use _getSelectors
    bytes4[] OWNERSHIP_SELECTORS = [bytes4(0xf2fde38b), 0x8da5cb5b];
    bytes4[] LOUPE_SELECTORS = [bytes4(0xcdffacc6), 0x52ef6b2c, 0xadfca15e, 0x7a0ed627, 0x01ffc9a7];


    function setUp() public {
        vm.startPrank(deployerAddress);
        console.log("==================== SETUP BEGINS =====================");

        // Initialize diamond facets
        diamondCutFacet = new DiamondCutFacet();
        diamond = address(new Diamond(deployerAddress, address(diamondCutFacet)));
        diamondInit = new DiamondInit();
        diamondLoupeFacet = new DiamondLoupeFacet();
        diamondOwnershipFacet = new OwnershipFacet();
        gameFacet = new GameFacet();
        getterFacet = new GetterFacet();

        adminFacet = new AdminFacet();

        // Prepare world constants with either `_generateNewWorldConstants()` or `fetchWorldConstants()`
        worldConstants =  _fetchWorldConstants();
        console.log(">>> World constants ready");

        // Initialize treaties
        nato = new NATO();
        console.log(">>> Treaties initialized");
        
        // Fetch args from CLI craft payload for init deploy
        bytes memory initData = abi.encodeWithSelector(_getSelectors("DiamondInit")[0], worldConstants);
        IDiamondCut.FacetCut[] memory cuts = new IDiamondCut.FacetCut[](5);
        cuts[0] = IDiamondCut.FacetCut({facetAddress: address(diamondLoupeFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: LOUPE_SELECTORS});
        cuts[1] = IDiamondCut.FacetCut({facetAddress: address(diamondOwnershipFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: OWNERSHIP_SELECTORS});
        cuts[2] = IDiamondCut.FacetCut({facetAddress: address(gameFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: _getSelectors("GameFacet")});
        cuts[3] = IDiamondCut.FacetCut({facetAddress: address(getterFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: _getSelectors("GetterFacet")});
        cuts[4] = IDiamondCut.FacetCut({facetAddress: address(adminFacet), action: IDiamondCut.FacetCutAction.Add, functionSelectors: _getSelectors("AdminFacet")});
        IDiamondCut(diamond).diamondCut(cuts, address(diamondInit), initData);
        console.log(">>> Diamond initialized");

        // Assign diamond functions to corresponding facets
        getter = GetterFacet(diamond);
        game = GameFacet(diamond);
        admin = AdminFacet(diamond);
        ownership = OwnershipFacet(diamond);
        console.log(">>> Facets casted");

        // Register components
        _registerComponents();
        console.log(">>> Components registered");

        // Register parameters
        _registerGameParameters();
        console.log(">>> Game parameters registered");

        // Create templates
        // Deploy token contracts
        foodContract = new FoodERC20("Food", "FOOD", 1, address(diamond));
        goldContract = new GoldERC20("Gold", "GOLD", 1, address(diamond));
        // note: Consider switching to erc1155
        horsemanContract = new HorsemanERC20("Horseman", "HORSEMAN", 1, address(diamond));
        warriorContract = new WarriorERC20("Warrior", "WARRIOR", 1, address(diamond));
        slingerContract = new SlingerERC20("Slinger", "SLINGER", 1, address(diamond));
        guardContract = new GuardERC20("Guard", "GUARD", 1, address(diamond));
        _createTemplates();

        address[] memory tokenContracts = new address[](6);
        tokenContracts[0] = address(foodContract);
        tokenContracts[1] = address(goldContract);
        tokenContracts[2] = address(horsemanContract);
        tokenContracts[3] = address(warriorContract);
        tokenContracts[4] = address(slingerContract);
        tokenContracts[5] = address(guardContract);

        // admin facet authorizes all token contracts to make changes to ECS States
        admin.addAuthorized(address(foodContract));
        admin.addAuthorized(address(goldContract));
        admin.addAuthorized(address(horsemanContract));
        admin.addAuthorized(address(warriorContract));
        admin.addAuthorized(address(slingerContract));
        admin.addAuthorized(address(guardContract));
        console.log(">>> Templates created");

        // Initialize map either with either `_generateNewMap()` or `_fetchLastDeployedMap()`
        // Note: if fetching deployed map, check for map size
        uint256[][] memory map = _generateNewMap(worldConstants.worldWidth, worldConstants.worldHeight);
        uint256[][] memory encodedColumnBatches = _encodeTileMap(map, worldConstants.numInitTerrainTypes, 200 / worldConstants.numInitTerrainTypes);
        admin.storeEncodedColumnBatches(encodedColumnBatches);
        _initializeMap();
        console.log(">>> Map initialized and encoded");

        vm.stopPrank();

        // Deploy smart contract wallets
        uint256 homieFee = 666;
        address[] memory initializedOwners = new address[](1);

        initializedOwners[0] = player1Addr;
        nation1Wallet = new WalletHangingGarden(initializedOwners, address(diamond), homieFee);
        army11Wallet = new WalletHangingGarden(initializedOwners, address(diamond), homieFee);
        army12Wallet = new WalletHangingGarden(initializedOwners, address(diamond), homieFee);

        initializedOwners[0] = player2Addr;
        nation2Wallet = new WalletHangingGarden(initializedOwners, address(diamond), homieFee);
        army21Wallet = new WalletHangingGarden(initializedOwners, address(diamond), homieFee);
        army22Wallet = new WalletHangingGarden(initializedOwners, address(diamond), homieFee);

        initializedOwners[0] = player3Addr;
        nation3Wallet = new WalletHangingGarden(initializedOwners, address(diamond), homieFee);
        army31Wallet = new WalletHangingGarden(initializedOwners, address(diamond), homieFee);
        army32Wallet = new WalletHangingGarden(initializedOwners, address(diamond), homieFee);
        console.log(">>> Smart contract wallets initialized");

        // Initialize players
        address nationAddr;
        WalletHangingGarden nationWallet;
        WalletHangingGarden armyWallet1;
        WalletHangingGarden armyWallet2;
        Position memory capitalPos;
        string memory nationName;
        for (uint256 i = 0; i < 3; i++) {
            if (i == 0) {
                nationAddr = player1Addr;
                nationWallet = nation1Wallet;
                armyWallet1 = army11Wallet;
                armyWallet2 = army12Wallet;
                capitalPos = nation1Pos;
                nationName = "China";
            } else if (i == 1) {
                nationAddr = player2Addr;
                nationWallet = nation2Wallet;
                armyWallet1 = army21Wallet;
                armyWallet2 = army22Wallet;
                capitalPos = nation2Pos;
                nationName = "US";
            } else if (i == 2) {
                nationAddr = player3Addr;
                nationWallet = nation3Wallet;
                armyWallet1 = army31Wallet;
                armyWallet2 = army32Wallet;
                capitalPos = nation3Pos;
                nationName = "Russia";
            }

            vm.startPrank(nationAddr);
            nationWallet.executeGameTx(abi.encodeWithSignature("initializeNation(uint256,uint256,string)", capitalPos.x, capitalPos.y, nationName));
            nationWallet.executeGameTx(abi.encodeWithSignature("initializeArmy(address)", address(armyWallet1)));
            nationWallet.executeGameTx(abi.encodeWithSignature("initializeArmy(address)", address(armyWallet2)));
            
            for (uint256 j = 0; j < tokenContracts.length; j++) {
                nationWallet.executeTx(address(tokenContracts[j]), abi.encodeWithSignature("approve(address,uint256)", address(game), type(uint256).max));
                armyWallet1.executeTx(address(tokenContracts[j]), abi.encodeWithSignature("approve(address,uint256)", address(game), type(uint256).max));
                armyWallet1.executeTx(address(tokenContracts[j]), abi.encodeWithSignature("approve(address,uint256)", address(game), type(uint256).max));
            }
            
            if (i == 0) { nation1ID = getter.getEntityIDByAddress(address(nationWallet)); }
            else if (i == 1) { nation2ID = getter.getEntityIDByAddress(address(nationWallet)); }
            else if (i == 2) { nation3ID = getter.getEntityIDByAddress(address(nationWallet)); }
            vm.stopPrank();
        }

        console.log(">>> Nations and armies initialized");
        console.log("=============== INDIVIDUAL TESTS BEGIN ================");
    }

    // fixme: Then probably don't need to store batches in gs()
    function _initializeMap() private {
        for (uint256 i = 0; i < worldConstants.worldWidth / worldConstants.tileWidth; i++) {
            uint256 PosX = i * worldConstants.tileWidth;
            for (uint256 j = 0; j < worldConstants.worldHeight / worldConstants.tileWidth; j++) {
                uint256 PosY = j * worldConstants.tileWidth;
                Position memory startPosition;
                startPosition.x = PosX;
                startPosition.y = PosY;

                admin.adminInitializeTile(startPosition);
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
        uint256 templateID = admin.addTroopTemplate(templateName, 120, 60, 120, 95, address(horsemanContract));
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;
        horsemanTemplateID = templateID;

        // Warrior
        templateName = "Warrior";
        templateID = admin.addTroopTemplate(templateName, 120, 60, 120, 95, address(warriorContract));
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;
        warriorTemplateID = templateID;

        // Slinger
        templateName = "Slinger";
        templateID = admin.addTroopTemplate(templateName, 120, 60, 120, 95, address(slingerContract));
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;
        slingerTemplateID = templateID;

        // Guard
        templateName = "Guard";
        templateID = admin.addTroopTemplate(templateName, 120, 60, 120, 0, address(guardContract));
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;
        guardTemplateID = templateID;

        // Gold
        templateName = "Gold";
        templateID = admin.addResourceTemplate(templateName, address(goldContract));
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;
        goldTemplateID = templateID;

        // Food
        templateName = "Food";
        templateID = admin.addResourceTemplate(templateName, address(foodContract));
        templateNames[index] = templateName;
        templateIDs[index] = templateID;
        index++;
        foodTemplateID = templateID;

        // Register template names used for shortcuts
        admin.registerTemplateShortcuts(templateNames, templateIDs);
    }

    /// @dev First way to get world constants: fetch them from data, identical with deployment
    function _fetchWorldConstants() private returns (WorldConstants memory) {
        string memory root = vm.projectRoot();
        string memory path = string(abi.encodePacked(root, "/test/data/world_constants.json"));
        bytes memory rawJson = vm.parseJson(vm.readFile(path));
        worldConstants = abi.decode(rawJson, (WorldConstants));

        worldConstants.admin = deployerAddress;
        return worldConstants;
    }

    /// @dev Second way to get world constants: initialize the world in a unique new state
    function _generateNewWorldConstants() private returns (WorldConstants memory) {
        worldConstants =
            WorldConstants({
                admin: deployerAddress,
                tileWidth: 10,
                worldWidth: 100,
                worldHeight: 100,
                numInitTerrainTypes: 6,
                maxCapitalCountPerPlayer: 3,
                maxArmyCountPerPlayer: 2,
                maxPlayerCount: 20,
                gameMode: GameMode.REGULAR,
                gameLengthInSeconds: 3600,
                maxCapitalLevel: 3,
                capitalLevelToEntityLevelRatio: 3,
                secondsToTrainAThousandTroops: 500 // DO NOT REMOVE THIS COMMENT
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
