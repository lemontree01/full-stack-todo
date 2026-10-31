// Composition root: the only module that knows every layer and wires them together.
import { AuthService } from '../application/auth.service.js'
import { TodoService } from '../application/todo.service.js'
import { loadConfig } from '../infrastructure/config.js'
import { createPrismaClient } from '../infrastructure/prisma/client.js'
import { PrismaTodoRepository } from '../infrastructure/prisma/todo.repository.js'
import { PrismaUserRepository } from '../infrastructure/prisma/user.repository.js'
import { BcryptPasswordHasher } from '../infrastructure/security/bcrypt.hasher.js'
import { JwtTokenService } from '../infrastructure/security/jwt.tokens.js'
import { createApp } from '../presentation/http/create-app.js'

const config = loadConfig()
const prisma = createPrismaClient(config.DATABASE_URL)

export default createApp({
  auth: new AuthService(
    new PrismaUserRepository(prisma),
    new BcryptPasswordHasher(),
    new JwtTokenService(config.JWT_SECRET),
  ),
  todos: new TodoService(new PrismaTodoRepository(prisma)),
  secureCookies: config.NODE_ENV === 'production',
})
