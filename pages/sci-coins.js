import { Button, IconButton } from "@chakra-ui/react";
import Header from "./components/Header";
import styles from "./styles/sci-tokens.module.css";
import TableRow from "./components/sci-tokens-page/Table-row";

const SciTokensPage = () => {
  return (
    <div>
      <Header pageName={"sci-coins"} />
      <div className={styles.sciTokensPage}>
        <section className={styles.main}>
          <h1 className={styles.launchedTokens}>Sale-Tokens</h1>
          <div className={styles.table}>
            <div className={styles.projectParent}>
              <div className={styles.project}>Project</div>
              <div className={styles.creator}>Creator</div>
              <div className={styles.launchingDate}>Launching Date</div>
              <div className={styles.launchingPrice}>Launching Price</div>
              <div className={styles.launchingAmount}>Launching amount</div>
              <div className={styles.seller}>Seller</div>
              <div className={styles.sellingPrice}>Selling Price</div>
              <div className={styles.payPerPaper}>Pay per Paper</div>
            </div>
            <div className={styles.tokenSaleHeadChild} />
            <TableRow />
            <TableRow />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SciTokensPage;
