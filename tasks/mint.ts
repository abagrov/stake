import { task, types } from "hardhat/config";
import { BigNumber, Contract } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { getContract } from "../lib/contract";
import { getWallet } from "../lib/wallet";
import { parseBadToken } from "../lib/parse";
import { getProvider } from "../lib/provider";
import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";
task("mint", "Mint some tokens.")
    .addParam("to", "Recepient address.", undefined, types.string)
    .addParam("contract", "Contract address.", undefined, types.string)
    .addParam("amount", "Amount of transfer operation.", undefined, types.string)
    .setAction(async (taskArgs, hre) => {
        return getContractAt(hre, "Token", taskArgs.contract)
            .then(async (contract: Contract) => {
                const to = getWallet(taskArgs.to);
                const tx = await contract.mint(to.address, parseBadToken(taskArgs.amount), { gasLimit: 500_000, });
                await tx.wait();
                console.log(tx.hash);
            })
    });