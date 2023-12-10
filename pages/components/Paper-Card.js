import React from "react";
import styles from "../styles/publications.module.css";
import { RandomAvatar } from "react-random-avatars";
import { useEffect, useState } from "react";
import { getURI } from "../Constants/getURI";
import axios from "axios";

function PaperCard(props) {
  const [paper, setPaper] = useState({
    title: "",
    description: "",
    date: "",
    field: "",
    author: "",
  });
  useEffect(() => {
    const url = getURI(props.uri);
    async function getPaper() {
      try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        setPaper({
          title: data.name,
          description: data.description,
          date: data.date,
          field: data.domain,
          author: data.authorName,
        });
        console.log(paper);
      } catch (error) {
        console.log(error);
      }
    }
    getPaper();
  }, []);
  return (
    <div>
      <section className={styles.paperCard} id="paper-card">
        <div className={styles.paperCardChild} />
        <div className={styles.paperCardItem}>
          <RandomAvatar name={props.id} size={80} />
        </div>
        <b className={styles.theArc}>{paper.title}</b>
        <div className={styles.thisIsThe}>{paper.description}</div>
        <div className={styles.researcherBadge}>
          <div className={styles.researcherBadgeChild} />
          <div className={styles.tonyStark}>{paper.author}</div>
          <img
            className={styles.businessmanIcon}
            alt=""
            src="/publications/researcher.png"
          />
        </div>
        <div className={styles.dateBadge}>
          <div className={styles.dateBadgeChild} />
          <div className={styles.tonyStark}>
            {paper.date != "" ? "no date" : paper.date}
          </div>
          <img
            className={styles.googleCalendarIcon}
            alt=""
            src="/publications/date.png"
          />
        </div>
        <div className={styles.fieldBadge}>
          <div className={styles.dateBadgeChild} />
          <div className={styles.tonyStark}>{paper.field}</div>
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
