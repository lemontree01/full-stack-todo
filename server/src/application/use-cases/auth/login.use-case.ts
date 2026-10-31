import { UnauthorizedError } from '../../../domain/errors.js'
import type { UserRepository } from '../../../domain/user.js'
import type { PasswordHasher, TokenService } from '../../ports.js'
import { createSession, type Session } from '../../session.js'

export interface LoginInput {
  login: string
  password: string
}

export class Login {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async execute({ login, password }: LoginInput): Promise<Session> {
    const user = await this.users.findByLogin(login)
    // One error for both cases, so the response doesn't reveal which logins exist.
    if (!user?.passwordHash || !(await this.hasher.verify(password, user.passwordHash))) {
      throw new UnauthorizedError('Invalid login or password')
    }
    return createSession(user, this.tokens)
  }
}
