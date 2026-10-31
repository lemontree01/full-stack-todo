import { http } from '@/shared/api'
import type { Todo, TodoPatch } from '../model/types'

export const todoApi = {
  list: () => http<Todo[]>('GET', '/todos'),
  create: (name: string) => http<Todo>('POST', '/todos', { name }),
  update: (id: number, patch: TodoPatch) => http<Todo>('PATCH', `/todos/${id}`, patch),
  remove: (id: number) => http<void>('DELETE', `/todos/${id}`),
}
