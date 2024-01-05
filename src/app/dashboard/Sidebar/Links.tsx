/*eslint-disable*/
// chakra imports
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Icon, { IconCoreProps, IconName } from "@/components/Icon";

import { FC } from "react";
import Image from "next/image";
import { Link } from "@chakra-ui/next-js"
import Separator from "@/components/Separator";
import { usePathname } from 'next/navigation'

// this function creates the links and collapses that appear in the sidebar (left menu)

interface Route {
  path: string;
  name: string;
  icon: IconCoreProps | IconName;
  redirect?: boolean;
  category?: boolean;
  views: Route[];
}

interface LinksProps {
  routes: Route[];
}

const Links: FC<LinksProps> = ({ routes }) => {

  let pathname = usePathname();

  const [activeColor, inactiveColor] = useColorModeValue(
    ["secondary.base", "primary.base"],
    ["secondary.base", "secondary.base"]
  );


  const activeRoute = (routeName: string) => {
    return pathname === routeName ? "active" : "";
  };

  return (
    <>
      {
        routes.map(({ category, name, views, icon, path }) => {
          if (category) {
            return (
              <div key={name}>
                <Text
                  color={activeColor}
                  fontWeight="bold"
                  mb={{
                    xl: "12px",
                  }}
                  mx="auto"
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  py="12px"
                >
                  prop.name
                </Text>
                <Links routes={views} />
              </div>
            );
          }

          const isActiveRoute = activeRoute(path) === "active";

          return (
            <Link href={path} key={name}>
              <Button
                w="100%"
                bg={!isActiveRoute ? "transparent" : undefined}
              >
                <Flex gap={2} color={isActiveRoute ? activeColor : inactiveColor}>
                  <Icon icon={icon} />
                  <Text fontSize="sm">{name}</Text>
                </Flex>
              </Button>
            </Link>
          );
        })
      }
    </>
  );
};

export default Links