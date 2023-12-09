import styles from "../../styles/profile/non-researcher.module.css";
import TokenHoldingRow from "./Token-Hoding-Row";
import { RandomAvatar } from "react-random-avatars";
const NonResearcherProfile = (props) => {
  return (
    <div className={styles.profile}>
      <section className={styles.profileIntro}>
        <h2 className={styles.tonyStark}>Tony Stark</h2>
        <div className={styles.profileIntroChild} alt="">
          <RandomAvatar
            name={props.data.address}
            size={157}
            variant="beam"
            colors={["#00FF00", "#FF0000"]}
          />
        </div>
        <p className={styles.imAPlayBoy}>
          I’m a play-boy billionaire genius and scientist owner of stark
          enterprises and I have a degree from the oxford.
        </p>
        <small className={styles.x9392540366}>{props.data.address}</small>
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
