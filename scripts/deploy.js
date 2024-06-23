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

    const forwarderAddress = '0xEB958aD49c9D8D289CfAE5f9f0150d0D5Bf597C8'; // OpenZeppelin Base Sepolia Forwarder address

    // Deploy KingbaCrownNFT if not deployed
    const kingbaCrownNFTPath = `${deployedContractsPath}/KingbaCrownNFT.json`;
    if (!fs.existsSync(kingbaCrownNFTPath)) {
        await deployContract("KingbaCrownNFT", forwarderAddress);
    } else {
        console.log("KingbaCrownNFT already deployed");
    }

    // Deploy Faucet if not deployed
    const faucetPath = `${deployedContractsPath}/Faucet.json`;
    if (!fs.existsSync(faucetPath)) {
        const dripAmount = ethers.utils.parseEther("0.1"); // Drip amount in ETH
        const cooldownTime = 3600; // Cooldown time in seconds
        const initialDeposit = ethers.utils.parseEther("1"); // Initial deposit in ETH
        await deployContract("Faucet", dripAmount, cooldownTime, { value: initialDeposit });
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
