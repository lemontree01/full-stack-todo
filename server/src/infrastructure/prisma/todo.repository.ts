import type { Todo, TodoPatch, TodoRepository } from '../../domain/todo.js'
import type { PrismaClient } from '../../generated/prisma/client.js'
import { isPrismaError } from './client.js'

const select = { id: true, name: true, isDone: true, createdAt: true } as const

export class PrismaTodoRepository implements TodoRepository {
  constructor(private readonly db: PrismaClient) {}

  listByUser(userId: number): Promise<Todo[]> {
    return this.db.todo.findMany({ where: { userId }, orderBy: { id: 'desc' }, select })
  }

  create(userId: number, name: string): Promise<Todo> {
    return this.db.todo.create({ data: { userId, name }, select })
  }

  async update(userId: number, id: number, patch: TodoPatch): Promise<Todo | null> {
    try {
      return await this.db.todo.update({ where: { id, userId }, data: patch, select })
    } catch (e) {
      if (isPrismaError(e, 'P2025')) return null
      throw e
    }
  }

  async delete(userId: number, id: number): Promise<boolean> {
    const { count } = await this.db.todo.deleteMany({ where: { id, userId } })
    return count > 0
  }
}
