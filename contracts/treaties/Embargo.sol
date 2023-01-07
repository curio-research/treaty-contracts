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
        name = "Economic Sanction Pact";
        description = "Owner of the League can point to which nation the league is sanctioning";
        sanctionList = new Set();

        // Add treaty owner to whitelist if game is calling (player registration)
        if (msg.sender == diamond) {
            uint256 treatyID = getter.getEntityByAddress(address(this));
            uint256 ownerID = abi.decode(getter.getComponent("Owner").getBytesValue(treatyID), (uint256));
            admin.addToWhitelist(ownerID);
        }
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
        admin.removeFromWhitelist(_nationID); // need to be whitelisted again for joining
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
        (address to, ) = abi.decode(_encodedParams, (address, uint256));
        uint256 toNationID = getter.getNation(getter.getEntityByAddress(to));
        if (sanctionList.includes(toNationID)) return false;

        return super.approveTransfer(_nationID, _encodedParams);
    }
}
