"use client";

import { Flex, Heading, Text } from "@chakra-ui/react";

import { FC } from "react";
import ReactPlayer from "react-player/youtube";

const Hero: FC = () => (
  <Flex as="section" w="100vw" h="100vh">
    <Flex w="33%" h="100%" bg="primary.base" grow={1} direction="column" p={20} pb={60} justifyContent="center">
      <Heading
        as="h1"
        color="white"
        fontSize="6xl"
        textAlign="center"
        alignSelf="center"
        w="100%"
      >
        What we do
      </Heading>
      <Text
        as="p"
        color="white"
        fontSize="xl"
        textAlign="center"
        alignSelf="center"
        w="100%"
      >
        We are a media trading agency, specialized in outdoor advertising. Being leaders in the OOH industry in Mexico. Get to know our services.
      </Text>


    </Flex>
    <ReactPlayer
      url="https://www.youtube.com/watch?v=UKwY5oy9lcY"
      muted
      playing
      height="100%"
      width="68%"
    />
  </Flex>
);

export default Hero;