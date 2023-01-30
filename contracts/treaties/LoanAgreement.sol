//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {Set} from "contracts/Set.sol";

struct Loan {
    uint256 loanID;
    string collateralTokenName;
    uint256 collateralAmount;
    string loanTokenName;
    uint256 loanAmount;
    uint256 totalInterestPercentage; // in percentage
    uint256 duration; // in seconds
    uint256 lenderID; // must be a nation
    uint256 borrowerID; // must be a nation
    uint256 effectiveAt; // when the loan is taken
}

contract LoanAgreement is CurioTreaty {
    uint256 public loanNonce;
    mapping(uint256 => Set) public lenderIDToLoanIDs;
    mapping(uint256 => Set) public borrowerIDToLoanIDs;
    mapping(uint256 => Loan) public loanIDToLoan;
    Loan public emptyLoan;

    function init(address _diamond) public override {
        super.init(_diamond);

        emptyLoan = Loan({
            loanID: 0, // FORMATTING: DO NOT REMOVE
            collateralTokenName: "",
            collateralAmount: 0,
            loanTokenName: "",
            loanAmount: 0,
            totalInterestPercentage: 0,
            duration: 0,
            lenderID: 0,
            borrowerID: 0,
            effectiveAt: 0
        });
        loanNonce = 1;
    }

    function name() public pure override returns (string memory) {
        return "LoanAgreement";
    }

    function description() public pure override returns (string memory) {
        return "Co-author: Sa1L & Cometshock. Contract for lending and borrowing";
    }

    // ----------------------------------------------------------
    // Set getters
    // ----------------------------------------------------------

    function getLenderLoanIDs(uint256 _lenderID) public view returns (uint256[] memory) {
        return lenderIDToLoanIDs[_lenderID].getAll();
    }

    function getBorrowerLoanIDs(uint256 _borrowerID) public view returns (uint256[] memory) {
        return borrowerIDToLoanIDs[_borrowerID].getAll();
    }

    // ----------------------------------------------------------
    // Player functions
    // ----------------------------------------------------------

    /**
     * @dev Create a loan.
     * @param _collateralTokenName name of the token to use as collateral
     * @param _collateralAmount amount of the token to use as collateral
     * @param _loanTokenName name of the Token to borrow
     * @param _loanAmount amount of the Token to borrow
     * @param _totalInterestPercentage total interest percentage
     * @param _duration duration of the loan in seconds
     * @return loanID ID of the loan
     * @notice Only callable by a nation
     */
    function createLoan(
        string memory _collateralTokenName,
        uint256 _collateralAmount,
        string memory _loanTokenName,
        uint256 _loanAmount,
        uint256 _totalInterestPercentage,
        uint256 _duration
    ) public returns (uint256 loanID) {
        GetterFacet getter = GetterFacet(address(diamond));

        // Validity checks
        require(_loanAmount > 0, "Loan: Amounts must be greater than 0");
        require(_duration > 0, "Loan: Duration must be greater than 0");
        uint256 callerID = getter.getEntityByAddress(msg.sender);
        require(_strEq(abi.decode(getter.getComponent("Tag").getBytesValue(callerID), (string)), "Nation"), "Loan: Must be called by a nation");

        // Create new set if lender doesn't have one
        if (lenderIDToLoanIDs[callerID] == Set(address(0))) {
            lenderIDToLoanIDs[callerID] = new Set();
        }

        // Create loan
        loanID = loanNonce;
        Loan memory newLoan = Loan({
            loanID: loanID, // FORMATTING: DO NOT REMOVE THIS COMMENT
            collateralTokenName: _collateralTokenName,
            collateralAmount: _collateralAmount,
            loanTokenName: _loanTokenName,
            loanAmount: _loanAmount,
            totalInterestPercentage: _totalInterestPercentage,
            duration: _duration,
            lenderID: callerID,
            borrowerID: 0, // meaningless until loan is taken
            effectiveAt: 0 // meaningless until loan is taken
        });
        loanIDToLoan[loanID] = newLoan;
        loanNonce++;

        // Add loan to lender's set
        lenderIDToLoanIDs[callerID].add(loanID);
    }

    /// @notice Only callable by the lender
    function cancelLoan(uint256 _loanID) public {
        // Validity checks
        GetterFacet getter = GetterFacet(address(diamond));
        require(loanIDToLoan[_loanID].lenderID == getter.getEntityByAddress(msg.sender), "Loan: Only lender can cancel loan");
        require(loanIDToLoan[_loanID].borrowerID == 0, "Loan: A loan which is taken cannot be cancelled");

        // Remove loan
        _removeLoan(_loanID);
    }

    /// @notice Only callable by a nation that is not the lender
    function takeLoan(uint256 _loanID) public {
        // Validity checks
        GetterFacet getter = GetterFacet(diamond);
        Loan memory loan = loanIDToLoan[_loanID];
        require(loan.loanAmount > 0, "Loan: Loan does not exist");
        require(loan.borrowerID == 0 && loan.effectiveAt == 0, "Loan: Loan is already taken");
        uint256 callerID = getter.getEntityByAddress(msg.sender);
        require(callerID != loan.lenderID, "Loan: Lender cannot take own loan");
        require(_strEq(abi.decode(getter.getComponent("Tag").getBytesValue(callerID), (string)), "Nation"), "Loan: Must be called by a nation");

        // Create new set if borrower doesn't have one
        if (borrowerIDToLoanIDs[callerID] == Set(address(0))) {
            borrowerIDToLoanIDs[callerID] = new Set();
        }

        // Add loan to borrower's set
        borrowerIDToLoanIDs[callerID].add(_loanID);

        // Activate loan
        loan.borrowerID = callerID;
        loan.effectiveAt = block.timestamp;
        loanIDToLoan[_loanID] = loan;

        // Fetch data
        CurioERC20 collateralToken = CurioERC20(getter.getTokenContract(loan.collateralTokenName));
        CurioERC20 loanToken = CurioERC20(getter.getTokenContract(loan.loanTokenName));
        address lenderCapitalAddr = _getCapitalAddress(loan.lenderID);
        address borrowerCapitalAddr = _getCapitalAddress(loan.borrowerID);

        // Transfer collateral
        collateralToken.transferFrom(borrowerCapitalAddr, address(this), loan.collateralAmount);

        // Transfer loan
        loanToken.transferFrom(lenderCapitalAddr, borrowerCapitalAddr, loan.loanAmount);
    }

    /// @notice Only callable by the borrower
    function payOffLoan(uint256 _loanID) public {
        // Validity checks
        GetterFacet getter = GetterFacet(diamond);
        Loan memory loan = loanIDToLoan[_loanID];
        require(loan.loanAmount > 0, "Loan: Loan does not exist");
        require(loan.borrowerID == getter.getEntityByAddress(msg.sender), "Loan: Only borrower can pay off loan");

        // Fetch data
        CurioERC20 collateralToken = CurioERC20(getter.getTokenContract(loan.collateralTokenName));
        CurioERC20 loanToken = CurioERC20(getter.getTokenContract(loan.loanTokenName));
        address lenderCapitalAddr = _getCapitalAddress(loan.lenderID);
        address borrowerCapitalAddr = _getCapitalAddress(loan.borrowerID);

        // Pay principle + interest
        uint256 totalDue = (loan.loanAmount * (100 + loan.totalInterestPercentage)) / 100;
        loanToken.transferFrom(borrowerCapitalAddr, lenderCapitalAddr, totalDue);

        // Return collateral
        collateralToken.transfer(borrowerCapitalAddr, loan.collateralAmount);

        // Remove loan
        _removeLoan(_loanID);
    }

    /// @notice Only callable by the lender
    function liquidateCollateral(uint256 _loanID) public {
        // Validity checks
        GetterFacet getter = GetterFacet(diamond);
        Loan memory loan = loanIDToLoan[_loanID];
        require(loan.loanAmount > 0, "Loan: Loan does not exist");
        require(block.timestamp > loan.effectiveAt + loan.duration, "Loan: Loan not yet due");

        // Fetch data
        CurioERC20 collateralToken = CurioERC20(getter.getTokenContract(loan.collateralTokenName));
        address lenderCapitalAddr = _getCapitalAddress(loan.lenderID);

        // Return collateral
        collateralToken.transfer(lenderCapitalAddr, loan.collateralAmount);

        // Remove loan
        _removeLoan(_loanID);
    }

    function _removeLoan(uint256 _loanID) internal {
        lenderIDToLoanIDs[loanIDToLoan[_loanID].lenderID].remove(_loanID);
        borrowerIDToLoanIDs[loanIDToLoan[_loanID].borrowerID].remove(_loanID);
        loanIDToLoan[_loanID] = emptyLoan;
    }

    function _getCapitalAddress(uint256 _nationID) internal view returns (address) {
        GetterFacet getter = GetterFacet(diamond);
        return getter.getAddress(getter.getCapital(_nationID));
    }

    function _strEq(string memory _s1, string memory _s2) internal pure returns (bool) {
        if (bytes(_s1).length != bytes(_s2).length) return false;
        return (keccak256(abi.encodePacked((_s1))) == keccak256(abi.encodePacked((_s2))));
    }
}
