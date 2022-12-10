//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {ITreaty} from "contracts/interfaces/ITreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";
import {console} from "forge-std/console.sol";

contract FTX is ITreaty {
    address public diamond;
    string public name;
    GetterFacet public getter;
    CurioERC20 public goldToken;
    FTTERC20 public fttToken;
    address public sbfAddress;
    address public sbfCapitalAddress;
    bool public isBankrupt;

    constructor(address _diamond) {
        require(_diamond != address(0), "FTX: Diamond address required");

        diamond = _diamond;
        name = "FTX";
        getter = GetterFacet(_diamond);
        goldToken = getter.getTokenContract("Gold");
        fttToken = new FTTERC20(address(this));
        sbfAddress = msg.sender;

        // fttToken.approve(msg.sender, 100000000000);
    }

    function deposit(uint256 _amount) external returns (bool) {
        require(msg.sender != sbfAddress, "FTX: You don't need to deposit");

        if (sbfCapitalAddress == address(0)) _setSbfCapitalAddress();

        address senderCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        goldToken.transferFrom(senderCapitalAddress, sbfCapitalAddress, _amount);

        fttToken.mint(senderCapitalAddress, _amount);

        return true;
    }

    function withdraw(uint256 _amount) external returns (bool) {
        require(msg.sender != sbfAddress, "FTX: You don't need to withdraw");
        require(!isBankrupt, "FTX: Your money is gone");

        address senderCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        require(fttToken.balanceOf(senderCapitalAddress) >= _amount, "FTX: Insufficient balance");

        if (sbfCapitalAddress == address(0)) _setSbfCapitalAddress();

        uint256 sbfGoldBalance = goldToken.checkBalanceOf(sbfCapitalAddress);
        uint256 availableAmount = sbfGoldBalance > _amount ? _amount : sbfGoldBalance;
        goldToken.transferFrom(sbfCapitalAddress, senderCapitalAddress, availableAmount);

        fttToken.burn(senderCapitalAddress, availableAmount);

        return true;
    }

    function run() external returns (bool) {
        require(msg.sender == sbfAddress, "FTX: You don't need to run");
        require(!isBankrupt, "FTX: You've already escaped");

        isBankrupt = true;

        return true;
    }

    function _setSbfCapitalAddress() private {
        require(getter.getComponent("Address").getEntitiesWithValue(abi.encode(sbfAddress)).length == 1, "FTX: SBF not initialized");
        sbfCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(sbfAddress)));
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
