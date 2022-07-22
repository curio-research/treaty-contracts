//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {MarchModules} from "contracts/libraries/MarchModules.sol";
import {BASE_NAME, Base, GameState, Player, Position, TERRAIN, Tile, Troop, TroopType, WorldConstants, TROOP_NAME} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Engine facet
/// @notice Contains player functions such as march, purchaseTroop, initializePlayer

contract EngineFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;
    address NULL_ADDR = address(0);

    /**
     * March troop to a target position (combining move, battle, capture).
     * @param _troopId identifier for troop
     * @param _targetPos target position
     */
    function march(uint256 _troopId, Position memory _targetPos) external {
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");

        require(Util._inBound(_targetPos), "CURIO: Target out of bound");
        if (!Util._getTileAt(_targetPos).isInitialized) Util._initializeTile(_targetPos);

        Troop memory _troop = gs().troopIdMap[_troopId];
        require(_troop.owner == msg.sender, "CURIO: Can only march own troop");
        require(!Util._samePos(_troop.pos, _targetPos), "CURIO: Already at destination");
        require((block.timestamp - _troop.lastLargeActionTaken) >= Util._getLargeActionCooldown(_troop.troopTypeId), "CURIO: Large action taken too recently");

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        if (_targetTile.occupantId == NULL) {
            if (_targetTile.baseId == NULL) {
                if (Util._isLandTroop(_troop.troopTypeId)) {
                    require(_targetTile.terrain != TERRAIN.WATER || Util._canTransportTroop(_targetTile), "CURIO: Cannot move on water");
                } else {
                    require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
                }
                MarchModules._moveModule(_troopId, _targetPos);
            } else {
                if (Util._getBaseOwner(_targetTile.baseId) == msg.sender) {
                    if (Util._isLandTroop(_troop.troopTypeId)) {
                        require(_targetTile.terrain != TERRAIN.WATER || Util._canTransportTroop(_targetTile), "CURIO: Cannot move on water");
                    } else {
                        require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
                    }

                    MarchModules._moveModule(_troopId, _targetPos);
                } else {
                    MarchModules._battleBaseModule(_troopId, _targetPos); // will capture and move if conditions are met
                }
            }
        } else {
            if (gs().troopIdMap[_targetTile.occupantId].owner == msg.sender) {
                if (Util._canTransportTroop(_targetTile) && Util._isLandTroop(_troop.troopTypeId)) {
                    // Load troop onto transport
                    MarchModules._loadModule(_troopId, _targetPos);
                    MarchModules._moveModule(_troopId, _targetPos);
                } else {
                    revert("CURIO: Destination tile occupied");
                }
            } else {
                MarchModules._battleTroopModule(_troopId, _targetPos);
            }
        }

        emit Util.PlayerInfo(msg.sender, gs().playerMap[msg.sender]);
    }

    /**
     * Purchase troop at a base.
     * @param _pos position of base
     * @param _troopTypeId identifier for selected troop type
     */
    function purchaseTroop(Position memory _pos, uint256 _troopTypeId) external {
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");

        require(Util._isBasicTroop(_troopTypeId), "CURIO: Can only produce a basic troop");

        require(Util._inBound(_pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_pos).isInitialized) Util._initializeTile(_pos);

        Tile memory _tile = Util._getTileAt(_pos);
        require(_tile.baseId != NULL, "CURIO: No base found");
        require(_tile.occupantId == NULL, "CURIO: Base occupied by another troop");

        Base memory _base = Util._getBase(_tile.baseId);
        require(_base.owner == msg.sender, "CURIO: Can only purchase in own base");
        require(_base.name == BASE_NAME.PORT || (_base.name == BASE_NAME.CITY && Util._isLandTroop(_troopTypeId)), "CURIO: Base cannot purchase selected troop type");

        uint256 _troopPrice = Util._getTroopGoldPrice(_troopTypeId);
        Util._updatePlayerBalances(msg.sender);
        require(_troopPrice <= Util._getPlayerGoldBalance(msg.sender), "CURIO: Insufficient gold balance (capture more bases!)");

        (uint256 _troopId, Troop memory _troop) = Util._addTroop(msg.sender, _pos, _troopTypeId);
        gs().playerMap[msg.sender].goldBalance -= _troopPrice;

        emit Util.PlayerInfo(msg.sender, gs().playerMap[msg.sender]);
        emit Util.NewTroop(msg.sender, _troopId, _troop, _pos);
    }

    /**
     * Delete an owned troop (often to reduce expense).
     * @param _troopId identifier for troop
     */
    function deleteTroop(uint256 _troopId) external {
        require(Util._getTroop(_troopId).owner == msg.sender, "CURIO: Can only delete own troop");

        Util._removeTroop(_troopId);

        emit Util.Death(msg.sender, _troopId);
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

    /**
     * Combine troops into an Army
     * @param _troops array of troops to be combined
     */
    function combine(uint256[] memory _troops) external {
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");

        Troop memory _firstTroop = Util._getTroop(_troops[0]);

        require(Util._inBound(_firstTroop.pos), "CURIO: Out of bound");
        if (!Util._getTileAt(_firstTroop.pos).isInitialized) Util._initializeTile(_firstTroop.pos);

        TroopType memory CustomArmyType = TroopType({
            name: TROOP_NAME.ARMY,
            isLandTroop: Util._isLandTroop(_troops[0]),
            maxHealth: Util._getMaxHealth(_troops[0]),
            damagePerHit: Util._getDamagePerHit(_troops[0]),
            attackFactor: Util._getAttackFactor(_troops[0]),
            defenseFactor: Util._getDefenseFactor(_troops[0]),
            cargoCapacity: Util._getCargoCapacity(_troops[0]),
            movementCooldown: Util._getMovementCooldown(_troops[0]),
            largeActionCooldown: Util._getLargeActionCooldown(_troops[0]),
            goldPrice: Util._getTroopGoldPrice(_troops[0]),
            oilConsumptionPerSecond: Util._getOilConsumptionPerSecond(_troops[0]), //
            armyTroopIds: _troops,
            isBasic: false
        });

        uint256 longestMovementCooldown;
        uint256 troopTransportCount = Util._getCargoCapacity(_troops[0]) != 0 ? 1 : 0;

        for (uint256 i = 1; i < _troops.length; i++) {
            Troop memory _troop = Util._getTroop(_troops[i]);

            uint256 _troopMovementCooldown = Util._getMovementCooldown(_troops[i]);
            if (_troopMovementCooldown > longestMovementCooldown) {
                longestMovementCooldown = _troopMovementCooldown;
            }

            // largeActionCooldown, isLandTroop and isBasic remain the same
            require((block.timestamp - _troop.lastLargeActionTaken) >= Util._getLargeActionCooldown(_troop.troopTypeId), "CURIO: Large action taken too recently");
            require(Util._isLandTroop(_troops[i]) == CustomArmyType.isLandTroop, "CURIO: Can only combine either LandTroop or SeaTroop");
            require(Util._isBasicTroop(_troops[i]), "CURIO: Army cannot be combined into an Army");

            // an army can have at most one trooptransport
            if (Util._getCargoCapacity(_troops[i]) != 0) {
                troopTransportCount++;
            }
            require(troopTransportCount < 2, "CURIO: Army can have at most one trooptransport");

            CustomArmyType.maxHealth += Util._getMaxHealth(_troops[i]);
            CustomArmyType.damagePerHit += Util._getDamagePerHit(_troops[i]);
            CustomArmyType.attackFactor += Util._getAttackFactor(_troops[i]);
            CustomArmyType.defenseFactor += Util._getDefenseFactor(_troops[i]);
            CustomArmyType.cargoCapacity += Util._getCargoCapacity(_troops[i]);
            CustomArmyType.goldPrice += Util._getTroopGoldPrice(_troops[i]);
            CustomArmyType.oilConsumptionPerSecond += Util._getOilConsumptionPerSecond(_troops[i]);

            MarchModules._moveModule(_troops[i], _firstTroop.pos);
        }

        // update troopTypes map info (similar to _addTroop)
        uint256 _troopTypeId = gs().TroopTypeNonce;
        gs().troopTypeIds.push(_troopTypeId);
        gs().troopTypeIdMap[_troopTypeId] = CustomArmyType;
        gs().troopNonce++;

        (uint256 _troopId, Troop memory _army) = Util._addTroop(msg.sender, _firstTroop.pos, _troopTypeId);

        emit Util.PlayerInfo(msg.sender, gs().playerMap[msg.sender]);
        emit Util.NewTroop(msg.sender, _troopId, _army, _firstTroop.pos);
    }

    function joinArmy(uint256 _armyId, uint256 _troopId) external {

    }
}