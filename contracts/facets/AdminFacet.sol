//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {UseStorage} from "contracts/libraries/Storage.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {ComponentSpec, Position, ValueType, WorldConstants} from "contracts/libraries/Types.sol";
import {Templates} from "contracts/libraries/Templates.sol";
import {Set} from "contracts/Set.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import "forge-std/console.sol";


/// @title Admin facet
/// @notice Contains admin functions and state functions, both of which should be out of scope for players

contract AdminFacet is UseStorage {
    uint256 private constant NULL = 0;

    modifier onlyAuthorized() {
        require(msg.sender == gs().worldConstants.admin || gs().isAuthorized[msg.sender] == true, "CURIO: Unauthorized");
        _;
    }

    function addAuthroized(address authorizedAddress) external onlyAuthorized {
        gs().authorized.push(authorizedAddress);
        gs().isAuthorized[authorizedAddress] = true;
    }

    // Question: How to reuse functions from Util so that they can be directly called by external parties?

    // ----------------------------------------------------------------------
    // DEBUG FUNCTIONS
    // ----------------------------------------------------------------------

    function stopGame() external onlyAuthorized {
        gs().worldConstants.gameLengthInSeconds = block.timestamp - gs().gameInitTimestamp;
    }

    function removeEntity(uint256 _entity) external onlyAuthorized {
        ECSLib.removeEntity(_entity);
    }

    function createArmy(uint256 _playerID, Position memory _position) external onlyAuthorized {
        // Templates.addArmy(_playerID, _position, GameLib.getProperTilePosition(_position), 0, 1, 1, 2, 5);
    }

    function adminInitializeTile(Position memory _startPosition, address _tileAddress) external onlyAuthorized {
        GameLib.initializeTile(_startPosition, _tileAddress);
    }

    function spawnResource(Position memory _startPosition, string memory _inventoryType) external onlyAuthorized {
        Templates.addResource(gs().templates[_inventoryType], _startPosition);
    }

    function dripToken(address _address, string memory _tokenName, uint256 _amount) external onlyAuthorized {
        address tokenContract = GameLib.getTokenContract(_tokenName);
        (bool success, ) = tokenContract.call(abi.encodeWithSignature("dripToken(address,uint256)", _address, _amount));
        require(success, "CURIO: Token dripping fails");
    }

    function giftTileAndResourceAt(Position memory _startPosition, uint256 _nationID) external onlyAuthorized {
        uint256 tileID = GameLib.getTileAt(_startPosition);
        uint256 resourceID = GameLib.getResourceAt(_startPosition);
        ECSLib.setUint("Nation", tileID, _nationID);
        ECSLib.setUint("Nation", resourceID, _nationID);
    }

    function spawnBarbarian(Position memory _startPosition, uint256 _level) external onlyAuthorized {
        require(_level == 1 || _level == 2, "CURIO: Function not used correctly");
        uint256 tileID = GameLib.getTileAt(_startPosition);
        ECSLib.setUint("Level", tileID, _level);
    }

    // ----------------------------------------------------------------------
    // ADMIN FUNCTIONS
    // ----------------------------------------------------------------------

    /**
     * @dev Reactivate an inactive player.
     * @param _address player address
     */
    function reactivatePlayer(address _address) external onlyAuthorized {
        uint256 _playerID = gs().nationEntityMap[_address];
        require(_playerID != NULL, "CURIO: Player already initialized");
        require(!ECSLib.getBoolComponent("IsActive").has(_playerID), "CURIO: Player is active");

        ECSLib.setBool("IsActive", _playerID);
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

    // fixme: update new initialization in deploy.ts
    function bulkInitializeTiles(Position[] memory _positions, address _tileAddress) external onlyAuthorized {
        for (uint256 i = 0; i < _positions.length; i++) {
            GameLib.initializeTile(_positions[i], _tileAddress);
        }
    }

    function addInventory(
        uint256 _keeperID,
        string memory _templateString
    ) external onlyAuthorized returns (uint256) {
        uint256 templateID = gs().templates[_templateString];
        return Templates.addInventory(_keeperID, templateID);
    }

    function updateInventoryAmount(address _inventoryAddress, string memory _templateString, uint256 _amountChanged, bool _isIncrease) external onlyAuthorized returns (bool) {
        uint256 templateID = gs().templates[_templateString];
        uint256 keeperID = GameLib.getEntityByAddress(_inventoryAddress);
        uint256 inventoryID = GameLib.getInventory(keeperID, templateID);
        uint256 inventoryCurrentBalance = ECSLib.getUint("Amount", inventoryID);
        if (_isIncrease) {
            ECSLib.setUint("Amount", inventoryID, inventoryCurrentBalance + _amountChanged);
            return true;
        } else {
            ECSLib.setUint("Amount", inventoryID, inventoryCurrentBalance - _amountChanged);
            return true;
        }
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
