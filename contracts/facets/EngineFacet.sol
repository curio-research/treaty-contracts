//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {EngineModules} from "contracts/libraries/EngineModules.sol";
import {BASE_NAME, Base, GameState, Player, Position, TERRAIN, Tile, Troop, Army, TroopType, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Engine facet
/// @notice Contains player functions such as march, purchaseTroop, initializePlayer

contract EngineFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;
    address NULL_ADDR = address(0);

    /**
     * March army to a target position (move, battle, or capture).
     * @param _armyId identifier for troop
     * @param _targetPos target position
     */
    function march(uint256 _armyId, Position memory _targetPos) external {
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");

        require(Util._inBound(_targetPos), "CURIO: Target out of bound");
        if (!Util._getTileAt(_targetPos).isInitialized) Util._initializeTile(_targetPos);

        Army memory _army = gs().armyIdMap[_armyId];
        require(_army.owner == msg.sender, "CURIO: Can only march own troop");
        require(!Util._samePos(_army.pos, _targetPos), "CURIO: Already at destination");
        // require((block.timestamp - _army.lastLargeActionTaken) >= Util._getArmyLargeActionCooldown(_army.armyTroopIds), "CURIO: Large action taken too recently");

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        // target has no army. empty.
        if (_targetTile.occupantId == NULL) {
            // if target tile has no base
            if (_targetTile.baseId == NULL) {
                if (Util._canArmyMoveLand(_armyId)) {
                    require(_targetTile.terrain != TERRAIN.WATER, "CURIO: Cannot move on water");
                } else {
                    require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
                }
                EngineModules._moveArmy(_armyId, _targetPos);
            } else {
                // if target tile has base

                // if it's your base
                if (Util._getBaseOwner(_targetTile.baseId) == msg.sender) {
                    if (_targetTile.terrain == TERRAIN.INLAND) require(Util._canArmyMoveLand(_armyId));

                    EngineModules._moveArmy(_armyId, _targetPos);
                } else {
                    // if it's not your base
                    EngineModules._battleBase(_armyId, _targetPos); // will capture and move if conditions are met
                }
            }
        } else {
            // you cannot march onto a tile with your own troop
            require(gs().armyIdMap[_targetTile.occupantId].owner != msg.sender, "CURIO: Destination tile occupied");

            EngineModules._battleArmy(_armyId, _targetPos);
        }

        // emit Util.PlayerInfo(msg.sender, gs().playerMap[msg.sender]);
    }

    /**
     * Dispatch troop to a target position (_moveArmy, _loadTroop, mov_clearTroopFromSourceArmy etc.).
     * @param _troopId identifier for troop
     * @param _targetPos target position
     */
    function moveTroop(uint256 _troopId, Position memory _targetPos) public {
        // basic check
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");
        require(Util._inBound(_targetPos), "CURIO: Target out of bound");
        if (!Util._getTileAt(_targetPos).isInitialized) Util._initializeTile(_targetPos);

        Troop memory _troop = gs().troopIdMap[_troopId];
        Army memory _army = gs().armyIdMap[_troop.armyId];
        Army memory _targetArmy;
        Tile memory _targetTile = Util._getTileAt(_targetPos);

        if (_targetTile.occupantId != NULL) {
            _targetArmy = Util._getArmy(_targetTile.occupantId);
            require(_targetArmy.owner == msg.sender, "CURIO: Can only combine with own troop");
        }

        // basic check
        require(Util._withinDist(_army.pos, _targetPos, 1), "CURIO: can only dispatch troop to the near tile");
        require(_army.owner == msg.sender, "CURIO: Can only dispatch own troop");
        require(!Util._samePos(_army.pos, _targetPos), "CURIO: Already at destination");
        // require((block.timestamp - _army.lastLargeActionTaken) >= Util._getArmyLargeActionCooldown(_army.armyTroopIds), "CURIO: Large action taken too recently");

        // if the targe tile has no occupants currently
        if (_targetTile.occupantId == NULL) {
            require(Util._getBaseOwner(_targetTile.baseId) == msg.sender || _targetTile.baseId == NULL, "CURIO: Cannot directly attack with troops");
            // if the target tile is land, all troops must be able to move onto land
            if (_targetTile.terrain == TERRAIN.INLAND) require(Util._canTroopMoveLand(_troop.troopTypeId), "CURIO: All troops must be able to move onto land in army");

            uint256 _newArmyId = Util._createNewArmyFromTroop(_troopId, _army.pos); // create new army

            EngineModules._moveArmy(_newArmyId, _targetPos);
        } else {
            // target tile has occupants
            require(_targetArmy.owner == msg.sender, "CURIO: Cannot directly attack with troops");
            // four cases depending on troop and army type

            EngineModules._troopJoinArmySizeCheck(_targetArmy, _troop); // check if the target tile has enough space
            Util._canTroopMoveToTileTile(_troop.troopTypeId, _targetTile.terrain); // check if troop can move onto the land type

            EngineModules._moveTroopToArmy(_targetTile.occupantId, _troopId);
        }

        EngineModules._clearTroopFromSourceArmy(_troop.armyId, _troopId);
    }

    /**
     * Purchase troop at a base.
     * @param _pos position of base
     * @param _troopTypeId identifier for selected troop type
     */
    function purchaseTroop(Position memory _pos, uint256 _troopTypeId) external {
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");

        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        Tile memory _tile = Util._getTileAt(_pos);
        require(_tile.baseId != NULL, "CURIO: No base found");
        require(_tile.occupantId == NULL, "CURIO: Base occupied by another troop");

        Base memory _base = Util._getBase(_tile.baseId);
        require(_base.owner == msg.sender, "CURIO: Can only purchase in own base");
        require(_base.name == BASE_NAME.PORT || (_base.name == BASE_NAME.CITY && Util._canTroopMoveLand(_troopTypeId)), "CURIO: Base cannot purchase selected troop type");

        uint256 _troopPrice = Util._getTroopGoldPrice(_troopTypeId);
        Util._updatePlayerBalances(msg.sender);
        require(_troopPrice <= Util._getPlayerGoldBalance(msg.sender), "CURIO: Insufficient gold balance (capture more bases!)");

        (uint256 _armyId, Army memory _army) = Util._addTroop(msg.sender, _pos, _troopTypeId);
        gs().playerMap[msg.sender].goldBalance -= _troopPrice;

        emit Util.PlayerInfo(msg.sender, gs().playerMap[msg.sender]);
        emit Util.NewTroop(msg.sender, _armyId, _army, _pos);
    }

    /**
     * Delete an owned troop (often to reduce expense).
     * @param _troopId identifier for troop
     */
    function deleteTroop(uint256 _troopId) external {
        Troop memory _troop = Util._getTroop(_troopId);
        Army memory _army = Util._getArmy(_troop.armyId);
        require(_army.owner == msg.sender, "CURIO: Can only delete own troop");

        Util._removeTroop(_troopId);

        emit Util.TroopDeath(msg.sender, _troopId);
    }

    /**
     * Initialize self as player at a selected position.
     * @param _pos position to initialize
     */
    function initializePlayer(Position memory _pos) external {
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._getPlayerCount() < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(!Util._isPlayerInitialized(msg.sender), "CURIO: Player already initialized");

        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        uint256 _baseId = Util._getTileAt(_pos).baseId;
        require(Util._getBaseOwner(_baseId) == NULL_ADDR, "CURIO: Base is taken");

        WorldConstants memory _worldConstants = gs().worldConstants;
        gs().players.push(msg.sender);
        gs().playerMap[msg.sender] = Player({
            initTimestamp: block.timestamp,
            active: true,
            goldBalance: _worldConstants.initPlayerGoldBalance,
            oilBalance: _worldConstants.initPlayerOilBalance,
            totalGoldGenerationPerUpdate: _worldConstants.defaultBaseGoldGenerationPerSecond,
            totalOilGenerationPerUpdate: 0,
            totalOilConsumptionPerUpdate: 0,
            balanceLastUpdated: block.timestamp,
            numOwnedBases: 1,
            numOwnedTroops: 0 //
        });
        gs().baseIdMap[_baseId].owner = msg.sender;

        emit Util.NewPlayer(msg.sender, _pos);
    }
}
