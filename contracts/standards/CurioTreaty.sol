// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ITreaty} from "contracts/interfaces/ITreaty.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {AdminFacet} from "contracts/facets/AdminFacet.sol";

// import {CurioERC20} from "contracts/standards/CurioERC20.sol";
// import {Position} from "contracts/libraries/Types.sol";

abstract contract CurioTreaty is ITreaty {
    address public diamond;
    GameFacet public game;
    GetterFacet public getter;
    AdminFacet public admin;
    string public name;
    string public description;

    constructor(address _diamond) {
        require(_diamond != address(0), "CurioTreaty: Diamond address required");

        diamond = _diamond;
        game = GameFacet(_diamond);
        getter = GetterFacet(_diamond);
        admin = AdminFacet(_diamond);
    }

    modifier onlyGame() {
        require(msg.sender == diamond, "CurioTreaty: Only game can call");
        _;
    }

    modifier onlySigner() {
        require(getter.getNationTreatySignature(getter.getEntityByAddress(msg.sender), getter.getEntityByAddress(address(this))) != 0, "CurioTreaty: Only signer can call");
        _;
    }

    // ----------------------------------------------------------
    // MEMBERSHIP FUNCTIONS (CALLED BY NATION)
    // ----------------------------------------------------------

    function treatyJoin() public virtual {
        // Add signature
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        admin.addSigner(nationID);
    }

    function treatyLeave() public virtual {
        // Remove signature
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        admin.removeSigner(nationID);
    }

    /// @dev Delegate or undelegate a game function to this treaty. Recommended in constructor.
    function treatyDelegateGameFunction(
        string memory _functionName,
        uint256 _subjectID,
        bool _canCall
    ) public virtual {
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        admin.adminDelegateGameFunction(nationID, _functionName, _subjectID, _canCall);
    }

    // ----------------------------------------------------------
    // APPROVE FUNCTIONS (CALLED BY GAME)
    // ----------------------------------------------------------

    function approveUpgradeCapital(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveMoveCapital(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveClaimTile(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveUpgradeTile(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveRecoverTile(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveDisownTile(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveStartTroopProduction(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveEndTroopProduction(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveMove(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveOrganizeArmy(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveDisbandArmy(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveStartGather(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveEndGather(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveUnloadResources(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveHarvestResource(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveHarvestResourcesFromCapital(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveUpgradeResource(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveJoinTreaty(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveLeaveTreaty(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveDelegateGameFunction(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }
}

// contract Alliance is CurioTreaty {
//     CurioERC20 public goldToken;

//     constructor(address _diamond) CurioTreaty(_diamond) {
//         goldToken = getter.getTokenContract("Gold");

//         name = "Alliance";
//         description = "A treaty between two or more countries to work together towards a common goal or to defend each other in the case of external aggression";
//     }

//     function treatyJoin() public override {
//         // Transfer 1000 gold from nation to treaty
//         address nationCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
//         goldToken.transferFrom(nationCapitalAddress, address(this), 1000);

//         // Delegate Battle function for all armies
//         treatyDelegateGameFunction("Battle", 0, true);

//         super.treatyJoin();
//     }

//     function treatyLeave() public override {
//         // Check if nation has stayed in alliance for at least 10 seconds
//         uint256 nationID = getter.getEntityByAddress(msg.sender);
//         uint256 treatyID = getter.getEntityByAddress(address(this));
//         uint256 nationJoinTime = abi.decode(getter.getComponent("InitTimestamp").getBytesValue(getter.getNationTreatySignature(nationID, treatyID)), (uint256));
//         require(block.timestamp - nationJoinTime >= 10, "Alliance: Nation must stay for at least 10 seconds");

//         // Transfer 1000 gold from treaty back to nation
//         address nationCapitalAddress = getter.getAddress(getter.getCapital(nationID));
//         goldToken.transfer(nationCapitalAddress, 1000);

//         // Undelegate Battle function for all armies
//         treatyDelegateGameFunction("Battle", 0, false);

//         super.treatyLeave();
//     }

//     /**
//      * @dev Battle a target army belonging to a non-ally nation with all nearby ally armies.
//      * @param _targetArmyID target army entity
//      */
//     function treatyBesiege(uint256 _targetArmyID) public onlySigner {
//         // Check if target army is in a non-ally nation
//         uint256 targetNationID = getter.getNation(_targetArmyID);
//         uint256 treatyID = getter.getEntityByAddress(address(this));
//         require(getter.getNationTreatySignature(targetNationID, treatyID) == 0, "Alliance: Cannot besiege army of ally nation");

//         // Get tiles beloning to the 9-tile region around the target army
//         // Note: Need to be updated if attackRange is increased to above tileWidth
//         Position[] memory nearbyTilePositions = getter.getTileRegionTilePositions(getter.getPositionExternal("StartPosition", _targetArmyID));

//         // Attack target army with ally armies in range
//         for (uint256 i; i < nearbyTilePositions.length; i++) {
//             uint256[] memory armyIDs = getter.getArmiesAtTile(nearbyTilePositions[i]);

//             for (uint256 j; j < armyIDs.length; j++) {
//                 uint256 armyNationID = getter.getNation(armyIDs[j]);
//                 if (getter.getNationTreatySignature(armyNationID, treatyID) != 0) {
//                     // Use army to battle target army
//                     game.battle(armyIDs[j], _targetArmyID);

//                     // Return early if target army is dead
//                     if (getter.getNation(_targetArmyID) == 0) return;
//                 }
//             }
//         }
//     }

//     function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
//         // Disapprove if target nation is an ally
//         (, , uint256 targetID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
//         uint256 targetNationID = getter.getNation(targetID);
//         uint256 treatyID = getter.getEntityByAddress(address(this));
//         if (getter.getNationTreatySignature(targetNationID, treatyID) != 0) return false;

//         return super.approveBattle(_nationID, _encodedParams);
//     }
// }
