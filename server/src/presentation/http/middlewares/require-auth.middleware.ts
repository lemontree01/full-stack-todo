import type { RequestHandler } from 'express'
import type { Authenticate } from '../../../application/use-cases/auth/authenticate.use-case.js'
import { UnauthorizedError } from '../../../domain/errors.js'
import type { SessionCookie } from '../session-cookie.js'

declare global {
  namespace Express {
    interface Locals {
      /** Set by requireAuth for every route behind it. */
      userId: number
    }
  }
}

export const requireAuth =
  (authenticate: Authenticate, cookie: SessionCookie): RequestHandler =>
  (req, res, next) => {
    const userId = authenticate.execute(cookie.read(req))
    if (userId === null) throw new UnauthorizedError('Not authenticated')
    res.locals.userId = userId
    next()
  }
