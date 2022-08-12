//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {Position} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/Component.sol";
import {Set} from "contracts/Set.sol";

/// @title Helper facet
/// @notice Contains admin functions and state functions, both of which should be out of scope for players

contract HelperFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;
    address NULL_ADDR = address(0);

    // ----------------------------------------------------------------------
    // ADMIN FUNCTIONS
    // ----------------------------------------------------------------------

    modifier onlyAdmin() {
        require(msg.sender == gs().worldConstants.admin, "CURIO: Unauthorized");
        _;
    }

    /**
     * Store an array of encoded raw map columns containing information of all tiles, for efficient storage.
     * @param _colBatches map columns in batches, encoded with N-ary arithmetic
     */
    function storeEncodedColumnBatches(uint256[][] memory _colBatches) external onlyAdmin {
        gs().encodedColumnBatches = _colBatches;
    }

    /**
     * Initialize all tiles from an array of positions.
     * @param _positions all positions
     */
    function bulkInitializeTiles(Position[] memory _positions) external onlyAdmin {
        for (uint256 i = 0; i < _positions.length; i++) {
            Util._initializeTileECS(_positions[i]);
        }
    }

    // ----------------------------------------------------------------------
    // ECS HELPERS (temp)
    // ----------------------------------------------------------------------

    function registerComponents(address _gameAddr, string[3] memory _componentNameList) external onlyAdmin {
        for (uint256 i = 0; i < _componentNameList.length; i++) {
            string memory _componentName = _componentNameList[i];
            address _componentAddr = address(new Component(_gameAddr));
            gs().components[_componentName] = _componentAddr;
            gs().idComponentMap[i + 1] = _componentAddr; // component ID starts with 1

            emit Util.NewComponent(_componentName, i + 1);
        }
    }

    function addEntity() external onlyAdmin returns (uint256) {
        return Util._addEntity();
    }

    function setComponentValue(
        string memory _componentName,
        uint256 _entity,
        bytes memory _value
    ) external onlyAdmin {
        Util._setComponentValue(_componentName, _entity, _value);
    }
}
