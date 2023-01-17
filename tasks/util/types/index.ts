import { Curio } from '../../../typechain-types/hardhat-diamond-abi/Curio';
import { HardhatArguments, HardhatRuntimeEnvironment } from 'hardhat/types';

export interface MapInput {
  width: number;
  height: number;
  innerWidthByTileCount?: number;
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
