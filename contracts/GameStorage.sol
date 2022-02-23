//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./GameTypes.sol";
import "./Permissions.sol";

/// @title Monolithic game storage

contract GameStorage {
    using SafeMath for uint256;
    GameTypes.GameStorage public s;
    Permissions private p;

    // ------------------------------------------------------------
    // Modifier
    // ------------------------------------------------------------
    modifier hasPermission() {
        require(p._hasContractPermission(msg.sender));
        _;
    }

    // ------------------------------------------------------------
    // Events
    // ------------------------------------------------------------

    event Transfer(
        address _player,
        address _recipient,
        uint256 _id,
        uint256 _amount
    );

    // ------------------------------------------------------------
    // Initialization
    // ------------------------------------------------------------
    constructor(Permissions _permissions) {
        p = _permissions;
    }

    function _setConstants(
        uint256 _worldWidth,
        uint256 _worldHeight,
        uint256 _attackRange,
        uint256 _attackDamage,
        uint256 _attackWaitTime,
        uint256 _startPlayerHealth,
        uint256 _startPlayerEnergy
    ) public hasPermission {
        s.worldWidth = _worldWidth;
        s.worldHeight = _worldHeight;
        s.itemNonce = 1; // valid blockId start at 1. Id 0 = no blocks
        s.attackRange = _attackRange;
        s.attackDamage = _attackDamage;
        s.attackWaitTime = _attackWaitTime;
        s.startPlayerHealth = _startPlayerHealth;
        s.startPlayerEnergy = _startPlayerEnergy;
    }

    function _setBlocks(
        GameTypes.Position memory _position,
        uint256[] memory _blocks
    ) public hasPermission {
        s.map[_position.x][_position.y].blocks = _blocks;
    }

    function _setItem(uint256 _i, GameTypes.ItemWithMetadata memory _item)
        public
        hasPermission
    {
        s.itemsWithMetadata[_i] = _item;
    }

    function _setPlayer(address _player, GameTypes.Position memory _pos)
        public
        hasPermission
    {
        s.players[_player] = GameTypes.PlayerData({
            initialized: true,
            initTimestamp: block.timestamp,
            playerAddr: _player,
            position: _pos,
            health: s.startPlayerHealth,
            energy: s.startPlayerEnergy,
            reach: 6
        });
        s.allPlayers.push(_player);
    }

    function _incrementNonce() public hasPermission {
        s.itemNonce += 1;
    }

    // refactor this out into player struct
    function _getAttackDamage() public view returns (uint256) {
        return s.attackDamage;
    }

    // check if its within a distance (need to refactor into distance)
    // allow character to only move 1 block at a time in either x or y direction
    function _withinDistance(
        GameTypes.Position memory p1,
        GameTypes.Position memory p2,
        uint256 _dist
    ) public pure returns (bool) {
        uint256 _xDist = p1.x >= p2.x ? p1.x - p2.x : p2.x - p1.x;
        uint256 _yDist = p1.y >= p2.y ? p1.y - p2.y : p2.y - p1.y;
        return _xDist <= _dist && _yDist <= _dist;
    }

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

    function _getTopBlockAtPosition(GameTypes.Position memory _pos)
        public
        view
        returns (uint256)
    {
        uint256 _blockCount = _getBlockCountAtPosition(_pos);
        return s.map[_pos.x][_pos.y].blocks[_blockCount - 1];
    }

    // check if location has blocks or player on it
    function _isOccupied(GameTypes.Position memory _pos)
        public
        view
        hasPermission
        returns (bool)
    {
        if (s.map[_pos.x][_pos.y].occupier != address(0)) return true; // if block has player on it
        if (s.map[_pos.x][_pos.y].blocks.length > 0) return true; // if block has any blocks
        return false;
    }

    function _getBlockAtPosition(GameTypes.Position memory _pos, uint256 _zIdx)
        public
        view
        returns (uint256)
    {
        if (_zIdx >= s.map[_pos.x][_pos.y].blocks.length)
            revert("engine/invalid-z-index");

        return s.map[_pos.x][_pos.y].blocks[_zIdx];
    }

    function _setTopLevelStrength(
        GameTypes.Position memory _pos,
        uint256 _strength
    ) public hasPermission {
        s.map[_pos.x][_pos.y].topLevelStrength = _strength;
    }

    function _getCraftItemAmount(address _player, uint256 _craftItemId)
        public
        view
        returns (uint256)
    {
        return s.inventory[_player][_craftItemId];
    }

    // ------------------------------------------------------------
    // Movement
    // ------------------------------------------------------------

    // checks distance between positions and whether player is in map
    function _isValidMove(address _player, GameTypes.Position memory _pos)
        public
        view
        hasPermission
        returns (bool)
    {
        GameTypes.Position memory _position = _getPlayer(_player).position;

        bool _inMap = _pos.x < s.worldWidth &&
            _pos.y < s.worldHeight &&
            _pos.x >= 0 &&
            _pos.y >= 0;

        if (!_inMap) return false;

        if (!_withinDistance(_pos, _position, 1)) return false;

        if (_isOccupied(_pos)) return false; // check if target coordinate has block or player

        return true;
    }

    function _setPlayerPosition(address _player, GameTypes.Position memory _pos)
        public
        hasPermission
    {
        s.players[_player].position = _pos;
    }

    function _setOccupierAtPosition(
        address _player,
        GameTypes.Position memory _pos
    ) public hasPermission {
        s.map[_pos.x][_pos.y].occupier = _player;
    }

    // ------------------------------------------------------------
    // Item
    // ------------------------------------------------------------

    // merge these two functions together
    function _increaseItemInInventory(
        address _player,
        uint256 _itemId,
        uint256 _amount
    ) public hasPermission {
        _modifyItemInInventoryNonce(_player, _itemId, true);
        s.inventory[_player][_itemId] += _amount;
    }

    function _decreaseItemInInventory(
        address _player,
        uint256 _itemId,
        uint256 _amount
    ) public hasPermission {
        s.inventory[_player][_itemId] -= _amount;
        if (s.inventory[_player][_itemId] == 0) {
            _modifyItemInInventoryNonce(_player, _itemId, false); // remove itemId from inventory list
        }
    }

    function _getItemAmountById(address _player, uint256 _blockId)
        public
        view
        returns (uint256)
    {
        return s.inventory[_player][_blockId];
    }

    function _modifyItemInInventoryNonce(
        address _player,
        uint256 _itemId,
        bool dir
    ) public hasPermission {
        uint256 idx = 0;
        bool hasFound = false;

        for (uint256 i = 0; i < s.inventoryNonce[_player].length; i++) {
            if (s.inventoryNonce[_player][i] == _itemId) {
                idx = i;
                hasFound = true;
            }
        }

        if (!dir) {
            if (hasFound) {
                delete s.inventoryNonce[_player][idx];
            }
        } else if (dir) {
            if (!hasFound) {
                s.inventoryNonce[_player].push(_itemId);
            }
        }
    }

    function _changeHealth(
        address _player,
        uint256 _amount,
        bool dir
    ) public hasPermission {
        dir
            ? s.players[_player].health += _amount
            : s.players[_player].health -= _amount;
    }

    // ------------------------------------------------------------
    // Function helpers
    // ------------------------------------------------------------

    // mine block
    function _mine(GameTypes.Position memory _pos) public hasPermission {
        s.map[_pos.x][_pos.y].blocks.pop();

        uint256 _blockCount = _getBlockCountAtPosition(_pos);
        if (_blockCount > 0) {
            uint256 topBlockId = s.map[_pos.x][_pos.y].blocks[
                _getBlockCountAtPosition(_pos) - 1
            ];
            s.map[_pos.x][_pos.y].topLevelStrength = s
                .itemsWithMetadata[topBlockId]
                .strength;
        } else {
            s.map[_pos.x][_pos.y].topLevelStrength = 0;
        }
    }

    // place block
    function _place(GameTypes.Position memory _pos, uint256 _itemId)
        public
        hasPermission
    {
        // simple version of the game places blocks at index 0;
        uint256[] storage blocks = s.map[_pos.x][_pos.y].blocks;
        if (blocks.length >= 1) {
            blocks[0] = _itemId;
        } else {
            blocks.push(_itemId);
        }
        s.map[_pos.x][_pos.y].topLevelStrength = s
            .itemsWithMetadata[_itemId]
            .strength;
    }

    // transfer item from one player to another
    function _transfer(
        address _recipient,
        uint256 _itemId,
        uint256 _amount
    ) public hasPermission {
        GameTypes.Position memory _giverLoc = _getPlayer(msg.sender).position;
        GameTypes.Position memory _recipientLoc = _getPlayer(_recipient)
            .position;
        if (msg.sender == _recipient)
            revert("storage/recipient-same-as-sender");

        if (!_withinDistance(_giverLoc, _recipientLoc, 5))
            revert("storage/not-in-range"); // can only transfer within certain range
        if (_getItemAmountById(msg.sender, _itemId) < _amount)
            revert("storage/insufficient-block");

        _decreaseItemInInventory(msg.sender, _itemId, _amount);
        _increaseItemInInventory(_recipient, _itemId, _amount);

        emit Transfer(msg.sender, _recipient, _itemId, _amount);
    }

    // ------------------------------------------------------------
    // Tower
    // ------------------------------------------------------------

    function setEpochController(Epoch _addr) external hasPermission {
        s.epochController = _addr;
    }

    function _getTower(string memory _towerId)
        public
        view
        returns (GameTypes.Tower memory)
    {
        return s.towers[_towerId];
    }

    function _setTower(string memory _towerId, GameTypes.Tower memory _tower)
        public
        hasPermission
    {
        s.towers[_towerId] = _tower;
    }

    // ------------------------------------------------------------
    // Getters
    // ------------------------------------------------------------

    function _getWorldSize() public view returns (uint256, uint256) {
        return (s.worldWidth, s.worldHeight);
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

    function _getTileData(GameTypes.Position memory _pos)
        public
        view
        returns (GameTypes.Tile memory)
    {
        return s.map[_pos.x][_pos.y];
    }

    // get all player addresses
    function _getAllPlayerAddresses() public view returns (address[] memory) {
        return s.allPlayers;
    }

    // get
    function _getItemNonce() public view returns (uint256) {
        return s.itemNonce;
    }

    function _getItem(uint256 _itemId)
        public
        view
        returns (GameTypes.ItemWithMetadata memory)
    {
        return s.itemsWithMetadata[_itemId];
    }

    function _getPlayer(address _player)
        public
        view
        returns (GameTypes.PlayerData memory playerData)
    {
        return s.players[_player];
    }

    // get the number of blocks at a current location
    function _getBlockCountAtPosition(GameTypes.Position memory _pos)
        public
        view
        returns (uint256)
    {
        return s.map[_pos.x][_pos.y].blocks.length;
    }

    function _getStakePointsByUser(address _user)
        public
        view
        returns (uint256)
    {
        return s.stakePoints[_user];
    }

    function _setPlayerStakedPoints(address _player, uint256 _amount)
        public
        hasPermission
    {
        s.stakePoints[_player] = _amount;
    }

    function _getCurrentEpoch() public view returns (uint256) {
        return s.epochController.epoch();
    }
}
