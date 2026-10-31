import type { CookieOptions, Request, Response } from 'express'
import { SESSION_TTL_SECONDS } from '../../application/session.js'

/** The httpOnly `token` cookie that carries the session between requests. */
export class SessionCookie {
  private readonly options: CookieOptions

  constructor(secure: boolean) {
    this.options = { httpOnly: true, secure, sameSite: 'lax', path: '/' }
  }

  read(req: Request): string | undefined {
    return req.headers.cookie?.match(/(?:^|;\s*)token=([^;]+)/)?.[1]
  }

  set(res: Response, token: string): void {
    res.cookie('token', token, { ...this.options, maxAge: SESSION_TTL_SECONDS * 1000 })
  }

  clear(res: Response): void {
    res.clearCookie('token', this.options)
  }
}
