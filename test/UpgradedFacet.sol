//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title A new useless facet used for testing the upgrade functionality of diamond
/// based on https://github.com/mudgen/diamond-3-hardhat/blob/main/test/diamondTest.js
/// and https://eip2535diamonds.substack.com/p/diamond-upgrades?utm_source=substack&utm_campaign=post_embed&utm_medium=web
/// and https://eip2535diamonds.substack.com/p/poorly-written-trail-of-bits-article
contract UpgradedFacet {
    bytes4 public SELECTOR = 0x13b87008; // selector for the next function
    function upgradedFacetFunction(uint256 param) external pure returns (uint256) {
        return param + 2;
    }
}
