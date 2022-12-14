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
  "0x608060405234801561001057600080fd5b5061128f806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063a26c57cc14610030575b600080fd5b61004361003e366004610d88565b610045565b005b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f60209081527f699d9daa71b280d05a152715774afa0a81a312594b2d731d6b0b2552b7d6f69f8054600160ff1991821681179092557ff97e938d8af42f52387bb74b8b526fda8f184cc2aa534340a8d75a88fbecc77580548216831790557f65d510a5d8f7ef134ec444f7f34ee808c8eeb5177cdfd16be0c40fe1ab43369580548216831790557f7f5828d0000000000000000000000000000000000000000000000000000000006000527f5622121b47b8cd0120c4efe45dd5483242f54a3d49bd7679be565d47694918c3805482168317905583517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba089805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff909216919091178155928401517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08a5560408401517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08b5560608401517f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08c80547fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c95879590949190911690838181111561024557610245610e3b565b02179055506080820151600482015560a0820151600582015560c0820151600682015560e0820151600782015561010082015160088201556101208201516009820155610140820151600a820155610160820151600b82015561018090910151600c909101556040516102b790610bbf565b604051809103906000f0801580156102d3573d6000803e3d6000fd5b507f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba09a805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff9290921691909117905560017f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba0866015015560017f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba09c8190557f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba09d556040805160178082526103008201909252600091602082015b60608152602001906001900390816103b55790505090506040518060400160405280601081526020017f696e697469616c697a654e6174696f6e000000000000000000000000000000008152508160008151811061041557610415610e51565b60200260200101819052506040518060400160405280600e81526020017f757067726164654361706974616c0000000000000000000000000000000000008152508160018151811061046957610469610e51565b60200260200101819052506040518060400160405280600b81526020017f6d6f76654361706974616c000000000000000000000000000000000000000000815250816002815181106104bd576104bd610e51565b60200260200101819052506040518060400160405280600981526020017f636c61696d54696c6500000000000000000000000000000000000000000000008152508160038151811061051157610511610e51565b60200260200101819052506040518060400160405280600b81526020017f7570677261646554696c650000000000000000000000000000000000000000008152508160048151811061056557610565610e51565b60200260200101819052506040518060400160405280600b81526020017f7265636f76657254696c65000000000000000000000000000000000000000000815250816005815181106105b9576105b9610e51565b60200260200101819052506040518060400160405280600a81526020017f6469736f776e54696c65000000000000000000000000000000000000000000008152508160068151811061060d5761060d610e51565b60200260200101819052506040518060400160405280600881526020017f6d6f766554696c650000000000000000000000000000000000000000000000008152508160078151811061066157610661610e51565b60200260200101819052506040518060400160405280601481526020017f737461727454726f6f7050726f64756374696f6e000000000000000000000000815250816008815181106106b5576106b5610e51565b60200260200101819052506040518060400160405280601281526020017f656e6454726f6f7050726f64756374696f6e00000000000000000000000000008152508160098151811061070957610709610e51565b60200260200101819052506040518060400160405280600481526020017f6d6f76650000000000000000000000000000000000000000000000000000000081525081600a8151811061075d5761075d610e51565b60200260200101819052506040518060400160405280600c81526020017f6f7267616e697a6541726d79000000000000000000000000000000000000000081525081600b815181106107b1576107b1610e51565b60200260200101819052506040518060400160405280600b81526020017f64697362616e6441726d7900000000000000000000000000000000000000000081525081600c8151811061080557610805610e51565b60200260200101819052506040518060400160405280600b81526020017f737461727447617468657200000000000000000000000000000000000000000081525081600d8151811061085957610859610e51565b60200260200101819052506040518060400160405280600981526020017f656e64476174686572000000000000000000000000000000000000000000000081525081600e815181106108ad576108ad610e51565b60200260200101819052506040518060400160405280600f81526020017f756e6c6f61645265736f7572636573000000000000000000000000000000000081525081600f8151811061090157610901610e51565b60200260200101819052506040518060400160405280600f81526020017f686172766573745265736f7572636500000000000000000000000000000000008152508160108151811061095557610955610e51565b60200260200101819052506040518060400160405280601b81526020017f686172766573745265736f757263657346726f6d4361706974616c0000000000815250816011815181106109a9576109a9610e51565b60200260200101819052506040518060400160405280600f81526020017f757067726164655265736f757263650000000000000000000000000000000000815250816012815181106109fd576109fd610e51565b60200260200101819052506040518060400160405280600681526020017f626174746c65000000000000000000000000000000000000000000000000000081525081601381518110610a5157610a51610e51565b60200260200101819052506040518060400160405280600a81526020017f6a6f696e5472656174790000000000000000000000000000000000000000000081525081601481518110610aa557610aa5610e51565b60200260200101819052506040518060400160405280600b81526020017f6c6561766554726561747900000000000000000000000000000000000000000081525081601581518110610af957610af9610e51565b60200260200101819052506040518060400160405280601281526020017f64656c65676174655065726d697373696f6e000000000000000000000000000081525081601681518110610b4d57610b4d610e51565b602002602001018190525080610b807f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08690565b6013019080519060200190610b96929190610bcc565b5050427f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba088555050565b6103b880610ea283390190565b828054828255906000526020600020908101928215610c19579160200282015b82811115610c195782518051610c09918491602090910190610c29565b5091602001919060010190610bec565b50610c25929150610ca9565b5090565b828054610c3590610e67565b90600052602060002090601f016020900481019282610c575760008555610c9d565b82601f10610c7057805160ff1916838001178555610c9d565b82800160010185558215610c9d579182015b82811115610c9d578251825591602001919060010190610c82565b50610c25929150610cc6565b80821115610c25576000610cbd8282610cdb565b50600101610ca9565b5b80821115610c255760008155600101610cc7565b508054610ce790610e67565b6000825580601f10610cf7575050565b601f016020900490600052602060002090810190610d159190610cc6565b50565b6040516101a0810167ffffffffffffffff81118282101715610d4a57634e487b7160e01b600052604160045260246000fd5b60405290565b803573ffffffffffffffffffffffffffffffffffffffff81168114610d7457600080fd5b919050565b803560028110610d7457600080fd5b60006101a08284031215610d9b57600080fd5b610da3610d18565b610dac83610d50565b81526020830135602082015260408301356040820152610dce60608401610d79565b60608201526080838101359082015260a0808401359082015260c0808401359082015260e080840135908201526101008084013590820152610120808401359082015261014080840135908201526101608084013590820152610180928301359281019290925250919050565b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b600181811c90821680610e7b57607f821691505b602082108103610e9b57634e487b7160e01b600052602260045260246000fd5b5091905056fe608060405234801561001057600080fd5b50610398806100206000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806353ed51431161005057806353ed514314610094578063949d225d146100b25780639f161b0a146100c357600080fd5b80631003e2d21461006c5780634cc8221514610081575b600080fd5b61007f61007a3660046102b4565b6100e6565b005b61007f61008f3660046102b4565b61014f565b61009c61020b565b6040516100a991906102cd565b60405180910390f35b6000546040519081526020016100a9565b6100d66100d13660046102b4565b610263565b60405190151581526020016100a9565b6100ef81610263565b156100f75750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561013360005490565b61013d9190610311565b60009182526001602052604090912055565b61015881610263565b61015f5750565b60008181526001602081905260408220549190819061017d60005490565b6101879190610311565b8154811061019757610197610336565b9060005260206000200154905080600083815481106101b8576101b8610336565b60009182526020808320909101929092558281526001909152604080822084905584825281208190558054806101f0576101f061034c565b60019003818190600052602060002001600090559055505050565b6060600080548060200260200160405190810160405280929190818152602001828054801561025957602002820191906000526020600020905b815481526020019060010190808311610245575b5050505050905090565b6000805460000361027657506000919050565b6000828152600160205260409020541515806102ae575081600080815481106102a1576102a1610336565b9060005260206000200154145b92915050565b6000602082840312156102c657600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b81811015610305578351835292840192918401916001016102e9565b50909695505050505050565b60008282101561033157634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea264697066735822122044a6b59e3f4cc51fb52700a3a654b0f0db6451ab7312e182fced1c3775e1cd3d64736f6c634300080d0033a2646970667358221220a330163904d03b2de1f8cdf4ec7177b293b9e29fc9e58c6f4365b938f36aa1cb64736f6c634300080d0033";

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
