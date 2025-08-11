'use client';

import getQueryClient from '@helpers/hook/react-query';
import { QueryClientProvider as DefaultProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { lazy, useEffect, useState } from 'react';

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools').then((d) => ({
    default: d.ReactQueryDevtools as React.ComponentType<unknown>,
  }))
);

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-expect-error - toggleDevtools is set in window
    window.toggleDevtools = () => {
      setShowDevtools((old) => !old);
    };
  }, []);

  return (
    <DefaultProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
      {showDevtools && (
        <React.Suspense>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </DefaultProvider>
  );
};

export default QueryClientProvider;
