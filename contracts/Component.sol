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
    Set private entities = new Set();
    mapping(uint256 => bytes) private entityToValueMap; // entity => raw value of entity component
    mapping(uint256 => address) private valueToEntitySetAddrMap; // value => address of set of entities with this component equal to this value

    address private NULL_ADDR = address(0);

    constructor(address _gameAddr) {
        gameAddr = _gameAddr;
    }

    /**
     * @dev Get the raw value of a specified entity.
     * @param _entity entity ID
     */
    function getValue(uint256 _entity) public view returns (bytes memory) {
        // Return the entity's component value
        return entityToValueMap[_entity];
    }

    /**
     * @dev Get all entities with this component.
     */
    function getEntities() public view returns (uint256[] memory) {
        return entities.getAll();
    }

    /**
     * @dev Get entities whose corresponding component has a specific raw value.
     * @param _value raw value
     */
    function getEntitiesWithValue(bytes memory _value) public view returns (uint256[] memory) {
        // Return all entities with this component value
        address _setAddr = valueToEntitySetAddrMap[uint256(keccak256(_value))];
        if (_setAddr == NULL_ADDR) return new uint256[](0);
        return Set(_setAddr).getAll();
    }

    /**
     * @dev Get all entities with this component and all their values in the form of two arrays.
     */
    function getAllEntitiesAndValues() public view returns (uint256[] memory, bytes[] memory) {
        uint256[] memory _entityArray = entities.getAll();
        bytes[] memory _valueArray = new bytes[](_entityArray.length);

        for (uint256 i = 0; i < _entityArray.length; i++) {
            _valueArray[i] = entityToValueMap[_entityArray[i]];
        }

        return (_entityArray, _valueArray);
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

        address _setAddr = valueToEntitySetAddrMap[uint256(keccak256(entityToValueMap[_entity]))];
        if (_setAddr != NULL_ADDR) Set(_setAddr).remove(_entity);

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

        address _setAddr = valueToEntitySetAddrMap[uint256(keccak256(entityToValueMap[_entity]))];
        if (_setAddr != NULL_ADDR) Set(_setAddr).remove(_entity);

        delete entityToValueMap[_entity];
    }
}
