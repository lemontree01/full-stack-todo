import { NotFoundError } from '../domain/errors.js'
import type { Todo, TodoPatch, TodoRepository } from '../domain/todo.js'

export class TodoService {
  constructor(private readonly todos: TodoRepository) {}

  list(userId: number): Promise<Todo[]> {
    return this.todos.listByUser(userId)
  }

  create(userId: number, name: string): Promise<Todo> {
    return this.todos.create(userId, name)
  }

  async update(userId: number, id: number, patch: TodoPatch): Promise<Todo> {
    const todo = await this.todos.update(userId, id, patch)
    if (!todo) throw new NotFoundError('Todo not found')
    return todo
  }

  async remove(userId: number, id: number): Promise<void> {
    if (!(await this.todos.delete(userId, id))) throw new NotFoundError('Todo not found')
  }
}
