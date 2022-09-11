//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Position, TERRAIN, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Set} from "contracts/Set.sol";
import {BoolComponent, UintComponent} from "contracts/TypedComponents.sol";
import "forge-std/console.sol";

/// @title Game facet
/// @notice Contains player functions

contract GameFacet is UseStorage {
    using SafeMath for uint256;
    uint256 private NULL = 0;

    // ----------------------------------------------------------
    // SETTLEMENT
    // ----------------------------------------------------------

    function moveSettler(uint256 _settler, Position memory _targetPosition) external {
        // Verify that settler exists as an entity
        require(Set(gs().entities).includes(_settler), "CURIO: Settler not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(BoolComponent(gs().components["IsActive"]).has(_player), "CURIO: You are inactive");

        // Verify that settler belongs to player
        require(ECSLib._getUint("Owner", _settler) == _player, "CURIO: Settler is not yours");

        // Verify target position is in bound
        require(GameLib._inBound(_targetPosition), "CURIO: Out of bound");

        // Check speed and cooldown
        require(ECSLib._getUint("LastMoved", _settler) < block.timestamp, "CURIO: Need more time till next move");
        require(ECSLib._getUint("Speed", _settler) >= GameLib._euclidean(ECSLib._getPosition("Position", _settler), _targetPosition), "CURIO: Not fast enough");

        ECSLib._setPosition("Position", _settler, _targetPosition);
        ECSLib._setUint("LastMoved", _settler, block.timestamp);
    }

    function foundCity(
        uint256 _settler,
        Position[] memory _territory,
        Position memory _centerPosition,
        string memory _cityName
    ) external returns (uint256 _city) {
        // Verify that settler exists as an entity
        require(Set(gs().entities).includes(_settler), "CURIO: Settler not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(BoolComponent(gs().components["IsActive"]).has(_player), "CURIO: You are inactive");

        // Verify that settler belongs to player
        require(ECSLib._getUint("Owner", _settler) == _player, "CURIO: Settler is not yours");

        _city = ECSLib._addEntity();

        // Verify that territory is wholly in bound and does not overlap with other cities
        for (uint256 i = 0; i < _territory.length; i++) {
            require(GameLib._inBound(_territory[i]), "CURIO: Out of bound");
            require(GameLib._getTileAt(_territory[i]).city != NULL, "CURIO: Territory overlaps with another city");
            gs().map[_territory[i].x][_territory[i].y].city = _city;
            if (!GameLib._getTileAt(_territory[i]).isInitialized) GameLib._initializeTile(_territory[i]);
        }

        // Verify that territory is connected
        // TODO

        // Found a city
        ECSLib._setString("Tag", _city, "City");
        ECSLib._setString("Name", _city, _cityName);
        ECSLib._setUint("Owner", _city, _player);
        ECSLib._setBool("CanProduce", _city);
        ECSLib._setUint("Level", _city, 1);
        ECSLib._setUint("BalanceLastUpdated", _city, block.timestamp);

        // Set its territory
        for (uint256 i = 0; i < _territory.length; i++) {
            uint256 _tile = ECSLib._addEntity();
            ECSLib._setString("Tag", _tile, "Tile");
            ECSLib._setPosition("Position", _tile, _territory[i]);
            ECSLib._setUint("City", _tile, _city);
        }

        // Build city center
        uint256 _cityCenter = ECSLib._addEntity();
        ECSLib._setString("Tag", _cityCenter, "Building");
        ECSLib._setPosition("Position", _cityCenter, _centerPosition);
        ECSLib._setUint("City", _cityCenter, _city);
        ECSLib._setString("BuildingType", _cityCenter, "City Center");

        // Initialize its resources
        // TODO
    }

    function upgradeCity(uint256 _city) external {
        // Verify that city exists as an entity
        require(Set(gs().entities).includes(_city), "CURIO: City not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(BoolComponent(gs().components["IsActive"]).has(_player), "CURIO: You are inactive");

        // Verify that city belongs to player
        require(ECSLib._getUint("Owner", _city) == _player, "CURIO: City is not yours");

        // Expend resources
        // TODO

        // Upgrade city
        ECSLib._setUint("Level", _city, ECSLib._getUint("Level", _city) + 1);
    }

    function foldCity(uint256 _city) external returns (uint256 _settler) {
        // TODO later
    }

    function unfoldCity(uint256 _settler) external {
        // TODO later
    }

    // ----------------------------------------------------------
    // RESOURCE AND TROOP PRODUCTION
    // ----------------------------------------------------------

    function startProduction(
        uint256 _building,
        uint256 _template,
        uint256 _amount
    ) external returns (uint256 _production) {
        // Verify that building and template exist as entities
        require(Set(gs().entities).includes(_building), "CURIO: Building not found");
        require(Set(gs().entities).includes(_template), "CURIO: Template not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(BoolComponent(gs().components["IsActive"]).has(_player), "CURIO: Player is inactive");

        // Verify that city belongs to player
        uint256 _city = ECSLib._getUint("City", _building);
        require(ECSLib._getUint("Owner", _city) == _player, "CURIO: City is not yours");

        // Create inventory if no exist, and verify that amount does not exceed ceiling
        string memory _inventoryType = ECSLib._getString("InventoryType", _template);
        uint256 _inventory = GameLib._getInventory(_city, _inventoryType);
        if (_inventory == NULL) {
            _inventory = ECSLib._addEntity();
            ECSLib._setString("Tag", _inventory, "Inventory");
            ECSLib._setUint("City", _inventory, _city);
            ECSLib._setUint("Building", _inventory, _building);
            ECSLib._setUint("Template", _inventory, _template);
            ECSLib._setUint("Amount", _inventory, 0);
        } else {
            require(ECSLib._getUint("Amount", _inventory) < gs().worldConstants.maxInventoryCapacity, "CURIO: Amount exceeds inventory capacity");
        }

        // Start production
        _production = ECSLib._addEntity();
        ECSLib._setString("Tag", _production, "Production");
        ECSLib._setUint("City", _production, _city);
        ECSLib._setUint("Template", _production, _template);
        ECSLib._setUint("Amount", _production, _amount);
        ECSLib._setUint("InitTimestamp", _production, block.timestamp);
        ECSLib._setUint("Duration", _production, ECSLib._getUint("Duration", _template) * _amount);
    }

    function endProduction(uint256 _building, uint256 _production) external {
        // Verify that building and production exist as entities
        require(Set(gs().entities).includes(_building), "CURIO: Building not found");
        require(Set(gs().entities).includes(_production), "CURIO: Production not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(BoolComponent(gs().components["IsActive"]).has(_player), "CURIO: Player is inactive");

        // Verify that city belongs to player
        uint256 _city = ECSLib._getUint("City", _building);
        require(ECSLib._getUint("Owner", _city) == _player, "CURIO: City is not yours");

        // Verify that enough time has passed
        require(ECSLib._getUint("InitTimestamp", _production) + ECSLib._getUint("Duration", _production) >= block.timestamp, "CURIO: Need more time for production");

        // Update inventory
        string memory _inventoryType = ECSLib._getString("InventoryType", ECSLib._getUint("Template", _production));
        uint256 _inventory = GameLib._getInventory(_city, _inventoryType);
        ECSLib._setUint("Amount", _inventory, ECSLib._getUint("Amount", _inventory) + ECSLib._getUint("Amount", _production));

        // Delete production
        ECSLib._removeEntity(_production);
    }

    // ----------------------------------------------------------
    // BATTLE
    // ----------------------------------------------------------

    function organizeArmy(
        uint256 _city,
        string[] memory _troopTypes,
        uint256[] memory _amounts
    ) external returns (uint256 _army) {
        // Verify that city exists as an entity
        require(Set(gs().entities).includes(_city), "CURIO: City not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(BoolComponent(gs().components["IsActive"]).has(_player), "CURIO: You are inactive");

        // Verify that city belongs to player
        require(ECSLib._getUint("Owner", _city) == _player, "CURIO: City is not yours");

        // Verify there is no army currently inside the city
        // TODO

        uint256 _health = 0; // sum
        uint256 _speed = 0; // sum FIXME
        uint256 _attack = 0; // sum
        uint256 _defense = 0; // sum

        // Update inventory and gather army traits
        require(_troopTypes.length == _amounts.length, "CURIO: Input lengths do not match");
        for (uint256 i = 0; i < _troopTypes.length; i++) {
            uint256 _inventory = GameLib._getInventory(_city, _troopTypes[i]);
            uint256 _balance = ECSLib._getUint("Amount", _inventory);
            require(_balance >= _amounts[i], "CURIO: Not enough troops"); // FIXME: specify troop type in a parametrized expression

            uint256 _template = ECSLib._getUint("Template", _inventory);
            _health += ECSLib._getUint("Health", _template) * _amounts[i];
            _speed += ECSLib._getUint("Speed", _template) * _amounts[i];
            _attack += ECSLib._getUint("Attack", _template) * _amounts[i];
            _defense += ECSLib._getUint("Defense", _template) * _amounts[i];
            ECSLib._setUint("Amount", _inventory, _balance - _amounts[i]);
        }

        _army = ECSLib._addEntity();
        ECSLib._setString("Tag", _army, "Army");
        ECSLib._setUint("Owner", _army, _player);
        ECSLib._setPosition("Position", _army, ECSLib._getPosition("Position", GameLib._getCityCenter(_city)));
        ECSLib._setStringArray("InventoryTypes", _army, _troopTypes);
        ECSLib._setUintArray("Amounts", _army, _amounts);
        ECSLib._setUint("Health", _army, _health);
        ECSLib._setUint("Speed", _army, _speed);
        ECSLib._setUint("Attack", _army, _attack);
        ECSLib._setUint("Defense", _army, _defense);
    }

    function march(uint256 _army, Position memory _position) external {
        // includes move, battle, disband
        // TODO

        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_army), "CURIO: Army not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(BoolComponent(gs().components["IsActive"]).has(_player), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _army) == _player, "CURIO: Army is not yours");

        // Verify that position is in bound
        require(GameLib._inBound(_position), "CURIO: Out of bound");

        // TODO: movement cooldown and actual movement logic
        // "Teleport"
        ECSLib._setPosition("Position", _army, _position);
    }

    function initializePlayer(Position memory _position, string memory _name) external returns (uint256 _player, uint256 _settler) {
        // Checkers
        require(!gs().isPaused, "CURIO: Game is paused");
        require(gs().players.length < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(gs().playerEntityMap[msg.sender] == NULL, "CURIO: Player already initialized");
        require(GameLib._inBound(_position), "CURIO: Out of bound");
        if (!GameLib._getTileAt(_position).isInitialized) GameLib._initializeTile(_position);

        // Spawn player
        _player = ECSLib._addEntity();
        ECSLib._setBool("IsActive", _player);
        ECSLib._setString("Name", _player, _name);
        ECSLib._setString("Tag", _player, "Player");
        ECSLib._setUint("InitTimestamp", _player, block.timestamp);
        ECSLib._setUint("BalanceLastUpdated", _player, block.timestamp);
        gs().players.push(msg.sender);
        gs().playerEntityMap[msg.sender] = _player;

        // Spawn settler
        _settler = ECSLib._addEntity();
        ECSLib._setString("Tag", _settler, "Settler");
        ECSLib._setPosition("Position", _settler, _position);
        ECSLib._setUint("Owner", _settler, _player);
        ECSLib._setBool("CanSettle", _settler);
        ECSLib._setUint("Health", _settler, 1); // FIXME
        ECSLib._setUint("Speed", _settler, 1); // FIXME
        ECSLib._setUint("LastMoved", _settler, block.timestamp);
    }

    // /**
    //  * @dev March army to a target position (move, battle, or capture).
    //  * @param _armyEntity army entity
    //  * @param _targetPosition target position
    //  */
    // function march(uint256 _armyEntity, Position memory _targetPosition) external {
    //     // 1. Verify that army exists as an entity
    //     require(Set(gs().entities).includes(_armyEntity), "CURIO: Troop not found");

    //     // 2. Verify that game is ongoing
    //     require(!gs().isPaused, "CURIO: Game is paused");

    //     // 3. Verify that player is active
    //     uint256 _playerEntity = GameLib._getPlayerEntity(msg.sender);
    //     require(BoolComponent(gs().components["IsActive"]).has(_playerEntity), "CURIO: Player is inactive");

    //     // 4. Verify that position is in bound, and initialize tile
    //     require(GameLib._inBound(_targetPosition), "CURIO: Out of bound");
    //     if (!GameLib._getTileAt(_targetPosition).isInitialized) GameLib._initializeTile(_targetPosition);

    //     // 5. Verify that target position is different from starting position and within movement range
    //     Position memory _sourcePosition = ECSLib._getPosition("Position", _armyEntity);
    //     require(!GameLib._coincident(_sourcePosition, _targetPosition), "CURIO: Already at destination");
    //     require(GameLib._withinDistance(_sourcePosition, _targetPosition, 1), "CURIO: You can only dispatch troop to the near tile");

    //     // 6. Verify ownership of army by player
    //     require(ECSLib._getUint("OwnerEntity", _armyEntity) == _playerEntity, "CURIO: You can only dispatch own troop");

    //     // 7. Large action cooldown check
    //     uint256[] memory _armyTroopEntities = GameLib._getArmyTroopEntities(_armyEntity);
    //     uint256 _lastLargeActionTaken = ECSLib._getUint("LastLargeActionTaken", _armyEntity);
    //     uint256 _largeActionCooldown = GameLib._getArmyLargeActionCooldown(_armyTroopEntities);
    //     require(block.timestamp - _lastLargeActionTaken >= _largeActionCooldown, "CURIO: Large action taken too recently");

    //     // 8. Geographic check
    //     require(GameModules._geographicCheckArmy(_armyEntity, _targetPosition), "CURIO: Troop and land type not compatible");

    //     // 9. March logic
    //     uint256 _targetArmyId = GameLib._getArmyAt(_targetPosition);
    //     if (_targetArmyId == NULL) {
    //         uint256 _targetBaseId = GameLib._getBaseAt(_targetPosition);
    //         if (_targetBaseId == NULL) {
    //             // CaseI: move army when target tile has no base or army
    //             GameModules._moveArmy(_playerEntity, _armyEntity, _targetPosition);
    //         } else {
    //             if (ECSLib._getUint("OwnerEntity", _targetBaseId) == _playerEntity) {
    //                 // CaseII: move army when target tile has your base but no army
    //                 GameModules._moveArmy(_playerEntity, _armyEntity, _targetPosition);
    //             } else {
    //                 // CaseIII: attack base when target tile has enemy base but no army
    //                 GameModules._battleBase(_playerEntity, _armyEntity, _targetPosition);
    //             }
    //         }
    //     } else {
    //         // CaseIV: battle enemy army when target tile has one
    //         require(ECSLib._getUint("OwnerEntity", _targetArmyId) != _playerEntity, "CURIO: Destination tile occupied");
    //         GameModules._battleArmy(_playerEntity, _armyEntity, _targetPosition);
    //     }

    //     GameLib._updatePlayerBalances(_playerEntity);
    // }

    // /**
    //  * @dev Dispatch troop to a target position.
    //  * @param _troopEntity troop entity
    //  * @param _targetPosition target position
    //  */
    // function moveTroop(uint256 _troopEntity, Position memory _targetPosition) external {
    //     // 1. Verify that troop exists as an entity
    //     require(Set(gs().entities).includes(_troopEntity), "CURIO: Troop not found");

    //     // 2. Verify that game is ongoing
    //     require(!gs().isPaused, "CURIO: Game is paused");

    //     // 3. Verify that player is active
    //     uint256 _playerEntity = GameLib._getPlayerEntity(msg.sender);
    //     require(BoolComponent(gs().components["IsActive"]).has(_playerEntity), "CURIO: Player is inactive");

    //     // 4. Verify that position is in bound, and initialize tile
    //     require(GameLib._inBound(_targetPosition), "CURIO: Out of bound");
    //     if (!GameLib._getTileAt(_targetPosition).isInitialized) GameLib._initializeTile(_targetPosition);

    //     // 5. Verify that target position is different from starting position and within movement range
    //     uint256 _armyEntity = ECSLib._getUint("ArmyEntity", _troopEntity);
    //     Position memory _sourcePosition = ECSLib._getPosition("Position", _armyEntity);
    //     require(!GameLib._coincident(_sourcePosition, _targetPosition), "CURIO: Already at destination");
    //     require(GameLib._withinDistance(_sourcePosition, _targetPosition, 1), "CURIO: You can only dispatch troop to the near tile");

    //     // 6. Verify ownership of troop by player
    //     require(ECSLib._getUint("OwnerEntity", _troopEntity) == _playerEntity, "CURIO: You can only dispatch own troop");

    //     // 7. Large action cooldown check
    //     uint256[] memory _armyTroopEntities = GameLib._getArmyTroopEntities(_armyEntity);
    //     uint256 _lastLargeActionTaken = ECSLib._getUint("LastLargeActionTaken", _armyEntity);
    //     uint256 _largeActionCooldown = GameLib._getArmyLargeActionCooldown(_armyTroopEntities);
    //     require(block.timestamp - _lastLargeActionTaken >= _largeActionCooldown, "CURIO: Large action taken too recently");

    //     // 8. Movement cooldown check
    //     uint256 _lastMoved = ECSLib._getUint("LastMoved", _armyEntity);
    //     uint256 _movementCooldown = GameLib._getArmyMovementCooldown(_armyTroopEntities);
    //     require(block.timestamp - _lastMoved >= _movementCooldown, "CURIO: Moved too recently");

    //     // 9. Geographic and base checks
    //     require(GameModules._geographicCheckTroop(_troopEntity, _targetPosition), "CURIO: Troop and land type not compatible");
    //     require(GameLib._getBaseAt(_targetPosition) == NULL, "CURIO: Cannot directly attack with troops");

    //     // 10. March logic checks, and create new army if empty
    //     uint256 _targetArmyId = GameLib._getArmyAt(_targetPosition);
    //     if (_targetArmyId != NULL) {
    //         require(ECSLib._getUint("OwnerEntity", _targetArmyId) == _playerEntity, "CURIO: Cannot directly attack with troops");
    //         require(GameLib._getArmyTroopEntities(_targetArmyId).length + 1 <= 5, "CURIO: Army can have up to five troops, or two with one transport");
    //     } else {
    //         _targetArmyId = GameLib._addArmy(_playerEntity, _targetPosition);
    //     }

    //     // 11. Move troop
    //     ECSLib._setUint("ArmyEntity", _troopEntity, _targetArmyId);

    //     // 12. Remove old army if empty
    //     if (GameLib._getArmyTroopEntities(_armyEntity).length == 0) GameLib._removeArmy(_armyEntity);
    // }

    // /**
    //  * @dev Delete an owned troop (often to reduce expense).
    //  * @param _troopEntity identifier for troop
    //  */
    // function deleteTroop(uint256 _troopEntity) external {
    //     uint256 _playerEntity = GameLib._getPlayerEntity(msg.sender);
    //     require(ECSLib._getUint("OwnerEntity", _troopEntity) == _playerEntity, "CURIO: Can only delete own troop");

    //     uint256 _armyEntity = ECSLib._getUint("ArmyEntity", _troopEntity);
    //     if (GameLib._getArmyTroopEntities(_armyEntity).length <= 1) GameLib._removeArmy(_armyEntity);
    //     GameLib._removeTroop(_troopEntity);
    // }

    // /**
    //  * @dev Purchase a new troop.
    //  * @param _position position to purchase troop
    //  * @param _troopTemplateEntity identifier for desired troop type
    //  * @return _troopEntity identifier for new troop
    //  */
    // function purchaseTroop(Position memory _position, uint256 _troopTemplateEntity) external returns (uint256) {
    //     // 1. Verify that parametric entity exists
    //     require(Set(gs().entities).includes(_troopTemplateEntity), "CURIO: Troop template not found");

    //     // 2. Verify that game is ongoing
    //     require(!gs().isPaused, "CURIO: Game is paused");

    //     // 3. Verify that player is active
    //     uint256 _playerEntity = GameLib._getPlayerEntity(msg.sender);
    //     require(BoolComponent(gs().components["IsActive"]).has(_playerEntity), "CURIO: Player is inactive");

    //     // 4. Verify that position is in bound, and initialize tile
    //     require(GameLib._inBound(_position), "CURIO: Out of bound");
    //     if (!GameLib._getTileAt(_position).isInitialized) GameLib._initializeTile(_position);

    //     // 5. Verify that a "base" (aka. an entity which can purchase) is present
    //     uint256 _baseEntity = GameLib._getBaseAt(_position);
    //     require(_baseEntity != NULL, "CURIO: No base found");

    //     // 6. Verify that player owns the "base"
    //     require(ECSLib._getUint("OwnerEntity", _baseEntity) == _playerEntity, "CURIO: Can only purchase in own base");

    //     // 7. Verify that no "troop" (aka. a movable entity) is present
    //     require(GameLib._getArmyAt(_position) == NULL, "CURIO: Base occupied by another troop");

    //     // 8. Verify that the "base" can purchase the given type of "troop"
    //     if (!BoolComponent(gs().components["CanMoveOnLand"]).has(_troopTemplateEntity)) {
    //         Position[] memory _neighbors = GameLib._getNeighbors(_position);
    //         bool _isCoast;
    //         for (uint256 i = 0; i < _neighbors.length; i++) {
    //             if (!GameLib._getTileAt(_neighbors[i]).isInitialized) GameLib._initializeTile(_neighbors[i]);
    //             if (GameLib._getTileAt(_neighbors[i]).terrain == TERRAIN.WATER) _isCoast = true;
    //         }
    //         assert(_isCoast == (GameLib._getTileAt(_position).terrain == TERRAIN.COAST));
    //         require(_isCoast, "CURIO: Base cannot purchase selected troop type");
    //     }

    //     // 9. Fetch player gold balance and verify sufficience
    //     uint256 _troopGoldPrice = ECSLib._getUint("Gold", _troopTemplateEntity);
    //     uint256 _playerGoldBalance = ECSLib._getUint("Gold", _playerEntity);
    //     require(_playerGoldBalance > _troopGoldPrice, "CURIO: Insufficient gold balance");

    //     // 10. Set new player gold balance
    //     ECSLib._setUint("Gold", _playerEntity, _playerGoldBalance - _troopGoldPrice);

    //     // 11. Add new army
    //     uint256 _armyEntity = GameLib._addArmy(_playerEntity, _position);

    //     // 12. Add troop and return its ID
    //     return GameLib._addTroop(_playerEntity, _troopTemplateEntity, _armyEntity);
    // }

    // /**
    //  * @dev Self-initialize as a player.
    //  * @param _position starting position of the player
    //  * @param _name name of the player
    //  * @return _playerEntity identifier for the player
    //  */
    // function initializePlayer(Position memory _position, string memory _name) external returns (uint256) {
    //     // Checkers
    //     require(!gs().isPaused, "CURIO: Game is paused");
    //     require(gs().players.length < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
    //     require(gs().playerEntityMap[msg.sender] == NULL, "CURIO: Player already initialized");
    //     require(GameLib._inBound(_position), "CURIO: Out of bound");
    //     if (!GameLib._getTileAt(_position).isInitialized) GameLib._initializeTile(_position);

    //     // Verify that a "base" (aka. an entity which can purchase) is present
    //     uint256 _baseEntity = GameLib._getBaseAt(_position);
    //     require(_baseEntity != NULL, "CURIO: No base found");

    //     // Verify that base is not taken
    //     require(!UintComponent(gs().components["OwnerEntity"]).has(_baseEntity), "CURIO: Base is taken");

    //     // Spawn player
    //     WorldConstants memory _worldConstants = gs().worldConstants;
    //     uint256 _playerEntity = ECSLib._addEntity();
    //     ECSLib._setBool("IsActive", _playerEntity);
    //     ECSLib._setString("Name", _playerEntity, _name);
    //     ECSLib._setString("Tag", _playerEntity, "Player");
    //     ECSLib._setUint("Gold", _playerEntity, _worldConstants.initPlayerGoldBalance);
    //     ECSLib._setUint("Oil", _playerEntity, _worldConstants.initPlayerOilBalance);
    //     ECSLib._setUint("InitTimestamp", _playerEntity, block.timestamp);
    //     ECSLib._setUint("BalanceLastUpdated", _playerEntity, block.timestamp);
    //     gs().players.push(msg.sender);
    //     gs().playerEntityMap[msg.sender] = _playerEntity;

    //     // Transfer base ownership
    //     ECSLib._setUint("OwnerEntity", _baseEntity, _playerEntity);
    //     ECSLib._setUint("Health", _baseEntity, 800);
    //     ECSLib._setInt("GoldPerSecond", _playerEntity, int256(_worldConstants.defaultBaseGoldGenerationPerSecond));
    //     ECSLib._setInt("OilPerSecond", _playerEntity, int256(0));

    //     return _playerEntity;
    // }
}
