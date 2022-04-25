import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import { getWallet } from "../lib/wallet";
import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";

task("claim", "Claim reward from protocol")
    .addParam("contract", "Contract address")
    .addParam("sender", "Sender pk", "")
    .setAction(async (args, hre) => {
        const sender = await getWallet(args.sender);
        const staking = await getContractAt(hre, "Stake", args.contract);

        const tx = await staking.connect(sender).claim({ gasLimit: 500_000, });
        await tx.wait();

        console.log("Claimed ok");
    });