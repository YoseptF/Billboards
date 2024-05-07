"use client";

import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface ReactQueryProviderProps {
  children: ReactNode;
}

const ReactQuery: FC<ReactQueryProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

export default ReactQuery;

