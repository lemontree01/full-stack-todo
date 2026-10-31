import { http } from '@/shared/api'
import type { Credentials, User } from '../model/types'

export const sessionApi = {
  me: () => http<User>('GET', '/auth/me'),
  login: (credentials: Credentials) => http<User>('POST', '/auth/login', credentials),
  register: (credentials: Credentials) => http<User>('POST', '/auth/register', credentials),
  logout: () => http<void>('POST', '/auth/logout'),
}
