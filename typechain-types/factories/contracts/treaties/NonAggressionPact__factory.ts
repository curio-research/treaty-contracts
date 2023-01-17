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
  "0x60806040523480156200001157600080fd5b5060405162001f2d38038062001f2d833981016040819052620000349162000201565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b031992831681179091556001805483168217905560028054831682179055600380549092161790556040805180820190915260138082527f4e6f6e2d41676772657373696f6e205061637400000000000000000000000000602090920191825262000122916004916200015b565b506040518060600160405280603b815260200162001ef2603b9139805162000153916005916020909101906200015b565b50506200026f565b828054620001699062000233565b90600052602060002090601f0160209004810192826200018d5760008555620001d8565b82601f10620001a857805160ff1916838001178555620001d8565b82800160010185558215620001d8579182015b82811115620001d8578251825591602001919060010190620001bb565b50620001e6929150620001ea565b5090565b5b80821115620001e65760008155600101620001eb565b6000602082840312156200021457600080fd5b81516001600160a01b03811681146200022c57600080fd5b9392505050565b600181811c908216806200024857607f821691505b6020821081036200026957634e487b7160e01b600052602260045260246000fd5b50919050565b611c73806200027f6000396000f3fe608060405234801561001057600080fd5b50600436106102ac5760003560e01c80636a333c391161017b578063d553ed48116100d8578063f0b7db4e1161008c578063f2e1730b11610071578063f2e1730b146102b1578063f851a440146103f3578063fa91f75e146102b157600080fd5b8063f0b7db4e146103cd578063f2395dc3146103e057600080fd5b8063e534ae5f116100bd578063e534ae5f146102b1578063e75991fa146102b1578063ec19ae80146102b157600080fd5b8063d553ed48146102b1578063d924100e146103c457600080fd5b8063a83280bc1161012f578063c009a6cb11610114578063c009a6cb146102b1578063c3fe3e28146103b1578063cbb34e86146102b157600080fd5b8063a83280bc146102b1578063b250ede5146103a957600080fd5b8063993a04b711610160578063993a04b71461036b5780639bcecd0b146102b1578063a1a74aae1461039657600080fd5b80636a333c391461034c5780637284e4161461036357600080fd5b80632b9b15ad1161022957806347b958a6116101dd5780635f310b12116101c25780635f310b12146102b157806360acfcc6146102b15780636a2a2b4e1461033957600080fd5b806347b958a6146103315780634ad30a91146102b157600080fd5b80632efd66291161020e5780632efd66291461031e57806337415516146102b157806339ebfad4146102b157600080fd5b80632b9b15ad1461030b5780632d47fe27146102b157600080fd5b80631c35717311610280578063243086c411610265578063243086c4146102b157806328f59b83146103035780632b451c64146102b157600080fd5b80631c357173146102b15780631e15495c146102b157600080fd5b8062048f5a146102b157806304dc7c74146102b157806306fdde03146102d957806314f2c435146102ee575b600080fd5b6102c46102bf366004611918565b610406565b60405190151581526020015b60405180910390f35b6102e1610470565b6040516102d091906119cf565b6103016102fc3660046119e9565b6104fe565b005b6103016107b0565b6102c4610319366004611a02565b610905565b61030161032c366004611a32565b610b20565b610301610c66565b6102c4610347366004611918565b610e3f565b61035560065481565b6040519081526020016102d0565b6102e1610fee565b60025461037e906001600160a01b031681565b6040516001600160a01b0390911681526020016102d0565b6103016103a43660046119e9565b610ffb565b6103016112bf565b60015461037e906001600160a01b031681565b61035560075481565b60005461037e906001600160a01b031681565b6103016103ee3660046119e9565b61143c565b60035461037e906001600160a01b031681565b600080546001600160a01b031633146104665760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b6004805461047d90611aa1565b80601f01602080910402602001604051908101604052809291908181526020018280546104a990611aa1565b80156104f65780601f106104cb576101008083540402835291602001916104f6565b820191906000526020600020905b8154815290600101906020018083116104d957829003601f168201915b505050505081565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610547573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056b9190611adb565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa1580156105cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f39190611af4565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161062091815260200190565b600060405180830381865afa15801561063d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526106659190810190611b1d565b8060200190518101906106789190611adb565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa1580156106c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e59190611adb565b81146107335760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c604482015260640161045d565b6003546040517f37e9323a000000000000000000000000000000000000000000000000000000008152600481018590526001600160a01b03909116906337e9323a906024015b600060405180830381600087803b15801561079357600080fd5b505af11580156107a7573d6000803e3d6000fd5b50505050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156107f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061081d9190611adb565b905061082a81601e610905565b61089c5760405162461bcd60e51b815260206004820152602960248201527f4e41506163743a204d757374207374617920666f72206174206c65617374203360448201527f30207365636f6e64730000000000000000000000000000000000000000000000606482015260840161045d565b6003546040516307c25c6f60e21b8152600481018390526001600160a01b0390911690631f0971bc90602401600060405180830381600087803b1580156108e257600080fd5b505af11580156108f6573d6000803e3d6000fd5b505050506109026116a2565b50565b60025460405163b356003960e01b815230600482015260009182916001600160a01b039091169063b356003990602401602060405180830381865afa158015610952573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109769190611adb565b6002546040516384d969bd60e01b815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa1580156109f2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a169190611af4565b60025460405163344289d960e11b815260048101889052602481018590526001600160a01b0392831692634c518fdc92169063688513b290604401602060405180830381865afa158015610a6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a929190611adb565b6040518263ffffffff1660e01b8152600401610ab091815260200190565b600060405180830381865afa158015610acd573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610af59190810190611b1d565b806020019051810190610b089190611adb565b9050610b148482611b94565b42101595945050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610b69573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b8d9190611adb565b60035460025460405163b356003960e01b81523060048201529293506001600160a01b039182169263def70047928592899291169063b356003990602401602060405180830381865afa158015610be8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c0c9190611adb565b87876040518663ffffffff1660e01b8152600401610c2e959493929190611bba565b600060405180830381600087803b158015610c4857600080fd5b505af1158015610c5c573d6000803e3d6000fd5b5050505050505050565b60025460405163b356003960e01b81523360048201526001600160a01b039091169063d4c8cfb190829063b356003990602401602060405180830381865afa158015610cb6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cda9190611adb565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa158015610d22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d469190611adb565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401602060405180830381865afa158015610d9f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dc39190611bf2565b610e355760405162461bcd60e51b815260206004820152602e60248201527f437572696f5472656174793a204f6e6c792077686974656c6973746564206e6160448201527f74696f6e732063616e2063616c6c000000000000000000000000000000000000606482015260840161045d565b610e3d611771565b565b60008082806020019051810190610e569190611c0f565b6002546040517ff27fe5da00000000000000000000000000000000000000000000000000000000815260048101839052919450600093506001600160a01b0316915063f27fe5da90602401602060405180830381865afa158015610ebe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ee29190611adb565b60025460405163b356003960e01b81523060048201529192506000916001600160a01b039091169063b356003990602401602060405180830381865afa158015610f30573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f549190611adb565b60025460405163344289d960e11b815260048101859052602481018390529192506001600160a01b03169063688513b290604401602060405180830381865afa158015610fa5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc99190611adb565b15610fda576000935050505061046a565b610fe48686610406565b9695505050505050565b6005805461047d90611aa1565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015611044573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110689190611adb565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa1580156110cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110f09190611af4565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161111d91815260200190565b600060405180830381865afa15801561113a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526111629190810190611b1d565b8060200190518101906111759190611adb565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa1580156111be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111e29190611adb565b81146112305760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c604482015260640161045d565b6003546040516307c25c6f60e21b8152600481018590526001600160a01b0390911690631f0971bc90602401600060405180830381600087803b15801561127657600080fd5b505af115801561128a573d6000803e3d6000fd5b50506003546040516317ff785160e21b8152600481018790526001600160a01b039091169250635ffde1449150602401610779565b60025460405163b356003960e01b81523060048201526001600160a01b039091169063b356003990602401602060405180830381865afa158015611307573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061132b9190611adb565b6006556002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201526001600160a01b03909116906384d969bd90606401602060405180830381865afa15801561138c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113b09190611af4565b6001600160a01b0316634c518fdc6006546040518263ffffffff1660e01b81526004016113df91815260200190565b600060405180830381865afa1580156113fc573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526114249190810190611b1d565b8060200190518101906114379190611adb565b600755565b60025460405163b356003960e01b81523060048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015611485573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114a99190611adb565b6002546040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529192506000916001600160a01b03909116906384d969bd90606401602060405180830381865afa15801561150d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115319190611af4565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161155e91815260200190565b600060405180830381865afa15801561157b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526115a39190810190611b1d565b8060200190518101906115b69190611adb565b60025460405163b356003960e01b81523360048201529192506001600160a01b03169063b356003990602401602060405180830381865afa1580156115ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116239190611adb565b81146116715760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c604482015260640161045d565b6003546040516307c25c6f60e21b8152600481018590526001600160a01b0390911690631f0971bc90602401610779565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156116eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061170f9190611adb565b6003546040516317ff785160e21b8152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b15801561175657600080fd5b505af115801561176a573d6000803e3d6000fd5b5050505050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156117ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117de9190611adb565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af1158015611843573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118679190611adb565b5050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156118aa576118aa61186b565b604052919050565b600067ffffffffffffffff8211156118cc576118cc61186b565b50601f01601f191660200190565b60006118ed6118e8846118b2565b611881565b905082815283838301111561190157600080fd5b828260208301376000602084830101529392505050565b6000806040838503121561192b57600080fd5b82359150602083013567ffffffffffffffff81111561194957600080fd5b8301601f8101851361195a57600080fd5b611969858235602084016118da565b9150509250929050565b60005b8381101561198e578181015183820152602001611976565b8381111561199d576000848401525b50505050565b600081518084526119bb816020860160208601611973565b601f01601f19169290920160200192915050565b6020815260006119e260208301846119a3565b9392505050565b6000602082840312156119fb57600080fd5b5035919050565b60008060408385031215611a1557600080fd5b50508035926020909101359150565b801515811461090257600080fd5b600080600060608486031215611a4757600080fd5b833567ffffffffffffffff811115611a5e57600080fd5b8401601f81018613611a6f57600080fd5b611a7e868235602084016118da565b935050602084013591506040840135611a9681611a24565b809150509250925092565b600181811c90821680611ab557607f821691505b602082108103611ad557634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215611aed57600080fd5b5051919050565b600060208284031215611b0657600080fd5b81516001600160a01b03811681146119e257600080fd5b600060208284031215611b2f57600080fd5b815167ffffffffffffffff811115611b4657600080fd5b8201601f81018413611b5757600080fd5b8051611b656118e8826118b2565b818152856020838501011115611b7a57600080fd5b611b8b826020830160208601611973565b95945050505050565b60008219821115611bb557634e487b7160e01b600052601160045260246000fd5b500190565b85815260a060208201526000611bd360a08301876119a3565b6040830195909552506060810192909252151560809091015292915050565b600060208284031215611c0457600080fd5b81516119e281611a24565b600080600060608486031215611c2457600080fd5b835192506020840151915060408401519050925092509256fea264697066735822122082bc4cc0e9f60b66b1dbe400eb3bb6ec063b1788dbb8d6eb9a2226953af5729364736f6c634300080d00334d656d626572206e6174696f6e732063616e6e6f7420626174746c652061726d696573206f722074696c6573206f66206f6e6520616e6f74686572";

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
