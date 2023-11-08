import React from "react";
import styles from "../styles/index.module.css";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

const Header = (pageName) => {
  const [page, setPage] = useState(pageName.pageName);
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.realmOfResearchersContainer}>
          <span>{`REALM `}</span>
          <span className={styles.of}>{`of `}</span>
          <span>RESEARCHERS</span>
        </h1>
        <Link as={NextLink} href="/profile/tony">
          <Button
            className={styles.registerButton}
            variant="solid"
            w="161px"
            colorScheme="green"
          >
            {" "}
            Profile
          </Button>
        </Link>
        <nav className={styles.navBar}>
          <div className={styles.publicationsParent}>
            <Link as={NextLink} href="/">
              <div className={styles.publications}>Home</div>
            </Link>
            {page == "home" && <div className={styles.instanceChild} />}
          </div>
          <div className={styles.publicationsGroup}>
            <Link as={NextLink} href="/publications">
              <div className={styles.publications}>Publications</div>
            </Link>
            {page == "publications" && <div className={styles.instanceChild} />}
          </div>
          <div className={styles.publicationsContainer}>
            <Link as={NextLink} href="/researchers">
              <div className={styles.publications}>Researchers</div>
            </Link>
            {page == "researchers" && <div className={styles.instanceChild} />}
          </div>
          <div className={styles.frameDiv}>
            <Link as={NextLink} href="/sci-coins">
              <div className={styles.publications3}>Sci-Coins</div>
            </Link>
            {page == "sci-coins" && <div className={styles.instanceChild} />}
          </div>
        </nav>
        <div className={styles.headerChild} />
      </header>
    </div>
  );
};

export default Header;
