//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {MarchModules} from "contracts/libraries/MarchModules.sol";
import {BASE_NAME, Base, GameState, Player, Position, TERRAIN, Tile, Troop, Army, TroopType, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

/// @title Engine facet
/// @notice Contains player functions such as march, purchaseTroop, initializePlayer

contract EngineFacet is UseStorage {
    using SafeMath for uint256;
    uint256 NULL = 0;
    address NULL_ADDR = address(0);

    /**
     * March troop to a target position (combining move, battle, capture).
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
        require((block.timestamp - _army.lastLargeActionTaken) >= Util._getArmyLargeActionCooldown(_army.armyTroopIds), "CURIO: Large action taken too recently");

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        if (_targetTile.occupantId == NULL) {
            if (_targetTile.baseId == NULL) {
                if (Util._isLandArmy(_armyId)) {
                    require(_targetTile.terrain != TERRAIN.WATER || Util._canTransportTroop(_targetTile), "CURIO: Cannot move on water");
                } else {
                    require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
                }
                MarchModules._moveModule(_armyId, _targetPos);
            } else {
                if (Util._getBaseOwner(_targetTile.baseId) == msg.sender) {
                    if (Util._isLandArmy(_armyId)) {
                        require(_targetTile.terrain != TERRAIN.WATER || Util._canTransportTroop(_targetTile), "CURIO: Cannot move on water");
                    } else {
                        require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
                    }

                    MarchModules._moveModule(_armyId, _targetPos);
                } else {
                    MarchModules._battleBaseModule(_armyId, _targetPos); // will capture and move if conditions are met
                }
            }
        } else {
            if (gs().armyIdMap[_targetTile.occupantId].owner == msg.sender) {
                if (Util._canTransportTroop(_targetTile) && Util._isLandArmy(_armyId)) {
                    // Load troop onto transport
                    MarchModules._loadModule(_armyId, _targetTile);
                    MarchModules._moveModule(_armyId, _targetPos);
                } else {
                    revert("CURIO: Destination tile occupied");
                }
            } else {
                MarchModules._battleTroopModule(_armyId, _targetPos);
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

    /**
     * combine multiple armies into one; move troops from joining army into main army
     * @param _mainArmyId identifier for the army that the others are joining
     * @param _joiningArmyIds identifiers for joining armies
     */
    function combineArmy(uint256 _mainArmyId, uint256[] memory _joiningArmyIds) external {
        // basic check
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");
        require(_joiningArmyIds.length >= 1, "CURIO: Must have at least one joining army");

        Army memory _mainArmy = Util._getArmy(_mainArmyId);
        require(Util._inBound(_mainArmy.pos), "CURIO: Target out of bound");
        if (!Util._getTileAt(_mainArmy.pos).isInitialized) Util._initializeTile(_mainArmy.pos);

        require(_mainArmy.owner == msg.sender, "CURIO: Can only combine own troop");

        // large action check & update
        require((block.timestamp - _mainArmy.lastLargeActionTaken) >= Util._getArmyLargeActionCooldown(_mainArmy.armyTroopIds), "CURIO: Large action taken too recently");
        gs().armyIdMap[_mainArmyId].lastLargeActionTaken = block.timestamp;

        uint256 troopCounter = _mainArmy.armyTroopIds.length;
        require(troopCounter < 5, "CURIO: Army can have at most five troops");

        bool isLandArmy = Util._isLandArmy(_mainArmyId);

        // an army must have up to one troopTransport
        bool hasTransport = Util._getTransportFromArmyTroops(_mainArmy.armyTroopIds) == NULL;
        require((hasTransport && troopCounter < 2) || (!hasTransport && troopCounter < 5), "CURIO: Army can have at most five troops, or two with one transport");

        for (uint256 i = 0; i < _joiningArmyIds.length; i++) {
            uint256 _joiningArmyId = _joiningArmyIds[i];
            require(isLandArmy == Util._isLandArmy(_joiningArmyId), "CURIO: Can only combine army of same type");
            Army memory _joiningArmy = Util._getArmy(_joiningArmyId);

            require(Util._inBound(_mainArmy.pos), "CURIO: Target out of bound");
            if (!Util._getTileAt(_mainArmy.pos).isInitialized) Util._initializeTile(_mainArmy.pos);

            require(_joiningArmy.owner == msg.sender, "CURIO: Can only combine own troop");
            require(Util._withinDist(_mainArmy.pos, _joiningArmy.pos, 1), "CURIO: Combining armies must stay next to each other");

            uint256 _movementCooldown = Util._getArmyMovementCooldown(_joiningArmy.armyTroopIds);
            require((block.timestamp - _joiningArmy.lastMoved) >= _movementCooldown, "CURIO: Moved too recently");

            // large action check & update
            require((block.timestamp - _joiningArmy.lastLargeActionTaken) >= Util._getArmyLargeActionCooldown(_joiningArmy.armyTroopIds), "CURIO: Large action taken too recently");
            gs().armyIdMap[_joiningArmyId].lastLargeActionTaken = block.timestamp;

            troopCounter += _joiningArmy.armyTroopIds.length;
            if (Util._getTransportFromArmyTroops(_mainArmy.armyTroopIds) != NULL) {
                hasTransport == true;
            }
            require((hasTransport && troopCounter < 2) || (!hasTransport && troopCounter < 5), "CURIO: Army can have at most five troops, or two with one transport");

            // combining troops
            for (uint256 j = 0; j < _joiningArmy.armyTroopIds.length; j++) {
                gs().troopIdMap[_joiningArmy.armyTroopIds[j]].armyId = _mainArmyId;
                gs().armyIdMap[_mainArmyId].armyTroopIds.push(_joiningArmy.armyTroopIds[j]);
            }

            Util._removeArmyOnly(_joiningArmyId);
        }
    }

    function detachTroopsFromArmy(
        uint256 _mainArmyId,
        uint256[] memory _leavingTroopIds,
        Position memory _targetPos
    ) external {
        // basic check
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._isPlayerActive(msg.sender), "CURIO: Player is inactive");

        Army memory _mainArmy = Util._getArmy(_mainArmyId);
        require(_mainArmy.owner == msg.sender, "CURIO: Can only detach own troop");
        require(Util._inBound(_targetPos), "CURIO: Target out of bound");
        if (!Util._getTileAt(_targetPos).isInitialized) Util._initializeTile(_targetPos);

        require(_leavingTroopIds.length >= 1 && _leavingTroopIds.length < 5, "CURIO: Army must have at least one troop and at most five troops");
        require(Util._withinDist(_mainArmy.pos, _targetPos, 1), "CURIO: Taget distance beyond 1 tile");

        // large action check & update
        require((block.timestamp - _mainArmy.lastLargeActionTaken) >= Util._getArmyLargeActionCooldown(_mainArmy.armyTroopIds), "CURIO: Large action taken too recently");
        gs().armyIdMap[_mainArmyId].lastLargeActionTaken = block.timestamp;

        uint256 _movementCooldown = Util._getArmyMovementCooldown(_mainArmy.armyTroopIds);
        require((block.timestamp - _mainArmy.lastMoved) >= _movementCooldown, "CURIO: Moved too recently");

        bool leavingTroopshaveTransport = Util._getTransportFromArmyTroops(_leavingTroopIds) != NULL;
        require((leavingTroopshaveTransport && _leavingTroopIds.length <= 2) || !leavingTroopshaveTransport, "CURIO: Army can have at most five troops, or two with one transport");
        Army memory _Newarmy = Army({owner: _mainArmy.owner, armyTroopIds: _leavingTroopIds, lastMoved: block.timestamp, lastLargeActionTaken: block.timestamp, pos: _targetPos});

        // state changes for new army
        uint256 _NewArmyId = gs().armyNonce;
        gs().armyIds.push(_NewArmyId);
        gs().armyNonce++;
        gs().map[_targetPos.x][_targetPos.y].occupantId = _NewArmyId;
        gs().armyIdMap[_NewArmyId] = _Newarmy;

        for (uint256 i = 0; i < _leavingTroopIds.length; i++) {
            // state changes for leaving troops
            Troop memory _troop = gs().troopIdMap[_leavingTroopIds[i]];
            _troop.armyId = _NewArmyId;

            // state changes for main army: clean up leaving troops
            // note: easier here if we make a new map linking troopId with armyId
            uint256 _index = 0;
            while (_index < _mainArmy.armyTroopIds.length) {
                if (_mainArmy.armyTroopIds[_index] == _leavingTroopIds[i]) break;
                _index++;
            }
            gs().armyIdMap[_mainArmyId].armyTroopIds[_index] = _mainArmy.armyTroopIds[_mainArmy.armyTroopIds.length - 1];
            gs().armyIdMap[_mainArmyId].armyTroopIds.pop();
        }
    }
}
