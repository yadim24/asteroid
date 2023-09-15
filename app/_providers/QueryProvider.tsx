'use client';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';

type Props = {
  children: ReactNode;
};

const validateError = z.object({
  message: z.string(),
});

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const result = validateError.safeParse(error);

      if (result.success) {
        toast.error(result.data.message, {
          autoClose: false,
          theme: 'colored',
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const result = validateError.safeParse(error);

      if (result.success) {
        toast.error(result.data.message, {
          autoClose: false,
          theme: 'colored',
        });
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const QueryProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
