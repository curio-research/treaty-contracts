//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
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
        approveMove,
        approveStartGather,
        approveEndGather,
        approveUnloadResources,
        approveHarvestResource,
        approveHarvestResourcesFromCapital,
        approveUpgradeResource,
        approveBattle
    }

    struct Deal {
        uint256 dealID;
        uint256 proposerID;
        ApprovalFunctionType functionOfAgreement;
        bytes encodedParams;
        uint256 signedAt;
        uint256 effectiveDuration;
    }

    uint256 public dealCount;
    mapping(uint256 => uint256[]) public nationIDToDealIDs;
    mapping(uint256 => Deal) public idToDeal;

    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Handshake Deal";
        description = "Flexible handshake agreement between nations";
    }

    // ----------------------------------------------------------
    // Articles of Treaty
    // ----------------------------------------------------------
    /**
    Note: Frontend for now won't work with encoded params, so we split up ProposeDeal into 3 functions: 
    
    ProposeDeal1 Works for:
    upgradeCapital(uint256 _capitalID)
    upgradeTile(uint256 _tileID)
    recoverTile(uint256 _tileID)
    disownTile(uint256 _tileID)
    endGather(uint256 _troopID)
    unloadResources(uint256 _troopID)
    harvestResourcesFromCapital(uint256 _capitalID)
    upgradeResource(uint256 _resourceID)


    ProposeDeal2 Works for:
    startTroopProduction(uint256 _capitalID, uint256 _troopTemplateID)
    startGather(uint256 _troopID, uint256 _resourceID)
    harvestResource(uint256 _troopID, uint256 _resourceID)
    battle(uint256 _troopID, uint256 _targetID)

    ProposeDeal3 Works for:
    moveCapital(uint256 _capitalID, Position _position)
    claimTile(uint256 _capitalID, Position _position)
    move(uint256 _troopID, Position _position)

     */

    function proposeDeal1(
        ApprovalFunctionType _functionType,
        uint256 _uint256Param,
        uint256 _effectiveDuration
    ) public onlySigner returns (uint256) {
        uint256 proposerID = getter.getEntityByAddress(msg.sender);
        dealCount++;

        idToDeal[dealCount] = Deal({
            dealID: dealCount, // FORMATTING: DO NOT REMOVE THIS COMMENT,
            proposerID: proposerID,
            functionOfAgreement: _functionType,
            encodedParams: abi.encode(_uint256Param),
            signedAt: block.timestamp,
            effectiveDuration: _effectiveDuration
        });
        nationIDToDealIDs[proposerID].push(dealCount);

        return dealCount;
    }

    function proposeDeal2(
        ApprovalFunctionType _functionType,
        uint256 _uint256Param1,
        uint256 _uint256Param2,
        uint256 _effectiveDuration
    ) public onlySigner returns (uint256) {
        uint256 proposerID = getter.getEntityByAddress(msg.sender);
        dealCount++;

        idToDeal[dealCount] = Deal({
            dealID: dealCount, // FORMATTING: DO NOT REMOVE THIS COMMENT,
            proposerID: proposerID,
            functionOfAgreement: _functionType,
            encodedParams: abi.encode(_uint256Param1, _uint256Param2),
            signedAt: block.timestamp,
            effectiveDuration: _effectiveDuration
        });
        nationIDToDealIDs[proposerID].push(dealCount);

        return dealCount;
    }

    function proposeDeal3(
        ApprovalFunctionType _functionType,
        uint256 _uint256Param,
        Position memory _positionParam,
        uint256 _effectiveDuration
    ) public onlySigner returns (uint256) {
        uint256 proposerID = getter.getEntityByAddress(msg.sender);
        dealCount++;

        idToDeal[dealCount] = Deal({
            dealID: dealCount, // FORMATTING: DO NOT REMOVE THIS COMMENT,
            proposerID: proposerID,
            functionOfAgreement: _functionType,
            encodedParams: abi.encode(_uint256Param, _position),
            signedAt: block.timestamp,
            effectiveDuration: _effectiveDuration
        });
        nationIDToDealIDs[proposerID].push(dealCount);

        return dealCount;
    }

    function signDeal(uint256 _dealID) public onlySigner {
        nationIDToDealIDs[getter.getEntityByAddress(msg.sender)].push(_dealID);
    }

    function getNationDeals(uint256 _nationID) public view returns (uint256[] memory) {
        return nationIDToDealIDs[_nationID];
    }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    // note: a player can exit only after all time locks pass
    function treatyLeave() public override {
        uint256[] memory signedDealIDs = nationIDToDealIDs[getter.getEntityByAddress(msg.sender)];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            require(block.timestamp < deal.signedAt + deal.effectiveDuration, "Handshake: Can exit only after all timelocks pass");
        }

        super.treatyLeave();
    }

    function approveUpgradeCapital(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 capitalID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveUpgradeCapital) {
                uint256 specifiedCapitalID = abi.decode(deal.encodedParams, (uint256));
                if (capitalID == specifiedCapitalID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
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
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveMoveCapital) {
                (uint256 specifiedCapitalID, uint256 specifiedTargetTileID) = abi.decode(deal.encodedParams, (uint256, uint256));
                if (capitalID == specifiedCapitalID && targetTileID == specifiedTargetTileID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
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
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveClaimTile) {
                uint256 specifiedTileID = abi.decode(deal.encodedParams, (uint256));
                if (tileID == specifiedTileID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
                        return false;
                    }
                }
            }
        }
        return super.approveClaimTile(_nationID, _encodedParams);
    }

    function approveUpgradeTile(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 tileID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveUpgradeTile) {
                uint256 specifiedTileID = abi.decode(deal.encodedParams, (uint256));
                if (tileID == specifiedTileID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
                        return false;
                    }
                }
            }
        }
        return super.approveUpgradeTile(_nationID, _encodedParams);
    }

    function approveRecoverTile(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 tileID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveRecoverTile) {
                uint256 specifiedTileID = abi.decode(deal.encodedParams, (uint256));
                if (tileID == specifiedTileID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
                        return false;
                    }
                }
            }
        }
        return super.approveRecoverTile(_nationID, _encodedParams);
    }

    function approveDisownTile(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 tileID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveDisownTile) {
                uint256 specifiedTileID = abi.decode(deal.encodedParams, (uint256));
                if (tileID == specifiedTileID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
                        return false;
                    }
                }
            }
        }
        return super.approveDisownTile(_nationID, _encodedParams);
    }

    function approveMove(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 armyID, Position memory targetPosition) = abi.decode(_encodedParams, (uint256, uint256, Position));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveMove) {
                (uint256 specifiedArmyID, Position memory specifiedTargetPosition) = abi.decode(deal.encodedParams, (uint256, Position));
                if (specifiedArmyID == armyID && _coincident(targetPosition, specifiedTargetPosition)) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
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
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveBattle) {
                (uint256 specifiedArmyID, uint256 specifiedTargetID) = abi.decode(deal.encodedParams, (uint256, uint256));
                if (specifiedArmyID == armyID && specifiedTargetID == battleTargetID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
                        return false;
                    }
                }
            }
        }
        return super.approveBattle(_nationID, _encodedParams);
    }

    function approveStartGather(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 armyID, uint256 resourceID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveStartGather) {
                (uint256 specifiedArmyID, uint256 specifiedResourceID) = abi.decode(deal.encodedParams, (uint256, uint256));
                if (specifiedArmyID == armyID && specifiedResourceID == resourceID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
                        return false;
                    }
                }
            }
        }
        return super.approveStartGather(_nationID, _encodedParams);
    }

    function approveEndGather(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 armyID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveEndGather) {
                uint256 specifiedArmyID = abi.decode(deal.encodedParams, (uint256));
                if (specifiedArmyID == armyID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
                        return false;
                    }
                }
            }
        }
        return super.approveEndGather(_nationID, _encodedParams);
    }

    function approveUnloadResources(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 armyID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveEndGather) {
                uint256 specifiedArmyID = abi.decode(deal.encodedParams, (uint256));
                if (specifiedArmyID == armyID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
                        return false;
                    }
                }
            }
        }
        return super.approveUnloadResources(_nationID, _encodedParams);
    }

    function approveHarvestResource(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 resourceID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveHarvestResource) {
                uint256 specifiedResourceID = abi.decode(deal.encodedParams, (uint256));
                if (specifiedResourceID == resourceID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
                        return false;
                    }
                }
            }
        }
        return super.approveHarvestResource(_nationID, _encodedParams);
    }

    function approveHarvestResourcesFromCapital(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 capitalID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveHarvestResourcesFromCapital) {
                uint256 specifiedCapitalID = abi.decode(deal.encodedParams, (uint256));
                if (specifiedCapitalID == capitalID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
                        return false;
                    }
                }
            }
        }
        return super.approveHarvestResourcesFromCapital(_nationID, _encodedParams);
    }

    function approveUpgradeResource(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, uint256 resourceID) = abi.decode(_encodedParams, (uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveUpgradeResource) {
                uint256 specifiedCapitalID = abi.decode(deal.encodedParams, (uint256));
                if (specifiedCapitalID == resourceID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
                        return false;
                    }
                }
            }
        }
        return super.approveUpgradeResource(_nationID, _encodedParams);
    }

    // Note: This function only bans trooptype, not production amount
    function approveStartTroopProduction(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (, , uint256 troopTemplateID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
        uint256[] memory signedDealIDs = nationIDToDealIDs[_nationID];
        for (uint256 i = 0; i < signedDealIDs.length; i++) {
            Deal memory deal = idToDeal[signedDealIDs[i]];
            if (deal.functionOfAgreement == ApprovalFunctionType.approveStartTroopProduction) {
                uint256 agreedTemplateID = abi.decode(deal.encodedParams, (uint256));
                if (agreedTemplateID == troopTemplateID) {
                    if (block.timestamp < deal.signedAt + deal.effectiveDuration) {
                        return false;
                    }
                }
            }
        }
        return super.approveStartTroopProduction(_nationID, _encodedParams);
    }

    // ----------------------------------------------------------
    // Helper functions
    // ----------------------------------------------------------

    function _coincident(Position memory _p1, Position memory _p2) private pure returns (bool) {
        return _p1.x == _p2.x && _p1.y == _p2.y;
    }
}
