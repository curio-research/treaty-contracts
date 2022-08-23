//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {EngineModules} from "contracts/libraries/EngineModules.sol";
import {BASE_NAME, Position, TERRAIN, Tile, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/Component.sol";
import {Set} from "contracts/Set.sol";

/// @title Engine facet
/// @notice Contains player functions such as march, purchaseTroop, initializePlayer

contract EngineFacet is UseStorage {
    using SafeMath for uint256;
    uint256 private NULL = 0;

    /**
     * @dev March army to a target position (move, battle, or capture).
     * @param _armyId army entity
     * @param _targetPosition target position
     */
    function march(uint256 _armyId, Position memory _targetPosition) external {
        // 1. Verify that army exists as an entity
        require(Set(gs().entities).includes(_armyId), "CURIO: Troop not found");

        // 2. Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // 3. Verify that player is active
        uint256 _playerId = Util._getPlayerId(msg.sender);
        require(Util._getComponent("IsActive").has(_playerId), "CURIO: Player is inactive");

        // 4. Verify that position is in bound, and initialize tile
        require(Util._inBound(_targetPosition), "CURIO: Out of bound");
        if (!Util._getTileAt(_targetPosition).isInitialized) Util._initializeTile(_targetPosition);

        // 5. Verify that target position is different from starting position and within movement range
        Position memory _sourcePosition = abi.decode(Util._getComponentValue("Position", _armyId), (Position));
        require(!Util._coincident(_sourcePosition, _targetPosition), "CURIO: Already at destination");
        require(Util._withinDistance(_sourcePosition, _targetPosition, 1), "CURIO: You can only dispatch troop to the near tile");

        // 6. Verify ownership of army by player
        require(abi.decode(Util._getComponentValue("Owner", _armyId), (uint256)) == _playerId, "CURIO: You can only dispatch own troop");

        // 7. Large action cooldown check
        uint256 _lastLargeActionTaken = abi.decode(Util._getComponentValue("LastLargeActionTaken", _armyId), (uint256));
        uint256 _largeActionCooldown = abi.decode(Util._getComponentValue("LargeActionCooldown", _armyId), (uint256));
        require(block.timestamp - _lastLargeActionTaken >= _largeActionCooldown, "CURIO: Large action taken too recently");

        // 8. Geographic check
        require(EngineModules._geographicCheckArmy(_armyId, _targetPosition), "CURIO: Troop and land type not compatible");

        // 9. March logic
        uint256 _targetArmyId = Util._getArmyAt(_targetPosition);
        if (_targetArmyId == NULL) {
            uint256 _targetBaseId = Util._getBaseAt(_targetPosition);
            if (_targetBaseId == NULL) {
                // CaseI: move army when target tile has no base or army
                EngineModules._moveArmy(_playerId, _armyId, _targetPosition);
            } else {
                if (abi.decode(Util._getComponentValue("Owner", _targetBaseId), (uint256)) == _playerId) {
                    // CaseII: move army when target tile has your base but no army
                    EngineModules._moveArmy(_playerId, _armyId, _targetPosition);
                } else {
                    // CaseIII: attack base when target tile has enemy base but no army
                    EngineModules._battleBase(_playerId, _armyId, _targetPosition);
                }
            }
        } else {
            // CaseIV: battle enemy army when target tile has one
            require(abi.decode(Util._getComponentValue("Owner", _targetArmyId), (uint256)) != _playerId, "CURIO: Destination tile occupied");
            EngineModules._battleArmy(_playerId, _armyId, _targetPosition);
        }

        Util._updatePlayerBalances(_playerId);
    }

    /**
     * @dev Dispatch troop to a target position.
     * @param _troopId troop entity
     * @param _targetPosition target position
     */
    function moveTroop(uint256 _troopId, Position memory _targetPosition) external {
        // 1. Verify that troop exists as an entity
        require(Set(gs().entities).includes(_troopId), "CURIO: Troop not found");

        // 2. Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // 3. Verify that player is active
        uint256 _playerId = Util._getPlayerId(msg.sender);
        require(Util._getComponent("IsActive").has(_playerId), "CURIO: Player is inactive");

        // 4. Verify that position is in bound, and initialize tile
        require(Util._inBound(_targetPosition), "CURIO: Out of bound");
        if (!Util._getTileAt(_targetPosition).isInitialized) Util._initializeTile(_targetPosition);

        // 5. Verify that target position is different from starting position and within movement range
        uint256 _armyId = abi.decode(Util._getComponentValue("ArmyId", _troopId), (uint256));
        Position memory _sourcePosition = abi.decode(Util._getComponentValue("Position", _armyId), (Position));
        require(!Util._coincident(_sourcePosition, _targetPosition), "CURIO: Already at destination");
        require(Util._withinDistance(_sourcePosition, _targetPosition, 1), "CURIO: You can only dispatch troop to the near tile");

        // 6. Verify ownership of troop by player
        require(abi.decode(Util._getComponentValue("Owner", _troopId), (uint256)) == _playerId, "CURIO: You can only dispatch own troop");

        // 7. Large action cooldown check
        uint256 _lastLargeActionTaken = abi.decode(Util._getComponentValue("LastLargeActionTaken", _armyId), (uint256));
        uint256 _largeActionCooldown = abi.decode(Util._getComponentValue("LargeActionCooldown", _armyId), (uint256));
        require(block.timestamp - _lastLargeActionTaken >= _largeActionCooldown, "CURIO: Large action taken too recently");

        // 8. Movement cooldown check
        uint256 _lastMoved = abi.decode(Util._getComponentValue("LastMoved", _armyId), (uint256));
        uint256 _movementCooldown = abi.decode(Util._getComponentValue("MovementCooldown", _armyId), (uint256));
        require(block.timestamp - _lastMoved >= _movementCooldown, "CURIO: Moved too recently");

        // 9. Geographic and base checks
        require(EngineModules._geographicCheckTroop(_troopId, _targetPosition), "CURIO: Troop and land type not compatible");
        require(Util._getBaseAt(_targetPosition) == NULL, "CURIO: Cannot directly attack with troops");

        // 10. March logic checks, and create new army if empty
        uint256 _targetArmyId = Util._getArmyAt(_targetPosition);
        if (_targetArmyId != NULL) {
            require(abi.decode(Util._getComponentValue("Owner", _targetArmyId), (uint256)) == _playerId, "CURIO: Cannot directly attack with troops");
            require(Util._getArmyTroops(_targetArmyId).length + 1 <= 5, "CURIO: Army can have up to five troops, or two with one transport");
        } else {
            _targetArmyId = Util._addArmy(_playerId, _targetPosition);
        }

        // 11. Move troop
        Util._setComponentValue("ArmyId", _troopId, abi.encode(_targetArmyId));

        // 12. Remove old army if empty
        if (Util._getArmyTroops(_armyId).length == 0) Util._removeArmy(_armyId);
    }

    /**
     * @dev Delete an owned troop (often to reduce expense).
     * @param _troopId identifier for troop
     */
    function deleteTroop(uint256 _troopId) external {
        uint256 _playerId = Util._getPlayerId(msg.sender);
        require(abi.decode(Util._getComponentValue("Owner", _troopId), (uint256)) == _playerId, "CURIO: Can only delete own troop");

        uint256 _armyId = abi.decode(Util._getComponentValue("ArmyId", _troopId), (uint256));
        if (Util._getArmyTroops(_armyId).length <= 1) Util._removeArmy(_armyId);
        Util._removeTroop(_troopId);
    }

    /**
     * @dev Purchase a new troop.
     * @param _position position to purchase troop
     * @param _troopTemplateId identifier for desired troop type
     * @return _troopId identifier for new troop
     */
    function purchaseTroop(Position memory _position, uint256 _troopTemplateId) external returns (uint256) {
        // 1. Verify that parametric entity exists
        require(Set(gs().entities).includes(_troopTemplateId), "CURIO: Troop template not found");

        // 2. Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // 3. Verify that player is active
        uint256 _playerId = Util._getPlayerId(msg.sender);
        require(Util._getComponent("IsActive").has(_playerId), "CURIO: Player is inactive");

        // 4. Verify that position is in bound, and initialize tile
        require(Util._inBound(_position), "CURIO: Out of bound");
        if (!Util._getTileAt(_position).isInitialized) Util._initializeTile(_position);

        // 5. Verify that a "base" (aka. an entity which can purchase) is present
        uint256 _baseId = Util._getBaseAt(_position);
        require(_baseId != NULL, "CURIO: No base found");

        // 6. Verify that player owns the "base"
        require(abi.decode(Util._getComponentValue("Owner", _baseId), (uint256)) == _playerId, "CURIO: Can only purchase in own base");

        // 7. Verify that no "troop" (aka. a movable entity) is present
        require(Util._getArmyAt(_position) == NULL, "CURIO: Base occupied by another troop");

        // 8. Verify that the "base" can purchase the given type of "troop"
        if (!Util._getComponent("IsLandTroop").has(_troopTemplateId)) {
            Position[] memory _neighbors = Util._getNeighbors(_position);
            bool _isCoast;
            for (uint256 i = 0; i < _neighbors.length; i++) {
                if (!Util._getTileAt(_neighbors[i]).isInitialized) Util._initializeTile(_neighbors[i]);
                if (Util._getTileAt(_neighbors[i]).terrain == TERRAIN.WATER) _isCoast = true;
            }
            assert(_isCoast == (Util._getTileAt(_position).terrain == TERRAIN.COAST));
            require(_isCoast, "CURIO: Base cannot purchase selected troop type");
        }

        // 9. Fetch player gold balance and verify sufficience
        uint256 _troopGoldPrice = abi.decode(Util._getComponentValue("Gold", _troopTemplateId), (uint256));
        uint256 _playerGoldBalance = abi.decode(Util._getComponentValue("Gold", _playerId), (uint256));
        require(_playerGoldBalance > _troopGoldPrice, "CURIO: Insufficient gold balance");

        // 10. Set new player gold balance
        Util._setComponentValue("Gold", _playerId, abi.encode(_playerGoldBalance - _troopGoldPrice));

        // 11. Add new army
        uint256 _armyId = Util._addArmy(_playerId, _position);

        // 12. Add troop and return its ID
        return Util._addTroop(_playerId, _troopTemplateId, _armyId);
    }

    /**
     * @dev Self-initialize as a player.
     * @param _position starting position of the player
     * @param _name name of the player
     * @return _playerId identifier for the player
     */
    function initializePlayer(Position memory _position, string memory _name) external returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();

        // Checkers
        require(!gs().isPaused, "CURIO: Game is paused");
        require(gs().players.length < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(gs().playerIdMap[msg.sender] == NULL, "CURIO: Player already initialized");
        require(Util._inBound(_position), "CURIO: Out of bound");
        if (!Util._getTileAt(_position).isInitialized) Util._initializeTile(_position);

        // Verify that a "base" (aka. an entity which can purchase) is present
        _set1.addArray(Util._getComponent("Position").getEntitiesWithRawValue(abi.encode(_position)));
        _set2.addArray(Util._getComponent("CanPurchase").getEntities());
        uint256[] memory _intersection = Util._intersection(_set1, _set2);
        require(_intersection.length == 1, "CURIO: No base found");
        uint256 _baseId = _intersection[0];

        // Verify that base is not taken
        require(!Util._getComponent("Owner").has(_baseId), "CURIO: Base is taken");

        // Spawn player
        WorldConstants memory _worldConstants = gs().worldConstants;
        uint256 _playerId = Util._addEntity();
        Util._setComponentValue("IsActive", _playerId, abi.encode(true));
        Util._setComponentValue("Name", _playerId, abi.encode(_name));
        Util._setComponentValue("Gold", _playerId, abi.encode(_worldConstants.initPlayerGoldBalance));
        Util._setComponentValue("Oil", _playerId, abi.encode(_worldConstants.initPlayerOilBalance));
        Util._setComponentValue("InitTimestamp", _playerId, abi.encode(block.timestamp));
        Util._setComponentValue("BalanceLastUpdated", _playerId, abi.encode(block.timestamp));
        gs().players.push(msg.sender);
        gs().playerIdMap[msg.sender] = _playerId;

        // Transfer base ownership
        Util._setComponentValue("Owner", _baseId, abi.encode(_playerId));
        Util._setComponentValue("Health", _baseId, abi.encode(800));
        Util._setComponentValue("GoldPerSecond", _playerId, abi.encode(_worldConstants.defaultBaseGoldGenerationPerSecond));
        Util._setComponentValue("GoldRatePositive", _playerId, abi.encode(true));

        return _playerId;
    }

    /**
     * @dev Policy: All navies with 5+ health gain 100% attackFactor.
     * TODO: Range condition for components of common types such as uint256, for example for Health greater than 5 instead of checking every value between 5 and 12.
     *       This is essentially `.filter()`.
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
            Util._removeComponentValue("GoldRatePositive", _baseId);
        }
    }
}
