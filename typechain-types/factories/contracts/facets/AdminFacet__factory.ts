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
  "0x60806040526000805534801561001457600080fd5b506120c3806100246000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80636d6d386b1161005b5780636d6d386b146100e257806371995a7b146100f5578063ac344fb714610108578063f1d51bb21461011b57600080fd5b8063111c24841461008d578063384c82a1146100a757806339684ca5146100bc578063425e383b146100cf575b600080fd5b61009561012e565b60405190815260200160405180910390f35b6100ba6100b5366004611a65565b610228565b005b6100ba6100ca366004611d8c565b611193565b6100ba6100dd366004611a81565b61128e565b6100ba6100f0366004611e09565b611339565b6100ba610103366004611b93565b61142a565b6100ba610116366004611c9c565b6114d2565b6100ba610129366004611a65565b611617565b60007f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146101a75760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b60448201526064015b60405180910390fd5b73__$7fcaad27f85dd9a0fa019456818c6f9f34$__6364a000b96040518163ffffffff1660e01b815260040160206040518083038186803b1580156101eb57600080fd5b505af41580156101ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102239190611e21565b905090565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b0316331461029a5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b6040805160208082526104208201909252600091816020015b6040805180820190915260608152600060208201528152602001906001900390816102b35790505060408051608081018252600b9181019182527f4973436f6d706f6e656e7400000000000000000000000000000000000000000060608201529081529091506020810160028152508160008151811061034357634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260039181019182527f546167000000000000000000000000000000000000000000000000000000000060608201529081529081016001815250816001815181106103b657634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600891810191825267497341637469766560c01b606082015290815290810160028152508160028151811061041457634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600d9181019182527f496e697454696d657374616d7000000000000000000000000000000000000000606082015290815290810160008152508160038151811061048757634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f506f736974696f6e00000000000000000000000000000000000000000000000060608201529081529081016005815250816004815181106104fa57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260059181019182527f4f776e6572000000000000000000000000000000000000000000000000000000606082015290815290810160008152508160058151811061056d57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260059181019182527f4c6576656c00000000000000000000000000000000000000000000000000000060608201529081529081016000815250816006815181106105e057634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f4e616d6500000000000000000000000000000000000000000000000000000000606082015290815290810160018152508160078151811061065357634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f43616e536574746c65000000000000000000000000000000000000000000000060608201529081529081016002815250816008815181106106c657634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600c9181019182527f5265736f75726365547970650000000000000000000000000000000000000000606082015290815290810160018152508160098151811061073957634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600c9181019182527f4275696c64696e675479706500000000000000000000000000000000000000006060820152908152908101600181525081600a815181106107ac57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f54656d706c6174650000000000000000000000000000000000000000000000006060820152908152908101600081525081600b8151811061081f57634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600a9181019182527f43616e50726f64756365000000000000000000000000000000000000000000006060820152908152908101600281525081600c8151811061089257634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f4475726174696f6e0000000000000000000000000000000000000000000000006060820152908152908101600081525081600d8151811061090557634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260129181019182527f42616c616e63654c6173745570646174656400000000000000000000000000006060820152908152908101600081525081600e8151811061097857634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f4d61784865616c746800000000000000000000000000000000000000000000006060820152908152908101600081525081600f815181106109eb57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f4865616c746800000000000000000000000000000000000000000000000000006060820152908152908101600081525081601081518110610a5e57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f41747461636b00000000000000000000000000000000000000000000000000006060820152908152908101600081525081601181518110610ad157634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260079181019182527f446566656e7365000000000000000000000000000000000000000000000000006060820152908152908101600081525081601281518110610b4457634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260059181019182527f53706565640000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601381518110610bb757634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f4c6f6164000000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601481518110610c2a57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f43697479000000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601581518110610c9d57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f4b656570657200000000000000000000000000000000000000000000000000006060820152908152908101600081525081601681518110610d1057634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f416d6f756e7400000000000000000000000000000000000000000000000000006060820152908152908101600081525081601781518110610d8357634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600d9181019182527f496e76656e746f727954797065000000000000000000000000000000000000006060820152908152908101600181525081601881518110610df657634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600d9181019182527f4c61737454696d657374616d70000000000000000000000000000000000000006060820152908152908101600081525081601981518110610e6957634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f536f7572636500000000000000000000000000000000000000000000000000006060820152908152908101600081525081601a81518110610edc57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f54617267657400000000000000000000000000000000000000000000000000006060820152908152908101600081525081601b81518110610f4f57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f496e76656e746f727900000000000000000000000000000000000000000000006060820152908152908101600081525081601c81518110610fc257634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260079181019182527f41646472657373000000000000000000000000000000000000000000000000006060820152908152908101600481525081601d8151811061103557634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f54726561747900000000000000000000000000000000000000000000000000006060820152908152908101600481525081601e815181106110a857634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f436f7374000000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601f8151811061111b57634e487b7160e01b600052603260045260246000fd5b60209081029190910101526040516319d37cd760e31b815273__$80f58d039fa8106ab096f6fd7dbaec355f$__9063ce9be6b89061115f9085908590600401611e84565b60006040518083038186803b15801561117757600080fd5b505af415801561118b573d6000803e3d6000fd5b505050505050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146112055760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b6040517fa99844fd00000000000000000000000000000000000000000000000000000000815273__$7fcaad27f85dd9a0fa019456818c6f9f34$__9063a99844fd9061125990869086908690600401611f24565b60006040518083038186803b15801561127157600080fd5b505af4158015611285573d6000803e3d6000fd5b50505050505050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146113005760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b6040516319d37cd760e31b815273__$80f58d039fa8106ab096f6fd7dbaec355f$__9063ce9be6b89061115f9085908590600401611e84565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146113ab5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b6040517f2a8368460000000000000000000000000000000000000000000000000000000081526004810182905273__$7fcaad27f85dd9a0fa019456818c6f9f34$__90632a8368469060240160006040518083038186803b15801561140f57600080fd5b505af4158015611423573d6000803e3d6000fd5b5050505050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b0316331461149c5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b80516114ce907f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918d99060208401906118f0565b5050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146115445760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b60005b81518110156114ce5773__$80f58d039fa8106ab096f6fd7dbaec355f$__6313ab5ce183838151811061158a57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815281516004820152910151602482015260440160006040518083038186803b1580156115ec57600080fd5b505af4158015611600573d6000803e3d6000fd5b50505050808061160f9061203b565b915050611547565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146116895760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b604482015260640161019e565b6001600160a01b03811660009081527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918e0602052604081205490548114156117385760405162461bcd60e51b815260206004820152602160248201527f435552494f3a20506c6179657220616c726561647920696e697469616c697a6560448201527f6400000000000000000000000000000000000000000000000000000000000000606482015260840161019e565b6040517f42b4edac00000000000000000000000000000000000000000000000000000000815273__$7fcaad27f85dd9a0fa019456818c6f9f34$__906342b4edac9061178690600401611f59565b60206040518083038186803b15801561179e57600080fd5b505af41580156117b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117d69190611d70565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b815260040161180391815260200190565b60206040518083038186803b15801561181b57600080fd5b505afa15801561182f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118539190611d50565b156118a05760405162461bcd60e51b815260206004820152601760248201527f435552494f3a20506c6179657220697320616374697665000000000000000000604482015260640161019e565b6040517f6d69014700000000000000000000000000000000000000000000000000000000815273__$7fcaad27f85dd9a0fa019456818c6f9f34$__90636d6901479061115f908490600401611f87565b82805482825590600052602060002090810192821561193d579160200282015b8281111561193d578251805161192d91849160209091019061194d565b5091602001919060010190611910565b50611949929150611994565b5090565b828054828255906000526020600020908101928215611988579160200282015b8281111561198857825182559160200191906001019061196d565b506119499291506119b1565b808211156119495760006119a882826119c6565b50600101611994565b5b8082111561194957600081556001016119b2565b50805460008255906000526020600020908101906119e491906119b1565b50565b600067ffffffffffffffff831115611a0157611a01612062565b611a14601f8401601f1916602001611fe6565b9050828152838383011115611a2857600080fd5b828260208301376000602084830101529392505050565b600082601f830112611a4f578081fd5b611a5e838335602085016119e7565b9392505050565b600060208284031215611a76578081fd5b8135611a5e81612078565b60008060408385031215611a93578081fd5b8235611a9e81612078565b915060208381013567ffffffffffffffff80821115611abb578384fd5b818601915086601f830112611ace578384fd5b8135611ae1611adc82612017565b611fe6565b8082825285820191508585018a878560051b8801011115611b00578788fd5b875b84811015611b8257813586811115611b1857898afd5b87016040818e03601f19011215611b2d57898afd5b611b35611fbd565b8982013588811115611b45578b8cfd5b611b538f8c83860101611a3f565b8252506040820135915060098210611b69578a8bfd5b808a019190915284529287019290870190600101611b02565b50979a909950975050505050505050565b60006020808385031215611ba5578182fd5b823567ffffffffffffffff80821115611bbc578384fd5b818501915085601f830112611bcf578384fd5b8135611bdd611adc82612017565b80828252858201915085850189878560051b8801011115611bfc578788fd5b875b84811015611c8d57813586811115611c1457898afd5b8701603f81018c13611c2457898afd5b88810135611c34611adc82612017565b808282528b82019150604084018f60408560051b8701011115611c55578d8efd5b8d94505b83851015611c77578035835260019490940193918c01918c01611c59565b5087525050509287019290870190600101611bfe565b50909998505050505050505050565b60006020808385031215611cae578182fd5b823567ffffffffffffffff811115611cc4578283fd5b8301601f81018513611cd4578283fd5b8035611ce2611adc82612017565b80828252848201915084840188868560061b8701011115611d01578687fd5b8694505b83851015611d4457604080828b031215611d1d578788fd5b611d25611fbd565b8235815287830135888201528452600195909501949286019201611d05565b50979650505050505050565b600060208284031215611d61578081fd5b81518015158114611a5e578182fd5b600060208284031215611d81578081fd5b8151611a5e81612078565b600080600060608486031215611da0578081fd5b833567ffffffffffffffff80821115611db7578283fd5b611dc387838801611a3f565b9450602086013593506040860135915080821115611ddf578283fd5b508401601f81018613611df0578182fd5b611dff868235602084016119e7565b9150509250925092565b600060208284031215611e1a578081fd5b5035919050565b600060208284031215611e32578081fd5b5051919050565b60008151808452815b81811015611e5e57602081850181015186830182015201611e42565b81811115611e6f5782602083870101525b50601f01601f19169290920160200192915050565b600060408083016001600160a01b03861684526020828186015281865180845260608701915060608160051b8801019350828801865b82811015611f1557888603605f1901845281518051888852611ede89890182611e39565b9187015191905060098210611f0157634e487b7160e01b8a52602160045260248afd5b968601529284019290840190600101611eba565b50939998505050505050505050565b606081526000611f376060830186611e39565b8460208401528281036040840152611f4f8185611e39565b9695505050505050565b602081526000611f81602083016008815267497341637469766560c01b602082015260400190565b92915050565b604081526000611faf604083016008815267497341637469766560c01b602082015260400190565b905082602083015292915050565b6040805190810167ffffffffffffffff81118282101715611fe057611fe0612062565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561200f5761200f612062565b604052919050565b600067ffffffffffffffff82111561203157612031612062565b5060051b60200190565b600060001982141561205b57634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146119e457600080fdfea2646970667358221220a7b991d075373be2e430699f4a59d775489346cb62150968689c5d3d181d994d64736f6c63430008040033";

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
