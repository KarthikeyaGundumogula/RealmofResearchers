import styles from "./styles/researchers.module.css";
import ResearcherCard from "./components/Researcher-Card";
import Header from "./components/Header";

const ResearchersPage = () => {
  return (
    <div className={styles.researchersPage}>
      <Header pageName={"researchers"} />
      <ResearcherCard />
      <ResearcherCard />
      <ResearcherCard />
    </div>
  );
};

export default ResearchersPage;
