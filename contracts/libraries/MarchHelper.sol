//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/console.sol";
import {BASE_NAME, Base, GameState, Position, Production, TERRAIN, Tile, Troop} from "contracts/libraries/Types.sol";
import {LibStorage} from "contracts/libraries/Storage.sol";
import {Util} from "contracts/libraries/GameUtil.sol";
import "openzeppelin-contracts/contracts/utils/math/SafeMath.sol";

// Note: Util functions generally do not verify correctness of conditions. Make sure to verify in higher-level functions such as those in Engine.
library MarchHelper {
    using SafeMath for uint256;

    function gs() internal pure returns (GameState storage) {
        return LibStorage.gameStorage();
    }

    event Moved(address _player, uint256 _troopId, uint256 _epoch, Position _startPos, Position _targetPos);
    event AttackedTroop(address _player, uint256 _troopId, Troop _troopInfo, uint256 _targetTroopId, Troop _targetTroopInfo);
    event AttackedBase(address _player, uint256 _troopId, Troop _troopInfo, uint256 _targetBaseId, Base _targetBaseInfo);
    event Death(address _player, uint256 _troopId);
    event BaseCaptured(address _player, uint256 _troopId, uint256 _baseId);


}