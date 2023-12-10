import React, { useState, useEffect } from "react";
import styles from "../../styles/researcher-profile.module.css";
import axios from "axios";
import { getURI } from "../../Constants/getURI";
const TokenTableRow = (props) => {
  console.log(props.uri);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [thresholdAmount, setThresholdAmount] = useState("");
  const [ownership, setOwnership] = useState("");

  useEffect(() => {
    const url = getURI(props.uri);
    async function setData() {
      const response = await axios.get(url);
      console.log(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setLaunchDate(response.data.launchDate);
      setPrice(response.data.price);
      setAmount(response.data.amount);
      setThresholdAmount(response.data.thresholdAmount);
      setOwnership(response.data.ownership);
    }
    setData();
  }, [props]);
  return (
    <div className={styles.tokenTableRow}>
      <div className={styles.theArcReactorA2}>{name}</div>
      <div className={styles.theArcReactorA3}>{description}</div>
      <b className={styles.b}>{launchDate}</b>
      <b className={styles.b1}>{price}</b>
      <b className={styles.b2}>{amount}</b>
      <b className={styles.b3}>{thresholdAmount}</b>
      <b className={styles.b4}>{ownership}</b>
    </div>
  );
};

export default TokenTableRow;
