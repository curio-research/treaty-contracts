//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {Position} from "contracts/libraries/Types.sol";
import {console} from "forge-std/console.sol";

contract CollectiveDefenseFund is CurioTreaty {
    /** 
    Outline
    - function deposit
        - all members upon joining pay a certain amount of gold & food
        - regular members should pay a certain amount of fee everyday
            - recorded by lastPaid
    - function cleanUpMembers
        - loop through lastPaid and kick out corresponding member
    - disable arbitrary kicking out ppl
    
    **/
    address public deployerAddress;
    CurioERC20 public goldToken;
    CurioERC20 public foodToken;
    uint256 public goldFee;
    uint256 public foodFee;
    uint256 public withdrawTimeInterval;
    uint256 public depositTimeInterval;

    // note: can change to allowance
    uint256 public goldWithdrawQuota;
    uint256 public foodWithdrawQuota;

    mapping(address => uint256) lastPaid;
    mapping(address => uint256) lastWithdrawn;

    address[] public whitelist;
    mapping(address => bool) public isWhitelisted;

    address[] public council;
    mapping(address => bool) public isCouncilMember;

    modifier onlyOwnerOrPact() {
        require(msg.sender == deployerAddress || msg.sender == address(this), "NAPact: You do not have owner-level permission");
        _;
    }

    modifier onlyOwnerCouncilOrPact() {
        require(msg.sender == deployerAddress || isCouncilMember[msg.sender] || msg.sender == address(this), "NAPact: You do not have owner-level permission");
        _;
    }

    constructor(
        address _diamond,
        address _deployer,
        uint256 _goldFee,
        uint256 _foodFee,
        uint256 _withdrawTimeInterval,
        uint256 _depositTimeInterval,
        uint256 _goldWithdrawQuota,
        uint256 _foodWithdrawQuota
    ) CurioTreaty(_diamond) {
        name = "Collective Defense Fund";
        description = "Owner of the League can point to which nation the league is sanctioning";

        goldToken = getter.getTokenContract("Gold");
        foodToken = getter.getTokenContract("Food");
        goldFee = _goldFee;
        foodFee = _foodFee;
        goldWithdrawQuota = _goldWithdrawQuota;
        foodWithdrawQuota = _foodWithdrawQuota;
        depositTimeInterval = _depositTimeInterval;
        withdrawTimeInterval = _withdrawTimeInterval;

        deployerAddress = _deployer;

        // fixme: a redundant step that deployer has to join the treaty after deployment;
        // addSigner in treatyJoin can only be called by treaty
        whitelist.push(_deployer);
        isWhitelisted[_deployer] = true;
    }

    // ----------------------------------------------------------
    // Articles of Treaty
    // ----------------------------------------------------------

    function addToWhitelist(address _candidate) public onlyOwnerCouncilOrPact {
        require(!isWhitelisted[_candidate], "NAPact: Candidate already whitelisted");
        isWhitelisted[_candidate] = true;
        whitelist.push(_candidate);
    }

    function removeFromWhitelist(address _candidate) public onlyOwnerCouncilOrPact {
        isWhitelisted[_candidate] = false;
        uint256 candidateIndex;
        for (uint256 i = 0; i < whitelist.length; i++) {
            if (whitelist[i] == _candidate) {
                candidateIndex = i;
            }
        }
        whitelist[candidateIndex] = whitelist[whitelist.length - 1];
        whitelist.pop();
    }

    function addToCouncilList(address _candidate) public onlyOwnerOrPact {
        require(!isCouncilMember[_candidate], "NAPact: Candidate already whitelisted");
        isCouncilMember[_candidate] = true;
        council.push(_candidate);
    }

    function removeFromCouncilList(address _candidate) public onlyOwnerOrPact {
        isCouncilMember[_candidate] = false;
        uint256 candidateIndex;
        for (uint256 i = 0; i < council.length; i++) {
            if (council[i] == _candidate) {
                candidateIndex = i;
            }
        }
        council[candidateIndex] = council[council.length - 1];
        council.pop();
    }

    function removeMember(address _member) public onlyOwnerCouncilOrPact {
        // member needs to be whitelisted again before joining
        removeFromWhitelist(_member);
        // remove membership; same as treaty leave
        uint256 nationID = getter.getEntityByAddress(_member);
        admin.removeSigner(nationID);
    }

    function updateFoodFee(uint256 _newFee) external onlyOwnerCouncilOrPact {
        foodFee = _newFee;
    }

    function updateGoldFee(uint256 _newFee) external onlyOwnerCouncilOrPact {
        goldFee = _newFee;
    }

    function payMembershipFee() external {
        uint256 treatyID = getter.getEntityByAddress(address(this));
        require(getter.getNationTreatySignature(getter.getEntityByAddress(msg.sender), treatyID) != 0, "CDFund: You're not part of the treaty yet");

        address senderCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        require(goldToken.balanceOf(senderCapitalAddress) >= goldFee, "CDFund: You don't have enough gold balance");
        require(foodToken.balanceOf(senderCapitalAddress) >= foodFee, "CDFund: You don't have enough food balance");

        require(block.timestamp - lastPaid[senderCapitalAddress] > depositTimeInterval / 2, "CDFund: Your last payment was too soon");

        goldToken.transferFrom(senderCapitalAddress, address(this), goldFee);
        foodToken.transferFrom(senderCapitalAddress, address(this), foodFee);

        lastPaid[msg.sender] = block.timestamp;
    }

    function withdraw(uint256 _goldAmount, uint256 _foodAmount) external onlyOwnerCouncilOrPact {
        require(_goldAmount <= goldWithdrawQuota, "CDFund: Amount exceeds quota");
        require(_foodAmount <= foodWithdrawQuota, "CDFund: Amount exceeds quota");
        require(goldToken.balanceOf(address(this)) >= _goldAmount, "CDFund: Not enough balance");
        require(foodToken.balanceOf(address(this)) >= _foodAmount, "CDFund: Not enough balance");

        address recipientAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        require(block.timestamp - lastWithdrawn[recipientAddress] > withdrawTimeInterval, "CDF: Your last withdrawal was too soon");

        goldToken.transfer(recipientAddress, _goldAmount);
        foodToken.transfer(recipientAddress, _foodAmount);

        lastWithdrawn[msg.sender] = block.timestamp;
    }

    function cleanUpMembers() external onlyOwnerCouncilOrPact {
        uint256 treatyID = getter.getEntityByAddress(address(this));
        uint256[] memory signers = getter.getTreatySigners(treatyID);

        for (uint256 i = 0; i < signers.length; i++) {
            address signerAddress = getter.getAddress(signers[i]);
            if (block.timestamp - lastPaid[signerAddress] > depositTimeInterval) {
                removeMember(signerAddress);
            }
        }
    }

    // ----------------------------------------------------------
    // Treaty Parameter Getters
    // ----------------------------------------------------------
    function getGoldFee() external view returns (uint256) {
        return goldFee;
    }

    function getFoodFee() external view returns (uint256) {
        return foodFee;
    }

    function getGoldWithdrawQuota() external view returns (uint256) {
        return goldWithdrawQuota;
    }

    function getFoodWithdrawQuota() external view returns (uint256) {
        return foodWithdrawQuota;
    }

    function getDepositInterval() external view returns (uint256) {
        return depositTimeInterval;
    }

    function getWithdrawInterval() external view returns (uint256) {
        return withdrawTimeInterval;
    }

    // ----------------------------------------------------------
    // Standardized Functions Called by the Public
    // ----------------------------------------------------------

    function treatyJoin() public override {
        // treaty owner needs to first whitelist the msg.sender
        require(isWhitelisted[msg.sender], "Candidate is not whitelisted");

        // Candidate pays membership fees; same logic as payMembershipFee
        address senderCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        require(goldToken.balanceOf(senderCapitalAddress) >= goldFee, "CDFund: You don't have enough gold balance");
        require(foodToken.balanceOf(senderCapitalAddress) >= foodFee, "CDFund: You don't have enough food balance");

        goldToken.transferFrom(senderCapitalAddress, address(this), goldFee);
        foodToken.transferFrom(senderCapitalAddress, address(this), foodFee);

        lastPaid[msg.sender] = block.timestamp;

        super.treatyJoin();
    }

    function treatyLeave() public override {
        // Check if nation has stayed in pact for at least 10 seconds
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        uint256 nationJoinTime = abi.decode(getter.getComponent("InitTimestamp").getBytesValue(getter.getNationTreatySignature(nationID, treatyID)), (uint256));
        require(block.timestamp - nationJoinTime >= 10, "NAPact: Nation must stay for at least 10 seconds");

        // msg.sender removed from whitelist
        isWhitelisted[msg.sender] = false;
        uint256 candidateIndex1;
        for (uint256 i = 0; i < whitelist.length; i++) {
            if (whitelist[i] == msg.sender) {
                candidateIndex1 = i;
            }
        }
        whitelist[candidateIndex1] = whitelist[whitelist.length - 1];
        whitelist.pop();

        // msg.sender removed from council (if it is a part of it)
        if (isCouncilMember[msg.sender]) {
            uint256 candidateIndex2;
            for (uint256 i = 0; i < whitelist.length; i++) {
                if (council[i] == msg.sender) {
                    candidateIndex2 = i;
                }
            }
            council[candidateIndex2] = whitelist[whitelist.length - 1];
            council.pop();
        }

        super.treatyLeave();
    }

    // ----------------------------------------------------------
    // Permission Functions
    // ----------------------------------------------------------
    function approveBattle(uint256 _nationID, bytes memory _encodedParams) public view override returns (bool) {
        // Disapprove if target nation is part of collective fund
        (, , uint256 battleTargetID) = abi.decode(_encodedParams, (uint256, uint256, uint256));
        uint256 targetNationID = getter.getNation(battleTargetID);
        uint256 treatyID = getter.getEntityByAddress(address(this));
        if (getter.getNationTreatySignature(targetNationID, treatyID) != 0) return false;

        return super.approveBattle(_nationID, _encodedParams);
    }
}
