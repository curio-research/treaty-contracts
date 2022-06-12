import { EMPTY_ADDRESS } from '../../../util/network/common';
import { ethers } from 'ethers';
import { generateWorldConstants, TROOP_TYPES } from '../../../tasks/util/constants';

// here we must manually define structs as strings

// TODO: figure out way to not hardcode this
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

const worldConstants = generateWorldConstants(EMPTY_ADDRESS);
const troopTypes = TROOP_TYPES;

process.stdout.write(ethers.utils.defaultAbiCoder.encode([WorldConstants, TroopTypes], [worldConstants, troopTypes]));
