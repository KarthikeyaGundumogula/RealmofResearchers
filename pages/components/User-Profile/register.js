import styles from "../../styles/profile/register.module.css";
import { Button, IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [did, setDid] = useState("");
  const [description, setDescription] = useState("");
  const [university, setUniversity] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [employmentId, setEmploymentId] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      did,
      description,
      university,
      fieldOfStudy,
      employmentId,
    };
    console.log(data);
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
        <Button
          className={styles.connectBtn}
          variant="solid"
          w="138px"
          colorScheme="teal"
        >
          .Connect
        </Button>
      </header>
      <fieldset className={styles.formModal} id="form-modal">
        <div className={styles.formModalChild} />
      </fieldset>
      <form className={styles.createProfileForm}>
        <input
          className={styles.profilePhoto}
          type="file"
          variant="fill"
          placeholder="Upload DP"
        />
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
        <Button
          className={styles.submit}
          variant="solid"
          w="117px"
          colorScheme="teal"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateProfile;
