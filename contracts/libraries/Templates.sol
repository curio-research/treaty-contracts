//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Position, TERRAIN, WorldConstants} from "contracts/libraries/Types.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";

library Templates {
    function createCityCenter(Position memory _position, uint256 _cityId) public returns (uint256) {
        uint256 _cityCenterID = ECSLib._addEntity();

        ECSLib._setString("Tag", _cityCenterID, "Building");
        ECSLib._setPosition("Position", _cityCenterID, _position);
        ECSLib._setUint("City", _cityCenterID, _cityId);
        ECSLib._setString("BuildingType", _cityCenterID, "City Center");
        ECSLib._setUint("InitTimestamp", _cityCenterID, block.timestamp);

        return _cityCenterID;
    }

    function createCityTile(Position memory _position, uint256 cityId) public returns (uint256) {
        require(GameLib._inBound(_position), "CURIO: Out of bound");
        require(GameLib._getTileAt(_position) == 0, "CURIO: Territory overlaps with another city");
        GameLib._initializeTile(_position);

        uint256 _tile = ECSLib._addEntity();
        ECSLib._setString("Tag", _tile, "Tile");
        ECSLib._setPosition("Position", _tile, _position);
        ECSLib._setUint("City", _tile, cityId);

        return _tile;
    }

    function createSettler(Position memory _position, uint256 _playerId) public returns (uint256) {
        uint256 _settlerId = ECSLib._addEntity();

        ECSLib._setString("Tag", _settlerId, "Settler");
        ECSLib._setPosition("Position", _settlerId, _position);
        ECSLib._setUint("Owner", _settlerId, _playerId);
        ECSLib._setUint("Level", _settlerId, 1);
        ECSLib._setBool("CanSettle", _settlerId);
        ECSLib._setUint("Health", _settlerId, 1); // FIXME
        ECSLib._setUint("Speed", _settlerId, 1); // FIXME
        ECSLib._setUint("LastTimestamp", _settlerId, block.timestamp);

        return _settlerId;
    }

    function createPlayer(string memory _name) public returns (uint256) {
        uint256 _playerID = ECSLib._addEntity();

        ECSLib._setBool("IsActive", _playerID);
        ECSLib._setString("Name", _playerID, _name);
        ECSLib._setString("Tag", _playerID, "Player");
        ECSLib._setUint("InitTimestamp", _playerID, block.timestamp);
        ECSLib._setAddress("Address", _playerID, msg.sender);

        return _playerID;
    }

    function addArmy(uint256 _playerId, Position memory _position) public returns (uint256) {
        uint256 _armyID = ECSLib._addEntity();

        ECSLib._setString("Tag", _armyID, "Army");
        ECSLib._setUint("Owner", _armyID, _playerId);
        ECSLib._setPosition("Position", _armyID, _position);
        ECSLib._setUint("Health", _armyID, 0);
        ECSLib._setUint("Speed", _armyID, 0);
        ECSLib._setUint("Attack", _armyID, 0);
        ECSLib._setUint("Defense", _armyID, 0);
        ECSLib._setUint("Load", _armyID, 0);
        ECSLib._setUint("LastTimestamp", _armyID, block.timestamp);
    }
}
