/*eslint-disable*/
// chakra imports
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Icon, { IconCoreProps, IconName } from "@/components/Icon";

import { FC } from "react";
import { Link } from "@chakra-ui/next-js"
import { match } from "ts-pattern";
import { usePathname } from 'next/navigation'

interface Category {
  name: string;
  views: Route[];
  type: "category";
  icon?: IconCoreProps | IconName;
}

export interface Route {
  path: string;
  name: string;
  type: "route";
  icon?: IconCoreProps | IconName;
}

export type LinkPiece = Category | Route;

interface LinksProps {
  pieces: LinkPiece[];
}

const Links: FC<LinksProps> = ({ pieces }) => {

  let pathname = usePathname();

  const [activeColor, inactiveColor] = useColorModeValue(
    ["secondary.base", "primary.base"],
    ["secondary.base", "secondary.base"]
  );


  const activeRoute = (routeName: string) => {
    return pathname === routeName ? "active" : "";
  };

  return (
    <Accordion allowMultiple defaultIndex={[0]}>
      {
        pieces.map((piece) => match(piece)
          .with({ type: "category" }, ({ name, views, icon }) => {
            return (
              <AccordionItem key={name + "_category" + views.map(v => v.path).join("_")}>
                <AccordionButton>
                  <Flex gap={2} color="white" justifyContent="space-between" grow={1}>
                    <Text
                      fontWeight="bold"
                      textAlign="center"
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      <Icon icon={icon} />
                      {name}
                    </Text>
                    <AccordionIcon />
                  </Flex>
                </AccordionButton>
                <AccordionPanel maxH={300} overflowY='auto' css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: activeColor,
                    borderRadius: '24px',
                  },
                }}>

                  <Links pieces={views} />
                </AccordionPanel>
              </AccordionItem>

            );
          })
          .with({ type: "route" }, ({ path, name, icon }) => {
            const isActiveRoute = activeRoute(path) === "active";

            return (
              <Link href={path} key={name + "_route" + path}>
                <Button
                  w="100%"
                  bg={!isActiveRoute ? "transparent" : "primary.50"}
                >
                  <Flex gap={2} color={!isActiveRoute ? inactiveColor : activeColor}>
                    <Icon icon={icon} />
                    <Text fontSize="sm">{name}</Text>
                  </Flex>
                </Button>
              </Link>
            )
          })
          .exhaustive()
        )
      }
    </Accordion>
  );
};

export default Links