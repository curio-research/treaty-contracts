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
  "0x60806040526000805534801561001457600080fd5b50611f9c806100246000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063425e383b1161005b578063425e383b146100c457806371995a7b146100d7578063ac344fb7146100ea578063f1d51bb2146100fd57600080fd5b8063111c248414610082578063384c82a11461009c57806339684ca5146100b1575b600080fd5b61008a610110565b60405190815260200160405180910390f35b6100af6100aa366004611956565b61020a565b005b6100af6100bf366004611c7d565b611175565b6100af6100d2366004611972565b611270565b6100af6100e5366004611a84565b61131b565b6100af6100f8366004611b8d565b6113c3565b6100af61010b366004611956565b611508565b60007f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146101895760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b60448201526064015b60405180910390fd5b73__$7fcaad27f85dd9a0fa019456818c6f9f34$__6364a000b96040518163ffffffff1660e01b815260040160206040518083038186803b1580156101cd57600080fd5b505af41580156101e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102059190611cfa565b905090565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b0316331461027c5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b6044820152606401610180565b6040805160208082526104208201909252600091816020015b6040805180820190915260608152600060208201528152602001906001900390816102955790505060408051608081018252600b9181019182527f4973436f6d706f6e656e7400000000000000000000000000000000000000000060608201529081529091506020810160028152508160008151811061032557634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260039181019182527f5461670000000000000000000000000000000000000000000000000000000000606082015290815290810160018152508160018151811061039857634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600891810191825267497341637469766560c01b60608201529081529081016002815250816002815181106103f657634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600d9181019182527f496e697454696d657374616d7000000000000000000000000000000000000000606082015290815290810160008152508160038151811061046957634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f506f736974696f6e00000000000000000000000000000000000000000000000060608201529081529081016005815250816004815181106104dc57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260059181019182527f4f776e6572000000000000000000000000000000000000000000000000000000606082015290815290810160008152508160058151811061054f57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260059181019182527f4c6576656c00000000000000000000000000000000000000000000000000000060608201529081529081016000815250816006815181106105c257634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f4e616d6500000000000000000000000000000000000000000000000000000000606082015290815290810160018152508160078151811061063557634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f43616e536574746c65000000000000000000000000000000000000000000000060608201529081529081016002815250816008815181106106a857634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600c9181019182527f5265736f75726365547970650000000000000000000000000000000000000000606082015290815290810160018152508160098151811061071b57634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600c9181019182527f4275696c64696e675479706500000000000000000000000000000000000000006060820152908152908101600181525081600a8151811061078e57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f54656d706c6174650000000000000000000000000000000000000000000000006060820152908152908101600081525081600b8151811061080157634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f54656d706c6174657300000000000000000000000000000000000000000000006060820152908152908101600681525081600c8151811061087457634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600a9181019182527f43616e50726f64756365000000000000000000000000000000000000000000006060820152908152908101600281525081600d815181106108e757634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f4475726174696f6e0000000000000000000000000000000000000000000000006060820152908152908101600081525081600e8151811061095a57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260129181019182527f42616c616e63654c6173745570646174656400000000000000000000000000006060820152908152908101600081525081600f815181106109cd57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f4d61784865616c746800000000000000000000000000000000000000000000006060820152908152908101600081525081601081518110610a4057634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f4865616c746800000000000000000000000000000000000000000000000000006060820152908152908101600081525081601181518110610ab357634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f41747461636b00000000000000000000000000000000000000000000000000006060820152908152908101600081525081601281518110610b2657634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260079181019182527f446566656e7365000000000000000000000000000000000000000000000000006060820152908152908101600081525081601381518110610b9957634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260059181019182527f53706565640000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601481518110610c0c57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f43697479000000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601581518110610c7f57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f4275696c64696e670000000000000000000000000000000000000000000000006060820152908152908101600081525081601681518110610cf257634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f416d6f756e7400000000000000000000000000000000000000000000000000006060820152908152908101600081525081601781518110610d6557634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260079181019182527f416d6f756e7473000000000000000000000000000000000000000000000000006060820152908152908101600681525081601881518110610dd857634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600d9181019182527f496e76656e746f727954797065000000000000000000000000000000000000006060820152908152908101600181525081601981518110610e4b57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f4c6173744d6f76656400000000000000000000000000000000000000000000006060820152908152908101600081525081601a81518110610ebe57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f536f7572636500000000000000000000000000000000000000000000000000006060820152908152908101600081525081601b81518110610f3157634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f54617267657400000000000000000000000000000000000000000000000000006060820152908152908101600081525081601c81518110610fa457634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f496e76656e746f727900000000000000000000000000000000000000000000006060820152908152908101600081525081601d8151811061101757634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260079181019182527f41646472657373000000000000000000000000000000000000000000000000006060820152908152908101600481525081601e8151811061108a57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f436f7374000000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601f815181106110fd57634e487b7160e01b600052603260045260246000fd5b60209081029190910101526040516319d37cd760e31b815273__$80f58d039fa8106ab096f6fd7dbaec355f$__9063ce9be6b8906111419085908590600401611d5d565b60006040518083038186803b15801561115957600080fd5b505af415801561116d573d6000803e3d6000fd5b505050505050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146111e75760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b6044820152606401610180565b6040517fa99844fd00000000000000000000000000000000000000000000000000000000815273__$7fcaad27f85dd9a0fa019456818c6f9f34$__9063a99844fd9061123b90869086908690600401611dfd565b60006040518083038186803b15801561125357600080fd5b505af4158015611267573d6000803e3d6000fd5b50505050505050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146112e25760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b6044820152606401610180565b6040516319d37cd760e31b815273__$80f58d039fa8106ab096f6fd7dbaec355f$__9063ce9be6b8906111419085908590600401611d5d565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b0316331461138d5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b6044820152606401610180565b80516113bf907f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918d79060208401906117e1565b5050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146114355760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b6044820152606401610180565b60005b81518110156113bf5773__$80f58d039fa8106ab096f6fd7dbaec355f$__6313ab5ce183838151811061147b57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815281516004820152910151602482015260440160006040518083038186803b1580156114dd57600080fd5b505af41580156114f1573d6000803e3d6000fd5b50505050808061150090611f14565b915050611438565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b0316331461157a5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b6044820152606401610180565b6001600160a01b03811660009081527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918dc602052604081205490548114156116295760405162461bcd60e51b815260206004820152602160248201527f435552494f3a20506c6179657220616c726561647920696e697469616c697a6560448201527f64000000000000000000000000000000000000000000000000000000000000006064820152608401610180565b6040517f42b4edac00000000000000000000000000000000000000000000000000000000815273__$7fcaad27f85dd9a0fa019456818c6f9f34$__906342b4edac9061167790600401611e32565b60206040518083038186803b15801561168f57600080fd5b505af41580156116a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116c79190611c61565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b81526004016116f491815260200190565b60206040518083038186803b15801561170c57600080fd5b505afa158015611720573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117449190611c41565b156117915760405162461bcd60e51b815260206004820152601760248201527f435552494f3a20506c61796572206973206163746976650000000000000000006044820152606401610180565b6040517f6d69014700000000000000000000000000000000000000000000000000000000815273__$7fcaad27f85dd9a0fa019456818c6f9f34$__90636d69014790611141908490600401611e60565b82805482825590600052602060002090810192821561182e579160200282015b8281111561182e578251805161181e91849160209091019061183e565b5091602001919060010190611801565b5061183a929150611885565b5090565b828054828255906000526020600020908101928215611879579160200282015b8281111561187957825182559160200191906001019061185e565b5061183a9291506118a2565b8082111561183a57600061189982826118b7565b50600101611885565b5b8082111561183a57600081556001016118a3565b50805460008255906000526020600020908101906118d591906118a2565b50565b600067ffffffffffffffff8311156118f2576118f2611f3b565b611905601f8401601f1916602001611ebf565b905082815283838301111561191957600080fd5b828260208301376000602084830101529392505050565b600082601f830112611940578081fd5b61194f838335602085016118d8565b9392505050565b600060208284031215611967578081fd5b813561194f81611f51565b60008060408385031215611984578081fd5b823561198f81611f51565b915060208381013567ffffffffffffffff808211156119ac578384fd5b818601915086601f8301126119bf578384fd5b81356119d26119cd82611ef0565b611ebf565b8082825285820191508585018a878560051b88010111156119f1578788fd5b875b84811015611a7357813586811115611a0957898afd5b87016040818e03601f19011215611a1e57898afd5b611a26611e96565b8982013588811115611a36578b8cfd5b611a448f8c83860101611930565b8252506040820135915060098210611a5a578a8bfd5b808a0191909152845292870192908701906001016119f3565b50979a909950975050505050505050565b60006020808385031215611a96578182fd5b823567ffffffffffffffff80821115611aad578384fd5b818501915085601f830112611ac0578384fd5b8135611ace6119cd82611ef0565b80828252858201915085850189878560051b8801011115611aed578788fd5b875b84811015611b7e57813586811115611b0557898afd5b8701603f81018c13611b1557898afd5b88810135611b256119cd82611ef0565b808282528b82019150604084018f60408560051b8701011115611b46578d8efd5b8d94505b83851015611b68578035835260019490940193918c01918c01611b4a565b5087525050509287019290870190600101611aef565b50909998505050505050505050565b60006020808385031215611b9f578182fd5b823567ffffffffffffffff811115611bb5578283fd5b8301601f81018513611bc5578283fd5b8035611bd36119cd82611ef0565b80828252848201915084840188868560061b8701011115611bf2578687fd5b8694505b83851015611c3557604080828b031215611c0e578788fd5b611c16611e96565b8235815287830135888201528452600195909501949286019201611bf6565b50979650505050505050565b600060208284031215611c52578081fd5b8151801515811461194f578182fd5b600060208284031215611c72578081fd5b815161194f81611f51565b600080600060608486031215611c91578081fd5b833567ffffffffffffffff80821115611ca8578283fd5b611cb487838801611930565b9450602086013593506040860135915080821115611cd0578283fd5b508401601f81018613611ce1578182fd5b611cf0868235602084016118d8565b9150509250925092565b600060208284031215611d0b578081fd5b5051919050565b60008151808452815b81811015611d3757602081850181015186830182015201611d1b565b81811115611d485782602083870101525b50601f01601f19169290920160200192915050565b600060408083016001600160a01b03861684526020828186015281865180845260608701915060608160051b8801019350828801865b82811015611dee57888603605f1901845281518051888852611db789890182611d12565b9187015191905060098210611dda57634e487b7160e01b8a52602160045260248afd5b968601529284019290840190600101611d93565b50939998505050505050505050565b606081526000611e106060830186611d12565b8460208401528281036040840152611e288185611d12565b9695505050505050565b602081526000611e5a602083016008815267497341637469766560c01b602082015260400190565b92915050565b604081526000611e88604083016008815267497341637469766560c01b602082015260400190565b905082602083015292915050565b6040805190810167ffffffffffffffff81118282101715611eb957611eb9611f3b565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715611ee857611ee8611f3b565b604052919050565b600067ffffffffffffffff821115611f0a57611f0a611f3b565b5060051b60200190565b6000600019821415611f3457634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146118d557600080fdfea2646970667358221220069be0030b9a65f6f26b690b16a98ea47c009aaa7082925297de8ef7106d72b764736f6c63430008040033";

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
