"use client";

import { FC, ReactNode, useLayoutEffect, useState } from "react";

import { Box } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import Sidebar from "./Sidebar";
import supabase from "@/graphql/supabase";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { push } = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<Session>();

  useLayoutEffect(() => {
    const checkAuth = async () => {

      const { data } = await supabase.auth.getSession();
      const { session } = data;
      if (!session) {
        push("/login");
      } else {
        setIsLoggedIn(session);
      }
    };

    checkAuth();
  });

  if (!isLoggedIn) {
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