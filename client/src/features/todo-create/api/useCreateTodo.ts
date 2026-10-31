import { useMutation, useQueryClient } from '@tanstack/react-query'
import { putTodoInCache, todoApi } from '@/entities/todo'

export const useCreateTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: todoApi.create,
    onSuccess: (todo) => putTodoInCache(queryClient, todo),
    meta: { inlineError: true },
  })
}
