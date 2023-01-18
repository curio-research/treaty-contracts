// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {Component} from "contracts/Component.sol";
import {Position} from "contracts/libraries/Types.sol";

/// @dev Typed Components in Solidity for greater convenience

contract AddressComponent is Component {
    constructor(address _gameAddr) Component(_gameAddr) {}

    function set(uint256 _entity, address _value) public {
        set(_entity, abi.encode(_value));
    }

    function getValue(uint256 _entity) public view returns (address) {
        return abi.decode(getBytesValue(_entity), (address));
    }

    function getEntitiesWithValue(address _value) public view returns (uint256[] memory) {
        return getEntitiesWithValue(abi.encode(_value));
    }
}

contract BoolComponent is Component {
    constructor(address _gameAddr) Component(_gameAddr) {}

    function set(uint256 _entity) public {
        set(_entity, abi.encode(true));
    }

    function getValue(uint256 _entity) public view returns (bool) {
        return has(_entity);
    }

    function getEntitiesWithValue(bool _value) public view returns (uint256[] memory) {
        return _value ? getEntities() : new uint256[](0);
    }
}

contract IntComponent is Component {
    constructor(address _gameAddr) Component(_gameAddr) {}

    function set(uint256 _entity, int256 _value) public {
        set(_entity, abi.encode(_value));
    }

    function getValue(uint256 _entity) public view returns (int256) {
        return abi.decode(getBytesValue(_entity), (int256));
    }

    function getEntitiesWithValue(int256 _value) public view returns (uint256[] memory) {
        return getEntitiesWithValue(abi.encode(_value));
    }
}

contract PositionComponent is Component {
    constructor(address _gameAddr) Component(_gameAddr) {}

    function set(uint256 _entity, Position memory _value) public {
        set(_entity, abi.encode(_value));
    }

    function getValue(uint256 _entity) public view returns (Position memory) {
        return abi.decode(getBytesValue(_entity), (Position));
    }

    function getEntitiesWithValue(Position memory _value) public view returns (uint256[] memory) {
        return getEntitiesWithValue(abi.encode(_value));
    }
}

contract StringComponent is Component {
    constructor(address _gameAddr) Component(_gameAddr) {}

    function set(uint256 _entity, string memory _value) public {
        set(_entity, abi.encode(_value));
    }

    function getValue(uint256 _entity) public view returns (string memory) {
        return abi.decode(getBytesValue(_entity), (string));
    }

    function getEntitiesWithValue(string memory _value) public view returns (uint256[] memory) {
        return getEntitiesWithValue(abi.encode(_value));
    }
}

contract UintComponent is Component {
    constructor(address _gameAddr) Component(_gameAddr) {}

    function set(uint256 _entity, uint256 _value) public {
        set(_entity, abi.encode(_value));
    }

    function getValue(uint256 _entity) public view returns (uint256) {
        return abi.decode(getBytesValue(_entity), (uint256));
    }

    function getEntitiesWithValue(uint256 _value) public view returns (uint256[] memory) {
        return getEntitiesWithValue(abi.encode(_value));
    }
}

contract UintArrayComponent is Component {
    constructor(address _gameAddr) Component(_gameAddr) {}

    function set(uint256 _entity, uint256[] memory _value) public {
        set(_entity, abi.encode(_value));
    }

    function getValue(uint256 _entity) public view returns (uint256[] memory) {
        return abi.decode(getBytesValue(_entity), (uint256[]));
    }

    function getEntitiesWithValue(uint256[] memory _value) public view returns (uint256[] memory) {
        return getEntitiesWithValue(abi.encode(_value));
    }
}
