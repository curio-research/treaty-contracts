//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {UseStorage} from "contracts/libraries/Storage.sol";
import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";

contract CurioERC20 is ERC20, UseStorage {
    /// Needed functions:
    /// - approve
    /// - transfer
    /// - transferFrom
    /// - permit
    /// - _mint (internal)
    /// - _burn (internal)
    /// TODO: Question: should this be a facet? how to inherit amounts from game state?
    /// TODO: Question: How does this translate to ECS

    mapping(address => Position) public positionOf;
    address public game;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        address _game
    ) ERC20(_name, _symbol, _decimals) {
        game = _game;
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        // TODO: add approval logic & stuff with mint/burn
        return super.approve(spender, amount);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        require(_withinRange(msg.sender, to, GameLib.getRange()), "CURIO: Transfer out of range");
        return super.transfer(to, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        require(_withinRange(from, to, GameLib.getRange()), "CURIO: Transfer out of range");
        return super.transferFrom(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override {
        // TODO: add token limit constants
        super._mint(to, amount);
    }

    function _burn(address from, uint256 amount) internal override {
        // TODO: add token limit constants
        super._burn(from, amount);
    }

    function _withinRange(
        address from,
        address to,
        uint256 range
    ) private view returns (bool) {
        return GameLib.withinDistance(positionOf[from], positionOf[to], range);
    }
}
