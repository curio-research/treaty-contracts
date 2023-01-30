/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ECSLib,
  ECSLibInterface,
} from "../../../contracts/libraries/ECSLib";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "ComponentValueRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
    ],
    name: "ComponentValueSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "EntityRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "NewComponent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "NewEntity",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "_getComponent",
    outputs: [
      {
        internalType: "contract Component",
        name: "",
        type: "Component",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_arr1",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_arr2",
        type: "uint256[]",
      },
    ],
    name: "concatenate",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getAddress",
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
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getAddressComponent",
    outputs: [
      {
        internalType: "contract AddressComponent",
        name: "",
        type: "AddressComponent",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getBool",
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
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getBoolComponent",
    outputs: [
      {
        internalType: "contract BoolComponent",
        name: "",
        type: "BoolComponent",
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
    name: "getComponentByEntity",
    outputs: [
      {
        internalType: "contract Component",
        name: "",
        type: "Component",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getComponentValue",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getInt",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
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
    name: "getIntComponent",
    outputs: [
      {
        internalType: "contract IntComponent",
        name: "",
        type: "IntComponent",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getPosition",
    outputs: [
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
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getPositionComponent",
    outputs: [
      {
        internalType: "contract PositionComponent",
        name: "",
        type: "PositionComponent",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getString",
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
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getStringComponent",
    outputs: [
      {
        internalType: "contract StringComponent",
        name: "",
        type: "StringComponent",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getUint",
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
        internalType: "string",
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getUintArray",
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
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getUintArrayComponent",
    outputs: [
      {
        internalType: "contract UintArrayComponent",
        name: "",
        type: "UintArrayComponent",
      },
    ],
    stateMutability: "view",
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
    name: "getUintComponent",
    outputs: [
      {
        internalType: "contract UintComponent",
        name: "",
        type: "UintComponent",
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
            internalType: "enum QueryType",
            name: "queryType",
            type: "QueryType",
          },
          {
            internalType: "contract Component",
            name: "component",
            type: "Component",
          },
          {
            internalType: "bytes",
            name: "value",
            type: "bytes",
          },
        ],
        internalType: "struct QueryCondition[]",
        name: "_queryConditions",
        type: "tuple[]",
      },
    ],
    name: "query",
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
    inputs: [
      {
        internalType: "enum QueryType",
        name: "_queryType",
        type: "QueryType",
      },
      {
        internalType: "contract Component",
        name: "_component",
        type: "Component",
      },
      {
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
    ],
    name: "queryChunk",
    outputs: [
      {
        components: [
          {
            internalType: "enum QueryType",
            name: "queryType",
            type: "QueryType",
          },
          {
            internalType: "contract Component",
            name: "component",
            type: "Component",
          },
          {
            internalType: "bytes",
            name: "value",
            type: "bytes",
          },
        ],
        internalType: "struct QueryCondition",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x612a4f61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106102d15760003560e01c80637be111c911610185578063bd807c6c116100e2578063ee6b082b11610096578063f373ff4c1161007b578063f373ff4c14610306578063fa8f91ba14610306578063fd4a0078146102d657600080fd5b8063ee6b082b146102d6578063f17862511461059f57600080fd5b8063d6bb8f45116100c7578063d6bb8f451461054c578063e6a3b44b1461056c578063ee6357401461057f57600080fd5b8063bd807c6c14610401578063c2ff2d261461052c57600080fd5b80639f2ffa1111610139578063ab8b82201161011e578063ab8b8220146104f9578063b00108e81461050c578063b0130a621461030657600080fd5b80639f2ffa11146104c6578063a68c35c8146104d957600080fd5b8063987750a51161016a578063987750a514610306578063988cd1b2146104865780639b1ce462146104a657600080fd5b80637be111c914610447578063901186c21461046657600080fd5b806331b55b6811610233578063520c051d116101e757806372a7c5ac116101cc57806372a7c5ac146104345780637838831e146103065780637b2c17a0146102d657600080fd5b8063520c051d146102d65780636d6d386b1461041457600080fd5b80633e446033116102185780633e44603314610401578063405fc427146103065780634186f9f5146102d657600080fd5b806331b55b681461030657806339684ca5146103e157600080fd5b80631c27e4d31161028a57806322376ceb1161026f57806322376ceb146103c157806325bd34a6146102d657806325e48e1f146102d657600080fd5b80631c27e4d31461038e57806321ec1253146103ae57600080fd5b8063051be466116102bb578063051be46614610328578063111c24841461034857806311ab1bfd1461036b57600080fd5b80620f9f1c146102d6578063011b968d14610306575b600080fd5b6102e96102e4366004611ff1565b6105bf565b6040516001600160a01b0390911681526020015b60405180910390f35b81801561031257600080fd5b50610326610321366004612026565b61065d565b005b61033b610336366004612026565b610702565b6040516102fd919061206b565b81801561035457600080fd5b5061035d61081e565b6040519081526020016102fd565b61037e610379366004612026565b610956565b60405190151581526020016102fd565b81801561039a57600080fd5b506103266103a9366004612082565b610a45565b6102e96103bc366004612026565b610b2a565b8180156103cd57600080fd5b506103266103dc366004612082565b610c19565b8180156103ed57600080fd5b506103266103fc3660046120d0565b610c71565b61035d61040f366004612026565b610d0c565b81801561042057600080fd5b5061032661042f36600461213d565b610dfb565b6102e961044236600461213d565b6110fe565b81801561045357600080fd5b50610326610462366004612156565b5050565b81801561047257600080fd5b506103266104813660046121ac565b61119b565b81801561049257600080fd5b506103266104a136600461223c565b611237565b6104b96104b4366004612321565b6112fc565b6040516102fd9190612385565b6104b96104d43660046123dd565b611411565b8180156104e557600080fd5b506103266104f43660046124e6565b611905565b6104b9610507366004612026565b6119a1565b81801561051857600080fd5b50610326610527366004612026565b611aa1565b81801561053857600080fd5b50610326610547366004611ff1565b611b57565b61055f61055a366004612026565b611c67565b6040516102fd91906125a5565b61055f61057a366004612026565b611d67565b61059261058d3660046125b8565b611deb565b6040516102fd9190612624565b8180156105ab57600080fd5b506103266105ba3660046120d0565b611e44565b6000807f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086601301836040516105f4919061267c565b90815260405160209181900382018120546001600160a01b031692508215159161062091869101612698565b604051602081830303815290604052906106565760405162461bcd60e51b815260040161064d91906125a5565b60405180910390fd5b5092915050565b610666826105bf565b6001600160a01b0316634cc82215826040518263ffffffff1660e01b815260040161069391815260200190565b600060405180830381600087803b1580156106ad57600080fd5b505af11580156106c1573d6000803e3d6000fd5b505050507f5b2a370f74161b9f4e0dd5d3a4537c08c715d1bc869ab8b3051121bb8a94012982826040516106f69291906126f1565b60405180910390a15050565b60408051808201909152600080825260208201526000610721846105bf565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa158015610769573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061078d9190612713565b6107ac5750506040805180820190915260008082526020820152610818565b6040516307fa648b60e11b8152600481018490526001600160a01b03821690630ff4c916906024016040805180830381865afa1580156107f0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108149190612735565b9150505b92915050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba096547f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba09754604080517f1003e2d20000000000000000000000000000000000000000000000000000000081526004810183905290516000936001600160a01b031692918391631003e2d291602480820192889290919082900301818387803b1580156108c857600080fd5b505af11580156108dc573d6000803e3d6000fd5b505050506109077f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08690565b60110180549060006109188361277d565b90915550506040518181527fdfadbed979b9afb94e08d5dac8199c7e9ad17df94da4c9e21adb35de32dc26939060200160405180910390a192915050565b600080610962846105bf565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa1580156109aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ce9190612713565b6109dc576000915050610818565b6040516307fa648b60e11b8152600481018490526001600160a01b03821690630ff4c91690602401602060405180830381865afa158015610a21573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108149190612713565b610a4e836105bf565b6040517f293e852e00000000000000000000000000000000000000000000000000000000815260048101849052602481018390526001600160a01b03919091169063293e852e906044015b600060405180830381600087803b158015610ab357600080fd5b505af1158015610ac7573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1838383604051602001610b0191815260200190565b60408051601f1981840301815290829052610b1d939291612796565b60405180910390a1505050565b600080610b36846105bf565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa158015610b7e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ba29190612713565b610bb0576000915050610818565b6040516307fa648b60e11b8152600481018490526001600160a01b03821690630ff4c91690602401602060405180830381865afa158015610bf5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061081491906127cb565b610c22836105bf565b6040517f1ab06ee500000000000000000000000000000000000000000000000000000000815260048101849052602481018390526001600160a01b039190911690631ab06ee590604401610a99565b610c7a836105bf565b6001600160a01b0316638b28294783836040518363ffffffff1660e01b8152600401610ca79291906127e8565b600060405180830381600087803b158015610cc157600080fd5b505af1158015610cd5573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1838383604051610b1d93929190612796565b600080610d18846105bf565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa158015610d60573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d849190612713565b610d92576000915050610818565b6040516307fa648b60e11b8152600481018490526001600160a01b03821690630ff4c91690602401602060405180830381865afa158015610dd7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108149190612809565b60007f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08660100154604051634cc8221560e01b8152600481018490526001600160a01b0390911691508190634cc8221590602401600060405180830381600087803b158015610e6857600080fd5b505af1158015610e7c573d6000803e3d6000fd5b505050506000610ea97f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08690565b601201805480602002602001604051908101604052809291908181526020016000905b82821015610f78578382906000526020600020018054610eeb90612822565b80601f0160208091040260200160405190810160405280929190818152602001828054610f1790612822565b8015610f645780601f10610f3957610100808354040283529160200191610f64565b820191906000526020600020905b815481529060010190602001808311610f4757829003601f168201915b505050505081526020019060010190610ecc565b50505050905060005b81518110156110cd57600061105c7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba0866012018381548110610fc457610fc461285c565b906000526020600020018054610fd990612822565b80601f016020809104026020016040519081016040528092919081815260200182805461100590612822565b80156110525780601f1061102757610100808354040283529160200191611052565b820191906000526020600020905b81548152906001019060200180831161103557829003601f168201915b50505050506105bf565b604051634cc8221560e01b8152600481018790529091506001600160a01b03821690634cc8221590602401600060405180830381600087803b1580156110a157600080fd5b505af11580156110b5573d6000803e3d6000fd5b505050505080806110c59061277d565b915050610f81565b506040518381527f7470dc11dd2276b25ad62ef75ea39990c74dc578787ab0e73896ae0fbf2eef6b90602001610b1d565b6000806111406040518060400160405280600781526020017f416464726573730000000000000000000000000000000000000000000000000081525084610b2a565b6040517f435552494f3a20436f6d706f6e656e742077697468206964200000000000000060208201526039810185905269081b9bdd08199bdd5b9960b21b60598201529091506001600160a01b038216151590606301610620565b6111a4836105bf565b6001600160a01b0316638bbf68fe83836040518363ffffffff1660e01b81526004016111d1929190612872565b600060405180830381600087803b1580156111eb57600080fd5b505af11580156111ff573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1838383604051602001610b01919061206b565b611240836105bf565b6040517f2f30c6f6000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b0383811660248301529190911690632f30c6f690604401600060405180830381600087803b1580156112a557600080fd5b505af11580156112b9573d6000803e3d6000fd5b5050604080516001600160a01b03851660208201527fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d19350869250859101610b01565b606060008251845161130e9190612890565b67ffffffffffffffff81111561132657611326611ee0565b60405190808252806020026020018201604052801561134f578160200160208202803683370190505b50905060005b84518110156113a7578481815181106113705761137061285c565b602002602001015182828151811061138a5761138a61285c565b60209081029190910101528061139f8161277d565b915050611355565b5060005b8351811015611409578381815181106113c6576113c661285c565b6020026020010151828287516113dc9190612890565b815181106113ec576113ec61285c565b6020908102919091010152806114018161277d565b9150506113ab565b509392505050565b6060600082511161148a5760405162461bcd60e51b815260206004820152602d60248201527f435552494f3a205175657279206d7573742068617665206174206c656173742060448201527f6f6e6520636f6e646974696f6e00000000000000000000000000000000000000606482015260840161064d565b60008260008151811061149f5761149f61285c565b6020026020010151905060008060038111156114bd576114bd61260e565b825160038111156114d0576114d061260e565b146115535781602001516001600160a01b031663b361be4683604001516040518263ffffffff1660e01b815260040161150991906125a5565b600060405180830381865afa158015611526573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261154e91908101906128a8565b6115bd565b81602001516001600160a01b03166331b933b96040518163ffffffff1660e01b8152600401600060405180830381865afa158015611595573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526115bd91908101906128a8565b80519091506060600060015b87518110156118f9578781815181106115e4576115e461285c565b60200260200101519550845167ffffffffffffffff81111561160857611608611ee0565b604051908082528060200260200182016040528015611631578160200160208202803683370190505b5092506000915060005b848110156118485760008682815181106116575761165761285c565b60200260200101519050600060038111156116745761167461260e565b885160038111156116875761168761260e565b03611731576020880151604051636667bd4760e11b8152600481018390526001600160a01b039091169063cccf7a8e90602401602060405180830381865afa1580156116d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116fb9190612713565b1561172c57808585815181106117135761171361285c565b6020908102919091010152836117288161277d565b9450505b611835565b6002885160038111156117465761174661260e565b036117ed5787604001518051906020012088602001516001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161178991815260200190565b600060405180830381865afa1580156117a6573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526117ce9190810190612969565b805190602001200361172c57808585815181106117135761171361285c565b60405162461bcd60e51b815260206004820152601d60248201527f435552494f3a20556e737570706f727465642071756572792074797065000000604482015260640161064d565b50806118408161277d565b91505061163b565b508167ffffffffffffffff81111561186257611862611ee0565b60405190808252806020026020018201604052801561188b578160200160208202803683370190505b50945060005b828110156118e2578381815181106118ab576118ab61285c565b60200260200101518682815181106118c5576118c561285c565b6020908102919091010152806118da8161277d565b915050611891565b5081935080806118f19061277d565b9150506115c9565b50929695505050505050565b61190e836105bf565b6001600160a01b031663946aadc683836040518363ffffffff1660e01b815260040161193b9291906129ed565b600060405180830381600087803b15801561195557600080fd5b505af1158015611969573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1838383604051602001610b019190612a06565b606060006119ae846105bf565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa1580156119f6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a1a9190612713565b611a34575050604080516000815260208101909152610818565b6040516307fa648b60e11b8152600481018490526001600160a01b03821690630ff4c91690602401600060405180830381865afa158015611a79573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261081491908101906128a8565b611aaa826105bf565b6001600160a01b03166360fe47b1826040518263ffffffff1660e01b8152600401611ad791815260200190565b600060405180830381600087803b158015611af157600080fd5b505af1158015611b05573d6000803e3d6000fd5b505060408051600160208201527fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1935085925084910160408051601f19818403018152908290526106f6939291612796565b60007f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08660130182604051611b8b919061267c565b90815260408051918290036020018220547f31b933b900000000000000000000000000000000000000000000000000000000835290516001600160a01b03909116916331b933b99160048083019260009291908290030181865afa158015611bf7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611c1f91908101906128a8565b905060005b8151811015611c6257611c5083838381518110611c4357611c4361285c565b602002602001015161065d565b80611c5a8161277d565b915050611c24565b505050565b60606000611c74846105bf565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa158015611cbc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ce09190612713565b611cfa575050604080516020810190915260008152610818565b6040516307fa648b60e11b8152600481018490526001600160a01b03821690630ff4c91690602401600060405180830381865afa158015611d3f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526108149190810190612969565b6060611d72836105bf565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b8152600401611d9f91815260200190565b600060405180830381865afa158015611dbc573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611de49190810190612969565b9392505050565b604080516060808201835260008083526020830152918101919091526040518060600160405280856003811115611e2457611e2461260e565b81526001600160a01b038516602082015260400183905290509392505050565b611e4d836105bf565b6001600160a01b0316636437197783836040518363ffffffff1660e01b8152600401611e7a9291906127e8565b600060405180830381600087803b158015611e9457600080fd5b505af1158015611ea8573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1838383604051602001610b0191906125a5565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715611f1957611f19611ee0565b60405290565b6040516060810167ffffffffffffffff81118282101715611f1957611f19611ee0565b604051601f8201601f1916810167ffffffffffffffff81118282101715611f6b57611f6b611ee0565b604052919050565b600067ffffffffffffffff821115611f8d57611f8d611ee0565b50601f01601f191660200190565b600082601f830112611fac57600080fd5b8135611fbf611fba82611f73565b611f42565b818152846020838601011115611fd457600080fd5b816020850160208301376000918101602001919091529392505050565b60006020828403121561200357600080fd5b813567ffffffffffffffff81111561201a57600080fd5b61081484828501611f9b565b6000806040838503121561203957600080fd5b823567ffffffffffffffff81111561205057600080fd5b61205c85828601611f9b565b95602094909401359450505050565b815181526020808301519082015260408101610818565b60008060006060848603121561209757600080fd5b833567ffffffffffffffff8111156120ae57600080fd5b6120ba86828701611f9b565b9660208601359650604090950135949350505050565b6000806000606084860312156120e557600080fd5b833567ffffffffffffffff808211156120fd57600080fd5b61210987838801611f9b565b945060208601359350604086013591508082111561212657600080fd5b5061213386828701611f9b565b9150509250925092565b60006020828403121561214f57600080fd5b5035919050565b6000806040838503121561216957600080fd5b823567ffffffffffffffff81111561218057600080fd5b61218c85828601611f9b565b9250506020830135600981106121a157600080fd5b809150509250929050565b600080600083850360808112156121c257600080fd5b843567ffffffffffffffff8111156121d957600080fd5b6121e587828801611f9b565b945050602085013592506040603f198201121561220157600080fd5b5061220a611ef6565b604085013581526060909401356020850152509093909250565b6001600160a01b038116811461223957600080fd5b50565b60008060006060848603121561225157600080fd5b833567ffffffffffffffff81111561226857600080fd5b61227486828701611f9b565b93505060208401359150604084013561228c81612224565b809150509250925092565b600067ffffffffffffffff8211156122b1576122b1611ee0565b5060051b60200190565b600082601f8301126122cc57600080fd5b813560206122dc611fba83612297565b82815260059290921b840181019181810190868411156122fb57600080fd5b8286015b8481101561231657803583529183019183016122ff565b509695505050505050565b6000806040838503121561233457600080fd5b823567ffffffffffffffff8082111561234c57600080fd5b612358868387016122bb565b9350602085013591508082111561236e57600080fd5b5061237b858286016122bb565b9150509250929050565b6020808252825182820181905260009190848201906040850190845b818110156123bd578351835292840192918401916001016123a1565b50909695505050505050565b8035600481106123d857600080fd5b919050565b600060208083850312156123f057600080fd5b823567ffffffffffffffff8082111561240857600080fd5b818501915085601f83011261241c57600080fd5b813561242a611fba82612297565b81815260059190911b8301840190848101908883111561244957600080fd5b8585015b838110156124d9578035858111156124655760008081fd5b86016060818c03601f190181131561247d5760008081fd5b612485611f1f565b6124908a84016123c9565b81526040808401356124a181612224565b828c01529183013591888311156124b85760008081fd5b6124c68e8c85870101611f9b565b908201528552505091860191860161244d565b5098975050505050505050565b6000806000606084860312156124fb57600080fd5b833567ffffffffffffffff8082111561251357600080fd5b61251f87838801611f9b565b945060208601359350604086013591508082111561253c57600080fd5b50612133868287016122bb565b60005b8381101561256457818101518382015260200161254c565b83811115612573576000848401525b50505050565b60008151808452612591816020860160208601612549565b601f01601f19169290920160200192915050565b602081526000611de46020830184612579565b6000806000606084860312156125cd57600080fd5b6125d6846123c9565b925060208401356125e681612224565b9150604084013567ffffffffffffffff81111561260257600080fd5b61213386828701611f9b565b634e487b7160e01b600052602160045260246000fd5b60208152600082516004811061264a57634e487b7160e01b600052602160045260246000fd5b806020840152506001600160a01b03602084015116604083015260408301516060808401526108146080840182612579565b6000825161268e818460208701612549565b9190910192915050565b7f435552494f3a20436f6d706f6e656e74200000000000000000000000000000008152600082516126d0816011850160208701612549565b69081b9bdd08199bdd5b9960b21b6011939091019283015250601b01919050565b6040815260006127046040830185612579565b90508260208301529392505050565b60006020828403121561272557600080fd5b81518015158114611de457600080fd5b60006040828403121561274757600080fd5b61274f611ef6565b82518152602083015160208201528091505092915050565b634e487b7160e01b600052601160045260246000fd5b60006001820161278f5761278f612767565b5060010190565b6060815260006127a96060830186612579565b84602084015282810360408401526127c18185612579565b9695505050505050565b6000602082840312156127dd57600080fd5b8151611de481612224565b8281526040602082015260006128016040830184612579565b949350505050565b60006020828403121561281b57600080fd5b5051919050565b600181811c9082168061283657607f821691505b60208210810361285657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b82815260608101611de4602083018480518252602090810151910152565b600082198211156128a3576128a3612767565b500190565b600060208083850312156128bb57600080fd5b825167ffffffffffffffff8111156128d257600080fd5b8301601f810185136128e357600080fd5b80516128f1611fba82612297565b81815260059190911b8201830190838101908783111561291057600080fd5b928401925b8284101561292e57835182529284019290840190612915565b979650505050505050565b6000612947611fba84611f73565b905082815283838301111561295b57600080fd5b611de4836020830184612549565b60006020828403121561297b57600080fd5b815167ffffffffffffffff81111561299257600080fd5b8201601f810184136129a357600080fd5b61081484825160208401612939565b600081518084526020808501945080840160005b838110156129e2578151875295820195908201906001016129c6565b509495945050505050565b82815260406020820152600061280160408301846129b2565b602081526000611de460208301846129b256fea2646970667358221220bff2dbf12adf9f855148f579847cce186f42816a673021dfedee38633c13209c64736f6c634300080d0033";

type ECSLibConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ECSLibConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ECSLib__factory extends ContractFactory {
  constructor(...args: ECSLibConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ECSLib> {
    return super.deploy(overrides || {}) as Promise<ECSLib>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ECSLib {
    return super.attach(address) as ECSLib;
  }
  override connect(signer: Signer): ECSLib__factory {
    return super.connect(signer) as ECSLib__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ECSLibInterface {
    return new utils.Interface(_abi) as ECSLibInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ECSLib {
    return new Contract(address, _abi, signerOrProvider) as ECSLib;
  }
}
