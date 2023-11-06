import React from "react";
import styles from "../styles/publications.module.css";

function PaperCard() {
  return (
    <div>
      <section className={styles.paperCard} id="paper-card">
        <div className={styles.paperCardChild} />
        <img
          className={styles.paperCardItem}
          alt=""
          src="/publications/eclipse.png"
        />
        <b
          className={styles.theArc}
        >{`The ARC : A Miniature Fusion Reactor That Can Power an Sheild for Humans.  `}</b>
        <div className={styles.thisIsThe}>
          This is the short description of the arc reactorand we are going to an
          in build overthe past two years of our work is doen
        </div>
        <div className={styles.researcherBadge}>
          <div className={styles.researcherBadgeChild} />
          <div className={styles.tonyStark}>Tony Stark</div>
          <img
            className={styles.businessmanIcon}
            alt=""
            src="/publications/researcher.png"
          />
        </div>
        <div className={styles.dateBadge}>
          <div className={styles.dateBadgeChild} />
          <div className={styles.tonyStark}>26-10-2023</div>
          <img
            className={styles.googleCalendarIcon}
            alt=""
            src="/publications/date.png"
          />
        </div>
        <div className={styles.fieldBadge}>
          <div className={styles.dateBadgeChild} />
          <div className={styles.tonyStark}>Nuclear Fu.</div>
          <img
            className={styles.neuroscienceExperimentIcon}
            alt=""
            src="/publications/feild.png"
          />
        </div>
      </section>
    </div>
  );
}

export default PaperCard;
