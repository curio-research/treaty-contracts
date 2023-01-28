//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";
import {CurioERC20} from "contracts/standards/CurioERC20.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {Set} from "contracts/Set.sol";

/// @notice Each player has one active sell order at most
contract LoanAgreement is CurioTreaty {
    /**
    Outline: 
    1. Lender puts up loan
        - loan has id
        - loan id is added to the lendertoLoans (set) mapping
        - loan is mapped to loan id
    2. At any time (before or after loan is taken), lender can cancel loan
        - loan is removed from lenderToLoans set
        - loan is removed from borrowerToLoans set (if it's taken)
        - loanID mapped to emptyLoan
    3. Borrower takes loan
        - collateral deposited to token contract
        - loan id is added to the borrowertoLoans (set) mapping
    4. Borrower pays the loan along with principle
        - (principle + interests) amount of token transfered to lender
        - collateral returned to borrower
        - removeLoan
        - Note: borrower can pay back loan earlier than the due date
    5. Lender can take out collateral if borrower doesn't pay loan ahead of time
        - collateral transfered to lender
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
    }

    uint256 public loanCount;
    mapping (address => Set) lendertoLoans;
    mapping (uint256 => Loan) public loanIDToLoan;
    Loan public emptyLoan;

    function init(address _diamond) public override {
        super.init(_diamond);
        emptyLoan = Loan({collateralTokenName: "", collateralAmount: 0, loanTokenName: "", loanAmount: 0, hourlyInterestRate: 0, createdAt: 0});
    }

    // ----------------------------------------------------------
    // Owner functions
    // ----------------------------------------------------------
    function name() external pure override returns (string memory) {
        return "Loan Agreement";
    }

    function description() external pure override returns (string memory) {
        return "Contract for lending and borrowing";
    }


    // ----------------------------------------------------------
    // Player functions
    // ----------------------------------------------------------

    /**
     * @dev Create a loan. Must be called by a nation.
     * @param _collateralTokenName name of the token to use as collateral
     * @param _collateralAmount amount of the token to use as collateral
     * @param _loanTokenName name of the token to borrow
     * @param _loanAmount amount of the token to borrow
     * @param _hourlyInterestRate interest rate per hour
     */
    function createLoan(
        string memory _collateralTokenName,
        uint256 _collateralAmount,
        string memory _loanTokenName,
        uint256 _loanAmount,
        uint256 _hourlyInterestRate
    ) public {
        require(_collateralAmount > 0 && _loanAmount > 0, "Loan: Amounts must be greater than 0");

        Loan memory newLoan = Loan({
            loanID: loanCount,
            collateralTokenName: _collateralTokenName, // FORMATTING: DO NOT REMOVE THIS COMMENT
            collateralAmount: _collateralAmount,
            loanTokenName: _loanTokenName,
            loanAmount: _loanAmount,
            hourlyInterestRate: _hourlyInterestRate,
            createdAt: block.timestamp
        });

        loanIDToLoan[loanCount] = newLoan;
        lendertoLoans[msg.sender].add(loanCount);

        loanCount++;
    }

    // /**
    //  * @dev Cancel a loan. Must be called by the lender.
    //  * Note: By calling this function, lender agrees not to claim the collateral, principle, or interests.
    //  */
    // function cancelLoan(uint256 _loanID) public {
    //     require(block.timestamp > loanIDToLoan[_loanID].createdAt + 120, "Loan: Can only cancel after 2 minutes");
        
    //     lenderToLoan[msg.sender] = emptyLoan;
    // }
    
    // /**
    //  * @dev Borrow a loan. Must be called by a nation.
    //  * @param _lender address of the lender
    //  */
    // function borrowLoan(address _lender) public {
    //     GetterFacet getter = GetterFacet(diamond);
    //     require(sellerToOrder[_seller].sellAmount > 0, "Loan: Lender has no existing loan");

    //     // Fetch token pair
    //     Loan memory loan = lenderToLoan[_lender];
    //     CurioERC20 collateralToken = CurioERC20(getter.getTokenAddressByName(loan.collateralTokenName));
    //     CurioERC20 loanToken = CurioERC20(getter.getTokenAddressByName(loan.loanTokenName));

    //     // Transfer collateral
    //     address borrowerCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(msg.sender)));
    //     address lenderCapitalAddress = getter.getAddress(getter.getCapital(getter.getEntityByAddress(_seller)));
    //     collateralToken.transferFrom(borrowerCapitalAddress, address(this), loan.collateralAmount);

    //     // Transfer loan
    //     loanToken.transferFrom(lenderCapitalAddress, lenderCapitalAddress, loan.loanAmount);
    // }

    // function payBackLoan(address _lender) public {
    //     GetterFacet getter = GetterFacet(diamond);
    // }
}
