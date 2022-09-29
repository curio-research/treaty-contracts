// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import {Set} from "contracts/Set.sol";

/// Implementation of a Component in ECS architecture in Solidity

contract Component {
    /**
     * Question: Permission management for value modification
     * Question: TODO: more advanced queries like `.filter()` in JS
     */

    address private gameAddr; // game diamond
    Set immutable emptySet = new Set();
    Set private entities = new Set();
    mapping(uint256 => bytes) private entityToValueMap; // entity => value of entity component
    mapping(uint256 => address) private valueToEntitySetAddrMap; // value => address of set of entities with this component equal to this value

    address private NULL_ADDR = address(0);

    constructor(address _gameAddr) {
        gameAddr = _gameAddr;
    }

    /**
     * @dev Get the value of a specified entity.
     * @param _entity entity ID
     */
    function getBytesValue(uint256 _entity) public view returns (bytes memory) {
        return entityToValueMap[_entity];
    }

    /**
     * @dev Get all entities with this component.
     */
    function getEntities() public view returns (uint256[] memory) {
        return entities.getAll();
    }

    /**
     * @dev Get all entities with this component as a set.
     */
    function getEntitiesAsSet() public view returns (Set) {
        return entities;
    }

    /**
     * @dev Get entities whose corresponding component has a specific value.
     * @param _value bytes value
     */
    function getEntitiesWithValue(bytes memory _value) public view returns (uint256[] memory) {
        // Return all entities with this component value
        return getEntitiesWithValueAsSet(_value).getAll();
    }

    /**
     * @dev Get entities whose corresponding component has a specific value. Returns as a set
     * @param _value bytes value
     */
    function getEntitiesWithValueAsSet(bytes memory _value) public view returns (Set) {
        // Return all entities with this component value
        address setAddr = valueToEntitySetAddrMap[uint256(keccak256(_value))];
        if (setAddr == NULL_ADDR) return emptySet;
        return Set(setAddr);
    }

    /**
     * @dev Get all entities with this component and all their values in the form of two arrays.
     */
    function getAllEntitiesAndValues() public view returns (uint256[] memory, bytes[] memory) {
        uint256[] memory entityArray = entities.getAll();
        bytes[] memory valueArray = new bytes[](entityArray.length);

        for (uint256 i = 0; i < entityArray.length; i++) {
            valueArray[i] = entityToValueMap[entityArray[i]];
        }

        return (entityArray, valueArray);
    }

    /**
     * @dev Check whether a specified entity has this component.
     * @param _entity entity ID
     */
    function has(uint256 _entity) public view returns (bool) {
        return entities.includes(_entity);
    }

    /**
     * @dev Assign a raw value to this component for a specified entity.
     * @param _entity entity ID
     * @param _value component value in bytes
     */
    function set(uint256 _entity, bytes memory _value) public {
        entities.add(_entity);

        address setAddr = valueToEntitySetAddrMap[uint256(keccak256(entityToValueMap[_entity]))];
        if (setAddr != NULL_ADDR) Set(setAddr).remove(_entity);

        entityToValueMap[_entity] = _value;

        uint256 _intValue = uint256(keccak256(_value));
        if (valueToEntitySetAddrMap[_intValue] == NULL_ADDR) valueToEntitySetAddrMap[_intValue] = address(new Set());
        Set(valueToEntitySetAddrMap[_intValue]).add(_entity);
    }

    /**
     * @dev Remove this component for a specified entity.
     * @param _entity entity ID
     */
    function remove(uint256 _entity) public {
        entities.remove(_entity);

        address setAddr = valueToEntitySetAddrMap[uint256(keccak256(entityToValueMap[_entity]))];
        if (setAddr != NULL_ADDR) Set(setAddr).remove(_entity);

        delete entityToValueMap[_entity];
    }
}
