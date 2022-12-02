// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Position} from "contracts/libraries/Types.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";

// note: this is a minimalistic implementation of smart contract wallet
contract WalletHangingGarden {
    address public diamond;
    GetterFacet public getter;
    GameFacet public game;

    address[] public owners;
    address[] public myHomies;
    uint256 homieFee;

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
    ) {
        require(_owners.length > 0, "Wallet owners required");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "Invalid wallet owner");
            require(!isOwner[owner], "Wallet owner not unique");

            isOwner[owner] = true;
            owners.push(owner);

            isHomie[owner] = true;
            owners.push(owner);
        }

        diamond = _diamond;
        getter = GetterFacet(diamond);
        game = GameFacet(diamond);

        homieFee = _homieFee;
    }

    function executeGameTx(bytes memory _data) public onlyOwner {
        // fixme: low-level call checker modified to "warn"; integrate with interface
        address gameFacetAddress = address(game);
        (bool success, bytes memory returndata) = gameFacetAddress.call(_data);
        require(success, string(returndata));
    }

    function executeTx(address _contractAddress, bytes memory _data) public onlyOwner {
        (bool success, bytes memory returndata) = _contractAddress.call(_data);
        require(success, string(returndata));
    }

    // ----------------------------------------------------------
    //                          Poicy
    // ----------------------------------------------------------

    function inquireHomieFee() public view returns (uint256) {
        return homieFee;
    }

    function becomeAHomie(address _armyAddress) public returns (bool) {
        // note: msg.sender can be from anyone
        // note: msg.sender need to first approve homie fee spending
        address goldTokenAddress = getter.getTokenContract("Gold");
        (bool success, ) = goldTokenAddress.call(abi.encodeWithSignature("transferFrom(address,address,uint256)", msg.sender, address(this), homieFee));
        require(success, "Fail to pay homie fee!");
        isHomie[_armyAddress] = true;
        owners.push(_armyAddress);
        return true;
    }

    function approveHomiesEntering(address _armyAddress) public view returns (bool) {
        return isHomie[_armyAddress];
    }
}
