//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {EngineModules} from "contracts/libraries/EngineModules.sol";
import {Army, BASE_NAME, Base, GameState, Player, Position, TERRAIN, Tile, Troop, TroopType, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/Component.sol";
import {Set} from "contracts/Set.sol";

/// @title Engine facet
/// @notice Contains player functions such as march, purchaseTroop, initializePlayer

contract EngineFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;
    address NULL_ADDR = address(0);

    function marchECS(uint256 _armyId, Position memory _targetPos) external {}

    /**
     * March army to a target position (move, battle, or capture).
     * @param _armyId identifier for troop
     * @param _targetPos target position
     */
    function march(uint256 _armyId, Position memory _targetPos) external {
        // basic check
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");
        require(Util._inBound(_targetPos), "CURIO: Target out of bound");
        if (!Util._getTileAt(_targetPos).isInitialized) Util._initializeTile(_targetPos);

        Army memory _army = Util._getArmy(_armyId);
        require(_army.owner == msg.sender, "CURIO: Can only march own troop");
        require(!Util._samePos(_army.pos, _targetPos), "CURIO: Already at destination");
        require((block.timestamp - _army.lastLargeActionTaken) >= Util._getArmyLargeActionCooldown(_army.troopIds), "CURIO: Large action taken too recently");

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        require(EngineModules._geographicCheckArmy(_armyId, _targetTile), "CURIO: Troops and land type not compatible");

        if (_targetTile.occupantId == NULL) {
            if (_targetTile.baseId == NULL) {
                // CaseI: move army when target tile has no base or army
                EngineModules._moveArmy(msg.sender, _armyId, _targetPos);
            } else {
                if (Util._getBaseOwner(_targetTile.baseId) == msg.sender) {
                    // CaseII: move army when target tile has your base but no army
                    EngineModules._moveArmy(msg.sender, _armyId, _targetPos);
                } else {
                    // CaseIII: attack base when target tile has enemy base but no army
                    EngineModules._battleBase(msg.sender, _armyId, _targetPos);
                }
            }
        } else {
            // CaseIV: battle enemy army when target tile has one
            require(gs().armyIdMap[_targetTile.occupantId].owner != msg.sender, "CURIO: Destination tile occupied");
            EngineModules._battleArmy(msg.sender, _armyId, _targetPos);
        }

        Util._updateArmy(msg.sender, _army.pos, _targetPos); // update army info on start tile and end tile
        Util._emitPlayerInfo(msg.sender); // updates player info
    }

    /**
     * Dispatch troop to a target position (_moveArmy, _loadTroop, _clearTroopFromSourceArmy etc.).
     * @param _troopId identifier for troop
     * @param _targetPos target position
     */
    function moveTroop(uint256 _troopId, Position memory _targetPos) public {
        // basic check
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");
        require(Util._inBound(_targetPos), "CURIO: Target out of bound");
        if (!Util._getTileAt(_targetPos).isInitialized) Util._initializeTile(_targetPos);

        Troop memory _troop = gs().troopIdMap[_troopId];
        Army memory _army = gs().armyIdMap[_troop.armyId];
        Position memory _startPos = _army.pos;
        Army memory _targetArmy;
        Tile memory _targetTile = Util._getTileAt(_targetPos);

        if (_targetTile.occupantId != NULL) {
            _targetArmy = Util._getArmy(_targetTile.occupantId);
            require(_targetArmy.owner == msg.sender, "CURIO: You can only combine with own troop");
        }

        require(Util._withinDist(_startPos, _targetPos, 1), "CURIO: You can only dispatch troop to the near tile");
        require(_army.owner == msg.sender, "CURIO: You can only dispatch own troop");
        require(!Util._samePos(_startPos, _targetPos), "CURIO: Already at destination");
        require((block.timestamp - _army.lastLargeActionTaken) >= Util._getArmyLargeActionCooldown(_army.troopIds), "CURIO: Large action taken too recently");

        require(EngineModules._geographicCheckTroop(_troop.troopTypeId, _targetTile), "CURIO: Troop and land type not compatible");

        if (_targetTile.occupantId == NULL) {
            // CaseI: Target Tile has no enemy base or enemy army
            require(Util._getBaseOwner(_targetTile.baseId) == msg.sender || _targetTile.baseId == NULL, "CURIO: Cannot directly attack with troops");

            uint256 _newArmyId = Util._createNewArmyFromTroop(msg.sender, _troopId, _startPos);
            EngineModules._moveNewArmyToEmptyTile(_newArmyId, _targetPos);
        } else {
            // CaseII: Target Tile has own army
            require(_targetArmy.troopIds.length + 1 <= 5, "CURIO: Army can have up to five troops, or two with one transport");
            EngineModules._moveTroopToArmy(_targetTile.occupantId, _troopId);
        }
        EngineModules._clearTroopFromSourceArmy(_troop.armyId, _troopId);

        Util._updateArmy(msg.sender, _startPos, _targetPos);
        Util._emitPlayerInfo(msg.sender);
    }

    // ----------------------------------------------------------------------
    // ECS FUNCTIONS
    // ----------------------------------------------------------------------

    /**
     * Dispatch troop to a target position.
     * @param _troopId troop entity
     * @param _targetPosition target position
     */
    function moveTroopECS(uint256 _troopId, Position memory _targetPosition) external {
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
        uint256 _armyId = abi.decode(Util._getComponent("ArmyId").getRawValue(_troopId), (uint256));
        Position memory _sourcePosition = abi.decode(Util._getComponent("Position").getRawValue(_armyId), (Position));
        require(!Util._samePos(_sourcePosition, _targetPosition), "CURIO: Already at destination");
        require(Util._withinDist(_sourcePosition, _targetPosition, 1), "CURIO: You can only dispatch troop to the near tile");

        // 6. Verify ownership of troop by player
        require(abi.decode(Util._getComponent("Owner").getRawValue(_troopId), (uint256)) == _playerId, "CURIO: You can only dispatch own troop");

        // 7. Movement cooldown check
        uint256 _lastLargeActionTaken = abi.decode(Util._getComponent("LastLargeActionTaken").getRawValue(_armyId), (uint256));
        uint256 _largeActionCooldown = abi.decode(Util._getComponent("LargeActionCooldown").getRawValue(_armyId), (uint256));
        require(block.timestamp - _lastLargeActionTaken >= _largeActionCooldown, "CURIO: Large action taken too recently");

        // 8. Geographic and base checks
        require(EngineModules._geographicCheckTroopECS(_troopId, _targetPosition), "CURIO: Troop and land type not compatible"); // TODO
        require(Util._getBaseAt(_targetPosition) == NULL, "CURIO: Cannot directly attack with troops");

        // 9. March logic checks, and create new army if empty
        uint256 _targetArmyId = Util._getArmyAt(_targetPosition);
        if (_targetArmyId != NULL) {
            require(abi.decode(Util._getComponent("Owner").getRawValue(_targetArmyId), (uint256)) == _playerId, "CURIO: Cannot directly attack with troops");
            require(Util._getArmyTroopCount(_targetArmyId) + 1 <= 5, "CURIO: Army can have up to five troops, or two with one transport");
        } else {
            _targetArmyId = Util._addArmyEntity(_playerId, _targetPosition);
        }

        // 10. Move troop
        Util._setComponentValue("ArmyId", _troopId, _targetArmyId);

        // 11. Remove old army if empty
        if (Util._getArmyTroopCount(_armyId) == 0) Util._removeArmyEntity(_armyId);
    }

    /**
     * Delete an owned troop (often to reduce expense).
     * @param _troopId identifier for troop
     */
    function deleteTroopECS(uint256 _troopId) external {
        uint256 _playerId = Util._getPlayerId(msg.sender);
        require(abi.decode(Util._getComponent("Owner").getRawValue(_troopId), (uint256)) == _playerId, "CURIO: Can only delete own troop");

        uint256 _armyId = abi.decode(Util._getComponent("ArmyId").getRawValue(_troopId), (uint256));
        if (Util._getArmyTroopCount(_armyId) <= 1) Util._removeArmyEntity(_armyId);
        Util._removeTroopEntity(_troopId);
    }

    function purchaseTroopECS(Position memory _position, uint256 _troopTemplateId) external returns (uint256) {
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

        // 5. Verify that a "base" (aka. an entity which can purchase) is present
        _set1.addArray(Util._getComponent("Position").getEntitiesWithRawValue(abi.encode(_position)));
        _set2.addArray(Util._getComponent("CanPurchase").getEntities());
        uint256[] memory _intersection = Util._intersection(_set1, _set2);
        require(_intersection.length == 1, "CURIO: No base found");
        uint256 _baseId = _intersection[0];

        // 6. Verify that player owns the "base"
        require(abi.decode(Util._getComponent("Owner").getRawValue(_baseId), (uint256)) == _playerId, "CURIO: Can only purchase in own base");

        // 7. Verify that no "troop" (aka. a movable entity) is present
        _set2 = new Set();
        _set2.addArray(Util._getComponent("CanMove").getEntities());
        require(Util._intersection(_set1, _set2).length == 0, "CURIO: Base occupied by another troop");

        // 8. Verify that the "base" can purchase the given type of "troop"
        if (!Util._getComponent("IsLandTroop").has(_troopTemplateId)) {
            Position[] memory _neighbors = Util._getNeighbors(_position);
            bool _positionAdjacentToWater;
            for (uint256 i = 0; i < _neighbors.length; i++) {
                if (!Util._getTileAt(_neighbors[i]).isInitializedECS) Util._initializeTileECS(_neighbors[i]);
                if (Util._getTileAt(_neighbors[i]).terrain == TERRAIN.WATER) _positionAdjacentToWater = true;
            }
            require(_positionAdjacentToWater, "CURIO: Base cannot purchase selected troop type");
        }

        // 9. Fetch player gold balance and verify sufficience
        Component _goldComponent = Util._getComponent("Gold");
        uint256 _troopGoldPrice = abi.decode(_goldComponent.getRawValue(_troopTemplateId), (uint256));
        uint256 _playerGoldBalance = abi.decode(_goldComponent.getRawValue(_playerId), (uint256));
        require(_playerGoldBalance > _troopGoldPrice, "CURIO: Insufficient gold balance");

        // 10. Set new player gold balance
        Util._setComponentValue("Gold", _playerId, abi.encode(_playerGoldBalance - _troopGoldPrice));

        // 11. Add new army
        uint256 _armyId = Util._addArmyEntity(_playerId, _position);

        // 12. Add troop and return its ID
        return Util._addTroopEntity(_playerId, _troopTemplateId, _armyId);
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

        // Transfer base ownership and update its health
        Util._setComponentValue("Owner", _baseId, abi.encode(_playerId));
        Util._setComponentValue("Health", _baseId, abi.encode(800));

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
            _attackFactor = abi.decode(Util._getComponent("AttackFactor").getRawValue(_troopId), (uint256));
            Util._setComponentValue("AttackFactor", _troopId, abi.encode(_attackFactor * 2));
        }
    }

    /**
     * @dev Policy: The player's ports and cities gain movement ability, but they change from producing to consuming gold.
     */
    function sampleImpossiblePolicy() external {
        // Get player's ports and cities
        uint256[] memory _playerBases = Util._getPlayerBases(msg.sender);

        // Update desired properties
        uint256 _baseId;
        for (uint256 i = 0; i < _playerBases.length; i++) {
            _baseId = _playerBases[i];
            Util._setComponentValue("CanMove", _baseId, abi.encode(true));
            Util._removeComponentValue("GoldRatePositive", _baseId);
        }
    }
}
