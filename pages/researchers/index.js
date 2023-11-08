import styles from "../styles/researchers.module.css";
import ResearcherCard from "../components/Researcher-Card";
import Header from "../components/Header";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

const ResearchersPage = () => {
  return (
    <div className={styles.researchersPage}>
      <Header pageName={"researchers"} />
      <ResearcherCard />
      <ResearcherCard />
    </div>
  );
};

export default ResearchersPage;
