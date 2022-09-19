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
  "0x60806040526000805534801561001457600080fd5b50611f29806100246000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063425e383b1161005b578063425e383b146100c457806371995a7b146100d7578063ac344fb7146100ea578063f1d51bb2146100fd57600080fd5b8063111c248414610082578063384c82a11461009c57806339684ca5146100b1575b600080fd5b61008a610110565b60405190815260200160405180910390f35b6100af6100aa3660046118e3565b61020a565b005b6100af6100bf366004611c0a565b611102565b6100af6100d23660046118ff565b6111fd565b6100af6100e5366004611a11565b6112a8565b6100af6100f8366004611b1a565b611350565b6100af61010b3660046118e3565b611495565b60007f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146101895760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b60448201526064015b60405180910390fd5b73__$7fcaad27f85dd9a0fa019456818c6f9f34$__6364a000b96040518163ffffffff1660e01b815260040160206040518083038186803b1580156101cd57600080fd5b505af41580156101e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102059190611c87565b905090565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b0316331461027c5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b6044820152606401610180565b60408051601f8082526104008201909252600091816020015b6040805180820190915260608152600060208201528152602001906001900390816102955790505060408051608081018252600b9181019182527f4973436f6d706f6e656e7400000000000000000000000000000000000000000060608201529081529091506020810160028152508160008151811061032557634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260039181019182527f5461670000000000000000000000000000000000000000000000000000000000606082015290815290810160018152508160018151811061039857634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600891810191825267497341637469766560c01b60608201529081529081016002815250816002815181106103f657634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600d9181019182527f496e697454696d657374616d7000000000000000000000000000000000000000606082015290815290810160008152508160038151811061046957634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f506f736974696f6e00000000000000000000000000000000000000000000000060608201529081529081016005815250816004815181106104dc57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260059181019182527f4f776e6572000000000000000000000000000000000000000000000000000000606082015290815290810160008152508160058151811061054f57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260059181019182527f4c6576656c00000000000000000000000000000000000000000000000000000060608201529081529081016000815250816006815181106105c257634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f4e616d6500000000000000000000000000000000000000000000000000000000606082015290815290810160018152508160078151811061063557634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f43616e536574746c65000000000000000000000000000000000000000000000060608201529081529081016002815250816008815181106106a857634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600c9181019182527f5265736f75726365547970650000000000000000000000000000000000000000606082015290815290810160018152508160098151811061071b57634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600c9181019182527f4275696c64696e675479706500000000000000000000000000000000000000006060820152908152908101600181525081600a8151811061078e57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f54656d706c6174650000000000000000000000000000000000000000000000006060820152908152908101600081525081600b8151811061080157634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600a9181019182527f43616e50726f64756365000000000000000000000000000000000000000000006060820152908152908101600281525081600c8151811061087457634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260089181019182527f4475726174696f6e0000000000000000000000000000000000000000000000006060820152908152908101600081525081600d815181106108e757634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260129181019182527f42616c616e63654c6173745570646174656400000000000000000000000000006060820152908152908101600081525081600e8151811061095a57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f4d61784865616c746800000000000000000000000000000000000000000000006060820152908152908101600081525081600f815181106109cd57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f4865616c746800000000000000000000000000000000000000000000000000006060820152908152908101600081525081601081518110610a4057634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f41747461636b00000000000000000000000000000000000000000000000000006060820152908152908101600081525081601181518110610ab357634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260079181019182527f446566656e7365000000000000000000000000000000000000000000000000006060820152908152908101600081525081601281518110610b2657634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260059181019182527f53706565640000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601381518110610b9957634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f43697479000000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601481518110610c0c57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f4b656570657200000000000000000000000000000000000000000000000000006060820152908152908101600081525081601581518110610c7f57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f416d6f756e7400000000000000000000000000000000000000000000000000006060820152908152908101600081525081601681518110610cf257634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051608081018252600d9181019182527f496e76656e746f727954797065000000000000000000000000000000000000006060820152908152908101600181525081601781518110610d6557634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f4c6173744d6f76656400000000000000000000000000000000000000000000006060820152908152908101600081525081601881518110610dd857634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f536f7572636500000000000000000000000000000000000000000000000000006060820152908152908101600081525081601981518110610e4b57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f54617267657400000000000000000000000000000000000000000000000000006060820152908152908101600081525081601a81518110610ebe57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260099181019182527f496e76656e746f727900000000000000000000000000000000000000000000006060820152908152908101600081525081601b81518110610f3157634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260079181019182527f41646472657373000000000000000000000000000000000000000000000000006060820152908152908101600481525081601c81518110610fa457634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260069181019182527f54726561747900000000000000000000000000000000000000000000000000006060820152908152908101600481525081601d8151811061101757634e487b7160e01b600052603260045260246000fd5b6020908102919091018101919091526040805160808101825260049181019182527f436f7374000000000000000000000000000000000000000000000000000000006060820152908152908101600081525081601e8151811061108a57634e487b7160e01b600052603260045260246000fd5b60209081029190910101526040516319d37cd760e31b815273__$80f58d039fa8106ab096f6fd7dbaec355f$__9063ce9be6b8906110ce9085908590600401611cea565b60006040518083038186803b1580156110e657600080fd5b505af41580156110fa573d6000803e3d6000fd5b505050505050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146111745760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b6044820152606401610180565b6040517fa99844fd00000000000000000000000000000000000000000000000000000000815273__$7fcaad27f85dd9a0fa019456818c6f9f34$__9063a99844fd906111c890869086908690600401611d8a565b60006040518083038186803b1580156111e057600080fd5b505af41580156111f4573d6000803e3d6000fd5b50505050505050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b0316331461126f5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b6044820152606401610180565b6040516319d37cd760e31b815273__$80f58d039fa8106ab096f6fd7dbaec355f$__9063ce9be6b8906110ce9085908590600401611cea565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b0316331461131a5760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b6044820152606401610180565b805161134c907f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918d790602084019061176e565b5050565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146113c25760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b6044820152606401610180565b60005b815181101561134c5773__$80f58d039fa8106ab096f6fd7dbaec355f$__6313ab5ce183838151811061140857634e487b7160e01b600052603260045260246000fd5b6020908102919091018101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815281516004820152910151602482015260440160006040518083038186803b15801561146a57600080fd5b505af415801561147e573d6000803e3d6000fd5b50505050808061148d90611ea1565b9150506113c5565b7f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae72fba086600201546001600160a01b031633146115075760405162461bcd60e51b815260206004820152601360248201527210d5549253ce88155b985d5d1a1bdc9a5e9959606a1b6044820152606401610180565b6001600160a01b03811660009081527f55a00bec60f0186444b50c10b732dd4123adc4f1d8b00b50012262ae747918dd602052604081205490548114156115b65760405162461bcd60e51b815260206004820152602160248201527f435552494f3a20506c6179657220616c726561647920696e697469616c697a6560448201527f64000000000000000000000000000000000000000000000000000000000000006064820152608401610180565b6040517f42b4edac00000000000000000000000000000000000000000000000000000000815273__$7fcaad27f85dd9a0fa019456818c6f9f34$__906342b4edac9061160490600401611dbf565b60206040518083038186803b15801561161c57600080fd5b505af4158015611630573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116549190611bee565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b815260040161168191815260200190565b60206040518083038186803b15801561169957600080fd5b505afa1580156116ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116d19190611bce565b1561171e5760405162461bcd60e51b815260206004820152601760248201527f435552494f3a20506c61796572206973206163746976650000000000000000006044820152606401610180565b6040517f6d69014700000000000000000000000000000000000000000000000000000000815273__$7fcaad27f85dd9a0fa019456818c6f9f34$__90636d690147906110ce908490600401611ded565b8280548282559060005260206000209081019282156117bb579160200282015b828111156117bb57825180516117ab9184916020909101906117cb565b509160200191906001019061178e565b506117c7929150611812565b5090565b828054828255906000526020600020908101928215611806579160200282015b828111156118065782518255916020019190600101906117eb565b506117c792915061182f565b808211156117c75760006118268282611844565b50600101611812565b5b808211156117c75760008155600101611830565b5080546000825590600052602060002090810190611862919061182f565b50565b600067ffffffffffffffff83111561187f5761187f611ec8565b611892601f8401601f1916602001611e4c565b90508281528383830111156118a657600080fd5b828260208301376000602084830101529392505050565b600082601f8301126118cd578081fd5b6118dc83833560208501611865565b9392505050565b6000602082840312156118f4578081fd5b81356118dc81611ede565b60008060408385031215611911578081fd5b823561191c81611ede565b915060208381013567ffffffffffffffff80821115611939578384fd5b818601915086601f83011261194c578384fd5b813561195f61195a82611e7d565b611e4c565b8082825285820191508585018a878560051b880101111561197e578788fd5b875b84811015611a005781358681111561199657898afd5b87016040818e03601f190112156119ab57898afd5b6119b3611e23565b89820135888111156119c3578b8cfd5b6119d18f8c838601016118bd565b82525060408201359150600982106119e7578a8bfd5b808a019190915284529287019290870190600101611980565b50979a909950975050505050505050565b60006020808385031215611a23578182fd5b823567ffffffffffffffff80821115611a3a578384fd5b818501915085601f830112611a4d578384fd5b8135611a5b61195a82611e7d565b80828252858201915085850189878560051b8801011115611a7a578788fd5b875b84811015611b0b57813586811115611a9257898afd5b8701603f81018c13611aa257898afd5b88810135611ab261195a82611e7d565b808282528b82019150604084018f60408560051b8701011115611ad3578d8efd5b8d94505b83851015611af5578035835260019490940193918c01918c01611ad7565b5087525050509287019290870190600101611a7c565b50909998505050505050505050565b60006020808385031215611b2c578182fd5b823567ffffffffffffffff811115611b42578283fd5b8301601f81018513611b52578283fd5b8035611b6061195a82611e7d565b80828252848201915084840188868560061b8701011115611b7f578687fd5b8694505b83851015611bc257604080828b031215611b9b578788fd5b611ba3611e23565b8235815287830135888201528452600195909501949286019201611b83565b50979650505050505050565b600060208284031215611bdf578081fd5b815180151581146118dc578182fd5b600060208284031215611bff578081fd5b81516118dc81611ede565b600080600060608486031215611c1e578081fd5b833567ffffffffffffffff80821115611c35578283fd5b611c41878388016118bd565b9450602086013593506040860135915080821115611c5d578283fd5b508401601f81018613611c6e578182fd5b611c7d86823560208401611865565b9150509250925092565b600060208284031215611c98578081fd5b5051919050565b60008151808452815b81811015611cc457602081850181015186830182015201611ca8565b81811115611cd55782602083870101525b50601f01601f19169290920160200192915050565b600060408083016001600160a01b03861684526020828186015281865180845260608701915060608160051b8801019350828801865b82811015611d7b57888603605f1901845281518051888852611d4489890182611c9f565b9187015191905060098210611d6757634e487b7160e01b8a52602160045260248afd5b968601529284019290840190600101611d20565b50939998505050505050505050565b606081526000611d9d6060830186611c9f565b8460208401528281036040840152611db58185611c9f565b9695505050505050565b602081526000611de7602083016008815267497341637469766560c01b602082015260400190565b92915050565b604081526000611e15604083016008815267497341637469766560c01b602082015260400190565b905082602083015292915050565b6040805190810167ffffffffffffffff81118282101715611e4657611e46611ec8565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715611e7557611e75611ec8565b604052919050565b600067ffffffffffffffff821115611e9757611e97611ec8565b5060051b60200190565b6000600019821415611ec157634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461186257600080fdfea264697066735822122088eeb9c6d2deb17b0772fa1c7544dcedec9202edcf45239a88e5e057f38dd53464736f6c63430008040033";

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
