/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  GetterFacet,
  GetterFacetInterface,
} from "../../../contracts/facets/GetterFacet";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "_position",
        type: "tuple",
      },
    ],
    name: "getArmyAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_armyID",
        type: "uint256",
      },
    ],
    name: "getArmyConstituents",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "_position",
        type: "tuple",
      },
    ],
    name: "getCityAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cityID",
        type: "uint256",
      },
    ],
    name: "getCityCenter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cityID",
        type: "uint256",
      },
    ],
    name: "getCityGuard",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getComponent",
    outputs: [
      {
        internalType: "contract Component",
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
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getComponentById",
    outputs: [
      {
        internalType: "contract Component",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntities",
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
    inputs: [],
    name: "getEntitiesAddr",
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
    name: "getEntity",
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
        internalType: "uint256",
        name: "_cityID",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_inventoryType",
        type: "string",
      },
    ],
    name: "getInventoryByCityAndType",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlayerCount",
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
        name: "_player",
        type: "address",
      },
    ],
    name: "getPlayerId",
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
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct Position",
        name: "_position",
        type: "tuple",
      },
    ],
    name: "getSettlerAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_inventoryType",
        type: "string",
      },
    ],
    name: "getTemplateByInventoryType",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getWorldConstants",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "admin",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "worldWidth",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "worldHeight",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "numInitTerrainTypes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initBatchSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxCityCountPerPlayer",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxArmyCountPerPlayer",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPlayerCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityUpgradeGoldCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxInventoryCapacity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityPackCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initCityGold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityHealth",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityAttack",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityDefense",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tileWidth",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "armyBattleRange",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityBattleRange",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityAmount",
            type: "uint256",
          },
        ],
        internalType: "struct WorldConstants",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
    ],
    name: "isPlayerInitialized",
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
];

const _bytecode =
  "0x60806040526000805534801561001457600080fd5b506111e9806100246000396000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c806397fd6371116100b2578063c4ae16a811610081578063e7a42cb311610066578063e7a42cb3146103da578063efacc5e2146103ed578063ff200d2b1461040057600080fd5b8063c4ae16a814610362578063e72a53fb146103aa57600080fd5b806397fd637114610302578063ba94d43714610315578063c2e5220614610328578063c3b100281461034f57600080fd5b8063738101cf116100ee578063738101cf1461026c5780637672ed4e1461027f57806384d969bd146102925780639184f0b6146102a557600080fd5b80630a863ca71461012057806321c3b5221461015057806331b933b9146102365780633e1877f11461024b575b600080fd5b61013361012e36600461102f565b610408565b6040516001600160a01b0390911681526020015b60405180910390f35b6101586104ae565b604051610147919081516001600160a01b031681526020808301519082015260408083015190820152606080830151908201526080808301519082015260a0808301519082015260c0808301519082015260e08083015190820152610100808301519082015261012080830151908201526101408083015190820152610160808301519082015261018080830151908201526101a080830151908201526101c080830151908201526101e080830151908201526102008083015190820152610220808301519082015261024091820151918101919091526102600190565b61023e610853565b60405161014791906110a4565b61025e61025936600461102f565b610911565b604051908152602001610147565b61025e61027a36600461102f565b6109b1565b61023e61028d36600461102f565b610a05565b6101336102a0366004610fae565b610aa8565b6102f26102b3366004610ec7565b600080546001600160a01b0390921681527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918e36020526040902054141590565b6040519015158152602001610147565b61025e610310366004610fe1565b610af9565b61025e610323366004610fe1565b610b57565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba09b5461025e565b61025e61035d366004610fae565b610bb5565b61025e610370366004610ec7565b6001600160a01b031660009081527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918e3602052604090205490565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918de546001600160a01b0316610133565b61025e6103e8366004610fe1565b610c08565b61025e6103fb36600461105f565b610c66565b61025e610d9e565b6040517f8d7fa3d80000000000000000000000000000000000000000000000000000000081526004810182905260009073__$7fcaad27f85dd9a0fa019456818c6f9f34$__90638d7fa3d8906024015b60206040518083038186803b15801561047057600080fd5b505af4158015610484573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a89190610f92565b92915050565b61054c60405180610260016040528060006001600160a01b031681526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b5060408051610260810182527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba088546001600160a01b031681527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba0895460208201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08a54918101919091527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08b5460608201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08c5460808201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08d5460a08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08e5460c08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08f5460e08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba090546101008201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba091546101208201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba092546101408201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba093546101608201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba094546101808201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba095546101a08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba096546101c08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba097546101e08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba098546102008201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba099546102208201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba09a5461024082015290565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918de54604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b1580156108d057600080fd5b505afa1580156108e4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261090c9190810190610eea565b905090565b6040517fc2e7a1140000000000000000000000000000000000000000000000000000000081526004810182905260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__9063c2e7a114906024015b60206040518083038186803b15801561097957600080fd5b505af415801561098d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a89190611047565b6040517f433fc07f0000000000000000000000000000000000000000000000000000000081526004810182905260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__9063433fc07f90602401610961565b6040517f463afcab0000000000000000000000000000000000000000000000000000000081526004810182905260609073__$80f58d039fa8106ab096f6fd7dbaec355f$__9063463afcab9060240160006040518083038186803b158015610a6c57600080fd5b505af4158015610a80573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104a89190810190610eea565b6040517e0f9f1c00000000000000000000000000000000000000000000000000000000815260009073__$7fcaad27f85dd9a0fa019456818c6f9f34$__90620f9f1c906104589085906004016110e8565b6040517f3699139d000000000000000000000000000000000000000000000000000000008152815160048201526020820151602482015260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__90633699139d90604401610961565b6040517f1fc514dc000000000000000000000000000000000000000000000000000000008152815160048201526020820151602482015260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__90631fc514dc90604401610961565b6040517fa5506ec800000000000000000000000000000000000000000000000000000000815260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__9063a5506ec8906109619085906004016110e8565b6040517fc6ac953a000000000000000000000000000000000000000000000000000000008152815160048201526020820151602482015260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__9063c6ac953a90604401610961565b60008073__$80f58d039fa8106ab096f6fd7dbaec355f$__63a5506ec8846040518263ffffffff1660e01b8152600401610ca091906110e8565b60206040518083038186803b158015610cb857600080fd5b505af4158015610ccc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cf09190611047565b6040517f3f5d6caf000000000000000000000000000000000000000000000000000000008152600481018690526024810182905290915073__$80f58d039fa8106ab096f6fd7dbaec355f$__90633f5d6caf9060440160206040518083038186803b158015610d5e57600080fd5b505af4158015610d72573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d969190611047565b949350505050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918de54604080517f949d225d00000000000000000000000000000000000000000000000000000000815290516000926001600160a01b031691829163949d225d91600480820192602092909190829003018186803b158015610e1e57600080fd5b505afa158015610e32573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e569190611047565b91505090565b600082601f830112610e6c578081fd5b813567ffffffffffffffff811115610e8657610e8661116c565b610e99601f8201601f191660200161113b565b818152846020838601011115610ead578283fd5b816020850160208301379081016020019190915292915050565b600060208284031215610ed8578081fd5b8135610ee38161119b565b9392505050565b60006020808385031215610efc578182fd5b825167ffffffffffffffff80821115610f13578384fd5b818501915085601f830112610f26578384fd5b815181811115610f3857610f3861116c565b8060051b9150610f4984830161113b565b8181528481019084860184860187018a1015610f63578788fd5b8795505b83861015610f85578051835260019590950194918601918601610f67565b5098975050505050505050565b600060208284031215610fa3578081fd5b8151610ee38161119b565b600060208284031215610fbf578081fd5b813567ffffffffffffffff811115610fd5578182fd5b610d9684828501610e5c565b600060408284031215610ff2578081fd5b6040516040810181811067ffffffffffffffff821117156110155761101561116c565b604052823581526020928301359281019290925250919050565b600060208284031215611040578081fd5b5035919050565b600060208284031215611058578081fd5b5051919050565b60008060408385031215611071578081fd5b82359150602083013567ffffffffffffffff81111561108e578182fd5b61109a85828601610e5c565b9150509250929050565b6020808252825182820181905260009190848201906040850190845b818110156110dc578351835292840192918401916001016110c0565b50909695505050505050565b6000602080835283518082850152825b81811015611114578581018301518582016040015282016110f8565b818111156111255783604083870101525b50601f01601f1916929092016040019392505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156111645761116461116c565b604052919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6001600160a01b03811681146111b057600080fd5b5056fea2646970667358221220e83855e39b4f774cb5fc499de78d7ea5f7a88e498397c5bb910e881f72abcbc564736f6c63430008040033";

type GetterFacetConstructorParams =
  | [linkLibraryAddresses: GetterFacetLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GetterFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class GetterFacet__factory extends ContractFactory {
  constructor(...args: GetterFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(
        _abi,
        GetterFacet__factory.linkBytecode(linkLibraryAddresses),
        signer
      );
    }
  }

  static linkBytecode(
    linkLibraryAddresses: GetterFacetLibraryAddresses
  ): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$7fcaad27f85dd9a0fa019456818c6f9f34\\$__", "g"),
      linkLibraryAddresses["contracts/libraries/ECSLib.sol:ECSLib"]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$80f58d039fa8106ab096f6fd7dbaec355f\\$__", "g"),
      linkLibraryAddresses["contracts/libraries/GameLib.sol:GameLib"]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GetterFacet> {
    return super.deploy(overrides || {}) as Promise<GetterFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): GetterFacet {
    return super.attach(address) as GetterFacet;
  }
  override connect(signer: Signer): GetterFacet__factory {
    return super.connect(signer) as GetterFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GetterFacetInterface {
    return new utils.Interface(_abi) as GetterFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GetterFacet {
    return new Contract(address, _abi, signerOrProvider) as GetterFacet;
  }
}

export interface GetterFacetLibraryAddresses {
  ["contracts/libraries/ECSLib.sol:ECSLib"]: string;
  ["contracts/libraries/GameLib.sol:GameLib"]: string;
}
