import { QueryClient } from "@tanstack/react-query"

// Shared server-state defaults live here so future pages use the same cache.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
