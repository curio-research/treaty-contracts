//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";

import {console} from "forge-std/console.sol";

contract SimpleOTC is CurioTreaty {
    /** 
    Outline:
    - User puts on the sell order, specifying tokens to buy and price
    - Buyer inputs seller address and traded the token
    Storage:
    - Each player has one active sell order at most
    */

    mapping(address => SellOrder) addrToSellOrder;
    mapping(address => bool) addrHasSellOrder;

    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Simple OTC Trading Agreement";
        description = "OTC Trading between players";
    }

    struct SellOrder {
        string sellTokenName;
        string buyTokenName;
        uint256 sellTokenPrice;
        uint256 sellTokenAmount;
        uint256 startTimestamp;
    }

    function getTokenContract(string memory _tokenName) internal returns (CurioERC20) {
        require((GameLib.strEq(_tokenName, "Gold") || GameLib.strEq(_tokenName, "Food") || GameLib.strEq(_tokenName, "Horseman") || GameLib.strEq(_tokenName, "Warrior") || GameLib.strEq(_tokenName, "Slinger") || GameLib.strEq(_tokenName, "Guard")), "OrderBook: Token Doesn't exist in the game");
        CurioERC20 token = getter.getTokenContract(_tokenName);
        return token;
    }

    function createSellOrder(
        string memory _sellTokenName,
        string memory _buyTokenName,
        uint256 _sellTokenPrice,
        uint256 _sellTokenAmount
    ) public {
        require(!addrHasSellOrder[msg.sender], "OTC: You have an existing order");
        CurioERC20 sellToken = getTokenContract(_sellTokenName);
        address sellerCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        sellToken.transferFrom(sellerCapitalAddress, address(this), _sellTokenAmount);

        addrHasSellOrder[msg.sender] = true;
        addrToSellOrder[msg.sender] = SellOrder({sellTokenName: _sellTokenName, buyTokenName: _buyTokenName, sellTokenPrice: _sellTokenPrice, sellTokenAmount: _sellTokenAmount, startTimestamp: block.timestamp});
    }

    function cancelSellOrder() public {
        require(addrHasSellOrder[msg.sender], "OTC: You don't have an existing order");
        require(block.timestamp - addrToSellOrder[msg.sender].startTimestamp > 120, "OTC: Order was created within the last 2 minutes");

        SellOrder memory targetOrder = addrToSellOrder[msg.sender];
        CurioERC20 sellToken = getTokenContract(targetOrder.sellTokenName);
        address sellerCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));

        sellToken.transfer(sellerCapitalAddress, targetOrder.sellTokenAmount);

        addrHasSellOrder[msg.sender] = false;
    }

    function buyOrder(address _seller) public {
        require(addrHasSellOrder[_seller], "OTC: Seller doesn't have an existing order");
        SellOrder memory targetOrder = addrToSellOrder[_seller];
        CurioERC20 sellToken = getTokenContract(targetOrder.sellTokenName);
        CurioERC20 buyToken = getTokenContract(targetOrder.buyTokenName);

        address buyerCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        address sellerCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(_seller)));
        sellToken.transfer(buyerCapitalAddress, targetOrder.sellTokenAmount);
        buyToken.transferFrom(buyerCapitalAddress, sellerCapitalAddress, targetOrder.sellTokenAmount * targetOrder.sellTokenPrice);

        addrHasSellOrder[_seller] = false;
    }
}
