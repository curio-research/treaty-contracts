//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Set {
    uint256[] private items;
    mapping(uint256 => uint256) private itemToIndex;

    // need item => value mapping
    // example: item => Position. Should store as struct or bytes?

    function addArray(uint256[] memory _items) public {
        for (uint256 i = 0; i < _items.length; i++) {
            add(_items[i]);
        }
    }

    function add(uint256 _item) public {
        if (has(_item)) return;

        itemToIndex[_item] = items.length;
        items.push(_item);
    }

    function remove(uint256 _item) public {
        if (!has(_item)) return;

        // Copy the last item to the given item's index
        items[itemToIndex[_item]] = items[items.length - 1];

        // Update the moved item's stored index to the new index
        itemToIndex[items[itemToIndex[_item]]] = itemToIndex[_item];

        // Remove the given item's stored index
        delete itemToIndex[_item];

        // Remove the last item
        items.pop();
    }

    function size() public view returns (uint256) {
        return items.length;
    }

    function has(uint256 _item) public view returns (bool) {
        if (items.length == 0) return false;

        // Check needed because null index is also 0, not -1 conventionally
        if (itemToIndex[_item] == 0) return items[0] == _item;
        return itemToIndex[_item] != 0;
    }

    function getItems() public view returns (uint256[] memory) {
        return items;
    }
}
