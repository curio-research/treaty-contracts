// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;
import {Set} from "./Set.sol";

contract World {
    address private entities = address(new Set());

    event ComponentValueSet(address component, uint256 entity, bytes data);
    event ComponentValueRemoved(address component, uint256 entity);

    function registerComponentValueSet(
        address component,
        uint256 entity,
        bytes calldata data
    ) public {
        Set(entities).add(entity);
        emit ComponentValueSet(component, entity, data);
    }

    function registerComponentValueRemoved(address component, uint256 entity) public {
        emit ComponentValueRemoved(component, entity);
    }

    function getNumEntities() public view returns (uint256) {
        return Set(entities).size();
    }
}
