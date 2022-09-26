forge build
lsof -ti:8545 | xargs kill
anvil --gas-limit 100000000 --base-fee 0 --gas-price 0 & npx hardhat deploy