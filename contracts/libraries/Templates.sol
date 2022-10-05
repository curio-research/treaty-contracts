//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Position, TERRAIN, WorldConstants} from "contracts/libraries/Types.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";

library Templates {
    function _createCityCenter(Position memory _position, uint256 _cityID) public returns (uint256) {
        uint256 cityCenterID = ECSLib._addEntity();

        ECSLib._setString("Tag", cityCenterID, "Building");
        ECSLib._setPosition("Position", cityCenterID, _position);
        ECSLib._setUint("City", cityCenterID, _cityID);
        ECSLib._setString("BuildingType", cityCenterID, "City Center");
        ECSLib._setUint("InitTimestamp", cityCenterID, block.timestamp);

        return cityCenterID;
    }

    function _createCityTile(
        Position memory _position,
        uint256 _cityID,
        address _playerAddr
    ) public returns (uint256) {
        require(GameLib._inBound(_position), "CURIO: Out of bound");
        require(GameLib._getTileAt(_position) == 0, "CURIO: Territory overlaps with another city");
        GameLib._initializeTile(_position);

        uint256 tileID = ECSLib._addEntity();
        ECSLib._setString("Tag", tileID, "Tile");
        ECSLib._setPosition("Position", tileID, _position);
        ECSLib._setUint("City", tileID, _cityID);
        ECSLib._setUint("Owner", tileID, GameLib._getPlayer(_playerAddr));

        return tileID;
    }

    function _createSettler(
        Position memory _position,
        uint256 _playerID,
        uint256 _speed
    ) public returns (uint256) {
        uint256 settlerID = ECSLib._addEntity();

        ECSLib._setString("Tag", settlerID, "Settler");
        ECSLib._setPosition("Position", settlerID, _position);
        ECSLib._setUint("Owner", settlerID, _playerID);
        ECSLib._setUint("Level", settlerID, 1);
        ECSLib._setBool("CanSettle", settlerID);
        ECSLib._setUint("Health", settlerID, 1); // FIXME
        ECSLib._setUint("Speed", settlerID, _speed); // FIXME
        ECSLib._setUint("LastTimestamp", settlerID, block.timestamp);
        ECSLib._setUint("MoveCooldown", settlerID, 1);

        return settlerID;
    }

    function _createPlayer(string memory _name) public returns (uint256) {
        uint256 playerID = ECSLib._addEntity();

        ECSLib._setBool("IsActive", playerID);
        ECSLib._setString("Name", playerID, _name);
        ECSLib._setString("Tag", playerID, "Player");
        ECSLib._setUint("InitTimestamp", playerID, block.timestamp);
        ECSLib._setAddress("Address", playerID, msg.sender);

        return playerID;
    }

    function _addArmy(uint256 _playerID, Position memory _position) public returns (uint256) {
        uint256 armyID = ECSLib._addEntity();

        ECSLib._setString("Tag", armyID, "Army");
        ECSLib._setUint("Owner", armyID, _playerID);
        ECSLib._setPosition("Position", armyID, _position);
        ECSLib._setUint("Health", armyID, 0);
        ECSLib._setUint("Speed", armyID, 0);
        ECSLib._setUint("Attack", armyID, 0);
        ECSLib._setUint("Defense", armyID, 0);
        ECSLib._setUint("Load", armyID, 0);
        ECSLib._setUint("LastTimestamp", armyID, block.timestamp);
        ECSLib._setUint("Capacity", armyID, 100); // FIXME: temporary

        return armyID;
    }

    function _addGuard(uint256 _cityID, WorldConstants memory _constants) public returns (uint256) {
        uint256 guardID = ECSLib._addEntity();

        ECSLib._setString("Tag", guardID, "Guard");
        ECSLib._setUint("City", guardID, _cityID);
        ECSLib._setUint("Health", guardID, _constants.cityHealth);
        ECSLib._setUint("Attack", guardID, _constants.cityAttack);
        ECSLib._setUint("Defense", guardID, _constants.cityDefense);
        ECSLib._setUint("Amount", guardID, _constants.cityAmount);

        return guardID;
    }

    function _addTroopProduction() public returns (uint256) {
        uint256 productionID = ECSLib._addEntity();

        ECSLib._setString("Tag", productionID, "TroopProduction");
        ECSLib._setUint("City", productionID, 0);
        ECSLib._setUint("Template", productionID, 0);
        ECSLib._setUint("Inventory", productionID, 0);
        ECSLib._setUint("Amount", productionID, 0);
        ECSLib._setUint("InitTimestamp", productionID, block.timestamp);
        ECSLib._setUint("Duration", productionID, ECSLib._getUint("Duration", 0) * 0);

        return productionID;
    }

    function _addResourceGather(
        Position memory _position,
        uint256 _playerID,
        uint256 _resourceTemplateID,
        uint256 _armyID
    ) public returns (uint256) {
        uint256 gatherID = ECSLib._addEntity();

        ECSLib._setString("Tag", gatherID, "ResourceGather");
        ECSLib._setPosition("Position", gatherID, _position);
        ECSLib._setUint("Owner", gatherID, _playerID);
        ECSLib._setUint("Template", gatherID, ECSLib._getUint("Template", _resourceTemplateID));
        ECSLib._setUint("InitTimestamp", gatherID, block.timestamp);
        ECSLib._setUint("Army", gatherID, _armyID);

        return gatherID;
    }
}
