import { useQuery, type QueryClient } from '@tanstack/react-query'
import type { Todo } from '../model/types'
import { todoApi } from './todoApi'

export const todosKey = ['todos'] as const

export const useTodos = () => useQuery({ queryKey: todosKey, queryFn: todoApi.list })

/** Writes a todo returned by the server into the cached list. */
export const putTodoInCache = (queryClient: QueryClient, todo: Todo) =>
  queryClient.setQueryData<Todo[]>(todosKey, (todos = []) =>
    todos.some((t) => t.id === todo.id) ? todos.map((t) => (t.id === todo.id ? todo : t)) : [todo, ...todos],
  )
