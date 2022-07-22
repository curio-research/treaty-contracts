// set of integers
// can use in set of components

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

// Prototyping a tagging system ...

contract CurioOS {
    // intersection function

    uint256 public componentID;
    mapping(uint256 => Set) public components;

    function addComponent() public {
        Set newComponent = new Set();
        components[componentID] = newComponent;

        componentID++;
    }

    function addEntityToComponent(uint256 _entityID, uint256 _componentID) public {
        Set component = components[_componentID];

        component.add(_entityID);
    }

    function addEntity() public {}

    // helper variable when using intersection ...
    // mapping(uint256 => bool) private searchedItems; // componentID => has Searched ?

    function intersection(uint256 componentID1, uint256 componentID2) public returns (uint256[] memory) {
        Set set1 = components[componentID1];
        Set set2 = components[componentID2];

        Set searchedItems = new Set();

        // first initiate an array with a crazy size then copy to right size?

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

    function upgradeShip() public {
        // get all component IDs with ships
    }
}
