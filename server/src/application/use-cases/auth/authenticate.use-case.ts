import type { TokenService } from '../../ports.js'

/** Resolves a session token to a user id; null when it's missing, invalid or expired. */
export class Authenticate {
  constructor(private readonly tokens: TokenService) {}

  execute(token: string | undefined): number | null {
    return token ? this.tokens.verify(token) : null
  }
}
