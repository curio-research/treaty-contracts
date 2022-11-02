//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
// import {GameLib} from "contracts/libraries/GameLib.sol";
// import "contracts/facets/GetterFacet.sol"; // FIXME: where it's broken
// import "contracts/facets/GetterFacet.sol"; // FIXME: where it's broken
import {ComponentSpec, GameMode, GameState, Position, ValueType, WorldConstants, QueryCondition, QueryType} from "contracts/libraries/Types.sol";

// represents all unique objects as tokens in a curio game
contract Object {
    // address public gameAddress; // diamond game address to fetch stuff from

    address[] public memberStates;
    mapping(address => bool) public isMemberStates;

    // constructor(address _gameAddress) {
    //     gameAddress = _gameAddress;
    //     gameAddress = 1;
    //     uint256 _memberState = msg.sender;
    // }

    // function ownerOf(uint256 tokenId) public {
    //     // run query of ecs
    //     uint256 _memberState = msg.sender;
    // }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        uint256 _memberState = msg.sender;

        // from one wallet to another
    }
}
