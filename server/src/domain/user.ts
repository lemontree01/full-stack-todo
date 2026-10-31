export interface User {
  id: number
  /** null for a guest: someone using the app before signing up. */
  login: string | null
  passwordHash: string | null
}

export const isGuest = (user: User) => user.login === null

export interface UserRepository {
  findByLogin(login: string): Promise<User | null>
  findById(id: number): Promise<User | null>
  /** Throws ConflictError when the login is taken. */
  create(login: string, passwordHash: string): Promise<User>
  createGuest(): Promise<User>
  /** Turns a guest into a regular user, keeping its todos. Throws ConflictError when the login is taken. */
  setCredentials(id: number, login: string, passwordHash: string): Promise<User>
}
