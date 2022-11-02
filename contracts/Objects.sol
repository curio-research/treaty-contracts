//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import {GetterFacet} from "contracts/facets/GetterFacet.sol";

contract Objects is IERC721 {
    address public gameAddress; // diamond address?
    mapping(address => bool) public admins; // whoever can modify variables inside this contract

    constructor(address _gameAddress) IERC721() {
        gameAddress = _gameAddress;
    }

    // owner of
    function ownerOf(uint256 tokenId) external view override returns (address) {
        // query for owner in the ecs state through getter facet
        uint256 keeperId = GetterFacet(gameAddress).getUint("Owner", tokenId);
        address keeperAddress = GetterFacet(gameAddress).getAddress("Address", keeperId);

        return keeperAddress;
    }

    // transferFrom
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        // change the owner from one "keeper" to another
    }

    // balanceOf
    function balanceOf(address owner) external view returns (uint256 balance) {}

    // safeTransferFrom
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external {}

    // safeTransferFrom
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external {}

    function approve(address to, uint256 tokenId) external {}

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool _approved) external {}

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function getApproved(uint256 tokenId) external view returns (address operator) {}

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator) external view returns (bool) {}
}
