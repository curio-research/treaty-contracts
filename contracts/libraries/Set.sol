// set of integers
// can use in set of components

contract Set {
    uint256[] public items;
    mapping(uint256 => bool) public itemMapping;

    function add(uint256 _val) public {
        if (itemMapping[_val]) return; // check if it exists
        itemMapping[_val] = true;
    }

    function remove(uint256 _val) public {
        if (!itemMapping[_val]) return; // check if it exists first

        // find idx of item

        uint256 idx;
        for (uint256 i = 0; i < items.length; i++) {
            if (_val == items[i]) {
                idx = i;
            }
        }

        delete items[idx];
        itemMapping[_val] = false; // remove existance

        // get the last item and move it over to fill the gap
        uint256 lastItemIdx = items.length - 1;
        uint256 lastItem = items[lastItemIdx];
        items[idx] = lastItem;

        delete items[lastItemIdx];
    }

    function size() public returns (uint256) {
        return items.length;
    }
}

contract System {
    // intersection function

    uint256 componentID;
    mapping(uint256 => Set) components;

    constructor() {
        addComponent(); // 0: ships
        addComponent(); // 1: in port
    }

    function addComponent() public {
        Set newComponent = new Set();
        components[componentID] = newComponent;

        componentID++;
    }

    // helper variable when using intersection ...
    mapping(uint256 => bool) private hasSearched; // componentID => has Searched ?

    function intersection(uint256 componentID1, uint256 componentID2) public returns (uint256[] memory) {
        Set set1 = components[componentID1];
        Set set2 = components[componentID2];

        // first initiate an array with a crazy size then copy to right size?

        uint256[] memory temp = new uint256[](1000);
        uint256 itemCount = 0;

        // loop through first set
        for (uint256 i = 0; i < set1.size(); i++) {
            uint256 _item = set1.items(i);

            // check if the item is in the secone set
            if (set2.itemMapping(_item)) {
                temp[itemCount] = _item;
                itemCount++;
            }

            hasSearched[_item] = true;
        }

        // loop through second set

        for (uint256 i = 0; i < set2.size(); i++) {
            uint256 _item = set2.items(i);

            // check if the item is in the first set
            if (set1.itemMapping(_item)) {
                temp[itemCount] = _item;
                itemCount++;
            }

            hasSearched[_item] = true;
        }

        // copy the large size  array to this appropriate one
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
