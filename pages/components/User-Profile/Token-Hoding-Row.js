import React from "react";
import styles from "../../styles/profile/non-researcher.module.css";
import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getGraphData } from "../../Utils/getGraphData";

function TokenHoldingRow(props) {
  const [tokenDetails, setDetails] = useState([]);
  useEffect(() => {
    const query = `
    {
      socialTokens(where: {id: "${props.data.socialTokenId}"}) {
        availbleAmount
        thresholdAmount
        price
        ownershipOnEntireTokenBatch
      }
    }
    `;
    async function getData() {
      try {
        const response = await getGraphData(query);
        setDetails(response.data.data.socialTokens[0]);
        console.log(response);
        console.log(tokenDetails);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <div className={styles.tokenTableRow}>
      <Button
        className={styles.sellBtn}
        variant="solid"
        w="82px"
        h="35px"
        colorScheme="green"
      >
        Total-Claim
      </Button>
      <div className={styles.theArcReactorA}>
        The ARC-Reactor: A miniature nuclear fusion reactor.
      </div>
      <b className={styles.b}>{props.data.amount}</b>
      <b className={styles.b1}>{props.data.amount}</b>
      <b className={styles.b2}>{tokenDetails.price}</b>
      <b className={styles.b3}></b>
      <b className={styles.b4}>{"16"}</b>
      <b className={styles.b5}>{tokenDetails.ownershipOnEntireTokenBatch}</b>
    </div>
  );
}

export default TokenHoldingRow;
