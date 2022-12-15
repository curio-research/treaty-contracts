// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Position} from "contracts/libraries/Types.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";
import {CurioTreaty} from "contracts/CurioTreaty.sol";

/// note: this is a minimalistic implementation of smart contract wallet
/// FIXME: not polished!!! need to update!!!

contract HangingGarden is CurioTreaty {
    address[] public owners;
    address[] public homies;
    uint256 public homieFee;

    mapping(address => bool) public isOwner;
    mapping(address => bool) public isHomie;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "You do not have access to this wallet");
        _;
    }

    constructor(
        address[] memory _owners,
        address _diamond,
        uint256 _homieFee
    ) CurioTreaty(_diamond) {
        require(_owners.length > 0, "Wallet owners required");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "Invalid wallet owner");
            require(!isOwner[owner], "Wallet owner not unique");

            isOwner[owner] = true;
            owners.push(owner);

            isHomie[owner] = true;
            homies.push(owner);
        }

        name = "HangingGarden";
        description = "A deprecated smart contract wallet for Curio";

        homieFee = _homieFee;
    }

    function executeGameTx(bytes memory _data) public onlyOwner {
        address gameFacetAddress = address(game);
        (bool success, bytes memory returndata) = gameFacetAddress.call(_data);
        require(success, string(returndata));
    }

    function executeTx(address _contractAddress, bytes memory _data) public onlyOwner {
        // FIXME: unsafe low-level call
        (bool success, bytes memory returndata) = _contractAddress.call(_data);
        require(success, string(returndata));
    }

    // ----------------------------------------------------------
    //                          POLICY
    // ----------------------------------------------------------

    function becomeAHomie(address _armyAddress) public {
        // note: msg.sender can be from anyone
        // note: msg.sender need to first approve homie fee spending
        address goldTokenAddress = address(getter.getTokenContract("Gold"));
        (bool success, ) = goldTokenAddress.call(abi.encodeWithSignature("transferFrom(address,address,uint256)", msg.sender, address(this), homieFee));
        require(success, "Fail to pay homie fee!");
        isHomie[_armyAddress] = true;
        owners.push(_armyAddress);
    }

    // FIXME: this shouldn't be in the wallet hanging garden.
    function approveMove(address _armyAddress) public view returns (bool) {
        return isHomie[_armyAddress];
    }
}
