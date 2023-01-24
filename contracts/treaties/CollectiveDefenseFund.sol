//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {AdminFacet} from "contracts/facets/AdminFacet.sol";
import {Position} from "contracts/libraries/Types.sol";
import {Set} from "contracts/Set.sol";

contract CollectiveDefenseFund is CurioTreaty {
    // Game cache
    CurioERC20 public goldToken;
    CurioERC20 public foodToken;

    // Treaty-specific data
    uint256 public goldFee = 10000;
    uint256 public foodFee = 10000;
    uint256 public withdrawTimeInterval = 86400;
    uint256 public depositTimeInterval = 86400;
    uint256 public goldWithdrawQuota = 5000;
    uint256 public foodWithdrawQuota = 5000;
    mapping(uint256 => uint256) public lastPaid; // nationID => timestamp
    mapping(uint256 => uint256) public lastWithdrawn; // nationID => timestamp
    Set public council;

    modifier onlyCouncilOrPact() {
        GetterFacet getter = GetterFacet(diamond);
        uint256 callerID = getter.getEntityByAddress(msg.sender);
        require(council.includes(callerID) || msg.sender == address(this), "CDFund: Only council or pact can call");
        _;
    }

    constructor(address _diamond) CurioTreaty(_diamond) {
        // Initialize treaty
        GetterFacet getter = GetterFacet(diamond);
        goldToken = getter.getTokenContract("Gold");
        foodToken = getter.getTokenContract("Food");

        // Create new council
        council = new Set();
    }

    function name() external pure override returns (string memory) {
        return "Collective Defense Fund";
    }

    function description() external pure override returns (string memory) {
        return "Owner of the League can point to which nation the league is sanctioning";
    }

    // ----------------------------------------------------------
    // Set getters
    // ----------------------------------------------------------

    function getCouncilMembers() public view returns (uint256[] memory) {
        return council.getAll();
    }

    function getTreatySigners() public view returns (uint256[] memory) {
        GetterFacet getter = GetterFacet(diamond);
        return getter.getTreatySigners(getter.getEntityByAddress(address(this)));
    }

    // ----------------------------------------------------------
    // Owner and council functions
    // ----------------------------------------------------------

    function addToWhitelist(uint256 _nationID) public onlyOwner {
        AdminFacet admin = AdminFacet(diamond);
        admin.addToTreatyWhitelist(_nationID);
    }

    function removeFromWhitelist(uint256 _nationID) public onlyOwner {
        AdminFacet admin = AdminFacet(diamond);
        admin.removeFromTreatyWhitelist(_nationID);
    }

    function addToCouncil(uint256 _nationID) public onlyOwner {
        GetterFacet getter = GetterFacet(diamond);
        require(getter.getNationTreatySignature(_nationID, getter.getEntityByAddress(address(this))) != 0, "CDFund: Only signed nations can join council");
        council.add(_nationID);
    }

    function removeFromCouncil(uint256 _nationID) public onlyOwner {
        council.remove(_nationID);
    }

    function updateFoodFee(uint256 _newFee) external onlyCouncilOrPact {
        foodFee = _newFee;
    }

    function updateGoldFee(uint256 _newFee) external onlyCouncilOrPact {
        goldFee = _newFee;
    }

    function removeMember(uint256 _nationID) public onlyCouncilOrPact {
        GetterFacet getter = GetterFacet(diamond);

        // Only owner can remove council members
        uint256 treatyID = getter.getEntityByAddress(address(this));
        uint256 ownerID = abi.decode(getter.getComponent("Owner").getBytesValue(treatyID), (uint256));
        if (getter.getEntityByAddress(msg.sender) == ownerID) {
            council.remove(_nationID);
        } else {
            require(!council.includes(_nationID), "CDFund: Need owner to `removeFromCouncil` first");
        }

        AdminFacet admin = AdminFacet(diamond);
        admin.removeFromTreatyWhitelist(_nationID); // need to be whitelisted again for joining
        admin.removeSigner(_nationID);
    }

    function withdraw(uint256 _goldAmount, uint256 _foodAmount) external onlyCouncilOrPact {
        GetterFacet getter = GetterFacet(diamond);

        // Check that withdrawal amount is within quota
        require(_goldAmount <= goldWithdrawQuota, "CDFund: Amount exceeds quota");
        require(_foodAmount <= foodWithdrawQuota, "CDFund: Amount exceeds quota");

        // Check balance sufficience
        require(goldToken.balanceOf(address(this)) >= _goldAmount, "CDFund: Insufficient balance");
        require(foodToken.balanceOf(address(this)) >= _foodAmount, "CDFund: Insufficient balance");

        // Check and update last withdrawn time
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        require(block.timestamp > lastWithdrawn[nationID] + withdrawTimeInterval, "CDFund: Last withdrawal was too soon");
        lastWithdrawn[nationID] = block.timestamp;

        // Withdraw
        address recipientAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        goldToken.transfer(recipientAddress, _goldAmount);
        foodToken.transfer(recipientAddress, _foodAmount);
    }

    function removeAllOverdueMembers() external onlyCouncilOrPact {
        GetterFacet getter = GetterFacet(diamond);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        uint256[] memory signers = getter.getTreatySigners(treatyID);

        for (uint256 i = 0; i < signers.length; i++) {
            if (block.timestamp > lastPaid[signers[i]] + depositTimeInterval) {
                removeMember(signers[i]);
            }
        }
    }

    // Council member can distribute certain amount of fund to any in-game entity which can hold tokens
    function distributeFund(
        uint256 _toID,
        string memory _resourceType,
        uint256 _amount
    ) external onlyCouncilOrPact {
        GetterFacet getter = GetterFacet(diamond);

        // Check that withdrawal amount is within quota
        if (_strEq(_resourceType, "Gold")) {
            require(_amount <= goldWithdrawQuota, "CDFund: Amount exceeds quota");
        } else if (_strEq(_resourceType, "Food")) {
            require(_amount <= foodWithdrawQuota, "CDFund: Amount exceeds quota");
        } else {
            revert("CDFund: Invalid resource type");
        }

        // Check address is not null
        address to = getter.getAddress(_toID);
        require(to != address(0), "CDFund: Invalid address");

        // Transfer
        CurioERC20 token = getter.getTokenContract(_resourceType);
        token.transfer(to, _amount);
    }

    // ----------------------------------------------------------
    // Player functions
    // ----------------------------------------------------------

    function treatyJoin() public override onlyWhitelist {
        GetterFacet getter = GetterFacet(diamond);

        // Check whether the nation is whitelisted
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        require(getter.isWhitelistedByTreaty(nationID, treatyID), "CDFund: Candidate is not whitelisted");

        // Pay membership fees
        _payFeesHelper(nationID);

        // Add nation's signature
        super.treatyJoin();
    }

    function treatyLeave() public override {
        GetterFacet getter = GetterFacet(diamond);

        // Check if nation has stayed in pact for at least 10 seconds
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        uint256 nationJoinTime = abi.decode(getter.getComponent("InitTimestamp").getBytesValue(getter.getNationTreatySignature(nationID, treatyID)), (uint256));
        require(block.timestamp >= nationJoinTime + 10, "NAPact: Nation must stay for at least 10 seconds");

        // Remove nation from council
        council.remove(nationID);

        // Remove nation from whitelist
        AdminFacet admin = AdminFacet(diamond);
        admin.removeFromTreatyWhitelist(nationID); // need to be whitelisted again to join

        // Remove nation's signature
        super.treatyLeave();
    }

    /// @notice Can pay between half and full deposit interval
    function payMembershipFee() external onlySigner {
        GetterFacet getter = GetterFacet(diamond);

        // Check last paid time
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        require(block.timestamp > lastPaid[nationID] + depositTimeInterval / 2, "CDFund: Last payment was too soon");

        _payFeesHelper(nationID);
    }

    function _payFeesHelper(uint256 _nationID) internal {
        GetterFacet getter = GetterFacet(diamond);
        address senderCapitalAddr = getter.getAddress(getter.getCapital(_nationID));

        // Check balance sufficience
        require(goldToken.balanceOf(senderCapitalAddr) >= goldFee, "CDFund: Insufficient gold balance");
        require(foodToken.balanceOf(senderCapitalAddr) >= foodFee, "CDFund: Insufficient food balance");

        // Pay fee
        goldToken.transferFrom(senderCapitalAddr, address(this), goldFee);
        foodToken.transferFrom(senderCapitalAddr, address(this), foodFee);

        // Update last paid time
        lastPaid[_nationID] = block.timestamp;
    }

    // ----------------------------------------------------------
    // Permission functions
    // ----------------------------------------------------------

    function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        GetterFacet getter = GetterFacet(diamond);

        // Disapprove if target nation is part of collective fund
        (, , uint256 battleTargetID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
        uint256 targetNationID = getter.getNation(battleTargetID);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        if (getter.getNationTreatySignature(targetNationID, treatyID) != 0) return false;

        return super.approveBattle(_nationID, _encodedParams);
    }

    // ----------------------------------------------------------
    // Helper functions
    // ----------------------------------------------------------

    function _strEq(string memory _s1, string memory _s2) private pure returns (bool) {
        if (bytes(_s1).length != bytes(_s2).length) return false;
        return (keccak256(abi.encodePacked((_s1))) == keccak256(abi.encodePacked((_s2))));
    }
}
