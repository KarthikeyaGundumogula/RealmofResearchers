import React from "react";
import styles from "../../styles/sci-tokens.module.css";
import { Button } from "@chakra-ui/react";

const TableRow = () => {
  return (
    <div className={styles.tokenSaleRow}>
      <div className={styles.theArcReactorA}>
        The ARC-Reactor: A miniature uclear fusion reactor.
      </div>
      <b className={styles.x57835893}>0x57835893</b>
      <b className={styles.b}>26-08-2023</b>
      <b className={styles.b1}>100</b>
      <b className={styles.b2}>123456</b>
      <b className={styles.x93429454}>0x93429454</b>
      <b className={styles.b3}>60</b>
      <b className={styles.b4}>12</b>
      <Button
        className={styles.buyBtn}
        variant="solid"
        w="69px"
        colorScheme="green"
      >
        Buy
      </Button>
      <div className={styles.tokenSaleRowChild} />
    </div>
  );
};

export default TableRow;
