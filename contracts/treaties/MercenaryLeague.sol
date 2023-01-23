//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";

contract MercenaryLeague is CurioTreaty {
    CurioERC20 public goldToken;
    Set public warCouncil;
    mapping(uint256 => uint256) public memberToConscriptionFee;
    mapping(uint256 => uint256) public memberConscriptionStartTime;
    uint256 public conscriptionDuration;

    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Mercenary League";
        description = "A Military Alliance that allows drafting of armies.";

        goldToken = getter.getTokenContract("Gold");
        warCouncil = new Set();
        conscriptionDuration = 3600;
    }

    modifier onlyWarCouncil() {
        uint256 callerID = getter.getEntityByAddress(msg.sender);
        require(warCouncil.includes(callerID), "Alliance: Only War Council can call");
        _;
    }

    // ----------------------------------------------------------
    // Set getters
    // ----------------------------------------------------------

    function getWarCouncilMembers() public view returns (uint256[] memory) {
        return warCouncil.getAll();
    }

    function getTreatySigners() public view returns (uint256[] memory) {
        return getter.getTreatySigners(getter.getEntityByAddress(address(this)));
    }

    // ----------------------------------------------------------
    // Owner & War Council functions
    // ----------------------------------------------------------

    // Note: Owner should add himself to the war council
    function addToWarCouncil(uint256 _nationID) public onlyOwner {
        warCouncil.add(_nationID);
    }

    function removeFromWarCouncil(uint256 _nationID) public onlyOwner {
        warCouncil.remove(_nationID);
    }

    function setConscriptionDuration(uint256 _duration) public onlyOwner {
        conscriptionDuration = _duration;
    }

    function conscriptArmies(uint256 _nationID) public onlyWarCouncil {
        require(memberToConscriptionFee[_nationID] > 0, "Alliance: Target must have a conscription fee set");
        require(getter.getNationTreatySignature(_nationID, getter.getEntityByAddress(address(this))) != 0, "Alliance: Target nation is not part of the alliance");
        require(memberConscriptionStartTime[getter.getEntityByAddress(msg.sender)] == 0, "Alliance: Target nation's armies have already been conscripted");

        // Conscripter gains control of all target nation's armies at the cost of the conscription fee
        address conscripterCapitalAddr = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        address targetCapitalAddr = getter.getAddress(getter.getCapital(_nationID));
        goldToken.transferFrom(conscripterCapitalAddr, targetCapitalAddr, memberToConscriptionFee[_nationID]);
        admin.adminDelegateGameFunction(_nationID, "Battle", getter.getEntityByAddress(msg.sender), 0, true);
        admin.adminDelegateGameFunction(_nationID, "Move", getter.getEntityByAddress(msg.sender), 0, true);

        memberConscriptionStartTime[_nationID] = block.timestamp;
    }

    // ----------------------------------------------------------
    // Player functions
    // ----------------------------------------------------------

    function revokeArmies() public {
        require(block.timestamp - memberConscriptionStartTime[getter.getEntityByAddress(msg.sender)] > conscriptionDuration, "Alliance: Nation's conscription hasn't expired yet");

        uint256 nationID = getter.getEntityByAddress(msg.sender);
        admin.adminDelegateGameFunction(nationID, "Battle", getter.getEntityByAddress(msg.sender), 0, false);
        admin.adminDelegateGameFunction(nationID, "Move", getter.getEntityByAddress(msg.sender), 0, false);

        // Record that the nation's conscripted armies have been revoked
        memberConscriptionStartTime[getter.getEntityByAddress(msg.sender)] = 0;
    }

    function treatyLeave() public override {
        // Check if nation has stayed in alliance for at least 10 seconds
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        require(minimumStayCheck(nationID, 10), "Alliance: Nation must stay for at least 10 seconds");

        // Check that nation has revoked conscripted armies (if any)
        require(memberConscriptionStartTime[nationID] == 0, "Alliance: Nation must revoke conscripted armies before leaving");

        super.treatyLeave();
    }

    function setConscriptionFee(uint256 _fee) public onlySigner {
        memberToConscriptionFee[getter.getEntityByAddress(msg.sender)] = _fee;
    }

    function _strEq(string memory _s1, string memory _s2) internal pure returns (bool) {
        if (bytes(_s1).length != bytes(_s2).length) return false;
        return (keccak256(abi.encodePacked((_s1))) == keccak256(abi.encodePacked((_s2))));
    }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    function approveDelegateGameFunction(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        // Disapprove if target nation is an ally
        (, , string memory functionName, , , bool canCall) = abi.decode(_encodedParams, (uint256, uint256, string, uint256, uint256, bool));
        // Alliance member cannot arbitrarily revoke delegation of Battle and Move functions
        if (_strEq(functionName, "Battle") || _strEq(functionName, "Move")) {
            if (!canCall) return false;
        }

        return super.approveDelegateGameFunction(_nationID, _encodedParams);
    }
}
