import { useMutation, useQueryClient } from '@tanstack/react-query'
import { restartSession, sessionApi, setSession } from '@/entities/session'

// Errors are shown inline in the form; a 401 here is a wrong password, not an expired session.
const meta = { inlineError: true, credentials: true }

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sessionApi.login,
    onSuccess: (user) => setSession(queryClient, user),
    meta,
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sessionApi.register,
    onSuccess: (user) => setSession(queryClient, user),
    meta,
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sessionApi.logout,
    onSuccess: () => restartSession(queryClient),
  })
}
