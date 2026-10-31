import { Router } from 'express'
import { rateLimit } from 'express-rate-limit'
import type { AuthService } from '../../application/auth.service.js'
import { requireAuth } from './auth.middleware.js'
import { clearSessionCookie, setSessionCookie } from './cookies.js'
import { Credentials } from './schemas.js'

export const authRoutes = (auth: AuthService, secureCookies: boolean) => {
  // shortcut: in-memory store is per serverless instance; use a Redis/Upstash store if abused.
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { message: 'Too many attempts, try again later' },
  })

  return Router()
    .post('/register', limiter, async (req, res) => {
      const { login, password } = Credentials.parse(req.body)
      const session = await auth.register(login, password)
      setSessionCookie(res, session.token, secureCookies)
      res.status(201).json({ login: session.login })
    })
    .post('/login', limiter, async (req, res) => {
      const { login, password } = Credentials.parse(req.body)
      const session = await auth.login(login, password)
      setSessionCookie(res, session.token, secureCookies)
      res.json({ login: session.login })
    })
    .post('/logout', (_req, res) => {
      clearSessionCookie(res, secureCookies)
      res.status(204).end()
    })
    .get('/me', requireAuth(auth), async (_req, res) => {
      res.json(await auth.me(res.locals.userId))
    })
}
