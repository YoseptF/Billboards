"use client";

import { Grid, GridItem } from "@chakra-ui/react";

import { FC } from "react";
import Link from "next/link";
import { MexicanState } from "./MexicoMap/mexicanStates";
import MexicoMap from "./MexicoMap";

interface StateSelectorProps {
  states: MexicanState[];
}

const StateSelector: FC<StateSelectorProps> = ({ states }) => (
  <Grid
    as="section"
    templateColumns="repeat(3, 100px)"
    templateRows="repeat(2, 150px)"
    gap={16}
    w="50%"
    h="100vh"
    pt={20}
    placeItems="center"
    justifyContent="center"
  >
    {
      states.map((state) => (
        <GridItem
          key={state}
          w="100%"
        >
          <Link
            href={`/map?state=${state}`}
          >
            <MexicoMap states={[state]} interactive />
          </Link>
        </GridItem>
      ))
    }
  </Grid>
);

export default StateSelector;