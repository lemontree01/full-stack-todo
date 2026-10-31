import express from 'express'
import { errorHandler } from './middlewares/error.middleware.js'
import { apiRoutes, type HttpDependencies } from './routes/index.js'

export const createApp = (dependencies: HttpDependencies) => {
  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', 1) // behind Vercel's proxy: use the real client IP for rate limiting
  app.use(express.json({ limit: '10kb' }))
  app.use('/api', apiRoutes(dependencies))
  app.use(errorHandler)
  return app
}
