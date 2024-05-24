async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const KingbaCrownNFT = await ethers.getContractFactory("KingbaCrownNFT");
    const kingbaCrownNFT = await KingbaCrownNFT.deploy();
  
    console.log("KingbaCrownNFT deployed to:", kingbaCrownNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  