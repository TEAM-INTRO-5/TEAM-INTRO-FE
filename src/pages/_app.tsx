import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { Hydrate, QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import ProtectedRouter, { useUser } from '@/hooks/useVerify';
import { useState } from 'react';

function CustomUser() {
  const user = ProtectedRouter();
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <CustomUser />
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}
