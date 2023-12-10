import React from "react";
import styles from "../styles/researchers.module.css";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getURI } from "../Constants/getURI";
import { RandomAvatar } from "react-random-avatars";
import { NFTs_Address, NFTs_ABI } from "../Constants/contracts";
import { getContract } from "../Utils/getContracts";
import { ethers } from "ethers";

function ResearcherCard(props) {
  const [researcher, setResearcher] = useState({
    name: "",
    description: "",
    reputationIndex: 0,
    citations: 0,
    papers: 0,
    fieldOfWork: "",
  });
  useEffect(() => {
    async function getData() {
      try {
        const data = await axios.get(getURI(props.uri));
        console.log(data.data);
        const contract = await getContract(NFTs_ABI, NFTs_Address);
        const creator = await contract.getCreator(props.address);
        const RCI =
          0.3 * ethers.formatUnits(creator[3], "wei") +
          0.3 * ethers.formatUnits(creator[5], "wei") +
          0.4 * ethers.formatUnits(creator[4], "wei");
        setResearcher({
          name: data.data.name,
          description: data.data.description,
          fieldOfWork: data.data.fieldOfStudy,
          papers: ethers.formatUnits(creator[3], "wei"),
          citations: ethers.formatUnits(creator[5], "wei"),
          reputationIndex: RCI,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <Link as={NextLink} href={`/researchers/${props.address}`}>
      <section className={styles.researcherCard} id="researcher-card">
        <div className={styles.researcherCardChild} />
        <div className={styles.researcherCardItem}>
          <RandomAvatar name={props.address} size={90} />
        </div>
        <h2 className={styles.tonyStark}>{researcher.name}</h2>
        <p className={styles.imAPlayBoy}>{researcher.description}</p>
        <div className={styles.reputationIndex}>
          <h2 className={styles.h2}>{researcher.reputationIndex.toFixed(2)}</h2>
          <img
            className={styles.prizeIcon}
            alt=""
            src="/researchers/repustation.png"
          />
        </div>
        <div className={styles.citations}>
          <h2 className={styles.h21}>{researcher.citations}</h2>
          <img
            className={styles.prizeIcon}
            alt=""
            src="/researchers/citation.png"
          />
        </div>
        <div className={styles.ofpapers}>
          <h2 className={styles.h22}>{researcher.papers}</h2>
          <img
            className={styles.prizeIcon}
            alt=""
            src="/researchers/research-paper.png"
          />
        </div>
        <div className={styles.feild}>
          <h4 className={styles.neuroScience}>
            {researcher.fieldOfWork.substring(0, 10)}
          </h4>
          <img
            className={styles.searchBarIcon}
            alt=""
            src="/researchers/feildofwork.png"
          />
        </div>
      </section>
    </Link>
  );
}

export default ResearcherCard;
