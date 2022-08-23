//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Engine facet
/// @notice Contains player functions such as march, purchaseTroop, initializePlayer

contract PolicyFacet is UseStorage {
    using SafeMath for uint256;
    uint256 private NULL = 0;

    /**
     * @dev Policy: All navies with 5+ health gain 100% attackFactor.
     * TODO: Location-based condition: "... navies in ports/next to oil wells with ..."
     * TODO: Time-bound condition: "... attackFactor within the next 10 seconds." (require backend)
     */
    function sampleBuffPolicy() external {
        // Get navies with at least 5 health
        uint256[] memory _naviesWithFivePlusHealth = Util._filterByComponentRange(Util._getNavies(), "Health", 5, 12);

        // Double attack factor for all such navies
        uint256 _troopId;
        uint256 _attackFactor;
        for (uint256 i = 0; i < _naviesWithFivePlusHealth.length; i++) {
            _troopId = _naviesWithFivePlusHealth[i];
            _attackFactor = abi.decode(Util._getComponentValue("AttackFactor", _troopId), (uint256));
            Util._setComponentValue("AttackFactor", _troopId, abi.encode(_attackFactor * 2));
        }
    }

    /**
     * @dev Policy: The player's ports and cities gain movement ability, but they change from producing to consuming gold.
     */
    function sampleImpossiblePolicy() external {
        // Get player's ports and cities
        uint256 _playerId = gs().playerIdMap[msg.sender];
        uint256[] memory _playerBases = Util._getPlayerBases(_playerId);

        // Update desired properties
        uint256 _baseId;
        for (uint256 i = 0; i < _playerBases.length; i++) {
            _baseId = _playerBases[i];
            Util._setComponentValue("CanMove", _baseId, abi.encode(true));
            int256 _goldPerSecond = abi.decode(Util._getComponentValue("GoldPerSecond", _baseId), (int256));
            Util._setComponentValue("GoldPerSecond", _baseId, abi.encode(-_goldPerSecond));
        }
    }
}
