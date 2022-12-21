//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {console} from "forge-std/console.sol";

contract NonAggressivePact is CurioTreaty {
    CurioERC20 public goldToken;
    address deployerAddress;
    address[] public members;
    mapping(address => bool) isMember;

    uint256 goldFee;
    uint256 foodFee;

    modifier onlyOwner() {
        require(msg.sender == deployerAddress, "You do not have owner-level permission");
        _;
    }

    constructor(address _diamond, uint256 _goldFee, uint256 _foodFee) CurioTreaty(_diamond) {
        goldToken = getter.getTokenContract("Gold");
        name = "Non-Aggressive Pact";
        description = "Member nations cannot battle armies or tiles of one another";

        deployerAddress = msg.sender;

        goldFee = _goldFee;
        foodFee = _foodFee;

        members.push(msg.sender);
        isMember[msg.sender] = true;
    }

    function setGoldFee(uint256 _newGoldFee) public onlyOwner {
        goldFee = _newGoldFee;
    }

    function setFoodFee(uint256 _newFoodFee) public onlyOwner {
        foodFee = _newFoodFee;
    }

    function treatyJoin() public override {
        
    }

    function executeTx(address _contractAddress, bytes memory _data) public onlyOwner {
        // FIXME: unsafe low-level call
        (bool success, bytes memory returndata) = _contractAddress.call(_data);
        require(success, string(returndata));
    }

}