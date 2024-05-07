"use client";

import { ChakraProvider as ChakraProviderSource, extendTheme } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const theme = {
  // config: {
  //   initialColorMode: "system", // see https://chakra-ui.com/docs/styled-system/color-mode
  //   useSystemColorMode: true,
  // },
  colors: {
    danger: {
      50: "#f5b4b3",
      100: "#f18e8d",
      200: "#ec6967",
      300: "#e84341",
      400: "#e31e1b",
      500: "#bd1916",
      600: "#971412",
      700: "#710f0d",
      800: "#4b0a09",
      900: "#250504",
      base: "#e73936",
    },
    primary: {
      50: "#bedaea",
      100: "#9ec8e0",
      200: "#7db6d6",
      300: "#5da3cb",
      400: "#3d91c1",
      500: "#3379a1",
      600: "#286181",
      700: "#1e4860",
      800: "#143040",
      900: "#0a1820",
      base: "#4596C4",
    },
    secondary: {
      50: "#b3d5f5",
      100: "#8dc0f0",
      200: "#68aceb",
      300: "#4297e6",
      400: "#1c82e2",
      500: "#186dbc",
      600: "#135796",
      700: "#0e4171",
      800: "#092b4b",
      900: "#041525",
      base: "#0D3B66",
    },
    warning: {
      50: "#f7e7b1",
      100: "#f4db8a",
      200: "#f0d063",
      300: "#ecc43c",
      400: "#e9b815",
      500: "#c29912",
      600: "#9b7b0e",
      700: "#745c0a",
      800: "#4d3d07",
      900: "#261e03",
      base: "#e7a836",
    },
    slateGray: "#6C757D",
  },
  semanticTokens: {
    colors: {
      headerBg: "primary.600",
      sidebarBg: "primary.500",
      mainBg: "white",
      sidebar2Bg: "secondary.50",
    },
  },
  fonts: {
    heading: "Poppins, 'Open Sans', sans-serif",
  }
};



interface ChakraProviderProps {
  children: ReactNode;
}

const ChakraProvider: FC<ChakraProviderProps> = ({ children }) => (
  <ChakraProviderSource theme={extendTheme(theme)}>
    {children}
  </ChakraProviderSource>
);

export default ChakraProvider;