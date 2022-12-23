//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {console} from "forge-std/console.sol";

contract NonAggressionPact is CurioTreaty {
    address public deployerAddress;
    address[] public whitelist;
    mapping(address => bool) public isWhiteListed;

    modifier onlyOwnerOrPact() {
        require(msg.sender == deployerAddress || msg.sender == address(this), "NAPact: You do not have owner-level permission");
        _;
    }

    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Non-Aggression Pact";
        description = "Member nations cannot battle armies or tiles of one another";

        deployerAddress = msg.sender;

        // fixme: a redundant step that deployer has to join the treaty after deployment;
        // addSigner in treatyJoin can only be called by treaty
        whitelist.push(msg.sender);
        isWhiteListed[msg.sender] = true;
    }

    // ----------------------------------------------------------
    // Articles of Treaty
    // ----------------------------------------------------------

    function addToWhiteList(address _candidate) public onlyOwnerOrPact {
        require(!isWhiteListed[_candidate], "NAPact: Candidate already whitelisted");
        isWhiteListed[_candidate] = true;
        whitelist.push(_candidate);
    }

    function removeFromWhiteList(address _candidate) public onlyOwnerOrPact {
        isWhiteListed[_candidate] = false;
        uint256 candidateIndex;
        for (uint256 i = 0; i < whitelist.length; i++) {
            if (whitelist[i] == _candidate) {
                candidateIndex = i;
            }
        }
        whitelist[candidateIndex] = whitelist[whitelist.length - 1];
        whitelist.pop();
    }

    function removeMember(address _member) public onlyOwnerOrPact {
        // member needs to be whitelisted again before joining
        removeFromWhiteList(_member);

        // remove membership; same as treaty leave
        uint256 nationID = getter.getEntityByAddress(_member);
        admin.removeSigner(nationID);
    }

    // ----------------------------------------------------------
    // Standardized Functions Called by the Public
    // ----------------------------------------------------------

    function treatyJoin() public override {
        // treaty owner needs to first whitelist the msg.sender
        require(isWhiteListed[msg.sender], "Candidate is not whitelisted");
        super.treatyJoin();
    }

    function treatyLeave() public override {
        // Check if nation has stayed in pact for at least 10 seconds
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        uint256 nationJoinTime = abi.decode(getter.getComponent("InitTimestamp").getBytesValue(getter.getNationTreatySignature(nationID, treatyID)), (uint256));
        require(block.timestamp - nationJoinTime >= 10, "NAPact: Nation must stay for at least 10 seconds");

        // msg.sender removed from whitelist
        isWhiteListed[msg.sender] = false;
        uint256 candidateIndex;
        for (uint256 i = 0; i < whitelist.length; i++) {
            if (whitelist[i] == msg.sender) {
                candidateIndex = i;
            }
        }
        whitelist[candidateIndex] = whitelist[whitelist.length - 1];
        whitelist.pop();

        super.treatyLeave();
    }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        // Disapprove if target nation is part of NAPact
        (, , uint256 battleTargetID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
        uint256 targetNationID = getter.getNation(battleTargetID);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        if (getter.getNationTreatySignature(targetNationID, treatyID) != 0) return false;

        return super.approveBattle(_nationID, _encodedParams);
    }
}
