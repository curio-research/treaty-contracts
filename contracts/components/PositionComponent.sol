// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import {Position} from "contracts/libraries/Types.sol";
import {Component} from "contracts/Component.sol";

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
