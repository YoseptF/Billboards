"use client";

import { FC, ReactNode } from "react";

import apolloClient from "@/graphql/client";
import { ApolloProvider as ApolloProviderSource } from "@apollo/client";

interface ApolloProps {
  children: ReactNode;
}

const ApolloProvider: FC<ApolloProps> = ({ children }) => (
  <ApolloProviderSource client={apolloClient}>
    {children}
  </ApolloProviderSource>
);

export default ApolloProvider;