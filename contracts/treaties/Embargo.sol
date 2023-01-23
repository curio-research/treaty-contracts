//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {AdminFacet} from "contracts/facets/AdminFacet.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";

contract Embargo is CurioTreaty {
    Set public sanctionList;

    constructor(address _diamond) CurioTreaty(_diamond) {
        sanctionList = new Set();
    }

    function name() external pure override returns (string memory) {
        return "Embargo";
    }

    function description() external pure override returns (string memory) {
        return "Owner of the League can point to which nation the league is sanctioning";
    }

    // ----------------------------------------------------------
    // Owner functions
    // ----------------------------------------------------------
    function addToSanctionList(uint256 _nationID) public onlyOwner {
        sanctionList.add(_nationID);
    }

    function removeFromSanctionList(uint256 _nationID) public onlyOwner {
        sanctionList.remove(_nationID);
    }

    function removeMember(uint256 _nationID) public onlyOwner {
        AdminFacet admin = AdminFacet(diamond);
        admin.removeFromTreatyWhitelist(_nationID); // need to be whitelisted again for joining
        admin.removeSigner(_nationID);
    }

    // ----------------------------------------------------------
    // Player functions
    // ----------------------------------------------------------
    function treatyLeave() public override minimumStay(30) {
        super.treatyLeave();
    }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    function approveTransfer(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        GetterFacet getter = GetterFacet(diamond);
       
        // Disapprove if transfer is to a nation on the sanction list
        (uint256 toID, ) = abi.decode(_encodedParams, (uint256, uint256));
        uint256 toNationID = getter.getNation(toID);
        if (sanctionList.includes(toNationID)) return false;

        return super.approveTransfer(_nationID, _encodedParams);
    }
}
