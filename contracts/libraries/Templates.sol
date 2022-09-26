//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Position, TERRAIN, WorldConstants} from "contracts/libraries/Types.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";

library Templates {
    function createSettler(Position memory _position, uint256 _cityId) public {
        uint256 _cityCenterID = ECSLib._addEntity();
        ECSLib._setString("Tag", _cityCenterID, "Building");
        ECSLib._setPosition("Position", _cityCenterID, _position);
        ECSLib._setUint("City", _cityCenterID, _cityId);
        ECSLib._setString("BuildingType", _cityCenterID, "City Center");
        ECSLib._setUint("InitTimestamp", _cityCenterID, block.timestamp);
    }

    function createCityTile(Position memory _position, uint256 cityId) public {
        require(GameLib._inBound(_position), "CURIO: Out of bound");
        require(GameLib._getTileAt(_position) == 0, "CURIO: Territory overlaps with another city");
        GameLib._initializeTile(_position);

        uint256 _tile = ECSLib._addEntity();
        ECSLib._setString("Tag", _tile, "Tile");
        ECSLib._setPosition("Position", _tile, _position);
        ECSLib._setUint("City", _tile, cityId);
    }
}
