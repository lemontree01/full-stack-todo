/** Mirrors the server's domain limit. */
export const TODO_NAME_MAX = 500

export interface Todo {
  id: number
  name: string
  isDone: boolean
  createdAt: string
}

export type TodoPatch = Partial<Pick<Todo, 'name' | 'isDone'>>
