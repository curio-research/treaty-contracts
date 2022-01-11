const hre = require("hardhat");
const { _positions, _blockTypes, deployGameContract, deployGettersContract } = require("../test/util/helper");

// deploy command:
// npx hardhat run --network localhost scripts/deploy.js

const main = async () => {
  const GameContract = await deployGameContract();
  const GettersContract = await deployGettersContract(GameContract.address);

  // initialize user at 1, 1
  await GameContract.initializePlayer(1, 1);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
