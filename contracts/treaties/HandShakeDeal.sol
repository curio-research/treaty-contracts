//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {console} from "forge-std/console.sol";

contract HandshakeDeal is CurioTreaty {

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
    
    uint256 public dealCounter;
    mapping(uint256 => uint256[]) public nationIDToDealIDs;
    mapping(uint256 => Deal) public dealIDToDeal;

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

    function getNationDeals(uint256 _nationID) public view returns (uint256[] memory) {
        return nationIDToDealIDs[_nationID];
    }

    function getDealInfo(uint256 dealID) public view returns (Deal memory) {
        return dealIDToDeal[dealID];
    } 

    function proposeDeal(
        ApprovalFunctionType _functionType,
        bytes memory _encodedParams,
        uint256 _timeLock
        ) public onlySigner {
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

    function signDeal(uint256 _dealID) public onlySigner {
        nationIDToDealIDs[getter.getEntityByAddress(msg.sender)].push(_dealID);
    }

    function timeLockHasPassed(Deal memory _deal) internal view returns (bool) {
        return block.timestamp > _deal.timeLock;
    }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    // note: a player can exit only after all timelocks passe
    function treatyLeave() public override {
        uint256[] memory signedDealIDs = nationIDToDealIDs[getter.getEntityByAddress(msg.sender)];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (!timeLockHasPassed(deal)) return;
            }
        super.treatyLeave();
    }


    function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        // Disapprove if target nation is part of collective fund
        (, uint256 armyID, uint256 battleTargetID) = abi.decode(_encodedParams, (uint256, uint256, uint256));

        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveBattle) {
                (uint256 agreedArmyID, uint256 agreedBattleTargetID) = abi.decode(deal.encodedParams, (uint256, uint256));
                if (agreedArmyID == armyID && agreedBattleTargetID == battleTargetID) {
                    if (!timeLockHasPassed(deal)) {
                        return false;
                    }
                }
            }
        }

        return super.approveBattle(_nationID, _encodedParams);
    }

    function approveUpgradeCapital(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 capitalID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveUpgradeCapital) {
                uint256 agreedCapitalID = abi.decode(deal.encodedParams, (uint256));
                if (capitalID == agreedCapitalID) {
                    if (!timeLockHasPassed(deal)) {
                        return false;
                    }
                }
            }
        }
        return super.approveUpgradeCapital(_nationID, _encodedParams);
    }
}
