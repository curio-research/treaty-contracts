//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameModules} from "contracts/libraries/GameModules.sol";
import {Position, TERRAIN, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Set} from "contracts/Set.sol";
import {BoolComponent, UintComponent} from "contracts/TypedComponents.sol";

/// @title Engine facet
/// @notice Contains player functions such as march, purchaseTroop, initializePlayer

contract GameFacet is UseStorage {
    using SafeMath for uint256;
    uint256 private NULL = 0;

    /**
     * @dev March army to a target position (move, battle, or capture).
     * @param _armyEntity army entity
     * @param _targetPosition target position
     */
    function march(uint256 _armyEntity, Position memory _targetPosition) external {
        // 1. Verify that army exists as an entity
        require(Set(gs().entities).includes(_armyEntity), "CURIO: Troop not found");

        // 2. Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // 3. Verify that player is active
        uint256 _playerEntity = GameLib._getPlayerEntity(msg.sender);
        require(BoolComponent(gs().components["IsActive"]).has(_playerEntity), "CURIO: Player is inactive");

        // 4. Verify that position is in bound, and initialize tile
        require(GameLib._inBound(_targetPosition), "CURIO: Out of bound");
        if (!GameLib._getTileAt(_targetPosition).isInitialized) GameLib._initializeTile(_targetPosition);

        // 5. Verify that target position is different from starting position and within movement range
        Position memory _sourcePosition = ECSLib._getPosition("Position", _armyEntity);
        require(!GameLib._coincident(_sourcePosition, _targetPosition), "CURIO: Already at destination");
        require(GameLib._withinDistance(_sourcePosition, _targetPosition, 1), "CURIO: You can only dispatch troop to the near tile");

        // 6. Verify ownership of army by player
        require(ECSLib._getUint("OwnerEntity", _armyEntity) == _playerEntity, "CURIO: You can only dispatch own troop");

        // 7. Large action cooldown check
        uint256[] memory _armyTroopEntities = GameLib._getArmyTroopEntities(_armyEntity);
        uint256 _lastLargeActionTaken = ECSLib._getUint("LastLargeActionTaken", _armyEntity);
        uint256 _largeActionCooldown = GameLib._getArmyLargeActionCooldown(_armyTroopEntities);
        require(block.timestamp - _lastLargeActionTaken >= _largeActionCooldown, "CURIO: Large action taken too recently");

        // 8. Geographic check
        require(GameModules._geographicCheckArmy(_armyEntity, _targetPosition), "CURIO: Troop and land type not compatible");

        // 9. March logic
        uint256 _targetArmyId = GameLib._getArmyAt(_targetPosition);
        if (_targetArmyId == NULL) {
            uint256 _targetBaseId = GameLib._getBaseAt(_targetPosition);
            if (_targetBaseId == NULL) {
                // CaseI: move army when target tile has no base or army
                GameModules._moveArmy(_playerEntity, _armyEntity, _targetPosition);
            } else {
                if (ECSLib._getUint("OwnerEntity", _targetBaseId) == _playerEntity) {
                    // CaseII: move army when target tile has your base but no army
                    GameModules._moveArmy(_playerEntity, _armyEntity, _targetPosition);
                } else {
                    // CaseIII: attack base when target tile has enemy base but no army
                    GameModules._battleBase(_playerEntity, _armyEntity, _targetPosition);
                }
            }
        } else {
            // CaseIV: battle enemy army when target tile has one
            require(ECSLib._getUint("OwnerEntity", _targetArmyId) != _playerEntity, "CURIO: Destination tile occupied");
            GameModules._battleArmy(_playerEntity, _armyEntity, _targetPosition);
        }

        GameLib._updatePlayerBalances(_playerEntity);
    }

    /**
     * @dev Dispatch troop to a target position.
     * @param _troopEntity troop entity
     * @param _targetPosition target position
     */
    function moveTroop(uint256 _troopEntity, Position memory _targetPosition) external {
        // 1. Verify that troop exists as an entity
        require(Set(gs().entities).includes(_troopEntity), "CURIO: Troop not found");

        // 2. Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // 3. Verify that player is active
        uint256 _playerEntity = GameLib._getPlayerEntity(msg.sender);
        require(BoolComponent(gs().components["IsActive"]).has(_playerEntity), "CURIO: Player is inactive");

        // 4. Verify that position is in bound, and initialize tile
        require(GameLib._inBound(_targetPosition), "CURIO: Out of bound");
        if (!GameLib._getTileAt(_targetPosition).isInitialized) GameLib._initializeTile(_targetPosition);

        // 5. Verify that target position is different from starting position and within movement range
        uint256 _armyEntity = ECSLib._getUint("ArmyEntity", _troopEntity);
        Position memory _sourcePosition = ECSLib._getPosition("Position", _armyEntity);
        require(!GameLib._coincident(_sourcePosition, _targetPosition), "CURIO: Already at destination");
        require(GameLib._withinDistance(_sourcePosition, _targetPosition, 1), "CURIO: You can only dispatch troop to the near tile");

        // 6. Verify ownership of troop by player
        require(ECSLib._getUint("OwnerEntity", _troopEntity) == _playerEntity, "CURIO: You can only dispatch own troop");

        // 7. Large action cooldown check
        uint256[] memory _armyTroopEntities = GameLib._getArmyTroopEntities(_armyEntity);
        uint256 _lastLargeActionTaken = ECSLib._getUint("LastLargeActionTaken", _armyEntity);
        uint256 _largeActionCooldown = GameLib._getArmyLargeActionCooldown(_armyTroopEntities);
        require(block.timestamp - _lastLargeActionTaken >= _largeActionCooldown, "CURIO: Large action taken too recently");

        // 8. Movement cooldown check
        uint256 _lastMoved = ECSLib._getUint("LastMoved", _armyEntity);
        uint256 _movementCooldown = GameLib._getArmyMovementCooldown(_armyTroopEntities);
        require(block.timestamp - _lastMoved >= _movementCooldown, "CURIO: Moved too recently");

        // 9. Geographic and base checks
        require(GameModules._geographicCheckTroop(_troopEntity, _targetPosition), "CURIO: Troop and land type not compatible");
        require(GameLib._getBaseAt(_targetPosition) == NULL, "CURIO: Cannot directly attack with troops");

        // 10. March logic checks, and create new army if empty
        uint256 _targetArmyId = GameLib._getArmyAt(_targetPosition);
        if (_targetArmyId != NULL) {
            require(ECSLib._getUint("OwnerEntity", _targetArmyId) == _playerEntity, "CURIO: Cannot directly attack with troops");
            require(GameLib._getArmyTroopEntities(_targetArmyId).length + 1 <= 5, "CURIO: Army can have up to five troops, or two with one transport");
        } else {
            _targetArmyId = GameLib._addArmy(_playerEntity, _targetPosition);
        }

        // 11. Move troop
        ECSLib._setUint("ArmyEntity", _troopEntity, _targetArmyId);

        // 12. Remove old army if empty
        if (GameLib._getArmyTroopEntities(_armyEntity).length == 0) GameLib._removeArmy(_armyEntity);
    }

    /**
     * @dev Delete an owned troop (often to reduce expense).
     * @param _troopEntity identifier for troop
     */
    function deleteTroop(uint256 _troopEntity) external {
        uint256 _playerEntity = GameLib._getPlayerEntity(msg.sender);
        require(ECSLib._getUint("OwnerEntity", _troopEntity) == _playerEntity, "CURIO: Can only delete own troop");

        uint256 _armyEntity = ECSLib._getUint("ArmyEntity", _troopEntity);
        if (GameLib._getArmyTroopEntities(_armyEntity).length <= 1) GameLib._removeArmy(_armyEntity);
        GameLib._removeTroop(_troopEntity);
    }

    /**
     * @dev Purchase a new troop.
     * @param _position position to purchase troop
     * @param _troopTemplateEntity identifier for desired troop type
     * @return _troopEntity identifier for new troop
     */
    function purchaseTroop(Position memory _position, uint256 _troopTemplateEntity) external returns (uint256) {
        // 1. Verify that parametric entity exists
        require(Set(gs().entities).includes(_troopTemplateEntity), "CURIO: Troop template not found");

        // 2. Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // 3. Verify that player is active
        uint256 _playerEntity = GameLib._getPlayerEntity(msg.sender);
        require(BoolComponent(gs().components["IsActive"]).has(_playerEntity), "CURIO: Player is inactive");

        // 4. Verify that position is in bound, and initialize tile
        require(GameLib._inBound(_position), "CURIO: Out of bound");
        if (!GameLib._getTileAt(_position).isInitialized) GameLib._initializeTile(_position);

        // 5. Verify that a "base" (aka. an entity which can purchase) is present
        uint256 _baseEntity = GameLib._getBaseAt(_position);
        require(_baseEntity != NULL, "CURIO: No base found");

        // 6. Verify that player owns the "base"
        require(ECSLib._getUint("OwnerEntity", _baseEntity) == _playerEntity, "CURIO: Can only purchase in own base");

        // 7. Verify that no "troop" (aka. a movable entity) is present
        require(GameLib._getArmyAt(_position) == NULL, "CURIO: Base occupied by another troop");

        // 8. Verify that the "base" can purchase the given type of "troop"
        if (!BoolComponent(gs().components["CanMoveOnLand"]).has(_troopTemplateEntity)) {
            Position[] memory _neighbors = GameLib._getNeighbors(_position);
            bool _isCoast;
            for (uint256 i = 0; i < _neighbors.length; i++) {
                if (!GameLib._getTileAt(_neighbors[i]).isInitialized) GameLib._initializeTile(_neighbors[i]);
                if (GameLib._getTileAt(_neighbors[i]).terrain == TERRAIN.WATER) _isCoast = true;
            }
            assert(_isCoast == (GameLib._getTileAt(_position).terrain == TERRAIN.COAST));
            require(_isCoast, "CURIO: Base cannot purchase selected troop type");
        }

        // 9. Fetch player gold balance and verify sufficience
        uint256 _troopGoldPrice = ECSLib._getUint("Gold", _troopTemplateEntity);
        uint256 _playerGoldBalance = ECSLib._getUint("Gold", _playerEntity);
        require(_playerGoldBalance > _troopGoldPrice, "CURIO: Insufficient gold balance");

        // 10. Set new player gold balance
        ECSLib._setUint("Gold", _playerEntity, _playerGoldBalance - _troopGoldPrice);

        // 11. Add new army
        uint256 _armyEntity = GameLib._addArmy(_playerEntity, _position);

        // 12. Add troop and return its ID
        return GameLib._addTroop(_playerEntity, _troopTemplateEntity, _armyEntity);
    }

    /**
     * @dev Self-initialize as a player.
     * @param _position starting position of the player
     * @param _name name of the player
     * @return _playerEntity identifier for the player
     */
    function initializePlayer(Position memory _position, string memory _name) external returns (uint256) {
        // Checkers
        require(!gs().isPaused, "CURIO: Game is paused");
        require(gs().players.length < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(gs().playerEntityMap[msg.sender] == NULL, "CURIO: Player already initialized");
        require(GameLib._inBound(_position), "CURIO: Out of bound");
        if (!GameLib._getTileAt(_position).isInitialized) GameLib._initializeTile(_position);

        // Verify that a "base" (aka. an entity which can purchase) is present
        uint256 _baseEntity = GameLib._getBaseAt(_position);
        require(_baseEntity != NULL, "CURIO: No base found");

        // Verify that base is not taken
        require(!UintComponent(gs().components["OwnerEntity"]).has(_baseEntity), "CURIO: Base is taken");

        // Spawn player
        WorldConstants memory _worldConstants = gs().worldConstants;
        uint256 _playerEntity = ECSLib._addEntity();
        ECSLib._setBool("IsActive", _playerEntity);
        ECSLib._setString("Name", _playerEntity, _name);
        ECSLib._setString("Tag", _playerEntity, "Player");
        ECSLib._setUint("Gold", _playerEntity, _worldConstants.initPlayerGoldBalance);
        ECSLib._setUint("Oil", _playerEntity, _worldConstants.initPlayerOilBalance);
        ECSLib._setUint("InitTimestamp", _playerEntity, block.timestamp);
        ECSLib._setUint("BalanceLastUpdated", _playerEntity, block.timestamp);
        gs().players.push(msg.sender);
        gs().playerEntityMap[msg.sender] = _playerEntity;

        // Transfer base ownership
        ECSLib._setUint("OwnerEntity", _baseEntity, _playerEntity);
        ECSLib._setUint("Health", _baseEntity, 800);
        ECSLib._setInt("GoldPerSecond", _playerEntity, int256(_worldConstants.defaultBaseGoldGenerationPerSecond));
        ECSLib._setInt("OilPerSecond", _playerEntity, int256(0));

        return _playerEntity;
    }
}
