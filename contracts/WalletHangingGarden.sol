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
    address gameFacetAddress;
    address goldTokenAddress;
    address[] public owners;
    address[] public myHomies;
    uint256 homieFee;

    mapping(address => bool) public isOwner;
    mapping(address => bool) public isHomie;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "You do not have access to this wallet");
        _;
    }

    constructor(address[] memory _owners, address _gameFacetAddress, address _goldTokenAddress, uint256 _homieFee) {
        require(_owners.length > 0, "Wallet owners required");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "Invalid wallet owner");
            require(!isOwner[owner], "Wallet owner not unique");

            isOwner[owner] = true;
            owners.push(owner);

            isHomie[owner] = true;
            owners.push(owner);
        }

        gameFacetAddress = _gameFacetAddress;
        goldTokenAddress = _goldTokenAddress;
        homieFee = _homieFee;
    }

    function executeGameTX(bytes memory _data) public onlyOwner {
        // fixme: low-level call checker modified to "warn"; integrate with interface
        (bool success, bytes memory returndata) = gameFacetAddress.call(_data);
        require(success, string(returndata));
    }

    function executeTX(address _contractAddress, bytes memory _data) public onlyOwner {
        (bool success, bytes memory returndata) = _contractAddress.call(_data);
        require(success, string(returndata));
    }

    // ----------------------------------------------------------
    //                          Poicy
    // ----------------------------------------------------------
    
    function inquireHomieFee() public view returns (uint256) {
        return homieFee;
    }

    function becomeAHomie(address _armyAddress) public returns (bool) {
        // note: msg.sender can be from anyone
        // note: msg.sender need to first approve homie fee spending
        (bool success, ) = goldTokenAddress.call(abi.encodeWithSignature("transferFrom(address,address,uint256)", msg.sender, address(this), homieFee));
        require(success, "Fail to pay homie fee!");
        isHomie[_armyAddress] = true;
        owners.push(_armyAddress);
        return true;
    }

    function approveHomiesEntering(address _armyAddress) public view returns (bool) {
        return isHomie[_armyAddress];
    }
}
