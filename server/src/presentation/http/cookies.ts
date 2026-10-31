import type { CookieOptions, Request, Response } from 'express'
import { SESSION_TTL_SECONDS } from '../../application/auth.service.js'

const options = (secure: boolean): CookieOptions => ({ httpOnly: true, secure, sameSite: 'lax', path: '/' })

export const readSessionCookie = (req: Request): string | undefined =>
  req.headers.cookie?.match(/(?:^|;\s*)token=([^;]+)/)?.[1]

export const setSessionCookie = (res: Response, token: string, secure: boolean) =>
  res.cookie('token', token, { ...options(secure), maxAge: SESSION_TTL_SECONDS * 1000 })

export const clearSessionCookie = (res: Response, secure: boolean) => res.clearCookie('token', options(secure))
