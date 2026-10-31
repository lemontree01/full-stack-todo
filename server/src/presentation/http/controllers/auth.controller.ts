import type { RequestHandler, Response } from 'express'
import type { Session } from '../../../application/session.js'
import type { Authenticate } from '../../../application/use-cases/auth/authenticate.use-case.js'
import type { GetCurrentUser } from '../../../application/use-cases/auth/get-current-user.use-case.js'
import type { Login } from '../../../application/use-cases/auth/login.use-case.js'
import type { Register } from '../../../application/use-cases/auth/register.use-case.js'
import type { StartGuestSession } from '../../../application/use-cases/auth/start-guest-session.use-case.js'
import type { SessionCookie } from '../session-cookie.js'
import { CredentialsBody } from '../validation/auth.schemas.js'

export interface AuthUseCases {
  startGuestSession: StartGuestSession
  register: Register
  login: Login
  getCurrentUser: GetCurrentUser
  authenticate: Authenticate
}

/** Translates HTTP requests into auth use cases and their results into responses. */
export class AuthController {
  constructor(
    private readonly useCases: AuthUseCases,
    private readonly cookie: SessionCookie,
  ) {}

  startGuest: RequestHandler = async (_req, res) => {
    this.sendSession(res, await this.useCases.startGuestSession.execute(), 201)
  }

  register: RequestHandler = async (req, res) => {
    const credentials = CredentialsBody.parse(req.body)
    const currentUserId = this.useCases.authenticate.execute(this.cookie.read(req))
    this.sendSession(res, await this.useCases.register.execute({ ...credentials, currentUserId }), 201)
  }

  login: RequestHandler = async (req, res) => {
    this.sendSession(res, await this.useCases.login.execute(CredentialsBody.parse(req.body)), 200)
  }

  logout: RequestHandler = (_req, res) => {
    this.cookie.clear(res)
    res.status(204).end()
  }

  me: RequestHandler = async (_req, res) => {
    res.json(await this.useCases.getCurrentUser.execute(res.locals.userId))
  }

  private sendSession(res: Response, session: Session, status: number) {
    this.cookie.set(res, session.token)
    res.status(status).json(session.me)
  }
}
