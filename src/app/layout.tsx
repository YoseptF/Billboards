import "./globals.css";
import "@fontsource/poppins";

import { FC, ReactNode } from "react";

import ApolloProvider from "./providers/ApolloProvider";
import ChakraProvider from "./providers/ChakraProvider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Espectaculares en linea",
  description: "Renta espectacualres en linea",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <link rel="stylesheet" href="/scripts/geojson.css" />
      <ApolloProvider>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </ApolloProvider>
    </body>
  </html>
);

export default RootLayout;