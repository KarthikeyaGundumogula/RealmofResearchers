import { useState, useEffect, useRef } from "react";
import styles from "../../styles/sci-tokens.module.css";
import { NFTs_ABI, NFTs_Address } from "../../Constants/contracts";
import { getContract } from "../../Utils/getContracts";
import { getURI } from "../../Constants/getURI";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Flex,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { getBuyCreds } from "../../Utils/getBuyCreds";

const TableRow = (props) => {
  const [did, setDid] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(getURI(props.data.URI));
        setName(response.data.name);
        setDate(response.data.launchDate);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const buyToken = async () => {
    setLoading(true);
    const contract = await getContract(NFTs_ABI, NFTs_Address);
    const tx = await contract.buySocialToken(props.data.id, amount, {
      value: "0",
    });
    await tx.wait();
    await getBuyCreds(NFTs_Address, props.data.id, amount, did);
    setLoading(false);
    onClose();
  };
  return (
    <div className={styles.tokenSaleRow}>
      <div className={styles.theArcReactorA}>{name}</div>
      <b className={styles.x57835893}>{props.data.creator.substring(0, 10)}</b>
      <b className={styles.b}>{date}</b>
      <b className={styles.b1}>{props.data.price}</b>
      <b className={styles.b2}>{props.data.totalAmountMinted}</b>
      <b className={styles.x93429454}>{props.data.thresholdAmount}</b>
      <b className={styles.b3}>{props.data.ownershipOnEntireTokenBatch}</b>
      <b className={styles.b4}>
        {props.data.paperID == null ? "Not Published" : props.data.paperID}
      </b>
      <Button
        className={styles.buyBtn}
        variant="solid"
        w="69px"
        colorScheme="green"
        onClick={onOpen}
      >
        Buy
      </Button>
      <div className={styles.tokenSaleRowChild} />
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buy Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxW={"60vw"}>
            <Input
              ref={initialRef}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
            <Input
              mt={4}
              onChange={(e) => setDid(e.target.value)}
              placeholder="DID, to get a VC for supporting this project"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Flex alignItems={"center"}>
              <Button
                colorScheme="facebook"
                onClick={() => {
                  buyToken();
                }}
              >
                Submit
              </Button>
              {loading && <Spinner ml={4} />}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TableRow;
