/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type { PromiseOrValue } from '../../../common';
import type { GetterFacet, GetterFacetInterface } from '../../../contracts/facets/GetterFacet';

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'x',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'y',
            type: 'uint256',
          },
        ],
        internalType: 'struct Position',
        name: '_position',
        type: 'tuple',
      },
    ],
    name: 'getCityAt',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_cityID',
        type: 'uint256',
      },
    ],
    name: 'getCityCenter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
    ],
    name: 'getComponent',
    outputs: [
      {
        internalType: 'contract Component',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_entity',
        type: 'uint256',
      },
    ],
    name: 'getComponentById',
    outputs: [
      {
        internalType: 'contract Component',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getEntitiesAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getEntity',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_cityID',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_inventoryType',
        type: 'string',
      },
    ],
    name: 'getInventoryByCityAndType',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPlayerCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_player',
        type: 'address',
      },
    ],
    name: 'getPlayerId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'x',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'y',
            type: 'uint256',
          },
        ],
        internalType: 'struct Position',
        name: '_position',
        type: 'tuple',
      },
    ],
    name: 'getSettlerAt',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_inventoryType',
        type: 'string',
      },
    ],
    name: 'getTemplateByInventoryType',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_inventoryType',
        type: 'string',
      },
    ],
    name: 'getTemplateId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'x',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'y',
            type: 'uint256',
          },
        ],
        internalType: 'struct Position',
        name: '_pos',
        type: 'tuple',
      },
    ],
    name: 'getTileAt',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isInitialized',
            type: 'bool',
          },
          {
            internalType: 'enum TERRAIN',
            name: 'terrain',
            type: 'uint8',
          },
        ],
        internalType: 'struct Tile',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWorldConstants',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'admin',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'worldWidth',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'worldHeight',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'numInitTerrainTypes',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initBatchSize',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxCityCountPerPlayer',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxArmyCountPerPlayer',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxPlayerCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'cityUpgradeGoldCost',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initCityGold',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'cityHealth',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'cityAttack',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'cityDefense',
            type: 'uint256',
          },
        ],
        internalType: 'struct WorldConstants',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_player',
        type: 'address',
      },
    ],
    name: 'isPlayerInitialized',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const _bytecode =
  '0x60806040526000805534801561001457600080fd5b50610e94806100246000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806397fd637111610097578063c4ae16a811610066578063c4ae16a8146102f1578063e72a53fb14610339578063efacc5e214610369578063ff200d2b1461037c57600080fd5b806397fd6371146102a4578063ba94d437146102b7578063c2e52206146102ca578063c3b100281461020157600080fd5b806351069aaa116100d357806351069aaa1461020157806384d969bd14610214578063898ce75c146102275780639184f0b61461024757600080fd5b80630a863ca7146100fa57806321c3b5221461012a5780633e1877f1146101e0575b600080fd5b61010d610108366004610d04565b610384565b6040516001600160a01b0390911681526020015b60405180910390f35b61013261042a565b604051610121919081516001600160a01b031681526101c081016020830151602083015260408301516040830152606083015160608301526080830151608083015260a083015160a083015260c083015160c083015260e083015160e08301526101008084015181840152506101208084015181840152506101408084015181840152506101608084015181840152506101808084015181840152506101a080840151818401525092915050565b6101f36101ee366004610d04565b6106e4565b604051908152602001610121565b6101f361020f366004610c59565b610784565b61010d610222366004610c59565b6107d7565b61023a610235366004610c8c565b610828565b6040516101219190610dcc565b610294610255366004610c1a565b600080546001600160a01b0390921681527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918dd6020526040902054141590565b6040519015158152602001610121565b6101f36102b2366004610c8c565b6108e1565b6101f36102c5366004610c8c565b61093f565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba096546101f3565b6101f36102ff366004610c1a565b6001600160a01b031660009081527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918dd602052604090205490565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918d9546001600160a01b031661010d565b6101f3610377366004610d34565b61099d565b6101f3610ad5565b6040517f8d7fa3d80000000000000000000000000000000000000000000000000000000081526004810182905260009073__$7fcaad27f85dd9a0fa019456818c6f9f34$__90638d7fa3d8906024015b60206040518083038186803b1580156103ec57600080fd5b505af4158015610400573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104249190610c3d565b92915050565b6104a5604051806101c0016040528060006001600160a01b03168152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b50604080516101c0810182527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba088546001600160a01b031681527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba0895460208201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08a54918101919091527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08b5460608201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08c5460808201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08d5460a08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08e5460c08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08f5460e08201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba090546101008201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba091546101208201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba092546101408201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba093546101608201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba094546101808201527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba095546101a082015290565b6040517fc2e7a1140000000000000000000000000000000000000000000000000000000081526004810182905260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__9063c2e7a114906024015b60206040518083038186803b15801561074c57600080fd5b505af4158015610760573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104249190610d1c565b6040517fa5506ec800000000000000000000000000000000000000000000000000000000815260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__9063a5506ec890610734908590600401610d79565b6040517e0f9f1c00000000000000000000000000000000000000000000000000000000815260009073__$7fcaad27f85dd9a0fa019456818c6f9f34$__90620f9f1c906103d4908590600401610d79565b60408051808201909152600080825260208201526040517feaa2c47f000000000000000000000000000000000000000000000000000000008152825160048201526020830151602482015273__$80f58d039fa8106ab096f6fd7dbaec355f$__9063eaa2c47f90604401604080518083038186803b1580156108a957600080fd5b505af41580156108bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104249190610cbd565b6040517f3699139d000000000000000000000000000000000000000000000000000000008152815160048201526020820151602482015260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__90633699139d90604401610734565b6040517f1fc514dc000000000000000000000000000000000000000000000000000000008152815160048201526020820151602482015260009073__$80f58d039fa8106ab096f6fd7dbaec355f$__90631fc514dc90604401610734565b60008073__$80f58d039fa8106ab096f6fd7dbaec355f$__63a5506ec8846040518263ffffffff1660e01b81526004016109d79190610d79565b60206040518083038186803b1580156109ef57600080fd5b505af4158015610a03573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a279190610d1c565b6040517f3f5d6caf000000000000000000000000000000000000000000000000000000008152600481018690526024810182905290915073__$80f58d039fa8106ab096f6fd7dbaec355f$__90633f5d6caf9060440160206040518083038186803b158015610a9557600080fd5b505af4158015610aa9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610acd9190610d1c565b949350505050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918d954604080517f949d225d00000000000000000000000000000000000000000000000000000000815290516000926001600160a01b031691829163949d225d91600480820192602092909190829003018186803b158015610b5557600080fd5b505afa158015610b69573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b8d9190610d1c565b91505090565b600082601f830112610ba3578081fd5b813567ffffffffffffffff80821115610bbe57610bbe610e30565b604051601f8301601f19908116603f01168101908282118183101715610be657610be6610e30565b81604052838152866020858801011115610bfe578485fd5b8360208701602083013792830160200193909352509392505050565b600060208284031215610c2b578081fd5b8135610c3681610e46565b9392505050565b600060208284031215610c4e578081fd5b8151610c3681610e46565b600060208284031215610c6a578081fd5b813567ffffffffffffffff811115610c80578182fd5b610acd84828501610b93565b600060408284031215610c9d578081fd5b610ca5610e07565b82358152602083013560208201528091505092915050565b600060408284031215610cce578081fd5b610cd6610e07565b82518015158114610ce5578283fd5b8152602083015160018110610cf8578283fd5b60208201529392505050565b600060208284031215610d15578081fd5b5035919050565b600060208284031215610d2d578081fd5b5051919050565b60008060408385031215610d46578081fd5b82359150602083013567ffffffffffffffff811115610d63578182fd5b610d6f85828601610b93565b9150509250929050565b6000602080835283518082850152825b81811015610da557858101830151858201604001528201610d89565b81811115610db65783604083870101525b50601f01601f1916929092016040019392505050565b8151151581526020820151604082019060018110610dfa57634e487b7160e01b600052602160045260246000fd5b8060208401525092915050565b6040805190810167ffffffffffffffff81118282101715610e2a57610e2a610e30565b60405290565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610e5b57600080fd5b5056fea26469706673582212200be609a43269515f865e99943c95a422e44416ff1ea3abac61083956e865f19664736f6c63430008040033';

type GetterFacetConstructorParams = [linkLibraryAddresses: GetterFacetLibraryAddresses, signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: GetterFacetConstructorParams): xs is ConstructorParameters<typeof ContractFactory> => {
  return typeof xs[0] === 'string' || (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) || '_isInterface' in xs[0];
};

export class GetterFacet__factory extends ContractFactory {
  constructor(...args: GetterFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(_abi, GetterFacet__factory.linkBytecode(linkLibraryAddresses), signer);
    }
  }

  static linkBytecode(linkLibraryAddresses: GetterFacetLibraryAddresses): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(new RegExp('__\\$7fcaad27f85dd9a0fa019456818c6f9f34\\$__', 'g'), linkLibraryAddresses['contracts/libraries/ECSLib.sol:ECSLib'].replace(/^0x/, '').toLowerCase());

    linkedBytecode = linkedBytecode.replace(new RegExp('__\\$80f58d039fa8106ab096f6fd7dbaec355f\\$__', 'g'), linkLibraryAddresses['contracts/libraries/GameLib.sol:GameLib'].replace(/^0x/, '').toLowerCase());

    return linkedBytecode;
  }

  override deploy(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<GetterFacet> {
    return super.deploy(overrides || {}) as Promise<GetterFacet>;
  }
  override getDeployTransaction(overrides?: Overrides & { from?: PromiseOrValue<string> }): TransactionRequest {
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
  static connect(address: string, signerOrProvider: Signer | Provider): GetterFacet {
    return new Contract(address, _abi, signerOrProvider) as GetterFacet;
  }
}

export interface GetterFacetLibraryAddresses {
  ['contracts/libraries/ECSLib.sol:ECSLib']: string;
  ['contracts/libraries/GameLib.sol:GameLib']: string;
}
