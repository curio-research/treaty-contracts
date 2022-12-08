//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {AdminFacet} from "contracts/facets/AdminFacet.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";
import {console} from "forge-std/console.sol";

contract CurioERC20 is ERC20 {
    address public diamond;
    GetterFacet public getter;
    AdminFacet public admin;
    GameFacet public game;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        address _diamond
    ) ERC20(_name, _symbol, _decimals) {
        require(_diamond != address(0), "CurioERC20: Diamond address required");

        diamond = _diamond;
        getter = GetterFacet(diamond);
        admin = AdminFacet(diamond);
        game = GameFacet(diamond);
    }

    modifier onlyGame() {
        require(msg.sender == address(game) || msg.sender == address(admin), "CURIO: Only game can call this function");
        _;
    }

    function _getInventoryIDMaxLoadAndBalance(address _entityAddress)
        private
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return getter.getInventoryIDMaxLoadAndBalance(_entityAddress, name);
    }

    // FIXME: solmate doesn't have balanceOf
    function checkBalanceOf(address _entityAddress) public view returns (uint256) {
        return getter.getInventoryBalance(_entityAddress, name);
    }

    function _transferHelper(
        address _from,
        address _to,
        uint256 _amount
    ) private {
        (uint256 senderInventoryID, , uint256 senderBalance) = _getInventoryIDMaxLoadAndBalance(_from);
        (uint256 recipientInventoryID, uint256 recipientMaxLoad, uint256 recipientBalance) = _getInventoryIDMaxLoadAndBalance(_to);
        require(senderInventoryID != 0 && recipientInventoryID != 0, "CurioERC20: In-game inventory not found");
        require(senderBalance >= _amount, "CurioERC20: Sender insufficent balance");

        uint256 transferAmount;
        if (recipientMaxLoad == 0 || recipientBalance + _amount <= recipientMaxLoad) {
            transferAmount = _amount;
        } else {
            transferAmount = recipientMaxLoad - recipientBalance;
        }

        admin.updateInventoryAmount(senderInventoryID, senderBalance - transferAmount);
        admin.updateInventoryAmount(recipientInventoryID, recipientBalance + transferAmount);
        emit Transfer(_from, _to, transferAmount);
    }

    function transfer(address _to, uint256 _amount) public override returns (bool) {
        _transferHelper(msg.sender, _to, _amount);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _amount
    ) public override returns (bool) {
        // uint256 allowed = allowance[_from][msg.sender];
        // require(allowed >= _amount, "CurioERC20: Insufficient allowance");
        // if (allowed != type(uint256).max) allowance[_from][msg.sender] = allowed - _amount;

        _transferHelper(_from, _to, _amount);
        return true;
    }

    function transferAll(address _from, address _to) public onlyGame returns (bool) {
        uint256 amount = checkBalanceOf(_from);

        // uint256 allowed = allowance[_from][msg.sender];
        // require(allowed >= amount, "CurioERC20: Insufficient allowance");
        // if (allowed != type(uint256).max) allowance[_from][msg.sender] = allowed - amount;

        _transferHelper(_from, _to, amount);
        return true;
    }

    function dripToken(address _address, uint256 _amount) public onlyGame {
        (uint256 recipientInventoryID, uint256 recipientMaxLoad, uint256 recipientCurrentBalance) = _getInventoryIDMaxLoadAndBalance(_address);
        console.log("haha");

        uint256 dripAmount;
        if (recipientMaxLoad == 0 || recipientCurrentBalance + _amount <= recipientMaxLoad) {
            dripAmount = _amount;
        } else {
            dripAmount = recipientMaxLoad - recipientCurrentBalance;
        }

        admin.updateInventoryAmount(recipientInventoryID, recipientCurrentBalance + dripAmount);
        console.log("got it");
        emit Transfer(address(0), _address, dripAmount);

        totalSupply += dripAmount;
    }

    function destroyToken(address _address, uint256 _amount) public onlyGame {
        (uint256 addressInventoryID, , uint256 addressCurrentBalance) = _getInventoryIDMaxLoadAndBalance(_address);

        uint256 destroyAmount = _amount > addressCurrentBalance ? addressCurrentBalance : _amount;

        admin.updateInventoryAmount(addressInventoryID, addressCurrentBalance - destroyAmount);
        emit Transfer(_address, address(0), destroyAmount);

        totalSupply -= destroyAmount;
    }
}
