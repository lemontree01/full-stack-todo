import type { RequestHandler } from 'express'
import type { CreateTodo } from '../../../application/use-cases/todos/create-todo.use-case.js'
import type { DeleteTodo } from '../../../application/use-cases/todos/delete-todo.use-case.js'
import type { ListTodos } from '../../../application/use-cases/todos/list-todos.use-case.js'
import type { UpdateTodo } from '../../../application/use-cases/todos/update-todo.use-case.js'
import { CreateTodoBody, TodoIdParam, UpdateTodoBody } from '../validation/todo.schemas.js'

export interface TodoUseCases {
  listTodos: ListTodos
  createTodo: CreateTodo
  updateTodo: UpdateTodo
  deleteTodo: DeleteTodo
}

/** Translates HTTP requests into todo use cases. Every route behind it requires a session. */
export class TodoController {
  constructor(private readonly useCases: TodoUseCases) {}

  list: RequestHandler = async (_req, res) => {
    res.json(await this.useCases.listTodos.execute({ userId: res.locals.userId }))
  }

  create: RequestHandler = async (req, res) => {
    const { name } = CreateTodoBody.parse(req.body)
    res.status(201).json(await this.useCases.createTodo.execute({ userId: res.locals.userId, name }))
  }

  update: RequestHandler = async (req, res) => {
    const id = TodoIdParam.parse(req.params.id)
    const patch = UpdateTodoBody.parse(req.body)
    res.json(await this.useCases.updateTodo.execute({ userId: res.locals.userId, id, patch }))
  }

  remove: RequestHandler = async (req, res) => {
    const id = TodoIdParam.parse(req.params.id)
    await this.useCases.deleteTodo.execute({ userId: res.locals.userId, id })
    res.status(204).end()
  }
}
