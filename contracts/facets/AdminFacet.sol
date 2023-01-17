//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {UseStorage} from "contracts/libraries/Storage.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {ComponentSpec, Position, ValueType, WorldConstants} from "contracts/libraries/Types.sol";
import {Templates} from "contracts/libraries/Templates.sol";
import {Set} from "contracts/Set.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {console} from "forge-std/console.sol";

/// @title Admin facet
/// @notice Contains admin functions and state functions, both of which should be out of scope for nations

contract AdminFacet is UseStorage {
    uint256 private constant NULL = 0;

    modifier onlyAdmin() {
        require(msg.sender == gs().worldConstants.admin, "CURIO: Only admin can call this");
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == gs().worldConstants.admin || gs().isAuthorizedToken[msg.sender] == true, "CURIO: Only admin or authorized token can call");
        _;
    }

    modifier onlyTreaty() {
        uint256 treatyID = GameLib.getEntityByAddress(msg.sender);
        require(GameLib.strEq(ECSLib.getString("Tag", treatyID), "Treaty"), "CURIO: Only treaty can call this");
        _;
    }

    function addAuthorized(address _tokenAddress) external onlyAdmin {
        gs().authorizedTokens.push(_tokenAddress);
        gs().isAuthorizedToken[_tokenAddress] = true;
    }

    // Question: How to reuse functions from Util so that they can be directly called by external parties?

    // ----------------------------------------------------------------------
    // DEBUG FUNCTIONS
    // ----------------------------------------------------------------------

    function onlySet(uint256 _entity, uint256 _value) external {
        ECSLib.setUint("Health", _entity, _value);
    }

    function onlyQuery(Position memory _startPosition) external view returns (uint256[] memory) {
        return GameLib.getArmiesAtTile(_startPosition);
    }

    // ----------------------------------------------------------------------
    // TREATY FUNCTIONS
    // ----------------------------------------------------------------------

    function addSigner(uint256 _nationID) external onlyTreaty returns (uint256) {
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_nationID);

        uint256 treatyID = GameLib.getEntityByAddress(msg.sender);
        uint256 signatureID = GameLib.getNationTreatySignature(_nationID, treatyID);
        require(signatureID == NULL, "CURIO: Nation already joined");
        return Templates.addSignature(treatyID, _nationID);
    }

    function removeSigner(uint256 _nationID) external onlyTreaty {
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_nationID);

        uint256 treatyID = GameLib.getEntityByAddress(msg.sender);
        uint256 signatureID = GameLib.getNationTreatySignature(_nationID, treatyID);
        require(signatureID != NULL, "CURIO: Nation did not join");
        ECSLib.removeEntity(signatureID);
    }

    function addToTreatyWhitelist(uint256 _nationID) external onlyTreaty {
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_nationID);

        uint256 treatyID = GameLib.getEntityByAddress(msg.sender);
        uint256 whitelisted = GameLib.getTreatyWhitelisted(_nationID, treatyID);
        require(whitelisted == 0, "CURIO: Nation is already whitelisted");
        Templates.addTreatyWhitelisted(treatyID, _nationID);
    }

    function removeFromTreatyWhitelist(uint256 _nationID) external onlyTreaty {
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_nationID);

        uint256 treatyID = GameLib.getEntityByAddress(msg.sender);
        uint256 whitelisted = GameLib.getTreatyWhitelisted(_nationID, treatyID);
        require(whitelisted != NULL, "CURIO: Nation is not whitelisted");
        ECSLib.removeEntity(whitelisted);
    }

    /// @notice Set _subjectID to 0 to delegate to all subjects
    function adminDelegateGameFunction(
        uint256 _nationID,
        string memory _functionName,
        uint256 _subjectID,
        bool _canCall
    ) external onlyTreaty {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_nationID);
        GameLib.validFunctionNameCheck(_functionName);

        // Delegate function
        uint256 treatyID = GameLib.getEntityByAddress(msg.sender);
        GameLib.delegateGameFunction(_nationID, _functionName, treatyID, _subjectID, _canCall);
    }

    // ----------------------------------------------------------------------
    // ADMIN FUNCTIONS (LIVEOPS)
    // ----------------------------------------------------------------------

    function lockTiles(Position[] memory _tilePositions) external onlyAuthorized {
        for (uint256 i = 0; i < _tilePositions.length; i++) {
            ECSLib.setBool("IsLocked", GameLib.getTileAt(_tilePositions[i]));
        }
    }

    function unlockTiles(Position[] memory _tilePositions) external onlyAuthorized {
        for (uint256 i = 0; i < _tilePositions.length; i++) {
            ECSLib.removeBool("IsLocked", GameLib.getTileAt(_tilePositions[i]));
        }
    }

    function unlockAllTiles() external onlyAuthorized {
        ECSLib.removeComponentFromAll("IsLocked");
    }

    function removeIdleNations(uint256 _maxIdleDuration) external onlyAuthorized {
        uint256[] memory nationIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("Nation"));
        for (uint256 i = 0; i < nationIDs.length; i++) {
            uint256 lastActed = ECSLib.getUint("LastActed", nationIDs[i]);
            if (lastActed != NULL && block.timestamp > lastActed + _maxIdleDuration) {
                GameLib.removeNation(nationIDs[i]);
            }
        }
    }

    function stopGame() external onlyAuthorized {
        gs().worldConstants.gameLengthInSeconds = block.timestamp - gs().gameInitTimestamp;
    }

    function spawnResource(Position memory _startPosition, string memory _templateName) external onlyAuthorized {
        Templates.addResource(gs().templates[_templateName], _startPosition);
    }

    function dripToken(
        address _address,
        string memory _tokenName,
        uint256 _amount
    ) external onlyAuthorized {
        CurioERC20 token = GameLib.getTokenContract(_tokenName);
        token.dripToken(_address, _amount);
    }

    function giftTileAndResourceAt(Position memory _startPosition, uint256 _nationID) external onlyAuthorized {
        uint256 tileID = GameLib.getTileAt(_startPosition);
        uint256 resourceID = GameLib.getResourceAt(_startPosition);
        ECSLib.setUint("Nation", tileID, _nationID);
        ECSLib.setUint("Nation", resourceID, _nationID);
    }

    function removeEntity(uint256 _entity) external onlyAuthorized {
        ECSLib.removeEntity(_entity);
    }

    function updateInventoryAmount(uint256 _inventoryID, uint256 _newAmount) external onlyAuthorized {
        ECSLib.setUint("Amount", _inventoryID, _newAmount);
    }

    function setComponentValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _value
    ) external {
        ECSLib.setComponentValue(_componentName, _entity, _value);
    }

    // ----------------------------------------------------------------------
    // ADMIN FUNCTIONS (GAME SETUP)
    // ----------------------------------------------------------------------

    function addToGameWhitelist(address _playerAddress) external onlyAuthorized {
        gs().isWhitelistedByGame[_playerAddress] = true;
    }

    function removeFromGameWhitelist(address _playerAddress) external onlyAuthorized {
        gs().isWhitelistedByGame[_playerAddress] = false;
    }

    function adminInitializeTile(Position memory _startPosition) external onlyAuthorized {
        GameLib.initializeTile(_startPosition);
    }

    function disallowHostCapital(Position[] memory _tilePositions) external onlyAuthorized {
        for (uint256 i = 0; i < _tilePositions.length; i++) {
            uint256 tileID = GameLib.getTileAt(_tilePositions[i]);
            ECSLib.removeBool("CanHostCapital", tileID);
        }
    }

    /**
     * @dev Store an array of encoded raw map columns containing information of all tiles, for efficient storage.
     * @param _colBatches map columns in batches, encoded with N-ary arithmetic
     */
    function storeEncodedColumnBatches(uint256[][] memory _colBatches) external onlyAuthorized {
        gs().encodedColumnBatches = _colBatches;
    }

    /**
     * @dev Initialize all large tiles from an array of starting positions.
     * @param _positions all positions
     */

    function bulkInitializeTiles(Position[] memory _positions) external onlyAuthorized {
        for (uint256 i = 0; i < _positions.length; i++) {
            GameLib.initializeTile(_positions[i]);
        }
    }

    function addInventory(uint256 _keeperID, string memory _templateName) external onlyAuthorized returns (uint256) {
        uint256 templateID = gs().templates[_templateName];
        return Templates.addInventory(_keeperID, templateID);
    }

    function addTroopTemplate(
        uint256 _health,
        uint256 _attack,
        uint256 _defense,
        uint256 _load,
        address _tokenContract
    ) external onlyAuthorized returns (uint256) {
        CurioERC20 token = CurioERC20(_tokenContract);
        return Templates.addTroopTemplate(token.name(), _health, _attack, _defense, _load, _tokenContract);
    }

    function addResourceTemplate(address _tokenContract) external onlyAuthorized returns (uint256) {
        CurioERC20 token = CurioERC20(_tokenContract);
        return Templates.addResourceTemplate(token.name(), _tokenContract);
    }

    function addAllowance(
        string memory _templateName,
        uint256 _ownerID,
        uint256 _spenderID
    ) external onlyAuthorized returns (uint256) {
        return Templates.addAllowance(gs().templates[_templateName], _ownerID, _spenderID);
    }

    function addGameParameter(string memory _identifier, uint256 _value) external onlyAuthorized returns (uint256) {
        return Templates.addGameParameter(_identifier, _value);
    }

    function addGame() external onlyAuthorized {
        uint256 entity = ECSLib.addEntity();

        ECSLib.setString("Tag", entity, "Game");
        ECSLib.setUint("Level", entity, 2); // 1: inactive. 2: active
    }

    function bulkAddGameParameters(string[] memory _identifiers, uint256[] memory _values) external onlyAuthorized {
        require(_identifiers.length == _values.length, "CURIO: Input length mismatch");
        for (uint256 i = 0; i < _values.length; i++) {
            Templates.addGameParameter(_identifiers[i], _values[i]);
        }
    }

    /**
     * @dev Register a new treaty template for the game.
     * @param _address deployed treaty address
     * @param _abiHash treaty abi hash
     * @return treatyTemplateID registered treaty template entity
     * @notice This function is currently used for permissioned deployment of treaties. In the future, treaties will be
     *         deployed permissionlessly by players.
     */
    function registerTreatyTemplate(
        address _address,
        string memory _abiHash,
        string memory _metadataLink
    ) external onlyAuthorized returns (uint256 treatyTemplateID) {
        CurioTreaty treaty = CurioTreaty(_address);
        string memory _name = treaty.name();
        string memory _description = treaty.description();
        treatyTemplateID = Templates.addTreatyTemplate(_address, _name, _description, _abiHash, _metadataLink);
        gs().templates[_name] = treatyTemplateID;
    }

    function generateNewAddress() external onlyAuthorized returns (address) {
        return GameLib.generateNewAddress();
    }

    function registerFunctionNames(string[] memory _functionNames) external onlyAuthorized {
        gs().gameFunctionNames = _functionNames;
        for (uint256 i; i < _functionNames.length; i++) {
            gs().isGameFunction[_functionNames[i]] = true;
        }
    }

    function registerComponents(address _gameAddr, ComponentSpec[] memory _componentSpecs) external onlyAuthorized {
        GameLib.registerComponents(_gameAddr, _componentSpecs);
    }

    /**
     * @dev Register template name to ID map for common templates.
     */
    function registerTemplateShortcuts(string[] memory _names, uint256[] memory _IDs) external onlyAuthorized {
        require(_names.length == _IDs.length, "CURIO: Input lengths don't match");

        for (uint256 i = 0; i < _names.length; i++) {
            gs().templates[_names[i]] = _IDs[i];
        }

        gs().templateNames = _names;
    }

    function addEntity() external onlyAuthorized returns (uint256) {
        return ECSLib.addEntity();
    }
}
