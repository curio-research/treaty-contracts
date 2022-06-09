# Curio Smart Contracts

Make sure that hardhat is installed globally.

Run `yarn install` first to install dependencies

To run Hardhat tests use `npx hardhat test`
To compile contracts run `forge build`. Compiled ABIs wil be in the `out` folder.
To run Foundry tests use `yarn forge-test`

To deploy the contracts first spin up a local network using `npx hardhat node`
To deploy contracts use `npx hardhat deploy --network ${NETWORK_NAME}`
