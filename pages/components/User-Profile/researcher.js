import styles from "../../styles/profile/researcher.module.css";
import ResearchPaperCard from "../Researcher-Page/Research-Paper-Card";
import TokenTableRow from "../Researcher-Page/Token-Table-Row";
import TokenHoldingRow from "./Token-Hoding-Row";
import { useAccount } from "wagmi";
import { getGraphData } from "../../Utils/getGraphData";
import { useEffect, useState } from "react";
import { Button, HStack } from "@chakra-ui/react";
import { RandomAvatar } from "react-random-avatars";
import TokenMintModal from "./mint-modals/token-mint-modal";
import PaperMintModal from "./mint-modals/paper-mint-modal";
import axios from "axios";
import { getURI } from "../../Constants/getURI";
import { getContract } from "../../Utils/getContracts";
import { NFTs_ABI, NFTs_Address } from "../../Constants/contracts";
import { ethers } from "ethers";

const ResearcherProfileV2 = (props) => {
  const [researchPapers, setResearchPapers] = useState([]);
  const [socialTokens, setSocialTokens] = useState([]);
  const [supporters, setSupporters] = useState([]);
  const [name, setName] = useState("Kap");
  const [retoksBalance, setRetoksBalance] = useState(0);
  const [tokenMintModalOpen, setTokenMintModalOpen] = useState(false);
  const [paperMinModalOpen, setPaperMinModalOpen] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    async function getData() {
      const query = `{
        researchPapers(where: {researcher:"${props.data.address}"}) {
        id
        }
        socialTokens(where: {creator:"${props.data.address}"}) {
          URI
        }
        supporters(where: {supporter:"${props.data.address}"}) {
          paperID
        }
      }`;
      try {
        const response = await getGraphData(query);
        setResearchPapers(response.data.data.researchPapers);
        setSocialTokens(response.data.data.socialTokens);
        setSupporters(response.data.data.supporters);
      } catch (e) {
        console.error(e);
      }
      const url = getURI(props.data.uri);
      const creatorData = await axios.get(url);
      setName(creatorData.data.name);
      const contract = await getContract(NFTs_ABI, NFTs_Address);
      const balance = await contract.balanceOf(props.data.address, 0);
      setRetoksBalance(balance.toString());
    }
    getData();
  }, [props.data.address]);
  const handleMintToken = () => {
    setTokenMintModalOpen(true);
  };
  const TokenModalClosed = () => {
    setTokenMintModalOpen(false);
  };
  const PaperModalClosed = () => {
    setPaperMinModalOpen(false);
  };
  const handlePaperMint = () => {
    setPaperMinModalOpen(true);
  };

  const getRetoks = async () => {
    const contract = await getContract(NFTs_ABI, NFTs_Address);
    const tx = await contract.getRetoks();
    await tx.wait();
    const balance = await contract.balanceOf(props.data.address, 0);
    setRetoksBalance(balance.toString());
  };
  return (
    <div className={styles.researcherProfileV2}>
      <HStack spacing={"150px"} paddingLeft={"13%"}>
        <Button
          variant="solid"
          w="138px"
          colorScheme="teal"
          onClick={() => {
            handlePaperMint();
          }}
        >
          Mint Paper
        </Button>
        <Button
          variant="solid"
          w="148px"
          colorScheme="teal"
          onClick={() => {
            handleMintToken();
          }}
        >
          Mint SocialToken
        </Button>
        <Button variant="solid" w="138px" colorScheme="teal">
          Get RCI VC
        </Button>
        <Button
          variant="solid"
          w="138px"
          colorScheme="teal"
          onClick={() => {
            getRetoks();
          }}
        >
          Get Retoks
        </Button>
      </HStack>
      {tokenMintModalOpen && <TokenMintModal onClose={TokenModalClosed} />}
      {paperMinModalOpen && <PaperMintModal onClose={PaperModalClosed} />}
      <section className={styles.profileIntro}>
        <h1 className={styles.tonyStark}>{name}</h1>
        <b className={styles.rrTokenBalance12345885}>
          ReToks Balance: {retoksBalance}
        </b>
        <div className={styles.profileIntroChild}>
          <RandomAvatar name={props.data.address} size={157} />{" "}
        </div>
        <div className={styles.x9392540366}>{props.data.address}</div>
      </section>
      <div className={styles.publishedPapersSection}>
        <h1 className={styles.publishedPapers}>Published-Papers</h1>
        <div className={styles.papersStack}>
          {researchPapers.map((paper) => {
            return <ResearchPaperCard />;
          })}
        </div>
      </div>
      <section className={styles.tokensSection}>
        <h1 className={styles.launchedTokens}>Launched-Tokens</h1>
        <div className={styles.tokenTable}>
          <div className={styles.tokenTableHead}>
            <div className={styles.project}>Project</div>
            <div className={styles.description}>Description</div>
            <div className={styles.launchingDate}>Launching Date</div>
            <div className={styles.launchingPrice}>Launching Price</div>
            <div className={styles.offeredFractionContainer}>
              <span className={styles.offeredFractionContainer1}>
                <span>{`Offered Fraction `}</span>
              </span>
            </div>
            <div className={styles.launchingAmount}>Launching amount</div>
            <div className={styles.subscriptionFee}>Threshold Amount</div>
          </div>
          <div className={styles.tokenTableChild} />
          {socialTokens.map((token) => {
            return <TokenTableRow uri={token.URI} />;
          })}
        </div>
      </section>
      <section className={styles.sciTokensSection}>
        <h1 className={styles.sciTokenHoldings}>Sci-Token Holdings</h1>
        <div className={styles.tokenTable1}>
          <div className={styles.tokenTableHead1}>
            <div className={styles.project1}>Project</div>
            <div className={styles.acquiredTokenAmount}>
              Acquired Token Amount
            </div>
            <div className={styles.currentHoldings}>Current Holdings</div>
            <div className={styles.buyingPrice}>Buying Price</div>
            <div className={styles.offeredFractionContainer2}>
              <span className={styles.offeredFractionContainer1}>
                <span>{`Offered Fraction `}</span>
              </span>
            </div>
            <div className={styles.lastSoldPrice}>Last sold price</div>
            <div className={styles.gain}>Gain</div>
          </div>
          <div className={styles.tokenTableChild} />
          {supporters.map((token) => {
            return <TokenHoldingRow />;
          })}
        </div>
      </section>
    </div>
  );
};

export default ResearcherProfileV2;
