// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract MapSet {
    mapping(uint256 => uint256[]) private items;
    mapping(uint256 => mapping(uint256 => uint256)) private itemToIndex;

    function add(uint256 _setKey, uint256 _item) public {
        if (has(_setKey, _item)) return;

        itemToIndex[_setKey][_item] = items[_setKey].length;
        items[_setKey].push(_item);
    }

    function remove(uint256 _setKey, uint256 _item) public {
        if (!has(_setKey, _item)) return;

        // Copy the last item to the given item's index
        items[_setKey][itemToIndex[_setKey][_item]] = items[_setKey][items[_setKey].length - 1];

        // Update the moved item's stored index to the new index
        itemToIndex[_setKey][items[_setKey][itemToIndex[_setKey][_item]]] = itemToIndex[_setKey][_item];

        // Remove the given item's stored index
        delete itemToIndex[_setKey][_item];

        // Remove the last item
        items[_setKey].pop();
    }

    function has(uint256 _setKey, uint256 _item) public view returns (bool) {
        if (items[_setKey].length == 0) return false;
        if (itemToIndex[_setKey][_item] == 0) return items[_setKey][0] == _item;
        return itemToIndex[_setKey][_item] != 0;
    }

    function getItems(uint256 _setKey) public view returns (uint256[] memory) {
        return items[_setKey];
    }

    function size(uint256 _setKey) public view returns (uint256) {
        return items[_setKey].length;
    }
}
