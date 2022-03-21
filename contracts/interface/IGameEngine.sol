import "../GameTypes.sol";

interface IGameEngine {
    // ------------------------------------------------------------
    // Events
    // ------------------------------------------------------------

    event NewPlayer(address _player, GameTypes.Position _pos);
    event Move(address _player, GameTypes.Position _pos);
    event MineItem(address _player, GameTypes.Position _pos, uint256 _blockId);
    event AttackItem(
        address _player,
        GameTypes.Position _pos,
        uint256 _strength
    );
    event Place(address _player, GameTypes.Position _pos, uint256 _blockId);
    event Craft(address _player, uint256 _blockId);
    event Attack(address _player1, address _player2);
    event Death(address _player);
    event ChangeBlockStrength(
        address _player,
        GameTypes.Position _pos,
        uint256 _strength,
        uint256 _resourceUsed
    );

    event MoveBlock(
        address _player,
        GameTypes.Position _startPos,
        GameTypes.Position _endPos
    );

    function initializePlayer(GameTypes.Position memory _pos) external;

    function move(GameTypes.Position memory _pos) external;

    function moveBlock(
        GameTypes.Position memory _startPos,
        GameTypes.Position memory _targetPos
    ) external;

    function mine(GameTypes.Position memory _pos) external;

    function place(GameTypes.Position memory _pos, uint256 _itemId) external;

    function craft(uint256 _itemId) external;

    function changeBlockStrength(
        GameTypes.Position memory _pos,
        uint256 _amount,
        bool _state
    ) external;
}
