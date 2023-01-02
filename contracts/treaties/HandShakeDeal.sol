//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {console} from "forge-std/console.sol";

contract HandShakeDeal is CurioTreaty {

    enum ApprovalFunctionType {
        approveUpgradeCapital,
        approveMoveCapital,
        approveClaimTile,
        approveUpgradeTile,
        approveRecoverTile,
        approveDisownTile,
        approveStartTroopProduction,
        approveEndTroopProduction,
        approveMove,
        approveOrganizeArmy,
        approveDisbandArmy,
        approveStartGather,
        approveEndGather,
        approveUnloadResources,
        approveHarvestResource,
        approveHarvestResourcesFromCapital,
        approveUpgradeResource,
        approveBattle
    }

    struct Deal{
        uint256 dealID;
        uint256 proposer;
        ApprovalFunctionType functionOfAgreement;
        bytes encodedParams;
        uint256 timeLock;
    }
    
    uint256 dealCounter;
    mapping(uint256 => uint256[]) nationIDToDealIDs;
    mapping(uint256 => Deal) dealIDToDeal;

    constructor(
        address _diamond
    ) CurioTreaty(_diamond) {
        name = "Simple Handshake Deal";
        description = "Flexible handshake agreement between nations";
        dealCounter = 1;
    }

    // ----------------------------------------------------------
    // Articles of Treaty
    // ----------------------------------------------------------

    function proposeDeal(
        ApprovalFunctionType _functionType,
        bytes _encodedParams,
        uint256 _timeLock
        ) {
        uint256 proposerID = getter.getEntityByAddress(msg.sender);
        dealIDToDeal[dealCounter] = Deal({
            dealID: dealCounter,
            proposer: proposerID,
            functionOfAgreement: _functionType,
            encodedParams: _encodedParams,
            timeLock: _timeLock
        });
        nationIDToDealIDs[proposerID].push(dealCounter);
        dealCounter ++;
    }

    function signDeal(uint256 _dealID) public {
        nationIDToDealIDs[getter.getEntityByAddress(msg.sender)].push(_dealID);
    }

    function getDealsByNationID(uint256 _nationID) public view returns (uint256[]) {
        return nationIDToDealIDs[_nationID];
    }

    function readDealProposer(uint256 _dealID) public view returns (uint256) {
        return dealIDToDeal[_dealID].proposer;
    }

    function readDealFunctionOfAgreement(uint256 _dealID) public view returns (ApprovalFunctionType) {
        return dealIDToDeal[_dealID].functionOfAgreement;
    }

    function readDealEncodedParams(uint256 _dealID) public view returns (bytes) {
        return dealIDToDeal[_dealID].encodedParams;
    }

    function readDealTimeLock(uint256 _dealID) public view returns (uint256) {
        return dealIDToDeal[_dealID].timeLock;
    }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        // Disapprove if target nation is part of collective fund
        (, uint256 armyID, uint256 battleTargetID) = abi.decode(_encodedParams, (uint256, uint256, uint256));

        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveBattle) {
                (uint256 agreedArmyID, uint256 agreedBattleTargetID) = abi.decode(deal.encodedParams);
                if (agreedArmyID == armyID && agreedBattleTargetID == battleTargetID) {
                    return false;
                }
            }
        }

        return super.approveBattle(_nationID, _encodedParams);
    }

    function approveUpgradeCapital(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 capitalID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveUpgradeCapital) {
                uint256 agreedCapitalID = abi.decode(deal.encodedParams);
                if (capitalID == agreedCapitalID) {
                    return false;
                }
            }
        }
        return supoer.approveUpgradeCapital(_nationID, _encodedParams);
    }
}