// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.13;
import {Component} from "contracts/Component.sol";
import {LinkedList} from "lib/memmove/src/LinkedList.sol";
import {QueryType} from "contracts/libraries/Types.sol";

// For ProxyRead and ProxyExpand QueryFragments:
// - component must be a component whose raw value decodes to a single uint256
// - value must decode to a single uint256 represents the proxy depth
struct QueryFragment {
    QueryType queryType;
    Component component;
    bytes value;
}
