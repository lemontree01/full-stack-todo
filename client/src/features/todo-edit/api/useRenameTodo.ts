import { useMutation, useQueryClient } from '@tanstack/react-query'
import { putTodoInCache, todoApi } from '@/entities/todo'

export const useRenameTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => todoApi.update(id, { name }),
    onSuccess: (todo) => putTodoInCache(queryClient, todo),
    meta: { inlineError: true },
  })
}
