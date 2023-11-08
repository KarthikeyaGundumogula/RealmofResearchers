import React from "react";
import styles from "../../styles/researcher-profile.module.css";

const TokenTableRow = () => {
  return (
    <div className={styles.tokenTableRow}>
      <div className={styles.theArcReactorA2}>
        The ARC-Reactor: A miniature nuclear fusion reactor.
      </div>
      <div className={styles.theArcReactorA3}>
        The ARC-Reactor: A miniature nuclear fusion reactor.this is a short
        description of this study
      </div>
      <b className={styles.b}>26-08-2023</b>
      <b className={styles.b1}>100</b>
      <b className={styles.b2}>123456</b>
      <b className={styles.b3}>1223</b>
      <b className={styles.b4}>60</b>
    </div>
  );
};

export default TokenTableRow;
