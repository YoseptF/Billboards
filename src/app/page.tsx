import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import Hero from "./Hero";
import Navbar from "./Navbar";
import StateSelector from "./StateSelector";

const Home: FC = () => (
  <Flex
    as="main"
    flexDir="column"
    placeItems="center"
    bg="secondary.base"
    grow={1}
    overflow="hidden"
  >
    <Navbar />
    <Hero />
    <StateSelector states={["state_of_mexico", "puebla", "coahuila", "queretaro", "nuevo_leon", "chihuahua"]} />
  </Flex>
);

export default Home;
