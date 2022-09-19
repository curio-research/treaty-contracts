// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// FIXME: add back Ownable
contract NATO {
    address[] public memberStates;
    mapping(address => bool) public isMemberStates;

    // title: nato
    // description
    // membershipStates [button]
    // return -> [0x123... ,0x3erkd ...]
    // isMemberStates [input box for address] [button for submission]
    // return -> [boolean]

    // ----------------------------------------------------------
    // Article I: The "Open Door"
    // ----------------------------------------------------------
    function joinTreaty() external returns (bool) {
        address _memberState = msg.sender;

        memberStates.push(_memberState);
        isMemberStates[_memberState] = true;

        return true;
    }

    // ----------------------------------------------------------
    // Article II: On Denunciation of the Treaty
    // ----------------------------------------------------------
    function denounceTreaty() external returns (bool) {
        address _memberState = msg.sender;
        uint256 memberStatesSize = memberStates.length;
        uint256 _index = 0;

        while (_index < memberStatesSize) {
            if (memberStates[_index] == _memberState) break;
            _index++;
        }

        memberStates[_index] = memberStates[memberStatesSize - 1];
        memberStates.pop();

        isMemberStates[_memberState] = false;

        return true;
    }

    // ----------------------------------------------------------
    // Article III: Truce between Member Nations
    // MoveArmy as substitution; battle not done yet
    // Default is approving as long as it's memberstate (for mvp)
    // ----------------------------------------------------------

    function approveMoveArmy() external view returns (bool) {
        address _memberState = msg.sender;
        require(isMemberStates[_memberState], "NATO: Nation is not bound by the Treaty");
        return true;
    }
}