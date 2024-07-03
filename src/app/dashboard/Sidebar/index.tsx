"use client";

import { BillboardsResponse, Collections } from "@/lib/pocketbase/pocketbase-types";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import Links, { Route } from "./Links";

import Image from "next/image";
import { Link } from "@chakra-ui/next-js";
import { useAuthActions } from "@/lib/pocketbase/hooks";
import { useRouter } from "next/navigation";
import { useSubscribe } from "@/lib/pocketbase/hooks/useSubscribe";

type RouteGetter = (initialPath: string) => Route[];

const Sidebar: FC = () => {
  const { push } = useRouter();
  const maps = useSubscribe<BillboardsResponse>({ id: Collections.Maps });

  const mapRoutes: RouteGetter = (initialPath) => maps.map(({ id, name }) => ({
    name,
    path: `/dashboard/${initialPath}?id=${id}`,
    type: "route",
  }));

  console.debug("mapRoutes", mapRoutes("maps"));

  const { logout } = useAuthActions();

  const handleLogout = () => {
    logout();
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
              views: mapRoutes("maps"),
            },
            {
              name: "Spreadsheets",
              type: "category",
              icon: { name: "table", type: "solid" },
              views: mapRoutes("spreadsheets"),
            }
          ]} />
        </Flex>
        <Button
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;