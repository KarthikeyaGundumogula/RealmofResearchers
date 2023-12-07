import React from "react";
import axios from "axios";

const MyComponent = () => {
  const apiUrl = "https://api-testnet.dock.io/credentials/";
  const apiKey = process.env.NEXT_PUBLIC_DOCK_API_KEY;

  const requestData = {
    persist: false,
    anchor: true,
    schema:
      "https://schema.dock.io/ResearcherCredibilityIndex-V1.0-1701860537629.json",
    credential: {
      type: ["ResearcherCredibilityIndex"],
      subject: {
        id:
          "did:polygonid:polygon:main:2q2Bxo9tQ5jhdqMcpYaC43Ca6cL49RuJVhQH8CpGJo",
        Name: "Karthikeya",
        RCI: 123,
      },
      issuer:
        "did:polygonid:polygon:mumbai:2qFban4MPqPp7QcKQYFRuAd3MWrUN2x3NinBEdUo5N",
    },
  };

  const headers = {
    "DOCK-API-TOKEN": apiKey,
    "Content-Type": "application/json",
  };

  const getCredentials = async () => {
    console.log(apiKey);
    try {
      const response = await axios.post(apiUrl, requestData, { headers });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Your component code here */}
      <button onClick={getCredentials}>Get Credentials</button>
    </div>
  );
};

export default MyComponent;
