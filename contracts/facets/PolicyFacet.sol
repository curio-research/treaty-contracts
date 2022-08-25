//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Set} from "contracts/Set.sol";
import {Component} from "contracts/Component.sol";
import {AddressComponent, BoolComponent, IntComponent, PositionComponent, StringComponent, UintComponent} from "contracts/TypedComponents.sol";

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
        for (uint256 i = 0; i < _naviesWithFivePlusHealth.length; i++) {
            _troopId = _naviesWithFivePlusHealth[i];
            Util._setUint("AttackFactor", _troopId, Util._getUint("AttackFactor", _troopId) * 2);
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
            Util._setBool("CanMove", _baseId);
            int256 _goldPerSecond = Util._getInt("GoldPerSecond", _baseId);
            Util._setInt("GoldPerSecond", _baseId, -_goldPerSecond);
        }
    }

    /**
     * @dev Sample Policy: If player's name is Stalin, all his troop health restored to its maximum,
      but the cost is that he loses half of his gold
     */
    function workersOfTheWorldUnite() external {
        // 1. Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // 2. Verify that player is active
        uint256 _playerId = gs().playerIdMap[msg.sender];
        require(BoolComponent(gs().components["IsActive"]).has(_playerId), "CURIO: Player is inactive");

        // 3. Verify that player name is Stalin
        require(Util._strEq(Util._getString("Name", _playerId), "Stalin"), "CURIO: Sorry bro, you're not our comrade");

        // 4. Get "red army"
        Set _set1 = new Set();
        Set _set2 = new Set();
        _set1.addArray(BoolComponent(gs().components["CanMove"]).getEntities());
        _set2.addArray(BoolComponent(gs().components["IsLandTroop"]).getEntities());
        uint256[] memory _redTroops = Util._intersection(_set1, _set2);

        _set1 = new Set();
        _set1.addArray(_redTroops);
        _set2 = new Set();
        _set2.addArray(UintComponent(gs().components["Owner"]).getEntitiesWithValue(_playerId));
        _redTroops = Util._intersection(_set1, _set2);

        // 5. "Red army" yells "long live socialism" and expropriates people's bread (restore health)
        uint256 _troopId;
        for (uint256 i = 0; i < _redTroops.length; i++) {
            _troopId = _redTroops[i];
            Util._setUint("Health", _troopId, Util._getUint("MaxHealth", _troopId));
        }

        // 6. Private property is an exploision of labor power (reduce player's gold balance)
        Util._setUint("Gold", _playerId, Util._getUint("Gold", _playerId) / 2);
    }
}
