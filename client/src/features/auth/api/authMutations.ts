import { useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query'
import { sessionApi, sessionKey, type User } from '@/entities/session'

// Errors are shown inline in the form, so the global error toast is skipped.
const meta = { inlineError: true }

/** Switches the signed-in user, dropping everything cached for the previous one. */
const switchSession = (queryClient: QueryClient, user: User | null) => {
  queryClient.removeQueries({ predicate: (query) => query.queryKey[0] !== sessionKey[0] })
  queryClient.setQueryData<User | null>(sessionKey, user)
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sessionApi.login,
    onSuccess: (user) => switchSession(queryClient, user),
    meta,
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sessionApi.register,
    onSuccess: (user) => switchSession(queryClient, user),
    meta,
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sessionApi.logout,
    onSuccess: () => switchSession(queryClient, null),
  })
}
