import { ConflictError } from '../../domain/errors.js'
import type { User, UserRepository } from '../../domain/user.js'
import type { PrismaClient } from '../../generated/prisma/client.js'
import { isPrismaError } from './client.js'

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly db: PrismaClient) {}

  findByLogin(login: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { login } })
  }

  findById(id: number): Promise<User | null> {
    return this.db.user.findUnique({ where: { id } })
  }

  create(login: string, passwordHash: string): Promise<User> {
    return this.withUniqueLogin(() => this.db.user.create({ data: { login, passwordHash } }))
  }

  createGuest(): Promise<User> {
    return this.db.user.create({ data: {} })
  }

  setCredentials(id: number, login: string, passwordHash: string): Promise<User> {
    // `login: null` guarantees only a guest can be upgraded, never an existing account.
    return this.withUniqueLogin(() =>
      this.db.user.update({ where: { id, AND: { login: null } }, data: { login, passwordHash } }),
    )
  }

  private async withUniqueLogin(query: () => Promise<User>): Promise<User> {
    try {
      return await query()
    } catch (e) {
      if (isPrismaError(e, 'P2002')) throw new ConflictError('Login is already taken')
      throw e
    }
  }
}
