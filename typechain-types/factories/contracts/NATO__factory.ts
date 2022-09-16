/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { NATO, NATOInterface } from "../../contracts/NATO";

const _abi = [
  {
    inputs: [],
    name: "approveMoveArmy",
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
    inputs: [],
    name: "denounceTreaty",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isMemberStates",
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
    inputs: [],
    name: "joinTreaty",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "memberStates",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061060d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806399665ca31161005057806399665ca3146100b4578063a67a6bbe146100bc578063a9a7aef9146100c457600080fd5b806314b0528e1461006c5780636008e5b714610089575b600080fd5b6100746100e7565b60405190151581526020015b60405180910390f35b61009c6100973660046104fc565b610284565b6040516001600160a01b039091168152602001610080565b6100746102ae565b61007461039a565b6100746100d23660046104ce565b60016020526000908152604090205460ff1681565b600080543390825b8181101561015457826001600160a01b03166000828154811061012257634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546001600160a01b0316141561014257610154565b8061014c8161057e565b9150506100ef565b6000610161600184610567565b8154811061017f57634e487b7160e01b600052603260045260246000fd5b600091825260208220015481546001600160a01b039091169190839081106101b757634e487b7160e01b600052603260045260246000fd5b60009182526020822001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03939093169290921790915580548061020a57634e487b7160e01b600052603160045260246000fd5b600082815260208082208301600019908101805473ffffffffffffffffffffffffffffffffffffffff191690559092019092556001600160a01b038516825260018152604091829020805460ff19169055815160608101909252602880835261027a92916105b090830139610439565b6001935050505090565b6000818154811061029457600080fd5b6000918252602090912001546001600160a01b0316905081565b3360008181526001602052604081205490919060ff16610354576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f4e41544f3a204e6174696f6e206973206e6f742062696e64656420627920746860448201527f6520547265617479000000000000000000000000000000000000000000000000606482015260840160405180910390fd5b6103926040518060400160405280601581526020017f4e41544f3a20416374696f6e20417070726f7665640000000000000000000000815250610439565b600191505090565b60008054600181810183557f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563909101805473ffffffffffffffffffffffffffffffffffffffff19163390811790915580835260208281526040808520805460ff19169094179093558251808401909352601583527f4e41544f3a2057656c636f6d6520746f204e41544f00000000000000000000009083015290610392905b6104aa8160405160240161044d9190610514565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f41304fac000000000000000000000000000000000000000000000000000000001790526104ad565b50565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b6000602082840312156104df578081fd5b81356001600160a01b03811681146104f5578182fd5b9392505050565b60006020828403121561050d578081fd5b5035919050565b6000602080835283518082850152825b8181101561054057858101830151858201604001528201610524565b818111156105515783604083870101525b50601f01601f1916929092016040019392505050565b60008282101561057957610579610599565b500390565b600060001982141561059257610592610599565b5060010190565b634e487b7160e01b600052601160045260246000fdfe4e41544f3a205765277265207265677265742061626f757420796f7572207769746864726177616ca26469706673582212204e154016edf2ae0f5d0e8c0b88493420922412bd65a07adc284020010420e4a464736f6c63430008040033";

type NATOConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NATOConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NATO__factory extends ContractFactory {
  constructor(...args: NATOConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NATO> {
    return super.deploy(overrides || {}) as Promise<NATO>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NATO {
    return super.attach(address) as NATO;
  }
  override connect(signer: Signer): NATO__factory {
    return super.connect(signer) as NATO__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NATOInterface {
    return new utils.Interface(_abi) as NATOInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): NATO {
    return new Contract(address, _abi, signerOrProvider) as NATO;
  }
}
