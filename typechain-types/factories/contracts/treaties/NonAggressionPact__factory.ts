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
    name: "approveStopTroopProduction",
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
    inputs: [],
    name: "effectiveDuration",
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
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "setEffectiveDuration",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50612018806100206000396000f3fe608060405234801561001057600080fd5b506004361061025b5760003560e01c80635d718b0811610145578063cbb34e86116100bd578063ec19ae801161008c578063f2395dc311610071578063f2395dc314610398578063f2e1730b14610260578063fa91f75e1461026057600080fd5b8063ec19ae8014610260578063f0b7db4e1461036d57600080fd5b8063cbb34e8614610260578063d553ed4814610260578063e534ae5f14610260578063e75991fa1461026057600080fd5b80637284e41611610114578063a1a74aae116100f9578063a1a74aae1461035a578063a83280bc14610260578063c009a6cb1461026057600080fd5b80637284e416146103525780639bcecd0b1461026057600080fd5b80635d718b08146103285780635f310b121461026057806360acfcc6146102605780636a2a2b4e1461033f57600080fd5b80632b451c64116101d857806337415516116101a75780633af91c2f1161018c5780633af91c2f1461030d57806347b958a6146103205780634ad30a911461026057600080fd5b8063374155161461026057806339ebfad41461026057600080fd5b80632b451c64146102605780632c182023146102605780632d47fe27146102605780632efd6629146102fa57600080fd5b806319ab453c1161022f5780631e15495c116102145780631e15495c14610260578063243086c41461026057806328f59b83146102f257600080fd5b806319ab453c146102df5780631c3571731461026057600080fd5b8062048f5a1461026057806304dc7c741461026057806306fdde031461028857806314f2c435146102ca575b600080fd5b61027361026e366004611ca7565b6103ab565b60405190151581526020015b60405180910390f35b60408051808201909152601381527f4e6f6e2d41676772657373696f6e20506163740000000000000000000000000060208201525b60405161027f9190611d5a565b6102dd6102d8366004611d74565b610415565b005b6102dd6102ed366004611da2565b6106c8565b6102dd6107fd565b6102dd610308366004611dcd565b610bbe565b6102dd61031b366004611d74565b610d04565b6102dd61102a565b61033160015481565b60405190815260200161027f565b61027361034d366004611ca7565b611202565b6102bd6114e5565b6102dd610368366004611d74565b611505565b600054610380906001600160a01b031681565b6040516001600160a01b03909116815260200161027f565b6102dd6103a6366004611d74565b6117c4565b600080546001600160a01b0316331461040b5760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b6000805460405163b356003960e01b81523060048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa158015610461573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104859190611e3c565b6040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529091506000906001600160a01b038416906384d969bd90606401602060405180830381865afa1580156104e5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105099190611e55565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161053691815260200190565b600060405180830381865afa158015610553573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261057b9190810190611e72565b80602001905181019061058e9190611e3c565b60405163b356003960e01b81523360048201529091506001600160a01b0384169063b356003990602401602060405180830381865afa1580156105d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f99190611e3c565b81146106475760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c6044820152606401610402565b6000546040517f37e9323a000000000000000000000000000000000000000000000000000000008152600481018690526001600160a01b039091169081906337e9323a906024015b600060405180830381600087803b1580156106a957600080fd5b505af11580156106bd573d6000803e3d6000fd5b505050505050505050565b6000546001600160a01b0316156107475760405162461bcd60e51b815260206004820152602760248201527f437572696f5472656174793a2054726561747920616c726561647920696e697460448201527f69616c697a6564000000000000000000000000000000000000000000000000006064820152608401610402565b6001600160a01b0381166107c35760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e6420616464726573732072657160448201527f75697265640000000000000000000000000000000000000000000000000000006064820152608401610402565b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b6001546000805460405163b356003960e01b81523360048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa15801561084c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108709190611e3c565b60405163b356003960e01b81523060048201529091506000906001600160a01b0384169063b356003990602401602060405180830381865afa1580156108ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108de9190611e3c565b6040516384d969bd60e01b815260206004820152600d60248201526c0496e697454696d657374616d7609c1b60448201529091506000906001600160a01b038516906384d969bd90606401602060405180830381865afa158015610946573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061096a9190611e55565b60405163344289d960e11b815260048101859052602481018490526001600160a01b0391821691634c518fdc919087169063688513b290604401602060405180830381865afa1580156109c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e59190611e3c565b6040518263ffffffff1660e01b8152600401610a0391815260200190565b600060405180830381865afa158015610a20573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610a489190810190611e72565b806020019051810190610a5b9190611e3c565b9050610a678582611ee9565b421015610adb5760405162461bcd60e51b8152602060048201526024808201527f48617665206e6f742073746179656420666f72206d696e696d756d206475726160448201527f74696f6e000000000000000000000000000000000000000000000000000000006064820152608401610402565b6000805460405163b356003960e01b81523360048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa158015610b27573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b4b9190611e3c565b6000546040516307c25c6f60e21b8152600481018390529192506001600160a01b0316908190631f0971bc90602401600060405180830381600087803b158015610b9457600080fd5b505af1158015610ba8573d6000803e3d6000fd5b50505050610bb4611a29565b5050505050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015610c0b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c2f9190611e3c565b60405163b356003960e01b81523060048201529091506001600160a01b038084169163def700479184918a9188169063b356003990602401602060405180830381865afa158015610c84573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ca89190611e3c565b89896040518663ffffffff1660e01b8152600401610cca959493929190611f0f565b600060405180830381600087803b158015610ce457600080fd5b505af1158015610cf8573d6000803e3d6000fd5b50505050505050505050565b6000805460405163b356003960e01b81523060048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa158015610d50573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d749190611e3c565b6040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529091506000906001600160a01b038416906384d969bd90606401602060405180830381865afa158015610dd4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610df89190611e55565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b8152600401610e2591815260200190565b600060405180830381865afa158015610e42573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610e6a9190810190611e72565b806020019051810190610e7d9190611e3c565b60405163b356003960e01b81523360048201529091506001600160a01b0384169063b356003990602401602060405180830381865afa158015610ec4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ee89190611e3c565b8114610f365760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c6044820152606401610402565b60015415610fac5760405162461bcd60e51b815260206004820152603060248201527f4e6f6e41676772657373696f6e506163743a204475726174696f6e2063616e2060448201527f6f6e6c7920626520736574206f6e6365000000000000000000000000000000006064820152608401610402565b600084116110225760405162461bcd60e51b815260206004820152603260248201527f4e6f6e41676772657373696f6e506163743a204475726174696f6e206d75737460448201527f2062652067726561746572207468616e203000000000000000000000000000006064820152608401610402565b505050600155565b60005460405163b356003960e01b81523360048201526001600160a01b0390911690819063d4c8cfb190829063b356003990602401602060405180830381865afa15801561107c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110a09190611e3c565b60405163b356003960e01b81523060048201526001600160a01b0385169063b356003990602401602060405180830381865afa1580156110e4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111089190611e3c565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401602060405180830381865afa158015611161573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111859190611f47565b6111f75760405162461bcd60e51b815260206004820152602e60248201527f437572696f5472656174793a204f6e6c792077686974656c6973746564206e6160448201527f74696f6e732063616e2063616c6c0000000000000000000000000000000000006064820152608401610402565b6111ff611afc565b50565b6000805460405163b356003960e01b81523060048201526001600160a01b03909116908290829063b356003990602401602060405180830381865afa15801561124f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112739190611e3c565b6040516384d969bd60e01b815260206004820152600d60248201526c0496e697454696d657374616d7609c1b60448201529091506000906001600160a01b038416906384d969bd90606401602060405180830381865afa1580156112db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112ff9190611e55565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161132c91815260200190565b600060405180830381865afa158015611349573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526113719190810190611e72565b8060200190518101906113849190611e3c565b9050600154600014806113a3575060015461139f9082611ee9565b4211155b156114d1576000858060200190518101906113be9190611f64565b6040517ff27fe5da00000000000000000000000000000000000000000000000000000000815260048101829052909350600092506001600160a01b038716915063f27fe5da90602401602060405180830381865afa158015611424573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114489190611e3c565b60405163344289d960e11b815260048101829052602481018690529091506001600160a01b0386169063688513b290604401602060405180830381865afa158015611497573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114bb9190611e3c565b156114ce5760009550505050505061040f565b50505b6114db86866103ab565b9695505050505050565b6060604051806080016040528060508152602001611f9360509139905090565b6000805460405163b356003960e01b81523060048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa158015611551573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115759190611e3c565b6040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529091506000906001600160a01b038416906384d969bd90606401602060405180830381865afa1580156115d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115f99190611e55565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161162691815260200190565b600060405180830381865afa158015611643573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261166b9190810190611e72565b80602001905181019061167e9190611e3c565b60405163b356003960e01b81523360048201529091506001600160a01b0384169063b356003990602401602060405180830381865afa1580156116c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116e99190611e3c565b81146117375760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c6044820152606401610402565b6000546040516307c25c6f60e21b8152600481018690526001600160a01b03909116908190631f0971bc90602401600060405180830381600087803b15801561177f57600080fd5b505af1158015611793573d6000803e3d6000fd5b50506040516317ff785160e21b8152600481018890526001600160a01b0384169250635ffde144915060240161068f565b6000805460405163b356003960e01b81523060048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa158015611810573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118349190611e3c565b6040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529091506000906001600160a01b038416906384d969bd90606401602060405180830381865afa158015611894573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118b89190611e55565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b81526004016118e591815260200190565b600060405180830381865afa158015611902573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261192a9190810190611e72565b80602001905181019061193d9190611e3c565b60405163b356003960e01b81523360048201529091506001600160a01b0384169063b356003990602401602060405180830381865afa158015611984573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119a89190611e3c565b81146119f65760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c6044820152606401610402565b6000546040516307c25c6f60e21b8152600481018690526001600160a01b03909116908190631f0971bc9060240161068f565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015611a76573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a9a9190611e3c565b6040516317ff785160e21b8152600481018290529091506001600160a01b03831690635ffde14490602401600060405180830381600087803b158015611adf57600080fd5b505af1158015611af3573d6000803e3d6000fd5b50505050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015611b49573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b6d9190611e3c565b6040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b0383169063ff2a5e79906024016020604051808303816000875af1158015611bd0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bf49190611e3c565b50505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611c3957611c39611bfa565b604052919050565b600067ffffffffffffffff821115611c5b57611c5b611bfa565b50601f01601f191660200190565b6000611c7c611c7784611c41565b611c10565b9050828152838383011115611c9057600080fd5b828260208301376000602084830101529392505050565b60008060408385031215611cba57600080fd5b82359150602083013567ffffffffffffffff811115611cd857600080fd5b8301601f81018513611ce957600080fd5b611cf885823560208401611c69565b9150509250929050565b60005b83811015611d1d578181015183820152602001611d05565b83811115611bf45750506000910152565b60008151808452611d46816020860160208601611d02565b601f01601f19169290920160200192915050565b602081526000611d6d6020830184611d2e565b9392505050565b600060208284031215611d8657600080fd5b5035919050565b6001600160a01b03811681146111ff57600080fd5b600060208284031215611db457600080fd5b8135611d6d81611d8d565b80151581146111ff57600080fd5b600080600060608486031215611de257600080fd5b833567ffffffffffffffff811115611df957600080fd5b8401601f81018613611e0a57600080fd5b611e1986823560208401611c69565b935050602084013591506040840135611e3181611dbf565b809150509250925092565b600060208284031215611e4e57600080fd5b5051919050565b600060208284031215611e6757600080fd5b8151611d6d81611d8d565b600060208284031215611e8457600080fd5b815167ffffffffffffffff811115611e9b57600080fd5b8201601f81018413611eac57600080fd5b8051611eba611c7782611c41565b818152856020838501011115611ecf57600080fd5b611ee0826020830160208601611d02565b95945050505050565b60008219821115611f0a57634e487b7160e01b600052601160045260246000fd5b500190565b85815260a060208201526000611f2860a0830187611d2e565b6040830195909552506060810192909252151560809091015292915050565b600060208284031215611f5957600080fd5b8151611d6d81611dbf565b600080600060608486031215611f7957600080fd5b835192506020840151915060408401519050925092509256fe4d656d626572206e6174696f6e732063616e6e6f7420626174746c652061726d696573206f722074696c6573206f66206f6e6520616e6f7468657220666f72206120706572696f64206f662074696d65a26469706673582212203cfb2c908a8a75486a80cffa9346aadd75e026d96aba6f83ed575af869e4071564736f6c634300080d0033";

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
