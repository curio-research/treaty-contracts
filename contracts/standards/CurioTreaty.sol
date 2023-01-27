// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {AdminFacet} from "contracts/facets/AdminFacet.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";

abstract contract CurioTreaty {
    // Facets
    address public diamond;

    function init(address _diamond) public virtual {
        require(diamond == address(0), "CurioTreaty: Treaty already initialized");
        require(_diamond != address(0), "CurioTreaty: Diamond address required");
        diamond = _diamond;
    }

    modifier onlyGame() {
        require(msg.sender == diamond, "CurioTreaty: Only game can call");
        _;
    }

    modifier onlyOwner() {
        GetterFacet getter = GetterFacet(diamond);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        uint256 ownerID = abi.decode(getter.getComponent("Owner").getBytesValue(treatyID), (uint256));
        require(ownerID == getter.getEntityByAddress(msg.sender), "CurioTreaty: Only owner can call");
        _;
    }

    modifier onlySigner() {
        GetterFacet getter = GetterFacet(diamond);
        require(getter.getNationTreatySignature(getter.getEntityByAddress(msg.sender), getter.getEntityByAddress(address(this))) != 0, "CurioTreaty: Only signer can call");
        _;
    }

    /// @dev No need to use if the treaty does not need whitelist
    modifier onlyWhitelist() {
        GetterFacet getter = GetterFacet(diamond);
        require(getter.isWhitelistedByTreaty(getter.getEntityByAddress(msg.sender), getter.getEntityByAddress(address(this))), "CurioTreaty: Only whitelisted nations can call");
        _;
    }

    /**
     * @dev Check if a nation has been a treaty signer for at least a duration.
     * @param _duration duration in seconds
     */
    modifier minimumStay(uint256 _duration) {
        GetterFacet getter = GetterFacet(diamond);
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        uint256 treatyID = getter.getEntityByAddress(address(this));

        // Check if nation has been a treaty signer for at least the duration
        uint256 nationJoinTime = abi.decode(getter.getComponent("InitTimestamp").getBytesValue(getter.getNationTreatySignature(nationID, treatyID)), (uint256));
        require(block.timestamp >= nationJoinTime + _duration, "Have not stayed for minimum duration");
        _;
    }

    // ----------------------------------------------------------
    // TREATY INFO (CALLED BY NATION)
    // ----------------------------------------------------------

    function name() external view virtual returns (string memory);
    function description() external view virtual returns (string memory);

    // ----------------------------------------------------------
    // MEMBERSHIP FUNCTIONS (CALLED BY NATION)
    // ----------------------------------------------------------
    
    /**
     * @dev Join treaty. Must be called by nation.
     */
    function treatyJoin() public virtual {
        // Add signature
        GetterFacet getter = GetterFacet(diamond);
        AdminFacet admin = AdminFacet(diamond);
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        admin.addSigner(nationID);
    }

    /**
     * @dev Leave treaty. Must be called by nation.
     */
    function treatyLeave() public virtual {
        // Remove signature
        GetterFacet getter = GetterFacet(diamond);
        AdminFacet admin = AdminFacet(diamond);
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        admin.removeSigner(nationID);
    }

    /**
     * @dev Delegate or undelegate a game function to this treaty. Recommended in constructor.
     * @param _functionName name of the function to delegate
     * @param _subjectID ID of the subject entity (nation or treaty)
     * @param _canCall true to delegate, false to undelegate
     */
    function treatyDelegateGameFunction(
        string memory _functionName,
        uint256 _subjectID,
        bool _canCall
    ) public virtual {
        GetterFacet getter = GetterFacet(diamond);
        AdminFacet admin = AdminFacet(diamond);
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        admin.adminDelegateGameFunction(nationID, _functionName, getter.getEntityByAddress(address(this)), _subjectID, _canCall);
    }

    // ----------------------------------------------------------
    // APPROVE FUNCTIONS (CALLED BY GAME)
    // ----------------------------------------------------------

    function approveUpgradeCapital(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveMoveCapital(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveClaimTile(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveUpgradeTile(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveRecoverTile(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveDisownTile(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveStartTroopProduction(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveEndTroopProduction(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveMove(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveOrganizeArmy(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveDisbandArmy(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveStartGather(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveEndGather(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveUnloadResources(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveHarvestResource(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveHarvestResourcesFromCapital(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveUpgradeResource(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveTransfer(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveJoinTreaty(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveLeaveTreaty(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveDelegateGameFunction(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }

    function approveDeployTreaty(uint256 _nationID, bytes memory _encodedParams) public view virtual onlyGame returns (bool) {
        return true;
    }
}
