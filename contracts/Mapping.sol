//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Mapping {
    mapping(uint256 => bool) public val;

    function set(uint256 _idx, bool _val) public {
        val[_idx] = _val;
    }
}
