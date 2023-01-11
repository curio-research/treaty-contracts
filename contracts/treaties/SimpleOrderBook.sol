//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";

import {console} from "forge-std/console.sol";

// contract SimpleOrderBook is CurioTreaty {
//     /**
//     Outline
//     - Order:
//         - owner
//         - token1
//         - token2
//         - price
//         - amount (token1)
//     - mapping(address => string[]) addrToTokenPairs
//       records the existing pairs of a player
//     - function createOrder(token1, token2, price, amount) {}
//         - one person can add one type of pair only
//     - function removeOrder
//     - function limitBuy(token, priceLimit, amount) {}
//         - loop through existing orders and fill as much as possible
//         - trading tokens held by orderbook until order owner withdraw them 
//     - function retrieveFromOrder(token1, token2) {}
//         - order owner retrieves everything (filled and unfilled)
//         - removeOrder
//     **/
//     // CurioERC20 public goldToken;
//     // CurioERC20 public foodToken;
//     // CurioERC20 public horsemanToken;
//     // CurioERC20 public slingerToken;
//     // CurioERC20 public warriorToken;
//     // CurioERC20 public guardToken;

//     address public deployerAddress;
//     mapping(address => mapping(string => bool)) userHasCreatedOrderType;
//     mapping(string => Order[]) orderTypeToOders;
    
//     constructor(address _diamond) CurioTreaty(_diamond) {
//         name = "Simple Order Book";
//         description = "A simple implementation of onchain order book";

//         deployerAddress = msg.sender;
//     }

//     // ----------------------------------------------------------
//     // Articles of Treaty
//     // ----------------------------------------------------------

//     struct Order{
//         address owner;
//         uint256 token1Price;
//         uint256 token1Amount;
//     }

//     function getTokenContract(string memory _tokenName) internal {
//         require (
//                 (GameLib.strEq(_tokenName, "Gold") ||
//                 GameLib.strEq(_tokenName, "Food") ||
//                 GameLib.strEq(_tokenName, "Horseman") ||
//                 GameLib.strEq(_tokenName, "Warrior") ||
//                 GameLib.strEq(_tokenName, "Slinger") ||
//                 GameLib.strEq(_tokenName, "Guard")),
//                 "OrderBook: Token Doesn't exist in the game"
//             );
//         CurioERC20 token = getter.getTokenContract(_tokenName);
//         return token;
//     }

//     function createOrder(
//         string memory _token1Name,
//         string memory _token2Name,
//         uint256 _token1Price,
//         uint256 _token1amount) public {
//         string memory orderType = string.concat(_token1Name, _token2Name);
//         require(!userHasCreatedOrderType[msg.sender][orderType], "OrderBook: You have created this order type");
//         userHasCreatedOrderType[msg.sender][orderType] = true;

//         // note: use insertion sort here bc array size is limited by #player
//         Order memory newOrder = Order({owner: msg.sender, token1Price: _token1Price, token1Amount: _token1amount});
//         Order[] memory newArrayOrders;
//         for (uint256 i = 0; i < orderTypeToOders[orderType].length; i++) {
//             Order memory existingOrder = orderTypeToOders[i];
//             if (existingOrder.token1Price < _token1Price) {
//                 newArrayOrders.push(newOrder);
//                 newArrayOrders.push(existingOrder);
//                 break;
//             } else {
//                 newArrayOrders.push(existingOrder);
//             }
//         }
//         orderTypeToOders[orderType] = newArrayOrders;

//         CurioERC20 token1 = getTokenContract(_token1Name);

//         token1.transferFrom(msg.sender, address(this), _token1amount);
//     }

//     function cancelOrder(
//         string memory _token1Name,
//         string memory _token2Name) {
//             string memory orderType = string.concat(_token1Name, _token2Name);
//             require(userHasCreatedOrderType[msg.sender][orderType], "OrderBook: You have not created this order type");
//             userHasCreatedOrderType[msg.sender][orderType] = false;

//             for (uint256 i = 0; i < orderTypeToOders[orderType].length; i++) {
//                 Order memory existingOrder = orderTypeToOders[orderType][i];
//                 if (existingOrder.owner == msg.sender) {
//                     orderTypeToOders[orderType][i] = orderTypeToOders[orderType][orderTypeToOders[orderType].length - 1];
//                     orderTypeToOders[orderType].pop();
//                     CurioERC20 token = getTokenContract(_token1Name);
//                     token.transfer(msg.sender, orderTypeToOders[orderType][i].amount);
//                     return;
//                 }
//             }
//         }

//     function limitBuyOrder(
//         string memory _token1Name,
//         string memory _token2Name,
//         uint256 _amount
//     ) {
//         // note: this function does not 
//         string memory orderType = string.concat(_token1Name, _token2Name);
//         for (uint256 i = 0; i < orderTypeToOders[orderType].length; i++) {
//                 Order memory existingOrder = orderTypeToOders[orderType][i];
                
//             }
//     }

// }