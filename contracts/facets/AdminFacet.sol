//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {UseStorage} from "contracts/libraries/Storage.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {ComponentSpec, Position, ValueType, WorldConstants} from "contracts/libraries/Types.sol";
import {Templates} from "contracts/libraries/Templates.sol";
import {Set} from "contracts/Set.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";
import {console} from "forge-std/console.sol";

/// @title Admin facet
/// @notice Contains admin functions and state functions, both of which should be out of scope for nations

contract AdminFacet is UseStorage {
    uint256 private constant NULL = 0;

    modifier onlyAdmin() {
        require(msg.sender == gs().worldConstants.admin, "CURIO: Unauthorized");
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == gs().worldConstants.admin || gs().isAuthorized[msg.sender] == true, "CURIO: Unauthorized");
        _;
    }

    function addAuthorized(address authorizedAddress) external onlyAdmin {
        gs().authorized.push(authorizedAddress);
        gs().isAuthorized[authorizedAddress] = true;
    }

    // Question: How to reuse functions from Util so that they can be directly called by external parties?

    // ----------------------------------------------------------------------
    // DEBUG FUNCTIONS
    // ----------------------------------------------------------------------

    function onlySet(uint256 _entity, uint256 _value) external {
        ECSLib.setUint("Health", _entity, _value);
    }

    function onlyQuery(Position memory _startPosition) external view returns (uint256[] memory) {
        return GameLib.getMovableEntitiesAtTile(_startPosition);
    }

    function stopGame() external onlyAuthorized {
        gs().worldConstants.gameLengthInSeconds = block.timestamp - gs().gameInitTimestamp;
    }

    function removeEntity(uint256 _entity) external onlyAuthorized {
        ECSLib.removeEntity(_entity);
    }

    function adminInitializeTile(Position memory _startPosition) external onlyAuthorized {
        GameLib.initializeTile(_startPosition);
    }

    // function createArmy(uint256 _nationID, Position memory _position) external onlyAuthorized {
    //     Templates.addArmy(_nationID, _position, GameLib.getProperTilePosition(_position), 10, 1, 1, 2, 5, "TODO");
    // }

    function spawnResource(Position memory _startPosition, string memory _inventoryType) external onlyAuthorized {
        Templates.addResource(gs().templates[_inventoryType], _startPosition);
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

    // ----------------------------------------------------------------------
    // ADMIN FUNCTIONS
    // ----------------------------------------------------------------------

    // sent using the initial function
    function authorizeGame(address _burnerAddress) external onlyAuthorized {
        gs().accounts[msg.sender] = _burnerAddress;
        gs().burnerAccounts[_burnerAddress] = msg.sender;
    }

    /**
     * @dev Reactivate an inactive nation.
     * @param _address nation address
     */
    function reactivateNation(address _address) external onlyAuthorized {
        uint256 _nationID = gs().nationAddressToId[_address];
        require(_nationID != NULL, "CURIO: Nation already initialized");
        require(!ECSLib.getBoolComponent("IsActive").has(_nationID), "CURIO: Nation is active");

        ECSLib.setBool("IsActive", _nationID);
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

    function addInventory(uint256 _keeperID, string memory _inventoryType) external onlyAuthorized returns (uint256) {
        uint256 templateID = gs().templates[_inventoryType];
        return Templates.addInventory(_keeperID, templateID);
    }

    function updateInventoryAmount(uint256 _inventoryID, uint256 _newAmount) external onlyAuthorized returns (bool) {
        ECSLib.setUint("Amount", _inventoryID, _newAmount);
        return true;
    }

    function addTroopTemplate(
        string memory _inventoryType,
        uint256 _health,
        uint256 _attack,
        uint256 _defense,
        uint256 _load,
        address _tokenContract
    ) external onlyAuthorized returns (uint256) {
        return Templates.addTroopTemplate(_inventoryType, _health, _attack, _defense, _load, _tokenContract);
    }

    function addResourceTemplate(string memory _inventoryType, address _tokenContract) external onlyAuthorized returns (uint256) {
        return Templates.addResourceTemplate(_inventoryType, _tokenContract);
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

    function addTreaty(address _address, string memory _name) external onlyAuthorized returns (uint256) {
        return Templates.addTreaty(_address, _name);
    }

    function generateNewAddress() external onlyAuthorized returns (address) {
        return GameLib.generateNewAddress();
    }

    // ----------------------------------------------------------------------
    // ECS HELPERS
    // ----------------------------------------------------------------------

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

    function setComponentValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _value
    ) external {
        ECSLib.setComponentValue(_componentName, _entity, _value);
    }
}
