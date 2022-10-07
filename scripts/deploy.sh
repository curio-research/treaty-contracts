forge build
lsof -ti:8545 | xargs kill

# unixTimeInSeconds=$(date +%s)
# echo "$unixTimeInSeconds"

# anvil --gas-limit 10000000000 --code-size-limit 100000000000 --base-fee 100 --gas-price 1000 --timestamp "$(($unixTimeInSeconds-150))" --silent & npx hardhat deploy


anvil --gas-limit 10000000000 --code-size-limit 100000000000 --base-fee 100 --gas-price 1000 --timestamp 0 --silent & npx hardhat deploy

