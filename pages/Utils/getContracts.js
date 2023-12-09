import { ethers } from "ethers";

export const getContract = async(abi, address) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
};