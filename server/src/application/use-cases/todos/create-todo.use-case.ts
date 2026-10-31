import type { Todo, TodoRepository } from '../../../domain/todo.js'

export interface CreateTodoInput {
  userId: number
  name: string
}

export class CreateTodo {
  constructor(private readonly todos: TodoRepository) {}

  execute({ userId, name }: CreateTodoInput): Promise<Todo> {
    return this.todos.create(userId, name)
  }
}
