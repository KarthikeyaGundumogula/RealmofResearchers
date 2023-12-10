import { useState } from "react";
import {
  Button,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import saveToIPFS from "../../../Utils/saveFileToIPFS";
import { saveMetaData } from "../../../Utils/saveMetaDataToIPFS";
import { NFTs_Address, NFTs_ABI } from "../../../Constants/contracts";
import { getContract } from "../../../Utils/getContracts";
import { ethers } from "ethers";

function TokenMintModal({ onClose }) {
  const [tokenID, setTokenID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subscriptionFee: "",
    domain: "",
    abstract: "",
    authorName: "",
    fileURI: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const URI = await saveMetaData(formData);
    const contract = await getContract(NFTs_ABI, NFTs_Address);
    const tx = await contract.mintPaper(
      URI,
      tokenID,
      formData.subscriptionFee,
      1
    );
    await tx.wait();
    setIsLoading(false);
    console.log(formData);
    onClose();
  };

  const handleFileUpload = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    console.log(file);
    const fileURI = await saveToIPFS(file);
    setFormData((prevData) => ({
      ...prevData,
      ["fileURI"]: fileURI,
    }));
    setIsLoading(false);
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Publish Paper</ModalHeader>
        <ModalCloseButton />
        <form>
          <ModalBody>
            <FormControl>
              <FormLabel>Project Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Project Description</FormLabel>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Subscription Fee</FormLabel>
              <Input
                type="number"
                name="subscriptionFee"
                value={formData.subscriptionFee}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Domain</FormLabel>
              <Input
                name="domain"
                value={formData.domain}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>abstract</FormLabel>
              <Textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Author Name</FormLabel>
              <Input
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Author Address</FormLabel>
              <Select
                placeholder="Select Token ID"
                onChange={(e) => {
                  setTokenID(e.target.value);
                }}
              >
                <option value="2">2</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>File</FormLabel>
              <Flex alignItems="center">
                <Input type="File" name="file" onChange={handleFileUpload} />
                {isLoading && <Spinner ml={2} />}
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Flex alignItems="center">
              <Button
                type="submit"
                colorScheme="green"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Create
              </Button>
              {isLoading && <Spinner ml={2} />}
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default TokenMintModal;
