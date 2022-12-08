//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {ITreaty} from "contracts/interfaces/ITreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";

contract FTX is ITreaty {
    address public diamond;
    CurioERC20 public goldToken;
    FTTERC20 public fttToken;
    address public sbf;
    bool public isBankrupt;

    constructor(address _diamond) {
        require(_diamond != address(0), "FTX: Diamond address required");

        diamond = _diamond;
        goldToken = GetterFacet(_diamond).getTokenContract("Gold");
        fttToken = new FTTERC20(address(this));
        sbf = msg.sender;

        fttToken.approve(msg.sender, 100000000000);
    }

    function deposit(uint256 _amount) external returns (bool) {
        require(msg.sender != sbf, "FTX: You don't need to deposit");

        goldToken.transferFrom(msg.sender, sbf, _amount);

        fttToken.mint(msg.sender, _amount);

        return true;
    }

    function withdraw(uint256 _amount) external returns (bool) {
        require(msg.sender != sbf, "FTX: You don't need to withdraw");

        require(!isBankrupt, "FTX: Your money is gone");
        require(fttToken.balanceOf(msg.sender) >= _amount, "FTX: Insufficient balance");

        uint256 sbfGoldBalance = goldToken.checkBalanceOf(sbf);
        uint256 availableAmount = sbfGoldBalance > _amount ? _amount : sbfGoldBalance;
        goldToken.transferFrom(sbf, msg.sender, availableAmount);

        fttToken.burn(msg.sender, availableAmount);

        return true;
    }

    function run() external returns (bool) {
        require(msg.sender == sbf, "FTX: You don't need to run");
        require(!isBankrupt, "FTX: You've already escaped");

        isBankrupt = true;

        return true;
    }
}

contract FTTERC20 is ERC20 {
    address public ftx;

    constructor(address _ftx) ERC20("FTX Token", "FTT", 18) {
        ftx = _ftx;
    }

    function mint(address _to, uint256 _amount) external {
        require(msg.sender == ftx, "FTT: Only FTX can mint");
        _mint(_to, _amount);
    }

    function burn(address _from, uint256 _amount) external {
        require(msg.sender == ftx, "FTT: Only FTX can burn");
        _burn(_from, _amount);
    }

    function checkBalanceOf(address _addr) external view returns (uint256) {
        return balanceOf[_addr];
    }
}
