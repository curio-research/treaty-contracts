//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {AdminFacet} from "contracts/facets/AdminFacet.sol";
import {console} from "forge-std/console.sol";

contract Alliance is CurioTreaty {
    CurioERC20 public goldToken;
    Set public warCouncil;
    mapping(uint256 => uint256) public memberToConscriptionFee;
    mapping(uint256 => uint256) public memberConscriptionStartTime;
    uint256 public conscriptionDuration;

    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Alliance";
        description = "A Military Alliance that allows drafting of armies.";

        goldToken = getter.getTokenContract("Gold");
        admin = AdminFacet(diamond);
        warCouncil = new Set();
        conscriptionDuration = 3600;
    }

    modifier onlyWarCouncil() {
        uint256 callerID = getter.getEntityByAddress(msg.sender);
        require(warCouncil.includes(callerID), "Alliance: Only War Council can call");
        _;
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
        require(getter.getNationTreatySignature(_nationID, treatyID) != 0, "Alliance: Target nation is not part of the alliance");
        require(memberConscriptionStartTime[getter.getEntityByAddress(msg.sender)] == 0, "Alliance: Target nation's armies have already been conscripted");

        // Conscripter gains control of all target nation's armies at the cost of the conscription fee
        address conscripterCapitalAddr = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        address targetCapitalAddr = getter.getAddress(getter.getCapital(_nationID));
        goldToken.transferFrom(conscripterCapitalAddr, targetCapitalAddr, memberToConscriptionFee[_nationID]);
        admin.adminDelegateToPlayer(_nationID, "Battle", getter.getEntityByAddress(msg.sender), 0, true);
        admin.adminDelegateToPlayer(_nationID, "Move", getter.getEntityByAddress(msg.sender), 0, true);

        memberConscriptionStartTime[_nationID] = block.timestamp;
    }

    // ----------------------------------------------------------
    // Player functions
    // ----------------------------------------------------------

    function revokeArmies() public {
        require(block.timestamp - memberConscriptionStartTime[getter.getEntityByAddress(msg.sender)] > conscriptionDuration, "Alliance: Nation's conscription hasn't expired yet");

        // @yijia: Is it the right way to do it?
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        admin.adminDelegateToPlayer(nationID, "Battle", getter.getEntityByAddress(msg.sender), 0, false);
        admin.adminDelegateToPlayer(nationID, "Move", getter.getEntityByAddress(msg.sender), 0, false);

        // Record that the nation's conscripted armies have been revoked
        memberConscriptionStartTime[getter.getEntityByAddress(msg.sender)] = 0;
    }

    function treatyJoin() public override {
        // Delegate Battle function for all armies
        // treatyDelegateGameFunction("Battle", 0, true);

        super.treatyJoin();
    }

    function treatyLeave() public override {
        // Check if nation has stayed in alliance for at least 10 seconds
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        require(minimumStayCheck(nationID, 10), "Alliance: Nation must stay for at least 10 seconds");

        // Check that nation has revoked conscripted armies (if any)
        require(memberConscriptionStartTime[nationID] == 0, "Alliance: Nation must revoke conscripted armies before leaving");

        // Undelegate Battle function for all armies
        // treatyDelegateGameFunction("Battle", 0, false);

        super.treatyLeave();
    }

    function setConscriptionFee(uint256 _fee) public onlySigner {
        memberToConscriptionFee[getter.getEntityByAddress(msg.sender)] = _fee;
    }

    // /**
    //  * @dev Battle a target army belonging to a non-ally nation with all nearby ally armies.
    //  * @param _targetArmyID target army entity
    //  */
    // function treatyBesiege(uint256 _targetArmyID) public onlyWarCouncil {
    //     // Check if target army is in a non-ally nation
    //     uint256 targetNationID = getter.getNation(_targetArmyID);
    //     uint256 treatyID = getter.getEntityByAddress(address(this));
    //     require(getter.getNationTreatySignature(targetNationID, treatyID) == 0, "Alliance: Cannot besiege army of ally nation");

    //     // Get tiles belonging to the 9-tile region around the target army
    //     // Note: Need to be updated if attackRange is increased to above tileWidth
    //     Position[] memory nearbyTilePositions = getter.getTileRegionTilePositions(getter.getPositionExternal("StartPosition", _targetArmyID));

    //     // Attack target army with ally armies in range
    //     for (uint256 i; i < nearbyTilePositions.length; i++) {
    //         uint256[] memory armyIDs = getter.getArmiesAtTile(nearbyTilePositions[i]);

    //         for (uint256 j; j < armyIDs.length; j++) {
    //             uint256 armyNationID = getter.getNation(armyIDs[j]);
    //             if (getter.getNationTreatySignature(armyNationID, treatyID) != 0) {
    //                 // Use army to battle target army
    //                 game.battle(armyIDs[j], _targetArmyID);

    //                 // Return early if target army is dead
    //                 if (getter.getNation(_targetArmyID) == 0) return;
    //             }
    //         }
    //     }
    // }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    // function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
    //     // Disapprove if target nation is an ally
    //     (, , uint256 targetID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
    //     uint256 targetNationID = getter.getNation(targetID);
    //     uint256 treatyID = getter.getEntityByAddress(address(this));
    //     if (getter.getNationTreatySignature(targetNationID, treatyID) != 0) return false;

    //     return super.approveBattle(_nationID, _encodedParams);
    // }

    function _strEq(string memory _s1, string memory _s2) internal pure returns (bool) {
        if (bytes(_s1).length != bytes(_s2).length) return false;
        return (keccak256(abi.encodePacked((_s1))) == keccak256(abi.encodePacked((_s2))));
    }

    function approveDelegateGameFunction(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        // Disapprove if target nation is an ally
        (, , string memory functionName, , , bool canCall) = abi.decode(_encodedParams, (uint256, uint256, string, uint256, uint256, bool));
        // Alliance member cannot arbitrarily revoke delegation of Battle and Move functions
        if (_strEq(functionName, "Move") || _strEq(functionName, "Move")) {
            if (!canCall) {
                return false;
            }
        }
        return true;
    }
}
