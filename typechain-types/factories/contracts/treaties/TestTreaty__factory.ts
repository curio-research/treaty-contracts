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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061125b806100206000396000f3fe608060405234801561001057600080fd5b50600436106101e45760003560e01c80634ad30a911161010f578063cbb34e86116100a2578063ec19ae8011610071578063ec19ae80146101e9578063f0b7db4e146102ea578063f2e1730b146101e9578063fa91f75e146101e957600080fd5b8063cbb34e86146101e9578063d553ed48146101e9578063e534ae5f146101e9578063e75991fa146101e957600080fd5b80637284e416116100de5780637284e416146102b15780639bcecd0b146101e9578063a83280bc146101e9578063c009a6cb146101e957600080fd5b80634ad30a91146101e95780635f310b12146101e957806360acfcc61461029e5780636a2a2b4e146101e957600080fd5b806328f59b8311610187578063374155161161015657806337415516146101e957806339ebfad4146101e95780634142a8a11461028357806347b958a61461029657600080fd5b806328f59b83146102685780632b451c64146101e95780632d47fe27146101e95780632efd66291461027057600080fd5b806319ab453c116101c357806319ab453c146102535780631c357173146101e95780631e15495c146101e9578063243086c4146101e957600080fd5b8062048f5a146101e957806304dc7c74146101e957806306fdde0314610211575b600080fd5b6101fc6101f7366004611038565b610315565b60405190151581526020015b60405180910390f35b60408051808201909152600b81527f546573742054726561747900000000000000000000000000000000000000000060208201525b60405161020891906110e0565b6102666102613660046110fa565b61037f565b005b6102666104b4565b61026661027e366004611123565b6104ff565b610266610291366004611197565b610645565b610266610d22565b6101fc6102ac366004611038565b610d6c565b60408051808201909152601281527f54726561747920666f722074657374696e6700000000000000000000000000006020820152610246565b6000546102fd906001600160a01b031681565b6040516001600160a01b039091168152602001610208565b600080546001600160a01b031633146103755760405162461bcd60e51b815260206004820152601f60248201527f437572696f5472656174793a204f6e6c792067616d652063616e2063616c6c0060448201526064015b60405180910390fd5b5060015b92915050565b6000546001600160a01b0316156103fe5760405162461bcd60e51b815260206004820152602760248201527f437572696f5472656174793a2054726561747920616c726561647920696e697460448201527f69616c697a656400000000000000000000000000000000000000000000000000606482015260840161036c565b6001600160a01b03811661047a5760405162461bcd60e51b815260206004820152602560248201527f437572696f5472656174793a204469616d6f6e6420616464726573732072657160448201527f7569726564000000000000000000000000000000000000000000000000000000606482015260840161036c565b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b6104f56040518060400160405280601481526020017f44656c656761746547616d6546756e6374696f6e0000000000000000000000008152506000806104ff565b6104fd610da9565b565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa15801561054c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057091906111b0565b60405163b356003960e01b81523060048201529091506001600160a01b038084169163def700479184918a9188169063b356003990602401602060405180830381865afa1580156105c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105e991906111b0565b89896040518663ffffffff1660e01b815260040161060b9594939291906111c9565b600060405180830381600087803b15801561062557600080fd5b505af1158015610639573d6000803e3d6000fd5b50505050505050505050565b60005460405163b356003960e01b81523360048201526001600160a01b0390911690819063688513b290829063b356003990602401602060405180830381865afa158015610697573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106bb91906111b0565b60405163b356003960e01b81523060048201526001600160a01b0385169063b356003990602401602060405180830381865afa1580156106ff573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072391906111b0565b6040516001600160e01b031960e085901b16815260048101929092526024820152604401602060405180830381865afa158015610764573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061078891906111b0565b6000036107fd5760405162461bcd60e51b815260206004820152602160248201527f437572696f5472656174793a204f6e6c79207369676e65722063616e2063616c60448201527f6c00000000000000000000000000000000000000000000000000000000000000606482015260840161036c565b6000805460405163b356003960e01b81523360048201526001600160a01b039091169190829063b356003990602401602060405180830381865afa158015610849573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061086d91906111b0565b60005460405163b356003960e01b81523060048201529192506001600160a01b0390811691829163865ed32a91859187169063b356003990602401602060405180830381865afa1580156108c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108e991906111b0565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152600e60a48301527f557067726164654361706974616c00000000000000000000000000000000000060c48301526044820152606481018890526001608482015260e401600060405180830381600087803b15801561096957600080fd5b505af115801561097d573d6000803e3d6000fd5b505060405163b356003960e01b81523060048201526001600160a01b03808516935063865ed32a925085919087169063b356003990602401602060405180830381865afa1580156109d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f691906111b0565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152601b60a48301527f486172766573745265736f757263657346726f6d4361706974616c000000000060c48301526044820152606481018890526001608482015260e401600060405180830381600087803b158015610a7657600080fd5b505af1158015610a8a573d6000803e3d6000fd5b50506040517f32eebf76000000000000000000000000000000000000000000000000000000008152600481018890526001600160a01b03841692506332eebf769150602401600060405180830381600087803b158015610ae957600080fd5b505af1158015610afd573d6000803e3d6000fd5b505060405163b356003960e01b81523060048201526001600160a01b03808516935063865ed32a925085919087169063b356003990602401602060405180830381865afa158015610b52573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b7691906111b0565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152600e60a48301527f557067726164654361706974616c00000000000000000000000000000000000060c48301526044820152606481018890526000608482015260e401600060405180830381600087803b158015610bf657600080fd5b505af1158015610c0a573d6000803e3d6000fd5b505060405163b356003960e01b81523060048201526001600160a01b03808516935063865ed32a925085919087169063b356003990602401602060405180830381865afa158015610c5f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c8391906111b0565b6040516001600160e01b031960e085901b168152600481019290925260a06024830152601b60a48301527f486172766573745265736f757263657346726f6d4361706974616c000000000060c48301526044820152606481018890526000608482015260e401600060405180830381600087803b158015610d0357600080fd5b505af1158015610d17573d6000803e3d6000fd5b505050505050505050565b610d646040518060400160405280601481526020017f44656c656761746547616d6546756e6374696f6e000000000000000000000000815250600060016104ff565b6104fd610e95565b60008082806020019051810190610d839190611201565b509050808403610d97576000915050610379565b610da18484610315565b949350505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015610df6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e1a91906111b0565b6040517f5ffde144000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b03831690635ffde14490602401600060405180830381600087803b158015610e7857600080fd5b505af1158015610e8c573d6000803e3d6000fd5b50505050505050565b6000805460405163b356003960e01b81523360048201526001600160a01b03909116918291829063b356003990602401602060405180830381865afa158015610ee2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f0691906111b0565b6040517fff2a5e79000000000000000000000000000000000000000000000000000000008152600481018290529091506001600160a01b0383169063ff2a5e79906024016020604051808303816000875af1158015610f69573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f8d91906111b0565b50505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600067ffffffffffffffff80841115610fdd57610fdd610f93565b604051601f8501601f19908116603f0116810190828211818310171561100557611005610f93565b8160405280935085815286868601111561101e57600080fd5b858560208301376000602087830101525050509392505050565b6000806040838503121561104b57600080fd5b82359150602083013567ffffffffffffffff81111561106957600080fd5b8301601f8101851361107a57600080fd5b61108985823560208401610fc2565b9150509250929050565b6000815180845260005b818110156110b95760208185018101518683018201520161109d565b818111156110cb576000602083870101525b50601f01601f19169290920160200192915050565b6020815260006110f36020830184611093565b9392505050565b60006020828403121561110c57600080fd5b81356001600160a01b03811681146110f357600080fd5b60008060006060848603121561113857600080fd5b833567ffffffffffffffff81111561114f57600080fd5b8401601f8101861361116057600080fd5b61116f86823560208401610fc2565b935050602084013591506040840135801515811461118c57600080fd5b809150509250925092565b6000602082840312156111a957600080fd5b5035919050565b6000602082840312156111c257600080fd5b5051919050565b85815260a0602082015260006111e260a0830187611093565b6040830195909552506060810192909252151560809091015292915050565b6000806040838503121561121457600080fd5b50508051602090910151909290915056fea2646970667358221220f1643e28b1eca2951061c1b1441a87f87f0480c2e7e3ab15dd411b88deb7b64264736f6c634300080d0033";

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
