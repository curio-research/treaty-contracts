import { WorldConstantsStruct } from './../../../typechain-types/Curio';
import { ethers } from 'ethers';
import { WORLD_WIDTH, WORLD_HEIGHT, NUM_PORTS, NUM_CITIES, MAP_INTERVAL, SECONDS_PER_TURN } from '../../../tasks/util/constants';
const hre = require('hardhat');

// here we must manually define structs as strings

export const worldConstants: WorldConstantsStruct = {
  admin: '0x0000000000000000000000000000000000000000',
  worldWidth: WORLD_WIDTH,
  worldHeight: WORLD_HEIGHT,
  numPorts: NUM_PORTS,
  numCities: NUM_CITIES,
  mapInterval: MAP_INTERVAL,
  secondsPerTurn: SECONDS_PER_TURN,
};

export const WorldConstants = `tuple(
  address admin,
  uint256 worldWidth,
  uint256 worldHeight,
  uint256 numPorts,
  uint256 numCities,
  uint256 mapInterval,
  uint256 secondsPerTurn
)`;

export const TroopTypes = `tuple(
  uint256 name,
  uint256 movesPerEpoch,
  uint256 maxHealth,
  uint256 damagePerHit,
  uint256 attackFactor,
  uint256 defenseFactor,
  uint256 cargoCapacity,
  uint256 epochsToProduce,
  uint256 movementCooldown,
  uint256 attackCooldown,
  bool isLandTroop
)[]`;

const troopTypes: number[] = [];

// WorldConstants memory _constants, TroopType[] memory _troopTypes
process.stdout.write(ethers.utils.defaultAbiCoder.encode([WorldConstants, TroopTypes], [worldConstants, troopTypes]));
