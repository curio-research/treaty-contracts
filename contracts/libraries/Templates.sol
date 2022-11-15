//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Position, WorldConstants} from "contracts/libraries/Types.sol";
import {Strings} from "openzeppelin-contracts/contracts/utils/Strings.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import "forge-std/console.sol";

library Templates {
    function addCityCenter(Position memory _startPosition, uint256 _cityID) public returns (uint256) {
        uint256 cityCenterID = ECSLib.addEntity();

        ECSLib.setString("Tag", cityCenterID, "Building");
        ECSLib.setPosition("StartPosition", cityCenterID, _startPosition);
        ECSLib.setUint("City", cityCenterID, _cityID);
        ECSLib.setUint("Level", cityCenterID, 1);
        ECSLib.setString("BuildingType", cityCenterID, "City Center");
        ECSLib.setUint("InitTimestamp", cityCenterID, block.timestamp);
        ECSLib.setUint("LastTimestamp", cityCenterID, block.timestamp);
        ECSLib.setUint("LastUpgraded", cityCenterID, 0);
        ECSLib.setUint("LastMoved", cityCenterID, 0);
        ECSLib.setUint("LastSacked", cityCenterID, 0); // todo: make sure initialized time exceeds cooldown constant

        return cityCenterID;
    }

    function addInventory(
        uint256 _keeperID,
        uint256 _templateID,
        uint256 _amount,
        uint256 _load,
        bool _isResource
    ) public returns (uint256) {
        uint256 inventoryID = ECSLib.addEntity();

        ECSLib.setString("Tag", inventoryID, _isResource ? "ResourceInventory" : "TroopInventory");
        ECSLib.setUint("Keeper", inventoryID, _keeperID);
        ECSLib.setUint("Template", inventoryID, _templateID);
        ECSLib.setUint("Amount", inventoryID, _amount);
        ECSLib.setUint("Load", inventoryID, _load);

        return inventoryID;
    }

    function convertSettlerToCity(uint256 _settlerID, string memory _cityName) public returns (uint256) {
        uint256 cityID = _settlerID;

        // Convert the settler to a city
        ECSLib.removeBool("CanSettle", cityID);
        ECSLib.removeUint("Health", cityID);
        ECSLib.removeUint("Speed", cityID);
        ECSLib.removeUint("LastTimestamp", cityID);
        ECSLib.removeUint("MoveCooldown", cityID);
        ECSLib.setString("Tag", cityID, "City");
        ECSLib.setString("Name", cityID, _cityName);
        ECSLib.setBool("CanProduce", cityID);

        return cityID;
    }

    function convertCityToSettler(
        uint256 _cityID,
        uint256 _health,
        uint256 _speed
    ) public returns (uint256) {
        uint256 settlerID = _cityID;

        ECSLib.setBool("CanSettle", settlerID);
        ECSLib.setUint("Health", settlerID, _health);
        ECSLib.setUint("Speed", settlerID, _speed);
        ECSLib.setUint("LastTimestamp", settlerID, block.timestamp);
        ECSLib.setUint("MoveCooldown", settlerID, 1);
        ECSLib.setString("Tag", settlerID, "Settler");
        ECSLib.removeString("Name", settlerID);
        ECSLib.removeBool("CanProduce", settlerID);

        return settlerID;
    }

    function addTile(Position memory _startPosition, uint256 _terrain, address _tileAddress) public returns (uint256) {
        uint256 tileID = ECSLib.addEntity();

        ECSLib.setString("Tag", tileID, "Tile");
        ECSLib.setBool("CanBattle", tileID);
        ECSLib.setPosition("StartPosition", tileID, _startPosition);
        ECSLib.setUint("Level", tileID, 1);
        ECSLib.setUint("Terrain", tileID, _terrain);
        ECSLib.setUint("LastTimestamp", tileID, block.timestamp); // last reset time for barbarians, init active time for supertile
        ECSLib.setUint("LastUpgraded", tileID, 0);
        ECSLib.setUint("LastRecovered", tileID, 0);
        ECSLib.setUint("Nation", tileID, 0);
        ECSLib.setAddress("Address", tileID, _tileAddress);

        return tileID;
    }

    function addCapital(Position memory _tilePosition, uint256 _nationID) public returns (uint256) {
        uint256 capitalID = ECSLib.addEntity();

        ECSLib.setString("Tag", capitalID, "Building");
        ECSLib.setPosition("StartPosition", capitalID, _tilePosition);
        ECSLib.setUint("Level", capitalID, 1);
        ECSLib.setString("BuildingType", capitalID, "Capital");
        ECSLib.setBool("CanProduce", capitalID);
        ECSLib.setUint("InitTimestamp", capitalID, block.timestamp);
        ECSLib.setUint("LastTimestamp", capitalID, block.timestamp);
        ECSLib.setUint("LastUpgraded", capitalID, block.timestamp);
        ECSLib.setUint("LastMoved", capitalID, block.timestamp);
        ECSLib.setUint("LastSacked", capitalID, block.timestamp);
        ECSLib.setUint("Nation", capitalID, _nationID);

        return capitalID;
    }

    function addResource(
        uint256 _templateID,
        Position memory _startPosition,
        uint256 _load
    ) public returns (uint256) {
        uint256 resourceID = ECSLib.addEntity();

        ECSLib.setString("Tag", resourceID, "Resource");
        ECSLib.setUint("Template", resourceID, _templateID);
        ECSLib.setUint("Level", resourceID, 0); // initialize at zero is equivalent to not having a gold mine "built"
        ECSLib.setPosition("StartPosition", resourceID, _startPosition);
        ECSLib.setUint("LastTimestamp", resourceID, block.timestamp);
        ECSLib.setUint("Load", resourceID, _load);
        ECSLib.setUint("LastUpgraded", resourceID, 0);
        ECSLib.setUint("Nation", resourceID, 0);

        return resourceID;
    }

    function addNation(string memory _name) public returns (uint256) {
        uint256 nationID = ECSLib.addEntity();

        ECSLib.setString("Tag", nationID, "Player");
        ECSLib.setBool("IsActive", nationID);
        ECSLib.setString("Name", nationID, _name);
        ECSLib.setUint("InitTimestamp", nationID, block.timestamp);
        ECSLib.setAddress("Address", nationID, msg.sender);

        return nationID;
    }

    function addArmy(
        Position memory _position,
        uint256 _speed,
        uint256 _moveCooldown,
        uint256 _battleCooldown,
        uint256 _attackRange,
        uint256 _nationID,
        address _armyAddress
    ) public returns (uint256) {
        uint256 armyID = ECSLib.addEntity();

        ECSLib.setString("Tag", armyID, "Army");
        ECSLib.setBool("CanBattle", armyID);
        ECSLib.setPosition("Position", armyID, _position);
        ECSLib.setUint("Speed", armyID, _speed);
        ECSLib.setUint("LastTimestamp", armyID, block.timestamp);
        ECSLib.setUint("MoveCooldown", armyID, _moveCooldown);
        ECSLib.setUint("BattleCooldown", armyID, _battleCooldown);
        ECSLib.setUint("AttackRange", armyID, _attackRange);
        ECSLib.setUint("Nation", armyID, _nationID);
        ECSLib.setAddress("Address", armyID, _armyAddress);
        return armyID;
    }

    function addConstituent(
        uint256 _keeperID,
        uint256 _templateID,
        uint256 _amount
    ) public returns (uint256) {
        uint256 guardID = ECSLib.addEntity();

        ECSLib.setString("Tag", guardID, "Constituent");
        ECSLib.setUint("Keeper", guardID, _keeperID);
        ECSLib.setUint("Template", guardID, _templateID);
        ECSLib.setUint("Amount", guardID, _amount);

        return guardID;
    }

    function addTroopProduction(
        uint256 _buildingID,
        uint256 _templateID,
        uint256 _troopInventoryID,
        uint256 _amount,
        uint256 _duration
    ) public returns (uint256) {
        uint256 productionID = ECSLib.addEntity();

        ECSLib.setString("Tag", productionID, "TroopProduction");
        ECSLib.setUint("Keeper", productionID, _buildingID);
        ECSLib.setUint("Template", productionID, _templateID);
        ECSLib.setUint("Inventory", productionID, _troopInventoryID);
        ECSLib.setUint("Amount", productionID, _amount);
        ECSLib.setUint("InitTimestamp", productionID, block.timestamp);
        ECSLib.setUint("Duration", productionID, _duration);

        return productionID;
    }

    function addResourceGather(
        Position memory _position,
        uint256 _playerID,
        uint256 _resourceTemplateID,
        uint256 _armyID
    ) public returns (uint256) {
        uint256 gatherID = ECSLib.addEntity();

        ECSLib.setString("Tag", gatherID, "ResourceGather");
        ECSLib.setPosition("Position", gatherID, _position);
        ECSLib.setUint("Owner", gatherID, _playerID);
        ECSLib.setUint("Template", gatherID, ECSLib.getUint("Template", _resourceTemplateID));
        ECSLib.setUint("InitTimestamp", gatherID, block.timestamp);
        ECSLib.setUint("Army", gatherID, _armyID);

        return gatherID;
    }

    function addTroopTemplate(
        string memory _inventoryType,
        uint256 _health,
        uint256 _speed,
        uint256 _moveCooldown,
        uint256 _battleCooldown,
        uint256 _attack,
        uint256 _defense,
        uint256 _load,
        address _tokenContract
    ) public returns (uint256) {
        uint256 templateID = ECSLib.addEntity();

        ECSLib.setString("Tag", templateID, "TroopTemplate");
        ECSLib.setString("InventoryType", templateID, _inventoryType);
        ECSLib.setUint("Health", templateID, _health);
        ECSLib.setUint("Speed", templateID, _speed);
        ECSLib.setUint("MoveCooldown", templateID, _moveCooldown);
        ECSLib.setUint("BattleCooldown", templateID, _battleCooldown);
        ECSLib.setUint("Attack", templateID, _attack);
        ECSLib.setUint("Defense", templateID, _defense);
        ECSLib.setUint("Load", templateID, _load);
        ECSLib.setAddress("Address", templateID, _tokenContract);

        return templateID;
    }

    function addResourceTemplate(string memory _inventoryType, address _tokenContract) public returns (uint256) {
        uint256 templateID = ECSLib.addEntity();

        ECSLib.setString("Tag", templateID, "ResourceTemplate");
        ECSLib.setString("InventoryType", templateID, _inventoryType);
        ECSLib.setAddress("Address", templateID, _tokenContract);

        return templateID;
    }

    function addGameParameter(string memory _identifier, uint256 _value) public returns (uint256) {
        uint256 paramID = ECSLib.addEntity();

        ECSLib.setString("Tag", paramID, _identifier);
        ECSLib.setUint("Amount", paramID, _value);

        return paramID;
    }
}
