// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Position} from "contracts/libraries/Types.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";
import "forge-std/console.sol";

// interface GameFacetInterface {
//     // function callable by army / city wallet
//     function move(uint256 _movableEntity, Position memory _targetPosition) external;
//     function foundCity(uint256 _settlerID, Position[] memory _tiles, string memory _cityName) external;
//     function recoverTile(uint256 _tileID) external;
//     function upgradeTile(uint256 _tileID) external;
//     function upgradeCityCenter(uint256 _buildingID) external;
//     function moveCityCenter(uint256 _buildingID, Position memory _newTilePosition) external;
//     function disownTile(uint256 _tileID) external;
//     function startTroopProduction(uint256 _buildingID, uint256 _templateID, uint256 _amount) external;
//     function startGather(uint256 _armyID, uint256 _resourceID) external;
//     function endGather(uint256 _armyID) external;
//     function unloadResources(uint256 _armyID) external;
//     function harvestResources(uint256[] memory resourceIds) external;
//     function organizeArmy(uint256 _cityID, uint256[] memory _templateIDs, uint256[] memory _amounts) external;
//     function disbandArmy(uint256 _armyID) external;
//     function battle(uint256 _armyID, uint256 _targetID) external;
//     function endTroopProduction(uint256 _buildingID, uint256 _productionID) public;
//     function harvestResource(uint256 _resourceID) public;
//     function harvestResourcesFromCity(uint256 _buildingID) public;
//     function claimTile(uint256 _armyID, uint256 _tileID) public;
//     function upgradeResource(uint256 _resourceID) public;
// }

// note: this is a minimalistic implementation of smart contract wallet
contract WalletHangingGarden {
    address gameFacetAdress;
    address[] public owners;
    mapping(address => bool) public isOwner;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    constructor(address[] memory _owners, address _gameFacetAdress) {
        require(_owners.length > 0, "owners required");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        gameFacetAdress = _gameFacetAdress;
    }

    function executeTransaction(bytes memory _data) public onlyOwner {
        // fixme: low-level call checker modified to "warn"; integrate with interface
        (bool success, bytes memory returndata) = gameFacetAdress.call(_data);
        require(success, string (returndata));
    }
}
