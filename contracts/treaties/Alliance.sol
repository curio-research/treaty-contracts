//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {Position} from "contracts/libraries/Types.sol";

contract Alliance is CurioTreaty {
    CurioERC20 public goldToken;

    function init(address _diamond) public override {
        super.init(_diamond);
        GetterFacet getter = GetterFacet(diamond);
        goldToken = getter.getTokenContract("Gold");
    }

    function name() external pure override returns (string memory) {
        return "Alliance";
    }

    function description() external pure override returns (string memory) {
        return "A treaty between two or more countries to work together towards a common goal or to defend each other in the case of external aggression";
    }

    // ----------------------------------------------------------
    // Player functions
    // ----------------------------------------------------------

    function treatyJoin() public override {
        GetterFacet getter = GetterFacet(diamond);

        // Transfer 1000 gold from nation to treaty
        address nationCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        goldToken.transferFrom(nationCapitalAddress, address(this), 1000);

        // Delegate Battle function for all armies
        treatyDelegateGameFunction("Battle", 0, true);

        super.treatyJoin();
    }

    function treatyLeave() public override minimumStay(10) {
        GetterFacet getter = GetterFacet(diamond);
      
        // Transfer 1000 gold from treaty back to nation
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        address nationCapitalAddress = getter.getAddress(getter.getCapital(nationID));
        goldToken.transfer(nationCapitalAddress, 1000);

        // Undelegate Battle function for all armies
        treatyDelegateGameFunction("Battle", 0, false);

        super.treatyLeave();
    }

    /**
     * @dev Battle a target army belonging to a non-ally nation with all nearby ally armies.
     * @param _targetArmyID target army entity
     */
    function treatyBesiege(uint256 _targetArmyID) public onlySigner {
        GetterFacet getter = GetterFacet(diamond);
     
        // Check if target army is in a non-ally nation
        uint256 targetNationID = getter.getNation(_targetArmyID);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        require(getter.getNationTreatySignature(targetNationID, treatyID) == 0, "Alliance: Cannot besiege army of ally nation");

        // Get tiles belonging to the 9-tile region around the target army
        // Note: Need to be updated if attackRange is increased to above tileWidth
        Position[] memory nearbyTilePositions = getter.getTileRegionTilePositions(getter.getPositionExternal("StartPosition", _targetArmyID));

        // Attack target army with ally armies in range
        for (uint256 i; i < nearbyTilePositions.length; i++) {
            uint256[] memory armyIDs = getter.getArmiesAtTile(nearbyTilePositions[i]);

            for (uint256 j; j < armyIDs.length; j++) {
                uint256 armyNationID = getter.getNation(armyIDs[j]);
                if (getter.getNationTreatySignature(armyNationID, treatyID) != 0) {
                    // Use army to battle target army
                    GameFacet(diamond).battle(armyIDs[j], _targetArmyID);

                    // Return early if target army is dead
                    if (getter.getNation(_targetArmyID) == 0) return;
                }
            }
        }
    }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------

    function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        GetterFacet getter = GetterFacet(diamond);

        // Disapprove if target nation is an ally
        (, , uint256 targetID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
        uint256 targetNationID = getter.getNation(targetID);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        if (getter.getNationTreatySignature(targetNationID, treatyID) != 0) return false;

        return super.approveBattle(_nationID, _encodedParams);
    }
}
