//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./GameStorage.sol";
import "./GameTypes.sol";

/// @title Game physics engine
/// @notice the game engine takes care of low level interactions such as "move" and "craft" item.
/// the actual "finite game" mechanics should live in another file, the one that players play.

// TODO: Add proxy upgradeable
// TODO: Find a better formatter lol
contract Game is GameStorage {
    using SafeMath for uint256;

    event NewPlayer(address _player, uint256 _x, uint256 _y);
    event Move(address _player, uint256 _x, uint256 _y);
    event Mine(
        address _player,
        uint256 _x,
        uint256 _y,
        uint256 _blockId,
        uint256 _zIndex
    );
    event Place(address _player, uint256 _x, uint256 _y, uint256 _blockId);
    event Craft(address _player, uint256 _blockId);
    event Attack(address _player1, address _player2); // add attack result here?
    event Death(address _player);

    // initialize game with map, items
    constructor(
        GameTypes.Position[] memory _positions,
        uint256[] memory _tileTypes,
        uint256 width,
        uint256 height,
        GameTypes.ItemWithMetadata[] memory _items
    ) {
        for (uint256 i = 0; i < _positions.length; i++) {
            GameTypes.Position memory _position = _positions[i];
            uint256 _tileType = _tileTypes[i];
            s.map[_position.x][_position.y].blocks[0] = _tileType; // 0 is the base level resource
        }

        s.WORLD_WIDTH = width;
        s.WORLD_HEIGHT = height;

        s.itemNonce = 1; // valid blockId start at 1. Id 0 = no blocks

        s.moveRange = 2;
        s.attackRange = 1;

        // initialize all craft items
        for (uint256 i = 0; i < _items.length; i++) {
            _addItemMaterialAndAmount(
                i + 1,
                _items[i].materialIds,
                _items[i].materialAmounts
            );
        }
    }

    function initializePlayer(uint256 _x, uint256 _y) public {
        if (s.players[msg.sender].isInitialized)
            revert("engine/player-already-initialized");

        // check if target coordinate has block or another player
        if (_isOccupied(_x, _y)) revert("engine/location-occupied");

        s.players[msg.sender] = GameTypes.PlayerData({
            alive: true,
            isInitialized: true,
            initTimestamp: block.timestamp,
            position: GameTypes.Position(_x, _y),
            energy: 100,
            health: 100,
            level: 1,
            a: msg.sender
        });
        s.allPlayers.push(msg.sender);

        _setOccupierAtLocation(msg.sender, _x, _y);

        emit NewPlayer(msg.sender, _x, _y);
    }

    // player move function
    function move(uint256 _x, uint256 _y) external {
        // add hook here. look at openzeppelin
        if (!_isValidMove(msg.sender, _x, _y)) revert("engine/invalid-move");

        GameTypes.Position memory _position = _playerPosition(msg.sender);
        _setOccupierAtLocation(address(0), _position.x, _position.y); // remove occupier from previous position

        _setPlayerPosition(msg.sender, _x, _y);
        _setOccupierAtLocation(msg.sender, _x, _y);
        _decreaseEnergy(msg.sender, 0); // change this based on game dynamic

        emit Move(msg.sender, _x, _y);
    }

    // mine resource blocks at specific z-index base layer (z-index of 0)
    function mine(
        uint256 _x,
        uint256 _y,
        uint256 _zIdx
    ) external {
        uint256 blockType = _blockAtLocation(_x, _y, _zIdx);
        if (blockType == 0) revert("engine/no-blocks-available");

        // // TODO : change to only reveal to certain players with zkp later
        // if (!_checkLevel(msg.sender, blockType)) revert("engine/insufficient-level");

        _increaseItemInInventory(msg.sender, blockType, 1);
        _mineBlock(_x, _y, _zIdx); // mine block

        emit Mine(msg.sender, _x, _y, blockType, _zIdx);
    }

    // place block at location
    // players can only place at z-index of 1 because 0 is the base layer aka where resources are mined
    function place(
        uint256 _x,
        uint256 _y,
        uint256 _blockId
    ) external {
        if (_getBlockAmountById(msg.sender, _blockId) == 0)
            revert("engine/insufficient-inventory");
        if (
            _playerPosition(msg.sender).x == _x &&
            _playerPosition(msg.sender).y == _y
        ) revert("engine/cannot-stand-on-block");

        _placeBlock(_x, _y, _blockId);
        _decreaseItemInInventory(msg.sender, _blockId, 1);

        emit Place(msg.sender, _x, _y, _blockId);
    }

    // craft blocks (once) based on their recipe
    function craft(uint256 _blockId) external {
        if (_isItemActive(_blockId)) revert("engine/inactive-block");

        // loop through player inventory to check if player has all required ingredients to make a block
        for (uint256 i = 0; i < s.itemMaterials[_blockId].length; i++) {
            uint256 materialId = s.itemMaterials[_blockId][i];
            uint256 materialAmount = s.materialAmounts[_blockId][materialId];

            if (s.inventory[msg.sender][materialId] < materialAmount) {
                revert("engine/insufficient-material");
            } else {
                // deduct material from player inventory count
                _decreaseItemInInventory(
                    msg.sender,
                    materialId,
                    materialAmount
                );
            }
        }

        _increaseItemInInventory(msg.sender, _blockId, 1);

        emit Craft(msg.sender, _blockId);
    }

    function attack(address _target) external {
        // attacks are both time-limited and range-limited
        if (_target == address(0)) revert("engine/no-target");

        // GameTypes.Position memory playerPosition = _playerPosition(msg.sender);
        // GameTypes.Position memory targetPosition = _playerPosition(_target);

        if (!_isValidAttack(msg.sender, _target))
            revert("engine/invalid-attack");

        _decreaseHealth(_target, 5); // add more details later

        s.lastAttacked[msg.sender] = block.timestamp;

        emit Attack(msg.sender, _target);

        if (s.players[_target].health <= 0) {
            _die(_target);
            emit Death(_target);
        }
    }

    function gameName() external pure returns (string memory name) {
        return "blocky";
    }

    function getPlayerPosition()
        external
        view
        returns (GameTypes.Position memory position)
    {
        return _playerPosition(msg.sender);
    }
}
