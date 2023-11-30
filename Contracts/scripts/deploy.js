
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const PaperNFTs = await ethers.getContractFactory("PaperNFTs");
  const paperNFTs = await PaperNFTs.deploy();

  console.log("PaperNFTs contract deployed to:", paperNFTs.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
