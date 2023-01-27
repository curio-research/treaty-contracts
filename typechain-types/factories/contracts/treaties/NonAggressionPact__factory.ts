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
    stateMutability: "pure",
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
    inputs: [
      {
        internalType: "address",
        name: "_diamond",
        type: "address",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
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
    stateMutability: "pure",
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
  "0x608060405234801561001057600080fd5b50611b48806100206000396000f3fe608060405234801561001057600080fd5b506004361061020a5760003560e01c80635f310b121161012a578063cbb34e86116100bd578063ec19ae801161008c578063f2395dc311610071578063f2395dc31461031d578063f2e1730b1461020f578063fa91f75e1461020f57600080fd5b8063ec19ae801461020f578063f0b7db4e146102f257600080fd5b8063cbb34e861461020f578063d553ed481461020f578063e534ae5f1461020f578063e75991fa1461020f57600080fd5b80639bcecd0b116100f95780639bcecd0b1461020f578063a1a74aae146102df578063a83280bc1461020f578063c009a6cb1461020f57600080fd5b80635f310b121461020f57806360acfcc61461020f5780636a2a2b4e146102c45780637284e416146102d757600080fd5b806328f59b83116101a25780633741551611610171578063374155161461020f57806339ebfad41461020f57806347b958a6146102bc5780634ad30a911461020f57600080fd5b806328f59b83146102a15780632b451c641461020f5780632d47fe271461020f5780632efd6629146102a957600080fd5b806319ab453c116101de57806319ab453c1461028e5780631c3571731461020f5780631e15495c1461020f578063243086c41461020f57600080fd5b8062048f5a1461020f57806304dc7c741461020f57806306fdde031461023757806314f2c43514610279575b600080fd5b61022261021d3660046117ec565b610330565b60405190151581526020015b60405180910390f35b60408051808201909152601381527f4e6f6e2d41676772657373696f6e20506163740000000000000000000000000060208201525b60405161022e919061189f565b61028c6102873660046118b9565b61039a565b005b61028c61029c3660046118e7565b61064d565b61028c610782565b61028c6102b7366004611912565b610b53565b61028c610c99565b6102226102d23660046117ec565b610e71565b61026c61102a565b61028c6102ed3660046118b9565b61104a565b600054610305906001600160a01b031681565b6040516001600160a01b03909116815260200161022e565b61028c61032b3660046118b9565b611309565b600080546001600160a01b031633146103905760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b6000805460405163b356003960e01b81523060048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa1580156103e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040a9190611981565b6040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529091506000906001600160a01b038416906384d969bd90606401602060405180830381865afa15801561046a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048e919061199a565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b81526004016104bb91815260200190565b600060405180830381865afa1580156104d8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261050091908101906119b7565b8060200190518101906105139190611981565b60405163b356003960e01b81523360048201529091506001600160a01b0384169063b356003990602401602060405180830381865afa15801561055a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057e9190611981565b81146105cc5760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c6044820152606401610387565b6000546040517f37e9323a000000000000000000000000000000000000000000000000000000008152600481018690526001600160a01b039091169081906337e9323a906024015b600060405180830381600087803b15801561062e57600080fd5b505af1158015610642573d6000803e3d6000fd5b505050505050505050565b6000546001600160a01b0316156106cc5760405162461bcd60e51b815260206004820152602760248201527f437572696f5472656174793a2054726561747920616c726561647920696e697460448201527f69616c697a6564000000000000000000000000000000000000000000000000006064820152608401610387565b6001600160a01b0381166107485760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e6420616464726573732072657160448201527f75697265640000000000000000000000000000000000000000000000000000006064820152608401610387565b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b6000805460405163b356003960e01b8152336004820152601e926001600160a01b039092169190829063b356003990602401602060405180830381865afa1580156107d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f59190611981565b60405163b356003960e01b81523060048201529091506000906001600160a01b0384169063b356003990602401602060405180830381865afa15801561083f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108639190611981565b6040516384d969bd60e01b815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529091506000906001600160a01b038516906384d969bd90606401602060405180830381865afa1580156108db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ff919061199a565b60405163344289d960e11b815260048101859052602481018490526001600160a01b0391821691634c518fdc919087169063688513b290604401602060405180830381865afa158015610956573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061097a9190611981565b6040518263ffffffff1660e01b815260040161099891815260200190565b600060405180830381865afa1580156109b5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109dd91908101906119b7565b8060200190518101906109f09190611981565b90506109fc8582611a2e565b421015610a705760405162461bcd60e51b8152602060048201526024808201527f48617665206e6f742073746179656420666f72206d696e696d756d206475726160448201527f74696f6e000000000000000000000000000000000000000000000000000000006064820152608401610387565b6000805460405163b356003960e01b81523360048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa158015610abc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ae09190611981565b6000546040516307c25c6f60e21b8152600481018390529192506001600160a01b0316908190631f0971bc90602401600060405180830381600087803b158015610b2957600080fd5b505af1158015610b3d573d6000803e3d6000fd5b50505050610b4961156e565b5050505050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015610ba0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bc49190611981565b60405163b356003960e01b81523060048201529091506001600160a01b038084169163def700479184918a9188169063b356003990602401602060405180830381865afa158015610c19573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3d9190611981565b89896040518663ffffffff1660e01b8152600401610c5f959493929190611a54565b600060405180830381600087803b158015610c7957600080fd5b505af1158015610c8d573d6000803e3d6000fd5b50505050505050505050565b60005460405163b356003960e01b81523360048201526001600160a01b0390911690819063d4c8cfb190829063b356003990602401602060405180830381865afa158015610ceb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d0f9190611981565b60405163b356003960e01b81523060048201526001600160a01b0385169063b356003990602401602060405180830381865afa158015610d53573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d779190611981565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401602060405180830381865afa158015610dd0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610df49190611a8c565b610e665760405162461bcd60e51b815260206004820152602e60248201527f437572696f5472656174793a204f6e6c792077686974656c6973746564206e6160448201527f74696f6e732063616e2063616c6c0000000000000000000000000000000000006064820152608401610387565b610e6e611641565b50565b6000805482516001600160a01b03909116908290610e989085016020908101908601611aa9565b6040517ff27fe5da00000000000000000000000000000000000000000000000000000000815260048101829052909350600092506001600160a01b038516915063f27fe5da90602401602060405180830381865afa158015610efe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f229190611981565b60405163b356003960e01b81523060048201529091506000906001600160a01b0385169063b356003990602401602060405180830381865afa158015610f6c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f909190611981565b60405163344289d960e11b815260048101849052602481018290529091506001600160a01b0385169063688513b290604401602060405180830381865afa158015610fdf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110039190611981565b15611015576000945050505050610394565b61101f8787610330565b979650505050505050565b60606040518060600160405280603b8152602001611ad8603b9139905090565b6000805460405163b356003960e01b81523060048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa158015611096573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110ba9190611981565b6040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529091506000906001600160a01b038416906384d969bd90606401602060405180830381865afa15801561111a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061113e919061199a565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161116b91815260200190565b600060405180830381865afa158015611188573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526111b091908101906119b7565b8060200190518101906111c39190611981565b60405163b356003960e01b81523360048201529091506001600160a01b0384169063b356003990602401602060405180830381865afa15801561120a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061122e9190611981565b811461127c5760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c6044820152606401610387565b6000546040516307c25c6f60e21b8152600481018690526001600160a01b03909116908190631f0971bc90602401600060405180830381600087803b1580156112c457600080fd5b505af11580156112d8573d6000803e3d6000fd5b50506040516317ff785160e21b8152600481018890526001600160a01b0384169250635ffde1449150602401610614565b6000805460405163b356003960e01b81523060048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa158015611355573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113799190611981565b6040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529091506000906001600160a01b038416906384d969bd90606401602060405180830381865afa1580156113d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113fd919061199a565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161142a91815260200190565b600060405180830381865afa158015611447573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261146f91908101906119b7565b8060200190518101906114829190611981565b60405163b356003960e01b81523360048201529091506001600160a01b0384169063b356003990602401602060405180830381865afa1580156114c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114ed9190611981565b811461153b5760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c6044820152606401610387565b6000546040516307c25c6f60e21b8152600481018690526001600160a01b03909116908190631f0971bc90602401610614565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa1580156115bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115df9190611981565b6040516317ff785160e21b8152600481018290529091506001600160a01b03831690635ffde14490602401600060405180830381600087803b15801561162457600080fd5b505af1158015611638573d6000803e3d6000fd5b50505050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa15801561168e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116b29190611981565b6040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b0383169063ff2a5e79906024016020604051808303816000875af1158015611715573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117399190611981565b50505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561177e5761177e61173f565b604052919050565b600067ffffffffffffffff8211156117a0576117a061173f565b50601f01601f191660200190565b60006117c16117bc84611786565b611755565b90508281528383830111156117d557600080fd5b828260208301376000602084830101529392505050565b600080604083850312156117ff57600080fd5b82359150602083013567ffffffffffffffff81111561181d57600080fd5b8301601f8101851361182e57600080fd5b61183d858235602084016117ae565b9150509250929050565b60005b8381101561186257818101518382015260200161184a565b838111156117395750506000910152565b6000815180845261188b816020860160208601611847565b601f01601f19169290920160200192915050565b6020815260006118b26020830184611873565b9392505050565b6000602082840312156118cb57600080fd5b5035919050565b6001600160a01b0381168114610e6e57600080fd5b6000602082840312156118f957600080fd5b81356118b2816118d2565b8015158114610e6e57600080fd5b60008060006060848603121561192757600080fd5b833567ffffffffffffffff81111561193e57600080fd5b8401601f8101861361194f57600080fd5b61195e868235602084016117ae565b93505060208401359150604084013561197681611904565b809150509250925092565b60006020828403121561199357600080fd5b5051919050565b6000602082840312156119ac57600080fd5b81516118b2816118d2565b6000602082840312156119c957600080fd5b815167ffffffffffffffff8111156119e057600080fd5b8201601f810184136119f157600080fd5b80516119ff6117bc82611786565b818152856020838501011115611a1457600080fd5b611a25826020830160208601611847565b95945050505050565b60008219821115611a4f57634e487b7160e01b600052601160045260246000fd5b500190565b85815260a060208201526000611a6d60a0830187611873565b6040830195909552506060810192909252151560809091015292915050565b600060208284031215611a9e57600080fd5b81516118b281611904565b600080600060608486031215611abe57600080fd5b835192506020840151915060408401519050925092509256fe4d656d626572206e6174696f6e732063616e6e6f7420626174746c652061726d696573206f722074696c6573206f66206f6e6520616e6f74686572a2646970667358221220ecef3aec0630cc5a25d0fbe4a214e2b349da76197ca538825a5383b003bdb14a64736f6c634300080d0033";

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
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NonAggressionPact> {
    return super.deploy(overrides || {}) as Promise<NonAggressionPact>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
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
