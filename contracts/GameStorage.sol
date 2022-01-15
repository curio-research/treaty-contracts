//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./GameTypes.sol";
import "hardhat/console.sol";

/// @title Monolithic game storage
/// @notice for v1 we can store everything in here - both player states and game states. we can think about
/// using diamond proxy upgrade or other microservice architecture

contract GameStorage {
    GameTypes.GameStorage public s;

    function _getPositionFromIndex(
        uint256 k
    ) view public returns (GameTypes.Position memory) {
        return GameTypes.Position(k / s.worldHeight, k % s.worldHeight);
    }

    function _addCraftItemAndAmount(
        uint256 _itemId,
        uint256[] memory _craftItemIds,
        uint256[] memory _craftItemAmounts
    ) public {
        // assert(_craftItemIds.length == _amounts.length);

        s.craftItemIds[_itemId] = _craftItemIds;
        for (uint256 i = 0; i < _craftItemIds.length; i++) {
            uint256 _materialId = _craftItemIds[i];
            s.craftItemAmounts[_itemId][_materialId] = _craftItemAmounts[i];
        }

        s.itemNonce += 1;
    }

    function _removeCraftItemAndAmount(uint256 _itemId) public {
        for (uint256 i = 0; i < s.craftItemIds[_itemId].length; i++) {
            uint256 _materialId = s.craftItemIds[_itemId][i];
            s.craftItemAmounts[_itemId][_materialId] = 0;
        }
        delete s.craftItemIds[_itemId];
    }

    function _increaseItemInInventory(
        address _player,
        uint256 _itemId,
        uint256 _amount
    ) public {
        _modifyItemInInventoryNonce(_itemId, true);
        s.inventory[_player][_itemId] += _amount;
    }

    function _decreaseItemInInventory(
        address _player,
        uint256 _itemId,
        uint256 _amount
    ) public {
        _modifyItemInInventoryNonce(_itemId, false);
        s.inventory[_player][_itemId] -= _amount;
    }

    function _isItemActive(uint256 _itemId) public view returns (bool) {
        return s.items[_itemId].active;
    }

    function _getTopBlockAtPosition(uint256 _x, uint256 _y) public view returns (uint256) {
        uint256 _blockCount = _getBlockCountAtPosition(_x, _y);
        return s.map[_x][_y].blocks[_blockCount-1];
    }

    function _isOccupied(uint256 _x, uint256 _y) public view returns (bool) {
        // check if target coordinate has player
        if (_blockOccupier(_x, _y) == address(0)) return false;

        // check if top block at target position is occupiable
        uint256 _blockId = _getTopBlockAtPosition(_x, _y);
        bool _occupiable = s.occupiable[_blockId];
        if (!_occupiable) return false;

        return true;
    }

    // checks distance between positions and whether player is in map
    function _isValidMove(
        address _player,
        uint256 _x,
        uint256 _y
    ) public view returns (bool) {
        GameTypes.Position memory _position = _getPlayerPosition(_player);

        // check if target coordinate is within map
        bool _inMap = _x < s.worldWidth &&
            _y < s.worldHeight &&
            _x >= 0 &&
            _y >= 0;

        if (!_inMap) return false;

        // check coordinate x and y differences
        if (!_withinDistance(_x, _y, _position.x, _position.y, s.moveRange))
            return false;

        // check if target coordinate has block
        if (_isOccupied(_x, _y)) return false;

        return true;
    }

    function _isValidAttack(address _player, address _target)
        public
        view
        returns (bool)
    {
        GameTypes.Position memory playerPosition = _getPlayerPosition(_player);
        GameTypes.Position memory targetPosition = _getPlayerPosition(_target);

        uint256 lastAttackedAt = s.lastAttackedAt[_player];
        if (block.timestamp - lastAttackedAt <= s.attackWaitTime) return false; // must wait 5 seconds till next attack

        if (
            !_withinDistance(
                playerPosition.x,
                playerPosition.y,
                targetPosition.x,
                targetPosition.y,
                s.attackRange
            )
        ) return false;

        return true;
    }

    function _withinDistance(
        uint256 _x1,
        uint256 _y1,
        uint256 _x2,
        uint256 _y2,
        uint256 _dist
    ) public pure returns (bool) {
        uint256 _xDist = _x1 >= _x2 ? _x1 - _x2 : _x2 - _x1;
        uint256 _yDist = _y1 >= _y2 ? _y1 - _y2 : _y2 - _y1;
        bool _inDistance = _xDist <= _dist && _yDist <= _dist;
        return _inDistance;
    }

    function _getBlockAtPosition(
        uint256 _x,
        uint256 _y,
        uint256 _zIdx
    ) public view returns (uint256) {
        return s.map[_x][_y].blocks[_zIdx];
    }

    // get the player's address who's occupying a block
    function _blockOccupier(uint256 _x, uint256 _y)
        public
        view
        returns (address)
    {
        return s.map[_x][_y].occupier;
    }

    function _getPlayerPosition(address _player)
        public
        view
        returns (GameTypes.Position memory)
    {
        return s.players[_player].position;
    }

    function _setPlayerPosition(
        address _player,
        uint256 _x,
        uint256 _y
    ) public {
        s.players[_player].position.x = _x;
        s.players[_player].position.y = _y;
    }

    function _setOccupierAtPosition(
        address _player,
        uint256 _x,
        uint256 _y
    ) public {
        s.map[_x][_y].occupier = _player;
    }

    function _getItemAmountById(address _player, uint256 _blockId)
        public
        view
        returns (uint256)
    {
        return s.inventory[_player][_blockId];
    }

    // player stats
    function _increaseEnergy(address _player, uint256 _amount) public {
        s.players[_player].energy += _amount;
    }

    function _decreaseEnergy(address _player, uint256 _amount) public {
        s.players[_player].energy -= _amount;
    }

    function _increaseHealth(address _player, uint256 _amount) public {
        s.players[_player].health += _amount;
    }

    function _decreaseHealth(address _player, uint256 _amount) public {
        s.players[_player].health -= _amount;
    }

    function _getBlockCountAtPosition(
        uint256 _x,
        uint256 _y
    ) view public returns (uint256) {
        return s.map[_x][_y].blocks.length;
    }

    function _mine(
        uint256 _x,
        uint256 _y
    ) public {
        s.map[_x][_y].blocks.pop();
    }

    function _place(
        uint256 _x,
        uint256 _y,
        uint256 _itemId
    ) public {
        s.map[_x][_y].blocks.push(_itemId);
    }

    function _transfer(
        address _recipient,
        uint256 _itemId,
        uint256 _amount
    ) public {
        GameTypes.Position memory _giverLoc = _getPlayerPosition(msg.sender);
        GameTypes.Position memory _recipientLoc = _getPlayerPosition(_recipient);
        // can only transfer within certain range
        if (!_withinDistance(_giverLoc.x, _giverLoc.y, _recipientLoc.x, _recipientLoc.y, 5))
            revert("storage/not-in-range");
        if (_getItemAmountById(msg.sender, _itemId) < _amount)
            revert("storage/insufficient-block");

        _decreaseItemInInventory(msg.sender, _itemId, _amount);
        _increaseItemInInventory(_recipient, _itemId, _amount);
    }

    function _die(address _player) public {
        s.players[_player].alive = false;

        GameTypes.Position memory _pos = s.players[_player].position;
        delete s.map[_pos.x][_pos.y].occupier;
    }

    // fetch single player data
    function _getAllPlayerData(address _player)
        public
        view
        returns (GameTypes.PlayerData memory playerData)
    {
        return s.players[_player];
    }

    function _getItemNonce() public view returns (uint256) {
        return s.itemNonce;
    }

    // get data about a single item
    function _getItemWithMetadata(uint256 _itemId)
        public
        view
        returns (GameTypes.ItemWithMetadata memory)
    {
        // unfold double mappings into arrays for craft item amounts
        uint256 craftItemCount = s.craftItemIds[_itemId].length;
        uint256[] memory _craftItemAmounts = new uint256[](craftItemCount);
        for (uint256 i = 0; i < craftItemCount; i++) {
            uint256 _id = s.craftItemIds[_itemId][i];
            _craftItemAmounts[i] = s.craftItemAmounts[_itemId][_id];
        }

        // unfold double mappings into arrays for protect item healths
        uint256 protectItemCount = s.protectItemIds[_itemId].length;
        uint256[] memory _protectItemHealths = new uint256[](craftItemCount);
        for (uint256 i = 0; i < protectItemCount; i++) {
            uint256 _id = s.protectItemIds[_itemId][i];
            _protectItemHealths[i] = s.protectItemHealths[_itemId][_id];
        }

        GameTypes.ItemWithMetadata memory ret = GameTypes.ItemWithMetadata({
            mineable: s.mineable[_itemId],
            mineItemId: s.mineItemId[_itemId],
            strength: s.strength[_itemId],
            craftable: s.craftable[_itemId],
            craftItemIds: s.craftItemIds[_itemId],
            craftItemAmounts: _craftItemAmounts,
            placeItemIds: s.placeItemIds[_itemId],
            occupiable: s.occupiable[_itemId],
            energyDamage: s.energyDamage[_itemId],
            healthDamage: s.healthDamage[_itemId],
            protectItemIds: s.protectItemIds[_itemId],
            protectItemHealths: _protectItemHealths
        });

        return ret;
    }

    // dir = true means to add item (if it doesn't exist);
    function _modifyItemInInventoryNonce(uint256 _itemId, bool dir) public {
        uint256 idx = 0;
        bool hasFound = false;

        for (uint256 i = 0; i < s.inventoryNonce[msg.sender].length; i++) {
            if (s.inventoryNonce[msg.sender][i] == _itemId) {
                idx = i;
                hasFound = true;
            }
        }
        // remove case
        if (!dir) {
            if (hasFound) {
                delete s.inventoryNonce[msg.sender][idx];
            }
        } else if (dir) {
            if (!hasFound) {
                s.inventoryNonce[msg.sender].push(_itemId);
            }
        }
    }

    // fetch player inventory
    function _getInventoryByPlayer(address _player)
        public
        view
        returns (GameTypes.Recipe memory)
    {
        uint256 itemCount = s.inventoryNonce[_player].length;
        uint256[] memory ret = new uint256[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 _itemId = s.inventoryNonce[_player][i];
            ret[0] = s.inventory[_player][_itemId];
        }

        return
            GameTypes.Recipe({
                craftItemIds: s.inventoryNonce[_player],
                craftItemAmounts: ret
            });
    }

    function _getAllPlayerAddresses() public view returns (address[] memory) {
        return s.allPlayers;
    }
}
