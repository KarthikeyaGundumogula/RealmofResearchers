const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  const paperNFTs = await ethers.deployContract("NFTs");

  console.log("PaperNFTs contract deployed to:", await paperNFTs.getAddress());
}

async function verifiy(deployedVerifyContract) {
  await hre.run("verify:verify", {
    address: deployedVerifyContract,
    constructorArguments: [],
  });
}

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

verifiy("0x66FBde39f4325C57dDBA2f9f85194FbA453fFC7E").then(() =>
  process.exit(0)
);
