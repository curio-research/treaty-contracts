//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/CurioTreaty.sol";
import {console} from "forge-std/console.sol";

contract TestTreaty is CurioTreaty {
    constructor(address _diamond) CurioTreaty(_diamond) {
        name = "Test Treaty";
        description = "Treaty for testing";
    }

    function treatyJoin() public override {
        // Delegate DelegateGameFunction function to treaty
        treatyDelegateGameFunction("DelegateGameFunction", 0, true);

        super.treatyJoin();
    }

    function treatyLeave() public override {
        // Undelegate DelegateGameFunction function to treaty
        treatyDelegateGameFunction("DelegateGameFunction", 0, false);

        super.treatyLeave();
    }

    function treatyUpgradeCapital(uint256 _capitalID) public onlySigner {
        uint256 nationID = getter.getEntityByAddress(msg.sender);

        game.delegateGameFunction(nationID, "UpgradeCapital", getter.getEntityByAddress(address(this)), _capitalID, true);
        game.delegateGameFunction(nationID, "HarvestResourcesFromCapital", getter.getEntityByAddress(address(this)), _capitalID, true);

        game.upgradeCapital(_capitalID);

        game.delegateGameFunction(nationID, "UpgradeCapital", getter.getEntityByAddress(address(this)), _capitalID, false);
        game.delegateGameFunction(nationID, "HarvestResourcesFromCapital", getter.getEntityByAddress(address(this)), _capitalID, false);
    }

    function approveUpgradeCapital(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        (uint256 callerID, ) = abi.decode(_encodedParams, (uint256, uint256));
        if (_nationID == callerID) return false;

        return super.approveUpgradeCapital(_nationID, _encodedParams);
    }
}
