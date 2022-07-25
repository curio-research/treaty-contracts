//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Component} from "contracts/libraries/Component.sol";

contract HealthComponent is Component {
    constructor(address _world) Component(_world) {}

    function getValue() returns (uint256) {
        // fetc hfrom the set mapping entityIDToValue
        // returns it
    }
}
