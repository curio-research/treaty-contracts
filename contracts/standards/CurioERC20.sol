//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "contracts/interfaces/IERC20.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {AdminFacet} from "contracts/facets/AdminFacet.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";

contract CurioERC20 is IERC20 {
    // Token metadata
    string public name;
    string public symbol;
    uint8 public decimals;

    // Token data
    uint256 public totalSupply;

    // Game data
    address public diamond;
    uint256 public maxTransferDistance = 20; // FIXME: not currently used

    uint256 private NULL = 0;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        address _diamond
    ) {
        require(_diamond != address(0), "CurioERC20: Diamond address required");

        // Set token data
        name = _name;
        symbol = _symbol;
        decimals = _decimals;

        // Set game data
        diamond = _diamond;
    }

    modifier onlyGame() {
        require(msg.sender == diamond, "CurioERC20: Only game can call this function");
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
        return GetterFacet(diamond).getInventoryIDLoadAndBalance(_entityAddress, name);
    }

    function balanceOf(address _account) public view returns (uint256) {
        return GetterFacet(diamond).getInventoryBalance(_account, name);
    }

    function allowance(address _owner, address _spender) public view returns (uint256) {
        uint256 allowanceID = GetterFacet(diamond).getAllowance(name, GetterFacet(diamond).getEntityByAddress(_owner), GetterFacet(diamond).getEntityByAddress(_spender));
        return GetterFacet(diamond).getAmount(allowanceID);
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
        // require(GetterFacet(diamond).getDistanceByAddresses(_from, _to) <= maxTransferDistance, "CurioERC20: Too far from recipient to transfer");

        // Set transfer amount to be minimum of the amount requested and the recipient's remaining load
        uint256 transferAmount = recipientBalance + _amount <= recipientLoad ? _amount : recipientLoad - recipientBalance;

        // Update sender balance
        AdminFacet(diamond).updateInventoryAmount(senderInventoryID, senderBalance - transferAmount);

        // Re-fetch recipient balance after update
        recipientBalance = abi.decode(GetterFacet(diamond).getComponent("Amount").getBytesValue(recipientInventoryID), (uint256));

        // Update recipient balance
        AdminFacet(diamond).updateInventoryAmount(recipientInventoryID, recipientBalance + transferAmount);

        emit Transfer(_from, _to, transferAmount);
    }

    function approve(address _spender, uint256 _amount) public override returns (bool) {
        uint256 ownerID = GetterFacet(diamond).getEntityByAddress(msg.sender);
        uint256 spenderID = GetterFacet(diamond).getEntityByAddress(_spender);

        uint256 allowanceID = GetterFacet(diamond).getAllowance(name, ownerID, spenderID);
        if (allowanceID == NULL) allowanceID = AdminFacet(diamond).addAllowance(name, ownerID, spenderID);

        AdminFacet(diamond).setComponentValue("Amount", allowanceID, abi.encode(_amount));

        emit Approval(msg.sender, _spender, _amount);

        return true;
    }

    function transfer(address _to, uint256 _amount) public override returns (bool) {
        // Permission checks
        if (msg.sender != address(this)) {
            uint256 fromID = GetterFacet(diamond).getEntityByAddress(msg.sender);
            uint256 fromNationID = GetterFacet(diamond).getComponent("Nation").getEntitiesWithValue(abi.encode(fromID)).length > 0 ? fromID : GetterFacet(diamond).getNation(fromID);
            uint256 toID = GetterFacet(diamond).getEntityByAddress(_to);
            GetterFacet(diamond).treatyApprovalCheck("Transfer", fromNationID, abi.encode(toID, _amount));
        }

        _transferHelper(msg.sender, _to, _amount);

        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _amount
    ) public override returns (bool) {
        GetterFacet getter = GetterFacet(diamond);

        // Transfers from diamond, owner, or a treaty are exempt from allowance
        if (
            msg.sender != diamond && // FORMATTING: DO NOT REMOVE
            getter.getEntityByAddress(msg.sender) != getter.getNation(getter.getEntityByAddress(_from)) &&
            !_strEq(abi.decode(getter.getComponent("Tag").getBytesValue(getter.getEntityByAddress(msg.sender)), (string)), "Treaty")
        ) {
            uint256 ownerID = getter.getEntityByAddress(_from);
            uint256 spenderID = getter.getEntityByAddress(msg.sender);

            uint256 allowanceID = getter.getAllowance(name, ownerID, spenderID);
            uint256 allowed = abi.decode(getter.getComponent("Amount").getBytesValue(allowanceID), (uint256));
            require(allowed >= _amount, "CurioERC20: Insufficient allowance");
            if (allowed != type(uint256).max) AdminFacet(diamond).setComponentValue("Amount", allowanceID, abi.encode(allowed - _amount));
        }

        _transferHelper(_from, _to, _amount);

        return true;
    }

    function transferAll(address _from, address _to) public onlyGame returns (bool) {
        uint256 amount = balanceOf(_from);

        return transferFrom(_from, _to, amount);
    }

    function dripToken(address _address, uint256 _amount) public onlyGame {
        (uint256 recipientInventoryID, uint256 recipientLoad, uint256 recipientCurrentBalance) = _getInventoryIDLoadAndBalance(_address);

        uint256 dripAmount;
        if (recipientCurrentBalance + _amount <= recipientLoad) {
            dripAmount = _amount;
        } else {
            dripAmount = recipientLoad - recipientCurrentBalance;
        }

        AdminFacet(diamond).updateInventoryAmount(recipientInventoryID, recipientCurrentBalance + dripAmount);
        emit Transfer(address(0), _address, dripAmount);

        totalSupply += dripAmount;
    }

    function destroyToken(address _address, uint256 _amount) public onlyGame {
        (uint256 addressInventoryID, , uint256 addressCurrentBalance) = _getInventoryIDLoadAndBalance(_address);

        uint256 destroyAmount = _amount > addressCurrentBalance ? addressCurrentBalance : _amount;

        AdminFacet(diamond).updateInventoryAmount(addressInventoryID, addressCurrentBalance - destroyAmount);
        emit Transfer(_address, address(0), destroyAmount);

        totalSupply -= destroyAmount;
    }

    function _strEq(string memory _s1, string memory _s2) private pure returns (bool) {
        if (bytes(_s1).length != bytes(_s2).length) return false;
        return (keccak256(abi.encodePacked((_s1))) == keccak256(abi.encodePacked((_s2))));
    }
}
