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
    name: "_getComponentValue",
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
];

const _bytecode =
  "0x61342a61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106102b65760003560e01c80637b2c17a011610185578063b0130a62116100e2578063ee6b082b11610096578063f373ff4c1161007b578063f373ff4c146102eb578063fa8f91ba146102eb578063fd4a0078146102bb57600080fd5b8063ee6b082b146102bb578063f17862511461056457600080fd5b8063bd807c6c116100c7578063bd807c6c146103e6578063d6bb8f4514610531578063ee6357401461054457600080fd5b8063b0130a62146102eb578063b591ffb81461051157600080fd5b80639b1ce46211610139578063a68c35c81161011e578063a68c35c8146104be578063ab8b8220146104de578063b00108e8146104f157600080fd5b80639b1ce4621461048b5780639f2ffa11146104ab57600080fd5b8063901186c21161016a578063901186c21461044b578063987750a5146102eb578063988cd1b21461046b57600080fd5b80637b2c17a0146102bb5780637be111c91461042c57600080fd5b806325e48e1f116102335780634186f9f5116101e75780636d6d386b116101cc5780636d6d386b146103f957806372a7c5ac146104195780637838831e146102eb57600080fd5b80634186f9f5146102bb578063520c051d146102bb57600080fd5b806339684ca51161021857806339684ca5146103c65780633e446033146103e6578063405fc427146102eb57600080fd5b806325e48e1f146102bb57806331b55b68146102eb57600080fd5b806311ab1bfd1161028a57806321ec12531161026f57806321ec12531461039357806322376ceb146103a657806325bd34a6146102bb57600080fd5b806311ab1bfd146103505780631c27e4d31461037357600080fd5b80620f9f1c146102bb578063011b968d146102eb578063051be4661461030d578063111c24841461032d575b600080fd5b6102ce6102c93660046129c3565b610584565b6040516001600160a01b0390911681526020015b60405180910390f35b8180156102f757600080fd5b5061030b6103063660046129f8565b610622565b005b61032061031b3660046129f8565b6106c7565b6040516102e29190612a3d565b81801561033957600080fd5b506103426107e3565b6040519081526020016102e2565b61036361035e3660046129f8565b61091b565b60405190151581526020016102e2565b81801561037f57600080fd5b5061030b61038e366004612a54565b610a0a565b6102ce6103a13660046129f8565b610aef565b8180156103b257600080fd5b5061030b6103c1366004612a54565b610bde565b8180156103d257600080fd5b5061030b6103e1366004612aa2565b610c36565b6103426103f43660046129f8565b610cd1565b81801561040557600080fd5b5061030b610414366004612b0f565b610dc0565b6102ce610427366004612b0f565b6110c3565b81801561043857600080fd5b5061030b610447366004612b28565b5050565b81801561045757600080fd5b5061030b610466366004612b7e565b61114e565b81801561047757600080fd5b5061030b610486366004612c0e565b6111ea565b61049e610499366004612cf3565b6112af565b6040516102e29190612d57565b61049e6104b9366004612daf565b6113c4565b8180156104ca57600080fd5b5061030b6104d9366004612eb8565b6113cf565b61049e6104ec3660046129f8565b61146b565b8180156104fd57600080fd5b5061030b61050c3660046129f8565b61156b565b61052461051f3660046129f8565b611621565b6040516102e29190612f77565b61052461053f3660046129f8565b6116a5565b610557610552366004612f8a565b6117a5565b6040516102e29190612ff6565b81801561057057600080fd5b5061030b61057f366004612aa2565b6117fe565b6000807f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086601801836040516105b9919061304e565b90815260405160209181900382018120546001600160a01b03169250821515916105e59186910161306a565b6040516020818303038152906040529061061b5760405162461bcd60e51b81526004016106129190612f77565b60405180910390fd5b5092915050565b61062b82610584565b6001600160a01b0316634cc82215826040518263ffffffff1660e01b815260040161065891815260200190565b600060405180830381600087803b15801561067257600080fd5b505af1158015610686573d6000803e3d6000fd5b505050507f5b2a370f74161b9f4e0dd5d3a4537c08c715d1bc869ab8b3051121bb8a94012982826040516106bb9291906130c3565b60405180910390a15050565b604080518082019091526000808252602082015260006106e684610584565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa15801561072e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061075291906130e5565b61077157505060408051808201909152600080825260208201526107dd565b6040516307fa648b60e11b8152600481018490526001600160a01b03821690630ff4c916906024016040805180830381865afa1580156107b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d99190613107565b9150505b92915050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba09a547f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba09b54604080517f1003e2d20000000000000000000000000000000000000000000000000000000081526004810183905290516000936001600160a01b031692918391631003e2d291602480820192889290919082900301818387803b15801561088d57600080fd5b505af11580156108a1573d6000803e3d6000fd5b505050506108cc7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08690565b60150180549060006108dd8361314f565b90915550506040518181527fdfadbed979b9afb94e08d5dac8199c7e9ad17df94da4c9e21adb35de32dc26939060200160405180910390a192915050565b60008061092784610584565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa15801561096f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061099391906130e5565b6109a15760009150506107dd565b6040516307fa648b60e11b8152600481018490526001600160a01b03821690630ff4c91690602401602060405180830381865afa1580156109e6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d991906130e5565b610a1383610584565b6040517f293e852e00000000000000000000000000000000000000000000000000000000815260048101849052602481018390526001600160a01b03919091169063293e852e906044015b600060405180830381600087803b158015610a7857600080fd5b505af1158015610a8c573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1838383604051602001610ac691815260200190565b60408051601f1981840301815290829052610ae2939291613168565b60405180910390a1505050565b600080610afb84610584565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa158015610b43573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b6791906130e5565b610b755760009150506107dd565b6040516307fa648b60e11b8152600481018490526001600160a01b03821690630ff4c91690602401602060405180830381865afa158015610bba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d9919061319d565b610be783610584565b6040517f1ab06ee500000000000000000000000000000000000000000000000000000000815260048101849052602481018390526001600160a01b039190911690631ab06ee590604401610a5e565b610c3f83610584565b6001600160a01b0316638b28294783836040518363ffffffff1660e01b8152600401610c6c9291906131ba565b600060405180830381600087803b158015610c8657600080fd5b505af1158015610c9a573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1838383604051610ae293929190613168565b600080610cdd84610584565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa158015610d25573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d4991906130e5565b610d575760009150506107dd565b6040516307fa648b60e11b8152600481018490526001600160a01b03821690630ff4c91690602401602060405180830381865afa158015610d9c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d991906131d3565b60007f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08660140154604051634cc8221560e01b8152600481018490526001600160a01b0390911691508190634cc8221590602401600060405180830381600087803b158015610e2d57600080fd5b505af1158015610e41573d6000803e3d6000fd5b505050506000610e6e7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08690565b601701805480602002602001604051908101604052809291908181526020016000905b82821015610f3d578382906000526020600020018054610eb0906131ec565b80601f0160208091040260200160405190810160405280929190818152602001828054610edc906131ec565b8015610f295780601f10610efe57610100808354040283529160200191610f29565b820191906000526020600020905b815481529060010190602001808311610f0c57829003601f168201915b505050505081526020019060010190610e91565b50505050905060005b81518110156110925760006110217f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba0866017018381548110610f8957610f89613220565b906000526020600020018054610f9e906131ec565b80601f0160208091040260200160405190810160405280929190818152602001828054610fca906131ec565b80156110175780601f10610fec57610100808354040283529160200191611017565b820191906000526020600020905b815481529060010190602001808311610ffa57829003601f168201915b5050505050610584565b604051634cc8221560e01b8152600481018790529091506001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561106657600080fd5b505af115801561107a573d6000803e3d6000fd5b5050505050808061108a9061314f565b915050610f46565b506040518381527f7470dc11dd2276b25ad62ef75ea39990c74dc578787ab0e73896ae0fbf2eef6b90602001610ae2565b60008181527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba0a3602090815260408083205490517f435552494f3a20436f6d706f6e656e7420776974682069642000000000000000928101929092526039820184905269081b9bdd08199bdd5b9960b21b60598301526001600160a01b031690811515906063016105e5565b61115783610584565b6001600160a01b0316638bbf68fe83836040518363ffffffff1660e01b8152600401611184929190613236565b600060405180830381600087803b15801561119e57600080fd5b505af11580156111b2573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1838383604051602001610ac69190612a3d565b6111f383610584565b6040517f2f30c6f6000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b0383811660248301529190911690632f30c6f690604401600060405180830381600087803b15801561125857600080fd5b505af115801561126c573d6000803e3d6000fd5b5050604080516001600160a01b03851660208201527fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d19350869250859101610ac6565b60606000825184516112c19190613254565b67ffffffffffffffff8111156112d9576112d96128b2565b604051908082528060200260200182016040528015611302578160200160208202803683370190505b50905060005b845181101561135a5784818151811061132357611323613220565b602002602001015182828151811061133d5761133d613220565b6020908102919091010152806113528161314f565b915050611308565b5060005b83518110156113bc5783818151811061137957611379613220565b60200260200101518282875161138f9190613254565b8151811061139f5761139f613220565b6020908102919091010152806113b48161314f565b91505061135e565b509392505050565b60606107dd8261189a565b6113d883610584565b6001600160a01b031663946aadc683836040518363ffffffff1660e01b81526004016114059291906132a7565b600060405180830381600087803b15801561141f57600080fd5b505af1158015611433573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1838383604051602001610ac691906132c0565b6060600061147884610584565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa1580156114c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114e491906130e5565b6114fe5750506040805160008152602081019091526107dd565b6040516307fa648b60e11b8152600481018490526001600160a01b03821690630ff4c91690602401600060405180830381865afa158015611543573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526107d991908101906132d3565b61157482610584565b6001600160a01b03166360fe47b1826040518263ffffffff1660e01b81526004016115a191815260200190565b600060405180830381600087803b1580156115bb57600080fd5b505af11580156115cf573d6000803e3d6000fd5b505060408051600160208201527fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1935085925084910160408051601f19818403018152908290526106bb939291613168565b606061162c83610584565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b815260040161165991815260200190565b600060405180830381865afa158015611676573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261169e9190810190613394565b9392505050565b606060006116b284610584565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa1580156116fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061171e91906130e5565b6117385750506040805160208101909152600081526107dd565b6040516307fa648b60e11b8152600481018490526001600160a01b03821690630ff4c91690602401600060405180830381865afa15801561177d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526107d99190810190613394565b6040805160608082018352600080835260208301529181019190915260405180606001604052808560058111156117de576117de612fe0565b81526001600160a01b038516602082015260400183905290509392505050565b61180783610584565b6001600160a01b0316636437197783836040518363ffffffff1660e01b81526004016118349291906131ba565b600060405180830381600087803b15801561184e57600080fd5b505af1158015611862573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1838383604051602001610ac69190612f77565b60606118a461283f565b600160b51b8152600060208201819052600160808301525b8351811015611cc75760008482815181106118d9576118d9613220565b602002602001015190506118ec81611cda565b1561193a5760048151600581111561190657611906612fe0565b0361191357604083018190525b60058151600581111561192857611928612fe0565b0361193557606083018190525b611cb4565b826080015115611be05761194d81611d15565b6119995760405162461bcd60e51b815260206004820152601a60248201527f4e454741544956455f494e495449414c5f434f4e444954494f4e0000000000006044820152606401610612565b60006080840181905280825160058111156119b6576119b6612fe0565b14611a395781602001516001600160a01b031663b361be4683604001516040518263ffffffff1660e01b81526004016119ef9190612f77565b600060405180830381865afa158015611a0c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611a3491908101906132d3565b611aa3565b81602001516001600160a01b03166331b933b96040518163ffffffff1660e01b8152600401600060405180830381865afa158015611a7b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611aa391908101906132d3565b9050611aae81611d39565b84528051602080860191909152606085015101516001600160a01b031615801590611af457506000846060015160400151806020019051810190611af291906131d3565b115b15611bda5760005b8151811015611bd8576000611b4e838381518110611b1c57611b1c613220565b6020026020010151876060015160200151886060015160400151806020019051810190611b4991906131d3565b611d8e565b905060005b8151811015611bc357611b9c611b946040518060400160405280858581518110611b7f57611b7f613220565b60200260200101518152602001600081525090565b885190611f87565b875260208701805190611bae8261314f565b90525080611bbb8161314f565b915050611b53565b50508080611bd09061314f565b915050611afc565b505b50611cb4565b8251600160b51b9060009060019060601c69ffffffffffffffffffff165b8115611ca9576000611c228260408051808201909152600080825260208201525090565b80519091506000611c338289611fd8565b9050611c418a8984846122a9565b90508015611c7f57611c6f611c686040518060400160405280858152602001600081525090565b8890611f87565b965085611c7b8161314f565b9650505b611c8c8a89848a8a612331565b8b5160b01c860151919850965080151595509350611bfe92505050565b505090845260208401525b5080611cbf8161314f565b9150506118bc565b5061169e816000015182602001516124a8565b6000600482516005811115611cf157611cf1612fe0565b14806107dd575060055b82516005811115611d0e57611d0e612fe0565b1492915050565b60008082516005811115611d2b57611d2b612fe0565b14806107dd57506002611cfb565b600160b51b60005b8251811015611d8857611d74611d6d6040518060400160405280868581518110611b7f57611b7f613220565b8390611f87565b915080611d808161314f565b915050611d41565b50919050565b606081600003611dad575060408051600081526020810190915261169e565b6000836001600160a01b031663b361be4686604051602001611dd191815260200190565b6040516020818303038152906040526040518263ffffffff1660e01b8152600401611dfc9190612f77565b600060405180830381865afa158015611e19573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611e4191908101906132d3565b905082600103611e5257905061169e565b600160b51b6000805b8351811015611f00576000611e91858381518110611e7b57611e7b613220565b60200260200101518960018a611b4991906133dd565b905060005b8151811015611eeb57611ec9611ec26040518060400160405280858581518110611b7f57611b7f613220565b8690611f87565b945083611ed58161314f565b9450508080611ee39061314f565b915050611e96565b50508080611ef89061314f565b915050611e5b565b506000611f1983855184611f149190613254565b6124a8565b905060005b8451811015611f7b57848181518110611f3957611f39613220565b6020026020010151828285611f4e9190613254565b81518110611f5e57611f5e613220565b602090810291909101015280611f738161314f565b915050611f1e565b50979650505050505050565b6000808360501b60b01c1160018114611fac578260101b8360601b851717915061061b565b828460b01c8560a01b60b01c01528260101b6bffffffffffffffffffffffff1985161791505092915050565b60008082516005811115611fee57611fee612fe0565b03612069576020820151604051636667bd4760e11b8152600481018590526001600160a01b039091169063cccf7a8e90602401602060405180830381865afa15801561203e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061206291906130e5565b90506107dd565b60028251600581111561207e5761207e612fe0565b0361211157602082015160405163131463f760e21b8152600481018590526001600160a01b0390911690634c518fdc90602401600060405180830381865afa1580156120ce573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526120f69190810190613394565b805190602001208260400151805190602001201490506107dd565b60018251600581111561212657612126612fe0565b036121a2576020820151604051636667bd4760e11b8152600481018590526001600160a01b039091169063cccf7a8e90602401602060405180830381865afa158015612176573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061219a91906130e5565b1590506107dd565b6003825160058111156121b7576121b7612fe0565b0361224b57602082015160405163131463f760e21b8152600481018590526001600160a01b0390911690634c518fdc90602401600060405180830381865afa158015612207573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261222f9190810190613394565b80519060200120826040015180519060200120141590506107dd565b61225482612580565b6122a05760405162461bcd60e51b815260206004820152601360248201527f4e4f5f454e544954595f434f4e444954494f4e000000000000000000000000006044820152606401610612565b50600092915050565b6040840151602001516000906001600160a01b0316158015906122e7575060008560400151604001518060200190518101906122e591906131d3565b115b80156122fa57506122f882856125df565b155b15612326576000806123118587896040015161260a565b91509150801561232357509050612329565b50505b50805b949350505050565b60608501516020015160009081906001600160a01b0316158015906123715750600087606001516040015180602001905181019061236f91906131d3565b115b1561249c5760006123a1868960600151602001518a6060015160400151806020019051810190611b4991906131d3565b905060005b81518110156124995760008282815181106123c3576123c3613220565b6020026020010151905060006123d9828b611fd8565b9050801580156123f9575060408b0151602001516001600160a01b031615155b8015612420575060008b604001516040015180602001905181019061241e91906131d3565b115b1561244857600080612437848d8f6040015161260a565b915091508015612445578192505b50505b80156124845761247461246d60405180604001604052808c8152602001600081525090565b8990611f87565b9750866124808161314f565b9750505b505080806124919061314f565b9150506123a6565b50505b50919590945092505050565b60608167ffffffffffffffff8111156124c3576124c36128b2565b6040519080825280602002602001820160405280156124ec578160200160208202803683370190505b50905081156107dd57600169ffffffffffffffffffff606085901c1660005b821561257757600061252f8360408051808201909152600080825260208201525090565b9050806000015185838151811061254857612548613220565b60209081029190910101528161255d8161314f565b60b089901c9490940151801515955093925061250b915050565b50505092915050565b6000808251600581111561259657612596612fe0565b14806125b457506002825160058111156125b2576125b2612fe0565b145b806125d2575060015b825160058111156125d0576125d0612fe0565b145b806107dd57506003611cfb565b60008280156125f257506125f282611d15565b8061169e57508215801561169e575061169e82612836565b60008061261684612580565b6126625760405162461bcd60e51b815260206004820152601360248201527f4e4f5f454e544954595f434f4e444954494f4e000000000000000000000000006044820152606401610612565b60048351600581111561267757612677612fe0565b146126c45760405162461bcd60e51b815260206004820152601760248201527f4e4f5f50524f58595f524541445f434f4e444954494f4e0000000000000000006044820152606401610612565b8460005b84604001518060200190518101906126e091906131d3565b811015612827576020850151604051636667bd4760e11b8152600481018490526001600160a01b039091169063cccf7a8e90602401602060405180830381865afa158015612732573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061275691906130e5565b61276657506000915061282e9050565b602085015160405163131463f760e21b8152600481018490526001600160a01b0390911690634c518fdc90602401600060405180830381865afa1580156127b1573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526127d99190810190613394565b8060200190518101906127ec91906131d3565b91506127f88287611fd8565b935061280484876125df565b1561281557506001915061282e9050565b8061281f8161314f565b9150506126c8565b5060019150505b935093915050565b600060016125bd565b6040805160a0810182526000808252602082015290810161287b6040805160608101909152806000815260006020820152606060409091015290565b81526020016128a56040805160608101909152806000815260006020820152606060409091015290565b8152600060209091015290565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156128eb576128eb6128b2565b60405290565b6040516060810167ffffffffffffffff811182821017156128eb576128eb6128b2565b604051601f8201601f1916810167ffffffffffffffff8111828210171561293d5761293d6128b2565b604052919050565b600067ffffffffffffffff82111561295f5761295f6128b2565b50601f01601f191660200190565b600082601f83011261297e57600080fd5b813561299161298c82612945565b612914565b8181528460208386010111156129a657600080fd5b816020850160208301376000918101602001919091529392505050565b6000602082840312156129d557600080fd5b813567ffffffffffffffff8111156129ec57600080fd5b6107d98482850161296d565b60008060408385031215612a0b57600080fd5b823567ffffffffffffffff811115612a2257600080fd5b612a2e8582860161296d565b95602094909401359450505050565b8151815260208083015190820152604081016107dd565b600080600060608486031215612a6957600080fd5b833567ffffffffffffffff811115612a8057600080fd5b612a8c8682870161296d565b9660208601359650604090950135949350505050565b600080600060608486031215612ab757600080fd5b833567ffffffffffffffff80821115612acf57600080fd5b612adb8783880161296d565b9450602086013593506040860135915080821115612af857600080fd5b50612b058682870161296d565b9150509250925092565b600060208284031215612b2157600080fd5b5035919050565b60008060408385031215612b3b57600080fd5b823567ffffffffffffffff811115612b5257600080fd5b612b5e8582860161296d565b925050602083013560098110612b7357600080fd5b809150509250929050565b60008060008385036080811215612b9457600080fd5b843567ffffffffffffffff811115612bab57600080fd5b612bb78782880161296d565b945050602085013592506040603f1982011215612bd357600080fd5b50612bdc6128c8565b604085013581526060909401356020850152509093909250565b6001600160a01b0381168114612c0b57600080fd5b50565b600080600060608486031215612c2357600080fd5b833567ffffffffffffffff811115612c3a57600080fd5b612c468682870161296d565b935050602084013591506040840135612c5e81612bf6565b809150509250925092565b600067ffffffffffffffff821115612c8357612c836128b2565b5060051b60200190565b600082601f830112612c9e57600080fd5b81356020612cae61298c83612c69565b82815260059290921b84018101918181019086841115612ccd57600080fd5b8286015b84811015612ce85780358352918301918301612cd1565b509695505050505050565b60008060408385031215612d0657600080fd5b823567ffffffffffffffff80821115612d1e57600080fd5b612d2a86838701612c8d565b93506020850135915080821115612d4057600080fd5b50612d4d85828601612c8d565b9150509250929050565b6020808252825182820181905260009190848201906040850190845b81811015612d8f57835183529284019291840191600101612d73565b50909695505050505050565b803560068110612daa57600080fd5b919050565b60006020808385031215612dc257600080fd5b823567ffffffffffffffff80821115612dda57600080fd5b818501915085601f830112612dee57600080fd5b8135612dfc61298c82612c69565b81815260059190911b83018401908481019088831115612e1b57600080fd5b8585015b83811015612eab57803585811115612e375760008081fd5b86016060818c03601f1901811315612e4f5760008081fd5b612e576128f1565b612e628a8401612d9b565b8152604080840135612e7381612bf6565b828c0152918301359188831115612e8a5760008081fd5b612e988e8c8587010161296d565b9082015285525050918601918601612e1f565b5098975050505050505050565b600080600060608486031215612ecd57600080fd5b833567ffffffffffffffff80821115612ee557600080fd5b612ef18783880161296d565b9450602086013593506040860135915080821115612f0e57600080fd5b50612b0586828701612c8d565b60005b83811015612f36578181015183820152602001612f1e565b83811115612f45576000848401525b50505050565b60008151808452612f63816020860160208601612f1b565b601f01601f19169290920160200192915050565b60208152600061169e6020830184612f4b565b600080600060608486031215612f9f57600080fd5b612fa884612d9b565b92506020840135612fb881612bf6565b9150604084013567ffffffffffffffff811115612fd457600080fd5b612b058682870161296d565b634e487b7160e01b600052602160045260246000fd5b60208152600082516006811061301c57634e487b7160e01b600052602160045260246000fd5b806020840152506001600160a01b03602084015116604083015260408301516060808401526107d96080840182612f4b565b60008251613060818460208701612f1b565b9190910192915050565b7f435552494f3a20436f6d706f6e656e74200000000000000000000000000000008152600082516130a2816011850160208701612f1b565b69081b9bdd08199bdd5b9960b21b6011939091019283015250601b01919050565b6040815260006130d66040830185612f4b565b90508260208301529392505050565b6000602082840312156130f757600080fd5b8151801515811461169e57600080fd5b60006040828403121561311957600080fd5b6131216128c8565b82518152602083015160208201528091505092915050565b634e487b7160e01b600052601160045260246000fd5b60006001820161316157613161613139565b5060010190565b60608152600061317b6060830186612f4b565b84602084015282810360408401526131938185612f4b565b9695505050505050565b6000602082840312156131af57600080fd5b815161169e81612bf6565b8281526040602082015260006123296040830184612f4b565b6000602082840312156131e557600080fd5b5051919050565b600181811c9082168061320057607f821691505b602082108103611d8857634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b8281526060810161169e602083018480518252602090810151910152565b6000821982111561326757613267613139565b500190565b600081518084526020808501945080840160005b8381101561329c57815187529582019590820190600101613280565b509495945050505050565b828152604060208201526000612329604083018461326c565b60208152600061169e602083018461326c565b600060208083850312156132e657600080fd5b825167ffffffffffffffff8111156132fd57600080fd5b8301601f8101851361330e57600080fd5b805161331c61298c82612c69565b81815260059190911b8201830190838101908783111561333b57600080fd5b928401925b8284101561335957835182529284019290840190613340565b979650505050505050565b600061337261298c84612945565b905082815283838301111561338657600080fd5b61169e836020830184612f1b565b6000602082840312156133a657600080fd5b815167ffffffffffffffff8111156133bd57600080fd5b8201601f810184136133ce57600080fd5b6107d984825160208401613364565b6000828210156133ef576133ef613139565b50039056fea2646970667358221220f73cfdbd6187c322843c24ce300078f1c126c7c0fec086a71b2b393b92c507c664736f6c634300080d0033";

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
