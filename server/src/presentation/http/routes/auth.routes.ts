import { Router, type RequestHandler } from 'express'
import type { AuthController } from '../controllers/auth.controller.js'
import { perIpRateLimit } from '../middlewares/rate-limit.middleware.js'

export const authRoutes = (controller: AuthController, requireAuth: RequestHandler) => {
  const credentialsLimit = perIpRateLimit(20)
  const guestLimit = perIpRateLimit(30)

  return Router()
    .post('/guest', guestLimit, controller.startGuest)
    .post('/register', credentialsLimit, controller.register)
    .post('/login', credentialsLimit, controller.login)
    .post('/logout', controller.logout)
    .get('/me', requireAuth, controller.me)
}
