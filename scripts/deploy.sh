forge build
lsof -ti:8545 | xargs kill
anvil --gas-limit 10000000000 --code-size-limit 100000000000 --base-fee 100 --gas-price 1000 & npx hardhat deploy 
