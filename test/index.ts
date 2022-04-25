import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers, network } from "hardhat";
import conf from "../config";

describe("Staking", function () {
  let stakingTokenContract: Contract;
  let rewardTokenContract: Contract;
  let stakingContract: Contract;
  let owner: SignerWithAddress, user1: SignerWithAddress;

  const stakingAmount = 1_000_000;
  const stakingRewardSupply = 1_000_000_000_000;
  const defaultStakingHold = 5 * 60;
  const defaultRewardHold = 2 * 60;
  const defaultPercentage = 1;

  this.beforeEach(async () => {
    [owner, user1] = await ethers.getSigners();
    const tokenFactory = await ethers.getContractFactory("Token");

    stakingTokenContract = await tokenFactory.deploy(owner.address, "name", "symbol", conf.decimals, conf.totalSupply);
    rewardTokenContract = await tokenFactory.deploy(owner.address, "name", "symbol", conf.decimals, conf.totalSupply);

    const StakingContract = await ethers.getContractFactory("Stake");
    stakingContract = await StakingContract.deploy(stakingTokenContract.address, rewardTokenContract.address);

    await stakingTokenContract.deployed();
    await rewardTokenContract.deployed();
    await stakingContract.deployed();

    await stakingTokenContract.mint(owner.address, parseEther("1"));
    await rewardTokenContract.mint(owner.address, parseEther("1"));

    await rewardTokenContract.approve(stakingContract.address, stakingRewardSupply);
    await stakingTokenContract.transfer(user1.address, stakingAmount);

    stakingContract = stakingContract.connect(user1);
    stakingTokenContract = stakingTokenContract.connect(user1);
    rewardTokenContract = rewardTokenContract.connect(user1);
  })

  it("Zero coin staking should fail", async function () {
    await expect(stakingContract.stake(0)).to.be.reverted;
  });

  it("Unstake during hold should fail", async function () {
    await stakingTokenContract.approve(stakingContract.address, stakingAmount);
    await stakingContract.stake(stakingAmount);
    await expect(stakingContract.unstake()).to.be.reverted;
  });

  it("Unstaking in case deposit no tokens should fail", async function () {
    await expect(stakingContract.unstake()).to.be.reverted;
  });

  it("Claim with no tokens should fail", async function () {
    await expect(stakingContract.claim()).to.be.reverted;
  });

  it("Get reward during hold should fail", async function () {
    await stakingTokenContract.approve(stakingContract.address, stakingAmount);
    await stakingContract.stake(stakingAmount);
    await expect(stakingContract.claim()).to.be.reverted;
  });

  it("Check that user can unstake after hold", async function () {
    await stakingTokenContract.approve(stakingContract.address, stakingAmount);
    const initialBalance = await stakingTokenContract.balanceOf(user1.address);
    await stakingContract.stake(stakingAmount);

    const balanceAfterStake = await stakingTokenContract.balanceOf(user1.address);

    expect(initialBalance.sub(balanceAfterStake)).to.equal(stakingAmount);

    await network.provider.send("evm_increaseTime", [defaultStakingHold]);
    await stakingContract.unstake();

    const balanceAfterUnstake = await stakingTokenContract.balanceOf(user1.address);
    expect(balanceAfterUnstake).to.equal(initialBalance);
  });

  it("Check event stake", async function () {
    await stakingTokenContract.approve(stakingContract.address, stakingAmount);

    const stakeTransaction = await stakingContract.stake(stakingAmount);
    const rc = await stakeTransaction.wait();

    const stakedEvent = rc.events.find((e: { event: string; }) => e.event == 'Staked');
    const [amount, until,] = stakedEvent.args;

    expect(amount).to.be.equal(stakingAmount);
  });

  it("Check Unstaked event", async function () {
    const newStakingHold = 3 * 60;
    await stakingContract.connect(owner).setStakingHold(newStakingHold);
    await stakingTokenContract.approve(stakingContract.address, stakingAmount);
    const initialBalance = await stakingTokenContract.balanceOf(user1.address);
    await stakingContract.stake(stakingAmount);

    const balanceAfterStake = await stakingTokenContract.balanceOf(user1.address);

    expect(initialBalance.sub(balanceAfterStake)).to.equal(stakingAmount);

    await network.provider.send("evm_increaseTime", [newStakingHold]);
    const unstakingTransaction = await stakingContract.unstake();

    const rc = await unstakingTransaction.wait()

    const stakedEvent = rc.events.find((e: { event: string; }) => e.event == 'Unstaked');
    const [amount] = stakedEvent.args;

    expect(amount).to.be.equal(stakingAmount);
  });

  it("10. Check that user can get reward after hold", async function () {
    await stakingTokenContract.approve(stakingContract.address, stakingAmount);

    const initialReward = await rewardTokenContract.balanceOf(user1.address);
    await stakingContract.stake(stakingAmount);

    const rewardAfterStake = await rewardTokenContract.balanceOf(user1.address);

    expect(initialReward).to.equal(rewardAfterStake);

    await network.provider.send("evm_increaseTime", [defaultRewardHold]);
    await stakingContract.claim();

    const rewardAfterClaim = await rewardTokenContract.balanceOf(user1.address);
    
    console.log(rewardAfterClaim, initialReward, stakingAmount * defaultPercentage / 100);

    expect(rewardAfterClaim - initialReward).to.be.equal(stakingAmount * defaultPercentage / 100);
  });

  it("Check that user can get reward after hold changed by owner", async function () {
    const newRewardHold = 3 * 60;
    await stakingContract.connect(owner).setRewardHold(newRewardHold);

    await stakingTokenContract.approve(stakingContract.address, stakingAmount);

    const initialReward = await rewardTokenContract.balanceOf(user1.address);
    await stakingContract.stake(stakingAmount);

    const rewardAfterStake = await rewardTokenContract.balanceOf(user1.address);

    expect(initialReward).to.equal(rewardAfterStake);

    await network.provider.send("evm_increaseTime", [newRewardHold]);
    await stakingContract.claim();

    const rewardAfterUnstake = await rewardTokenContract.balanceOf(user1.address);
    expect(rewardAfterUnstake > initialReward);
  });

  it("Check percentage changing", async function () {
    const newPrecentage = 10;
    await stakingContract.connect(owner).setPercentage(newPrecentage);

    await stakingTokenContract.approve(stakingContract.address, stakingAmount);

    const initialReward = await rewardTokenContract.balanceOf(user1.address);
    await stakingContract.stake(stakingAmount);

    await network.provider.send("evm_increaseTime", [defaultRewardHold]);
    await stakingContract.claim();

    const rewardAfterClaim = await rewardTokenContract.balanceOf(user1.address);

    expect(rewardAfterClaim - initialReward).to.be.equal(stakingAmount * newPrecentage / 100);
  });

  it("Check that only owner can change percentage", async function () {
    await expect(stakingContract.setPercentage(10)).to.be.reverted;
  });

  it("Check that only owner can change reward hold", async function () {
    await expect(stakingContract.setRewardHold(0)).to.be.reverted;
  });

  it("Check that only owner can change stake hold", async function () {
    await expect(stakingContract.setRewardHold(0)).to.be.reverted;
  });
});