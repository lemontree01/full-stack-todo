import { useMutation, useQueryClient } from '@tanstack/react-query'
import { putTodoInCache, todoApi } from '@/entities/todo'

export const useToggleTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, isDone }: { id: number; isDone: boolean }) => todoApi.update(id, { isDone }),
    onSuccess: (todo) => putTodoInCache(queryClient, todo),
  })
}
