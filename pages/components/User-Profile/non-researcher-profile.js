import { Button, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import styles from "../../styles/profile/non-researcher.module.css";
import TokenHoldingRow from "./Token-Hoding-Row";
const NonResearcherProfile = () => {
  return (
    <div className={styles.profile}>
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
          className={styles.homeBtn}
          variant="solid"
          w="138px"
          colorScheme="green"
        >
          Home
        </Button>
      </Link>
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
        <b className={styles.rrTokenBalance12345885}>
          RR-Token Balance: 12345885
        </b>
      </section>
      <div className={styles.sciTokensSection}>
        <div className={styles.sciTokenHoldings}>Sci-Token Holdings</div>
        <div className={styles.tokenTable}>
          <div className={styles.tokenTableHead}>
            <div className={styles.project}>Project</div>
            <div className={styles.acquiredTokenAmount}>
              Acquired Token Amount
            </div>
            <div className={styles.currentHoldings}>Current Holdings</div>
            <div className={styles.buyingPrice}>Buying Price</div>
            <div className={styles.offeredFractionContainer}>
              <span className={styles.offeredFractionContainer1}>
                <span>{`Offered Fraction `}</span>
                <span className={styles.span}>(%)</span>
              </span>
            </div>
            <div className={styles.lastSoldPrice}>Last sold price</div>
            <div className={styles.gain}>Gain</div>
          </div>
          <div className={styles.tokenTableChild} />
          <TokenHoldingRow />
          <TokenHoldingRow />
        </div>
      </div>
    </div>
  );
};

export default NonResearcherProfile;
