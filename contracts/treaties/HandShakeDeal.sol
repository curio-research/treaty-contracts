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

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    // note: a player can exit only after all timelocks pass
    function treatyLeave() public override {
        uint256[] memory signedDealIDs = nationIDToDealIDs[getter.getEntityByAddress(msg.sender)];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            require(block.timestamp > deal.timeLock, "HSDeal: a player can exit only after all timelocks passe");
            }
        super.treatyLeave();
    }

    function approveUpgradeCapital(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 capitalID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveUpgradeCapital) {
                uint256 agreedCapitalID = abi.decode(deal.encodedParams, (uint256));
                if (capitalID == agreedCapitalID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveUpgradeCapital(_nationID, _encodedParams);
    }

    function approveMoveCapital(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 capitalID, uint256 targetTileID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveMoveCapital) {
                (uint256 agreedCapitalID, uint256 agreedTargetTileID) = abi.decode(deal.encodedParams, (uint256, uint256));
                if (capitalID == agreedCapitalID && targetTileID == agreedTargetTileID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveMoveCapital(_nationID, _encodedParams);
    }

    function approveClaimTile(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 tileID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveClaimTile) {
                uint256 agreedTileID = abi.decode(deal.encodedParams, (uint256));
                if (tileID == agreedTileID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveClaimTile(_nationID, _encodedParams);
    }

    function approveUpgradeTile(_nationID, _encodedParams) public view override returns (bool) {
        (, uint256 tileID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveUpgradeTile) {
                uint256 agreedTileID = abi.decode(deal.encodedParams, (uint256));
                if (tileID == agreedTileID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveUpgradeTile(_nationID, _encodedParams);
    }

    function approveRecoverTile(_nationID, _encodedParams) public view override returns (bool) {
        (, uint256 tileID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveRecoverTile) {
                uint256 agreedTileID = abi.decode(deal.encodedParams, (uint256));
                if (tileID == agreedTileID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveRecoverTile(_nationID, _encodedParams);
    }

    function approveDisownTile(_nationID, _encodedParams) public view override returns (bool) {
        (, uint256 tileID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveDisownTile) {
                uint256 agreedTileID = abi.decode(deal.encodedParams, (uint256));
                if (tileID == agreedTileID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveDisownTile(_nationID, _encodedParams);
    }

    function approveStartTroopProduction(_nationID, _encodedParams) public view override returns (bool) {
        (, uint256 capitalID, uint256 templateID, uint256 amount) = abi.decode(_encodedParams, (uint256, uint256, uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveStartTroopProduction) {
                (uint256 agreedCapitalID, uint256 agreedTemplateID, uint256 agreedAmount) = abi.decode(deal.encodedParams, (uint256, uint256, uint256));
                if (capitalID == agreedCapitalID && templateID == agreedTemplateID && amount == agreedAmount) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveStartTroopProduction(_nationID, _encodedParams);
    }

    function approveEndTroopProduction(_nationID, _encodedParams) public view override returns (bool) {
        (, uint256 capitalID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveEndTroopProduction) {
                (uint256 agreedCapitalID) = abi.decode(deal.encodedParams, uint256);
                if (capitalID == agreedCapitalID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveEndTroopProduction(_nationID, _encodedParams);
    }

    function approveMove(_nationID, _encodedParams) public view override returns (bool) {
        (, uint256 armyID, Position memory targetPosition) = abi.decode(_encodedParams, (uint256, uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveMove) {
                (uint256 agreedArmyID, Position memory  agreedTargetPosition) = abi.decode(deal.encodedParams, (uint256, Position));
                if (agreedArmyID == armyID && GameLib.coincident(targetPosition, agreedTargetPosition)) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveMove(_nationID, _encodedParams);
    }

    function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 armyID, uint256 battleTargetID) = abi.decode(_encodedParams, (uint256, uint256, uint256));

        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveBattle) {
                (uint256 agreedArmyID, uint256 agreedBattleTargetID) = abi.decode(deal.encodedParams, (uint256, uint256));
                if (agreedArmyID == armyID && agreedBattleTargetID == battleTargetID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveBattle(_nationID, _encodedParams);
    }

    function approveStartGather(_nationID, _encodedParams) public view override returns (bool) {
        (, uint256 armyID, uint256 resourceID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveStartGather) {
                (uint256 agreedArmyID, uint256 agreedResourceID) = abi.decode(deal.encodedParams, (uint256, uint256));
                if (agreedArmyID == armyID && agreedResourceID == resourceID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveStartGather(_nationID, _encodedParams);
    }

    function approveEndGather(_nationID, _encodedParams) public view override returns (bool) {
        (, uint256 armyID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveEndGather) {
                (uint256 agreedArmyID) = abi.decode(deal.encodedParams, uint256);
                if (agreedArmyID == armyID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveEndGather(_nationID, _encodedParams);
    }

    function approveUnloadResources(_nationID, _encodedParams) public view override returns (bool) {
        (, uint256 armyID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveEndGather) {
                (uint256 agreedArmyID) = abi.decode(deal.encodedParams, uint256);
                if (agreedArmyID == armyID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveUnloadResources(_nationID, _encodedParams);
    }

    function approveHarvestResource(_nationID, _encodedParams) public view override returns (bool) {
        (, uint256 resourceID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveHarvestResource) {
                uint256 agreedResourceID = abi.decode(deal.encodedParams, uint256);
                if (agreedResourceID == resourceID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveHarvestResource(_nationID, _encodedParams);
    }

    function approveHarvestResourcesFromCapital(_nationID, _encodedParams) public view override returns (bool) {
        (, uint256 capitalID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveHarvestResourcesFromCapital) {
                uint256 agreedCapitalID = abi.decode(deal.encodedParams, uint256);
                if (agreedCapitalID == capitalID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveHarvestResourcesFromCapital(_nationID, _encodedParams);
    }

    function approveUpgradeResource(_nationID, _encodedParams) public view override returns (bool) {
        (, uint256 resourceID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = dealIDToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveUpgradeResource) {
                uint256 agreedResourceID = abi.decode(deal.encodedParams, uint256);
                if (agreedResourceID == resourceID) {
                    if (block.timestamp < deal.timeLock) {
                        return false;
                    }
                }
            }
        }
        return super.approveUpgradeResource(_nationID, _encodedParams);
    }
}
