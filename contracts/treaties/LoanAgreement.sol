//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {Set} from "contracts/Set.sol";
import {console} from "forge-std/console.sol";

/// @notice Each player has one active sell order at most
contract LoanAgreement is CurioTreaty {
    /**
    Outline:
    1. Lender puts up loan
        - loan has id
        - loan id is added To the lenderIDToLoanIDs (set) mapping
        - loan is mapped To loan id
    2. At any time (before or after loan is taken), lender can cancel loan
        - loan is removed from lenderIDToLoanIDs set
        - loan is removed from borrowerIDToLoanIDs set (if it’s taken)
        - loanID mapped To emptyLoan
    3. Borrower takes loan
        - collateral deposited To Token contract
        - loan id is added To the borrowerIDToLoanIDs (set) mapping
    4. Borrower pays the loan along with principle
        - (principle + interests) amount of Token transfered To lender
        - collateral returned To borrower
        - removeLoan
        - Note: borrower can pay back loan earlier than the due date
    5. Lender can take out collateral if borrower doesn’t pay loan ahead of time
        - collateral transfered To lender
        - removeLoan
     */
    struct Loan {
        uint256 loanID;
        string collateralTokenName;
        uint256 collateralAmount;
        string loanTokenName;
        uint256 loanAmount;
        uint256 hourlyInterestRate;
        uint256 duration; // in seconds
        uint256 lenderID; // must be a nation
        uint256 borrowerID; // must be a nation
        uint256 effectiveAt; // when the loan is taken
    }
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
            hourlyInterestRate: 0,
            duration: 0,
            lenderID: 0,
            borrowerID: 0,
            effectiveAt: 0
        });
        loanNonce = 1;
    }

    // ----------------------------------------------------------
    // Owner functions
    // ----------------------------------------------------------
    function name() external pure override returns (string memory) {
        return "LoanAgreement";
    }

    function description() external pure override returns (string memory) {
        return "Contract for lending and borrowing";
    }

    // ----------------------------------------------------------
    // Set getters
    // ----------------------------------------------------------
    function getLenderLoanIDs(uint256 _lenderID) external view returns (uint256[] memory) {
        return lenderIDToLoanIDs[_lenderID].getAll();
    }

    function getBorrowerLoanIDs(uint256 _borrowerID) external view returns (uint256[] memory) {
        return borrowerIDToLoanIDs[_borrowerID].getAll();
    }

    // ----------------------------------------------------------
    // Player functions
    // ----------------------------------------------------------
    /**
     * @dev Create a loan. Must be called by a nation.
     * @param _collateralTokenName name of the Token To use as collateral
     * @param _collateralAmount amount of the Token To use as collateral
     * @param _loanTokenName name of the Token To borrow
     * @param _loanAmount amount of the Token To borrow
     * @param _hourlyInterestRate interest rate per hour
     */
    function createLoan(
        string memory _collateralTokenName,
        uint256 _collateralAmount,
        string memory _loanTokenName,
        uint256 _loanAmount,
        uint256 _hourlyInterestRate,
        uint256 _duration
    ) public {
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
        Loan memory newLoan = Loan({
            loanID: loanNonce, // FORMATTING: DO NOT REMOVE THIS COMMENT
            collateralTokenName: _collateralTokenName,
            collateralAmount: _collateralAmount,
            loanTokenName: _loanTokenName,
            loanAmount: _loanAmount,
            hourlyInterestRate: _hourlyInterestRate,
            duration: _duration,
            lenderID: callerID,
            borrowerID: 0, // meaningless until loan is taken
            effectiveAt: 0 // meaningless until loan is taken
        });
        loanIDToLoan[loanNonce] = newLoan;

        // Add loan to lender's set
        lenderIDToLoanIDs[callerID].add(loanNonce);

        // Increment nonce
        loanNonce++;
    }

    /**
     * @dev Cancel a loan.
     * Note: By calling this function, lender agrees not to claim the collateral, principle, or interests.
     */
    function cancelLoan(uint256 _loanID) public {
        // Validity checks
        GetterFacet getter = GetterFacet(address(diamond));
        require(loanIDToLoan[_loanID].lenderID == getter.getEntityByAddress(msg.sender), "Loan: Only lender can cancel loan");

        // Remove loan
        _removeLoan(_loanID);
    }

    /**
     * @dev Take a loan. Must be called by a nation.
     * @param _loanID id of the loan
     */
    function takeLoan(uint256 _loanID) public {
        // Validity checks
        GetterFacet getter = GetterFacet(diamond);
        Loan memory loan = loanIDToLoan[_loanID];
        require(loan.loanAmount > 0, "Loan: Loan does not exist");
        require(loan.borrowerID == 0 && loan.effectiveAt == 0, "Loan: Loan is already taken");
        uint256 callerID = getter.getEntityByAddress(msg.sender);
        require(_strEq(abi.decode(getter.getComponent("Tag").getBytesValue(callerID), (string)), "Nation"), "Loan: Must be called by a nation");

        // Create new set if borrower doesn't have one
        if (borrowerIDToLoanIDs[callerID] == Set(address(0))) {
            borrowerIDToLoanIDs[callerID] = new Set();
        }

        // Add loan to borrower's set
        borrowerIDToLoanIDs[callerID].add(_loanID);

        // Fetch data
        CurioERC20 collateralToken = CurioERC20(getter.getTokenContract(loan.collateralTokenName));
        CurioERC20 loanToken = CurioERC20(getter.getTokenContract(loan.loanTokenName));
        address lenderCapitalAddr = _getCapitalAddress(loan.lenderID);
        address borrowerCapitalAddr = _getCapitalAddress(loan.borrowerID);

        // Transfer collateral
        collateralToken.transferFrom(borrowerCapitalAddr, address(this), loan.collateralAmount);

        // Transfer loan
        loanToken.transferFrom(lenderCapitalAddr, borrowerCapitalAddr, loan.loanAmount);

        // Activate loan
        loan.borrowerID = callerID;
        loan.effectiveAt = block.timestamp;
        loanIDToLoan[_loanID] = loan;
    }

    function payLoan(uint256 _loanID) public {
        // Validity checks
        GetterFacet getter = GetterFacet(diamond);
        Loan memory loan = loanIDToLoan[_loanID];
        require(loan.loanAmount > 0, "Loan: Loan does not exist");
        require(loan.borrowerID == getter.getEntityByAddress(msg.sender), "Loan: Only borrower can pay loan");

        // Fetch data
        CurioERC20 collateralToken = CurioERC20(getter.getTokenContract(loan.collateralTokenName));
        CurioERC20 loanToken = CurioERC20(getter.getTokenContract(loan.loanTokenName));
        address lenderCapitalAddr = _getCapitalAddress(loan.lenderID);
        address borrowerCapitalAddr = _getCapitalAddress(loan.borrowerID);

        // Pay principle + interests
        uint256 principle = loan.loanAmount;
        uint256 interests = ((block.timestamp - loan.effectiveAt) * loan.duration * principle * loan.hourlyInterestRate) / 3600;
        loanToken.transferFrom(borrowerCapitalAddr, lenderCapitalAddr, principle + interests);

        // Return collateral
        collateralToken.transfer(borrowerCapitalAddr, loan.collateralAmount);

        // Remove loan
        _removeLoan(_loanID);
    }

    function liquidateCollateral(uint256 _loanID) public {
        // Validity checks
        GetterFacet getter = GetterFacet(diamond);
        Loan memory loan = loanIDToLoan[_loanID];
        require(loan.loanAmount > 0, "Loan: Loan does not exist");
        require(block.timestamp > loan.effectiveAt + loan.duration, "Loan: Loan is not due yet");

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
