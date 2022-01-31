import { RecipeStructOutput } from "./../typechain-types/Minigame";
import { expect } from "chai";
import { items, constants, blocks } from "./util/constants";
import { Getters } from "../typechain-types";
import { World, initializeWorld, AllContracts } from "./util/testWorld";
import { fixtureLoader } from "./util/helper";
import { GenerateWalls, GenerateTowerPos } from "../tasks/util/map";

describe("Map", () => {
  let world: World;
  let contracts: AllContracts;
  let Getters: Getters;

  const worldFixture = async () => {
    const world = await fixtureLoader(initializeWorld);
    return world;
  };

  //     before(async () => {
  //       world = await fixtureLoader(worldFixture);
  //       contracts = world.contracts;
  //       Getters = world.contracts.Getters;

  //       // initialize players
  //       await contracts.Game.connect(world.user1).initializePlayer(1, 1);
  //       await contracts.Game.connect(world.user2).initializePlayer(2, 1);
  //     });

  it("Map generation", async () => {
    const WORLD_WIDTH = 7;
    const WORLD_HEIGHT = 7;
    const ROOM_WIDTH = 7;

    const wallCoords = GenerateWalls(WORLD_WIDTH, WORLD_HEIGHT);
    const towerCoords = GenerateTowerPos(WORLD_WIDTH, WORLD_HEIGHT, ROOM_WIDTH);

    // console.log(wallCoords);
    // console.log(towerCoords);

    // print as ascii
    let map: any = [];
    for (let y = 0; y < WORLD_HEIGHT; y++) {
      let row: string[] = [];
      for (let x = 0; x < WORLD_WIDTH; x++) {
        row.push("0");
      }
      map.push(row);
    }

    console.log(wallCoords);

    wallCoords.forEach((wall) => {
      map[wall.y][wall.x] = "X";
    });

    console.log(map);
  });
});
