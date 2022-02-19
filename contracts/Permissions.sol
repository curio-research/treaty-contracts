//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Permissions {
    mapping(address => bool) contractPerms; // immutable after initialization
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can perform this operation.");
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    function setPermission(address _contract, bool _permission)
        public
        onlyOwner
    {
        contractPerms[_contract] = _permission;
    }

    function _hasContractPermission(address _contract)
        public
        view
        returns (bool)
    {
        return contractPerms[_contract];
    }
}
