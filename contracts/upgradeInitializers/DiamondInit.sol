pragma solidity ^0.8.0;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
*
* Implementation of a diamond.
/******************************************************************************/
import {Base, TroopType, WorldConstants} from "contracts/libraries/Types.sol";
import {LibDiamond} from "contracts/libraries/LibDiamond.sol";
import {IDiamondLoupe} from "contracts/interfaces/IDiamondLoupe.sol";
import {IDiamondCut} from "contracts/interfaces/IDiamondCut.sol";
import {IERC173} from "contracts/interfaces/IERC173.sol";
import {IERC165} from "contracts/interfaces/IERC165.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import "contracts/libraries/Storage.sol";

contract DiamondInit is UseStorage {
    function init(
        WorldConstants memory _worldConstants,
        TroopType[] memory _troopTypes
    ) external {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        ds.supportedInterfaces[type(IERC165).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;
        ds.supportedInterfaces[type(IERC173).interfaceId] = true;

        gs().worldConstants = _worldConstants;

        for (uint256 i = 0; i < _troopTypes.length; i++) {
            gs().troopTypeIds.push(i + 1);
            gs().troopTypeIdMap[i + 1] = _troopTypes[i];
        }

        gs().troopNonce++;

        gs().armyNonce++;

        gs().baseNonce++;
    }
}
