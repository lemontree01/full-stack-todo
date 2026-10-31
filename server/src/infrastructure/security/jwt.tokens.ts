import jwt from 'jsonwebtoken'
import { SESSION_TTL_SECONDS } from '../../application/session.js'
import type { TokenService } from '../../application/ports.js'

export class JwtTokenService implements TokenService {
  constructor(private readonly secret: string) {}

  sign(userId: number): string {
    return jwt.sign({ sub: String(userId) }, this.secret, {
      algorithm: 'HS256',
      expiresIn: SESSION_TTL_SECONDS,
    })
  }

  verify(token: string): number | null {
    try {
      const payload = jwt.verify(token, this.secret, { algorithms: ['HS256'] })
      const userId = typeof payload === 'object' ? Number(payload.sub) : NaN
      return Number.isSafeInteger(userId) ? userId : null
    } catch {
      return null
    }
  }
}
