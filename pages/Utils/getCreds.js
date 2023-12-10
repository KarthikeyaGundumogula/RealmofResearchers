import axios from "axios";
import { NFTs_Address, NFTs_ABI } from "../Constants/contracts";
import { getContract } from "../Utils/getContracts";
import { ethers } from "ethers";

export const getRCICreds = async (address, subjectDID) => {
  const contract = await getContract(NFTs_ABI, NFTs_Address);
  const creator = await contract.getCreator(address);
  const RCI =
    0.3 * ethers.formatUnits(creator[3], "wei") +
    0.3 * ethers.formatUnits(creator[5], "wei") +
    0.4 * ethers.formatUnits(creator[4], "wei");
  const apiUrl = "https://api-testnet.dock.io/credentials/";
  const apiKey = process.env.NEXT_PUBLIC_DOCK_API_KEY;
  const requestData = {
    persist: false,
    anchor: true,
    schema:
      "https://schema.dock.io/ResearcherCredibilityIndex-V1-1702221132313.json",
    credential: {
      type: ["ResearcherCredibilityIndex"],
      subject: {
        id:
          subjectDID ||
          "did:polygonid:polygon:mumbai:2qFban4MPqPp7QcKQYFRuAd3MWrUN2x3NinBEdUo5N",
        Address: address,
        RCI: RCI,
      },
      issuer: "did:dock:5CodU9MBdtDzSNWauc9jYEEyUXdCuVcFdoWX1rQLrjhULrRw",
    },
  };

  const headers = {
    "DOCK-API-TOKEN": apiKey,
    "Content-Type": "application/json",
  };
  console.log(apiKey);
  try {
    const response = await axios.post(apiUrl, requestData, { headers });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
