/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  NonAggressionPact,
  NonAggressionPactInterface,
} from "../../../contracts/treaties/NonAggressionPact";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_diamond",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
    ],
    name: "addToWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "contract AdminFacet",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveBattle",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveClaimTile",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDelegateGameFunction",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDeployTreaty",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDisbandArmy",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDisownTile",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveEndGather",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveEndTroopProduction",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveHarvestResource",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveHarvestResourcesFromCapital",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveJoinTreaty",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveLeaveTreaty",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveMove",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveMoveCapital",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveOrganizeArmy",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveRecoverTile",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveStartGather",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveStartTroopProduction",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveTransfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUnloadResources",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUpgradeCapital",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUpgradeResource",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUpgradeTile",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "diamond",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "game",
    outputs: [
      {
        internalType: "contract GameFacet",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getter",
    outputs: [
      {
        internalType: "contract GetterFacet",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "minimumStayCheck",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ownerID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registerTreatyAndOwnerIds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
    ],
    name: "removeFromWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
    ],
    name: "removeMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_functionName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_subjectID",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_canCall",
        type: "bool",
      },
    ],
    name: "treatyDelegateGameFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treatyID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "treatyJoin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treatyLeave",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001ed538038062001ed5833981016040819052620000349162000201565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b031992831681179091556001805483168217905560028054831682179055600380549092161790556040805180820190915260138082527f4e6f6e2d41676772657373696f6e205061637400000000000000000000000000602090920191825262000122916004916200015b565b506040518060600160405280603b815260200162001e9a603b9139805162000153916005916020909101906200015b565b50506200026f565b828054620001699062000233565b90600052602060002090601f0160209004810192826200018d5760008555620001d8565b82601f10620001a857805160ff1916838001178555620001d8565b82800160010185558215620001d8579182015b82811115620001d8578251825591602001919060010190620001bb565b50620001e6929150620001ea565b5090565b5b80821115620001e65760008155600101620001eb565b6000602082840312156200021457600080fd5b81516001600160a01b03811681146200022c57600080fd5b9392505050565b600181811c908216806200024857607f821691505b6020821081036200026957634e487b7160e01b600052602260045260246000fd5b50919050565b611c1b806200027f6000396000f3fe608060405234801561001057600080fd5b50600436106102ac5760003560e01c80636a333c391161017b578063d553ed48116100d8578063f0b7db4e1161008c578063f2e1730b11610071578063f2e1730b146102b1578063f851a440146103f3578063fa91f75e146102b157600080fd5b8063f0b7db4e146103cd578063f2395dc3146103e057600080fd5b8063e534ae5f116100bd578063e534ae5f146102b1578063e75991fa146102b1578063ec19ae80146102b157600080fd5b8063d553ed48146102b1578063d924100e146103c457600080fd5b8063a83280bc1161012f578063c009a6cb11610114578063c009a6cb146102b1578063c3fe3e28146103b1578063cbb34e86146102b157600080fd5b8063a83280bc146102b1578063b250ede5146103a957600080fd5b8063993a04b711610160578063993a04b71461036b5780639bcecd0b146102b1578063a1a74aae1461039657600080fd5b80636a333c391461034c5780637284e4161461036357600080fd5b80632b9b15ad1161022957806347b958a6116101dd5780635f310b12116101c25780635f310b12146102b157806360acfcc6146102b15780636a2a2b4e1461033957600080fd5b806347b958a6146103315780634ad30a91146102b157600080fd5b80632efd66291161020e5780632efd66291461031e57806337415516146102b157806339ebfad4146102b157600080fd5b80632b9b15ad1461030b5780632d47fe27146102b157600080fd5b80631c35717311610280578063243086c411610265578063243086c4146102b157806328f59b83146103035780632b451c64146102b157600080fd5b80631c357173146102b15780631e15495c146102b157600080fd5b8062048f5a146102b157806304dc7c74146102b157806306fdde03146102d957806314f2c435146102ee575b600080fd5b6102c46102bf3660046118c7565b610406565b60405190151581526020015b60405180910390f35b6102e1610470565b6040516102d0919061197e565b6103016102fc366004611998565b6104fe565b005b6103016107b0565b6102c46103193660046119b1565b610905565b61030161032c3660046119e1565b610b20565b610301610c15565b6102c46103473660046118c7565b610dee565b61035560065481565b6040519081526020016102d0565b6102e1610f9d565b60025461037e906001600160a01b031681565b6040516001600160a01b0390911681526020016102d0565b6103016103a4366004611998565b610faa565b61030161126e565b60015461037e906001600160a01b031681565b61035560075481565b60005461037e906001600160a01b031681565b6103016103ee366004611998565b6113eb565b60035461037e906001600160a01b031681565b600080546001600160a01b031633146104665760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b6004805461047d90611a50565b80601f01602080910402602001604051908101604052809291908181526020018280546104a990611a50565b80156104f65780601f106104cb576101008083540402835291602001916104f6565b820191906000526020600020905b8154815290600101906020018083116104d957829003601f168201915b505050505081565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610547573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056b9190611a8a565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa1580156105cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f39190611aa3565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161062091815260200190565b600060405180830381865afa15801561063d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526106659190810190611acc565b8060200190518101906106789190611a8a565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa1580156106c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e59190611a8a565b81146107335760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c604482015260640161045d565b6003546040517f37e9323a000000000000000000000000000000000000000000000000000000008152600481018590526001600160a01b03909116906337e9323a906024015b600060405180830381600087803b15801561079357600080fd5b505af11580156107a7573d6000803e3d6000fd5b50505050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156107f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061081d9190611a8a565b905061082a81601e610905565b61089c5760405162461bcd60e51b815260206004820152602960248201527f4e41506163743a204d757374207374617920666f72206174206c65617374203360448201527f30207365636f6e64730000000000000000000000000000000000000000000000606482015260840161045d565b6003546040516307c25c6f60e21b8152600481018390526001600160a01b0390911690631f0971bc90602401600060405180830381600087803b1580156108e257600080fd5b505af11580156108f6573d6000803e3d6000fd5b50505050610902611651565b50565b60025460405163b356003960e01b815230600482015260009182916001600160a01b039091169063b356003990602401602060405180830381865afa158015610952573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109769190611a8a565b6002546040516384d969bd60e01b815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa1580156109f2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a169190611aa3565b60025460405163344289d960e11b815260048101889052602481018590526001600160a01b0392831692634c518fdc92169063688513b290604401602060405180830381865afa158015610a6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a929190611a8a565b6040518263ffffffff1660e01b8152600401610ab091815260200190565b600060405180830381865afa158015610acd573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610af59190810190611acc565b806020019051810190610b089190611a8a565b9050610b148482611b43565b42101595945050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610b69573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b8d9190611a8a565b6003546040517fef3e41660000000000000000000000000000000000000000000000000000000081529192506001600160a01b03169063ef3e416690610bdd908490889088908890600401611b69565b600060405180830381600087803b158015610bf757600080fd5b505af1158015610c0b573d6000803e3d6000fd5b5050505050505050565b60025460405163b356003960e01b81523360048201526001600160a01b039091169063d4c8cfb190829063b356003990602401602060405180830381865afa158015610c65573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c899190611a8a565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa158015610cd1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cf59190611a8a565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401602060405180830381865afa158015610d4e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d729190611b9a565b610de45760405162461bcd60e51b815260206004820152602e60248201527f437572696f5472656174793a204f6e6c792077686974656c6973746564206e6160448201527f74696f6e732063616e2063616c6c000000000000000000000000000000000000606482015260840161045d565b610dec611720565b565b60008082806020019051810190610e059190611bb7565b6002546040517ff27fe5da00000000000000000000000000000000000000000000000000000000815260048101839052919450600093506001600160a01b0316915063f27fe5da90602401602060405180830381865afa158015610e6d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e919190611a8a565b60025460405163b356003960e01b81523060048201529192506000916001600160a01b039091169063b356003990602401602060405180830381865afa158015610edf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f039190611a8a565b60025460405163344289d960e11b815260048101859052602481018390529192506001600160a01b03169063688513b290604401602060405180830381865afa158015610f54573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f789190611a8a565b15610f89576000935050505061046a565b610f938686610406565b9695505050505050565b6005805461047d90611a50565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610ff3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110179190611a8a565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa15801561107b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061109f9190611aa3565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b81526004016110cc91815260200190565b600060405180830381865afa1580156110e9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526111119190810190611acc565b8060200190518101906111249190611a8a565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa15801561116d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111919190611a8a565b81146111df5760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c604482015260640161045d565b6003546040516307c25c6f60e21b8152600481018590526001600160a01b0390911690631f0971bc90602401600060405180830381600087803b15801561122557600080fd5b505af1158015611239573d6000803e3d6000fd5b50506003546040516317ff785160e21b8152600481018790526001600160a01b039091169250635ffde1449150602401610779565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa1580156112b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112da9190611a8a565b6006556002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201526001600160a01b03909116906384d969bd90606401602060405180830381865afa15801561133b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061135f9190611aa3565b6001600160a01b0316634c518fdc6006546040518263ffffffff1660e01b815260040161138e91815260200190565b600060405180830381865afa1580156113ab573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526113d39190810190611acc565b8060200190518101906113e69190611a8a565b600755565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015611434573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114589190611a8a565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa1580156114bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114e09190611aa3565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161150d91815260200190565b600060405180830381865afa15801561152a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526115529190810190611acc565b8060200190518101906115659190611a8a565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa1580156115ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115d29190611a8a565b81146116205760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c604482015260640161045d565b6003546040516307c25c6f60e21b8152600481018590526001600160a01b0390911690631f0971bc90602401610779565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa15801561169a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116be9190611a8a565b6003546040516317ff785160e21b8152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b15801561170557600080fd5b505af1158015611719573d6000803e3d6000fd5b5050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015611769573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061178d9190611a8a565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af11580156117f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118169190611a8a565b5050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156118595761185961181a565b604052919050565b600067ffffffffffffffff82111561187b5761187b61181a565b50601f01601f191660200190565b600061189c61189784611861565b611830565b90508281528383830111156118b057600080fd5b828260208301376000602084830101529392505050565b600080604083850312156118da57600080fd5b82359150602083013567ffffffffffffffff8111156118f857600080fd5b8301601f8101851361190957600080fd5b61191885823560208401611889565b9150509250929050565b60005b8381101561193d578181015183820152602001611925565b8381111561194c576000848401525b50505050565b6000815180845261196a816020860160208601611922565b601f01601f19169290920160200192915050565b6020815260006119916020830184611952565b9392505050565b6000602082840312156119aa57600080fd5b5035919050565b600080604083850312156119c457600080fd5b50508035926020909101359150565b801515811461090257600080fd5b6000806000606084860312156119f657600080fd5b833567ffffffffffffffff811115611a0d57600080fd5b8401601f81018613611a1e57600080fd5b611a2d86823560208401611889565b935050602084013591506040840135611a45816119d3565b809150509250925092565b600181811c90821680611a6457607f821691505b602082108103611a8457634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215611a9c57600080fd5b5051919050565b600060208284031215611ab557600080fd5b81516001600160a01b038116811461199157600080fd5b600060208284031215611ade57600080fd5b815167ffffffffffffffff811115611af557600080fd5b8201601f81018413611b0657600080fd5b8051611b1461189782611861565b818152856020838501011115611b2957600080fd5b611b3a826020830160208601611922565b95945050505050565b60008219821115611b6457634e487b7160e01b600052601160045260246000fd5b500190565b848152608060208201526000611b826080830186611952565b60408301949094525090151560609091015292915050565b600060208284031215611bac57600080fd5b8151611991816119d3565b600080600060608486031215611bcc57600080fd5b835192506020840151915060408401519050925092509256fea26469706673582212204ba0ece571522bee2556a1b83a7b82dac89b3579cab918adf9b88b983d083d9e64736f6c634300080d00334d656d626572206e6174696f6e732063616e6e6f7420626174746c652061726d696573206f722074696c6573206f66206f6e6520616e6f74686572";

type NonAggressionPactConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NonAggressionPactConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NonAggressionPact__factory extends ContractFactory {
  constructor(...args: NonAggressionPactConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NonAggressionPact> {
    return super.deploy(
      _diamond,
      overrides || {}
    ) as Promise<NonAggressionPact>;
  }
  override getDeployTransaction(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_diamond, overrides || {});
  }
  override attach(address: string): NonAggressionPact {
    return super.attach(address) as NonAggressionPact;
  }
  override connect(signer: Signer): NonAggressionPact__factory {
    return super.connect(signer) as NonAggressionPact__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NonAggressionPactInterface {
    return new utils.Interface(_abi) as NonAggressionPactInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NonAggressionPact {
    return new Contract(address, _abi, signerOrProvider) as NonAggressionPact;
  }
}
