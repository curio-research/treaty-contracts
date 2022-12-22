//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC721} from "lib/solmate/src/tokens/ERC721.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {AdminFacet} from "contracts/facets/AdminFacet.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";

abstract contract CurioERC721 is ERC721 {
    address public diamond;
    GetterFacet public getter;
    AdminFacet public admin;
    GameFacet public game;

    constructor(
        string memory _name,
        string memory _symbol,
        address _diamond
    ) ERC721(_name, _symbol) {
        require(_diamond != address(0), "CurioERC721: Diamond address required");

        diamond = _diamond;
        getter = GetterFacet(_diamond);
        admin = AdminFacet(_diamond);
        game = GameFacet(_diamond);
    }
}
