//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./GameTypes.sol";
import "./Permissions.sol";

/// @title Monolithic game storage

contract GameStorage {
    using SafeMath for uint256;
    GameTypes.GameStorage public s; // storage slot 1
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

    event ChangeBlockProperty(
        uint256 _blockId,
        GameTypes.ItemWithMetadata item
    );

    // ------------------------------------------------------------
    // Initialization
    // ------------------------------------------------------------

    constructor(Permissions _permissions) {
        p = _permissions;
    }

    function _setConstants(GameTypes.WorldConstants memory constants)
        public
        hasPermission
    {
        s.worldConstants = constants;
    }

    function _setBlock(GameTypes.Position memory _position, uint256 blockId)
        public
        hasPermission
    {
        s.map[_position.x][_position.y].blockId = blockId;
    }

    /**
     * Set map blocks in NxN regions due to gas limitation.
     * @param _startPos Top-left coordinate of region to start set
     * @param _blocks NxN array of blocks for the region
     */
    function _setMapRegion(
        GameTypes.Position memory _startPos,
        uint256[][] memory _blocks
    ) public hasPermission {
        for (uint256 _xAdd = 0; _xAdd < _blocks.length; _xAdd++) {
            for (uint256 _yAdd = 0; _yAdd < _blocks[0].length; _yAdd++) {
                GameTypes.Position memory _pos = GameTypes.Position({
                    x: _startPos.x + _xAdd,
                    y: _startPos.y + _yAdd
                });

                _setBlock(_pos, _blocks[_xAdd][_yAdd]);

                if (_blocks[_xAdd][_yAdd] != 0) {
                    uint256 _block = _getBlockAtPos(_pos);
                    _setTopLevelStrength(_pos, _getItem(_block).strength);
                }
            }
        }
    }

    function _setItem(uint256 _i, GameTypes.ItemWithMetadata memory _item)
        public
        hasPermission
    {
        s.itemsWithMetadata[_i] = _item;
        emit ChangeBlockProperty(_i, _item);
    }

    function _getWorldConstants()
        public
        view
        returns (GameTypes.WorldConstants memory)
    {
        return s.worldConstants;
    }

    function _setPlayer(address _player, GameTypes.Position memory _pos)
        public
        hasPermission
    {
        GameTypes.WorldConstants memory constants = _getWorldConstants();
        s.players[_player] = GameTypes.PlayerData({
            initialized: true,
            initTimestamp: block.timestamp,
            playerAddr: _player,
            position: _pos,
            health: constants.startPlayerHealth,
            energy: constants.startPlayerEnergy,
            attackDamage: constants.startingAttackDamage,
            attackRange: constants.startingAttackRange,
            reach: constants.startingReach
        });
        s.allPlayers.push(_player);
    }

    function _incrementNonce() public hasPermission {
        s.itemNonce += 1;
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
        GameTypes.WorldConstants memory constants = _getWorldConstants();

        (bool _xValid, uint256 _x) = SafeMath.tryDiv(k, constants.worldHeight);
        (bool _yValid, uint256 _y) = SafeMath.tryMod(k, constants.worldWidth);

        if (!_xValid || !_yValid) revert("SafeMath/invalid-division");

        return GameTypes.Position(_x, _y);
    }

    function _getIndexFromPosition(GameTypes.Position memory _pos)
        public
        view
        returns (uint256)
    {
        GameTypes.WorldConstants memory constants = _getWorldConstants();

        (bool _aValid, uint256 _a) = SafeMath.tryMul(
            _pos.x,
            constants.worldHeight
        );
        (bool _bValid, uint256 _b) = SafeMath.tryAdd(_a, _pos.y);

        if (!_aValid || !_bValid) revert("SafeMath/invalid-math");

        return _b;
    }

    // ------------------------------------------------------------
    // Items
    // ------------------------------------------------------------

    // check if location has blocks or player on it
    function _isOccupied(GameTypes.Position memory _pos)
        public
        view
        returns (bool)
    {

        if (s.map[_pos.x][_pos.y].occupier != address(0)) return true; // if tile has player on it

        uint256 _blockId = s.map[_pos.x][_pos.y].blockId;
        if (_blockId != 0 && !_getItem(_blockId).occupiable) return true; // if tile has non-occupiable block

        if (s.map[_pos.x][_pos.y].occupier != address(0)) return true; // if block has player on it
        if (s.map[_pos.x][_pos.y].blockId != 0) return true;
        return false;
    }

    function _setTopLevelStrength(
        GameTypes.Position memory _pos,
        uint256 _amount
    ) public hasPermission {
        s.map[_pos.x][_pos.y].topLevelStrength = _amount;
    }


        return false;
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
        GameTypes.WorldConstants memory constants = _getWorldConstants();

        // if player is within bounds of map
        bool _inMap = _pos.x < constants.worldWidth &&
            _pos.y < constants.worldWidth &&
            _pos.x >= 0 &&
            _pos.y >= 0;

        if (!_inMap) return false;

        // if its within the move distance
        if (!_withinDistance(_pos, _position, 1)) return false;

        // if the target block is occupied
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

    // mine block completely
    function _mine(GameTypes.Position memory _pos) public hasPermission {
        _setBlock(_pos, 0); // set block to no block which is 0
        s.map[_pos.x][_pos.y].topLevelStrength = 0; // if its not a null block. remove it
    }

    // place block
    function _place(GameTypes.Position memory _pos, uint256 _itemId)
        public
        hasPermission
    {
        s.map[_pos.x][_pos.y].blockId = _itemId;

        s.map[_pos.x][_pos.y].topLevelStrength = s
            .itemsWithMetadata[_itemId]
            .strength;
    }

    function _setBlockOwner(GameTypes.Position memory _pos, address _owner)
        public
        hasPermission
    {
        s.map[_pos.x][_pos.y].owner = _owner;
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

    function _setTileData(
        GameTypes.Position memory _pos,
        GameTypes.Tile memory _tile
    ) public hasPermission {
        s.map[_pos.x][_pos.y] = _tile;
    }

    // function _setTileData(GameTypes.Position memory _pos, GameTypes.)

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

    function _getBlockAtPos(GameTypes.Position memory _pos)
        public
        view
        returns (uint256)
    {
        return s.map[_pos.x][_pos.y].blockId;
    }

    function _getCurrentEpoch() public view returns (uint256) {
        return s.epochController.epoch();
    }
}
