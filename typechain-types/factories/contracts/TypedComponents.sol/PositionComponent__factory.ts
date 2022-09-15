/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  PositionComponent,
  PositionComponentInterface,
} from "../../../contracts/TypedComponents.sol/PositionComponent";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_gameAddr",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getAllEntitiesAndValues",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "",
        type: "bytes[]",
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
    name: "getBytesValue",
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
    inputs: [],
    name: "getEntities",
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
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
    ],
    name: "getEntitiesWithValue",
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
        name: "_value",
        type: "tuple",
      },
    ],
    name: "getEntitiesWithValue",
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
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "getValue",
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
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "has",
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
        internalType: "uint256",
        name: "_entity",
        type: "uint256",
      },
    ],
    name: "remove",
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
      {
        internalType: "bytes",
        name: "_value",
        type: "bytes",
      },
    ],
    name: "set",
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
        name: "_value",
        type: "tuple",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052604051610010906100a5565b604051809103906000f08015801561002c573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561006157600080fd5b50604051611be2380380611be2833981016040819052610080916100b2565b600080546001600160a01b0319166001600160a01b03929092169190911790556100e0565b610529806116b983390190565b6000602082840312156100c3578081fd5b81516001600160a01b03811681146100d9578182fd5b9392505050565b6115ca806100ef6000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c80638b28294711610076578063b361be461161005b578063b361be461461017c578063cccf7a8e1461018f578063fd4ab6d8146101b257600080fd5b80638b282947146101565780638bbf68fe1461016957600080fd5b80634c518fdc116100a75780634c518fdc1461010b5780634cc822151461012b57806378d9f34f1461014057600080fd5b80630ff4c916146100c357806331b933b9146100f6575b600080fd5b6100d66100d1366004610d82565b6101c5565b604080518251815260209283015192810192909252015b60405180910390f35b6100fe6101fb565b6040516100ed9190610f2b565b61011e610119366004610d82565b61029a565b6040516100ed9190610faf565b61013e610139366004610d82565b61033c565b005b610148610462565b6040516100ed929190610f3e565b61013e610164366004610d9a565b61066a565b61013e610177366004610ddf565b6108a7565b6100fe61018a366004610cde565b6108e2565b6101a261019d366004610d82565b6109a8565b60405190151581526020016100ed565b6100fe6101c0366004610d19565b610a3e565b60408051808201909152600080825260208201526101e28261029a565b8060200190518101906101f59190610d34565b92915050565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b15801561025957600080fd5b505afa15801561026d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102959190810190610c16565b905090565b60008181526002602052604090208054606091906102b790610ff3565b80601f01602080910402602001604051908101604052809291908181526020018280546102e390610ff3565b80156103305780601f1061030557610100808354040283529160200191610330565b820191906000526020600020905b81548152906001019060200180831161031357829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b15801561038257600080fd5b505af1158015610396573d6000803e3d6000fd5b505050600082815260026020526040808220905191925060039183916103bb91610e90565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461044757604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561042e57600080fd5b505af1158015610442573d6000803e3d6000fd5b505050505b600082815260026020526040812061045e91610a7a565b5050565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b1580156104b557600080fd5b505afa1580156104c9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104f19190810190610c16565b90506000815167ffffffffffffffff81111561051d57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561055057816020015b606081526020019060019003908161053b5790505b50905060005b8251811015610660576002600084838151811061058357634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002080546105a490610ff3565b80601f01602080910402602001604051908101604052809291908181526020018280546105d090610ff3565b801561061d5780601f106105f25761010080835404028352916020019161061d565b820191906000526020600020905b81548152906001019060200180831161060057829003601f168201915b505050505082828151811061064257634e487b7160e01b600052603260045260246000fd5b602002602001018190525080806106589061102e565b915050610556565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156106b057600080fd5b505af11580156106c4573d6000803e3d6000fd5b505050600083815260026020526040808220905191925060039183916106e991610e90565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461077557604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561075c57600080fd5b505af1158015610770573d6000803e3d6000fd5b505050505b6000838152600260209081526040909120835161079492850190610ab7565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b0391821691161415610836576040516107d490610b3b565b604051809103906000f0801580156107f0573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b15801561088957600080fd5b505af115801561089d573d6000803e3d6000fd5b5050505050505050565b61045e82826040516020016108ce9190815181526020918201519181019190915260400190565b60405160208183030381529060405261066a565b80516020808301919091206000908152600390915260409020546004546060916001600160a01b03908116911681141561092c575050604080516000815260208101909152919050565b806001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561096557600080fd5b505afa158015610979573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109a19190810190610c16565b9392505050565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a9060240160206040518083038186803b158015610a0657600080fd5b505afa158015610a1a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101f59190610cbe565b60606101f582604051602001610a669190815181526020918201519181019190915260400190565b6040516020818303038152906040526108e2565b508054610a8690610ff3565b6000825580601f10610a96575050565b601f016020900490600052602060002090810190610ab49190610b48565b50565b828054610ac390610ff3565b90600052602060002090601f016020900481019282610ae55760008555610b2b565b82601f10610afe57805160ff1916838001178555610b2b565b82800160010185558215610b2b579182015b82811115610b2b578251825591602001919060010190610b10565b50610b37929150610b48565b5090565b6105298061106c83390190565b5b80821115610b375760008155600101610b49565b600082601f830112610b6d578081fd5b813567ffffffffffffffff811115610b8757610b87611055565b610b9a601f8201601f1916602001610fc2565b818152846020838601011115610bae578283fd5b816020850160208301379081016020019190915292915050565b600060408284031215610bd9578081fd5b6040516040810181811067ffffffffffffffff82111715610bfc57610bfc611055565b604052823581526020928301359281019290925250919050565b60006020808385031215610c28578182fd5b825167ffffffffffffffff80821115610c3f578384fd5b818501915085601f830112610c52578384fd5b815181811115610c6457610c64611055565b8060051b9150610c75848301610fc2565b8181528481019084860184860187018a1015610c8f578788fd5b8795505b83861015610cb1578051835260019590950194918601918601610c93565b5098975050505050505050565b600060208284031215610ccf578081fd5b815180151581146109a1578182fd5b600060208284031215610cef578081fd5b813567ffffffffffffffff811115610d05578182fd5b610d1184828501610b5d565b949350505050565b600060408284031215610d2a578081fd5b6109a18383610bc8565b600060408284031215610d45578081fd5b6040516040810181811067ffffffffffffffff82111715610d6857610d68611055565b604052825181526020928301519281019290925250919050565b600060208284031215610d93578081fd5b5035919050565b60008060408385031215610dac578081fd5b82359150602083013567ffffffffffffffff811115610dc9578182fd5b610dd585828601610b5d565b9150509250929050565b60008060608385031215610df1578182fd5b82359150610e028460208501610bc8565b90509250929050565b6000815180845260208085019450808401835b83811015610e3a57815187529582019590820190600101610e1e565b509495945050505050565b60008151808452815b81811015610e6a57602081850181015186830182015201610e4e565b81811115610e7b5782602083870101525b50601f01601f19169290920160200192915050565b600080835482600182811c915080831680610eac57607f831692505b6020808410821415610ecc57634e487b7160e01b87526022600452602487fd5b818015610ee05760018114610ef157610f1d565b60ff19861689528489019650610f1d565b60008a815260209020885b86811015610f155781548b820152908501908301610efc565b505084890196505b509498975050505050505050565b6020815260006109a16020830184610e0b565b604081526000610f516040830185610e0b565b6020838203818501528185518084528284019150828160051b850101838801865b83811015610fa057601f19878403018552610f8e838351610e45565b94860194925090850190600101610f72565b50909998505050505050505050565b6020815260006109a16020830184610e45565b604051601f8201601f1916810167ffffffffffffffff81118282101715610feb57610feb611055565b604052919050565b600181811c9082168061100757607f821691505b6020821081141561102857634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561104e57634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fdfe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220c5125dee1c12e8ad1b167aca540ced323c70a2b8e9fe9ce04890e171002491b264736f6c63430008040033a264697066735822122068dd566bcf556dccda1ee4081b151fc3a75ae2d44319853471f826f0e456e62c64736f6c63430008040033608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220c5125dee1c12e8ad1b167aca540ced323c70a2b8e9fe9ce04890e171002491b264736f6c63430008040033";

type PositionComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PositionComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PositionComponent__factory extends ContractFactory {
  constructor(...args: PositionComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PositionComponent> {
    return super.deploy(
      _gameAddr,
      overrides || {}
    ) as Promise<PositionComponent>;
  }
  override getDeployTransaction(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gameAddr, overrides || {});
  }
  override attach(address: string): PositionComponent {
    return super.attach(address) as PositionComponent;
  }
  override connect(signer: Signer): PositionComponent__factory {
    return super.connect(signer) as PositionComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PositionComponentInterface {
    return new utils.Interface(_abi) as PositionComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PositionComponent {
    return new Contract(address, _abi, signerOrProvider) as PositionComponent;
  }
}
