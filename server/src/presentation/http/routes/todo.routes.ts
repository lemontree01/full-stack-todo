import { Router, type RequestHandler } from 'express'
import type { TodoController } from '../controllers/todo.controller.js'

export const todoRoutes = (controller: TodoController, requireAuth: RequestHandler) =>
  Router()
    .use(requireAuth)
    .get('/', controller.list)
    .post('/', controller.create)
    .patch('/:id', controller.update)
    .delete('/:id', controller.remove)
