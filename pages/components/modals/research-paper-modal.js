import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { getURI } from "../../Constants/getURI";

const ResearchPaperModal = (props) => {
  console.log(props.uri);
  const [paper, setPaper] = useState({
    name: "",
    description: "",
    abstract: "",
    subscription: "",
    downloadUrl: "",
    Author: "",
    Domain: "",
  });
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(getURI(props.uri));
      setPaper({
        name: response.data.name,
        description: response.data.description,
        abstract: response.data.abstract,
        subscription: response.data.subscriptionFee,
        Author: response.data.authorName,
        Domain: response.data.domain,
        downloadUrl: getURI(response.data.fileURI).slice(0, -13),
      });
      console.log(response.data);
    };
    getData();
  }, []);
  return (
    <div>
      <Modal isOpen={true} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxWidth={"80vw"}
          maxHeight={"90vw"}
          bg="#e2ffe6"
          color="black"
        >
          <ModalHeader fontSize="2xl" borderBottomWidth="1px">
            Paper Name: {paper.name}
          </ModalHeader>
          <ModalCloseButton color="black" />
          <ModalBody>
            <Box mb={4}>
              <Heading size="md" color="black">
                Author:
              </Heading>
              <Text fontSize="lg">{paper.Author}</Text>
            </Box>
            <Box mb={4}>
              <Heading size="md" color="black">
                Description:
              </Heading>
              <Text fontSize="lg">{paper.description}</Text>
            </Box>
            <Box mb={4}>
              <Heading size="md" color="black">
                Abstract:
              </Heading>
              <Text fontSize="lg">{paper.abstract}</Text>
            </Box>
            <Box mb={4}>
              <Heading size="md" color="black">
                Domain:
              </Heading>
              <Text fontSize="lg">{paper.Domain}</Text>
            </Box>
            <Box mb={4}>
              <Heading size="md" color="black">
                Subscription:
              </Heading>
              <Text fontSize="lg">{paper.subscription}</Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="center" width="100%">
              <Button colorScheme="blue" mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button
                colorScheme="facebook"
                onClick={() => window.open(paper.downloadUrl, "_blank")}
              >
                Download
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ResearchPaperModal;
