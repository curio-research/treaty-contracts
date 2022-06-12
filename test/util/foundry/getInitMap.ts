import { ethers } from 'ethers';

// generate test map from javascript for foundry

const generateTestMap = () => {
  const map = [
    [1, 1, 4, 1, 1],
    [1, 3, 1, 3, 1],
    [0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2],
  ];

  const mapWidth = map.length;
  const mapHeight = map[0].length;

  process.stdout.write(ethers.utils.defaultAbiCoder.encode([`uint256[${mapWidth}][${mapHeight}]`], [map]));
};

generateTestMap();
