import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi, todosKey, type Todo } from '@/entities/todo'

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: todoApi.remove,
    onSuccess: (_, id) => queryClient.setQueryData<Todo[]>(todosKey, (todos) => todos?.filter((t) => t.id !== id)),
  })
}
