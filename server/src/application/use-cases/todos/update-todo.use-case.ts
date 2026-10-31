import { NotFoundError } from '../../../domain/errors.js'
import type { Todo, TodoPatch, TodoRepository } from '../../../domain/todo.js'

export interface UpdateTodoInput {
  userId: number
  id: number
  patch: TodoPatch
}

export class UpdateTodo {
  constructor(private readonly todos: TodoRepository) {}

  /** Another user's todo is reported as not found, so its existence isn't revealed. */
  async execute({ userId, id, patch }: UpdateTodoInput): Promise<Todo> {
    const todo = await this.todos.update(userId, id, patch)
    if (!todo) throw new NotFoundError('Todo not found')
    return todo
  }
}
