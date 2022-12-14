// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
*
* Implementation of a diamond.
/******************************************************************************/

import {WorldConstants} from "contracts/libraries/Types.sol";
import {LibDiamond} from "contracts/libraries/LibDiamond.sol";
import {IDiamondLoupe} from "contracts/interfaces/IDiamondLoupe.sol";
import {IDiamondCut} from "contracts/interfaces/IDiamondCut.sol";
import {IERC173} from "contracts/interfaces/IERC173.sol";
import {IERC165} from "contracts/interfaces/IERC165.sol";
import {Set} from "contracts/Set.sol";
import {UseStorage} from "contracts/libraries/Storage.sol";

// It is expected that this contract is customized if you want to deploy your diamond
// with data from a deployment script. Use the init function to initialize state variables
// of your diamond. Add parameters to the init funciton if you need to.

// temporarily disable to test foundry test
contract DiamondInit is UseStorage {
    // You can add parameters to this function in order to pass in
    // data to set your own state variables
    function init(WorldConstants memory _worldConstants) external {
        // adding ERC165 data
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        ds.supportedInterfaces[type(IERC165).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;
        ds.supportedInterfaces[type(IERC173).interfaceId] = true;

        // add your own state variables
        // EIP-2535 specifies that the `diamondCut` function takes two optional
        // arguments: address _init and bytes calldata _calldata
        // These arguments are used to execute an arbitrary function using delegatecall
        // in order to set state variables in the diamond during deployment or an upgrade
        // More info here: https://eips.ethereum.org/EIPS/eip-2535#diamond-interface

        // set world constants
        gs().worldConstants = _worldConstants;

        // initialize entities
        gs().entities = address(new Set());
        gs().entityNonce = 1;
        gs().tileNonce = 1;
        gs().walletNonce = 1;

        // set function names
        string[] memory gameFunctionNames = new string[](22);
        gameFunctionNames[0] = "InitializeNation";
        gameFunctionNames[1] = "UpgradeCapital";
        gameFunctionNames[2] = "MoveCapital";
        gameFunctionNames[3] = "ClaimTile";
        gameFunctionNames[4] = "UpgradeTile";
        gameFunctionNames[5] = "RecoverTile";
        gameFunctionNames[6] = "DisownTile";
        gameFunctionNames[7] = "StartTroopProduction";
        gameFunctionNames[8] = "EndTroopProduction";
        gameFunctionNames[9] = "Move";
        gameFunctionNames[10] = "OrganizeArmy";
        gameFunctionNames[11] = "DisbandArmy";
        gameFunctionNames[12] = "StartGather";
        gameFunctionNames[13] = "EndGather";
        gameFunctionNames[14] = "UnloadResources";
        gameFunctionNames[15] = "HarvestResource";
        gameFunctionNames[16] = "HarvestResourcesFromCapital";
        gameFunctionNames[17] = "UpgradeResource";
        gameFunctionNames[18] = "Battle";
        gameFunctionNames[19] = "JoinTreaty";
        gameFunctionNames[20] = "LeaveTreaty";
        gameFunctionNames[21] = "DelegateGameFunction";
        gs().gameFunctionNames = gameFunctionNames;
        for (uint256 i; i < gameFunctionNames.length; i++) {
            gs().isGameFunction[gameFunctionNames[i]] = true;
        }

        // set initial time
        gs().gameInitTimestamp = block.timestamp;
    }
}
