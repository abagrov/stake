import { ethers } from "hardhat";
import conf from "../config";
import config from "../config";
import { getWallet } from "../lib/wallet"
import { ContractTransaction, ContractReceipt, Contract } from "ethers";
import { FACTORY_ADDRESS } from "@uniswap/sdk";
import IUniswapV2Factory from "@uniswap/v2-core/build/IUniswapV2Factory.json";

async function deployToken(name: string, symbol: string): Promise<Contract> {
  const { OWNER_ADDRESS } = process.env;

  const factory = await ethers.getContractFactory("Token");
  return factory.deploy(OWNER_ADDRESS, name, symbol, conf.decimals, conf.totalSupply);
}

async function main(): Promise<void> {
  const tokenA = await deployToken("Token A", "TOKA");
  const tokenB = await deployToken("Token B", "TOKB");
  const reward = await deployToken("Reward Token", "RWD");

  await Promise.all([
    tokenA.deployed(),
    tokenB.deployed(),
    reward.deployed(),
  ]);

  const deployer = getWallet("OWNER_PRIVATE");
  const uniswap = new ethers.Contract(
    FACTORY_ADDRESS,
    IUniswapV2Factory.abi,
    deployer
  ) as any;

  console.log(`Token A deployed with address ${tokenA.address}`);
  console.log(`Token B deployed with address ${tokenB.address}`);
  console.log(`Reward Token deployed with address ${reward.address}`);

  const createPair: ContractTransaction = await uniswap.createPair(
    tokenA.address,
    tokenB.address
  );
  const pairReceipt: ContractReceipt = await createPair.wait();

  const pairAddress: string = pairReceipt.events!![0].args!![2];
  console.log(`Pair deployed with address ${pairAddress}`);

  const stakingFactory = await ethers.getContractFactory("Stake");
  const staking = await stakingFactory.deploy(pairAddress, reward.address);

  await staking.deployed();

  console.log(`Staking deployed to address ${staking.address}`);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
