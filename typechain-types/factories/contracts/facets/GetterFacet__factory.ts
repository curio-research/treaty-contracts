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
    inputs: [
      {
        internalType: "uint256",
        name: "_cityID",
        type: "uint256",
      },
    ],
    name: "getInventory",
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
    name: "getTemplateId",
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
  "0x60806040526000805534801561001457600080fd5b50610e21806100246000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c8063898ce75c1161008c578063ba94d43711610066578063ba94d437146102b4578063c2e52206146102c7578063c4ae16a8146102ee578063ff200d2b1461033657600080fd5b8063898ce75c146102245780639184f0b61461024457806397fd6371146102a157600080fd5b806351069aaa116100bd57806351069aaa146101eb5780635b298d32146101fe57806384d969bd1461021157600080fd5b80630a863ca7146100e457806321c3b522146101145780633e1877f1146101ca575b600080fd5b6100f76100f2366004610cd6565b61033e565b6040516001600160a01b0390911681526020015b60405180910390f35b61011c6103e4565b60405161010b919081516001600160a01b031681526101c081016020830151602083015260408301516040830152606083015160608301526080830151608083015260a083015160a083015260c083015160c083015260e083015160e08301526101008084015181840152506101208084015181840152506101408084015181840152506101608084015181840152506101808084015181840152506101a080840151818401525092915050565b6101dd6101d8366004610cd6565b61069e565b60405190815260200161010b565b6101dd6101f9366004610bb4565b61073e565b6101dd61020c366004610cd6565b610791565b6100f761021f366004610bb4565b6108f8565b610237610232366004610c5e565b610949565b60405161010b9190610d59565b610291610252366004610b7c565b600080546001600160a01b0390921681527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918dd6020526040902054141590565b604051901515815260200161010b565b6101dd6102af366004610c5e565b610a02565b6101dd6102c2366004610c5e565b610a60565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba096546101dd565b6101dd6102fc366004610b7c565b6001600160a01b031660009081527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918dd602052604090205490565b6101dd610abe565b6040517f8d7fa3d80000000000000000000000000000000000000000000000000000000081526004810182905260009073__$7fcaad27f85dd9a0fa019456818c6f9f34$__90638d7fa3d8906024015b60206040518083038186803b1580156103a657600080fd5b505af41580156103ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103de9190610b98565b92915050565b61045f604051806101c0016040528060006001600160a01b03168152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b50604080516101c0810182527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba088546001600160a01b031681527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba0895460208201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08a54918101919091527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08b5460608201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08c5460808201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08d5460a08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08e5460c08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08f5460e08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba090546101008201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba091546101208201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba092546101408201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba093546101608201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba094546101808201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba095546101a082015290565b6040517fc2e7a1140000000000000000000000000000000000000000000000000000000081526004810182905260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__9063c2e7a114906024015b60206040518083038186803b15801561070657600080fd5b505af415801561071a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103de9190610cee565b6040517fa5506ec800000000000000000000000000000000000000000000000000000000815260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__9063a5506ec8906106ee908590600401610d06565b60008073__$80f58d039fa8106ab096f6fd7dbaec355f$__63a5506ec86040518163ffffffff1660e01b81526004016107fb9060208082526004908201527f476f6c6400000000000000000000000000000000000000000000000000000000604082015260600190565b60206040518083038186803b15801561081357600080fd5b505af4158015610827573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061084b9190610cee565b6040517f3f5d6caf000000000000000000000000000000000000000000000000000000008152600481018590526024810182905290915073__$80f58d039fa8106ab096f6fd7dbaec355f$__90633f5d6caf9060440160206040518083038186803b1580156108b957600080fd5b505af41580156108cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108f19190610cee565b9392505050565b6040517e0f9f1c00000000000000000000000000000000000000000000000000000000815260009073__$7fcaad27f85dd9a0fa019456818c6f9f34$__90620f9f1c9061038e908590600401610d06565b60408051808201909152600080825260208201526040517feaa2c47f000000000000000000000000000000000000000000000000000000008152825160048201526020830151602482015273__$80f58d039fa8106ab096f6fd7dbaec355f$__9063eaa2c47f90604401604080518083038186803b1580156109ca57600080fd5b505af41580156109de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103de9190610c8f565b6040517f3699139d000000000000000000000000000000000000000000000000000000008152815160048201526020820151602482015260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__90633699139d906044016106ee565b6040517f1fc514dc000000000000000000000000000000000000000000000000000000008152815160048201526020820151602482015260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__90631fc514dc906044016106ee565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918d954604080517f949d225d00000000000000000000000000000000000000000000000000000000815290516000926001600160a01b031691829163949d225d91600480820192602092909190829003018186803b158015610b3e57600080fd5b505afa158015610b52573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b769190610cee565b91505090565b600060208284031215610b8d578081fd5b81356108f181610dd3565b600060208284031215610ba9578081fd5b81516108f181610dd3565b600060208284031215610bc5578081fd5b813567ffffffffffffffff80821115610bdc578283fd5b818401915084601f830112610bef578283fd5b813581811115610c0157610c01610dbd565b604051601f8201601f19908116603f01168101908382118183101715610c2957610c29610dbd565b81604052828152876020848701011115610c41578586fd5b826020860160208301379182016020019490945295945050505050565b600060408284031215610c6f578081fd5b610c77610d94565b82358152602083013560208201528091505092915050565b600060408284031215610ca0578081fd5b610ca8610d94565b82518015158114610cb7578283fd5b8152602083015160018110610cca578283fd5b60208201529392505050565b600060208284031215610ce7578081fd5b5035919050565b600060208284031215610cff578081fd5b5051919050565b6000602080835283518082850152825b81811015610d3257858101830151858201604001528201610d16565b81811115610d435783604083870101525b50601f01601f1916929092016040019392505050565b8151151581526020820151604082019060018110610d8757634e487b7160e01b600052602160045260246000fd5b8060208401525092915050565b6040805190810167ffffffffffffffff81118282101715610db757610db7610dbd565b60405290565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610de857600080fd5b5056fea2646970667358221220619d1b1564b1fc2fa80088672641ad123dc8f0e5dee55f8e418892aee303364a64736f6c63430008040033";

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
