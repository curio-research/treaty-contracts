//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Position, WorldConstants} from "contracts/libraries/Types.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";

library Templates {
    function addCityCenter(Position memory _position, uint256 _cityID) public returns (uint256) {
        uint256 cityCenterID = ECSLib.addEntity();

        ECSLib.setString("Tag", cityCenterID, "Building");
        ECSLib.setPosition("Position", cityCenterID, _position);
        ECSLib.setUint("City", cityCenterID, _cityID);
        ECSLib.setString("BuildingType", cityCenterID, "City Center");
        ECSLib.setUint("InitTimestamp", cityCenterID, block.timestamp);

        return cityCenterID;
    }

    function addCityTile(
        Position memory _position,
        uint256 _cityID,
        address _playerAddr
    ) public returns (uint256) {
        require(GameLib.inBound(_position), "CURIO: Out of bound");
        require(GameLib.getTileAt(_position) == 0, "CURIO: Tile overlaps with another city");
        GameLib.initializeTile(_position);

        uint256 tileID = ECSLib.addEntity();
        ECSLib.setString("Tag", tileID, "Tile");
        ECSLib.setPosition("Position", tileID, _position);
        ECSLib.setUint("City", tileID, _cityID);
        // ECSLib.setUint("Owner", tileID, GameLib.getPlayer(_playerAddr));

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
        ECSLib.setUint("Speed", settlerID, _speed); // FIXME
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

    function addArmy(uint256 _playerID, Position memory _position) public returns (uint256) {
        uint256 armyID = ECSLib.addEntity();

        ECSLib.setString("Tag", armyID, "Army");
        ECSLib.setUint("Owner", armyID, _playerID);
        ECSLib.setPosition("Position", armyID, _position);
        ECSLib.setUint("Speed", armyID, 0);
        ECSLib.setUint("Load", armyID, 0);
        ECSLib.setUint("LastTimestamp", armyID, block.timestamp);
        ECSLib.setUint("Capacity", armyID, 100); // FIXME: temporary

        return armyID;
    }

    function addGuard(uint256 _cityID, WorldConstants memory _constants) public returns (uint256) {
        uint256 guardID = ECSLib.addEntity();

        ECSLib.setString("Tag", guardID, "Guard");
        ECSLib.setUint("City", guardID, _cityID);
        ECSLib.setUint("Health", guardID, _constants.cityHealth);
        ECSLib.setUint("Attack", guardID, _constants.cityAttack);
        ECSLib.setUint("Defense", guardID, _constants.cityDefense);
        ECSLib.setUint("Amount", guardID, _constants.cityAmount);

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
