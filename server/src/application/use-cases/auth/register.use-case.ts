import { isGuest, type UserRepository } from '../../../domain/user.js'
import type { PasswordHasher, TokenService } from '../../ports.js'
import { createSession, type Session } from '../../session.js'

export interface RegisterInput {
  login: string
  password: string
  /** Who is signed in right now, if anyone. */
  currentUserId: number | null
}

/** A guest who signs up keeps their todos: the guest account itself becomes the new account. */
export class Register {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async execute({ login, password, currentUserId }: RegisterInput): Promise<Session> {
    const passwordHash = await this.hasher.hash(password)
    const current = currentUserId === null ? null : await this.users.findById(currentUserId)
    const user =
      current && isGuest(current)
        ? await this.users.setCredentials(current.id, login, passwordHash)
        : await this.users.create(login, passwordHash)
    return createSession(user, this.tokens)
  }
}
