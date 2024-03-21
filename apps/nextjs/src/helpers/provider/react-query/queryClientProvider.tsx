"use client"

import { QueryClient, QueryClientProvider as DefaultProvider } from "react-query";

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();

    return (
        <DefaultProvider client={queryClient}>
            {children}
        </DefaultProvider>
    )
}

export default QueryClientProvider;