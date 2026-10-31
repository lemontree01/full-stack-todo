import { UnauthorizedError } from '../domain/errors.js'
import type { UserRepository } from '../domain/user.js'
import type { PasswordHasher, TokenService } from './ports.js'

export const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60

export interface Session {
  login: string
  token: string
}

export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async register(login: string, password: string): Promise<Session> {
    const user = await this.users.create(login, await this.hasher.hash(password))
    return { login: user.login, token: this.tokens.sign(user.id) }
  }

  async login(login: string, password: string): Promise<Session> {
    const user = await this.users.findByLogin(login)
    // One error for both cases, so the response doesn't reveal which logins exist.
    if (!user || !(await this.hasher.verify(password, user.passwordHash))) {
      throw new UnauthorizedError('Invalid login or password')
    }
    return { login: user.login, token: this.tokens.sign(user.id) }
  }

  async me(userId: number): Promise<{ login: string }> {
    const user = await this.users.findById(userId)
    if (!user) throw new UnauthorizedError('Not authenticated')
    return { login: user.login }
  }

  authenticate(token: string | undefined): number {
    const userId = token ? this.tokens.verify(token) : null
    if (userId === null) throw new UnauthorizedError('Not authenticated')
    return userId
  }
}
