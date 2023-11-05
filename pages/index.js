import styles from "./styles/index.module.css";
import Home from "./components/home";
import Header from "./components/Header";

const HomeApgeNew = () => {
  return (
    <div className={styles.homeApgeNew}>
      <Header pageName={"home"} />
      <Home />
    </div>
  );
};

export default HomeApgeNew;
