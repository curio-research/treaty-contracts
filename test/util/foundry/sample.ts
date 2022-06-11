import { ethers } from 'ethers';
import { _worldConstants } from '../../../tasks/deploy';

const examplePos = {
  x: 346234,
  y: 234,
};

// here we must manually define structs as a string
export const PosStruct = `tuple(
    uint256 x,
    uint256 y
)`;

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

// export const TroopTypes = `TroopType[]`;

const worldConstants = _worldConstants;
const troopTypes: number[] = [];

// WorldConstants memory _constants, TroopType[] memory _troopTypes

process.stdout.write(ethers.utils.defaultAbiCoder.encode([WorldConstants, TroopTypes], [worldConstants, troopTypes]));
