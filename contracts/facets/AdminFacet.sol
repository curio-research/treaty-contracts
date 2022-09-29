//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {ComponentSpec, Position, TERRAIN, Tile, VALUE_TYPE, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Set} from "contracts/Set.sol";

/// @title Admin facet
/// @notice Contains admin functions and state functions, both of which should be out of scope for players

contract AdminFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;

    // TODO: Question: How to reuse functions from Util so that they can be directly called by external parties?

    // ----------------------------------------------------------------------
    // DEBUG FUNCTIONS
    // ----------------------------------------------------------------------

    function removeEntity(uint256 _entity) external onlyAdmin {
        ECSLib._removeEntity(_entity);
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
        require(!ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: Player is active");

        ECSLib._setBool("IsActive", _playerID);
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
            GameLib._initializeTile(_positions[i]);
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
        GameLib._registerComponents(_gameAddr, _componentSpecs);
    }

    // FIXME: be able to sync with vault
    function registerDefaultComponents(address _gameAddr) external onlyAdmin {
        ComponentSpec[] memory _componentSpecs = new ComponentSpec[](32);

        _componentSpecs[0] = ComponentSpec({name: "IsComponent", valueType: VALUE_TYPE.BOOL});
        _componentSpecs[1] = ComponentSpec({name: "Tag", valueType: VALUE_TYPE.STRING});
        _componentSpecs[2] = ComponentSpec({name: "IsActive", valueType: VALUE_TYPE.BOOL});
        _componentSpecs[3] = ComponentSpec({name: "InitTimestamp", valueType: VALUE_TYPE.UINT});
        _componentSpecs[4] = ComponentSpec({name: "Position", valueType: VALUE_TYPE.POSITION});
        _componentSpecs[5] = ComponentSpec({name: "Owner", valueType: VALUE_TYPE.UINT});
        _componentSpecs[6] = ComponentSpec({name: "Level", valueType: VALUE_TYPE.UINT});
        _componentSpecs[7] = ComponentSpec({name: "Name", valueType: VALUE_TYPE.STRING});
        _componentSpecs[8] = ComponentSpec({name: "CanSettle", valueType: VALUE_TYPE.BOOL});
        _componentSpecs[9] = ComponentSpec({name: "ResourceType", valueType: VALUE_TYPE.STRING});
        _componentSpecs[10] = ComponentSpec({name: "BuildingType", valueType: VALUE_TYPE.STRING});
        _componentSpecs[11] = ComponentSpec({name: "Template", valueType: VALUE_TYPE.UINT});
        _componentSpecs[12] = ComponentSpec({name: "CanProduce", valueType: VALUE_TYPE.BOOL});
        _componentSpecs[13] = ComponentSpec({name: "Duration", valueType: VALUE_TYPE.UINT});
        _componentSpecs[14] = ComponentSpec({name: "BalanceLastUpdated", valueType: VALUE_TYPE.UINT});
        _componentSpecs[15] = ComponentSpec({name: "MaxHealth", valueType: VALUE_TYPE.UINT});
        _componentSpecs[16] = ComponentSpec({name: "Health", valueType: VALUE_TYPE.UINT});
        _componentSpecs[17] = ComponentSpec({name: "Attack", valueType: VALUE_TYPE.UINT});
        _componentSpecs[18] = ComponentSpec({name: "Defense", valueType: VALUE_TYPE.UINT});
        _componentSpecs[19] = ComponentSpec({name: "Speed", valueType: VALUE_TYPE.UINT});
        _componentSpecs[20] = ComponentSpec({name: "Load", valueType: VALUE_TYPE.UINT});
        _componentSpecs[21] = ComponentSpec({name: "City", valueType: VALUE_TYPE.UINT});
        _componentSpecs[22] = ComponentSpec({name: "Keeper", valueType: VALUE_TYPE.UINT});
        _componentSpecs[23] = ComponentSpec({name: "Amount", valueType: VALUE_TYPE.UINT});
        _componentSpecs[24] = ComponentSpec({name: "InventoryType", valueType: VALUE_TYPE.STRING});
        _componentSpecs[25] = ComponentSpec({name: "LastTimestamp", valueType: VALUE_TYPE.UINT});
        _componentSpecs[26] = ComponentSpec({name: "Source", valueType: VALUE_TYPE.UINT});
        _componentSpecs[27] = ComponentSpec({name: "Target", valueType: VALUE_TYPE.UINT});
        _componentSpecs[28] = ComponentSpec({name: "Inventory", valueType: VALUE_TYPE.UINT});
        _componentSpecs[29] = ComponentSpec({name: "Address", valueType: VALUE_TYPE.ADDRESS});
        _componentSpecs[30] = ComponentSpec({name: "Treaty", valueType: VALUE_TYPE.ADDRESS});
        _componentSpecs[31] = ComponentSpec({name: "Cost", valueType: VALUE_TYPE.UINT});

        GameLib._registerComponents(_gameAddr, _componentSpecs);
    }

    function addEntity() external onlyAdmin returns (uint256) {
        return ECSLib._addEntity();
    }

    function setComponentValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _value
    ) external onlyAdmin {
        ECSLib._setComponentValue(_componentName, _entity, _value);
    }
}
