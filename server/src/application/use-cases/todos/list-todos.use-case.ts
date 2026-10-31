import type { Todo, TodoRepository } from '../../../domain/todo.js'

export class ListTodos {
  constructor(private readonly todos: TodoRepository) {}

  execute({ userId }: { userId: number }): Promise<Todo[]> {
    return this.todos.listByUser(userId)
  }
}
