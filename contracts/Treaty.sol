//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ITreaty} from "contracts/interfaces/ITreaty.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";
import {GameFacet} from "contracts/facets/GameFacet.sol";

contract Treaty is ITreaty {
    address public diamond;
    GameFacet public game;
    GetterFacet public getter;
    string public name;

    constructor(address _diamond) {
        require(_diamond != address(0), "Treaty: Diamond address required");

        diamond = _diamond;
        game = GameFacet(_diamond);
        getter = GetterFacet(_diamond);

        name = "Treaty";
    }
}
