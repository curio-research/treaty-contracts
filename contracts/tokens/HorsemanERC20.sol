//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";

contract HorsemanERC20 is ERC20 {
    /// Outline:
    /// - approve
    /// - transfer
    /// - transferFrom
    /// - permit
    /// - _mint (internal)
    /// - _burn (internal)

   address public gameFacet;
   address public gameLib;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        address _deployer,
        address _gameFacet,
        address _gameLib
    ) ERC20(_name, _symbol, _decimals) {
        _mint(_deployer, 9999999999999);
        gameFacet = _gameFacet;
        gameLib = _gameLib;
    }

    modifier onlyGame() {
        require(msg.sender == gameFacet || msg.sender == gameLib, "CURIO: Function can only be called by the game");
        _;
    }

    function _getAddressMaxLoad(address _entityAddress) internal view returns (uint256) {
        return GetterFacet.getAddressMaxLoad(_entityAddress);
    }

    // fixme: solmate doesn't have balanceOf ...? (then how is it compatible with popular platforms)
    function checkBalanceOf(address _owner) public view returns (uint256) {
        return balanceOf[_owner];
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount) public onlyGame override returns (bool) {
            uint256 recipientMaxLoad = _getAddressMaxLoad(to);
            if (recipientMaxLoad == 0) {
                transferFrom(from, to, amount);
            } else {
                transferFrom(from, to, amount <= recipientMaxLoad? amount : recipientMaxLoad);
            }
        }
    
    function transferAll(
        address from,
        address to) public onlyGame returns (bool) {
            uint256 recipientMaxLoad = _getAddressMaxLoad(to);
            if (recipientMaxLoad == 0) {
                transferFrom(from, to, balanceOf[from]);
            } else {
                transferFrom(from, to, balanceOf[from] <= recipientMaxLoad? balanceOf[from] : recipientMaxLoad);
            }
        }

    // rewards unrestricted by distance
    function dripToken(address _recipient, uint256 amount) public onlyGame {
        _mint(_recipient, amount);
    }

    // costs unrestricted by distance
    function destroyToken(address _recipient, uint256 amount) public onlyGame {
        _burn(_recipient, amount);
    }
}
