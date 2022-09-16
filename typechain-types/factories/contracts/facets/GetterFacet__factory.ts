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
        name: "_pos",
        type: "tuple",
      },
    ],
    name: "getTileAt",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "isInitialized",
            type: "bool",
          },
          {
            internalType: "enum TERRAIN",
            name: "terrain",
            type: "uint8",
          },
        ],
        internalType: "struct Tile",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
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
            name: "maxInventoryCapacity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cityUpgradeGoldCost",
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
  "0x60806040526000805534801561001457600080fd5b50610a58806100246000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80639184f0b61161005b5780639184f0b6146101a6578063c2e5220614610203578063c4ae16a814610234578063ff200d2b1461027c57600080fd5b80630a863ca71461008d57806321c3b522146100bd57806384d969bd14610173578063898ce75c14610186575b600080fd5b6100a061009b36600461090d565b610284565b6040516001600160a01b0390911681526020015b60405180910390f35b6100c561032a565b6040516100b4919081516001600160a01b031681526101c081016020830151602083015260408301516040830152606083015160608301526080830151608083015260a083015160a083015260c083015160c083015260e083015160e08301526101008084015181840152506101208084015181840152506101408084015181840152506101608084015181840152506101808084015181840152506101a080840151818401525092915050565b6100a06101813660046107eb565b6105e4565b610199610194366004610895565b610635565b6040516100b49190610990565b6101f36101b43660046107ac565b600080546001600160a01b0390921681527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918dc6020526040902054141590565b60405190151581526020016100b4565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba096545b6040519081526020016100b4565b6102266102423660046107ac565b6001600160a01b031660009081527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918dc602052604090205490565b6102266106ee565b6040517f8d7fa3d80000000000000000000000000000000000000000000000000000000081526004810182905260009073__$7fcaad27f85dd9a0fa019456818c6f9f34$__90638d7fa3d8906024015b60206040518083038186803b1580156102ec57600080fd5b505af4158015610300573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032491906107cf565b92915050565b6103a5604051806101c0016040528060006001600160a01b03168152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b50604080516101c0810182527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba088546001600160a01b031681527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba0895460208201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08a54918101919091527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08b5460608201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08c5460808201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08d5460a08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08e5460c08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08f5460e08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba090546101008201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba091546101208201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba092546101408201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba093546101608201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba094546101808201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba095546101a082015290565b6040517e0f9f1c00000000000000000000000000000000000000000000000000000000815260009073__$7fcaad27f85dd9a0fa019456818c6f9f34$__90620f9f1c906102d490859060040161093d565b60408051808201909152600080825260208201526040517feaa2c47f000000000000000000000000000000000000000000000000000000008152825160048201526020830151602482015273__$80f58d039fa8106ab096f6fd7dbaec355f$__9063eaa2c47f90604401604080518083038186803b1580156106b657600080fd5b505af41580156106ca573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032491906108c6565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918d854604080517f949d225d00000000000000000000000000000000000000000000000000000000815290516000926001600160a01b031691829163949d225d91600480820192602092909190829003018186803b15801561076e57600080fd5b505afa158015610782573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a69190610925565b91505090565b6000602082840312156107bd578081fd5b81356107c881610a0a565b9392505050565b6000602082840312156107e0578081fd5b81516107c881610a0a565b6000602082840312156107fc578081fd5b813567ffffffffffffffff80821115610813578283fd5b818401915084601f830112610826578283fd5b813581811115610838576108386109f4565b604051601f8201601f19908116603f01168101908382118183101715610860576108606109f4565b81604052828152876020848701011115610878578586fd5b826020860160208301379182016020019490945295945050505050565b6000604082840312156108a6578081fd5b6108ae6109cb565b82358152602083013560208201528091505092915050565b6000604082840312156108d7578081fd5b6108df6109cb565b825180151581146108ee578283fd5b8152602083015160028110610901578283fd5b60208201529392505050565b60006020828403121561091e578081fd5b5035919050565b600060208284031215610936578081fd5b5051919050565b6000602080835283518082850152825b818110156109695785810183015185820160400152820161094d565b8181111561097a5783604083870101525b50601f01601f1916929092016040019392505050565b81511515815260208201516040820190600281106109be57634e487b7160e01b600052602160045260246000fd5b8060208401525092915050565b6040805190810167ffffffffffffffff811182821017156109ee576109ee6109f4565b60405290565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610a1f57600080fd5b5056fea2646970667358221220b42e22ace8d3d1b6e12de781f674ad1a23041f5dbf43ac90b21fb139f8c7bd3264736f6c63430008040033";

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
