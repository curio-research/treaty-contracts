/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Embargo,
  EmbargoInterface,
} from "../../../contracts/treaties/Embargo";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
    ],
    name: "addToSanctionList",
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
    inputs: [],
    name: "getSanctionList",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
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
    name: "removeFromSanctionList",
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
    inputs: [],
    name: "sanctionList",
    outputs: [
      {
        internalType: "contract Set",
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
  "0x608060405234801561001057600080fd5b50611fa9806100206000396000f3fe608060405234801561001057600080fd5b50600436106102405760003560e01c80634cdf207711610145578063c009a6cb116100bd578063e75991fa1161008c578063f0b7db4e11610071578063f0b7db4e1461037b578063f2e1730b14610245578063fa91f75e1461024557600080fd5b8063e75991fa14610245578063ec19ae801461024557600080fd5b8063c009a6cb14610245578063cbb34e8614610245578063d553ed4814610245578063e534ae5f1461024557600080fd5b80637284e41611610114578063a1a74aae116100f9578063a1a74aae14610353578063a83280bc14610245578063aa90229c1461036657600080fd5b80637284e4161461034b5780639bcecd0b1461024557600080fd5b80634cdf2077146103205780635f310b121461024557806360acfcc6146102455780636a2a2b4e1461024557600080fd5b806328f59b83116101d857806337415516116101a757806339ebfad41161018c57806339ebfad41461024557806347b958a6146103185780634ad30a911461024557600080fd5b80633741551614610245578063386e87331461030557600080fd5b806328f59b83146102ea5780632b451c64146102455780632d47fe27146102455780632efd6629146102f257600080fd5b806319ab453c1161021457806319ab453c146102c45780631c357173146102455780631e15495c146102d7578063243086c41461024557600080fd5b8062048f5a1461024557806304dc7c741461024557806306fdde031461026d5780630af32903146102af575b600080fd5b6102586102533660046116af565b61038e565b60405190151581526020015b60405180910390f35b60408051808201909152600781527f456d626172676f0000000000000000000000000000000000000000000000000060208201525b6040516102649190611762565b6102c26102bd36600461177c565b6103f8565b005b6102c26102d23660046117ad565b6106a8565b6102586102e53660046116af565b61070a565b6102c2610866565b6102c26103003660046117d8565b610b7c565b6102c261031336600461177c565b610cc2565b6102c2610f3e565b600154610333906001600160a01b031681565b6040516001600160a01b039091168152602001610264565b6102a261103c565b6102c261036136600461177c565b61105c565b61036e611368565b6040516102649190611847565b600054610333906001600160a01b031681565b600080546001600160a01b031633146103ee5760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b6000805460405163b356003960e01b81523060048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa158015610444573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610468919061188b565b6040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529091506000906001600160a01b038416906384d969bd90606401602060405180830381865afa1580156104c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ec91906118a4565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161051991815260200190565b600060405180830381865afa158015610536573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261055e91908101906118c1565b806020019051810190610571919061188b565b60405163b356003960e01b81523360048201529091506001600160a01b0384169063b356003990602401602060405180830381865afa1580156105b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105dc919061188b565b811461062a5760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c60448201526064016103e5565b6001546040517f4cc82215000000000000000000000000000000000000000000000000000000008152600481018690526001600160a01b0390911690634cc82215906024015b600060405180830381600087803b15801561068a57600080fd5b505af115801561069e573d6000803e3d6000fd5b5050505050505050565b6106b1816113f8565b6040516106bd906115f5565b604051809103906000f0801580156106d9573d6000803e3d6000fd5b506001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b039290921691909117905550565b6000805482516001600160a01b039091169082906107319085016020908101908601611938565b506040517ff27fe5da000000000000000000000000000000000000000000000000000000008152600481018290529091506000906001600160a01b0384169063f27fe5da90602401602060405180830381865afa158015610796573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ba919061188b565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690639f161b0a90602401602060405180830381865afa15801561081d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610841919061195c565b1561085257600093505050506103f2565b61085c868661038e565b9695505050505050565b6000805460405163b356003960e01b8152336004820152601e926001600160a01b039092169190829063b356003990602401602060405180830381865afa1580156108b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d9919061188b565b60405163b356003960e01b81523060048201529091506000906001600160a01b0384169063b356003990602401602060405180830381865afa158015610923573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610947919061188b565b6040516384d969bd60e01b815260206004820152600d60248201527f496e697454696d657374616d700000000000000000000000000000000000000060448201529091506000906001600160a01b038516906384d969bd90606401602060405180830381865afa1580156109bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e391906118a4565b6040517f688513b200000000000000000000000000000000000000000000000000000000815260048101859052602481018490526001600160a01b0391821691634c518fdc919087169063688513b290604401602060405180830381865afa158015610a53573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a77919061188b565b6040518263ffffffff1660e01b8152600401610a9591815260200190565b600060405180830381865afa158015610ab2573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610ada91908101906118c1565b806020019051810190610aed919061188b565b9050610af98582611979565b421015610b6d5760405162461bcd60e51b8152602060048201526024808201527f48617665206e6f742073746179656420666f72206d696e696d756d206475726160448201527f74696f6e0000000000000000000000000000000000000000000000000000000060648201526084016103e5565b610b75611522565b5050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015610bc9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bed919061188b565b60405163b356003960e01b81523060048201529091506001600160a01b038084169163def700479184918a9188169063b356003990602401602060405180830381865afa158015610c42573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c66919061188b565b89896040518663ffffffff1660e01b8152600401610c8895949392919061199f565b600060405180830381600087803b158015610ca257600080fd5b505af1158015610cb6573d6000803e3d6000fd5b50505050505050505050565b6000805460405163b356003960e01b81523060048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa158015610d0e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d32919061188b565b6040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529091506000906001600160a01b038416906384d969bd90606401602060405180830381865afa158015610d92573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610db691906118a4565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b8152600401610de391815260200190565b600060405180830381865afa158015610e00573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610e2891908101906118c1565b806020019051810190610e3b919061188b565b60405163b356003960e01b81523360048201529091506001600160a01b0384169063b356003990602401602060405180830381865afa158015610e82573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea6919061188b565b8114610ef45760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c60448201526064016103e5565b6001546040517f1003e2d2000000000000000000000000000000000000000000000000000000008152600481018690526001600160a01b0390911690631003e2d290602401610670565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015610f8b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610faf919061188b565b6040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b0383169063ff2a5e79906024016020604051808303816000875af1158015611012573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611036919061188b565b50505050565b6060604051806080016040528060478152602001611f2d60479139905090565b6000805460405163b356003960e01b81523060048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa1580156110a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110cc919061188b565b6040516384d969bd60e01b815260206004820152600560248201526427bbb732b960d91b60448201529091506000906001600160a01b038416906384d969bd90606401602060405180830381865afa15801561112c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061115091906118a4565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161117d91815260200190565b600060405180830381865afa15801561119a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526111c291908101906118c1565b8060200190518101906111d5919061188b565b60405163b356003960e01b81523360048201529091506001600160a01b0384169063b356003990602401602060405180830381865afa15801561121c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611240919061188b565b811461128e5760405162461bcd60e51b815260206004820181905260248201527f437572696f5472656174793a204f6e6c79206f776e65722063616e2063616c6c60448201526064016103e5565b6000546040517f1f0971bc000000000000000000000000000000000000000000000000000000008152600481018690526001600160a01b03909116908190631f0971bc90602401600060405180830381600087803b1580156112ef57600080fd5b505af1158015611303573d6000803e3d6000fd5b50506040516317ff785160e21b8152600481018890526001600160a01b0384169250635ffde1449150602401600060405180830381600087803b15801561134957600080fd5b505af115801561135d573d6000803e3d6000fd5b505050505050505050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed51439160048083019260009291908290030181865afa1580156113cb573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526113f391908101906119d7565b905090565b6000546001600160a01b0316156114775760405162461bcd60e51b815260206004820152602760248201527f437572696f5472656174793a2054726561747920616c726561647920696e697460448201527f69616c697a65640000000000000000000000000000000000000000000000000060648201526084016103e5565b6001600160a01b0381166114f35760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e6420616464726573732072657160448201527f756972656400000000000000000000000000000000000000000000000000000060648201526084016103e5565b6000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa15801561156f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611593919061188b565b6040516317ff785160e21b8152600481018290529091506001600160a01b03831690635ffde14490602401600060405180830381600087803b1580156115d857600080fd5b505af11580156115ec573d6000803e3d6000fd5b50505050505050565b6104af80611a7e83390190565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561164157611641611602565b604052919050565b600067ffffffffffffffff82111561166357611663611602565b50601f01601f191660200190565b600061168461167f84611649565b611618565b905082815283838301111561169857600080fd5b828260208301376000602084830101529392505050565b600080604083850312156116c257600080fd5b82359150602083013567ffffffffffffffff8111156116e057600080fd5b8301601f810185136116f157600080fd5b61170085823560208401611671565b9150509250929050565b60005b8381101561172557818101518382015260200161170d565b838111156110365750506000910152565b6000815180845261174e81602086016020860161170a565b601f01601f19169290920160200192915050565b6020815260006117756020830184611736565b9392505050565b60006020828403121561178e57600080fd5b5035919050565b6001600160a01b03811681146117aa57600080fd5b50565b6000602082840312156117bf57600080fd5b813561177581611795565b80151581146117aa57600080fd5b6000806000606084860312156117ed57600080fd5b833567ffffffffffffffff81111561180457600080fd5b8401601f8101861361181557600080fd5b61182486823560208401611671565b93505060208401359150604084013561183c816117ca565b809150509250925092565b6020808252825182820181905260009190848201906040850190845b8181101561187f57835183529284019291840191600101611863565b50909695505050505050565b60006020828403121561189d57600080fd5b5051919050565b6000602082840312156118b657600080fd5b815161177581611795565b6000602082840312156118d357600080fd5b815167ffffffffffffffff8111156118ea57600080fd5b8201601f810184136118fb57600080fd5b805161190961167f82611649565b81815285602083850101111561191e57600080fd5b61192f82602083016020860161170a565b95945050505050565b6000806040838503121561194b57600080fd5b505080516020909101519092909150565b60006020828403121561196e57600080fd5b8151611775816117ca565b6000821982111561199a57634e487b7160e01b600052601160045260246000fd5b500190565b85815260a0602082015260006119b860a0830187611736565b6040830195909552506060810192909252151560809091015292915050565b600060208083850312156119ea57600080fd5b825167ffffffffffffffff80821115611a0257600080fd5b818501915085601f830112611a1657600080fd5b815181811115611a2857611a28611602565b8060051b9150611a39848301611618565b8181529183018401918481019088841115611a5357600080fd5b938501935b83851015611a7157845182529385019390850190611a58565b9897505050505050505056fe608060405234801561001057600080fd5b50600080546001600160a01b0319163317905561047d806100326000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806353ed51431161005057806353ed514314610094578063949d225d146100b25780639f161b0a146100c357600080fd5b80631003e2d21461006c5780634cc8221514610081575b600080fd5b61007f61007a366004610399565b6100e6565b005b61007f61008f366004610399565b6101bd565b61009c6102e8565b6040516100a991906103b2565b60405180910390f35b6001546040519081526020016100a9565b6100d66100d1366004610399565b610340565b60405190151581526020016100a9565b60005473ffffffffffffffffffffffffffffffffffffffff16331461015e5760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b60648201526084015b60405180910390fd5b61016781610340565b6101ba5760018054808201825560008290527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60182905580546101aa91906103f6565b6000828152600260205260409020555b50565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102305760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b6064820152608401610155565b61023981610340565b156101ba576000818152600260205260408120549060018061025a60015490565b61026491906103f6565b815481106102745761027461041b565b9060005260206000200154905080600183815481106102955761029561041b565b60009182526020808320909101929092558281526002909152604080822084905584825281205560018054806102cd576102cd610431565b60019003818190600052602060002001600090559055505050565b6060600180548060200260200160405190810160405280929190818152602001828054801561033657602002820191906000526020600020905b815481526020019060010190808311610322575b5050505050905090565b600061034b60015490565b60000361035a57506000919050565b60008281526002602052604090205415158061039357508160016000815481106103865761038661041b565b9060005260206000200154145b92915050565b6000602082840312156103ab57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103ea578351835292840192918401916001016103ce565b50909695505050505050565b60008282101561041657634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212204af513f4c6ced8d8fbeaf7a242307a0a1384e8a5ba73c71c7d3d2e25f90a3d8164736f6c634300080d00334f776e6572206f6620746865204c65616775652063616e20706f696e7420746f207768696368206e6174696f6e20746865206c65616775652069732073616e6374696f6e696e67a2646970667358221220b783dfb40e93cbdd5138bbd193d9f5ad97e7f1b9868570a29c8bfa7d9547b93a64736f6c634300080d0033";

type EmbargoConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EmbargoConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Embargo__factory extends ContractFactory {
  constructor(...args: EmbargoConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Embargo> {
    return super.deploy(overrides || {}) as Promise<Embargo>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Embargo {
    return super.attach(address) as Embargo;
  }
  override connect(signer: Signer): Embargo__factory {
    return super.connect(signer) as Embargo__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EmbargoInterface {
    return new utils.Interface(_abi) as EmbargoInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Embargo {
    return new Contract(address, _abi, signerOrProvider) as Embargo;
  }
}
