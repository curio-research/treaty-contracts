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
    name: "_concatenate",
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
        internalType: "contract Set",
        name: "set1",
        type: "Set",
      },
      {
        internalType: "contract Set",
        name: "set2",
        type: "Set",
      },
    ],
    name: "_difference",
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
        name: "_componentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "_getAddress",
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
    name: "_getAddressComponent",
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
    name: "_getBool",
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
    name: "_getBoolComponent",
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
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "_getComponentByEntity",
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
    name: "_getInt",
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
    name: "_getIntComponent",
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
    name: "_getPosition",
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
    name: "_getPositionComponent",
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
    name: "_getString",
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
    name: "_getStringComponent",
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
    name: "_getUint",
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
    name: "_getUintArray",
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
    name: "_getUintArrayComponent",
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
    name: "_getUintComponent",
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
];

const _bytecode =
  "0x61331261003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106102dc5760003560e01c8063a5aca50211610190578063d786730c116100ed578063eb3acd12116100a1578063fa7619261161007b578063fa76192614610311578063fd926608146102e1578063ff429443146105d757600080fd5b8063eb3acd12146105a4578063f0b07102146102e1578063f988923a146105b757600080fd5b8063dd377251116100d2578063dd37725114610571578063dd6b74fe14610591578063e7e592c7146102e157600080fd5b8063d786730c14610311578063dcf4a1231461055157600080fd5b8063b70da65d11610144578063cb28c83311610129578063cb28c83314610512578063cb4cac32146102e1578063cc6524611461053257600080fd5b8063b70da65d146104ef578063c123e7f41461031157600080fd5b8063ad35759b11610175578063ad35759b146104bc578063b18e76b214610311578063b591ffb8146104dc57600080fd5b8063a5aca502146102e1578063a99844fd1461049c57600080fd5b806364a000b91161023e578063962b543a116101f25780639abab3f5116101d75780639abab3f51461045c5780639d054e3c1461047c578063a0a219be146103c057600080fd5b8063962b543a1461043c5780639ab8f3d41461031157600080fd5b80638b692785116102235780638b692785146103115780638d7fa3d81461041657806393cb3af51461042957600080fd5b806364a000b9146103e15780636d690147146103f657600080fd5b80632d3679b5116102955780633960dbbd1161027a5780633960dbbd1461039357806342b4edac146102e15780635b3ba981146103c057600080fd5b80632d3679b5146103735780632d4b07431461031157600080fd5b80630f0315c0116102c65780630f0315c0146102e1578063218e15f9146103335780632a8368461461035357600080fd5b80620f9f1c146102e15780630d8173b614610311575b600080fd5b6102f46102ef366004612674565b6105ea565b6040516001600160a01b0390911681526020015b60405180910390f35b81801561031d57600080fd5b5061033161032c3660046126ef565b6106a5565b005b81801561033f57600080fd5b5061033161034e366004612914565b61074a565b81801561035f57600080fd5b5061033161036e3660046129ba565b61080f565b6103866103813660046126ef565b6109f6565b6040516103089190612b9f565b81801561039f57600080fd5b506103b36103ae366004612624565b610a8b565b6040516103089190612b48565b6103d36103ce3660046126ef565b611251565b604051908152602001610308565b8180156103ed57600080fd5b506103d36112d9565b81801561040257600080fd5b506103316104113660046126ef565b611439565b6102f46104243660046129ba565b6114ef565b6103b3610437366004612624565b61157a565b61044f61044a3660046126ef565b6118fc565b6040516103089190612bff565b81801561046857600080fd5b506103b3610477366004612624565b611995565b81801561048857600080fd5b50610331610497366004612868565b6119de565b8180156104a857600080fd5b506103316104b73660046127f5565b611a9a565b8180156104c857600080fd5b506103316104d736600461278b565b611b35565b6103866104ea3660046126ef565b611bd1565b6105026104fd3660046126ef565b611c09565b6040519015158152602001610308565b81801561051e57600080fd5b5061033161052d366004612868565b611c91565b81801561053e57600080fd5b5061033161054d3660046126a7565b5050565b81801561055d57600080fd5b5061033161056c3660046128b4565b611ce9565b81801561057d57600080fd5b506103b361058c366004612545565b611d85565b6102f461059f3660046126ef565b612003565b6103b36105b23660046124e4565b61208b565b8180156105c357600080fd5b506103316105d2366004612732565b6121e6565b6103b36105e53660046126ef565b6122ab565b6000807f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08663017d785501836040516106229190612a38565b90815260405160209181900382018120546001600160a01b031692508215159161064e91869101612aef565b6040516020818303038152906040529061069e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106959190612b9f565b60405180910390fd5b5092915050565b6106ae826105ea565b6001600160a01b0316634cc82215826040518263ffffffff1660e01b81526004016106db91815260200190565b600060405180830381600087803b1580156106f557600080fd5b505af1158015610709573d6000803e3d6000fd5b505050507f5b2a370f74161b9f4e0dd5d3a4537c08c715d1bc869ab8b3051121bb8a940129828260405161073e929190612bb2565b60405180910390a15050565b610753836105ea565b6001600160a01b0316638bbf68fe83836040518363ffffffff1660e01b8152600401610780929190612c48565b600060405180830381600087803b15801561079a57600080fd5b505af11580156107ae573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d18383836040516020016107e69190612bff565b60408051601f1981840301815290829052610802939291612bd4565b60405180910390a1505050565b60007f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08663017d78530154604051634cc8221560e01b8152600481018490526001600160a01b0390911691508190634cc8221590602401600060405180830381600087803b15801561087f57600080fd5b505af1158015610893573d6000803e3d6000fd5b5050505060005b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918da548110156109c5577f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918da80546000917f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918db918490811061092957634e487b7160e01b600052603260045260246000fd5b906000526020600020016040516109409190612a54565b90815260405190819003602001812054634cc8221560e01b82526001600160a01b031691508190634cc822159061097f90879060040190815260200190565b600060405180830381600087803b15801561099957600080fd5b505af11580156109ad573d6000803e3d6000fd5b505050505080806109bd90612d54565b91505061089a565b506040518281527f7470dc11dd2276b25ad62ef75ea39990c74dc578787ab0e73896ae0fbf2eef6b9060200161073e565b6060610a01836105ea565b6001600160a01b0316630ff4c916836040518263ffffffff1660e01b8152600401610a2e91815260200190565b60006040518083038186803b158015610a4657600080fd5b505afa158015610a5a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610a8291908101906125d6565b90505b92915050565b60606000604051610a9b90612337565b604051809103906000f080158015610ab7573d6000803e3d6000fd5b5090506000836001600160a01b031663949d225d6040518163ffffffff1660e01b815260040160206040518083038186803b158015610af557600080fd5b505afa158015610b09573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2d919061265c565b856001600160a01b031663949d225d6040518163ffffffff1660e01b815260040160206040518083038186803b158015610b6657600080fd5b505afa158015610b7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9e919061265c565b610ba89190612d0c565b67ffffffffffffffff811115610bce57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610bf7578160200160208202803683370190505b5090506000805b866001600160a01b031663949d225d6040518163ffffffff1660e01b815260040160206040518083038186803b158015610c3757600080fd5b505afa158015610c4b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c6f919061265c565b811015610ebd576000876001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b158015610cb157600080fd5b505afa158015610cc5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610ced9190810190612451565b8281518110610d0c57634e487b7160e01b600052603260045260246000fd5b60200260200101519050846001600160a01b0316639f161b0a826040518263ffffffff1660e01b8152600401610d4491815260200190565b60206040518083038186803b158015610d5c57600080fd5b505afa158015610d70573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d9491906125b6565b610e4f57604051634f8b0d8560e11b8152600481018290526001600160a01b03881690639f161b0a9060240160206040518083038186803b158015610dd857600080fd5b505afa158015610dec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e1091906125b6565b15610e4f5780848481518110610e3657634e487b7160e01b600052603260045260246000fd5b602090810291909101015282610e4b81612d54565b9350505b604051630801f16960e11b8152600481018290526001600160a01b03861690631003e2d290602401600060405180830381600087803b158015610e9157600080fd5b505af1158015610ea5573d6000803e3d6000fd5b50505050508080610eb590612d54565b915050610bfe565b5060005b856001600160a01b031663949d225d6040518163ffffffff1660e01b815260040160206040518083038186803b158015610efa57600080fd5b505afa158015610f0e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f32919061265c565b811015611180576000866001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b158015610f7457600080fd5b505afa158015610f88573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610fb09190810190612451565b8281518110610fcf57634e487b7160e01b600052603260045260246000fd5b60200260200101519050846001600160a01b0316639f161b0a826040518263ffffffff1660e01b815260040161100791815260200190565b60206040518083038186803b15801561101f57600080fd5b505afa158015611033573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061105791906125b6565b61111257604051634f8b0d8560e11b8152600481018290526001600160a01b03891690639f161b0a9060240160206040518083038186803b15801561109b57600080fd5b505afa1580156110af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110d391906125b6565b1561111257808484815181106110f957634e487b7160e01b600052603260045260246000fd5b60209081029190910101528261110e81612d54565b9350505b604051630801f16960e11b8152600481018290526001600160a01b03861690631003e2d290602401600060405180830381600087803b15801561115457600080fd5b505af1158015611168573d6000803e3d6000fd5b5050505050808061117890612d54565b915050610ec1565b5060008167ffffffffffffffff8111156111aa57634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156111d3578160200160208202803683370190505b50905060005b828110156112465783818151811061120157634e487b7160e01b600052603260045260246000fd5b602002602001015182828151811061122957634e487b7160e01b600052603260045260246000fd5b60209081029190910101528061123e81612d54565b9150506111d9565b509695505050505050565b600061125c836105ea565b6001600160a01b0316630ff4c916836040518263ffffffff1660e01b815260040161128991815260200190565b60206040518083038186803b1580156112a157600080fd5b505afa1580156112b5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a82919061265c565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918d954604080517f949d225d00000000000000000000000000000000000000000000000000000000815290516000926001600160a01b0316918391839163949d225d916004808301926020929190829003018186803b15801561135a57600080fd5b505afa15801561136e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611392919061265c565b61139d906001612d0c565b604051630801f16960e11b8152600481018290529091506001600160a01b03831690631003e2d290602401600060405180830381600087803b1580156113e257600080fd5b505af11580156113f6573d6000803e3d6000fd5b505050507fdfadbed979b9afb94e08d5dac8199c7e9ad17df94da4c9e21adb35de32dc26938160405161142b91815260200190565b60405180910390a192915050565b611442826105ea565b6001600160a01b03166360fe47b1826040518263ffffffff1660e01b815260040161146f91815260200190565b600060405180830381600087803b15801561148957600080fd5b505af115801561149d573d6000803e3d6000fd5b505060408051600160208201527fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d1935085925084910160408051601f198184030181529082905261073e939291612bd4565b60008181527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918dc602090815260408083205490517f435552494f3a20436f6d706f6e656e7420776974682069642000000000000000928101929092526039820184905269081b9bdd08199bdd5b9960b21b60598301526001600160a01b0316908115159060630161064e565b60606000836001600160a01b031663949d225d6040518163ffffffff1660e01b815260040160206040518083038186803b1580156115b757600080fd5b505afa1580156115cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115ef919061265c565b67ffffffffffffffff81111561161557634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561163e578160200160208202803683370190505b5090506000805b856001600160a01b031663949d225d6040518163ffffffff1660e01b815260040160206040518083038186803b15801561167e57600080fd5b505afa158015611692573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116b6919061265c565b81101561182c576000866001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b1580156116f857600080fd5b505afa15801561170c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526117349190810190612451565b828151811061175357634e487b7160e01b600052603260045260246000fd5b60200260200101519050856001600160a01b0316639f161b0a826040518263ffffffff1660e01b815260040161178b91815260200190565b60206040518083038186803b1580156117a357600080fd5b505afa1580156117b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117db91906125b6565b611819578084848151811061180057634e487b7160e01b600052603260045260246000fd5b60209081029190910101528261181581612d54565b9350505b508061182481612d54565b915050611645565b5060008167ffffffffffffffff81111561185657634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561187f578160200160208202803683370190505b50905060005b828110156118f2578381815181106118ad57634e487b7160e01b600052603260045260246000fd5b60200260200101518282815181106118d557634e487b7160e01b600052603260045260246000fd5b6020908102919091010152806118ea81612d54565b915050611885565b5095945050505050565b6040805180820190915260008082526020820152611919836105ea565b6001600160a01b0316630ff4c916836040518263ffffffff1660e01b815260040161194691815260200190565b604080518083038186803b15801561195d57600080fd5b505afa158015611971573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a829190612989565b606060006119a3848461157a565b905060006119b18585610a8b565b905060006119bf858761157a565b90506119d46119ce848461208b565b8261208b565b9695505050505050565b6119e7836105ea565b6040517f293e852e00000000000000000000000000000000000000000000000000000000815260048101849052602481018390526001600160a01b03919091169063293e852e906044015b600060405180830381600087803b158015611a4c57600080fd5b505af1158015611a60573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d18383836040516020016107e691815260200190565b611aa3836105ea565b6001600160a01b0316638b28294783836040518363ffffffff1660e01b8152600401611ad0929190612c2f565b600060405180830381600087803b158015611aea57600080fd5b505af1158015611afe573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d183838360405161080293929190612bd4565b611b3e836105ea565b6001600160a01b031663946aadc683836040518363ffffffff1660e01b8152600401611b6b929190612c16565b600060405180830381600087803b158015611b8557600080fd5b505af1158015611b99573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d18383836040516020016107e69190612b8c565b6060611bdc836105ea565b6001600160a01b0316634c518fdc836040518263ffffffff1660e01b8152600401610a2e91815260200190565b6000611c14836105ea565b6001600160a01b0316630ff4c916836040518263ffffffff1660e01b8152600401611c4191815260200190565b60206040518083038186803b158015611c5957600080fd5b505afa158015611c6d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a8291906125b6565b611c9a836105ea565b6040517f1ab06ee500000000000000000000000000000000000000000000000000000000815260048101849052602481018390526001600160a01b039190911690631ab06ee590604401611a32565b611cf2836105ea565b6001600160a01b0316636437197783836040518363ffffffff1660e01b8152600401611d1f929190612c2f565b600060405180830381600087803b158015611d3957600080fd5b505af1158015611d4d573d6000803e3d6000fd5b505050507fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d18383836040516020016107e69190612b9f565b60606000604051611d9590612337565b604051809103906000f080158015611db1573d6000803e3d6000fd5b506040517f91d40c830000000000000000000000000000000000000000000000000000000081529091506001600160a01b038216906391d40c8390611dfa908990600401612b8c565b600060405180830381600087803b158015611e1457600080fd5b505af1158015611e28573d6000803e3d6000fd5b5060009250829150611e379050565b604051908082528060200260200182016040528015611e60578160200160208202803683370190505b5090506000855b858111611ff657604051611e7a90612337565b604051809103906000f080158015611e96573d6000803e3d6000fd5b5091506001600160a01b0382166391d40c837f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba08663017d7855018a604051611edd9190612a38565b908152604051908190036020018120547ffbdfa1ea0000000000000000000000000000000000000000000000000000000082526001600160a01b03169063fbdfa1ea90611f3290869060040190815260200190565b60006040518083038186803b158015611f4a57600080fd5b505afa158015611f5e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611f869190810190612451565b6040518263ffffffff1660e01b8152600401611fa29190612b8c565b600060405180830381600087803b158015611fbc57600080fd5b505af1158015611fd0573d6000803e3d6000fd5b50505050611fe2836105b28685610a8b565b925080611fee81612d54565b915050611e67565b5090979650505050505050565b600061200e836105ea565b6001600160a01b0316630ff4c916836040518263ffffffff1660e01b815260040161203b91815260200190565b60206040518083038186803b15801561205357600080fd5b505afa158015612067573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a829190612435565b606060008251845161209d9190612d0c565b67ffffffffffffffff8111156120c357634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156120ec578160200160208202803683370190505b50905060005b84518110156121605784818151811061211b57634e487b7160e01b600052603260045260246000fd5b602002602001015182828151811061214357634e487b7160e01b600052603260045260246000fd5b60209081029190910101528061215881612d54565b9150506120f2565b5060005b83518110156121de5783818151811061218d57634e487b7160e01b600052603260045260246000fd5b6020026020010151828287516121a39190612d0c565b815181106121c157634e487b7160e01b600052603260045260246000fd5b6020908102919091010152806121d681612d54565b915050612164565b509392505050565b6121ef836105ea565b6040517f2f30c6f6000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b0383811660248301529190911690632f30c6f690604401600060405180830381600087803b15801561225457600080fd5b505af1158015612268573d6000803e3d6000fd5b5050604080516001600160a01b03851660208201527fd5f0779a9671b2254e488c29e89421489d8cc7cacede6e538c065946c98348d193508692508591016107e6565b60606122b6836105ea565b6001600160a01b0316630ff4c916836040518263ffffffff1660e01b81526004016122e391815260200190565b60006040518083038186803b1580156122fb57600080fd5b505afa15801561230f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610a829190810190612451565b61052980612db483390190565b600061235761235284612ce4565b612c8f565b905082815283838301111561236b57600080fd5b828260208301376000602084830101529392505050565b600061239061235284612ce4565b90508281528383830111156123a457600080fd5b6123b2836020830184612d24565b9392505050565b600082601f8301126123c9578081fd5b813560206123d961235283612cc0565b80838252828201915082860187848660051b89010111156123f8578586fd5b855b85811015611ff6578135845292840192908401906001016123fa565b600082601f830112612426578081fd5b610a8283833560208501612344565b600060208284031215612446578081fd5b81516123b281612d9b565b60006020808385031215612463578182fd5b825167ffffffffffffffff811115612479578283fd5b8301601f81018513612489578283fd5b805161249761235282612cc0565b80828252848201915084840188868560051b87010111156124b6578687fd5b8694505b838510156124d85780518352600194909401939185019185016124ba565b50979650505050505050565b600080604083850312156124f6578081fd5b823567ffffffffffffffff8082111561250d578283fd5b612519868387016123b9565b9350602085013591508082111561252e578283fd5b5061253b858286016123b9565b9150509250929050565b6000806000806080858703121561255a578182fd5b843567ffffffffffffffff80821115612571578384fd5b61257d888389016123b9565b95506020870135915080821115612592578384fd5b5061259f87828801612416565b949794965050505060408301359260600135919050565b6000602082840312156125c7578081fd5b815180151581146123b2578182fd5b6000602082840312156125e7578081fd5b815167ffffffffffffffff8111156125fd578182fd5b8201601f8101841361260d578182fd5b61261c84825160208401612382565b949350505050565b60008060408385031215612636578182fd5b823561264181612d9b565b9150602083013561265181612d9b565b809150509250929050565b60006020828403121561266d578081fd5b5051919050565b600060208284031215612685578081fd5b813567ffffffffffffffff81111561269b578182fd5b61261c84828501612416565b600080604083850312156126b9578182fd5b823567ffffffffffffffff8111156126cf578283fd5b6126db85828601612416565b925050602083013560098110612651578182fd5b60008060408385031215612701578182fd5b823567ffffffffffffffff811115612717578283fd5b61272385828601612416565b95602094909401359450505050565b600080600060608486031215612746578081fd5b833567ffffffffffffffff81111561275c578182fd5b61276886828701612416565b93505060208401359150604084013561278081612d9b565b809150509250925092565b60008060006060848603121561279f578081fd5b833567ffffffffffffffff808211156127b6578283fd5b6127c287838801612416565b94506020860135935060408601359150808211156127de578283fd5b506127eb868287016123b9565b9150509250925092565b600080600060608486031215612809578081fd5b833567ffffffffffffffff80821115612820578283fd5b61282c87838801612416565b9450602086013593506040860135915080821115612848578283fd5b508401601f81018613612859578182fd5b6127eb86823560208401612344565b60008060006060848603121561287c578081fd5b833567ffffffffffffffff811115612892578182fd5b61289e86828701612416565b9660208601359650604090950135949350505050565b6000806000606084860312156128c8578081fd5b833567ffffffffffffffff808211156128df578283fd5b6128eb87838801612416565b9450602086013593506040860135915080821115612907578283fd5b506127eb86828701612416565b60008060008385036080811215612929578182fd5b843567ffffffffffffffff81111561293f578283fd5b61294b87828801612416565b945050602085013592506040603f1982011215612966578182fd5b5061296f612c66565b604085013581526060909401356020850152509093909250565b60006040828403121561299a578081fd5b6129a2612c66565b82518152602083015160208201528091505092915050565b6000602082840312156129cb578081fd5b5035919050565b6000815180845260208085019450808401835b83811015612a01578151875295820195908201906001016129e5565b509495945050505050565b60008151808452612a24816020860160208601612d24565b601f01601f19169290920160200192915050565b60008251612a4a818460208701612d24565b9190910192915050565b600080835482600182811c915080831680612a7057607f831692505b6020808410821415612a9057634e487b7160e01b87526022600452602487fd5b818015612aa45760018114612ab557612ae1565b60ff19861689528489019650612ae1565b60008a815260209020885b86811015612ad95781548b820152908501908301612ac0565b505084890196505b509498975050505050505050565b7f435552494f3a20436f6d706f6e656e7420000000000000000000000000000000815260008251612b27816011850160208701612d24565b69081b9bdd08199bdd5b9960b21b6011939091019283015250601b01919050565b6020808252825182820181905260009190848201906040850190845b81811015612b8057835183529284019291840191600101612b64565b50909695505050505050565b602081526000610a8260208301846129d2565b602081526000610a826020830184612a0c565b604081526000612bc56040830185612a0c565b90508260208301529392505050565b606081526000612be76060830186612a0c565b84602084015282810360408401526119d48185612a0c565b815181526020808301519082015260408101610a85565b82815260406020820152600061261c60408301846129d2565b82815260406020820152600061261c6040830184612a0c565b828152606081016123b2602083018480518252602090810151910152565b6040805190810167ffffffffffffffff81118282101715612c8957612c89612d85565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715612cb857612cb8612d85565b604052919050565b600067ffffffffffffffff821115612cda57612cda612d85565b5060051b60200190565b600067ffffffffffffffff821115612cfe57612cfe612d85565b50601f01601f191660200190565b60008219821115612d1f57612d1f612d6f565b500190565b60005b83811015612d3f578181015183820152602001612d27565b83811115612d4e576000848401525b50505050565b6000600019821415612d6857612d68612d6f565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114612db057600080fd5b5056fe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea264697066735822122098248c63fb12ef34067195c12668f1792cd13f190f3d3001757a83d4bcb4fa6f64736f6c63430008040033a2646970667358221220a7714a3eb488ee76dd149972f3fe9be778a36c41678e5fd7f49d230d7b5ac9e864736f6c63430008040033";

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
