require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20"
      }
    ]
  },
  networks: {
    base_sepolia: {
      url: process.env.REACT_APP_SEPOLIA_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: {
      base_sepolia: process.env.REACT_APP_ETHERSCAN_API_KEY
    },
    customChains: [
      {
        network: "base_sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org",
          browserURL: "https://sepolia.basescan.org/"
        }
      }
    ]
  }
};
