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
  "0x60806040523480156200001157600080fd5b5060405162001068380380620010688339810160408190526200003491620001ea565b806001600160a01b0381166200009e5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e642061646472657373207265716044820152641d5a5c995960da1b606482015260840160405180910390fd5b600080546001600160a01b039092166001600160a01b031992831681179091556001805483168217905560028054831682179055600380549092161790556040805160608101909152602280825262001046602083013980516200010b9160049160209091019062000144565b506040518060c00160405280608f815260200162000fb7608f913980516200013c9160059160209091019062000144565b505062000258565b82805462000152906200021c565b90600052602060002090601f016020900481019282620001765760008555620001c1565b82601f106200019157805160ff1916838001178555620001c1565b82800160010185558215620001c1579182015b82811115620001c1578251825591602001919060010190620001a4565b50620001cf929150620001d3565b5090565b5b80821115620001cf5760008155600101620001d4565b600060208284031215620001fd57600080fd5b81516001600160a01b03811681146200021557600080fd5b9392505050565b600181811c908216806200023157607f821691505b6020821081036200025257634e487b7160e01b600052602260045260246000fd5b50919050565b610d4f80620002686000396000f3fe608060405234801561001057600080fd5b50600436106102405760003560e01c80636a2a2b4e11610145578063c009a6cb116100bd578063e75991fa1161008c578063f0b7db4e11610071578063f0b7db4e1461039f578063f2e1730b14610245578063f851a440146103b257600080fd5b8063e75991fa14610245578063ec19ae801461024557600080fd5b8063c009a6cb14610245578063c3fe3e281461038c578063cbb34e8614610245578063e534ae5f1461024557600080fd5b806399665ca311610114578063a67a6bbe116100f9578063a67a6bbe146102fd578063a83280bc14610245578063a9a7aef91461036957600080fd5b806399665ca3146102f55780639bcecd0b1461024557600080fd5b80636a2a2b4e146102455780637284e416146102c75780637fecf098146102cf578063993a04b7146102e257600080fd5b80632b451c64116101d857806347b958a6116101a75780635f310b121161018c5780635f310b12146102455780636008e5b71461029c57806360acfcc61461024557600080fd5b806347b958a6146102945780634ad30a911461024557600080fd5b80632b451c64146102455780632d47fe2714610245578063374155161461024557806339ebfad41461024557600080fd5b80631bc8475d116102145780631bc8475d146102455780631c35717314610245578063243086c41461024557806328f59b831461028a57600080fd5b8062048f5a1461024557806304dc7c741461024557806306fdde031461026d57806314b0528e14610282575b600080fd5b610258610253366004610a34565b6103c5565b60405190151581526020015b60405180910390f35b61027561042e565b6040516102649190610aef565b6102586104bc565b6102926105f9565b005b61029261078b565b6102af6102aa366004610b44565b61092c565b6040516001600160a01b039091168152602001610264565b610275610956565b6102756102dd366004610b44565b610963565b6002546102af906001600160a01b031681565b61025861098e565b6102586007805460018181019092557fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c68801805473ffffffffffffffffffffffffffffffffffffffff1916339081179091556000908152600860205260409020805460ff19168217905590565b610258610377366004610b5d565b60086020526000908152604090205460ff1681565b6001546102af906001600160a01b031681565b6000546102af906001600160a01b031681565b6003546102af906001600160a01b031681565b600080546001600160a01b031633146104255760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b50600192915050565b6004805461043b90610b8d565b80601f016020809104026020016040519081016040528092919081815260200182805461046790610b8d565b80156104b45780601f10610489576101008083540402835291602001916104b4565b820191906000526020600020905b81548152906001019060200180831161049757829003601f168201915b505050505081565b6007546000903390825b8181101561051757826001600160a01b0316600782815481106104eb576104eb610bc7565b6000918252602090912001546001600160a01b031614610517578061050f81610bf3565b9150506104c6565b6007610524600184610c0c565b8154811061053457610534610bc7565b600091825260209091200154600780546001600160a01b03909216918390811061056057610560610bc7565b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b03160217905550600780548061059f5761059f610c23565b600082815260208082208301600019908101805473ffffffffffffffffffffffffffffffffffffffff191690559092019092556001600160a01b039490941681526008909352505060409020805460ff1916905550600190565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610642573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106669190610c39565b6003546040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690635ffde14490602401600060405180830381600087803b1580156106c657600080fd5b505af11580156106da573d6000803e3d6000fd5b5050505060005b60065481101561078757600354600680546001600160a01b0390921691636dd00e8a9185918590811061071657610716610bc7565b906000526020600020016000806040518563ffffffff1660e01b81526004016107429493929190610c52565b600060405180830381600087803b15801561075c57600080fd5b505af1158015610770573d6000803e3d6000fd5b50505050808061077f90610bf3565b9150506106e1565b5050565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa1580156107d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f89190610c39565b6003546040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b03169063ff2a5e79906024016020604051808303816000875af115801561085d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108819190610c39565b5060005b60065481101561078757600354600680546001600160a01b0390921691636dd00e8a918591859081106108ba576108ba610bc7565b90600052602060002001600060016040518563ffffffff1660e01b81526004016108e79493929190610c52565b600060405180830381600087803b15801561090157600080fd5b505af1158015610915573d6000803e3d6000fd5b50505050808061092490610bf3565b915050610885565b6007818154811061093c57600080fd5b6000918252602090912001546001600160a01b0316905081565b6005805461043b90610b8d565b6006818154811061097357600080fd5b90600052602060002001600091509050805461043b90610b8d565b3360008181526008602052604081205490919060ff16610a165760405162461bcd60e51b815260206004820152602760248201527f4e41544f3a204e6174696f6e206973206e6f7420626f756e642062792074686560448201527f2054726561747900000000000000000000000000000000000000000000000000606482015260840161041c565b600191505090565b634e487b7160e01b600052604160045260246000fd5b60008060408385031215610a4757600080fd5b82359150602083013567ffffffffffffffff80821115610a6657600080fd5b818501915085601f830112610a7a57600080fd5b813581811115610a8c57610a8c610a1e565b604051601f8201601f19908116603f01168101908382118183101715610ab457610ab4610a1e565b81604052828152886020848701011115610acd57600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b600060208083528351808285015260005b81811015610b1c57858101830151858201604001528201610b00565b81811115610b2e576000604083870101525b50601f01601f1916929092016040019392505050565b600060208284031215610b5657600080fd5b5035919050565b600060208284031215610b6f57600080fd5b81356001600160a01b0381168114610b8657600080fd5b9392505050565b600181811c90821680610ba157607f821691505b602082108103610bc157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201610c0557610c05610bdd565b5060010190565b600082821015610c1e57610c1e610bdd565b500390565b634e487b7160e01b600052603160045260246000fd5b600060208284031215610c4b57600080fd5b5051919050565b848152600060206080818401526000865481600182811c915080831680610c7a57607f831692505b8583108103610c9757634e487b7160e01b85526022600452602485fd5b6080880183905260a08801818015610cb65760018114610cc757610cf2565b60ff19861682528782019650610cf2565b60008d81526020902060005b86811015610cec57815484820152908501908901610cd3565b83019750505b5050505050604085018790525084151560608501529150610d109050565b9594505050505056fea26469706673582212202e99c946b17f5b081edf8a30b0d89ead6de0328ddd7c83801964a74f3085d8c064736f6c634300080d00334120747265617479206265747765656e2074686520556e69746564205374617465732c2043616e6164612c20616e642074656e204575726f7065616e20636f756e747269657320746f20646566656e642065616368206f74686572206279206d757475616c20646566656e73652069662061747461636b656420627920616e792065787465726e616c2070617274794e6f7274682041746c616e74696320547265617479204f7267616e697a6174696f6e";

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
