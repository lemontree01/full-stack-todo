import { UnauthorizedError } from '../../../domain/errors.js'
import type { UserRepository } from '../../../domain/user.js'
import { toMe, type Me } from '../../session.js'

export class GetCurrentUser {
  constructor(private readonly users: UserRepository) {}

  async execute(userId: number): Promise<Me> {
    const user = await this.users.findById(userId)
    if (!user) throw new UnauthorizedError('Not authenticated')
    return toMe(user)
  }
}
