# Curio Smart Contracts

Make sure that hardhat is installed globally.

Run `yarn install` first to install dependencies.

To run Foundry tests use `yarn forge-test`. \
To run Hardhat tests, use `npx hardhat test`. \
To compile contracts, run `forge build` and / or `npx hardhat compile`. Compiled ABIs wil be in the `out` folder. \

To deploy the contracts first spin up a local network using `npx hardhat node`. \
Then, deploy using `npx hardhat deploy --network ${NETWORK_NAME}`. \

To deploy the testing map, use `npx hardhat deploy --network localhost --fixmap`
