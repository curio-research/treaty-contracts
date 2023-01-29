//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {Set} from "contracts/Set.sol";
import {console} from "forge-std/console.sol";

contract Bounty is CurioTreaty {
    // WIP
    struct Offer {
        uint256 targetNationID;
        uint256 battleTime;
        string priceToken;
        uint256 priceAmount;
        uint256 proposerID;
        uint256 signedAt;
        uint256 effectiveDuration;
    }

}