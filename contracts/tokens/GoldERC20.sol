//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {AdminFacet} from "contracts/facets/AdminFacet.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";
import {console} from "forge-std/console.sol";

contract GoldERC20 is ERC20 {
    /// Outline:
    /// - approve
    /// - transfer
    /// - transferFrom
    /// - permit
    /// - _mint (internal)
    /// - _burn (internal)

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
        diamond = _diamond;
        getter = GetterFacet(diamond);
        admin = AdminFacet(diamond);
        game = GameFacet(diamond);
    }

    modifier onlyGame() {
        require(msg.sender == address(game) || msg.sender == address(admin), "CURIO: Function can only be called by the game");
        _;
    }

    function _getInventoryIDMaxLoadAndBalance(address _entityAddress) internal view returns (uint256, uint256, uint256) {
        return getter.getInventoryIDMaxLoadAndBalance(_entityAddress, "Gold");
    }

    // fixme: solmate doesn't have balanceOf ...? (then how is it compatible with popular platforms)
    function checkBalanceOf(address _entityAddress) public view returns (uint256) {
        return getter.getInventoryBalance(_entityAddress, "Gold");
    }

    function _transferHelper(
        address _to,
        address _from,
        uint256 _amount,
        uint256 _senderInventoryID,
        uint256 _recipientInventoryID,
        uint256 _senderBalance,
        uint256 _recipientBalance,
        uint256 _recipientMaxLoad) internal {
         if (_recipientMaxLoad == 0 || _recipientBalance + _amount <= _recipientMaxLoad) {
            admin.updateInventoryAmount(_senderInventoryID, _senderBalance - _amount);
            admin.updateInventoryAmount(_recipientInventoryID, _recipientBalance + _amount);
            emit Transfer(_from, _to, _amount);
        } else {
            admin.updateInventoryAmount(_senderInventoryID, _senderBalance - (_recipientMaxLoad - _recipientBalance));
            admin.updateInventoryAmount(_recipientInventoryID, _recipientMaxLoad);
            emit Transfer(_from, _to, _recipientMaxLoad - _recipientBalance);
        }
    }

    function transfer(address _to, uint256 _amount) public override returns (bool) {
        (uint256 recipientInventoryID, uint256 recipientMaxLoad, uint256 recipientCurrentBalance) = _getInventoryIDMaxLoadAndBalance(_to);
        (uint256 senderInventoryID,, uint256 senderCurrentBalance) = _getInventoryIDMaxLoadAndBalance(msg.sender);
        require(recipientInventoryID != 0 && senderInventoryID != 0, "In-game inventory unfound");
        require(senderCurrentBalance >= _amount, "Sender does not have enough balance");

        _transferHelper(_to, msg.sender, _amount, senderInventoryID, recipientInventoryID, senderCurrentBalance, recipientCurrentBalance, recipientMaxLoad);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _amount
    ) public override onlyGame returns (bool) {
        // note: copy paste erc20 standard lines;
        // todo: should these data be stored in ECS ???
        uint256 allowed = allowance[_from][msg.sender]; // Saves gas for limited approvals.
        if (allowed != type(uint256).max) allowance[_from][msg.sender] = allowed - _amount;

        (uint256 recipientInventoryID, uint256 recipientMaxLoad, uint256 recipientCurrentBalance) = _getInventoryIDMaxLoadAndBalance(_to);
        (uint256 senderInventoryID,, uint256 senderCurrentBalance) = _getInventoryIDMaxLoadAndBalance(_from);
        require(recipientInventoryID != 0 && senderInventoryID != 0, "In-game inventory unfound");
        require(senderCurrentBalance >= _amount, "Sender does not have enough balance");

        _transferHelper(_to, _from, _amount, senderInventoryID, recipientInventoryID, senderCurrentBalance, recipientCurrentBalance, recipientMaxLoad);
    }

    function transferAll(address _from, address _to) public onlyGame returns (bool) {
        uint256 amount = checkBalanceOf(_from);
        // note: copy paste erc20 standard lines;
        // todo: should these data be stored in ECS ???
        uint256 allowed = allowance[_from][msg.sender]; // Saves gas for limited approvals.
        if (allowed != type(uint256).max) allowance[_from][msg.sender] = allowed - amount;

        (uint256 recipientInventoryID, uint256 recipientMaxLoad, uint256 recipientCurrentBalance) = _getInventoryIDMaxLoadAndBalance(_to);
        (uint256 senderInventoryID,, uint256 senderCurrentBalance) = _getInventoryIDMaxLoadAndBalance(_from);
        require(recipientInventoryID != 0 && senderInventoryID != 0, "In-game inventory unfound");

        _transferHelper(_to, _from, amount, senderInventoryID, recipientInventoryID, senderCurrentBalance, recipientCurrentBalance, recipientMaxLoad);
    }

    // rewards unrestricted by distance
    function dripToken(address _address, uint256 _amount) public onlyGame {
        // note: copy paste erc20 standard lines;
        totalSupply += _amount;
        (uint256 recipientInventoryID, uint256 recipientMaxLoad, uint256 recipientCurrentBalance) = _getInventoryIDMaxLoadAndBalance(_address);
        if (recipientMaxLoad == 0 || recipientCurrentBalance + _amount <= recipientMaxLoad) {
            admin.updateInventoryAmount(recipientInventoryID, recipientCurrentBalance + _amount);
            emit Transfer(address(0), _address, _amount);
        } else {
            admin.updateInventoryAmount(recipientInventoryID, recipientMaxLoad);
            emit Transfer(address(0), _address, recipientMaxLoad - recipientCurrentBalance);
        }
    }

    // costs unrestricted by distance
    function destroyToken(address _address, uint256 _amount) public onlyGame {
        // note: copy paste erc20 standard lines;
        totalSupply -= _amount;
        (uint256 addressInventoryID,, uint256 addressCurrentBalance) = _getInventoryIDMaxLoadAndBalance(_address);
        admin.updateInventoryAmount(addressInventoryID, addressCurrentBalance - _amount);
        emit Transfer(address(0), _address, _amount);
    }
}
