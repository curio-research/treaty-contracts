import { Curio } from './../../typechain-types/hardhat-diamond-abi/Curio';
import { chainInfo, componentNameToId, Component__factory, decodeBigNumberishArr, encodePosition, encodeString, Position, Tag } from 'curio-vault';
import { TILE_WIDTH } from './constants';
import chalk from 'chalk';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

// enum TEST_FUNCTION_NAME {
//   FOUND_CITY = 'foundCity',
//   MOVE = 'move',
//   BATTLE = 'battle',
// }

export const testLoad = async (hre: HardhatRuntimeEnvironment, diamond: Curio, playerCount: number, periodPerTnPerPlayer: number, tnsPerPlayer: number, functionName: string) => {
  // Get players

  // Fetch players
  const players: SignerWithAddress[] = await hre.ethers.getSigners(); // players[0] is the game admin
  const admin = players[0];
  console.log(chalk.bgRed.yellow('>>> Signer count:', players.length));
  if (players.length < playerCount) throw new Error('Not enough signers');

  // Fetch gas limit, and necessary components
  const gasLimit = chainInfo[hre.network.name].gasLimit;
  const positionComponentAddr = await diamond.getComponentById(componentNameToId[Position]);
  const positionComponent = Component__factory.connect(positionComponentAddr, admin);
  const tagComponentAddr = await diamond.getComponentById(componentNameToId[Tag]);
  const tagComponent = Component__factory.connect(tagComponentAddr, admin);

  // Initialize each player with a city (sync)
  let startTime = performance.now();
  for (let i = 0; i < playerCount; i++) {
    console.log(chalk.bgRed.yellow.dim(`>>> initializing player with city ${i}`));
    await (await diamond.connect(players[i]).initializePlayer({ x: i * TILE_WIDTH, y: 0 }, `Player ${i}`, { gasLimit: gasLimit })).wait();
    const settlerId = decodeBigNumberishArr(await positionComponent.getEntitiesWithValue(encodePosition({ x: i * TILE_WIDTH, y: 0 }), { gasLimit: gasLimit }))[0];
    if (!settlerId) throw new Error('Settler not initialized yet');
    await confirm(await diamond.connect(players[i]).foundCity(settlerId, [{ x: i * TILE_WIDTH, y: 0 }], `City ${i}`, { gasLimit: gasLimit }), hre);
  }
  console.log(chalk.bgRed.yellow(`>>> Players initialized with city after ${performance.now() - startTime} ms`));
  const playerIds = players.map(async (player) => (await diamond.getPlayerId(player.address)).toNumber());

  // Create an army for each player and log IDs (sync)
  startTime = performance.now();
  console.log(chalk.bgRed.yellow(`>>> Starting to create armies, cities should be founded when this prints`));
  for (let i = 0; i < playerCount; i++) {
    await diamond.connect(admin).createArmy(playerIds[i], { x: i * TILE_WIDTH, y: 0 }, { gasLimit: gasLimit });
  }
  const allArmyIds = decodeBigNumberishArr(await tagComponent.getEntitiesWithValue(encodeString('Army')));
  console.log(chalk.bgRed.yellow(`>>> All armies created after ${performance.now() - startTime} ms`));
  console.log(chalk.bgRed.yellow('>>> all army IDs'), allArmyIds);

  await sleep(5000);

  // Load test begins
  for (let k = 0; k < tnsPerPlayer; k++) {
    // // Wait between batches of transactions
    // await sleep(periodPerTnPerPlayer);

    // Move all armies south by 1 coordinate (async)
    startTime = performance.now();
    let armiesAdded = 0;
    Array.from(Array(playerCount).keys()).forEach(async (i) => {
      console.log(chalk.bgRed.yellow.dim(`>>> Moving army for player ${i}...`));
      await confirm(await diamond.connect(players[i]).move(allArmyIds[i], { x: i * TILE_WIDTH, y: 1 }, { gasLimit: gasLimit }), hre);

      armiesAdded++;
      if (armiesAdded === playerCount) console.log(`>>> All army movements finished after ${performance.now() - startTime} ms`);
    });
  }
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
