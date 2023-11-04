import { Button, IconButton } from "@chakra-ui/react";
import styles from "./index.module.css";

const Desktop1 = () => {
  return (
    <div className={styles.desktop1}>
      <div className={styles.heading}>
        <nav className={styles.navBar}>
          <div className={styles.publicationsParent}>
            <div className={styles.publications}>Home</div>
            <div className={styles.instanceChild} />
          </div>
          <div className={styles.publicationsGroup}>
            <div className={styles.publications}>Publications</div>
            <div className={styles.instanceItem} />
          </div>
          <div className={styles.publicationsContainer}>
            <div className={styles.publications}>Researchers</div>
            <div className={styles.instanceItem} />
          </div>
          <div className={styles.frameDiv}>
            <div className={styles.publications}>Sci-Coins</div>
            <div className={styles.instanceItem} />
          </div>
        </nav>
      </div>
      <h1 className={styles.realmOfResearchersContainer}>
        <span>{`REALM `}</span>
        <span className={styles.of}>{`of `}</span>
        <span>RESEARCHERS</span>
      </h1>
      <div className={styles.desktop1Child} />
      <section className={styles.frame} id="main">
        <div className={styles.heroSection}>
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
              collaborate with peers, and gather crypto funding for
              groundbreaking projects.In this realm, we empower visionaries,
              innovators, and scholars to unlock the true potential of their
              research. Imagine a place where researchers forge new paths,
              create the future, and explore the uncharted territories of
              science and academia.
            </span>
            <span className={styles.stepIntoThe}>&nbsp;</span>
            <span
              className={styles.stepIntoThe}
            >{`With groundbreaking concepts like social tokens and fractional NFTs, we are redefining the way research is funded, shared, and celebrated. Step into a realm where collaboration thrives, where brilliance shines, and where the pursuit of knowledge reigns supreme. Join us on this epic journey through the Realm of Researchers and be a part of the revolution in academic publishing. It's time to embark on a quest for intellectual enlightenment, where you are not just a reader or a supporter, but a key player in the realm where ideas transform into reality. `}</span>
          </p>
          <h3 className={styles.discoverLatestAdvancementsContainer}>
            The Renaissance Unveiled
          </h3>
          <p className={styles.stepIntoTheContainer}>
            In this realm, researchers can seamlessly raise funds using social
            tokens, mint their research as fractional NFTs, and engage in a
            transparent peer review process that ensures the highest standards
            of academic excellence. Accessibility is paramount, with options for
            open access and lower-cost subscriptions, enabling a global audience
            to explore the latest scholarly insights. Join our vibrant
            community, where researchers, subscribers, and token holders come
            together to shape the future of academic publishing. Unveil a world
            where research finds its true value, and the pursuit of knowledge
            knows no bounds.
          </p>
        </div>
      </section>
      <h3 className={styles.frame1}>
        <h3 className={styles.whetherYoureA}>
          Whether you're a researcher forging new paths or an enthusiast hungry
          for knowledge, it's time to join the Realm. Sign up now and become a
          part of the future of academic discovery!
        </h3>
      </h3>
      <div className={styles.desktop1Item} />
      <Button
        className={styles.registerButton}
        variant="solid"
        w="161px"
        colorScheme="teal"
      >
        {" "}
        Register Now!
      </Button>
      <Button
        className={styles.registerButton1}
        variant="solid"
        w="161px"
        colorScheme="teal"
      >
        {" "}
        Register Now!
      </Button>
    </div>
  );
};

export default Desktop1;
