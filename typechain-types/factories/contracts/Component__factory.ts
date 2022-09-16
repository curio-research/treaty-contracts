/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Component, ComponentInterface } from "../../contracts/Component";

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
];

const _bytecode =
  "0x6080604052604051610010906100a5565b604051809103906000f08015801561002c573d6000803e3d6000fd5b50600180546001600160a01b03929092166001600160a01b031992831617905560048054909116905534801561006157600080fd5b506040516119c73803806119c7833981016040819052610080916100b2565b600080546001600160a01b0319166001600160a01b03929092169190911790556100e0565b6105298061149e83390190565b6000602082840312156100c3578081fd5b81516001600160a01b03811681146100d9578182fd5b9392505050565b6113af806100ef6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806378d9f34f1161005b57806378d9f34f146100d55780638b282947146100eb578063b361be46146100fe578063cccf7a8e1461011157600080fd5b806331b933b9146100825780634c518fdc146100a05780634cc82215146100c0575b600080fd5b61008a610134565b6040516100979190610d10565b60405180910390f35b6100b36100ae366004610b93565b6101d3565b6040516100979190610d94565b6100d36100ce366004610b93565b610275565b005b6100dd61039b565b604051610097929190610d23565b6100d36100f9366004610bab565b6105a3565b61008a61010c366004610b58565b6107e0565b61012461011f366004610b93565b6108a6565b6040519015158152602001610097565b600154604080517f53ed514300000000000000000000000000000000000000000000000000000000815290516060926001600160a01b0316916353ed5143916004808301926000929190829003018186803b15801561019257600080fd5b505afa1580156101a6573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101ce9190810190610a90565b905090565b60008181526002602052604090208054606091906101f090610dd8565b80601f016020809104026020016040519081016040528092919081815260200182805461021c90610dd8565b80156102695780601f1061023e57610100808354040283529160200191610269565b820191906000526020600020905b81548152906001019060200180831161024c57829003601f168201915b50505050509050919050565b600154604051634cc8221560e01b8152600481018390526001600160a01b0390911690634cc8221590602401600060405180830381600087803b1580156102bb57600080fd5b505af11580156102cf573d6000803e3d6000fd5b505050600082815260026020526040808220905191925060039183916102f491610c75565b60408051918290039091208252602082019290925201600020546004546001600160a01b03918216925016811461038057604051634cc8221560e01b8152600481018390526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561036757600080fd5b505af115801561037b573d6000803e3d6000fd5b505050505b600082815260026020526040812061039791610942565b5050565b6060806000600160009054906101000a90046001600160a01b03166001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b1580156103ee57600080fd5b505afa158015610402573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261042a9190810190610a90565b90506000815167ffffffffffffffff81111561045657634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561048957816020015b60608152602001906001900390816104745790505b50905060005b825181101561059957600260008483815181106104bc57634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002080546104dd90610dd8565b80601f016020809104026020016040519081016040528092919081815260200182805461050990610dd8565b80156105565780601f1061052b57610100808354040283529160200191610556565b820191906000526020600020905b81548152906001019060200180831161053957829003601f168201915b505050505082828151811061057b57634e487b7160e01b600052603260045260246000fd5b6020026020010181905250808061059190610e13565b91505061048f565b5090939092509050565b600154604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156105e957600080fd5b505af11580156105fd573d6000803e3d6000fd5b5050506000838152600260205260408082209051919250600391839161062291610c75565b60408051918290039091208252602082019290925201600020546004546001600160a01b0391821692501681146106ae57604051634cc8221560e01b8152600481018490526001600160a01b03821690634cc8221590602401600060405180830381600087803b15801561069557600080fd5b505af11580156106a9573d6000803e3d6000fd5b505050505b600083815260026020908152604090912083516106cd9285019061097f565b5081516020808401919091206004546000828152600390935260409092205490916001600160a01b039182169116141561076f5760405161070d90610a03565b604051809103906000f080158015610729573d6000803e3d6000fd5b50600082815260036020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03929092169190911790555b60008181526003602052604090819020549051630801f16960e11b8152600481018690526001600160a01b0390911690631003e2d290602401600060405180830381600087803b1580156107c257600080fd5b505af11580156107d6573d6000803e3d6000fd5b5050505050505050565b80516020808301919091206000908152600390915260409020546004546060916001600160a01b03908116911681141561082a575050604080516000815260208101909152919050565b806001600160a01b03166353ed51436040518163ffffffff1660e01b815260040160006040518083038186803b15801561086357600080fd5b505afa158015610877573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261089f9190810190610a90565b9392505050565b6001546040517f9f161b0a000000000000000000000000000000000000000000000000000000008152600481018390526000916001600160a01b031690639f161b0a9060240160206040518083038186803b15801561090457600080fd5b505afa158015610918573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093c9190610b38565b92915050565b50805461094e90610dd8565b6000825580601f1061095e575050565b601f01602090049060005260206000209081019061097c9190610a10565b50565b82805461098b90610dd8565b90600052602060002090601f0160209004810192826109ad57600085556109f3565b82601f106109c657805160ff19168380011785556109f3565b828001600101855582156109f3579182015b828111156109f35782518255916020019190600101906109d8565b506109ff929150610a10565b5090565b61052980610e5183390190565b5b808211156109ff5760008155600101610a11565b600082601f830112610a35578081fd5b813567ffffffffffffffff811115610a4f57610a4f610e3a565b610a62601f8201601f1916602001610da7565b818152846020838601011115610a76578283fd5b816020850160208301379081016020019190915292915050565b60006020808385031215610aa2578182fd5b825167ffffffffffffffff80821115610ab9578384fd5b818501915085601f830112610acc578384fd5b815181811115610ade57610ade610e3a565b8060051b9150610aef848301610da7565b8181528481019084860184860187018a1015610b09578788fd5b8795505b83861015610b2b578051835260019590950194918601918601610b0d565b5098975050505050505050565b600060208284031215610b49578081fd5b8151801515811461089f578182fd5b600060208284031215610b69578081fd5b813567ffffffffffffffff811115610b7f578182fd5b610b8b84828501610a25565b949350505050565b600060208284031215610ba4578081fd5b5035919050565b60008060408385031215610bbd578081fd5b82359150602083013567ffffffffffffffff811115610bda578182fd5b610be685828601610a25565b9150509250929050565b6000815180845260208085019450808401835b83811015610c1f57815187529582019590820190600101610c03565b509495945050505050565b60008151808452815b81811015610c4f57602081850181015186830182015201610c33565b81811115610c605782602083870101525b50601f01601f19169290920160200192915050565b600080835482600182811c915080831680610c9157607f831692505b6020808410821415610cb157634e487b7160e01b87526022600452602487fd5b818015610cc55760018114610cd657610d02565b60ff19861689528489019650610d02565b60008a815260209020885b86811015610cfa5781548b820152908501908301610ce1565b505084890196505b509498975050505050505050565b60208152600061089f6020830184610bf0565b604081526000610d366040830185610bf0565b6020838203818501528185518084528284019150828160051b850101838801865b83811015610d8557601f19878403018552610d73838351610c2a565b94860194925090850190600101610d57565b50909998505050505050505050565b60208152600061089f6020830184610c2a565b604051601f8201601f1916810167ffffffffffffffff81118282101715610dd057610dd0610e3a565b604052919050565b600181811c90821680610dec57607f821691505b60208210811415610e0d57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415610e3357634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fdfe608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea264697066735822122067dd75a817f8b30be99f8653f61f8b18f9d9b3be3732be6f5c05ec93c23fd23d64736f6c63430008040033a2646970667358221220bc102bf6df76c1755adc2179836cb35fe1da6794fb65a357292c3453906a47d564736f6c63430008040033608060405234801561001057600080fd5b50610509806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806391d40c831161005057806391d40c83146100bd578063949d225d146100d05780639f161b0a146100e157600080fd5b80631003e2d2146100775780634cc822151461008c57806353ed51431461009f575b600080fd5b61008a610085366004610419565b610104565b005b61008a61009a366004610419565b61016d565b6100a7610253565b6040516100b49190610431565b60405180910390f35b61008a6100cb366004610359565b6102ab565b6000546040519081526020016100b4565b6100f46100ef366004610419565b6102fd565b60405190151581526020016100b4565b61010d816102fd565b156101155750565b60008054600181810183559180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630182905561015160005490565b61015b9190610475565b60009182526001602052604090912055565b610176816102fd565b61017d5750565b60008181526001602081905260408220549190819061019b60005490565b6101a59190610475565b815481106101c357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600083815481106101f257634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260019091526040808220849055848252812081905580548061023857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055505050565b606060008054806020026020016040519081016040528092919081815260200182805480156102a157602002820191906000526020600020905b81548152602001906001019080831161028d575b5050505050905090565b60005b81518110156102f9576102e78282815181106102da57634e487b7160e01b600052603260045260246000fd5b6020026020010151610104565b806102f18161048c565b9150506102ae565b5050565b6000805461030d57506000919050565b6000828152600160205260409020541515806103535750816000808154811061034657634e487b7160e01b600052603260045260246000fd5b9060005260206000200154145b92915050565b6000602080838503121561036b578182fd5b823567ffffffffffffffff80821115610382578384fd5b818501915085601f830112610395578384fd5b8135818111156103a7576103a76104bd565b8060051b604051601f19603f830116810181811085821117156103cc576103cc6104bd565b604052828152858101935084860182860187018a10156103ea578788fd5b8795505b8386101561040c5780358552600195909501949386019386016103ee565b5098975050505050505050565b60006020828403121561042a578081fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156104695783518352928401929184019160010161044d565b50909695505050505050565b600082821015610487576104876104a7565b500390565b60006000198214156104a0576104a06104a7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea264697066735822122067dd75a817f8b30be99f8653f61f8b18f9d9b3be3732be6f5c05ec93c23fd23d64736f6c63430008040033";

type ComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Component__factory extends ContractFactory {
  constructor(...args: ComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Component> {
    return super.deploy(_gameAddr, overrides || {}) as Promise<Component>;
  }
  override getDeployTransaction(
    _gameAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gameAddr, overrides || {});
  }
  override attach(address: string): Component {
    return super.attach(address) as Component;
  }
  override connect(signer: Signer): Component__factory {
    return super.connect(signer) as Component__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ComponentInterface {
    return new utils.Interface(_abi) as ComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Component {
    return new Contract(address, _abi, signerOrProvider) as Component;
  }
}
