import "./globals.css";

import { FC, ReactNode } from "react";

import ApolloProvider from "./providers/ApolloProvider";
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
  <ApolloProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  </ApolloProvider>
);

export default RootLayout;