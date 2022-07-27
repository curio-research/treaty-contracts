//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import {BASE_NAME, Base, GameState, Player, Position, TERRAIN, Tile, Troop, TroopType, WorldConstants} from "contracts/libraries/Types.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import {Component} from "contracts/libraries/Component.sol";
import {Set} from "contracts/libraries/Set.sol";

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
                _moveModule(_troopId, _targetPos);
            } else {
                if (Util._getBaseOwner(_targetTile.baseId) == msg.sender) {
                    if (Util._isLandTroop(_troop.troopTypeId)) {
                        require(_targetTile.terrain != TERRAIN.WATER || Util._canTransportTroop(_targetTile), "CURIO: Cannot move on water");
                    } else {
                        require(_targetTile.terrain == TERRAIN.WATER || Util._hasPort(_targetTile), "CURIO: Cannot move on land");
                    }

                    _moveModule(_troopId, _targetPos);
                } else {
                    _battleBaseModule(_troopId, _targetPos); // will capture and move if conditions are met
                }
            }
        } else {
            if (gs().troopIdMap[_targetTile.occupantId].owner == msg.sender) {
                if (Util._canTransportTroop(_targetTile) && Util._isLandTroop(_troop.troopTypeId)) {
                    // Load troop onto transport
                    _loadModule(_troopId, _targetPos);
                    _moveModule(_troopId, _targetPos);
                } else {
                    revert("CURIO: Destination tile occupied");
                }
            } else {
                _battleTroopModule(_troopId, _targetPos);
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

    // ----------------------------------------------------------------------
    // MODULES FOR MARCH
    // ----------------------------------------------------------------------
    function _moveModule(uint256 _troopId, Position memory _targetPos) internal {
        Troop memory _troop = gs().troopIdMap[_troopId];
        Tile memory _targetTile = Util._getTileAt(_targetPos);

        require((block.timestamp - _troop.lastMoved) >= Util._getMovementCooldown(_troop.troopTypeId), "CURIO: Moved too recently");

        if (Util._getTroop(_targetTile.occupantId).cargoTroopIds.length == 0) {
            gs().map[_targetPos.x][_targetPos.y].occupantId = _troopId;
        }

        Tile memory _sourceTile = Util._getTileAt(_troop.pos);
        if (_sourceTile.occupantId != _troopId) {
            // Troop is on troop transport
            Util._unloadTroopFromTransport(_sourceTile.occupantId, _troopId);
        } else {
            gs().map[_troop.pos.x][_troop.pos.y].occupantId = NULL;
        }
        gs().troopIdMap[_troopId].pos = _targetPos;
        gs().troopIdMap[_troopId].lastMoved = block.timestamp;

        uint256[] memory _cargoTroopIds = gs().troopIdMap[_troopId].cargoTroopIds;
        if (_cargoTroopIds.length > 0) {
            // Troop is a troop transport — move its cargo troops
            for (uint256 i = 0; i < _cargoTroopIds.length; i++) {
                gs().troopIdMap[_cargoTroopIds[i]].pos = _targetPos;
            }
        }

        Util._updatePlayerBalances(msg.sender);

        emit Util.Moved(msg.sender, _troopId, block.timestamp, _troop.pos, _targetPos);
    }

    function _loadModule(uint256 _troopId, Position memory _targetPos) internal {
        Tile memory _targetTile = Util._getTileAt(_targetPos);

        // Load troop onto troop transport at target tile
        gs().troopIdMap[_targetTile.occupantId].cargoTroopIds.push(_troopId);
    }

    function _battleBaseModule(uint256 _troopId, Position memory _targetPos) internal {
        Troop memory _troop = gs().troopIdMap[_troopId];
        require(Util._withinDist(_troop.pos, _targetPos, 1), "CURIO: Target not in firing range");
        gs().troopIdMap[_troopId].lastLargeActionTaken = block.timestamp;

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        require(_targetTile.baseId != NULL, "CURIO: No target to attack");

        Base memory _targetBase = gs().baseIdMap[_targetTile.baseId];
        require(_targetBase.owner != msg.sender, "CURIO: Cannot attack own base");
        require(Util._isLandTroop(_troop.troopTypeId) || _targetBase.health > 0 || _targetBase.name == BASE_NAME.OIL_WELL, "CURIO: Can only capture base with land troop");

        // Exchange fire until one side dies
        uint256 _salt = 0;
        while (_troop.health > 0) {
            // Troop attacks target
            _salt += 1;
            if (Util._strike(_targetBase.attackFactor, _salt)) {
                uint256 _damagePerHit = Util._getDamagePerHit(_troop.troopTypeId);
                if (_damagePerHit < _targetBase.health) {
                    _targetBase.health -= _damagePerHit;
                } else {
                    _targetBase.health = 0;
                }
            }

            if (_targetBase.health == 0) break; // target cannot attack back if it has zero health

            // Target attacks troop
            _salt += 1;
            if (Util._strike(_targetBase.defenseFactor, _salt)) {
                if (_troop.health > 1) {
                    _troop.health -= 1;
                } else {
                    _troop.health = 0;
                    Util._removeTroop(_troopId);
                    emit Util.Death(msg.sender, _troopId);
                }
            }
        }

        if (_targetBase.health == 0) {
            // Target base dies
            address _targetPlayer = _targetBase.owner;
            gs().troopIdMap[_troopId].health = _troop.health;
            gs().baseIdMap[_targetTile.baseId].health = 0;

            // Capture and move onto base if troop is infantry or if base is oil well
            if (Util._isLandTroop(_troop.troopTypeId) || _targetBase.name == BASE_NAME.OIL_WELL) {
                require(Util._getPlayer(msg.sender).numOwnedBases < gs().worldConstants.maxBaseCountPerPlayer, "CURIO: Max base count exceeded");

                _targetBase = Util._getBase(_targetTile.baseId);
                gs().baseIdMap[_targetTile.baseId].owner = msg.sender;
                gs().baseIdMap[_targetTile.baseId].health = 1;
                emit Util.BaseCaptured(msg.sender, _troopId, _targetTile.baseId);

                Util._updatePlayerBalances(_targetPlayer);
                Util._updatePlayerBalances(msg.sender);
                if (_targetPlayer != NULL_ADDR) {
                    gs().playerMap[_targetPlayer].numOwnedBases--;
                    gs().playerMap[_targetPlayer].totalGoldGenerationPerUpdate -= _targetBase.goldGenerationPerSecond;
                    gs().playerMap[_targetPlayer].totalOilGenerationPerUpdate -= _targetBase.oilGenerationPerSecond;
                }
                gs().playerMap[msg.sender].numOwnedBases++;
                gs().playerMap[msg.sender].totalGoldGenerationPerUpdate += _targetBase.goldGenerationPerSecond;
                gs().playerMap[msg.sender].totalOilGenerationPerUpdate += _targetBase.oilGenerationPerSecond;

                // Move
                _moveModule(_troopId, _targetPos);
            } else {
                emit Util.AttackedBase(msg.sender, _troopId, _troop, _targetTile.baseId, _targetBase);
            }
        } else {
            // Troop dies
            gs().baseIdMap[_targetTile.baseId].health = _targetBase.health;
            _targetBase = Util._getBase(_targetTile.baseId);

            emit Util.AttackedBase(msg.sender, _troopId, _troop, _targetTile.baseId, _targetBase);
        }
    }

    function _battleTroopModule(uint256 _troopId, Position memory _targetPos) internal {
        Troop memory _troop = gs().troopIdMap[_troopId];
        require(Util._withinDist(_troop.pos, _targetPos, 1), "CURIO: Target not in firing range");
        gs().troopIdMap[_troopId].lastLargeActionTaken = block.timestamp;

        Tile memory _targetTile = Util._getTileAt(_targetPos);
        Troop memory _targetTroop;

        _targetTroop = gs().troopIdMap[_targetTile.occupantId];
        require(_targetTroop.owner != msg.sender, "CURIO: Cannot attack own troop");

        // Exchange fire until one side dies
        uint256 _salt = 0;
        while (_troop.health > 0) {
            // Troop attacks target
            _salt += 1;
            if (Util._strike(Util._getAttackFactor(_targetTroop.troopTypeId), _salt)) {
                uint256 _damagePerHit = Util._getDamagePerHit(_troop.troopTypeId);
                if (_damagePerHit < _targetTroop.health) {
                    _targetTroop.health -= _damagePerHit;
                } else {
                    _targetTroop.health = 0;
                    Util._removeTroop(_targetTile.occupantId);
                    emit Util.Death(_targetTroop.owner, _targetTile.occupantId);
                }
            }

            if (_targetTroop.health == 0) break; // target cannot attack back if it has zero health

            // Target attacks troop
            _salt += 1;
            if (Util._strike(Util._getDefenseFactor(_targetTroop.troopTypeId), _salt)) {
                if (Util._getDamagePerHit(_targetTroop.troopTypeId) < _troop.health) {
                    _troop.health -= Util._getDamagePerHit(_targetTroop.troopTypeId);
                } else {
                    _troop.health = 0;
                    Util._removeTroop(_troopId);
                    emit Util.Death(msg.sender, _troopId);
                }
            }
        }

        if (_targetTroop.health == 0) {
            // Target troop dies
            gs().troopIdMap[_troopId].health = _troop.health;
            _troop = Util._getTroop(_troopId);

            _targetTroop = Util._getTroop(_targetTile.occupantId);

            emit Util.AttackedTroop(msg.sender, _troopId, _troop, _targetTile.occupantId, _targetTroop);
        } else {
            // Troop dies
            gs().troopIdMap[_targetTile.occupantId].health = _targetTroop.health;

            _targetTroop = Util._getTroop(_targetTile.occupantId);

            emit Util.AttackedTroop(msg.sender, _troopId, _troop, _targetTile.occupantId, _targetTroop);
        }
    }

    // ----------------------------------------------------------------------
    // ECS FUNCTIONS (temp)
    // ----------------------------------------------------------------------

    // Question: Is intersection the best way to find entities which satisfy multiple component conditions?
    // Question: Does simplicity outweigh slight obfuscation? e.g. Gold component assigned to both player balance and troop price
    // Question: Should past structs like Base or Troop be their own boolean components? Or should they be differentiated solely from "functional" components such as `canMove`?
    // Question: Should entityId increase with nonce or be randomly generated?
    // Question: How, if possible, can we have more efficient array intersections without creating sets first?
    // Note: TroopType now is just a template Troop, without Owner, Position, or isActive
    function purchaseTroopECS(Position memory _position, uint256 _troopTemplateId) public returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();

        // 1. Verify that parametric entity exists
        require(Set(gs().entities).has(_troopTemplateId), "CURIO: Troop template not found");

        // 2. Verify that game is ongoing
        require(!gs().isPaused, "CURIO: Game is paused");

        // 3. Verify that player is active
        uint256 _playerId = Util.getPlayerId(msg.sender);
        require(Util.getComponent("IsActive").has(_playerId), "CURIO: Player is inactive");

        // 4. Verify that position is in bound, and initialize tile
        require(Util._inBound(_position), "CURIO: Out of bound");
        if (!Util._getTileAt(_position).isInitializedECS) Util.initializeTileECS(_position);

        // 5. Verify that a "base" (aka. an entity which can purchase) is present
        _set1.addArray(Util.getComponent("Position").getEntitiesWithValue(abi.encode(_position)));
        _set2.addArray(Util.getComponent("CanPurchase").getEntities());
        uint256[] memory _intersection = Util.intersection(_set1, _set2);
        require(_intersection.length == 1, "CURIO: No base found");
        uint256 _baseId = _intersection[0];

        // 6. Verify that player owns the "base"
        require(abi.decode(Util.getComponent("Owner").getRawValue(_baseId), (uint256)) == _playerId, "CURIO: Can only purchase in own base");

        // 7. Verify that no "troop" (aka. a movable entity) is present
        _set2 = new Set();
        _set2.addArray(Util.getComponent("CanMove").getEntities());
        require(Util.intersection(_set1, _set2).length == 0, "CURIO: Base occupied by another troop");

        // 8. Verify that the "base" can purchase the given type of "troop"
        if (!Util.getComponent("IsLandTroop").has(_troopTemplateId)) {
            Position[] memory _neighbors = Util._getNeighbors(_position);
            bool _positionAdjacentToWater;
            for (uint256 i = 0; i < _neighbors.length; i++) {
                if (!Util._getTileAt(_neighbors[i]).isInitializedECS) Util.initializeTileECS(_neighbors[i]);
                if (Util._getTileAt(_neighbors[i]).terrain == TERRAIN.WATER) _positionAdjacentToWater = true;
            }
            require(_positionAdjacentToWater, "CURIO: Base cannot purchase selected troop type");
        }

        // 9. Fetch player gold balance and verify sufficience
        Component _goldComponent = Util.getComponent("Gold");
        uint256 _troopGoldPrice = abi.decode(_goldComponent.getRawValue(_troopTemplateId), (uint256));
        uint256 _playerGoldBalance = abi.decode(_goldComponent.getRawValue(_playerId), (uint256));
        require(_playerGoldBalance > _troopGoldPrice, "CURIO: Insufficient gold balance");

        // 10. Set new player gold balance
        _goldComponent.set(_playerId, abi.encode(_playerGoldBalance - _troopGoldPrice));

        // 11. Add troop
        return Util.addTroopEntity(_playerId, _position, _troopTemplateId);
    }

    function initializePlayerECS(Position memory _position, string memory _name) external returns (uint256) {
        Set _set1 = new Set();
        Set _set2 = new Set();

        // Checkers
        require(!gs().isPaused, "CURIO: Game is paused");
        require(Util._getPlayerCount() < gs().worldConstants.maxPlayerCount, "CURIO: Max player count exceeded");
        require(gs().playerIdMap[msg.sender] == NULL, "CURIO: Player already initialized");
        require(Util._inBound(_position), "CURIO: Out of bound");
        if (!Util._getTileAt(_position).isInitializedECS) Util.initializeTileECS(_position);

        // Verify that a "base" (aka. an entity which can purchase) is present
        uint256[] memory _entitiesWithGivenPosition = Util.getComponent("Position").getEntitiesWithValue(abi.encode(_position));
        uint256[] memory _entitiesWithCanPurchase = Util.getComponent("CanPurchase").getEntitiesWithValue(abi.encode(true));
        _set1.addArray(_entitiesWithGivenPosition);
        _set2.addArray(_entitiesWithCanPurchase);
        uint256[] memory _intersection = Util.intersection(_set1, _set2);
        require(_intersection.length == 1, "CURIO: No base found");
        uint256 _baseId = _intersection[0];

        // Verify that base is not taken
        require(!Util.getComponent("Owner").has(_baseId), "CURIO: Base is taken");

        // Spawn player
        WorldConstants memory _worldConstants = gs().worldConstants;
        uint256 _playerId = Util.addEntity();
        Util.addComponentEntityValue("IsActive", _playerId, abi.encode(true));
        Util.addComponentEntityValue("Name", _playerId, abi.encode(_name));
        Util.addComponentEntityValue("Gold", _playerId, abi.encode(_worldConstants.initPlayerGoldBalance));
        Util.addComponentEntityValue("Oil", _playerId, abi.encode(_worldConstants.initPlayerOilBalance));
        Util.addComponentEntityValue("InitTimestamp", _playerId, abi.encode(block.timestamp));
        Util.addComponentEntityValue("BalanceLastUpdated", _playerId, abi.encode(block.timestamp));
        gs().players.push(msg.sender);
        gs().playerIdMap[msg.sender] = _playerId;

        // Transfer base ownership
        Util.getComponent("Owner").set(_baseId, abi.encode(_playerId));

        return _playerId;
    }

    // // example policy: "Troop that has 20 health or above gain 1 more attack"
    // function buffPolicy() {
    //     // QUESTION: isTroop is a strict subset of health. Inefficient intersection
    //     uint256[] troopEntityIDs = gs().entityIntersection("isTroop", "health");

    //     for (uint256 i = 0; i < troopEntityIDs.length; i++) {
    //         troopEntityID = troopEntityIDs[i];
    //         uint256 healthValForEntity = gs().healthEntity().getValue(troopEntityID);

    //         if (healthValForEntity > 20) {
    //             gs().attackFactorComponent().increaseValue();
    //         }
    //     }
    // }

    // // TODO: filter system?
    // // TODO: figure out string system;

    // // ---------------------------------

    // // Use case that is impossible right now !!
    // // turning a base into a moving troop
    // // add movement cooldown component

    // function move(uint256 previousBaseEntityID, Position memory _target) public {
    //     gs().positionComponent().setValue(previousBaseEntityID, _target);
    // }

    // // TODO: FUTURE PROBLEM
    // function addComponent() {
    //     // check name string conflict first
    //     // new Component
    // }
}
