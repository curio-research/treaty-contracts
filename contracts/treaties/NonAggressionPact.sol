//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {console} from "forge-std/console.sol";

contract NonAggressionPact is CurioTreaty {
    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Non-Aggression Pact";
        description = "Member nations cannot battle armies or tiles of one another";
    }

    function addToWhitelist(uint256 _nationID) public onlyOwner {
        admin.addToTreatyWhitelist(_nationID);
    }

    function removeFromWhitelist(uint256 _nationID) public onlyOwner {
        admin.removeFromTreatyWhitelist(_nationID);
    }

    function removeMember(uint256 _nationID) public onlyOwner {
        admin.removeFromTreatyWhitelist(_nationID); // need to be whitelisted again for joining
        admin.removeSigner(_nationID);
    }

    function treatyJoin() public override onlyWhitelist {
        super.treatyJoin();
    }

    function treatyLeave() public override {
        // Check if nation has stayed in pact for at least 30 seconds
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        require(minimumStayCheck(nationID, 30), "NAPact: Must stay for at least 30 seconds");

        // Remove nation from whitelist
        admin.removeFromTreatyWhitelist(nationID);

        super.treatyLeave();
    }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        // Disapprove if target nation is part of pact
        (, , uint256 battleTargetID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
        uint256 targetNationID = getter.getNation(battleTargetID);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        if (getter.getNationTreatySignature(targetNationID, treatyID) != 0) return false;

        return super.approveBattle(_nationID, _encodedParams);
    }
}
