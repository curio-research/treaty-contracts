/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Getters, GettersInterface } from "../Getters";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract Game",
        name: "_gameCore",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "bulkGetAllItems",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "mineable",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "craftable",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "occupiable",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "strength",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "healthDamage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "energyDamage",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "mineItemIds",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "craftItemIds",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "craftItemAmounts",
            type: "uint256[]",
          },
        ],
        internalType: "struct GameTypes.ItemWithMetadata[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bulkGetAllPlayerData",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "initialized",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "alive",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "initTimestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "playerAddr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "health",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "energy",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reach",
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
            internalType: "struct GameTypes.Position",
            name: "position",
            type: "tuple",
          },
        ],
        internalType: "struct GameTypes.PlayerData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200135138038062001351833981810160405281019062000037919062000095565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505062000123565b6000815190506200008f8162000109565b92915050565b600060208284031215620000a857600080fd5b6000620000b8848285016200007e565b91505092915050565b6000620000ce82620000e9565b9050919050565b6000620000e282620000c1565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6200011481620000d5565b81146200012057600080fd5b50565b61121e80620001336000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80637dbefbac1461003b578063fab6a1b814610059575b600080fd5b610043610077565b6040516100509190610ed9565b60405180910390f35b6100616102f6565b60405161006e9190610eb7565b60405180910390f35b606060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f261e076040518163ffffffff1660e01b815260040160006040518083038186803b1580156100e257600080fd5b505afa1580156100f6573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061011f9190610a62565b90506000815167ffffffffffffffff811115610164577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405190808252806020026020018201604052801561019d57816020015b61018a6105f0565b8152602001906001900390816101825790505b50905060005b82518110156102ed5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663908b9f17848381518110610221577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101516040518263ffffffff1660e01b81526004016102459190610e9c565b6101206040518083038186803b15801561025e57600080fd5b505afa158015610272573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102969190610ae4565b8282815181106102cf577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018190525080806102e5906110eb565b9150506101a3565b50809250505090565b60606000600160008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638bce7fab6040518163ffffffff1660e01b815260040160206040518083038186803b15801561036257600080fd5b505afa158015610376573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061039a9190610b0e565b6103a4919061103e565b67ffffffffffffffff8111156103e3577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405190808252806020026020018201604052801561041c57816020015b610409610655565b8152602001906001900390816104015790505b5090506000600190505b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638bce7fab6040518163ffffffff1660e01b815260040160206040518083038186803b15801561048c57600080fd5b505afa1580156104a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104c49190610b0e565b8110156105e85760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663801b83db600183610514919061103e565b6040518263ffffffff1660e01b81526004016105309190610efb565b60006040518083038186803b15801561054857600080fd5b505afa15801561055c573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906105859190610aa3565b82600183610593919061103e565b815181106105ca577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018190525080806105e0906110eb565b915050610426565b508091505090565b60405180610100016040528060001515815260200160001515815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081526020016000815260200161064f6106a7565b81525090565b6040518061012001604052806000151581526020016000151581526020016000151581526020016000815260200160008152602001600081526020016060815260200160608152602001606081525090565b604051806040016040528060008152602001600081525090565b60006106d46106cf84610f3b565b610f16565b905080838252602082019050828560208602820111156106f357600080fd5b60005b8581101561072357816107098882610799565b8452602084019350602083019250506001810190506106f6565b5050509392505050565b600061074061073b84610f67565b610f16565b9050808382526020820190508285602086028201111561075f57600080fd5b60005b8581101561078f57816107758882610a4d565b845260208401935060208301925050600181019050610762565b5050509392505050565b6000815190506107a8816111a3565b92915050565b600082601f8301126107bf57600080fd5b81516107cf8482602086016106c1565b91505092915050565b600082601f8301126107e957600080fd5b81516107f984826020860161072d565b91505092915050565b600081519050610811816111ba565b92915050565b6000610120828403121561082a57600080fd5b610835610120610f16565b9050600061084584828501610802565b600083015250602061085984828501610802565b602083015250604061086d84828501610802565b604083015250606061088184828501610a4d565b606083015250608061089584828501610a4d565b60808301525060a06108a984828501610a4d565b60a08301525060c082015167ffffffffffffffff8111156108c957600080fd5b6108d5848285016107d8565b60c08301525060e082015167ffffffffffffffff8111156108f557600080fd5b610901848285016107d8565b60e08301525061010082015167ffffffffffffffff81111561092257600080fd5b61092e848285016107d8565b6101008301525092915050565b6000610120828403121561094e57600080fd5b610959610100610f16565b9050600061096984828501610802565b600083015250602061097d84828501610802565b602083015250604061099184828501610a4d565b60408301525060606109a584828501610799565b60608301525060806109b984828501610a4d565b60808301525060a06109cd84828501610a4d565b60a08301525060c06109e184828501610a4d565b60c08301525060e06109f584828501610a01565b60e08301525092915050565b600060408284031215610a1357600080fd5b610a1d6040610f16565b90506000610a2d84828501610a4d565b6000830152506020610a4184828501610a4d565b60208301525092915050565b600081519050610a5c816111d1565b92915050565b600060208284031215610a7457600080fd5b600082015167ffffffffffffffff811115610a8e57600080fd5b610a9a848285016107ae565b91505092915050565b600060208284031215610ab557600080fd5b600082015167ffffffffffffffff811115610acf57600080fd5b610adb84828501610817565b91505092915050565b60006101208284031215610af757600080fd5b6000610b058482850161093b565b91505092915050565b600060208284031215610b2057600080fd5b6000610b2e84828501610a4d565b91505092915050565b6000610b438383610cda565b905092915050565b6000610b578383610dad565b6101208301905092915050565b6000610b708383610e7e565b60208301905092915050565b610b8581611072565b82525050565b610b9481611072565b82525050565b6000610ba582610fc3565b610baf818561100b565b935083602082028501610bc185610f93565b8060005b85811015610bfd5784840389528151610bde8582610b37565b9450610be983610fe4565b925060208a01995050600181019050610bc5565b50829750879550505050505092915050565b6000610c1a82610fce565b610c24818561101c565b9350610c2f83610fa3565b8060005b83811015610c60578151610c478882610b4b565b9750610c5283610ff1565b925050600181019050610c33565b5085935050505092915050565b6000610c7882610fd9565b610c82818561102d565b9350610c8d83610fb3565b8060005b83811015610cbe578151610ca58882610b64565b9750610cb083610ffe565b925050600181019050610c91565b5085935050505092915050565b610cd481611084565b82525050565b600061012083016000830151610cf36000860182610ccb565b506020830151610d066020860182610ccb565b506040830151610d196040860182610ccb565b506060830151610d2c6060860182610e7e565b506080830151610d3f6080860182610e7e565b5060a0830151610d5260a0860182610e7e565b5060c083015184820360c0860152610d6a8282610c6d565b91505060e083015184820360e0860152610d848282610c6d565b915050610100830151848203610100860152610da08282610c6d565b9150508091505092915050565b61012082016000820151610dc46000850182610ccb565b506020820151610dd76020850182610ccb565b506040820151610dea6040850182610e7e565b506060820151610dfd6060850182610b7c565b506080820151610e106080850182610e7e565b5060a0820151610e2360a0850182610e7e565b5060c0820151610e3660c0850182610e7e565b5060e0820151610e4960e0850182610e4f565b50505050565b604082016000820151610e656000850182610e7e565b506020820151610e786020850182610e7e565b50505050565b610e87816110b0565b82525050565b610e96816110b0565b82525050565b6000602082019050610eb16000830184610b8b565b92915050565b60006020820190508181036000830152610ed18184610b9a565b905092915050565b60006020820190508181036000830152610ef38184610c0f565b905092915050565b6000602082019050610f106000830184610e8d565b92915050565b6000610f20610f31565b9050610f2c82826110ba565b919050565b6000604051905090565b600067ffffffffffffffff821115610f5657610f55611163565b5b602082029050602081019050919050565b600067ffffffffffffffff821115610f8257610f81611163565b5b602082029050602081019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000602082019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000611049826110b0565b9150611054836110b0565b92508282101561106757611066611134565b5b828203905092915050565b600061107d82611090565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6110c382611192565b810181811067ffffffffffffffff821117156110e2576110e1611163565b5b80604052505050565b60006110f6826110b0565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561112957611128611134565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6111ac81611072565b81146111b757600080fd5b50565b6111c381611084565b81146111ce57600080fd5b50565b6111da816110b0565b81146111e557600080fd5b5056fea264697066735822122005b8370a94aaaa149ceb81609d9225f4110ccc462b0518d2facbf717cdd79f1e64736f6c63430008040033";

type GettersConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GettersConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Getters__factory extends ContractFactory {
  constructor(...args: GettersConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _gameCore: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Getters> {
    return super.deploy(_gameCore, overrides || {}) as Promise<Getters>;
  }
  getDeployTransaction(
    _gameCore: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gameCore, overrides || {});
  }
  attach(address: string): Getters {
    return super.attach(address) as Getters;
  }
  connect(signer: Signer): Getters__factory {
    return super.connect(signer) as Getters__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GettersInterface {
    return new utils.Interface(_abi) as GettersInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Getters {
    return new Contract(address, _abi, signerOrProvider) as Getters;
  }
}
