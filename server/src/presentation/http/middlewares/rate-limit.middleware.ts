import { rateLimit } from 'express-rate-limit'

// shortcut: in-memory store is per serverless instance; use a Redis/Upstash store if abused.
export const perIpRateLimit = (limit: number) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { message: 'Too many attempts, try again later' },
  })
