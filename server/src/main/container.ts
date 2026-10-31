// Composition root: the only module that knows every layer. It builds the object graph once.
import { Authenticate } from '../application/use-cases/auth/authenticate.use-case.js'
import { GetCurrentUser } from '../application/use-cases/auth/get-current-user.use-case.js'
import { Login } from '../application/use-cases/auth/login.use-case.js'
import { Register } from '../application/use-cases/auth/register.use-case.js'
import { StartGuestSession } from '../application/use-cases/auth/start-guest-session.use-case.js'
import { CreateTodo } from '../application/use-cases/todos/create-todo.use-case.js'
import { DeleteTodo } from '../application/use-cases/todos/delete-todo.use-case.js'
import { ListTodos } from '../application/use-cases/todos/list-todos.use-case.js'
import { UpdateTodo } from '../application/use-cases/todos/update-todo.use-case.js'
import { loadConfig } from '../infrastructure/config.js'
import { createPrismaClient } from '../infrastructure/prisma/client.js'
import { PrismaTodoRepository } from '../infrastructure/prisma/todo.repository.js'
import { PrismaUserRepository } from '../infrastructure/prisma/user.repository.js'
import { BcryptPasswordHasher } from '../infrastructure/security/bcrypt.hasher.js'
import { JwtTokenService } from '../infrastructure/security/jwt.tokens.js'
import { AuthController } from '../presentation/http/controllers/auth.controller.js'
import { TodoController } from '../presentation/http/controllers/todo.controller.js'
import { requireAuth } from '../presentation/http/middlewares/require-auth.middleware.js'
import type { HttpDependencies } from '../presentation/http/routes/index.js'
import { SessionCookie } from '../presentation/http/session-cookie.js'

const config = loadConfig()

// Infrastructure: adapters behind the application's ports.
const prisma = createPrismaClient(config.DATABASE_URL)
const users = new PrismaUserRepository(prisma)
const todos = new PrismaTodoRepository(prisma)
const hasher = new BcryptPasswordHasher()
const tokens = new JwtTokenService(config.JWT_SECRET)

// Application: one object per use case.
const authenticate = new Authenticate(tokens)

// Presentation: HTTP adapters around the use cases.
const cookie = new SessionCookie(config.NODE_ENV === 'production')

export const container: HttpDependencies = {
  authController: new AuthController(
    {
      startGuestSession: new StartGuestSession(users, tokens),
      register: new Register(users, hasher, tokens),
      login: new Login(users, hasher, tokens),
      getCurrentUser: new GetCurrentUser(users),
      authenticate,
    },
    cookie,
  ),
  todoController: new TodoController({
    listTodos: new ListTodos(todos),
    createTodo: new CreateTodo(todos),
    updateTodo: new UpdateTodo(todos),
    deleteTodo: new DeleteTodo(todos),
  }),
  requireAuth: requireAuth(authenticate, cookie),
}
