import styles from "../../styles/researcher-profile.module.css";
import axios from "axios";
import { getURI } from "../../Constants/getURI";
import { useState, useEffect } from "react";
function ResearchPaperCard(props) {
  const [name, setName] = useState("");
  const uri = props.uri;
  useEffect(() => {
    async function getData() {
      try {
        const data = await axios.get(getURI(uri));
        setName(data.data.name);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
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
        <div className={styles.theArcReactorA}>{name}</div>
      </div>
    </div>
  );
}

export default ResearchPaperCard;
