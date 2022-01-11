//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./GameTypes.sol";
import "hardhat/console.sol";

/// @title Monolithic game storage
/// @notice for v1 we can store everything in here - both player states and game states. we can think about
/// using diamond proxy upgrade or other microservice architecture

contract GameStorage {
    GameTypes.GameStorage public s;

    function _addItemMaterialAndAmount(
        uint256 _itemId,
        uint256[] memory _materialIds,
        uint256[] memory _amounts
    ) public {
        // assert(_materialIds.length == _amounts.length);

        s.itemMaterials[_itemId] = _materialIds;
        for (uint256 i = 0; i < _materialIds.length; i++) {
            uint256 _materialId = _materialIds[i];
            s.materialAmounts[_itemId][_materialId] = _amounts[i];
        }

        s.itemNonce += 1;
    }

    function _removeItemMaterialAndAmount(uint256 _itemId) public {
        for (uint256 i = 0; i < s.itemMaterials[_itemId].length; i++) {
            uint256 _materialId = s.itemMaterials[_itemId][i];
            s.materialAmounts[_itemId][_materialId] = 0;
        }
        delete s.itemMaterials[_itemId];
    }

    // inventory
    function _increaseItemInInventory(
        address _player,
        uint256 _blockId,
        uint256 _amount
    ) public {
        s.inventory[_player][_blockId] += _amount;
    }

    function _decreaseItemInInventory(
        address _player,
        uint256 _blockId,
        uint256 _amount
    ) public {
        s.inventory[_player][_blockId] -= _amount;
    }

    // check if item is active
    function _isItemActive(uint256 _blockId) public view returns (bool) {
        return s.items[_blockId].active;
    }

    function _isOccupied(uint256 _x, uint256 _y) public view returns (bool) {
        // // check if target coordinate has block
        // if (_blockAtLocation(_x, _y, 1) != 0) return false;

        // check if target coordinate has player
        if (_blockOccupier(_x, _y) == address(0)) return false;

        return true;
    }

    // checks distance between locations and whether player is in map
    function _isValidMove(
        address _player,
        uint256 _x,
        uint256 _y
    ) public view returns (bool) {
        GameTypes.Position memory _position = _playerPosition(_player);

        // check if target coordinate is within map
        bool _inMap = _x < s.WORLD_WIDTH &&
            _y < s.WORLD_HEIGHT &&
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
        GameTypes.Position memory playerPosition = _playerPosition(_player);
        GameTypes.Position memory targetPosition = _playerPosition(_target);

        uint256 lastAttacked = s.lastAttacked[_player];
        if (block.timestamp - lastAttacked <= 5) return false; // must wait 5 seconds till next attack

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

    function _checkLevel(address _player, uint256 _blockId)
        public
        view
        returns (bool)
    {
        return s.players[_player].level >= s.itemLevels[_blockId];
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

    // get block at location (x, y) and z level
    function _blockAtLocation(
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

    // get player position
    function _playerPosition(address _player)
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

    function _setOccupierAtLocation(
        address _player,
        uint256 _x,
        uint256 _y
    ) public {
        s.map[_x][_y].occupier = _player;
    }

    function _getBlockAmountById(address _player, uint256 _blockId)
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

    // mining
    function _mineBlock(
        uint256 _x,
        uint256 _y,
        uint256 _zIdx
    ) public {
        s.map[_x][_y].blocks[_zIdx] = 0; // mine world block
    }

    function _placeBlock(
        uint256 _x,
        uint256 _y,
        uint256 _blockId
    ) public {
        s.map[_x][_y].blocks[1] = _blockId;
    }

    // block transfer
    function _transfer(
        address _recipient,
        uint256 _blockId,
        uint256 _amount
    ) public {
        GameTypes.Position memory _giver = _playerPosition(msg.sender);
        GameTypes.Position memory _target = _playerPosition(_recipient);
        // can only transfer within certain range
        if (!_withinDistance(_giver.x, _giver.y, _target.x, _target.y, 5))
            revert("storage/not-in-range");
        if (_getBlockAmountById(msg.sender, _blockId) < _amount)
            revert("storage/insufficient-block");

        _decreaseItemInInventory(msg.sender, _blockId, _amount);
        _increaseItemInInventory(_recipient, _blockId, _amount);
    }

    function _die(address _player) public {
        s.players[_player].alive = false;

        GameTypes.Position memory _pos = s.players[_player].position;
        s.map[_pos.x][_pos.y].occupier = address(0);
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
        uint256 itemMaterialCount = s.itemMaterials[_itemId].length;
        uint256[] memory _materialAmounts = new uint256[](itemMaterialCount);
        for (uint256 i = 0; i < s.itemMaterials[_itemId].length; i++) {
            uint256 _id = s.itemMaterials[_itemId][i];
            _materialAmounts[i] = s.materialAmounts[_itemId][_id];
        }

        GameTypes.ItemWithMetadata memory ret = GameTypes.ItemWithMetadata({
            materialIds: s.itemMaterials[_itemId],
            materialAmounts: _materialAmounts
        });

        return ret;
    }

    function _getAllPlayerAddresses() public view returns (address[] memory) {
        return s.allPlayers;
    }
}
