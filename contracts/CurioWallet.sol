// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {GetterFacet} from "contracts/facets/GetterFacet.sol";

contract CurioWallet {
    address public diamond;
    GetterFacet public getter;

    constructor(address _diamond) {
        require(_diamond != address(0), "CurioWallet: Diamond address required");

        diamond = _diamond;
        getter = GetterFacet(diamond);
    }

    modifier onlyOwner() {
        uint256 entity = getter.getEntityByAddress(address(this));
        require(getter.getNation(entity) == getter.getEntityByAddress(msg.sender), "CurioWallet: Must be owner to call");
        _;
    }

    function executeTx(address _contractAddress, bytes memory _callData) public onlyOwner returns (bytes memory) {
        (bool success, bytes memory returnData) = _contractAddress.call(_callData);
        require(success, string(returnData));
        return returnData;
    }
}
