import { z } from 'zod'
import { TODO_NAME_MAX } from '../../domain/todo.js'

export const Credentials = z.object({
  login: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, 'Login must be 3–32 characters')
    .max(32, 'Login must be 3–32 characters')
    .regex(/^[a-z0-9_.-]+$/, 'Login may contain only letters, digits, "_", "." and "-"'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be at most 72 characters'),
})

const TodoName = z
  .string()
  .trim()
  .min(1, 'Todo cannot be empty')
  .max(TODO_NAME_MAX, `Todo must be at most ${TODO_NAME_MAX} characters`)

export const CreateTodo = z.object({ name: TodoName })

export const UpdateTodo = z
  .object({ name: TodoName.optional(), isDone: z.boolean().optional() })
  .refine((patch) => patch.name !== undefined || patch.isDone !== undefined, 'Nothing to update')

export const TodoId = z.coerce
  .number()
  .int()
  .positive()
  .max(2 ** 31 - 1)
