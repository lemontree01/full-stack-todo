import { z } from 'zod'
import { TODO_NAME_MAX } from '../../../domain/todo.js'

const TodoName = z
  .string()
  .trim()
  .min(1, 'Todo cannot be empty')
  .max(TODO_NAME_MAX, `Todo must be at most ${TODO_NAME_MAX} characters`)

export const CreateTodoBody = z.object({ name: TodoName })

export const UpdateTodoBody = z
  .object({ name: TodoName.optional(), isDone: z.boolean().optional() })
  .refine((patch) => patch.name !== undefined || patch.isDone !== undefined, 'Nothing to update')

export const TodoIdParam = z.coerce
  .number()
  .int()
  .positive()
  .max(2 ** 31 - 1)
