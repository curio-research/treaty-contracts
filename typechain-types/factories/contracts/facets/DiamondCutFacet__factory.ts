/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  DiamondCutFacet,
  DiamondCutFacetInterface,
} from "../../../contracts/facets/DiamondCutFacet";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        indexed: false,
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "DiamondCut",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "diamondCut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611345806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80631f931c1c14610030575b600080fd5b61004361003e366004610ee5565b610045565b005b61004d6102a5565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131e547fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c9061ffff8116908190600090600716156100bc5750600381901c60009081526001840160205260409020545b60005b888110156101dd576101c683838c8c858181106100ec57634e487b7160e01b600052603260045260246000fd5b90506020028101906100fe91906111db565b61010c906020810190610ec4565b8d8d8681811061012c57634e487b7160e01b600052603260045260246000fd5b905060200281019061013e91906111db565b61014f906040810190602001610f91565b8e8e8781811061016f57634e487b7160e01b600052603260045260246000fd5b905060200281019061018191906111db565b61018f906040810190611193565b8080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525061034e92505050565b9093509150806101d58161126a565b9150506100bf565b508282146101f95760028401805461ffff191661ffff84161790555b600782161561021b57600382901c600090815260018501602052604090208190555b7f8faa70878671ccd212d20771b795c50af8fd3ff6cf27f4bde57e5d4de0aeb673898989898960405161025295949392919061103d565b60405180910390a161029a8787878080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610c0792505050565b505050505050505050565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c600401546001600160a01b0316331461034c5760405162461bcd60e51b815260206004820152602260248201527f4c69624469616d6f6e643a204d75737420626520636f6e7472616374206f776e60448201527f657200000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b565b600080807fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c905060008451116103ec5760405162461bcd60e51b815260206004820152602b60248201527f4c69624469616d6f6e644375743a204e6f2073656c6563746f727320696e206660448201527f6163657420746f206375740000000000000000000000000000000000000000006064820152608401610343565b600085600281111561040e57634e487b7160e01b600052602160045260246000fd5b1415610597576104368660405180606001604052806024815260200161129c60249139610e31565b60005b845181101561059157600085828151811061046457634e487b7160e01b600052603260045260246000fd5b6020908102919091018101516001600160e01b03198116600090815291859052604090912054909150606081901c156105055760405162461bcd60e51b815260206004820152603560248201527f4c69624469616d6f6e644375743a2043616e2774206164642066756e6374696f60448201527f6e207468617420616c72656164792065786973747300000000000000000000006064820152608401610343565b6001600160e01b031980831660008181526020879052604090206bffffffffffffffffffffffff1960608d901b168e17905560e060058e901b811692831c199c909c1690821c179a81141561056e5760038c901c600090815260018601602052604081209b909b555b8b6105788161126a565b9c505050505080806105899061126a565b915050610439565b50610bfb565b60018560028111156105b957634e487b7160e01b600052602160045260246000fd5b141561080c576105e1866040518060600160405280602881526020016112e860289139610e31565b60005b845181101561059157600085828151811061060f57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101516001600160e01b03198116600090815291859052604090912054909150606081901c308114156106b35760405162461bcd60e51b815260206004820152602f60248201527f4c69624469616d6f6e644375743a2043616e2774207265706c61636520696d6d60448201527f757461626c652066756e6374696f6e00000000000000000000000000000000006064820152608401610343565b896001600160a01b0316816001600160a01b0316141561073b5760405162461bcd60e51b815260206004820152603860248201527f4c69624469616d6f6e644375743a2043616e2774207265706c6163652066756e60448201527f6374696f6e20776974682073616d652066756e6374696f6e00000000000000006064820152608401610343565b6001600160a01b0381166107b75760405162461bcd60e51b815260206004820152603860248201527f4c69624469616d6f6e644375743a2043616e2774207265706c6163652066756e60448201527f6374696f6e207468617420646f65736e277420657869737400000000000000006064820152608401610343565b506001600160e01b031990911660009081526020849052604090206bffffffffffffffffffffffff919091166bffffffffffffffffffffffff1960608a901b16179055806108048161126a565b9150506105e4565b600285600281111561082e57634e487b7160e01b600052602160045260246000fd5b1415610b8d576001600160a01b038616156108b15760405162461bcd60e51b815260206004820152603660248201527f4c69624469616d6f6e644375743a2052656d6f7665206661636574206164647260448201527f657373206d7573742062652061646472657373283029000000000000000000006064820152608401610343565b600388901c6007891660005b8651811015610b6d57896108f557826108d581611253565b60008181526001870160205260409020549b509350600792506109039050565b816108ff81611253565b9250505b6000806000808a858151811061092957634e487b7160e01b600052603260045260246000fd5b6020908102919091018101516001600160e01b031981166000908152918a9052604090912054909150606081901c6109c95760405162461bcd60e51b815260206004820152603760248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f76652066756e6360448201527f74696f6e207468617420646f65736e27742065786973740000000000000000006064820152608401610343565b606081901c301415610a435760405162461bcd60e51b815260206004820152602e60248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f766520696d6d7560448201527f7461626c652066756e6374696f6e0000000000000000000000000000000000006064820152608401610343565b600587901b8f901b94506001600160e01b031980861690831614610a9e576001600160e01b03198516600090815260208a90526040902080546bffffffffffffffffffffffff19166bffffffffffffffffffffffff83161790555b6001600160e01b031991909116600090815260208990526040812055600381901c611fff16925060051b60e0169050858214610b03576000828152600188016020526040902080546001600160e01b031980841c19909116908516831c179055610b3c565b80837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916901c816001600160e01b031960001b901c198e16179c505b84610b5757600086815260018801602052604081208190559c505b5050508080610b659061126a565b9150506108bd565b5080610b7a836008611208565b610b8491906111f0565b99505050610bfb565b60405162461bcd60e51b815260206004820152602760248201527f4c69624469616d6f6e644375743a20496e636f7272656374204661636574437560448201527f74416374696f6e000000000000000000000000000000000000000000000000006064820152608401610343565b50959694955050505050565b6001600160a01b038216610c8e57805115610c8a5760405162461bcd60e51b815260206004820152603c60248201527f4c69624469616d6f6e644375743a205f696e697420697320616464726573732860448201527f3029206275745f63616c6c64617461206973206e6f7420656d707479000000006064820152608401610343565b5050565b6000815111610d055760405162461bcd60e51b815260206004820152603d60248201527f4c69624469616d6f6e644375743a205f63616c6c6461746120697320656d707460448201527f7920627574205f696e6974206973206e6f7420616464726573732830290000006064820152608401610343565b6001600160a01b0382163014610d3757610d37826040518060600160405280602881526020016112c060289139610e31565b600080836001600160a01b031683604051610d529190611021565b600060405180830381855af49150503d8060008114610d8d576040519150601f19603f3d011682016040523d82523d6000602084013e610d92565b606091505b509150915081610e2b57805115610dbd578060405162461bcd60e51b81526004016103439190611160565b60405162461bcd60e51b815260206004820152602660248201527f4c69624469616d6f6e644375743a205f696e69742066756e6374696f6e20726560448201527f76657274656400000000000000000000000000000000000000000000000000006064820152608401610343565b50505050565b813b8181610e2b5760405162461bcd60e51b81526004016103439190611160565b80356001600160a01b0381168114610e6957600080fd5b919050565b60008083601f840112610e7f578182fd5b50813567ffffffffffffffff811115610e96578182fd5b602083019150836020828501011115610eae57600080fd5b9250929050565b803560038110610e6957600080fd5b600060208284031215610ed5578081fd5b610ede82610e52565b9392505050565b600080600080600060608688031215610efc578081fd5b853567ffffffffffffffff80821115610f13578283fd5b818801915088601f830112610f26578283fd5b813581811115610f34578384fd5b8960208260051b8501011115610f48578384fd5b60208301975080965050610f5e60208901610e52565b94506040880135915080821115610f73578283fd5b50610f8088828901610e6e565b969995985093965092949392505050565b600060208284031215610fa2578081fd5b610ede82610eb5565b81835260006020808501945082825b85811015610fed5781356001600160e01b03198116808214610fda578586fd5b8852509582019590820190600101610fba565b509495945050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60008251611033818460208701611227565b9190910192915050565b6060808252818101869052600090600560808085019089831b8601018a855b8b81101561112d57878303607f190184528135368e9003605e19018112611081578788fd5b8d016001600160a01b0361109482610e52565b16845260206110a4818301610eb5565b600381106110c057634e487b7160e01b8a52602160045260248afd5b8582015260408281013536849003601e190181126110dc578a8bfd5b8301803567ffffffffffffffff8111156110f4578b8cfd5b808a1b3603851315611104578b8cfd5b8a838901526111188b890182868501610fab565b9884019897505050930192505060010161105c565b50506001600160a01b0389166020870152858103604087015261115181888a610ff8565b9b9a5050505050505050505050565b602081526000825180602084015261117f816040850160208701611227565b601f01601f19169190910160400192915050565b6000808335601e198436030181126111a9578283fd5b83018035915067ffffffffffffffff8211156111c3578283fd5b6020019150600581901b3603821315610eae57600080fd5b60008235605e19833603018112611033578182fd5b6000821982111561120357611203611285565b500190565b600081600019048311821515161561122257611222611285565b500290565b60005b8381101561124257818101518382015260200161122a565b83811115610e2b5750506000910152565b60008161126257611262611285565b506000190190565b600060001982141561127e5761127e611285565b5060010190565b634e487b7160e01b600052601160045260246000fdfe4c69624469616d6f6e644375743a2041646420666163657420686173206e6f20636f64654c69624469616d6f6e644375743a205f696e6974206164647265737320686173206e6f20636f64654c69624469616d6f6e644375743a205265706c61636520666163657420686173206e6f20636f6465a26469706673582212205cf261310a83fbce97602099b48725e14d1e07176b43c907468cc200919dacc664736f6c63430008040033";

type DiamondCutFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DiamondCutFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DiamondCutFacet__factory extends ContractFactory {
  constructor(...args: DiamondCutFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DiamondCutFacet> {
    return super.deploy(overrides || {}) as Promise<DiamondCutFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DiamondCutFacet {
    return super.attach(address) as DiamondCutFacet;
  }
  override connect(signer: Signer): DiamondCutFacet__factory {
    return super.connect(signer) as DiamondCutFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DiamondCutFacetInterface {
    return new utils.Interface(_abi) as DiamondCutFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DiamondCutFacet {
    return new Contract(address, _abi, signerOrProvider) as DiamondCutFacet;
  }
}
