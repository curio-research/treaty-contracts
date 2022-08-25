// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import {Component} from "contracts/Component.sol";

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
