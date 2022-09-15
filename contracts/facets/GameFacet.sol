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

    function initializePlayer(Position memory _position, string memory _name) external returns (uint256 _playerID, uint256 _settlerID) {
        // Checkers
        require(!gs().isPaused, "CURIO: Game is paused");
        require(gs().players.length < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(gs().playerEntityMap[msg.sender] == NULL, "CURIO: Player already initialized");
        require(GameLib._inBound(_position), "CURIO: Out of bound");
        if (!GameLib._getTileAt(_position).isInitialized) GameLib._initializeTile(_position);

        // Spawn player
        _playerID = ECSLib._addEntity();
        ECSLib._setBool("IsActive", _playerID);
        ECSLib._setString("Name", _playerID, _name);
        ECSLib._setString("Tag", _playerID, "Player");
        ECSLib._setUint("InitTimestamp", _playerID, block.timestamp);
        ECSLib._setUint("BalanceLastUpdated", _playerID, block.timestamp);
        gs().players.push(msg.sender);
        gs().playerEntityMap[msg.sender] = _playerID;

        // Spawn settler
        _settlerID = ECSLib._addEntity();
        ECSLib._setString("Tag", _settlerID, "Settler");
        ECSLib._setPosition("Position", _settlerID, _position);
        ECSLib._setUint("Owner", _settlerID, _playerID);
        ECSLib._setBool("CanSettle", _settlerID);
        ECSLib._setUint("Health", _settlerID, 1); // FIXME
        ECSLib._setUint("Speed", _settlerID, 1); // FIXME
        ECSLib._setUint("LastMoved", _settlerID, block.timestamp);
    }

    // ----------------------------------------------------------
    // SETTLEMENT
    // ----------------------------------------------------------

    function moveSettler(uint256 _settlerID, Position memory _targetPosition) external {
        // Verify that settler exists as an entity
        require(Set(gs().entities).includes(_settlerID), "CURIO: Settler not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that settler belongs to player
        require(ECSLib._getUint("Owner", _settlerID) == _playerID, "CURIO: Settler is not yours");

        // Verify target position is in bound
        require(GameLib._inBound(_targetPosition), "CURIO: Out of bound");

        // Check speed and cooldown
        require(ECSLib._getUint("LastMoved", _settlerID) < block.timestamp, "CURIO: Need more time till next move");
        require(ECSLib._getUint("Speed", _settlerID) >= GameLib._euclidean(ECSLib._getPosition("Position", _settlerID), _targetPosition), "CURIO: Not fast enough");

        ECSLib._setPosition("Position", _settlerID, _targetPosition);
        ECSLib._setUint("LastMoved", _settlerID, block.timestamp);
    }

    function foundCity(
        uint256 _settlerID,
        Position[] memory _territory,
        Position memory _centerPosition,
        string memory _cityName
    ) external returns (uint256 _cityID) {
        // Verify that settler exists as an entity
        require(Set(gs().entities).includes(_settlerID), "CURIO: Settler not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that settler belongs to player
        require(ECSLib._getUint("Owner", _settlerID) == _playerID, "CURIO: Settler is not yours");

        _cityID = ECSLib._addEntity();

        // Verify that territory is connected
        // FIXME: right now, territory must be selected in a way in which each position is next to the next position in the array
        require(GameLib._connected(_territory), "CURIO: Territory not connected");

        // Verify that territory is wholly in bound and does not overlap with other cities
        for (uint256 i = 0; i < _territory.length; i++) {
            require(GameLib._inBound(_territory[i]), "CURIO: Out of bound");
            require(GameLib._getTileAt(_territory[i]).city == NULL, "CURIO: Territory overlaps with another city");
            gs().map[_territory[i].x][_territory[i].y].city = _cityID;
            if (!GameLib._getTileAt(_territory[i]).isInitialized) GameLib._initializeTile(_territory[i]);

            uint256 _tile = ECSLib._addEntity();
            ECSLib._setString("Tag", _tile, "Tile");
            ECSLib._setPosition("Position", _tile, _territory[i]);
            ECSLib._setUint("City", _tile, _cityID);
        }

        // Found a city
        ECSLib._setString("Tag", _cityID, "City");
        ECSLib._setString("Name", _cityID, _cityName);
        ECSLib._setUint("Owner", _cityID, _playerID);
        ECSLib._setBool("CanProduce", _cityID);
        ECSLib._setUint("Level", _cityID, 1);
        ECSLib._setUint("BalanceLastUpdated", _cityID, block.timestamp);

        // Build city center
        uint256 _cityCenterID = ECSLib._addEntity();
        ECSLib._setString("Tag", _cityCenterID, "Building");
        ECSLib._setPosition("Position", _cityCenterID, _centerPosition);
        ECSLib._setUint("City", _cityCenterID, _cityID);
        ECSLib._setString("BuildingType", _cityCenterID, "City Center");

        // Initialize guard
        GameLib._addGuard(_cityID);

        // Add some gold
        uint256 _goldInventoryID = ECSLib._addEntity();
        ECSLib._setString("Tag", _goldInventoryID, "Inventory");
        ECSLib._setUint("City", _goldInventoryID, _cityID);
        ECSLib._setUint("Building", _goldInventoryID, _cityCenterID);
        ECSLib._setUint("Template", _goldInventoryID, GameLib._getTemplateByInventoryType("Gold"));
        ECSLib._setUint("Amount", _goldInventoryID, gs().worldConstants.initCityGold);

        // Initialize its resources
        // TODO
    }

    function upgradeCity(uint256 _cityID, Position[] memory _newTerritory) external {
        // Verify that city exists as an entity
        require(Set(gs().entities).includes(_cityID), "CURIO: City not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that city belongs to player
        require(ECSLib._getUint("Owner", _cityID) == _playerID, "CURIO: City is not yours");

        // Verify that city has enough gold
        uint256 _goldInventoryID = GameLib._getInventory(_cityID, GameLib._getTemplateByInventoryType("Gold"));
        uint256 _balance = _goldInventoryID != NULL ? ECSLib._getUint("Amount", _goldInventoryID) : 0;
        uint256 _cost = gs().worldConstants.cityUpgradeGoldCost;
        require(_balance >= _cost, "CURIO: Insufficient gold balance");

        // Verify that territory is connected
        // FIXME: right now, territory must be selected in a way in which each position is next to the next position in the array
        require(GameLib._connected(_newTerritory), "CURIO: Territory not connected");

        // Verify that territory is wholly in bound and does not overlap with other cities
        for (uint256 i = 0; i < _newTerritory.length; i++) {
            require(GameLib._inBound(_newTerritory[i]), "CURIO: Out of bound");
            require(GameLib._getTileAt(_newTerritory[i]).city == NULL, "CURIO: Territory overlaps with another city");
            gs().map[_newTerritory[i].x][_newTerritory[i].y].city = _cityID;
            if (!GameLib._getTileAt(_newTerritory[i]).isInitialized) GameLib._initializeTile(_newTerritory[i]);
        }

        // Expend resources
        ECSLib._setUint("Amount", _goldInventoryID, _balance - _cost);

        // Upgrade city
        ECSLib._setUint("Level", _cityID, ECSLib._getUint("Level", _cityID) + 1);
    }

    function foldCity(uint256 _cityID) external returns (uint256 _settlerID) {
        // TODO later
    }

    function unfoldCity(uint256 _settlerID) external {
        // TODO later
    }

    // ----------------------------------------------------------
    // PRODUCTION
    // ----------------------------------------------------------

    function startProduction(
        uint256 _buildingID,
        uint256 _templateID,
        uint256 _amount
    ) external returns (uint256 _productionID) {
        // Verify that building and template exist as entities
        require(Set(gs().entities).includes(_buildingID), "CURIO: Building not found");
        require(Set(gs().entities).includes(_templateID), "CURIO: Template not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: Player is inactive");

        // Verify that city belongs to player
        uint256 _cityID = ECSLib._getUint("City", _buildingID);
        require(ECSLib._getUint("Owner", _cityID) == _playerID, "CURIO: City is not yours");

        // Create inventory if no exist, and verify that amount does not exceed ceiling
        uint256 _inventoryID = GameLib._getInventory(_cityID, _templateID);
        if (_inventoryID == NULL) {
            _inventoryID = ECSLib._addEntity();
            ECSLib._setString("Tag", _inventoryID, "Inventory");
            ECSLib._setUint("City", _inventoryID, _cityID);
            ECSLib._setUint("Building", _inventoryID, _buildingID);
            ECSLib._setUint("Template", _inventoryID, _templateID);
            ECSLib._setUint("Amount", _inventoryID, 0);
        } else {
            require(ECSLib._getUint("Amount", _inventoryID) < gs().worldConstants.maxInventoryCapacity, "CURIO: Amount exceeds inventory capacity");
        }

        // Start production
        _productionID = ECSLib._addEntity();
        ECSLib._setString("Tag", _productionID, "Production");
        ECSLib._setUint("City", _productionID, _cityID);
        ECSLib._setUint("Template", _productionID, _templateID);
        ECSLib._setUint("Inventory", _productionID, _inventoryID);
        ECSLib._setUint("Amount", _productionID, _amount);
        ECSLib._setUint("InitTimestamp", _productionID, block.timestamp);
        ECSLib._setUint("Duration", _productionID, ECSLib._getUint("Duration", _templateID) * _amount);
    }

    function endProduction(uint256 _buildingID, uint256 _productionID) external {
        // Verify that building and production exist as entities
        require(Set(gs().entities).includes(_buildingID), "CURIO: Building not found");
        require(Set(gs().entities).includes(_productionID), "CURIO: Production not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: Player is inactive");

        // Verify that city belongs to player
        uint256 _cityID = ECSLib._getUint("City", _buildingID);
        require(ECSLib._getUint("Owner", _cityID) == _playerID, "CURIO: City is not yours");

        // Verify that enough time has passed
        require(ECSLib._getUint("InitTimestamp", _productionID) + ECSLib._getUint("Duration", _productionID) >= block.timestamp, "CURIO: Need more time for production");

        // Update inventory
        uint256 _inventoryID = ECSLib._getUint("Inventory", _productionID);
        ECSLib._setUint("Amount", _inventoryID, ECSLib._getUint("Amount", _inventoryID) + ECSLib._getUint("Amount", _productionID));

        // Delete production
        ECSLib._removeEntity(_productionID);
    }

    // ----------------------------------------------------------
    // BATTLE
    // ----------------------------------------------------------

    function organizeArmy(
        uint256 _cityID,
        uint256[] memory _templateIDs,
        uint256[] memory _amounts
    ) external returns (uint256 _armyID) {
        // Verify that city exists as an entity
        require(Set(gs().entities).includes(_cityID), "CURIO: City not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that city belongs to player
        require(ECSLib._getUint("Owner", _cityID) == _playerID, "CURIO: City is not yours");

        // Verify there is no army currently at the city center
        require(GameLib._getArmyAt(ECSLib._getPosition("Position", GameLib._getCityCenter(_cityID))) == NULL, "CURIO: Tile occupied by another army");

        uint256 _health = 0; // sum
        uint256 _speed = 0; // average
        uint256 _attack = 0; // sum
        uint256 _defense = 0; // sum

        // Update inventory and gather army traits
        require(_templateIDs.length == _amounts.length, "CURIO: Input lengths do not match");
        for (uint256 i = 0; i < _templateIDs.length; i++) {
            uint256 _inventoryID = GameLib._getInventory(_cityID, _templateIDs[i]);
            require(ECSLib._getUint("Amount", _inventoryID) >= _amounts[i], "CURIO: Not enough troops");

            uint256 _templateID = ECSLib._getUint("Template", _inventoryID);
            _health += ECSLib._getUint("Health", _templateID) * _amounts[i];
            _speed += ECSLib._getUint("Speed", _templateID) * _amounts[i];
            _attack += ECSLib._getUint("Attack", _templateID) * _amounts[i];
            _defense += ECSLib._getUint("Defense", _templateID) * _amounts[i];
            ECSLib._setUint("Amount", _inventoryID, ECSLib._getUint("Amount", _inventoryID) - _amounts[i]);
        }
        _speed /= GameLib._sum(_amounts);

        // Add army
        _armyID = ECSLib._addEntity();
        ECSLib._setString("Tag", _armyID, "Army");
        ECSLib._setUint("Owner", _armyID, _playerID);
        ECSLib._setPosition("Position", _armyID, ECSLib._getPosition("Position", GameLib._getCityCenter(_cityID)));
        ECSLib._setUintArray("Templates", _armyID, _templateIDs);
        ECSLib._setUintArray("Amounts", _armyID, _amounts);
        ECSLib._setUint("Health", _armyID, _health);
        ECSLib._setUint("Speed", _armyID, _speed);
        ECSLib._setUint("Attack", _armyID, _attack);
        ECSLib._setUint("Defense", _armyID, _defense);
        ECSLib._setUint("LastMoved", _armyID, block.timestamp);
    }

    function disbandArmy(uint256 _armyID) external {
        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_armyID), "CURIO: City not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _armyID) == _playerID, "CURIO: Army is not yours");

        // Get army position and city on top
        Position memory _position = ECSLib._getPosition("Position", _armyID);
        uint256 _cityID = GameLib._getCityAt(_position);

        // Verify that city belongs to player
        require(ECSLib._getUint("Owner", _cityID) == _playerID, "CURIO: Cannot disband army in foreign city");

        // Return troops to corresponding inventories
        uint256[] memory _templateIDs = ECSLib._getUintArray("Templates", _armyID);
        uint256[] memory _amounts = ECSLib._getUintArray("Amounts", _armyID);
        for (uint256 i = 0; i < _templateIDs.length; i++) {
            uint256 _inventoryID = GameLib._getInventory(_cityID, _templateIDs[i]);
            require(ECSLib._getUint("Amount", _inventoryID) + _amounts[i] <= gs().worldConstants.maxInventoryCapacity, "CURIO: Too many troops");
            ECSLib._setUint("Amount", _inventoryID, ECSLib._getUint("Amount", _inventoryID) + _amounts[i]);
        }

        // Disband army
        GameLib._removeArmy(_armyID);
    }

    function moveArmy(uint256 _armyID, Position memory _targetPosition) external {
        // verify that player's binding treaty approves the move
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        address _treatyAddress = ECSLib._getAddress("SignedTreaty", _playerID);

        (bool success, bytes memory returnData) = _treatyAddress.call(abi.encodeWithSignature("joinTreaty()"));
        require(success, "CRUIO: Failed to call the external treaty");
        require(abi.decode(returnData, (bool)), "CRUIO: your signed treaty does not approve your action");

        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_armyID), "CURIO: Army not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _armyID) == _playerID, "CURIO: Army is not yours");

        // Verify that position is in bound
        require(GameLib._inBound(_targetPosition), "CURIO: Out of bound");

        // Check speed and cooldown
        require(ECSLib._getUint("LastMoved", _armyID) < block.timestamp, "CURIO: Need more time till next move");
        require(ECSLib._getUint("Speed", _armyID) >= GameLib._euclidean(ECSLib._getPosition("Position", _armyID), _targetPosition), "CURIO: Not fast enough");

        // Verify that target tile has no other army
        require(GameLib._getArmyAt(_targetPosition) == NULL, "CURIO: Destination occupied by another army");

        // Move
        ECSLib._setPosition("Position", _armyID, _targetPosition);
    }

    function _startBattleArmy(uint256 _armyID, uint256 _targetArmyID) external {
        // Verify that armies exist as entities
        require(Set(gs().entities).includes(_armyID), "CURIO: Army not found");
        require(Set(gs().entities).includes(_targetArmyID), "CURIO: Target army not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _armyID) == _playerID, "CURIO: Army is not yours");
        require(ECSLib._getUint("Owner", _targetArmyID) != _playerID, "CURIO: Cannot attack your own army");

        // Verify that army and target army are adjacent
        require(GameLib._adjacent(ECSLib._getPosition("Position", _armyID), ECSLib._getPosition("Position", _targetArmyID)), "CURIO: Too far");

        // Start exchanging fire
        uint256 _battleID = ECSLib._addEntity();
        ECSLib._setString("Tag", _battleID, "Battle");
        ECSLib._setUint("InitTimestamp", _battleID, block.timestamp);
        ECSLib._setUint("Source", _battleID, _armyID);
        ECSLib._setUint("Target", _battleID, _targetArmyID);

        // FIXME: congrats, you win
        GameLib._removeArmy(_targetArmyID);
    }

    /**
     * This function was to be called `retreat`, but I figured since we need to ping the contract side to end battle anyway,
     */
    function _endBattleArmy(uint256 _armyID) external {
        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_armyID), "CURIO: Army not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _armyID) == _playerID, "CURIO: Army is not yours");

        // Verify that at least one war is happening with the army
        uint256[] memory _battleIDs = GameLib._getArmyBattles(_armyID);
        require(_battleIDs.length >= 1, "CURIO: No battle to end");

        // For now, assume there's only one battle
        uint256 _otherArmyID = ECSLib._getUint("Source", _battleIDs[0]) == _armyID ? ECSLib._getUint("Target", _battleIDs[0]) : ECSLib._getUint("Source", _battleIDs[0]);
        uint256 _duration = block.timestamp - ECSLib._getUint("InitTimestamp", _battleIDs[0]);
        (uint256 _damageOnArmy, uint256 _damageOnOtherArmy) = GameLib._getBattleOutcome(_armyID, _otherArmyID, _duration);
        if (_damageOnOtherArmy >= ECSLib._getUint("Health", _otherArmyID)) {
            GameLib._removeArmy(_otherArmyID);
        } else {
            GameLib._damageArmy(_otherArmyID, _damageOnOtherArmy);
        }
        if (_damageOnArmy >= ECSLib._getUint("Health", _armyID)) {
            GameLib._removeArmy(_armyID);
        } else {
            GameLib._damageArmy(_armyID, _damageOnArmy);
        }

        // // Damage both armies and kill if one or both sides die
        // for (uint256 i = 0; i < _battleIDs.length; i++) {
        //     uint256 _otherArmyID = ECSLib._getUint("Source", _battleIDs[i]) == _armyID ? ECSLib._getUint("Target", _battleIDs[i]) : ECSLib._getUint("Source", _battleIDs[i]);
        //     uint256 _duration = block.timestamp - ECSLib._getUint("InitTimestamp", _battleIDs[i]);
        //     (uint256 _damageOnArmy, uint256 _damageOnOtherArmy) = GameLib._getBattleOutcome(_armyID, _otherArmyID, _duration);

        //     if (_damageOnOtherArmy >= ECSLib._getUint("Health", _otherArmyID)) {
        //         GameLib._removeArmy(_otherArmyID);
        //     } else {
        //         GameLib._damageArmy(_armyID, _damageOnOtherArmy);
        //     }

        //     if (_damageOnArmy >= ECSLib._getUint("Health", _armyID)) {
        //         GameLib._removeArmy(_armyID);
        //     } else {
        //         GameLib._damageArmy(_armyID, _damageOnArmy);
        //     }
        // }
    }

    function _startBattleCity(uint256 _armyID, uint256 _cityID) external {
        // Verify that army and city exist as entities
        require(Set(gs().entities).includes(_armyID), "CURIO: Army not found");
        require(Set(gs().entities).includes(_cityID), "CURIO: City not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that army belongs to player and city doesn't
        require(ECSLib._getUint("Owner", _armyID) == _playerID, "CURIO: Army is not yours");
        require(ECSLib._getUint("Owner", _cityID) != _playerID, "CURIO: Cannot attack your own city");

        // Verify that army is adjacent to city
        require(GameLib._adjacentToCity(ECSLib._getPosition("Position", _armyID), _cityID), "CURIO: Too far");

        // Start exchanging fire
        uint256 _battleID = ECSLib._addEntity();
        ECSLib._setString("Tag", _battleID, "Battle");
        ECSLib._setUint("InitTimestamp", _battleID, block.timestamp);
        ECSLib._setUint("Source", _battleID, _armyID);
        ECSLib._setUint("Target", _battleID, GameLib._getCityGuard(_cityID));
    }

    function _endBattleCity(uint256 _armyID) external {
        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_armyID), "CURIO: Army not found");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _armyID) == _playerID, "CURIO: Army is not yours");

        // Verify that at least one war is happening with the army
        uint256[] memory _battleIDs = GameLib._getArmyBattles(_armyID);
        require(_battleIDs.length >= 1, "CURIO: No battle to end");

        // For now, assume there's only one battle
        uint256 _guardID = ECSLib._getUint("Source", _battleIDs[0]) == _armyID ? ECSLib._getUint("Target", _battleIDs[0]) : ECSLib._getUint("Source", _battleIDs[0]);
        uint256 _cityID = ECSLib._getUint("City", _guardID);
        uint256 _duration = block.timestamp - ECSLib._getUint("InitTimestamp", _battleIDs[0]);
        (uint256 _damageOnArmy, uint256 _damageOnGuard) = GameLib._getBattleOutcome(_armyID, _guardID, _duration);
        if (_damageOnGuard >= ECSLib._getUint("Health", _guardID)) {
            // Capture
            GameLib._removeArmy(_guardID);
            ECSLib._setUint("Owner", _cityID, _playerID);
            GameLib._addGuard(_cityID);
        } else {
            GameLib._damageArmy(_guardID, _damageOnGuard);
        }
        if (_damageOnArmy >= ECSLib._getUint("Health", _armyID)) {
            GameLib._removeArmy(_armyID);
        } else {
            GameLib._damageArmy(_armyID, _damageOnArmy);
        }
    }

    // TODO: _setAddress => _setAddressArray
    function joinTreaty(address _treatyAddress) external {
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        // Verify that player is active
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        (bool success, bytes memory returnData) = _treatyAddress.call(abi.encodeWithSignature("joinTreaty()"));

        require(success, "CRUIO: Failed to call the external treaty");
        require(abi.decode(returnData, (bool)), "CRUIO: The treaty rejects your application");

        ECSLib._setAddress("SignedTreaty", _playerID, _treatyAddress);
        
    }
}
