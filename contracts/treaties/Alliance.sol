//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";
import {console} from "forge-std/console.sol";

contract Alliance is CurioTreaty {
    CurioERC20 public goldToken;

    constructor(address _diamond) CurioTreaty(_diamond) {
        goldToken = getter.getTokenContract("Gold");

        name = "Alliance";
        description = "A treaty between two or more countries to work together towards a common goal or to defend each other in the case of external aggression";
        string[] memory temp = new string[](1);
        temp[0] = "Battle";
        delegatedGameFunctionNames = temp;
    }

    function join() public override {
        // Transfer 1000 gold from nation to treaty
        address nationCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        goldToken.transferFrom(nationCapitalAddress, address(this), 1000);

        super.join();
    }

    function leave() public override {
        // Check if nation has stayed in alliance for at least 10 seconds
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        uint256 nationJoinTime = abi.decode(getter.getComponent("InitTimestamp").getBytesValue(getter.getNationTreatySignature(nationID, treatyID)), (uint256));
        require(block.timestamp - nationJoinTime >= 10, "Alliance: Nation must stay for at least 10 seconds");

        // Transfer 1000 gold from treaty back to nation
        address nationCapitalAddress = getter.getAddress(getter.getCapital(nationID));
        goldToken.transfer(nationCapitalAddress, 1000);

        super.leave();
    }

    function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        // Disapprove if target nation is an ally
        (, uint256 targetID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256 targetNationID = getter.getNation(targetID);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        if (getter.getNationTreatySignature(targetNationID, treatyID) != 0) return false;

        return super.approveBattle(_nationID, _encodedParams);
    }

    /**
     * @dev Attack a target army belonging to a non-ally nation with all nearby ally armies.
     * @param _targetArmyID target army entity
     */
    function besiege(uint256 _targetArmyID) public {
        // TODO: Implement
    }
}
