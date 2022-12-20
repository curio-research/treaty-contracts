//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Position} from "contracts/libraries/Types.sol";
import {Strings} from "openzeppelin-contracts/contracts/utils/Strings.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {console} from "forge-std/console.sol";

library Templates {
    function addTile(
        Position memory _startPosition,
        uint256 _terrain,
        address _address
    ) public returns (uint256) {
        uint256 tileID = ECSLib.addEntity();

        ECSLib.setString("Tag", tileID, "Tile");
        ECSLib.setBool("CanBattle", tileID);
        ECSLib.setPosition("StartPosition", tileID, _startPosition);
        ECSLib.setUint("Level", tileID, 1);
        ECSLib.setUint("Terrain", tileID, _terrain);
        ECSLib.setUint("LastUpgraded", tileID, 0);
        ECSLib.setUint("LastRecovered", tileID, 0);
        ECSLib.setUint("Nation", tileID, 0);
        ECSLib.setAddress("Address", tileID, _address);

        return tileID;
    }

    function addCapital(
        Position memory _tilePosition,
        Position memory _position,
        uint256 _nationID,
        address _address
    ) public returns (uint256) {
        uint256 capitalID = ECSLib.addEntity();

        ECSLib.setString("Tag", capitalID, "Building");
        ECSLib.setBool("CanHoldTokens", capitalID);
        ECSLib.setPosition("StartPosition", capitalID, _tilePosition);
        ECSLib.setPosition("Position", capitalID, _position);
        ECSLib.setString("BuildingType", capitalID, "Capital");
        ECSLib.setBool("CanProduce", capitalID);
        ECSLib.setUint("InitTimestamp", capitalID, block.timestamp);
        ECSLib.setUint("LastMoved", capitalID, block.timestamp);
        ECSLib.setUint("LastSacked", capitalID, 0);
        ECSLib.setUint("LastUpgraded", capitalID, 0);
        ECSLib.setUint("LastHarvested", capitalID, 0);
        ECSLib.setUint("Nation", capitalID, _nationID);
        ECSLib.setUint("Level", capitalID, 1);
        ECSLib.setAddress("Address", capitalID, _address);

        return capitalID;
    }

    function addResource(uint256 _templateID, Position memory _startPosition) public returns (uint256) {
        uint256 resourceID = ECSLib.addEntity();

        ECSLib.setString("Tag", resourceID, "Resource");
        ECSLib.setUint("Template", resourceID, _templateID);
        ECSLib.setUint("Level", resourceID, 0); // initialize at zero is equivalent to not having a gold mine "built"
        ECSLib.setPosition("StartPosition", resourceID, _startPosition);
        ECSLib.setUint("LastHarvested", resourceID, block.timestamp);
        ECSLib.setUint("LastUpgraded", resourceID, 0);
        ECSLib.setUint("Load", resourceID, 0);
        ECSLib.setUint("Nation", resourceID, 0);

        return resourceID;
    }

    function addNation(string memory _name, address _address) public returns (uint256) {
        uint256 nationID = ECSLib.addEntity();

        ECSLib.setString("Tag", nationID, "Nation");
        ECSLib.setBool("IsActive", nationID);
        ECSLib.setString("Name", nationID, _name);
        ECSLib.setUint("InitTimestamp", nationID, block.timestamp);
        ECSLib.setAddress("Address", nationID, _address);

        return nationID;
    }

    function addArmy(
        uint256 _speed,
        uint256 _moveCooldown,
        uint256 _battleCooldown,
        uint256 _attackRange,
        uint256 _nationID,
        Position memory _position,
        Position memory _startPosition,
        address _address
    ) public returns (uint256) {
        uint256 armyID = ECSLib.addEntity();

        ECSLib.setString("Tag", armyID, "Army");
        ECSLib.setBool("CanHoldTokens", armyID);
        ECSLib.setUint("Speed", armyID, _speed);
        ECSLib.setUint("LastMoved", armyID, block.timestamp);
        ECSLib.setUint("LastAttacked", armyID, block.timestamp);
        ECSLib.setUint("MoveCooldown", armyID, _moveCooldown);
        ECSLib.setUint("BattleCooldown", armyID, _battleCooldown);
        ECSLib.setUint("AttackRange", armyID, _attackRange);
        ECSLib.setUint("Nation", armyID, _nationID);
        ECSLib.setAddress("Address", armyID, _address);
        ECSLib.setBool("CanBattle", armyID);
        ECSLib.setPosition("Position", armyID, _position);
        ECSLib.setPosition("StartPosition", armyID, _startPosition);

        return armyID;
    }

    function addTroopProduction(
        uint256 _buildingID,
        uint256 _templateID,
        uint256 _amount,
        uint256 _duration
    ) public returns (uint256) {
        uint256 productionID = ECSLib.addEntity();

        ECSLib.setString("Tag", productionID, "TroopProduction");
        ECSLib.setUint("Keeper", productionID, _buildingID);
        ECSLib.setUint("Template", productionID, _templateID);
        ECSLib.setUint("Amount", productionID, _amount);
        ECSLib.setUint("InitTimestamp", productionID, block.timestamp);
        ECSLib.setUint("Duration", productionID, _duration);

        return productionID;
    }

    function addResourceGather(
        Position memory _position,
        uint256 _resourceTemplateID,
        uint256 _armyID
    ) public returns (uint256) {
        uint256 gatherID = ECSLib.addEntity();

        ECSLib.setString("Tag", gatherID, "ResourceGather");
        ECSLib.setPosition("Position", gatherID, _position);
        ECSLib.setUint("Template", gatherID, ECSLib.getUint("Template", _resourceTemplateID));
        ECSLib.setUint("InitTimestamp", gatherID, block.timestamp);
        ECSLib.setUint("Army", gatherID, _armyID);

        return gatherID;
    }

    function addInventory(uint256 _keeperID, uint256 _templateID) public returns (uint256) {
        uint256 inventoryID = ECSLib.addEntity();

        ECSLib.setString("Tag", inventoryID, "Inventory");
        ECSLib.setUint("Keeper", inventoryID, _keeperID);
        ECSLib.setUint("Template", inventoryID, _templateID);
        ECSLib.setUint("Amount", inventoryID, 0);

        return inventoryID;
    }

    function addTroopTemplate(
        string memory _name,
        uint256 _health,
        uint256 _attack,
        uint256 _defense,
        uint256 _load,
        address _tokenContract
    ) public returns (uint256) {
        uint256 templateID = ECSLib.addEntity();

        ECSLib.setString("Tag", templateID, "TroopTemplate");
        ECSLib.setString("Name", templateID, _name);
        ECSLib.setUint("Health", templateID, _health);
        ECSLib.setUint("Attack", templateID, _attack);
        ECSLib.setUint("Defense", templateID, _defense);
        ECSLib.setUint("Load", templateID, _load);
        ECSLib.setAddress("Address", templateID, _tokenContract);

        return templateID;
    }

    function addResourceTemplate(string memory _name, address _tokenContract) public returns (uint256) {
        uint256 templateID = ECSLib.addEntity();

        ECSLib.setString("Tag", templateID, "ResourceTemplate");
        ECSLib.setString("Name", templateID, _name);
        ECSLib.setAddress("Address", templateID, _tokenContract);

        return templateID;
    }

    function addGameParameter(string memory _identifier, uint256 _value) public returns (uint256) {
        uint256 paramID = ECSLib.addEntity();

        ECSLib.setString("Tag", paramID, _identifier);
        ECSLib.setUint("Amount", paramID, _value);

        return paramID;
    }

    function addSignature(uint256 _treatyID, uint256 _nationID) public returns (uint256) {
        uint256 signatureID = ECSLib.addEntity();

        ECSLib.setString("Tag", signatureID, "Signature");
        ECSLib.setUint("Treaty", signatureID, _treatyID);
        ECSLib.setUint("Nation", signatureID, _nationID);
        ECSLib.setUint("InitTimestamp", signatureID, block.timestamp);

        return signatureID;
    }

    function addTreaty(
        address _address,
        string memory _name,
        string memory _description,
        string memory _abiHash
    ) public returns (uint256) {
        uint256 treatyID = ECSLib.addEntity();

        ECSLib.setString("Tag", treatyID, "Treaty");
        ECSLib.setBool("CanHoldTokens", treatyID);
        ECSLib.setUint("InitTimestamp", treatyID, block.timestamp);
        ECSLib.setString("Name", treatyID, _name);
        ECSLib.setString("Description", treatyID, _description);
        ECSLib.setString("ABIHash", treatyID, _abiHash);
        ECSLib.setAddress("Address", treatyID, _address);

        return treatyID;
    }

    function addDelegation(
        string memory _functionName,
        uint256 _ownerID, // original delegator
        uint256 _callerID,
        uint256 _subjectID
    ) public returns (uint256) {
        uint256 delegationID = ECSLib.addEntity();

        ECSLib.setString("Tag", delegationID, "Delegation");
        ECSLib.setString("FunctionName", delegationID, _functionName);
        ECSLib.setUint("Owner", delegationID, _ownerID);
        ECSLib.setUint("Caller", delegationID, _callerID);
        ECSLib.setUint("Subject", delegationID, _subjectID);

        return delegationID;
    }
}
