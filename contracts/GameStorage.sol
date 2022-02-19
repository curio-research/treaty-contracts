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
    modifier hasPermission {
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
        p._addContractPermission(address(this));
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
        public hasPermission
    {
        s.itemsWithMetadata[_i] = _item;
    }

    function _setPlayer(address _player, GameTypes.Position memory _pos)
        public hasPermission
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

    function _getAttackDamage() public view hasPermission returns (uint256) {
        return s.attackDamage;
    }

    // ------------------------------------------------------------
    // Map
    // ------------------------------------------------------------

    // getter method to fetch map in 10x10 chunks. can increase size
    function _getMap(GameTypes.Position memory _pos)
        public
        view
        hasPermission
        returns (GameTypes.TileWithMetadata[] memory)
    {
        GameTypes.TileWithMetadata[]
            memory ret = new GameTypes.TileWithMetadata[](100);
        uint256 nonce = 0;
        for (uint256 x = _pos.x; x < _pos.x + 10; x++) {
            for (uint256 y = _pos.y; y < _pos.y + 10; y++) {
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

    function _encodePos(GameTypes.Position memory _position)
        public
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(_position.x, _position.y));
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
        hasPermission
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
        hasPermission
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
        // if block has player on it
        if (_blockOccupier(_pos) != address(0)) return true;

        // if block has any blocks
        if (s.map[_pos.x][_pos.y].blocks.length > 0) return true;

        return false;
    }

    function _getBlockAtPosition(GameTypes.Position memory _pos, uint256 _zIdx)
        public
        view
        hasPermission
        returns (uint256)
    {
        if (_zIdx >= s.map[_pos.x][_pos.y].blocks.length)
            revert("engine/invalid-z-index");

        return s.map[_pos.x][_pos.y].blocks[_zIdx];
    }

    // get the player's address who's occupying a block
    function _blockOccupier(GameTypes.Position memory _pos)
        public
        view
        hasPermission
        returns (address)
    {
        return s.map[_pos.x][_pos.y].occupier;
    }

    function _setTopLevelStrengthAtPosition(
        GameTypes.Position memory _pos,
        uint256 _strength
    ) public hasPermission {
        s.map[_pos.x][_pos.y].topLevelStrength = _strength;
    }

    function _getTopLevelStrengthAtPosition(GameTypes.Position memory _pos)
        public
        view
        hasPermission
        returns (uint256)
    {
        return s.map[_pos.x][_pos.y].topLevelStrength;
    }

    function _changeTopLevelStrengthAtPosition(
        GameTypes.Position memory _pos,
        uint256 _attackDamage,
        bool dir
    ) public hasPermission {
        dir == true
            ? s.map[_pos.x][_pos.y].topLevelStrength += _attackDamage
            : s.map[_pos.x][_pos.y].topLevelStrength -= _attackDamage;
    }

    function _getMineItemIds(uint256 _itemId)
        public
        view
        hasPermission
        returns (uint256[] memory)
    {
        return s.itemsWithMetadata[_itemId].mineItemIds;
    }

    function _getCraftItemAmount(address _player, uint256 _craftItemId)
        public
        view
        hasPermission
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
        GameTypes.Position memory _position = _getPlayerPosition(_player);

        bool _inMap = _pos.x < s.worldWidth &&
            _pos.y < s.worldHeight &&
            _pos.x >= 0 &&
            _pos.y >= 0;

        if (!_inMap) return false;

        if (!_withinDistance(_pos, _position, 1)) return false;

        if (_isOccupied(_pos)) return false; // check if target coordinate has block or player

        return true;
    }

    function _getPlayerPosition(address _player)
        public
        view
        hasPermission
        returns (GameTypes.Position memory)
    {
        return s.players[_player].position;
    }

    function _setPlayerPosition(address _player, GameTypes.Position memory _pos)
        public hasPermission
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
        // remove itemId from inventory list
        if (s.inventory[_player][_itemId] == 0) {
            _modifyItemInInventoryNonce(_player, _itemId, false);
        }
    }

    function _isItemActive(uint256 _itemId) 
        public 
        view 
        hasPermission
        returns (bool) 
    {
        return s.items[_itemId].active;
    }

    function _getItemAmountById(address _player, uint256 _blockId)
        public
        view
        hasPermission
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

    // ------------------------------------------------------------
    // Attack
    // ------------------------------------------------------------

    function _isValidAttack(address _player, address _target)
        public
        view
        hasPermission
        returns (bool)
    {
        GameTypes.Position memory playerPosition = _getPlayerPosition(_player);
        GameTypes.Position memory targetPosition = _getPlayerPosition(_target);

        // uint256 lastAttackedAt = s.lastAttackedAt[_player];
        // if (block.timestamp - lastAttackedAt <= s.attackWaitTime) return false; // must wait 5 seconds till next attack

        if (!_withinDistance(playerPosition, targetPosition, s.attackRange))
            return false;

        return true;
    }

    // ------------------------------------------------------------
    // Player state
    // ------------------------------------------------------------

    function _initialized(address player) 
        public view hasPermission returns (bool) 
    {
        return s.players[player].initialized;
    }

    function _changeEnergy(
        address _player,
        uint256 _amount,
        bool dir
    ) public hasPermission {
        dir
            ? s.players[_player].energy += _amount
            : s.players[_player].energy -= _amount;
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

    function _getHealth(address _player) 
        public 
        view 
        hasPermission
        returns (uint256) 
    {
        return s.players[_player].health;
    }

    // ------------------------------------------------------------
    // Function helpers
    // ------------------------------------------------------------

    // mine block
    function _mine(GameTypes.Position memory _pos) 
        public 
        hasPermission 
    {
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
        GameTypes.Position memory _giverLoc = _getPlayerPosition(msg.sender);
        GameTypes.Position memory _recipientLoc = _getPlayerPosition(
            _recipient
        );
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

    // TODO: why is this external?
    function setEpochController(Epoch _addr) external hasPermission {
        s.epochController = _addr;
    }

    function _getTower(string memory _towerId)
        public
        view
        hasPermission
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

    function _setTowerOwner(string memory _towerId, address _player) 
        public
        hasPermission
    {
        s.towers[_towerId].owner = _player;
    }

    // ------------------------------------------------------------
    // Getters
    // ------------------------------------------------------------

    function _getWorldSize() public view hasPermission returns (uint256, uint256) {
        return (s.worldWidth, s.worldHeight);
    }

    // fetch player inventory
    function _getInventoryByPlayer(address _player)
        public
        view
        hasPermission
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
        hasPermission
        returns (GameTypes.Tile memory)
    {
        return s.map[_pos.x][_pos.y];
    }

    // get all player addresses
    function _getAllPlayerAddresses() public view hasPermission returns (address[] memory) {
        return s.allPlayers;
    }

    // get
    function _getItemNonce() public view hasPermission returns (uint256) {
        return s.itemNonce;
    }

    function _getItemById(uint256 _itemId)
        public
        view
        hasPermission
        returns (GameTypes.ItemWithMetadata memory)
    {
        return s.itemsWithMetadata[_itemId];
    }

    // fetch single player data
    function _getAllPlayerData(address _player)
        public
        view
        hasPermission
        returns (GameTypes.PlayerData memory playerData)
    {
        return s.players[_player];
    }

    // fetch metadata about a single item
    function _getItemWithMetadata(uint256 _itemId)
        public
        view
        hasPermission
        returns (GameTypes.ItemWithMetadata memory)
    {
        return s.itemsWithMetadata[_itemId];
    }

    // get the number of blocks at a current location
    function _getBlockCountAtPosition(GameTypes.Position memory _pos)
        public
        view
        hasPermission
        returns (uint256)
    {
        return s.map[_pos.x][_pos.y].blocks.length;
    }

    function _getStakePointsByUser(address _user)
        public
        view
        hasPermission
        returns (uint256)
    {
        return s.stakePoints[_user];
    }

    function _setPlayerStakedPoints(address _player, uint256 _amount)
        public
        hasPermission
    {
        s.stakePoints[_player] += _amount;
    }

    function _addPlayerStakePoints(address _player, uint256 _amount) 
        public
        hasPermission
    {
        s.stakePoints[_player] += _amount;
    }

    function _subtractPlayerStakePoints(address _player, uint256 _amount)
        public
        hasPermission
    {
        s.stakePoints[_player] -= _amount;
    }

    function _subtractTowerStakePoints(string memory _towerId, uint256 _amount)
        public
        hasPermission
    {
        GameTypes.Tower storage tower = s.towers[_towerId];
        tower.stakedAmount -= _amount;
    }

    function _getCurrentEpoch() public view hasPermission returns (uint256) {
        return s.epochController.epoch();
    }
}
