//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {UseStorage} from "contracts/libraries/Storage.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {ComponentSpec, Position, ValueType, WorldConstants} from "contracts/libraries/Types.sol";
import {Templates} from "contracts/libraries/Templates.sol";
import {Set} from "contracts/Set.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";

/// @title Admin facet
/// @notice Contains admin functions and state functions, both of which should be out of scope for players

contract AdminFacet is UseStorage {
    uint256 private constant NULL = 0;

    // TODO: Question: How to reuse functions from Util so that they can be directly called by external parties?

    // ----------------------------------------------------------------------
    // DEBUG FUNCTIONS
    // ----------------------------------------------------------------------

    function stopGame() external onlyAdmin {
        gs().worldConstants.gameLengthInSeconds = block.timestamp - gs().gameInitTimestamp;
    }

    function removeEntity(uint256 _entity) external onlyAdmin {
        ECSLib.removeEntity(_entity);
    }

    function createArmy(uint256 _playerID, Position memory _position) external onlyAdmin {
        Templates.addArmy(_playerID, _position, GameLib.getProperTilePosition(_position), 0, 1, 1, 2, 5);
    }

    function adminInitializeTile(Position memory _startPosition) external onlyAdmin {
        GameLib.initializeTile(_startPosition);
    }

    function assignResource(
        uint256 _cityID,
        string memory _inventoryType,
        uint256 _amount
    ) external onlyAdmin {
        uint256 templateID = gs().templates[_inventoryType];
        uint256 cityInventoryID = GameLib.getInventory(_cityID, templateID);
        uint256 existingCityResource = ECSLib.getUint("Amount", cityInventoryID);
        uint256 totalAmount = GameLib.min(ECSLib.getUint("Load", cityInventoryID), _amount + existingCityResource);
        ECSLib.setUint("Amount", cityInventoryID, totalAmount);
    }

    function spawnResource(Position memory _startPosition, string memory _inventoryType) external onlyAdmin {
        GameLib.initializeTile(_startPosition);
        Templates.addResource(gs().templates[_inventoryType], _startPosition, 0);
    }

    function spawnBarbarian(Position memory _startPosition, uint256 _level) external onlyAdmin {
        require(_level == 1 || _level == 2, "CURIO: Function not used correctly");
        uint256 tileID = GameLib.initializeTile(_startPosition);
        ECSLib.setUint("Level", tileID, _level);
    }

    // ----------------------------------------------------------------------
    // ADMIN FUNCTIONS
    // ----------------------------------------------------------------------

    modifier onlyAdmin() {
        require(msg.sender == gs().worldConstants.admin, "CURIO: Unauthorized");
        _;
    }

    /**
     * @dev Reactivate an inactive player.
     * @param _address player address
     */
    function reactivatePlayer(address _address) external onlyAdmin {
        uint256 _playerID = gs().playerEntityMap[_address];
        require(_playerID != NULL, "CURIO: Player already initialized");
        require(!ECSLib.getBoolComponent("IsActive").has(_playerID), "CURIO: Player is active");

        ECSLib.setBool("IsActive", _playerID);
    }

    /**
     * @dev Store an array of encoded raw map columns containing information of all tiles, for efficient storage.
     * @param _colBatches map columns in batches, encoded with N-ary arithmetic
     */
    function storeEncodedColumnBatches(uint256[][] memory _colBatches) external onlyAdmin {
        gs().encodedColumnBatches = _colBatches;
    }

    /**
     * @dev Initialize all large tiles from an array of starting positions.
     * @param _positions all positions
     */
    function bulkInitializeTiles(Position[] memory _positions) external onlyAdmin {
        for (uint256 i = 0; i < _positions.length; i++) {
            GameLib.initializeTile(_positions[i]);
        }
    }

    function addTroopTemplate(
        string memory _inventoryType,
        uint256 _health,
        uint256 _speed,
        uint256 _moveCooldown,
        uint256 _battleCooldown,
        uint256 _attack,
        uint256 _defense,
        uint256 _load
    ) external onlyAdmin returns (uint256) {
        return Templates.addTroopTemplate(_inventoryType, _health, _speed, _moveCooldown, _battleCooldown, _attack, _defense, _load);
    }

    function addResourceTemplate(string memory _inventoryType) external onlyAdmin returns (uint256) {
        return Templates.addResourceTemplate(_inventoryType);
    }

    function addGameParameter(string memory _identifier, uint256 _value) external onlyAdmin returns (uint256) {
        return Templates.addGameParameter(_identifier, _value);
    }

    function bulkAddGameParameters(string[] memory _identifiers, uint256[] memory _values) external onlyAdmin {
        require(_identifiers.length == _values.length, "CURIO: Input length mismatch");
        for (uint256 i = 0; i < _values.length; i++) {
            Templates.addGameParameter(_identifiers[i], _values[i]);
        }
    }

    // ----------------------------------------------------------------------
    // ECS HELPERS
    // ----------------------------------------------------------------------

    function registerComponents(address _gameAddr, ComponentSpec[] memory _componentSpecs) external onlyAdmin {
        GameLib.registerComponents(_gameAddr, _componentSpecs);
    }

    /**
     * @dev Register template name to ID map for common templates.
     */
    function registerTemplateShortcuts(string[] memory _names, uint256[] memory _IDs) external onlyAdmin {
        require(_names.length == _IDs.length, "CURIO: Input lengths don't match");

        for (uint256 i = 0; i < _names.length; i++) {
            gs().templates[_names[i]] = _IDs[i];
        }

        gs().templateNames = _names;
    }

    function addEntity() external onlyAdmin returns (uint256) {
        return ECSLib.addEntity();
    }

    function setComponentValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _value
    ) external onlyAdmin {
        ECSLib.setComponentValue(_componentName, _entity, _value);
    }
}
