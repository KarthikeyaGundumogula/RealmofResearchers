import styles from "./styles/profile/register.module.css";
import { Button, IconButton, Flex, Spinner, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RandomAvatar } from "react-random-avatars";
import { useAccount } from "wagmi";
import { NFTs_ABI, NFTs_Address } from "./Constants/contracts";
import { getContract } from "./Utils/getContracts";
import { saveMetaData } from "./Utils/saveMetaDataToIPFS";

const CreateProfile = () => {
  const { address } = useAccount();
  const [name, setName] = useState("");
  const [did, setDid] = useState("");
  const [description, setDescription] = useState("");
  const [university, setUniversity] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [employmentId, setEmploymentId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      name: name,
      did: did,
      description: description,
      university: university,
      fieldOfStudy: fieldOfStudy,
      employmentId: employmentId,
    };
    const metaData = await saveMetaData(data);
    const contract = await getContract(NFTs_ABI, NFTs_Address);
    const tx = await contract.registerCreator(metaData);
    await tx.wait();
    console.log(data);
    setLoading(false);
  };
  return (
    <div className={styles.createProfile}>
      <header className={styles.btnSection}>
        <Button
          className={styles.homeBtn}
          variant="solid"
          w="138px"
          colorScheme="teal"
        >
          Home
        </Button>
      </header>
      <fieldset className={styles.formModal} id="form-modal">
        <div className={styles.formModalChild} />
      </fieldset>
      <form className={styles.createProfileForm}>
        <div className={styles.profilePhoto}>
          <RandomAvatar name={address} size={157} />
        </div>
        <Input
          className={styles.name}
          variant="fill"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className={styles.name}
          variant="fill"
          placeholder="DID"
          onChange={(e) => setDid(e.target.value)}
        />
        <Input
          className={styles.name}
          variant="fill"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          className={styles.name}
          variant="fill"
          placeholder="university"
          onChange={(e) => setUniversity(e.target.value)}
        />
        <Input
          className={styles.name}
          variant="fill"
          placeholder="Field of study"
          onChange={(e) => setFieldOfStudy(e.target.value)}
        />
        <Input
          className={styles.name}
          variant="fill"
          placeholder="Employment ID"
          onChange={(e) => setEmploymentId(e.target.value)}
        />

        {!loading && (
          <Button
            className={styles.submit}
            variant="solid"
            w="117px"
            colorScheme="teal"
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </Button>
        )}
      </form>
      {loading && (
        <Spinner
          className={styles.spinner}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          size="xl"
          color="blue"
        />
      )}
    </div>
  );
};

export default CreateProfile;
