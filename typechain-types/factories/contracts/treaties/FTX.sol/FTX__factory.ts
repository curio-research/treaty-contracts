/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  FTX,
  FTXInterface,
} from "../../../../contracts/treaties/FTX.sol/FTX";

const _abi = [
  {
    inputs: [
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
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "deposit",
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
    inputs: [],
    name: "fttToken",
    outputs: [
      {
        internalType: "contract FTTERC20",
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
    name: "goldToken",
    outputs: [
      {
        internalType: "contract CurioERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isBankrupt",
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
    name: "run",
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
    inputs: [],
    name: "sbfAddress",
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
    inputs: [],
    name: "sbfCapitalAddress",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
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
  "0x60806040523480156200001157600080fd5b50604051620023ae380380620023ae8339810160408190526200003491620002c8565b6001600160a01b0381166200008f5760405162461bcd60e51b815260206004820152601d60248201527f4654583a204469616d6f6e642061646472657373207265717569726564000000604482015260640160405180910390fd5b600080546001600160a01b0319166001600160a01b0383161790556040805180820190915260038082526208ca8b60eb1b6020909201918252620000d691600191620001fb565b50600280546001600160a01b0319166001600160a01b038316908117909155604051631c0e27e760e11b8152602060048083019190915260248201526311dbdb1960e21b604482015263381c4fce90606401602060405180830381865afa15801562000146573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200016c9190620002c8565b600380546001600160a01b0319166001600160a01b039290921691909117905560405130906200019c906200028a565b6001600160a01b039091168152602001604051809103906000f080158015620001c9573d6000803e3d6000fd5b50600480546001600160a01b03929092166001600160a01b03199283161790556005805490911633179055506200032b565b8280546200020990620002ef565b90600052602060002090601f0160209004810192826200022d576000855562000278565b82601f106200024857805160ff191683800117855562000278565b8280016001018555821562000278579182015b82811115620002785782518255916020019190600101906200025b565b506200028692915062000298565b5090565b611096806200131883390190565b5b8082111562000286576000815560010162000299565b6001600160a01b0381168114620002c557600080fd5b50565b600060208284031215620002db57600080fd5b8151620002e881620002af565b9392505050565b600181811c908216806200030457607f821691505b6020821081036200032557634e487b7160e01b600052602260045260246000fd5b50919050565b610fdd806200033b6000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c806394002b5711610081578063b6b55f251161005b578063b6b55f251461019a578063c0406226146101ad578063f0b7db4e146101b557600080fd5b806394002b5714610161578063993a04b714610174578063b4bfdfcd1461018757600080fd5b806341bcc52f116100b257806341bcc52f1461010f5780634b3dc8081461013a578063721c7d461461014d57600080fd5b806306fdde03146100ce5780632e1a7d4d146100ec575b600080fd5b6100d66101c8565b6040516100e39190610df6565b60405180910390f35b6100ff6100fa366004610e10565b610256565b60405190151581526020016100e3565b600454610122906001600160a01b031681565b6040516001600160a01b0390911681526020016100e3565b600654610122906001600160a01b031681565b6006546100ff90600160a01b900460ff1681565b600354610122906001600160a01b031681565b600254610122906001600160a01b031681565b600554610122906001600160a01b031681565b6100ff6101a8366004610e10565b6106f2565b6100ff6109b0565b600054610122906001600160a01b031681565b600180546101d590610e29565b80601f016020809104026020016040519081016040528092919081815260200182805461020190610e29565b801561024e5780601f106102235761010080835404028352916020019161024e565b820191906000526020600020905b81548152906001019060200180831161023157829003601f168201915b505050505081565b6005546000906001600160a01b031633036102b85760405162461bcd60e51b815260206004820152601f60248201527f4654583a20596f7520646f6e2774206e65656420746f2077697468647261770060448201526064015b60405180910390fd5b600654600160a01b900460ff16156103125760405162461bcd60e51b815260206004820152601760248201527f4654583a20596f7572206d6f6e657920697320676f6e6500000000000000000060448201526064016102af565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa15801561036b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061038f9190610e63565b6040518263ffffffff1660e01b81526004016103ad91815260200190565b602060405180830381865afa1580156103ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ee9190610e63565b6040518263ffffffff1660e01b815260040161040c91815260200190565b602060405180830381865afa158015610429573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061044d9190610e94565b600480546040517f70a082310000000000000000000000000000000000000000000000000000000081526001600160a01b038085169382019390935292935085929116906370a0823190602401602060405180830381865afa1580156104b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104db9190610e63565b10156105295760405162461bcd60e51b815260206004820152601960248201527f4654583a20496e73756666696369656e742062616c616e63650000000000000060448201526064016102af565b6006546001600160a01b031661054157610541610a9b565b6003546006546040517f03147f390000000000000000000000000000000000000000000000000000000081526001600160a01b03918216600482015260009291909116906303147f3990602401602060405180830381865afa1580156105ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105cf9190610e63565b905060008482116105e057816105e2565b845b6003546006546040516323b872dd60e01b81526001600160a01b03918216600482015286821660248201526044810184905292935016906323b872dd906064016020604051808303816000875af1158015610641573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106659190610eb1565b50600480546040517f9dc29fac0000000000000000000000000000000000000000000000000000000081526001600160a01b038681169382019390935260248101849052911690639dc29fac90604401600060405180830381600087803b1580156106cf57600080fd5b505af11580156106e3573d6000803e3d6000fd5b50600198975050505050505050565b6005546000906001600160a01b0316330361074f5760405162461bcd60e51b815260206004820152601e60248201527f4654583a20596f7520646f6e2774206e65656420746f206465706f736974000060448201526064016102af565b6006546001600160a01b031661076757610767610a9b565b60025460405163b356003960e01b81523360048201526000916001600160a01b03169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa1580156107c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e49190610e63565b6040518263ffffffff1660e01b815260040161080291815260200190565b602060405180830381865afa15801561081f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108439190610e63565b6040518263ffffffff1660e01b815260040161086191815260200190565b602060405180830381865afa15801561087e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a29190610e94565b6003546006546040516323b872dd60e01b81526001600160a01b03808516600483015291821660248201526044810187905292935016906323b872dd906064016020604051808303816000875af1158015610901573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109259190610eb1565b50600480546040517f40c10f190000000000000000000000000000000000000000000000000000000081526001600160a01b0384811693820193909352602481018690529116906340c10f1990604401600060405180830381600087803b15801561098f57600080fd5b505af11580156109a3573d6000803e3d6000fd5b5060019695505050505050565b6005546000906001600160a01b03163314610a0d5760405162461bcd60e51b815260206004820152601a60248201527f4654583a20596f7520646f6e2774206e65656420746f2072756e00000000000060448201526064016102af565b600654600160a01b900460ff1615610a675760405162461bcd60e51b815260206004820152601b60248201527f4654583a20596f7527766520616c72656164792065736361706564000000000060448201526064016102af565b50600680547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b179055600190565b6002546040517f84d969bd00000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f416464726573730000000000000000000000000000000000000000000000000060448201526001600160a01b03909116906384d969bd90606401602060405180830381865afa158015610b2a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b4e9190610e94565b600554604080516001600160a01b039283166020820152929091169163b361be4691016040516020818303038152906040526040518263ffffffff1660e01b8152600401610b9c9190610df6565b600060405180830381865afa158015610bb9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610be19190810190610ee9565b51600114610c315760405162461bcd60e51b815260206004820152601860248201527f4654583a20534246206e6f7420696e697469616c697a6564000000000000000060448201526064016102af565b60025460055460405163b356003960e01b81526001600160a01b03918216600482015291169063b93f9b0a908290632956098090829063b356003990602401602060405180830381865afa158015610c8d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb19190610e63565b6040518263ffffffff1660e01b8152600401610ccf91815260200190565b602060405180830381865afa158015610cec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d109190610e63565b6040518263ffffffff1660e01b8152600401610d2e91815260200190565b602060405180830381865afa158015610d4b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d6f9190610e94565b600680547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b6000815180845260005b81811015610dcf57602081850181015186830182015201610db3565b81811115610de1576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610e096020830184610da9565b9392505050565b600060208284031215610e2257600080fd5b5035919050565b600181811c90821680610e3d57607f821691505b602082108103610e5d57634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215610e7557600080fd5b5051919050565b6001600160a01b0381168114610e9157600080fd5b50565b600060208284031215610ea657600080fd5b8151610e0981610e7c565b600060208284031215610ec357600080fd5b81518015158114610e0957600080fd5b634e487b7160e01b600052604160045260246000fd5b60006020808385031215610efc57600080fd5b825167ffffffffffffffff80821115610f1457600080fd5b818501915085601f830112610f2857600080fd5b815181811115610f3a57610f3a610ed3565b8060051b604051601f19603f83011681018181108582111715610f5f57610f5f610ed3565b604052918252848201925083810185019188831115610f7d57600080fd5b938501935b82851015610f9b57845184529385019392850192610f82565b9897505050505050505056fea2646970667358221220d1c223ad776c554c19636da8b06dfeeb9d6e067c5e5b399ca9eb2281ea6d263264736f6c634300080d003360e06040523480156200001157600080fd5b50604051620010963803806200109683398101604081905262000034916200021f565b6040805180820182526009815268232a2c102a37b5b2b760b91b60208083019182528351808501909452600384526211951560ea1b90840152815191929160129162000084916000919062000179565b5081516200009a90600190602085019062000179565b5060ff81166080524660a052620000b0620000dd565b60c0525050600680546001600160a01b0319166001600160a01b0393909316929092179091555062000330565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60006040516200011191906200028d565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b828054620001879062000251565b90600052602060002090601f016020900481019282620001ab5760008555620001f6565b82601f10620001c657805160ff1916838001178555620001f6565b82800160010185558215620001f6579182015b82811115620001f6578251825591602001919060010190620001d9565b506200020492915062000208565b5090565b5b8082111562000204576000815560010162000209565b6000602082840312156200023257600080fd5b81516001600160a01b03811681146200024a57600080fd5b9392505050565b600181811c908216806200026657607f821691505b6020821081036200028757634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c915080831680620002aa57607f831692505b60208084108203620002ca57634e487b7160e01b86526022600452602486fd5b818015620002e15760018114620002f35762000322565b60ff1986168952848901965062000322565b60008a81526020902060005b868110156200031a5781548b820152908501908301620002ff565b505084890196505b509498975050505050505050565b60805160a05160c051610d366200036060003960006104e7015260006104b20152600061019a0152610d366000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806370a0823111610097578063a34a28fd11610066578063a34a28fd14610246578063a9059cbb14610271578063d505accf14610284578063dd62ed3e1461029757600080fd5b806370a08231146101eb5780637ecebe001461020b57806395d89b411461022b5780639dc29fac1461023357600080fd5b806323b872dd116100d357806323b872dd14610182578063313ce567146101955780633644e515146101ce57806340c10f19146101d657600080fd5b806303147f391461010557806306fdde0314610141578063095ea7b31461015657806318160ddd14610179575b600080fd5b61012e610113366004610a63565b6001600160a01b031660009081526003602052604090205490565b6040519081526020015b60405180910390f35b6101496102c2565b6040516101389190610a85565b610169610164366004610ada565b610350565b6040519015158152602001610138565b61012e60025481565b610169610190366004610b04565b6103bc565b6101bc7f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff9091168152602001610138565b61012e6104ae565b6101e96101e4366004610ada565b610509565b005b61012e6101f9366004610a63565b60036020526000908152604090205481565b61012e610219366004610a63565b60056020526000908152604090205481565b610149610576565b6101e9610241366004610ada565b610583565b600654610259906001600160a01b031681565b6040516001600160a01b039091168152602001610138565b61016961027f366004610ada565b6105e7565b6101e9610292366004610b40565b61065f565b61012e6102a5366004610bb3565b600460209081526000928352604080842090915290825290205481565b600080546102cf90610be6565b80601f01602080910402602001604051908101604052809291908181526020018280546102fb90610be6565b80156103485780601f1061031d57610100808354040283529160200191610348565b820191906000526020600020905b81548152906001019060200180831161032b57829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906103ab9086815260200190565b60405180910390a350600192915050565b6001600160a01b03831660009081526004602090815260408083203384529091528120546000198114610418576103f38382610c36565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b6001600160a01b03851660009081526003602052604081208054859290610440908490610c36565b90915550506001600160a01b03808516600081815260036020526040908190208054870190555190918716907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061049b9087815260200190565b60405180910390a3506001949350505050565b60007f000000000000000000000000000000000000000000000000000000000000000046146104e4576104df6108cd565b905090565b507f000000000000000000000000000000000000000000000000000000000000000090565b6006546001600160a01b031633146105685760405162461bcd60e51b815260206004820152601660248201527f4654543a204f6e6c79204654582063616e206d696e740000000000000000000060448201526064015b60405180910390fd5b6105728282610967565b5050565b600180546102cf90610be6565b6006546001600160a01b031633146105dd5760405162461bcd60e51b815260206004820152601660248201527f4654543a204f6e6c79204654582063616e206275726e00000000000000000000604482015260640161055f565b61057282826109d3565b33600090815260036020526040812080548391908390610608908490610c36565b90915550506001600160a01b038316600081815260036020526040908190208054850190555133907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906103ab9086815260200190565b428410156106af5760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f45585049524544000000000000000000604482015260640161055f565b600060016106bb6104ae565b6001600160a01b038a811660008181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e0830190915280519201919091207f19010000000000000000000000000000000000000000000000000000000000006101008301526101028201929092526101228101919091526101420160408051601f198184030181528282528051602091820120600084529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa1580156107e2573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906108185750876001600160a01b0316816001600160a01b0316145b6108645760405162461bcd60e51b815260206004820152600e60248201527f494e56414c49445f5349474e4552000000000000000000000000000000000000604482015260640161055f565b6001600160a01b0390811660009081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60006040516108ff9190610c4d565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b80600260008282546109799190610ce8565b90915550506001600160a01b0382166000818152600360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91015b60405180910390a35050565b6001600160a01b038216600090815260036020526040812080548392906109fb908490610c36565b90915550506002805482900390556040518181526000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020016109c7565b80356001600160a01b0381168114610a5e57600080fd5b919050565b600060208284031215610a7557600080fd5b610a7e82610a47565b9392505050565b600060208083528351808285015260005b81811015610ab257858101830151858201604001528201610a96565b81811115610ac4576000604083870101525b50601f01601f1916929092016040019392505050565b60008060408385031215610aed57600080fd5b610af683610a47565b946020939093013593505050565b600080600060608486031215610b1957600080fd5b610b2284610a47565b9250610b3060208501610a47565b9150604084013590509250925092565b600080600080600080600060e0888a031215610b5b57600080fd5b610b6488610a47565b9650610b7260208901610a47565b95506040880135945060608801359350608088013560ff81168114610b9657600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610bc657600080fd5b610bcf83610a47565b9150610bdd60208401610a47565b90509250929050565b600181811c90821680610bfa57607f821691505b602082108103610c1a57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082821015610c4857610c48610c20565b500390565b600080835481600182811c915080831680610c6957607f831692505b60208084108203610c8857634e487b7160e01b86526022600452602486fd5b818015610c9c5760018114610cad57610cda565b60ff19861689528489019650610cda565b60008a81526020902060005b86811015610cd25781548b820152908501908301610cb9565b505084890196505b509498975050505050505050565b60008219821115610cfb57610cfb610c20565b50019056fea2646970667358221220ceb7bd6f243ae3eca52ca1475734a9817eae3f808c9d3539282ec4354bddcb4664736f6c634300080d0033";

type FTXConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FTXConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FTX__factory extends ContractFactory {
  constructor(...args: FTXConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FTX> {
    return super.deploy(_diamond, overrides || {}) as Promise<FTX>;
  }
  override getDeployTransaction(
    _diamond: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_diamond, overrides || {});
  }
  override attach(address: string): FTX {
    return super.attach(address) as FTX;
  }
  override connect(signer: Signer): FTX__factory {
    return super.connect(signer) as FTX__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FTXInterface {
    return new utils.Interface(_abi) as FTXInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): FTX {
    return new Contract(address, _abi, signerOrProvider) as FTX;
  }
}
