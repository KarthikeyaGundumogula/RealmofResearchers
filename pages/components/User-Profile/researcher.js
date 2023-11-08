import { Button, IconButton } from "@chakra-ui/react";
import styles from "../../styles/profile/researcher.module.css";
import ResearchPaperCard from "../Researcher-Page/Research-Paper-Card";
import TokenTableRow from "../Researcher-Page/Token-Table-Row";
import TokenHoldingRow from "./Token-Hoding-Row";

const ResearcherProfileV2 = () => {
  return (
    <div className={styles.researcherProfileV2}>
      <header className={styles.btnSection}>
        <Button
          className={styles.homeBtn}
          variant="solid"
          w="138px"
          colorScheme="green"
        >
          Home
        </Button>
        <Button
          className={styles.connectBtn}
          variant="solid"
          w="138px"
          colorScheme="green"
        >
          .Connect
        </Button>
      </header>
      <section className={styles.profileIntro}>
        <h1 className={styles.tonyStark}>Tony Stark</h1>
        <b className={styles.rrTokenBalance12345885}>
          RR-Token Balance: 12345885
        </b>
        <div className={styles.profileIntroChild} />
        <div className={styles.x9392540366}>0x9392540366</div>
      </section>
      <div className={styles.publishedPapersSection}>
        <h1 className={styles.publishedPapers}>Published-Papers</h1>
        <div className={styles.papersStack}>
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
              </span>
            </div>
            <div className={styles.launchingAmount}>Launching amount</div>
            <div className={styles.subscriptionFee}>Subscription Fee</div>
          </div>
          <div className={styles.tokenTableChild} />
          <TokenTableRow />
          <TokenTableRow />
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
          <TokenHoldingRow />
        </div>
      </section>
    </div>
  );
};

export default ResearcherProfileV2;
