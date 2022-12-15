/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { NATO, NATOInterface } from "../../../contracts/treaties/NATO";

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
    inputs: [],
    name: "approveMoveArmy",
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
    name: "denounceTreaty",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isMemberStates",
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
    name: "join",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "joinTreaty",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "memberStates",
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
  "0x60806040523480156200001157600080fd5b506040516200105c3803806200105c8339810160408190526200003491620001ea565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b03199283168117909155600180548316821790556002805483168217905560038054909216179055604080516060810190915260228082526200103a602083013980516200010b9160049160209091019062000144565b506040518060c00160405280608f815260200162000fab608f913980516200013c9160059160209091019062000144565b505062000258565b82805462000152906200021c565b90600052602060002090601f016020900481019282620001765760008555620001c1565b82601f106200019157805160ff1916838001178555620001c1565b82800160010185558215620001c1579182015b82811115620001c1578251825591602001919060010190620001a4565b50620001cf929150620001d3565b5090565b5b80821115620001cf5760008155600101620001d4565b600060208284031215620001fd57600080fd5b81516001600160a01b03811681146200021557600080fd5b9392505050565b600181811c908216806200023157607f821691505b6020821081036200025257634e487b7160e01b600052602260045260246000fd5b50919050565b610d4380620002686000396000f3fe608060405234801561001057600080fd5b50600436106102405760003560e01c80637fecf09811610145578063c3fe3e28116100bd578063e75991fa1161008c578063f0b7db4e11610071578063f0b7db4e1461039f578063f2e1730b14610245578063f851a440146103b257600080fd5b8063e75991fa14610245578063ec19ae801461024557600080fd5b8063c3fe3e2814610384578063cbb34e8614610245578063d66d9e1914610397578063e534ae5f1461024557600080fd5b8063a67a6bbe11610114578063a9a7aef9116100f9578063a9a7aef914610357578063b688a3631461037a578063c009a6cb1461024557600080fd5b8063a67a6bbe146102eb578063a83280bc1461024557600080fd5b80637fecf098146102bd578063993a04b7146102d057806399665ca3146102e35780639bcecd0b1461024557600080fd5b80632d47fe27116101d85780635f310b12116101a757806360acfcc61161018c57806360acfcc6146102455780636a2a2b4e146102455780637284e416146102b557600080fd5b80635f310b12146102455780636008e5b71461028a57600080fd5b80632d47fe2714610245578063374155161461024557806339ebfad4146102455780634ad30a911461024557600080fd5b80631bc8475d116102145780631bc8475d146102455780631c35717314610245578063243086c4146102455780632b451c641461024557600080fd5b8062048f5a1461024557806304dc7c741461024557806306fdde031461026d57806314b0528e14610282575b600080fd5b610258610253366004610a2f565b6103c5565b60405190151581526020015b60405180910390f35b61027561042e565b6040516102649190610aea565b6102586104bc565b61029d610298366004610b3f565b6105f9565b6040516001600160a01b039091168152602001610264565b610275610623565b6102756102cb366004610b3f565b610630565b60025461029d906001600160a01b031681565b61025861065b565b6102586007805460018181019092557fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c68801805473ffffffffffffffffffffffffffffffffffffffff1916339081179091556000908152600860205260409020805460ff19168217905590565b610258610365366004610b58565b60086020526000908152604090205460ff1681565b6103826106eb565b005b60015461029d906001600160a01b031681565b61038261088d565b60005461029d906001600160a01b031681565b60035461029d906001600160a01b031681565b600080546001600160a01b031633146104255760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b50600192915050565b6004805461043b90610b88565b80601f016020809104026020016040519081016040528092919081815260200182805461046790610b88565b80156104b45780601f10610489576101008083540402835291602001916104b4565b820191906000526020600020905b81548152906001019060200180831161049757829003601f168201915b505050505081565b6007546000903390825b8181101561051757826001600160a01b0316600782815481106104eb576104eb610bc2565b6000918252602090912001546001600160a01b031614610517578061050f81610bee565b9150506104c6565b6007610524600184610c07565b8154811061053457610534610bc2565b600091825260209091200154600780546001600160a01b03909216918390811061056057610560610bc2565b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b03160217905550600780548061059f5761059f610c1e565b600082815260208082208301600019908101805473ffffffffffffffffffffffffffffffffffffffff191690559092019092556001600160a01b039490941681526008909352505060409020805460ff1916905550600190565b6007818154811061060957600080fd5b6000918252602090912001546001600160a01b0316905081565b6005805461043b90610b88565b6006818154811061064057600080fd5b90600052602060002001600091509050805461043b90610b88565b3360008181526008602052604081205490919060ff166106e35760405162461bcd60e51b815260206004820152602760248201527f4e41544f3a204e6174696f6e206973206e6f7420626f756e642062792074686560448201527f2054726561747900000000000000000000000000000000000000000000000000606482015260840161041c565b600191505090565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610734573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107589190610c34565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af11580156107bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e19190610c34565b5060005b60065481101561088957600354600680546001600160a01b03909216916359f50cfd9185918590811061081a5761081a610bc2565b9060005260206000200160016040518463ffffffff1660e01b815260040161084493929190610c4d565b600060405180830381600087803b15801561085e57600080fd5b505af1158015610872573d6000803e3d6000fd5b50505050808061088190610bee565b9150506107e5565b5050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156108d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108fa9190610c34565b6003546040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b15801561095a57600080fd5b505af115801561096e573d6000803e3d6000fd5b5050505060005b60065481101561088957600354600680546001600160a01b03909216916359f50cfd918591859081106109aa576109aa610bc2565b9060005260206000200160006040518463ffffffff1660e01b81526004016109d493929190610c4d565b600060405180830381600087803b1580156109ee57600080fd5b505af1158015610a02573d6000803e3d6000fd5b505050508080610a1190610bee565b915050610975565b634e487b7160e01b600052604160045260246000fd5b60008060408385031215610a4257600080fd5b82359150602083013567ffffffffffffffff80821115610a6157600080fd5b818501915085601f830112610a7557600080fd5b813581811115610a8757610a87610a19565b604051601f8201601f19908116603f01168101908382118183101715610aaf57610aaf610a19565b81604052828152886020848701011115610ac857600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b600060208083528351808285015260005b81811015610b1757858101830151858201604001528201610afb565b81811115610b29576000604083870101525b50601f01601f1916929092016040019392505050565b600060208284031215610b5157600080fd5b5035919050565b600060208284031215610b6a57600080fd5b81356001600160a01b0381168114610b8157600080fd5b9392505050565b600181811c90821680610b9c57607f821691505b602082108103610bbc57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201610c0057610c00610bd8565b5060010190565b600082821015610c1957610c19610bd8565b500390565b634e487b7160e01b600052603160045260246000fd5b600060208284031215610c4657600080fd5b5051919050565b838152600060206060818401526000855481600182811c915080831680610c7557607f831692505b8583108103610c9257634e487b7160e01b85526022600452602485fd5b6060880183905260808801818015610cb15760018114610cc257610ced565b60ff19861682528782019650610ced565b60008c81526020902060005b86811015610ce757815484820152908501908901610cce565b83019750505b50505050861515604087015250909250610d05915050565b94935050505056fea264697066735822122000c8b9ecf1733dfda225b7aee7356523dc58a62b473ae214a30723683930a03a64736f6c634300080d00334120747265617479206265747765656e2074686520556e69746564205374617465732c2043616e6164612c20616e642074656e204575726f7065616e20636f756e747269657320746f20646566656e642065616368206f74686572206279206d757475616c20646566656e73652069662061747461636b656420627920616e792065787465726e616c2070617274794e6f7274682041746c616e74696320547265617479204f7267616e697a6174696f6e";

type NATOConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NATOConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NATO__factory extends ContractFactory {
  constructor(...args: NATOConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NATO> {
    return super.deploy(_diamond, overrides || {}) as Promise<NATO>;
  }
  override getDeployTransaction(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_diamond, overrides || {});
  }
  override attach(address: string): NATO {
    return super.attach(address) as NATO;
  }
  override connect(signer: Signer): NATO__factory {
    return super.connect(signer) as NATO__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NATOInterface {
    return new utils.Interface(_abi) as NATOInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): NATO {
    return new Contract(address, _abi, signerOrProvider) as NATO;
  }
}
