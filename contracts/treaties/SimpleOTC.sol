//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {console} from "forge-std/console.sol";

struct Order {
    string sellTokenName;
    uint256 sellAmount;
    string buyTokenName;
    uint256 buyAmount;
    uint256 createdAt;
}

contract SimpleOTC is CurioTreaty {
    /** 
    Outline:
    - User puts on the sell order, specifying tokens to buy and price
    - Buyer inputs seller address and traded the token
    Storage:
    - Each player has one active sell order at most
    */

    mapping(address => Order) public addressToOrder;
    Order public emptyOrder;

    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Simple OTC Trading Agreement";
        description = "OTC Trading between players";

        emptyOrder = Order({sellTokenName: "", sellAmount: 0, buyTokenName: "", buyAmount: 0, createdAt: 0});
    }

    function createOrder(
        string memory _sellTokenName,
        uint256 _sellAmount,
        string memory _buyTokenName,
        uint256 _buyAmount
    ) public {
        require(addressToOrder[msg.sender].sellAmount == 0, "OTC: You have an existing order");
        require(_sellAmount > 0 && _buyAmount > 0, "OTC: Amounts must be greater than 0");

        addressToOrder[msg.sender] = Order({
            sellTokenName: _sellTokenName, // FORMATTING: DO NOT REMOVE THIS COMMENT
            sellAmount: _sellAmount,
            buyTokenName: _buyTokenName,
            buyAmount: _buyAmount,
            createdAt: block.timestamp
        });
    }

    function cancelOrder() public {
        require(addressToOrder[msg.sender].sellAmount > 0, "OTC: You have no existing order");
        require(block.timestamp > addressToOrder[msg.sender].createdAt + 120, "OTC: Can only cancel after 2 minutes");

        // Set order to empty
        addressToOrder[msg.sender] = emptyOrder;
    }

    function takeOrder(address _seller) public {
        require(addressToOrder[_seller].sellAmount > 0, "OTC: Seller has no existing order");

        // Fetch token pair
        Order memory targetOrder = addressToOrder[_seller];
        CurioERC20 sellToken = getter.getTokenContract(targetOrder.sellTokenName);
        CurioERC20 buyToken = getter.getTokenContract(targetOrder.buyTokenName);

        // Transfer tokens
        address buyerCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        address sellerCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(_seller)));
        sellToken.transferFrom(sellerCapitalAddress, buyerCapitalAddress, targetOrder.sellAmount);
        buyToken.transferFrom(buyerCapitalAddress, sellerCapitalAddress, targetOrder.buyAmount);
    }
}
