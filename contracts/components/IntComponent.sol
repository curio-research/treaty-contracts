// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import {Component} from "contracts/Component.sol";

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
