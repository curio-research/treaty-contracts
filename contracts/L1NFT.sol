//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./ERC721A/ERC721A.sol";

// L1 NFT
contract L1NFT is ERC721A {
    constructor() ERC721A("L1Treaty", "TREATY") {}

    function mint(uint256 _quantity) public {
        _safeMint(msg.sender, _quantity);
    }
}
