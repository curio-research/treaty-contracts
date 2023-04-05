//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./ERC721A/ERC721A_L2.sol";

// L2 NFT
contract L2NFT is ERC721AL2 {
    constructor() ERC721AL2("L2Treaty", "TREATY") {
        // the deployer of the contract is set to automatically be an admin
    }

    // key events to disable ownership checks for:
    // safeTransferFrom (done)
    // transferFrom (done)
    // mint (done)
    // burn (?)

    // this can only be called using an admin
    function mint(address _owner, uint256 _quantity) public {
        _safeMint(_owner, _quantity);
    }

    // trnasfer
}
