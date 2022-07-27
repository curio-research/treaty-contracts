//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Set} from "contracts/Set.sol";

contract CurioOS {
    uint256 public componentID;
    mapping(uint256 => Set) public components;
    mapping(string => uint256) public componentName;

    uint256 public entityID;

    function addComponent(string memory _name) public returns (uint256) {
        require(componentName[_name] == 0, "Component with same name exists");

        componentID++;
        Set newComponent = new Set();
        components[componentID] = newComponent;
        componentName[_name] = componentID;

        return componentID;
    }

    function addEntityToComponent(uint256 _entityID, uint256 _componentID) public {
        Set component = components[_componentID];

        component.add(_entityID);
    }

    function addEntityToComponentByName(uint256 _entityID, string memory _componentName) public {
        uint256 _componentID = componentName[_componentName];
        Set component = components[_componentID];

        component.add(_entityID);
    }

    function removeEntityFromComponent(uint256 _entityID, uint256 _componentID) public {
        Set component = components[_componentID];

        component.remove(_entityID);
    }

    function addEntity() public {}

    // find the intersection of component sets!

    function intersection(uint256 componentID1, uint256 componentID2) public returns (uint256[] memory) {
        // make sure two components are registered and valid
        if (componentID1 > componentID || componentID2 > componentID) {
            uint256[] memory _temp = new uint256[](0);
            return _temp;
        }

        Set set1 = components[componentID1];
        Set set2 = components[componentID2];

        Set searchedItems = new Set();

        // first initiate an array with a crazy size then copy to right size lol
        // the max size of the sum of the two sets is the sum of the two raw sets themselves
        uint256[] memory temp = new uint256[](set1.size() + set2.size());
        uint256 itemCount = 0;

        // loop through first set
        for (uint256 i = 0; i < set1.size(); i++) {
            uint256 _item = set1.getItems()[i];

            // check if the item is in the secone set
            if (!searchedItems.has(_item)) {
                if (set2.has(_item)) {
                    temp[itemCount] = _item;
                    itemCount++;
                }
            }

            searchedItems.add(_item);
        }

        // loop through second set

        for (uint256 i = 0; i < set2.size(); i++) {
            uint256 _item = set2.getItems()[i];

            // check if the item is in the first set
            if (!searchedItems.has(_item)) {
                if (set1.has(_item)) {
                    temp[itemCount] = _item;
                    itemCount++;
                }
            }

            searchedItems.add(_item);
        }

        // copy the unknown size array to the calculated one
        uint256[] memory res = new uint256[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            res[i] = temp[i];
        }
        return res;
    }

    // definitino of difference: set of all elements of A that are not elements of B
    // example: i want all ships that are NOT in a port

    function difference(uint256 componentID1, uint256 componentID2) public view returns (uint256[] memory) {
        Set set1 = components[componentID1];
        Set set2 = components[componentID2];

        uint256[] memory temp = new uint256[](set1.size());
        uint256 itemCount = 0;

        // loop through first set
        for (uint256 i = 0; i < set1.size(); i++) {
            uint256 _item = set1.getItems()[i];

            // check if the item is in the secone set

            if (!set2.has(_item)) {
                temp[itemCount] = _item;
                itemCount++;
            }
        }

        uint256[] memory res = new uint256[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            res[i] = temp[i];
        }
        return res;
    }

    function union(uint256 componentID1, uint256 componentID2) public view returns (uint256[] memory) {
        // TODO: implement
    }

    //////////////////////////////////////////////////////////////////////

    function moveInBay(uint256 _shipID) public {
        // create new component called "Sharpness"

        // sharpness is component # 0
        // assume shipID = entityID

        Set sharpnessComponent = components[0];
        sharpnessComponent.add(_shipID);
    }

    function upgradeShips() public {
        // Set sharpnessComponent = components[0];

        // get all entityIDs with sharpenss aka component 0
        uint256[] memory troopIDsWithSharpness = intersection(0, 0);

        // Now you only loop over relevant troopIDs, as opposed to all troop IDs!
        for (uint256 i = 0; i < troopIDsWithSharpness.length; i++) {
            // apply updates to each troop ...
            // ideally this should be variable too?
        }

        // get everything with health
        // loop through, check

        // component Health {

        // }

        // i need to get the health of entityID 1
    }
}
