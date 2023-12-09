import React, { useState, useEffect } from "react";
import Researcher from "../components/User-Profile/researcher";
import NonResearcherProfile from "../components/User-Profile/non-researcher-profile";
import { useAccount } from "wagmi";
import { getGraphData } from "../Utils/getGraphData";

function Profile() {
  const [isCreator, setIsCreator] = useState(false);
  const [isSupporter, setIsSupporter] = useState(false);
  const [creator, setCreator] = useState("");
  const { address, connector, isConnected } = useAccount();
  useEffect(() => {
    async function getCreator() {
      try {
        if (isConnected) {
          const query = `{
         creators(where: {creator: "${address}"}) {
                            creator
                            noOfPaper
                            id
                          }
      }`;
          const creator = await getGraphData(query);
          setCreator(creator.data.data.creators[0].creator);
          setIsCreator(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getCreator();
  }, [address]);
  return (
    <>
      {isCreator ? (
        <Researcher data={{ address: creator }} />
      ) : (
        <NonResearcherProfile />
      )}
    </>
  );
}

export default Profile;
