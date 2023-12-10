import Header from "./components/Header";
import styles from "./styles/sci-tokens.module.css";
import TableRow from "./components/sci-tokens-page/Table-row";
import { useEffect, useState } from "react";
import { getGraphData } from "./Utils/getGraphData";
import axios from "axios";

const SciTokensPage = () => {
  const [tokens, setTokens] = useState([]);
  useEffect(() => {
    const query = `
    {
      socialTokens(first:100){
        id
        URI
        creator
        price
        paperID
        totalAmountMinted
        thresholdAmount
        ownershipOnEntireTokenBatch
      }
    }
    `;
    async function getData() {
      try {
        const response = await getGraphData(query);
        setTokens(response.data.data.socialTokens);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

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
              <div className={styles.seller}>Threshold Amount</div>
              <div className={styles.sellingPrice}>Ownership</div>
              <div className={styles.payPerPaper}>Pay per Paper</div>
            </div>
            <div className={styles.tokenSaleHeadChild} />
            {tokens.map((token) => {
              return <TableRow key={token.id} data={token} />;
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SciTokensPage;
