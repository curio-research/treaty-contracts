/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  DiamondInit,
  DiamondInitInterface,
} from "../../../contracts/upgradeInitializers/DiamondInit";

const _abi = [
  {
    inputs: [
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
        name: "_worldConstants",
        type: "tuple",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c01806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063cae1a11714610030575b600080fd5b61004361003e366004610564565b610045565b005b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f60209081527f699d9daa71b280d05a152715774afa0a81a312594b2d731d6b0b2552b7d6f69f8054600160ff1991821681179092557ff97e938d8af42f52387bb74b8b526fda8f184cc2aa534340a8d75a88fbecc77580548216831790557f65d510a5d8f7ef134ec444f7f34ee808c8eeb5177cdfd16be0c40fe1ab43369580548216831790557f7f5828d0000000000000000000000000000000000000000000000000000000006000527f5622121b47b8cd0120c4efe45dd5483242f54a3d49bd7679be565d47694918c38054909116909117905581517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba088805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff9092169190911790558101517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba089556040808201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08a5560608201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08b5560808201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08c5560a08201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08d5560c08201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08e5560e08201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08f556101008201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba090556101208201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba091556101408201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba092556101608201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba093556101808201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba094556101a08201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba095556101c08201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba096556101e08201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba097556102008201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba098556102208201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba099556102408201517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba09a55517fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c9061048a9061052e565b604051809103906000f0801580156104a6573d6000803e3d6000fd5b507f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918de805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff9290921691909117905560017f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08663017d785901555050565b610529806106a383390190565b803573ffffffffffffffffffffffffffffffffffffffff8116811461055f57600080fd5b919050565b60006102608284031215610576578081fd5b61057e610651565b6105878361053b565b81526020838101359082015260408084013590820152606080840135908201526080808401359082015260a0808401359082015260c0808401359082015260e08084013590820152610100808401359082015261012080840135908201526101408084013590820152610160808401359082015261018080840135908201526101a080840135908201526101c080840135908201526101e0808401359082015261020080840135908201526102208084013590820152610240928301359281019290925250919050565b604051610260810167ffffffffffffffff8111828210171561069c577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040529056fe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212202dd06c7e0608124355cb1f9ceca0e5d4d5916427eed189b475797b6f8ca8ef0164736f6c63430008040033a264697066735822122023552204972b1607ce4298c0a035e54a0e538154ba5d1f94e70a59a9226bef2664736f6c63430008040033";

type DiamondInitConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DiamondInitConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DiamondInit__factory extends ContractFactory {
  constructor(...args: DiamondInitConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DiamondInit> {
    return super.deploy(overrides || {}) as Promise<DiamondInit>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DiamondInit {
    return super.attach(address) as DiamondInit;
  }
  override connect(signer: Signer): DiamondInit__factory {
    return super.connect(signer) as DiamondInit__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DiamondInitInterface {
    return new utils.Interface(_abi) as DiamondInitInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DiamondInit {
    return new Contract(address, _abi, signerOrProvider) as DiamondInit;
  }
}
