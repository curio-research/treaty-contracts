// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import {Component} from "contracts/Component.sol";

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
