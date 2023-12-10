import React, { useState, useEffect } from "react";
import Researcher from "../components/User-Profile/researcher";
import NonResearcherProfile from "../components/User-Profile/non-researcher-profile";
import { useAccount } from "wagmi";
import { getGraphData } from "../Utils/getGraphData";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { Button, IconButton } from "@chakra-ui/react";
import styles from "../styles/profile/researcher.module.css";

function Profile() {
  const [isCreator, setIsCreator] = useState(false);
  const [isSupporter, setIsSupporter] = useState(false);
  const [creator, setCreator] = useState("");
  const [supporter, setSupporter] = useState("");
  const [CURI, setCURI] = useState("");
  const [SURI, setSURI] = useState("");
  const { address, connector, isConnected } = useAccount();
  useEffect(() => {
    async function getCreator() {
      try {
        if (isConnected) {
          const query = `{
         creators(where: {creator:"${address}"}) {
          creator,
          URI
        }
        supporters(where: {supporter:"${address}"}) {
          supporter
        }
      }`;
          const creator = await getGraphData(query);
          console.log(creator);
          if (creator.data.data.creators.length > 0) {
            setCreator(creator.data.data.creators[0].creator);
            setCURI(creator.data.data.creators[0].URI);
            setIsCreator(true);
          }
          if (creator.data.data.supporters.length > 0) {
            setSupporter(creator.data.data.supporters[0].supporter);
            setSURI(creator.data.data.supporters[0].URI);
            setIsSupporter(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    getCreator();
  }, [address]);
  return (
    <>
      <header className={styles.btnSection}>
        <Link as={NextLink} href="/">
          <Button
            className={styles.homeBtn}
            variant="solid"
            w="138px"
            colorScheme="green"
          >
            Home
          </Button>
        </Link>
        <Button
          className={styles.connectBtn}
          variant="solid"
          w="138px"
          colorScheme="green"
          onClick={() => {
            if (!isConnected) {
              connector.deactivate();
            }
          }}
        >
          {isConnected ? "Connected" : "Connect"}
        </Button>
      </header>
      {isCreator && isConnected && (
        <Researcher data={{ address: creator, uri: CURI }} />
      )}
      {isSupporter && isConnected && (
        <NonResearcherProfile data={{ address: supporter }} />
      )}
    </>
  );
}

export default Profile;
