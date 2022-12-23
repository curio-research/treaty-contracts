//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {console} from "forge-std/console.sol";

contract EconSanction is CurioTreaty {
    address public deployerAddress;

    address[] public whitelist;
    mapping(address => bool) public isWhiteListed;

    address[] public sanctionList;
    mapping(address => bool) public isSanctioned;

    modifier onlyOwnerOrPact() {
        require(msg.sender == deployerAddress || msg.sender == address(this), "NAPact: You do not have owner-level permission");
        _;
    }

    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Economic Sanction League";
        description = "Owner of the League can point to which nation the league is sanctioning";

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
        for (uint i = 0; i < whitelist.length; i++) {
            if (whitelist[i] == _candidate) {
                candidateIndex = i;
            }
        }
        whitelist[candidateIndex] = whitelist[whitelist.length - 1];
        whitelist.pop();
    }

    function addToSanctionList(address _candidate) public onlyOwnerOrPact {
        require(!isSanctioned[_candidate], "NAPact: Candidate already whitelisted");
        isSanctioned[_candidate] = true;
        sanctionList.push(_candidate); 
    }

    function removeFromSanctionList(address _candidate) public onlyOwnerOrPact {
        isSanctioned[_candidate] = false;
        uint256 candidateIndex;
        for (uint i = 0; i < sanctionList.length; i++) {
            if (sanctionList[i] == _candidate) {
                candidateIndex = i;
            }
        }
        sanctionList[candidateIndex] = sanctionList[sanctionList.length - 1];
        sanctionList.pop();
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
        for (uint i = 0; i < whitelist.length; i++) {
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

    function approveTransfer(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        // Disapprove if target nation is an ally
        (address transferToNationAddress,) = abi.decode(_encodedParams, (address, uint256));
        if (isSanctioned[transferToNationAddress]) {
            // target is sanctioned
            return false;
        } else return super.approveTransfer(_nationID, _encodedParams);
    }
}