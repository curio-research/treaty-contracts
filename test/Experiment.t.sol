//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "test/DiamondDeploy.t.sol";

contract ExperimentTest is Test, DiamondDeployTest {
    function testSetMapChunkGas() public {
        uint256[][] memory _chunk = generateMapChunk(10);

        vm.startPrank(deployer);
        engine.setMapChunk(Position({x: 0, y: 10}), _chunk);
        engine.setMapChunk(Position({x: 10, y: 0}), _chunk);
        engine.setMapChunk(Position({x: 10, y: 10}), _chunk);
        engine.setMapChunk(Position({x: 20, y: 0}), _chunk);
        engine.setMapChunk(Position({x: 20, y: 10}), _chunk);
        vm.stopPrank();
    }
}
