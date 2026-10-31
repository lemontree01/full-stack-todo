import { UnauthorizedError } from '../domain/errors.js'
import { isGuest, type User, type UserRepository } from '../domain/user.js'
import type { PasswordHasher, TokenService } from './ports.js'

export const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60

export interface Me {
  login: string | null
  isGuest: boolean
}

export interface Session {
  me: Me
  token: string
}

const toMe = (user: User): Me => ({ login: user.login, isGuest: isGuest(user) })

export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  // shortcut: guest users are never cleaned up; add a scheduled job deleting old guests if the table grows.
  async startGuest(): Promise<Session> {
    return this.session(await this.users.createGuest())
  }

  /** A guest who signs up keeps their todos: the guest account itself becomes the new account. */
  async register(login: string, password: string, currentUserId: number | null): Promise<Session> {
    const passwordHash = await this.hasher.hash(password)
    const current = currentUserId === null ? null : await this.users.findById(currentUserId)
    const user =
      current && isGuest(current)
        ? await this.users.setCredentials(current.id, login, passwordHash)
        : await this.users.create(login, passwordHash)
    return this.session(user)
  }

  async login(login: string, password: string): Promise<Session> {
    const user = await this.users.findByLogin(login)
    // One error for both cases, so the response doesn't reveal which logins exist.
    if (!user?.passwordHash || !(await this.hasher.verify(password, user.passwordHash))) {
      throw new UnauthorizedError('Invalid login or password')
    }
    return this.session(user)
  }

  async me(userId: number): Promise<Me> {
    const user = await this.users.findById(userId)
    if (!user) throw new UnauthorizedError('Not authenticated')
    return toMe(user)
  }

  /** The user id behind a session token, or null when there is no valid session. */
  identify(token: string | undefined): number | null {
    return token ? this.tokens.verify(token) : null
  }

  authenticate(token: string | undefined): number {
    const userId = this.identify(token)
    if (userId === null) throw new UnauthorizedError('Not authenticated')
    return userId
  }

  private session(user: User): Session {
    return { me: toMe(user), token: this.tokens.sign(user.id) }
  }
}
