import { Router } from 'express'
import type { AuthService } from '../../application/auth.service.js'
import type { TodoService } from '../../application/todo.service.js'
import { requireAuth } from './auth.middleware.js'
import { CreateTodo, TodoId, UpdateTodo } from './schemas.js'

export const todoRoutes = (todos: TodoService, auth: AuthService) =>
  Router()
    .use(requireAuth(auth))
    .get('/', async (_req, res) => {
      res.json(await todos.list(res.locals.userId))
    })
    .post('/', async (req, res) => {
      const { name } = CreateTodo.parse(req.body)
      res.status(201).json(await todos.create(res.locals.userId, name))
    })
    .patch('/:id', async (req, res) => {
      res.json(await todos.update(res.locals.userId, TodoId.parse(req.params.id), UpdateTodo.parse(req.body)))
    })
    .delete('/:id', async (req, res) => {
      await todos.remove(res.locals.userId, TodoId.parse(req.params.id))
      res.status(204).end()
    })
