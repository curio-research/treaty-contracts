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


contract HorsemanERC20 is ERC20 {
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

    function _getAddressMaxLoadAndBalance(address _entityAddress) internal returns (uint256, uint256) {
        return getter.getAddressMaxLoadAndBalance(_entityAddress, "Horseman");
    }

    // fixme: solmate doesn't have balanceOf ...? (then how is it compatible with popular platforms)
    function checkBalanceOf(address _entityAddress) public returns (uint256) {
        return getter.getInventoryBalance(_entityAddress, "Horseman");
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

        (uint256 recipientMaxLoad, uint256 recipientCurrentBalance) = _getAddressMaxLoadAndBalance(_to);
        if (recipientMaxLoad == 0 || recipientCurrentBalance + _amount <= recipientMaxLoad) {
            admin.updateInventoryAmount(_from, "Horseman", _amount, false);
            admin.updateInventoryAmount(_to, "Horseman", _amount, true);
            emit Transfer(_from, _to, _amount);
            return true;
        } else {
            admin.updateInventoryAmount(_from, "Horseman", recipientMaxLoad - recipientCurrentBalance, false);
            admin.updateInventoryAmount(_to, "Horseman", recipientMaxLoad - recipientCurrentBalance, true);
            emit Transfer(_from, _to, recipientMaxLoad - recipientCurrentBalance);
            return true;
        }
    }

    function transferAll(address _from, address _to) public onlyGame returns (bool) {
        uint256 amount = getter.getInventoryBalance(_from, "Horseman");
        // note: copy paste erc20 standard lines;
        // todo: should these data be stored in ECS ???
        uint256 allowed = allowance[_from][msg.sender]; // Saves gas for limited approvals.
        if (allowed != type(uint256).max) allowance[_from][msg.sender] = allowed - amount;

        (uint256 recipientMaxLoad, uint256 recipientCurrentBalance) = _getAddressMaxLoadAndBalance(_to);
        if (recipientMaxLoad == 0 || recipientCurrentBalance + amount <= recipientMaxLoad) {
            admin.updateInventoryAmount(_from, "Horseman", amount, false);
            admin.updateInventoryAmount(_to, "Horseman", amount, true);
            emit Transfer(_from, _to, amount);
            return true;
        } else {
            admin.updateInventoryAmount(_from, "Horseman", recipientMaxLoad - recipientCurrentBalance, false);
            admin.updateInventoryAmount(_to, "Horseman", recipientMaxLoad - recipientCurrentBalance, true);
            emit Transfer(_from, _to, recipientMaxLoad - recipientCurrentBalance);
            return true;
        }
    }

    // rewards unrestricted by distance
    function dripToken(address _address, uint256 _amount) public onlyGame {
        // note: copy paste erc20 standard lines;
        totalSupply += _amount;
        (uint256 recipientMaxLoad, uint256 recipientCurrentBalance) = _getAddressMaxLoadAndBalance(_address);
        if (recipientMaxLoad == 0 || recipientCurrentBalance + _amount <= recipientMaxLoad) {
            admin.updateInventoryAmount(_address, "Horseman", _amount, true);
            emit Transfer(address(0), _address, _amount);
        } else {
            admin.updateInventoryAmount(_address, "Horseman", recipientMaxLoad - recipientCurrentBalance, true);
            emit Transfer(address(0), _address, _amount);
        }
    }

    // costs unrestricted by distance
    function destroyToken(address _address, uint256 _amount) public onlyGame {
        // note: copy paste erc20 standard lines;
        totalSupply -= _amount;
        admin.updateInventoryAmount(_address, "Horseman", _amount, false);
        emit Transfer(address(0), _address, _amount);
    }
}
