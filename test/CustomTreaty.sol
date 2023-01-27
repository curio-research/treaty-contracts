//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {Position} from "contracts/libraries/Types.sol";

contract CustomTreaty is CurioTreaty {
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
        string functionOfAgreement;
        bytes encodedParams;
        uint256 signedAt;
        uint256 effectiveDuration;
    }

    uint256 public dealCount;
    mapping(uint256 => uint256[]) public nationIDToDealIDs;
    mapping(uint256 => Deal) public idToDeal;

    function name() external pure override returns (string memory) {
        return "Custom Treaty";
    }

    function description() external pure override returns (string memory) {
        return "Treaty for testing custom treaties feature. Based on HandshakeDeal treaty";
    }

    function _strEq(string memory _s1, string memory _s2) internal pure returns (bool) {
        if (bytes(_s1).length != bytes(_s2).length) return false;
        return (keccak256(abi.encodePacked((_s1))) == keccak256(abi.encodePacked((_s2))));
    }

    // ----------------------------------------------------------
    // Articles of Treaty
    // ----------------------------------------------------------

    function proposeDeal1(
        string memory _functionType,
        uint256 _uint256Param,
        uint256 _effectiveDuration
    ) public onlySigner returns (uint256) {
        require(
            _strEq(_functionType, "approveUpgradeCapital") ||
                _strEq(_functionType, "approveUpgradeTile") ||
                _strEq(_functionType, "approveRecoverTile") ||
                _strEq(_functionType, "approveDisownTile") ||
                _strEq(_functionType, "approveEndGather") ||
                _strEq(_functionType, "approveUnloadResources") ||
                _strEq(_functionType, "approveHarvestResource") ||
                _strEq(_functionType, "approveHarvestResourcesFromCapital") ||
                _strEq(_functionType, "approveUpgradeResource"),
            "Handshake: Invalid function type"
        );
        GetterFacet getter = GetterFacet(diamond);
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
        string memory _functionType,
        uint256 _uint256Param1,
        uint256 _uint256Param2,
        uint256 _effectiveDuration
    ) public onlySigner returns (uint256) {
        require(
            _strEq(_functionType, "approveStartTroopProduction") || _strEq(_functionType, "approveStartGather") || _strEq(_functionType, "approveHarvestResource") || _strEq(_functionType, "approveBattle"), // FORMATTING: DO NOT REMOVE THIS COMMENT
            "Handshake: Invalid function type"
        );
        GetterFacet getter = GetterFacet(diamond);
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
        string memory _functionType,
        uint256 _uint256Param,
        uint256 x_pos,
        uint256 y_pos,
        uint256 _effectiveDuration
    ) public onlySigner returns (uint256) {
        require(
            _strEq(_functionType, "approveMoveCapital") || _strEq(_functionType, "approveClaimTile") || _strEq(_functionType, "approveMove"), // FORMATTING: DO NOT REMOVE THIS COMMENT
            "Handshake: Invalid function type"
        );
        GetterFacet getter = GetterFacet(diamond);
        uint256 proposerID = getter.getEntityByAddress(msg.sender);
        dealCount++;

        Position memory position = Position({x: x_pos, y: y_pos});

        idToDeal[dealCount] = Deal({
            dealID: dealCount, // FORMATTING: DO NOT REMOVE THIS COMMENT,
            proposerID: proposerID,
            functionOfAgreement: _functionType,
            encodedParams: abi.encode(_uint256Param, position),
            signedAt: block.timestamp,
            effectiveDuration: _effectiveDuration
        });
        nationIDToDealIDs[proposerID].push(dealCount);

        return dealCount;
    }

    function signDeal(uint256 _dealID) public onlySigner {
        GetterFacet getter = GetterFacet(diamond);
        nationIDToDealIDs[getter.getEntityByAddress(msg.sender)].push(_dealID);
    }

    function getNationDeals(uint256 _nationID) public view returns (uint256[] memory) {
        return nationIDToDealIDs[_nationID];
    }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    function treatyLeave() public override {
        // Can exit only after all time locks pass
        GetterFacet getter = GetterFacet(diamond);
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
            if (_strEq(deal.functionOfAgreement, "approveUpgradeCapital")) {
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
            if (_strEq(deal.functionOfAgreement, "approveMoveCapital")) {
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
            if (_strEq(deal.functionOfAgreement, "approveClaimTile")) {
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
            if (_strEq(deal.functionOfAgreement, "approveUpgradeTile")) {
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
            if (_strEq(deal.functionOfAgreement, "approveRecoverTile")) {
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
            if (_strEq(deal.functionOfAgreement, "approveDisownTile")) {
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
            if (_strEq(deal.functionOfAgreement, "approveMove")) {
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
            if (_strEq(deal.functionOfAgreement, "approveBattle")) {
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
            if (_strEq(deal.functionOfAgreement, "approveStartGather")) {
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
            if (_strEq(deal.functionOfAgreement, "approveEndGather")) {
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
            if (_strEq(deal.functionOfAgreement, "approveUnloadResources")) {
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
            if (_strEq(deal.functionOfAgreement, "approveHarvestResource")) {
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
            if (_strEq(deal.functionOfAgreement, "approveHarvestResourcesFromCapital")) {
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
            if (_strEq(deal.functionOfAgreement, "approveUpgradeResource")) {
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
            if (_strEq(deal.functionOfAgreement, "approveStartTroopProduction")) {
                uint256 specifiedTemplateID = abi.decode(deal.encodedParams, (uint256));
                if (specifiedTemplateID == troopTemplateID) {
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
