"use client";

import {
  Avatar,
  Box,
  chakra,
  Flex,
  Heading,
  Stack
} from "@chakra-ui/react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { FC, useState } from "react";

import { Link } from "@chakra-ui/next-js";
import LoginForm from "./LoginForm";

const Login: FC = () => (
  <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    justifyContent="center"
    alignItems="center"
  >
    <Stack
      flexDir="column"
      mb="2"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar bg="teal.500" />
      <Heading>Welcome</Heading>
      <Box minW={{ base: "90%", md: "468px" }}>
        <LoginForm />
      </Box>
    </Stack>
    <Box>
        New to us?{" "}
      <Link href="/signup">
          Sign Up
      </Link>
    </Box>
  </Flex>
);

export default Login;