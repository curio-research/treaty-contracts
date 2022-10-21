forge build
lsof -ti:8545 | xargs kill
# anvil --balance 100000000000000 --gas-limit 10000000000 --code-size-limit 100000000000  --base-fee 100 --host 100.117.164.103 --gas-price 1000 --timestamp 0 --silent & npx hardhat deploy --network tailscale
anvil --balance 100000000000000 --gas-limit 10000000000 --code-size-limit 100000000000 --base-fee 0 --gas-price 1000 --timestamp 0 --silent & npx hardhat deploy
# anvil --balance 100000000000000 --gas-limit 10000000000 --code-size-limit 100000000000 --base-fee 100 --block-time 1 --gas-price 1000 --timestamp 0 --silent & npx hardhat deploy


