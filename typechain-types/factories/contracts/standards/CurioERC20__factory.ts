/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  CurioERC20,
  CurioERC20Interface,
} from "../../../contracts/standards/CurioERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "_diamond",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "contract AdminFacet",
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
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "approve",
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
        name: "_account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "destroyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "diamond",
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
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "dripToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "game",
    outputs: [
      {
        internalType: "contract GameFacet",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getter",
    outputs: [
      {
        internalType: "contract GetterFacet",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxTransferDistance",
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
    inputs: [],
    name: "name",
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
    inputs: [],
    name: "symbol",
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
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transfer",
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
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "transferAll",
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
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
];

const _bytecode =
  "0x6080604052601460085560006009553480156200001b57600080fd5b5060405162001aef38038062001aef8339810160408190526200003e91620002a1565b6001600160a01b038116620000a55760405162461bcd60e51b8152602060048201526024808201527f437572696f45524332303a204469616d6f6e64206164647265737320726571756044820152631a5c995960e21b606482015260840160405180910390fd5b8351620000ba9060009060208701906200012e565b508251620000d09060019060208601906200012e565b506002805460ff90931660ff1990931692909217909155600480546001600160a01b039092166001600160a01b0319928316811790915560058054831682179055600680548316821790556007805490921617905550620003819050565b8280546200013c9062000345565b90600052602060002090601f016020900481019282620001605760008555620001ab565b82601f106200017b57805160ff1916838001178555620001ab565b82800160010185558215620001ab579182015b82811115620001ab5782518255916020019190600101906200018e565b50620001b9929150620001bd565b5090565b5b80821115620001b95760008155600101620001be565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001fc57600080fd5b81516001600160401b0380821115620002195762000219620001d4565b604051601f8301601f19908116603f01168101908282118183101715620002445762000244620001d4565b816040528381526020925086838588010111156200026157600080fd5b600091505b8382101562000285578582018301518183018401529082019062000266565b83821115620002975760008385830101525b9695505050505050565b60008060008060808587031215620002b857600080fd5b84516001600160401b0380821115620002d057600080fd5b620002de88838901620001ea565b95506020870151915080821115620002f557600080fd5b506200030487828801620001ea565b935050604085015160ff811681146200031c57600080fd5b60608601519092506001600160a01b03811681146200033a57600080fd5b939692955090935050565b600181811c908216806200035a57607f821691505b6020821081036200037b57634e487b7160e01b600052602260045260246000fd5b50919050565b61175e80620003916000396000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c806370a08231116100b2578063a9059cbb11610081578063dd62ed3e11610066578063dd62ed3e1461025a578063f0b7db4e1461026d578063f851a4401461028057600080fd5b8063a9059cbb14610234578063c3fe3e281461024757600080fd5b806370a08231146101db57806395d89b41146101ee578063993a04b7146101f65780639b1ad7921461022157600080fd5b8063239df7f2116100ee578063239df7f21461018d57806323b872dd14610196578063313ce567146101a95780634b14e003146101c857600080fd5b806306fdde031461012057806307d6a5d41461013e578063095ea7b31461015357806318160ddd14610176575b600080fd5b610128610293565b60405161013591906112fc565b60405180910390f35b61015161014c36600461132e565b610321565b005b61016661016136600461132e565b61049d565b6040519015158152602001610135565b61017f60035481565b604051908152602001610135565b61017f60085481565b6101666101a436600461135a565b610798565b6002546101b69060ff1681565b60405160ff9091168152602001610135565b6101666101d636600461139b565b6107af565b61017f6101e93660046113d4565b61083c565b6101286108cf565b600554610209906001600160a01b031681565b6040516001600160a01b039091168152602001610135565b61015161022f36600461132e565b6108dc565b61016661024236600461132e565b610a3c565b600754610209906001600160a01b031681565b61017f61026836600461139b565b610dba565b600454610209906001600160a01b031681565b600654610209906001600160a01b031681565b600080546102a0906113f1565b80601f01602080910402602001604051908101604052809291908181526020018280546102cc906113f1565b80156103195780601f106102ee57610100808354040283529160200191610319565b820191906000526020600020905b8154815290600101906020018083116102fc57829003601f168201915b505050505081565b6004546001600160a01b031633146103905760405162461bcd60e51b815260206004820152602760248201527f435552494f3a204f6e6c792067616d652063616e2063616c6c207468697320666044820152663ab731ba34b7b760c91b60648201526084015b60405180910390fd5b600080600061039e85610f8a565b919450925090506000826103b28684611441565b116103be5750836103cb565b6103c88284611459565b90505b6006546001600160a01b0316638d20eac3856103e78486611441565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561042557600080fd5b505af1158015610439573d6000803e3d6000fd5b50506040518381526001600160a01b0389169250600091507fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a380600360008282546104909190611441565b9091555050505050505050565b60055460405163b356003960e01b815233600482015260009182916001600160a01b039091169063b356003990602401602060405180830381865afa1580156104ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061050e9190611470565b60055460405163b356003960e01b81526001600160a01b0387811660048301529293506000929091169063b356003990602401602060405180830381865afa15801561055e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105829190611470565b6005546040517f3313db270000000000000000000000000000000000000000000000000000000081529192506000916001600160a01b0390911690633313db27906105d590849087908790600401611528565b602060405180830381865afa1580156105f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106169190611470565b905060095481036106b5576006546040517f6f4c70690000000000000000000000000000000000000000000000000000000081526001600160a01b0390911690636f4c70699061066f9060009087908790600401611528565b6020604051808303816000875af115801561068e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b29190611470565b90505b60065460408051602080820189905282518083039091018152818301928390527f39684ca5000000000000000000000000000000000000000000000000000000009092526001600160a01b03909216916339684ca59161071a9185919060440161154d565b600060405180830381600087803b15801561073457600080fd5b505af1158015610748573d6000803e3d6000fd5b50506040518781526001600160a01b03891692503391507f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259060200160405180910390a350600195945050505050565b60006107a584848461102a565b5060019392505050565b6004546000906001600160a01b0316331461081c5760405162461bcd60e51b815260206004820152602760248201527f435552494f3a204f6e6c792067616d652063616e2063616c6c207468697320666044820152663ab731ba34b7b760c91b6064820152608401610387565b60006108278461083c565b9050610834848483610798565b949350505050565b6005546040517fb869810c0000000000000000000000000000000000000000000000000000000081526000916001600160a01b03169063b869810c90610888908590859060040161159a565b602060405180830381865afa1580156108a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108c99190611470565b92915050565b600180546102a0906113f1565b6004546001600160a01b031633146109465760405162461bcd60e51b815260206004820152602760248201527f435552494f3a204f6e6c792067616d652063616e2063616c6c207468697320666044820152663ab731ba34b7b760c91b6064820152608401610387565b60008061095284610f8a565b925050915060008184116109665783610968565b815b6006549091506001600160a01b0316638d20eac3846109878486611459565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b1580156109c557600080fd5b505af11580156109d9573d6000803e3d6000fd5b5050604051838152600092506001600160a01b03881691507fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a38060036000828254610a309190611459565b90915550505050505050565b6000333014610da65760055460405163b356003960e01b81523360048201526000916001600160a01b03169063b356003990602401602060405180830381865afa158015610a8e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ab29190611470565b6005546040517f84d969bd00000000000000000000000000000000000000000000000000000000815260206004820152600660248201527f4e6174696f6e0000000000000000000000000000000000000000000000000000604482015291925060009182916001600160a01b0316906384d969bd90606401602060405180830381865afa158015610b47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b6b91906115bc565b6001600160a01b031663b361be4684604051602001610b8c91815260200190565b6040516020818303038152906040526040518263ffffffff1660e01b8152600401610bb791906112fc565b600060405180830381865afa158015610bd4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610bfc91908101906115ef565b5111610c8d576005546040517ff27fe5da000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b039091169063f27fe5da90602401602060405180830381865afa158015610c64573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c889190611470565b610c8f565b815b60055460405163b356003960e01b81526001600160a01b0388811660048301529293506000929091169063b356003990602401602060405180830381865afa158015610cdf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d039190611470565b600554604080516020810184905280820189905281518082038301815260608201928390527f8c48d213000000000000000000000000000000000000000000000000000000009092529293506001600160a01b0390911691638c48d21391610d70918691906064016116ad565b600060405180830381600087803b158015610d8a57600080fd5b505af1158015610d9e573d6000803e3d6000fd5b505050505050505b610db133848461102a565b50600192915050565b60055460405163b356003960e01b81526001600160a01b0384811660048301526000928392911690633313db27908390839063b356003990602401602060405180830381865afa158015610e12573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e369190611470565b60055460405163b356003960e01b81526001600160a01b0389811660048301529091169063b356003990602401602060405180830381865afa158015610e80573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea49190611470565b6040518463ffffffff1660e01b8152600401610ec293929190611528565b602060405180830381865afa158015610edf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f039190611470565b6005546040517f9980ec86000000000000000000000000000000000000000000000000000000008152600481018390529192506001600160a01b031690639980ec8690602401602060405180830381865afa158015610f66573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108349190611470565b6005546040517fbbdb353b000000000000000000000000000000000000000000000000000000008152600091829182916001600160a01b03169063bbdb353b90610fda908790859060040161159a565b6060604051808303816000875af1158015610ff9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061101d91906116fa565b9250925092509193909250565b60008061103685610f8a565b9250509150600080600061104987610f8a565b925092509250600954851415801561106357506009548314155b6110d55760405162461bcd60e51b815260206004820152602760248201527f437572696f45524332303a20496e2d67616d6520696e76656e746f7279206e6f60448201527f7420666f756e64000000000000000000000000000000000000000000000000006064820152608401610387565b8584101561114b5760405162461bcd60e51b815260206004820152602660248201527f437572696f45524332303a2053656e64657220696e737566666963656e74206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610387565b6000826111588884611441565b11611164575085611171565b61116e8284611459565b90505b6006546001600160a01b0316638d20eac38761118d8489611459565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b1580156111cb57600080fd5b505af11580156111df573d6000803e3d6000fd5b50506006546001600160a01b03169150638d20eac39050856112018486611441565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561123f57600080fd5b505af1158015611253573d6000803e3d6000fd5b50505050876001600160a01b0316896001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161129c91815260200190565b60405180910390a3505050505050505050565b6000815180845260005b818110156112d5576020818501810151868301820152016112b9565b818111156112e7576000602083870101525b50601f01601f19169290920160200192915050565b60208152600061130f60208301846112af565b9392505050565b6001600160a01b038116811461132b57600080fd5b50565b6000806040838503121561134157600080fd5b823561134c81611316565b946020939093013593505050565b60008060006060848603121561136f57600080fd5b833561137a81611316565b9250602084013561138a81611316565b929592945050506040919091013590565b600080604083850312156113ae57600080fd5b82356113b981611316565b915060208301356113c981611316565b809150509250929050565b6000602082840312156113e657600080fd5b813561130f81611316565b600181811c9082168061140557607f821691505b60208210810361142557634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156114545761145461142b565b500190565b60008282101561146b5761146b61142b565b500390565b60006020828403121561148257600080fd5b5051919050565b8054600090600181811c90808316806114a357607f831692505b602080841082036114c457634e487b7160e01b600052602260045260246000fd5b838852602088018280156114df57600181146114f05761151b565b60ff1987168252828201975061151b565b60008981526020902060005b87811015611515578154848201529086019084016114fc565b83019850505b5050505050505092915050565b60608152600061153b6060830186611489565b60208301949094525060400152919050565b60608152600660608201527f416d6f756e740000000000000000000000000000000000000000000000000000608082015282602082015260a06040820152600061083460a08301846112af565b6001600160a01b03831681526040602082015260006108346040830184611489565b6000602082840312156115ce57600080fd5b815161130f81611316565b634e487b7160e01b600052604160045260246000fd5b6000602080838503121561160257600080fd5b825167ffffffffffffffff8082111561161a57600080fd5b818501915085601f83011261162e57600080fd5b815181811115611640576116406115d9565b8060051b604051601f19603f83011681018181108582111715611665576116656115d9565b60405291825284820192508381018501918883111561168357600080fd5b938501935b828510156116a157845184529385019392850192611688565b98975050505050505050565b60608152600860608201527f5472616e73666572000000000000000000000000000000000000000000000000608082015282602082015260a06040820152600061083460a08301846112af565b60008060006060848603121561170f57600080fd5b835192506020840151915060408401519050925092509256fea26469706673582212203edbb455dc7574493b506986af209c2339a106f05a6a2503c96936e2d916825b64736f6c634300080d0033";

type CurioERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CurioERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CurioERC20__factory extends ContractFactory {
  constructor(...args: CurioERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _decimals: PromiseOrValue<BigNumberish>,
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CurioERC20> {
    return super.deploy(
      _name,
      _symbol,
      _decimals,
      _diamond,
      overrides || {}
    ) as Promise<CurioERC20>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _decimals: PromiseOrValue<BigNumberish>,
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _decimals,
      _diamond,
      overrides || {}
    );
  }
  override attach(address: string): CurioERC20 {
    return super.attach(address) as CurioERC20;
  }
  override connect(signer: Signer): CurioERC20__factory {
    return super.connect(signer) as CurioERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CurioERC20Interface {
    return new utils.Interface(_abi) as CurioERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CurioERC20 {
    return new Contract(address, _abi, signerOrProvider) as CurioERC20;
  }
}
