// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import {Set} from "contracts/Set.sol";

/// Implementation of a Component in ECS architecture in Solidity

contract Component {
    /**
     * Sample components
     * - Health
     * - Position
     *
     * Question: Permission management for component value modification
     * Question: Is there value to having a nonce count how many components there are in an ordered fashion?
     * Question: Can `.filter()` be implemented, and if not fully, to what extent?
     * Question: TODO: implement more advanced queries
     */

    address private gameAddr; // game diamond
    Set private entities = new Set();
    mapping(uint256 => bytes) private entityToRawValueMap; // entity => raw value of entity component
    mapping(uint256 => address) private valueToEntitySetAddrMap; // value => address of set of entities with this component equal to this value

    address private NULL_ADDR = address(0);

    constructor(address _gameAddr) {
        gameAddr = _gameAddr;
    }

    /**
     * @dev Get the raw value of a specified entity.
     * @param _entity entity ID
     */
    function getRawValue(uint256 _entity) public view returns (bytes memory) {
        // Return the entity's component value
        return entityToRawValueMap[_entity];
    }

    /**
     * @dev Get all entities with this component.
     */
    function getEntities() public view returns (uint256[] memory) {
        return entities.getAll();
    }

    /**
     * @dev Get entities whose corresponding component has a specific raw value.
     * @param _rawValue raw value
     */
    function getEntitiesWithRawValue(bytes memory _rawValue) public view returns (uint256[] memory) {
        // Return all entities with this component value
        address _setAddr = valueToEntitySetAddrMap[uint256(keccak256(_rawValue))];
        if (_setAddr == NULL_ADDR) return new uint256[](0);
        return Set(_setAddr).getAll();
    }

    /**
     * @dev Get all entities with this component and all their values in the form of two arrays.
     */
    function getAllEntitiesAndRawValues() public view returns (uint256[] memory, bytes[] memory) {
        uint256[] memory _entityArray = entities.getAll();
        bytes[] memory _valueArray = new bytes[](_entityArray.length);

        for (uint256 i = 0; i < _entityArray.length; i++) {
            _valueArray[i] = entityToRawValueMap[_entityArray[i]];
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
     * @param _rawValue component value in bytes
     */
    function set(uint256 _entity, bytes memory _rawValue) public {
        entities.add(_entity);

        address _setAddr = valueToEntitySetAddrMap[uint256(keccak256(entityToRawValueMap[_entity]))];
        if (_setAddr != NULL_ADDR) Set(_setAddr).remove(_entity);

        entityToRawValueMap[_entity] = _rawValue;

        uint256 _value = uint256(keccak256(_rawValue));
        if (valueToEntitySetAddrMap[_value] == NULL_ADDR) valueToEntitySetAddrMap[_value] = address(new Set());
        Set(valueToEntitySetAddrMap[_value]).add(_entity);
    }

    /**
     * @dev Remove this component for a specified entity.
     * @param _entity entity ID
     */
    function remove(uint256 _entity) public {
        entities.remove(_entity);

        address _setAddr = valueToEntitySetAddrMap[uint256(keccak256(entityToRawValueMap[_entity]))];
        if (_setAddr != NULL_ADDR) Set(_setAddr).remove(_entity);

        delete entityToRawValueMap[_entity];
    }
}
