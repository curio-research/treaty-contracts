//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {ComponentSpec, Position, Tile, ValueType, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import "contracts/libraries/Templates.sol";
import {Set} from "contracts/Set.sol";

/// @title Admin facet
/// @notice Contains admin functions and state functions, both of which should be out of scope for players

contract AdminFacet is UseStorage {
    using SafeMath for uint256;
    uint256 private constant NULL = 0;

    // TODO: Question: How to reuse functions from Util so that they can be directly called by external parties?

    // ----------------------------------------------------------------------
    // DEBUG FUNCTIONS
    // ----------------------------------------------------------------------

    function removeEntity(uint256 _entity) external onlyAdmin {
        ECSLib.removeEntity(_entity);
    }

    function createArmy(uint256 _playerID, Position memory _position) external onlyAdmin {
        Templates.addArmy(_playerID, _position, 0, 1, 1, 2);
    }

    function initializeTile(Position memory _startPosition) public onlyAdmin {
        GameLib.initializeTile(_startPosition);
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
     * @dev Initialize all tiles from an array of positions.
     * @param _positions all positions
     */
    function bulkInitializeTiles(Position[] memory _positions) external onlyAdmin {
        for (uint256 i = 0; i < _positions.length; i++) {
            GameLib.initializeTile(_positions[i]);
        }
    }

    // ----------------------------------------------------------------------
    // STATE FUNCTIONS
    // ----------------------------------------------------------------------

    // /**
    //  * Update player's balances to the latest state.
    //  * @param _player player address
    //  */
    // function updatePlayerBalances(address _player) external {
    //     GameLib._updatePlayerBalances(gs().playerEntityMap[_player]);
    // }

    // ----------------------------------------------------------------------
    // ECS HELPERS
    // ----------------------------------------------------------------------

    function registerComponents(address _gameAddr, ComponentSpec[] memory _componentSpecs) external onlyAdmin {
        GameLib.registerComponents(_gameAddr, _componentSpecs);
    }

    // FIXME: be able to sync with vault
    function registerDefaultComponents(address _gameAddr) external onlyAdmin {
        ComponentSpec[] memory _componentSpecs = new ComponentSpec[](38);

        _componentSpecs[0] = ComponentSpec({name: "IsComponent", valueType: ValueType.BOOL});
        _componentSpecs[1] = ComponentSpec({name: "Tag", valueType: ValueType.STRING});
        _componentSpecs[2] = ComponentSpec({name: "IsActive", valueType: ValueType.BOOL});
        _componentSpecs[3] = ComponentSpec({name: "InitTimestamp", valueType: ValueType.UINT});
        _componentSpecs[4] = ComponentSpec({name: "Position", valueType: ValueType.POSITION});
        _componentSpecs[5] = ComponentSpec({name: "Owner", valueType: ValueType.UINT});
        _componentSpecs[6] = ComponentSpec({name: "Level", valueType: ValueType.UINT});
        _componentSpecs[7] = ComponentSpec({name: "Name", valueType: ValueType.STRING});
        _componentSpecs[8] = ComponentSpec({name: "CanSettle", valueType: ValueType.BOOL});
        _componentSpecs[9] = ComponentSpec({name: "ResourceType", valueType: ValueType.STRING});
        _componentSpecs[10] = ComponentSpec({name: "BuildingType", valueType: ValueType.STRING});
        _componentSpecs[11] = ComponentSpec({name: "Template", valueType: ValueType.UINT});
        _componentSpecs[12] = ComponentSpec({name: "CanProduce", valueType: ValueType.BOOL});
        _componentSpecs[13] = ComponentSpec({name: "Duration", valueType: ValueType.UINT});
        _componentSpecs[14] = ComponentSpec({name: "BalanceLastUpdated", valueType: ValueType.UINT});
        _componentSpecs[15] = ComponentSpec({name: "MaxHealth", valueType: ValueType.UINT});
        _componentSpecs[16] = ComponentSpec({name: "Health", valueType: ValueType.UINT});
        _componentSpecs[17] = ComponentSpec({name: "Attack", valueType: ValueType.UINT});
        _componentSpecs[18] = ComponentSpec({name: "Defense", valueType: ValueType.UINT});
        _componentSpecs[19] = ComponentSpec({name: "Speed", valueType: ValueType.UINT});
        _componentSpecs[20] = ComponentSpec({name: "Load", valueType: ValueType.UINT});
        _componentSpecs[21] = ComponentSpec({name: "City", valueType: ValueType.UINT});
        _componentSpecs[22] = ComponentSpec({name: "Keeper", valueType: ValueType.UINT});
        _componentSpecs[23] = ComponentSpec({name: "Amount", valueType: ValueType.UINT});
        _componentSpecs[24] = ComponentSpec({name: "InventoryType", valueType: ValueType.STRING});
        _componentSpecs[25] = ComponentSpec({name: "LastTimestamp", valueType: ValueType.UINT});
        _componentSpecs[26] = ComponentSpec({name: "Source", valueType: ValueType.UINT});
        _componentSpecs[27] = ComponentSpec({name: "Target", valueType: ValueType.UINT});
        _componentSpecs[28] = ComponentSpec({name: "Inventory", valueType: ValueType.UINT});
        _componentSpecs[29] = ComponentSpec({name: "Address", valueType: ValueType.ADDRESS});
        _componentSpecs[30] = ComponentSpec({name: "Treaty", valueType: ValueType.ADDRESS});
        _componentSpecs[31] = ComponentSpec({name: "Cost", valueType: ValueType.UINT});
        _componentSpecs[32] = ComponentSpec({name: "Army", valueType: ValueType.UINT});
        _componentSpecs[33] = ComponentSpec({name: "StartPosition", valueType: ValueType.POSITION});
        _componentSpecs[34] = ComponentSpec({name: "MoveCooldown", valueType: ValueType.UINT});
        _componentSpecs[35] = ComponentSpec({name: "BattleCooldown", valueType: ValueType.UINT});
        _componentSpecs[36] = ComponentSpec({name: "Terrain", valueType: ValueType.UINT});
        _componentSpecs[37] = ComponentSpec({name: "CanBattle", valueType: ValueType.BOOL});

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
