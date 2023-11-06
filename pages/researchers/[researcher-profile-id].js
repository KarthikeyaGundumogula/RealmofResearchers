import { Button, IconButton } from "@chakra-ui/react";
import styles from "../styles/researcher-profile.module.css";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import ResearchPaperCard from "../components/Researcher-Profile/Research-Paper-Card";
import TokenTableRow from "../components/Researcher-Profile/Token-Table-Row";
const ResearcherProfile = () => {
  return (
    <div className={styles.researcherProfile}>
      <Button
        className={styles.connectBtn}
        variant="solid"
        w="138px"
        colorScheme="green"
      >
        .Connect
      </Button>
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
        <h2 className={styles.tonyStark}>Tony Stark</h2>
        <img
          className={styles.profileIntroChild}
          alt=""
          src="/ellipse-2@2x.png"
        />
        <p className={styles.imAPlayBoy}>
          I’m a play-boy billionaire genius and scientist owner of stark
          enterprises and I have a degree from the oxford.
        </p>
        <small className={styles.x9392540366}>0x9392540366</small>
      </section>
      <section className={styles.acheivements}>
        <div className={styles.publicationsParent}>
          <div className={styles.publications}>Publications</div>
          <img
            className={styles.stackOfPaper}
            alt=""
            src="/researcher-profile/research-paper.png"
          />
          <div className={styles.div}>19</div>
        </div>
        <div className={styles.reputationParent}>
          <div className={styles.publications}>Reputation</div>
          <img
            className={styles.prizeIcon}
            alt=""
            src="/researcher-profile/repustation.png"
          />
          <div className={styles.div1}>19</div>
        </div>
        <div className={styles.fieldOfStudyParent}>
          <div className={styles.publications}>Field of Study</div>
          <img
            className={styles.searchBarIcon}
            alt=""
            src="/researcher-profile/feildofwork.png"
          />
          <div className={styles.artificialIntelligence}>
            Artificial Intelligence
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
            <ResearchPaperCard />
            <ResearchPaperCard />
            <ResearchPaperCard />
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
              <TokenTableRow />
              <TokenTableRow />
              <TokenTableRow />
              <TokenTableRow />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResearcherProfile;
