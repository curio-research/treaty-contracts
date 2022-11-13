import { Curio } from 'curio-vault';
import { Signer } from 'ethers';
import { HardhatArguments, HardhatRuntimeEnvironment } from 'hardhat/types';

export interface MapInput {
  width: number;
  height: number;
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
}

export interface DeployArgs extends HardhatArguments {
  fixmap: boolean;
  release: boolean;
  port: string | undefined;
  indexer: boolean;
  name: string | undefined;
}
