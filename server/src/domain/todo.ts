export const TODO_NAME_MAX = 500

export interface Todo {
  id: number
  name: string
  isDone: boolean
  createdAt: Date
}

export type TodoPatch = Partial<Pick<Todo, 'name' | 'isDone'>>

/** Every method is scoped to the owner: another user's todo behaves as if it doesn't exist. */
export interface TodoRepository {
  listByUser(userId: number): Promise<Todo[]>
  create(userId: number, name: string): Promise<Todo>
  update(userId: number, id: number, patch: TodoPatch): Promise<Todo | null>
  delete(userId: number, id: number): Promise<boolean>
}
