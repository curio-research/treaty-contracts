// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import {Set} from "./Set.sol";
import {MapSet} from "./MapSet.sol";
import {World} from "./World.sol";

contract Component {
    /**
     * Sample components
     * - Health
     * - Position
     * TODO: Question
     * - Permission management for component value modification
     * - Is there value to having a nonce count how many components there are in an ordered fashion?
     * - Do we need componentId?
     */

    address public world; // FIXME: can this just be `EngineFacet`?
    address public owner;

    Set private entities;
    MapSet private valueToEntities;
    mapping(uint256 => bytes) private entityToValue;

    constructor(address _world) {
        owner = msg.sender;
        world = _world;
        entities = new Set();
        valueToEntities = new MapSet();
    }

    // modifier onlyOwner() {
    //     require(msg.sender == owner, "only owner");
    //     _;
    // }

    // function transferOwnership(address newOwner) public onlyOwner {
    //     owner = newOwner;
    // }

    function set(uint256 entity, bytes memory value) public {
        // Store the entity
        entities.add(entity);

        // Remove the entitiy from the previous reverse mapping if there is one
        valueToEntities.remove(uint256(keccak256(entityToValue[entity])), entity);

        // Store the entity's value;
        entityToValue[entity] = value;

        // Add the entity to the new reverse mapping
        valueToEntities.add(uint256(keccak256(value)), entity);

        // Emit global event
        World(world).registerComponentValueSet(address(this), entity, value);
    }

    function remove(uint256 entity) public {
        // Remove the entity from the reverse mapping
        valueToEntities.remove(uint256(keccak256(entityToValue[entity])), entity);

        // Remove the entity from the entity list
        entities.remove(entity);

        // Remove the entity from the mapping
        delete entityToValue[entity];

        // Emit global event
        World(world).registerComponentValueRemoved(address(this), entity);
    }

    function has(uint256 entity) public view returns (bool) {
        return entities.includes(entity);
    }

    function getRawValue(uint256 entity) public view returns (bytes memory) {
        // Return the entity's component value
        return entityToValue[entity];
    }

    function getEntities() public view returns (uint256[] memory) {
        return entities.getItems();
    }

    function getEntitiesWithValue(bytes memory value) public view returns (uint256[] memory) {
        // Return all entities with this component value
        return valueToEntities.getItems(uint256(keccak256(value)));
    }
}
