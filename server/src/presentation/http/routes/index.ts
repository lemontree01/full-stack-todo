import { Router, type RequestHandler } from 'express'
import type { AuthController } from '../controllers/auth.controller.js'
import type { TodoController } from '../controllers/todo.controller.js'
import { notFound } from '../middlewares/error.middleware.js'
import { authRoutes } from './auth.routes.js'
import { todoRoutes } from './todo.routes.js'

export interface HttpDependencies {
  authController: AuthController
  todoController: TodoController
  requireAuth: RequestHandler
}

export const apiRoutes = ({ authController, todoController, requireAuth }: HttpDependencies) =>
  Router()
    .use('/auth', authRoutes(authController, requireAuth))
    .use('/todos', todoRoutes(todoController, requireAuth))
    .use(notFound)
