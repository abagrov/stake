import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import { getWallet } from "../lib/wallet";
import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";

task("stake", "Stake specified amount of token to protocol")
    .addParam("contract", "Contract address")
    .addParam("token", "Target token address")
    .addParam("sender", "Sender pk", "")
    .addParam("amount", "Amount of token to stake")
    .setAction(async (args, hre) => {
        const sender = await getWallet(args.sender);
        const staking = await getContractAt(hre, "Stake", args.contract);
        const token = await getContractAt(hre, "Token", args.token);
        
        let tx = await token.connect(sender).approve(staking.address,args.amount);
        await tx.wait();

        tx = await staking.connect(sender).stake(args.amount);
        await tx.wait();

        console.log("Staked ok");
    });