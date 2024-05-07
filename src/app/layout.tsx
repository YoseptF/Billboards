import "./polyfillIndexedDB";
import "./globals.css";
import "@fontsource/poppins";

import { FC, ReactNode } from "react";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "@/providers";
import Script from "next/script";

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
      <Providers>
        {children}
      </Providers>
      <Script type="text/javascript" src="/scripts/plugins.js" strategy="beforeInteractive"/>
      <Script type="text/javascript" src="/scripts/main.js" strategy="beforeInteractive"/>
    </body>
  </html>
);

export default RootLayout;