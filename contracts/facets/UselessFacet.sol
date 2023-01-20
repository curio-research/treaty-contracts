//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {UseStorage} from "contracts/libraries/Storage.sol";

contract UselessFacet is UseStorage {
    function uselessFunction() external pure returns (string memory) {
        return "This function is useless";
    }

    function getAddressNonce() external view returns (uint256) {
        return gs().addressNonce;
    }
}
