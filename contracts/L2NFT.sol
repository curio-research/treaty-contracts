//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./ERC721A/ERC721A_L2.sol";

// L2 NFT
contract L2NFT is ERC721AL2 {
    constructor() ERC721AL2("L2Treaty", "TREATY") {
        // the deployer of the contract is set to automatically be an admin
    }

    // this can only be called using an admin
    function mint(uint256 _tokenId, address _owner) public {
        _safeMint(_owner, _tokenId);
    }
}
