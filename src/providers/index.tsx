"use client";

import { FC, ReactNode } from "react";

import Chakra from "./Chakra";
import ReactQuery from "./ReactQuery";

const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <ReactQuery>
    <Chakra>
      {children}
    </Chakra>
  </ReactQuery>
);

export default Providers;