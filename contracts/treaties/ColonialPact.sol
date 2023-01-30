//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// // FIXME: WIP, not ready before launch
// import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
// import {NonAggressionPact} from "contracts/treaties/NonAggressionPact.sol";
// import {CurioERC20} from "contracts/standards/CurioERC20.sol";
// import {GetterFacet} from "contracts/facets/GetterFacet.sol";
// import {Set} from "contracts/Set.sol";

// contract ColonialPact is NonAggressionPact {
//     uint256[] public colonialTileIDs;

//     function name() public pure override returns (string memory) {
//         return "Colonial Pact";
//     }

//     function description() public pure override returns (string memory) {
//         return "Pact for colonizing";
//     }

//     // ----------------------------------------------------------
//     // Colonizer/owner functions
//     // ----------------------------------------------------------

//     /// @notice Can only be called by the owner once after whitelisting exactly one colonized nation
//     function setColonialTiles(Position[] memory _tilePositions) public onlyOwner {
//         require(colonialTileIDs.length == 0, "ColonialPact: Tiles can only be set once");

//         GetterFacet getter = GetterFacet(diamond);

//         // Check that there is exactly one nation on the whitelist
//         uint256[] memory whitelistedIDs = getter.getTreatyWhitelist(_treatyID);
//         require(whitelistedIDs.length == 1, "ColonialPact: Exactly one nation must be whitelisted");
//         uint256 colonizedNationID = getter.getNation(whitelistedIDs[0]);

//         // Check that the tiles are all owned by the colonized nation
//         colonialTileIDs = new uint256[](_tilePositions.length);
//         for (uint256 i = 0; i < _tilePositions.length; i++) {
//             uint256 tileID = getter.getTileAt(_tilePositions[i]);
//             uint256 nationID = getter.getNation(tileID);
//             require(nationID == colonizedNationID, "ColonialPact: All tiles must be owned by the colonized nation");
//             colonialTileIDs[i] = tileID;
//         }
//     }

//     // ----------------------------------------------------------
//     // Colonized functions
//     // ----------------------------------------------------------

//     function treatyJoin() public override onlyWhitelist {
//         super.treatyJoin();
//     }
// }
