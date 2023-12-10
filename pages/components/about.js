import React from "react";
import styles from "../styles/index.module.css";
import { Button } from "@chakra-ui/react";
import { Box, Text, Code } from "@chakra-ui/react";

function Home() {
  return (
    <div>
      <section className={styles.mainSection}>
        <h3 className={styles.discoverLatestAdvancementsContainer}>
          <p className={styles.discoverLatestAdvancements}>
            Discover Latest Advancements in Science and Technology,
          </p>
          <p className={styles.discoverLatestAdvancements}>
            Strengthen Researchers and Scientists
          </p>
        </h3>
        <p className={styles.stepIntoTheContainer}>
          <span className={styles.stepIntoThe}>
            Step into the Researcher Arena and join our talented innovators in
            pushing the boundaries of knowledge. Publish your research,
            collaborate with peers, and gather crypto funding for groundbreaking
            projects.In this realm, we empower visionaries, innovators, and
            scholars to unlock the true potential of their research. Imagine a
            place where researchers forge new paths, create the future, and
            explore the uncharted territories of science and academia.
          </span>
          <span className={styles.stepIntoThe}>&nbsp;</span>
          <span
            className={styles.stepIntoThe}
          >{`With groundbreaking concepts like social tokens and fractional NFTs, we are redefining the way research is funded, shared, and celebrated. Step into a realm where collaboration thrives, where brilliance shines, and where the pursuit of knowledge reigns supreme. Join us on this epic journey through the Realm of Researchers and be a part of the revolution in academic publishing. It's time to embark on a quest for intellectual enlightenment, where you are not just a reader or a supporter, but a key player in the realm where ideas transform into reality. `}</span>
        </p>
        <h3 className={styles.theRenaissanceUnveiled}>
          The Renaissance Unveiled
        </h3>
        <p className={styles.inThisRealm}>
          In this realm, researchers can seamlessly raise funds using social
          tokens, mint their research as fractional NFTs, and engage in a
          transparent peer review process that ensures the highest standards of
          academic excellence. Accessibility is paramount, with options for open
          access and lower-cost subscriptions, enabling a global audience to
          explore the latest scholarly insights. Join our vibrant community,
          where researchers, subscribers, and token holders come together to
          shape the future of academic publishing. Unveil a world where research
          finds its true value, and the pursuit of knowledge knows no bounds. IN
          this Realm Researchers are indexed or ranked with a special socre in
          terms better than the H-Index its called RCI(researcher credibility
          index). and we issue VCs to researcher stating their latest RCI! RCI
          is calculated on avarage number of subscribers, number of
          publications, avarage success rate on on tiem publishing of the Paper
          from the social token Launch date.
        </p>
      </section>
      <section className={styles.lastSection}>
        <Box p={5} borderWidth={1} borderRadius="lg">
          <Text fontSize="26" fontWeight={"bold"} mb={2}>
            The formula for the Researcher Credibility Index (RCI) is:
          </Text>
          <Code
            fontSize="xl"
            p={3}
            borderRadius="lg"
            backgroundColor={"green.100"}
          >
            RCI = 0.4 * (Average Success Rate of Publishing on Time) +<br />
            0.3 * (Number of Publications) +<br />
            0.3 * (Average Number of Subscribers)
          </Code>
        </Box>
        <h3 className={styles.whetherYoureA}>
          Whether you're a researcher forging new paths or an enthusiast hungry
          for knowledge, it's time to join the Realm. Sign up now and become a
          part of the future of academic discovery!
        </h3>
        <Button
          className={styles.registerButton1}
          variant="solid"
          w="161px"
          colorScheme="green"
        >
          {" "}
          Register Now!
        </Button>
      </section>
    </div>
  );
}

export default Home;
