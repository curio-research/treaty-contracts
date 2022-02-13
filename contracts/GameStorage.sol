//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./GameTypes.sol";

/// @title Monolithic game storage

contract GameStorage {
    using SafeMath for uint256;
    GameTypes.GameStorage public s;

    // ------------------------------------------------------------
    // Events
    // ------------------------------------------------------------

    event Transfer(
        address _player,
        address _recipient,
        uint256 _id,
        uint256 _amount
    );

    // getter method to fetch map in 10x10 chunks. can increase size
    function _getMap(GameTypes.Position memory _pos)
        public
        view
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
        returns (GameTypes.Position memory)
    {
        (bool _xValid, uint256 _x) = SafeMath.tryDiv(k, s.worldHeight);
        (bool _yValid, uint256 _y) = SafeMath.tryMod(k, s.worldHeight);

        if (!_xValid || !_yValid) revert("SafeMath/invalid-division");

        return GameTypes.Position(_x, _y);
    }

    // function _addCraftItemAndAmount(
    //     uint256 _itemId,
    //     uint256[] memory _craftItemIds,
    //     uint256[] memory _craftItemAmounts
    // ) public {
    //     if (_craftItemIds.length != _craftItemAmounts.length)
    //         revert("engine/invalid-craft-item-amounts");

    //     s.itemsWithMetadata[_itemId].craftable = true;
    //     s.itemsWithMetadata[_itemId].craftItemIds = _craftItemIds;
    //     s.itemsWithMetadata[_itemId].craftItemAmounts = _craftItemAmounts;

    //     s.itemNonce += 1;
    // }

    // function _removeCraftItemAndAmount(uint256 _itemId) public {
    //     s.itemsWithMetadata[_itemId].craftable = false;
    //     delete s.itemsWithMetadata[_itemId].craftItemIds;
    //     delete s.itemsWithMetadata[_itemId].craftItemAmounts;
    // }

    // merge these two functions together
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
        s.inventory[_player][_itemId] -= _amount;
        // remove itemId from inventory list
        if (s.inventory[_player][_itemId] == 0) {
            _modifyItemInInventoryNonce(_itemId, false);
        }
    }

    function _isItemActive(uint256 _itemId) public view returns (bool) {
        return s.items[_itemId].active;
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
        returns (bool)
    {
        // if block has player on it
        if (_blockOccupier(_pos) != address(0)) return true;

        // if block has any blocks
        if (s.map[_pos.x][_pos.y].blocks.length > 0) return true;

        return false;
    }

    // checks distance between positions and whether player is in map
    function _isValidMove(address _player, GameTypes.Position memory _pos)
        public
        view
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

    function _isValidAttack(address _player, address _target)
        public
        view
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

    function _getBlockAtPosition(GameTypes.Position memory _pos, uint256 _zIdx)
        public
        view
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
        returns (address)
    {
        return s.map[_pos.x][_pos.y].occupier;
    }

    function _getPlayerPosition(address _player)
        public
        view
        returns (GameTypes.Position memory)
    {
        return s.players[_player].position;
    }

    function _setPlayerPosition(address _player, GameTypes.Position memory _pos)
        public
    {
        s.players[_player].position = _pos;
    }

    function _setOccupierAtPosition(
        address _player,
        GameTypes.Position memory _pos
    ) public {
        s.map[_pos.x][_pos.y].occupier = _player;
    }

    function _getItemAmountById(address _player, uint256 _blockId)
        public
        view
        returns (uint256)
    {
        return s.inventory[_player][_blockId];
    }

    // // player stats
    // function _changeEnergy(
    //     address _player,
    //     uint256 _amount,
    //     bool dir
    // ) public {
    //     dir
    //         ? s.players[_player].energy += _amount
    //         : s.players[_player].energy -= _amount;
    // }

    function _changeHealth(
        address _player,
        uint256 _amount,
        bool dir
    ) public {
        dir
            ? s.players[_player].health += _amount
            : s.players[_player].health -= _amount;
    }

    // mine block
    function _mine(GameTypes.Position memory _pos) public {
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
    function _place(GameTypes.Position memory _pos, uint256 _itemId) public {
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
    ) public {
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

    function _modifyItemInInventoryNonce(uint256 _itemId, bool dir) public {
        uint256 idx = 0;
        bool hasFound = false;

        for (uint256 i = 0; i < s.inventoryNonce[msg.sender].length; i++) {
            if (s.inventoryNonce[msg.sender][i] == _itemId) {
                idx = i;
                hasFound = true;
            }
        }

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

    // ------------------------------------------------------------
    // Tower
    // ------------------------------------------------------------

    function setEpochController(Epoch _addr) external {
        s.epochController = _addr;
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

    // get all player addresses
    function _getAllPlayerAddresses() public view returns (address[] memory) {
        return s.allPlayers;
    }

    // get
    function _getItemNonce() public view returns (uint256) {
        return s.itemNonce;
    }

    // fetch single player data
    function _getAllPlayerData(address _player)
        public
        view
        returns (GameTypes.PlayerData memory playerData)
    {
        return s.players[_player];
    }

    // fetch metadata about a single item
    function _getItemWithMetadata(uint256 _itemId)
        public
        view
        returns (GameTypes.ItemWithMetadata memory)
    {
        return s.itemsWithMetadata[_itemId];
    }

    // get the number of blocks at a current location
    function _getBlockCountAtPosition(GameTypes.Position memory _pos)
        public
        view
        returns (uint256)
    {
        return s.map[_pos.x][_pos.y].blocks.length;
    }

    function _getTopLevelStrengthAtPosition(GameTypes.Position memory _pos)
        public
        view
        returns (uint256)
    {
        return s.map[_pos.x][_pos.y].topLevelStrength;
    }

    function _changeTopLevelStrengthAtPosition(
        GameTypes.Position memory _pos,
        uint256 _attackDamage,
        bool dir
    ) public {
        dir == true
            ? s.map[_pos.x][_pos.y].topLevelStrength += _attackDamage
            : s.map[_pos.x][_pos.y].topLevelStrength -= _attackDamage;
    }
}
