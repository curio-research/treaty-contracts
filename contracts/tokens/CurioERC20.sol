//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {AdminFacet} from "contracts/facets/AdminFacet.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {console} from "forge-std/console.sol";

contract CurioERC20 is ERC20 {
    address public diamond;
    GetterFacet public getter;
    AdminFacet public admin;
    GameFacet public game;
    uint256 public maxTransferDistance = 20; // FIXME: move back to WorldConstants

    uint256 private NULL = 0;

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
        require(msg.sender == diamond, "CURIO: Only game can call this function");
        _;
    }

    function _getInventoryIDLoadAndBalance(address _entityAddress)
        private
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return getter.getInventoryIDLoadAndBalance(_entityAddress, name);
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
        (uint256 senderInventoryID, , uint256 senderBalance) = _getInventoryIDLoadAndBalance(_from);
        (uint256 recipientInventoryID, uint256 recipientLoad, uint256 recipientBalance) = _getInventoryIDLoadAndBalance(_to);
        require(senderInventoryID != NULL && recipientInventoryID != NULL, "CurioERC20: In-game inventory not found");
        require(senderBalance >= _amount, "CurioERC20: Sender insufficent balance");
        // require(getter.getDistanceByAddresses(_from, _to) <= maxTransferDistance, "CurioERC20: Too far from recipient to transfer");

        uint256 transferAmount;
        if (recipientBalance + _amount <= recipientLoad) {
            transferAmount = _amount;
        } else {
            transferAmount = recipientLoad - recipientBalance;
        }

        admin.updateInventoryAmount(senderInventoryID, senderBalance - transferAmount);
        admin.updateInventoryAmount(recipientInventoryID, recipientBalance + transferAmount);
        emit Transfer(_from, _to, transferAmount);
    }

    function transfer(address _to, uint256 _amount) public override returns (bool) {
        // Permission checks
        // Note: Here it additionally checks armies under the senderNation and the recipientNation
        if (msg.sender != address(this)) {
            uint256 callerID = getter.getEntityByAddress(msg.sender);
            uint256 recipientID = getter.getEntityByAddress(_to);
            address recipientNation = GameLib.strEq(getter.getTag(recipientID), "Nation")? _to : getter.getAddress(getter.getNation(recipientID));
            if (GameLib.strEq(getter.getTag(callerID), "Nation")) {
                getter.treatyApprovalCheck("Transfer", callerID, abi.encode(recipientNation, _amount));
            } else {
                getter.treatyApprovalCheck("Transfer", getter.getNation(callerID), abi.encode(recipientNation, _amount));
            }
        }
        _transferHelper(msg.sender, _to, _amount);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _amount
    ) public override returns (bool) {
        // fixme: should add back onlyGame modifier?

        // Transfers from diamond or owner are exempt from allowance
        if (msg.sender != diamond && getter.getEntityByAddress(msg.sender) != getter.getNation(getter.getEntityByAddress(_from))) {
            uint256 allowed = allowance[_from][msg.sender];
            require(allowed >= _amount, "CurioERC20: Insufficient allowance");
            if (allowed != type(uint256).max) allowance[_from][msg.sender] = allowed - _amount;
        }

        _transferHelper(_from, _to, _amount);
        return true;
    }

    function transferAll(address _from, address _to) public onlyGame returns (bool) {
        // fixme: should add back onlyGame modifier?

        uint256 amount = checkBalanceOf(_from);

        if (msg.sender != diamond) {
            uint256 allowed = allowance[_from][msg.sender];
            require(allowed >= amount, "CurioERC20: Insufficient allowance");
            if (allowed != type(uint256).max) allowance[_from][msg.sender] = allowed - amount;
        }

        _transferHelper(_from, _to, amount);
        return true;
    }

    function dripToken(address _address, uint256 _amount) public onlyGame {
        (uint256 recipientInventoryID, uint256 recipientLoad, uint256 recipientCurrentBalance) = _getInventoryIDLoadAndBalance(_address);

        uint256 dripAmount;
        if (recipientCurrentBalance + _amount <= recipientLoad) {
            dripAmount = _amount;
        } else {
            dripAmount = recipientLoad - recipientCurrentBalance;
        }

        admin.updateInventoryAmount(recipientInventoryID, recipientCurrentBalance + dripAmount);
        emit Transfer(address(0), _address, dripAmount);

        totalSupply += dripAmount;
    }

    function destroyToken(address _address, uint256 _amount) public onlyGame {
        (uint256 addressInventoryID, , uint256 addressCurrentBalance) = _getInventoryIDLoadAndBalance(_address);

        uint256 destroyAmount = _amount > addressCurrentBalance ? addressCurrentBalance : _amount;

        admin.updateInventoryAmount(addressInventoryID, addressCurrentBalance - destroyAmount);
        emit Transfer(_address, address(0), destroyAmount);

        totalSupply -= destroyAmount;
    }
}
