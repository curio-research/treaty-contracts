// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {CurioTreaty} from "contracts/standards/CurioTreaty.sol";

/// @title TreatyWithWhitelist
/// @notice A treaty with whitelist pattern for joining and potentially other functions
/// @dev This contract is abstract and should be inherited from

abstract contract TreatyWithWhitelist is CurioTreaty {
    modifier onlyWhitelist() {
        require(getter.isWhitelisted(getter.getEntityByAddress(address(this)), getter.getEntityByAddress(msg.sender)), "CurioTreaty: Only whitelisted nations can call");
        _;
    }

    constructor(address _diamond) CurioTreaty(_diamond) {}

    // Modification to join logic: only whitelisted nations can join
    function treatyJoin() public virtual override onlyWhitelist {
        super.treatyJoin();
    }

    function treatyAddToWhitelist() public virtual {
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        admin.addToWhitelist(nationID);
    }

    function treatyRemoveFromWhitelist() public virtual {
        uint256 nationID = getter.getEntityByAddress(msg.sender);
        admin.removeFromWhitelist(nationID);
    }
}
