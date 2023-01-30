/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Alliance,
  AllianceInterface,
} from "../../../contracts/treaties/Alliance";

const _abi = [
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
    name: "goldToken",
    outputs: [
      {
        internalType: "contract CurioERC20",
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
        name: "_targetArmyID",
        type: "uint256",
      },
    ],
    name: "treatyBesiege",
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
  "0x608060405234801561001057600080fd5b50611fed806100206000396000f3fe608060405234801561001057600080fd5b506004361061020a5760003560e01c80635f310b121161012a578063c009a6cb116100bd578063e75991fa1161008c578063f0b7db4e11610071578063f0b7db4e1461030a578063f2e1730b1461020f578063fa91f75e1461020f57600080fd5b8063e75991fa1461020f578063ec19ae801461020f57600080fd5b8063c009a6cb1461020f578063cbb34e861461020f578063d553ed481461020f578063e534ae5f1461020f57600080fd5b80637bc1e841116100f95780637bc1e841146102cc57806394002b57146102df5780639bcecd0b1461020f578063a83280bc1461020f57600080fd5b80635f310b121461020f57806360acfcc61461020f5780636a2a2b4e146102b15780637284e416146102c457600080fd5b80632b451c64116101a25780633741551611610171578063374155161461020f57806339ebfad41461020f57806347b958a6146102a95780634ad30a911461020f57600080fd5b80632b451c641461020f5780632c1820231461020f5780632d47fe271461020f5780632efd66291461029657600080fd5b80631c357173116101de5780631c3571731461020f5780631e15495c1461020f578063243086c41461020f57806328f59b831461028e57600080fd5b8062048f5a1461020f57806304dc7c741461020f57806306fdde031461023757806319ab453c14610279575b600080fd5b61022261021d366004611a64565b61031d565b60405190151581526020015b60405180910390f35b60408051808201909152600881527f416c6c69616e636500000000000000000000000000000000000000000000000060208201525b60405161022e9190611b17565b61028c610287366004611b49565b610387565b005b61028c61047d565b61028c6102a4366004611b74565b6109b3565b61028c610af9565b6102226102bf366004611a64565b610d08565b61026c610ea8565b61028c6102da366004611be3565b610ec8565b6001546102f2906001600160a01b031681565b6040516001600160a01b03909116815260200161022e565b6000546102f2906001600160a01b031681565b600080546001600160a01b0316331461037d5760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b610390816116ac565b6000546040517f381c4fce0000000000000000000000000000000000000000000000000000000081526001600160a01b0390911690819063381c4fce9061040b9060040160208082526004908201527f476f6c6400000000000000000000000000000000000000000000000000000000604082015260600190565b602060405180830381865afa158015610428573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061044c9190611bfc565b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03929092169190911790555050565b6000805460405163b356003960e01b8152336004820152600a926001600160a01b039092169190829063b356003990602401602060405180830381865afa1580156104cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104f09190611c19565b60405163b356003960e01b81523060048201529091506000906001600160a01b0384169063b356003990602401602060405180830381865afa15801561053a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061055e9190611c19565b6040517f84d969bd00000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529091506000906001600160a01b038516906384d969bd90606401602060405180830381865afa1580156105ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106139190611bfc565b60405163344289d960e11b815260048101859052602481018490526001600160a01b0391821691634c518fdc919087169063688513b290604401602060405180830381865afa15801561066a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061068e9190611c19565b6040518263ffffffff1660e01b81526004016106ac91815260200190565b600060405180830381865afa1580156106c9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526106f19190810190611c32565b8060200190518101906107049190611c19565b90506107108582611cbf565b4210156107845760405162461bcd60e51b8152602060048201526024808201527f48617665206e6f742073746179656420666f72206d696e696d756d206475726160448201527f74696f6e000000000000000000000000000000000000000000000000000000006064820152608401610374565b6000805460405163b356003960e01b81523360048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa1580156107d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f49190611c19565b6040517f29560980000000000000000000000000000000000000000000000000000000008152600481018290529091506000906001600160a01b0384169063b93f9b0a908290632956098090602401602060405180830381865afa158015610860573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108849190611c19565b6040518263ffffffff1660e01b81526004016108a291815260200190565b602060405180830381865afa1580156108bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108e39190611bfc565b6001546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b0380841660048301526103e8602483015292935091169063a9059cbb906044016020604051808303816000875af1158015610952573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109769190611cd7565b506109a160405180604001604052806006815260200165426174746c6560d01b8152506000806109b3565b6109a96117d6565b5050505050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015610a00573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a249190611c19565b60405163b356003960e01b81523060048201529091506001600160a01b038084169163def700479184918a9188169063b356003990602401602060405180830381865afa158015610a79573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a9d9190611c19565b89896040518663ffffffff1660e01b8152600401610abf959493929190611cf4565b600060405180830381600087803b158015610ad957600080fd5b505af1158015610aed573d6000803e3d6000fd5b50505050505050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b039091169190829063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610b55573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b799190611c19565b6040518263ffffffff1660e01b8152600401610b9791815260200190565b602060405180830381865afa158015610bb4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd89190611c19565b6040518263ffffffff1660e01b8152600401610bf691815260200190565b602060405180830381865afa158015610c13573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c379190611bfc565b6001546040517f23b872dd0000000000000000000000000000000000000000000000000000000081526001600160a01b0380841660048301523060248301526103e860448301529293509116906323b872dd906064016020604051808303816000875af1158015610cac573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cd09190611cd7565b50610cfc60405180604001604052806006815260200165426174746c6560d01b815250600060016109b3565b610d046118b9565b5050565b6000805482516001600160a01b03909116908290610d2f9085016020908101908601611d2c565b60405163793ff2ed60e11b815260048101829052909350600092506001600160a01b038516915063f27fe5da90602401602060405180830381865afa158015610d7c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da09190611c19565b60405163b356003960e01b81523060048201529091506000906001600160a01b0385169063b356003990602401602060405180830381865afa158015610dea573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0e9190611c19565b60405163344289d960e11b815260048101849052602481018290529091506001600160a01b0385169063688513b290604401602060405180830381865afa158015610e5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e819190611c19565b15610e93576000945050505050610381565b610e9d878761031d565b979650505050505050565b60606040518060c0016040528060888152602001611f3060889139905090565b60005460405163b356003960e01b81523360048201526001600160a01b0390911690819063688513b290829063b356003990602401602060405180830381865afa158015610f1a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f3e9190611c19565b60405163b356003960e01b81523060048201526001600160a01b0385169063b356003990602401602060405180830381865afa158015610f82573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fa69190611c19565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401602060405180830381865afa158015610fff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110239190611c19565b6000036110985760405162461bcd60e51b815260206004820152602160248201527f437572696f5472656174793a204f6e6c79207369676e65722063616e2063616c60448201527f6c000000000000000000000000000000000000000000000000000000000000006064820152608401610374565b6000805460405163793ff2ed60e11b8152600481018590526001600160a01b039091169190829063f27fe5da90602401602060405180830381865afa1580156110e5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111099190611c19565b60405163b356003960e01b81523060048201529091506000906001600160a01b0384169063b356003990602401602060405180830381865afa158015611153573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111779190611c19565b60405163344289d960e11b815260048101849052602481018290529091506001600160a01b0384169063688513b290604401602060405180830381865afa1580156111c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111ea9190611c19565b1561125d5760405162461bcd60e51b815260206004820152602c60248201527f416c6c69616e63653a2043616e6e6f7420626573696567652061726d79206f6660448201527f20616c6c79206e6174696f6e00000000000000000000000000000000000000006064820152608401610374565b604080517fb66e9de70000000000000000000000000000000000000000000000000000000081526004810191909152600d60448201527f5374617274506f736974696f6e000000000000000000000000000000000000006064820152602481018690526000906001600160a01b0385169063eead3d8490829063b66e9de7906084016040805180830381865afa1580156112fb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061131f9190611da9565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b168152815160048201526020909101516024820152604401600060405180830381865afa15801561137d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526113a59190810190611de9565b905060005b81518110156116a3576000856001600160a01b0316636c90bd8b8484815181106113d6576113d6611e7a565b6020908102919091018101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152815160048201529101516024820152604401600060405180830381865afa15801561143d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526114659190810190611e90565b905060005b815181101561168e576000876001600160a01b031663f27fe5da84848151811061149657611496611e7a565b60200260200101516040518263ffffffff1660e01b81526004016114bc91815260200190565b602060405180830381865afa1580156114d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114fd9190611c19565b60405163344289d960e11b815260048101829052602481018890529091506001600160a01b0389169063688513b290604401602060405180830381865afa15801561154c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115709190611c19565b1561167b5760005483516001600160a01b0390911690632a0c52219085908590811061159e5761159e611e7a565b60200260200101518c6040518363ffffffff1660e01b81526004016115cd929190918252602082015260400190565b600060405180830381600087803b1580156115e757600080fd5b505af11580156115fb573d6000803e3d6000fd5b505060405163793ff2ed60e11b8152600481018d90526001600160a01b038b16925063f27fe5da9150602401602060405180830381865afa158015611644573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116689190611c19565b60000361167b5750505050505050505050565b508061168681611f16565b91505061146a565b5050808061169b90611f16565b9150506113aa565b50505050505050565b6000546001600160a01b03161561172b5760405162461bcd60e51b815260206004820152602760248201527f437572696f5472656174793a2054726561747920616c726561647920696e697460448201527f69616c697a6564000000000000000000000000000000000000000000000000006064820152608401610374565b6001600160a01b0381166117a75760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e6420616464726573732072657160448201527f75697265640000000000000000000000000000000000000000000000000000006064820152608401610374565b6000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015611823573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118479190611c19565b6040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b03831690635ffde14490602401600060405180830381600087803b1580156118a557600080fd5b505af11580156116a3573d6000803e3d6000fd5b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015611906573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061192a9190611c19565b6040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b0383169063ff2a5e79906024016020604051808303816000875af115801561198d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119b19190611c19565b50505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156119f6576119f66119b7565b604052919050565b600067ffffffffffffffff821115611a1857611a186119b7565b50601f01601f191660200190565b6000611a39611a34846119fe565b6119cd565b9050828152838383011115611a4d57600080fd5b828260208301376000602084830101529392505050565b60008060408385031215611a7757600080fd5b82359150602083013567ffffffffffffffff811115611a9557600080fd5b8301601f81018513611aa657600080fd5b611ab585823560208401611a26565b9150509250929050565b60005b83811015611ada578181015183820152602001611ac2565b838111156119b15750506000910152565b60008151808452611b03816020860160208601611abf565b601f01601f19169290920160200192915050565b602081526000611b2a6020830184611aeb565b9392505050565b6001600160a01b0381168114611b4657600080fd5b50565b600060208284031215611b5b57600080fd5b8135611b2a81611b31565b8015158114611b4657600080fd5b600080600060608486031215611b8957600080fd5b833567ffffffffffffffff811115611ba057600080fd5b8401601f81018613611bb157600080fd5b611bc086823560208401611a26565b935050602084013591506040840135611bd881611b66565b809150509250925092565b600060208284031215611bf557600080fd5b5035919050565b600060208284031215611c0e57600080fd5b8151611b2a81611b31565b600060208284031215611c2b57600080fd5b5051919050565b600060208284031215611c4457600080fd5b815167ffffffffffffffff811115611c5b57600080fd5b8201601f81018413611c6c57600080fd5b8051611c7a611a34826119fe565b818152856020838501011115611c8f57600080fd5b611ca0826020830160208601611abf565b95945050505050565b634e487b7160e01b600052601160045260246000fd5b60008219821115611cd257611cd2611ca9565b500190565b600060208284031215611ce957600080fd5b8151611b2a81611b66565b85815260a060208201526000611d0d60a0830187611aeb565b6040830195909552506060810192909252151560809091015292915050565b600080600060608486031215611d4157600080fd5b8351925060208401519150604084015190509250925092565b600060408284031215611d6c57600080fd5b6040516040810181811067ffffffffffffffff82111715611d8f57611d8f6119b7565b604052825181526020928301519281019290925250919050565b600060408284031215611dbb57600080fd5b611b2a8383611d5a565b600067ffffffffffffffff821115611ddf57611ddf6119b7565b5060051b60200190565b60006020808385031215611dfc57600080fd5b825167ffffffffffffffff811115611e1357600080fd5b8301601f81018513611e2457600080fd5b8051611e32611a3482611dc5565b81815260069190911b82018301908381019087831115611e5157600080fd5b928401925b82841015610e9d57611e688885611d5a565b82528482019150604084019350611e56565b634e487b7160e01b600052603260045260246000fd5b60006020808385031215611ea357600080fd5b825167ffffffffffffffff811115611eba57600080fd5b8301601f81018513611ecb57600080fd5b8051611ed9611a3482611dc5565b81815260059190911b82018301908381019087831115611ef857600080fd5b928401925b82841015610e9d57835182529284019290840190611efd565b600060018201611f2857611f28611ca9565b506001019056fe4120747265617479206265747765656e2074776f206f72206d6f726520636f756e747269657320746f20776f726b20746f67657468657220746f7761726473206120636f6d6d6f6e20676f616c206f7220746f20646566656e642065616368206f7468657220696e207468652063617365206f662065787465726e616c2061676772657373696f6ea2646970667358221220f4cbf728f9acd6c5be5872d0ef53093c3483c01592e63582833b7935e94f29d464736f6c634300080d0033";

type AllianceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AllianceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Alliance__factory extends ContractFactory {
  constructor(...args: AllianceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Alliance> {
    return super.deploy(overrides || {}) as Promise<Alliance>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Alliance {
    return super.attach(address) as Alliance;
  }
  override connect(signer: Signer): Alliance__factory {
    return super.connect(signer) as Alliance__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AllianceInterface {
    return new utils.Interface(_abi) as AllianceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Alliance {
    return new Contract(address, _abi, signerOrProvider) as Alliance;
  }
}
