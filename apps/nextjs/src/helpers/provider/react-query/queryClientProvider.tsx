"use client"

import React from "react";
import { QueryClient, QueryClientProvider as DefaultProvider } from "react-query";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => (
    <DefaultProvider client={queryClient}>
        {children}
    </DefaultProvider>
)

export default QueryClientProvider;