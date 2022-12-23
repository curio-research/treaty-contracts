//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {console} from "forge-std/console.sol";

contract SimpleOrderBook is CurioTreaty {
    /**
    Outline
    - Order:
        - owner
        - token1
        - token2
        - price
        - amount (token1)
    - mapping(address => string[]) addrToTokenPairs
      records the existing pairs of a player
    - function addOrder(token1, token2, price, amount) {}
        - one person can add one type of pair only
    - function removeOrder
    - function limitBuy(token, priceLimit, amount) {}
        - loop through existing orders and fill as much as possible
        - trading tokens held by orderbook until order owner withdraw them 
    - function retrieveFromOrder(token1, token2) {}
        - order owner retrieves everything (filled and unfilled)
        - removeOrder
    **/
    address public deployerAddress;
    mapping(address => string[]) public addrToTokenPair;
    

    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Economic Sanction League";
        description = "Owner of the League can point to which nation the league is sanctioning";

        deployerAddress = msg.sender;
    }


}