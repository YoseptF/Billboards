import "./polyfillIndexedDB";
import "./globals.css";
import "@fontsource/poppins";

import { FC, ReactNode } from "react";

import type { Metadata } from "next";
import Providers from "@/providers";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "Espectaculares en linea",
  description: "Renta espectacualres en linea",
};

interface RootLayoutProps {
  children: ReactNode;
}



const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body className={roboto.className}>
      <link rel="stylesheet" href="/scripts/geojson.css" />
      <Providers>
        {children}
      </Providers>
    </body>
  </html>
);

export default RootLayout;