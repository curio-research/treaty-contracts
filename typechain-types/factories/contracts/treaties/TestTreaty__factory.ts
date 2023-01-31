/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestTreaty,
  TestTreatyInterface,
} from "../../../contracts/treaties/TestTreaty";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveBattle",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveClaimTile",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDelegateGameFunction",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDeployTreaty",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDisbandArmy",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveDisownTile",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveEndGather",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveEndTroopProduction",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveHarvestResource",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveHarvestResourcesFromCapital",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveJoinTreaty",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveLeaveTreaty",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveMove",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveMoveCapital",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveOrganizeArmy",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveRecoverTile",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveStartGather",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveStartTroopProduction",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveStopTroopProduction",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveTransfer",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUnloadResources",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUpgradeCapital",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUpgradeResource",
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
        name: "_nationID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedParams",
        type: "bytes",
      },
    ],
    name: "approveUpgradeTile",
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
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
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
        name: "_diamond",
        type: "address",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
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
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_functionName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_subjectID",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_canCall",
        type: "bool",
      },
    ],
    name: "treatyDelegateGameFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treatyJoin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treatyLeave",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_capitalID",
        type: "uint256",
      },
    ],
    name: "treatyUpgradeCapital",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611266806100206000396000f3fe608060405234801561001057600080fd5b50600436106101ef5760003560e01c80634ad30a911161010f578063cbb34e86116100a2578063ec19ae8011610071578063ec19ae80146101f4578063f0b7db4e146102f5578063f2e1730b146101f4578063fa91f75e146101f457600080fd5b8063cbb34e86146101f4578063d553ed48146101f4578063e534ae5f146101f4578063e75991fa146101f457600080fd5b80637284e416116100de5780637284e416146102bc5780639bcecd0b146101f4578063a83280bc146101f4578063c009a6cb146101f457600080fd5b80634ad30a91146101f45780635f310b12146101f457806360acfcc6146102a95780636a2a2b4e146101f457600080fd5b80632b451c6411610187578063374155161161015657806337415516146101f457806339ebfad4146101f45780634142a8a11461028e57806347b958a6146102a157600080fd5b80632b451c64146101f45780632c182023146101f45780632d47fe27146101f45780632efd66291461027b57600080fd5b80631c357173116101c35780631c357173146101f45780631e15495c146101f4578063243086c4146101f457806328f59b831461027357600080fd5b8062048f5a146101f457806304dc7c74146101f457806306fdde031461021c57806319ab453c1461025e575b600080fd5b610207610202366004611043565b610320565b60405190151581526020015b60405180910390f35b60408051808201909152600b81527f546573742054726561747900000000000000000000000000000000000000000060208201525b60405161021391906110eb565b61027161026c366004611105565b61038a565b005b6102716104bf565b61027161028936600461112e565b61050a565b61027161029c3660046111a2565b610650565b610271610d2d565b6102076102b7366004611043565b610d77565b60408051808201909152601281527f54726561747920666f722074657374696e6700000000000000000000000000006020820152610251565b600054610308906001600160a01b031681565b6040516001600160a01b039091168152602001610213565b600080546001600160a01b031633146103805760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b6000546001600160a01b0316156104095760405162461bcd60e51b815260206004820152602760248201527f437572696f5472656174793a2054726561747920616c726561647920696e697460448201527f69616c697a6564000000000000000000000000000000000000000000000000006064820152608401610377565b6001600160a01b0381166104855760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e6420616464726573732072657160448201527f75697265640000000000000000000000000000000000000000000000000000006064820152608401610377565b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b6105006040518060400160405280601481526020017f44656c656761746547616d6546756e6374696f6e00000000000000000000000081525060008061050a565b610508610db4565b565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015610557573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057b91906111bb565b60405163b356003960e01b81523060048201529091506001600160a01b038084169163def700479184918a9188169063b356003990602401602060405180830381865afa1580156105d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f491906111bb565b89896040518663ffffffff1660e01b81526004016106169594939291906111d4565b600060405180830381600087803b15801561063057600080fd5b505af1158015610644573d6000803e3d6000fd5b50505050505050505050565b60005460405163b356003960e01b81523360048201526001600160a01b0390911690819063688513b290829063b356003990602401602060405180830381865afa1580156106a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106c691906111bb565b60405163b356003960e01b81523060048201526001600160a01b0385169063b356003990602401602060405180830381865afa15801561070a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072e91906111bb565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401602060405180830381865afa15801561076f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061079391906111bb565b6000036108085760405162461bcd60e51b815260206004820152602160248201527f437572696f5472656174793a204f6e6c79207369676e65722063616e2063616c60448201527f6c000000000000000000000000000000000000000000000000000000000000006064820152608401610377565b6000805460405163b356003960e01b81523360048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa158015610854573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087891906111bb565b60005460405163b356003960e01b81523060048201529192506001600160a01b0390811691829163865ed32a91859187169063b356003990602401602060405180830381865afa1580156108d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108f491906111bb565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152600e60a48301527f557067726164654361706974616c00000000000000000000000000000000000060c48301526044820152606481018890526001608482015260e401600060405180830381600087803b15801561097457600080fd5b505af1158015610988573d6000803e3d6000fd5b505060405163b356003960e01b81523060048201526001600160a01b03808516935063865ed32a925085919087169063b356003990602401602060405180830381865afa1580156109dd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a0191906111bb565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152601b60a48301527f486172766573745265736f757263657346726f6d4361706974616c000000000060c48301526044820152606481018890526001608482015260e401600060405180830381600087803b158015610a8157600080fd5b505af1158015610a95573d6000803e3d6000fd5b50506040517f32eebf76000000000000000000000000000000000000000000000000000000008152600481018890526001600160a01b03841692506332eebf769150602401600060405180830381600087803b158015610af457600080fd5b505af1158015610b08573d6000803e3d6000fd5b505060405163b356003960e01b81523060048201526001600160a01b03808516935063865ed32a925085919087169063b356003990602401602060405180830381865afa158015610b5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b8191906111bb565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152600e60a48301527f557067726164654361706974616c00000000000000000000000000000000000060c48301526044820152606481018890526000608482015260e401600060405180830381600087803b158015610c0157600080fd5b505af1158015610c15573d6000803e3d6000fd5b505060405163b356003960e01b81523060048201526001600160a01b03808516935063865ed32a925085919087169063b356003990602401602060405180830381865afa158015610c6a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c8e91906111bb565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152601b60a48301527f486172766573745265736f757263657346726f6d4361706974616c000000000060c48301526044820152606481018890526000608482015260e401600060405180830381600087803b158015610d0e57600080fd5b505af1158015610d22573d6000803e3d6000fd5b505050505050505050565b610d6f6040518060400160405280601481526020017f44656c656761746547616d6546756e6374696f6e0000000000000000000000008152506000600161050a565b610508610ea0565b60008082806020019051810190610d8e919061120c565b509050808403610da2576000915050610384565b610dac8484610320565b949350505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015610e01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e2591906111bb565b6040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b03831690635ffde14490602401600060405180830381600087803b158015610e8357600080fd5b505af1158015610e97573d6000803e3d6000fd5b50505050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015610eed573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f1191906111bb565b6040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b0383169063ff2a5e79906024016020604051808303816000875af1158015610f74573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f9891906111bb565b50505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600067ffffffffffffffff80841115610fe857610fe8610f9e565b604051601f8501601f19908116603f0116810190828211818310171561101057611010610f9e565b8160405280935085815286868601111561102957600080fd5b858560208301376000602087830101525050509392505050565b6000806040838503121561105657600080fd5b82359150602083013567ffffffffffffffff81111561107457600080fd5b8301601f8101851361108557600080fd5b61109485823560208401610fcd565b9150509250929050565b6000815180845260005b818110156110c4576020818501810151868301820152016110a8565b818111156110d6576000602083870101525b50601f01601f19169290920160200192915050565b6020815260006110fe602083018461109e565b9392505050565b60006020828403121561111757600080fd5b81356001600160a01b03811681146110fe57600080fd5b60008060006060848603121561114357600080fd5b833567ffffffffffffffff81111561115a57600080fd5b8401601f8101861361116b57600080fd5b61117a86823560208401610fcd565b935050602084013591506040840135801515811461119757600080fd5b809150509250925092565b6000602082840312156111b457600080fd5b5035919050565b6000602082840312156111cd57600080fd5b5051919050565b85815260a0602082015260006111ed60a083018761109e565b6040830195909552506060810192909252151560809091015292915050565b6000806040838503121561121f57600080fd5b50508051602090910151909290915056fea2646970667358221220a383e57b72adbecd971c26c0bf86b4fb8ff252c89e00e9479886a910c35e076064736f6c634300080d0033";

type TestTreatyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestTreatyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestTreaty__factory extends ContractFactory {
  constructor(...args: TestTreatyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestTreaty> {
    return super.deploy(overrides || {}) as Promise<TestTreaty>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestTreaty {
    return super.attach(address) as TestTreaty;
  }
  override connect(signer: Signer): TestTreaty__factory {
    return super.connect(signer) as TestTreaty__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestTreatyInterface {
    return new utils.Interface(_abi) as TestTreatyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestTreaty {
    return new Contract(address, _abi, signerOrProvider) as TestTreaty;
  }
}
