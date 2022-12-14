// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ITreaty} from "contracts/interfaces/ITreaty.sol";

contract CurioTreaty is ITreaty {
    address public override diamond;
    string public override name;

    constructor(address _diamond) {
        require(_diamond != address(0), "CurioTreaty: Diamond address required");

        diamond = _diamond;
    }

    modifier onlyGame() {
        require(msg.sender == diamond, "CurioTreaty: Only game can call");
        _;
    }

    function approveUpgradeCapital(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveMoveCapital(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveClaimTile(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveUpgradeTile(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveRecoverTile(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveDisownTile(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveStartTroopProduction(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveEndTroopProduction(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveMove(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveOrganizeArmy(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveDisbandArmy(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveStartGather(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveEndGather(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveUnloadResources(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveHarvestResource(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveHarvestResourcesFromCapital(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveUpgradeResource(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveBattle(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveJoinTreaty(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveLeaveTreaty(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveDelegatePermission(uint256 _nationID) public view virtual onlyGame returns (bool) {
        return true;
    }
}
