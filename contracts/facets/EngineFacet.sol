//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {Position, TERRAIN, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/Component.sol";
import {Set} from "contracts/Set.sol";

/// @title Engine facet
/// @notice Contains player functions such as march, purchaseTroop, initializePlayer

contract EngineFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;
    address NULL_ADDR = address(0);

    // ----------------------------------------------------------------------
    // ECS FUNCTIONS (temp)
    // ----------------------------------------------------------------------

    function moveTroopECS(uint256 _troopId, Position memory _targetPosition) public {
        // 1. Verify that troop exists as an entity
        require(Set(gs().entities).includes(_troopId), "CURIO: Troop template not found");

        // 2. Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // 3. Verify that player is active
        uint256 _playerId = Util._getPlayerId(msg.sender);
        require(Util._getComponent("IsActive").has(_playerId), "CURIO: Player is inactive");

        // 4. Verify that position is in bound, and initialize tile
        require(Util._inBound(_targetPosition), "CURIO: Out of bound");
        if (!Util._getTileAt(_targetPosition).isInitializedECS) Util._initializeTileECS(_targetPosition);

        // 5. Verify that target position is different from starting position and within movement range
        Position memory _position = abi.decode(Util._getComponent("Position").getRawValue(_troopId), (Position));
        require(!Util._samePos(_position, _targetPosition), "CURIO: Already at destination");
        require(Util._withinDist(_position, _targetPosition, 1), "CURIO: You can only dispatch troop to the near tile");

        // 6. Verify ownership of troop by player
        require(abi.decode(Util._getComponent("Owner").getRawValue(_troopId), (uint256)) == _playerId, "CURIO: You can only dispatch own troop");

        // ... Movement cooldown ignored
        // ... Geographic checks ignored
        // ... March logic ignored

        // Final. Set new position
        Util._setComponentValue("Position", _troopId, abi.encode(_targetPosition));
    }

    function initializePlayerECS(Position memory _position, string memory _name) external returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();

        // Checkers
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._getPlayerCount() < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(gs().playerIdMap[msg.sender] == NULL, "CURIO: Player already initialized");
        require(Util._inBound(_position), "CURIO: Out of bound");
        if (!Util._getTileAt(_position).isInitializedECS) Util._initializeTileECS(_position);

        // // Verify that a "base" (aka. an entity which can purchase) is present
        // _set1.addArray(Util._getComponent("Position").getEntitiesWithRawValue(abi.encode(_position)));
        // _set2.addArray(Util._getComponent("CanPurchase").getEntities());
        // uint256[] memory _intersection = Util._intersection(_set1, _set2);
        // require(_intersection.length == 1, "CURIO: No base found");
        // uint256 _baseId = _intersection[0];

        // // Verify that base is not taken
        // require(!Util._getComponent("Owner").has(_baseId), "CURIO: Base is taken");

        // Spawn player
        WorldConstants memory _worldConstants = gs().worldConstants;
        uint256 _playerId = Util._addEntity();
        Util._setComponentValue("IsActive", _playerId, abi.encode(true));
        // Util._setComponentValue("Name", _playerId, abi.encode(_name));
        // Util._setComponentValue("Gold", _playerId, abi.encode(_worldConstants.initPlayerGoldBalance));
        // Util._setComponentValue("Oil", _playerId, abi.encode(_worldConstants.initPlayerOilBalance));
        // Util._setComponentValue("InitTimestamp", _playerId, abi.encode(block.timestamp));
        // Util._setComponentValue("BalanceLastUpdated", _playerId, abi.encode(block.timestamp));
        gs().players.push(msg.sender);
        gs().playerIdMap[msg.sender] = _playerId;

        // // Transfer base ownership
        // Util._getComponent("Owner").set(_baseId, abi.encode(_playerId));

        return _playerId;
    }

    // TODO: ECS events
    // Question: Is intersection the best way to find entities which satisfy multiple component conditions?
    // Question: Does simplicity outweigh slight obfuscation? e.g. Gold component assigned to both player balance and troop price
    // Question: Should past structs like Base or Troop be their own boolean components? Or should they be differentiated solely from "functional" components such as `canMove`?
    // Question: Should entityId increase with nonce or be randomly generated?
    // Question: How, if possible, can we have more efficient array intersections without creating sets first?
    // Note: TroopType now is just a template Troop, without Owner, Position, or isActive
    function purchaseTroopECS(Position memory _position, uint256 _troopTemplateId) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();

        // 1. Verify that parametric entity exists
        require(Set(gs().entities).includes(_troopTemplateId), "CURIO: Troop template not found");

        // 2. Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // 3. Verify that player is active
        uint256 _playerId = Util._getPlayerId(msg.sender);
        require(Util._getComponent("IsActive").has(_playerId), "CURIO: Player is inactive");

        // 4. Verify that position is in bound, and initialize tile
        require(Util._inBound(_position), "CURIO: Out of bound");
        if (!Util._getTileAt(_position).isInitializedECS) Util._initializeTileECS(_position);

        // // 5. Verify that a "base" (aka. an entity which can purchase) is present
        // _set1.addArray(Util._getComponent("Position").getEntitiesWithRawValue(abi.encode(_position)));
        // _set2.addArray(Util._getComponent("CanPurchase").getEntities());
        // uint256[] memory _intersection = Util._intersection(_set1, _set2);
        // require(_intersection.length == 1, "CURIO: No base found");
        // uint256 _baseId = _intersection[0];

        // // 6. Verify that player owns the "base"
        // require(abi.decode(Util._getComponent("Owner").getRawValue(_baseId), (uint256)) == _playerId, "CURIO: Can only purchase in own base");

        // // 7. Verify that no "troop" (aka. a movable entity) is present
        // _set2 = new Set();
        // _set2.addArray(Util._getComponent("CanMove").getEntities());
        // require(Util._intersection(_set1, _set2).length == 0, "CURIO: Base occupied by another troop");

        // // 8. Verify that the "base" can purchase the given type of "troop"
        // if (!Util._getComponent("IsLandTroop").has(_troopTemplateId)) {
        //     Position[] memory _neighbors = Util._getNeighbors(_position);
        //     bool _positionAdjacentToWater;
        //     for (uint256 i = 0; i < _neighbors.length; i++) {
        //         if (!Util._getTileAt(_neighbors[i]).isInitializedECS) Util._initializeTileECS(_neighbors[i]);
        //         if (Util._getTileAt(_neighbors[i]).terrain == TERRAIN.WATER) _positionAdjacentToWater = true;
        //     }
        //     require(_positionAdjacentToWater, "CURIO: Base cannot purchase selected troop type");
        // }

        // // 9. Fetch player gold balance and verify sufficience
        // Component _goldComponent = Util._getComponent("Gold");
        // uint256 _troopGoldPrice = abi.decode(_goldComponent.getRawValue(_troopTemplateId), (uint256));
        // uint256 _playerGoldBalance = abi.decode(_goldComponent.getRawValue(_playerId), (uint256));
        // require(_playerGoldBalance > _troopGoldPrice, "CURIO: Insufficient gold balance");

        // // 10. Set new player gold balance
        // Util._setComponentValue("Gold", _playerId, abi.encode(_playerGoldBalance - _troopGoldPrice));

        // 11. Add troop
        return Util._addTroopEntity(_playerId, _position, _troopTemplateId);
    }

    // /**
    //  * @dev Policy: All navies with 5+ health gain 100% attackFactor.
    //  * TODO: Range condition for components of common types such as uint256, for example for Health greater than 5 instead of checking every value between 5 and 12.
    //  *       This is essentially `.filter()`.
    //  * TODO: Location-based condition: "... navies in ports/next to oil wells with ..."
    //  * TODO: Time-bound condition: "... attackFactor within the next 10 seconds." (require backend)
    //  */
    // function sampleBuffPolicy() external {
    //     // Get navies
    //     Set _set1 = new Set();
    //     Set _set2 = new Set();
    //     _set1.addArray(Util._getComponent("CanMove").getEntities());
    //     _set2.addArray(Util._getComponent("IsLandTroop").getEntities());
    //     uint256[] memory _navies = Util._difference(_set1, _set2);
    //     _set1 = new Set();
    //     _set1.addArray(_navies);

    //     // Get navies with 5-12 health
    //     uint256[] memory _naviesWithFivePlusHealth = new uint256[](0);
    //     for (uint256 _health = 5; _health <= 12; _health++) {
    //         _set2 = new Set();
    //         _set2.addArray(Util._getComponent("Health").getEntitiesWithRawValue(abi.encode(_health)));
    //         _naviesWithFivePlusHealth = Util._concatenate(_naviesWithFivePlusHealth, Util._intersection(_set1, _set2));
    //     }

    //     // Double attack factor for all such navies
    //     uint256 _troopId;
    //     uint256 _attackFactor;
    //     for (uint256 i = 0; i < _naviesWithFivePlusHealth.length; i++) {
    //         _troopId = _naviesWithFivePlusHealth[i];
    //         _attackFactor = abi.decode(Util._getComponent("AttackFactor").getRawValue(_troopId), (uint256));
    //         Util._setComponentValue("AttackFactor", _troopId, abi.encode(_attackFactor * 2));
    //     }
    // }

    // /**
    //  * @dev Policy: The player's ports and cities gain movement ability, but they change from producing to consuming gold.
    //  */
    // function sampleImpossiblePolicy() external {
    //     // Get player's ports and cities
    //     Set _set1 = new Set();
    //     Set _set2 = new Set();
    //     _set1.addArray(Util._getComponent("CanPurchase").getEntities());
    //     _set2.addArray(Util._getComponent("Owner").getEntitiesWithRawValue(abi.encode(msg.sender)));
    //     uint256[] memory _playerBases = Util._intersection(_set1, _set2);

    //     // Update desired properties
    //     uint256 _baseId;
    //     for (uint256 i = 0; i < _playerBases.length; i++) {
    //         _baseId = _playerBases[i];
    //         Util._setComponentValue("CanMove", _baseId, abi.encode(true));
    //         Util._removeComponentValue("GoldRatePositive", _baseId);
    //     }
    // }
}
