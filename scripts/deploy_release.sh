#!/bin/zsh
cd tasks; rm game.config.json; cd ..
for i in {1..$1}
do
    echo "####################################"
    echo "DEPLOYING SMALL GAME $i"
    npx hardhat deploy --network constellation --name small --publish --release
done

for i in {1..$2}
do
    echo "####################################"
    echo "DEPLOYING LARGE GAME $i"
    npx hardhat deploy --network constellation --name large --publish --release
done

for i in {1..$3}
do
    echo "####################################"
    echo "DEPLOYING SANDBOX GAME $i"
    npx hardhat deploy --network constellation --name sandbox --publish --release
done
