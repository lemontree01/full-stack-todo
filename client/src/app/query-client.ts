import { notifications } from '@mantine/notifications'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { sessionKey } from '@/entities/session'
import { ApiError } from '@/shared/api'

const isUnauthorized = (error: unknown) => error instanceof ApiError && error.status === 401

export const queryClient: QueryClient = new QueryClient({
  // An expired session anywhere sends the user back to the sign-in screen.
  queryCache: new QueryCache({
    onError: (error) => isUnauthorized(error) && queryClient.setQueryData(sessionKey, null),
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (isUnauthorized(error)) return queryClient.setQueryData(sessionKey, null)
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
