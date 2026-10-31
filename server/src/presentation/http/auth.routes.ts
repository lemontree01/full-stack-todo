import { Router } from 'express'
import { rateLimit } from 'express-rate-limit'
import type { AuthService } from '../../application/auth.service.js'
import { requireAuth } from './auth.middleware.js'
import { clearSessionCookie, readSessionCookie, setSessionCookie } from './cookies.js'
import { Credentials } from './schemas.js'

// shortcut: in-memory store is per serverless instance; use a Redis/Upstash store if abused.
const perIpLimit = (limit: number) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { message: 'Too many attempts, try again later' },
  })

export const authRoutes = (auth: AuthService, secureCookies: boolean) => {
  const credentialsLimit = perIpLimit(20)
  const guestLimit = perIpLimit(30)

  return Router()
    .post('/guest', guestLimit, async (_req, res) => {
      const session = await auth.startGuest()
      setSessionCookie(res, session.token, secureCookies)
      res.status(201).json(session.me)
    })
    .post('/register', credentialsLimit, async (req, res) => {
      const { login, password } = Credentials.parse(req.body)
      const session = await auth.register(login, password, auth.identify(readSessionCookie(req)))
      setSessionCookie(res, session.token, secureCookies)
      res.status(201).json(session.me)
    })
    .post('/login', credentialsLimit, async (req, res) => {
      const { login, password } = Credentials.parse(req.body)
      const session = await auth.login(login, password)
      setSessionCookie(res, session.token, secureCookies)
      res.json(session.me)
    })
    .post('/logout', (_req, res) => {
      clearSessionCookie(res, secureCookies)
      res.status(204).end()
    })
    .get('/me', requireAuth(auth), async (_req, res) => {
      res.json(await auth.me(res.locals.userId))
    })
}
