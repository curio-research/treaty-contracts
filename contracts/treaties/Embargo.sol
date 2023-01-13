//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {console} from "forge-std/console.sol";

contract Embargo is CurioTreaty {
    Set public sanctionList;

    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Embargo";
        description = "Owner of the League can point to which nation the league is sanctioning";
        sanctionList = new Set();
    }

    // ----------------------------------------------------------
    // Owner functions
    // ----------------------------------------------------------

    function addToWhitelist(uint256 _nationID) public onlyOwner {
        admin.addToTreatyWhitelist(_nationID);
    }

    function removeFromWhitelist(uint256 _nationID) public onlyOwner {
        admin.removeFromTreatyWhitelist(_nationID);
    }

    function addToSanctionList(uint256 _nationID) public onlyOwner {
        sanctionList.add(_nationID);
    }

    function removeFromSanctionList(uint256 _nationID) public onlyOwner {
        sanctionList.remove(_nationID);
    }

    function removeMember(uint256 _nationID) public onlyOwner {
        admin.removeFromTreatyWhitelist(_nationID); // need to be whitelisted again for joining
        admin.removeSigner(_nationID);
    }

    // ----------------------------------------------------------
    // Player functions
    // ----------------------------------------------------------

    function treatyJoin() public override onlyWhitelist {
        super.treatyJoin();
    }

    function treatyLeave() public override {
        // Check if nation has stayed in pact for at least 30 seconds
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        require(minimumStayCheck(nationID, 30), "NAPact: Nation must stay for at least 30 seconds");

        super.treatyLeave();
    }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    function approveTransfer(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        // Disapprove if transfer is to a nation on the sanction list
        (uint256 toID, ) = abi.decode(_encodedParams, (uint256, uint256));
        uint256 toNationID = getter.getNation(toID);
        if (sanctionList.includes(toNationID)) return false;

        return super.approveTransfer(_nationID, _encodedParams);
    }
}
