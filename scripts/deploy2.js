// deploy.js
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    // Deploy the ERC2771Forwarder
    const Forwarder = await ethers.getContractFactory("ERC2771Forwarder");
    const forwarder = await Forwarder.deploy();
    await forwarder.deployed();

    console.log("Forwarder deployed to:", forwarder.address);

    // Deploy the KingbaCrownNFT with the forwarder's address
    const KingbaCrownNFT = await ethers.getContractFactory("KingbaCrownNFT");
    const kingbaCrownNFT = await KingbaCrownNFT.deploy(forwarder.address);
    await kingbaCrownNFT.deployed();

    console.log("KingbaCrownNFT deployed to:", kingbaCrownNFT.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
