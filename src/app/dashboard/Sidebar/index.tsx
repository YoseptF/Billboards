"use client";

import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import Links, { Route } from "./Links";

import Image from "next/image";
import { Link } from "@chakra-ui/next-js";
import supabase from "@/graphql/supabase";
import { useRouter } from "next/navigation";

const Sidebar: FC = () => {
  const { push } = useRouter();
  const [mapRoutes, setMapRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await supabase.from("Map").select("id, name");

      if(!data) throw new Error("Maps not found");

      const routes: Route[] = data.map(({ id, name }) => ({
        path: `/dashboard/maps?id=${id}`,
        name: `Map ${name}`,
        type: "route",
      }));

      setMapRoutes(routes);
    };

    fetchLinks();
  },[]);


  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    push("/");
  };



  return (

    <Box
      display={{ sm: "none", md: "flex" }}
      flexDir="column"
      borderRight="1px solid"
      borderColor="primary.50"
      backgroundColor="secondary.base"
      transition="0.2s linear"
      w="260px"
      maxW="260px"
      marginLeft={16}
      my={16}
      h="100vh"
      ps="20px"
      pe="20px"
      m="0px"
      borderRadius="0px"
    >
      <Box pt={"25px"} mb="12px">
        <Link
          href={"/"}
          target="_blank"
          display="flex"
          lineHeight="100%"
          mb="30px"
          fontWeight="bold"
          justifyContent="center"
          alignItems="center"
          fontSize="11px"
        >
          <Flex gap={3} alignItems="center">
            <Image src="https://via.placeholder.com/200" width={30} height={30} alt="logo" />
            <Heading fontSize="large" mt="3px" color="primary.base">
              www
            </Heading>
          </Flex>
        </Link>
      </Box>
      <Stack direction="column" mb="40px" justify="space-between" flexGrow="1">
        <Flex flexDir="column" gap={2}>
          <Links pieces={[
            {
              name: "Maps",
              type: "category",
              icon: { name: "house", type: "solid" },
              views: [
                {
                  path: "/dashboard/home",
                  name: "Home",
                  type: "route",
                },
              ],
            },
            {
              name: "Maps",
              type: "category",
              icon: { name: "map", type: "solid" },
              views: mapRoutes,
            },
          ]} />
        </Flex>
        <Button
          onClick={logout}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;