import { useQuery, type Query, type QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/shared/api'
import type { User } from '../model/types'
import { sessionApi } from './sessionApi'

export const sessionKey = ['session'] as const

/** The current user. Visitors without a session are signed in as a guest automatically. */
export const useSession = () =>
  useQuery<User>({
    queryKey: sessionKey,
    queryFn: async () => {
      try {
        return await sessionApi.me()
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) return sessionApi.startGuest()
        throw e
      }
    },
    staleTime: Infinity,
  })

const isUserData = (query: Query) => query.queryKey[0] !== sessionKey[0]

/** Switches to another user, dropping everything cached for the previous one. */
export const setSession = (queryClient: QueryClient, user: User) => {
  queryClient.removeQueries({ predicate: isUserData })
  queryClient.setQueryData<User>(sessionKey, user)
}

/** Ends the current session client-side; refetching it starts a fresh guest session. */
export const restartSession = (queryClient: QueryClient) => {
  queryClient.removeQueries({ predicate: isUserData })
  return queryClient.resetQueries({ queryKey: sessionKey })
}
