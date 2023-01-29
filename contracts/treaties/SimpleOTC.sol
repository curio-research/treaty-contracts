//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";

struct Order {
    string sellTokenName;
    uint256 sellAmount;
    string buyTokenName;
    uint256 buyAmount;
    uint256 createdAt;
}

/// @notice Each player has one active sell order at most
contract SimpleOTC is CurioTreaty {
    mapping(address => Order) public addressToOrder;
    Order public emptyOrder;

    function init(address _diamond) public override {
        super.init(_diamond);
        emptyOrder = Order({sellTokenName: "", sellAmount: 0, buyTokenName: "", buyAmount: 0, createdAt: 0});
    }

    // ----------------------------------------------------------
    // Owner functions
    // ----------------------------------------------------------
    function name() external pure override returns (string memory) {
        return "Simple OTC Trading Agreement";
    }

    function description() external pure override returns (string memory) {
        return "OTC Trading between players";
    }

    /**
     * @dev Create an order. Must be called by a nation.
     * @param _sellTokenName name of the token to sell
     * @param _sellAmount amount of the token to sell
     * @param _buyTokenName name of the token to buy
     * @param _buyAmount amount of the token to buy
     */
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

    /**
     * @dev Cancel an order. Must be called by a nation.
     */
    function cancelOrder() public {
        require(addressToOrder[msg.sender].sellAmount > 0, "OTC: You have no existing order");
        require(block.timestamp > addressToOrder[msg.sender].createdAt + 120, "OTC: Can only cancel after 2 minutes");

        // Set order to empty
        addressToOrder[msg.sender] = emptyOrder;
    }

    /**
     * @dev Take an order and complete the transfers. Must be called by a nation.
     * @param _seller address of the seller
     */
    function takeOrder(address _seller) public {
        GetterFacet getter = GetterFacet(diamond);
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

        // Remove order
        addressToOrder[_seller] = emptyOrder;
    }
}
