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
            name: "maxCapitalCountPerNation",
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
  "0x608060405234801561001057600080fd5b50610a4e806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063a26c57cc14610030575b600080fd5b61004361003e366004610440565b610045565b005b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f60209081527f699d9daa71b280d05a152715774afa0a81a312594b2d731d6b0b2552b7d6f69f8054600160ff1991821681179092557ff97e938d8af42f52387bb74b8b526fda8f184cc2aa534340a8d75a88fbecc77580548216831790557f65d510a5d8f7ef134ec444f7f34ee808c8eeb5177cdfd16be0c40fe1ab43369580548216831790557f7f5828d0000000000000000000000000000000000000000000000000000000006000527f5622121b47b8cd0120c4efe45dd5483242f54a3d49bd7679be565d47694918c3805482168317905583517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba089805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff909216919091178155928401517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08a5560408401517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08b5560608401517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08c80547fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c958795909491909116908381811115610245576102456104f3565b02179055506080820151600482015560a0820151600582015560c0820151600682015560e0820151600782015561010082015160088201556101208201516009820155610140820151600a820155610160820151600b82015561018090910151600c909101556040516102b7906103c3565b604051809103906000f0801580156102d3573d6000803e3d6000fd5b507f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba099805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff9290921691909117905560017f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08660140155505060017f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba09b8190557f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba09c55427f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08855565b61050f8061050a83390190565b6040516101a0810167ffffffffffffffff8111828210171561040257634e487b7160e01b600052604160045260246000fd5b60405290565b803573ffffffffffffffffffffffffffffffffffffffff8116811461042c57600080fd5b919050565b80356002811061042c57600080fd5b60006101a0828403121561045357600080fd5b61045b6103d0565b61046483610408565b8152602083013560208201526040830135604082015261048660608401610431565b60608201526080838101359082015260a0808401359082015260c0808401359082015260e080840135908201526101008084013590820152610120808401359082015261014080840135908201526101608084013590820152610180928301359281019290925250919050565b634e487b7160e01b600052602160045260246000fdfe608060405234801561001057600080fd5b506104ef806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610316565b610104565b005b61008a61009a366004610316565b61016d565b6100a7610229565b6040516100b4919061032f565b60405180910390f35b61008a6100cb366004610389565b610281565b6000546040519081526020016100b4565b6100f46100ef366004610316565b6102c5565b60405190151581526020016100b4565b61010d816102c5565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b919061045d565b60009182526001602052604090912055565b610176816102c5565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a5919061045d565b815481106101b5576101b5610474565b9060005260206000200154905080600083815481106101d6576101d6610474565b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061020e5761020e61048a565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561027757602002820191906000526020600020905b815481526020019060010190808311610263575b5050505050905090565b60005b81518110156102c1576102af8282815181106102a2576102a2610474565b6020026020010151610104565b806102b9816104a0565b915050610284565b5050565b600080546000036102d857506000919050565b6000828152600160205260409020541515806103105750816000808154811061030357610303610474565b9060005260206000200154145b92915050565b60006020828403121561032857600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156103675783518352928401929184019160010161034b565b50909695505050505050565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561039c57600080fd5b823567ffffffffffffffff808211156103b457600080fd5b818501915085601f8301126103c857600080fd5b8135818111156103da576103da610373565b8060051b604051601f19603f830116810181811085821117156103ff576103ff610373565b60405291825284820192508381018501918883111561041d57600080fd5b938501935b8285101561043b57843584529385019392850192610422565b98975050505050505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561046f5761046f610447565b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b6000600182016104b2576104b2610447565b506001019056fea2646970667358221220f7e4628b179b371203111462c82fd04c18c5a559e008556850966fa0bf46250964736f6c634300080d0033a26469706673582212206aa5bef6256c6ef871847df7a7bf1f42d5f4bee0302922e603eced662f56fc0264736f6c634300080d0033";

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
