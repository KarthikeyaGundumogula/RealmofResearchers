import styles from "./styles/publications.module.css";
import PaperCard from "./components/Paper-Card";
import Header from "./components/Header";
import { getGraphData } from "./Utils/getGraphData";
import { useEffect, useState } from "react";
import ResearchPaperModal from "./components/modals/research-paper-modal";

const PublicationsPage = () => {
  const [paperIsOpen, setPaperIsOpen] = useState(false);
  const [papers, setPapers] = useState([]);
  useEffect(() => {
    async function getPapers() {
      try {
        const query = `
        {
          researchPapers(first: 100) {
            URI
            id
            socialTokenId
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
  const paperModalOpen = (paper) => {
    setPaperIsOpen((old) => !old);
  };
  return (
    <div className={styles.publicationsPage}>
      <Header pageName={"publications"} />
      <div className={styles.paperDiv}>
        {papers.map((paper) => {
          return (
            <div onClick={paperModalOpen}>
              {paperIsOpen && (
                <ResearchPaperModal
                  id={paper.id}
                  uri={paper.URI}
                  tokenId={paper.socialTokenId}
                  onClose={paperModalOpen}
                />
              )}
              <PaperCard key={paper.id} uri={paper.URI} id={paper.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicationsPage;
