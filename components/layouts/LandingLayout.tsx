import { Flex, Spacer } from "@chakra-ui/react";
import HeadSection from "@components/sections/HeadSection";

import styles from "../../styles/LandingLayout.module.scss";

interface Props {
  children?: React.ReactNode;
}

const LandingLayout: React.FC<Props> = ({ children }) => {
  return (
    <Flex
      bg="white"
      direction="column"
      align="center"
      m="0 auto"
      className={styles.animate}
    >
      <HeadSection />
      {/* <Spacer m={2} /> */}
      {children}
      {/* <Footer /> */}
    </Flex>
  );
};

export default LandingLayout;
