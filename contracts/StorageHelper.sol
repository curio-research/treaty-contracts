//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./GameTypes.sol";

// some functions need to be stored in a library because functions in contracts cannot take in structs
library GameStorageHelper {
    // THIS IS COPIED FROM DARKFOREST
    function s() public pure returns (GameTypes.GameStorage storage ret) {
        bytes32 position = bytes32(uint256(1));
        assembly {
            ret.slot := position
        }
    }

    // item
    function addItem(
        GameTypes.ItemData memory _item,
        uint256[] memory _craftItemIds,
        uint256[] memory _craftItemAmounts
    ) public {
        uint256 _itemNonce = s().itemNonce;
        s().items[_itemNonce] = _item;

        if (_craftItemIds.length != _craftItemAmounts.length)
            revert("helper/uneven-material-length");

        for (uint256 i = 0; i < _craftItemIds.length; i++) {
            uint256 _craftItemId = _craftItemIds[i];
            s().itemsWithMetadata[_itemNonce].craftItemAmounts[_craftItemId] = _craftItemAmounts[i];
        }

        s().itemNonce += 1;
    }

    function removeItem(uint256 _materialId) public {
        s().items[_materialId].active = false;
    }
}
