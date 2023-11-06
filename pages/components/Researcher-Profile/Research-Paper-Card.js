import React from "react";
import styles from "../../styles/researcher-profile.module.css";

function ResearchPaperCard() {
  return (
    <div className={styles.paperDiv}>
      <img
        className={styles.paperDivChild}
        alt="bgg"
        src="/researcher-profile/paper.png"
      />
      <div className={styles.name}>
        <img
          className={styles.nameChild}
          alt="ss"
          src="/researcher-profile/background-img.svg"
        />
        <div className={styles.theArcReactorA}>
          The ARC-Reactor: A miniature nuclear fusion reactor.
        </div>
      </div>
    </div>
  );
}

export default ResearchPaperCard;
