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
    mapping(uint256 => mapping(address => uint256)) internal balances;

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

    function safeBatchTransferFrom(
        address _from,
        address _to,
        uint256[] calldata _ids,
        uint256[] calldata _values,
        bytes calldata _data
    ) external {
        // MUST Throw on errors
        require(_to != address(0x0), "destination address must be non-zero.");
        require(_ids.length == _values.length, "_ids and _values array length must match.");
        require(_from == msg.sender || operatorApproval[_from][msg.sender] == true, "Need operator approval for 3rd party transfers.");

        for (uint256 i = 0; i < _ids.length; ++i) {
            uint256 id = _ids[i];
            uint256 value = _values[i];

            // SafeMath will throw with insuficient funds _from
            // or if _id is not valid (balance will be 0)
            balances[id][_from] = balances[id][_from].sub(value);
            balances[id][_to] = value.add(balances[id][_to]);
        }

        // MUST emit event
        emit TransferBatch(msg.sender, _from, _to, _ids, _values);

        // Now that the balances are updated and the events are emitted,
        // call onERC1155BatchReceived if the destination is a contract.
        if (_to.isContract()) {
            _doSafeBatchTransferAcceptanceCheck(msg.sender, _from, _to, _ids, _values, _data);
        }
    }

    /***********************************|
  |         Balance Functions         |
  |__________________________________*/

    function balanceOf(address _owner, uint256 _id) external view returns (uint256) {
        return balances[_id][_owner];
    }

    function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory) {
        require(_owners.length == _ids.length);

        uint256[] memory batchBalances = new uint256[](_owners.length);

        for (uint256 i = 0; i < _owners.length; ++i) {
            batchBalances[i] = balances[_ids[i]][_owners[i]];
        }

        return batchBalances;
    }

    function setApprovalForAll(address _operator, bool _approved) external {
        operatorApproval[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
        return operatorApproval[_owner][_operator];
    }

    /***********************************|
  |         Transfer Acceptance Check   |
  |__________________________________*/

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
