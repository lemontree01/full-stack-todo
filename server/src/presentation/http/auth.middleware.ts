import type { RequestHandler } from 'express'
import type { AuthService } from '../../application/auth.service.js'
import { readSessionCookie } from './cookies.js'

declare global {
  namespace Express {
    interface Locals {
      userId: number
    }
  }
}

export const requireAuth =
  (auth: AuthService): RequestHandler =>
  (req, res, next) => {
    res.locals.userId = auth.authenticate(readSessionCookie(req))
    next()
  }
