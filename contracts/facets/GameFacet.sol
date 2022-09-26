//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {Position, TERRAIN, WorldConstants} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import "contracts/libraries/Templates.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

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
        GameLib._initializeTile(_position);

        // Spawn player
        _playerID = ECSLib._addEntity();
        ECSLib._setBool("IsActive", _playerID);
        ECSLib._setString("Name", _playerID, _name);
        ECSLib._setString("Tag", _playerID, "Player");
        ECSLib._setUint("InitTimestamp", _playerID, block.timestamp);
        ECSLib._setAddress("Address", _playerID, msg.sender);
        gs().players.push(msg.sender);
        gs().playerEntityMap[msg.sender] = _playerID;

        // Spawn settler
        _settlerID = ECSLib._addEntity();
        ECSLib._setString("Tag", _settlerID, "Settler");
        ECSLib._setPosition("Position", _settlerID, _position);
        ECSLib._setUint("Owner", _settlerID, _playerID);
        ECSLib._setUint("Level", _settlerID, 1);
        ECSLib._setBool("CanSettle", _settlerID);
        ECSLib._setUint("Health", _settlerID, 1); // FIXME
        ECSLib._setUint("Speed", _settlerID, 1); // FIXME
        ECSLib._setUint("LastTimestamp", _settlerID, block.timestamp);

        // Initialize guard which stays with eventual city
        GameLib._addGuard(_settlerID);

        // Add gold to eventual city
        uint256 _goldInventoryID = ECSLib._addEntity();
        ECSLib._setString("Tag", _goldInventoryID, "ResourceInventory");
        ECSLib._setUint("City", _goldInventoryID, _settlerID);
        ECSLib._setUint("Template", _goldInventoryID, GameLib._getTemplateByInventoryType("Gold"));
        ECSLib._setUint("Amount", _goldInventoryID, gs().worldConstants.initCityGold);
    }

    // ----------------------------------------------------------
    // SETTLEMENT
    // ----------------------------------------------------------

    function moveSettler(uint256 _settlerID, Position memory _targetPosition) external {
        // Verify that settler exists as an entity
        require(Set(gs().entities).includes(_settlerID), "CURIO: Settler not found");

        GameLib.gamePauseCheck();

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that settler belongs to player
        require(ECSLib._getUint("Owner", _settlerID) == _playerID, "CURIO: Settler is not yours");

        // Verify target position is in bound
        require(GameLib._inBound(_targetPosition), "CURIO: Out of bound");
        GameLib._initializeTile(_targetPosition);

        // Check speed and cooldown
        // require(ECSLib._getUint("LastTimestamp", _settlerID) < block.timestamp, "CURIO: Need more time till next move");
        require(ECSLib._getUint("Speed", _settlerID) >= GameLib._euclidean(ECSLib._getPosition("Position", _settlerID), _targetPosition), "CURIO: Not fast enough");

        // Verify no other army or settler at destination
        require(GameLib._getArmyAt(_targetPosition) == NULL && GameLib._getSettlerAt(_targetPosition) == NULL, "CURIO: Destination occupied");

        ECSLib._setPosition("Position", _settlerID, _targetPosition);
        ECSLib._setUint("LastTimestamp", _settlerID, block.timestamp);
    }

    function foundCity(
        uint256 _settlerID,
        Position[] memory _territory,
        string memory _cityName
    ) external {
        // Verify that settler exists as an entity
        require(Set(gs().entities).includes(_settlerID), "CURIO: Settler not found");

        GameLib.gamePauseCheck();

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that settler belongs to player
        require(ECSLib._getUint("Owner", _settlerID) == _playerID, "CURIO: Settler is not yours");

        // Verify that settler can settle
        require(ECSLib._getBool("CanSettle", _settlerID), "CURIO: Settler cannot settle");

        // Verify that territory is connected and includes settler's current position
        // FIXME: right now, territory must be selected in a way in which each position is next to the next position in the array
        Position memory _centerPosition = ECSLib._getPosition("Position", _settlerID);
        require(GameLib._connected(_territory), "CURIO: Territory disconnected");
        require(GameLib._includesPosition(_centerPosition, _territory), "CURIO: Territory must cover settler's current position");

        // Remove resource at destination if one exists
        uint256 _resourceID = GameLib._getResourceAt(_centerPosition);
        if (_resourceID != NULL) ECSLib._removeEntity(_resourceID);

        uint256 _cityID = _settlerID;

        // Verify that territory is wholly in bound and does not overlap with other cities, and initialize tiles
        for (uint256 i = 0; i < _territory.length; i++) {
            require(GameLib._inBound(_territory[i]), "CURIO: Out of bound");
            require(GameLib._getTileAt(_territory[i]) == NULL, "CURIO: Territory overlaps with another city");
            GameLib._initializeTile(_territory[i]);

            uint256 _tile = ECSLib._addEntity();
            ECSLib._setString("Tag", _tile, "Tile");
            ECSLib._setPosition("Position", _tile, _territory[i]);
            ECSLib._setUint("City", _tile, _cityID);
        }

        // Convert the settler to a city
        ECSLib._removeBool("CanSettle", _cityID);
        ECSLib._removeUint("Health", _cityID);
        ECSLib._removeUint("Speed", _cityID);
        ECSLib._removeUint("LastTimestamp", _cityID);
        ECSLib._setString("Tag", _cityID, "City");
        ECSLib._setString("Name", _cityID, _cityName);
        ECSLib._setBool("CanProduce", _cityID);

        Templates.createSettler(_centerPosition, _cityID);
    }

    /// @notice This function can be viewed as the inverse of `foundCity`, as it converts a city back into a settler.
    function packCity(uint256 _cityID) external {
        // Verify that city exists as an entity
        require(Set(gs().entities).includes(_cityID), "CURIO: City not found");

        GameLib.gamePauseCheck();

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that city belongs to player
        require(ECSLib._getUint("Owner", _cityID) == _playerID, "CURIO: City is not yours");

        uint256 _settlerID = _cityID;

        // Remove city tiles
        uint256[] memory _tileIDs = GameLib._getCityTiles(_cityID);
        assert(_tileIDs.length == GameLib._getCityTileCountByLevel(ECSLib._getUint("Level", _cityID)));
        for (uint256 i = 0; i < _tileIDs.length; i++) {
            ECSLib._removeEntity(_tileIDs[i]);
        }

        // Convert the settler to a city
        (uint256 _health, uint256 _speed) = GameLib._getSettlerHealthAndSpeedByLevel(ECSLib._getUint("Level", _settlerID));
        ECSLib._setBool("CanSettle", _settlerID);
        ECSLib._setUint("Health", _settlerID, _health);
        ECSLib._setUint("Speed", _settlerID, _speed);
        ECSLib._setUint("LastTimestamp", _settlerID, block.timestamp);
        ECSLib._setString("Tag", _settlerID, "Settler");
        ECSLib._removeString("Name", _settlerID);
        ECSLib._removeBool("CanProduce", _settlerID);

        // Remove city center
        ECSLib._removeEntity(GameLib._getCityCenter(_cityID));
    }

    function upgradeCity(uint256 _cityID, Position[] memory _newTiles) external {
        // Verify that city exists as an entity
        require(Set(gs().entities).includes(_cityID), "CURIO: City not found");

        GameLib.gamePauseCheck();

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

        uint256 _level = ECSLib._getUint("Level", _cityID);
        require(_newTiles.length == GameLib._getCityTileCountByLevel(_level + 1) - GameLib._getCityTileCountByLevel(_level), "CURIO: New territory tile count is incorrect");

        // Verify that territory is connected
        require(GameLib._connected(_newTiles), "CURIO: Territory not connected");

        // Verify that new territory is connected to existing territory
        // TODO

        // Verify that territory is wholly in bound and does not overlap with other cities
        for (uint256 i = 0; i < _newTiles.length; i++) {
            Templates.createCityTile(_newTiles[i], _cityID);
        }

        // Expend resources
        ECSLib._setUint("Amount", _goldInventoryID, _balance - _cost);

        // Upgrade city
        ECSLib._setUint("Level", _cityID, _level + 1);
    }

    // ----------------------------------------------------------
    // PRODUCTION
    // ----------------------------------------------------------

    function startTroopProduction(
        uint256 _buildingID,
        uint256 _templateID,
        uint256 _amount
    ) external returns (uint256 _productionID) {
        // Verify that building and template exist as entities
        require(Set(gs().entities).includes(_buildingID), "CURIO: Building not found");
        require(Set(gs().entities).includes(_templateID), "CURIO: Template not found");

        GameLib.gamePauseCheck();

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: Player is inactive");

        // Verify that city belongs to player
        uint256 _cityID = ECSLib._getUint("City", _buildingID);
        require(ECSLib._getUint("Owner", _cityID) == _playerID, "CURIO: City is not yours");

        // Verify that city can produce
        require(ECSLib._getBool("CanProduce", _cityID), "CURIO: City cannot produce");

        // Check gold balance sufficience
        uint256 _goldInventoryID = GameLib._getInventory(_cityID, GameLib._getTemplateByInventoryType("Gold"));
        uint256 _balance = _goldInventoryID != NULL ? ECSLib._getUint("Amount", _goldInventoryID) : 0;
        uint256 _cost = ECSLib._getUint("Cost", _templateID) * _amount;
        require(_balance >= _cost, "CURIO: Insufficient gold balance");

        // Create inventory if none exists, and verify that amount does not exceed ceiling
        uint256 _inventoryID = GameLib._getInventory(_cityID, _templateID); // FIXME: BUG
        if (_inventoryID == NULL) {
            _inventoryID = ECSLib._addEntity();
            ECSLib._setString("Tag", _inventoryID, "TroopInventory");
            ECSLib._setUint("City", _inventoryID, _cityID);
            ECSLib._setUint("Template", _inventoryID, _templateID);
            ECSLib._setUint("Amount", _inventoryID, 0);
        } else {
            require(ECSLib._getUint("Amount", _inventoryID) < gs().worldConstants.maxInventoryCapacity, "CURIO: Amount exceeds inventory capacity");
        }

        // Start production
        _productionID = ECSLib._addEntity();
        ECSLib._setString("Tag", _productionID, "TroopProduction");
        ECSLib._setUint("City", _productionID, _cityID);
        ECSLib._setUint("Template", _productionID, _templateID);
        ECSLib._setUint("Inventory", _productionID, _inventoryID);
        ECSLib._setUint("Amount", _productionID, _amount);
        ECSLib._setUint("InitTimestamp", _productionID, block.timestamp);
        ECSLib._setUint("Duration", _productionID, ECSLib._getUint("Duration", _templateID) * _amount);

        // Deduct cost
        ECSLib._setUint("Amount", _goldInventoryID, _balance - _cost);
    }

    function endTroopProduction(uint256 _buildingID, uint256 _productionID) external {
        // Verify that building and production exist as entities
        require(Set(gs().entities).includes(_buildingID), "CURIO: Building not found");
        require(Set(gs().entities).includes(_productionID), "CURIO: Production not found");

        GameLib.gamePauseCheck();

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: Player is inactive");

        // Verify that city belongs to player
        uint256 _cityID = ECSLib._getUint("City", _buildingID);
        require(ECSLib._getUint("Owner", _cityID) == _playerID, "CURIO: City is not yours");

        // Verify that enough time has passed
        // require(ECSLib._getUint("InitTimestamp", _productionID) + ECSLib._getUint("Duration", _productionID) >= block.timestamp, "CURIO: Need more time for production");

        // Update inventory
        uint256 _inventoryID = ECSLib._getUint("Inventory", _productionID);
        ECSLib._setUint("Amount", _inventoryID, ECSLib._getUint("Amount", _inventoryID) + ECSLib._getUint("Amount", _productionID));

        // Delete production
        ECSLib._removeEntity(_productionID);
    }

    function startGather(uint256 _armyID, uint256 _resourceID) external {
        // Verify that army and resource exist as entities
        require(Set(gs().entities).includes(_armyID), "CURIO: Army not found");
        require(Set(gs().entities).includes(_resourceID), "CURIO: Resource not found");

        GameLib.gamePauseCheck();

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: Player is inactive");

        // Verify that army is sitting on the resource
        Position memory _position = ECSLib._getPosition("Position", _armyID);
        require(GameLib._coincident(_position, ECSLib._getPosition("Position", _resourceID)), "CURIO: Army must be coincident to resource to gather");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _armyID) == _playerID, "CURIO: Army is not yours");

        // Verify that resource is not in another player's territory
        uint256 _tileID = GameLib._getTileAt(_position);
        require(_tileID == NULL || ECSLib._getUint("Owner", ECSLib._getUint("City", _tileID)) == _playerID, "CURIO: Cannot gather on another player's territory");

        // Verify that the army's capacity isn't full
        // TODO

        // Start gathering process
        uint256 _gatherID = ECSLib._addEntity();
        ECSLib._setString("Tag", _gatherID, "ResourceGather");
        ECSLib._setPosition("Position", _gatherID, _position);
        ECSLib._setUint("Owner", _gatherID, _playerID);
        ECSLib._setUint("Template", _gatherID, ECSLib._getUint("Template", _resourceID));
        ECSLib._setUint("InitTimestamp", _gatherID, block.timestamp);
    }

    function endGather(uint256 _armyID) external {
        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_armyID), "CURIO: Army not found");

        GameLib.gamePauseCheck();

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: Player is inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _armyID) == _playerID, "CURIO: Army is not yours");

        // End gather
        GameLib._endGather(_armyID);
    }

    // harvest gold on a city
    function harvestResource(uint256 _buildingID, uint256 _templateID) external {
        // Verify that building exists as an entity
        require(Set(gs().entities).includes(_buildingID), "CURIO: Building not found");

        GameLib.gamePauseCheck();

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: Player is inactive");

        // Verify that city belongs to player
        uint256 _cityID = ECSLib._getUint("City", _buildingID);
        require(ECSLib._getUint("Owner", _cityID) == _playerID, "CURIO: City is not yours");

        // Create inventory if none exists
        uint256 _inventoryID = GameLib._getInventory(_cityID, _templateID);
        if (_inventoryID == NULL) {
            _inventoryID = ECSLib._addEntity();
            ECSLib._setString("Tag", _inventoryID, "ResourceInventory");
            ECSLib._setUint("City", _inventoryID, _cityID);
            ECSLib._setUint("Template", _inventoryID, _templateID);
            ECSLib._setUint("Amount", _inventoryID, 0);
        }

        // Update amount and reset time
        uint256 _amount = (block.timestamp - ECSLib._getUint("InitTimestamp", _buildingID)) / ECSLib._getUint("Duration", _templateID) + ECSLib._getUint("Amount", _inventoryID);
        if (_amount >= gs().worldConstants.maxInventoryCapacity) _amount = gs().worldConstants.maxInventoryCapacity;
        ECSLib._setUint("Amount", _inventoryID, _amount);
        ECSLib._setUint("InitTimestamp", _buildingID, block.timestamp);
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

        GameLib.gamePauseCheck();

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that city belongs to player
        require(ECSLib._getUint("Owner", _cityID) == _playerID, "CURIO: City is not yours");

        // Verify there is no army currently at the city center
        require(GameLib._getArmyAt(ECSLib._getPosition("Position", _cityID)) == NULL, "CURIO: Tile occupied by another army");

        uint256 _health = 0; // sum
        uint256 _speed = 0; // average
        uint256 _attack = 0; // sum
        uint256 _defense = 0; // sum
        uint256 _load = 0; // sum

        // Verify input templates
        require(_templateIDs.length == _amounts.length, "CURIO: Input lengths do not match");
        require(_templateIDs.length > 0, "CURIO: You must organize armies with at least 1 troop");

        // Update inventory and gather army traits
        for (uint256 i = 0; i < _templateIDs.length; i++) {
            uint256 _inventoryID = GameLib._getInventory(_cityID, _templateIDs[i]);
            require(ECSLib._getUint("Amount", _inventoryID) >= _amounts[i], "CURIO: Not enough troops");

            _health += ECSLib._getUint("Health", _templateIDs[i]) * _amounts[i];
            _speed += ECSLib._getUint("Speed", _templateIDs[i]) * _amounts[i];
            _attack += ECSLib._getUint("Attack", _templateIDs[i]) * _amounts[i];
            _defense += ECSLib._getUint("Defense", _templateIDs[i]) * _amounts[i];
            _load += ECSLib._getUint("Load", _templateIDs[i]) * _amounts[i];
            ECSLib._setUint("Amount", _inventoryID, ECSLib._getUint("Amount", _inventoryID) - _amounts[i]);
        }
        _speed /= GameLib._sum(_amounts);

        // Add army
        _armyID = ECSLib._addEntity();
        ECSLib._setString("Tag", _armyID, "Army");
        ECSLib._setUint("Owner", _armyID, _playerID);
        ECSLib._setPosition("Position", _armyID, ECSLib._getPosition("Position", _cityID));
        ECSLib._setUint("Health", _armyID, _health);
        ECSLib._setUint("Speed", _armyID, _speed);
        ECSLib._setUint("Attack", _armyID, _attack);
        ECSLib._setUint("Defense", _armyID, _defense);
        ECSLib._setUint("Load", _armyID, _load);
        ECSLib._setUint("LastTimestamp", _armyID, block.timestamp);

        // Add army constituents
        for (uint256 i = 0; i < _templateIDs.length; i++) {
            uint256 _constituentID = ECSLib._addEntity();
            ECSLib._setString("Tag", _constituentID, "ArmyConstituent");
            ECSLib._setUint("Keeper", _constituentID, _armyID);
            ECSLib._setUint("Template", _constituentID, _templateIDs[i]);
            ECSLib._setUint("Amount", _constituentID, _amounts[i]);
        }
    }

    function disbandArmy(uint256 _armyID) external {
        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_armyID), "CURIO: City not found");

        GameLib.gamePauseCheck();

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
        uint256[] memory _constituentIDs = GameLib._getArmyConstituents(_armyID);
        for (uint256 i = 0; i < _constituentIDs.length; i++) {
            uint256 _inventoryID = GameLib._getInventory(_cityID, ECSLib._getUint("Template", _constituentIDs[i]));
            uint256 _amount = ECSLib._getUint("Amount", _inventoryID) + ECSLib._getUint("Amount", _constituentIDs[i]);
            require(_amount <= gs().worldConstants.maxInventoryCapacity, "CURIO: Too many troops");
            ECSLib._setUint("Amount", _inventoryID, _amount);
        }

        // Disband army
        GameLib._removeArmy(_armyID);
    }

    function moveArmy(uint256 _armyID, Position memory _targetPosition) external {
        // verify that player's binding treaty approves the move
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        uint256[] memory _signatureIDs = GameLib._getPlayerSignatures(_playerID);
        for (uint256 i = 0; i < _signatureIDs.length; i++) {
            address _treaty = ECSLib._getAddress("Treaty", _signatureIDs[i]);
            (bool _success, bytes memory _returnData) = _treaty.call(abi.encodeWithSignature("approveMoveArmy()"));
            require(_success, "CRUIO: Failed to call the external treaty");
            require(abi.decode(_returnData, (bool)), "CRUIO: Treaty does not approve your action");
        }

        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_armyID), "CURIO: Army not found");

        GameLib.gamePauseCheck();

        // Verify that player is active
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _armyID) == _playerID, "CURIO: Army is not yours");

        // Verify that position is in bound, and initialize tile
        require(GameLib._inBound(_targetPosition), "CURIO: Out of bound");
        GameLib._initializeTile(_targetPosition);

        // Check speed and cooldown
        require(ECSLib._getUint("LastTimestamp", _armyID) < block.timestamp, "CURIO: Need more time till next move");
        require(ECSLib._getUint("Speed", _armyID) >= GameLib._euclidean(ECSLib._getPosition("Position", _armyID), _targetPosition), "CURIO: Not fast enough");

        // Verify that target tile has no other army
        require(GameLib._getArmyAt(_targetPosition) == NULL, "CURIO: Destination occupied by another army");

        // Move
        ECSLib._setPosition("Position", _armyID, _targetPosition);
    }

    function startBattle(uint256 _armyID, uint256 _targetID) external {
        if (GameLib._strEq(ECSLib._getString("Tag", _targetID), "Army")) {
            _startBattleArmy(_armyID, _targetID);
        } else {
            _startBattleCity(_armyID, _targetID);
        }
    }

    function endBattle(uint256 _armyID, bool _isBattlingArmy) external {
        if (_isBattlingArmy) {
            // FIXME: temporary distinguisher for army or city
            _endBattleArmy(_armyID);
        } else {
            _endBattleCity(_armyID);
        }
    }

    function _startBattleArmy(uint256 _armyID, uint256 _targetArmyID) private {
        // Verify that armies exist as entities
        require(Set(gs().entities).includes(_armyID), "CURIO: Army not found");
        require(Set(gs().entities).includes(_targetArmyID), "CURIO: Target army not found");

        GameLib.gamePauseCheck();

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that army belongs to player and target army doesn't
        require(ECSLib._getUint("Owner", _armyID) == _playerID, "CURIO: Army is not yours");
        require(ECSLib._getUint("Owner", _targetArmyID) != _playerID, "CURIO: Cannot attack your own army");

        // End army's and target army's gathers
        if (GameLib._getArmyGather(_armyID) != NULL) GameLib._endGather(_armyID);
        if (GameLib._getArmyGather(_targetArmyID) != NULL) GameLib._endGather(_targetArmyID);

        // Verify that army and target army are adjacent
        require(GameLib._adjacent(ECSLib._getPosition("Position", _armyID), ECSLib._getPosition("Position", _targetArmyID)), "CURIO: Too far");

        // Start exchanging fire
        uint256 _battleID = ECSLib._addEntity();
        ECSLib._setString("Tag", _battleID, "Battle");
        ECSLib._setUint("InitTimestamp", _battleID, block.timestamp);
        ECSLib._setUint("Source", _battleID, _armyID);
        ECSLib._setUint("Target", _battleID, _targetArmyID);

        // FIXME: congrats, you win (and take the other's gold)
        uint256 _armyInventoryAmount = ECSLib._getUint("Amount", GameLib._getArmyInventory(_armyID, GameLib._getTemplateByInventoryType("Gold")));
        uint256 _increase = ECSLib._getUint("Amount", GameLib._getArmyInventory(_targetArmyID, GameLib._getTemplateByInventoryType("Gold")));
        if (_increase > ECSLib._getUint("Load", _armyID) - _armyInventoryAmount) _increase = ECSLib._getUint("Load", _armyID) - _armyInventoryAmount;
        ECSLib._setUint("Amount", GameLib._getArmyInventory(_armyID, GameLib._getTemplateByInventoryType("Gold")), _armyInventoryAmount + _increase);
        GameLib._removeArmy(_targetArmyID);
    }

    /**
     * This function was to be called `retreat`, but I figured since we need to ping the contract side to end battle anyway,
     */
    function _endBattleArmy(uint256 _armyID) private {
        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_armyID), "CURIO: Army not found");

        GameLib.gamePauseCheck();

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _armyID) == _playerID, "CURIO: Army is not yours");

        // Verify that at least one war is happening with the army
        uint256[] memory _battleIDs = GameLib._getBattles(_armyID);
        require(_battleIDs.length >= 1, "CURIO: No battle to end");

        // For now, assume there's only one battle
        uint256 _otherArmyID = ECSLib._getUint("Source", _battleIDs[0]) == _armyID ? ECSLib._getUint("Target", _battleIDs[0]) : ECSLib._getUint("Source", _battleIDs[0]);
        uint256 _duration = block.timestamp - ECSLib._getUint("InitTimestamp", _battleIDs[0]);
        (uint256 _damageOnArmy, uint256 _damageOnOtherArmy) = GameLib._getBattleDamages(_armyID, _otherArmyID, _duration);
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
        //     (uint256 _damageOnArmy, uint256 _damageOnOtherArmy) = GameLib._getBattleDamages(_armyID, _otherArmyID, _duration);

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

    function _startBattleCity(uint256 _armyID, uint256 _cityID) private {
        // Verify that army and city exist as entities
        require(Set(gs().entities).includes(_armyID), "CURIO: Army not found");
        require(Set(gs().entities).includes(_cityID), "CURIO: City not found");

        GameLib.gamePauseCheck();

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

    function _endBattleCity(uint256 _armyID) private {
        // Verify that army exists as an entity
        require(Set(gs().entities).includes(_armyID), "CURIO: Army not found");

        GameLib.gamePauseCheck();

        // Verify that player is active
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        // Verify that army belongs to player
        require(ECSLib._getUint("Owner", _armyID) == _playerID, "CURIO: Army is not yours");

        // Verify that at least one war is happening with the army
        uint256[] memory _battleIDs = GameLib._getBattles(_armyID);
        require(_battleIDs.length >= 1, "CURIO: No battle to end");

        // For now, assume there's only one battle
        uint256 _guardID = ECSLib._getUint("Source", _battleIDs[0]) == _armyID ? ECSLib._getUint("Target", _battleIDs[0]) : ECSLib._getUint("Source", _battleIDs[0]);
        uint256 _cityID = ECSLib._getUint("City", _guardID);
        uint256 _duration = block.timestamp - ECSLib._getUint("InitTimestamp", _battleIDs[0]);
        (uint256 _damageOnArmy, uint256 _damageOnGuard) = GameLib._getBattleDamages(_armyID, _guardID, _duration);
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

        GameLib.gamePauseCheck();

        // request to sign treaty
        (bool success, bytes memory returnData) = _treatyAddress.call(abi.encodeWithSignature("joinTreaty()"));

        require(success, "CRUIO: Failed to call the external treaty");
        require(abi.decode(returnData, (bool)), "CRUIO: The treaty rejects your request");

        // Sign treaty
        uint256 _signatureID = ECSLib._addEntity();
        ECSLib._setString("Tag", _signatureID, "Signature");
        ECSLib._setUint("Owner", _signatureID, _playerID);
        ECSLib._setAddress("Treaty", _signatureID, _treatyAddress);
    }

    function denounceTreaty(address _treatyToDenounce) external {
        uint256 _playerID = GameLib._getPlayer(msg.sender);
        // Verify that player is active
        require(ECSLib._getBoolComponent("IsActive").has(_playerID), "CURIO: You are inactive");

        GameLib.gamePauseCheck();

        // request to breach treaty
        (bool success, bytes memory returnData) = _treatyToDenounce.call(abi.encodeWithSignature("denounceTreaty()"));

        require(success, "CRUIO: Failed to call the external treaty");
        require(abi.decode(returnData, (bool)), "CRUIO: The treaty rejects your request");

        // breach treaty
        uint256[] memory _signatureIDs = GameLib._getPlayerSignatures(_playerID);
        for (uint256 i = 0; i < _signatureIDs.length; i++) {
            address _treaty = ECSLib._getAddress("Treaty", _signatureIDs[i]);
            if (_treaty == _treatyToDenounce) {
                ECSLib._removeEntity(_signatureIDs[i]);
                break;
            }
        }
    }
}
