import { notifications } from '@mantine/notifications'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { restartSession } from '@/entities/session'
import { ApiError } from '@/shared/api'

const isUnauthorized = (error: unknown) => error instanceof ApiError && error.status === 401

export const queryClient: QueryClient = new QueryClient({
  // An expired session anywhere drops the user's data and continues as a fresh guest.
  queryCache: new QueryCache({
    onError: (error) => isUnauthorized(error) && restartSession(queryClient),
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      // On sign-in forms a 401 means wrong credentials, not an expired session.
      if (isUnauthorized(error) && !mutation.meta?.credentials) return restartSession(queryClient)
      if (!mutation.meta?.inlineError) {
        notifications.show({ color: 'red', title: 'Something went wrong', message: error.message })
      }
    },
  }),
  defaultOptions: {
    queries: {
      // Retry network and server errors, not 4xx responses.
      retry: (failureCount, error) => !(error instanceof ApiError && error.status < 500) && failureCount < 2,
      refetchOnWindowFocus: false,
    },
  },
})
