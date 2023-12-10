import { Button, IconButton } from "@chakra-ui/react";
import styles from "../styles/researcher-profile.module.css";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { getURI } from "../Constants/getURI";
import { RandomAvatar } from "react-random-avatars";
import { NFTs_Address, NFTs_ABI } from "../Constants/contracts";
import { getContract } from "../Utils/getContracts";
import ResearchPaperCard from "../components/Researcher-Page/Research-Paper-Card";
import TokenTableRow from "../components/Researcher-Page/Token-Table-Row";
import { ethers } from "ethers";
import { getGraphData } from "../Utils/getGraphData";
import ResearchPaperModal from "../components/modals/research-paper-modal";

const ResearcherProfile = () => {
  const [paperIsOpen, setPaperIsOpen] = useState(false);
  const router = useRouter();
  const [researchPapers, setResearchPapers] = useState([]);
  const [socialTokens, setSocialTokens] = useState([]);
  const { address } = router.query;
  console.log(address);
  const [uri, setUri] = useState("");
  const [researcher, setResearcher] = useState({
    name: "",
    description: "",
    reputationIndex: 0,
    citations: 0,
    papers: 0,
    fieldOfWork: "",
  });
  useEffect(() => {
    async function getData() {
      try {
        const contract = await getContract(NFTs_ABI, NFTs_Address);
        const creator = await contract.getCreator(address);
        const data = await axios.get(getURI(creator[2]));
        setUri(creator[2]);
        console.log(data.data);
        const RCI =
          0.3 * ethers.formatUnits(creator[3], "wei") +
          0.3 * ethers.formatUnits(creator[5], "wei") +
          0.4 * ethers.formatUnits(creator[4], "wei");
        setResearcher({
          name: data.data.name,
          description: data.data.description,
          fieldOfWork: data.data.fieldOfStudy,
          papers: ethers.formatUnits(creator[3], "wei"),
          citations: ethers.formatUnits(creator[5], "wei"),
          reputationIndex: RCI,
        });
        const query = `{
        researchPapers(where: {researcher:"${address}"}) {
        URI
        socialTokenId
        }
        socialTokens(where: {creator:"${address}"}) {
          URI
        }
      }`;
        try {
          const response = await getGraphData(query);
          setResearchPapers(response.data.data.researchPapers);
          setSocialTokens(response.data.data.socialTokens);
        } catch (e) {
          console.error(e);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const paperModalOpen = (paper) => {
    setPaperIsOpen((old) => !old);
  };
  return (
    <div className={styles.researcherProfile}>
      <Link as={NextLink} href="/">
        <Button
          className={styles.connectBtn1}
          variant="solid"
          w="138px"
          colorScheme="green"
        >
          Home
        </Button>
      </Link>
      <section className={styles.actions}>
        <Button
          className={styles.paperReviewBtn}
          variant="solid"
          w="190px"
          colorScheme="green"
        >
          Ask for paper Review
        </Button>
        <Button
          className={styles.subscribeBtn}
          variant="solid"
          w="190px"
          colorScheme="green"
        >
          Subscribe
        </Button>
        <Button
          className={styles.msgBtn}
          variant="solid"
          w="190px"
          colorScheme="green"
        >
          Message
        </Button>
      </section>
      <section className={styles.profileIntro}>
        <h2 className={styles.tonyStark}>{researcher.name}</h2>
        <div className={styles.profileIntroChild}>
          <RandomAvatar name={address} size={152} />
        </div>
        <p className={styles.imAPlayBoy}>{researcher.description}</p>
        <small className={styles.x9392540366}>{address}</small>
      </section>
      <section className={styles.acheivements}>
        <div className={styles.publicationsParent}>
          <div className={styles.publications}>Publications</div>
          <img
            className={styles.stackOfPaper}
            alt=""
            src="/researcher-profile/research-paper.png"
          />
          <div className={styles.div}>{researcher.papers}</div>
        </div>
        <div className={styles.reputationParent}>
          <div className={styles.publications}>RCI</div>
          <img
            className={styles.prizeIcon}
            alt=""
            src="/researcher-profile/repustation.png"
          />
          <div className={styles.div1}>
            {researcher.reputationIndex.toFixed(4)}
          </div>
        </div>
        <div className={styles.fieldOfStudyParent}>
          <div className={styles.publications}>Field of Study</div>
          <img
            className={styles.searchBarIcon}
            alt=""
            src="/researcher-profile/feildofwork.png"
          />
          <div className={styles.artificialIntelligence}>
            {researcher.fieldOfWork}
          </div>
        </div>
        <div className={styles.ratingParent}>
          <img
            className={styles.ratingIcon}
            alt=""
            src="/researcher-profile/citation.png"
          />
          <div className={styles.div2}>19</div>
          <div className={styles.citations}>Citations</div>
        </div>
      </section>
      <div className={styles.researcherProfileV2}>
        <div className={styles.publishedPapersSection}>
          <h1 className={styles.publishedPapers}>Published-Papers</h1>
          <div className={styles.papersStack}>
            {researchPapers.map((paper) => {
              return (
                <div onClick={paperModalOpen}>
                  {paperIsOpen && (
                    <ResearchPaperModal
                      uri={paper.URI}
                      tokenId={paper.socialTokenId}
                      onClose={paperModalOpen}
                    />
                  )}
                  <ResearchPaperCard key={paper.URI} uri={paper.URI} />
                </div>
              );
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
                  <span className={styles.span}>(%)</span>
                </span>
              </div>
              <div className={styles.launchingAmount}>Launching amount</div>
              <div className={styles.subscriptionFee}>Subscription Fee</div>
            </div>
            <div className={styles.tokenTableChild} />
            <div className={styles.tableRows}>
              {socialTokens.map((token) => {
                return <TokenTableRow key={token.URI} uri={token.URI} />;
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResearcherProfile;
