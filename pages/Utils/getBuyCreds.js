import axios from "axios";

export const getBuyCreds = async (
  contract_address,
  tokenId,
  Amount,
  subjectDID
) => {
  const apiUrl = "https://api-testnet.dock.io/credentials/";
  const apiKey = process.env.NEXT_PUBLIC_DOCK_API_KEY;
  const requestData = {
    persist: false,
    anchor: true,
    schema: "https://schema.dock.io/NFTOwnership-V1-1702219656112.json",
    credential: {
      type: ["NFTOwnership"],
      subject: {
        id:
          subjectDID ||
          "did:polygonid:polygon:mumbai:2qFban4MPqPp7QcKQYFRuAd3MWrUN2x3NinBEdUo5N",
        Contract_Address: contract_address,
        TokenID: tokenId,
        Amount: Amount,
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
