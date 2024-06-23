require('dotenv').config();
const { ethers } = require('ethers');
const Faucet = require('../deployed/Faucet.json');

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_SEPOLIA_URL);
    const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);

    const faucetContract = new ethers.Contract(Faucet.address, Faucet.abi, wallet);

    const newDripAmount = ethers.utils.parseEther("0.001"); // New drip amount in ETH
    const tx = await faucetContract.setDripAmount(newDripAmount);

    console.log("Transaction hash:", tx.hash);
    await tx.wait();

    console.log("Drip amount changed successfully!");
}

main().catch(console.error);
