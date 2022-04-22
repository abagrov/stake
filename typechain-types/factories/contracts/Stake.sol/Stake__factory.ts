/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Stake, StakeInterface } from "../../../contracts/Stake.sol/Stake";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakingToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rewardToken",
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
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Claimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "until",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstaked",
    type: "event",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_percentage",
        type: "uint256",
      },
    ],
    name: "setPercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rewardHold",
        type: "uint256",
      },
    ],
    name: "setRewardHold",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_stakingHold",
        type: "uint256",
      },
    ],
    name: "setStakingHold",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620011a1380380620011a1833981810160405281019062000037919062000132565b6014600281905550816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506104b060038190555061025860048190555033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050620001c1565b6000815190506200012c81620001a7565b92915050565b600080604083850312156200014657600080fd5b600062000156858286016200011b565b925050602062000169858286016200011b565b9150509250929050565b6000620001808262000187565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b620001b28162000173565b8114620001be57600080fd5b50565b610fd080620001d16000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80632def6620146100675780634e71d92d146100715780635da4a1d31461007b578063732f74d714610097578063a694fc3a146100b3578063de724f83146100cf575b600080fd5b61006f6100eb565b005b610079610360565b005b61009560048036038101906100909190610aa7565b610620565b005b6100b160048036038101906100ac9190610aa7565b6106ba565b005b6100cd60048036038101906100c89190610aa7565b610754565b005b6100e960048036038101906100e49190610aa7565b6109ba565b005b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541161016d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161016490610c7d565b60405180910390fd5b42600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411156101ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101e690610c3d565b60405180910390fd5b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016102d3929190610bd4565b602060405180830381600087803b1580156102ed57600080fd5b505af1158015610301573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103259190610a7e565b507f11725367022c3ff288940f4b5473aa61c2da6a24af7363a1128ee2401e8983b2816040516103559190610c9d565b60405180910390a150565b42600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411156103e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d990610c3d565b60405180910390fd5b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411610464576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045b90610bfd565b60405180910390fd5b60006064600254600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546104b59190610d79565b6104bf9190610d48565b9050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1633846040518463ffffffff1660e01b815260040161054293929190610b9d565b602060405180830381600087803b15801561055c57600080fd5b505af1158015610570573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105949190610a7e565b50600454426105a39190610cf2565b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507f7a355715549cfe7c1cba26304350343fbddc4b4f72d3ce3e7c27117dd20b5cb8816040516106159190610c9d565b60405180910390a150565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146106b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106a790610c1d565b60405180910390fd5b8060028190555050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461074a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074190610c1d565b60405180910390fd5b8060038190555050565b60008111610797576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078e90610c5d565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b81526004016107f493929190610b9d565b602060405180830381600087803b15801561080e57600080fd5b505af1158015610822573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108469190610a7e565b5080600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546108969190610cf2565b92505081905550600354426108ab9190610cf2565b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600454426108fc9190610cf2565b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507f925435fa7e37e5d9555bb18ce0d62bb9627d0846942e58e5291e9a2dded462ed81600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040516109af929190610cb8565b60405180910390a150565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a4a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a4190610c1d565b60405180910390fd5b8060048190555050565b600081519050610a6381610f6c565b92915050565b600081359050610a7881610f83565b92915050565b600060208284031215610a9057600080fd5b6000610a9e84828501610a54565b91505092915050565b600060208284031215610ab957600080fd5b6000610ac784828501610a69565b91505092915050565b610ad981610dd3565b82525050565b6000610aec601083610ce1565b9150610af782610e79565b602082019050919050565b6000610b0f601f83610ce1565b9150610b1a82610ea2565b602082019050919050565b6000610b32600e83610ce1565b9150610b3d82610ecb565b602082019050919050565b6000610b55602b83610ce1565b9150610b6082610ef4565b604082019050919050565b6000610b78601483610ce1565b9150610b8382610f43565b602082019050919050565b610b9781610e11565b82525050565b6000606082019050610bb26000830186610ad0565b610bbf6020830185610ad0565b610bcc6040830184610b8e565b949350505050565b6000604082019050610be96000830185610ad0565b610bf66020830184610b8e565b9392505050565b60006020820190508181036000830152610c1681610adf565b9050919050565b60006020820190508181036000830152610c3681610b02565b9050919050565b60006020820190508181036000830152610c5681610b25565b9050919050565b60006020820190508181036000830152610c7681610b48565b9050919050565b60006020820190508181036000830152610c9681610b6b565b9050919050565b6000602082019050610cb26000830184610b8e565b92915050565b6000604082019050610ccd6000830185610b8e565b610cda6020830184610b8e565b9392505050565b600082825260208201905092915050565b6000610cfd82610e11565b9150610d0883610e11565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610d3d57610d3c610e1b565b5b828201905092915050565b6000610d5382610e11565b9150610d5e83610e11565b925082610d6e57610d6d610e4a565b5b828204905092915050565b6000610d8482610e11565b9150610d8f83610e11565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610dc857610dc7610e1b565b5b828202905092915050565b6000610dde82610df1565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e6f20746f6b656e73207374616b656400000000000000000000000000000000600082015250565b7f596f7520617265206e6f742074686520636f6e7472616374206f776e65722e00600082015250565b7f4974277320746f6f206561726c79000000000000000000000000000000000000600082015250565b7f5374616b696e6720616d6f756e742073686f756c64206265206772656174657260008201527f207468616e207a65726f2e000000000000000000000000000000000000000000602082015250565b7f4e6f20746f6b656e7320746f20756e7374616b65000000000000000000000000600082015250565b610f7581610de5565b8114610f8057600080fd5b50565b610f8c81610e11565b8114610f9757600080fd5b5056fea2646970667358221220ffbb28d26f24df5997f240e7367c18181ab5062354b85707662d81e3d3c2f6fb64736f6c63430008040033";

type StakeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Stake__factory extends ContractFactory {
  constructor(...args: StakeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _stakingToken: string,
    _rewardToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Stake> {
    return super.deploy(
      _stakingToken,
      _rewardToken,
      overrides || {}
    ) as Promise<Stake>;
  }
  override getDeployTransaction(
    _stakingToken: string,
    _rewardToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _stakingToken,
      _rewardToken,
      overrides || {}
    );
  }
  override attach(address: string): Stake {
    return super.attach(address) as Stake;
  }
  override connect(signer: Signer): Stake__factory {
    return super.connect(signer) as Stake__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakeInterface {
    return new utils.Interface(_abi) as StakeInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Stake {
    return new Contract(address, _abi, signerOrProvider) as Stake;
  }
}
