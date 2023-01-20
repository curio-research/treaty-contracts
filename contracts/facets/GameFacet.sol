//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {UseStorage} from "contracts/libraries/Storage.sol";
import {GameLib} from "contracts/libraries/GameLib.sol";
import {ECSLib} from "contracts/libraries/ECSLib.sol";
import {GameMode, Position, WorldConstants} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";
import {Templates} from "contracts/libraries/Templates.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {CurioWallet} from "contracts/standards/CurioWallet.sol";
import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";

/// @title Game facet
/// @notice Contains national functions callable by players

contract GameFacet is UseStorage {
    uint256 private constant NULL = 0;

    // ----------------------------------------------------------
    // GLOBAL FUNCTIONS (CAN BE CALLED BY ANY ADDRESS)
    // ----------------------------------------------------------

    /// @dev Link your main account and burner account
    function authorizeGame(address _burnerAddress) external {
        gs().mainToBurner[msg.sender] = _burnerAddress;
        gs().burnerToMain[_burnerAddress] = msg.sender;
    }

    /**
     * @dev Join the game by founding your nation and capital.
     * @param _position position of the capital
     * @param _name name of the nation
     * @return nationID ID of the nation
     */
    function joinGame(Position memory _position, string memory _name) external returns (uint256 nationID) {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.inboundPositionCheck(_position);
        require(gs().isWhitelistedByGame[msg.sender] || GameLib.getNationCount() < gs().worldConstants.maxNationCount, "CURIO: Player isn't whitelisted and max nation count has been reached");
        require(GameLib.getEntityByAddress(msg.sender) == NULL, "CURIO: Nation is already initialized or have been removed");

        // Verify that capital is not on mountain
        Position memory tilePosition = GameLib.getProperTilePosition(_position);
        uint256 tileID = GameLib.getTileAt(tilePosition);
        GameLib.passableTerrainCheck(tilePosition);

        // Verify that tile can host capital
        require(ECSLib.getBool("CanHostCapital", tileID), "CURIO: Capital cannot be built on this tile");

        // Verify that tile is neutral
        require(ECSLib.getUint("Nation", tileID) == NULL, "CURIO: Tile is unavailable");

        // Verify that no other movable entity is on tile
        require(GameLib.getArmiesAtTile(tilePosition).length == 0, "CURIO: There are other entities on this tile");

        // Remove resource at destination if one exists
        uint256 resourceID = GameLib.getResourceAtTile(tilePosition);
        if (resourceID != NULL) {
            require(ECSLib.getUint("Template", resourceID) != gs().templates["Gold"], "CURIO: Capital cannot be built on a goldmine");
            ECSLib.removeEntity(resourceID);
        }

        // Register nation
        nationID = Templates.addNation(_name, msg.sender);

        // Found capital
        address capitalAddress = address(new CurioWallet(address(this)));
        Templates.addCapital(tilePosition, GameLib.getMidPositionFromTilePosition(tilePosition), nationID, capitalAddress);

        // set Tile Nation
        ECSLib.setUint("Nation", tileID, nationID);

        // Create inventories
        uint256[] memory troopTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("TroopTemplate"));
        for (uint256 i = 0; i < troopTemplateIDs.length; i++) {
            Templates.addInventory(nationID, troopTemplateIDs[i]);
        }
        uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
        for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
            Templates.addInventory(nationID, resourceTemplateIDs[i]);
        }

        // Delegate functions to nation and diamond
        string[] memory functionNames = gs().gameFunctionNames;
        for (uint256 i; i < functionNames.length; i++) {
            Templates.addDelegation(functionNames[i], nationID, nationID, 0);
        }

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Register a new treaty template for the game.
     * @param _address deployed treaty address
     * @param _abiHash treaty abi hash
     * @param _metadataLink treaty metadata link
     * @return treatyTemplateID registered treaty template entity
     * @notice Both admin and players can call this function.
     *         There is currently no notion of "creator" for treaty templates.
     */
    function registerTreatyTemplate(
        address _address,
        string memory _abiHash,
        string memory _metadataLink
    ) external returns (uint256 treatyTemplateID) {
        // Basic checks
        GameLib.ongoingGameCheck();

        // Fetch treaty name and description
        CurioTreaty treaty = CurioTreaty(_address);
        string memory _name = treaty.name();
        string memory _description = treaty.description();
        require(!GameLib.strEq(_name, ""), "CURIO: Treaty name cannot be empty");
        require(gs().templates[_name] == 0, "CURIO: A treaty with this name already exists, try renaming");

        // Register treaty template
        treatyTemplateID = Templates.addTreatyTemplate(_address, _name, _description, _abiHash, _metadataLink);
        gs().templates[_name] = treatyTemplateID;
    }

    // ----------------------------------------------------------
    // CAPITAL
    // ----------------------------------------------------------

    /**
     * @dev Upgrade your capital.
     * @param _capitalID ID of the capital
     */
    function upgradeCapital(uint256 _capitalID) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_capitalID);
        uint256 nationID = ECSLib.getUint("Nation", _capitalID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("UpgradeCapital", nationID, callerID, _capitalID);
            GameLib.treatyApprovalCheck("UpgradeCapital", nationID, abi.encode(callerID, _capitalID));
        }

        // Check if nation has reached maxCapitalLevel
        uint256 capitalLevel = ECSLib.getUint("Level", _capitalID);
        require(capitalLevel < gs().worldConstants.maxCapitalLevel, "CURIO: You've reached the max capital level");

        // Check sack
        GameLib.capitalSackRecoveryCheck(_capitalID);

        // check if capital upgrade is in process
        require(block.timestamp >= ECSLib.getUint("LastUpgraded", _capitalID), "CURIO: Ongoing upgrade. Wait until it finishes");

        // Verify there's no ongoing troop production
        require(GameLib.getBuildingProduction(_capitalID) == NULL, "CURIO: Harvest ongoing production first before upgrade");

        // Deduct costs from capital
        {
            address capitalAddress = ECSLib.getAddress("Address", _capitalID);
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                uint256 inventoryID = GameLib.getInventory(_capitalID, resourceTemplateIDs[i]);
                uint256 balance = ECSLib.getUint("Amount", inventoryID);
                uint256 cost = GameLib.getGameParameter("Capital", ECSLib.getString("Name", resourceTemplateIDs[i]), "Cost", "Upgrade", capitalLevel);

                require(balance >= cost, "CURIO: Insufficient balance");

                resourceToken.destroyToken(capitalAddress, cost);
            }
        }

        // Harvest Existing Resources
        harvestResourcesFromCapital(_capitalID);

        // Update timestamp to when upgrade is finished
        ECSLib.setUint("LastUpgraded", _capitalID, block.timestamp + GameLib.getGameParameter("Capital", "", "Cooldown", "Upgrade", capitalLevel));

        // Set new level
        ECSLib.setUint("Level", _capitalID, capitalLevel + 1);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Move your capital to a new tile.
     * @param _capitalID ID of the capital
     * @param _newTilePosition tile position of the new tile
     */
    function moveCapital(uint256 _capitalID, Position memory _newTilePosition) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_capitalID);
        GameLib.inboundPositionCheck(_newTilePosition);
        GameLib.passableTerrainCheck(_newTilePosition);
        uint256 nationID = ECSLib.getUint("Nation", _capitalID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("MoveCapital", nationID, callerID, _capitalID);
            GameLib.treatyApprovalCheck("MoveCapital", nationID, abi.encode(callerID, _capitalID, _newTilePosition));
        }

        // Battle royale check
        if (gs().worldConstants.gameMode == GameMode.BATTLE_ROYALE) {
            require(!GameLib.coincident(_newTilePosition, GameLib.getMapCenterTilePosition()), "CURIO: Capital cannot be built on the center tile");
        }

        // Verify that target tile can host capital
        require(ECSLib.getBool("CanHostCapital", GameLib.getTileAt(_newTilePosition)), "CURIO: This tile cannot host capital");

        // Capital at chaos cannot move
        GameLib.capitalSackRecoveryCheck(_capitalID);

        // Verify that target tile belongs to nation
        require(ECSLib.getUint("Nation", GameLib.getTileAt(_newTilePosition)) == nationID, "CURIO: You can only move within your own territory");

        // Verify that moveCapital cooldown has passed
        uint256 capitalLevel = ECSLib.getUint("Level", _capitalID);
        require(block.timestamp - ECSLib.getUint("LastMoved", _capitalID) > GameLib.getGameParameter("Capital", "", "Cooldown", "Move", capitalLevel), "CURIO: You moved capital too recently");

        // Deduct costs from capital
        {
            address capitalAddress = ECSLib.getAddress("Address", _capitalID);
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                uint256 balance = ECSLib.getUint("Amount", GameLib.getInventory(_capitalID, resourceTemplateIDs[i]));
                uint256 cost = GameLib.getGameParameter("Capital", ECSLib.getString("Name", resourceTemplateIDs[i]), "Cost", "Move", capitalLevel);
                require(balance >= cost, "CURIO: Insufficient balance");

                resourceToken.destroyToken(capitalAddress, cost);
            }
        }

        // Remove resource at target tile and restore Level 0 farm at current tile
        {
            uint256 resourceID = GameLib.getResourceAtTile(_newTilePosition);
            if (resourceID != NULL) {
                require(ECSLib.getUint("Template", resourceID) != gs().templates["Gold"], "CURIO: Cannot settle on goldmine");
                ECSLib.removeEntity(resourceID);
            }
            uint256 tileID = GameLib.getTileAt(_newTilePosition);
            ECSLib.setUint("Terrain", tileID, 0);

            Templates.addResource(gs().templates["Food"], ECSLib.getPosition("StartPosition", _capitalID), nationID);
        }

        // Set timestamp
        ECSLib.setUint("LastMoved", _capitalID, block.timestamp);

        // Move capital
        ECSLib.setPosition("StartPosition", _capitalID, _newTilePosition);
        ECSLib.setPosition("Position", _capitalID, GameLib.getMidPositionFromTilePosition(_newTilePosition));

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    // ----------------------------------------------------------
    // TILE
    // ----------------------------------------------------------

    /**
     * @dev Claim a tile for your nation.
     * @param _armyID ID of the army
     * @param _tileID ID of the tile
     */
    function claimTile(uint256 _armyID, uint256 _tileID) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_armyID);
        GameLib.validEntityCheck(_tileID);
        uint256 nationID = ECSLib.getUint("Nation", _armyID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("ClaimTile", nationID, callerID, _armyID);
            GameLib.treatyApprovalCheck("ClaimTile", nationID, abi.encode(callerID, _armyID, _tileID));
        }

        // Check Tile Count has not exceeded limits
        uint256 capitalID = GameLib.getCapital(nationID);
        require(GameLib.getNationTiles(nationID).length < GameLib.getGameParameter("Nation", "Tile", "Amount", "", ECSLib.getUint("Level", capitalID)), "CURIO: You've reached max tile count. Try upgrading your capital");

        // Verify target tile has no owner
        require(ECSLib.getUint("Nation", _tileID) == NULL, "CURIO: This tile belongs to another player");

        // Verify target tile is not barbarian tile
        require(!GameLib.isBarbarian(_tileID), "CURIO: This tile has a barbarian. You cannot claim it");

        // Verify that no guard exists on tile
        require(ECSLib.getUint("Amount", GameLib.getInventory(_tileID, gs().templates["Guard"])) == 0, "CURIO: Tile has tile defenders left");

        // Verify that army is on selected tile
        Position memory tilePosition = ECSLib.getPosition("StartPosition", _tileID);
        require(GameLib.coincident(GameLib.getProperTilePosition(ECSLib.getPosition("Position", _armyID)), tilePosition), "CURIO: Army must be on tile to claim");

        // Verify that tile is next to own tile
        require(GameLib.isAdjacentToOwnTile(nationID, tilePosition), "CURIO: You can only claim tiles next to your other tiles");

        // Verify that all armies on tile belong to nation
        uint256[] memory armiesOnTile = GameLib.getArmiesAtTile(tilePosition);
        for (uint256 i = 0; i < armiesOnTile.length; i++) {
            require(ECSLib.getUint("Nation", armiesOnTile[i]) == nationID, "CURIO: You cannot claim tiles with enemy armies");
        }

        // Transfer ownership of tile and initialize new guard
        ECSLib.setUint("Nation", _tileID, nationID);
        uint256 tileGuardAmount = GameLib.getGameParameter("Tile", "Guard", "Amount", "", ECSLib.getUint("Level", _tileID));
        CurioERC20 guardToken = GameLib.getTokenContract("Guard");
        guardToken.dripToken(ECSLib.getAddress("Address", _tileID), tileGuardAmount);

        // Transfer ownership of resource
        uint256 resourceID = GameLib.getResourceAt(tilePosition);
        ECSLib.setUint("Nation", resourceID, nationID);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Upgrade a tile of yours to increase its defense.
     * @param _tileID ID of the tile
     */
    function upgradeTile(uint256 _tileID) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_tileID);
        uint256 nationID = ECSLib.getUint("Nation", _tileID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("UpgradeTile", nationID, callerID, _tileID);
            GameLib.treatyApprovalCheck("UpgradeTile", nationID, abi.encode(callerID, _tileID));
        }

        // Check if nation has reached max tile level
        uint256 tileLevel = ECSLib.getUint("Level", _tileID);
        uint256 capitalID = GameLib.getCapital(ECSLib.getUint("Nation", _tileID));
        require(tileLevel < ECSLib.getUint("Level", capitalID) * gs().worldConstants.capitalLevelToEntityLevelRatio, "CURIO: Max tile level reached");

        GameLib.capitalSackRecoveryCheck(capitalID);

        // Require nations to fully recover the tile before upgrade
        address tileAddress = ECSLib.getAddress("Address", _tileID);
        CurioERC20 guardToken = GameLib.getTokenContract("Guard");
        uint256 guardAmount = ECSLib.getUint("Amount", GameLib.getInventory(nationID, gs().templates["Guard"]));
        require(GameLib.getGameParameter("Tile", "Guard", "Amount", "", tileLevel) == guardAmount, "CURIO: You must recover tile before upgrading");

        // check if upgrade is in process
        require(block.timestamp >= ECSLib.getUint("LastUpgraded", _tileID), "CURIO: Need to finish upgrading first");

        // Deduct costs from capital
        {
            address capitalAddress = ECSLib.getAddress("Address", GameLib.getCapital(nationID));
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                uint256 balance = ECSLib.getUint("Amount", GameLib.getInventory(capitalID, resourceTemplateIDs[i]));
                uint256 cost = GameLib.getGameParameter("Tile", ECSLib.getString("Name", resourceTemplateIDs[i]), "Cost", "Upgrade", tileLevel);
                require(balance >= cost, "CURIO: Insufficient balance");

                resourceToken.destroyToken(capitalAddress, cost);
            }
        }

        // set timestamp
        ECSLib.setUint("LastUpgraded", _tileID, block.timestamp + GameLib.getGameParameter("Tile", "", "Cooldown", "Upgrade", tileLevel));

        // Upgrade tile defense and level
        uint256 newGuardAmount = GameLib.getGameParameter("Tile", "Guard", "Amount", "", tileLevel + 1);
        ECSLib.setUint("Level", _tileID, tileLevel + 1);
        guardToken.dripToken(tileAddress, newGuardAmount - guardAmount);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Recover a tile of yours to its max defense.
     * @param _tileID ID of the tile
     */
    function recoverTile(uint256 _tileID) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_tileID);
        uint256 nationID = ECSLib.getUint("Nation", _tileID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("RecoverTile", nationID, callerID, _tileID);
            GameLib.treatyApprovalCheck("RecoverTile", nationID, abi.encode(callerID, _tileID));
        }

        // Check tile has past cooldown period for upgrade and recovery
        require(block.timestamp >= ECSLib.getUint("LastUpgraded", _tileID), "CURIO: Need to finish upgrading first");
        require(block.timestamp >= ECSLib.getUint("LastRecovered", _tileID), "CURIO: Need to finish recovering first");

        // lost tile amount = current level amount - actual amount
        address tileAddress = ECSLib.getAddress("Address", _tileID);
        CurioERC20 guardToken = GameLib.getTokenContract("Guard");
        uint256 tileLevel = ECSLib.getUint("Level", _tileID);
        uint256 lostGuardAmount = GameLib.getGameParameter("Tile", "Guard", "Amount", "", tileLevel) - ECSLib.getUint("Amount", GameLib.getInventory(_tileID, gs().templates["Guard"]));

        // Deduct costs from capital
        {
            address capitalAddress = ECSLib.getAddress("Address", GameLib.getCapital(nationID));
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                uint256 balance = ECSLib.getUint("Amount", GameLib.getInventory(nationID, resourceTemplateIDs[i]));
                uint256 totalRecoverCost = GameLib.getGameParameter("Tile", ECSLib.getString("Name", resourceTemplateIDs[i]), "Cost", "Upgrade", 0) * lostGuardAmount;
                require(balance >= totalRecoverCost, "CURIO: Insufficient balance");

                resourceToken.destroyToken(capitalAddress, totalRecoverCost);
            }
        }

        // Verify that capital has recovered from sack
        GameLib.capitalSackRecoveryCheck(GameLib.getCapital(nationID));

        // Set timestamp
        ECSLib.setUint("LastRecovered", _tileID, block.timestamp + GameLib.getGameParameter("Tile", "", "Cooldown", "Recover", tileLevel));

        // Recover the tile
        guardToken.dripToken(tileAddress, lostGuardAmount);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Disown a tile of yours.
     * @param _tileID ID of the tile
     */
    function disownTile(uint256 _tileID) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_tileID);
        uint256 nationID = ECSLib.getUint("Nation", _tileID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("DisownTile", nationID, callerID, _tileID);
            GameLib.treatyApprovalCheck("DisownTile", nationID, abi.encode(callerID, _tileID));
        }

        // Verify that capital is not on tile
        Position memory tilePosition = ECSLib.getPosition("StartPosition", _tileID);
        require(!GameLib.coincident(tilePosition, ECSLib.getPosition("StartPosition", GameLib.getCapital(ECSLib.getUint("Nation", _tileID)))), "CURIO: Cannot abandon capital");

        // Verify that tile is not during recover or upgrade
        require(block.timestamp > ECSLib.getUint("LastUpgraded", _tileID), "CURIO: Need to finish upgrading first");
        require(block.timestamp > ECSLib.getUint("LastRecovered", _tileID), "CURIO: Need to finish recovering first");

        // End gather processes on tile
        uint256[] memory movableEntitiesOnTile = GameLib.getArmiesAtTile(tilePosition);
        for (uint256 i = 0; i < movableEntitiesOnTile.length; i++) {
            uint256 gatherID = GameLib.getArmyGather(movableEntitiesOnTile[i]);
            if (gatherID != NULL) GameLib.endGather(movableEntitiesOnTile[i]);
        }

        // TODO: deduct resources from, or return resources to, nation inventory

        // Disown tile
        ECSLib.setUint("Nation", _tileID, NULL);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    // ----------------------------------------------------------
    // TROOP PRODUCTION
    // ----------------------------------------------------------

    /**
     * @dev Start producing troops at your capital.
     * @param _capitalID ID of the capital
     * @param _templateID ID of the troop template to produce
     * @param _amount Amount of troops to produce
     */
    function startTroopProduction(
        uint256 _capitalID,
        uint256 _templateID,
        uint256 _amount
    ) external returns (uint256 productionID) {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_capitalID);
        GameLib.validEntityCheck(_templateID);
        uint256 nationID = ECSLib.getUint("Nation", _capitalID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("StartTroopProduction", nationID, callerID, _capitalID);
            GameLib.treatyApprovalCheck("StartTroopProduction", nationID, abi.encode(callerID, _capitalID, _templateID, _amount));
        }

        // Verify no upgrades in process
        require(block.timestamp >= ECSLib.getUint("LastUpgraded", _capitalID), "CURIO: Need to finish upgrading first");

        // Verify sack
        GameLib.capitalSackRecoveryCheck(_capitalID);

        // Verify that capital can produce
        require(ECSLib.getBool("CanProduce", _capitalID), "CURIO: Capital cannot produce");

        // Deduct costs
        {
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                uint256 balance = ECSLib.getUint("Amount", GameLib.getInventory(_capitalID, resourceTemplateIDs[i]));
                uint256 cost = _amount * GameLib.getGameParameter("Troop Production", ECSLib.getString("Name", resourceTemplateIDs[i]), "Cost", "", 0);
                require(balance >= cost, "CURIO: Insufficient balance");

                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                resourceToken.destroyToken(ECSLib.getAddress("Address", _capitalID), cost);
            }
        }

        // Verify no ongoing production
        require(GameLib.getBuildingProduction(_capitalID) == NULL, "CURIO: Must end ongoing production first");

        // Start production
        productionID = Templates.addTroopProduction(_capitalID, _templateID, _amount, (gs().worldConstants.secondsToTrainAThousandTroops * _amount) / 1000);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Finish troop production at your capital when it's ready.
     * @param _capitalID ID of the capital
     */
    function endTroopProduction(uint256 _capitalID) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_capitalID);
        uint256 nationID = ECSLib.getUint("Nation", _capitalID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("EndTroopProduction", nationID, callerID, _capitalID);
            GameLib.treatyApprovalCheck("EndTroopProduction", nationID, abi.encode(callerID, _capitalID));
        }

        // Verify no upgrades in process
        require(block.timestamp > ECSLib.getUint("LastUpgraded", _capitalID), "CURIO: Need to finish upgrading first");

        // capital at chaos cannot collect troops
        GameLib.capitalSackRecoveryCheck(_capitalID);

        // Find production
        uint256 productionID = GameLib.getBuildingProduction(_capitalID);
        require(productionID != NULL, "CURIO: No ongoing production");

        // Verify that enough time has passed for the given amount
        require(block.timestamp >= (ECSLib.getUint("InitTimestamp", productionID) + ECSLib.getUint("Duration", productionID)), "CURIO: Production needs more time to finish");

        // Update inventory
        CurioERC20 troopToken = CurioERC20(ECSLib.getAddress("Address", ECSLib.getUint("Template", productionID)));
        address capitalAddress = ECSLib.getAddress("Address", _capitalID);
        troopToken.dripToken(capitalAddress, ECSLib.getUint("Amount", productionID));

        // Delete production
        ECSLib.removeEntity(productionID);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    // ----------------------------------------------------------
    // ARMY
    // ----------------------------------------------------------

    /**
     * @dev Move an army of yours to a new position.
     * @param _armyID ID of the army
     * @param _targetPosition position to move to
     */
    function move(uint256 _armyID, Position memory _targetPosition) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_armyID);
        GameLib.inboundPositionCheck(_targetPosition);
        uint256 nationID = ECSLib.getUint("Nation", _armyID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("Move", nationID, callerID, _armyID);
            GameLib.treatyApprovalCheck("Move", nationID, abi.encode(callerID, _armyID, _targetPosition));
        }

        // Check terrain
        Position memory tilePosition = GameLib.getProperTilePosition(_targetPosition);
        GameLib.passableTerrainCheck(tilePosition);

        // Verify no other movable entity at exact destination coordinate
        require(GameLib.getMovableEntityAt(_targetPosition) == NULL, "CURIO: Destination occupied by a unit");

        // Check movement cooldown
        require(block.timestamp >= ECSLib.getUint("LastMoved", _armyID) + ECSLib.getUint("MoveCooldown", _armyID), "CURIO: Moved too recently");

        // Army cannot move in enemy territory
        uint256 tileID = GameLib.getTileAt(tilePosition);
        GameLib.neutralOrOwnedTileCheck(tileID, nationID);

        // Verify that target tile is not locked
        require(!ECSLib.getBool("IsLocked", tileID), "CURIO: Target tile is locked");

        // Verify no gather
        require(GameLib.getArmyGather(_armyID) == NULL, "CURIO: Need to end gather first");

        // Calculate distance
        uint256 distance = GameLib.euclidean(ECSLib.getPosition("Position", _armyID), _targetPosition);
        require(distance <= ECSLib.getUint("Speed", _armyID), "CURIO: You're trying to move too far!");

        // Move and update moveCooldown
        ECSLib.setPosition("Position", _armyID, _targetPosition);
        ECSLib.setPosition("StartPosition", _armyID, tilePosition);
        ECSLib.setUint("LastMoved", _armyID, block.timestamp);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Organize an army of troops.
     * @param _capitalID ID of the capital
     * @param _templateIDs IDs of the troop templates to organize in the army
     * @param _amounts amounts of each troop template
     */
    function organizeArmy(
        uint256 _capitalID,
        uint256[] memory _templateIDs,
        uint256[] memory _amounts
    ) external returns (uint256 armyID) {
        // Basic checks
        GameLib.validEntityCheck(_capitalID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _capitalID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("OrganizeArmy", nationID, callerID, _capitalID);
            GameLib.treatyApprovalCheck("OrganizeArmy", nationID, abi.encode(callerID, _capitalID, _templateIDs, _amounts));
        }

        // Verify there is no army currently at the capital
        Position memory tilePosition = ECSLib.getPosition("StartPosition", _capitalID);
        Position memory midPosition = GameLib.getMidPositionFromTilePosition(tilePosition);
        require(GameLib.getArmyAt(midPosition) == NULL, "CURIO: Capital occupied by another army");

        // Capital at Chaos cannot organize an army
        GameLib.capitalSackRecoveryCheck(_capitalID);

        // Check army cap
        require(GameLib.getNationArmies(nationID).length < gs().worldConstants.maxArmyCountPerNation, "CURIO: Max number of armies reached");

        // Add army
        address armyAddress = address(new CurioWallet(address(this)));
        armyID = Templates.addArmy(2, 1, 2, gs().worldConstants.tileWidth, nationID, midPosition, tilePosition, armyAddress);

        // Collect army traits from individual troop types & transfer troops from nation
        uint256 load = 0; // sum
        address capitalAddress = ECSLib.getAddress("Address", _capitalID);

        require(_templateIDs.length == _amounts.length, "CURIO: Input lengths do not match");
        require(_templateIDs.length > 0, "CURIO: Your army must have at least 1 troop");

        // Transfer troops from capital to army
        for (uint256 i = 0; i < _templateIDs.length; i++) {
            CurioERC20 troopToken = CurioERC20(ECSLib.getAddress("Address", _templateIDs[i]));

            load += ECSLib.getUint("Load", _templateIDs[i]) * _amounts[i];
            troopToken.transferFrom(capitalAddress, armyAddress, _amounts[i]);
        }

        // Edit army traits
        ECSLib.setUint("Load", armyID, load);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Disband an army.
     * @param _armyID ID of the army
     */
    function disbandArmy(uint256 _armyID) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_armyID);
        uint256 nationID = ECSLib.getUint("Nation", _armyID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("DisbandArmy", nationID, callerID, _armyID);
            GameLib.treatyApprovalCheck("DisbandArmy", nationID, abi.encode(callerID, _armyID));
        }

        // Verify tile ownership
        Position memory armyPosition = ECSLib.getPosition("Position", _armyID);
        Position memory armyStartPosition = GameLib.getProperTilePosition(armyPosition);

        // Verify that army is on capital tile
        uint256 capitalID = GameLib.getCapital(nationID);
        require(GameLib.coincident(ECSLib.getPosition("StartPosition", capitalID), armyStartPosition), "CURIO: Bring army to your capital to disband");

        // Return carried resources to capital
        address capitalAddress = ECSLib.getAddress("Address", capitalID);
        address armyAddress = ECSLib.getAddress("Address", _armyID);
        GameLib.unloadResources(capitalAddress, armyAddress);

        // Return troops to corresponding inventories and disband army
        GameLib.disbandArmy(capitalAddress, armyAddress);
        ECSLib.removeEntity(_armyID);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Battle for one round against an enemy army, tile, or capital tile.
     * @param _armyID army entity
     * @param _targetID target entity
     */
    function battle(uint256 _armyID, uint256 _targetID) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_armyID);
        GameLib.validEntityCheck(_targetID);
        uint256 nationID = ECSLib.getUint("Nation", _armyID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("Battle", nationID, callerID, _armyID);
            GameLib.treatyApprovalCheck("Battle", nationID, abi.encode(callerID, _armyID, _targetID));
        }

        // Verify that army and target can battle
        require(ECSLib.getBool("CanBattle", _armyID), "CURIO: Army cannot battle");
        require(ECSLib.getBool("CanBattle", _targetID), "CURIO: Target cannot be battled");

        // Verify that entities belong to different nations
        require(ECSLib.getUint("Nation", _targetID) != nationID, "CURIO: You cannot battle your own entity");

        // Check battle cooldown and update last timestamp
        require(block.timestamp >= ECSLib.getUint("LastAttacked", _armyID) + ECSLib.getUint("BattleCooldown", _armyID), "CURIO: Army battled too recently");
        ECSLib.setUint("LastAttacked", _armyID, block.timestamp);

        // End army's gather
        if (GameLib.getArmyGather(_armyID) != NULL) GameLib.endGather(_armyID);

        // Trigger corresponding battle based on target entity tag
        if (GameLib.strEq(ECSLib.getString("Tag", _targetID), "Army")) {
            GameLib.battleArmy(_armyID, _targetID);
        } else if (GameLib.strEq(ECSLib.getString("Tag", _targetID), "Tile")) {
            GameLib.battleTile(_armyID, _targetID);
        }

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    // ----------------------------------------------------------
    // RESOURCE COLLECTION
    // ----------------------------------------------------------

    /**
     * @dev Start gathering a resource using an army of yours.
     * @param _armyID ID of army
     * @param _resourceID ID of resource to collect
     */
    function startGather(uint256 _armyID, uint256 _resourceID) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_armyID);
        GameLib.validEntityCheck(_resourceID);
        uint256 nationID = ECSLib.getUint("Nation", _armyID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("StartGather", nationID, callerID, _armyID);
            GameLib.treatyApprovalCheck("StartGather", nationID, abi.encode(callerID, _armyID, _resourceID));
        }

        // Verify that army is sitting on the resource
        Position memory startPosition = GameLib.getProperTilePosition(ECSLib.getPosition("Position", _armyID));
        require(GameLib.coincident(startPosition, ECSLib.getPosition("StartPosition", _resourceID)), "CURIO: Army must be on resource tile");

        // Verify that the resource level is greater than zero, meaning that a gold mine has "been built".
        require(ECSLib.getUint("Level", _resourceID) == 0, "CURIO: Resource already upgraded");

        // Verify that resource is not in another nation's territory
        uint256 tileID = GameLib.getTileAt(startPosition);
        GameLib.neutralOrOwnedTileCheck(tileID, ECSLib.getUint("Nation", _armyID));

        // Cannot gather twice
        require(GameLib.getArmyGather(_armyID) == NULL, "CURIO: You must finish the existing gather first");

        Templates.addResourceGather(startPosition, _resourceID, _armyID);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev End gathering a resource.
     * @param _armyID ID of army
     */
    function endGather(uint256 _armyID) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_armyID);
        uint256 nationID = ECSLib.getUint("Nation", _armyID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("EndGather", nationID, callerID, _armyID);
            GameLib.treatyApprovalCheck("EndGather", nationID, abi.encode(callerID, _armyID));
        }

        // End gather
        GameLib.endGather(_armyID);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Unload gathered resources from your army to your capital.
     * @param _armyID ID of army
     */
    function unloadResources(uint256 _armyID) external {
        // Basic checks
        GameLib.validEntityCheck(_armyID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _armyID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("UnloadResources", nationID, callerID, _armyID);
            GameLib.treatyApprovalCheck("UnloadResources", nationID, abi.encode(callerID, _armyID));
        }

        // Verify tile ownership
        Position memory startPosition = ECSLib.getPosition("StartPosition", _armyID);

        // Verify that army is in capital tile
        uint256 capitalID = GameLib.getCapital(nationID);
        require(GameLib.coincident(ECSLib.getPosition("StartPosition", capitalID), startPosition), "CURIO: Must be on capital to unload");

        // Army cannot unload resources to chaotic capital
        GameLib.capitalSackRecoveryCheck(capitalID);

        // Return carried resources to capital
        address capitalAddress = ECSLib.getAddress("Address", capitalID);
        GameLib.unloadResources(capitalAddress, ECSLib.getAddress("Address", _armyID));

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Harvest a resource of your own.
     * @param _resourceID ID of resource
     */
    function harvestResource(uint256 _resourceID) public {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_resourceID);
        uint256 nationID = ECSLib.getUint("Nation", _resourceID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("HarvestResource", nationID, callerID, _resourceID);
            GameLib.treatyApprovalCheck("HarvestResource", nationID, abi.encode(callerID, _resourceID));
        }

        // Capital at chaos cannot harvest resources
        GameLib.capitalSackRecoveryCheck(GameLib.getCapital(nationID));

        // Verify that the resource level is greater than zero, meaning that a tool has "been built".
        uint256 resourceLevel = ECSLib.getUint("Level", _resourceID);
        require(resourceLevel > 0, "CURIO: Need to upgrade resource to harvest");

        // Verify upgrade not in process
        uint256 templateID = ECSLib.getUint("Template", _resourceID);
        string memory buildingType = templateID == gs().templates["Gold"] ? "Goldmine" : "Farm";
        require(block.timestamp >= ECSLib.getUint("LastUpgraded", _resourceID), "CURIO: Need to finish upgrading first");

        // Verify can harvest
        require(block.timestamp >= ECSLib.getUint("LastHarvested", _resourceID), "CURIO: Need more time to harvest");

        // Get harvest amount
        uint256 harvestRate = GameLib.getGameParameter(buildingType, ECSLib.getString("Name", templateID), "Yield", "", resourceLevel);
        uint256 harvestAmount = (block.timestamp - ECSLib.getUint("LastHarvested", _resourceID)) * harvestRate;
        uint256 harvestLoad = GameLib.getGameParameter(buildingType, ECSLib.getString("Name", ECSLib.getUint("Template", _resourceID)), "Load", "", resourceLevel);

        harvestAmount = GameLib.min(harvestLoad, harvestAmount);

        // Update last harvest
        ECSLib.setUint("LastHarvested", _resourceID, block.timestamp);

        // Update capital inventory amount
        address capitalAddress = ECSLib.getAddress("Address", GameLib.getCapital(nationID));
        CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", templateID));
        resourceToken.dripToken(capitalAddress, harvestAmount);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Harvest resources produced by your capital.
     * @param _capitalID ID of capital
     */
    function harvestResourcesFromCapital(uint256 _capitalID) public {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_capitalID);
        uint256 nationID = ECSLib.getUint("Nation", _capitalID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("HarvestResourcesFromCapital", nationID, callerID, _capitalID);
            GameLib.treatyApprovalCheck("HarvestResourcesFromCapital", nationID, abi.encode(callerID, _capitalID));
        }

        // Verify sack
        GameLib.capitalSackRecoveryCheck(_capitalID);

        // Verify it's not being upgraded; note: capital level is same as nation level here
        uint256 capitalLevel = ECSLib.getUint("Level", _capitalID);
        if (capitalLevel < gs().worldConstants.maxCapitalLevel) {
            require(block.timestamp >= ECSLib.getUint("LastUpgraded", _capitalID), "CURIO: Need to finish upgrading first");
        }

        // Verify can harvest
        require(block.timestamp >= ECSLib.getUint("LastHarvested", _capitalID), "CURIO: Need more time to harvest");

        // Create inventory if none exists
        {
            address capitalAddress = ECSLib.getAddress("Address", _capitalID);
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));
            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                uint256 harvestRate = GameLib.getGameParameter("Capital", ECSLib.getString("Name", resourceTemplateIDs[i]), "Yield", "", capitalLevel);
                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                uint256 harvestAmount = (block.timestamp - ECSLib.getUint("LastHarvested", _capitalID)) * harvestRate;
                uint256 harvestLoad = GameLib.getGameParameter("Capital", ECSLib.getString("Name", resourceTemplateIDs[i]), "Load", "", capitalLevel);

                harvestAmount = GameLib.min(harvestLoad, harvestAmount);

                resourceToken.dripToken(capitalAddress, harvestAmount);
            }
        }

        // Reset harvest time
        ECSLib.setUint("LastHarvested", _capitalID, block.timestamp);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    /**
     * @dev Upgrade a resource of yours.
     * @param _resourceID ID of resource
     */
    function upgradeResource(uint256 _resourceID) public {
        // Basic checks
        GameLib.validEntityCheck(_resourceID);
        GameLib.ongoingGameCheck();
        uint256 nationID = ECSLib.getUint("Nation", _resourceID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("UpgradeResource", nationID, callerID, _resourceID);
            GameLib.treatyApprovalCheck("UpgradeResource", nationID, abi.encode(callerID, _resourceID));
        }

        // Check if nation has reached max tile level
        uint256 capitalID = GameLib.getCapital(nationID);
        require(ECSLib.getUint("Level", _resourceID) < ECSLib.getUint("Level", capitalID) * gs().worldConstants.capitalLevelToEntityLevelRatio, "CURIO: Need to upgrade nation first");

        // check if upgrade is in process
        string memory subject = ECSLib.getUint("Template", _resourceID) == gs().templates["Gold"] ? "Goldmine" : "Farm";
        require(block.timestamp >= ECSLib.getUint("LastUpgraded", _resourceID), "CURIO: Need to finish upgrading first");

        // Deduct costs from capital
        uint256 resourceLevel = ECSLib.getUint("Level", _resourceID);
        {
            address capitalAddress = ECSLib.getAddress("Address", capitalID);
            uint256[] memory resourceTemplateIDs = ECSLib.getStringComponent("Tag").getEntitiesWithValue(string("ResourceTemplate"));

            for (uint256 i = 0; i < resourceTemplateIDs.length; i++) {
                CurioERC20 resourceToken = CurioERC20(ECSLib.getAddress("Address", resourceTemplateIDs[i]));
                uint256 balance = ECSLib.getUint("Amount", GameLib.getInventory(capitalID, resourceTemplateIDs[i]));
                uint256 cost = GameLib.getGameParameter(subject, ECSLib.getString("Name", resourceTemplateIDs[i]), "Cost", "Upgrade", resourceLevel);
                require(balance >= cost, "CURIO: Insufficient balance");

                resourceToken.destroyToken(capitalAddress, cost);
            }
        }

        // Harvest resource before upgrade
        if (resourceLevel > 0) harvestResource(_resourceID);

        // Set timestamp
        ECSLib.setUint("LastUpgraded", _resourceID, block.timestamp + GameLib.getGameParameter(subject, "", "Cooldown", "Upgrade", resourceLevel));

        // Set new level
        ECSLib.setUint("Level", _resourceID, resourceLevel + 1);

        // Set last action time
        ECSLib.setUint("LastActed", nationID, block.timestamp);
    }

    // ----------------------------------------------------------
    // TREATY
    // ----------------------------------------------------------

    /**
     * @dev Delegate or undelegate a game function to a nation or a treaty.
     * @param _nationID ID of delegating nation
     * @param _functionName name of function to delegate
     * @param _delegateID ID of delegated nation
     * @param _subjectID ID of specific entity to delegate (0 means all)
     * @param _canCall whether to delegate or undelegate
     */
    function delegateGameFunction(
        uint256 _nationID,
        string memory _functionName,
        uint256 _delegateID,
        uint256 _subjectID,
        bool _canCall
    ) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_nationID);
        GameLib.validEntityCheck(_delegateID);
        GameLib.validFunctionNameCheck(_functionName);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("DelegateGameFunction", _nationID, callerID, 0);
            GameLib.treatyApprovalCheck("DelegateGameFunction", _nationID, abi.encode(callerID, _functionName, _delegateID, _subjectID, _canCall));
        }

        // Delegate function
        GameLib.delegateGameFunction(_nationID, _functionName, _delegateID, _subjectID, _canCall);

        // Set last action time
        ECSLib.setUint("LastActed", _nationID, block.timestamp);
    }

    /**
     * @dev Deploy a treaty.
     * @param _nationID ID of nation deploying treaty
     * @param _treatyName name of treaty
     * @return treatyAddress address of deployed treaty
     */
    function deployTreaty(uint256 _nationID, string memory _treatyName) external returns (address treatyAddress) {
        // Basic check
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_nationID);

        // Permission checks
        if (msg.sender != address(this)) {
            uint256 callerID = GameLib.getEntityByAddress(msg.sender);
            GameLib.nationDelegationCheck("DeployTreaty", _nationID, callerID, 0);
            GameLib.treatyApprovalCheck("DeployTreaty", _nationID, abi.encode(callerID, _treatyName));
        }

        // Deploy treaty
        treatyAddress = GameLib.deployTreaty(_nationID, _treatyName);

        // Set last action time
        ECSLib.setUint("LastActed", _nationID, block.timestamp);
    }

    // ----------------------------------------------------------
    // AGGREGATE FUNCTIONS
    // ----------------------------------------------------------

    /**
     * @dev Harvest all specified resources of yours.
     * @param resourceIDs IDs of resources to harvest
     */
    function harvestAllResources(uint256[] memory resourceIDs) external {
        for (uint256 i = 0; i < resourceIDs.length; i++) {
            harvestResource(resourceIDs[i]);
        }
    }

    /**
     * @dev Delegate or undelegate all their game functions to another nation or treaty.
     * @param _nationID ID of delegating nation
     * @param _delegateID ID of delegated nation
     * @param _canCall whether to delegate or undelegate
     */
    function delegateAllGameFunctions(
        uint256 _nationID,
        uint256 _delegateID,
        bool _canCall
    ) external {
        // Basic checks
        GameLib.ongoingGameCheck();
        GameLib.validEntityCheck(_nationID);
        GameLib.validEntityCheck(_delegateID);

        // Delegate all functions
        for (uint256 i; i < gs().gameFunctionNames.length; i++) {
            GameLib.delegateGameFunction(_nationID, gs().gameFunctionNames[i], _delegateID, 0, _canCall);
        }

        // Set last action time
        ECSLib.setUint("LastActed", _nationID, block.timestamp);
    }
}
