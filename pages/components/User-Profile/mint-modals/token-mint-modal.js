import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Flex,
  ModalOverlay,
} from "@chakra-ui/react";
import { NFTs_ABI, NFTs_Address } from "../../../Constants/contracts";
import { getContract } from "../../../Utils/getContracts";
import { saveMetaData } from "../../../Utils/saveMetaDataToIPFS";

function TokenMintModal({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    domain: "",
    price: "",
    launchDate: "",
    paperLaunchDate: "",
    thresholdAmount: "",
    ownership: "",
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
    const date = new Date();
    setFormData((prevData) => ({
      ...prevData,
      ["launchDate"]: date.toDateString(),
    }));
    const URI = await saveMetaData(formData);
    const contract = await getContract(NFTs_ABI, NFTs_Address);
    const tx = await contract.mintSocialToken(formData.amount, URI);
    await tx.wait();
    const tokenId = await contract.getCurrentTokenId();
    const tx2 = await contract.launchSocialToken(
      tokenId,
      formData.price,
      formData.thresholdAmount,
      formData.ownership
    );
    await tx2.wait();
    setIsLoading(false);
    console.log(formData);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Token</ModalHeader>
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
            <Flex alignItems={"center"}>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel>Domain</FormLabel>
              <Input
                name="domain"
                value={formData.domain}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Threshold Amount</FormLabel>
              <Input
                type="number"
                name="thresholdAmount"
                value={formData.thresholdAmount}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Ownership Offering On Entire Batch</FormLabel>
              <Input
                type="number"
                name="ownership"
                value={formData.ownership}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Paper Publishing Date</FormLabel>
              <Input
                type="date"
                name="paperLaunchDate"
                value={formData.paperLaunchDate}
                onChange={handleChange}
              />
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
              {isLoading && <Spinner />}
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default TokenMintModal;
