//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {NonAggressionPact} from "contracts/treaties/NonAggressionPact.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {AdminFacet} from "contracts/facets/AdminFacet.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";

/// @title Colonial Pact between exactly one colonizer and one colonized
/// @notice This is an extension of time-bound Non-Aggression Pact.
/// @dev Steps:
/// 1. Owner (colonizer) whitelists exactly one nation, the to-be-colonized.
/// 2. Owner (colonizer) calls setColonialTiles() to set the tile(s) that will be colonized.
/// (Optional). Owner (colonizer) sets effective duration of the treaty; otherwise the treaty remains effective until end of game.
/// 3. Colonized nation joins the treaty.
/// 4. Afterwards, owner (colonizer) gains the right to harvest the colonial tiles (and the colonized nation loses the right to harvest them) for the duration of the treaty.
/// 5. After the treaty expires, the colonized nation may regain the right to harvest the tiles by calling treatyLeave().

contract ColonialPact is NonAggressionPact {
    uint256[] public colonialResourceIDs;

    function name() public pure override returns (string memory) {
        return "Colonial Pact";
    }

    function description() public pure override returns (string memory) {
        return
            "An extension of time-bound Non-Aggression Pact between one colonizer and one colonized nation."
            "Steps:"
            "1. Owner (colonizer) whitelists exactly one nation, the to-be-colonized."
            "2. Owner (colonizer) calls setColonialTiles() to set the tile(s) that will be colonized."
            "(Optional). Owner (colonizer) sets effective duration of the treaty; otherwise the treaty remains effective until end of game."
            "3. Colonized nation joins the treaty."
            "4. Afterwards, owner (colonizer) gains the right to harvest the colonial tiles (and the colonized nation loses the right to harvest them) for the duration of the treaty."
            "5. After the treaty expires, the colonized nation may regain the right to harvest the tiles by calling treatyLeave().";
    }

    // ----------------------------------------------------------
    // Colonizer/owner functions
    // ----------------------------------------------------------

    /// @notice Called by the owner to specify the colonized nation
    function addToWhitelist(uint256 _nationID) public override onlyOwner {
        require(_nationID != GetterFacet(diamond).getEntityByAddress(msg.sender), "ColonialPact: You cannot colonize yourself");

        super.addToWhitelist(_nationID);
    }

    /// @notice Can only be called by the owner once after whitelisting exactly one colonized nation
    function setColonialTiles(Position[] memory _tilePositions) public onlyOwner {
        require(!hasTreatyExpired(), "ColonialPact: Treaty has expired");
        require(colonialResourceIDs.length == 0, "ColonialPact: You have already set colonial tiles");

        GetterFacet getter = GetterFacet(diamond);
        uint256 treatyID = getter.getEntityByAddress(address(this));

        // Check that there is exactly one nation on the whitelist
        uint256[] memory whitelistedIDs = getter.getTreatyWhitelist(treatyID);
        require(whitelistedIDs.length == 1, "ColonialPact: Exactly one nation must be whitelisted");
        uint256 colonizedNationID = getter.getNation(whitelistedIDs[0]);

        // Check that the resources are all owned by the colonized nation, and store them
        colonialResourceIDs = new uint256[](_tilePositions.length);
        for (uint256 i = 0; i < _tilePositions.length; i++) {
            uint256 resourceID = getter.getResourceAtTile(_tilePositions[i]);
            uint256 nationID = getter.getNation(resourceID);
            require(nationID == colonizedNationID, "ColonialPact: All resources must be owned by the colonized nation");

            colonialResourceIDs[i] = resourceID;
        }
    }

    /// @notice Called by the owner after setting colonial tiles and after the colonized nation has joined the treaty
    function harvestColonialResources() public onlyOwner {
        require(!hasTreatyExpired(), "ColonialPact: Treaty has expired");
        require(colonialResourceIDs.length > 0, "ColonialPact: You need to first set colonial tiles");

        // Check that the treaty has been joined by the colonized nation
        GetterFacet getter = GetterFacet(diamond);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        uint256[] memory signerIDs = getter.getTreatySigners(treatyID);
        require(signerIDs.length == 1, "ColonialPact: Colonized nation needs to join treaty first");

        // Harvest colonial resources and measure the change in balance
        address colonizedCapitalAddr = getter.getAddress(getter.getCapital(signerIDs[0]));
        CurioERC20 crystalToken = getter.getTokenContract("Crystal");
        CurioERC20 foodToken = getter.getTokenContract("Food");
        uint256 crystalBalanceBefore = crystalToken.balanceOf(colonizedCapitalAddr);
        uint256 foodBalanceBefore = foodToken.balanceOf(colonizedCapitalAddr);
        for (uint256 i = 0; i < colonialResourceIDs.length; i++) {
            GameFacet(diamond).harvestResource(colonialResourceIDs[i]);
        }

        // Transfer the harvested resources to the colonizer
        address colonizerCapitalAddr = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        crystalToken.transferFrom(colonizedCapitalAddr, colonizerCapitalAddr, crystalToken.balanceOf(colonizedCapitalAddr) - crystalBalanceBefore);
        foodToken.transferFrom(colonizedCapitalAddr, colonizerCapitalAddr, foodToken.balanceOf(colonizedCapitalAddr) - foodBalanceBefore);
    }

    // ----------------------------------------------------------
    // Colonized functions
    // ----------------------------------------------------------

    /// @notice Called by the colonized nation after the owner has set colonial tiles
    function treatyJoin() public override onlyWhitelist {
        // Validity checks
        require(!hasTreatyExpired(), "ColonialPact: Treaty has expired");
        require(colonialResourceIDs.length > 0, "ColonialPact: Colonizer needs to set tiles first");

        GetterFacet getter = GetterFacet(diamond);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        require(getter.getTreatySigners(treatyID).length == 0, "ColonialPact: There is already a colonized nation");

        // Transfer right to harvest colonial resources from nation to treaty
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        AdminFacet admin = AdminFacet(diamond);
        admin.adminDelegateGameFunction(nationID, "HarvestResource", nationID, 0, false);
        // Set colonialResources = new Set();
        // colonialResources.addAr
        uint256[] nationResourceIDs = getter.getNationResources(nationID);
        for (uint256 i = 0; i < nationResourceIDs.length; i++) {
            admin.adminDelegateGameFunction(nationID, "HarvestResource", treatyID, colonialResourceIDs[i], true);
        }

        super.treatyJoin();
    }

    /// @notice Called by the colonized nation after the treaty has expired
    function treatyLeave() public override onlyWhitelist {
        // Validity checks
        require(hasTreatyExpired(), "ColonialPact: Cannot leave when treaty is in effect");

        // Transfer right to harvest colonial resources from treaty to nation
        GetterFacet getter = GetterFacet(diamond);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        AdminFacet admin = AdminFacet(diamond);
        for (uint256 i = 0; i < colonialResourceIDs.length; i++) {
            admin.adminDelegateGameFunction(nationID, "HarvestResource", treatyID, colonialResourceIDs[i], false);
            admin.adminDelegateGameFunction(nationID, "HarvestResource", nationID, colonialResourceIDs[i], true);
        }

        super.treatyLeave();
    }
}
