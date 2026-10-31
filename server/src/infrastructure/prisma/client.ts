import { PrismaPg } from '@prisma/adapter-pg'
import { Prisma, PrismaClient } from '../../generated/prisma/client.js'

export const createPrismaClient = (connectionString: string) =>
  new PrismaClient({ adapter: new PrismaPg({ connectionString }) })

export const isPrismaError = (e: unknown, code: 'P2002' | 'P2025') =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code === code
