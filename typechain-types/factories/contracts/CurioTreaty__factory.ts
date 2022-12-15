/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  CurioTreaty,
  CurioTreatyInterface,
} from "../../contracts/CurioTreaty";

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
    name: "approveDelegatePermission",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "delegatedGameFunctionNames",
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
    inputs: [],
    name: "join",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "leave",
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
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610b00380380610b0083398101604081905261002f916100da565b6001600160a01b0381166100975760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b0319928316811790915560018054831682179055600280548316821790556003805490921617905561010a565b6000602082840312156100ec57600080fd5b81516001600160a01b038116811461010357600080fd5b9392505050565b6109e7806101196000396000f3fe608060405234801561001057600080fd5b50600436106101d95760003560e01c80637fecf09811610104578063cbb34e86116100a2578063ec19ae8011610071578063ec19ae80146101de578063f0b7db4e14610286578063f2e1730b146101de578063f851a4401461029957600080fd5b8063cbb34e86146101de578063d66d9e191461027e578063e534ae5f146101de578063e75991fa146101de57600080fd5b8063a83280bc116100de578063a83280bc146101de578063b688a36314610261578063c009a6cb146101de578063c3fe3e281461026b57600080fd5b80637fecf09814610223578063993a04b7146102365780639bcecd0b146101de57600080fd5b80632d47fe271161017c5780635f310b121161014b5780635f310b12146101de57806360acfcc6146101de5780636a2a2b4e146101de5780637284e4161461021b57600080fd5b80632d47fe27146101de57806337415516146101de57806339ebfad4146101de5780634ad30a91146101de57600080fd5b80631bc8475d116101b85780631bc8475d146101de5780631c357173146101de578063243086c4146101de5780632b451c64146101de57600080fd5b8062048f5a146101de57806304dc7c74146101de57806306fdde0314610206575b600080fd5b6101f16101ec366004610738565b6102ac565b60405190151581526020015b60405180910390f35b61020e61032e565b6040516101fd91906107f3565b61020e6103bc565b61020e610231366004610848565b6103c9565b600254610249906001600160a01b031681565b6040516001600160a01b0390911681526020016101fd565b6102696103f4565b005b600154610249906001600160a01b031681565b610269610596565b600054610249906001600160a01b031681565b600354610249906001600160a01b031681565b600080546001600160a01b03163314610325576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c00604482015260640160405180910390fd5b50600192915050565b6004805461033b90610861565b80601f016020809104026020016040519081016040528092919081815260200182805461036790610861565b80156103b45780601f10610389576101008083540402835291602001916103b4565b820191906000526020600020905b81548152906001019060200180831161039757829003601f168201915b505050505081565b6005805461033b90610861565b600681815481106103d957600080fd5b90600052602060002001600091509050805461033b90610861565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa15801561043d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610461919061089b565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af11580156104c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ea919061089b565b5060005b60065481101561059257600354600680546001600160a01b03909216916359f50cfd91859185908110610523576105236108b4565b9060005260206000200160016040518463ffffffff1660e01b815260040161054d939291906108ca565b600060405180830381600087803b15801561056757600080fd5b505af115801561057b573d6000803e3d6000fd5b50505050808061058a9061098a565b9150506104ee565b5050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156105df573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610603919061089b565b6003546040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b15801561066357600080fd5b505af1158015610677573d6000803e3d6000fd5b5050505060005b60065481101561059257600354600680546001600160a01b03909216916359f50cfd918591859081106106b3576106b36108b4565b9060005260206000200160006040518463ffffffff1660e01b81526004016106dd939291906108ca565b600060405180830381600087803b1580156106f757600080fd5b505af115801561070b573d6000803e3d6000fd5b50505050808061071a9061098a565b91505061067e565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561074b57600080fd5b82359150602083013567ffffffffffffffff8082111561076a57600080fd5b818501915085601f83011261077e57600080fd5b81358181111561079057610790610722565b604051601f8201601f19908116603f011681019083821181831017156107b8576107b8610722565b816040528281528860208487010111156107d157600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b600060208083528351808285015260005b8181101561082057858101830151858201604001528201610804565b81811115610832576000604083870101525b50601f01601f1916929092016040019392505050565b60006020828403121561085a57600080fd5b5035919050565b600181811c9082168061087557607f821691505b60208210810361089557634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156108ad57600080fd5b5051919050565b634e487b7160e01b600052603260045260246000fd5b838152600060206060818401526000855481600182811c9150808316806108f257607f831692505b858310810361090f57634e487b7160e01b85526022600452602485fd5b606088018390526080880181801561092e576001811461093f5761096a565b60ff1986168252878201965061096a565b60008c81526020902060005b868110156109645781548482015290850190890161094b565b83019750505b50505050861515604087015250909250610982915050565b949350505050565b6000600182016109aa57634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220766349ed0fdbd7d9b937a3f688ee583fa8cbfda0792da63f6ac09b1ee674e7ef64736f6c634300080d0033";

type CurioTreatyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CurioTreatyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CurioTreaty__factory extends ContractFactory {
  constructor(...args: CurioTreatyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CurioTreaty> {
    return super.deploy(_diamond, overrides || {}) as Promise<CurioTreaty>;
  }
  override getDeployTransaction(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_diamond, overrides || {});
  }
  override attach(address: string): CurioTreaty {
    return super.attach(address) as CurioTreaty;
  }
  override connect(signer: Signer): CurioTreaty__factory {
    return super.connect(signer) as CurioTreaty__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CurioTreatyInterface {
    return new utils.Interface(_abi) as CurioTreatyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CurioTreaty {
    return new Contract(address, _abi, signerOrProvider) as CurioTreaty;
  }
}
