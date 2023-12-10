import styles from "./styles/publications.module.css";
import PaperCard from "./components/Paper-Card";
import Header from "./components/Header";
import { getGraphData } from "./Utils/getGraphData";
import { useEffect, useState } from "react";

const PublicationsPage = () => {
  const [papers, setPapers] = useState([]);
  useEffect(() => {
    async function getPapers() {
      try {
        const query = `
        {
          researchPapers(first: 100) {
            URI
            id
          }
        }`;
        const response = await getGraphData(query);
        setPapers(response.data.data.researchPapers);
        console.log(papers);
      } catch (error) {
        console.log(error);
      }
    }
    getPapers();
  }, []);
  return (
    <div className={styles.publicationsPage}>
      <Header pageName={"publications"} />
      <div className={styles.paperDiv}>
        {papers.map((paper) => {
          return <PaperCard key={paper.id} uri={paper.URI} id={paper.id} />;
        })}
      </div>
    </div>
  );
};

export default PublicationsPage;
