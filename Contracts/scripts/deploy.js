const { ethers } = require("hardhat");

async function main() {
  // const [deployer] = await ethers.getSigners();

  // console.log("Deploying contracts with the account:", deployer.address);
  // const paperNFTs = await ethers.deployContract("Verifier", [
  //   "0x66FBde39f4325C57dDBA2f9f85194FbA453fFC7E",
  // ]);

  // // console.log("PaperNFTs contract deployed to:", await paperNFTs.getAddress());
  // const paperNFTsAddress = await paperNFTs.getAddress();
  await hre.run("verify:verify", {
    address: "0x8F0C696977C83AFd9f2E03e3f4dB180dfF59A5fD",
    constructorArguments: ["0x66FBde39f4325C57dDBA2f9f85194FbA453fFC7E"],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
