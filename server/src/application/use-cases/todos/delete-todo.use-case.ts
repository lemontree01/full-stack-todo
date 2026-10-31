import { NotFoundError } from '../../../domain/errors.js'
import type { TodoRepository } from '../../../domain/todo.js'

export interface DeleteTodoInput {
  userId: number
  id: number
}

export class DeleteTodo {
  constructor(private readonly todos: TodoRepository) {}

  /** Another user's todo is reported as not found, so its existence isn't revealed. */
  async execute({ userId, id }: DeleteTodoInput): Promise<void> {
    if (!(await this.todos.delete(userId, id))) throw new NotFoundError('Todo not found')
  }
}
