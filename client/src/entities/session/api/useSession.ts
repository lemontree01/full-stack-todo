import { useQuery } from '@tanstack/react-query'
import { ApiError } from '@/shared/api'
import type { User } from '../model/types'
import { sessionApi } from './sessionApi'

export const sessionKey = ['session'] as const

/** The signed-in user, or null when signed out. */
export const useSession = () =>
  useQuery<User | null>({
    queryKey: sessionKey,
    queryFn: async () => {
      try {
        return await sessionApi.me()
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) return null
        throw e
      }
    },
    staleTime: Infinity,
  })
