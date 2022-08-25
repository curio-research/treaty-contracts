// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import {Component} from "contracts/Component.sol";

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
