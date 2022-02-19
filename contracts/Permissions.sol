//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Permissions {
    mapping(address => bool) contractPerms; // immutable after initialization
    mapping(address => bool) playerPerms;
    address owner;

    modifier onlyOwner {
        require(msg.sender == owner, "only owner can perform this operation.");
        _;
    }

    // constructor() 
    // {
    //     for (uint256 i = 0; i < _contractWhitelist.length; i++) {
    //         contractPerms[_contractWhitelist[i]] = true;
    //     }
    //     for (uint256 i = 0; i < _playerWhitelist.length; i++) {
    //         playerPerms[_playerWhitelist[i]] = true;
    //     }
    // }

    function _addPlayerPermission(address _player) public onlyOwner {
        playerPerms[_player] = true;
    }

    function _removePlayerPermission(address _player) public onlyOwner {
        playerPerms[_player] = false;
    }

    function _addContractPermission(address _player) public {
        playerPerms[_player] = true;
    }

    function _removeContractPermission(address _player) public {
        playerPerms[_player] = false;
    }

    function _hasContractPermission(address _contract) public view returns (bool) {
        return contractPerms[_contract];
    }

    function _hasPlayerPermission(address _player) public view returns (bool) {
        return playerPerms[_player];
    }
}