//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/tokens/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {console} from "forge-std/console.sol";

// contract NonAggressivePact is CurioTreaty {
//     CurioERC20 public goldToken;
//     CurioERC20 public foodToken;
//     address deployerAddress;
//     address[] public members;
//     mapping(address => bool) isMember;
//     address[] public whiteListedCandidates;
//     mapping(address => bool) isWhiteListed;

//     uint256 goldFee;
//     uint256 foodFee;

//     modifier onlyOwnerOrPact() {
//         require(msg.sender == deployerAddress || msg.sender == address(this), "NAPact: You do not have owner-level permission");
//         _;
//     }

//     constructor(
//         address _diamond,
//         uint256 _goldFee,
//         uint256 _foodFee
//     ) CurioTreaty(_diamond) {
//         goldToken = getter.getTokenContract("Gold");
//         foodToken = getter.getTokenContract("Food");
//         name = "Non-Aggressive Pact";
//         description = "Member nations cannot battle armies or tiles of one another";

//         deployerAddress = msg.sender;

//         goldFee = _goldFee;
//         foodFee = _foodFee;

//         members.push(msg.sender);
//         isMember[msg.sender] = true;
//     }

//     function setGoldFee(uint256 _newGoldFee) public onlyOwnerOrPact {
//         goldFee = _newGoldFee;
//     }

//     function setFoodFee(uint256 _newFoodFee) public onlyOwnerOrPact {
//         foodFee = _newFoodFee;
//     }

//     function whiteListCandidate(address _candidate) public onlyOwnerOrPact {
//         isWhiteListed[_candidate] = true;
//         whiteListedCandidates.push(_candidate);
//     }

//     function removeWhiteListedCandidate(address _candidate) public onlyOwnerOrPact {
//         isWhiteListed[_candidate] = false;
//         for (uint256 i = 0; i < whiteListedCandidates.length; i++) {
//             if (whiteListedCandidates[i] == element) {
//                 whiteListedCandidates.splice(i, 1);
//                 return;
//             }
//         }
//     }

//     function removeMember(address _member) public onlyOwnerOrPact {
//         // member needs to be whitelisted again before joining
//         removeWhiteListedCandidate(_member);

//         // remove membership
//         isMember[_member] = false;
//         for (uint256 i = 0; i < members.length; i++) {
//             if (members[i] == element) {
//                 members.splice(i, 1);
//                 return;
//             }
//         }
//     }

//     function executeTx(address _contractAddress, bytes memory _data) public onlyOwnerOrPact {
//         // FIXME: unsafe low-level call
//         (bool success, bytes memory returndata) = _contractAddress.call(_data);
//         require(success, string(returndata));
//     }

//     function treatyJoin() public override {
//         // treaty owner needs to first whitelist the msg.sender
//         require(isWhiteListed[msg.sender], "Candidate is not whitelisted");

//         // caller first needs to approve treaty to spend exactly enough to pay the token fee
//         // todo: make it into one-call upon switching to openZeppelin
//         require(goldToken._allowance[msg.sender] >= goldFee, "Candidate needs to first approve enough gold spending");
//         require(foodToken._allowance[msg.sender] >= foodFee, "Candidate needs to first approve enough food spending");
//         (bool success1, ) = goldToken.call(abi.encodeWithSignature("transferFrom(address,address,uint256)", msg.sender, address(this), goldFee));
//         require(success1, "NAPact: Fail to pay gold fee!");
//         (bool success2, ) = foodToken.call(abi.encodeWithSignature("transferFrom(address,address,uint256)", msg.sender, address(this), foodFee));
//         require(success2, "NAPact: Fail to pay food fee!");

//         // join treaty
//         isMember[msg.sender] = true;
//         members.push(msg.sender);

//         super.treatyJoin();
//     }

//     function treatyLeave() public override {
//         // Check if nation has stayed in alliance for at least 10 seconds
//         uint256 nationID = getter.getEntityByAddress(msg.sender);
//         uint256 treatyID = getter.getEntityByAddress(address(this));
//         uint256 nationJoinTime = abi.decode(getter.getComponent("InitTimestamp").getBytesValue(getter.getNationTreatySignature(nationID, treatyID)), (uint256));
//         require(block.timestamp - nationJoinTime >= 10, "NAPact: Nation must stay for at least 10 seconds");
//         removeMember(msg.sender);
//         super.treatyLeave();
//     }

//     function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
//         // Disapprove if target nation is an ally
//         (, , uint256 targetID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
//         address targetNationAddress = getter.getEntityByAddress(getter.getNation(targetID));
//         if (isMember[targetNationAddress]) {
//             return false;
//         } else return super.approveBattle(_nationID, _encodedParams);
//     }
// }
