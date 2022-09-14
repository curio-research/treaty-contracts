//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Position, TERRAIN, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Set} from "contracts/Set.sol";
import "forge-std/console.sol";

/// @title Game facet
/// @notice Contains player functions

contract GameFacet is UseStorage {
    using SafeMath for uint256;
    uint256 private NULL = 0;

    // ----------------------------------------------------------
    // BASIC
    // ----------------------------------------------------------

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
        require(ECSLib._getBoolComponent("IsActive").has(_player), "CURIO: You are inactive");

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
        require(ECSLib._getBoolComponent("IsActive").has(_player), "CURIO: You are inactive");

        // Verify that settler belongs to player
        require(ECSLib._getUint("Owner", _settler) == _player, "CURIO: Settler is not yours");

        _city = ECSLib._addEntity();

        // Verify that territory is connected
        // FIXME: right now, territory must be selected in a way in which each position is next to the next position in the array
        require(GameLib._connected(_territory), "CURIO: Territory not connected");

        // Verify that territory is wholly in bound and does not overlap with other cities
        for (uint256 i = 0; i < _territory.length; i++) {
            require(GameLib._inBound(_territory[i]), "CURIO: Out of bound");
            require(GameLib._getTileAt(_territory[i]).city == NULL, "CURIO: Territory overlaps with another city");
            gs().map[_territory[i].x][_territory[i].y].city = _city;
            if (!GameLib._getTileAt(_territory[i]).isInitialized) GameLib._initializeTile(_territory[i]);

            uint256 _tile = ECSLib._addEntity();
            ECSLib._setString("Tag", _tile, "Tile");
            ECSLib._setPosition("Position", _tile, _territory[i]);
            ECSLib._setUint("City", _tile, _city);
        }

        // Found a city
        ECSLib._setString("Tag", _city, "City");
        ECSLib._setString("Name", _city, _cityName);
        ECSLib._setUint("Owner", _city, _player);
        ECSLib._setBool("CanProduce", _city);
        ECSLib._setUint("Level", _city, 1);
        ECSLib._setUint("BalanceLastUpdated", _city, block.timestamp);

        // Build city center
        uint256 _cityCenter = ECSLib._addEntity();
        ECSLib._setString("Tag", _cityCenter, "Building");
        ECSLib._setPosition("Position", _cityCenter, _centerPosition);
        ECSLib._setUint("City", _cityCenter, _city);
        ECSLib._setString("BuildingType", _cityCenter, "City Center");

        // Initialize guard
        GameLib._addGuard(_city);

        // Initialize its resources
        // TODO
    }

    function upgradeCity(uint256 _city, Position[] memory _newTerritory) external {
        // Verify that city exists as an entity
        require(Set(gs().entities).includes(_city), "CURIO: City not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_player), "CURIO: You are inactive");

        // Verify that city belongs to player
        require(ECSLib._getUint("Owner", _city) == _player, "CURIO: City is not yours");

        // Verify that city has enough gold
        uint256 _goldInventory = GameLib._getInventory(_city, "Gold");
        uint256 _balance = ECSLib._getUint("Amount", _goldInventory);
        uint256 _cost = gs().worldConstants.cityUpgradeGoldCost;
        require(_balance >= _cost, "CURIO: Insufficient gold balance");

        // Verify that territory is connected
        // FIXME: right now, territory must be selected in a way in which each position is next to the next position in the array
        require(GameLib._connected(_newTerritory), "CURIO: Territory not connected");

        // Verify that territory is wholly in bound and does not overlap with other cities
        for (uint256 i = 0; i < _newTerritory.length; i++) {
            require(GameLib._inBound(_newTerritory[i]), "CURIO: Out of bound");
            require(GameLib._getTileAt(_newTerritory[i]).city == NULL, "CURIO: Territory overlaps with another city");
            gs().map[_newTerritory[i].x][_newTerritory[i].y].city = _city;
            if (!GameLib._getTileAt(_newTerritory[i]).isInitialized) GameLib._initializeTile(_newTerritory[i]);
        }

        // Expend resources
        ECSLib._setUint("Amount", _goldInventory, _balance - _cost);

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
    // PRODUCTION
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
        require(ECSLib._getBoolComponent("IsActive").has(_player), "CURIO: Player is inactive");

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
        require(ECSLib._getBoolComponent("IsActive").has(_player), "CURIO: Player is inactive");

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
        require(ECSLib._getBoolComponent("IsActive").has(_player), "CURIO: You are inactive");

        // Verify that city belongs to player
        require(ECSLib._getUint("Owner", _city) == _player, "CURIO: City is not yours");

        // Verify there is no army currently at the city center
        require(GameLib._getArmyAt(ECSLib._getPosition("Position", GameLib._getCityCenter(_city))) == NULL, "CURIO: Tile occupied by another army");

        uint256 _health = 0; // sum
        uint256 _speed = 0; // average
        uint256 _attack = 0; // sum
        uint256 _defense = 0; // sum

        // Update inventory and gather army traits
        require(_troopTypes.length == _amounts.length, "CURIO: Input lengths do not match");
        for (uint256 i = 0; i < _troopTypes.length; i++) {
            uint256 _inventory = GameLib._getInventory(_city, _troopTypes[i]);
            require(ECSLib._getUint("Amount", _inventory) >= _amounts[i], "CURIO: Not enough troops");

            uint256 _template = ECSLib._getUint("Template", _inventory);
            _health += ECSLib._getUint("Health", _template) * _amounts[i];
            _speed += ECSLib._getUint("Speed", _template) * _amounts[i];
            _attack += ECSLib._getUint("Attack", _template) * _amounts[i];
            _defense += ECSLib._getUint("Defense", _template) * _amounts[i];
            ECSLib._setUint("Amount", _inventory, ECSLib._getUint("Amount", _inventory) - _amounts[i]);
        }
        _speed /= GameLib._sum(_amounts);

        // Add army
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
        ECSLib._setUint("LastMoved", _army, block.timestamp);
    }

    function disbandArmy(uint256 _army) external {
        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_army), "CURIO: City not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_player), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _army) == _player, "CURIO: Army is not yours");

        // Get army position and city on top
        Position memory _position = ECSLib._getPosition("Position", _army);
        uint256 _city = GameLib._getCityAt(_position);

        // Verify that city belongs to player
        require(ECSLib._getUint("Owner", _city) == _player, "CURIO: Cannot disband army in foreign city");

        // Return troops to corresponding inventories
        string[] memory _troopTypes = ECSLib._getStringArray("InventoryTypes", _army);
        uint256[] memory _amounts = ECSLib._getUintArray("Amounts", _army);
        for (uint256 i = 0; i < _troopTypes.length; i++) {
            uint256 _inventory = GameLib._getInventory(_city, _troopTypes[i]);
            require(ECSLib._getUint("Amount", _inventory) + _amounts[i] <= gs().worldConstants.maxInventoryCapacity, "CURIO: Too many troops");
            ECSLib._setUint("Amount", _inventory, ECSLib._getUint("Amount", _inventory) + _amounts[i]);
        }

        // Disband army
        GameLib._removeArmy(_army);
    }

    function moveArmy(uint256 _army, Position memory _targetPosition) external {
        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_army), "CURIO: Army not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_player), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _army) == _player, "CURIO: Army is not yours");

        // Verify that position is in bound
        require(GameLib._inBound(_targetPosition), "CURIO: Out of bound");

        // Check speed and cooldown
        require(ECSLib._getUint("LastMoved", _army) < block.timestamp, "CURIO: Need more time till next move");
        require(ECSLib._getUint("Speed", _army) >= GameLib._euclidean(ECSLib._getPosition("Position", _army), _targetPosition), "CURIO: Not fast enough");

        // Verify that target tile has no other army
        require(GameLib._getArmyAt(_targetPosition) == NULL, "CURIO: Destination occupied by another army");

        // Move
        ECSLib._setPosition("Position", _army, _targetPosition);
    }

    function _startBattleArmy(uint256 _army, uint256 _targetArmy) external {
        // Verify that armies exist as entities
        require(Set(gs().entities).includes(_army), "CURIO: Army not found");
        require(Set(gs().entities).includes(_targetArmy), "CURIO: Target army not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_player), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _army) == _player, "CURIO: Army is not yours");
        require(ECSLib._getUint("Owner", _targetArmy) != _player, "CURIO: Cannot attack your own army");

        // Verify that army and target army are adjacent
        require(GameLib._adjacent(ECSLib._getPosition("Position", _army), ECSLib._getPosition("Position", _targetArmy)), "CURIO: Too far");

        // Start exchanging fire
        uint256 _battle = ECSLib._addEntity();
        ECSLib._setString("Tag", _battle, "Battle");
        ECSLib._setUint("InitTimestamp", _battle, block.timestamp);
        ECSLib._setUint("Source", _battle, _army);
        ECSLib._setUint("Target", _battle, _targetArmy);
    }

    /**
     * This function was to be called `retreat`, but I figured since we need to ping the contract side to end battle anyway,
     */
    function _endBattleArmy(uint256 _army) external {
        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_army), "CURIO: Army not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_player), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _army) == _player, "CURIO: Army is not yours");

        // Verify that at least one war is happening with the army
        uint256[] memory _battles = GameLib._getArmyBattles(_army);
        require(_battles.length >= 1, "CURIO: No battle to end");

        // For now, assume there's only one battle
        uint256 _otherArmy = ECSLib._getUint("Source", _battles[0]) == _army ? ECSLib._getUint("Target", _battles[0]) : ECSLib._getUint("Source", _battles[0]);
        uint256 _duration = block.timestamp - ECSLib._getUint("InitTimestamp", _battles[0]);
        (uint256 _damageOnArmy, uint256 _damageOnOtherArmy) = GameLib._getBattleOutcome(_army, _otherArmy, _duration);
        if (_damageOnOtherArmy >= ECSLib._getUint("Health", _otherArmy)) {
            GameLib._removeArmy(_otherArmy);
        } else {
            GameLib._damageArmy(_otherArmy, _damageOnOtherArmy);
        }
        if (_damageOnArmy >= ECSLib._getUint("Health", _army)) {
            GameLib._removeArmy(_army);
        } else {
            GameLib._damageArmy(_army, _damageOnArmy);
        }

        // // Damage both armies and kill if one or both sides die
        // for (uint256 i = 0; i < _battles.length; i++) {
        //     uint256 _otherArmy = ECSLib._getUint("Source", _battles[i]) == _army ? ECSLib._getUint("Target", _battles[i]) : ECSLib._getUint("Source", _battles[i]);
        //     uint256 _duration = block.timestamp - ECSLib._getUint("InitTimestamp", _battles[i]);
        //     (uint256 _damageOnArmy, uint256 _damageOnOtherArmy) = GameLib._getBattleOutcome(_army, _otherArmy, _duration);

        //     if (_damageOnOtherArmy >= ECSLib._getUint("Health", _otherArmy)) {
        //         GameLib._removeArmy(_otherArmy);
        //     } else {
        //         GameLib._damageArmy(_army, _damageOnOtherArmy);
        //     }

        //     if (_damageOnArmy >= ECSLib._getUint("Health", _army)) {
        //         GameLib._removeArmy(_army);
        //     } else {
        //         GameLib._damageArmy(_army, _damageOnArmy);
        //     }
        // }
    }

    function _startBattleCity(uint256 _army, uint256 _city) external {
        // Verify that army and city exist as entities
        require(Set(gs().entities).includes(_army), "CURIO: Army not found");
        require(Set(gs().entities).includes(_city), "CURIO: City not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_player), "CURIO: You are inactive");

        // Verify that army belongs to player and city doesn't
        require(ECSLib._getUint("Owner", _army) == _player, "CURIO: Army is not yours");
        require(ECSLib._getUint("Owner", _city) != _player, "CURIO: Cannot attack your own city");

        // Verify that army is adjacent to city
        require(GameLib._adjacentToCity(ECSLib._getPosition("Position", _army), _city), "CURIO: Too far");

        // Start exchanging fire
        uint256 _battle = ECSLib._addEntity();
        ECSLib._setString("Tag", _battle, "Battle");
        ECSLib._setUint("InitTimestamp", _battle, block.timestamp);
        ECSLib._setUint("Source", _battle, _army);
        ECSLib._setUint("Target", _battle, GameLib._getCityGuard(_city));
    }

    function _endBattleCity(uint256 _army) external {
        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_army), "CURIO: Army not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _player = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_player), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _army) == _player, "CURIO: Army is not yours");

        // Verify that at least one war is happening with the army
        uint256[] memory _battles = GameLib._getArmyBattles(_army);
        require(_battles.length >= 1, "CURIO: No battle to end");

        // For now, assume there's only one battle
        uint256 _guard = ECSLib._getUint("Source", _battles[0]) == _army ? ECSLib._getUint("Target", _battles[0]) : ECSLib._getUint("Source", _battles[0]);
        uint256 _city = ECSLib._getUint("City", _guard);
        uint256 _duration = block.timestamp - ECSLib._getUint("InitTimestamp", _battles[0]);
        (uint256 _damageOnArmy, uint256 _damageOnGuard) = GameLib._getBattleOutcome(_army, _guard, _duration);
        if (_damageOnGuard >= ECSLib._getUint("Health", _guard)) {
            // Capture
            GameLib._removeArmy(_guard);
            ECSLib._setUint("Owner", _city, _player);
            GameLib._addGuard(_city);
        } else {
            GameLib._damageArmy(_guard, _damageOnGuard);
        }
        if (_damageOnArmy >= ECSLib._getUint("Health", _army)) {
            GameLib._removeArmy(_army);
        } else {
            GameLib._damageArmy(_army, _damageOnArmy);
        }
    }
}
