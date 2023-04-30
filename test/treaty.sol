//SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import {Test} from "forge/Test.sol";
import {console} from "forge/console.sol";

import "contracts/Game.sol";
import "contracts/Treaty.sol";

contract TreatyTest is Test {
    address player1 = address(0x1);
    address player2 = address(0x2);

    function testTreaty() public {
        // spawn game
        Game game = new Game();

        // create treaty contract
        Treaty treaty = new Treaty(address(game));

        // set the treaty
        game.setTreaty(address(treaty));

        // have two players join
        vm.prank(player1);
        game.join();

        vm.prank(player2);
        game.join();

        // have player1 attack player2
        vm.prank(player1);
        game.attack(2);
    }
}
