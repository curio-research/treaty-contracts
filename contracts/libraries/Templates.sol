//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Position, WorldConstants} from "contracts/libraries/Types.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";

library Templates {
    function addCityCenter(Position memory _startPosition, uint256 _cityID) public returns (uint256) {
        uint256 cityCenterID = ECSLib.addEntity();

        ECSLib.setString("Tag", cityCenterID, "Building");
        ECSLib.setPosition("StartPosition", cityCenterID, _startPosition);
        ECSLib.setUint("City", cityCenterID, _cityID);
        ECSLib.setUint("Level", cityCenterID, 1);
        ECSLib.setString("BuildingType", cityCenterID, "City Center");
        ECSLib.setUint("InitTimestamp", cityCenterID, block.timestamp);

        return cityCenterID;
    }

    function addInventory(
        uint256 _cityID,
        uint256 _templateID,
        uint256 _amount,
        uint256 _load
    ) public returns (uint256) {
        uint256 inventoryID = ECSLib.addEntity();

        ECSLib.setString("Tag", inventoryID, "ResourceInventory");
        ECSLib.setUint("City", inventoryID, _cityID);
        ECSLib.setUint("Template", inventoryID, _templateID);
        ECSLib.setUint("Amount", inventoryID, _amount);
        ECSLib.setUint("Load", inventoryID, _load);

        return inventoryID;
    }

    function convertSettlerToCity(
        uint256 _settlerID,
        string memory _cityName,
        Position memory _centerTilePosition
    ) public returns (uint256) {
        uint256 cityID = _settlerID;

        // Convert the settler to a city
        ECSLib.removeBool("CanSettle", cityID);
        ECSLib.removeUint("Health", cityID);
        ECSLib.removeUint("Speed", cityID);
        ECSLib.removeUint("LastTimestamp", cityID);
        ECSLib.removeUint("MoveCooldown", cityID);
        ECSLib.setPosition("StartPosition", cityID, _centerTilePosition);
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
        ECSLib.removePosition("StartPosition", settlerID);

        return settlerID;
    }

    function addTile(Position memory _startPosition) public returns (uint256) {
        uint256 tileID = ECSLib.addEntity();

        ECSLib.setString("Tag", tileID, "Tile");
        ECSLib.setBool("CanBattle", tileID);
        ECSLib.setPosition("StartPosition", tileID, _startPosition);
        ECSLib.setUint("City", tileID, 0);
        ECSLib.setUint("Owner", tileID, 0);
        ECSLib.setUint("Level", tileID, 1);

        return tileID;
    }

    function addSettler(
        Position memory _position,
        uint256 _playerID,
        uint256 _speed
    ) public returns (uint256) {
        uint256 settlerID = ECSLib.addEntity();

        ECSLib.setString("Tag", settlerID, "Settler");
        ECSLib.setPosition("Position", settlerID, _position);
        ECSLib.setUint("Owner", settlerID, _playerID);
        ECSLib.setUint("Level", settlerID, 1);
        ECSLib.setBool("CanSettle", settlerID);
        ECSLib.setUint("Health", settlerID, 1); // FIXME
        ECSLib.setUint("Speed", settlerID, _speed);
        ECSLib.setUint("LastTimestamp", settlerID, block.timestamp);
        ECSLib.setUint("MoveCooldown", settlerID, 1);

        return settlerID;
    }

    function addPlayer(string memory _name) public returns (uint256) {
        uint256 playerID = ECSLib.addEntity();

        ECSLib.setBool("IsActive", playerID);
        ECSLib.setString("Name", playerID, _name);
        ECSLib.setString("Tag", playerID, "Player");
        ECSLib.setUint("InitTimestamp", playerID, block.timestamp);
        ECSLib.setAddress("Address", playerID, msg.sender);

        return playerID;
    }

    function addArmy(
        uint256 _playerID,
        Position memory _position,
        uint256 _speed,
        uint256 _load,
        uint256 _moveCooldown,
        uint256 _battleCooldown
    ) public returns (uint256) {
        uint256 armyID = ECSLib.addEntity();

        ECSLib.setString("Tag", armyID, "Army");
        ECSLib.setBool("CanBattle", armyID);
        ECSLib.setUint("Owner", armyID, _playerID);
        ECSLib.setPosition("Position", armyID, _position);
        ECSLib.setUint("Speed", armyID, _speed);
        ECSLib.setUint("Load", armyID, _load);
        ECSLib.setUint("LastTimestamp", armyID, block.timestamp);
        ECSLib.setUint("MoveCooldown", armyID, _moveCooldown);
        ECSLib.setUint("BattleCooldown", armyID, _battleCooldown);

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

    function addTroopProduction() public returns (uint256) {
        uint256 productionID = ECSLib.addEntity();

        ECSLib.setString("Tag", productionID, "TroopProduction");
        ECSLib.setUint("City", productionID, 0);
        ECSLib.setUint("Template", productionID, 0);
        ECSLib.setUint("Inventory", productionID, 0);
        ECSLib.setUint("Amount", productionID, 0);
        ECSLib.setUint("InitTimestamp", productionID, block.timestamp);
        ECSLib.setUint("Duration", productionID, ECSLib.getUint("Duration", 0) * 0);

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
}
