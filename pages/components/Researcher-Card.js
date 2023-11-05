import React from "react";
import styles from "../styles/researchers.module.css";

function ResearcherCard() {
  return (
    <div>
      <section className={styles.researcherCard} id="researcher-card">
        <div className={styles.researcherCardChild} />
        <img
          className={styles.researcherCardItem}
          alt="hello png"
          src="/profile@2x.png"
        />
        <h2 className={styles.tonyStark}>Tony Stark</h2>
        <p className={styles.imAPlayBoy}>
          I’m a play-boy billionaire genius and scientist owner of stark
          enterprises and I have a degree from the oxford.
        </p>
        <div className={styles.reputationIndex}>
          <h2 className={styles.h2}>19</h2>
          <img className={styles.prizeIcon} alt="" src="/repustation.png" />
        </div>
        <div className={styles.citations}>
          <h2 className={styles.h21}>19</h2>
          <img className={styles.prizeIcon} alt="" src="/citation.png" />
        </div>
        <div className={styles.ofpapers}>
          <h2 className={styles.h22}>19</h2>
          <img className={styles.prizeIcon} alt="" src="/research-paper.png" />
        </div>
        <div className={styles.feild}>
          <h4 className={styles.neuroScience}>Neuro-science</h4>
          <img className={styles.searchBarIcon} alt="" src="/feildofwork.png" />
        </div>
      </section>
    </div>
  );
}

export default ResearcherCard;
