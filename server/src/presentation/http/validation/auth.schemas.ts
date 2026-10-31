import { z } from 'zod'

export const CredentialsBody = z.object({
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
