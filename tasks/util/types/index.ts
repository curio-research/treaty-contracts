import { Curio } from '../../../typechain-types/hardhat-diamond-abi/Curio';
import { HardhatArguments, HardhatRuntimeEnvironment } from 'hardhat/types';

export interface MapInput {
  width: number;
  height: number;
  innerRadiusByTileCount?: number;
}

export interface LoadTestSetupInput {
  hre: HardhatRuntimeEnvironment;
  diamond: Curio;
}

export interface LoadTestSetupOutput {
  playerIds: number[];
  armyIds: number[];
}

export interface LoadTestConfig {
  txsPerPlayer: number;
  periodPerTxBatchInMs: number;
  totalTimeoutInMs: number;
}

export interface DeployArgs extends HardhatArguments {
  fixmap: boolean;
  release: boolean;
  port: string | undefined;
  indexer: boolean;
  name: string | undefined;
  whitelist: string | undefined;
}

export interface WhitelistArgs extends HardhatArguments {
  address: string;
  diamond: string;
}

export interface UnlockTileArgs extends HardhatArguments {
  diamond: string;
}

export interface SetGameParameterArgs extends HardhatArguments {
  diamond: string;
  identifier: string;
  value: string;
}

export interface RemoveIdlePlayersArgs extends HardhatArguments {
  diamond: string;
  duration: number;
}
