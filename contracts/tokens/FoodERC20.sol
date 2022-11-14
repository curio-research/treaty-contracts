//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";

contract FoodERC20 is ERC20 {
    /// Outline:
    /// - approve
    /// - transfer
    /// - transferFrom
    /// - permit
    /// - _mint (internal)
    /// - _burn (internal)

    address public gameFacet;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        address _deployer,
        address _gameFacet
    ) ERC20(_name, _symbol, _decimals) {
        _mint(_deployer, 9999999999999);
        gameFacet = _gameFacet;
    }

    modifier onlyGameFacet() {
        require(msg.sender == gameFacet, "CURIO: Function can only be called by the game");
        _;
    }

    // rewards unrestricted by distance
    function dripToken(address _recipient, uint256 amount) public onlyGameFacet {
        _mint(_recipient, amount);
    }

    // costs unrestricted by distance
    function destroyToken(address _recipient, uint256 amount) public onlyGameFacet {
        _burn(_recipient, amount);
    }

}
