"use client";

import {
  Box,
  Button,
  Flex,
  FlexProps,
  Stack,
  Text,
  TextProps
} from "@chakra-ui/react";
import React, { FC } from "react";

import Image from "next/image";
import { Link } from "@chakra-ui/next-js";
import type { UrlObject } from "url";

interface NavbarProps extends NavBarContainerProps { }

const Navbar: FC<NavbarProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Image src="https://via.placeholder.com/34" alt="logo" width={34} height={34}/>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

const MenuToggle: FC<MenuToggleProps> = ({ toggle, isOpen }) => (
  <Box display={{ base: "block", md: "none" }} onClick={toggle}>
    {isOpen ? <CloseIcon /> : <MenuIcon />}
  </Box>
);

interface LogoProps extends TextProps{
  to: UrlObject | string,
  isLast?: boolean
}

const MenuItem: FC<LogoProps> = ({ children, isLast, to = "/", ...rest }) => (
  <Link href={to} px={4} _hover={{bg: "primary.400"}}>
    <Text display="block" fontWeight={700} color="secondary.600" {...rest}>
      {children}
    </Text>
  </Link>
);

interface MenuLinksProps {
  isOpen: boolean;
}


const MenuLinks: FC<MenuLinksProps> = ({ isOpen }) => (
  <Box
    display={{ base: isOpen ? "block" : "none", md: "block" }}
    flexBasis={{ base: "100%", md: "auto" }}
  >
    <Stack
      align="center"
      justify={["center", "space-between", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
    >
      <MenuItem to="/map"> Map </MenuItem>
      <MenuItem to="/dashboard"> Dashboard </MenuItem>
    </Stack>
  </Box>
);

interface NavBarContainerProps extends FlexProps { }

const NavBarContainer: FC<NavBarContainerProps> = ({ children, ...props }) => (
  <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    w="100%"
    px={12}
    bg="primary.base"
    color={["white", "white", "primary.700", "primary.700"]}
    {...props}
  >
    {children}
  </Flex>
);

export default Navbar;
