import { task, types } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import { getWallet } from "../lib/wallet";
import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";
import { parseEther } from "ethers/lib/utils";

task("stake", "Stake specified amount of token to protocol")
    .addParam("contract", "Contract address")
    .addParam("token", "Target token address")
    .addParam("sender", "Sender pk", "")
    .addParam("amount", "Amount of token to stake", undefined, types.string)
    .setAction(async (args, hre) => {
        const sender = await getWallet(args.sender);
        const staking = await getContractAt(hre, "Stake", args.contract);
        const token = await getContractAt(hre, "Token", args.token);

        let tx = await token.connect(sender).approve(staking.address, parseEther(args.amount), { gasLimit: 500_000, });
        await tx.wait();
        
        tx = await staking.connect(sender).stake(parseEther(args.amount), { gasLimit: 500_000, });
        await tx.wait();

        console.log("Staked ok");
    });