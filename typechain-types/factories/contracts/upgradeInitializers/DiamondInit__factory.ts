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
            name: "capitalLevelToEntityLevelRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gameLengthInSeconds",
            type: "uint256",
          },
          {
            internalType: "enum GameMode",
            name: "gameMode",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "maxArmyCountPerNation",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxCapitalLevel",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxNationCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "numInitTerrainTypes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "secondsToTrainAThousandTroops",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tileWidth",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "worldHeight",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "worldWidth",
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
  "0x608060405234801561001057600080fd5b506109b4806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806365406b0014610030575b600080fd5b61004361003e366004610411565b610045565b005b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f60209081527f699d9daa71b280d05a152715774afa0a81a312594b2d731d6b0b2552b7d6f69f8054600160ff1991821681179092557ff97e938d8af42f52387bb74b8b526fda8f184cc2aa534340a8d75a88fbecc77580548216831790557f65d510a5d8f7ef134ec444f7f34ee808c8eeb5177cdfd16be0c40fe1ab43369580548216831790557f7f5828d0000000000000000000000000000000000000000000000000000000006000527f5622121b47b8cd0120c4efe45dd5483242f54a3d49bd7679be565d47694918c3805482168317905583517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba089805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff909216919091178155928401517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08a5560408401517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08b5560608401517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08c80547fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c958795909491909116908381811115610245576102456104b9565b02179055506080820151600482015560a0820151600582015560c0820151600682015560e0820151600782015561010082015160088201556101208201516009820155610140820151600a82015561016090910151600b909101556040516102ac90610394565b604051809103906000f0801580156102c8573d6000803e3d6000fd5b507f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba098805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff9290921691909117905560017f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08660130155505060017f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba0a355427f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08855565b6104af806104d083390190565b604051610180810167ffffffffffffffff811182821017156103d357634e487b7160e01b600052604160045260246000fd5b60405290565b803573ffffffffffffffffffffffffffffffffffffffff811681146103fd57600080fd5b919050565b8035600281106103fd57600080fd5b6000610180828403121561042457600080fd5b61042c6103a1565b610435836103d9565b8152602083013560208201526040830135604082015261045760608401610402565b60608201526080838101359082015260a0808401359082015260c0808401359082015260e08084013590820152610100808401359082015261012080840135908201526101408084013590820152610160928301359281019290925250919050565b634e487b7160e01b600052602160045260246000fdfe608060405234801561001057600080fd5b50600080546001600160a01b0319163317905561047d806100326000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806353ed51431161005057806353ed514314610094578063949d225d146100b25780639f161b0a146100c357600080fd5b80631003e2d21461006c5780634cc8221514610081575b600080fd5b61007f61007a366004610399565b6100e6565b005b61007f61008f366004610399565b6101bd565b61009c6102e8565b6040516100a991906103b2565b60405180910390f35b6001546040519081526020016100a9565b6100d66100d1366004610399565b610340565b60405190151581526020016100a9565b60005473ffffffffffffffffffffffffffffffffffffffff16331461015e5760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b60648201526084015b60405180910390fd5b61016781610340565b6101ba5760018054808201825560008290527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60182905580546101aa91906103f6565b6000828152600260205260409020555b50565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102305760405162461bcd60e51b8152602060048201526024808201527f5365743a204f6e6c79206465706c6f7965722063616e206d6f646966792076616044820152636c75657360e01b6064820152608401610155565b61023981610340565b156101ba576000818152600260205260408120549060018061025a60015490565b61026491906103f6565b815481106102745761027461041b565b9060005260206000200154905080600183815481106102955761029561041b565b60009182526020808320909101929092558281526002909152604080822084905584825281205560018054806102cd576102cd610431565b60019003818190600052602060002001600090559055505050565b6060600180548060200260200160405190810160405280929190818152602001828054801561033657602002820191906000526020600020905b815481526020019060010190808311610322575b5050505050905090565b600061034b60015490565b60000361035a57506000919050565b60008281526002602052604090205415158061039357508160016000815481106103865761038661041b565b9060005260206000200154145b92915050565b6000602082840312156103ab57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103ea578351835292840192918401916001016103ce565b50909695505050505050565b60008282101561041657634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea2646970667358221220ebde7a6ce6f021fdc810c16de3d7df0f72534ae7915f8069ae1d3872a5fc997564736f6c634300080d0033a264697066735822122018dbbb6e5757f82687a9495dc23896701c0235a95457d71763be5269d25485c664736f6c634300080d0033";

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
