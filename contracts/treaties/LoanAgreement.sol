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
        - loan id is added To the lenderToLoanIDs (set) mapping
        - loan is mapped To loan id
    2. At any time (before or after loan is taken), lender can cancel loan
        - loan is removed from lenderToLoanIDs set
        - loan is removed from borrowerToLoanIDs set (if it's taken)
        - loanID mapped To emptyLoan
    3. Borrower takes loan
        - collateral deposited To Token contract
        - loan id is added To the borrowerToLoanIDs (set) mapping
    4. Borrower pays the loan along with principle
        - (principle + interests) amount of Token transfered To lender
        - collateral returned To borrower
        - removeLoan
        - Note: borrower can pay back loan earlier than the due date
    5. Lender can take out collateral if borrower doesn't pay loan ahead of time
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
        uint256 createdAt;
        uint256 duration;
        address lenderCapitalAddr;
        address borrowerCapitalAddr;
    }

    uint256 public loanCount;
    mapping (address => Set) lenderToLoanIDs;
    mapping (address => bool) lenderSetIsInitialized;
    mapping (address => Set) borrowerToLoanIDs;
    mapping (address => bool) borrowerSetIsInitialized;
    mapping (uint256 => Loan) public loanIDToLoan;
    Loan public emptyLoan;

    function init(address _diamond) public override {
        super.init(_diamond);
        emptyLoan = Loan({
            loanID: 0,
            collateralTokenName: "",
            collateralAmount: 0,
            loanTokenName: "",
            loanAmount: 0,
            hourlyInterestRate: 0,
            createdAt: 0,
            duration: 0,
            lenderCapitalAddr: address(0),
            borrowerCapitalAddr: address(0)});
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

    function getLenderSet(address _lender) external view returns (uint256[] memory) {
        return lenderToLoanIDs[_lender].getAll();
    }

    function getBorrowerSet(address _borrower) external view returns (uint256[] memory) {
        return borrowerToLoanIDs[_borrower].getAll();
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
        require(_collateralAmount > 0 && _loanAmount > 0, "Loan: Amounts must be greater than 0");

        GetterFacet getter = GetterFacet(diamond);

        loanCount++;
        Loan memory newLoan = Loan({
            loanID: loanCount,
            collateralTokenName: _collateralTokenName, // FORMATTING: DO NOT REMOVE THIS COMMENT
            collateralAmount: _collateralAmount,
            loanTokenName: _loanTokenName,
            loanAmount: _loanAmount,
            hourlyInterestRate: _hourlyInterestRate,
            createdAt: block.timestamp,
            duration: _duration,
            lenderCapitalAddr: getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender))),
            borrowerCapitalAddr: address(0)
        });

        loanIDToLoan[loanCount] = newLoan;

        if (lenderSetIsInitialized[msg.sender]) {
            lenderToLoanIDs[msg.sender].add(loanCount);
        } else {
            Set set = new Set();
            set.add(loanCount);
            lenderToLoanIDs[msg.sender] = set;
            lenderSetIsInitialized[msg.sender] = true;
        }
    }

    /**
     * @dev Cancel a loan.
     * Note: By calling this function, lender agrees not To claim the collateral, principle, or interests.
     */
    function cancelLoan(uint256 _loanID) public {
        require(block.timestamp > loanIDToLoan[_loanID].createdAt + 120, "Loan: Can only clear after 2 minutes");
        
        if (lenderToLoanIDs[msg.sender].includes(_loanID)) {
            lenderToLoanIDs[msg.sender].remove(_loanID);
        }
        if (lenderToLoanIDs[msg.sender].includes(_loanID)) {
            lenderToLoanIDs[msg.sender].remove(_loanID);
        }
        loanIDToLoan[_loanID] = emptyLoan;
    }
    
    /**
     * @dev Borrow a loan. Must be called by a nation.
     * @param _loanID id of the loan
     */
    function borrowLoan(uint256 _loanID) public {
        require(loanIDToLoan[_loanID].loanAmount > 0, "Loan: Loan no longer exists");

        GetterFacet getter = GetterFacet(diamond);
        if (borrowerSetIsInitialized[msg.sender]) {
            borrowerToLoanIDs[msg.sender].add(_loanID);
        } else {
            Set set = new Set();
            set.add(_loanID);
            borrowerToLoanIDs[msg.sender] = set;
            borrowerSetIsInitialized[msg.sender] = true;
        }

        // Fetch Token data
        Loan memory loan = loanIDToLoan[_loanID];
        CurioERC20 collateralToken = CurioERC20(getter.getTokenContract(loan.collateralTokenName));
        CurioERC20 loanToken = CurioERC20(getter.getTokenContract(loan.loanTokenName));

        // Transfer collateral
        loan.borrowerCapitalAddr = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
        collateralToken.transferFrom(loan.borrowerCapitalAddr, address(this), loan.collateralAmount);

        // Transfer loan
        loanToken.transferFrom(loan.lenderCapitalAddr, loan.borrowerCapitalAddr, loan.loanAmount);

        // Update loan info
        loanIDToLoan[_loanID] = loan;
    }

    function payBackLoan(uint256 _loanID) public {
        require(loanIDToLoan[_loanID].loanAmount > 0, "Loan: Loan no longer exists");
        GetterFacet getter = GetterFacet(diamond);

        Loan memory loan = loanIDToLoan[_loanID];
        CurioERC20 collateralToken = CurioERC20(getter.getTokenContract(loan.collateralTokenName));
        CurioERC20 loanToken = CurioERC20(getter.getTokenContract(loan.loanTokenName));

        // Pay principle + interests
        uint256 principle = loan.loanAmount;
        uint256 interests = (block.timestamp - loan.createdAt) * loan.hourlyInterestRate / 3600;
        loanToken.transferFrom(loan.borrowerCapitalAddr, loan.lenderCapitalAddr, principle + interests);

        // Return collateral
        collateralToken.transfer(loan.borrowerCapitalAddr, loan.collateralAmount);

        // Remove loan
        cancelLoan(_loanID);
    }

    function retrieveCollateral(uint256 _loanID) public {
        require(loanIDToLoan[_loanID].loanAmount > 0, "Loan: Loan no longer exists");
        require(block.timestamp - loanIDToLoan[_loanID].createdAt > loanIDToLoan[_loanID].duration, "Loan: Loan is not due yet");
        GetterFacet getter = GetterFacet(diamond);

        Loan memory loan = loanIDToLoan[_loanID];
        CurioERC20 collateralToken = CurioERC20(getter.getTokenContract(loan.collateralTokenName));

        // Return collateral
        collateralToken.transfer(loan.borrowerCapitalAddr, loan.collateralAmount);

        // Remove loan
        cancelLoan(_loanID);
    }
}
