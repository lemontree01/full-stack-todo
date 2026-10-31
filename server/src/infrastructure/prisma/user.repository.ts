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

  async create(login: string, passwordHash: string): Promise<User> {
    try {
      return await this.db.user.create({ data: { login, passwordHash } })
    } catch (e) {
      if (isPrismaError(e, 'P2002')) throw new ConflictError('Login is already taken')
      throw e
    }
  }
}
