export interface User {
  id: number
  login: string
  passwordHash: string
}

export interface UserRepository {
  findByLogin(login: string): Promise<User | null>
  findById(id: number): Promise<User | null>
  /** Throws ConflictError when the login is taken. */
  create(login: string, passwordHash: string): Promise<User>
}
