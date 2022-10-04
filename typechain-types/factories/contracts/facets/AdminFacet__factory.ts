/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  AdminFacet,
  AdminFacetInterface,
} from "../../../contracts/facets/AdminFacet";

const _abi = [
  {
    inputs: [],
    name: "addEntity",
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
        internalType: "struct Position[]",
        name: "_positions",
        type: "tuple[]",
      },
    ],
    name: "bulkInitializeTiles",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "reactivatePlayer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_gameAddr",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "enum VALUE_TYPE",
            name: "valueType",
            type: "uint8",
          },
        ],
        internalType: "struct ComponentSpec[]",
        name: "_componentSpecs",
        type: "tuple[]",
      },
    ],
    name: "registerComponents",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_gameAddr",
        type: "address",
      },
    ],
    name: "registerDefaultComponents",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "removeEntity",
    outputs: [],
    stateMutability: "nonpayable",
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
      {
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
    ],
    name: "setComponentValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[][]",
        name: "_colBatches",
        type: "uint256[][]",
      },
    ],
    name: "storeEncodedColumnBatches",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000805534801561001457600080fd5b506121a9806100246000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80636d6d386b1161005b5780636d6d386b146100e257806371995a7b146100f5578063ac344fb714610108578063f1d51bb21461011b57600080fd5b8063111c24841461008d578063384c82a1146100a757806339684ca5146100bc578063425e383b146100cf575b600080fd5b61009561012e565b60405190815260200160405180910390f35b6100ba6100b5366004611b4b565b610228565b005b6100ba6100ca366004611e72565b611279565b6100ba6100dd366004611b67565b611374565b6100ba6100f0366004611eef565b61141f565b6100ba610103366004611c79565b611510565b6100ba610116366004611d82565b6115b8565b6100ba610129366004611b4b565b6116fd565b60007f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146101a75760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b60448201526064015b60405180910390fd5b73__$7fcaad27f85dd9a0fa019456818c6f9f34$__6364a000b96040518163ffffffff1660e01b815260040160206040518083038186803b1580156101eb57600080fd5b505af41580156101ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102239190611f07565b905090565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b0316331461029a5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b6040805160228082526104608201909252600091816020015b6040805180820190915260608152600060208201528152602001906001900390816102b35790505060408051608081018252600b9181019182527f4973436f6d706f6e656e7400000000000000000000000000000000000000000060608201529081529091506020810160028152508160008151811061034357634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260039181019182527f546167000000000000000000000000000000000000000000000000000000000060608201529081529081016001815250816001815181106103b657634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600891810191825267497341637469766560c01b606082015290815290810160028152508160028151811061041457634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600d9181019182527f496e697454696d657374616d7000000000000000000000000000000000000000606082015290815290810160008152508160038151811061048757634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f506f736974696f6e00000000000000000000000000000000000000000000000060608201529081529081016005815250816004815181106104fa57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260059181019182527f4f776e6572000000000000000000000000000000000000000000000000000000606082015290815290810160008152508160058151811061056d57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260059181019182527f4c6576656c00000000000000000000000000000000000000000000000000000060608201529081529081016000815250816006815181106105e057634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f4e616d6500000000000000000000000000000000000000000000000000000000606082015290815290810160018152508160078151811061065357634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f43616e536574746c65000000000000000000000000000000000000000000000060608201529081529081016002815250816008815181106106c657634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600c9181019182527f5265736f75726365547970650000000000000000000000000000000000000000606082015290815290810160018152508160098151811061073957634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600c9181019182527f4275696c64696e675479706500000000000000000000000000000000000000006060820152908152908101600181525081600a815181106107ac57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f54656d706c6174650000000000000000000000000000000000000000000000006060820152908152908101600081525081600b8151811061081f57634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600a9181019182527f43616e50726f64756365000000000000000000000000000000000000000000006060820152908152908101600281525081600c8151811061089257634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f4475726174696f6e0000000000000000000000000000000000000000000000006060820152908152908101600081525081600d8151811061090557634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260129181019182527f42616c616e63654c6173745570646174656400000000000000000000000000006060820152908152908101600081525081600e8151811061097857634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f4d61784865616c746800000000000000000000000000000000000000000000006060820152908152908101600081525081600f815181106109eb57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f4865616c746800000000000000000000000000000000000000000000000000006060820152908152908101600081525081601081518110610a5e57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f41747461636b00000000000000000000000000000000000000000000000000006060820152908152908101600081525081601181518110610ad157634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260079181019182527f446566656e7365000000000000000000000000000000000000000000000000006060820152908152908101600081525081601281518110610b4457634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260059181019182527f53706565640000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601381518110610bb757634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f4c6f6164000000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601481518110610c2a57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f43697479000000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601581518110610c9d57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f4b656570657200000000000000000000000000000000000000000000000000006060820152908152908101600081525081601681518110610d1057634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f416d6f756e7400000000000000000000000000000000000000000000000000006060820152908152908101600081525081601781518110610d8357634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600d9181019182527f496e76656e746f727954797065000000000000000000000000000000000000006060820152908152908101600181525081601881518110610df657634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600d9181019182527f4c61737454696d657374616d70000000000000000000000000000000000000006060820152908152908101600081525081601981518110610e6957634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f536f7572636500000000000000000000000000000000000000000000000000006060820152908152908101600081525081601a81518110610edc57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f54617267657400000000000000000000000000000000000000000000000000006060820152908152908101600081525081601b81518110610f4f57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f496e76656e746f727900000000000000000000000000000000000000000000006060820152908152908101600081525081601c81518110610fc257634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260079181019182527f41646472657373000000000000000000000000000000000000000000000000006060820152908152908101600481525081601d8151811061103557634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f54726561747900000000000000000000000000000000000000000000000000006060820152908152908101600481525081601e815181106110a857634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f436f7374000000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601f8151811061111b57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f41726d7900000000000000000000000000000000000000000000000000000000606082015290815290810160008152508160208151811061118e57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f4361706163697479000000000000000000000000000000000000000000000000606082015290815290810160008152508160218151811061120157634e487b7160e01b600052603260045260246000fd5b60209081029190910101526040516319d37cd760e31b815273__$80f58d039fa8106ab096f6fd7dbaec355f$__9063ce9be6b8906112459085908590600401611f6a565b60006040518083038186803b15801561125d57600080fd5b505af4158015611271573d6000803e3d6000fd5b505050505050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146112eb5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b6040517fa99844fd00000000000000000000000000000000000000000000000000000000815273__$7fcaad27f85dd9a0fa019456818c6f9f34$__9063a99844fd9061133f9086908690869060040161200a565b60006040518083038186803b15801561135757600080fd5b505af415801561136b573d6000803e3d6000fd5b50505050505050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146113e65760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b6040516319d37cd760e31b815273__$80f58d039fa8106ab096f6fd7dbaec355f$__9063ce9be6b8906112459085908590600401611f6a565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146114915760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b6040517f2a8368460000000000000000000000000000000000000000000000000000000081526004810182905273__$7fcaad27f85dd9a0fa019456818c6f9f34$__90632a8368469060240160006040518083038186803b1580156114f557600080fd5b505af4158015611509573d6000803e3d6000fd5b5050505050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146115825760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b80516115b4907f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918dc9060208401906119d6565b5050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b0316331461162a5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b60005b81518110156115b45773__$80f58d039fa8106ab096f6fd7dbaec355f$__6313ab5ce183838151811061167057634e487b7160e01b600052603260045260246000fd5b6020908102919091018101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815281516004820152910151602482015260440160006040518083038186803b1580156116d257600080fd5b505af41580156116e6573d6000803e3d6000fd5b5050505080806116f590612121565b91505061162d565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b0316331461176f5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b6001600160a01b03811660009081527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918e36020526040812054905481141561181e5760405162461bcd60e51b815260206004820152602160248201527f435552494f3a20506c6179657220616c726561647920696e697469616c697a6560448201527f6400000000000000000000000000000000000000000000000000000000000000606482015260840161019e565b6040517f42b4edac00000000000000000000000000000000000000000000000000000000815273__$7fcaad27f85dd9a0fa019456818c6f9f34$__906342b4edac9061186c9060040161203f565b60206040518083038186803b15801561188457600080fd5b505af4158015611898573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118bc9190611e56565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b81526004016118e991815260200190565b60206040518083038186803b15801561190157600080fd5b505afa158015611915573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119399190611e36565b156119865760405162461bcd60e51b815260206004820152601760248201527f435552494f3a20506c6179657220697320616374697665000000000000000000604482015260640161019e565b6040517f6d69014700000000000000000000000000000000000000000000000000000000815273__$7fcaad27f85dd9a0fa019456818c6f9f34$__90636d6901479061124590849060040161206d565b828054828255906000526020600020908101928215611a23579160200282015b82811115611a235782518051611a13918491602090910190611a33565b50916020019190600101906119f6565b50611a2f929150611a7a565b5090565b828054828255906000526020600020908101928215611a6e579160200282015b82811115611a6e578251825591602001919060010190611a53565b50611a2f929150611a97565b80821115611a2f576000611a8e8282611aac565b50600101611a7a565b5b80821115611a2f5760008155600101611a98565b5080546000825590600052602060002090810190611aca9190611a97565b50565b600067ffffffffffffffff831115611ae757611ae7612148565b611afa601f8401601f19166020016120cc565b9050828152838383011115611b0e57600080fd5b828260208301376000602084830101529392505050565b600082601f830112611b35578081fd5b611b4483833560208501611acd565b9392505050565b600060208284031215611b5c578081fd5b8135611b448161215e565b60008060408385031215611b79578081fd5b8235611b848161215e565b915060208381013567ffffffffffffffff80821115611ba1578384fd5b818601915086601f830112611bb4578384fd5b8135611bc7611bc2826120fd565b6120cc565b8082825285820191508585018a878560051b8801011115611be6578788fd5b875b84811015611c6857813586811115611bfe57898afd5b87016040818e03601f19011215611c1357898afd5b611c1b6120a3565b8982013588811115611c2b578b8cfd5b611c398f8c83860101611b25565b8252506040820135915060098210611c4f578a8bfd5b808a019190915284529287019290870190600101611be8565b50979a909950975050505050505050565b60006020808385031215611c8b578182fd5b823567ffffffffffffffff80821115611ca2578384fd5b818501915085601f830112611cb5578384fd5b8135611cc3611bc2826120fd565b80828252858201915085850189878560051b8801011115611ce2578788fd5b875b84811015611d7357813586811115611cfa57898afd5b8701603f81018c13611d0a57898afd5b88810135611d1a611bc2826120fd565b808282528b82019150604084018f60408560051b8701011115611d3b578d8efd5b8d94505b83851015611d5d578035835260019490940193918c01918c01611d3f565b5087525050509287019290870190600101611ce4565b50909998505050505050505050565b60006020808385031215611d94578182fd5b823567ffffffffffffffff811115611daa578283fd5b8301601f81018513611dba578283fd5b8035611dc8611bc2826120fd565b80828252848201915084840188868560061b8701011115611de7578687fd5b8694505b83851015611e2a57604080828b031215611e03578788fd5b611e0b6120a3565b8235815287830135888201528452600195909501949286019201611deb565b50979650505050505050565b600060208284031215611e47578081fd5b81518015158114611b44578182fd5b600060208284031215611e67578081fd5b8151611b448161215e565b600080600060608486031215611e86578081fd5b833567ffffffffffffffff80821115611e9d578283fd5b611ea987838801611b25565b9450602086013593506040860135915080821115611ec5578283fd5b508401601f81018613611ed6578182fd5b611ee586823560208401611acd565b9150509250925092565b600060208284031215611f00578081fd5b5035919050565b600060208284031215611f18578081fd5b5051919050565b60008151808452815b81811015611f4457602081850181015186830182015201611f28565b81811115611f555782602083870101525b50601f01601f19169290920160200192915050565b600060408083016001600160a01b03861684526020828186015281865180845260608701915060608160051b8801019350828801865b82811015611ffb57888603605f1901845281518051888852611fc489890182611f1f565b9187015191905060098210611fe757634e487b7160e01b8a52602160045260248afd5b968601529284019290840190600101611fa0565b50939998505050505050505050565b60608152600061201d6060830186611f1f565b84602084015282810360408401526120358185611f1f565b9695505050505050565b602081526000612067602083016008815267497341637469766560c01b602082015260400190565b92915050565b604081526000612095604083016008815267497341637469766560c01b602082015260400190565b905082602083015292915050565b6040805190810167ffffffffffffffff811182821017156120c6576120c6612148565b60405290565b604051601f8201601f1916810167ffffffffffffffff811182821017156120f5576120f5612148565b604052919050565b600067ffffffffffffffff82111561211757612117612148565b5060051b60200190565b600060001982141561214157634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114611aca57600080fdfea26469706673582212202920cb02ef84e5884b4d53d8494a083830b2827597d3800c00c8986a7263bcb764736f6c63430008040033";

type AdminFacetConstructorParams =
  | [linkLibraryAddresses: AdminFacetLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AdminFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class AdminFacet__factory extends ContractFactory {
  constructor(...args: AdminFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(
        _abi,
        AdminFacet__factory.linkBytecode(linkLibraryAddresses),
        signer
      );
    }
  }

  static linkBytecode(
    linkLibraryAddresses: AdminFacetLibraryAddresses
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
  ): Promise<AdminFacet> {
    return super.deploy(overrides || {}) as Promise<AdminFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): AdminFacet {
    return super.attach(address) as AdminFacet;
  }
  override connect(signer: Signer): AdminFacet__factory {
    return super.connect(signer) as AdminFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AdminFacetInterface {
    return new utils.Interface(_abi) as AdminFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AdminFacet {
    return new Contract(address, _abi, signerOrProvider) as AdminFacet;
  }
}

export interface AdminFacetLibraryAddresses {
  ["contracts/libraries/ECSLib.sol:ECSLib"]: string;
  ["contracts/libraries/GameLib.sol:GameLib"]: string;
}
