const fs = require('fs');
const { ethers } = require('hardhat');
require("@nomiclabs/hardhat-ethers");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const deployedContractsPath = './deployed';
    if (!fs.existsSync(deployedContractsPath)) {
        fs.mkdirSync(deployedContractsPath);
    }

    const deployContract = async (contractName, ...args) => {
        const contractFactory = await ethers.getContractFactory(contractName);
        const contract = await contractFactory.deploy(...args);
        await contract.deployed();

        console.log(`${contractName} deployed to:`, contract.address);

        const contractInfo = {
            address: contract.address,
            abi: JSON.parse(contract.interface.format('json')),
        };

        fs.writeFileSync(`${deployedContractsPath}/${contractName}.json`, JSON.stringify(contractInfo, null, 2));
    };

    // Deploy KingbaCrownNFT if not deployed
    const kingbaCrownNFTPath = `${deployedContractsPath}/KingbaCrownNFT.json`;
    if (!fs.existsSync(kingbaCrownNFTPath)) {
        await deployContract("KingbaCrownNFT");
    } else {
        console.log("KingbaCrownNFT already deployed");
    }

    // Deploy Faucet if not deployed
    const faucetPath = `${deployedContractsPath}/Faucet.json`;
    if (!fs.existsSync(faucetPath)) {
        const dripAmount = ethers.utils.parseEther("0.1"); // Drip amount in ETH
        const cooldownTime = 3600; // Cooldown time in seconds
        const initialDeposit = ethers.utils.parseEther("1"); // Initial deposit in ETH
        const faucetFactory = await ethers.getContractFactory("Faucet");
        const faucet = await faucetFactory.deploy(dripAmount, cooldownTime, { value: initialDeposit });
        await faucet.deployed();

        console.log("Faucet deployed to:", faucet.address);

        const faucetInfo = {
            address: faucet.address,
            abi: JSON.parse(faucet.interface.format('json')),
        };

        fs.writeFileSync(`${deployedContractsPath}/Faucet.json`, JSON.stringify(faucetInfo, null, 2));
    } else {
        console.log("Faucet already deployed");
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
