import styles from "../styles/researchers.module.css";
import ResearcherCard from "../components/Researcher-Card";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getGraphData } from "../Utils/getGraphData";

const ResearchersPage = () => {
  const [researchers, setResearchers] = useState([]);
  useEffect(() => {
    async function getResearchers() {
      try {
        const query = `
        {
          creators(first: 100) {
            URI
            id
            creator
          }
        }`;
        const response = await getGraphData(query);
        setResearchers(response.data.data.creators);
      } catch (error) {
        console.log(error);
      }
    }
    getResearchers();
  }, []);
  return (
    <div className={styles.researchersPage}>
      <Header pageName={"researchers"} />
      {researchers.map((researcher) => {
        return (
          <ResearcherCard
            key={researcher.id}
            uri={researcher.URI}
            address={researcher.creator}
          />
        );
      })}
    </div>
  );
};

export default ResearchersPage;
