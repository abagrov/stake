/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export interface StakeInterface extends utils.Interface {
  functions: {
    "claim()": FunctionFragment;
    "setPercentage(uint256)": FunctionFragment;
    "setRewardHold(uint256)": FunctionFragment;
    "setStakingHold(uint256)": FunctionFragment;
    "stake(uint256)": FunctionFragment;
    "unstake()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "claim"
      | "setPercentage"
      | "setRewardHold"
      | "setStakingHold"
      | "stake"
      | "unstake"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "claim", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setPercentage",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setRewardHold",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setStakingHold",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "stake", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "unstake", values?: undefined): string;

  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRewardHold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStakingHold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unstake", data: BytesLike): Result;

  events: {
    "Claimed(uint256)": EventFragment;
    "Staked(uint256,uint256)": EventFragment;
    "Unstaked(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Staked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unstaked"): EventFragment;
}

export interface ClaimedEventObject {
  amount: BigNumber;
}
export type ClaimedEvent = TypedEvent<[BigNumber], ClaimedEventObject>;

export type ClaimedEventFilter = TypedEventFilter<ClaimedEvent>;

export interface StakedEventObject {
  amount: BigNumber;
  until: BigNumber;
}
export type StakedEvent = TypedEvent<[BigNumber, BigNumber], StakedEventObject>;

export type StakedEventFilter = TypedEventFilter<StakedEvent>;

export interface UnstakedEventObject {
  amount: BigNumber;
}
export type UnstakedEvent = TypedEvent<[BigNumber], UnstakedEventObject>;

export type UnstakedEventFilter = TypedEventFilter<UnstakedEvent>;

export interface Stake extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StakeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    claim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPercentage(
      _percentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRewardHold(
      _rewardHold: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setStakingHold(
      _stakingHold: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unstake(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  claim(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPercentage(
    _percentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRewardHold(
    _rewardHold: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setStakingHold(
    _stakingHold: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stake(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unstake(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    claim(overrides?: CallOverrides): Promise<void>;

    setPercentage(
      _percentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setRewardHold(
      _rewardHold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setStakingHold(
      _stakingHold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stake(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    unstake(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Claimed(uint256)"(amount?: null): ClaimedEventFilter;
    Claimed(amount?: null): ClaimedEventFilter;

    "Staked(uint256,uint256)"(amount?: null, until?: null): StakedEventFilter;
    Staked(amount?: null, until?: null): StakedEventFilter;

    "Unstaked(uint256)"(amount?: null): UnstakedEventFilter;
    Unstaked(amount?: null): UnstakedEventFilter;
  };

  estimateGas: {
    claim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPercentage(
      _percentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRewardHold(
      _rewardHold: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setStakingHold(
      _stakingHold: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unstake(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPercentage(
      _percentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRewardHold(
      _rewardHold: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setStakingHold(
      _stakingHold: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unstake(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
