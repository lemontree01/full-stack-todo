import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { ConflictError, NotFoundError, UnauthorizedError } from '../../domain/errors.js'

const statusOf = (err: unknown): number | undefined => {
  if (err instanceof ZodError) return 400
  if (err instanceof UnauthorizedError) return 401
  if (err instanceof NotFoundError) return 404
  if (err instanceof ConflictError) return 409
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = statusOf(err)
  if (status) {
    const message = err instanceof ZodError ? (err.issues[0]?.message ?? 'Invalid input') : err.message
    return void res.status(status).json({ message })
  }
  // body-parser errors (malformed JSON, payload too large) carry their own 4xx status.
  if (typeof err?.status === 'number' && err.status >= 400 && err.status < 500) {
    return void res.status(err.status).json({ message: 'Invalid request body' })
  }
  console.error(err)
  res.status(500).json({ message: 'Something went wrong' })
}
