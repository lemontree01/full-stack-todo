import type { UserRepository } from '../../../domain/user.js'
import type { TokenService } from '../../ports.js'
import { createSession, type Session } from '../../session.js'

// shortcut: guest users are never cleaned up; add a scheduled job deleting old guests if the table grows.
export class StartGuestSession {
  constructor(
    private readonly users: UserRepository,
    private readonly tokens: TokenService,
  ) {}

  async execute(): Promise<Session> {
    return createSession(await this.users.createGuest(), this.tokens)
  }
}
