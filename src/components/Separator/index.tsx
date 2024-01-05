import { Flex, FlexProps } from "@chakra-ui/react";
import React, { FC } from "react";

const Separator: FC<FlexProps> = ({
  children,
  ...rest
}) => (
  <Flex
    h="1px"
    w="100%"
    borderBottom="1px solid"
    borderColor="primary.50"
    {...rest}
  >
    {children}
  </Flex>
);


export default Separator;