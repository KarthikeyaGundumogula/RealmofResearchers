import React from "react";
import styles from "../../styles/profile/non-researcher.module.css";
import { Button } from "@chakra-ui/react";

function TokenHoldingRow() {
  return (
    <div className={styles.tokenTableRow}>
      <Button
        className={styles.sellBtn}
        variant="solid"
        w="82px"
        h="35px"
        colorScheme="green"
      >
        Sell
      </Button>
      <div className={styles.theArcReactorA}>
        The ARC-Reactor: A miniature nuclear fusion reactor.
      </div>
      <b className={styles.b}>1234</b>
      <b className={styles.b1}>1223</b>
      <b className={styles.b2}>100</b>
      <b className={styles.b3}>1223</b>
      <b className={styles.b4}>1223</b>
      <b className={styles.b5}>60</b>
    </div>
  );
}

export default TokenHoldingRow;
