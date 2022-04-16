//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./IERC1155.sol";
import "../Address.sol";
import "./IERC1155TokenReceiver.sol";

// ------------------------------------------------------------
// ERC1155 GameTokenContracts
// ------------------------------------------------------------

contract ERC1155 is IERC1155 {
    using SafeMath for uint256;
    using Address for address;

    // onReceive function signatures
    bytes4 internal constant ERC1155_RECEIVED_VALUE = 0xf23a6e61;
    bytes4 internal constant ERC1155_BATCH_RECEIVED_VALUE = 0xbc197c81;

    // id => (owner => balance)
    mapping(address => mapping(uint256 => uint256)) internal balances;

    // owner => (operator => approved)
    mapping(address => mapping(address => bool)) internal operatorApproval;

    //ERC165 ----------------------

    /**
     * INTERFACE_SIGNATURE_ERC165 = bytes4(keccak256("supportsInterface(bytes4)"));
     */
    bytes4 private constant INTERFACE_SIGNATURE_ERC165 = 0x01ffc9a7;

    /**
     * INTERFACE_SIGNATURE_ERC1155 =
     * bytes4(keccak256("safeTransferFrom(address,address,uint256,uint256,bytes)")) ^
     * bytes4(keccak256("safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)")) ^
     * bytes4(keccak256("balanceOf(address,uint256)")) ^
     * bytes4(keccak256("balanceOfBatch(address[],uint256[])")) ^
     * bytes4(keccak256("setApprovalForAll(address,bool)")) ^
     * bytes4(keccak256("isApprovedForAll(address,address)"));
     */
    bytes4 private constant INTERFACE_SIGNATURE_ERC1155 = 0xd9b67a26;

    /**
     * @notice Query if a contract implements an interface
     * @param _interfaceID  The interface identifier, as specified in ERC-165
     * @return `true` if the contract implements `_interfaceID` and
     */
    function supportsInterface(bytes4 _interfaceId) public view returns (bool) {
        if (_interfaceId == INTERFACE_SIGNATURE_ERC165 || _interfaceId == INTERFACE_SIGNATURE_ERC1155) {
            return true;
        }

        return false;
    }

    //ERC1155

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _id,
        uint256 _value,
        bytes calldata _data
    ) external {
        require(_to != address(0x0), "_to must be non-zero.");
        require(_from == msg.sender || operatorApproval[_from][msg.sender] == true, "Need operator approval for 3rd party transfers.");

        // SafeMath will throw with insuficient funds _from
        // or if _id is not valid (balance will be 0)
        balances[_id][_from] = balances[_id][_from].sub(_value);
        balances[_id][_to] = _value.add(balances[_id][_to]);

        emit TransferSingle(msg.sender, _from, _to, _id, _value);

        // Now that the balance is updated and the event was emitted,
        // call onERC1155Received if the destination is a contract.
        if (_to.isContract()) {
            _doSafeTransferAcceptanceCheck(msg.sender, _from, _to, _id, _value, _data);
        }
    }

    function _doSafeTransferAcceptanceCheck(
        address _operator,
        address _from,
        address _to,
        uint256 _id,
        uint256 _value,
        bytes memory _data
    ) internal {
        require(ERC1155TokenReceiver(_to).onERC1155Received(_operator, _from, _id, _value, _data) == ERC1155_RECEIVED_VALUE, "contract returned an unknown value from onERC1155Received");
    }

    function _doSafeBatchTransferAcceptanceCheck(
        address _operator,
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _values,
        bytes memory _data
    ) internal {
        require(ERC1155TokenReceiver(_to).onERC1155BatchReceived(_operator, _from, _ids, _values, _data) == ERC1155_BATCH_RECEIVED_VALUE, "contract returned an unknown value from onERC1155BatchReceived");
    }
}
