import { isGuest, type User } from '../domain/user.js'
import type { TokenService } from './ports.js'

export const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60

/** What the client is told about the signed-in user. */
export interface Me {
  login: string | null
  isGuest: boolean
}

/** The outcome of signing in: who the user is, plus a token that proves it. */
export interface Session {
  me: Me
  token: string
}

export const toMe = (user: User): Me => ({ login: user.login, isGuest: isGuest(user) })

export const createSession = (user: User, tokens: TokenService): Session => ({
  me: toMe(user),
  token: tokens.sign(user.id),
})
