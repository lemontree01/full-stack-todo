import express from 'express'
import type { AuthService } from '../../application/auth.service.js'
import type { TodoService } from '../../application/todo.service.js'
import { authRoutes } from './auth.routes.js'
import { errorHandler } from './error.handler.js'
import { todoRoutes } from './todo.routes.js'

export interface AppDeps {
  auth: AuthService
  todos: TodoService
  secureCookies: boolean
}

export const createApp = ({ auth, todos, secureCookies }: AppDeps) => {
  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', 1) // behind Vercel's proxy: use the real client IP for rate limiting
  app.use(express.json({ limit: '10kb' }))
  app.use('/api/auth', authRoutes(auth, secureCookies))
  app.use('/api/todos', todoRoutes(todos, auth))
  app.use('/api', (_req, res) => void res.status(404).json({ message: 'Not found' }))
  app.use(errorHandler)
  return app
}
