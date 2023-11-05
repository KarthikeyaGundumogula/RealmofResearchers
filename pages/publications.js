import styles from "./styles/publications.module.css";
import PaperCard from "./components/Paper-Card";
import Header from "./components/Header";

const PublicationsPage = () => {
  return (
    <div className={styles.publicationsPage}>
      <Header pageName={"publications"} />
      <div className={styles.paperDiv}>
        <PaperCard />
        <PaperCard />
        <PaperCard />
      </div>
    </div>
  );
};

export default PublicationsPage;
