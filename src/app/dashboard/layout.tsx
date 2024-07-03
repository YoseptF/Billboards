"use client";

import { FC, ReactNode, useLayoutEffect, useState } from "react";

import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { useAuth } from "@/lib/pocketbase/hooks/useAuth";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { push } = useRouter();

  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    if (isLoggedIn !== undefined) {
      push("/login");
    }
    return null;
  }

  return (
    <Box
      display="flex"
    >
      <Sidebar />
      {children}
    </Box>
  );
};

export default Layout;