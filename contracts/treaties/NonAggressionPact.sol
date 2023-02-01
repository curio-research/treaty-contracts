//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {AdminFacet} from "contracts/facets/AdminFacet.sol";
import {Position} from "contracts/libraries/Types.sol";

contract NonAggressionPact is CurioTreaty {
    uint256 public effectiveDuration;

    function name() external pure virtual override returns (string memory) {
        return "Non-Aggression Pact";
    }

    function description() external pure virtual override returns (string memory) {
        return "Member nations cannot battle armies or tiles of one another for a period of time";
    }

    // ----------------------------------------------------------
    // Owner functions
    // ----------------------------------------------------------

    function setEffectiveDuration(uint256 _duration) public virtual onlyOwner {
        require(effectiveDuration == 0, "NonAggressionPact: Duration can only be set once");
        require(_duration > 0, "NonAggressionPact: Duration must be greater than 0");

        effectiveDuration = _duration;
    }

    function addToWhitelist(uint256 _nationID) public virtual onlyOwner {
        AdminFacet admin = AdminFacet(diamond);
        admin.addToTreatyWhitelist(_nationID);
    }

    function removeFromWhitelist(uint256 _nationID) public virtual onlyOwner {
        AdminFacet admin = AdminFacet(diamond);
        admin.removeFromTreatyWhitelist(_nationID);
    }

    function removeMember(uint256 _nationID) public virtual onlyOwner {
        AdminFacet admin = AdminFacet(diamond);
        admin.removeFromTreatyWhitelist(_nationID); // need to be whitelisted again for joining
        admin.removeSigner(_nationID);
    }

    // ----------------------------------------------------------
    // Player functionos
    // ----------------------------------------------------------

    function treatyJoin() public virtual override onlyWhitelist {
        super.treatyJoin();
    }

    function treatyLeave() public virtual override minimumStay(effectiveDuration) {
        GetterFacet getter = GetterFacet(diamond);

        // Remove nation from whitelist
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        AdminFacet admin = AdminFacet(diamond);
        admin.removeFromTreatyWhitelist(nationID);

        super.treatyLeave();
    }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view virtual override returns (bool) {
        GetterFacet getter = GetterFacet(diamond);
        uint256 treatyID = getter.getEntityByAddress(address(this));

        // Disapprove if target nation is part of pact and pact is still effective
        if (!hasTreatyExpired()) {
            (, , uint256 battleTargetID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
            uint256 targetNationID = getter.getNation(battleTargetID);
            if (getter.getNationTreatySignature(targetNationID, treatyID) != 0) return false;
        }

        return super.approveBattle(_nationID, _encodedParams);
    }

    // ----------------------------------------------------------
    // Helper Functions
    // ----------------------------------------------------------

    function hasTreatyExpired() public view virtual returns (bool) {
        GetterFacet getter = GetterFacet(diamond);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        uint256 initTimestamp = abi.decode(getter.getComponent("InitTimestamp").getBytesValue(treatyID), (uint256));

        return effectiveDuration > 0 && block.timestamp > initTimestamp + effectiveDuration;
    }
}
