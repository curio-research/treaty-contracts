//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./GameTypes.sol";
import "hardhat/console.sol";

/// @title Monolithic game storage
/// @notice for v1 we can store everything in here - both player states and game states. we can think about
/// using diamond proxy upgrade or other microservice architecture

contract GameStorage {
    using SafeMath for uint256;
    GameTypes.GameStorage public s;

    function _getPositionFromIndex(uint256 k)
        public
        view
        returns (GameTypes.Position memory)
    {
        (bool _xValid, uint256 _x) = SafeMath.tryDiv(k, s.worldHeight);
        (bool _yValid, uint256 _y) = SafeMath.tryMod(k, s.worldHeight);

        if (!_xValid || !_yValid) revert("SafeMath/invalid-division");

        return GameTypes.Position(_x, _y);
    }

    // due to gas limitations we need to fetch the map in 10x10 chunks and piece them together
    // on the frontend
    function _getMap(uint256 _x, uint256 _y)
        public
        view
        returns (GameTypes.TileWithMetadata[] memory)
    {
        GameTypes.TileWithMetadata[]
            memory ret = new GameTypes.TileWithMetadata[](100);
        uint256 nonce = 0;
        for (uint256 x = _x; x < _x + 10; x++) {
            for (uint256 y = _y; y < _y + 10; y++) {
                ret[nonce] = GameTypes.TileWithMetadata({
                    occupier: s.map[x][y].occupier,
                    blocks: s.map[x][y].blocks,
                    x: x,
                    y: y
                });
                nonce += 1;
            }
        }
        return ret;
    }

    function _getWorldSize() public view returns (uint256, uint256) {
        console.log("in _getWorldSize!");
        return (s.worldWidth, s.worldHeight);
    }

    function _addCraftItemAndAmount(
        uint256 _itemId,
        uint256[] memory _craftItemIds,
        uint256[] memory _craftItemAmounts
    ) public {
        if (_craftItemIds.length != _craftItemAmounts.length)
            revert("engine/invalid-craft-item-amounts");

        s.itemsWithMetadata[_itemId].craftable = true;
        s.itemsWithMetadata[_itemId].craftItemIds = _craftItemIds;
        s.itemsWithMetadata[_itemId].craftItemAmounts = _craftItemAmounts;

        s.itemNonce += 1;
    }

    function _removeCraftItemAndAmount(uint256 _itemId) public {
        s.itemsWithMetadata[_itemId].craftable = false;
        delete s.itemsWithMetadata[_itemId].craftItemIds;
        delete s.itemsWithMetadata[_itemId].craftItemAmounts;
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

    function _getTopBlockAtPosition(uint256 _x, uint256 _y)
        public
        view
        returns (uint256)
    {
        uint256 _blockCount = _getBlockCountAtPosition(_x, _y);
        return s.map[_x][_y].blocks[_blockCount - 1];
    }

    function _isOccupied(uint256 _x, uint256 _y) public view returns (bool) {
        // check if target coordinate has player
        if (_blockOccupier(_x, _y) != address(0)) return true;

        // check if top block at target position is occupiable
        uint256 _blockId = _getTopBlockAtPosition(_x, _y);
        bool _occupiable = s.itemsWithMetadata[_blockId].occupiable;
        if (!_occupiable) return true;

        return false;
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

        // check if target coordinate has block or player
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
        if (_zIdx >= s.map[_x][_y].blocks.length)
            revert("engine/invalid-z-index");

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

    function _getBlockCountAtPosition(uint256 _x, uint256 _y)
        public
        view
        returns (uint256)
    {
        return s.map[_x][_y].blocks.length;
    }

    function _mine(uint256 _x, uint256 _y) public {
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
        GameTypes.Position memory _recipientLoc = _getPlayerPosition(
            _recipient
        );
        // can only transfer within certain range
        if (
            !_withinDistance(
                _giverLoc.x,
                _giverLoc.y,
                _recipientLoc.x,
                _recipientLoc.y,
                5
            )
        ) revert("storage/not-in-range");
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
        return s.itemsWithMetadata[_itemId];
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
            ret[i] = s.inventory[_player][_itemId];
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
