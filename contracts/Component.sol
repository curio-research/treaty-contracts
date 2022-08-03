// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import {Set} from "contracts/Set.sol";
import {MapSet} from "contracts/MapSet.sol";

contract Component {
    /**
     * Sample components
     * - Health
     * - Position
     *
     * Question: Permission management for component value modification
     * Question: Is there value to having a nonce count how many components there are in an ordered fashion?
     * Question: Can `.filter()` be implemented, and if not fully, to what extent?
     */

    address public game; // game diamond
    address public admin;

    Set private entities;
    MapSet private valueToEntities;
    mapping(uint256 => bytes) private entityToValue;

    constructor(address _game) {
        admin = msg.sender;
        game = _game;
        entities = new Set();
        valueToEntities = new MapSet();
    }

    function set(uint256 _entity, bytes memory _value) public {
        // Store the entity
        entities.add(_entity);

        // Remove the entitiy from the previous reverse mapping if there is one
        valueToEntities.remove(uint256(keccak256(entityToValue[_entity])), _entity);

        // Store the entity's value;
        entityToValue[_entity] = _value;

        // Add the entity to the new reverse mapping
        valueToEntities.add(uint256(keccak256(_value)), _entity);

        // // Emit global event
        // World(world).registerComponentValueSet(address(this), entity, value);
    }

    function remove(uint256 _entity) public {
        // Remove the entity from the reverse mapping
        valueToEntities.remove(uint256(keccak256(entityToValue[_entity])), _entity);

        // Remove the entity from the entity list
        entities.remove(_entity);

        // Remove the entity from the mapping
        delete entityToValue[_entity];

        // // Emit global event
        // World(world).registerComponentValueRemoved(address(this), entity);
    }

    function includes(uint256 _entity) public view returns (bool) {
        return entities.includes(_entity);
    }

    function getRawValue(uint256 _entity) public view returns (bytes memory) {
        // Return the entity's component value
        return entityToValue[_entity];
    }

    function getEntities() public view returns (uint256[] memory) {
        return entities.getAll();
    }

    function getEntitiesWithValue(bytes memory _value) public view returns (uint256[] memory) {
        // Return all entities with this component value
        return valueToEntities.getAll(uint256(keccak256(_value)));
    }
}
