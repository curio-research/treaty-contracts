import { ethers } from 'ethers';

const examplePos = {
  x: 346234,
  y: 234,
};

// here we must manually define structs as a string
export const PosStruct = `tuple(
    uint256 x,
    uint256 y
)`;

process.stdout.write(ethers.utils.defaultAbiCoder.encode([PosStruct, 'string'], [examplePos, 'bruh moment']));
