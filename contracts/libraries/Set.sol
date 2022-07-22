// ----------------------------
// tagging system
// ----------------------------

contract Set {
    uint256[] public items;
    mapping(uint256 => bool) public itemMapping;

    function add(uint256 _val) public {
        if (itemMapping[_val]) return; // check if it exists
        items.push(_val);
        itemMapping[_val] = true;
    }

    function remove(uint256 _val) public {
        if (!itemMapping[_val]) return; // check if value exists
        if (items.length == 0) return;

        // find idx of item // should be more efficient prob ...

        uint256 idx;
        for (uint256 i = 0; i < items.length; i++) {
            if (_val == items[i]) {
                idx = i;
            }
        }

        // swap the item with the last item
        uint256 lastItemIdx = items.length - 1;
        uint256 lastItem = items[lastItemIdx];
        items[idx] = lastItem;

        itemMapping[_val] = false; // remove existance

        // // pop the last item
        items.pop();
    }

    function size() public view returns (uint256) {
        return items.length;
    }

    function includes(uint256 _item) public view returns (bool) {
        return itemMapping[_item] == true;
    }
}

// ----------------------------
// tagging system
// ----------------------------

contract CurioOS {
    uint256 public componentID;
    mapping(uint256 => Set) public components;
    mapping(string => uint256) public componentName; // name => uint256 // do we need component names ?

    uint256 public entityID;
    mapping(uint256 => bool) public entities; // we can start with TroopIDs

    function addComponent(string memory _name) public returns (uint256) {
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
            uint256 _item = set1.items(i);

            // check if the item is in the secone set
            if (!searchedItems.includes(_item)) {
                if (set2.includes(_item)) {
                    temp[itemCount] = _item;
                    itemCount++;
                }
            }

            searchedItems.add(_item);
        }

        // loop through second set

        for (uint256 i = 0; i < set2.size(); i++) {
            uint256 _item = set2.items(i);

            // check if the item is in the first set
            if (!searchedItems.includes(_item)) {
                if (set1.includes(_item)) {
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
            // apply updates to each troop
            // ideally this should be variable too?
        }
    }
}
